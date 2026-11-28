/**
 * Pitched roofs for houses.
 * Fits the footprint's minimum-area oriented rectangle, then builds a gable or hip roof
 * (with eave overhang, shingle texture and an occasional brick chimney) on top of the walls.
 * Footprints that are too irregular or too big for a believable single roof stay flat.
 */
import * as THREE from 'three';

function convexHull(points) {
  const pts = points.map((p) => [p.x, p.z]).sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  if (pts.length < 3) return pts;
  const cross = (o, a, b) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower = [];
  for (const p of pts) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], p) <= 0) lower.pop();
    lower.push(p);
  }
  const upper = [];
  for (let i = pts.length - 1; i >= 0; i--) {
    const p = pts[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], p) <= 0) upper.pop();
    upper.push(p);
  }
  upper.pop();
  lower.pop();
  return lower.concat(upper);
}

function polygonArea(poly) {
  let a = 0;
  for (let i = 0; i < poly.length; i++) {
    const p = poly[i];
    const q = poly[(i + 1) % poly.length];
    a += p.x * q.z - q.x * p.z;
  }
  return Math.abs(a) / 2;
}

/** Minimum-area oriented bounding rectangle: { cx, cz, ux, uz, halfL, halfW } with u = long axis. */
export function orientedRect(polygon) {
  const hull = convexHull(polygon);
  let best = null;
  for (let i = 0; i < hull.length; i++) {
    const a = hull[i];
    const b = hull[(i + 1) % hull.length];
    const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
    if (len < 1e-6) continue;
    const ux = (b[0] - a[0]) / len;
    const uz = (b[1] - a[1]) / len;
    let minU = Infinity, maxU = -Infinity, minV = Infinity, maxV = -Infinity;
    for (const p of hull) {
      const u = p[0] * ux + p[1] * uz;
      const v = -p[0] * uz + p[1] * ux;
      minU = Math.min(minU, u); maxU = Math.max(maxU, u);
      minV = Math.min(minV, v); maxV = Math.max(maxV, v);
    }
    const area = (maxU - minU) * (maxV - minV);
    if (!best || area < best.area) best = { area, ux, uz, minU, maxU, minV, maxV };
  }
  if (!best) return null;
  let { ux, uz } = best;
  let halfL = (best.maxU - best.minU) / 2;
  let halfW = (best.maxV - best.minV) / 2;
  const cu = (best.maxU + best.minU) / 2;
  const cv = (best.maxV + best.minV) / 2;
  const cx = cu * ux - cv * uz;
  const cz = cu * uz + cv * ux;
  if (halfW > halfL) {
    // make u the long axis
    [halfL, halfW] = [halfW, halfL];
    [ux, uz] = [-uz, ux];
  }
  return { cx, cz, ux, uz, halfL, halfW, area: best.area };
}

let shingleTex = null;
function getShingleTexture() {
  if (shingleTex) return shingleTex;
  const c = document.createElement('canvas');
  c.width = 128;
  c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 128, 128);
  let seed = 3;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  for (let row = 0; row < 8; row++) {
    const y = row * 16;
    const off = (row % 2) * 10;
    for (let x = -off; x < 128; x += 20) {
      const g = 205 + Math.floor(rnd() * 50);
      ctx.fillStyle = `rgb(${g},${g},${g})`;
      ctx.fillRect(x + 1, y + 1, 18, 14);
    }
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fillRect(0, y + 13, 128, 3);
  }
  shingleTex = new THREE.CanvasTexture(c);
  shingleTex.colorSpace = THREE.SRGBColorSpace;
  shingleTex.wrapS = shingleTex.wrapT = THREE.RepeatWrapping;
  shingleTex.anisotropy = 4;
  return shingleTex;
}

const ROOF_COLORS = [0x3f4652, 0x4b3a33, 0x5a5f66, 0x2f3b45, 0x6b4a3a, 0x3e4a3d, 0x52555c];
const roofMatCache = new Map();
function roofMaterial(color) {
  if (!roofMatCache.has(color)) {
    roofMatCache.set(
      color,
      new THREE.MeshStandardMaterial({ color, map: getShingleTexture(), roughness: 0.9, side: THREE.DoubleSide })
    );
    roofMatCache.get(color).userData.sharedMap = true;
    roofMatCache.get(color).userData.shared = true;
  }
  return roofMatCache.get(color);
}
const chimneyMat = new THREE.MeshStandardMaterial({ color: 0x8f4a36, roughness: 0.9 });
const chimneyCapMat = new THREE.MeshStandardMaterial({ color: 0x3a3a3a, roughness: 0.8 });
const fasciaMat = new THREE.MeshStandardMaterial({ color: 0xf3efe6, roughness: 0.7 });
for (const m of [chimneyMat, chimneyCapMat, fasciaMat]) m.userData.shared = true;

/**
 * Returns a Group with the roof (and chimney) for a house, or null if a flat roof suits better.
 * wallMat is reused for gable-end triangles so they match the siding/brick colour.
 */
