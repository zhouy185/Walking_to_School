/**
 * Kid-Friendly Traffic & Pedestrian Safety Rules Engine:
 * - 3 Safety Stars system with 3-second invulnerability cooldown after any infraction
 * - Classifies player's surface: sidewalk, crosswalk_signalized, crosswalk_unsignalized, road_lane, plaza
 * - Enforces:
 *   1. Staying off road lanes outside crosswalks (jaywalking detection)
 *   2. Obeying cycling Walk (white person) vs Don't Walk (red hand) signals at signalized crosswalks
 *   3. Looking left & right (camera yaw sweep) before stepping into unsignalized crosswalks
 * - Tracks mission progress and destination arrival at Cootes Paradise Elementary School
 */

import { closestPointOnSegment2D, dist2D, pointInPolygon2D, forwardToHeadingDeg } from '../geo.js';

const INVULN_COOLDOWN_MS = 3000;
const ARRIVAL_RADIUS_M = 11.5;
export const OFF_SIDEWALK_LIMIT_SEC = 5.0;

export class SafetyRules {
  constructor(parsed, destinationXZ, onFeedback, schoolWalkways = []) {
    this.parsed = parsed;
    this.destinationXZ = destinationXZ;
    this.onFeedback = onFeedback;
    this.schoolWalkways = schoolWalkways;
    this.schoolGrounds = (parsed.parks || []).filter((p) => p.kind === 'school_grounds');

    this.reset();
  }

  setWorldData(parsed, schoolWalkways = []) {
    this.parsed = parsed;
    this.schoolWalkways = schoolWalkways;
    this.schoolGrounds = (parsed.parks || []).filter((p) => p.kind === 'school_grounds');
  }

  setDestination(destXZ, destName = 'Destination') {
    this.destinationXZ = { x: destXZ.x, z: destXZ.z };
    this.destinationName = destName;
  }

  reset() {
    this.stars = 3;
    this.points = 100;
    this.lastPenaltyAt = -10000;
    this.arrived = false;
    this.gameOver = false;
    this.gameOverReason = '';
    this.offSidewalkSec = 0;
    this.wasOffSidewalk = false;
    this.startTime = performance.now();
    this.safeCrossings = 0;
    this.infractions = 0;
    this.currentZone = 'sidewalk';
    this.activeCrosswalkId = null;
    this.checkedCrosswalkIds = new Set();
  }

  /**
   * Returns the unsignalized crosswalk ONLY when the player is standing right on one of its
   * two yellow curb-cut waiting pads at the sidewalk edge (never early down the block!).
   */
  getCrosswalkAtYellowPad(playerPos, headingDeg = null, preferId = null) {
    if (!playerPos) return null;
    const hRad = headingDeg == null ? 0 : (headingDeg * Math.PI) / 180;
    const fx = Math.sin(hRad);
    const fz = -Math.cos(hRad);

    let best = null;
    let preferred = null;
    for (const cw of this.parsed.crosswalks) {
      if (cw.isSignalized) continue;
      const dx = playerPos.x - cw.x;
      const dz = playerPos.z - cw.z;
      const along = dx * cw.roadDirX + dz * cw.roadDirZ;
      const across = -dx * cw.roadDirZ + dz * cw.roadDirX;
      const half = cw.width * 0.5;
      const absAcross = Math.abs(across);

      // Pad zone sits entirely on the sidewalk side of the curb (never overlaps the crosswalk zone)
      if (Math.abs(along) > 1.7 || absAcross < half - 0.2 || absAcross > half + 1.9) continue;

      // Direction straight across the road from this pad
      const side = Math.sign(across) || 1;
      const crossX = side * cw.roadDirZ;
      const crossZ = -side * cw.roadDirX;
      const dot = headingDeg == null ? 1 : fx * crossX + fz * crossZ;
      const candidate = { cw, dot, crossHeadingDeg: forwardToHeadingDeg(crossX, crossZ) };

      if (cw.id === preferId) preferred = candidate;
      if (!best || dot > best.dot) best = candidate;
    }

    // Stay locked to the active crosswalk while looking around (hysteresis),
    // otherwise only start when clearly facing across the street (within ~60°).
    if (preferred && preferred.dot > -0.2) return preferred;
    if (best && best.dot > 0.5) return best;
    return null;
  }

  /**
   * Backwards-compatible alias returning just the crosswalk.
   */
  getNearbyUnsignalizedCrosswalk(playerPos, headingDeg = null) {
    return this.getCrosswalkAtYellowPad(playerPos, headingDeg)?.cw || null;
  }

