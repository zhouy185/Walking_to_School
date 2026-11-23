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
const LOOK_WINDOW_MS = 12000;
const LOOK_SWEEP_THRESHOLD_DEG = 20;

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

    // Touch controls state (iPad / iPhone)
    this.isTouchDevice =
      typeof window !== 'undefined' &&
      ('ontouchstart' in window || (navigator.maxTouchPoints || 0) > 0);
    this.touchMoveX = 0;
    this.touchMoveZ = 0;
    this._lookTouchId = null;
    this._lastLookX = 0;
    this._lastLookY = 0;

    // Free-cursor click-and-drag mouse look (so HUD buttons stay clickable!)
    this._isMouseDragging = false;
    this._lastMouseX = 0;
    this._lastMouseY = 0;

    this.keys = {
      forward: false,
      backward: false,
      left: false,
      right: false,
      turnLeft: false,
      turnRight: false,
    };

    // Yaw sweep & intersection look-progress state
    this.yawHistory = []; // { time, headingDeg }
    this.lastHeadingDeg = 0;
    this.lookedLeftAt = 0;
    this.lookedRightAt = 0;
    this.baseHeadingDeg = null;
    this.activeIntersectionId = null;
    this.leftProgress = 0;  // 0..1 continuous fill for Left Arrow
    this.rightProgress = 0; // 0..1 continuous fill for Right Arrow
    this.leftDone = false;
    this.rightDone = false;
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

    // Touch-drag camera look on the 3D canvas (works simultaneously with the left-thumb joystick!)
    this.domElement.addEventListener(
      'touchstart',
      (e) => {
        if (this._lookTouchId !== null) return;
        const t = e.changedTouches[0];
        if (!t) return;
        this._lookTouchId = t.identifier;
        this._lastLookX = t.clientX;
        this._lastLookY = t.clientY;
      },
      { passive: true }
    );

    this.domElement.addEventListener(
      'touchmove',
      (e) => {
        if (this._lookTouchId === null) return;
        for (const t of e.changedTouches) {
          if (t.identifier !== this._lookTouchId) continue;
          const dx = t.clientX - this._lastLookX;
          const dy = t.clientY - this._lastLookY;
          this._lastLookX = t.clientX;
          this._lastLookY = t.clientY;

          const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
          const sensitivity = 0.0045;
          euler.y -= dx * sensitivity;
          euler.x = Math.max(-0.95, Math.min(0.95, euler.x - dy * sensitivity));
          this.camera.quaternion.setFromEuler(euler);
          this.syncCameraToPosition();
          break;
        }
      },
      { passive: true }
    );

    const endLookTouch = (e) => {
      if (this._lookTouchId === null) return;
      for (const t of e.changedTouches) {
        if (t.identifier === this._lookTouchId) {
          this._lookTouchId = null;
          break;
        }
      }
    };
    this.domElement.addEventListener('touchend', endLookTouch, { passive: true });
    this.domElement.addEventListener('touchcancel', endLookTouch, { passive: true });

    // Free-cursor click-and-drag look on the 3D canvas (allows clicking all HUD buttons anytime!)
    this.domElement.addEventListener('mousedown', (e) => {
      if (this.controls.isLocked || e.button !== 0) return;
      this._isMouseDragging = true;
      this._lastMouseX = e.clientX;
      this._lastMouseY = e.clientY;
    });

    window.addEventListener('mousemove', (e) => {
      if (!this._isMouseDragging || this.controls.isLocked) return;
      const dx = e.clientX - this._lastMouseX;
      const dy = e.clientY - this._lastMouseY;
      this._lastMouseX = e.clientX;
      this._lastMouseY = e.clientY;

      const euler = new THREE.Euler().setFromQuaternion(this.camera.quaternion, 'YXZ');
      const sensitivity = 0.0042;
      euler.y -= dx * sensitivity;
      euler.x = Math.max(-0.95, Math.min(0.95, euler.x - dy * sensitivity));
      this.camera.quaternion.setFromEuler(euler);
      this.syncCameraToPosition();
    });

    window.addEventListener('mouseup', () => {
      this._isMouseDragging = false;
    });

    // Single-click the 3D canvas while playing to re-engage PointerLock mouse-look
    this.domElement.addEventListener('click', () => {
      if (!this.isTouchDevice && !this.controls.isLocked && this.onCanvasClickLock) {
        this.onCanvasClickLock();
      }
    });
  }

  /**
   * Sets analog touch joystick movement in [-1, 1] (x = strafe right, z = walk forward).
   */
  setTouchMove(x, z) {
    this.touchMoveX = Math.max(-1, Math.min(1, x));
    this.touchMoveZ = Math.max(-1, Math.min(1, z));
  }

  setTouchTurn(leftHeld, rightHeld) {
    this.keys.turnLeft = leftHeld;
    this.keys.turnRight = rightHeld;
  }

  lock() {
    if (this.isTouchDevice) return; // iOS Safari does not support Pointer Lock
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
   * Starts or maintains an intersection look-check session anchored to the heading
   * when the player arrived at this intersection, so Left & Right arrows fill smoothly 0%..100%.
   */
  setIntersectionContext(intersectionId, anchorHeadingDeg = null) {
    if (intersectionId === this.activeIntersectionId) return;
    this.activeIntersectionId = intersectionId;
    this.leftProgress = 0;
    this.rightProgress = 0;
    this.leftDone = false;
    this.rightDone = false;
    if (intersectionId) {
      // Left/Right are measured from the direction straight ACROSS the street,
      // not from whatever angle you happened to arrive at.
      this.baseHeadingDeg = anchorHeadingDeg ?? this.getHeadingDeg();
      this._activationHeadingDeg = this.getHeadingDeg();
      this.lookedLeftAt = 0;
      this.lookedRightAt = 0;
    }
  }

  /**
   * Returns live Look Left & Look Right progress (0..1) and completion booleans.
   */
  getLookStatus() {
    const now = performance.now();
    const lookedLeft = this.leftDone || now - this.lookedLeftAt <= LOOK_WINDOW_MS;
    const lookedRight = this.rightDone || now - this.lookedRightAt <= LOOK_WINDOW_MS;
    return {
      lookedLeft,
      lookedRight,
      lookedBoth: lookedLeft && lookedRight,
      leftProgress: lookedLeft ? 1 : this.leftProgress,
      rightProgress: lookedRight ? 1 : this.rightProgress,
    };
  }

  hasLookedBothWays() {
    return this.getLookStatus().lookedBoth;
  }

  resetLookCheck() {
    this.lookedLeftAt = 0;
    this.lookedRightAt = 0;
    this.leftProgress = 0;
    this.rightProgress = 0;
    this.leftDone = false;
    this.rightDone = false;
    this.baseHeadingDeg = this.getHeadingDeg();
  }

  _updateLookSweep(isWalkingForward = false) {
    const now = performance.now();
    const heading = this.getHeadingDeg();

    if (this.baseHeadingDeg === null) {
      this.baseHeadingDeg = heading;
    }

    const delta = shortestAngleDiffDeg(heading, this.baseHeadingDeg);
    const clamp01 = (v) => Math.max(0, Math.min(1, v));

    // At an intersection you must (a) be turned >= threshold past the crossing direction AND
    // (b) have actively turned >= 10° that way since arriving — so the approach angle never
    // auto-fills an arrow, and a real head turn always does.
    const inSession = Boolean(this.activeIntersectionId);
    const dAct = inSession ? shortestAngleDiffDeg(heading, this._activationHeadingDeg) : delta;
    const actT = inSession ? 10 : LOOK_SWEEP_THRESHOLD_DEG;
    const leftFill = Math.min(clamp01(-delta / LOOK_SWEEP_THRESHOLD_DEG), clamp01(-dAct / actT));
    const rightFill = Math.min(clamp01(delta / LOOK_SWEEP_THRESHOLD_DEG), clamp01(dAct / actT));

    // Smooth continuous fill progress [0..1] for Left (-delta) and Right (+delta)
    if (!this.leftDone) {
      const pL = leftFill;
      this.leftProgress = Math.max(this.leftProgress, pL);
      if (this.leftProgress >= 1) {
        this.leftDone = true;
        this.lookedLeftAt = now;
      }
    }
    if (!this.rightDone) {
      const pR = rightFill;
      this.rightProgress = Math.max(this.rightProgress, pR);
      if (this.rightProgress >= 1) {
        this.rightDone = true;
        this.lookedRightAt = now;
      }
    }

    // Outside an active intersection session, gently re-anchor baseHeadingDeg when walking straight
    if (!this.activeIntersectionId && !this.leftDone && !this.rightDone && isWalkingForward) {
      const step = shortestAngleDiffDeg(heading, this.baseHeadingDeg);
      this.baseHeadingDeg = (this.baseHeadingDeg + step * 0.08 + 360) % 360;
      this.leftProgress = 0;
      this.rightProgress = 0;
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

    // Horizontal movement in camera's XZ forward/right frame (keyboard + touch joystick)
    const keyZ = (this.keys.forward ? 1 : 0) - (this.keys.backward ? 1 : 0);
    const keyX = (this.keys.right ? 1 : 0) - (this.keys.left ? 1 : 0);
    const moveZ = Math.max(-1, Math.min(1, keyZ + this.touchMoveZ));
    const moveX = Math.max(-1, Math.min(1, keyX + this.touchMoveX));

    this._updateLookSweep(moveZ > 0.2 && Math.abs(moveX) < 0.5);

    if (Math.hypot(moveX, moveZ) < 0.08) {
      this.isMoving = false;
      this.syncCameraToPosition();
      return;
    }

    this.isMoving = true;
    const throttle = Math.min(1, Math.hypot(moveX, moveZ));
    this.walkCycle += dt * 10.5 * throttle;

    this._forwardVec.set(0, 0, -1).applyQuaternion(this.camera.quaternion);
    this._forwardVec.y = 0;
    if (this._forwardVec.lengthSq() > 1e-6) this._forwardVec.normalize();

    this._rightVec.crossVectors(this._forwardVec, this._upVec).normalize();

    const stepX = this._forwardVec.x * moveZ + this._rightVec.x * moveX;
    const stepZ = this._forwardVec.z * moveZ + this._rightVec.z * moveX;
    const mag = Math.hypot(stepX, stepZ) || 1;

    const nextX = this.position.x + (stepX / mag) * WALK_SPEED * throttle * dt;
    const nextZ = this.position.z + (stepZ / mag) * WALK_SPEED * throttle * dt;

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
        // If prev position was ALSO inside this building (e.g. spawned inside a large building),
        // push outward past the closest wall edge instead of freezing the player in place!
        if (pointInPolygon2D(prevX, prevZ, poly) && bestPt) {
          const outX = bestPt.x - x;
          const outZ = bestPt.z - z;
          const outLen = Math.hypot(outX, outZ) || 1e-4;
          x = bestPt.x + (outX / outLen) * (PLAYER_RADIUS + 0.25);
          z = bestPt.z + (outZ / outLen) * (PLAYER_RADIUS + 0.25);
          continue;
        }
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
