"""
Stylised (Pixar-inspired) kid for Westdale Safe Walk, built entirely from code in Blender.
Run (from the project folder):
    python3 scripts/kid/make_textures.py
    blender -b -P scripts/kid/build_kid.py
Output: public/models/characters/kid.glb  (Mixamo-named skeleton, Blink morph, ~1.35 m tall, facing -Y)
"""
import math
import os
import random

import bpy
import bmesh
from mathutils import Matrix, Quaternion, Vector
from mathutils.bvhtree import BVHTree

HERE = os.path.dirname(os.path.abspath(__file__))
TEX = os.path.join(HERE, "tex") + "/"
OUT = os.path.join(HERE, "..", "..", "public", "models", "characters", "kid.glb")
random.seed(7)

bpy.ops.wm.read_factory_settings(use_empty=True)
scene = bpy.context.scene
coll = scene.collection

# ----------------------------------------------------------------------------- palette (sRGB → linear)
def lin(c):
    return tuple(((x + 0.055) / 1.055) ** 2.4 if x > 0.04045 else x / 12.92 for x in c)


SKIN = lin((0.96, 0.76, 0.64))
BLUSH = lin((0.97, 0.58, 0.56))
HAIR = lin((0.33, 0.18, 0.09))
HAIR_HI = lin((0.58, 0.36, 0.2))
BROW = lin((0.30, 0.16, 0.08))
LASH = lin((0.08, 0.05, 0.04))


# ----------------------------------------------------------------------------- helpers
def material(name, color=(1, 1, 1), rough=0.6, tex=None, normal=None, vcol=False, metal=0.0, emit=None, linear=False):
    if not linear:
        color = lin(color)
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    nt = m.node_tree
    bsdf = nt.nodes["Principled BSDF"]
    bsdf.inputs["Base Color"].default_value = (*color, 1)
    bsdf.inputs["Roughness"].default_value = rough
    bsdf.inputs["Metallic"].default_value = metal
    if tex:
        t = nt.nodes.new("ShaderNodeTexImage")
        t.image = bpy.data.images.load(TEX + tex)
        nt.links.new(t.outputs["Color"], bsdf.inputs["Base Color"])
    elif vcol:
        a = nt.nodes.new("ShaderNodeVertexColor")
        a.layer_name = "Col"
        nt.links.new(a.outputs["Color"], bsdf.inputs["Base Color"])
    if normal:
        t = nt.nodes.new("ShaderNodeTexImage")
        t.image = bpy.data.images.load(TEX + normal)
        t.image.colorspace_settings.name = "Non-Color"
        nm = nt.nodes.new("ShaderNodeNormalMap")
        nm.inputs["Strength"].default_value = 0.8
        nt.links.new(t.outputs["Color"], nm.inputs["Color"])
        nt.links.new(nm.outputs["Normal"], bsdf.inputs["Normal"])
    if emit:
        bsdf.inputs["Emission Color"].default_value = (*emit, 1)
        bsdf.inputs["Emission Strength"].default_value = 1.0
    return m


def new_obj(name, bm, mats=()):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    ob = bpy.data.objects.new(name, me)
    coll.objects.link(ob)
    for m in mats:
        me.materials.append(m)
    for p in me.polygons:
        p.use_smooth = True
    return ob


def uv_sphere(name, r, center, scale=(1, 1, 1), segs=48, rings=32, mats=(), rot=None):
    bm = bmesh.new()
    bm.loops.layers.uv.new("UVMap")
    bmesh.ops.create_uvsphere(bm, u_segments=segs, v_segments=rings, radius=r, calc_uvs=True)
    if rot:
        bmesh.ops.rotate(bm, verts=bm.verts, cent=(0, 0, 0), matrix=rot)
    for v in bm.verts:
        v.co = Vector((v.co.x * scale[0], v.co.y * scale[1], v.co.z * scale[2])) + Vector(center)
    return new_obj(name, bm, mats)


def set_vcol(ob, fn):
    me = ob.data
    if "Col" not in me.color_attributes:
        me.color_attributes.new("Col", "FLOAT_COLOR", "POINT")
    attr = me.color_attributes["Col"]
    mw = ob.matrix_world
    for i, v in enumerate(me.vertices):
        c = fn(mw @ v.co)
        attr.data[i].color = (*c, 1.0)
    me.color_attributes.active_color = attr


def ensure_white(ob):
    me = ob.data
    if "Col" not in me.color_attributes:
        attr = me.color_attributes.new("Col", "FLOAT_COLOR", "POINT")
        for d in attr.data:
            d.color = (1, 1, 1, 1)
        me.color_attributes.active_color = attr


