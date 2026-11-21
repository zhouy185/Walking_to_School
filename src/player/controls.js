/**
 * First-person pedestrian controls:
 * - Three.js PointerLockControls at 1.5m eye height
 * - WASD / Arrow keys movement
 * - Q / E keyboard peek left & right (works alongside mouse look!)
 * - Solid building collision detection (circle vs polygon)
 * - Camera yaw sweep tracking for "Look Left & Right" before crossing unsignalized crosswalks
 */

import * as THREE from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { closestPointOnSegment2D, forwardToHeadingDeg, pointInPolygon2D } from '../geo.js';

export const EYE_HEIGHT = 1.5;
const WALK_SPEED = 5.4; // m/s brisk kid-friendly walking speed
const PLAYER_RADIUS = 0.55;
const LOOK_WINDOW_MS = 5500;
const LOOK_SWEEP_THRESHOLD_DEG = 32;

function shortestAngleDiffDeg(target, base) {
  let d = ((target - base + 540) % 360) - 180;
  return d;
}

export class PlayerController {
  constructor(camera, domElement) {
    this.camera = camera;
    this.domElement = domElement;
    this.controls = new PointerLockControls(camera, domElement);

    // Canonical logical player world position (used by safety rules, minimap, avatar, & camera)
    this.position = new THREE.Vector3(0, EYE_HEIGHT, 0);
    this.viewMode = 'first'; // 'first' | 'third'
    this.isMoving = false;
    this.walkCycle = 0;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      turnLeft: false,
      turnRight: false,
    };

    // Yaw sweep history for Look Left & Right safety check
    this.yawHistory = []; // { time, headingDeg }
    this.lastHeadingDeg = 0;
    this.lookedLeftAt = 0;
    this.lookedRightAt = 0;
    this.baseHeadingDeg = null;
    this.lastYawCheckPos = { x: 0, z: 0 };

    this._forwardVec = new THREE.Vector3();
    this._rightVec = new THREE.Vector3();
    this._upVec = new THREE.Vector3(0, 1, 0);

