"""
Step 2 (Blender): build each character as an inflated, picture-textured, rigged mesh and export .glb.
Run:  blender -b -P scripts/family/build_family.py   (after analyze.py)
"""
import json
import os

import bpy
import bmesh
import numpy as np
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(HERE, "build")
OUT = os.path.join(HERE, "..", "..", "public", "models", "characters")
NAMES = ["dad", "mom", "girl", "boy"]
BACK_FACTOR = {"dad": 1.0, "mom": 1.0, "girl": 1.0, "boy": 1.0}


def build(name):
    bpy.ops.wm.read_factory_settings(use_empty=True)
    d = np.load(os.path.join(DATA, f"{name}.npz"))
    mask, depth = d["mask"], d["depth"]
    order, weights = d["order"], d["weights"]
    bone_names = [str(b) for b in d["bone_names"]]
    g, m_px, cx, W, H, bot = float(d["g"]), float(d["m_px"]), float(d["cx"]), int(d["W"]), int(d["H"]), float(d["bot"])
    joints = {k: np.array(v) for k, v in json.loads(str(d["joints"])).items()}
    Hs, Ws = mask.shape

    def to3(x, y, yd=0.0):
        """picture px (x, y) → Blender (X right=char's left, Y depth (−front), Z up)"""
        return Vector(((x - cx) * m_px, yd, (bot - y) * m_px))

    # ---------------- mesh: front + back sheets stitched along the outline
    bm = bmesh.new()
    uvl = bm.loops.layers.uv.new("UVMap")
    front, back = {}, {}
    bf = BACK_FACTOR[name]
    for j in range(Hs):
        for i in range(Ws):
            if not mask[j, i]:
                continue
            x, y = (i + 0.5) / g, (j + 0.5) / g
            dz = depth[j, i] / g * m_px
            front[(j, i)] = bm.verts.new(to3(x, y, -dz))
            back[(j, i)] = bm.verts.new(to3(x, y, dz * bf))
    bm.verts.ensure_lookup_table()

    def uv_of(j, i, is_back):
        x, y = (i + 0.5) / g, (j + 0.5) / g
        u = x / W * 0.5 + (0.5 if is_back else 0.0)
        return (u, 1.0 - y / H)

    edge_use = {}
    for j in range(Hs - 1):
        for i in range(Ws - 1):
            q = [(j, i), (j, i + 1), (j + 1, i + 1), (j + 1, i)]
            if not all(mask[p] for p in q):
                continue
            # front faces −Y: winding chosen so normals point toward the viewer
            f = bm.faces.new([front[p] for p in q[::-1]])
            for l, p in zip(f.loops, q[::-1]):
                l[uvl].uv = uv_of(*p, False)
            b = bm.faces.new([back[p] for p in q])
            for l, p in zip(b.loops, q):
                l[uvl].uv = uv_of(*p, True)
            for a, c in zip(q, q[1:] + q[:1]):
                key = tuple(sorted((a, c)))
                edge_use[key] = edge_use.get(key, 0) + 1
    # stitch outline edges (used by one quad only) front ↔ back
    for (a, c), n in edge_use.items():
        if n != 1:
            continue
        try:
            f = bm.faces.new([front[a], front[c], back[c], back[a]])
        except ValueError:
            continue
        for l, p, isb in zip(f.loops, [a, c, c, a], [False, False, True, True]):
            l[uvl].uv = uv_of(*p, False)  # the rim takes the front colour
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    bpy.context.scene.collection.objects.link(ob)
    for p in me.polygons:
        p.use_smooth = True
    # a light smoothing pass rounds off the pixel staircase along the outline
    sm = ob.modifiers.new("smooth", "SMOOTH")
    sm.factor = 0.6
    sm.iterations = 4
    bpy.context.view_layer.objects.active = ob
    ob.select_set(True)
    bpy.ops.object.modifier_apply(modifier="smooth")

    # ---------------- material: picture atlas
    mat = bpy.data.materials.new(f"{name}_mat")
    mat.use_nodes = True
    nt = mat.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    tex = nt.nodes.new("ShaderNodeTexImage")
    tex.image = bpy.data.images.load(os.path.join(DATA, f"{name}_tex.png"))
    nt.links.new(tex.outputs["Color"], bsdf.inputs["Base Color"])
    bsdf.inputs["Roughness"].default_value = 0.7
    me.materials.append(mat)

    # ---------------- skeleton (Mixamo names, picture pose)
    arm = bpy.data.armatures.new("Armature")
    rig = bpy.data.objects.new("Armature", arm)
    bpy.context.scene.collection.objects.link(rig)
    for o in bpy.data.objects:
        o.select_set(False)
    rig.select_set(True)
    bpy.context.view_layer.objects.active = rig
    bpy.ops.object.mode_set(mode="EDIT")
    J = {k: to3(*v) for k, v in joints.items()}
    hpx = bot - joints["headtop"][1]
    up = lambda p, f: p + Vector((0, 0, f * hpx * m_px))
    E = {}

    def bone(n, h, t, parent=None):
        b = arm.edit_bones.new(n)
        b.head, b.tail = h, t
        if parent:
            b.parent = E[parent]
        E[n] = b

    pel, chest, neck = J["pelvis"], J["chest"], J["neck"]
    bone("Hips", pel, pel.lerp(chest, 0.25))
    bone("Spine", pel.lerp(chest, 0.25), pel.lerp(chest, 0.6), "Hips")
    bone("Spine1", pel.lerp(chest, 0.6), chest, "Spine")
    bone("Spine2", chest, neck, "Spine1")
    bone("Neck", neck, up(neck, 0.035), "Spine2")
    bone("Head", up(neck, 0.035), J["headtop"], "Neck")
    for side, s in (("Left", "L"), ("Right", "R")):
        sh = J[f"shoulder_{s}"]
        bone(f"{side}Shoulder", Vector((neck.x * 0.5 + sh.x * 0.5, 0, sh.z)), sh, "Spine2")
        bone(f"{side}Arm", sh, J[f"elbow_{s}"], f"{side}Shoulder")
        bone(f"{side}ForeArm", J[f"elbow_{s}"], J[f"wrist_{s}"], f"{side}Arm")
        bone(f"{side}Hand", J[f"wrist_{s}"], J[f"handend_{s}"], f"{side}ForeArm")
        bone(f"{side}UpLeg", J[f"hip_{s}"], J[f"knee_{s}"], "Hips")
        bone(f"{side}Leg", J[f"knee_{s}"], J[f"ankle_{s}"], f"{side}UpLeg")
        an = J[f"ankle_{s}"]
        toe = Vector((an.x, -0.06 * hpx * m_px, 0.012 * hpx * m_px))
        bone(f"{side}Foot", an, toe, f"{side}Leg")
        bone(f"{side}ToeBase", toe, toe + Vector((0, -0.03 * hpx * m_px, 0)), f"{side}Foot")
    bpy.ops.object.mode_set(mode="OBJECT")

    # ---------------- skin weights from the precomputed geodesic map
    groups = {n: ob.vertex_groups.new(name=n) for n in bone_names}
    # map each vertex back to its grid pixel (x,z → i,j), front/back share the same weights
    inv = 1.0 / m_px
    for v in me.vertices:
        x = v.co.x * inv + cx
        y = bot - v.co.z * inv
        i = int(min(max(round(x * g - 0.5), 0), Ws - 1))
        j = int(min(max(round(y * g - 0.5), 0), Hs - 1))
        if not mask[j, i]:
            # snap to the nearest mask pixel nearby
            best = None
            for dj in range(-2, 3):
                for di in range(-2, 3):
                    jj, ii = j + dj, i + di
                    if 0 <= jj < Hs and 0 <= ii < Ws and mask[jj, ii]:
                        dd = dj * dj + di * di
                        if best is None or dd < best[0]:
                            best = (dd, jj, ii)
            if best:
                _, j, i = best
        for k in range(3):
            w = float(weights[j, i, k])
            if w > 0.02:
                groups[bone_names[int(order[j, i, k])]].add([v.index], w, "ADD")
    ob.modifiers.new("Armature", "ARMATURE").object = rig
    ob.parent = rig

    os.makedirs(OUT, exist_ok=True)
    path = os.path.join(OUT, f"{name}.glb")
    bpy.ops.export_scene.gltf(filepath=path, export_format="GLB", export_skins=True, export_animations=False,
                              export_morph=False, export_yup=True, export_image_format="JPEG", export_image_quality=88)
    print(f"FAMILY {name}: {len(me.polygons)} faces, {os.path.getsize(path) / 1e6:.2f} MB")


for n in NAMES:
    build(n)
