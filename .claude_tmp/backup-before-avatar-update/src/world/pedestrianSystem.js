/**
 * Friendly Neighborhood NPC Pedestrians:
 * - Spawns 10 animated low-poly NPCs walking along Westdale sidewalks
 *   (King St W, Marion Ave, Paisley Ave, Cline Ave, etc.)
 * - Each NPC has a distinct outfit, role, and 3-4 unique random dialogue lines.
 * - When the player approaches within 5.5m, the NPC pauses and turns to face the player
 *   so the player can press T (or click the Talk button) to chat!
 */

import * as THREE from 'three';
import { dist2D } from '../geo.js';
import { createStylizedHumanMesh, animateHumanWalk } from './characterBuilder.js';
import { createRealisticHumanInstance, FEMALE_ARCHETYPES, MALE_ARCHETYPES } from './humanModels.js';

const NPC_ROSTER = [
  {
    name: 'Crossing Guard Sam',
    role: 'Crossing Guard',
    emoji: '🦺',
    shirtColor: 0xbef264,
    pantsColor: 0x1e3a8a,
    skinColor: 0xf1c27d,
    hairColor: 0x3b2f2f,
    streetPref: /king street/i,
    lines: [
      'Good morning! Always wait for the white Walk person before crossing King Street!',
      'Remember to look BOTH left and right at every corner — safety first!',
      'You are doing great! Cootes Paradise Elementary is just ahead!',
      'Never cross on the red hand — the friendly police car is always watching out for kids!',
    ],
  },
  {
    name: 'Librarian Ms. Patel',
    role: 'Westdale Library',
    emoji: '📚',
    shirtColor: 0x0ea5e9,
    pantsColor: 0x334155,
    skinColor: 0xc68642,
    hairColor: 0x1e1b18,
    streetPref: /king street/i,
    lines: [
      'We just got brand-new comic books at Westdale Library today!',
      'Have a fantastic day at school! Come visit after class for story time.',
      'Did you know you can catch the Yellow School Bus right at the King Street bus stop?',
      'Reading street signs helps you become a master navigator!',
    ],
  },
  {
    name: 'Baker Leo',
    role: 'Neighborhood Baker',
    emoji: '🥐',
    shirtColor: 0xffffff,
    pantsColor: 0x475569,
    skinColor: 0xffdbac,
    hairColor: 0x92400e,
    streetPref: /king street/i,
    lines: [
      'Mmm, fresh cinnamon buns just came out of the oven on King Street!',
      'Walking on the sidewalk gives you the best view of all the Westdale shops!',
      'Watch out for cars turning off King Street — always check both ways!',
      'A good breakfast and a safe walk make the best school morning!',
    ],
  },
  {
    name: 'Maya',
    role: 'Neighbor',
    emoji: '🐶',
    shirtColor: 0xf472b6,
    pantsColor: 0x1d4ed8,
    skinColor: 0xe0ac69,
    hairColor: 0x451a03,
    streetPref: /marion/i,
    lines: [
      'What a sunny morning in Westdale! Perfect weather for walking to school!',
      'Even quiet streets like Marion Ave have cars — look BOTH left and right before crossing!',
      'I love how bright the sidewalks are today. Easy to stay out of the road!',
      'Have fun at Cootes Paradise Elementary!',
    ],
  },
  {
    name: 'Noah',
    role: 'Classmate',
    emoji: '🎒',
    shirtColor: 0x22c55e,
    pantsColor: 0x334155,
    skinColor: 0xf1c27d,
    hairColor: 0x713f12,
    streetPref: /cline/i,
    lines: [
      'Hey! Are you heading to Cootes Paradise Elementary too? Race you — safely on the sidewalk!',
      'I got all 3 Safety Stars yesterday by looking left AND right at Cline Ave!',
      'The golden School Safe Path leads straight to the front entrance beacon!',
      'Did you see the Yellow School Bus? You can press F at a bus stop to ride it!',
    ],
  },
  {
    name: 'Chloe',
    role: 'Classmate',
    emoji: '🎨',
    shirtColor: 0xa855f7,
    pantsColor: 0x1e293b,
    skinColor: 0x8d5524,
    hairColor: 0x18181b,
    streetPref: /paisley/i,
    lines: [
      'We have art class today! I hope we get to paint our neighborhood!',
      'Walking on the grass is totally fine, just stay out of the car lanes!',
      'If you ever get lost, click "Show Route Hint" to see the blue path on your mini-map!',
      'See you at the school entrance plaza!',
    ],
  },
  {
    name: 'Grandpa Henry',
    role: 'Westdale Resident',
    emoji: '🧢',
    shirtColor: 0xf59e0b,
    pantsColor: 0x44403c,
    skinColor: 0xffdbac,
    hairColor: 0xe2e8f0,
    streetPref: /paisley/i,
    lines: [
      'I have lived in Westdale for 40 years — finest walking neighborhood in Hamilton!',
      'Take your time at intersections, kiddo. Better safe than hurried!',
      'The churches and shops along King Street look wonderful today.',
      'Keep those 3 Safety Stars shining bright!',
    ],
  },
  {
    name: 'Jogger Alex',
    role: 'Runner',
    emoji: '👟',
    shirtColor: 0xef4444,
    pantsColor: 0x0f172a,
    skinColor: 0xc68642,
    hairColor: 0x27272a,
    streetPref: /king street/i,
    lines: [
      'Phew! Doing my morning jog down King Street West!',
      'Even when jogging, I always stop at the red hand signal!',
      'Keep moving and stay alert at every zebra crossing!',
      'Great pace! You will be at school in no time!',
    ],
  },
  {
    name: 'Teacher Mr. Chen',
    role: 'School Teacher',
    emoji: '🍎',
    shirtColor: 0x14b8a6,
    pantsColor: 0x1e293b,
    skinColor: 0xf1c27d,
    hairColor: 0x18181b,
    streetPref: /cline/i,
    lines: [
      'Good morning! Ready for an awesome day of learning at Cootes Paradise?',
      'Today’s safety lesson: always check BOTH left and right before stepping off the curb!',
      'Remember, crossing on a red light brings the safety police car right away!',
      'I’ll see you inside the school entrance!',
    ],
  },
  {
    name: 'Mail Carrier Priya',
    role: 'Mail Carrier',
    emoji: '📬',
    shirtColor: 0x2563eb,
    pantsColor: 0x1e3a8a,
    skinColor: 0x8d5524,
    hairColor: 0x1c1917,
    streetPref: /marion/i,
    lines: [
      'Delivering letters all across Westdale this morning!',
      'I walk miles on these sidewalks every day — zebra crossings are my best friend!',
      'Say hi to your neighbors along Marion Ave and King Street!',
      'Have a safe walk to school!',
    ],
  },
];

