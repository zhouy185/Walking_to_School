/**
 * Parses Overpass API JSON elements into local 3D meter coordinates (x, z)
 * and extracts roads (using REAL OSM lanes, oneway, cycleway, width & sidewalk tags),
 * explicit OSM sidewalks/footways/crossings, intersections, crosswalks, traffic signals,
 * buildings (with landmark types & signs), and parks.
 */

import {
  latLonToXZ,
  dist2D,
  closestPointOnSegment2D,
  pointInPolygon2D,
  getChunkCoords,
  chunkId,
} from '../geo.js';

const DRIVEABLE_HIGHWAYS = new Set([
  'primary',
  'secondary',
  'tertiary',
  'residential',
  'unclassified',
  'living_street',
  'service',
]);

const FOOTWAY_HIGHWAYS = new Set(['footway', 'path', 'pedestrian', 'steps', 'cycleway']);

function parsePositiveInt(val) {
  const n = Number.parseInt(val, 10);
  return Number.isFinite(n) && n > 0 ? n : null;
}

function parseMeters(val) {
  if (!val) return null;
  const n = Number.parseFloat(String(val).replace(/m$/i, '').trim());
  return Number.isFinite(n) && n > 1.5 && n < 35 ? n : null;
}

/**
 * Computes road geometry specs directly from real OSM tags (lanes, lanes:forward,
 * lanes:backward, oneway, cycleway, width, sidewalk).
 */
function roadSpec(tags) {
  const highway = tags.highway;
  const name = tags.name || '';
  const isKing = /king street/i.test(name);
  const isMajor = isKing || highway === 'primary' || highway === 'secondary' || highway === 'tertiary';
  const oneway = tags.oneway === 'yes' || tags.oneway === '1' || tags.oneway === 'true';

  const taggedLanes = parsePositiveInt(tags.lanes);
  const taggedFwd = parsePositiveInt(tags['lanes:forward']);
  const taggedBwd = parsePositiveInt(tags['lanes:backward']);

  let lanes = taggedLanes;
  let lanesForward = taggedFwd;
  let lanesBackward = taggedBwd;

  if (oneway) {
    lanes = lanes || taggedFwd || (highway === 'service' ? 1 : isMajor ? 2 : 1);
    lanesForward = lanes;
    lanesBackward = 0;
  } else {
    if (lanesForward && lanesBackward) {
      lanes = lanes || lanesForward + lanesBackward;
    } else if (lanes) {
      if (lanes === 1) {
        lanesForward = 1;
        lanesBackward = 0;
      } else {
        lanesForward = lanesForward || Math.ceil(lanes / 2);
        lanesBackward = lanesBackward || Math.max(1, lanes - lanesForward);
      }
    } else {
      // Fallback when OSM way lacks a lanes tag
      lanes = highway === 'service' ? 1 : 2;
      lanesForward = lanes === 1 ? 1 : 1;
      lanesBackward = lanes === 1 ? 0 : 1;
    }
  }

  // Real bike lane tags from OSM
  const hasBikeLeft =
    tags['cycleway:left'] === 'lane' ||
    tags['cycleway:both'] === 'lane' ||
    (tags.cycleway === 'lane' && !oneway);
  const hasBikeRight =
    tags['cycleway:right'] === 'lane' ||
    tags['cycleway:both'] === 'lane' ||
    tags.cycleway === 'lane';

  const laneWidth = highway === 'service' ? 3.8 : isMajor ? 3.3 : 3.05;
  const bikeLaneWidth = 1.45;
  const bikeTotal = (hasBikeLeft ? bikeLaneWidth : 0) + (hasBikeRight ? bikeLaneWidth : 0);

  const taggedWidth = parseMeters(tags.width);
  const vehicleWidth = lanes * laneWidth;
  const width = taggedWidth ? Math.max(taggedWidth, vehicleWidth) : vehicleWidth + bikeTotal;

  // OSM sidewalk tags (sidewalk=both|left|right|no|separate)
  const swTag = (tags.sidewalk || '').toLowerCase();
  const swLeftTag = (tags['sidewalk:left'] || '').toLowerCase();
  const swRightTag = (tags['sidewalk:right'] || '').toLowerCase();

  let wantsLeftSidewalk = highway !== 'service';
  let wantsRightSidewalk = highway !== 'service';
  if (swTag === 'no' || swTag === 'none') {
    wantsLeftSidewalk = false;
    wantsRightSidewalk = false;
  } else if (swTag === 'left') {
    wantsLeftSidewalk = true;
    wantsRightSidewalk = false;
  } else if (swTag === 'right') {
    wantsLeftSidewalk = false;
    wantsRightSidewalk = true;
  }
  if (swLeftTag === 'no' || swLeftTag === 'none') wantsLeftSidewalk = false;
  if (swRightTag === 'no' || swRightTag === 'none') wantsRightSidewalk = false;
  if (swLeftTag === 'yes' || swLeftTag === 'separate') wantsLeftSidewalk = true;
  if (swRightTag === 'yes' || swRightTag === 'separate') wantsRightSidewalk = true;

  return {
    width,
    laneWidth,
    lanes,
    lanesForward,
    lanesBackward,
    oneway,
    hasBikeLeft,
    hasBikeRight,
    bikeLaneWidth,
    sidewalkWidth: highway === 'service' ? 1.4 : isMajor ? 2.4 : 1.9,
    wantsLeftSidewalk,
    wantsRightSidewalk,
    hasExplicitLeftSidewalk: false,
    hasExplicitRightSidewalk: false,
    isMajor,
    speedLimit: isMajor ? 9.8 : highway === 'service' ? 5.5 : 7.2,
  };
}

