/**
 * Parking lots & street parking
 * - Parking lots: painted stalls laid out along OSM `service=parking_aisle` ways, plus rows
 *   filled into `amenity=parking` outlines. About 2/3 of stalls get a parked car.
 * - Street parking: cars parked against the curb on quiet residential side streets, kept clear
 *   of intersections, driveways and crosswalks (and off the streets that have moving traffic).
 * Cars are drawn with InstancedMesh (a handful of draw calls per chunk), and each car exports
 * two small collider circles so the player can't walk through them.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { pointInPolygon2D } from '../geo.js';

const STALL_W = 2.7;
const STALL_D = 5.2;
const ROW_PITCH = STALL_D * 2 + 6.2; // two rows of stalls + a 6.2 m aisle
const STREET_PARKING_HIGHWAYS = new Set(['residential', 'unclassified', 'living_street']);
// Streets where TrafficSystem drives cars — parked cars there would block moving traffic.
const TRAFFIC_STREETS = /(cline|paisley|marion|king street)/i;

const CAR_COLORS = [
  0xf4f4f5, 0xe5e7eb, 0x9ca3af, 0x6b7280, 0x1f2937, 0x111827, 0x1e3a8a, 0x2563eb,
  0xb91c1c, 0x7f1d1d, 0xd6c7a1, 0x166534, 0x0f766e, 0xf59e0b,
];
const CAR_TYPES = [
  { sx: 1.0, sy: 1.0, sz: 1.0 }, // sedan
  { sx: 1.04, sy: 1.16, sz: 1.04 }, // SUV
  { sx: 0.97, sy: 1.02, sz: 0.88 }, // hatchback
  { sx: 1.0, sy: 1.08, sz: 1.08 }, // minivan
];

// Small deterministic hash → [0,1)
function hash01(a, b = 0, c = 0) {
  let h = Math.imul(Math.floor(a * 73.13) ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(Math.floor(b * 19.7) + 7, 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 15), 0x27d4eb2d) ^ Math.imul(Math.floor(c) + 13, 0x165667b1);
  h ^= h >>> 13;
  return ((h >>> 0) % 100000) / 100000;
}

function distToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const l2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / l2));
  const qx = ax + dx * t;
  const qz = az + dz * t;
  return Math.hypot(px - qx, pz - qz);
}

/** Shared geometries for the instanced parked-car parts (car faces +Z, sits on y = 0). */
function carPartGeometries() {
  const body = new THREE.BoxGeometry(1.82, 0.62, 4.25);
  body.translate(0, 0.62, 0);
  const cabin = new THREE.BoxGeometry(1.6, 0.56, 2.2);
  cabin.translate(0, 1.2, -0.2);
  const glass = new THREE.BoxGeometry(1.64, 0.38, 2.08);
  glass.translate(0, 1.18, -0.2);
  const wheel = new THREE.CylinderGeometry(0.33, 0.33, 0.24, 10);
  wheel.rotateZ(Math.PI / 2);
  wheel.translate(0, 0.33, 0);
  const lightF = new THREE.BoxGeometry(1.5, 0.14, 0.05);
  lightF.translate(0, 0.72, 2.13);
  const lightB = new THREE.BoxGeometry(1.5, 0.14, 0.05);
  lightB.translate(0, 0.72, -2.13);
  return { body, cabin, glass, wheel, lightF, lightB };
}

const WHEEL_OFFSETS = [
  [-0.86, 1.32],
  [0.86, 1.32],
  [-0.86, -1.32],
  [0.86, -1.32],
];

function buildCarInstances(cars) {
  const group = new THREE.Group();
  group.name = 'parkedCars';
  if (!cars.length) return group;
  const g = carPartGeometries();
  const n = cars.length;
  const mk = (geo, mat, count) => {
    const m = new THREE.InstancedMesh(geo, mat, count);
    m.castShadow = true;
    m.receiveShadow = true;
    group.add(m);
    return m;
  };
  const body = mk(g.body, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.38, metalness: 0.15 }), n);
  const cabin = mk(g.cabin, new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4, metalness: 0.15 }), n);
  const glass = mk(g.glass, new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.15, metalness: 0.5 }), n);
  const wheels = mk(g.wheel, new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.9 }), n * 4);
  const lf = mk(g.lightF, new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.3, emissive: 0x3f3a10 }), n);
  const lb = mk(g.lightB, new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.3, emissive: 0x3a0a0a }), n);
  [glass, wheels, lf, lb].forEach((m) => (m.castShadow = false));

  const m4 = new THREE.Matrix4();
  const wm = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const col = new THREE.Color();
  cars.forEach((c, i) => {
    const type = CAR_TYPES[c.type % CAR_TYPES.length];
    q.setFromAxisAngle(up, c.yaw);
    m4.compose(new THREE.Vector3(c.x, c.y || 0.05, c.z), q, new THREE.Vector3(type.sx, type.sy, type.sz));
    body.setMatrixAt(i, m4);
    cabin.setMatrixAt(i, m4);
    glass.setMatrixAt(i, m4);
    lf.setMatrixAt(i, m4);
    lb.setMatrixAt(i, m4);
    col.setHex(CAR_COLORS[c.color % CAR_COLORS.length]);
    body.setColorAt(i, col);
    cabin.setColorAt(i, col);
    WHEEL_OFFSETS.forEach(([wx, wz], k) => {
      wm.makeTranslation(wx, 0, wz);
      wheels.setMatrixAt(i * 4 + k, m4.clone().multiply(wm));
    });
  });
  for (const m of group.children) {
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
    m.computeBoundingSphere();
  }
  return group;
}

