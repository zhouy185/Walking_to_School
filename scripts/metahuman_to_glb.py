"""
MetaHuman (Unreal Engine FBX export)  ->  web-ready .glb for Westdale Safe Walk
================================================================================

Run with Blender 4.2+ (tested with Blender 5.0) — no UI needed:

  blender -b -P scripts/metahuman_to_glb.py -- \
      --body  ~/Export/Maya/SKM_Body.fbx \
      --face  ~/Export/Maya/SKM_Face.fbx \
      --extra ~/Export/Maya/Hair_Cards.fbx  ~/Export/Maya/Eyebrows_Cards.fbx \
      --textures ~/Export/Maya/Textures \
      --lod 2 --tex 1024 \
      --out public/models/metahuman/maya.raw.glb

then shrink it for the web:

  npm run optimize-metahuman -- public/models/metahuman/maya.raw.glb public/models/metahuman/maya.glb

What it does
  * Joins the FACE skeletal mesh onto the BODY skeleton. Facial bones are folded into
    their nearest body bone (normally `head`) — the game doesn't animate faces, and this
    keeps one clean Unreal skeleton the game already understands (pelvis, thigh_l, …).
  * Clothing exported as skeletal meshes is joined the same way; static meshes such as
    hair cards / eyebrow cards are attached rigidly to the `head` bone.
  * Keeps one LOD (default LOD2 ≈ 15–25k triangles for a full character).
  * Deletes Unreal-only helper layers (eye shells, eye-edge, cartilage, saliva) that
    render as grey films anywhere outside Unreal.
  * Optionally wires up textures from a folder by name (base colour + normal), and
    downsizes every texture to --tex pixels.
"""

import argparse
import os
import re
import sys

import bpy

# --------------------------------------------------------------------------------------
argv = sys.argv[sys.argv.index("--") + 1:] if "--" in sys.argv else sys.argv[1:]
ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
ap.add_argument("--body", required=True, help="Body skeletal mesh FBX (has pelvis, thigh_l, upperarm_l …)")
ap.add_argument("--face", help="Face/head skeletal mesh FBX (optional if the body FBX already contains the head)")
ap.add_argument("--extra", nargs="*", default=[], help="More FBX files: clothing, hair cards, eyebrow cards …")
ap.add_argument("--textures", help="Folder of exported textures (png/tga/jpg) to wire up by name")
ap.add_argument("--lod", type=int, default=2, help="LOD to keep when several are exported (default 2)")
ap.add_argument("--tex", type=int, default=1024, help="Max texture size in pixels (default 1024)")
ap.add_argument("--out", required=True, help="Output .glb path")
args = ap.parse_args(argv)

HELPER_RE = re.compile(r"eye_?shell|eye_?edge|eye_?occlusion|cartilage|saliva|lacrimal", re.I)
LOD_RE = re.compile(r"_?LOD(\d+)", re.I)


def log(*a):
    print("[metahuman_to_glb]", *a, flush=True)


def import_fbx(path):
    path = os.path.abspath(os.path.expanduser(path))
    if not os.path.isfile(path):
        sys.exit(f"File not found: {path}")
    before = set(bpy.data.objects)
    # Keep leaf bones: MetaHuman's last finger knuckles are real leaf bones.
    bpy.ops.import_scene.fbx(filepath=path, ignore_leaf_bones=False, use_anim=False)
    new = [o for o in bpy.data.objects if o not in before]
    log(f"imported {os.path.basename(path)}: {len(new)} objects")
    return new


def armature_of(objs):
    arms = [o for o in objs if o.type == "ARMATURE"]
    if arms:
        return arms[0]
    for o in objs:
        for m in getattr(o, "modifiers", []):
            if m.type == "ARMATURE" and m.object:
                return m.object
    return None


def keep_world(obj, new_parent, bone=None):
    mw = obj.matrix_world.copy()
    obj.parent = new_parent
    if bone:
        obj.parent_type = "BONE"
        obj.parent_bone = bone
    else:
        obj.parent_type = "OBJECT"
    obj.matrix_world = mw


