#!/usr/bin/env node
/**
 * Fetches OpenStreetMap data via Overpass API for a 450m radius around
 * Cootes Paradise Elementary School (43.26407, -79.90231) in Westdale, Hamilton, ON,
 * plus the OSRM pedestrian route from Westdale Library to Cootes Paradise Elementary School,
 * and saves the combined preset to public/preset-mission.json.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_PATH = path.resolve(__dirname, '../public/preset-mission.json');

const ORIGIN = { lat: 43.26407, lon: -79.90231 };
const RADIUS_M = 450;

const MISSION = {
  id: 'westdale-school-walk',
  title: 'Walk from Westdale Library to Cootes Paradise Elementary School',
  start: {
    name: 'Hamilton Public Library – Westdale Branch',
    lat: 43.2626,
    lon: -79.9041,
  },
  destination: {
    name: 'Cootes Paradise Elementary School',
    address: '900 King St W, Hamilton, ON',
    lat: 43.26407,
    lon: -79.90231,
  },
};

const OVERPASS_ENDPOINTS = [
  'https://overpass-api.de/api/interpreter',
  'https://overpass.kumi.systems/api/interpreter',
];

const USER_AGENT = 'WestdaleSafeWalkGame/0.1 (kid-friendly pedestrian safety educational project)';

const overpassQuery = `
[out:json][timeout:60];
(
  way["highway"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  node["highway"~"traffic_signals|crossing|stop"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  way["building"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  relation["building"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  node["addr:housenumber"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  way["leisure"~"park|playground|pitch"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  way["amenity"~"school|library|place_of_worship"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  node["amenity"~"school|library|place_of_worship|cafe|restaurant|bakery"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
  node["shop"](around:${RADIUS_M},${ORIGIN.lat},${ORIGIN.lon});
);
out body;
>;
out skel qt;
`.trim();

async function fetchOverpass() {
  let lastError;
  for (const endpoint of OVERPASS_ENDPOINTS) {
    try {
      console.log(`Querying Overpass API: ${endpoint} (radius=${RADIUS_M}m)...`);
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          'User-Agent': USER_AGENT,
        },
        body: `data=${encodeURIComponent(overpassQuery)}`,
      });
      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }
      const data = await res.json();
      if (!data.elements || data.elements.length === 0) {
        throw new Error('Overpass returned empty elements array');
      }
      console.log(`Fetched ${data.elements.length} OSM elements from ${endpoint}`);
      return data;
    } catch (err) {
      console.warn(`Failed on ${endpoint}: ${err.message}`);
      lastError = err;
    }
  }
  throw lastError;
}

async function fetchOsrmRoute() {
  const url = `https://router.project-osrm.org/route/v1/foot/${MISSION.start.lon},${MISSION.start.lat};${MISSION.destination.lon},${MISSION.destination.lat}?overview=full&geometries=geojson&steps=true`;
  try {
    console.log('Fetching OSRM pedestrian route...');
    const res = await fetch(url, {
      headers: { 'User-Agent': USER_AGENT },
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    if (data.routes && data.routes.length > 0) {
      const route = data.routes[0];
      console.log(`Fetched OSRM route: ${Math.round(route.distance)}m, ${route.geometry.coordinates.length} points`);
      return {
        distance: route.distance,
        duration: route.duration,
        coordinates: route.geometry.coordinates, // [lon, lat]
      };
    }
  } catch (err) {
    console.warn(`OSRM fetch failed (will compute live or fallback): ${err.message}`);
  }
  return null;
}

async function main() {
  const osmData = await fetchOverpass();
  const routeHint = await fetchOsrmRoute();

  const payload = {
    version: 1,
    fetchedAt: new Date().toISOString(),
    origin: ORIGIN,
    radiusMeters: RADIUS_M,
    mission: MISSION,
    routeHint,
    osm: {
      elements: osmData.elements,
    },
  };

  await fs.mkdir(path.dirname(OUTPUT_PATH), { recursive: true });
  await fs.writeFile(OUTPUT_PATH, JSON.stringify(payload), 'utf8');
  const stat = await fs.stat(OUTPUT_PATH);
  console.log(`Saved ${OUTPUT_PATH} (${(stat.size / 1024).toFixed(1)} KB)`);
}

main().catch((err) => {
  console.error('Error fetching preset data:', err);
  process.exit(1);
});