function polygonCentroid(pts) {
  let sx = 0;
  let sz = 0;
  for (const p of pts) {
    sx += p.x;
    sz += p.z;
  }
  return { x: sx / pts.length, z: sz / pts.length };
}

function polygonArea(pts) {
  let area = 0;
  for (let i = 0; i < pts.length; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % pts.length];
    area += a.x * b.z - b.x * a.z;
  }
  return Math.abs(area) * 0.5;
}

function polygonBBox(pts) {
  let minX = Infinity;
  let maxX = -Infinity;
  let minZ = Infinity;
  let maxZ = -Infinity;
  for (const p of pts) {
    if (p.x < minX) minX = p.x;
    if (p.x > maxX) maxX = p.x;
    if (p.z < minZ) minZ = p.z;
    if (p.z > maxZ) maxZ = p.z;
  }
  return { minX, maxX, minZ, maxZ };
}

/**
 * Checks whether an explicit OSM footway=sidewalk already runs parallel to a given side
 * (+1 = right side, -1 = left side) of a road midpoint, so we use the real OSM sidewalk
 * instead of overlapping a synthetic strip on top of it.
 */
function hasParallelExplicitSidewalk(road, sideSign, explicitSidewalks) {
  if (explicitSidewalks.length === 0) return false;
  const midIdx = Math.floor((road.points.length - 1) / 2);
  const a = road.points[midIdx];
  const b = road.points[midIdx + 1] || a;
  const dx = b.x - a.x;
  const dz = b.z - a.z;
  const len = Math.hypot(dx, dz);
  if (len < 0.5) return false;

  // Right-hand perpendicular in XZ plane: px = -dz/len, pz = dx/len
  const px = (-dz / len) * sideSign;
  const pz = (dx / len) * sideSign;
  const mx = (a.x + b.x) * 0.5;
  const mz = (a.z + b.z) * 0.5;

  // Expected sidewalk probe point just outside road curb
  const probeDist = road.width * 0.5 + 2.4;
  const qx = mx + px * probeDist;
  const qz = mz + pz * probeDist;

  for (const sw of explicitSidewalks) {
    for (let i = 0; i < sw.points.length - 1; i++) {
      const s1 = sw.points[i];
      const s2 = sw.points[i + 1];
      const hit = closestPointOnSegment2D(qx, qz, s1.x, s1.z, s2.x, s2.z);
      if (hit.dist < 3.6) {
        // Verify roughly parallel
        const sdx = s2.x - s1.x;
        const sdz = s2.z - s1.z;
        const slen = Math.hypot(sdx, sdz) || 1;
        const dot = Math.abs((dx / len) * (sdx / slen) + (dz / len) * (sdz / slen));
        if (dot > 0.72) return true;
      }
    }
  }
  return false;
}

