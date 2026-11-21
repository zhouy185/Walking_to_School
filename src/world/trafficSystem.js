/**
 * Traffic Signals, Walk / Don't Walk Pedestrian Heads, and 8 Low-Poly School Zone Cars.
 * - Places 3D traffic light poles + Walk (white person) / Don't Walk (red hand) signals
 *   at signalized crosswalks along King Street West (including Cline Ave / Cootes Paradise School & Paisley Ave).
 * - Spawns 8 friendly low-poly cars (including a yellow school bus!) driving along King St W and
 *   residential side streets (Cline Ave, Paisley Ave, Marion Ave).
 * - Cars obey red lights and stop politely whenever the player is inside or near a crosswalk ahead.
 */

import * as THREE from 'three';
import { dist2D } from '../geo.js';

// Signal cycle: 22 seconds total
// 0..8s   : King St GREEN  (EW traffic goes; EW_WALK is WALK, NS_WALK across King is DON'T WALK)
// 8..10.5s: King St YELLOW (all crosswalks DON'T WALK)
// 10.5..18.5s: King St RED (King traffic stops; NS_WALK across King is WALK!)
// 18.5..21s: NS_WALK flashing DON'T WALK (still red for King traffic)
// 21..22s : All-red clearance
const CYCLE_LEN = 22;

function createPedSignalTexture(mode) {
  const canvas = document.createElement('canvas');
  canvas.width = 192;
  canvas.height = 192;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 192, 192);
  ctx.strokeStyle = mode === 'walk' ? '#22c55e' : '#ef4444';
  ctx.lineWidth = 14;
  ctx.strokeRect(7, 7, 178, 178);

  if (mode === 'walk') {
    // Bright Green / White WALK person + "WALK" label
    ctx.fillStyle = '#4ade80';
    ctx.strokeStyle = '#4ade80';
    ctx.lineCap = 'round';
    ctx.lineWidth = 11;
    ctx.beginPath();
    ctx.arc(96, 40, 14, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(96, 58);
    ctx.lineTo(92, 98);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(94, 68);
    ctx.lineTo(68, 86);
    ctx.moveTo(94, 68);
    ctx.lineTo(122, 84);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(92, 98);
    ctx.lineTo(70, 134);
    ctx.moveTo(92, 98);
    ctx.lineTo(118, 134);
    ctx.stroke();

    ctx.fillStyle = '#4ade80';
    ctx.font = '900 28px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('WALK', 96, 172);
  } else {
    // Bright Red raised hand + "STOP" label
    ctx.fillStyle = '#ef4444';
    ctx.beginPath();
    ctx.roundRect(66, 72, 60, 56, 12);
    ctx.fill();
    const xs = [68, 82, 96, 110];
    const hs = [38, 46, 44, 34];
    for (let i = 0; i < 4; i++) {
      ctx.beginPath();
      ctx.roundRect(xs[i], 76 - hs[i], 11, hs[i] + 8, 5);
      ctx.fill();
    }
    ctx.beginPath();
    ctx.roundRect(50, 82, 20, 13, 6);
    ctx.fill();

    ctx.fillStyle = '#f87171';
    ctx.font = '900 28px system-ui, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('STOP', 96, 172);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createCarMesh(color, isBus = false) {
  const g = new THREE.Group();

  if (isBus) {
    // Kid-friendly Yellow School Bus!
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 2.0, 6.2),
      new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.5 })
    );
    body.position.y = 1.35;
    body.castShadow = true;
    g.add(body);

    const stripe = new THREE.Mesh(
      new THREE.BoxGeometry(2.34, 0.22, 6.22),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 })
    );
    stripe.position.y = 1.25;
    g.add(stripe);

    const win = new THREE.Mesh(
      new THREE.BoxGeometry(2.32, 0.65, 4.8),
      new THREE.MeshStandardMaterial({ color: 0xbae6fd, roughness: 0.25 })
    );
    win.position.set(0, 1.85, -0.2);
    g.add(win);
  } else {
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(1.85, 0.72, 4.0),
      new THREE.MeshStandardMaterial({ color, roughness: 0.45 })
    );
    body.position.y = 0.66;
    body.castShadow = true;
    g.add(body);

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.55, 0.62, 2.05),
      new THREE.MeshStandardMaterial({ color: 0xe0f2fe, roughness: 0.25 })
    );
    cabin.position.set(0, 1.28, -0.15);
    g.add(cabin);
  }

  // Headlights (+Z is forward)
  const hlMat = new THREE.MeshBasicMaterial({ color: 0xfef9c3 });
  const tlMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const zFront = isBus ? 3.12 : 2.02;
  const zBack = isBus ? -3.12 : -2.02;

  for (const sx of [-0.62, 0.62]) {
    const hl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.08), hlMat);
    hl.position.set(sx, 0.68, zFront);
    g.add(hl);

    const tl = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.2, 0.08), tlMat);
    tl.position.set(sx, 0.68, zBack);
    g.add(tl);
  }

  // 4 wheels
  const wheelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.9 });
  const wheelGeom = new THREE.CylinderGeometry(0.34, 0.34, 0.24, 10);
  wheelGeom.rotateZ(Math.PI / 2);
  const wheelZs = isBus ? [-1.9, 1.9] : [-1.2, 1.2];
  const wheelX = isBus ? 1.15 : 0.92;
  for (const wz of wheelZs) {
    for (const wx of [-wheelX, wheelX]) {
      const w = new THREE.Mesh(wheelGeom, wheelMat);
      w.position.set(wx, 0.34, wz);
      g.add(w);
    }
  }

  return g;
}