def retarget_skinned(mesh, src_arm, body_arm):
    """Re-skin `mesh` from `src_arm` onto `body_arm`, folding unknown bones into their nearest known ancestor."""
    body_bones = {b.name for b in body_arm.data.bones}
    src_bones = {b.name: b for b in src_arm.data.bones} if src_arm else {}

    def nearest_known(name):
        b = src_bones.get(name)
        while b is not None:
            if b.name in body_bones:
                return b.name
            b = b.parent
        return "head" if "head" in body_bones else next(iter(body_bones))

    groups = list(mesh.vertex_groups)
    moves = {vg.name: nearest_known(vg.name) for vg in groups if vg.name not in body_bones}
    if moves:
        weights = {}  # target -> {vertex index: weight}
        idx_to_name = {vg.index: vg.name for vg in groups}
        for v in mesh.data.vertices:
            for g in v.groups:
                name = idx_to_name.get(g.group)
                if name in moves and g.weight > 0:
                    t = moves[name]
                    weights.setdefault(t, {})
                    weights[t][v.index] = weights[t].get(v.index, 0.0) + g.weight
        for name in moves:
            mesh.vertex_groups.remove(mesh.vertex_groups[name])
        for target, wmap in weights.items():
            vg = mesh.vertex_groups.get(target) or mesh.vertex_groups.new(name=target)
            for vi, w in wmap.items():
                vg.add([vi], min(1.0, w), "ADD")
        log(f"  {mesh.name}: folded {len(moves)} extra bones into {sorted(set(moves.values()))}")
    has_mod = False
    for m in mesh.modifiers:
        if m.type == "ARMATURE":
            m.object = body_arm
            has_mod = True
    if not has_mod:
        mesh.modifiers.new("Armature", "ARMATURE").object = body_arm
    keep_world(mesh, body_arm)


def delete(objs):
    for o in list(objs):
        if o.name in bpy.data.objects:
            bpy.data.objects.remove(o, do_unlink=True)


# --------------------------------------------------------------------------------------
bpy.ops.wm.read_factory_settings(use_empty=True)

body_objs = import_fbx(args.body)
body_arm = next(
    (o for o in body_objs if o.type == "ARMATURE" and {"pelvis", "thigh_l", "upperarm_l"} <= {b.name for b in o.data.bones}),
    None,
)
if not body_arm:
    sys.exit("The body FBX has no Unreal skeleton (expected bones pelvis, thigh_l, upperarm_l).")
body_bones = {b.name for b in body_arm.data.bones}
log(f"body skeleton: {body_arm.name} ({len(body_bones)} bones)")

for path in ([args.face] if args.face else []) + list(args.extra):
    objs = import_fbx(path)
    src_arm = armature_of(objs)
    for o in objs:
        if o.type != "MESH":
            continue
        skinned = any(m.type == "ARMATURE" for m in o.modifiers) or o.vertex_groups
        if skinned and src_arm:
            retarget_skinned(o, src_arm, body_arm)
        else:
            # Rigid parts (hair / eyebrow cards): ride on the head bone
            keep_world(o, body_arm, "head" if "head" in body_bones else None)
            log(f"  {o.name}: attached to head bone")
    if src_arm and src_arm is not body_arm:
        # Sanity check: the face skeleton should sit exactly on the body's head
        if "head" in {b.name for b in src_arm.data.bones}:
            h1 = src_arm.matrix_world @ src_arm.data.bones["head"].head_local
            h2 = body_arm.matrix_world @ body_arm.data.bones["head"].head_local
            if (h1 - h2).length > 0.02 * max(1.0, body_arm.dimensions.z):
                log(f"  WARNING: face skeleton head is {(h1 - h2).length:.3f} units from the body head — check export settings")
        delete([o for o in objs if o.type in {"ARMATURE", "EMPTY"}])

# Keep one LOD per object family
meshes = [o for o in bpy.data.objects if o.type == "MESH"]
fam = {}
for o in meshes:
    m = LOD_RE.search(o.name)
    if m:
        fam.setdefault(LOD_RE.sub("", o.name), []).append((int(m.group(1)), o))
for base, items in fam.items():
    lods = sorted({i for i, _ in items})
    keep = args.lod if args.lod in lods else min(lods, key=lambda i: abs(i - args.lod))
    delete([o for i, o in items if i != keep])
    log(f"  {base}: kept LOD{keep} of {lods}")

# Drop Unreal-only helper layers
for o in [o for o in bpy.data.objects if o.type == "MESH"]:
    names = " ".join([o.name] + [s.material.name for s in o.material_slots if s.material])
    if HELPER_RE.search(names):
        log(f"  removed helper mesh {o.name}")
        delete([o])
        continue
    # Remove helper material slots inside a shared mesh (e.g. the face mesh)
    bad = [i for i, s in enumerate(o.material_slots) if s.material and HELPER_RE.search(s.material.name)]
    if bad:
        import bmesh

        bm = bmesh.new()
        bm.from_mesh(o.data)
        doomed = [f for f in bm.faces if f.material_index in bad]
        bmesh.ops.delete(bm, geom=doomed, context="FACES")
        bm.to_mesh(o.data)
        bm.free()
        log(f"  {o.name}: removed {len(doomed)} faces of helper materials")