def join(objs, name):
    for o in objs:
        if o.type == "MESH":
            ensure_white(o)
    base = objs[0]
    ctx = bpy.context
    for o in bpy.data.objects:
        o.select_set(False)
    for o in objs:
        o.select_set(True)
    ctx.view_layer.objects.active = base
    bpy.ops.object.join()
    base.name = name
    base.data.name = name
    return base


def smoothstep(a, b, x):
    t = max(0.0, min(1.0, (x - a) / (b - a)))
    return t * t * (3 - 2 * t)


def lerp3(a, b, t):
    return tuple(a[i] + (b[i] - a[i]) * t for i in range(3))


# ============================================================================== BODY (metaballs)
# Proportions for a ~9-year-old cartoon kid, 1.35 m, T-pose, facing -Y.
mb = bpy.data.metaballs.new("BodyMB")
mb.resolution = 0.011
mb.threshold = 0.6
mbo = bpy.data.objects.new("Body", mb)
coll.objects.link(mbo)


def ball(kind, co, radius, size=(0, 0, 0), rot=None, stiff=2.0):
    e = mb.elements.new(type=kind)
    e.co = co
    e.radius = radius
    e.stiffness = stiff
    if kind in {"ELLIPSOID", "CAPSULE", "CUBE"}:
        e.size_x, e.size_y, e.size_z = size
    if rot is not None:
        e.rotation = rot
    return e


def capsule(a, b, r, stiff=2.0):
    a, b = Vector(a), Vector(b)
    d = b - a
    q = Vector((1, 0, 0)).rotation_difference(d.normalized())
    return ball("CAPSULE", (a + b) / 2, r, (d.length / 2, 0, 0), q, stiff)


# torso: soft pear shape (chest, tummy, hips)
ball("ELLIPSOID", (0, 0.0, 0.885), 0.21, (0.62, 0.48, 0.62))
ball("ELLIPSOID", (0, -0.005, 0.775), 0.21, (0.64, 0.52, 0.55))
ball("ELLIPSOID", (0, 0.0, 0.68), 0.2, (0.66, 0.5, 0.42))
# neck
capsule((0, 0.005, 0.97), (0, 0.005, 1.06), 0.083)
# arms (T-pose along X) + hands
for s in (1, -1):
    capsule((s * 0.12, 0, 0.955), (s * 0.35, 0, 0.955), 0.085)     # upper arm (sleeve, roomy)
    capsule((s * 0.35, 0, 0.955), (s * 0.55, 0, 0.955), 0.072)     # forearm
    ball("ELLIPSOID", (s * 0.6, -0.002, 0.955), 0.07, (0.62, 0.28, 0.52))  # palm
    for i, (dy, ln) in enumerate([(-0.022, 0.055), (-0.007, 0.062), (0.008, 0.06), (0.022, 0.05)]):
        capsule((s * 0.625, dy, 0.955), (s * (0.625 + ln), dy, 0.952), 0.02)  # fingers
    capsule((s * 0.59, -0.03, 0.948), (s * 0.625, -0.06, 0.94), 0.021)       # thumb
    # legs
    capsule((s * 0.075, 0, 0.66), (s * 0.08, 0, 0.36), 0.1)        # thigh
    capsule((s * 0.08, 0, 0.36), (s * 0.08, 0.005, 0.09), 0.08)    # shin
bpy.context.view_layer.objects.active = mbo
mbo.select_set(True)
bpy.ops.object.convert(target="MESH")
body = bpy.context.view_layer.objects.active
body.name = "Body"
body.data.name = "Body"

# decimate to a game-friendly count, keep it smooth
dec = body.modifiers.new("dec", "DECIMATE")
dec.ratio = 0.35
bpy.ops.object.modifier_apply(modifier="dec")
for p in body.data.polygons:
    p.use_smooth = True

m_skin = material("Skin", SKIN, 0.55, linear=True)
m_knit = material("Sweater", (1, 1, 1), 0.95, tex="knit_color.png", normal="knit_normal.png")
m_denim = material("Jeans", (1, 1, 1), 0.9, tex="denim.png")
for m in (m_skin, m_knit, m_denim):
    body.data.materials.append(m)

