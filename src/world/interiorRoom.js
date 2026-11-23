/**
 * Walkable 3D Building Interior Room Generator:
 * Builds a tailored, bright low-poly 3D room (14m x 14m) depending on `placeType`
 * (restaurant, cafe, grocery, library, shop, church, pharmacy, bank),
 * complete with 3D furniture, storefront sign, glowing EXIT door, and an animated
 * Worker / Owner NPC you can walk up to and talk with!
 */

import * as THREE from 'three';
import { dist2D } from '../geo.js';
import { disposeGroup } from './worldBuilder.js';

const ROOM_HALF = 6.5; // 13m x 13m walkable room

function makeCanvasSign(lines, bg = '#1e293b', fg = '#ffffff', border = '#facc15', w = 512, h = 140) {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = border;
  ctx.lineWidth = 10;
  ctx.strokeRect(6, 6, w - 12, h - 12);
  ctx.fillStyle = fg;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const arr = Array.isArray(lines) ? lines : [lines];
  if (arr.length === 1) {
    ctx.font = '900 42px system-ui, sans-serif';
    ctx.fillText(arr[0], w / 2, h / 2, w - 40);
  } else {
    ctx.font = '900 38px system-ui, sans-serif';
    ctx.fillText(arr[0], w / 2, h * 0.36, w - 40);
    ctx.font = '700 26px system-ui, sans-serif';
    ctx.fillText(arr[1], w / 2, h * 0.72, w - 40);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function createWorkerNpcMesh(spec) {
  const g = new THREE.Group();

  const pantsMat = new THREE.MeshStandardMaterial({ color: spec.pantsColor || 0x1e293b, roughness: 0.8 });
  const shirtMat = new THREE.MeshStandardMaterial({ color: spec.shirtColor || 0x0ea5e9, roughness: 0.7 });
  const skinMat = new THREE.MeshStandardMaterial({ color: spec.skinColor || 0xf1c27d, roughness: 0.65 });
  const hairMat = new THREE.MeshStandardMaterial({ color: spec.hairColor || 0x3b2f2f, roughness: 0.85 });

  const leftLeg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.56, 0.18), pantsMat);
  leftLeg.position.set(-0.12, 0.28, 0);
  const rightLeg = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.56, 0.18), pantsMat);
  rightLeg.position.set(0.12, 0.28, 0);
  g.add(leftLeg, rightLeg);

  const torso = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.58, 0.26), shirtMat);
  torso.position.y = 0.85;
  g.add(torso);

  const leftArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.14), shirtMat);
  leftArm.position.set(-0.32, 0.84, 0);
  const rightArm = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.48, 0.14), shirtMat);
  rightArm.position.set(0.32, 0.84, 0);
  g.add(leftArm, rightArm);

  const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 12, 12), skinMat);
  head.position.y = 1.37;
  g.add(head);

  const hair = new THREE.Mesh(
    new THREE.SphereGeometry(0.23, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.55),
    hairMat
  );
  hair.position.y = 1.39;
  g.add(hair);

  // Floating name tag
  const canvas = document.createElement('canvas');
  canvas.width = 300;
  canvas.height = 68;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = 'rgba(15, 23, 42, 0.84)';
  ctx.beginPath();
  ctx.roundRect(4, 6, 292, 56, 26);
  ctx.fill();
  ctx.fillStyle = '#fde047';
  ctx.font = '800 24px system-ui, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`${spec.emoji} ${spec.name}`, 150, 35, 272);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  const sprite = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: tex, transparent: true, depthTest: false })
  );
  sprite.scale.set(1.9, 0.45, 1);
  sprite.position.y = 1.95;
  g.add(sprite);

  return g;
}