// Additional diverse Westdale neighbors so the sidewalks feel lively & bustling (28 total pedestrians!)
const EXTRA_NEIGHBORS = [
  { name: 'Liam', role: 'McMaster Student', emoji: '🎓', shirtColor: 0x7f1d1d, pantsColor: 0x1f2937, skinColor: 0xffdbac, hairColor: 0x451a03, female: false, accessory: 'glasses', backpack: 0x1e293b },
  { name: 'Sofia', role: 'Dog Walker', emoji: '🐕', shirtColor: 0xec4899, pantsColor: 0x334155, skinColor: 0xe0ac69, hairColor: 0x27272a, female: true, accessory: 'beanie' },
  { name: 'Omar', role: 'Barista', emoji: '☕', shirtColor: 0x065f46, pantsColor: 0x1e293b, skinColor: 0xc68642, hairColor: 0x18181b, female: false, beard: true, accessory: 'cap' },
  { name: 'Emma', role: 'Classmate', emoji: '🎒', shirtColor: 0xfacc15, pantsColor: 0x1d4ed8, skinColor: 0xffdbac, hairColor: 0x92400e, female: true, backpack: 0xf472b6 },
  { name: 'Marcus', role: 'Coach', emoji: '⚽', shirtColor: 0xea580c, pantsColor: 0x0f172a, skinColor: 0x8d5524, hairColor: 0x18181b, female: false, accessory: 'cap' },
  { name: 'Hannah', role: 'Musician', emoji: '🎸', shirtColor: 0x6d28d9, pantsColor: 0x111827, skinColor: 0xf1c27d, hairColor: 0x713f12, female: true, accessory: 'glasses' },
  { name: 'Daniel', role: 'Parent', emoji: '🚶', shirtColor: 0x0284c7, pantsColor: 0x78716c, skinColor: 0xe0ac69, hairColor: 0x3b2f2f, female: false, beard: true },
  { name: 'Aisha', role: 'Doctor', emoji: '🩺', shirtColor: 0x0d9488, pantsColor: 0x1e293b, skinColor: 0x8d5524, hairColor: 0x18181b, female: true, accessory: 'glasses' },
  { name: 'Lucas', role: 'Skateboarder', emoji: '🛹', shirtColor: 0xdc2626, pantsColor: 0x334155, skinColor: 0xf1c27d, hairColor: 0xeab308, female: false, accessory: 'beanie', backpack: 0x38bdf8 },
  { name: 'Mei', role: 'Artist', emoji: '🖌️', shirtColor: 0xf43f5e, pantsColor: 0x1e3a8a, skinColor: 0xffdbac, hairColor: 0x18181b, female: true, accessory: 'cap' },
  { name: 'Ethan', role: 'Gardener', emoji: '🌿', shirtColor: 0x15803d, pantsColor: 0x78350f, skinColor: 0xf1c27d, hairColor: 0x92400e, female: false, headwear: true },
  { name: 'Zara', role: 'Classmate', emoji: '📚', shirtColor: 0x38bdf8, pantsColor: 0x312e81, skinColor: 0xc68642, hairColor: 0x18181b, female: true, backpack: 0x22c55e },
  { name: 'David', role: 'Architect', emoji: '📐', shirtColor: 0x475569, pantsColor: 0x0f172a, skinColor: 0xffdbac, hairColor: 0x64748b, female: false, accessory: 'glasses', beard: true },
  { name: 'Nadia', role: 'Baker', emoji: '🧁', shirtColor: 0xfb7185, pantsColor: 0x334155, skinColor: 0xe0ac69, hairColor: 0x3b2f2f, female: true, accessory: 'chef' },
  { name: 'Caleb', role: 'Cyclist', emoji: '🚴', shirtColor: 0x84cc16, pantsColor: 0x1e293b, skinColor: 0xf1c27d, hairColor: 0x451a03, female: false, accessory: 'cap', backpack: 0xf59e0b },
  { name: 'Grace', role: 'Librarian', emoji: '📖', shirtColor: 0x6366f1, pantsColor: 0x1e293b, skinColor: 0xffdbac, hairColor: 0x92400e, female: true, accessory: 'glasses' },
  { name: 'Mateo', role: 'Chef', emoji: '🍝', shirtColor: 0xf8fafc, pantsColor: 0x111827, skinColor: 0xc68642, hairColor: 0x18181b, female: false, accessory: 'chef' },
  { name: 'Lily', role: 'Runner', emoji: '🏃‍♀️', shirtColor: 0xf97316, pantsColor: 0x0f172a, skinColor: 0xf1c27d, hairColor: 0x713f12, female: true, accessory: 'beanie' },
].map((n) => ({
  ...n,
  streetPref: /.*/,
  lines: [
    `Hi there! I'm ${n.name} — enjoying a lovely walk through Westdale!`,
    'Watch out for raccoons and coyotes near the side streets, and stay on the sidewalk!',
    'Always look both ways before stepping onto a crosswalk!',
    'Have a super safe day walking around Hamilton!',
  ],
}));