# assign clothing per face + triplanar UVs so the knit / denim tile at a constant scale
bm = bmesh.new()
bm.from_mesh(body.data)
uv = bm.loops.layers.uv.verify()
for f in bm.faces:
    c = f.calc_center_median()
    ax = abs(c.x)
    if ax > 0.565 or (c.z > 0.985 and ax < 0.09):
        f.material_index = 0                     # hands, neck
    elif c.z < 0.695 and ax < 0.25:
        f.material_index = 2                     # jeans
    else:
        f.material_index = 1                     # sweater
    n = f.normal
    k = 9.0 if f.material_index == 1 else 14.0
    for l in f.loops:
        p = l.vert.co
        if abs(n.x) > abs(n.y) and abs(n.x) > abs(n.z) * 0.6:
            l[uv].uv = (p.y * k, p.z * k)
        elif abs(n.z) > abs(n.y) * 1.4 and abs(n.z) > abs(n.x):
            l[uv].uv = (p.x * k, p.y * k)
        else:
            l[uv].uv = (p.x * k, p.z * k)
bm.to_mesh(body.data)
bm.free()

# sweater details: rolled collar, cuffs and hem bands (tori)
def torus(name, center, R, r, mat, axis="Z", scale=(1, 1, 1)):
    bm = bmesh.new()
    segs = 40
    rings = 12
    verts = []
    for i in range(segs):
        a = 2 * math.pi * i / segs
        row = []
        for j in range(rings):
            b = 2 * math.pi * j / rings
            x = (R + r * math.cos(b)) * math.cos(a)
            y = (R + r * math.cos(b)) * math.sin(a)
            z = r * math.sin(b)
            p = Vector((x * scale[0], y * scale[1], z * scale[2]))
            if axis == "X":
                p = Vector((p.z, p.y, p.x))
            row.append(bm.verts.new(p + Vector(center)))
        verts.append(row)
    for i in range(segs):
        for j in range(rings):
            bm.faces.new((verts[i][j], verts[(i + 1) % segs][j], verts[(i + 1) % segs][(j + 1) % rings], verts[i][(j + 1) % rings]))
    o = new_obj(name, bm, [mat])
    # simple UVs for the knit
    bm = bmesh.new()
    bm.from_mesh(o.data)
    uvl = bm.loops.layers.uv.verify()
    for f in bm.faces:
        for l in f.loops:
            p = l.vert.co
            l[uvl].uv = (math.atan2(p.y - center[1], p.x - center[0]) * 1.6, p.z * 12 + p.x * 12)
    bm.to_mesh(o.data)
    bm.free()
    return o


collar = torus("Collar", (0, 0.003, 0.985), 0.083, 0.024, m_knit, scale=(1, 0.95, 1))
cuffs = [torus(f"Cuff{s}", (s * 0.548, 0, 0.955), 0.066, 0.015, m_knit, axis="X") for s in (1, -1)]
hem = torus("Hem", (0, -0.004, 0.705), 0.162, 0.013, m_knit, scale=(1, 0.8, 1))

# sneakers
m_shoe = material("Shoes", (0.95, 0.95, 0.96), 0.55, vcol=True)
shoes = []
for s in (1, -1):
    bm = bmesh.new()
    bmesh.ops.create_cube(bm, size=1.0)
    bmesh.ops.subdivide_edges(bm, edges=bm.edges[:], cuts=4, use_grid_fill=True)
    for v in bm.verts:   # round the box into a sneaker
        p = v.co
        q = Vector((p.x, p.y, p.z))
        L = max(abs(q.x), abs(q.y), abs(q.z))
        sph = q.normalized() * 0.5
        v.co = q.lerp(sph, 0.55)
    for v in bm.verts:
        v.co = Vector((v.co.x * 0.115, v.co.y * 0.2, v.co.z * 0.095))
        if v.co.y < 0:   # toe a bit lower & rounder
            v.co.z -= 0.012 * (-v.co.y / 0.1)
    for v in bm.verts:
        v.co += Vector((s * 0.08, -0.035, 0.045))
    o = new_obj(f"Shoe{s}", bm, [m_shoe])
    set_vcol(o, lambda p: (0.55, 0.57, 0.62) if p.z < 0.016 else ((0.86, 0.32, 0.25) if (abs(p.y + 0.035) < 0.03 and p.z > 0.05) else (0.97, 0.97, 0.98)))
    shoes.append(o)

for o in (hem, *cuffs):
    bpy.data.objects.remove(o, do_unlink=True)
body_parts = join([body, collar, *shoes], "Body")

