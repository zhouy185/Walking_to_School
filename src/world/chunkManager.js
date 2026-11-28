/**
 * 300m x 300m Grid Chunk Manager:
 * Keeps only the active 3x3 chunk neighborhood around the player in the Three.js scene,
 * disposing geometries/materials of unloaded chunks to prevent memory leaks.
 * Uses pre-cached preset-mission.json buckets for instant (<200ms) initial load,
 * and falls back to throttled IndexedDB-cached Overpass streaming if the player walks beyond the preset.
 */

import { getChunkCoords, chunkId } from '../geo.js';
import { parseOsmElements, bucketByChunks } from '../data/osmParser.js';
import { fetchOverpassChunk } from '../data/osmCache.js';
import { buildChunkMesh, disposeGroup } from './worldBuilder.js';

export class ChunkManager {
  constructor(scene) {
    this.scene = scene;
    this.presetBuckets = new Map();
    this.allRoads = [];
    this.loadedChunks = new Map(); // id -> { gx, gz, group, bucket }
    this.loadingIds = new Set();
    this.currentCenterKey = null;
  }

  /**
   * Registers parsed preset data into chunk buckets so initial load is synchronous & offline-ready.
   */
  loadPresetParsed(parsed) {
    this.addParsedData(parsed);
  }

  /**
   * Merges additional parsed OSM data (e.g. from a custom home address anywhere on the map)
   * into chunk buckets and refreshes currently loaded overlapping chunks.
   */
  addParsedData(parsed) {
    const newRoads = (parsed.roads || []).filter((r) => r.highway !== 'service');
    const existingRoadIds = new Set(this.allRoads.map((r) => r.id));
    for (const r of newRoads) {
      if (!existingRoadIds.has(r.id)) {
        this.allRoads.push(r);
        existingRoadIds.add(r.id);
      }
    }

    const buckets = bucketByChunks(parsed);
    for (const [id, bucket] of buckets.entries()) {
      if (this.presetBuckets.has(id)) {
        const cur = this.presetBuckets.get(id);
        const mergeById = (arrA, arrB) => {
          const seen = new Set(arrA.map((x) => x.id));
          for (const item of arrB) {
            if (!seen.has(item.id)) {
              arrA.push(item);
              seen.add(item.id);
            }
          }
        };
        mergeById(cur.roads, bucket.roads);
        mergeById(cur.footways, bucket.footways);
        mergeById(cur.buildings, bucket.buildings);
        mergeById(cur.parks, bucket.parks);
        cur.parkingLots = cur.parkingLots || [];
        mergeById(cur.parkingLots, bucket.parkingLots || []);
        mergeById(cur.intersections, bucket.intersections);
        mergeById(cur.crosswalks, bucket.crosswalks);
        cur.stopSigns = cur.stopSigns || [];
        mergeById(cur.stopSigns, bucket.stopSigns || []);
      } else {
        this.presetBuckets.set(id, bucket);
      }

      // If this chunk is currently loaded, rebuild its mesh with the newly merged data
      if (this.loadedChunks.has(id)) {
        const entry = this.loadedChunks.get(id);
        this.scene.remove(entry.group);
        disposeGroup(entry.group);
        const updatedBucket = this.presetBuckets.get(id);
        const group = buildChunkMesh(updatedBucket, this.allRoads);
        this.scene.add(group);
        this.loadedChunks.set(id, { gx: entry.gx, gz: entry.gz, group, bucket: updatedBucket });
      }
    }
    this.currentCenterKey = null;
  }

  /**
   * Updates active 3x3 chunk neighborhood around player (px, pz).
   */
  update(px, pz) {
    const { gx, gz } = getChunkCoords(px, pz);
    const centerKey = `${gx}_${gz}`;
    if (centerKey === this.currentCenterKey) return;
    this.currentCenterKey = centerKey;

    const needed = new Set();
    for (let dx = -1; dx <= 1; dx++) {
      for (let dz = -1; dz <= 1; dz++) {
        const cx = gx + dx;
        const cz = gz + dz;
        const id = chunkId(cx, cz);
        needed.add(id);

        if (!this.loadedChunks.has(id) && !this.loadingIds.has(id)) {
          this._loadChunk(cx, cz, id);
        }
      }
    }

    // Unload chunks outside the 3x3 neighborhood and dispose GPU resources
    for (const [id, entry] of this.loadedChunks.entries()) {
      if (!needed.has(id)) {
        this.scene.remove(entry.group);
        disposeGroup(entry.group);
        this.loadedChunks.delete(id);
      }
    }
  }

  _loadChunk(gx, gz, id) {
    if (this.presetBuckets.has(id)) {
      const bucket = this.presetBuckets.get(id);
      const group = buildChunkMesh(bucket, this.allRoads);
      this.scene.add(group);
      this.loadedChunks.set(id, { gx, gz, group, bucket });
      return;
    }

    // Only stream Overpass chunks if player walks out of the preset 3x3 core
    if (Math.abs(gx) <= 1 && Math.abs(gz) <= 1) {
      // Empty chunk within preset radius — no need to fetch
      return;
    }

    this.loadingIds.add(id);
    fetchOverpassChunk(gx, gz)
      .then((data) => {
        this.loadingIds.delete(id);
        // Check if still needed
        const parsed = parseOsmElements(data.elements || []);
        const buckets = bucketByChunks(parsed);
        const bucket = buckets.get(id) || {
          gx,
          gz,
          id,
          roads: parsed.roads,
          footways: parsed.footways,
          buildings: parsed.buildings,
          parks: parsed.parks,
          parkingLots: parsed.parkingLots || [],
          intersections: parsed.intersections,
          crosswalks: parsed.crosswalks,
          stopSigns: parsed.stopSigns || [],
        };
        const group = buildChunkMesh(bucket, this.allRoads.length ? this.allRoads : bucket.roads);
        this.scene.add(group);
        this.loadedChunks.set(id, { gx, gz, group, bucket });
      })
      .catch(() => {
        this.loadingIds.delete(id);
      });
  }

  /**
   * Returns all active buildings from currently loaded chunks for collision detection.
   */
  /** Solid circles for parked cars (lots + street parking) near (px, pz). */
  getParkedCarColliders(px, pz, radius = 30) {
    const out = [];
    const r2 = radius * radius;
    for (const entry of this.loadedChunks.values()) {
      const list = entry.group?.userData?.parkedCarColliders;
      if (!list) continue;
      for (const c of list) {
        const dx = c.x - px;
        const dz = c.z - pz;
        if (dx * dx + dz * dz < r2) out.push(c);
      }
    }
    return out;
  }

  getActiveBuildings() {
    const list = [];
    for (const entry of this.loadedChunks.values()) {
      for (const b of entry.bucket.buildings) list.push(b);
    }
    return list;
  }
}