const FULL_NPC_ROSTER = [...NPC_ROSTER, ...EXTRA_NEIGHBORS];

function createNpcMesh(spec, idx = 0) {
  const hairStyles = ['cap', 'long', 'chef', 'pigtails', 'spiky', 'curly', 'short', 'headband', 'short', 'long'];
  const outfits = ['vest', 'jacket', 'tshirt', 'hoodie', 'hoodie', 'tshirt', 'jacket', 'tshirt', 'jacket', 'vest'];
  const isFemale = spec.female !== undefined ? spec.female : /Patel|Maya|Chloe|Priya/i.test(spec.name);
  const hasBeard = spec.beard !== undefined ? spec.beard : /Henry|Leo|Sam/i.test(spec.name);
  const hasHeadwear = spec.headwear !== undefined ? spec.headwear : /Sam|Henry/i.test(spec.name);
  const shoeColors = [0xf8fafc, 0x1e293b, 0x78350f, 0xdc2626, 0x2563eb, 0x15803d];
  const heightScale = spec.role === 'Classmate' ? 0.82 + (idx % 3) * 0.03 : 0.94 + (idx % 5) * 0.035;
  const widthScale = 0.94 + (idx % 4) * 0.04;

  // Pick from 11 distinct male & female 3D character models so people look genuinely different!
  let variant;
  if (/Crossing Guard|Gardener/i.test(spec.role)) {
    variant = isFemale ? 'f_worker' : 'm_worker';
  } else if (/Doctor|Architect|School Teacher|Parent/i.test(spec.role)) {
    variant = isFemale ? 'f_suit' : 'm_suit';
  } else {
    const pool = isFemale ? FEMALE_ARCHETYPES : MALE_ARCHETYPES;
    variant = pool[idx % pool.length];
  }

  const g =
    createRealisticHumanInstance({
      variant,
      scale: heightScale,
      widthScale,
      topColor: spec.shirtColor,
      pantsColor: spec.pantsColor,
      shoeColor: shoeColors[idx % shoeColors.length],
      skinColor: spec.skinColor,
      hairColor: spec.hairColor,
      showBeard: hasBeard,
      showHeadwear: hasHeadwear,
      seated: false,
      timeOffset: idx * 0.53,
    }) ||
    createStylizedHumanMesh({
      scale: heightScale,
      skinColor: spec.skinColor,
      hairColor: spec.hairColor,
      hairStyle: hairStyles[idx % hairStyles.length],
      topColor: spec.shirtColor,
      pantsColor: spec.pantsColor,
      outfitStyle: outfits[idx % outfits.length],
      headbandColor: 0xef4444,
      wristWraps: spec.role === 'Runner' || spec.role === 'Classmate',
    });

  // Floating subtle name tag above head
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 64;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(15, 23, 42, 0.78)';
  ctx.beginPath();
  ctx.roundRect(4, 6, 248, 52, 24);
  ctx.fill();
  ctx.fillStyle = '#ffffff';
  ctx.font = '800 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${spec.emoji} ${spec.name}`, 128, 33, 230);

  const labelTex = new THREE.CanvasTexture(canvas);
  labelTex.colorSpace = THREE.SRGBColorSpace;
  const labelSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: labelTex, transparent: true, depthTest: false })
  );
  labelSprite.scale.set(1.65, 0.42, 1);
  labelSprite.position.y = 2.08;
  g.add(labelSprite);

  return g;
}