# --------------------------------------------------------------------------------------
# Textures
COLOR_RE = re.compile(r"(base_?colou?r|albedo|diffuse|_bc\b|_d\b|_col\b|color)", re.I)
NORMAL_RE = re.compile(r"(normal|_n\b|_nrm\b)", re.I)
ALPHA_RE = re.compile(r"(opacity|alpha|_mask\b|coverage)", re.I)
PARTS = [
    ("head", re.compile(r"head|face", re.I)),
    ("body", re.compile(r"body", re.I)),
    ("eye", re.compile(r"eye(?!lash|brow)", re.I)),
    ("teeth", re.compile(r"teeth|mouth", re.I)),
    ("lash", re.compile(r"lash", re.I)),
    ("brow", re.compile(r"brow", re.I)),
    ("hair", re.compile(r"hair", re.I)),
]


def tokens(name):
    return {t for t in re.split(r"[^a-z0-9]+", name.lower()) if len(t) > 2 and t not in {"inst", "mat", "baked", "synthesized"}}


if args.textures:
    tex_dir = os.path.abspath(os.path.expanduser(args.textures))
    files = []
    for root, _, fs in os.walk(tex_dir):
        files += [os.path.join(root, f) for f in fs if f.lower().endswith((".png", ".tga", ".jpg", ".jpeg", ".tif", ".tiff"))]
    log(f"textures: {len(files)} files in {tex_dir}")

    def best(mat_name, kind_re):
        part = next((p for p, r in PARTS if r.search(mat_name)), None)
        mt = tokens(mat_name)
        scored = []
        for f in files:
            b = os.path.basename(f)
            if not kind_re.search(b):
                continue
            score = len(mt & tokens(b)) * 2
            if part and dict(PARTS)[part].search(b):
                score += 5
            if score:
                scored.append((score, -len(b), f))
        return max(scored)[2] if scored else None

    for mat in bpy.data.materials:
        nt = mat.node_tree
        if nt is None:
            continue
        bsdf = next((n for n in nt.nodes if n.type == "BSDF_PRINCIPLED"), None)
        if not bsdf:
            continue
        col = best(mat.name, COLOR_RE)
        if col and not bsdf.inputs["Base Color"].is_linked:
            img = nt.nodes.new("ShaderNodeTexImage")
            img.image = bpy.data.images.load(col, check_existing=True)
            nt.links.new(img.outputs["Color"], bsdf.inputs["Base Color"])
            if re.search(r"hair|lash|brow|card", mat.name, re.I):
                alpha = best(mat.name, ALPHA_RE)
                if alpha:
                    a = nt.nodes.new("ShaderNodeTexImage")
                    a.image = bpy.data.images.load(alpha, check_existing=True)
                    a.image.colorspace_settings.name = "Non-Color"
                    nt.links.new(a.outputs["Color"], bsdf.inputs["Alpha"])
                else:
                    nt.links.new(img.outputs["Alpha"], bsdf.inputs["Alpha"])
            log(f"  {mat.name}: colour ← {os.path.basename(col)}")
        nrm = best(mat.name, NORMAL_RE)
        if nrm and not bsdf.inputs["Normal"].is_linked:
            img = nt.nodes.new("ShaderNodeTexImage")
            img.image = bpy.data.images.load(nrm, check_existing=True)
            img.image.colorspace_settings.name = "Non-Color"
            nm = nt.nodes.new("ShaderNodeNormalMap")
            nt.links.new(img.outputs["Color"], nm.inputs["Color"])
            nt.links.new(nm.outputs["Normal"], bsdf.inputs["Normal"])
            log(f"  {mat.name}: normal ← {os.path.basename(nrm)}")

for img in bpy.data.images:
    w, h = img.size[:]
    if w and h and max(w, h) > args.tex:
        k = args.tex / max(w, h)
        img.scale(max(1, int(w * k)), max(1, int(h * k)))

# --------------------------------------------------------------------------------------
out = os.path.abspath(os.path.expanduser(args.out))
os.makedirs(os.path.dirname(out), exist_ok=True)
bpy.ops.export_scene.gltf(
    filepath=out,
    export_format="GLB",
    export_skins=True,
    export_animations=False,
    export_morph=False,
    export_yup=True,
    export_apply=False,
)
tris = 0
for o in bpy.data.objects:
    if o.type == "MESH":
        tris += sum(len(p.vertices) - 2 for p in o.data.polygons)
log(f"wrote {out}  (~{tris:,} triangles, {os.path.getsize(out) / 1e6:.1f} MB before optimizing)")