# ============================================================================== HEAD
HC = Vector((0, -0.005, 1.17))       # head centre
head = uv_sphere("Head", 1.0, (0, 0, 0), segs=72, rings=48, mats=[material("FaceSkin", (1, 1, 1), 0.55, vcol=True)])
bm = bmesh.new()
bm.from_mesh(head.data)
for v in bm.verts:
    p = v.co.copy()
    # base cranium: wide, round
    x, y, z = p.x * 0.135, p.y * 0.13, p.z * 0.152
    # chubby cheeks low on the face, small soft chin
    lower = smoothstep(0.1, -0.7, p.z)
    front = smoothstep(0.0, -0.8, p.y)
    x *= 1 + 0.10 * lower * (1 - abs(p.z + 0.35) * 0.6)
    y *= 1 + 0.06 * lower
    chin = smoothstep(-0.55, -1.0, p.z)
    x *= 1 - 0.32 * chin
    y *= 1 - 0.12 * chin
    # flatten the face plane slightly, push forehead forward
    y -= 0.006 * front * smoothstep(-0.2, 0.6, p.z)
    v.co = Vector((x, y, z)) + HC
bm.to_mesh(head.data)
bm.free()
for p in head.data.polygons:
    p.use_smooth = True

# skin with rosy cheeks, a little warmth on the nose and ears
CHEEKS = [Vector((s * 0.078, -0.118, 1.122)) for s in (1, -1)]


def face_color(p):
    c = SKIN
    w = 0.0
    for ck in CHEEKS:
        d = (p - ck).length
        w = max(w, math.exp(-(d / 0.036) ** 2))
    c = lerp3(c, BLUSH, 0.55 * w)
    return c


set_vcol(head, face_color)
bvh_head = BVHTree.FromObject(head, bpy.context.evaluated_depsgraph_get())


def stick(points_xz, offset=0.0012, y0=-1.0, extra_forward=0.0):
    """Project (x, z) points onto the face along +Y; returns 3D points slightly in front of the skin."""
    out = []
    for x, z in points_xz:
        hit = bvh_head.ray_cast(Vector((x, y0, z)), Vector((0, 1, 0)))
        if hit[0] is None:
            out.append(Vector((x, -0.12, z)))
            continue
        loc, nrm = hit[0], hit[1]
        out.append(loc + nrm * offset + Vector((0, -extra_forward, 0)))
    return out


def decal_strip(name, top, bottom, mat, offset, rows=6):
    """Filled area between two (x,z) polylines, projected onto the face (many rows so it hugs the curve)."""
    bm = bmesh.new()
    grid = []
    for r in range(rows + 1):
        t = r / rows
        line = [(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t) for a, b in zip(top, bottom)]
        grid.append([bm.verts.new(p) for p in stick(line, offset)])
    for r in range(rows):
        for i in range(len(top) - 1):
            bm.faces.new((grid[r][i], grid[r][i + 1], grid[r + 1][i + 1], grid[r + 1][i]))
    return new_obj(name, bm, [mat])


# ---- nose: small, round, button
nose = uv_sphere("Nose", 0.0165, (0, -0.146, 1.135), scale=(1.1, 0.8, 0.85), segs=24, rings=16,
                 mats=[material("NoseSkin", (0.96, 0.70, 0.60), 0.5)])

# ---- big open smile: dark mouth, upper teeth, pink lower lip
def smile_curve(w, z0, depth, n=26):
    return [(x, z0 - depth * (1 - (x / w) ** 2)) for x in [(-w + 2 * w * i / (n - 1)) for i in range(n)]]


mz = 1.085
top = [(x, z + 0.004 * (1 - (x / 0.055) ** 2)) for x, z in smile_curve(0.055, mz, 0.0)]
bot = smile_curve(0.055, mz, 0.034)
mouth = decal_strip("Mouth", top, bot, material("MouthIn", (0.32, 0.06, 0.07), 0.6), 0.0011)
teeth_top = [(x, z - 0.0012) for x, z in smile_curve(0.047, mz + 0.0035, -0.001)]
teeth_bot = [(x, z - 0.0095 + 0.004 * (x / 0.046) ** 2) for x, z in teeth_top]
teeth = decal_strip("Teeth", teeth_top, teeth_bot, material("Teeth", (0.97, 0.96, 0.93), 0.25), 0.0016)
tongue_bot = [(x * 0.7, z + 0.0008) for x, z in smile_curve(0.055, mz, 0.034)]
tongue_top = [(x, z + 0.013 * (1 - (x / 0.0385) ** 2)) for x, z in tongue_bot]
tongue = decal_strip("Tongue", tongue_top, tongue_bot, material("Tongue", (0.85, 0.36, 0.38), 0.45), 0.00145)
lip_top = [(x, z - 0.0004) for x, z in smile_curve(0.054, mz, 0.034)]
lip_bot = [(x * 0.96, z - 0.0004 - 0.0085 * max(0.0, 1 - (x / 0.054) ** 2) ** 0.7) for x, z in smile_curve(0.054, mz, 0.034)]
lip = decal_strip("Lip", lip_top, lip_bot, material("Lip", (0.93, 0.50, 0.50), 0.4), 0.0013)
# smile creases at the mouth corners
creases = []
for s in (1, -1):
    t = [(s * (0.058 + 0.004 * i), mz + 0.004 - 0.003 * i) for i in range(5)]
    b = [(s * (0.058 + 0.004 * i), mz + 0.001 - 0.003 * i) for i in range(5)]
    creases.append(decal_strip(f"Crease{s}", t, b, material(f"Crease{s}", (0.80, 0.50, 0.42), 0.6), 0.0009))