  /**
   * Classifies where the player (px, pz) is currently standing.
   */
  classifyPosition(px, pz) {
    // 1. Check crosswalks first (crosswalks are valid crossing zones over roads!)
    for (const cw of this.parsed.crosswalks) {
      const dx = px - cw.x;
      const dz = pz - cw.z;
      // Project onto crosswalk's local frame: roadDir = along road (depth), perp = across road (width)
      const along = dx * cw.roadDirX + dz * cw.roadDirZ;
      const across = -dx * cw.roadDirZ + dz * cw.roadDirX;

      // Crosswalk zone = the asphalt part only, so standing on the yellow pad never counts as "crossing"
      if (Math.abs(along) <= cw.depth * 0.65 && Math.abs(across) <= cw.width * 0.5 - 0.2) {
        return {
          zone: cw.isSignalized ? 'crosswalk_signalized' : 'crosswalk_unsignalized',
          crosswalk: cw,
          streetName: cw.roadName,
        };
      }
    }

    // 1b. Check explicit OSM sidewalks / footways (safe pedestrian paths!)
    for (const fw of this.parsed.footways) {
      if (fw.footwayType === 'crossing') continue;
      for (let i = 0; i < fw.points.length - 1; i++) {
        const a = fw.points[i];
        const b = fw.points[i + 1];
        const hit = closestPointOnSegment2D(px, pz, a.x, a.z, b.x, b.z);
        if (hit.dist <= 1.6) {
          return {
            zone: 'sidewalk',
            crosswalk: null,
            streetName: fw.name || 'Sidewalk',
          };
        }
      }
    }

    // 1c. Check paved School Safe Walkways connecting street sidewalks to school grounds
    for (const sw of this.schoolWalkways) {
      for (let i = 0; i < sw.points.length - 1; i++) {
        const a = sw.points[i];
        const b = sw.points[i + 1];
        const hit = closestPointOnSegment2D(px, pz, a.x, a.z, b.x, b.z);
        if (hit.dist <= 2.6) {
          return {
            zone: 'sidewalk',
            crosswalk: null,
            streetName: 'School Safe Path',
          };
        }
      }
    }

    // 1d. School grounds are a safe pedestrian zone!
    for (const sg of this.schoolGrounds) {
      if (pointInPolygon2D(px, pz, sg.polygon)) {
        return {
          zone: 'sidewalk',
          crosswalk: null,
          streetName: sg.name ? `${sg.name} Grounds` : 'School Grounds',
        };
      }
    }

    // 2. Check distance to nearest road centerline (road lane vs sidewalk)
    let closestRoad = null;
    let closestDist = Infinity;

    for (const road of this.parsed.roads) {
      if (road.highway === 'service') continue;
      for (let i = 0; i < road.points.length - 1; i++) {
        const a = road.points[i];
        const b = road.points[i + 1];
        const hit = closestPointOnSegment2D(px, pz, a.x, a.z, b.x, b.z);
        if (hit.dist < closestDist) {
          closestDist = hit.dist;
          closestRoad = road;
        }
      }
    }

    if (closestRoad) {
      const halfRoad = closestRoad.width / 2;
      const outerSidewalk = halfRoad + closestRoad.sidewalkWidth + 1.2;
      // Only flag jaywalking if clearly inside the asphalt lane (0.7m buffer from curb)
      if (closestDist < halfRoad - 0.7) {
        return {
          zone: 'road_lane',
          crosswalk: null,
          streetName: closestRoad.name || 'the street',
        };
      }
      if (closestDist <= outerSidewalk) {
        return {
          zone: 'sidewalk',
          crosswalk: null,
          streetName: closestRoad.name || 'Sidewalk',
        };
      }
    }

    return {
      zone: 'grass',
      crosswalk: null,
      streetName: 'Grass / Park',
    };
  }

  _applyInfraction(message, icon = '⚠️', pointPenalty = 15) {
    const now = performance.now();
    if (now - this.lastPenaltyAt < INVULN_COOLDOWN_MS) {
      return false;
    }
    this.lastPenaltyAt = now;
    this.infractions += 1;
    this.stars = Math.max(0, this.stars - 1);
    this.points = Math.max(0, this.points - pointPenalty);

    this.onFeedback({
      type: 'warning',
      icon,
      text: `-${pointPenalty} pts! ${message}`,
    });
    return true;
  }

