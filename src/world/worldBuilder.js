/**
 * Builds bright, kid-friendly low-poly 3D meshes for a 300m x 300m chunk:
 * - Real OSM lane counts, one-way/two-way lane dividers, bike lanes, and edge markings
 * - Explicit OSM sidewalks (footway=sidewalk) + raised 3D curbs & continuous fallback sidewalks
 * - High-contrast white zebra crosswalks
 * - Extruded landmarks (Cootes Paradise Elementary School, Westdale Library, churches, King St shops, houses)
 * - Readable 3D landmark signs & 3D corner street-name signs
 * - Low-poly trees & School Entrance Plaza Beacon
 */

import * as THREE from 'three';
import { closestPointOnSegment2D, pointInPolygon2D } from '../geo.js';

const HOUSE_COLORS = [0xfef3c7, 0xffedd5, 0xe0f2fe, 0xfce7f3, 0xe2e8f0, 0xfde68a, 0xdcfce7];
const SHOP_COLORS = [0xfb7185, 0x38bdf8, 0xfbbf24, 0x34d399, 0xa78bfa, 0xf97316];

function makeSignTexture(lines, bgColor = '#1e3a8a', textColor = '#ffffff', borderColor = '#ffffff', width = 512, height = 160) {
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = borderColor;
  ctx.lineWidth = 10;
  ctx.strokeRect(8, 8, width - 16, height - 16);

  ctx.fillStyle = textColor;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const arr = Array.isArray(lines) ? lines : [lines];
  if (arr.length === 1) {
    let fontSize = 54;
    ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
    while (ctx.measureText(arr[0]).width > width - 48 && fontSize > 22) {
      fontSize -= 2;
      ctx.font = `900 ${fontSize}px system-ui, -apple-system, sans-serif`;
    }
    ctx.fillText(arr[0], width / 2, height / 2);
  } else {
    ctx.font = `900 44px system-ui, -apple-system, sans-serif`;
    ctx.fillText(arr[0], width / 2, height * 0.36, width - 44);
    ctx.font = `700 32px system-ui, -apple-system, sans-serif`;
    ctx.fillText(arr[1], width / 2, height * 0.72, width - 44);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

/**
 * Creates a flat ribbon geometry along a polyline of {x, z} points with a given width and lateral offset.
 * Lateral offset: +offset is to the RIGHT of travel direction (a -> b), -offset is to the LEFT.
 */
function buildRibbonGeometry(points, width, y, lateralOffset = 0) {
  const positions = [];
  const normals = [];
  const indices = [];
  const halfW = width / 2;

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    if (len < 0.05) continue;

    // Right-hand perpendicular in XZ plane
    const px = -dz / len;
    const pz = dx / len;

    const ext = 0.25;
    const ux = dx / len;
    const uz = dz / len;
    const ax = a.x - ux * ext + px * lateralOffset;
    const az = a.z - uz * ext + pz * lateralOffset;
    const bx = b.x + ux * ext + px * lateralOffset;
    const bz = b.z + uz * ext + pz * lateralOffset;

    const baseIdx = positions.length / 3;
    positions.push(
      ax - px * halfW, y, az - pz * halfW,
      ax + px * halfW, y, az + pz * halfW,
      bx + px * halfW, y, bz + pz * halfW,
      bx - px * halfW, y, bz - pz * halfW
    );
    for (let k = 0; k < 4; k++) normals.push(0, 1, 0);
    indices.push(baseIdx, baseIdx + 1, baseIdx + 2, baseIdx, baseIdx + 2, baseIdx + 3);
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  return geom;
}

/**
 * Precomputes bounding boxes for fast point-inside-road asphalt checks so sidewalks
 * stop cleanly at street curbs and never extend into the middle of intersections.
 */
function buildRoadAsphaltIndex(roads) {
  return roads
    .filter((r) => r.highway !== 'service' && r.points.length >= 2)
    .map((r) => {
      const pad = r.width * 0.5 + 1.0;
      let minX = Infinity;
      let maxX = -Infinity;
      let minZ = Infinity;
      let maxZ = -Infinity;
      for (const p of r.points) {
        if (p.x < minX) minX = p.x;
        if (p.x > maxX) maxX = p.x;
        if (p.z < minZ) minZ = p.z;
        if (p.z > maxZ) maxZ = p.z;
      }
      return {
        id: r.id,
        name: r.name,
        halfW: r.width * 0.5,
        points: r.points,
        minX: minX - pad,
        maxX: maxX + pad,
        minZ: minZ - pad,
        maxZ: maxZ + pad,
      };
    });
}

function isInsideCrossingRoadAsphalt(x, z, roadIndex, excludeRoadId = null, margin = 0.25) {
  for (const r of roadIndex) {
    if (excludeRoadId !== null && r.id === excludeRoadId) continue;
    if (x < r.minX || x > r.maxX || z < r.minZ || z > r.maxZ) continue;
    const threshold = r.halfW + margin;
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i];
      const b = r.points[i + 1];
      const hit = closestPointOnSegment2D(x, z, a.x, a.z, b.x, b.z);
      if (hit.dist < threshold) return true;
    }
  }
  return false;
}

/**
 * Creates a raised 3D sidewalk/curb prism along a polyline, automatically clipping out
 * any portions that cross into an intersecting road's asphalt so intersections stay clean
 * with only white zebra crossings spanning the street.
 */
function buildRaisedSidewalkGeometry(
  points,
  width,
  yBottom,
  yTop,
  lateralOffset = 0,
  roadIndex = null,
  excludeRoadId = null
) {
  const positions = [];
  const normals = [];
  const indices = [];
  const halfW = width / 2;

  function emitQuad(ax, az, bx, bz, px, pz) {
    // Top face (+Y upward)
    let base = positions.length / 3;
    positions.push(
      ax - px * halfW, yTop, az - pz * halfW,
      ax + px * halfW, yTop, az + pz * halfW,
      bx + px * halfW, yTop, bz + pz * halfW,
      bx - px * halfW, yTop, bz - pz * halfW
    );
    for (let k = 0; k < 4; k++) normals.push(0, 1, 0);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);

    // Left curb vertical face (-px, -pz)
    base = positions.length / 3;
    positions.push(
      ax - px * halfW, yBottom, az - pz * halfW,
      ax - px * halfW, yTop, az - pz * halfW,
      bx - px * halfW, yTop, bz - pz * halfW,
      bx - px * halfW, yBottom, bz - pz * halfW
    );
    for (let k = 0; k < 4; k++) normals.push(-px, 0, -pz);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);

    // Right curb vertical face (+px, +pz)
    base = positions.length / 3;
    positions.push(
      ax + px * halfW, yBottom, az + pz * halfW,
      bx + px * halfW, yBottom, bz + pz * halfW,
      bx + px * halfW, yTop, bz + pz * halfW,
      ax + px * halfW, yTop, az + pz * halfW
    );
    for (let k = 0; k < 4; k++) normals.push(px, 0, pz);
    indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
  }

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    if (len < 0.05) continue;

    const px = -dz / len;
    const pz = dx / len;
    const ux = dx / len;
    const uz = dz / len;

    if (!roadIndex || roadIndex.length === 0) {
      const ext = 0.22;
      emitQuad(
        a.x - ux * ext + px * lateralOffset,
        a.z - uz * ext + pz * lateralOffset,
        b.x + ux * ext + px * lateralOffset,
        b.z + uz * ext + pz * lateralOffset,
        px,
        pz
      );
      continue;
    }

    // Clip sidewalk segment against crossing roads in 0.85m steps and merge contiguous visible runs
    const stepSize = 0.85;
    const steps = Math.max(1, Math.ceil(len / stepSize));
    const margin = excludeRoadId !== null ? 0.25 : 0.05;
    let runStart = null;

    for (let s = 0; s < steps; s++) {
      const tMid = (s + 0.5) / steps;
      const mx = a.x + dx * tMid + px * lateralOffset;
      const mz = a.z + dz * tMid + pz * lateralOffset;
      const blocked = isInsideCrossingRoadAsphalt(mx, mz, roadIndex, excludeRoadId, margin);

      if (!blocked) {
        if (runStart === null) runStart = s / steps;
      } else if (runStart !== null) {
        const runEnd = s / steps;
        emitQuad(
          a.x + dx * runStart + px * lateralOffset,
          a.z + dz * runStart + pz * lateralOffset,
          a.x + dx * runEnd + px * lateralOffset,
          a.z + dz * runEnd + pz * lateralOffset,
          px,
          pz
        );
        runStart = null;
      }
    }

    if (runStart !== null) {
      emitQuad(
        a.x + dx * runStart + px * lateralOffset,
        a.z + dz * runStart + pz * lateralOffset,
        b.x + px * lateralOffset,
        b.z + pz * lateralOffset,
        px,
        pz
      );
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  return geom;
}

