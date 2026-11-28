/**
 * Trees & shrubs — street trees along residential roads, scattered park trees, and
 * yard trees / shrubs around houses. All instanced (a few draw calls per chunk) with a gentle
 * wind sway in the vertex shader. Trunks export collider circles so you can't walk through them.
 */
import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { pointInPolygon2D } from '../geo.js';

export const vegetationUniforms = { uTime: { value: 0 } };

const STREET_TREE_ROADS = new Set(['residential', 'unclassified', 'living_street', 'tertiary', 'secondary', 'primary']);

const GREENS = [0x4f8f3a, 0x5c9b41, 0x3f7d34, 0x6aa84f, 0x4a8a46, 0x7aa83f];
const AUTUMN = [0xd9a321, 0xe07b24, 0xc2452d, 0xe8b93a, 0xb5532a];
const CONIFER = [0x2f5d3a, 0x355f41, 0x2b5235];
const SHRUBS = [0x4d7f3a, 0x5d8f45, 0x3f6f36, 0x6b9a4a];

function hash01(a, b = 0, c = 0) {
  let h = Math.imul(Math.floor(a * 91.7) ^ 0x9e3779b9, 0x85ebca6b) ^ Math.imul(Math.floor(b * 37.3) + 11, 0xc2b2ae35);
  h = Math.imul(h ^ (h >>> 15), 0x27d4eb2d) ^ Math.imul(Math.floor(c) + 17, 0x165667b1);
  h ^= h >>> 13;
  return ((h >>> 0) % 100000) / 100000;
}

function distToSegment(px, pz, ax, az, bx, bz) {
  const dx = bx - ax;
  const dz = bz - az;
  const l2 = dx * dx + dz * dz || 1;
  const t = Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / l2));
  return Math.hypot(px - (ax + dx * t), pz - (az + dz * t));
}

// Bake a vertex-colour shade so clustered canopies have depth (darker underneath, lighter on top)
function shadeByHeight(geo, minY, maxY) {
  const pos = geo.attributes.position;
  const col = new Float32Array(pos.count * 3);
  for (let i = 0; i < pos.count; i++) {
    const t = THREE.MathUtils.clamp((pos.getY(i) - minY) / Math.max(0.01, maxY - minY), 0, 1);
    const k = 0.62 + 0.45 * t;
    col[i * 3] = col[i * 3 + 1] = col[i * 3 + 2] = k;
  }
  geo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  return geo;
}

function blob(r, x, y, z, sx = 1, sy = 1, sz = 1, detail = 0) {
  const g = new THREE.IcosahedronGeometry(r, detail);
  g.scale(sx, sy, sz);
  g.translate(x, y, z);
  return g.toNonIndexed();
}

function trunkGeo(h, r0, r1, branches = []) {
  const parts = [];
  const t = new THREE.CylinderGeometry(r1, r0, h, 6);
  t.translate(0, h / 2, 0);
  parts.push(t.toNonIndexed());
  for (const [len, y, yaw, tilt] of branches) {
    const b = new THREE.CylinderGeometry(r1 * 0.45, r1 * 0.7, len, 5);
    b.translate(0, len / 2, 0);
    b.rotateZ(tilt);
    b.rotateY(yaw);
    b.translate(0, y, 0);
    parts.push(b.toNonIndexed());
  }
  return mergeGeometries(parts);
}