export class TrafficSystem {
  constructor(scene, parsed, busStops = []) {
    this.scene = scene;
    this.parsed = parsed;
    this.busStops = busStops;
    this.time = 11.0; // Start right as King St turns red so player sees cycling clearly
    this.signalVisuals = [];
    this.cars = [];
    this.group = new THREE.Group();
    this.group.name = 'trafficSystem';
    this.scene.add(this.group);

    this.walkTex = createPedSignalTexture('walk');
    this.dontWalkTex = createPedSignalTexture('dont_walk');

    this._buildSignals();
    this._spawnCars();
  }

  getSignalState() {
    const t = this.time % CYCLE_LEN;
    if (t < 8.0) {
      return {
        kingLight: 'green',
        sideLight: 'red',
        NS_WALK: 'dont_walk',
        EW_WALK: 'walk',
      };
    }
    if (t < 10.5) {
      return {
        kingLight: 'yellow',
        sideLight: 'red',
        NS_WALK: 'dont_walk',
        EW_WALK: 'dont_walk',
      };
    }
    if (t < 18.5) {
      return {
        kingLight: 'red',
        sideLight: 'green',
        NS_WALK: 'walk',
        EW_WALK: 'dont_walk',
      };
    }
    if (t < 21.0) {
      return {
        kingLight: 'red',
        sideLight: 'yellow',
        NS_WALK: Math.floor(t * 3) % 2 === 0 ? 'dont_walk' : 'walk',
        EW_WALK: 'dont_walk',
      };
    }
    return {
      kingLight: 'red',
      sideLight: 'red',
      NS_WALK: 'dont_walk',
      EW_WALK: 'dont_walk',
    };
  }

  /**
   * Returns true if pedestrians are allowed to start crossing on this crosswalk right now.
   */
  isCrosswalkWalkAllowed(cw) {
    if (!cw.isSignalized) return true;
    const st = this.getSignalState();
    return st[cw.signalGroup] === 'walk';
  }