function buildDashedLineGeometry(points, dashLen, gapLen, lineWidth, y, lateralOffset = 0) {
  const positions = [];
  const normals = [];
  const indices = [];
  const halfW = lineWidth / 2;
  const period = dashLen + gapLen;

  for (let i = 0; i < points.length - 1; i++) {
    const a = points[i];
    const b = points[i + 1];
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz);
    if (len < 1.0) continue;

    const ux = dx / len;
    const uz = dz / len;
    const px = -uz;
    const pz = ux;

    for (let d = 0.8; d < len - 0.8; d += period) {
      const dEnd = Math.min(d + dashLen, len - 0.5);
      if (dEnd - d < 0.4) continue;
      const sx = a.x + ux * d + px * lateralOffset;
      const sz = a.z + uz * d + pz * lateralOffset;
      const ex = a.x + ux * dEnd + px * lateralOffset;
      const ez = a.z + uz * dEnd + pz * lateralOffset;

      const base = positions.length / 3;
      positions.push(
        sx - px * halfW, y, sz - pz * halfW,
        sx + px * halfW, y, sz + pz * halfW,
        ex + px * halfW, y, ez + pz * halfW,
        ex - px * halfW, y, ez - pz * halfW
      );
      for (let k = 0; k < 4; k++) normals.push(0, 1, 0);
      indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    }
  }

  const geom = new THREE.BufferGeometry();
  geom.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
  geom.setAttribute('normal', new THREE.Float32BufferAttribute(normals, 3));
  geom.setIndex(indices);
  return geom;
}

function createExtrudedPolygon(polygon, height, yBase = 0) {
  const shape = new THREE.Shape();
  shape.moveTo(polygon[0].x, -polygon[0].z);
  for (let i = 1; i < polygon.length; i++) {
    shape.lineTo(polygon[i].x, -polygon[i].z);
  }
  shape.closePath();

  const geom = new THREE.ExtrudeGeometry(shape, {
    depth: height,
    bevelEnabled: false,
  });
  geom.rotateX(-Math.PI / 2);
  geom.translate(0, yBase, 0);
  return geom;
}

function makeStopSignTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, 256, 256);

  const drawOctagon = (radius, fill, stroke = null, lineWidth = 0) => {
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const a = (Math.PI / 8) + (i * Math.PI) / 4;
      const x = 128 + Math.cos(a) * radius;
      const y = 128 + Math.sin(a) * radius;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.closePath();
    ctx.fillStyle = fill;
    ctx.fill();
    if (stroke) {
      ctx.strokeStyle = stroke;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    }
  };

  drawOctagon(122, '#ffffff');
  drawOctagon(112, '#dc2626', '#ffffff', 8);

  ctx.fillStyle = '#ffffff';
  ctx.font = '900 72px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('STOP', 128, 132);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return tex;
}

function createStopSignPost(stop, mats, stopTex) {
  const group = new THREE.Group();
  group.position.set(stop.x, 0.16, stop.z);
  group.rotation.y = stop.facingAngle || 0;

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.07, 2.7, 8), mats.pole);
  pole.position.y = 1.35;
  pole.castShadow = true;
  group.add(pole);

  // Double-sided bright red octagonal STOP sign so it is unmistakable from every approach angle!
  const signMat = new THREE.MeshStandardMaterial({
    map: stopTex,
    transparent: true,
    alphaTest: 0.25,
    roughness: 0.35,
  });

  const front = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 1.08), signMat);
  front.position.set(0, 2.55, 0.07);

  const back = new THREE.Mesh(new THREE.PlaneGeometry(1.08, 1.08), signMat);
  back.rotation.y = Math.PI;
  back.position.set(0, 2.55, -0.07);

  group.add(front, back);
  return group;
}

function createStreetSignPost(inter, mats) {
  const group = new THREE.Group();
  const offset = inter.onKing ? 7.6 : 5.6;
  group.position.set(inter.x + offset, 0, inter.z - offset);

  const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 3.6, 8), mats.pole);
  pole.position.y = 1.8;
  group.add(pole);

  const names = inter.streetNames.slice(0, 2);
  names.forEach((name, idx) => {
    const shortName = name
      .replace(/Street/gi, 'St')
      .replace(/Avenue/gi, 'Ave')
      .replace(/Road/gi, 'Rd')
      .replace(/North/gi, 'N')
      .replace(/South/gi, 'S')
      .replace(/West/gi, 'W')
      .replace(/East/gi, 'E');

    const tex = makeSignTexture(shortName, '#15803d', '#ffffff', '#dcfce7', 512, 110);
    const bladeMat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.5 });
    const blade = new THREE.Mesh(new THREE.BoxGeometry(2.1, 0.42, 0.06), bladeMat);
    blade.position.y = 3.25 + idx * 0.46;
    blade.rotation.y = idx === 0 ? 0 : Math.PI / 2;
    group.add(blade);
  });

  return group;
}

function createHouseNumberPlaque(houseNumber, frontPt, frontAngle) {
  const canvas = document.createElement('canvas');
  canvas.width = 160;
  canvas.height = 80;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 160, 80);
  ctx.strokeStyle = '#f8fafc';
  ctx.lineWidth = 6;
  ctx.strokeRect(5, 5, 150, 70);
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 44px system-ui, -apple-system, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(String(houseNumber), 80, 42, 136);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45, side: THREE.DoubleSide });
  const plaque = new THREE.Mesh(new THREE.PlaneGeometry(1.35, 0.66), mat);
  plaque.position.set(frontPt.x, 2.55, frontPt.z);
  plaque.rotation.y = frontAngle;
  return plaque;
}