let TYPES = null;
function treeTypes() {
  if (TYPES) return TYPES;
  const maple = mergeGeometries([
    blob(2.1, 0, 5.6, 0, 1.1, 0.9, 1.1, 1),
    blob(1.6, 1.3, 5.0, 0.4),
    blob(1.5, -1.2, 5.1, -0.5),
    blob(1.5, 0.2, 5.2, 1.4),
    blob(1.4, -0.3, 6.6, -0.6),
  ]);
  const oak = mergeGeometries([
    blob(2.6, 0, 6.2, 0, 1.25, 0.75, 1.2, 1),
    blob(1.9, 2.0, 5.6, 0.6, 1, 0.8, 1),
    blob(1.9, -1.9, 5.7, -0.5, 1, 0.8, 1),
    blob(1.7, 0.3, 5.5, 2.0, 1, 0.8, 1),
    blob(1.7, -0.5, 5.6, -2.0, 1, 0.8, 1),
    blob(1.8, 0.2, 7.2, 0.1, 1.1, 0.8, 1.1),
  ]);
  const linden = mergeGeometries([
    blob(1.8, 0, 6.6, 0, 1, 1.5, 1),
    blob(1.3, 0.8, 5.5, 0.3),
    blob(1.3, -0.7, 5.6, -0.4),
  ]);
  const birch = mergeGeometries([
    blob(1.4, 0, 5.6, 0, 1, 1.5, 1),
    blob(1.1, 0.7, 4.6, 0.3),
    blob(1.1, -0.6, 4.7, -0.4),
    blob(1.0, 0.1, 6.8, -0.2),
    blob(0.9, 0.2, 4.0, 0.8),
  ]);
  const cones = [];
  for (let i = 0; i < 4; i++) {
    const c = new THREE.ConeGeometry(2.1 - i * 0.45, 2.6, 7);
    c.translate(0, 2.2 + i * 1.55, 0);
    cones.push(c.toNonIndexed());
  }
  const spruce = mergeGeometries(cones);

  for (const [g, lo, hi] of [[maple, 3, 8], [oak, 3.5, 9], [linden, 4, 9], [birch, 4, 8], [spruce, 1, 8.5]]) {
    shadeByHeight(g, lo, hi);
    g.computeVertexNormals();
  }
  TYPES = {
    maple: { canopy: maple, trunk: trunkGeo(4.6, 0.26, 0.18, [[1.6, 3.2, 0.4, 0.7], [1.5, 3.4, 2.6, -0.7]]), bark: 0x5b4636 },
    oak: { canopy: oak, trunk: trunkGeo(4.8, 0.36, 0.24, [[2.2, 3.6, 0.9, 0.9], [2.0, 3.8, 3.6, -0.9], [1.8, 4.0, 5.0, 0.8]]), bark: 0x4f3d30 },
    linden: { canopy: linden, trunk: trunkGeo(5.0, 0.24, 0.17), bark: 0x5e4a3b },
    birch: { canopy: birch, trunk: trunkGeo(4.6, 0.17, 0.12, [[1.2, 3.6, 1.2, 0.6], [1.0, 3.9, 3.8, -0.6]]), bark: 0xd8d2c6 },
    spruce: { canopy: spruce, trunk: trunkGeo(2.4, 0.22, 0.16), bark: 0x4a3a2e },
  };
  const shrub = mergeGeometries([blob(0.75, 0, 0.55, 0, 1.2, 0.85, 1.1), blob(0.55, 0.55, 0.5, 0.2), blob(0.55, -0.5, 0.48, -0.15)]);
  shadeByHeight(shrub, 0, 1.2);
  shrub.computeVertexNormals();
  TYPES.shrub = { canopy: shrub };
  return TYPES;
}

function windMaterial(opts) {
  const m = new THREE.MeshStandardMaterial({ roughness: 0.92, vertexColors: true, flatShading: true, ...opts });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uTime = vegetationUniforms.uTime;
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nuniform float uTime;')
      .replace(
        '#include <begin_vertex>',
        `#include <begin_vertex>
        #ifdef USE_INSTANCING
          vec3 iPos = vec3(instanceMatrix[3][0], instanceMatrix[3][1], instanceMatrix[3][2]);
          float ph = iPos.x * 0.37 + iPos.z * 0.29;
          float bend = max(0.0, position.y - 2.5) * 0.028;
          transformed.x += sin(uTime * 1.3 + ph) * bend;
          transformed.z += cos(uTime * 1.05 + ph * 1.3) * bend * 0.7;
        #endif`
      );
  };
  m.customProgramCacheKey = () => 'veg-wind';
  return m;
}

let MATS = null;
function mats() {
  if (!MATS) {
    MATS = {
      leaf: windMaterial({}),
      bark: new THREE.MeshStandardMaterial({ roughness: 0.95, flatShading: true }),
    };
    MATS.leaf.userData.shared = true;
    MATS.bark.userData.shared = true;
  }
  return MATS;
}

/**
 * Builds vegetation for one chunk bucket.
 * avoid: extra { x, z, r } circles to keep clear (e.g. parked cars).
 */