# ---- freckles across nose & cheeks
m_freck = material("Freckles", (0.86, 0.56, 0.44), 0.6)
freckles = []
for i in range(22):
    s = random.choice((1, -1))
    x = s * random.uniform(0.022, 0.085)
    z = 1.125 + random.uniform(-0.012, 0.018)
    r = random.uniform(0.0011, 0.0017)
    ring = [(x + r * math.cos(a), z + r * math.sin(a)) for a in [2 * math.pi * k / 8 for k in range(8)]]
    pts = stick(ring, 0.0007)
    bm = bmesh.new()
    vs = [bm.verts.new(p) for p in pts]
    bm.faces.new(vs)
    freckles.append(new_obj(f"Freckle{i}", bm, [m_freck]))

# ---- eyes: big glossy eyeballs, amber iris, highlights, upper lids with lashes
ER = 0.034
EYES = [Vector((s * 0.053, -0.098, 1.178)) for s in (1, -1)]
m_eye = material("Eye", (1, 1, 1), 0.06, tex="iris.png")
m_hi = material("EyeHighlight", (1, 1, 1), 0.2, emit=(1, 1, 1))
m_lid = material("Lid", SKIN, 0.55, linear=True)
m_lash = material("Lash", LASH, 0.6, linear=True)
eye_objs = []
lid_objs = []
look = Matrix.Rotation(math.radians(90), 4, "X")   # sphere pole → -Y (forward)
for i, c in enumerate(EYES):
    s = 1 if c.x > 0 else -1
    # turn each eye slightly outward so the irises sit naturally on the curved face
    turn = Matrix.Rotation(math.radians(3 * s), 4, "Z") @ Matrix.Rotation(math.radians(-3), 4, "X")
    e = uv_sphere(f"Eye{i}", ER, (0, 0, 0), segs=40, rings=40, mats=[m_eye], rot=turn @ look)
    for v in e.data.vertices:
        v.co = v.co + c
    eye_objs.append(e)
    # two highlights (big + small), up-left like the reference
    for j, (dx, dz, rr) in enumerate([(-0.009, 0.011, 0.0055), (0.008, -0.006, 0.0025)]):
        hi = uv_sphere(f"Hi{i}{j}", rr, (c.x + dx, c.y - ER * 0.97, c.z + dz), scale=(1, 0.35, 1), segs=12, rings=8, mats=[m_hi])
        eye_objs.append(hi)
    # upper lid: shell over the top of the eye, rim tilted so the eye looks open & friendly
    bm = bmesh.new()
    bmesh.ops.create_uvsphere(bm, u_segments=40, v_segments=24, radius=ER * 1.07)
    cut = 0.33  # keep above this height (fraction of radius)
    geom = [v for v in bm.verts if v.co.z + 0.25 * v.co.y < ER * 1.07 * cut]
    bmesh.ops.delete(bm, geom=geom, context="VERTS")
    for v in bm.verts:
        v.co += c
    lid = new_obj(f"Lid{i}", bm, [m_lid])
    lid_objs.append(lid)
    # lash line: tube along the lid rim (front half), flaring at the outer corner
    rim = []
    for k in range(25):
        a = math.pi * (0.06 + 0.88 * k / 24)          # front arc
        x = math.cos(a)
        yv = -math.sin(a)
        R = ER * 1.075
        zz = (cut * R - 0.25 * (yv * R))               # on the cut plane
        h = math.sqrt(max(R * R - zz * zz, 1e-9))
        p = Vector((x * h * 0.995, yv * h, zz))
        rim.append(c + p)
    if s < 0:
        rim.reverse()
    cu = bpy.data.curves.new(f"LashC{i}", "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = 0.0024
    cu.bevel_resolution = 2
    sp = cu.splines.new("POLY")
    sp.points.add(len(rim) - 1)
    for k, p in enumerate(rim):
        outer = k / (len(rim) - 1)       # 0 inner → 1 outer corner
        flare = Vector((s * 0.004, 0, 0.004)) * smoothstep(0.7, 1.0, outer)
        sp.points[k].co = (*(p + flare), 1)
        sp.points[k].radius = 0.6 + 1.1 * smoothstep(0.2, 1.0, outer)
    lo = bpy.data.objects.new(f"Lash{i}", cu)
    coll.objects.link(lo)
    lo.data.materials.append(m_lash)
    bpy.context.view_layer.objects.active = lo
    for o in bpy.data.objects:
        o.select_set(False)
    lo.select_set(True)
    bpy.ops.object.convert(target="MESH")
    lid_objs.append(bpy.context.view_layer.objects.active)

# ---- brows: thick soft arches
m_brow = material("Brow", BROW, 0.7, linear=True)
brows = []
for s in (1, -1):
    cu = bpy.data.curves.new(f"BrowC{s}", "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = 0.0042
    cu.bevel_resolution = 3
    sp = cu.splines.new("POLY")
    pts2d = [(s * (0.025 + 0.06 * t), 1.226 + 0.011 * math.sin(math.pi * (0.15 + 0.75 * t)) - 0.004 * t) for t in [k / 10 for k in range(11)]]
    pts = stick(pts2d, 0.0035)
    sp.points.add(len(pts) - 1)
    for k, p in enumerate(pts):
        t = k / (len(pts) - 1)
        sp.points[k].co = (*p, 1)
        sp.points[k].radius = 1.05 - 0.55 * t
    bo = bpy.data.objects.new(f"Brow{s}", cu)
    coll.objects.link(bo)
    bo.data.materials.append(m_brow)
    for o in bpy.data.objects:
        o.select_set(False)
    bo.select_set(True)
    bpy.context.view_layer.objects.active = bo
    bpy.ops.object.convert(target="MESH")
    brows.append(bpy.context.view_layer.objects.active)

# ============================================================================== HAIR
m_hair = material("Hair", (1, 1, 1), 0.42, vcol=True)
hair_objs = []
# scalp cap with a centre part
cap = uv_sphere("HairCap", 1.0, (0, 0, 0), segs=56, rings=36, mats=[m_hair])
bm = bmesh.new()
bm.from_mesh(cap.data)
kill = []
for v in bm.verts:
    p = v.co.copy()
    q = Vector((p.x * 0.146, p.y * 0.142, p.z * 0.16)) + HC + Vector((0, 0.006, 0.012))
    # hairline: open the face (front, below the forehead line)
    if p.y < -0.2 and p.z < 0.62 - 0.55 * abs(p.x) ** 1.5:
        kill.append(v)
    if p.z < -0.35 and p.y < 0.4:
        kill.append(v)
    # centre part groove
    q.z -= 0.004 * math.exp(-(p.x / 0.08) ** 2) * smoothstep(-0.2, 0.6, -p.y) * (p.z > 0)
    v.co = q
bmesh.ops.delete(bm, geom=list(set(kill)), context="VERTS")
bm.to_mesh(cap.data)
bm.free()
for p in cap.data.polygons:
    p.use_smooth = True
hair_objs.append(cap)


def hair_lock(name, pts, r0, r1):
    cu = bpy.data.curves.new(name, "CURVE")
    cu.dimensions = "3D"
    cu.bevel_depth = 1.0
    cu.bevel_resolution = 3
    cu.resolution_u = 3
    sp = cu.splines.new("BEZIER")
    sp.bezier_points.add(len(pts) - 1)
    for k, p in enumerate(pts):
        bp = sp.bezier_points[k]
        bp.co = p
        bp.handle_left_type = bp.handle_right_type = "AUTO"
        t = k / (len(pts) - 1)
        bp.radius = r0 * (0.45 + 0.55 * smoothstep(0.0, 0.3, t)) * (1 - 0.55 * smoothstep(0.55, 1.0, t)) + r1 * 0.0
    o = bpy.data.objects.new(name, cu)
    coll.objects.link(o)
    o.data.materials.append(m_hair)
    for ob in bpy.data.objects:
        ob.select_set(False)
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.convert(target="MESH")
    o = bpy.context.view_layer.objects.active
    for poly in o.data.polygons:
        poly.use_smooth = True
    return o


# Hair: centre part, sweeping away from the face to the sides, then big S-waves to the shoulders.
# Locks are guided by control points that always stay outside the face area.
def wave_lock(start, mid, end, r0, r1, phase, amp=0.018, waves=2.2):
    pts = []
    n = 12
    for k in range(n + 1):
        t = k / n
        # quadratic path start → mid → end
        p = start * (1 - t) ** 2 + mid * 2 * t * (1 - t) + end * t * t
        out = Vector((p.x - HC.x, p.y - HC.y - 0.01, 0))
        out = out.normalized() if out.length > 1e-6 else Vector((1, 0, 0))
        p = p + out * amp * math.sin(phase + t * math.pi * 2 * waves) * smoothstep(0.15, 0.5, t)
        pts.append(p)
    return pts


# front locks: from the part, over the temples, down beside the cheeks
for s in (1, -1):
    for j in range(4):
        st = HC + Vector((s * (0.02 + 0.012 * j), -0.085 + 0.03 * j, 0.128 - 0.006 * j))
        md = HC + Vector((s * (0.15 + 0.008 * j), -0.075 + 0.03 * j, 0.06 - 0.01 * j))
        en = HC + Vector((s * (0.175 + 0.012 * j), -0.03 + 0.03 * j, -0.2 - 0.02 * j))
        hair_objs.append(hair_lock(f"Front{s}{j}", wave_lock(st, md, en, 0.0, 0.0, random.random() * 6.28), 0.034, 0.016))
# side & back locks: from the crown, out and down to the shoulders
n_back = 16
for i in range(n_back):
    a = -math.pi * 0.62 + math.pi * 1.24 * i / (n_back - 1)       # around the back of the head
    side, back = math.sin(a), math.cos(a)
    st = HC + Vector((0.1 * side, 0.1 * back + 0.01, 0.11))
    md = HC + Vector((0.17 * side, 0.16 * back + 0.01, -0.02))
    en = HC + Vector((0.2 * side, 0.15 * back + 0.02, -0.21 - 0.02 * random.random()))
    hair_objs.append(hair_lock(f"Back{i}", wave_lock(st, md, en, 0, 0, random.random() * 6.28, 0.02), 0.046, 0.02))
# inner volume so no gaps show between locks
inner = uv_sphere("HairInner", 1.0, (0, 0, 0), segs=32, rings=20, mats=[m_hair])
bm = bmesh.new()
bm.from_mesh(inner.data)
kill = []
for v in bm.verts:
    p = v.co.copy()
    q = Vector((p.x * 0.165, p.y * 0.15, p.z * 0.2)) + HC + Vector((0, 0.03, -0.04))
    if p.y < -0.2 and p.z > -0.95:
        kill.append(v)
    v.co = q
bmesh.ops.delete(bm, geom=kill, context="VERTS")
bm.to_mesh(inner.data)
bm.free()
for p in inner.data.polygons:
    p.use_smooth = True
hair_objs.append(inner)

hair = join(hair_objs, "Hair")
# colour: darker roots & undersides, warm highlights on the outer curves
cen = HC + Vector((0, 0.01, 0.05))


def hair_color(p):
    d = p - cen
    up = smoothstep(-0.2, 0.15, d.z)
    rim = smoothstep(0.12, 0.2, Vector((d.x, d.y, 0)).length)
    streak = 0.5 + 0.5 * math.sin(d.x * 140 + d.z * 40)
    t = 0.18 + 0.4 * rim * (0.5 + 0.5 * up) + 0.15 * streak * rim
    return lerp3(HAIR, HAIR_HI, min(1.0, t))


set_vcol(hair, hair_color)

# ============================================================================== HEAD ASSEMBLY + BLINK
for o in lid_objs:
    vg = o.vertex_groups.new(name="lid")
    vg.add(list(range(len(o.data.vertices))), 1.0, "REPLACE")
head_all = join([head, nose, mouth, teeth, tongue, lip, *creases, *freckles, *eye_objs, *lid_objs, *brows, hair], "Head")

# Blink: rotate the lids (and lashes) down over the eyes
# sit the head a little lower on the neck (shorter, chunkier kid neck)
DROP = Vector((0, 0, -0.018))
for v in head_all.data.vertices:
    v.co += DROP
EYES = [e + DROP for e in EYES]
head_all.shape_key_add(name="Basis")
kb = head_all.shape_key_add(name="Blink")
lid_idx = head_all.vertex_groups["lid"].index
for v in head_all.data.vertices:
    if any(g.group == lid_idx and g.weight > 0.5 for g in v.groups):
        c = EYES[0] if v.co.x > 0 else EYES[1]
        rel = v.co - c
        R = Matrix.Rotation(math.radians(-92), 3, "X")
        kb.data[v.index].co = c + R @ rel
head_all.vertex_groups.remove(head_all.vertex_groups["lid"])

# ============================================================================== SKELETON (Mixamo names, T-pose)
arm = bpy.data.armatures.new("Armature")
rig = bpy.data.objects.new("Armature", arm)
coll.objects.link(rig)
for o in bpy.data.objects:
    o.select_set(False)
rig.select_set(True)
bpy.context.view_layer.objects.active = rig
bpy.ops.object.mode_set(mode="EDIT")
B = {}


def bone(name, h, t, parent=None):
    b = arm.edit_bones.new(name)
    b.head = h
    b.tail = t
    if parent:
        b.parent = B[parent]
        b.use_connect = False
    B[name] = b
    return b


bone("Hips", (0, 0, 0.66), (0, 0, 0.74))
bone("Spine", (0, 0, 0.74), (0, 0, 0.82), "Hips")
bone("Spine1", (0, 0, 0.82), (0, 0, 0.9), "Spine")
bone("Spine2", (0, 0, 0.9), (0, 0, 0.97), "Spine1")
bone("Neck", (0, 0, 0.98), (0, 0, 1.06), "Spine2")
bone("Head", (0, 0, 1.06), (0, 0, 1.3), "Neck")
for side, s in (("Left", 1), ("Right", -1)):
    bone(f"{side}Shoulder", (s * 0.03, 0, 0.955), (s * 0.12, 0, 0.955), "Spine2")
    bone(f"{side}Arm", (s * 0.12, 0, 0.955), (s * 0.35, 0, 0.955), f"{side}Shoulder")
    bone(f"{side}ForeArm", (s * 0.35, 0, 0.955), (s * 0.565, 0, 0.955), f"{side}Arm")
    bone(f"{side}Hand", (s * 0.565, 0, 0.955), (s * 0.7, 0, 0.955), f"{side}ForeArm")
    bone(f"{side}UpLeg", (s * 0.078, 0, 0.64), (s * 0.08, 0, 0.36), "Hips")
    bone(f"{side}Leg", (s * 0.08, 0, 0.36), (s * 0.08, 0, 0.07), f"{side}UpLeg")
    bone(f"{side}Foot", (s * 0.08, 0, 0.07), (s * 0.08, -0.1, 0.025), f"{side}Leg")
    bone(f"{side}ToeBase", (s * 0.08, -0.1, 0.025), (s * 0.08, -0.15, 0.025), f"{side}Foot")
bpy.ops.object.mode_set(mode="OBJECT")
segs = {b.name: (b.head_local.copy(), b.tail_local.copy()) for b in arm.bones}


def seg_dist(p, a, b):
    ab = b - a
    t = max(0.0, min(1.0, (p - a).dot(ab) / ab.length_squared))
    return (a + ab * t - p).length, t


def skin_by_distance(ob, allowed, sigma=0.045, top=3):
    groups = {n: ob.vertex_groups.new(name=n) for n in allowed}
    for v in ob.data.vertices:
        p = ob.matrix_world @ v.co
        cand = []
        for n in allowed:
            d, t = seg_dist(p, *segs[n])
            cand.append((d, n))
        cand.sort()
        w = [(math.exp(-((d - cand[0][0]) / sigma) ** 2), n) for d, n in cand[:top]]
        tot = sum(x for x, _ in w)
        for x, n in w:
            if x / tot > 0.02:
                groups[n].add([v.index], x / tot, "REPLACE")
    ob.modifiers.new("Armature", "ARMATURE").object = rig
    ob.parent = rig


body_bones = [b.name for b in arm.bones if b.name != "Head"]
skin_by_distance(body_parts, body_bones)
vg = head_all.vertex_groups.new(name="Head")
vg.add(list(range(len(head_all.data.vertices))), 1.0, "REPLACE")
head_all.modifiers.new("Armature", "ARMATURE").object = rig
head_all.parent = rig

# ============================================================================== EXPORT
os.makedirs(os.path.dirname(OUT), exist_ok=True)
tris = sum(len(p.vertices) - 2 for o in (body_parts, head_all) for p in o.data.polygons)
bpy.ops.export_scene.gltf(
    filepath=OUT,
    export_format="GLB",
    export_skins=True,
    export_morph=True,
    export_morph_normal=False,
    export_animations=False,
    export_yup=True,
    export_vertex_color="ACTIVE",
)
bpy.ops.wm.save_as_mainfile(filepath=os.path.join(HERE, "kid.blend"))
print(f"KID OK  triangles~{tris}  size={os.path.getsize(OUT) / 1e6:.2f} MB")
