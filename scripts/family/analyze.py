"""
Run from the project folder:  python3 scripts/family/analyze.py  (needs numpy, scipy, scikit-image, pillow)
Step 1: cut out each character, find joints from the silhouette, build depth + skin weights.
Outputs per character: <name>.npz (mesh grid data) + <name>_tex.png (front|back atlas) + joints overlay.
"""
import json
import sys

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage as ndi
from skimage.graph import MCP_Geometric

import os
HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "family.png")
MASK = os.path.join(HERE, "family_mask.png")  # made with rembg (isnet-general-use)
OUT = os.path.join(HERE, "build") + "/"
os.makedirs(OUT, exist_ok=True)
CHARS = [  # name, column range in the picture, real height (m)
    ("dad", (133, 673), 1.80),
    ("mom", (780, 1293), 1.66),
    ("girl", (1427, 1830), 1.36),
    ("boy", (1996, 2403), 1.33),
]
MANUAL = {
    "dad": dict(headtop=(275, 10), neck=(275, 300), chest=(280, 560), pelvis=(280, 760),
                shoulder_R=(115, 345), shoulder_L=(440, 345), elbow_R=(75, 555), elbow_L=(480, 555),
                wrist_R=(45, 760), wrist_L=(510, 760), handend_R=(40, 895), handend_L=(525, 895),
                hip_R=(215, 790), hip_L=(350, 790), knee_R=(215, 1040), knee_L=(355, 1040),
                ankle_R=(200, 1280), ankle_L=(380, 1280)),
    "mom": dict(headtop=(265, 10), neck=(265, 300), chest=(265, 520), pelvis=(265, 760),
                shoulder_R=(150, 375), shoulder_L=(385, 375), elbow_R=(90, 545), elbow_L=(450, 545),
                wrist_R=(40, 710), wrist_L=(495, 710), handend_R=(30, 820), handend_L=(510, 820),
                hip_R=(210, 790), hip_L=(330, 790), knee_R=(205, 1000), knee_L=(335, 1000),
                ankle_R=(225, 1215), ankle_L=(315, 1215)),
    "girl": dict(headtop=(210, 10), neck=(210, 265), chest=(212, 420), pelvis=(212, 565),
                 shoulder_R=(110, 300), shoulder_L=(305, 300), elbow_R=(65, 440), elbow_L=(360, 440),
                 wrist_R=(35, 570), wrist_L=(385, 570), handend_R=(25, 660), handend_L=(400, 660),
                 hip_R=(165, 590), hip_L=(260, 590), knee_R=(165, 760), knee_L=(265, 760),
                 ankle_R=(160, 945), ankle_L=(265, 945)),
    "boy": dict(headtop=(215, 10), neck=(210, 262), chest=(212, 440), pelvis=(212, 610),
                shoulder_R=(110, 320), shoulder_L=(310, 320), elbow_R=(65, 460), elbow_L=(355, 460),
                wrist_R=(35, 590), wrist_L=(390, 590), handend_R=(25, 680), handend_L=(405, 680),
                hip_R=(170, 640), hip_L=(255, 640), knee_R=(165, 790), knee_L=(262, 790),
                ankle_R=(160, 935), ankle_L=(270, 935)),
}
GRID_H = 300  # mesh rows over the full character height

img = np.array(Image.open(SRC).convert("RGB"))
mask_full = np.array(Image.open(MASK)) > 128


def runs(row):
    r, on, s = [], False, 0
    for x, v in enumerate(row):
        if v and not on:
            s, on = x, True
        if not v and on:
            r.append((s, x))
            on = False
    if on:
        r.append((s, len(row)))
    return r