export function buildVegetation(bucket, allRoads, avoid = []) {
  const group = new THREE.Group();
  group.name = 'vegetation';
  const roads = allRoads && allRoads.length ? allRoads : bucket.roads;
  const buildings = bucket.buildings || [];
  const footways = bucket.footways || [];
  const crosswalks = bucket.crosswalks || [];
  const parks = bucket.parks || [];
  const noTreeZones = parks.filter((p) => p.kind === 'pitch' || p.kind === 'playground').map((p) => p.polygon);

  const trees = []; // { type, x, z, s, rot, color }
  const shrubs = [];

  const inBuilding = (x, z, pad) => {
    for (const b of buildings) {
      if (b.bbox && (x < b.bbox.minX - pad || x > b.bbox.maxX + pad || z < b.bbox.minZ - pad || z > b.bbox.maxZ + pad)) continue;
      if (pointInPolygon2D(x, z, b.polygon)) return true;
      if (pad > 0) {
        const poly = b.polygon;
        for (let i = 0; i < poly.length; i++) {
          const a = poly[i];
          const c = poly[(i + 1) % poly.length];
          if (distToSegment(x, z, a.x, a.z, c.x, c.z) < pad) return true;
        }
      }
    }
    return false;
  };
  const onRoad = (x, z, pad) => {
    for (const r of roads) {
      const half = (r.width || 6) / 2 + (r.highway === 'service' ? 0.6 : r.sidewalkWidth || 1.8) + pad;
      for (let i = 0; i < r.points.length - 1; i++) {
        const a = r.points[i];
        const b = r.points[i + 1];
        if (Math.abs(a.x - x) > half + 80 && Math.abs(b.x - x) > half + 80) continue;
        if (distToSegment(x, z, a.x, a.z, b.x, b.z) < half) return true;
      }
    }
    return false;
  };
  const onFootway = (x, z, d) => {
    for (const f of footways) {
      for (let i = 0; i < f.points.length - 1; i++) {
        const a = f.points[i];
        const b = f.points[i + 1];
        if (distToSegment(x, z, a.x, a.z, b.x, b.z) < d) return true;
      }
    }
    return false;
  };
  const crowded = (x, z, d) =>
    trees.some((t) => Math.abs(t.x - x) < d && Math.abs(t.z - z) < d && Math.hypot(t.x - x, t.z - z) < d) ||
    avoid.some((c) => Math.hypot(c.x - x, c.z - z) < d * 0.5 + (c.r || 1));
  const nearCrosswalk = (x, z) => crosswalks.some((c) => Math.hypot(c.x - x, c.z - z) < 7);
  const frontDoorClear = (x, z) => !buildings.some((b) => b.frontPt && Math.hypot(b.frontPt.x - x, b.frontPt.z - z) < 4.5);

  const pickLeaf = (x, z, autumnChance = 0.3) => {
    const h = hash01(x, z, 31);
    if (h < autumnChance) return AUTUMN[Math.floor(hash01(x, z, 32) * AUTUMN.length)];
    return GREENS[Math.floor(hash01(x, z, 33) * GREENS.length)];
  };
  const addTree = (type, x, z, sMin, sMax, autumn = 0.3) => {
    let s = sMin + hash01(x, z, 41) * (sMax - sMin);
    if (type === 'birch') s = Math.min(s, 1.3); // birches stay slender, not giant poles
    trees.push({
      type,
      x,
      z,
      s,
      rot: hash01(x, z, 42) * Math.PI * 2,
      color: type === 'spruce' ? CONIFER[Math.floor(hash01(x, z, 43) * CONIFER.length)] : pickLeaf(x, z, autumn),
    });
  };

  // 1) Street trees: a row just behind each sidewalk on both sides (Westdale's leafy streets)
  for (const r of bucket.roads) {
    if (!STREET_TREE_ROADS.has(r.highway)) continue;
    const off = (r.width || 6) / 2 + (r.sidewalkWidth || 1.9) + 1.7;
    const spacing = r.highway === 'residential' ? 11 : 15;
    const streetType = ['maple', 'linden', 'oak', 'maple'][Math.abs(r.id || 0) % 4];
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i];
      const b = r.points[i + 1];
      const len = Math.hypot(b.x - a.x, b.z - a.z);
      if (len < 6) continue;
      const ux = (b.x - a.x) / len;
      const uz = (b.z - a.z) / len;
      for (const side of [-1, 1]) {
        const nx = -uz * side;
        const nz = ux * side;
        for (let t = spacing * 0.5; t < len; t += spacing) {
          const j = (hash01(a.x + t, a.z, side) - 0.5) * 3;
          const x = a.x + ux * (t + j) + nx * (off + hash01(a.x, a.z + t, 5) * 0.8);
          const z = a.z + uz * (t + j) + nz * (off + hash01(a.x, a.z + t, 5) * 0.8);
          if (hash01(x, z, 7) < 0.18) continue; // natural gaps
          if (inBuilding(x, z, 1.6) || onRoad(x, z, 0.9) || onFootway(x, z, 1.3) || nearCrosswalk(x, z)) continue;
          if (!frontDoorClear(x, z) || crowded(x, z, 6)) continue;
          const type = hash01(x, z, 9) < 0.15 ? 'birch' : streetType;
          addTree(type, x, z, 1.15, 1.6);
        }
      }
    }
  }

  // 2) Parks: loose groves (mixed broadleaf + some spruce), avoiding pitches, playgrounds & paths
  for (const p of parks) {
    if (p.kind === 'pitch' || p.kind === 'playground') continue;
    const xs = p.polygon.map((q) => q.x);
    const zs = p.polygon.map((q) => q.z);
    const [minX, maxX, minZ, maxZ] = [Math.min(...xs), Math.max(...xs), Math.min(...zs), Math.max(...zs)];
    const isWood = p.kind === 'wood' || p.kind === 'nature_reserve';
    const step = p.kind === 'school_grounds' ? 16 : isWood ? 8 : 12;
    let n = 0;
    for (let gx = minX + step / 2; gx < maxX; gx += step) {
      for (let gz = minZ + step / 2; gz < maxZ; gz += step) {
        if (n > (isWood ? 500 : 160)) break;
        const x = gx + (hash01(gx, gz, 1) - 0.5) * step * 0.8;
        const z = gz + (hash01(gx, gz, 2) - 0.5) * step * 0.8;
        // Groves: keep clumps, leave open meadows
        const density = p.kind === 'school_grounds' ? 0.3 : isWood ? 0.85 : 0.55;
        if (!isWood && hash01(Math.floor(x / 40), Math.floor(z / 40), 3) > 0.65 && hash01(x, z, 4) > 0.2) continue;
        if (hash01(x, z, 6) > density) continue;
        if (!pointInPolygon2D(x, z, p.polygon)) continue;
        if (noTreeZones.some((poly) => pointInPolygon2D(x, z, poly))) continue;
        if (inBuilding(x, z, 2.5) || onRoad(x, z, 1) || onFootway(x, z, 2.2) || crowded(x, z, isWood ? 4.5 : 6.5)) continue;
        const h = hash01(x, z, 8);
        const type = h < (isWood ? 0.35 : 0.22) ? 'spruce' : h < 0.5 ? 'oak' : h < 0.62 ? 'birch' : 'maple';
        addTree(type, x, z, 1.1, 1.75, 0.35);
        n++;
      }
    }
  }

  // 3) Yards: a backyard tree behind many houses + shrubs flanking front doors
  for (const b of buildings) {
    if (b.category !== 'house' && b.category !== 'home') continue;
    const id = Math.abs(b.id || 0);
    if (b.frontPt) {
      const fx = b.frontPt.x - b.centroid.x;
      const fz = b.frontPt.z - b.centroid.z;
      const fl = Math.hypot(fx, fz) || 1;
      const ux = fx / fl;
      const uz = fz / fl;
      // Shrubs either side of the door, set slightly out from the wall
      for (const side of [-1, 1]) {
        if (hash01(id, side, 2) < 0.25) continue;
        const sx = b.frontPt.x + ux * 0.9 + -uz * side * (1.9 + hash01(id, side, 3));
        const sz = b.frontPt.z + uz * 0.9 + ux * side * (1.9 + hash01(id, side, 3));
        if (inBuilding(sx, sz, 0.3) || onRoad(sx, sz, 0.3) || onFootway(sx, sz, 0.9)) continue;
        shrubs.push({ x: sx, z: sz, s: 0.8 + hash01(sx, sz, 1) * 0.5, rot: hash01(sx, sz, 2) * 6.28, color: SHRUBS[id % SHRUBS.length] });
      }
      // Backyard tree
      if (id % 3 !== 0) {
        const dist = Math.hypot(b.bbox.maxX - b.bbox.minX, b.bbox.maxZ - b.bbox.minZ) * 0.5 + 4 + hash01(id, 5) * 4;
        const x = b.centroid.x - ux * dist + -uz * (hash01(id, 6) - 0.5) * 6;
        const z = b.centroid.z - uz * dist + ux * (hash01(id, 6) - 0.5) * 6;
        if (!inBuilding(x, z, 2.2) && !onRoad(x, z, 1) && !onFootway(x, z, 1.5) && !crowded(x, z, 5.5)) {
          const h = hash01(x, z, 7);
          addTree(h < 0.2 ? 'spruce' : h < 0.35 ? 'birch' : h < 0.6 ? 'oak' : 'maple', x, z, 1.05, 1.5, 0.3);
        }
      }
    }
  }

  // 4) Open land well away from streets & buildings (ravines, edges of Cootes Paradise):
  //    natural groves so the world doesn't end in bare lawn.
  if (Number.isFinite(bucket.gx) && Number.isFinite(bucket.gz)) {
    const CS = 300;
    const x0 = bucket.gx * CS;
    const z0 = bucket.gz * CS;
    const parkPolys = parks.map((p) => p.polygon);
    let wild = 0;
    for (let gx = x0 + 12; gx < x0 + CS - 12 && wild < 650; gx += 9) {
      for (let gz = z0 + 12; gz < z0 + CS - 12 && wild < 650; gz += 9) {
        const x = gx + (hash01(gx, gz, 61) - 0.5) * 7;
        const z = gz + (hash01(gx, gz, 62) - 0.5) * 7;
        // Clumpy woodland: noise-like field from coarse hashed cells
        const cell = hash01(Math.floor(x / 35), Math.floor(z / 35), 63);
        if (hash01(x, z, 64) > (cell > 0.45 ? 0.75 : 0.12)) continue;
        if (parkPolys.some((poly) => pointInPolygon2D(x, z, poly))) continue;
        if (inBuilding(x, z, 18) || onRoad(x, z, 16) || onFootway(x, z, 4) || crowded(x, z, 5)) continue;
        const h = hash01(x, z, 65);
        addTree(h < 0.3 ? 'spruce' : h < 0.55 ? 'oak' : h < 0.68 ? 'birch' : 'maple', x, z, 1.1, 1.8, 0.35);
        wild++;
      }
    }
  }

  // Build instanced meshes
  const T = treeTypes();
  const M = mats();
  const m4 = new THREE.Matrix4();
  const q = new THREE.Quaternion();
  const up = new THREE.Vector3(0, 1, 0);
  const col = new THREE.Color();
  for (const type of ['maple', 'oak', 'linden', 'birch', 'spruce']) {
    const list = trees.filter((t) => t.type === type);
    if (!list.length) continue;
    const canopy = new THREE.InstancedMesh(T[type].canopy, M.leaf, list.length);
    const trunk = new THREE.InstancedMesh(T[type].trunk, M.bark, list.length);
    list.forEach((t, i) => {
      q.setFromAxisAngle(up, t.rot);
      m4.compose(new THREE.Vector3(t.x, 0, t.z), q, new THREE.Vector3(t.s, t.s * (0.92 + hash01(t.x, t.z, 50) * 0.2), t.s));
      canopy.setMatrixAt(i, m4);
      trunk.setMatrixAt(i, m4);
      canopy.setColorAt(i, col.setHex(t.color));
      trunk.setColorAt(i, col.setHex(T[type].bark));
    });
    for (const m of [canopy, trunk]) {
      m.userData.sharedGeometry = true;
      m.castShadow = true;
      m.receiveShadow = true;
      m.instanceMatrix.needsUpdate = true;
      m.instanceColor.needsUpdate = true;
      m.computeBoundingSphere();
      group.add(m);
    }
  }
  if (shrubs.length) {
    const sm = new THREE.InstancedMesh(T.shrub.canopy, M.leaf, shrubs.length);
    shrubs.forEach((sh, i) => {
      q.setFromAxisAngle(up, sh.rot);
      m4.compose(new THREE.Vector3(sh.x, 0, sh.z), q, new THREE.Vector3(sh.s, sh.s, sh.s));
      sm.setMatrixAt(i, m4);
      sm.setColorAt(i, col.setHex(sh.color));
    });
    sm.userData.sharedGeometry = true;
    sm.castShadow = true;
    sm.receiveShadow = true;
    sm.instanceMatrix.needsUpdate = true;
    sm.instanceColor.needsUpdate = true;
    sm.computeBoundingSphere();
    group.add(sm);
  }

  group.userData.treeColliders = trees.map((t) => ({ x: t.x, z: t.z, r: 0.4 * t.s }));
  group.userData.vegStats = { trees: trees.length, shrubs: shrubs.length };
  return group;
}