  update(playerPos, playerController, trafficSystem, dt = 0, isPlaying = true) {
    if (this.arrived || this.gameOver) {
      return {
        zone: this.arrived ? 'plaza' : this.currentZone,
        streetName: this.arrived ? 'Cootes Paradise Elementary School' : 'Road Lane',
        distanceToGoal: this.arrived ? 0 : Math.round(dist2D(playerPos.x, playerPos.z, this.destinationXZ.x, this.destinationXZ.z)),
        stars: this.stars,
        points: this.points,
        arrived: this.arrived,
        gameOver: this.gameOver,
        gameOverReason: this.gameOverReason,
        offSidewalkSec: this.offSidewalkSec,
        inCrosswalk: false,
      };
    }

    const distToGoal = dist2D(playerPos.x, playerPos.z, this.destinationXZ.x, this.destinationXZ.z);
    if (distToGoal <= ARRIVAL_RADIUS_M) {
      this.arrived = true;
      this.offSidewalkSec = 0;
      return {
        zone: 'plaza',
        streetName: 'Cootes Paradise Elementary School',
        distanceToGoal: 0,
        stars: this.stars,
        points: this.points,
        arrived: true,
        gameOver: false,
        gameOverReason: '',
        offSidewalkSec: 0,
        inCrosswalk: false,
        elapsedSec: Math.round((performance.now() - this.startTime) / 1000),
      };
    }

    const info = this.classifyPosition(playerPos.x, playerPos.z);
    // Allow approaching the school entrance plaza smoothly without off-sidewalk warning
    if (info.zone === 'off_sidewalk' && distToGoal <= ARRIVAL_RADIUS_M + 12) {
      info.zone = 'sidewalk';
      info.streetName = 'School Plaza';
    }

    const prevZone = this.currentZone;
    this.currentZone = info.zone;

    const inCrosswalk =
      info.zone === 'crosswalk_signalized' || info.zone === 'crosswalk_unsignalized';
    // Walking on grass/sidewalks/crosswalks is safe; only staying in a road lane triggers the 5s warning!
    const isInRoadLane = info.zone === 'road_lane';

    // Rule 0: Stay out of road lanes outside crosswalks — warning + 5-second Game Over countdown
    if (isPlaying) {
      if (isInRoadLane) {
        if (!this.wasOffSidewalk) {
          this.wasOffSidewalk = true;
          this.onFeedback({
            type: 'warning',
            icon: '⚠️',
            text: `Warning! Get off ${info.streetName} and back onto the sidewalk within 5 seconds!`,
          });
        }
        this.offSidewalkSec += dt;
        if (this.offSidewalkSec >= OFF_SIDEWALK_LIMIT_SEC) {
          this.gameOver = true;
          this.gameOverReason = `You stayed in the road lane (${info.streetName}) for 5 seconds! Always walk on the sidewalk and cross only at white zebra crosswalks.`;
        }
      } else {
        if (this.wasOffSidewalk && this.offSidewalkSec >= 0.6) {
          this.onFeedback({
            type: 'success',
            icon: '✅',
            text: 'Nice job getting safely out of the street!',
          });
        }
        this.wasOffSidewalk = false;
        this.offSidewalkSec = 0;
      }
    }

    // Rule 1: Jaywalking (stepping into road lane outside a crosswalk)
    if (isPlaying && info.zone === 'road_lane') {
      this._applyInfraction(
        `Stay on the sidewalk and use the white zebra crosswalk to cross ${info.streetName}.`,
        '🚧',
        15
      );
    }

    // Rule 2 & 3: Stepping into a crosswalk
    if (isPlaying && inCrosswalk && info.crosswalk) {
      const cw = info.crosswalk;
      if (this.activeCrosswalkId !== cw.id) {
        this.activeCrosswalkId = cw.id;

        if (info.zone === 'crosswalk_signalized') {
          if (!trafficSystem.isCrosswalkWalkAllowed(cw)) {
            this._applyInfraction(
              'Light is RED (Don’t Walk)! Always wait for the GREEN Walk light!',
              '🔴',
              30
            );
          } else if (!this.checkedCrosswalkIds.has(cw.id)) {
            this.checkedCrosswalkIds.add(cw.id);
            this.safeCrossings += 1;
            this.points += 15;
            this.onFeedback({
              type: 'success',
              icon: '🟢',
              text: `+15 pts! Awesome! You crossed ${cw.roadName} on the GREEN Walk light!`,
            });
          }
        } else {
          // Unsignalized side-street crosswalk (e.g., Cline Ave N or Paisley Ave N)
          const lookSt = playerController.getLookStatus
            ? playerController.getLookStatus()
            : { lookedLeft: false, lookedRight: false, lookedBoth: playerController.hasLookedBothWays() };
          if (!lookSt.lookedBoth) {
            const missing =
              lookSt.lookedLeft && !lookSt.lookedRight
                ? 'you looked LEFT, now look RIGHT too'
                : !lookSt.lookedLeft && lookSt.lookedRight
                  ? 'you looked RIGHT, now look LEFT too'
                  : 'look BOTH LEFT and RIGHT';
            this._applyInfraction(
              `Stop & check both ways before crossing ${cw.roadName} (${missing})!`,
              '👀',
              15
            );
          } else if (!this.checkedCrosswalkIds.has(cw.id)) {
            this.checkedCrosswalkIds.add(cw.id);
            this.safeCrossings += 1;
            this.points += 15;
            this.onFeedback({
              type: 'success',
              icon: '🌟',
              text: `+15 pts! Super safe! You looked BOTH left and right before crossing ${cw.roadName}!`,
            });
          }
        }
      }
    } else if (prevZone !== info.zone) {
      this.activeCrosswalkId = null;
    }

    return {
      zone: info.zone,
      streetName: info.streetName,
      distanceToGoal: Math.round(distToGoal),
      stars: this.stars,
      points: this.points,
      arrived: false,
      gameOver: this.gameOver,
      gameOverReason: this.gameOverReason,
      offSidewalkSec: this.offSidewalkSec,
      inCrosswalk,
    };
  }
}