export class PedestrianSystem {
  constructor(scene, parsed) {
    this.scene = scene;
    this.group = new THREE.Group();
    this.group.name = 'npcPedestrians';
    this.scene.add(this.group);
    this.npcs = [];

    this._spawnOnRoads(parsed.roads || []);
  }

  refreshMeshes() {
    for (let i = 0; i < this.npcs.length; i++) {
      const npc = this.npcs[i];
      const prevPos = npc.mesh.position.clone();
      const prevRotY = npc.mesh.rotation.y;
      this.group.remove(npc.mesh);
      npc.mesh = createNpcMesh(npc, i);
      npc.mesh.position.copy(prevPos);
      npc.mesh.rotation.y = prevRotY;
      this.group.add(npc.mesh);
    }
  }

  _spawnOnRoads(roads) {
    const usableRoads = roads.filter((r) => r.highway !== 'service' && r.points.length >= 2);
    if (usableRoads.length === 0) return;

    for (let i = 0; i < FULL_NPC_ROSTER.length; i++) {
      const spec = FULL_NPC_ROSTER[i];
      // Pick a matching preferred street (with decent length), else spread across neighborhood roads
      const matching = usableRoads.filter((r) => spec.streetPref.test(r.name));
      const pool = matching.length > 0 ? matching : usableRoads;
      const road = pool[(i * 3) % pool.length];

      // Build sidewalk polyline on one side of this road
      const sideSign = i % 2 === 0 ? 1 : -1;
      const swOffset = road.width * 0.5 + (road.sidewalkWidth || 2.0) * 0.5;
      const pts = [];
      for (let j = 0; j < road.points.length; j++) {
        const cur = road.points[j];
        const next = road.points[Math.min(j + 1, road.points.length - 1)];
        const prev = road.points[Math.max(j - 1, 0)];
        const dx = next.x - prev.x;
        const dz = next.z - prev.z;
        const len = Math.hypot(dx, dz) || 1;
        const px = (-dz / len) * sideSign;
        const pz = (dx / len) * sideSign;
        pts.push({ x: cur.x + px * swOffset, z: cur.z + pz * swOffset });
      }

      const cumDist = [0];
      for (let j = 0; j < pts.length - 1; j++) {
        cumDist.push(cumDist[j] + dist2D(pts[j].x, pts[j].z, pts[j + 1].x, pts[j + 1].z));
      }
      const totalLength = cumDist[cumDist.length - 1];
      if (totalLength < 8) continue;

      const mesh = createNpcMesh(spec, i);
      this.group.add(mesh);

      this.npcs.push({
        id: `npc_${i}`,
        ...spec,
        mesh,
        pts,
        cumDist,
        totalLength,
        dist: totalLength * ((i * 0.31 + 0.15) % 0.85),
        dir: i % 2 === 0 ? 1 : -1,
        speed: 1.25 + (i % 3) * 0.25,
        walkPhase: i * 1.1,
        lastLineIndex: -1,
        x: pts[0].x,
        z: pts[0].z,
      });
    }
  }