  /**
   * Returns clear traffic light status & countdown for the nearest signalized crosswalk
   * within 24m of the player so the HUD can display an unmistakable RED / GREEN light banner!
   */
  getNearestSignalPrompt(playerPos) {
    if (!playerPos) return null;
    let bestCw = null;
    let bestDist = Infinity;

    for (const cw of this.parsed.crosswalks) {
      if (!cw.isSignalized) continue;
      const d = dist2D(playerPos.x, playerPos.z, cw.x, cw.z);
      if (d < 24 && d < bestDist) {
        bestDist = d;
        bestCw = cw;
      }
    }
    if (!bestCw) return null;

    const t = this.time % CYCLE_LEN;
    const isNS = bestCw.signalGroup === 'NS_WALK';
    let light = 'red';
    let secondsLeft = 1;

    if (isNS) {
      // Crossing King St W (N-S)
      if (t >= 10.5 && t < 18.5) {
        light = 'green';
        secondsLeft = Math.ceil(18.5 - t);
      } else if (t >= 18.5 && t < 21.0) {
        light = 'amber';
        secondsLeft = Math.ceil(21.0 - t);
      } else {
        light = 'red';
        secondsLeft = t < 10.5 ? Math.ceil(10.5 - t) : Math.ceil(CYCLE_LEN - t + 10.5);
      }
    } else {
      // Crossing side street parallel to King St W (E-W)
      if (t < 8.0) {
        light = 'green';
        secondsLeft = Math.ceil(8.0 - t);
      } else {
        light = 'red';
        secondsLeft = Math.ceil(CYCLE_LEN - t);
      }
    }

    return {
      crosswalk: bestCw,
      roadName: bestCw.roadName || 'King Street West',
      light, // 'green' | 'amber' | 'red'
      secondsLeft: Math.max(1, secondsLeft),
    };
  }