function createPublicEntrance(b, mats) {
  const g = new THREE.Group();
  g.position.set(b.frontPt.x, 0, b.frontPt.z);
  g.rotation.y = b.frontAngle || 0;

  // Welcoming glass doorway + bright welcome mat on the ground
  const doorFrame = new THREE.Mesh(
    new THREE.BoxGeometry(1.9, 2.45, 0.22),
    new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.5 })
  );
  doorFrame.position.set(0, 1.25, 0.04);
  g.add(doorFrame);

  const doorGlass = new THREE.Mesh(
    new THREE.PlaneGeometry(1.55, 2.15),
    new THREE.MeshStandardMaterial({
      color: 0x7dd3fc,
      emissive: 0x0284c7,
      emissiveIntensity: 0.28,
      roughness: 0.2,
    })
  );
  doorGlass.position.set(0, 1.24, 0.16);
  g.add(doorGlass);

  // Welcome mat outside the door so kids know they can walk right in!
  const matMesh = new THREE.Mesh(
    new THREE.BoxGeometry(2.1, 0.05, 1.15),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.85 })
  );
  matMesh.position.set(0, 0.18, 0.72);
  g.add(matMesh);

  // Storefront name fascia right above the door on the building wall!
  const typeMeta = {
    restaurant: { emoji: '🍽️', bg: '#b91c1c' },
    cafe: { emoji: '☕', bg: '#92400e' },
    grocery: { emoji: '🛒', bg: '#15803d' },
    library: { emoji: '📚', bg: '#0369a1' },
    school: { emoji: '🏫', bg: '#b91c1c' },
    church: { emoji: '⛪', bg: '#4338ca' },
    pharmacy: { emoji: '💊', bg: '#0f766e' },
    bank: { emoji: '🏦', bg: '#1d4ed8' },
    shop: { emoji: '🛍️', bg: '#7c3aed' },
  }[b.placeType] || { emoji: '🏬', bg: '#0f766e' };

  const title = b.name ? `${typeMeta.emoji} ${b.name}` : `${typeMeta.emoji} Westdale Shop`;
  const sub = b.houseNumber ? `#${b.houseNumber} • Walk In!` : 'Public Entrance • Walk In!';
  const signTex = makeSignTexture([title, sub], typeMeta.bg, '#ffffff', '#fde047', 640, 180);
  const signBoard = new THREE.Mesh(
    new THREE.BoxGeometry(4.4, 1.2, 0.16),
    new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.4 })
  );
  signBoard.position.set(0, 3.35, 0.16);
  g.add(signBoard);

  return g;
}

function createLandmarkSign(text, subtitle, x, y, z, bgColor, width = 6.5) {
  const group = new THREE.Group();
  group.position.set(x, y, z);

  const tex = makeSignTexture(subtitle ? [text, subtitle] : [text], bgColor, '#ffffff', '#fef08a', 768, 200);
  const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.4, side: THREE.DoubleSide });
  const board = new THREE.Mesh(new THREE.BoxGeometry(width, width * 0.27, 0.18), mat);
  group.add(board);

  return group;
}

function createLowPolyTree(x, z, scale = 1) {
  const g = new THREE.Group();
  g.position.set(x, 0, z);

  const trunk = new THREE.Mesh(
    new THREE.CylinderGeometry(0.18 * scale, 0.25 * scale, 1.8 * scale, 6),
    new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.9 })
  );
  trunk.position.y = 0.9 * scale;
  g.add(trunk);

  const foliage = new THREE.Mesh(
    new THREE.DodecahedronGeometry(1.35 * scale, 0),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.85, flatShading: true })
  );
  foliage.position.y = 2.6 * scale;
  g.add(foliage);

  return g;
}

/**
 * Draws accurate lane markings & bike lanes based on the road's real OSM tags:
 * - lanes, lanesForward, lanesBackward, oneway, hasBikeLeft, hasBikeRight.
 *
 * Lateral coordinate convention (looking from points[i] -> points[i+1]):
 *   Left edge of road  = -width / 2
 *   Right edge of road = +width / 2
 *   In right-hand traffic (Ontario):
 *     - Forward lanes occupy the RIGHT side (positive offsets)
 *     - Backward lanes occupy the LEFT side (negative offsets)
 */
function addRealLaneMarkings(group, road, roadY, mats) {
  if (road.highway === 'service') return;

  const markY = roadY + 0.02;
  const halfW = road.width / 2;

  // Vehicle carriageway bounds (inside any bike lanes)
  const leftBikeW = road.hasBikeLeft ? road.bikeLaneWidth : 0;
  const rightBikeW = road.hasBikeRight ? road.bikeLaneWidth : 0;
  const vehLeft = -halfW + leftBikeW;
  const vehRight = halfW - rightBikeW;
  const vehWidth = Math.max(2.5, vehRight - vehLeft);

  // 1. Bike lanes (green-tinted strip + solid white buffer line)
  if (road.hasBikeLeft) {
    const bikeCenter = -halfW + leftBikeW * 0.5;
    group.add(new THREE.Mesh(buildRibbonGeometry(road.points, leftBikeW - 0.14, roadY + 0.015, bikeCenter), mats.bikeLane));
    group.add(new THREE.Mesh(buildRibbonGeometry(road.points, 0.12, markY, vehLeft), mats.whiteLine));
  }
  if (road.hasBikeRight) {
    const bikeCenter = halfW - rightBikeW * 0.5;
    group.add(new THREE.Mesh(buildRibbonGeometry(road.points, rightBikeW - 0.14, roadY + 0.015, bikeCenter), mats.bikeLane));
    group.add(new THREE.Mesh(buildRibbonGeometry(road.points, 0.12, markY, vehRight), mats.whiteLine));
  }

  // 2. Subtle white edge/gutter lines along outer curbs on major streets
  if (road.isMajor) {
    group.add(new THREE.Mesh(buildRibbonGeometry(road.points, 0.1, markY, -halfW + 0.14), mats.edgeLine));
    group.add(new THREE.Mesh(buildRibbonGeometry(road.points, 0.1, markY, halfW - 0.14), mats.edgeLine));
  }

  // 3. One-way vs Two-way vehicle lane dividers
  if (road.oneway) {
    // One-way road: no yellow centerline; dashed white dividers between all N lanes
    const n = Math.max(1, road.lanes);
    const step = vehWidth / n;
    for (let i = 1; i < n; i++) {
      const offset = vehLeft + step * i;
      group.add(new THREE.Mesh(buildDashedLineGeometry(road.points, 2.8, 3.2, 0.13, markY, offset), mats.whiteLine));
    }
  } else if (road.lanes >= 2) {
    // Two-way road: divider between backward (left) and forward (right) lanes
    const bwd = Math.max(1, road.lanesBackward);
    const fwd = Math.max(1, road.lanesForward);
    const total = bwd + fwd;
    const step = vehWidth / total;
    const dividerOffset = vehLeft + step * bwd;

    if (road.isMajor || total >= 3) {
      // Double yellow center line separating opposing traffic
      group.add(new THREE.Mesh(buildRibbonGeometry(road.points, 0.12, markY, dividerOffset - 0.13), mats.yellowLine));
      group.add(new THREE.Mesh(buildRibbonGeometry(road.points, 0.12, markY, dividerOffset + 0.13), mats.yellowLine));
    } else {
      // 2-lane residential street: dashed yellow center line
      group.add(new THREE.Mesh(buildDashedLineGeometry(road.points, 2.5, 3.5, 0.12, markY, dividerOffset), mats.yellowLine));
    }

    // Dashed white dividers between multiple lanes going the same direction
    for (let i = 1; i < bwd; i++) {
      const offset = vehLeft + step * i;
      group.add(new THREE.Mesh(buildDashedLineGeometry(road.points, 2.8, 3.2, 0.13, markY, offset), mats.whiteLine));
    }
    for (let i = 1; i < fwd; i++) {
      const offset = dividerOffset + step * i;
      group.add(new THREE.Mesh(buildDashedLineGeometry(road.points, 2.8, 3.2, 0.13, markY, offset), mats.whiteLine));
    }
  }
}