    this._bindEvents();
  }

  _bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (document.activeElement?.tagName === 'INPUT') return;
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = true;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = true;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = true;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = true;
          break;
        case 'KeyQ':
          this.keys.turnLeft = true;
          break;
        case 'KeyE':
          this.keys.turnRight = true;
          break;
      }
    });

    window.addEventListener('keyup', (e) => {
      switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
          this.keys.forward = false;
          break;
        case 'KeyS':
        case 'ArrowDown':
          this.keys.backward = false;
          break;
        case 'KeyA':
        case 'ArrowLeft':
          this.keys.left = false;
          break;
        case 'KeyD':
        case 'ArrowRight':
          this.keys.right = false;
          break;
        case 'KeyQ':
          this.keys.turnLeft = false;
          break;
        case 'KeyE':
          this.keys.turnRight = false;
          break;
      }
    });
  }

  lock() {
    try {
      this.controls.lock();
    } catch {
      // Some automated browsers may not support pointer lock; gameplay still works
    }
  }

  unlock() {
    try {
      if (this.controls.isLocked) this.controls.unlock();
    } catch {
      // ignore
    }
  }

  setViewMode(mode) {
    this.viewMode = mode === 'third' ? 'third' : 'first';
    const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
    // In 3rd-person view, gently tilt pitch downward (-11°) so the walking avatar is framed nicely!
    euler.x = this.viewMode === 'third' ? (-11 * Math.PI) / 180 : 0;
    this.camera.quaternion.setFromEuler(euler);
    this.syncCameraToPosition();
  }

  toggleViewMode() {
    this.setViewMode(this.viewMode === 'first' ? 'third' : 'first');
    return this.viewMode;
  }

  syncCameraToPosition() {
    if (this.viewMode === 'third') {
      this._forwardVec.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
      this._forwardVec.y = 0;
      if (this._forwardVec.lengthSq() < 1e-6) {
        this._forwardVec.set(0, 0, -1);
      } else {
        this._forwardVec.normalize();
      }
      // Position camera smoothly behind and above the walking avatar so sneakers-to-cap are clearly visible
      const followDist = 3.6;
      const followHeight = 2.25;
      this.camera.position.set(
        this.position.x - this._forwardVec.x * followDist,
        followHeight,
        this.position.z - this._forwardVec.z * followDist
      );
    } else {
      this.camera.position.set(this.position.x, EYE_HEIGHT, this.position.z);
    }
  }

  setPose(x, z, headingDeg = 0) {
    this.position.set(x, EYE_HEIGHT, z);
    // headingDeg: 0 = North (-Z), 90 = East (+X).
    // In Three.js, yaw around +Y: yaw = 0 faces -Z; turning right (-Y) faces +X.
    // So yaw = -headingDeg * PI / 180.
    const euler = new THREE.Euler(0, (-headingDeg * Math.PI) / 180, 0, 'YXZ');
    this.camera.quaternion.setFromEuler(euler);
    this.syncCameraToPosition();
    this.lastHeadingDeg = headingDeg;
    this.baseHeadingDeg = headingDeg;
    this.lookedLeftAt = 0;
    this.lookedRightAt = 0;
    this.yawHistory = [];
  }

  getHeadingDeg() {
    this._forwardVec.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    return forwardToHeadingDeg(this._forwardVec.x, this._forwardVec.z);
  }

  /**
   * Returns live Look Left & Look Right status.
   * Requires BOTH a genuine leftward turn (<= -32°) AND a genuine rightward turn (>= +32°)
   * relative to the player's approach heading within the last 5.5 seconds.
   */
  getLookStatus() {
    const now = performance.now();
    const lookedLeft = now - this.lookedLeftAt <= LOOK_WINDOW_MS;
    const lookedRight = now - this.lookedRightAt <= LOOK_WINDOW_MS;
    return {
      lookedLeft,
      lookedRight,
      lookedBoth: lookedLeft && lookedRight,
    };
  }

  hasLookedBothWays() {
    return this.getLookStatus().lookedBoth;
  }

  resetLookCheck() {
    this.lookedLeftAt = 0;
    this.lookedRightAt = 0;
    this.baseHeadingDeg = this.getHeadingDeg();
  }

  _updateLookSweep(isWalkingForward = false) {
    const now = performance.now();
    const heading = this.getHeadingDeg();

    if (this.baseHeadingDeg === null) {
      this.baseHeadingDeg = heading;
    }

    const delta = shortestAngleDiffDeg(heading, this.baseHeadingDeg);

    // Strictly separate Left (negative delta) and Right (positive delta) checks
    if (delta <= -LOOK_SWEEP_THRESHOLD_DEG) {
      this.lookedLeftAt = now;
    }
    if (delta >= LOOK_SWEEP_THRESHOLD_DEG) {
      this.lookedRightAt = now;
    }

    // If neither side is recently checked and the player is walking straight in a new direction,
    // gently re-anchor baseHeadingDeg so approaching any street works from any compass direction.
    const st = this.getLookStatus();
    if (!st.lookedLeft && !st.lookedRight && isWalkingForward) {
      const step = shortestAngleDiffDeg(heading, this.baseHeadingDeg);
      this.baseHeadingDeg = (this.baseHeadingDeg + step * 0.06 + 360) % 360;
    }

    this.lastHeadingDeg = heading;
  }

  update(dt, activeBuildings, enabled = true) {
    if (!enabled) return;

    // Keyboard Q/E rotation (negative Y turns right/clockwise toward East)
    const turnSpeed = 2.0; // rad/s
    if (this.keys.turnLeft || this.keys.turnRight) {
      const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
      if (this.keys.turnLeft) euler.y += turnSpeed * dt;
      if (this.keys.turnRight) euler.y -= turnSpeed * dt;
      this.camera.quaternion.setFromEuler(euler);
    }

    // Horizontal movement in camera's XZ forward/right frame
    const moveZ = (this.keys.forward ? 1 : 0) - (this.keys.backward ? 1 : 0);
    const moveX = (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0);

    this._updateLookSweep(moveZ > 0 && moveX === 0);

    if (moveZ === 0 && moveX === 0) {
      this.isMoving = false;
      this.syncCameraToPosition();
      return;
    }

    this.isMoving = true;
    this.walkCycle += dt * 10.5;

    this._forwardVec.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    this._forwardVec.y = 0;
    if (this._forwardVec.lengthSq() > 1e-6) this._forwardVec.normalize();

    this._rightVec.crossVectors(this._forwardVec, this._upVec).normalize();

    const stepX = this._forwardVec.x * moveZ + this._rightVec.x * moveX;
    const stepZ = this._forwardVec.z * moveZ + this._rightVec.z * moveX;
    const mag = Math.hypot(stepX, stepZ) || 1;

    const nextX = this.position.x + (stepX / mag) * WALK_SPEED * dt;
    const nextZ = this.position.z + (stepZ / mag) * WALK_SPEED * dt;

    // Resolve solid building collisions
    const resolved = this._resolveBuildingCollisions(nextX, nextZ, activeBuildings);
    this.position.set(resolved.x, EYE_HEIGHT, resolved.z);
    this.syncCameraToPosition();
  }

  _resolveBuildingCollisions(px, pz, buildings) {
    let x = px;
    let z = pz;
    const prevX = this.position.x;
    const prevZ = this.position.z;

    for (const b of buildings) {
      if (
        x < b.bbox.minX - PLAYER_RADIUS ||
        x > b.bbox.maxX + PLAYER_RADIUS ||
        z < b.bbox.minZ - PLAYER_RADIUS ||
        z > b.bbox.maxZ + PLAYER_RADIUS
      ) {
        continue;
      }

      const poly = b.polygon;
      let collided = pointInPolygon2D(x, z, poly);

      // Push out from closest polygon edge if within PLAYER_RADIUS
      let bestDist = Infinity;
      let bestPt = null;
      for (let i = 0; i < poly.length; i++) {
        const a = poly[i];
        const c = poly[(i + 1) % poly.length];
        const hit = closestPointOnSegment2D(x, z, a.x, a.z, c.x, c.z);
        if (hit.dist < bestDist) {
          bestDist = hit.dist;
          bestPt = hit;
        }
      }

      if (collided) {
        // Revert to previous safe position if inside polygon
        return { x: prevX, z: prevZ };
      } else if (bestDist < PLAYER_RADIUS && bestPt) {
        const dx = x - bestPt.x;
        const dz = z - bestPt.z;
        const len = Math.hypot(dx, dz) || 1e-4;
        const push = PLAYER_RADIUS - bestDist;
        x += (dx / len) * push;
        z += (dz / len) * push;
      }
    }

    return { x, z };
  }
}