function getWorkerSpec(placeType, buildingName) {
  const place = buildingName || 'our shop';
  const specs = {
    restaurant: {
      name: 'Chef Marco',
      role: 'Restaurant Owner',
      emoji: '👨‍🍳',
      shirtColor: 0xffffff,
      pantsColor: 0x1e293b,
      skinColor: 0xffdbac,
      hairColor: 0x3b2f2f,
      lines: [
        `Welcome to ${place}! Everything is cooking fresh in the kitchen today!`,
        'Our kids’ favorite is warm soup and homemade pizza — stop by after school with your family!',
        'I love seeing Cootes Paradise students walking safely along King Street!',
        'Remember to look BOTH left and right when you head back outside!',
      ],
    },
    cafe: {
      name: 'Baker Sophie',
      role: 'Café & Bakery Owner',
      emoji: '🥐',
      shirtColor: 0xf59e0b,
      pantsColor: 0x451a03,
      skinColor: 0xe0ac69,
      hairColor: 0x27272a,
      lines: [
        `Welcome to ${place}! Fresh cinnamon buns and warm muffins just came out of the oven!`,
        'Take a look at the pastry display case — smells delicious, right?',
        'Hot cocoa is the best treat after a long walk through Westdale!',
        'Have a wonderful and safe day at Cootes Paradise Elementary!',
      ],
    },
    grocery: {
      name: 'Manager Sam',
      role: 'Store Manager',
      emoji: '🛒',
      shirtColor: 0x16a34a,
      pantsColor: 0x1e3a8a,
      skinColor: 0xc68642,
      hairColor: 0x18181b,
      lines: [
        `Welcome to ${place}! We just stocked crisp apples, bananas, and veggies in the produce aisle!`,
        'Walk down the aisles and explore — healthy snacks give you great walking energy!',
        'Always watch for cars pulling out when you walk past grocery store driveways!',
        'Thanks for visiting — have a great walk to school!',
      ],
    },
    library: {
      name: 'Librarian Ms. Patel',
      role: 'Head Librarian',
      emoji: '📚',
      shirtColor: 0x0ea5e9,
      pantsColor: 0x334155,
      skinColor: 0xc68642,
      hairColor: 0x18181b,
      lines: [
        `Welcome inside ${place}! Feel free to walk around the bookshelves and reading tables!`,
        'We have brand-new adventure books, comic books, and science encyclopedias!',
        'Reading maps and street signs is a super skill — you’re already a great navigator!',
        'Come back after school anytime to borrow a book!',
      ],
    },
    church: {
      name: 'Host Hannah',
      role: 'Community Greeter',
      emoji: '⛪',
      shirtColor: 0x6366f1,
      pantsColor: 0x334155,
      skinColor: 0xffdbac,
      hairColor: 0x713f12,
      lines: [
        `Welcome to ${place}! Isn’t the sunlight through the stained-glass windows lovely?`,
        'Many Westdale families walk right past our corner on their way to school.',
        'Feel free to look around this peaceful hall before heading back out!',
        'Wishing you a safe and cheerful walk today!',
      ],
    },
    pharmacy: {
      name: 'Pharmacist Dr. Lee',
      role: 'Pharmacist',
      emoji: '💊',
      shirtColor: 0xf8fafc,
      pantsColor: 0x0f766e,
      skinColor: 0xf1c27d,
      hairColor: 0x18181b,
      lines: [
        `Hello! Welcome to ${place}! How is your walk to school going today?`,
        'Staying active by walking on the sidewalks is awesome for your health!',
        'Always drink plenty of water and watch the traffic lights on King Street!',
        'Stop by anytime if you want to say hi!',
      ],
    },
    bank: {
      name: 'Teller Jordan',
      role: 'Bank Teller',
      emoji: '🏦',
      shirtColor: 0x1d4ed8,
      pantsColor: 0x0f172a,
      skinColor: 0x8d5524,
      hairColor: 0x1c1917,
      lines: [
        `Welcome to ${place}! Right behind the counter is where we help Westdale neighbors every day!`,
        'Tip of the day: saving a little bit in your piggy bank adds up fast!',
        'Take a look around, and be careful crossing King Street when you head out!',
        'Have an awesome day at school!',
      ],
    },
    shop: {
      name: 'Owner Alex',
      role: 'Shop Owner',
      emoji: '🛍️',
      shirtColor: 0x8b5cf6,
      pantsColor: 0x1e293b,
      skinColor: 0xffdbac,
      hairColor: 0x92400e,
      lines: [
        `Welcome to ${place}! Feel free to walk around and check out our displays!`,
        'Westdale has so many friendly local shops right along King Street West!',
        'Thanks for stopping in to say hello — keep earning those Safety Points!',
        'Look both ways when you step back out onto the sidewalk!',
      ],
    },
  };
  return specs[placeType] || specs.shop;
}