export function buildChunkMesh(bucket, allRoads = null) {
  const group = new THREE.Group();
  group.name = bucket.id;
  const roadIndex = buildRoadAsphaltIndex(allRoads && allRoads.length ? allRoads : bucket.roads);

  const mats = {
    roadMajor: new THREE.MeshStandardMaterial({ color: 0x262b33, roughness: 0.94 }),
    roadLocal: new THREE.MeshStandardMaterial({ color: 0x323842, roughness: 0.94 }),
    sidewalk: new THREE.MeshStandardMaterial({ color: 0xf5e6c8, roughness: 0.82 }),
    footway: new THREE.MeshStandardMaterial({ color: 0xebd9b7, roughness: 0.88 }),
    bikeLane: new THREE.MeshStandardMaterial({ color: 0x2d6a4f, roughness: 0.88 }),
    yellowLine: new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.65 }),
    whiteLine: new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.55 }),
    edgeLine: new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.7 }),
    parkGrass: new THREE.MeshStandardMaterial({ color: 0x86efac, roughness: 0.95 }),
    schoolGrass: new THREE.MeshStandardMaterial({ color: 0xa7f3d0, roughness: 0.95 }),
    pole: new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.35, roughness: 0.5 }),
    roofSchool: new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.75 }),
    roofChurch: new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.75 }),
  };

  // 1. Parks & School Grounds
  for (const park of bucket.parks) {
    const geom = createExtrudedPolygon(park.polygon, 0.04, 0.01);
    const mesh = new THREE.Mesh(geom, park.kind === 'school_grounds' ? mats.schoolGrass : mats.parkGrass);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // 2. Roads + Real OSM Lane Markings + Raised Sidewalks on Both Sides
  for (const road of bucket.roads) {
    const roadY = road.isMajor ? 0.06 : 0.05;
    const roadGeom = buildRibbonGeometry(road.points, road.width, roadY, 0);
    const roadMesh = new THREE.Mesh(roadGeom, road.isMajor ? mats.roadMajor : mats.roadLocal);
    roadMesh.receiveShadow = true;
    group.add(roadMesh);

    // Real OSM lane markings & bike lanes
    addRealLaneMarkings(group, road, roadY, mats);

    // Continuous raised sidewalks along both sides of every non-service street,
    // clipped cleanly at intersecting road curbs so sidewalks never extend into intersections
    if (road.highway !== 'service') {
      const swOffset = road.width / 2 + road.sidewalkWidth / 2;

      if (road.wantsRightSidewalk && !road.hasExplicitRightSidewalk) {
        const rightSw = buildRaisedSidewalkGeometry(
          road.points,
          road.sidewalkWidth,
          0.02,
          0.16,
          swOffset,
          roadIndex,
          road.id
        );
        const rightMesh = new THREE.Mesh(rightSw, mats.sidewalk);
        rightMesh.receiveShadow = true;
        group.add(rightMesh);
      }

      if (road.wantsLeftSidewalk && !road.hasExplicitLeftSidewalk) {
        const leftSw = buildRaisedSidewalkGeometry(
          road.points,
          road.sidewalkWidth,
          0.02,
          0.16,
          -swOffset,
          roadIndex,
          road.id
        );
        const leftMesh = new THREE.Mesh(leftSw, mats.sidewalk);
        leftMesh.receiveShadow = true;
        group.add(leftMesh);
      }
    }
  }

  // 3. Explicit OSM park trails & footpaths (skip duplicate offset footway=sidewalk ribbons
  // since every street builds exact curb-aligned sidewalks that line up flush with zebra crossings)
  for (const fw of bucket.footways) {
    if (fw.footwayType === 'crossing' || fw.footwayType === 'sidewalk') continue;
    const fwGeom = buildRibbonGeometry(fw.points, 1.8, 0.11, 0);
    group.add(new THREE.Mesh(fwGeom, mats.footway));
  }

  // 4. High-contrast white zebra crosswalks squarely on the roads
  for (const cw of bucket.crosswalks) {
    const cwGroup = new THREE.Group();
    cwGroup.position.set(cw.x, 0.088, cw.z);
    const angle = Math.atan2(cw.roadDirX, cw.roadDirZ);
    cwGroup.rotation.y = angle;

    // Zebra stripes fit cleanly across the asphalt road width
    const roadSpan = Math.max(3.6, cw.width - 0.5);
    const stripeCount = Math.max(4, Math.floor(roadSpan / 1.05));
    const spacing = roadSpan / stripeCount;
    const stripeW = spacing * 0.55;
    const stripeGeom = new THREE.BoxGeometry(stripeW, 0.016, cw.depth);

    for (let i = 0; i < stripeCount; i++) {
      const sx = -roadSpan / 2 + spacing * (i + 0.5);
      const stripe = new THREE.Mesh(stripeGeom, mats.whiteLine);
      stripe.position.x = sx;
      cwGroup.add(stripe);
    }

    // Crisp white road stop bars before & after the zebra crossing
    const stopBarGeom = new THREE.BoxGeometry(roadSpan, 0.016, 0.32);
    const barA = new THREE.Mesh(stopBarGeom, mats.whiteLine);
    barA.position.set(0, 0, cw.depth * 0.5 + 0.85);
    const barB = new THREE.Mesh(stopBarGeom, mats.whiteLine);
    barB.position.set(0, 0, -(cw.depth * 0.5 + 0.85));
    cwGroup.add(barA, barB);

    // Yellow curb-cut waiting pads on both sidewalk edges (stand here to trigger Look Left & Right!)
    const padGeom = new THREE.BoxGeometry(1.15, 0.04, 2.4);
    const padL = new THREE.Mesh(padGeom, mats.yellowLine);
    padL.position.set(-cw.width / 2 - 0.55, 0.09, 0);
    const padR = new THREE.Mesh(padGeom, mats.yellowLine);
    padR.position.set(cw.width / 2 + 0.55, 0.09, 0);
    cwGroup.add(padL, padR);

    group.add(cwGroup);
  }

  // 5. Street-name signs at intersections
  for (const inter of bucket.intersections) {
    if (inter.streetNames.length >= 2) {
      group.add(createStreetSignPost(inter, mats));
    }
  }

  // 5b. Red octagonal 3D STOP signs at unsignalized intersections & OSM highway=stop nodes
  if (bucket.stopSigns && bucket.stopSigns.length > 0) {
    const stopTex = makeStopSignTexture();
    for (const ss of bucket.stopSigns) {
      group.add(createStopSignPost(ss, mats, stopTex));
    }
  }

  // 6. Buildings & Landmarks
  for (const b of bucket.buildings) {
    let color = HOUSE_COLORS[b.id % HOUSE_COLORS.length];
    if (b.category === 'home') color = 0xf472b6; // Bright cheerful pink-coral "Your House"
    else if (b.category === 'school') color = 0xf59e0b;
    else if (b.category === 'other_school') color = 0xd97706;
    else if (b.category === 'library') color = 0x0ea5e9;
    else if (b.category === 'church') color = 0xfef9c3;
    else if (b.category === 'shop') color = SHOP_COLORS[b.id % SHOP_COLORS.length];

    const mat = new THREE.MeshStandardMaterial({ color, roughness: 0.78 });
    const geom = createExtrudedPolygon(b.polygon, b.height, 0);
    const mesh = new THREE.Mesh(geom, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    if (b.category === 'home') {
      const trimGeom = createExtrudedPolygon(b.polygon, 0.6, b.height);
      group.add(new THREE.Mesh(trimGeom, new THREE.MeshStandardMaterial({ color: 0xdb2777, roughness: 0.7 })));

      const sign = createLandmarkSign(
        '🏠 Your House',
        b.houseNumber ? `#${b.houseNumber} • Walk or Catch the Bus!` : 'Walk or Catch the Bus!',
        b.centroid.x,
        b.height + 2.4,
        b.centroid.z,
        '#be185d',
        6.5
      );
      group.add(sign);
    } else if (b.category === 'school') {
      const trimGeom = createExtrudedPolygon(b.polygon, 0.7, b.height);
      group.add(new THREE.Mesh(trimGeom, mats.roofSchool));

      const sign = createLandmarkSign(
        'Cootes Paradise Elementary School',
        '900 King St W  •  Welcome!',
        b.centroid.x,
        b.height + 3.0,
        b.centroid.z + 8,
        '#b91c1c',
        11.5
      );
      group.add(sign);
    } else if (b.category === 'library') {
      const trimGeom = createExtrudedPolygon(b.polygon, 0.6, b.height);
      group.add(new THREE.Mesh(trimGeom, new THREE.MeshStandardMaterial({ color: 0x0369a1, roughness: 0.7 })));

      const sign = createLandmarkSign(
        'Westdale Library',
        b.houseNumber ? `#${b.houseNumber} King St W` : 'Hamilton Public Library',
        b.centroid.x,
        b.height + 2.4,
        b.centroid.z,
        '#0369a1',
        7.5
      );
      group.add(sign);
    } else if (b.category === 'church') {
      const steeple = new THREE.Mesh(new THREE.ConeGeometry(2.4, 8.0, 4), mats.roofChurch);
      steeple.position.set(b.centroid.x, b.height + 4.0, b.centroid.z);
      group.add(steeple);

      if (b.name) {
        const sign = createLandmarkSign(b.name, 'Landmark', b.centroid.x, b.height + 2.2, b.centroid.z, '#4338ca', 7.5);
        group.add(sign);
      }
    } else if (b.category === 'shop' && b.name) {
      const sign = createLandmarkSign(b.name, b.houseNumber ? `#${b.houseNumber}` : '', b.centroid.x, b.height + 1.8, b.centroid.z, '#0f766e', 5.8);
      group.add(sign);
    }

    // Show street number plaque on every house/building facade, and welcoming entrance on public places!
    if (b.isPublicAccess && b.frontPt) {
      group.add(createPublicEntrance(b, mats));
    } else if (b.houseNumber && b.frontPt) {
      group.add(createHouseNumberPlaque(b.houseNumber, b.frontPt, b.frontAngle || 0));
    }
  }

  // 7. Decorative trees along parks
  let treeCount = 0;
  for (const park of bucket.parks) {
    if (treeCount > 24) break;
    for (let i = 0; i < park.polygon.length; i += 3) {
      if (treeCount > 24) break;
      const p = park.polygon[i];
      const tx = p.x + (park.centroid.x - p.x) * 0.22;
      const tz = p.z + (park.centroid.z - p.z) * 0.22;
      group.add(createLowPolyTree(tx, tz, 0.9 + (treeCount % 3) * 0.2));
      treeCount++;
    }
  }

  return group;
}

/**
 * Creates the glowing destination plaza & spinning star beacon at the chosen School / Destination.
 */
export function createSchoolBeacon(x, z, title = '🎯 Destination', subtitle = 'Cootes Paradise Elementary') {
  const group = new THREE.Group();
  group.position.set(x, 0, z);

  const pad = new THREE.Mesh(
    new THREE.CylinderGeometry(5.5, 5.8, 0.18, 24),
    new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.7 })
  );
  pad.position.y = 0.09;
  group.add(pad);

  const ring = new THREE.Mesh(
    new THREE.TorusGeometry(4.5, 0.18, 12, 32),
    new THREE.MeshStandardMaterial({
      color: 0x22c55e,
      emissive: 0x16a34a,
      emissiveIntensity: 0.7,
    })
  );
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.35;
  group.add(ring);

  const crystal = new THREE.Mesh(
    new THREE.OctahedronGeometry(1.1, 0),
    new THREE.MeshStandardMaterial({
      color: 0xfacc15,
      emissive: 0xf59e0b,
      emissiveIntensity: 0.7,
      flatShading: true,
    })
  );
  crystal.position.y = 3.2;
  crystal.name = 'beaconCrystal';
  group.add(crystal);

  const beam = new THREE.Mesh(
    new THREE.CylinderGeometry(0.6, 1.8, 22, 16, 1, true),
    new THREE.MeshBasicMaterial({
      color: 0xfde047,
      transparent: true,
      opacity: 0.16,
      side: THREE.DoubleSide,
      depthWrite: false,
    })
  );
  beam.position.y = 11;
  group.add(beam);

  const sign = createLandmarkSign(title, subtitle, 0, 5.4, 0, '#15803d', 7.2);
  sign.name = 'beaconSign';
  group.add(sign);

  return group;
}

