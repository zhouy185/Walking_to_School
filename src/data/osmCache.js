/**
 * OSM data loading, IndexedDB caching (with localStorage fallback),
 * and sequential throttled Overpass API requests (min 500ms delay).
 */

import { chunkBoundsLatLon, chunkId } from '../geo.js';

const DB_NAME = 'westdale-safe-walk-osm-v1';
const STORE_NAME = 'chunks';
const OVERPASS_URL = 'https://overpass-api.de/api/interpreter';
const MIN_REQUEST_DELAY_MS = 500;

let dbPromise = null;
let lastRequestTime = 0;
let requestQueue = Promise.resolve();

function openDB() {
  if (dbPromise) return dbPromise;
  dbPromise = new Promise((resolve) => {
    if (typeof indexedDB === 'undefined') {
      resolve(null);
      return;
    }
    try {
      const req = indexedDB.open(DB_NAME, 1);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          db.createObjectStore(STORE_NAME);
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => resolve(null);
    } catch {
      resolve(null);
    }
  });
  return dbPromise;
}

export async function getCachedChunk(gx, gz) {
  const key = chunkId(gx, gz);
  const db = await openDB();
  if (db) {
    try {
      return await new Promise((resolve) => {
        const tx = db.transaction(STORE_NAME, 'readonly');
        const req = tx.objectStore(STORE_NAME).get(key);
        req.onsuccess = () => resolve(req.result ?? null);
        req.onerror = () => resolve(null);
      });
    } catch {
      // fall through to localStorage
    }
  }
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export async function setCachedChunk(gx, gz, data) {
  const key = chunkId(gx, gz);
  const db = await openDB();
  if (db) {
    try {
      await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_NAME, 'readwrite');
        tx.objectStore(STORE_NAME).put(data, key);
        tx.oncomplete = () => resolve();
        tx.onerror = () => reject(tx.error);
      });
      return;
    } catch {
      // fall through to localStorage
    }
  }
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch {
    // Ignore storage quota errors
  }
}

/**
 * Loads pre-cached public/preset-mission.json (<200ms offline-capable load).
 */
export async function loadPresetMission() {
  const res = await fetch('/preset-mission.json');
  if (!res.ok) {
    throw new Error(`Failed to load /preset-mission.json: ${res.status}`);
  }
  return res.json();
}

/**
 * Queues a live Overpass request sequentially with at least 500ms spacing.
 */
export function fetchOverpassChunk(gx, gz) {
  const task = async () => {
    const cached = await getCachedChunk(gx, gz);
    if (cached) return cached;

    const now = Date.now();
    const waitMs = Math.max(0, MIN_REQUEST_DELAY_MS - (now - lastRequestTime));
    if (waitMs > 0) {
      await new Promise((r) => setTimeout(r, waitMs));
    }
    lastRequestTime = Date.now();

    const b = chunkBoundsLatLon(gx, gz);
    const bbox = `${b.south.toFixed(6)},${b.west.toFixed(6)},${b.north.toFixed(6)},${b.east.toFixed(6)}`;
    const query = `
[out:json][timeout:25];
(
  way["highway"](${bbox});
  node["highway"~"traffic_signals|crossing|stop"](${bbox});
  way["building"](${bbox});
  way["leisure"~"park|playground|pitch"](${bbox});
  node["amenity"~"school|library|place_of_worship"](${bbox});
);
out body;
>;
out skel qt;
`.trim();

    const res = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    if (!res.ok) {
      throw new Error(`Overpass HTTP ${res.status}`);
    }
    const json = await res.json();
    const payload = { elements: json.elements || [] };
    await setCachedChunk(gx, gz, payload);
    return payload;
  };

  requestQueue = requestQueue.then(task, task);
  return requestQueue;
}

/**
 * Fetches Overpass data for a custom radius around any (lat, lon) in Hamilton,
 * cached in IndexedDB and throttled sequentially (min 500ms delay).
 */