export class InteriorRoom {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xfef9c3);
    this.root = null;
    this.building = null;
    this.worker = null;
    this.workerMesh = null;
    this.workerPos = new THREE.Vector3(0, 0, -2.5);
    this.exitPos = new THREE.Vector3(0, 0, ROOM_HALF - 0.35);
    this.obstacles = []; // simple AABBs { minX, maxX, minZ, maxZ } for counters/shelves

    // Warm bright indoor lighting
    const hemi = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.05);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfffbeb, 0.85);
    dir.position.set(4, 9, 5);
    this.scene.add(dir);
  }

  /**
   * Builds the 3D interior room for a given public building.
   */
  loadBuilding(building) {
    if (this.root) {
      this.scene.remove(this.root);
      disposeGroup(this.root);
    }

    this.building = building;
    this.obstacles = [];
    this.root = new THREE.Group();
    this.scene.add(this.root);

    const placeType = building.placeType || 'shop';
    const palettes = {
      restaurant: { floor: 0x9a3412, wall: 0xfff7ed, trim: 0xf59e0b, accent: 0xdc2626 },
      cafe: { floor: 0x78350f, wall: 0xfef3c7, trim: 0xb45309, accent: 0xf59e0b },
      grocery: { floor: 0xe2e8f0, wall: 0xf0fdf4, trim: 0x16a34a, accent: 0x22c55e },
      library: { floor: 0xa16207, wall: 0xf0f9ff, trim: 0x0369a1, accent: 0x3b82f6 },
      church: { floor: 0x78350f, wall: 0xeef2ff, trim: 0x4338ca, accent: 0x6366f1 },
      pharmacy: { floor: 0xe2e8f0, wall: 0xf0fdfa, trim: 0x0d9488, accent: 0x14b8a6 },
      bank: { floor: 0xdbeafe, wall: 0xf8fafc, trim: 0x1d4ed8, accent: 0x2563eb },
      shop: { floor: 0xd6d3d1, wall: 0xfaf5ff, trim: 0x7c3aed, accent: 0xa855f7 },
    };
    const pal = palettes[placeType] || palettes.shop;
    const S = ROOM_HALF * 2;
    const H = 4.4;

    // Floor & Ceiling
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(S, S),
      new THREE.MeshStandardMaterial({ color: pal.floor, roughness: 0.85 })
    );
    floor.rotation.x = -Math.PI / 2;
    this.root.add(floor);

    const ceiling = new THREE.Mesh(
      new THREE.PlaneGeometry(S, S),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 })
    );
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.y = H;
    this.root.add(ceiling);

    // 4 Walls
    const wallMat = new THREE.MeshStandardMaterial({ color: pal.wall, roughness: 0.85 });
    const walls = [
      { pos: [0, H / 2, -ROOM_HALF], rotY: 0 },
      { pos: [0, H / 2, ROOM_HALF], rotY: Math.PI },
      { pos: [-ROOM_HALF, H / 2, 0], rotY: Math.PI / 2 },
      { pos: [ROOM_HALF, H / 2, 0], rotY: -Math.PI / 2 },
    ];
    for (const w of walls) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(S, H), wallMat);
      m.position.set(...w.pos);
      m.rotation.y = w.rotY;
      this.root.add(m);
    }

    // Welcome banner on North (back) wall
    const titleText = building.name || 'Westdale Local Place';
    const subText = building.houseNumber ? `#${building.houseNumber} ${building.streetAddr || ''}` : 'Welcome Inside!';
    const bannerTex = makeCanvasSign([titleText, subText], '#0f172a', '#ffffff', '#facc15', 700, 170);
    const banner = new THREE.Mesh(
      new THREE.PlaneGeometry(6.8, 1.6),
      new THREE.MeshStandardMaterial({ map: bannerTex, roughness: 0.4 })
    );
    banner.position.set(0, 3.25, -ROOM_HALF + 0.08);
    this.root.add(banner);

    // Glowing Green EXIT Door on South wall (z = +ROOM_HALF)
    const exitFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.2, 2.7, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 })
    );
    exitFrame.position.set(0, 1.35, ROOM_HALF - 0.08);
    this.root.add(exitFrame);

    const exitSignTex = makeCanvasSign('🚪 EXIT TO STREET', '#16a34a', '#ffffff', '#dcfce7', 440, 100);
    const exitSign = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 0.55),
      new THREE.MeshStandardMaterial({ map: exitSignTex, roughness: 0.4 })
    );
    exitSign.position.set(0, 3.05, ROOM_HALF - 0.1);
    exitSign.rotation.y = Math.PI;
    this.root.add(exitSign);

    const exitMatPad = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 0.04, 1.2),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.8 })
    );
    exitMatPad.position.set(0, 0.02, ROOM_HALF - 0.85);
    this.root.add(exitMatPad);

    // Helper to add a solid furniture box with collision AABB
    const addFurniture = (x, z, w, h, d, color) => {
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color, roughness: 0.72 })
      );
      mesh.position.set(x, h / 2, z);
      this.root.add(mesh);
      this.obstacles.push({
        minX: x - w / 2,
        maxX: x + w / 2,
        minZ: z - d / 2,
        maxZ: z + d / 2,
      });
    };

    // Place-Specific 3D Interior Furniture!
    if (placeType === 'restaurant') {
      // Service counter at back
      addFurniture(0, -4.1, 6.2, 1.05, 1.1, 0x92400e);
      // 4 dining tables + chairs
      for (const [tx, tz] of [[-3.6, -1.0], [3.6, -1.0], [-3.6, 2.2], [3.6, 2.2]]) {
        addFurniture(tx, tz, 1.8, 0.8, 1.2, 0xfef3c7);
        const cloth = new THREE.Mesh(
          new THREE.BoxGeometry(1.86, 0.08, 1.26),
          new THREE.MeshStandardMaterial({ color: 0xdc2626, roughness: 0.8 })
        );
        cloth.position.set(tx, 0.82, tz);
        this.root.add(cloth);
      }
      this.workerPos.set(0, 0, -5.2);
    } else if (placeType === 'cafe') {
      // Pastry display counter + glass case
      addFurniture(0, -3.8, 6.4, 1.05, 1.15, 0x92400e);
      const glassCase = new THREE.Mesh(
        new THREE.BoxGeometry(2.6, 0.65, 0.8),
        new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.55 })
      );
      glassCase.position.set(-1.2, 1.38, -3.8);
      this.root.add(glassCase);
      // Cafe round tables
      for (const [tx, tz] of [[-3.8, 0.5], [3.8, 0.5], [-3.8, 3.0], [3.8, 3.0]]) {
        addFurniture(tx, tz, 1.3, 0.82, 1.3, 0xfde68a);
      }
      this.workerPos.set(0, 0, -5.0);
    } else if (placeType === 'grocery') {
      // 2 stocked grocery aisles + produce stand + checkout counter
      const shelfColors = [0xef4444, 0x22c55e, 0xf59e0b, 0x3b82f6];
      for (const sx of [-3.6, 3.6]) {
        addFurniture(sx, -0.5, 1.2, 2.1, 6.5, 0x475569);
        for (let k = 0; k < 4; k++) {
          const item = new THREE.Mesh(
            new THREE.BoxGeometry(1.28, 0.35, 1.2),
            new THREE.MeshStandardMaterial({ color: shelfColors[k % 4], roughness: 0.6 })
          );
          item.position.set(sx, 0.65 + (k % 2) * 0.8, -2.5 + k * 1.6);
          this.root.add(item);
        }
      }
      addFurniture(0, -4.4, 4.4, 1.0, 1.1, 0x15803d);
      this.workerPos.set(0, 0, -5.4);
    } else if (placeType === 'library') {
      // Tall bookshelves along left & right walls + reading tables
      for (const sx of [-5.2, 5.2]) {
        addFurniture(sx, -1.0, 1.1, 2.7, 7.6, 0x78350f);
        for (let row = 0; row < 4; row++) {
          const books = new THREE.Mesh(
            new THREE.BoxGeometry(1.18, 0.36, 7.1),
            new THREE.MeshStandardMaterial({ color: [0xef4444, 0x3b82f6, 0x22c55e, 0xf59e0b][row] })
          );
          books.position.set(sx, 0.55 + row * 0.58, -1.0);
          this.root.add(books);
        }
      }
      addFurniture(0, -4.2, 4.8, 1.0, 1.1, 0x0369a1);
      addFurniture(-2.0, 1.4, 2.0, 0.78, 1.2, 0xfef3c7);
      addFurniture(2.0, 1.4, 2.0, 0.78, 1.2, 0xfef3c7);
      this.workerPos.set(0, 0, -5.2);
    } else if (placeType === 'church') {
      // Wooden pews + glowing stained glass panels on back wall
      for (const pz of [-1.2, 0.8, 2.8]) {
        addFurniture(-3.2, pz, 3.6, 0.9, 0.75, 0x92400e);
        addFurniture(3.2, pz, 3.6, 0.9, 0.75, 0x92400e);
      }
      for (const [wx, col] of [[-3.5, 0x60a5fa], [0, 0xfacc15], [3.5, 0xf472b6]]) {
        const win = new THREE.Mesh(
          new THREE.PlaneGeometry(1.8, 2.2),
          new THREE.MeshBasicMaterial({ color: col })
        );
        win.position.set(wx, 2.2, -ROOM_HALF + 0.06);
        this.root.add(win);
      }
      this.workerPos.set(0, 0, -4.6);
    } else {
      // Shop / Pharmacy / Bank: front counter + colorful display tables
      addFurniture(0, -4.1, 5.8, 1.05, 1.1, pal.trim);
      addFurniture(-3.8, -0.4, 1.8, 1.1, 3.6, pal.accent);
      addFurniture(3.8, -0.4, 1.8, 1.1, 3.6, pal.accent);
      this.workerPos.set(0, 0, -5.2);
    }

    // Spawn interactive Worker / Owner NPC!
    const spec = getWorkerSpec(placeType, building.name);
    this.worker = {
      ...spec,
      lastLineIndex: -1,
    };
    this.workerMesh = createWorkerNpcMesh(spec);
    this.workerMesh.position.copy(this.workerPos);
    this.root.add(this.workerMesh);

    // Spawn player just inside the front door facing North (-Z) toward the room & worker
    return { x: 0, z: ROOM_HALF - 1.8, headingDeg: 0 };
  }

  /**
   * Clamps player position inside room walls and pushes out of furniture AABBs.
   */
  resolveCollisions(pos) {
    const r = 0.55;
    const limit = ROOM_HALF - r;
    pos.x = Math.max(-limit, Math.min(limit, pos.x));
    pos.z = Math.max(-limit, Math.min(limit, pos.z));

    for (const box of this.obstacles) {
      const cx = Math.max(box.minX, Math.min(box.maxX, pos.x));
      const cz = Math.max(box.minZ, Math.min(box.maxZ, pos.z));
      const dx = pos.x - cx;
      const dz = pos.z - cz;
      const d = Math.hypot(dx, dz);
      if (d < r) {
        if (d > 1e-4) {
          pos.x = cx + (dx / d) * r;
          pos.z = cz + (dz / d) * r;
        } else {
          pos.z = box.maxZ + r;
        }
      }
    }
  }

  update(playerPos) {
    if (this.workerMesh && playerPos) {
      // Worker politely turns to face the player as they walk around the room!
      this.workerMesh.rotation.y = Math.atan2(
        playerPos.x - this.workerPos.x,
        playerPos.z - this.workerPos.z
      );
    }
  }

  isNearWorker(playerPos) {
    if (!this.worker || !playerPos) return false;
    return dist2D(playerPos.x, playerPos.z, this.workerPos.x, this.workerPos.z) <= 4.5;
  }

  isAtExitDoor(playerPos) {
    if (!playerPos) return false;
    return Math.abs(playerPos.x) <= 1.5 && playerPos.z >= ROOM_HALF - 0.95;
  }

  getRandomWorkerLine() {
    if (!this.worker) return 'Welcome!';
    const lines = this.worker.lines;
    let idx = Math.floor(Math.random() * lines.length);
    if (idx === this.worker.lastLineIndex && lines.length > 1) {
      idx = (idx + 1) % lines.length;
    }
    this.worker.lastLineIndex = idx;
    return lines[idx];
  }
}