/**
 * Builds bright, continuous paved safe walkways connecting the King Street West and
 * Cline Avenue North sidewalks directly into Cootes Paradise Elementary School grounds
 * and the entrance plaza beacon.
 * Returns { group, paths } where paths is an array of 2-point polylines for SafetyRules.
 */
export function createSchoolWalkways(destXZ, parsed) {
  const group = new THREE.Group();
  group.name = 'schoolWalkways';
  const paths = [];

  const pathMat = new THREE.MeshStandardMaterial({ color: 0xfbe5b2, roughness: 0.78 });
  const borderMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.7 });
  const poleMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.35, roughness: 0.5 });

  const targets = [
    { pattern: /king street/i, label: 'School Path', sub: 'King St W Entrance' },
    { pattern: /cline/i, label: 'School Path', sub: 'Cline Ave Entrance' },
  ];

  for (const t of targets) {
    let best = null;
    for (const r of parsed.roads) {
      if (!t.pattern.test(r.name)) continue;
      for (let i = 0; i < r.points.length - 1; i++) {
        const a = r.points[i];
        const b = r.points[i + 1];
        const hit = closestPointOnSegment2D(destXZ.x, destXZ.z, a.x, a.z, b.x, b.z);
        if (!best || hit.dist < best.dist) {
          best = { ...hit, road: r };
        }
      }
    }
    if (!best) continue;

    // Pull start point onto the sidewalk edge facing the school
    const vx = destXZ.x - best.x;
    const vz = destXZ.z - best.z;
    const len = Math.hypot(vx, vz) || 1;
    const ux = vx / len;
    const uz = vz / len;
    const curbOffset = best.road.width * 0.5 + 0.3;

    const startPt = { x: best.x + ux * curbOffset, z: best.z + uz * curbOffset };
    const endPt = { x: destXZ.x, z: destXZ.z };
    const pts = [startPt, endPt];
    paths.push({ name: t.sub, points: pts });

    // Raised warm paved walkway + golden curb border
    const borderGeom = buildRaisedSidewalkGeometry(pts, 4.0, 0.02, 0.145, 0);
    const walkGeom = buildRaisedSidewalkGeometry(pts, 3.4, 0.02, 0.165, 0);
    const borderMesh = new THREE.Mesh(borderGeom, borderMat);
    const walkMesh = new THREE.Mesh(walkGeom, pathMat);
    borderMesh.receiveShadow = true;
    walkMesh.receiveShadow = true;
    group.add(borderMesh, walkMesh);

    // Friendly entrance sign post beside the sidewalk entrance to the school path
    const perpX = -uz;
    const perpZ = ux;
    const postX = startPt.x + ux * 2.5 + perpX * 2.6;
    const postZ = startPt.z + uz * 2.5 + perpZ * 2.6;

    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.09, 3.0, 8), poleMat);
    pole.position.set(postX, 1.5, postZ);
    group.add(pole);

    const sign = createLandmarkSign(`🏫 ${t.label}`, t.sub, postX, 3.2, postZ, '#15803d', 3.4);
    group.add(sign);
  }

  return { group, paths };
}

