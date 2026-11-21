/**
 * Coordinate projection & spatial invariants (per GEMINI.md):
 *   x = (lon - originLon) * 111320 * Math.cos(originLat * Math.PI / 180)   (East = +X)
 *   z = -(lat - originLat) * 111320                                         (North = -Z)
 *
 * Heading alignment:
 *   Three.js camera facing -Z (yaw = 0) -> North (0° / up on Leaflet mini-map).
 *   Turning right (-Y rotation) -> rotates mini-map arrow clockwise toward East (+X, 90°).
 */

export const ORIGIN = {
  lat: 43.26407,
  lon: -79.90231,
};

export const CHUNK_SIZE = 300; // 300m x 300m grid chunks

const METERS_PER_DEG_LAT = 111320;
const COS_ORIGIN_LAT = Math.cos((ORIGIN.lat * Math.PI) / 180);
const METERS_PER_DEG_LON = METERS_PER_DEG_LAT * COS_ORIGIN_LAT;

export function latLonToXZ(lat, lon, origin = ORIGIN) {
  const cosLat = origin === ORIGIN ? COS_ORIGIN_LAT : Math.cos((origin.lat * Math.PI) / 180);
  const x = (lon - origin.lon) * METERS_PER_DEG_LAT * cosLat;
  const z = -(lat - origin.lat) * METERS_PER_DEG_LAT;
  return { x, z };
}

export function xzToLatLon(x, z, origin = ORIGIN) {
  const cosLat = origin === ORIGIN ? COS_ORIGIN_LAT : Math.cos((origin.lat * Math.PI) / 180);
  const lat = origin.lat - z / METERS_PER_DEG_LAT;
  const lon = origin.lon + x / (METERS_PER_DEG_LAT * cosLat);
  return { lat, lon };
}

/**
 * Given a world-space forward direction vector (dx, dz), returns compass heading in degrees:
 *   0° = North (-Z), 90° = East (+X), 180° = South (+Z), 270° = West (-X).
 */
export function forwardToHeadingDeg(dx, dz) {
  const rad = Math.atan2(dx, -dz);
  return ((rad * 180) / Math.PI + 360) % 360;
}

export function headingToCardinal(deg) {
  const dirs = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  const idx = Math.round((((deg % 360) + 360) % 360) / 45) % 8;
  return dirs[idx];
}

export function getChunkCoords(x, z) {
  return {
    gx: Math.floor(x / CHUNK_SIZE),
    gz: Math.floor(z / CHUNK_SIZE),
  };
}

export function chunkId(gx, gz) {
  return `chunk_${gx}_${gz}`;
}

export function chunkBoundsLatLon(gx, gz) {
  const minX = gx * CHUNK_SIZE;
  const maxX = (gx + 1) * CHUNK_SIZE;
  const minZ = gz * CHUNK_SIZE;
  const maxZ = (gz + 1) * CHUNK_SIZE;
  // North is -Z (smaller z -> larger lat)
  const nw = xzToLatLon(minX, minZ);
  const se = xzToLatLon(maxX, maxZ);
  return {
    south: se.lat,
    west: nw.lon,
    north: nw.lat,
    east: se.lon,
  };
}

export function dist2D(ax, az, bx, bz) {
  return Math.hypot(bx - ax, bz - az);
}

/**
 * Closest point on segment AB to point P in 2D (x, z).
 */
export function closestPointOnSegment2D(px, pz, ax, az, bx, bz) {
  const vx = bx - ax;
  const vz = bz - az;
  const lenSq = vx * vx + vz * vz;
  if (lenSq < 1e-8) {
    return { x: ax, z: az, t: 0, dist: Math.hypot(px - ax, pz - az) };
  }
  let t = ((px - ax) * vx + (pz - az) * vz) / lenSq;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * vx;
  const cz = az + t * vz;
  return { x: cx, z: cz, t, dist: Math.hypot(px - cx, pz - cz) };
}

/**
 * Point-in-polygon test in 2D (x, z).
 */
export function pointInPolygon2D(px, pz, poly) {
  let inside = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const xi = poly[i].x;
    const zi = poly[i].z;
    const xj = poly[j].x;
    const zj = poly[j].z;
    const intersect = zi > pz !== zj > pz && px < ((xj - xi) * (pz - zi)) / (zj - zi + 1e-12) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}