  _buildSignals() {
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.4, roughness: 0.5 });
    const housingMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, roughness: 0.5 });
    const pedHousingMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });

    const signalizedIntersections = this.parsed.intersections.filter((i) => i.isSignalized);

    for (const inter of signalizedIntersections) {
      // Place 2 diagonal poles per signalized intersection so both sides of King St W have visible lights & Walk heads
      const offsets = [
        { dx: 7.4, dz: 7.4, rot: Math.PI },
        { dx: -7.4, dz: -7.4, rot: 0 },
      ];

      for (const off of offsets) {
        const rig = new THREE.Group();
        rig.position.set(inter.x + off.dx, 0, inter.z + off.dz);

        const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.14, 5.4, 8), poleMat);
        pole.position.y = 2.7;
        rig.add(pole);

        // Overhead arm
        const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 4.2, 8), poleMat);
        arm.rotation.z = Math.PI / 2;
        arm.position.set(off.dx > 0 ? -2.0 : 2.0, 5.2, 0);
        rig.add(arm);

        // Vehicle traffic light box (bigger & easier to spot!)
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.65, 1.85, 0.55), housingMat);
        box.position.set(off.dx > 0 ? -3.4 : 3.4, 4.9, 0);
        rig.add(box);

        const redMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
        const yelMat = new THREE.MeshBasicMaterial({ color: 0x451a03 });
        const grnMat = new THREE.MeshBasicMaterial({ color: 0x052e16 });

        const bulbGeom = new THREE.SphereGeometry(0.24, 10, 10);
        const rBulb = new THREE.Mesh(bulbGeom, redMat);
        rBulb.position.set(box.position.x, 5.45, 0);
        const yBulb = new THREE.Mesh(bulbGeom, yelMat);
        yBulb.position.set(box.position.x, 4.9, 0);
        const gBulb = new THREE.Mesh(bulbGeom, grnMat);
        gBulb.position.set(box.position.x, 4.35, 0);
        rig.add(rBulb, yBulb, gBulb);

        // Large, crystal-clear Pedestrian WALK / STOP sign box (visible from both N and S sides)
        const pedBox = new THREE.Mesh(new THREE.BoxGeometry(1.15, 1.15, 0.3), pedHousingMat);
        pedBox.position.set(0, 3.05, 0);
        rig.add(pedBox);

        const pedScreenMat = new THREE.MeshBasicMaterial({ map: this.dontWalkTex });
        const frontScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 1.06), pedScreenMat);
        frontScreen.position.set(0, 3.05, 0.17);
        const backScreen = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 1.06), pedScreenMat);
        backScreen.position.set(0, 3.05, -0.17);
        backScreen.rotation.y = Math.PI;
        rig.add(frontScreen, backScreen);

        // Side-facing ped screen (for crossing side street)
        const sidePedMat = new THREE.MeshBasicMaterial({ map: this.walkTex });
        const sideScreenL = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 1.06), sidePedMat);
        sideScreenL.position.set(0.6, 3.05, 0);
        sideScreenL.rotation.y = Math.PI / 2;
        const sideScreenR = new THREE.Mesh(new THREE.PlaneGeometry(1.06, 1.06), sidePedMat);
        sideScreenR.position.set(-0.6, 3.05, 0);
        sideScreenR.rotation.y = -Math.PI / 2;
        rig.add(sideScreenL, sideScreenR);

        this.group.add(rig);
        this.signalVisuals.push({ redMat, yelMat, grnMat, pedScreenMat, sidePedMat });
      }
    }
  }

  _buildRoadPaths() {
    // Stitch segments of King Street West and key residential streets (Cline, Paisley, Marion)
    const kingRoads = this.parsed.roads.filter((r) => /king street west/i.test(r.name));
    const resRoads = this.parsed.roads.filter((r) =>
      /(cline|paisley|marion)/i.test(r.name) && r.points.length >= 2
    );

    // Sort King St W points roughly West -> East (ascending x) to form a continuous corridor
    const kingPts = [];
    for (const r of kingRoads) {
      for (const p of r.points) {
        if (!kingPts.some((q) => dist2D(q.x, q.z, p.x, p.z) < 4)) {
          kingPts.push({ x: p.x, z: p.z });
        }
      }
    }
    kingPts.sort((a, b) => a.x - b.x);

    const paths = [];
    if (kingPts.length >= 2) {
      // Eastbound & Westbound lanes on King St W (centered in real right-hand vehicle lane)
      paths.push({ name: 'King St W (EB)', points: kingPts, laneOffset: 1.85, speed: 9.2, isKing: true });
      paths.push({ name: 'King St W (WB)', points: [...kingPts].reverse(), laneOffset: 1.85, speed: 8.8, isKing: true });
    }

    // Add residential paths (centered in real lane width)
    const usedNames = new Set();
    for (const r of resRoads) {
      if (usedNames.has(r.name)) continue;
      let totalLen = 0;
      for (let i = 0; i < r.points.length - 1; i++) {
        totalLen += dist2D(r.points[i].x, r.points[i].z, r.points[i + 1].x, r.points[i + 1].z);
      }
      if (totalLen < 45) continue;
      usedNames.add(r.name);
      const laneOffset = r.oneway ? 0 : Math.max(1.3, (r.laneWidth || 3.05) * 0.5);
      paths.push({
        name: r.name,
        points: r.points.map((p) => ({ x: p.x, z: p.z })),
        laneOffset,
        speed: 6.2,
        isKing: false,
      });
    }

    return paths;
  }

  _spawnCars() {
    const paths = this._buildRoadPaths();
    if (paths.length === 0) return;

    const palette = [
      { color: 0xfacc15, isBus: true }, // Eastbound Yellow School Bus (toward school!)
      { color: 0xfacc15, isBus: true }, // Westbound Yellow School Bus
      { color: 0xef4444, isBus: false },
      { color: 0x3b82f6, isBus: false },
      { color: 0x10b981, isBus: false },
      { color: 0xa855f7, isBus: false },
      { color: 0xf97316, isBus: false },
      { color: 0x06b6d4, isBus: false },
    ];

    // Spawn 8 vehicles distributed across King St W (2 buses + 2 cars) and residential streets (4 cars)
    for (let i = 0; i < 8; i++) {
      const pathIdx = i < 4 ? i % Math.min(2, paths.length) : 2 + ((i - 4) % Math.max(1, paths.length - 2));
      const path = paths[pathIdx] || paths[0];
      const spec = palette[i];
      const mesh = createCarMesh(spec.color, spec.isBus);
      this.group.add(mesh);

      // Compute cumulative segment distances
      const cumDist = [0];
      for (let j = 0; j < path.points.length - 1; j++) {
        cumDist.push(cumDist[j] + dist2D(path.points[j].x, path.points[j].z, path.points[j + 1].x, path.points[j + 1].z));
      }
      const totalLength = cumDist[cumDist.length - 1] || 1;

      this.cars.push({
        id: `veh_${i}`,
        isBus: spec.isBus,
        mesh,
        path,
        cumDist,
        totalLength,
        dist: spec.isBus ? totalLength * (i === 0 ? 0.12 : 0.62) : totalLength * ((i * 0.27) % 1),
        speed: spec.isBus ? 8.2 : path.speed * (0.88 + (i % 3) * 0.08),
        currentSpeed: path.speed,
        stopTimer: 0,
        lastStopName: null,
        atStopName: null,
        x: 0,
        z: 0,
        dirX: 1,
        dirZ: 0,
      });
    }
  }

  getBuses() {
    return this.cars.filter((c) => c.isBus);
  }

  /**
   * Returns a bus within boarding range (11m) of the player, preferring stopped/slow buses.
   */
  getNearbyBus(playerPos) {
    let best = null;
    let bestDist = Infinity;
    for (const c of this.cars) {
      if (!c.isBus) continue;
      const d = dist2D(playerPos.x, playerPos.z, c.x, c.z);
      if (d < 12.5 && d < bestDist) {
        bestDist = d;
        best = c;
      }
    }
    return best;
  }

  /**
   * Computes a safe sidewalk drop-off position right beside the bus (preferring a nearby bus stop).
   */
  getSafeExitPoint(bus) {
    for (const stop of this.busStops) {
      if (dist2D(bus.x, bus.z, stop.x, stop.z) < 18) {
        return { x: stop.x, z: stop.z, stopName: stop.name };
      }
    }
    // Otherwise drop onto the right-hand sidewalk beside the bus
    const rx = -bus.dirZ;
    const rz = bus.dirX;
    return {
      x: bus.x + rx * 4.2,
      z: bus.z + rz * 4.2,
      stopName: 'King Street West Sidewalk',
    };
  }

  _samplePath(car, d) {
    const clamped = ((d % car.totalLength) + car.totalLength) % car.totalLength;
    const pts = car.path.points;
    let idx = 0;
    while (idx < car.cumDist.length - 2 && car.cumDist[idx + 1] < clamped) {
      idx++;
    }
    const segStart = car.cumDist[idx];
    const segEnd = car.cumDist[idx + 1] || segStart + 1;
    const t = Math.max(0, Math.min(1, (clamped - segStart) / (segEnd - segStart + 1e-6)));
    const a = pts[idx];
    const b = pts[idx + 1] || a;
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz) || 1;
    const ux = dx / len;
    const uz = dz / len;
    // Right-hand driving lane offset (to the right of travel direction)
    const rx = -uz;
    const rz = ux;
    return {
      x: a.x + dx * t + rx * car.path.laneOffset,
      z: a.z + dz * t + rz * car.path.laneOffset,
      dirX: ux,
      dirZ: uz,
    };
  }

  update(dt, playerPos, playerInCrosswalk) {
    this.time += dt;
    const st = this.getSignalState();

    // Update 3D signal bulbs & Walk/Don't Walk textures
    for (const v of this.signalVisuals) {
      v.redMat.color.setHex(st.kingLight === 'red' ? 0xef4444 : 0x3f1212);
      v.yelMat.color.setHex(st.kingLight === 'yellow' ? 0xfacc15 : 0x3b2c06);
      v.grnMat.color.setHex(st.kingLight === 'green' ? 0x22c55e : 0x052e16);

      const nsTex = st.NS_WALK === 'walk' ? this.walkTex : this.dontWalkTex;
      if (v.pedScreenMat.map !== nsTex) {
        v.pedScreenMat.map = nsTex;
        v.pedScreenMat.needsUpdate = true;
      }
      const ewTex = st.EW_WALK === 'walk' ? this.walkTex : this.dontWalkTex;
      if (v.sidePedMat.map !== ewTex) {
        v.sidePedMat.map = ewTex;
        v.sidePedMat.needsUpdate = true;
      }
    }

    const sigIntersections = this.parsed.intersections.filter((i) => i.isSignalized);

    // Update 8 cars
    for (const car of this.cars) {
      const pose = this._samplePath(car, car.dist);
      car.x = pose.x;
      car.z = pose.z;
      car.dirX = pose.dirX;
      car.dirZ = pose.dirZ;

      let shouldStop = false;

      // 0. Buses pause for 5 seconds at each Bus Stop so kids can board & get off safely!
      if (car.isBus) {
        if (car.stopTimer > 0) {
          car.stopTimer -= dt;
          shouldStop = true;
        } else {
          let nearAnyStop = null;
          for (const stop of this.busStops) {
            if (dist2D(car.x, car.z, stop.roadX, stop.roadZ) < 6.5) {
              nearAnyStop = stop;
              break;
            }
          }
          if (nearAnyStop) {
            if (car.lastStopName !== nearAnyStop.name) {
              car.lastStopName = nearAnyStop.name;
              car.atStopName = nearAnyStop.name;
              car.stopTimer = 5.0;
              shouldStop = true;
            }
          } else {
            car.atStopName = null;
            if (
              car.lastStopName &&
              this.busStops.every((s) => dist2D(car.x, car.z, s.roadX, s.roadZ) > 16)
            ) {
              car.lastStopName = null;
            }
          }
        }
      }

      // 1. Obey red/yellow lights on King St W (stop 8m..15m before intersection)
      if (!shouldStop && car.path.isKing && st.kingLight !== 'green') {
        for (const inter of sigIntersections) {
          const toInterX = inter.x - car.x;
          const toInterZ = inter.z - car.z;
          const ahead = toInterX * car.dirX + toInterZ * car.dirZ;
          const lateral = Math.abs(-toInterX * car.dirZ + toInterZ * car.dirX);
          if (ahead > 7.0 && ahead < 16.5 && lateral < 8.0) {
            shouldStop = true;
            break;
          }
        }
      }

      // 2. Politely stop if player is in a crosswalk (or on the road) ahead of the car
      if (!shouldStop && playerPos) {
        const toPlayerX = playerPos.x - car.x;
        const toPlayerZ = playerPos.z - car.z;
        const ahead = toPlayerX * car.dirX + toPlayerZ * car.dirZ;
        const lateral = Math.abs(-toPlayerX * car.dirZ + toPlayerZ * car.dirX);
        if (ahead > 2.0 && ahead < 16.0 && lateral < (playerInCrosswalk ? 7.5 : 4.0)) {
          shouldStop = true;
        }
      }

      // 3. Don't tailgate another car in the same direction
      if (!shouldStop) {
        for (const other of this.cars) {
          if (other === car) continue;
          const dot = car.dirX * other.dirX + car.dirZ * other.dirZ;
          if (dot < 0.7) continue;
          const toOtherX = other.x - car.x;
          const toOtherZ = other.z - car.z;
          const ahead = toOtherX * car.dirX + toOtherZ * car.dirZ;
          const lateral = Math.abs(-toOtherX * car.dirZ + toOtherZ * car.dirX);
          if (ahead > 0 && ahead < 10.5 && lateral < 2.2) {
            shouldStop = true;
            break;
          }
        }
      }

      const targetSpeed = shouldStop ? 0 : car.speed;
      car.currentSpeed += (targetSpeed - car.currentSpeed) * Math.min(1, dt * 6);
      car.dist = (car.dist + car.currentSpeed * dt) % car.totalLength;

      const nextPose = this._samplePath(car, car.dist);
      car.mesh.position.set(nextPose.x, 0.08, nextPose.z);
      car.mesh.rotation.y = Math.atan2(nextPose.dirX, nextPose.dirZ);
    }
  }
}