/**
 * Builds a paved front walkway from Your House (either the default Westdale home or
 * any custom address anywhere on the map) directly to the nearest street sidewalk,
 * and returns a safe spawn pose on the walkway facing the street.
 */
export function createHomeWalkway(parsed, customHomeXZ = null, homeSubtitle = 'Walk or Catch the Bus!') {
  const group = new THREE.Group();
  group.name = 'homeWalkway';
  const paths = [];

  let homeCentroid = null;
  let isCustom = false;

  if (customHomeXZ) {
    homeCentroid = { x: customHomeXZ.x, z: customHomeXZ.z };
    isCustom = true;
  } else {
    const home = parsed.buildings.find((b) => b.category === 'home');
    if (home) homeCentroid = home.centroid;
  }

  if (!homeCentroid) return { group, paths, startPose: null, homePos: null };

  // Place a visible "🏠 Your House" sign at custom addresses
  if (isCustom) {
    const sign = createLandmarkSign(
      '🏠 Your House',
      homeSubtitle,
      homeCentroid.x,
      9.5,
      homeCentroid.z,
      '#be185d',
      6.8
    );
    group.add(sign);
  }

  let best = null;
  for (const r of parsed.roads) {
    if (r.highway === 'service') continue;
    for (let i = 0; i < r.points.length - 1; i++) {
      const a = r.points[i];
      const b = r.points[i + 1];
      const hit = closestPointOnSegment2D(homeCentroid.x, homeCentroid.z, a.x, a.z, b.x, b.z);
      if (!best || hit.dist < best.dist) best = { ...hit, road: r };
    }
  }

  if (!best) {
    return {
      group,
      paths,
      homePos: homeCentroid,
      startPose: { x: homeCentroid.x, z: homeCentroid.z, headingDeg: 0 },
    };
  }

  const dx = best.x - homeCentroid.x;
  const dz = best.z - homeCentroid.z;
  const len = Math.hypot(dx, dz) || 1;
  const ux = dx / len;
  const uz = dz / len;

  const sidewalkOffset = best.road.width * 0.5 + 1.0;
  const sidewalkPt = {
    x: best.x - ux * sidewalkOffset,
    z: best.z - uz * sidewalkOffset,
  };

  // Start the front door strictly OUTSIDE every building polygon so large apartment/condo
  // buildings (like 35 Charles St W) never trap the player inside their walls!
  const isInsideAnyBuilding = (px, pz) => {
    for (const b of parsed.buildings || []) {
      if (
        px >= b.bbox.minX - 0.6 &&
        px <= b.bbox.maxX + 0.6 &&
        pz >= b.bbox.minZ - 0.6 &&
        pz <= b.bbox.maxZ + 0.6 &&
        pointInPolygon2D(px, pz, b.polygon)
      ) {
        return true;
      }
    }
    return false;
  };

  let spawnX = sidewalkPt.x;
  let spawnZ = sidewalkPt.z;
  // Walk slightly back toward the house only if that point is strictly outside all buildings
  const tryMidX = sidewalkPt.x - ux * 1.4;
  const tryMidZ = sidewalkPt.z - uz * 1.4;
  if (!isInsideAnyBuilding(tryMidX, tryMidZ)) {
    spawnX = tryMidX;
    spawnZ = tryMidZ;
  }
  // If even sidewalkPt happens to overlap a huge building, nudge toward the road edge until free
  for (let step = 0; step < 8 && isInsideAnyBuilding(spawnX, spawnZ); step++) {
    spawnX += ux * 1.2;
    spawnZ += uz * 1.2;
  }

  const frontDoor = {
    x: spawnX - ux * 1.2,
    z: spawnZ - uz * 1.2,
  };

  const pts = [frontDoor, sidewalkPt];
  paths.push({ name: 'Your House Walkway', points: pts });

  const walkGeom = buildRaisedSidewalkGeometry(pts, 2.4, 0.02, 0.165, 0);
  const walkMesh = new THREE.Mesh(
    walkGeom,
    new THREE.MeshStandardMaterial({ color: 0xf5e6c8, roughness: 0.8 })
  );
  walkMesh.receiveShadow = true;
  group.add(walkMesh);

  const headingDeg = ((Math.atan2(ux, -uz) * 180) / Math.PI + 360) % 360;

  return {
    group,
    paths,
    homePos: homeCentroid,
    startPose: { x: spawnX, z: spawnZ, headingDeg },
  };
}

/**
 * Places 3 recognizable 3D Bus Stops along King Street West (near Marion Ave / Your House,
 * Paisley Ave / Westdale Library, and Cline Ave / Cootes Paradise Elementary School).
 */