export function buildHouseRoof(b, wallTopY, gableMat) {
  const poly = b.polygon;
  if (!poly || poly.length < 3) return null;
  const r = orientedRect(poly);
  if (!r) return null;
  const footprint = polygonArea(poly);
  const coverage = footprint / Math.max(1e-6, r.area);
  if (coverage < 0.68 || r.halfW > 8.5 || footprint > 420 || r.halfW < 1.6) return null;

  const id = Math.abs(b.id || 0);
  const over = 0.38;
  const L = r.halfL + over;
  const W = r.halfW + over;
  const pitch = THREE.MathUtils.degToRad(b.floors === 1 ? 30 : 34 + (id % 3) * 3);
  const rise = Math.min(4.6, r.halfW * Math.tan(pitch));
  const hip = id % 5 < 2 || r.halfL - r.halfW < 1.2; // ~40% hip roofs; near-square → hip
  const ridgeHalf = hip ? Math.max(0, r.halfL - r.halfW) : L;

  // Local frame: x along ridge (u), z across (v), y up. Eaves sit at y = 0.
  const pos = [];
  const uv = [];
  const tri = (a, b2, c, uva, uvb, uvc) => {
    pos.push(...a, ...b2, ...c);
    uv.push(...uva, ...uvb, ...uvc);
  };
  const slopeLen = Math.hypot(W, rise);
  const S = 0.5; // texture repeats per metre (one canvas = 2 m)
  // Two long slopes (trapezoids for hip, rectangles for gable)
  for (const side of [-1, 1]) {
    const e0 = [-L, 0, side * W];
    const e1 = [L, 0, side * W];
    const r0 = [-ridgeHalf, rise, 0];
    const r1 = [ridgeHalf, rise, 0];
    const uvE0 = [-L * S, 0];
    const uvE1 = [L * S, 0];
    const uvR0 = [-ridgeHalf * S, slopeLen * S];
    const uvR1 = [ridgeHalf * S, slopeLen * S];
    if (side === 1) {
      tri(e0, e1, r1, uvE0, uvE1, uvR1);
      tri(e0, r1, r0, uvE0, uvR1, uvR0);
    } else {
      tri(e1, e0, r0, uvE1, uvE0, uvR0);
      tri(e1, r0, r1, uvE1, uvR0, uvR1);
    }
  }
  const roofGeo = new THREE.BufferGeometry();
  const gablePos = [];
  if (hip) {
    // Hip ends: triangles from the two eave corners up to the ridge end
    const endLen = Math.hypot(L - ridgeHalf, rise);
    for (const end of [-1, 1]) {
      const a = [end * L, 0, -W];
      const c = [end * L, 0, W];
      const t = [end * ridgeHalf, rise, 0];
      if (end === 1) tri(a, t, c, [-W * S, 0], [0, endLen * S], [W * S, 0]);
      else tri(c, t, a, [W * S, 0], [0, endLen * S], [-W * S, 0]);
    }
  } else {
    // Gable ends: wall-coloured triangles set back to the wall line
    for (const end of [-1, 1]) {
      const x = end * r.halfL;
      gablePos.push(x, 0, -r.halfW, x, rise * (r.halfW / W), 0, x, 0, r.halfW);
    }
  }
  roofGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  roofGeo.setAttribute('uv', new THREE.Float32BufferAttribute(uv, 2));
  roofGeo.computeVertexNormals();

  const g = new THREE.Group();
  const roof = new THREE.Mesh(roofGeo, roofMaterial(ROOF_COLORS[id % ROOF_COLORS.length]));
  roof.castShadow = true;
  roof.receiveShadow = true;
  g.add(roof);

  // Thin fascia board along the eaves
  for (const side of [-1, 1]) {
    const f = new THREE.Mesh(new THREE.BoxGeometry(L * 2, 0.16, 0.06), fasciaMat);
    f.position.set(0, -0.06, side * W);
    g.add(f);
  }

  if (gablePos.length) {
    const gg = new THREE.BufferGeometry();
    gg.setAttribute('position', new THREE.Float32BufferAttribute(gablePos, 3));
    gg.computeVertexNormals();
    const gm = new THREE.Mesh(gg, gableMat);
    gm.castShadow = true;
    g.add(gm);
  }

  // Chimney on ~45% of houses
  if (id % 9 < 4) {
    const cx = (((id >> 3) % 2) * 2 - 1) * Math.min(r.halfL * 0.55, ridgeHalf + 0.6 || r.halfL * 0.5);
    const cz = r.halfW * 0.35 * (((id >> 4) % 2) * 2 - 1);
    const roofY = rise * (1 - Math.abs(cz) / W);
    const h = rise - roofY + 1.0;
    const ch = new THREE.Mesh(new THREE.BoxGeometry(0.7, h + 0.4, 0.7), chimneyMat);
    ch.position.set(cx, roofY + (h + 0.4) / 2 - 0.4, cz);
    ch.castShadow = true;
    g.add(ch);
    const cap = new THREE.Mesh(new THREE.BoxGeometry(0.86, 0.14, 0.86), chimneyCapMat);
    cap.position.set(cx, roofY + h + 0.07, cz);
    g.add(cap);
  }

  g.position.set(r.cx, wallTopY, r.cz);
  g.rotation.y = Math.atan2(-r.uz, r.ux); // local +x → (ux, uz)
  g.userData.roofRise = rise;
  return g;
}
