/**
 * Wild Animal Encounter & Throw-to-Defend System:
 * - Spawns Raccoons (5-10 dmg), Coyotes (10-16 dmg), and Mad Bunnies (4-8 dmg)
 *   roaming the streets and chasing pedestrians/the player.
 * - Supports Attack/Throw mode: launch kid-friendly projectiles (tennis balls / acorns)
 *   toward any 3D raycast aim direction to scare off attacking animals!
 */

import * as THREE from 'three';
import { dist2D } from '../geo.js';

const ANIMAL_SPECS = {
  raccoon: {
    label: 'Raccoon',
    emoji: '🦝',
    speed: 3.3,
    minDmg: 5,
    maxDmg: 10,
    maxHp: 2,
    detectRange: 15,
    attackRange: 1.85,
  },
  coyote: {
    label: 'Coyote',
    emoji: '🐺',
    speed: 4.1,
    minDmg: 10,
    maxDmg: 16,
    maxHp: 3,
    detectRange: 17,
    attackRange: 2.0,
  },
  bunny: {
    label: 'Mad Bunny',
    emoji: '🐇',
    speed: 3.9,
    minDmg: 4,
    maxDmg: 8,
    maxHp: 1,
    detectRange: 14,
    attackRange: 1.75,
  },
};

function makeAnimalLabel(emoji, name) {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(153, 27, 27, 0.84)';
  ctx.beginPath();
  ctx.roundRect(6, 8, 244, 48, 22);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${emoji} ${name}`, 128, 33, 226);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, opacity: 0.9, depthWrite: false })
  );
  sprite.scale.set(1.15, 0.29, 1);
  return sprite;
}

function createRaccoonMesh() {
  const g = new THREE.Group();
  const gray = new THREE.MeshStandardMaterial({ color: 0x6b7280, roughness: 0.85 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.8 });
  const light = new THREE.MeshStandardMaterial({ color: 0xd1d5db, roughness: 0.85 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.38, 0.82), gray);
  body.position.set(0, 0.34, 0);
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.38, 0.32, 0.38), light);
  head.position.set(0, 0.44, 0.5);
  g.add(head);

  // Bandit eye mask + snout
  const mask = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.11, 0.12), dark);
  mask.position.set(0, 0.47, 0.65);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.16, 0.12, 0.18), dark);
  snout.position.set(0, 0.39, 0.74);
  g.add(mask, snout);

  // Ears
  for (const sx of [-0.14, 0.14]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.07, 0.14, 5), dark);
    ear.position.set(sx, 0.65, 0.46);
    g.add(ear);
  }

  // Ringed tail
  for (let i = 0; i < 4; i++) {
    const seg = new THREE.Mesh(
      new THREE.CylinderGeometry(0.09, 0.09, 0.14, 8),
      i % 2 === 0 ? dark : light
    );
    seg.rotation.x = Math.PI / 2.6;
    seg.position.set(0, 0.42 + i * 0.05, -0.46 - i * 0.11);
    g.add(seg);
  }

  // Legs
  for (const [lx, lz] of [[-0.17, 0.28], [0.17, 0.28], [-0.17, -0.28], [0.17, -0.28]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.11, 0.24, 0.11), dark);
    leg.position.set(lx, 0.12, lz);
    g.add(leg);
  }

  const label = makeAnimalLabel('🦝', 'Raccoon');
  label.position.y = 1.05;
  g.add(label);
  return g;
}

function createCoyoteMesh() {
  const g = new THREE.Group();
  const tan = new THREE.MeshStandardMaterial({ color: 0xb4824c, roughness: 0.85 });
  const cream = new THREE.MeshStandardMaterial({ color: 0xfde68a, roughness: 0.85 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x1f2937, roughness: 0.7 });

  const body = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.46, 1.1), tan);
  body.position.set(0, 0.56, 0);
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Mesh(new THREE.BoxGeometry(0.36, 0.34, 0.44), tan);
  head.position.set(0, 0.76, 0.65);
  const snout = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.16, 0.28), cream);
  snout.position.set(0, 0.7, 0.94);
  const nose = new THREE.Mesh(new THREE.SphereGeometry(0.05, 6, 6), dark);
  nose.position.set(0, 0.72, 1.08);
  g.add(head, snout, nose);

  // Tall pointed ears
  for (const sx of [-0.12, 0.12]) {
    const ear = new THREE.Mesh(new THREE.ConeGeometry(0.075, 0.24, 5), tan);
    ear.position.set(sx, 1.02, 0.6);
    g.add(ear);
  }

  // Bushy tail
  const tail = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.11, 0.55, 7), tan);
  tail.rotation.x = -Math.PI / 3;
  tail.position.set(0, 0.54, -0.72);
  g.add(tail);

  // Long legs
  for (const [lx, lz] of [[-0.17, 0.38], [0.17, 0.38], [-0.17, -0.38], [0.17, -0.38]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.46, 0.12), cream);
    leg.position.set(lx, 0.23, lz);
    g.add(leg);
  }

  const label = makeAnimalLabel('🐺', 'Coyote');
  label.position.y = 1.45;
  g.add(label);
  return g;
}

function createMadBunnyMesh() {
  const g = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.75 });
  const pink = new THREE.MeshStandardMaterial({ color: 0xf472b6, roughness: 0.7 });
  const redEye = new THREE.MeshBasicMaterial({ color: 0xef4444 });

  const body = new THREE.Mesh(new THREE.SphereGeometry(0.28, 10, 10), white);
  body.scale.set(0.9, 0.9, 1.2);
  body.position.set(0, 0.28, 0);
  body.castShadow = true;
  g.add(body);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.2, 10, 10), white);
  head.position.set(0, 0.5, 0.25);
  g.add(head);

  // Angry glowing red eyes + tall bunny ears!
  for (const sx of [-0.08, 0.08]) {
    const eye = new THREE.Mesh(new THREE.SphereGeometry(0.038, 6, 6), redEye);
    eye.position.set(sx, 0.54, 0.42);
    const ear = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.36, 0.06), white);
    ear.position.set(sx, 0.78, 0.2);
    ear.rotation.z = sx < 0 ? 0.15 : -0.15;
    const innerEar = new THREE.Mesh(new THREE.BoxGeometry(0.035, 0.26, 0.065), pink);
    innerEar.position.set(sx, 0.78, 0.21);
    innerEar.rotation.z = sx < 0 ? 0.15 : -0.15;
    g.add(eye, ear, innerEar);
  }

  // Cotton tail
  const tail = new THREE.Mesh(new THREE.SphereGeometry(0.11, 8, 8), white);
  tail.position.set(0, 0.3, -0.33);
  g.add(tail);

  const label = makeAnimalLabel('🐇', 'Mad Bunny');
  label.position.y = 1.2;
  g.add(label);
  return g;
}

export class WildlifeSystem {
  constructor(scene, parsed, safetyRules = null) {
    this.scene = scene;
    this.safetyRules = safetyRules;
    this.group = new THREE.Group();
    this.group.name = 'wildlifeSystem';
    this.scene.add(this.group);

    this.animals = [];
    this.projectiles = [];
    this.pickups = []; // Collectible rocks & sticks placed ONLY on sidewalks & grass!

    this.rockGeom = new THREE.DodecahedronGeometry(0.17, 0);
    this.rockMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9, flatShading: true });
    this.stickGeom = new THREE.CylinderGeometry(0.045, 0.055, 0.55, 6);
    this.stickGeom.rotateZ(Math.PI / 2);
    this.stickMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.9 });

    this.spawnAroundRoads(parsed.roads || []);
    this.spawnPickupsAlongRoads(parsed.roads || []);
  }

  _isSafePickupSpot(x, z) {
    if (!this.safetyRules) return true;
    const info = this.safetyRules.classifyPosition(x, z);
    return info.zone === 'sidewalk' || info.zone === 'grass';
  }

  spawnPickupsAlongRoads(roads) {
    const usable = roads.filter((r) => r.highway !== 'service' && r.points.length >= 2);
    if (usable.length === 0) return;

    const ringGeom = new THREE.RingGeometry(0.24, 0.34, 16);
    ringGeom.rotateX(-Math.PI / 2);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.65,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 48; i++) {
      const road = usable[(i * 5 + 1) % usable.length];
      const idx = Math.min(i % road.points.length, road.points.length - 2);
      const a = road.points[idx];
      const b = road.points[idx + 1] || a;
      const dx = b.x - a.x;
      const dz = b.z - a.z;
      const len = Math.hypot(dx, dz) || 1;
      const sideSign = i % 2 === 0 ? 1 : -1;
      const px = (-dz / len) * sideSign;
      const pz = (dx / len) * sideSign;

      // Place strictly on the sidewalk or outer grass boulevard (never in the road lane!)
      const extraGrass = i % 3 === 0 ? 1.8 : 0.0;
      const swDist = road.width * 0.5 + (road.sidewalkWidth || 2.0) * 0.5 + extraGrass;
      const mx = (a.x + b.x) * 0.5;
      const mz = (a.z + b.z) * 0.5;
      const x = mx + px * swDist;
      const z = mz + pz * swDist;

      if (!this._isSafePickupSpot(x, z)) continue;

      const kind = i % 2 === 0 ? 'rock' : 'stick';
      const g = new THREE.Group();
      const itemMesh =
        kind === 'rock'
          ? new THREE.Mesh(this.rockGeom, this.rockMat)
          : new THREE.Mesh(this.stickGeom, this.stickMat);
      itemMesh.position.y = 0.22;
      itemMesh.rotation.y = i * 0.9;
      const ring = new THREE.Mesh(ringGeom, ringMat);
      ring.position.y = 0.18;
      g.add(itemMesh, ring);
      g.position.set(x, 0, z);
      this.group.add(g);

      this.pickups.push({
        id: `pickup_${i}`,
        kind, // 'rock' | 'stick'
        mesh: g,
        itemMesh,
        x,
        z,
        active: true,
        respawnTimer: 0,
      });
    }
  }

  spawnAroundRoads(roads) {
    const usable = roads.filter((r) => r.highway !== 'service' && r.points.length >= 2);
    if (usable.length === 0) return;

    // 20 lively wild animals (raccoons, coyotes, mad bunnies) roaming Westdale!
    const types = [
      'raccoon', 'coyote', 'bunny', 'raccoon', 'bunny',
      'coyote', 'raccoon', 'bunny', 'raccoon', 'coyote',
      'bunny', 'raccoon', 'coyote', 'bunny', 'raccoon',
      'bunny', 'coyote', 'raccoon', 'bunny', 'raccoon',
    ];
    for (let i = 0; i < types.length; i++) {
      const type = types[i];
      const spec = ANIMAL_SPECS[type];
      const road = usable[(i * 4 + 2) % usable.length];
      const pt = road.points[Math.floor(road.points.length / 2)];
      const mesh =
        type === 'raccoon'
          ? createRaccoonMesh()
          : type === 'coyote'
            ? createCoyoteMesh()
            : createMadBunnyMesh();

      const startX = pt.x + (i % 2 === 0 ? 5 : -5);
      const startZ = pt.z + (i % 3 === 0 ? 5 : -5);
      mesh.position.set(startX, 0.14, startZ);
      this.group.add(mesh);

      this.animals.push({
        id: `wild_${i}`,
        type,
        ...spec,
        mesh,
        hp: spec.maxHp,
        x: startX,
        z: startZ,
        homeX: startX,
        homeZ: startZ,
        roamAngle: i * 1.3,
        hopPhase: i * 0.9,
        attackCooldown: 0,
        respawnTimer: 0,
        active: true,
      });
    }
  }

  /**
   * Ensures wild animals and safe sidewalk/grass pickups are nearby when changing home address.
   */
  relocateNear(centerX, centerZ) {
    const offsets = [
      [18, 12], [-22, 16], [16, -20], [-18, -14], [28, -8],
      [-26, 6], [24, 24], [-28, -22], [12, 30], [-14, -28],
    ];
    for (let i = 0; i < Math.min(offsets.length, this.animals.length); i++) {
      const a = this.animals[i];
      a.homeX = centerX + offsets[i][0];
      a.homeZ = centerZ + offsets[i][1];
      a.x = a.homeX;
      a.z = a.homeZ;
      a.hp = a.maxHp;
      a.active = true;
      a.respawnTimer = 0;
      a.mesh.visible = true;
      a.mesh.position.set(a.x, 0.14, a.z);
    }

    // Relocate rocks & sticks ONLY onto safe sidewalk / grass spots!
    let placed = 0;
    for (let attempt = 0; attempt < 40 && placed < Math.min(14, this.pickups.length); attempt++) {
      const ang = (attempt / 14) * Math.PI * 2 + 0.3;
      const rad = 7 + (attempt % 5) * 6;
      const px = centerX + Math.cos(ang) * rad;
      const pz = centerZ + Math.sin(ang) * rad;
      if (!this._isSafePickupSpot(px, pz)) continue;
      const p = this.pickups[placed];
      p.x = px;
      p.z = pz;
      p.active = true;
      p.respawnTimer = 0;
      p.mesh.visible = true;
      p.mesh.position.set(p.x, 0, p.z);
      placed++;
    }
  }

  /**
   * Throws a rock or stick projectile from `origin` along unit direction `dir`.
   */
  throwProjectile(origin, dir, kind = 'rock') {
    const mesh =
      kind === 'stick'
        ? new THREE.Mesh(this.stickGeom, this.stickMat)
        : new THREE.Mesh(this.rockGeom, this.rockMat);
    mesh.position.copy(origin);
    this.group.add(mesh);

    const speed = 25.0;
    this.projectiles.push({
      mesh,
      kind,
      vx: dir.x * speed,
      vy: dir.y * speed + 2.4,
      vz: dir.z * speed,
      life: 2.2,
    });
  }

  /**
   * Wielded stick melee swing in front of the player (does not consume the stick!).
   * Knocks back & damages wild animals in a 3.2m forward arc, and triggers police if an NPC is struck.
   */
  meleeAttack(origin, forwardDir, onAnimalDefeated, npcs = [], onNpcHit = null) {
    const fLen = Math.hypot(forwardDir.x, forwardDir.z) || 1;
    const fx = forwardDir.x / fLen;
    const fz = forwardDir.z / fLen;

    // Check if player swung the stick at an innocent NPC pedestrian
    for (const npc of npcs) {
      const dx = npc.x - origin.x;
      const dz = npc.z - origin.z;
      const d = Math.hypot(dx, dz);
      if (d <= 2.2) {
        const dot = d > 0.01 ? (dx * fx + dz * fz) / d : 1;
        if (dot >= 0.55) {
          onNpcHit?.(npc);
          return { hitCount: 0, hitNpc: true };
        }
      }
    }

    let hitCount = 0;
    for (const a of this.animals) {
      if (!a.active) continue;
      const dx = a.x - origin.x;
      const dz = a.z - origin.z;
      const d = Math.hypot(dx, dz);
      if (d > 3.25) continue;

      const dot = d > 0.01 ? (dx * fx + dz * fz) / d : 1;
      if (dot >= 0.3 || d <= 1.5) {
        hitCount += 1;
        a.hp -= 1;
        const pushX = d > 0.01 ? dx / d : fx;
        const pushZ = d > 0.01 ? dz / d : fz;
        a.x += pushX * 3.0;
        a.z += pushZ * 3.0;
        a.attackCooldown = Math.max(a.attackCooldown, 0.9);

        if (a.hp <= 0) {
          a.active = false;
          a.mesh.visible = false;
          a.respawnTimer = 18.0;
          onAnimalDefeated?.(a, false);
        } else {
          onAnimalDefeated?.(a, true);
        }
      }
    }
    return { hitCount, hitNpc: false };
  }

  update(dt, playerPos, canAttackPlayer, onPlayerHit, onAnimalDefeated, onPickup, npcs = [], onNpcHit = null) {
    // 0. Update collectible rocks & sticks along sidewalks and grass
    for (const pk of this.pickups) {
      if (!pk.active) {
        pk.respawnTimer -= dt;
        if (pk.respawnTimer <= 0) {
          pk.active = true;
          pk.mesh.visible = true;
        }
        continue;
      }
      pk.itemMesh.rotation.y += dt * 1.8;
      if (playerPos && canAttackPlayer && dist2D(playerPos.x, playerPos.z, pk.x, pk.z) <= 1.65) {
        pk.active = false;
        pk.mesh.visible = false;
        pk.respawnTimer = 28.0;
        onPickup?.(pk.kind);
      }
    }

    // 1. Update thrown projectiles & check hits on wild animals OR NPC pedestrians!
    for (let i = this.projectiles.length - 1; i >= 0; i--) {
      const p = this.projectiles[i];
      p.life -= dt;
      p.vy -= 14.0 * dt; // gravity
      p.mesh.position.x += p.vx * dt;
      p.mesh.position.y += p.vy * dt;
      p.mesh.position.z += p.vz * dt;
      p.mesh.rotation.x += dt * 10;
      p.mesh.rotation.y += dt * 8;

      let hit = false;

      // Check if projectile hit an innocent NPC pedestrian!
      for (const npc of npcs) {
        const dNpc = Math.hypot(
          p.mesh.position.x - npc.x,
          p.mesh.position.y - 1.0,
          p.mesh.position.z - npc.z
        );
        if (dNpc <= 1.05) {
          hit = true;
          onNpcHit?.(npc);
          break;
        }
      }

      if (!hit) {
        for (const a of this.animals) {
          if (!a.active) continue;
          const d = Math.hypot(
            p.mesh.position.x - a.x,
            p.mesh.position.y - 0.6,
            p.mesh.position.z - a.z
          );
          if (d <= 1.35) {
            hit = true;
            a.hp -= 1;
            const kLen = Math.hypot(p.vx, p.vz) || 1;
            a.x += (p.vx / kLen) * 2.0;
            a.z += (p.vz / kLen) * 2.0;

            if (a.hp <= 0) {
              a.active = false;
              a.mesh.visible = false;
              a.respawnTimer = 18.0;
              onAnimalDefeated?.(a);
            } else {
              onAnimalDefeated?.(a, true);
            }
            break;
          }
        }
      }

      if (hit || p.life <= 0 || p.mesh.position.y < 0.05) {
        this.group.remove(p.mesh);
        this.projectiles.splice(i, 1);
      }
    }

    // 2. Update wild animals (roam, chase player, attack!)
    for (const a of this.animals) {
      if (!a.active) {
        a.respawnTimer -= dt;
        if (a.respawnTimer <= 0) {
          a.active = true;
          a.hp = a.maxHp;
          a.x = a.homeX;
          a.z = a.homeZ;
          a.mesh.visible = true;
        }
        continue;
      }

      if (a.attackCooldown > 0) a.attackCooldown -= dt;

      const dPlayer = playerPos ? dist2D(a.x, a.z, playerPos.x, playerPos.z) : Infinity;

      let moveX = 0;
      let moveZ = 0;
      let chasing = false;

      if (canAttackPlayer && dPlayer <= a.detectRange) {
        chasing = true;
        if (dPlayer > a.attackRange * 0.85) {
          moveX = (playerPos.x - a.x) / (dPlayer || 1);
          moveZ = (playerPos.z - a.z) / (dPlayer || 1);
        }
        if (dPlayer <= a.attackRange && a.attackCooldown <= 0) {
          a.attackCooldown = 1.45;
          const dmg = a.minDmg + Math.floor(Math.random() * (a.maxDmg - a.minDmg + 1));
          onPlayerHit?.(a, dmg);
        }
      } else {
        // Gentle street-side roaming around home spot
        a.roamAngle += dt * 0.65;
        const targetX = a.homeX + Math.cos(a.roamAngle) * 6.5;
        const targetZ = a.homeZ + Math.sin(a.roamAngle * 0.8) * 6.5;
        const dx = targetX - a.x;
        const dz = targetZ - a.z;
        const len = Math.hypot(dx, dz) || 1;
        moveX = dx / len;
        moveZ = dz / len;
      }

      const spd = chasing ? a.speed : a.speed * 0.42;
      a.x += moveX * spd * dt;
      a.z += moveZ * spd * dt;

      a.hopPhase += dt * (a.type === 'bunny' ? 12 : 8);
      const hopY = a.type === 'bunny' ? Math.abs(Math.sin(a.hopPhase)) * 0.42 : Math.abs(Math.sin(a.hopPhase)) * 0.08;

      a.mesh.position.set(a.x, 0.14 + hopY, a.z);
      if (Math.hypot(moveX, moveZ) > 0.05) {
        a.mesh.rotation.y = Math.atan2(moveX, moveZ);
      }
    }
  }
}