export function createBusStops(parsed, destXZ) {
  const group = new THREE.Group();
  group.name = 'busStops';
  const stops = [];

  const kingRoads = parsed.roads.filter((r) => /king street west/i.test(r.name));
  const stopSpecs = [
    { name: 'Marion Ave Bus Stop (Near Your House)', targetX: -225, targetZ: 195 },
    { name: 'Westdale Library Bus Stop', targetX: -145, targetZ: 165 },
    { name: 'Cootes Paradise School Bus Stop', targetX: destXZ.x + 2, targetZ: destXZ.z + 76 },
  ];

  const poleMat = new THREE.MeshStandardMaterial({ color: 0x1d4ed8, metalness: 0.3, roughness: 0.5 });
  const roofMat = new THREE.MeshStandardMaterial({ color: 0x2563eb, roughness: 0.45 });
  const glassMat = new THREE.MeshStandardMaterial({
    color: 0xbae6fd,
    transparent: true,
    opacity: 0.55,
    roughness: 0.2,
  });
  const padMat = new THREE.MeshStandardMaterial({ color: 0xfef08a, roughness: 0.75 });

  for (const spec of stopSpecs) {
    let best = null;
    for (const r of kingRoads) {
      for (let i = 0; i < r.points.length - 1; i++) {
        const a = r.points[i];
        const b = r.points[i + 1];
        const hit = closestPointOnSegment2D(spec.targetX, spec.targetZ, a.x, a.z, b.x, b.z);
        if (!best || hit.dist < best.dist) {
          best = { ...hit, ax: a.x, az: a.z, bx: b.x, bz: b.z, road: r };
        }
      }
    }
    if (!best) continue;

    // Place bus shelter on the north sidewalk (smaller Z)
    const dx = best.bx - best.ax;
    const dz = best.bz - best.az;
    const len = Math.hypot(dx, dz) || 1;
    let nx = -dz / len;
    let nz = dx / len;
    if (nz > 0) {
      nx = -nx;
      nz = -nz;
    }

    const swDist = best.road.width * 0.5 + 1.8;
    const sx = best.x + nx * swDist;
    const sz = best.z + nz * swDist;

    const shelter = new THREE.Group();
    shelter.position.set(sx, 0.16, sz);
    shelter.rotation.y = Math.atan2(dx, dz);

    // Boarding pad
    const pad = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.04, 4.6), padMat);
    pad.position.y = 0.02;
    shelter.add(pad);

    // Shelter roof + back glass + 2 posts
    const roof = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.14, 3.4), roofMat);
    roof.position.set(0, 2.55, 0);
    shelter.add(roof);

    const glass = new THREE.Mesh(new THREE.BoxGeometry(0.08, 2.2, 3.1), glassMat);
    glass.position.set(-0.65, 1.3, 0);
    shelter.add(glass);

    for (const pz of [-1.45, 1.45]) {
      const post = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 2.5, 6), poleMat);
      post.position.set(-0.65, 1.25, pz);
      shelter.add(post);
    }

    // Bus Stop Signpost
    const signPole = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 3.2, 8), poleMat);
    signPole.position.set(0.5, 1.6, 2.0);
    shelter.add(signPole);

    const signTex = makeSignTexture(['🚌 BUS STOP', 'Press F to Ride'], '#1d4ed8', '#ffffff', '#facc15', 512, 160);
    const signBoard = new THREE.Mesh(
      new THREE.BoxGeometry(1.6, 0.55, 0.12),
      new THREE.MeshStandardMaterial({ map: signTex, roughness: 0.4 })
    );
    signBoard.position.set(0.5, 3.1, 2.0);
    shelter.add(signBoard);

    group.add(shelter);
    stops.push({
      name: spec.name,
      x: sx,
      z: sz,
      roadX: best.x,
      roadZ: best.z,
      isSchoolStop: /school/i.test(spec.name),
    });
  }

  return { group, stops };
}

/**
 * Creates a sleek black low-poly 3D Uber Sedan with a glowing roof UBER sign.
 */
export function createUberCarMesh() {
  const g = new THREE.Group();
  g.name = 'uberCar';

  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2.0, 0.76, 4.4),
    new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.35, metalness: 0.25 })
  );
  body.position.y = 0.68;
  body.castShadow = true;
  g.add(body);

  const trim = new THREE.Mesh(
    new THREE.BoxGeometry(2.04, 0.14, 4.42),
    new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.4 })
  );
  trim.position.y = 0.62;
  g.add(trim);

  const cabin = new THREE.Mesh(
    new THREE.BoxGeometry(1.7, 0.62, 2.2),
    new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.22 })
  );
  cabin.position.set(0, 1.34, -0.1);
  g.add(cabin);

  // Glowing roof beacon sign
  const beaconMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const beacon = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.22, 0.32), beaconMat);
  beacon.position.set(0, 1.76, -0.1);
  g.add(beacon);

  // Wheels
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.9 });
  const wheelGeom = new THREE.CylinderGeometry(0.36, 0.36, 0.26, 10);
  wheelGeom.rotateZ(Math.PI / 2);
  for (const wz of [-1.35, 1.35]) {
    for (const wx of [-0.98, 0.98]) {
      const w = new THREE.Mesh(wheelGeom, wheelMat);
      w.position.set(wx, 0.36, wz);
      g.add(w);
    }
  }

  g.userData = { beaconMat };
  return g;
}

export const DEFAULT_AVATAR_CONFIG = {
  skinColor: '#ffdbac',
  hairStyle: 'cap', // 'short' | 'long' | 'pigtails' | 'curly' | 'cap'
  hairColor: '#3b2f2f',
  outfitStyle: 'hoodie', // 'hoodie' | 'tshirt' | 'jacket'
  topColor: '#ef4444',
  pantsColor: '#1e3a8a',
  backpackColor: '#facc15',
};

/**
 * Creates a cheerful, customizable low-poly Student Avatar with a 3D face
 * (eyes, eyebrows, nose, ears, smiling mouth, rosy cheeks), selectable hairstyle,
 * outfit style, colors, and animated walking limbs.
 */