export function fetchOverpassRadius(lat, lon, radiusM = 350) {
  const cacheKey = `home_${lat.toFixed(4)}_${lon.toFixed(4)}_${radiusM}`;
  const task = async () => {
    const db = await openDB();
    if (db) {
      try {
        const cached = await new Promise((resolve) => {
          const tx = db.transaction(STORE_NAME, 'readonly');
          const req = tx.objectStore(STORE_NAME).get(cacheKey);
          req.onsuccess = () => resolve(req.result ?? null);
          req.onerror = () => resolve(null);
        });
        if (cached) return cached;
      } catch {
        // continue
      }
    }

    const now = Date.now();
    const waitMs = Math.max(0, MIN_REQUEST_DELAY_MS - (now - lastRequestTime));
    if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
    lastRequestTime = Date.now();

    const query = `
[out:json][timeout:30];
(
  way["highway"](around:${radiusM},${lat.toFixed(6)},${lon.toFixed(6)});
  node["highway"~"traffic_signals|crossing|stop"](around:${radiusM},${lat.toFixed(6)},${lon.toFixed(6)});
  way["building"](around:${radiusM},${lat.toFixed(6)},${lon.toFixed(6)});
  way["leisure"~"park|playground|pitch"](around:${radiusM},${lat.toFixed(6)},${lon.toFixed(6)});
  node["amenity"~"school|library|place_of_worship"](around:${radiusM},${lat.toFixed(6)},${lon.toFixed(6)});
);
out body;
>;
out skel qt;
`.trim();

    const res = await fetch(OVERPASS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
      body: `data=${encodeURIComponent(query)}`,
    });
    if (!res.ok) throw new Error(`Overpass HTTP ${res.status}`);
    const json = await res.json();
    const payload = { elements: json.elements || [] };

    if (db) {
      try {
        await new Promise((resolve, reject) => {
          const tx = db.transaction(STORE_NAME, 'readwrite');
          tx.objectStore(STORE_NAME).put(payload, cacheKey);
          tx.oncomplete = () => resolve();
          tx.onerror = () => reject(tx.error);
        });
      } catch {
        // ignore
      }
    }
    return payload;
  };

  requestQueue = requestQueue.then(task, task);
  return requestQueue;
}

/**
 * Geocodes any address anywhere on the map using OpenStreetMap Nominatim
 * (softly biased toward Hamilton, ON for short street names, but unbounded worldwide),
 * throttled sequentially (min 500ms delay).
 */
export function searchAddress(query) {
  const cleaned = String(query || '').trim();
  if (!cleaned) return Promise.resolve([]);

  const task = async () => {
    const now = Date.now();
    const waitMs = Math.max(0, MIN_REQUEST_DELAY_MS - (now - lastRequestTime));
    if (waitMs > 0) await new Promise((r) => setTimeout(r, waitMs));
    lastRequestTime = Date.now();

    const params = new URLSearchParams({
      q: cleaned,
      format: 'json',
      addressdetails: '1',
      limit: '5',
      viewbox: '-80.22,43.38,-79.58,43.08',
    });

    const res = await fetch(`https://nominatim.openstreetmap.org/search?${params.toString()}`, {
      headers: { Accept: 'application/json' },
    });
    if (!res.ok) throw new Error(`Nominatim HTTP ${res.status}`);
    const results = await res.json();
    return (results || []).map((r) => ({
      lat: Number.parseFloat(r.lat),
      lon: Number.parseFloat(r.lon),
      displayName: r.display_name,
      shortName: r.display_name.split(',').slice(0, 2).join(', '),
    }));
  };

  requestQueue = requestQueue.then(task, task);
  return requestQueue;
}

/**
 * Fetches pedestrian route from OSRM between any two (lat, lon) points.
 */
export async function fetchOsrmPedestrianRoute(startLat, startLon, destLat, destLon) {
  try {
    const url = `https://router.project-osrm.org/route/v1/foot/${startLon},${startLat};${destLon},${destLat}?overview=full&geometries=geojson`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const route = data.routes?.[0];
    if (!route?.geometry?.coordinates?.length) return null;
    return {
      distance: route.distance,
      duration: route.duration,
      coordinates: route.geometry.coordinates, // [lon, lat]
    };
  } catch {
    return null;
  }
}