  /**
   * Returns a random dialogue line for this NPC without repeating the previous line.
   */
  getRandomLine(npc) {
    const lines = npc.lines;
    if (!lines || lines.length === 0) return 'Hello! Have a safe walk!';
    if (lines.length === 1) return lines[0];
    let idx = Math.floor(Math.random() * lines.length);
    if (idx === npc.lastLineIndex) {
      idx = (idx + 1) % lines.length;
    }
    npc.lastLineIndex = idx;
    return lines[idx];
  }

  /**
   * Returns the closest NPC within talking range (5.5m) of the player.
   */
  getNearbyNpc(playerPos, maxDist = 5.5) {
    let best = null;
    let bestDist = Infinity;
    for (const npc of this.npcs) {
      const d = dist2D(playerPos.x, playerPos.z, npc.x, npc.z);
      if (d <= maxDist && d < bestDist) {
        bestDist = d;
        best = npc;
      }
    }
    return best;
  }

  _sample(npc, d) {
    const clamped = Math.max(0, Math.min(npc.totalLength, d));
    let idx = 0;
    while (idx < npc.cumDist.length - 2 && npc.cumDist[idx + 1] < clamped) {
      idx++;
    }
    const segStart = npc.cumDist[idx];
    const segEnd = npc.cumDist[idx + 1] || segStart + 1;
    const t = Math.max(0, Math.min(1, (clamped - segStart) / (segEnd - segStart + 1e-6)));
    const a = npc.pts[idx];
    const b = npc.pts[idx + 1] || a;
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len = Math.hypot(dx, dz) || 1;
    return {
      x: a.x + dx * t,
      z: a.z + dz * t,
      dirX: (dx / len) * npc.dir,
      dirZ: (dz / len) * npc.dir,
    };
  }

  update(dt, playerPos, activeTalkNpcId = null) {
    for (const npc of this.npcs) {
      // Pedestrians mind their own business! Only pause & face the player when actively chatting (T)!
      const isActivelyChatting =
        activeTalkNpcId === npc.id &&
        playerPos &&
        dist2D(playerPos.x, playerPos.z, npc.x, npc.z) <= 6.5;

      if (!isActivelyChatting) {
        npc.dist += npc.dir * npc.speed * dt;
        if (npc.dist >= npc.totalLength) {
          npc.dist = npc.totalLength;
          npc.dir = -1;
        } else if (npc.dist <= 0) {
          npc.dist = 0;
          npc.dir = 1;
        }
        npc.walkPhase += dt * npc.speed * 4.5;
      }

      const pose = this._sample(npc, npc.dist);
      npc.x = pose.x;
      npc.z = pose.z;
      npc.mesh.position.set(pose.x, 0.16, pose.z);

      if (isActivelyChatting && playerPos) {
        npc.mesh.rotation.y = Math.atan2(playerPos.x - npc.x, playerPos.z - npc.z);
      } else {
        npc.mesh.rotation.y = Math.atan2(pose.dirX, pose.dirZ);
      }

      // Smooth speed-matched biomechanical walking animation!
      if (npc.mesh.userData?.isRealisticGlb) {
        npc.mesh.userData.setAnimState(isActivelyChatting ? 'idle' : 'walk', npc.speed);
        npc.mesh.userData.updateAnim(dt);
      } else {
        npc.idleTime = (npc.idleTime || 0) + dt;
        animateHumanWalk(npc.mesh, npc.walkPhase, !isActivelyChatting, npc.idleTime);
      }
    }
  }
}