export function createPlayerAvatarMesh(rawConfig = {}) {
  const cfg = { ...DEFAULT_AVATAR_CONFIG, ...rawConfig };
  const g = new THREE.Group();
  g.name = 'playerAvatar';

  const pantsMat = new THREE.MeshStandardMaterial({ color: cfg.pantsColor, roughness: 0.8 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.7 });
  const topMat = new THREE.MeshStandardMaterial({ color: cfg.topColor, roughness: 0.65 });
  const skinMat = new THREE.MeshStandardMaterial({ color: cfg.skinColor, roughness: 0.6 });
  const hairMat = new THREE.MeshStandardMaterial({ color: cfg.hairColor, roughness: 0.82 });
  const packMat = new THREE.MeshStandardMaterial({ color: cfg.backpackColor, roughness: 0.6 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.4 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 });
  const blushMat = new THREE.MeshStandardMaterial({ color: 0xfb7185, roughness: 0.8 });
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0xbe123c, roughness: 0.6 });

  // Legs with hip pivots
  const leftLegPivot = new THREE.Group();
  leftLegPivot.position.set(-0.13, 0.58, 0);
  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.54, 0.18), pantsMat);
  leftLeg.position.y = -0.27;
  leftLeg.castShadow = true;
  const leftShoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.28), shoeMat);
  leftShoe.position.set(0, -0.53, 0.04);
  leftLegPivot.add(leftLeg, leftShoe);
  g.add(leftLegPivot);

  const rightLegPivot = new THREE.Group();
  rightLegPivot.position.set(0.13, 0.58, 0);
  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.54, 0.18), pantsMat);
  rightLeg.position.y = -0.27;
  rightLeg.castShadow = true;
  const rightShoe = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.1, 0.28), shoeMat);
  rightShoe.position.set(0, -0.53, 0.04);
  rightLegPivot.add(rightLeg, rightShoe);
  g.add(rightLegPivot);

  // Torso (hoodie, t-shirt, or zip-up jacket)
  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.58, 0.28), topMat);
  torso.position.y = 0.87;
  torso.castShadow = true;
  g.add(torso);

  if (cfg.outfitStyle === 'jacket') {
    const zipStripe = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.57, 0.295), whiteMat);
    zipStripe.position.y = 0.87;
    g.add(zipStripe);
  } else if (cfg.outfitStyle === 'hoodie') {
    const hood = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.16, 0.14), topMat);
    hood.position.set(0, 1.12, -0.15);
    g.add(hood);
  }

  // Neck
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.085, 0.095, 0.12, 10), skinMat);
  neck.position.y = 1.19;
  g.add(neck);

  // School backpack on the back (-Z is back when facing +Z)
  const backpack = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.42, 0.17), packMat);
  backpack.position.set(0, 0.88, -0.22);
  backpack.castShadow = true;
  g.add(backpack);

  // Arms with shoulder pivots (short sleeves for t-shirt, full sleeves for hoodie/jacket + cute hands)
  const buildArm = (xPos) => {
    const pivot = new THREE.Group();
    pivot.position.set(xPos, 1.1, 0);
    if (cfg.outfitStyle === 'tshirt') {
      const sleeve = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.18, 0.16), topMat);
      sleeve.position.y = -0.08;
      const lowerArm = new THREE.Mesh(new THREE.BoxGeometry(0.13, 0.28, 0.13), skinMat);
      lowerArm.position.y = -0.3;
      pivot.add(sleeve, lowerArm);
    } else {
      const fullArm = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.44, 0.15), topMat);
      fullArm.position.y = -0.2;
      pivot.add(fullArm);
    }
    const hand = new THREE.Mesh(new THREE.SphereGeometry(0.075, 8, 8), skinMat);
    hand.position.y = -0.46;
    pivot.add(hand);
    return pivot;
  };
  const leftArmPivot = buildArm(-0.32);
  const rightArmPivot = buildArm(0.32);
  g.add(leftArmPivot, rightArmPivot);

  // Head + Expressive 3D Face (faces +Z)
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 1.43, 0);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.24, 16, 14), skinMat);
  head.castShadow = true;
  headGroup.add(head);

  // Ears (left & right)
  const earGeom = new THREE.SphereGeometry(0.055, 10, 8);
  earGeom.scale(0.65, 1.0, 0.85);
  const leftEar = new THREE.Mesh(earGeom, skinMat);
  leftEar.position.set(-0.23, -0.01, 0.01);
  const rightEar = new THREE.Mesh(earGeom, skinMat);
  rightEar.position.set(0.23, -0.01, 0.01);
  headGroup.add(leftEar, rightEar);

  // Eyes (white sclera + dark pupils + shiny catchlights + eyebrows)
  for (const sx of [-0.085, 0.085]) {
    const eyeWhite = new THREE.Mesh(new THREE.SphereGeometry(0.044, 10, 10), whiteMat);
    eyeWhite.position.set(sx, 0.035, 0.205);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.025, 10, 10), darkMat);
    pupil.position.set(sx, 0.035, 0.232);
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.009, 6, 6), whiteMat);
    glint.position.set(sx + 0.01, 0.047, 0.248);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.075, 0.018, 0.02), hairMat);
    brow.position.set(sx, 0.095, 0.215);
    headGroup.add(eyeWhite, pupil, glint, brow);
  }

  // Cute 3D Nose
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.032, 10, 8), skinMat);
  nose.scale.set(0.95, 0.85, 1.2);
  nose.position.set(0, -0.015, 0.238);
  headGroup.add(nose);

  // Rosy Cheeks
  for (const sx of [-0.13, 0.13]) {
    const cheek = new THREE.Mesh(new THREE.SphereGeometry(0.028, 8, 8), blushMat);
    cheek.scale.set(1.1, 0.7, 0.4);
    cheek.position.set(sx, -0.04, 0.205);
    headGroup.add(cheek);
  }

  // Smiling Mouth (3D curved arc)
  const smileGeom = new THREE.TorusGeometry(0.06, 0.014, 8, 16, Math.PI * 0.82);
  const mouth = new THREE.Mesh(smileGeom, mouthMat);
  mouth.position.set(0, -0.065, 0.212);
  mouth.rotation.z = Math.PI * 1.09;
  headGroup.add(mouth);

  // Selectable Hairstyles
  if (cfg.hairStyle === 'cap') {
    const capMat = new THREE.MeshStandardMaterial({ color: cfg.topColor, roughness: 0.7 });
    const hairBack = new THREE.Mesh(
      new THREE.SphereGeometry(0.248, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.58),
      hairMat
    );
    hairBack.position.y = 0.02;
    const capDome = new THREE.Mesh(
      new THREE.SphereGeometry(0.256, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.48),
      capMat
    );
    capDome.position.y = 0.045;
    const capBrim = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.04, 0.22), capMat);
    capBrim.position.set(0, 0.075, 0.22);
    headGroup.add(hairBack, capDome, capBrim);
  } else if (cfg.hairStyle === 'long') {
    const hairTop = new THREE.Mesh(
      new THREE.SphereGeometry(0.255, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56),
      hairMat
    );
    hairTop.position.y = 0.025;
    const hairBack = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.46, 0.16), hairMat);
    hairBack.position.set(0, -0.14, -0.17);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.38, 0.18), hairMat);
    sideL.position.set(-0.22, -0.1, -0.03);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.38, 0.18), hairMat);
    sideR.position.set(0.22, -0.1, -0.03);
    headGroup.add(hairTop, hairBack, sideL, sideR);
  } else if (cfg.hairStyle === 'pigtails') {
    const hairTop = new THREE.Mesh(
      new THREE.SphereGeometry(0.255, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56),
      hairMat
    );
    hairTop.position.y = 0.025;
    const puffGeom = new THREE.SphereGeometry(0.135, 12, 10);
    const puffL = new THREE.Mesh(puffGeom, hairMat);
    puffL.position.set(-0.29, 0.06, -0.05);
    const puffR = new THREE.Mesh(puffGeom, hairMat);
    puffR.position.set(0.29, 0.06, -0.05);
    const tieMat = new THREE.MeshStandardMaterial({ color: cfg.backpackColor, roughness: 0.5 });
    const tieL = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.018, 6, 12), tieMat);
    tieL.position.set(-0.24, 0.06, -0.04);
    tieL.rotation.y = Math.PI / 2;
    const tieR = new THREE.Mesh(new THREE.TorusGeometry(0.055, 0.018, 6, 12), tieMat);
    tieR.position.set(0.24, 0.06, -0.04);
    tieR.rotation.y = Math.PI / 2;
    headGroup.add(hairTop, puffL, puffR, tieL, tieR);
  } else if (cfg.hairStyle === 'curly') {
    const curlOffsets = [
      [0, 0.2, 0], [-0.14, 0.17, 0.04], [0.14, 0.17, 0.04],
      [-0.2, 0.08, -0.05], [0.2, 0.08, -0.05], [0, 0.14, -0.16],
      [-0.14, 0.08, -0.16], [0.14, 0.08, -0.16], [0, 0.21, 0.1],
    ];
    const curlGeom = new THREE.SphereGeometry(0.115, 10, 8);
    for (const [cx, cy, cz] of curlOffsets) {
      const c = new THREE.Mesh(curlGeom, hairMat);
      c.position.set(cx, cy, cz);
      headGroup.add(c);
    }
  } else {
    // 'short' classic hair
    const hairTop = new THREE.Mesh(
      new THREE.SphereGeometry(0.255, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.54),
      hairMat
    );
    hairTop.position.y = 0.03;
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.07, 0.1), hairMat);
    bangs.position.set(0, 0.16, 0.17);
    headGroup.add(hairTop, bangs);
  }

  g.add(headGroup);

  g.userData = { leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot, headGroup };
  return g;
}

/**
 * Recursively disposes geometries, materials, and textures in a chunk group to prevent memory leaks.
 */
export function disposeGroup(group) {
  group.traverse((obj) => {
    if (obj.geometry) {
      obj.geometry.dispose();
    }
    if (obj.material) {
      const materials = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const mat of materials) {
        if (mat.map) mat.map.dispose();
        mat.dispose();
      }
    }
  });
}