def analyze(name, cols, height_m):
    x0, x1 = cols
    x0, x1 = x0 - 12, x1 + 12
    m = mask_full[:, x0:x1].copy()
    ys = np.where(m.any(1))[0]
    y0, y1 = ys.min() - 6, ys.max() + 6
    m = m[y0:y1]
    rgb = img[y0:y1, x0:x1].copy()
    # keep only the largest component (drops stray specks)
    lab, n = ndi.label(m)
    sizes = ndi.sum(m, lab, range(1, n + 1))
    m = lab == (1 + int(np.argmax(sizes)))
    m = ndi.binary_fill_holes(m)
    H, W = m.shape
    top = np.where(m.any(1))[0].min()
    bot = np.where(m.any(1))[0].max()
    hpx = bot - top
    cx = (np.where(m[int(top + 0.5 * hpx)])[0].mean())

    joints = dict(MANUAL[name])
    neck = joints["neck"][1]
    armpit = joints["chest"][1] - 0.1 * hpx
    crotch = joints["pelvis"][1] + 0.03 * hpx
    cx = joints["pelvis"][0]

    # --- texture atlas: front (picture) | back (painted)
    front = rgb.copy()
    # Edge pixels are blended with the grey background: take colours only from a few pixels inside
    # the outline and spread them outward, so the side "rim" of the 3D body is clean.
    m_in = ndi.binary_erosion(m, iterations=4)
    idx = ndi.distance_transform_edt(~m_in, return_distances=False, return_indices=True)
    front = front[idx[0], idx[1]]
    back = front.copy()
    # back of the head: hair everywhere above the neck (except outside the head)
    hair_band = front[top + 2 : top + max(6, int(0.035 * hpx)), :]
    hair_mask_band = m[top + 2 : top + max(6, int(0.035 * hpx)), :]
    hair_col = np.median(hair_band[hair_mask_band], axis=0)
    yy, xx = np.mgrid[0:H, 0:W]
    rng = np.random.default_rng(1)
    head_rows = yy < neck + 0.02 * hpx
    streak = (np.sin(xx * 0.55 + rng.normal(0, 0.4, (H, W)).cumsum(0) * 0.02) * 0.08)[..., None]
    shade = (0.85 + 0.15 * (1 - (yy - top) / max(1, neck - top)))[..., None]
    hair_tex = np.clip(hair_col[None, None, :] * (shade + streak), 0, 255)
    is_skin_or_face = head_rows & m
    back[is_skin_or_face] = hair_tex[is_skin_or_face]
    # neck stays skin coloured below the hair line
    # Mom: the cardigan is closed at the back (no blue top)
    if name == "mom":
        torso_zone = (yy > neck) & (yy < crotch) & (np.abs(xx - cx) < 0.12 * W)
        bluish = (front[..., 2].astype(int) - front[..., 0].astype(int)) > 25
        cardi = np.median(front[(yy > armpit) & (yy < crotch) & (np.abs(xx - cx) > 0.14 * W) & (np.abs(xx - cx) < 0.2 * W) & m], axis=0)
        sel = torso_zone & bluish
        back[sel] = cardi
    back = np.array(Image.fromarray(back.astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2)))
    atlas = np.concatenate([front, back], axis=1).astype(np.uint8)
    scale = min(1.0, 1024 / H)
    Image.fromarray(atlas).resize((int(atlas.shape[1] * scale), int(H * scale)), Image.LANCZOS).save(f"{OUT}{name}_tex.png")

    # --- mesh grid (downsampled mask) + depth
    g = GRID_H / hpx
    Hs, Ws = int(H * g), int(W * g)
    ms = np.array(Image.fromarray(m.astype(np.uint8) * 255).resize((Ws, Hs), Image.BILINEAR)) > 127
    dt = ndi.distance_transform_edt(ms)
    Rloc = ndi.grey_dilation(dt, size=(9, 9))
    Rloc = np.maximum(Rloc, dt)
    depth = np.sqrt(np.clip(2 * Rloc * dt - dt * dt, 0, None))
    depth = ndi.gaussian_filter(depth, 2.2) * ms
    # body-part depth factors: round head, slimmer torso, round limbs
    ys_s = np.arange(Hs)[:, None] / g
    neck_s = neck
    fac = np.where(ys_s < neck_s, 0.95, 0.72)
    depth *= fac
    # --- skin weights: geodesic distance inside the silhouette from each bone segment
    m_px = height_m / hpx            # metres per original pixel
    bones = {
        "Hips": ("pelvis", None), "Spine1": ("pelvis", "chest"), "Spine2": ("chest", "neck"), "Neck": ("neck", None), "Head": ("neck", "headtop"),
        "RightArm": ("shoulder_R", "elbow_R"), "RightForeArm": ("elbow_R", "wrist_R"), "RightHand": ("wrist_R", "handend_R"),
        "LeftArm": ("shoulder_L", "elbow_L"), "LeftForeArm": ("elbow_L", "wrist_L"), "LeftHand": ("wrist_L", "handend_L"),
        "RightUpLeg": ("hip_R", "knee_R"), "RightLeg": ("knee_R", "ankle_R"), "RightFoot": ("ankle_R", None),
        "LeftUpLeg": ("hip_L", "knee_L"), "LeftLeg": ("knee_L", "ankle_L"), "LeftFoot": ("ankle_L", None),
    }
    cost = np.where(ms, 1.0, 1e6)
    dists = {}
    for bn, (a, b) in bones.items():
        pa = np.array(joints[a]) * g
        pb = np.array(joints[b]) * g if b else pa
        if bn == "Hips":
            pb = np.array([joints["pelvis"][0], joints["pelvis"][1] - 0.04 * hpx]) * g
        if bn.endswith("Foot"):
            pb = np.array([pa[0], (bot) * g])
        seeds = []
        for t in np.linspace(0, 1, 20):
            p = pa + (pb - pa) * t
            yv, xv = int(round(p[1])), int(round(p[0]))
            if 0 <= yv < Hs and 0 <= xv < Ws and ms[yv, xv]:
                seeds.append((yv, xv))
        if not seeds:
            yv, xv = int(round(pa[1])), int(round(pa[0]))
            seeds = [(min(max(yv, 0), Hs - 1), min(max(xv, 0), Ws - 1))]
        mcp = MCP_Geometric(cost)
        d, _ = mcp.find_costs(seeds)
        dists[bn] = d
    names = list(bones)
    D = np.stack([dists[n] for n in names], -1)      # (Hs, Ws, B)
    sigma = 0.035 * GRID_H                            # ~3.5% of body height
    order = np.argsort(D, -1)[..., :3]
    dsort = np.take_along_axis(D, order, -1)
    w = np.exp(-(((dsort - dsort[..., :1]) / sigma) ** 2))
    w /= w.sum(-1, keepdims=True)

    np.savez_compressed(
        f"{OUT}{name}.npz",
        mask=ms, depth=depth, order=order, weights=w, bone_names=np.array(names),
        g=g, m_px=m_px, top=top, bot=bot, cx=cx, W=W, H=H,
        joints=json.dumps({k: [float(v[0]), float(v[1])] for k, v in joints.items()}),
    )
    # overlay for checking
    ov = Image.fromarray(rgb).convert("RGB")
    d = ImageDraw.Draw(ov)
    for k, (x, y) in joints.items():
        d.ellipse([x - 7, y - 7, x + 7, y + 7], fill=(255, 0, 80))
    for a, b in [("shoulder_R", "elbow_R"), ("elbow_R", "wrist_R"), ("wrist_R", "handend_R"), ("shoulder_L", "elbow_L"), ("elbow_L", "wrist_L"), ("wrist_L", "handend_L"),
                 ("hip_R", "knee_R"), ("knee_R", "ankle_R"), ("hip_L", "knee_L"), ("knee_L", "ankle_L"), ("pelvis", "chest"), ("chest", "neck"), ("neck", "headtop")]:
        d.line([joints[a], joints[b]], fill=(0, 220, 255), width=5)
    ov.save(f"{OUT}{name}_joints.png")
    print(name, "H", H, "W", W, "hpx", hpx, "armpit", armpit, "crotch", crotch, "neck", neck, "grid", Hs, Ws)


for c in CHARS:
    analyze(*c)
