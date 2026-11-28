# Procedural textures for the stylised kid: iris band, knit sweater (colour + normal), denim
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'tex') + '/'
os.makedirs(out, exist_ok=True)

# --- Iris band for a UV sphere whose +pole looks forward (rows near the top = front of the eye)
W, H = 256, 512
img = np.zeros((H, W, 3), np.float32)
img[:] = [0.96, 0.94, 0.92]                       # sclera
rng = np.random.default_rng(3)
for r in range(H):
    a = r / H * 180.0                              # degrees from the front pole
    if a < 13:   c = [0.04, 0.025, 0.02]          # pupil
    elif a < 36:  # iris: warm amber, lighter toward the middle, fibres
        t = (a - 13) / 23
        base = np.array([0.78, 0.47, 0.18]) * (1.05 - 0.25 * t) + np.array([0.15, 0.05, 0.0]) * t
        c = base
    elif a < 39.5:  c = [0.22, 0.11, 0.05]           # limbal ring
    else:         c = None
    if c is not None:
        img[r, :] = c
# radial fibres in the iris
fib = rng.normal(0, 0.06, (1, W)).repeat(H, 0)
mask = (np.arange(H) / H * 180 >= 13) & (np.arange(H) / H * 180 < 36)
img[mask] *= (1 + fib[mask][:, :, None])
# soften the sclera toward the back
for r in range(H):
    a = r / H * 180
    if a > 50: img[r] *= 1 - min(0.12, (a - 50) / 400)
Image.fromarray((np.clip(img, 0, 1) * 255).astype(np.uint8)).save(out + 'iris.png')

# --- Knit sweater: vertical columns of V-stitches
T = 256
x = np.arange(T)[None, :].repeat(T, 0) / T
y = np.arange(T)[:, None].repeat(T, 1) / T
cols, rows = 8, 10
u = (x * cols) % 1.0
v = (y * rows) % 1.0
# each stitch: two slanted lobes forming a V
d = np.abs(u - 0.5)
lobe = np.clip(1 - np.abs((v - (0.25 + d * 0.9))) / 0.32, 0, 1) * np.clip(1 - (d / 0.5) ** 4, 0, 1)
height = lobe ** 0.7
height = Image.fromarray((height * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.2))
h = np.asarray(height).astype(np.float32) / 255
base = np.array([0.86, 0.55, 0.16])
col = base * (0.72 + 0.32 * h)[..., None]
col += rng.normal(0, 0.015, col.shape)
Image.fromarray((np.clip(col, 0, 1) * 255).astype(np.uint8)).save(out + 'knit_color.png')
gy, gx = np.gradient(h)
n = np.dstack([-gx * 6, gy * 6, np.ones_like(h)])
n /= np.linalg.norm(n, axis=2, keepdims=True)
Image.fromarray(((n * 0.5 + 0.5) * 255).astype(np.uint8)).save(out + 'knit_normal.png')

# --- Denim twill
d = ((np.arange(T)[None, :] + np.arange(T)[:, None]) % 6 < 3).astype(np.float32)
den = np.array([0.24, 0.36, 0.58]) * (0.85 + 0.15 * d)[..., None]
den *= (1 + rng.normal(0, 0.05, (T, T)))[..., None]
Image.fromarray((np.clip(den, 0, 1) * 255).astype(np.uint8)).save(out + 'denim.png')
print('ok')