export function parseOsmElements(elements) {
  const nodeMap = new Map();
  const ways = [];

  for (const el of elements) {
    if (el.type === 'node') {
      const existing = nodeMap.get(el.id);
      if (existing) {
        // Merge tags so Overpass `>; out skel qt;` never wipes out tags from `out body;`!
        if (el.tags) {
          existing.tags = { ...existing.tags, ...el.tags };
        }
      } else {
        const xz = latLonToXZ(el.lat, el.lon);
        nodeMap.set(el.id, {
          id: el.id,
          lat: el.lat,
          lon: el.lon,
          x: xz.x,
          z: xz.z,
          tags: el.tags ? { ...el.tags } : {},
        });
      }
    } else if (el.type === 'way') {
      ways.push(el);
    }
  }

  const amenityPolys = [];
  const parks = [];
  const parkingLots = [];
  const poiNodes = [];

  for (const node of nodeMap.values()) {
    if (node.tags.name && (node.tags.amenity || node.tags.shop)) {
      poiNodes.push(node);
    }
  }

  // Also collect standalone address nodes so nearby buildings inherit real street numbers
  const addrNodes = [];
  for (const node of nodeMap.values()) {
    if (node.tags['addr:housenumber']) {
      addrNodes.push(node);
    }
  }

  const roads = [];
  const footways = [];
  const rawBuildings = [];
  const nodeToRoads = new Map();

  for (const way of ways) {
    const tags = way.tags || {};
    const pts = [];
    for (const nid of way.nodes || []) {
      const n = nodeMap.get(nid);
      if (n) pts.push({ id: n.id, x: n.x, z: n.z, lat: n.lat, lon: n.lon, tags: n.tags });
    }
    if (pts.length < 2) continue;

    if (tags.highway && DRIVEABLE_HIGHWAYS.has(tags.highway)) {
      const name = tags.name || '';
      const spec = roadSpec(tags);
      const road = {
        id: way.id,
        name,
        highway: tags.highway,
        service: tags.service || '',
        ...spec,
        points: pts,
      };
      roads.push(road);

      for (let i = 0; i < pts.length; i++) {
        const nid = pts[i].id;
        if (!nodeToRoads.has(nid)) nodeToRoads.set(nid, []);
        nodeToRoads.get(nid).push({ road, index: i });
      }
    } else if (tags.highway && FOOTWAY_HIGHWAYS.has(tags.highway)) {
      footways.push({
        id: way.id,
        name: tags.name || '',
        highway: tags.highway,
        footwayType: tags.footway || (tags.highway === 'cycleway' ? 'cycleway' : 'path'),
        points: pts,
      });
    } else if (
      tags.amenity === 'parking' &&
      !tags.building &&
      !/underground|multi-storey|rooftop/i.test(tags.parking || '') &&
      pts.length >= 3
    ) {
      // Surface parking lot outline → painted stalls + parked cars
      const poly = pts[0].id === pts[pts.length - 1].id ? pts.slice(0, -1) : pts;
      if (poly.length >= 3 && polygonArea(poly) >= 60) {
        parkingLots.push({ id: way.id, name: tags.name || '', polygon: poly, centroid: polygonCentroid(poly) });
      }
    } else if (tags.building && pts.length >= 3) {
      const poly = pts[0].id === pts[pts.length - 1].id ? pts.slice(0, -1) : pts;
      if (poly.length >= 3 && polygonArea(poly) >= 12) {
        rawBuildings.push({
          id: way.id,
          tags,
          polygon: poly,
          centroid: polygonCentroid(poly),
          bbox: polygonBBox(poly),
        });
      }
    } else if (
      (tags.amenity === 'school' ||
        tags.leisure === 'park' ||
        tags.leisure === 'playground' ||
        tags.leisure === 'pitch' ||
        tags.leisure === 'nature_reserve' ||
        tags.natural === 'wood' ||
        tags.landuse === 'forest') &&
      pts.length >= 3
    ) {
      const poly = pts[0].id === pts[pts.length - 1].id ? pts.slice(0, -1) : pts;
      if (poly.length >= 3) {
        const item = {
          id: way.id,
          name: tags.name || '',
          kind:
            tags.amenity === 'school'
              ? 'school_grounds'
              : tags.natural === 'wood' || tags.landuse === 'forest'
                ? 'wood'
                : tags.leisure || 'park',
          polygon: poly,
          centroid: polygonCentroid(poly),
        };
        if (tags.amenity === 'school') amenityPolys.push(item);
        parks.push(item);
      }
    }
  }

  // Every non-service road always builds clean raised curb sidewalks on both sides
  // so street sidewalks and intersection zebra crossings align edge-to-edge cleanly.
  for (const road of roads) {
    if (road.highway === 'service') continue;
    road.hasExplicitRightSidewalk = false;
    road.hasExplicitLeftSidewalk = false;
  }

  // Classify buildings, attach landmark names, real OSM street numbers,
  // street-facing facade orientation, and public-access placeType!
  const nonServiceRoads = roads.filter((r) => r.highway !== 'service' && r.points.length >= 2);
  const usedPoiIds = new Set();
  const usedAddrIds = new Set();

  const buildings = rawBuildings.map((b) => {
    const t = { ...b.tags };
    let name = t.name || '';
    let houseNumber = t['addr:housenumber'] || '';
    let streetAddr = t['addr:street'] || '';
    let category = 'house';
    let placeType = 'house';
    let isPublicAccess = false;
    let height = 7.0;

    if (!name && (t.building === 'school' || dist2D(b.centroid.x, b.centroid.z, 0, 0) < 45)) {
      for (const ap of amenityPolys) {
        if (pointInPolygon2D(b.centroid.x, b.centroid.z, ap.polygon)) {
          name = ap.name;
          break;
        }
      }
    }

    if (!name && t.building === 'school' && dist2D(b.centroid.x, b.centroid.z, 0, 0) < 60) {
      name = 'Cootes Paradise Elementary School';
      houseNumber = houseNumber || '900';
      streetAddr = streetAddr || 'King Street West';
    }

    // Match POI node inside building (or very close within 10m if unnamed)
    if (!name) {
      let bestPoi = null;
      let bestPoiDist = Infinity;
      for (const poi of poiNodes) {
        if (usedPoiIds.has(poi.id)) continue;
        const inside =
          poi.x >= b.bbox.minX - 2 &&
          poi.x <= b.bbox.maxX + 2 &&
          poi.z >= b.bbox.minZ - 2 &&
          poi.z <= b.bbox.maxZ + 2 &&
          pointInPolygon2D(poi.x, poi.z, b.polygon);
        if (inside) {
          bestPoi = poi;
          bestPoiDist = 0;
          break;
        }
        const d = dist2D(poi.x, poi.z, b.centroid.x, b.centroid.z);
        if (d < 13 && d < bestPoiDist) {
          bestPoiDist = d;
          bestPoi = poi;
        }
      }
      if (bestPoi) {
        usedPoiIds.add(bestPoi.id);
        name = bestPoi.tags.name;
        if (!t.shop && bestPoi.tags.shop) t.shop = bestPoi.tags.shop;
        if (!t.amenity && bestPoi.tags.amenity) t.amenity = bestPoi.tags.amenity;
        if (!houseNumber && bestPoi.tags['addr:housenumber']) {
          houseNumber = bestPoi.tags['addr:housenumber'];
        }
        if (!streetAddr && bestPoi.tags['addr:street']) {
          streetAddr = bestPoi.tags['addr:street'];
        }
      }
    }

    // Inherit real OSM addr:housenumber from standalone address node (inside polygon first, else closest edge within 10m)
    if (!houseNumber && addrNodes.length > 0) {
      let bestAddr = null;
      let bestAddrDist = Infinity;
      for (const an of addrNodes) {
        if (usedAddrIds.has(an.id)) continue;
        if (
          an.x >= b.bbox.minX - 1.5 &&
          an.x <= b.bbox.maxX + 1.5 &&
          an.z >= b.bbox.minZ - 1.5 &&
          an.z <= b.bbox.maxZ + 1.5 &&
          pointInPolygon2D(an.x, an.z, b.polygon)
        ) {
          bestAddr = an;
          bestAddrDist = 0;
          break;
        }
        // Quick bbox reject before checking exact polygon edge distance
        if (
          an.x < b.bbox.minX - 11 ||
          an.x > b.bbox.maxX + 11 ||
          an.z < b.bbox.minZ - 11 ||
          an.z > b.bbox.maxZ + 11
        ) {
          continue;
        }
        let edgeDist = Infinity;
        for (let i = 0; i < b.polygon.length; i++) {
          const p1 = b.polygon[i];
          const p2 = b.polygon[(i + 1) % b.polygon.length];
          const h = closestPointOnSegment2D(an.x, an.z, p1.x, p1.z, p2.x, p2.z);
          if (h.dist < edgeDist) edgeDist = h.dist;
        }
        if (edgeDist < 10.5 && edgeDist < bestAddrDist) {
          bestAddrDist = edgeDist;
          bestAddr = an;
        }
      }
      if (bestAddr) {
        usedAddrIds.add(bestAddr.id);
        houseNumber = bestAddr.tags['addr:housenumber'];
        streetAddr = streetAddr || bestAddr.tags['addr:street'] || '';
      }
    }

    // Find nearest street segment & facade point facing the street
    let nearestRoadHit = null;
    let nearestRoad = null;
    for (const r of nonServiceRoads) {
      for (let i = 0; i < r.points.length - 1; i++) {
        const a = r.points[i];
        const c = r.points[i + 1];
        const hit = closestPointOnSegment2D(b.centroid.x, b.centroid.z, a.x, a.z, c.x, c.z);
        if (!nearestRoadHit || hit.dist < nearestRoadHit.dist) {
          nearestRoadHit = hit;
          nearestRoad = r;
        }
      }
    }

    if (!streetAddr && nearestRoad?.name) {
      streetAddr = nearestRoad.name;
    }

    // Find building polygon edge closest to the nearest street and push outward along
    // the edge's true outward normal so plaques & doors never clip inside the wall!
    let frontPt = { x: b.centroid.x, z: b.centroid.z };
    let frontAngle = 0;
    if (nearestRoadHit) {
      let bestEdgeDist = Infinity;
      const poly = b.polygon;
      for (let i = 0; i < poly.length; i++) {
        const p1 = poly[i];
        const p2 = poly[(i + 1) % poly.length];
        const edx = p2.x - p1.x;
        const edz = p2.z - p1.z;
        const elen = Math.hypot(edx, edz);
        if (elen < 1.0) continue;
        const mx = (p1.x + p2.x) * 0.5;
        const mz = (p1.z + p2.z) * 0.5;
        const d = dist2D(mx, mz, nearestRoadHit.x, nearestRoadHit.z);
        if (d < bestEdgeDist) {
          bestEdgeDist = d;
          // Compute outward perpendicular normal to edge (p1 -> p2) pointing toward street
          let nx = -edz / elen;
          let nz = edx / elen;
          const toStreetX = nearestRoadHit.x - mx;
          const toStreetZ = nearestRoadHit.z - mz;
          if (nx * toStreetX + nz * toStreetZ < 0) {
            nx = -nx;
            nz = -nz;
          }
          frontPt = { x: mx + nx * 0.35, z: mz + nz * 0.35 };
          frontAngle = Math.atan2(nx, nz);
        }
      }
    }

    const lowerName = name.toLowerCase();
    const isNearKing = nearestRoad && /king street/i.test(nearestRoad.name) && nearestRoadHit.dist < 32;
    const shopTag = (t.shop || '').toLowerCase();
    const amenTag = (t.amenity || '').toLowerCase();

    const parsedLevels = Number.parseInt(t['building:levels'], 10);
    const clampFloors = (n) => Math.max(1, Math.min(4, Math.round(n)));
    let floors = Number.isFinite(parsedLevels) && parsedLevels >= 1 ? clampFloors(parsedLevels) : 2;

    if (b.id === 836552889) {
      category = 'home';
      placeType = 'home';
      name = 'Your House';
      floors = 2;
    } else if (
      lowerName.includes('cootes paradise') ||
      (t.building === 'school' && dist2D(b.centroid.x, b.centroid.z, 0, 0) < 70)
    ) {
      category = 'school';
      placeType = 'school';
      isPublicAccess = true;
      name = name || 'Cootes Paradise Elementary School';
      houseNumber = '900';
      floors = 3;
    } else if (t.building === 'school' || lowerName.includes('school')) {
      category = 'other_school';
      placeType = 'school';
      isPublicAccess = true;
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : 3;
    } else if (amenTag === 'library' || lowerName.includes('library')) {
      category = 'library';
      placeType = 'library';
      isPublicAccess = true;
      name = 'Westdale Library';
      floors = 2;
    } else if (
      t.building === 'church' ||
      amenTag === 'place_of_worship' ||
      lowerName.includes('church') ||
      lowerName.includes('synagogue')
    ) {
      category = 'church';
      placeType = 'church';
      isPublicAccess = true;
      floors = 2;
    } else if (
      ['supermarket', 'convenience', 'butcher', 'greengrocer', 'grocery'].includes(shopTag) ||
      /food basics|foodmart|market|grocery/i.test(name)
    ) {
      category = 'shop';
      placeType = 'grocery';
      isPublicAccess = true;
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : (b.id % 3 === 0 ? 1 : 2);
    } else if (
      amenTag === 'restaurant' ||
      amenTag === 'fast_food' ||
      /restaurant|eatery|pizzaiolo|dragon court|snooty fox|burnt tongue|spicy master|delicatessen/i.test(name)
    ) {
      category = 'shop';
      placeType = 'restaurant';
      isPublicAccess = true;
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : (b.id % 4 === 0 ? 3 : 2);
    } else if (
      amenTag === 'cafe' ||
      shopTag === 'bakery' ||
      /cafe|café|coffee|tim hortons|bakery|cuppa tea/i.test(name)
    ) {
      category = 'shop';
      placeType = 'cafe';
      isPublicAccess = true;
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : 2;
    } else if (amenTag === 'pharmacy' || /shoppers drug mart|pharmacy/i.test(name)) {
      category = 'shop';
      placeType = 'pharmacy';
      isPublicAccess = true;
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : 2;
    } else if (amenTag === 'bank' || /cibc|td canada|bank/i.test(name)) {
      category = 'shop';
      placeType = 'bank';
      isPublicAccess = true;
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : 2;
    } else if (
      shopTag ||
      t.building === 'retail' ||
      t.building === 'commercial' ||
      amenTag === 'dentist' ||
      isNearKing
    ) {
      category = 'shop';
      placeType = 'shop';
      isPublicAccess = Boolean(name || shopTag || t.building === 'retail' || t.building === 'commercial');
      floors = Number.isFinite(parsedLevels) ? clampFloors(parsedLevels) : (b.id % 3 === 0 ? 3 : 2);
    } else {
      category = 'house';
      placeType = 'house';
      if (Number.isFinite(parsedLevels) && parsedLevels >= 1) {
        floors = clampFloors(parsedLevels);
      } else {
        // Realistic mix of 1-story bungalows, 2-story family homes, and 3-story Westdale houses!
        floors = b.id % 6 === 0 ? 1 : b.id % 5 === 0 ? 3 : 2;
      }
    }

    // Apartment blocks keep their real storey count (Westdale has 3–7 storey brick walk-ups)
    const isApartment = t.building === 'apartments' || t.building === 'residential';
    if (isApartment && Number.isFinite(parsedLevels) && parsedLevels >= 1) floors = Math.min(8, parsedLevels);
    else if (isApartment) floors = Math.max(floors, 3);

    // Exact 3.3m per story matches the exterior window texture repeat (1 window row = 1 interior floor!)
    height = floors * 3.3;

    return {
      ...b,
      isApartment,
      name,
      houseNumber,
      streetAddr,
      frontPt,
      frontAngle,
      category,
      placeType,
      isPublicAccess,
      floors,
      height,
    };
  });

  // Collect traffic signal & stop sign nodes from OSM
  const signalNodes = [];
  const stopSigns = [];
  const seenStopKeys = new Set();

  for (const node of nodeMap.values()) {
    if (node.tags.highway === 'traffic_signals') {
      signalNodes.push(node);
    } else if (node.tags.highway === 'stop') {
      const key = `${Math.round(node.x / 8)}_${Math.round(node.z / 8)}`;
      if (!seenStopKeys.has(key)) {
        seenStopKeys.add(key);
        stopSigns.push({
          id: `stop_osm_${node.id}`,
          x: node.x,
          z: node.z,
          facingAngle: 0,
        });
      }
    }
  }

  // Build intersections & crosswalks
  const intersections = [];
  const crosswalks = [];
  const seenCrosswalkKeys = new Set();

  for (const [nid, entries] of nodeToRoads.entries()) {
    const distinctNames = new Set(entries.map((e) => e.road.name).filter(Boolean));
    const hasServiceOnly = entries.every((e) => e.road.highway === 'service');
    if (hasServiceOnly) continue;
    if (distinctNames.size < 2 && entries.length < 3) continue;

    const node = nodeMap.get(nid);
    if (!node) continue;

    const streetNames = [...distinctNames];
    const onKing = streetNames.some((n) => /king street/i.test(n));
    const onCline = streetNames.some((n) => /cline/i.test(n));
    const onPaisley = streetNames.some((n) => /paisley/i.test(n));

    const nearOsmSignal = signalNodes.some((s) => dist2D(s.x, s.z, node.x, node.z) < 28);
    const isSignalized = nearOsmSignal || (onKing && (onCline || onPaisley));

    intersections.push({
      id: nid,
      x: node.x,
      z: node.z,
      lat: node.lat,
      lon: node.lon,
      streetNames,
      onKing,
      isSignalized,
    });

    // Helper: walks along a road's polyline starting at `startIdx` in direction `stepDir` (+1 or -1)
    // by `targetDist` meters, returning the exact (x, z) and local unit tangent (ux, uz).
    const walkAlongRoad = (road, startIdx, stepDir, targetDist) => {
      let remaining = targetDist;
      let idx = startIdx;
      while (idx + stepDir >= 0 && idx + stepDir < road.points.length) {
        const a = road.points[idx];
        const b = road.points[idx + stepDir];
        const dx = b.x - a.x;
        const dz = b.z - a.z;
        const segLen = Math.hypot(dx, dz);
        if (segLen > 0.05) {
          const ux = dx / segLen;
          const uz = dz / segLen;
          if (remaining <= segLen) {
            return {
              x: a.x + ux * remaining,
              z: a.z + uz * remaining,
              ux,
              uz,
              reached: true,
            };
          }
          remaining -= segLen;
        }
        idx += stepDir;
      }
      return null;
    };

    // Precompute outgoing unit arm vectors for every road meeting at this intersection
    const arms = [];
    for (const { road, index } of entries) {
      if (road.highway === 'service') continue;
      for (const stepDir of [-1, 1]) {
        const nextIdx = index + stepDir;
        if (nextIdx < 0 || nextIdx >= road.points.length) continue;
        const nb = road.points[nextIdx];
        const dx = nb.x - node.x;
        const dz = nb.z - node.z;
        const len = Math.hypot(dx, dz);
        if (len < 1.0) continue;
        // Total available length along this road in stepDir
        let totalAvail = 0;
        for (let k = index; k + stepDir >= 0 && k + stepDir < road.points.length; k += stepDir) {
          totalAvail += dist2D(
            road.points[k].x,
            road.points[k].z,
            road.points[k + stepDir].x,
            road.points[k + stepDir].z
          );
          if (totalAvail > 25) break;
        }
        if (totalAvail < 5.0) continue;
        arms.push({ road, index, stepDir, ux: dx / len, uz: dz / len, totalAvail });
      }
    }

    for (const arm of arms) {
      const { road, index, stepDir, ux, uz, totalAvail } = arm;

      // Find the widest perpendicular intersecting road arm so the zebra crossing
      // sits EXACTLY in line with that perpendicular street's raised sidewalk!
      let bestCross = null;
      let bestIdealOffset = 0;
      for (const other of arms) {
        if (other.road.id === road.id) continue;
        const absDot = Math.abs(ux * other.ux + uz * other.uz);
        if (absDot >= 0.72) continue;
        const sinTheta = Math.max(0.75, Math.sqrt(Math.max(0.01, 1 - absDot * absDot)));
        const candidateOffset =
          (other.road.width * 0.5 + other.road.sidewalkWidth * 0.5) / sinTheta;
        if (candidateOffset > bestIdealOffset) {
          bestIdealOffset = candidateOffset;
          bestCross = other;
        }
      }

      if (!bestCross) continue;
      if (bestIdealOffset > totalAvail - 1.0) continue;

      const sample = walkAlongRoad(road, index, stepDir, bestIdealOffset);
      if (!sample) continue;

      const crossRoad = bestCross.road;
      const cx = sample.x;
      const cz = sample.z;

      const key = `${Math.round(cx / 3.5)}_${Math.round(cz / 3.5)}`;
      if (seenCrosswalkKeys.has(key)) continue;
      seenCrosswalkKeys.add(key);

      const crossIsSignalized = isSignalized && (/king street/i.test(road.name) || onKing);
      const isRoadEW = Math.abs(sample.ux) >= Math.abs(sample.uz);
      const signalGroup = isRoadEW ? 'NS_WALK' : 'EW_WALK';

      crosswalks.push({
        id: `cw_${nid}_${road.id}_${Math.round(cx)}`,
        x: cx,
        z: cz,
        roadDirX: sample.ux,
        roadDirZ: sample.uz,
        width: road.width,
        depth: Math.max(2.4, crossRoad.sidewalkWidth + 0.3),
        roadName: road.name || 'Street',
        intersectionNames: streetNames,
        isSignalized: crossIsSignalized,
        signalGroup,
        intersectionId: nid,
      });

      // Place a 3D STOP sign on the right-hand sidewalk corner of unsignalized street approaches
      if (!isSignalized && !/king street/i.test(road.name)) {
        // Right-hand side for traffic approaching the intersection (moving along -ux, -uz)
        // Right perpendicular of (-ux, -uz) is (uz, -ux)
        const rightX = sample.uz;
        const rightZ = -sample.ux;
        const curbOffset = road.width * 0.5 + 0.9;
        const backOffset = Math.max(1.8, crossRoad.sidewalkWidth * 0.65);
        const sx = cx + sample.ux * backOffset + rightX * curbOffset;
        const sz = cz + sample.uz * backOffset + rightZ * curbOffset;
        const skey = `${Math.round(sx / 7)}_${Math.round(sz / 7)}`;
        if (!seenStopKeys.has(skey)) {
          seenStopKeys.add(skey);
          stopSigns.push({
            id: `stop_${nid}_${road.id}_${Math.round(sx)}`,
            x: sx,
            z: sz,
            // Face oncoming traffic (along +ux, +uz away from intersection)
            facingAngle: Math.atan2(sample.ux, sample.uz),
          });
        }
      }
    }
  }

  return {
    roads,
    footways,
    buildings,
    parks,
    parkingLots,
    intersections,
    crosswalks,
    signalNodes,
    stopSigns,
  };
}