/**
 * Builds parking lots + street parking for one chunk bucket.
 * Returns a Group whose userData.parkedCarColliders lists { x, z, r } circles.
 */
export function buildParking(bucket, allRoads) {
  const group = new THREE.Group();
  group.name = 'parking';
  const roads = allRoads && allRoads.length ? allRoads : bucket.roads;
  const buildings = bucket.buildings || [];
  const crosswalks = bucket.crosswalks || [];
  const lots = bucket.parkingLots || [];

  const publicRoads = roads.filter((r) => r.highway !== 'service');
  const insideBuilding = (x, z) => {
    for (const b of buildings) {
      if (b.bbox && (x < b.bbox.minX - 1 || x > b.bbox.maxX + 1 || z < b.bbox.minZ - 1 || z > b.bbox.maxZ + 1)) continue;
      if (pointInPolygon2D(x, z, b.polygon)) return true;
    }
    return false;
  };
  const nearPublicRoad = (x, z, pad) => {
    for (const r of publicRoads) {
      const half = (r.width || 6) / 2 + (r.sidewalkWidth || 1.8) + pad;
      for (let i = 0; i < r.points.length - 1; i++) {
        const a = r.points[i];
        const b = r.points[i + 1];
        if (distToSegment(x, z, a.x, a.z, b.x, b.z) < half) return true;
      }
    }
    return false;
  };

  const footways = bucket.footways || [];
  const nearFootway = (x, z, d) => {
    for (const f of footways) {
      for (let i = 0; i < f.points.length - 1; i++) {
        const a = f.points[i];
        const b = f.points[i + 1];
        if (distToSegment(x, z, a.x, a.z, b.x, b.z) < d) return true;
      }
    }
    return false;
  };

  const stalls = []; // { x, z, ux, uz, nx, nz } u = along aisle, n = stall depth direction
  const cars = [];
  const lotPolys = lots.map((l) => l.polygon);
  const inAnyLot = (x, z) => lotPolys.some((p) => pointInPolygon2D(x, z, p));
  const stallFree = (x, z) => !stalls.some((s) => Math.abs(s.x - x) < 2.3 && Math.abs(s.z - z) < 2.3 && Math.hypot(s.x - x, s.z - z) < 2.3);

  function tryStall(cx, cz, ux, uz, nx, nz, requirePoly) {
    const hw = STALL_W / 2;
    const hd = STALL_D / 2;
    const corners = [
      [cx + ux * hw + nx * hd, cz + uz * hw + nz * hd],
      [cx - ux * hw + nx * hd, cz - uz * hw + nz * hd],
      [cx + ux * hw - nx * hd, cz + uz * hw - nz * hd],
      [cx - ux * hw - nx * hd, cz - uz * hw - nz * hd],
    ];
    if (requirePoly && !corners.every(([x, z]) => pointInPolygon2D(x, z, requirePoly))) return false;
    if (corners.some(([x, z]) => insideBuilding(x, z)) || insideBuilding(cx, cz)) return false;
    if (nearPublicRoad(cx, cz, 0.5)) return false;
    if (nearFootway(cx, cz, 1.0 + STALL_D / 2) && corners.some(([x, z]) => nearFootway(x, z, 1.1))) return false;
    if (!stallFree(cx, cz)) return false;
    stalls.push({ x: cx, z: cz, ux, uz, nx, nz });
    return true;
  }

  // 1) Stalls along real parking aisles
  for (const r of bucket.roads) {
    if (r.highway !== 'service' || r.service !== 'parking_aisle') continue;
    const aisleHalf = Math.max(3.0, (r.width || 3.8) / 2);
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i];
      const b = r.points[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      if (len < STALL_W * 1.5) continue;
      const ux = (b.x - a.x) / len;
      const uz = (b.z - a.z) / len;
      const n0x = -uz;
      const n0z = ux;
      for (const side of [-1, 1]) {
        const nx = n0x * side;
        const nz = n0z * side;
        for (let t = STALL_W * 0.75; t <= len - STALL_W * 0.75; t += STALL_W) {
          const px = a.x + ux * t + nx * (aisleHalf + STALL_D / 2);
          const pz = a.z + uz * t + nz * (aisleHalf + STALL_D / 2);
          tryStall(px, pz, ux, uz, nx, nz, null);
        }
      }
    }
  }

  // 2) Lot outlines without mapped aisles: fill with rows along the longest edge
  for (const lot of lots) {
    const poly = lot.polygon;
    const hasStalls = stalls.some((s) => pointInPolygon2D(s.x, s.z, poly));
    if (hasStalls) continue;
    let best = null;
    for (let i = 0; i < poly.length; i++) {
      const a = poly[i];
      const b = poly[(i + 1) % poly.length];
      const l = Math.hypot(b.x - a.x, b.z - a.z);
      if (!best || l > best.l) best = { a, b, l };
    }
    if (!best) continue;
    const ux = (best.b.x - best.a.x) / best.l;
    const uz = (best.b.z - best.a.z) / best.l;
    const nx = -uz;
    const nz = ux;
    let minU = Infinity, maxU = -Infinity, minN = Infinity, maxN = -Infinity;
    for (const p of poly) {
      const u = (p.x - best.a.x) * ux + (p.z - best.a.z) * uz;
      const v = (p.x - best.a.x) * nx + (p.z - best.a.z) * nz;
      minU = Math.min(minU, u); maxU = Math.max(maxU, u);
      minN = Math.min(minN, v); maxN = Math.max(maxN, v);
    }
    for (let v = minN + STALL_D / 2 + 0.3; v <= maxN; v += ROW_PITCH) {
      for (const [rowV, flip] of [[v, -1], [v + STALL_D + 6.2, 1]]) {
        for (let u = minU + STALL_W; u <= maxU - STALL_W / 2; u += STALL_W) {
          const px = best.a.x + ux * u + nx * rowV;
          const pz = best.a.z + uz * u + nz * rowV;
          tryStall(px, pz, ux, uz, nx * flip, nz * flip, poly);
        }
      }
    }
  }

  // Lot surfaces + painted lines
  const surfaceGeos = [];
  const lineGeos = [];
  // Pave the aisles too (OSM parks / school grounds often overlap lots and would hide them)
  for (const r of bucket.roads) {
    if (r.highway !== 'service' || r.service !== 'parking_aisle') continue;
    const w = Math.max(6.0, r.width || 3.8);
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i];
      const b = r.points[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      if (len < 0.5) continue;
      const strip = new THREE.PlaneGeometry(w, len + w * 0.6);
      strip.rotateX(-Math.PI / 2);
      strip.rotateY(Math.atan2(b.x - a.x, b.z - a.z));
      strip.translate((a.x + b.x) / 2, 0.056, (a.z + b.z) / 2);
      surfaceGeos.push(strip);
    }
  }
  for (const lot of lots) {
    const shape = new THREE.Shape(lot.polygon.map((p) => new THREE.Vector2(p.x, -p.z)));
    const geo = new THREE.ShapeGeometry(shape);
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0.058, 0);
    surfaceGeos.push(geo);
  }
  const yaw = (ux, uz) => Math.atan2(ux, uz);
  for (const s of stalls) {
    // Asphalt pad under each stall (covers aisle-only lots that have no mapped outline)
    const pad = new THREE.PlaneGeometry(STALL_W + 0.05, STALL_D + 0.4);
    pad.rotateX(-Math.PI / 2);
    pad.rotateY(yaw(s.nx, s.nz));
    pad.translate(s.x, 0.058, s.z);
    surfaceGeos.push(pad);
    for (const side of [-1, 1]) {
      const line = new THREE.PlaneGeometry(0.12, STALL_D - 0.3);
      line.rotateX(-Math.PI / 2);
      line.rotateY(yaw(s.nx, s.nz));
      line.translate(s.x + s.ux * side * (STALL_W / 2), 0.068, s.z + s.uz * side * (STALL_W / 2));
      lineGeos.push(line);
    }
    // Car (≈65% occupancy)
    const h = hash01(s.x, s.z, 1);
    if (h < 0.65) {
      const nose = hash01(s.x, s.z, 2) < 0.75 ? -1 : 1; // most cars pulled in nose-first
      cars.push({
        x: s.x + s.nx * 0.15 + s.ux * (hash01(s.x, s.z, 3) - 0.5) * 0.25,
        z: s.z + s.nz * 0.15 + s.uz * (hash01(s.x, s.z, 3) - 0.5) * 0.25,
        yaw: Math.atan2(s.nx * -nose, s.nz * -nose) + (hash01(s.x, s.z, 4) - 0.5) * 0.08,
        color: Math.floor(hash01(s.x, s.z, 5) * CAR_COLORS.length),
        type: Math.floor(hash01(s.x, s.z, 6) * CAR_TYPES.length),
        y: 0.04,
      });
    }
  }

  // 3) Street parking on quiet residential side streets
  const nodeUse = new Map();
  for (const r of roads) {
    r.points.forEach((p, i) => {
      const key = p.id ?? `${Math.round(p.x)}_${Math.round(p.z)}`;
      const ends = i === 0 || i === r.points.length - 1;
      const prev = nodeUse.get(key) || { n: 0, x: p.x, z: p.z, end: false };
      prev.n += 1;
      prev.end = prev.end || ends;
      nodeUse.set(key, prev);
    });
  }
  const junctions = [...nodeUse.values()].filter((v) => v.n > 1 || v.end);
  const nearJunction = (x, z, d) => junctions.some((j) => Math.abs(j.x - x) < d && Math.abs(j.z - z) < d && Math.hypot(j.x - x, j.z - z) < d);
  const nearCrosswalk = (x, z, d) => crosswalks.some((c) => Math.hypot(c.x - x, c.z - z) < d);
  const nearOtherRoad = (road, x, z) => {
    for (const r of roads) {
      if (r === road) continue;
      const half = (r.width || 6) / 2 + 1.2;
      for (let i = 0; i < r.points.length - 1; i++) {
        const a = r.points[i];
        const b = r.points[i + 1];
        if (distToSegment(x, z, a.x, a.z, b.x, b.z) < half) return true;
      }
    }
    return false;
  };

  for (const r of bucket.roads) {
    if (!STREET_PARKING_HIGHWAYS.has(r.highway)) continue;
    if (TRAFFIC_STREETS.test(r.name || '')) continue;
    // Pick which curb(s) allow parking on this street: one side, or both on wider streets
    const sideRoll = hash01(r.id % 9973, 3, 9);
    const sides = (r.width || 6) >= 7 ? [-1, 1] : sideRoll < 0.5 ? [1] : [-1];
    const curbOffset = (r.width || 6) / 2 - 0.22 - 0.92;
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i];
      const b = r.points[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      if (len < 9) continue;
      const ux = (b.x - a.x) / len;
      const uz = (b.z - a.z) / len;
      for (const side of sides) {
        const nx = -uz * side;
        const nz = ux * side;
        for (let t = 3.5; t <= len - 3.5; t += 6.6) {
          const x = a.x + ux * t + nx * curbOffset;
          const z = a.z + uz * t + nz * curbOffset;
          if (hash01(x, z, 7) > 0.5) continue; // gaps for driveways / empty curb
          if (nearJunction(x, z, 13)) continue;
          if (nearCrosswalk(x, z, 11)) continue;
          if (nearOtherRoad(r, x, z)) continue;
          if (insideBuilding(x, z)) continue;
          if (nearFootway(x, z, 1.6)) continue;
          // Park facing the direction of travel for that side of the road (right-hand traffic)
          const dir = side === -1 ? 1 : -1;
          cars.push({
            x,
            z,
            yaw: Math.atan2(ux * dir, uz * dir) + (hash01(x, z, 8) - 0.5) * 0.04,
            color: Math.floor(hash01(x, z, 9) * CAR_COLORS.length),
            type: Math.floor(hash01(x, z, 10) * CAR_TYPES.length),
            y: 0.06,
          });
        }
      }
    }
  }

  if (surfaceGeos.length) {
    const asphalt = new THREE.MeshStandardMaterial({
      color: 0x30343b,
      roughness: 0.95,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    // One draw call for all asphalt in this chunk
    const merged = mergeGeometries(surfaceGeos.map((g) => (g.index ? g.toNonIndexed() : g)), false);
    surfaceGeos.forEach((g) => g.dispose());
    const m = new THREE.Mesh(merged, asphalt);
    m.receiveShadow = true;
    group.add(m);
  }
  if (lineGeos.length) {
    const white = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.6,
      polygonOffset: true,
      polygonOffsetFactor: -2,
      polygonOffsetUnits: -2,
    });
    const mergedLines = mergeGeometries(lineGeos, false);
    lineGeos.forEach((g) => g.dispose());
    group.add(new THREE.Mesh(mergedLines, white));
  }
  group.add(buildCarInstances(cars));

  // Two collider circles per car (front & back half)
  const colliders = [];
  for (const c of cars) {
    const fx = Math.sin(c.yaw);
    const fz = Math.cos(c.yaw);
    colliders.push({ x: c.x + fx * 1.05, z: c.z + fz * 1.05, r: 1.0 });
    colliders.push({ x: c.x - fx * 1.05, z: c.z - fz * 1.05, r: 1.0 });
  }
  group.userData.parkedCarColliders = colliders;
  group.userData.parkingStats = { stalls: stalls.length, cars: cars.length };
  return group;
}