/**
 * Splits parsed world features into 300m x 300m chunk buckets keyed by chunk_${gx}_${gz}.
 */
export function bucketByChunks(parsed) {
  const buckets = new Map();

  function getBucket(gx, gz) {
    const id = chunkId(gx, gz);
    if (!buckets.has(id)) {
      buckets.set(id, {
        gx,
        gz,
        id,
        roads: [],
        footways: [],
        buildings: [],
        parks: [],
        parkingLots: [],
        intersections: [],
        crosswalks: [],
        stopSigns: [],
      });
    }
    return buckets.get(id);
  }

  for (const road of parsed.roads) {
    const mid = road.points[Math.floor(road.points.length / 2)];
    const { gx, gz } = getChunkCoords(mid.x, mid.z);
    getBucket(gx, gz).roads.push(road);
  }
  for (const fw of parsed.footways) {
    const mid = fw.points[Math.floor(fw.points.length / 2)];
    const { gx, gz } = getChunkCoords(mid.x, mid.z);
    getBucket(gx, gz).footways.push(fw);
  }
  for (const b of parsed.buildings) {
    const { gx, gz } = getChunkCoords(b.centroid.x, b.centroid.z);
    getBucket(gx, gz).buildings.push(b);
  }
  for (const p of parsed.parks) {
    const { gx, gz } = getChunkCoords(p.centroid.x, p.centroid.z);
    getBucket(gx, gz).parks.push(p);
  }
  for (const lot of parsed.parkingLots || []) {
    const { gx, gz } = getChunkCoords(lot.centroid.x, lot.centroid.z);
    getBucket(gx, gz).parkingLots.push(lot);
  }
  for (const inter of parsed.intersections) {
    const { gx, gz } = getChunkCoords(inter.x, inter.z);
    getBucket(gx, gz).intersections.push(inter);
  }
  for (const cw of parsed.crosswalks) {
    const { gx, gz } = getChunkCoords(cw.x, cw.z);
    getBucket(gx, gz).crosswalks.push(cw);
  }
  for (const ss of parsed.stopSigns || []) {
    const { gx, gz } = getChunkCoords(ss.x, ss.z);
    getBucket(gx, gz).stopSigns.push(ss);
  }

  return buckets;
}
