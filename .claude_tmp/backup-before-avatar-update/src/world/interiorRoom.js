/**
 * Spacious Multi-Floor Walkable 3D Building & House Interior Engine:
 * - Every building (houses, Your House, restaurants, cafés, shops, grocery stores,
 *   libraries, pharmacies, banks, schools, churches) can be entered and explored!
 * - Spacious 24m x 22m floor plan per story, with exact floor count (`1`..`4` floors)
 *   matching the exterior window rows 1-to-1!
 * - Houses feature a grand Foyer, partitioned Living Room (sofa, TV, fireplace, rugs),
 *   full Kitchen & Dining Area (fridge, stove, sink, island, dining table), and real
 *   walkable 3D Staircases leading up to 2nd-floor Bedrooms/Study and 3rd/4th-floor Lofts!
 * - Shops & Restaurants feature spacious multi-table dining rooms, counters, aisles,
 *   walkable upper mezzanine/gallery floors, and diverse customers minding their own business!
 */

import * as THREE from 'three';
import { dist2D } from '../geo.js';
import { disposeGroup } from './worldBuilder.js';
import { createStylizedHumanMesh } from './characterBuilder.js';
import { createRealisticHumanInstance, ALL_ARCHETYPES, FEMALE_ARCHETYPES, MALE_ARCHETYPES } from './humanModels.js';

const HALF_W = 12.0; // 24m wide spacious interior!
const HALF_D = 11.0; // 22m deep spacious interior!
const FLOOR_H = 3.6; // 3.6m floor-to-floor story height

// East-side switchback stairwell bay: x in [7.4, 11.6], z in [-4.4, +4.4]
// Even flights (0: 1F->2F, 2: 3F->4F) occupy x in [9.5, 11.5], climbing South (+4.2) -> North (-4.2)
// Odd flights  (1: 2F->3F)            occupy x in [7.5, 9.5],  climbing North (-4.2) -> South (+4.2)
const STAIR_WELL = { minX: 7.4, maxX: 11.6, minZ: -4.4, maxZ: 4.4 };
const STAIR_Z_SOUTH = 4.2;
const STAIR_Z_NORTH = -4.2;

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
    ctx.font = '900 40px system-ui, sans-serif';
    ctx.fillText(arr[0], w / 2, h / 2, w - 36);
  } else {
    ctx.font = '900 36px system-ui, sans-serif';
    ctx.fillText(arr[0], w / 2, h * 0.36, w - 36);
    ctx.font = '700 25px system-ui, sans-serif';
    ctx.fillText(arr[1], w / 2, h * 0.72, w - 36);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

function makeWallTexture(baseHex = '#fefce8', trimHex = '#92400e') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = baseHex;
  ctx.fillRect(0, 0, 256, 256);
  // Subtle vertical wallpaper stripes so walking motion is always visually crisp!
  ctx.fillStyle = 'rgba(15, 23, 42, 0.035)';
  for (let x = 0; x < 256; x += 32) {
    ctx.fillRect(x, 0, 12, 256);
  }
  // Lower wainscoting chair-rail & baseboard trim
  ctx.fillStyle = trimHex;
  ctx.fillRect(0, 196, 256, 8);
  ctx.fillRect(0, 242, 256, 14);
  ctx.strokeStyle = 'rgba(0,0,0,0.14)';
  ctx.lineWidth = 3;
  for (let x = 12; x < 256; x += 64) {
    ctx.strokeRect(x, 208, 48, 28);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function makeFloorTexture(style = 'wood') {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  if (style === 'wood') {
    // Light honey-oak planks with staggered joints and soft grain
    const tones = ['#e7c08f', '#dcb07c', '#e9c696', '#d6a872', '#e2b986', '#dbb07e', '#e6bf8c', '#d8ab76'];
    for (let i = 0; i < 8; i++) {
      const y = i * 32;
      ctx.fillStyle = tones[i];
      ctx.fillRect(0, y, 256, 32);
      ctx.strokeStyle = 'rgba(120, 72, 30, 0.10)';
      ctx.lineWidth = 1;
      for (let g = 0; g < 5; g++) {
        const gy = y + 4 + g * 6 + ((i * 7 + g * 3) % 4);
        ctx.beginPath();
        ctx.moveTo(0, gy);
        ctx.bezierCurveTo(64, gy + 2, 160, gy - 2, 256, gy + 1);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(90, 50, 20, 0.28)';
      ctx.fillRect(0, y + 31, 256, 1);
      const jx = (i * 97) % 256;
      ctx.fillRect(jx, y, 1.5, 31);
    }
  } else if (style === 'checkered') {
    const sq = 64;
    for (let y = 0; y < 4; y++) {
      for (let x = 0; x < 4; x++) {
        ctx.fillStyle = (x + y) % 2 === 0 ? '#f8fafc' : '#cbd5e1';
        ctx.fillRect(x * sq, y * sq, sq, sq);
      }
    }
  } else {
    ctx.fillStyle = '#f1f5f9';
    ctx.fillRect(0, 0, 256, 256);
    ctx.strokeStyle = '#cbd5e1';
    ctx.lineWidth = 4;
    ctx.strokeRect(2, 2, 124, 124);
    ctx.strokeRect(130, 2, 124, 124);
    ctx.strokeRect(2, 130, 124, 124);
    ctx.strokeRect(130, 130, 124, 124);
  }

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, 8);
  return tex;
}

function createInteriorWindow(w = 2.6, h = 1.75) {
  const g = new THREE.Group();
  const frameMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.55 });
  const frame = new THREE.Mesh(new THREE.BoxGeometry(w + 0.2, h + 0.2, 0.1), frameMat);
  g.add(frame);

  const glass = new THREE.Mesh(
    new THREE.PlaneGeometry(w, h),
    new THREE.MeshBasicMaterial({ color: 0xbae6fd })
  );
  glass.position.z = 0.06;
  g.add(glass);

  const mullV = new THREE.Mesh(new THREE.BoxGeometry(0.06, h, 0.04), frameMat);
  mullV.position.z = 0.07;
  const mullH = new THREE.Mesh(new THREE.BoxGeometry(w, 0.06, 0.04), frameMat);
  mullH.position.z = 0.07;
  const sill = new THREE.Mesh(new THREE.BoxGeometry(w + 0.3, 0.09, 0.22), frameMat);
  sill.position.set(0, -h / 2 - 0.07, 0.07);
  g.add(mullV, mullH, sill);
  return g;
}

function createCeilingLight(x, yCeiling, z, shadeColor = 0xf59e0b) {
  const g = new THREE.Group();
  const cord = new THREE.Mesh(
    new THREE.CylinderGeometry(0.02, 0.02, 0.45, 6),
    new THREE.MeshStandardMaterial({ color: 0x334155 })
  );
  cord.position.y = yCeiling - 0.22;
  const shade = new THREE.Mesh(
    new THREE.ConeGeometry(0.32, 0.22, 10),
    new THREE.MeshStandardMaterial({ color: shadeColor, roughness: 0.45 })
  );
  shade.position.y = yCeiling - 0.48;
  const bulb = new THREE.Mesh(
    new THREE.SphereGeometry(0.11, 8, 8),
    new THREE.MeshBasicMaterial({ color: 0xfef08a })
  );
  bulb.position.y = yCeiling - 0.56;
  g.add(cord, shade, bulb);
  g.position.set(x, 0, z);
  return g;
}

function createPottedPlant(x, yBase, z) {
  const g = new THREE.Group();
  const pot = new THREE.Mesh(
    new THREE.CylinderGeometry(0.28, 0.2, 0.42, 8),
    new THREE.MeshStandardMaterial({ color: 0xb45309, roughness: 0.85 })
  );
  pot.position.y = 0.21;
  const bush1 = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.38, 0),
    new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.8, flatShading: true })
  );
  bush1.position.y = 0.68;
  const bush2 = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.26, 0),
    new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.8, flatShading: true })
  );
  bush2.position.set(0.14, 0.96, 0.06);
  g.add(pot, bush1, bush2);
  g.position.set(x, yBase, z);
  return g;
}

function createChairMesh(x, yBase, z, rotY = 0, woodColor = 0x78350f, cushionColor = 0xdc2626) {
  const g = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: woodColor, roughness: 0.75 });
  const cushionMat = new THREE.MeshStandardMaterial({ color: cushionColor, roughness: 0.85 });

  for (const [lx, lz] of [[-0.2, -0.2], [0.2, -0.2], [-0.2, 0.2], [0.2, 0.2]]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.46, 0.06), woodMat);
    leg.position.set(lx, 0.23, lz);
    g.add(leg);
  }
  const seat = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.06, 0.48), woodMat);
  seat.position.y = 0.47;
  const cushion = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.05, 0.42), cushionMat);
  cushion.position.y = 0.52;
  const backL = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.52, 0.06), woodMat);
  backL.position.set(-0.2, 0.75, -0.2);
  const backR = new THREE.Mesh(new THREE.BoxGeometry(0.06, 0.52, 0.06), woodMat);
  backR.position.set(0.2, 0.75, -0.2);
  const backTop = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.28, 0.06), cushionMat);
  backTop.position.set(0, 0.85, -0.2);
  g.add(seat, cushion, backL, backR, backTop);

  g.position.set(x, yBase, z);
  g.rotation.y = rotY;
  return g;
}

function createDiningTableMesh(x, yBase, z, { width = 1.9, depth = 1.25, clothColor = 0xdc2626, mode = 'restaurant' } = {}) {
  const g = new THREE.Group();
  const woodMat = new THREE.MeshStandardMaterial({ color: 0x78350f, roughness: 0.75 });

  for (const [lx, lz] of [
    [-width * 0.42, -depth * 0.4],
    [width * 0.42, -depth * 0.4],
    [-width * 0.42, depth * 0.4],
    [width * 0.42, depth * 0.4],
  ]) {
    const leg = new THREE.Mesh(new THREE.BoxGeometry(0.09, 0.74, 0.09), woodMat);
    leg.position.set(lx, 0.37, lz);
    g.add(leg);
  }

  const top = new THREE.Mesh(new THREE.BoxGeometry(width, 0.08, depth), woodMat);
  top.position.y = 0.76;
  g.add(top);

  if (clothColor) {
    const cloth = new THREE.Mesh(
      new THREE.BoxGeometry(width + 0.08, 0.06, depth + 0.08),
      new THREE.MeshStandardMaterial({ color: clothColor, roughness: 0.85 })
    );
    cloth.position.y = 0.8;
    g.add(cloth);
  }

  const plateMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.35 });
  const foodColors = [0xf59e0b, 0x22c55e, 0xef4444, 0xfbbf24];

  if (mode === 'restaurant' || mode === 'home') {
    for (const [px, pz, idx] of [[-0.45, -0.28, 0], [0.45, -0.28, 1], [-0.45, 0.28, 2], [0.45, 0.28, 3]]) {
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.13, 0.03, 12), plateMat);
      plate.position.set(px, 0.845, pz);
      const meal = new THREE.Mesh(
        new THREE.CylinderGeometry(0.11, 0.12, 0.05, 10),
        new THREE.MeshStandardMaterial({ color: foodColors[idx], roughness: 0.65 })
      );
      meal.position.set(px, 0.87, pz);
      const cup = new THREE.Mesh(
        new THREE.CylinderGeometry(0.045, 0.038, 0.11, 8),
        new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.25 })
      );
      cup.position.set(px + (px < 0 ? -0.22 : 0.22), 0.88, pz);
      g.add(plate, meal, cup);
    }
    const vase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.08, 0.2, 8),
      new THREE.MeshStandardMaterial({ color: 0xfef08a, emissive: 0xf59e0b, emissiveIntensity: 0.35 })
    );
    vase.position.set(0, 0.92, 0);
    g.add(vase);
  } else if (mode === 'cafe') {
    for (const [px, pz] of [[-0.32, 0], [0.32, 0]]) {
      const mug = new THREE.Mesh(
        new THREE.CylinderGeometry(0.055, 0.05, 0.11, 8),
        new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.4 })
      );
      mug.position.set(px, 0.88, pz + 0.14);
      const plate = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.11, 0.025, 10), plateMat);
      plate.position.set(px, 0.84, pz - 0.12);
      const pastry = new THREE.Mesh(
        new THREE.SphereGeometry(0.07, 8, 6),
        new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.8 })
      );
      pastry.scale.set(1.3, 0.7, 0.9);
      pastry.position.set(px, 0.875, pz - 0.12);
      g.add(mug, plate, pastry);
    }
  } else if (mode === 'library') {
    for (const [bx, bz, col] of [[-0.45, -0.22, 0x3b82f6], [0.45, 0.22, 0xef4444]]) {
      const cover = new THREE.Mesh(
        new THREE.BoxGeometry(0.36, 0.03, 0.26),
        new THREE.MeshStandardMaterial({ color: col, roughness: 0.7 })
      );
      cover.position.set(bx, 0.82, bz);
      const pages = new THREE.Mesh(
        new THREE.BoxGeometry(0.32, 0.035, 0.22),
        new THREE.MeshStandardMaterial({ color: 0xfef9c3, roughness: 0.9 })
      );
      pages.position.set(bx, 0.84, bz);
      g.add(cover, pages);
    }
    const lampShade = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.12, 0.16),
      new THREE.MeshStandardMaterial({ color: 0x16a34a, emissive: 0x15803d, emissiveIntensity: 0.35 })
    );
    lampShade.position.set(0, 1.05, 0);
    g.add(lampShade);
  }

  g.position.set(x, yBase, z);
  return g;
}

const CUSTOMER_PALETTE = [
  { shirt: 0xef4444, pants: 0x1e3a8a, skin: 0xffdbac, hair: 0x3b2f2f },
  { shirt: 0x0ea5e9, pants: 0x334155, skin: 0xe0ac69, hair: 0x18181b },
  { shirt: 0x22c55e, pants: 0x451a03, skin: 0xc68642, hair: 0x18181b },
  { shirt: 0xa855f7, pants: 0x1e293b, skin: 0xf1c27d, hair: 0x92400e },
  { shirt: 0xf59e0b, pants: 0x0f172a, skin: 0x8d5524, hair: 0x1c1917 },
  { shirt: 0xec4899, pants: 0x1e3a8a, skin: 0xffdbac, hair: 0xeab308 },
  { shirt: 0x14b8a6, pants: 0x334155, skin: 0xe0ac69, hair: 0x451a03 },
  { shirt: 0x6366f1, pants: 0x1e293b, skin: 0xf1c27d, hair: 0x18181b },
];

function createWorkerNpcMesh(spec, seed = 0, seated = false) {
  const isFemale = /Sophie|Patel|Hannah|Mom|Emma|Sister/i.test(spec.name);
  const pool = isFemale ? FEMALE_ARCHETYPES : MALE_ARCHETYPES;
  const variant = pool[Math.abs(seed) % pool.length];
  const g =
    createRealisticHumanInstance({
      variant,
      scale: 0.98,
      topColor: spec.shirtColor || 0xffffff,
      pantsColor: spec.pantsColor || 0x1e293b,
      shoeColor: 0x111827,
      skinColor: spec.skinColor || 0xf1c27d,
      hairColor: spec.hairColor || 0x3b2f2f,
      showBeard: /Marco|Sam|Dad/i.test(spec.name),
      seated,
      timeOffset: seed * 0.4,
    }) ||
    createStylizedHumanMesh({
      scale: 0.98,
      skinColor: spec.skinColor || 0xf1c27d,
      hairColor: spec.hairColor || 0x3b2f2f,
      topColor: spec.shirtColor || 0x0ea5e9,
      pantsColor: spec.pantsColor || 0x1e293b,
      seated,
    });

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
  sprite.position.y = seated ? 1.72 : 2.08;
  g.add(sprite);

  return g;
}

function createCustomerNpcMesh(idx, { seated = true, activity = 'dining' } = {}) {
  const pal = CUSTOMER_PALETTE[idx % CUSTOMER_PALETTE.length];
  const variant = ALL_ARCHETYPES[idx % ALL_ARCHETYPES.length];
  const g =
    createRealisticHumanInstance({
      variant,
      scale: 0.92 + (idx % 3) * 0.04,
      widthScale: 0.95 + (idx % 3) * 0.04,
      topColor: pal.shirt,
      pantsColor: pal.pants,
      shoeColor: idx % 2 === 0 ? 0xf8fafc : 0x1e293b,
      skinColor: pal.skin,
      hairColor: pal.hair,
      showBeard: idx % 5 === 1,
      showHeadwear: idx % 6 === 2,
      seated,
      timeOffset: idx * 0.77,
    }) ||
    createStylizedHumanMesh({
      scale: 0.94,
      skinColor: pal.skin,
      hairColor: pal.hair,
      topColor: pal.shirt,
      pantsColor: pal.pants,
      seated,
      activity,
    });
  g.userData.phase = idx * 1.4;
  return g;
}

function getWorkerSpec(placeType, buildingName, houseNumber = '', floors = 2) {
  const place = buildingName || (houseNumber ? `#${houseNumber}` : 'this building');
  if (placeType === 'home') {
    return {
      name: 'Family Member',
      role: 'Your Home',
      emoji: '🏡',
      shirtColor: 0xec4899,
      pantsColor: 0x1e3a8a,
      skinColor: 0xffdbac,
      hairColor: 0x3b2f2f,
      lines: [
        `Welcome home! Check out the living room, kitchen, or walk up the stairs to the ${floors}nd floor!`,
        'Have a wonderful and safe walk to school — remember to look left and right at crosswalks!',
        'I made fresh snacks in the kitchen for when you get back!',
      ],
    };
  }
  if (placeType === 'house') {
    return {
      name: `Neighbor ${houseNumber ? `at #${houseNumber}` : 'Alex'}`,
      role: `${floors}-Story Homeowner`,
      emoji: '🏠',
      shirtColor: 0x0ea5e9,
      pantsColor: 0x334155,
      skinColor: 0xf1c27d,
      hairColor: 0x451a03,
      lines: [
        `Hello neighbor! Welcome inside our ${floors}-story Westdale home!`,
        floors > 1
          ? `Feel free to look around the foyer, living room, and kitchen — or take the stairs on the right up to all ${floors} floors!`
          : 'Feel free to look around our cozy single-story bungalow — foyer, living room, and kitchen!',
        'Stay safe on the sidewalks out there today!',
      ],
    };
  }
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
        `Welcome to ${place}! Grab a look around our spacious dining room${floors > 1 ? ` and upstairs ${floors}-floor lounge` : ''}!`,
        'Everything is cooking fresh in the kitchen today — pizza, pasta, and warm soup!',
        'Remember to look BOTH left and right when you step back out onto King Street!',
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
        floors > 1 ? 'We have extra cozy seating upstairs too — take the stairs on the right!' : 'Enjoy the cozy café atmosphere!',
        'Have a wonderful and safe walk through Westdale!',
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
        `Welcome to ${place}! Walk down all our spacious aisles and check out the fresh fruit islands!`,
        'Healthy snacks give you great walking energy!',
        'Watch for cars at driveways and crosswalks when you head back outside!',
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
        `Welcome inside ${place}! Explore the main book stacks or walk upstairs to the 2nd-floor reading gallery!`,
        'We have brand-new adventure books, comics, and science encyclopedias!',
        'Come back anytime to read and explore!',
      ],
    },
    school: {
      name: 'Principal Davis',
      role: 'School Principal',
      emoji: '🏫',
      shirtColor: 0xdc2626,
      pantsColor: 0x1e293b,
      skinColor: 0xf1c27d,
      hairColor: 0x3b2f2f,
      lines: [
        `Welcome inside ${place}! Walk around the classrooms and take the stairs up to all ${floors} floors!`,
        'Great job practicing safe pedestrian habits on your way here!',
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
        `Welcome to ${place}! Feel free to explore the main hall and the upstairs balcony!`,
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
        `Hello! Welcome to ${place}! Walk around our spacious health aisles${floors > 1 ? ' and upstairs clinic lounge' : ''}!`,
        'Staying active by walking safely on sidewalks is awesome for your health!',
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
        `Welcome to ${place}! Explore our main banking hall${floors > 1 ? ' and upstairs offices' : ''}!`,
        'Have an awesome and safe day!',
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
        `Welcome to ${place}! Take your time exploring our showroom${floors > 1 ? ` across all ${floors} floors` : ''}!`,
        'Look both ways when you step back out onto the sidewalk!',
      ],
    },
  };
  return specs[placeType] || specs.shop;
}

export class InteriorRoom {
  constructor() {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xe0f2fe);
    this.root = null;
    this.building = null;
    this.floors = 1;
    this.worker = null;
    this.workerMesh = null;
    this.workerPos = new THREE.Vector3(0, 0, -4.0);
    this.residents = []; // Interactive talkable NPCs (e.g., Mom & Dad in Your House, or shop worker)
    this.customers = []; // { mesh, idx, floor, x, z, rotY, opts }
    this.interactables = []; // Chairs, sofas, barstools, and beds the MC can sit/lie on!
    this.stairs = []; // { fromFloor, toFloor, minX, maxX, zStart, zEnd }
    this.obstacles = []; // { floor, minX, maxX, minZ, maxZ }
    this.animTime = 0;

    const hemi = new THREE.HemisphereLight(0xffffff, 0xe2e8f0, 1.12);
    this.scene.add(hemi);
    const dir = new THREE.DirectionalLight(0xfffbeb, 0.85);
    dir.position.set(6, 18, 8);
    this.scene.add(dir);
  }

  loadBuilding(building) {
    if (this.root) {
      this.scene.remove(this.root);
      disposeGroup(this.root);
    }

    this.building = building;
    this.floors = Math.max(1, Math.min(4, building.floors || Math.round((building.height || 6.6) / 3.3) || 2));
    this.obstacles = [];
    this.stairs = [];
    this.residents = [];
    this.customers = [];
    this.interactables = [];
    this.animTime = 0;
    this.root = new THREE.Group();
    this.scene.add(this.root);

    const placeType = building.placeType || 'house';
    const isHouse = placeType === 'house' || placeType === 'home';

    const palettes = {
      home: { floorStyle: 'wood', floorTint: 0xfff4e6, wall: 0xfffbeb, trim: 0x92400e, accent: 0xec4899 },
      house: { floorStyle: 'wood', floorTint: 0xfff8ea, wall: 0xfefce8, trim: 0x78350f, accent: 0x0284c7 },
      restaurant: { floorStyle: 'wood', floorTint: 0xf3dcc0, wall: 0xfff7ed, trim: 0xb45309, accent: 0xdc2626 },
      cafe: { floorStyle: 'wood', floorTint: 0xe6c7a3, wall: 0xfef3c7, trim: 0x92400e, accent: 0xf59e0b },
      grocery: { floorStyle: 'checkered', floorTint: 0xffffff, wall: 0xf0fdf4, trim: 0x16a34a, accent: 0x22c55e },
      library: { floorStyle: 'wood', floorTint: 0xfff3e0, wall: 0xf0f9ff, trim: 0x0369a1, accent: 0x3b82f6 },
      school: { floorStyle: 'checkered', floorTint: 0xfefce8, wall: 0xf0f9ff, trim: 0xb91c1c, accent: 0xf59e0b },
      church: { floorStyle: 'wood', floorTint: 0xd8b48e, wall: 0xeef2ff, trim: 0x4338ca, accent: 0x6366f1 },
      pharmacy: { floorStyle: 'checkered', floorTint: 0xffffff, wall: 0xf0fdfa, trim: 0x0d9488, accent: 0x14b8a6 },
      bank: { floorStyle: 'marble', floorTint: 0xffffff, wall: 0xf8fafc, trim: 0x1d4ed8, accent: 0x2563eb },
      shop: { floorStyle: 'checkered', floorTint: 0xfefce8, wall: 0xfaf5ff, trim: 0x7c3aed, accent: 0xa855f7 },
    };
    const pal = palettes[placeType] || palettes.house;

    const W = HALF_W * 2;
    const D = HALF_D * 2;
    const totalH = this.floors * FLOOR_H;

    const floorTex = makeFloorTexture(pal.floorStyle);
    const floorMat = new THREE.MeshStandardMaterial({
      color: pal.floorTint,
      map: floorTex,
      roughness: 0.78,
      side: THREE.DoubleSide,
    });
    const ceilingMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.9,
      side: THREE.FrontSide,
    });
    const wallHex = '#' + new THREE.Color(pal.wall).getHexString();
    const trimHex = '#' + new THREE.Color(pal.trim).getHexString();
    const wallTex = makeWallTexture(wallHex, trimHex);
    wallTex.repeat.set(6, this.floors);
    // Outer shell walls MUST use FrontSide (facing inward) so 3rd-person camera never gets blocked behind an outer wall!
    const outerWallMat = new THREE.MeshStandardMaterial({
      map: wallTex,
      roughness: 0.85,
      side: THREE.FrontSide,
    });

    // 1. Outer Shell Walls (spanning full multi-floor height, inward-facing!)
    const outerWalls = [
      { w: W, pos: [0, totalH / 2, -HALF_D], rotY: 0 },
      { w: W, pos: [0, totalH / 2, HALF_D], rotY: Math.PI },
      { w: D, pos: [-HALF_W, totalH / 2, 0], rotY: Math.PI / 2 },
      { w: D, pos: [HALF_W, totalH / 2, 0], rotY: -Math.PI / 2 },
    ];
    for (const ow of outerWalls) {
      const m = new THREE.Mesh(new THREE.PlaneGeometry(ow.w, totalH), outerWallMat);
      m.position.set(...ow.pos);
      m.rotation.y = ow.rotY;
      this.root.add(m);
    }

    // Top-most roof ceiling
    const topCeil = new THREE.Mesh(new THREE.PlaneGeometry(W, D), ceilingMat);
    topCeil.rotation.x = Math.PI / 2;
    topCeil.position.y = totalH;
    this.root.add(topCeil);

    // Helpers for adding solid furniture & partition walls on a specific floor `f`
    const addBox = (floor, x, z, w, h, d, color, collide = true, yOffset = 0) => {
      const yBase = floor * FLOOR_H + yOffset;
      const mesh = new THREE.Mesh(
        new THREE.BoxGeometry(w, h, d),
        new THREE.MeshStandardMaterial({ color, roughness: 0.74 })
      );
      mesh.position.set(x, yBase + h / 2, z);
      this.root.add(mesh);
      if (collide) {
        this.obstacles.push({
          floor,
          minX: x - w / 2,
          maxX: x + w / 2,
          minZ: z - d / 2,
          maxZ: z + d / 2,
        });
      }
      return mesh;
    };

    const addObstacle = (floor, x, z, w, d) => {
      this.obstacles.push({
        floor,
        minX: x - w / 2,
        maxX: x + w / 2,
        minZ: z - d / 2,
        maxZ: z + d / 2,
      });
    };

    const addCustomer = (idx, floor, x, z, rotY, opts = {}) => {
      const npc = createCustomerNpcMesh(idx, opts);
      npc.position.set(x, floor * FLOOR_H, z);
      npc.rotation.y = rotY;
      this.root.add(npc);
      this.customers.push({ mesh: npc, idx, floor, x, z, rotY, opts });
    };

    const addChair = (floor, x, z, rotY, woodColor, cushionColor, label = 'Chair') => {
      const yBase = floor * FLOOR_H;
      this.root.add(createChairMesh(x, yBase, z, rotY, woodColor, cushionColor));
      const item = {
        id: `chair_${this.interactables.length}`,
        kind: 'chair',
        label,
        floor,
        x,
        z,
        yBase,
        rotY,
        occupied: false,
      };
      this.interactables.push(item);
      return item;
    };

    const addBed = (floor, x, z, w, d, mattressColor, comforterColor, label = 'Bed') => {
      const yBase = floor * FLOOR_H;
      addBox(floor, x, z, w, 0.56, d, mattressColor, true);
      addBox(floor, x, z + d * 0.16, w + 0.04, 0.14, d * 0.64, comforterColor, false, 0.55);
      // Pillows near headboard (-Z end of bed)
      const pillowCount = w > 2.0 ? 2 : 1;
      for (let i = 0; i < pillowCount; i++) {
        const px = pillowCount === 1 ? x : x + (i === 0 ? -0.52 : 0.52);
        addBox(floor, px, z - d * 0.34, 0.72, 0.16, 0.42, 0xffffff, false, 0.56);
      }
      addBox(floor, x, z - d * 0.48, w + 0.08, 1.32, 0.2, 0x78350f, false);
      const item = {
        id: `bed_${this.interactables.length}`,
        kind: 'bed',
        label,
        floor,
        x,
        z,
        yBase,
        bedTopY: yBase + 0.65,
        rotY: 0, // Looking toward foot of bed (+Z -> heading 180 or 0)
        standX: x + w * 0.5 + 0.75,
        standZ: z,
        occupied: false,
      };
      this.interactables.push(item);
      return item;
    };

    // 2. Build Floor Slabs (with stairwell cutout on f >= 1), Windows on EVERY story, & Ceiling Lights!
    for (let f = 0; f < this.floors; f++) {
      const yBase = f * FLOOR_H;

      if (f === 0) {
        const groundFloor = new THREE.Mesh(new THREE.PlaneGeometry(W, D), floorMat);
        groundFloor.rotation.x = -Math.PI / 2;
        this.root.add(groundFloor);
      } else {
        // Upper floor slab with open stairwell cutout: STAIR_WELL [7.4 .. 11.6] x [-4.4 .. +4.4]
        const slabPieces = [
          // Main West expanse: x in [-12, 7.4], z in [-11, 11]
          { cx: (-HALF_W + STAIR_WELL.minX) / 2, cz: 0, sw: STAIR_WELL.minX - -HALF_W, sd: D },
          // North landing north of stairwell: x in [7.4, 12], z in [-11, -4.4]
          {
            cx: (STAIR_WELL.minX + HALF_W) / 2,
            cz: (-HALF_D + STAIR_WELL.minZ) / 2,
            sw: HALF_W - STAIR_WELL.minX,
            sd: STAIR_WELL.minZ - -HALF_D,
          },
          // South landing south of stairwell: x in [7.4, 12], z in [4.4, 11]
          {
            cx: (STAIR_WELL.minX + HALF_W) / 2,
            cz: (STAIR_WELL.maxZ + HALF_D) / 2,
            sw: HALF_W - STAIR_WELL.minX,
            sd: HALF_D - STAIR_WELL.maxZ,
          },
          // Thin East strip: x in [11.6, 12], z in [-4.4, 4.4]
          {
            cx: (STAIR_WELL.maxX + HALF_W) / 2,
            cz: 0,
            sw: HALF_W - STAIR_WELL.maxX,
            sd: STAIR_WELL.maxZ - STAIR_WELL.minZ,
          },
        ];
        for (const sp of slabPieces) {
          const slab = new THREE.Mesh(new THREE.BoxGeometry(sp.sw, 0.18, sp.sd), floorMat);
          slab.position.set(sp.cx, yBase - 0.09, sp.cz);
          this.root.add(slab);
          const underCeil = new THREE.Mesh(new THREE.PlaneGeometry(sp.sw, sp.sd), ceilingMat);
          underCeil.rotation.x = Math.PI / 2;
          underCeil.position.set(sp.cx, yBase - 0.19, sp.cz);
          this.root.add(underCeil);
        }

        // Safety banister railings around the stairwell opening so you can look down safely!
        // West side of stairwell (solid full-length guardrail)
        addBox(f, STAIR_WELL.minX - 0.08, 0, 0.14, 1.05, STAIR_WELL.maxZ - STAIR_WELL.minZ, pal.trim, true);

        // North & South ends of stairwell: leave open ONLY where a stair flight connects to floor `f`!
        // Flight f-1 arrives at floor `f`: if (f-1) is even -> arrives at NORTH end (x in [9.5, 11.5]); if odd -> SOUTH end (x in [7.5, 9.5])
        // Flight f departs floor `f` (if f < floors - 1): if f is even -> departs SOUTH end (x in [9.5, 11.5]); if odd -> departs NORTH end (x in [7.5, 9.5])
        const arriveNorthEast = (f - 1) % 2 === 0; // x in [9.5, 11.5]
        const arriveSouthWest = (f - 1) % 2 === 1; // x in [7.5, 9.5]
        const departSouthEast = f < this.floors - 1 && f % 2 === 0; // x in [9.5, 11.5]
        const departNorthWest = f < this.floors - 1 && f % 2 === 1; // x in [7.5, 9.5]

        if (!departNorthWest) {
          addBox(f, 8.45, STAIR_WELL.minZ - 0.06, 2.05, 1.05, 0.14, pal.trim, true);
        }
        if (!arriveNorthEast) {
          addBox(f, 10.55, STAIR_WELL.minZ - 0.06, 2.05, 1.05, 0.14, pal.trim, true);
        }
        if (!arriveSouthWest) {
          addBox(f, 8.45, STAIR_WELL.maxZ + 0.06, 2.05, 1.05, 0.14, pal.trim, true);
        }
        if (!departSouthEast) {
          addBox(f, 10.55, STAIR_WELL.maxZ + 0.06, 2.05, 1.05, 0.14, pal.trim, true);
        }
      }

      // Sunny Exterior Windows on EVERY floor (matching the exterior window rows!)
      for (const wx of [-7.5, 7.5]) {
        const sWin = createInteriorWindow(2.8, 1.75);
        sWin.position.set(wx, yBase + 1.85, HALF_D - 0.06);
        sWin.rotation.y = Math.PI;
        this.root.add(sWin);

        const nWin = createInteriorWindow(2.8, 1.75);
        nWin.position.set(wx, yBase + 1.85, -HALF_D + 0.06);
        this.root.add(nWin);
      }
      for (const wz of [-5.5, 5.5]) {
        const wWin = createInteriorWindow(2.6, 1.75);
        wWin.position.set(-HALF_W + 0.06, yBase + 1.85, wz);
        wWin.rotation.y = Math.PI / 2;
        this.root.add(wWin);
      }

      // Warm ceiling pendant lights on each floor
      for (const [lx, lz] of [[-6.5, -5.0], [1.5, -5.0], [-6.5, 4.5], [1.5, 4.5]]) {
        this.root.add(createCeilingLight(lx, yBase + FLOOR_H - 0.18, lz, pal.accent));
      }

      // Floor indicator plaque near the stairs on every level
      if (this.floors > 1) {
        const flSignTex = makeCanvasSign(
          [`FLOOR ${f + 1} OF ${this.floors}`, f < this.floors - 1 ? '⬆️ Walk Stairs Up • ⬇️ Down' : '⬇️ Walk Stairs Down'],
          '#1e293b',
          '#ffffff',
          '#38bdf8',
          460,
          120
        );
        const flSign = new THREE.Mesh(
          new THREE.PlaneGeometry(2.2, 0.58),
          new THREE.MeshStandardMaterial({ map: flSignTex, roughness: 0.4 })
        );
        flSign.position.set(HALF_W - 0.08, yBase + 2.35, f % 2 === 0 ? 5.6 : -5.6);
        flSign.rotation.y = -Math.PI / 2;
        this.root.add(flSign);
      }
    }

    // 3. Build Real Walkable 3D Staircase Flights Connecting Floor 1 -> 2 -> 3 -> 4!
    const stairWoodMat = new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.72 });
    const stairRailMat = new THREE.MeshStandardMaterial({ color: 0x451a03, roughness: 0.65 });
    for (let f = 0; f < this.floors - 1; f++) {
      const even = f % 2 === 0;
      const minX = even ? 9.5 : 7.5;
      const maxX = even ? 11.5 : 9.5;
      const cx = (minX + maxX) / 2;
      const zStart = even ? STAIR_Z_SOUTH : STAIR_Z_NORTH;
      const zEnd = even ? STAIR_Z_NORTH : STAIR_Z_SOUTH;
      const yStart = f * FLOOR_H;

      this.stairs.push({
        fromFloor: f,
        toFloor: f + 1,
        minX,
        maxX,
        zStart,
        zEnd,
      });

      const stepCount = 18;
      const dz = (zEnd - zStart) / stepCount;
      const dy = FLOOR_H / stepCount;
      for (let s = 0; s < stepCount; s++) {
        const step = new THREE.Mesh(
          new THREE.BoxGeometry(maxX - minX - 0.08, dy + 0.06, Math.abs(dz) + 0.08),
          stairWoodMat
        );
        step.position.set(cx, yStart + (s + 0.5) * dy, zStart + (s + 0.5) * dz);
        this.root.add(step);
      }

      // Sloped side stringer / handrail between the two stair lanes
      const runLen = Math.hypot(zEnd - zStart, FLOOR_H);
      const slopeAngle = Math.atan2(FLOOR_H, Math.abs(zEnd - zStart));
      const rail = new THREE.Mesh(new THREE.BoxGeometry(0.1, 0.08, runLen), stairRailMat);
      rail.position.set(9.5, yStart + FLOOR_H / 2 + 0.9, (zStart + zEnd) / 2);
      rail.rotation.x = even ? slopeAngle : -slopeAngle;
      this.root.add(rail);
    }

    // Ground-floor guardrail on West & North sides of Flight 0 so you enter Flight 0 cleanly from South!
    if (this.floors > 1) {
      addBox(0, 9.45, 0, 0.14, 1.0, 8.6, pal.trim, true);
      addBox(0, 10.5, STAIR_Z_NORTH - 0.1, 2.1, 1.0, 0.14, pal.trim, true);
    }

    // 4. Front EXIT Door on Ground Floor South Wall (x = 0, z = +HALF_D)
    const exitFrame = new THREE.Mesh(
      new THREE.BoxGeometry(2.3, 2.75, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x15803d, roughness: 0.5 })
    );
    exitFrame.position.set(0, 1.38, HALF_D - 0.08);
    this.root.add(exitFrame);

    const exitSignTex = makeCanvasSign('🚪 EXIT TO STREET', '#16a34a', '#ffffff', '#dcfce7', 440, 100);
    const exitSign = new THREE.Mesh(
      new THREE.PlaneGeometry(2.3, 0.55),
      new THREE.MeshStandardMaterial({ map: exitSignTex, roughness: 0.4 })
    );
    exitSign.position.set(0, 3.08, HALF_D - 0.12);
    exitSign.rotation.y = Math.PI;
    this.root.add(exitSign);

    const exitMatPad = new THREE.Mesh(
      new THREE.BoxGeometry(2.6, 0.04, 1.35),
      new THREE.MeshStandardMaterial({ color: 0x4ade80, roughness: 0.8 })
    );
    exitMatPad.position.set(0, 0.02, HALF_D - 0.9);
    this.root.add(exitMatPad);

    // 5. Furnish Ground Floor & All Upper Floors Based on Building Type!
    if (isHouse) {
      this._buildHouseInterior(building, pal, addBox, addObstacle, addCustomer, addChair, addBed);
    } else {
      this._buildPublicInterior(placeType, building, pal, addBox, addObstacle, addCustomer, addChair);
      // Spawn Friendly Shop Worker NPC on Ground Floor!
      const spec = getWorkerSpec(placeType, building.name, building.houseNumber, this.floors);
      const mesh = createWorkerNpcMesh(spec, building.id || 1, false);
      mesh.position.copy(this.workerPos);
      this.root.add(mesh);
      const res = {
        id: 'worker_0',
        ...spec,
        isParent: false,
        floor: 0,
        x: this.workerPos.x,
        z: this.workerPos.z,
        rotY: 0,
        seated: false,
        seed: building.id || 1,
        mesh,
        lastLineIndex: -1,
      };
      this.residents.push(res);
      this.worker = res;
      this.workerMesh = mesh;
    }

    // Spawn player well inside the spacious front Foyer facing North (-Z)
    return { x: 0, z: HALF_D - 3.6, headingDeg: 0, floorY: 0 };
  }

  _buildHouseInterior(building, pal, addBox, addObstacle, addCustomer, addChair, addBed) {
    const addrTitle =
      building.placeType === 'home'
        ? '🏡 Your House'
        : building.houseNumber
          ? `🏠 #${building.houseNumber} ${building.streetAddr || 'Westdale'}`
          : `🏠 ${building.streetAddr || 'Westdale'} Residence`;
    const sub = `${this.floors}-Story Home • Foyer, Living Room & Kitchen${this.floors > 1 ? ' + Upstairs Bedrooms!' : ''}`;

    // Foyer Welcome Plaque on Interior Wall
    const plaqueTex = makeCanvasSign([addrTitle, sub], '#0f172a', '#ffffff', '#facc15', 740, 160);
    const plaque = new THREE.Mesh(
      new THREE.PlaneGeometry(5.6, 1.2),
      new THREE.MeshStandardMaterial({ map: plaqueTex, roughness: 0.4 })
    );
    plaque.position.set(0, 2.65, -HALF_D + 0.09);
    this.root.add(plaque);

    // === GROUND FLOOR (f = 0): FOYER + LIVING ROOM + KITCHEN & DINING ===
    addBox(0, -7.8, 3.2, 8.2, 3.4, 0.22, 0xfef3c7, true);
    addBox(0, -3.2, -2.2, 0.22, 3.4, 6.4, 0xfef3c7, true);

    // 1) FOYER
    const foyerRug = new THREE.Mesh(
      new THREE.BoxGeometry(3.8, 0.03, 2.8),
      new THREE.MeshStandardMaterial({ color: 0xb91c1c, roughness: 0.9 })
    );
    foyerRug.position.set(0, 0.02, 7.6);
    this.root.add(foyerRug);
    addBox(0, 3.6, 9.8, 2.2, 0.52, 0.65, 0x78350f, true);
    addBox(0, -3.6, 9.8, 1.8, 0.88, 0.55, 0x92400e, true);
    this.root.add(createPottedPlant(5.6, 0, 9.6));
    this.root.add(createPottedPlant(-5.2, 0, 9.6));

    const addRoomBadge = (floor, text, x, z, rotY = 0) => {
      const t = makeCanvasSign(text, '#334155', '#fef08a', '#94a3b8', 380, 90);
      const m = new THREE.Mesh(new THREE.PlaneGeometry(2.0, 0.48), new THREE.MeshStandardMaterial({ map: t }));
      m.position.set(x, floor * FLOOR_H + 2.85, z);
      m.rotation.y = rotY;
      this.root.add(m);
    };
    addRoomBadge(0, '🛋️ LIVING ROOM', -7.8, 3.05, Math.PI);
    addRoomBadge(0, '🍳 KITCHEN & DINING', 2.2, -10.9, 0);

    // 2) LIVING ROOM (with sittable sofa seats & armchair!)
    const lrRug = new THREE.Mesh(
      new THREE.BoxGeometry(5.6, 0.03, 4.6),
      new THREE.MeshStandardMaterial({ color: 0x1e3a8a, roughness: 0.92 })
    );
    lrRug.position.set(-7.6, 0.02, -1.2);
    this.root.add(lrRug);

    addBox(0, -7.4, 1.1, 3.8, 0.52, 1.05, 0x0284c7, true);
    addBox(0, -7.4, 1.55, 3.8, 0.92, 0.24, 0x0369a1, false);
    addBox(0, -5.2, -0.8, 1.05, 0.52, 2.8, 0x0284c7, true);
    addBox(0, -7.6, -0.9, 1.8, 0.46, 1.0, 0x78350f, true); // Coffee table
    const lrArmchair = addChair(0, -9.2, -2.6, Math.PI * 0.25, 0x78350f, 0x0284c7, 'Living Room Armchair');

    // Big 75" Flat-Screen TV + Fireplace
    addBox(0, -11.2, -0.9, 0.85, 0.68, 3.4, 0x451a03, true);
    const tvScreen = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 1.35, 2.4),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0x1d4ed8, emissiveIntensity: 0.35, roughness: 0.2 })
    );
    tvScreen.position.set(-11.2, 1.48, -0.9);
    this.root.add(tvScreen);

    addBox(0, -7.6, -10.3, 2.6, 2.2, 0.9, 0x7f1d1d, true);
    const fireGlow = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.85, 0.96),
      new THREE.MeshBasicMaterial({ color: 0xf97316 })
    );
    fireGlow.position.set(-7.6, 0.55, -10.3);
    this.root.add(fireGlow);
    this.root.add(createPottedPlant(-10.8, 0, 2.2));

    // If 1-story bungalow, include a cozy ground-floor Bedroom Corner Bed so you can always lie down!
    if (this.floors === 1) {
      addBed(0, -9.8, 7.6, 1.8, 2.8, 0xf8fafc, 0x2563eb, 'Cozy Daybed');
    }

    // 3) KITCHEN & FAMILY DINING AREA
    addBox(0, 2.4, -10.1, 6.4, 0.95, 1.1, 0xe2e8f0, true);
    addBox(0, 2.4, -10.35, 6.2, 0.85, 0.55, 0x92400e, false, 1.95);
    addBox(0, -1.6, -10.0, 1.25, 2.15, 1.15, 0x94a3b8, true);
    const stove = addBox(0, 1.8, -10.05, 1.15, 0.98, 1.12, 0x1e293b, false);
    stove.position.y = 0.49;
    addBox(0, 4.2, -10.05, 1.1, 0.08, 0.7, 0x64748b, false, 0.94);

    // Center Kitchen Island + 3 Sittable Barstools
    addBox(0, 2.2, -6.8, 3.6, 0.96, 1.25, 0xfef3c7, true);
    const islandStools = [];
    for (const bx of [1.0, 2.2, 3.4]) {
      islandStools.push(addChair(0, bx, -5.75, Math.PI, 0x451a03, 0xd97706, 'Kitchen Barstool'));
    }

    // Family Dining Table + 4 Sittable Dining Chairs
    this.root.add(createDiningTableMesh(2.2, 0, -1.6, { width: 2.2, depth: 1.35, clothColor: 0x16a34a, mode: 'home' }));
    addObstacle(0, 2.2, -1.6, 2.6, 2.3);
    const diningChairs = [];
    for (const [cx, cz, rot] of [
      [1.6, -2.58, 0],
      [2.8, -2.58, 0],
      [1.6, -0.62, Math.PI],
      [2.8, -0.62, Math.PI],
    ]) {
      diningChairs.push(addChair(0, cx, cz, rot, 0x78350f, 0x15803d, 'Dining Chair'));
    }

    // === UPPER FLOORS (Bedrooms with Liable Beds, Study Chair & Loft!) ===
    const upstairsChairs = [];
    for (let f = 1; f < this.floors; f++) {
      addBox(f, -6.5, 0.5, 9.8, 3.2, 0.2, 0xfef3c7, true);

      if (f === 1) {
        addRoomBadge(f, '🛏️ MASTER BEDROOM', -6.8, -10.9, 0);
        addRoomBadge(f, '💻 STUDY & KIDS ROOM', -6.8, 10.9, Math.PI);

        // Master Bedroom Queen Bed (lie down with F!) + Nightstands + Wardrobe
        addBed(f, -7.8, -7.8, 2.6, 3.1, 0xf8fafc, 0x2563eb, 'Master Bed');
        addBox(f, -9.6, -8.9, 0.65, 0.62, 0.65, 0x92400e, true);
        addBox(f, -6.0, -8.9, 0.65, 0.62, 0.65, 0x92400e, true);
        addBox(f, -11.1, -3.8, 0.95, 2.3, 2.6, 0x78350f, true);

        // Kids Bedroom Twin Bed (lie down with F!) + Study Desk & Sittable Chair
        addBed(f, -9.6, 7.8, 1.75, 2.8, 0xfce7f3, 0xec4899, 'Your Bed');
        addBox(f, -4.5, 9.6, 2.2, 0.78, 1.0, 0x92400e, true);
        const mon = new THREE.Mesh(
          new THREE.BoxGeometry(0.75, 0.48, 0.08),
          new THREE.MeshStandardMaterial({ color: 0x0f172a, emissive: 0x38bdf8, emissiveIntensity: 0.35 })
        );
        mon.position.set(-4.5, f * FLOOR_H + 1.08, 9.8);
        this.root.add(mon);
        upstairsChairs.push(addChair(f, -4.5, 8.65, Math.PI, 0x451a03, 0x2563eb, 'Study Chair'));

        // Upstairs Reading Nook + Sittable Chair
        addBox(f, 2.2, -8.8, 3.2, 0.55, 1.1, 0x14b8a6, true);
        upstairsChairs.push(addChair(f, 4.6, -8.6, -Math.PI * 0.2, 0x78350f, 0x14b8a6, 'Reading Chair'));
        this.root.add(createPottedPlant(5.6, f * FLOOR_H, -9.4));
      } else {
        addRoomBadge(f, `🎮 FLOOR ${f + 1} LOFT & GAME ROOM`, -2.0, -10.9, 0);
        addBox(f, -6.5, -5.5, 2.8, 0.82, 1.65, 0x15803d, true);
        addBox(f, -6.8, 6.2, 3.6, 0.55, 1.15, 0x8b5cf6, true);
        addBed(f, 2.5, 7.8, 1.8, 2.8, 0xfef9c3, 0x8b5cf6, 'Loft Daybed');
        addChair(f, -2.5, -5.5, Math.PI * 0.5, 0x78350f, 0xf59e0b, 'Loft Chair');
        addBox(f, -11.2, 5.5, 0.8, 2.2, 3.8, 0x78350f, true);
        this.root.add(createPottedPlant(4.8, f * FLOOR_H, 7.5));
      }
    }

    // === RANDOMIZE LOCATIONS OF PEOPLE INSIDE THE HOUSE EVERY TIME! ===
    const candidateSpots = [
      { floor: 0, x: -1.4, z: 3.4, rotY: 0.25, seated: false },
      { floor: 0, x: 4.8, z: 5.2, rotY: -0.7, seated: false },
      { floor: 0, x: -8.6, z: -4.6, rotY: 0.9, seated: false },
      { floor: 0, x: 0.4, z: -8.4, rotY: 0.1, seated: false },
      { floor: 0, x: 5.5, z: -4.2, rotY: -1.3, seated: false },
      { floor: 0, chairRef: lrArmchair, x: lrArmchair.x, z: lrArmchair.z, rotY: lrArmchair.rotY, seated: true },
      { floor: 0, chairRef: diningChairs[0], x: diningChairs[0].x, z: diningChairs[0].z, rotY: diningChairs[0].rotY, seated: true },
      { floor: 0, chairRef: diningChairs[3], x: diningChairs[3].x, z: diningChairs[3].z, rotY: diningChairs[3].rotY, seated: true },
      { floor: 0, chairRef: islandStools[1], x: islandStools[1].x, z: islandStools[1].z, rotY: islandStools[1].rotY, seated: true },
      { floor: 1, x: 1.8, z: 2.2, rotY: -0.5, seated: false },
      { floor: 1, x: -3.2, z: -5.2, rotY: 1.4, seated: false },
      ...(upstairsChairs[0]
        ? [{ floor: 1, chairRef: upstairsChairs[0], x: upstairsChairs[0].x, z: upstairsChairs[0].z, rotY: upstairsChairs[0].rotY, seated: true }]
        : []),
      { floor: 2, x: -2.8, z: -1.8, rotY: 0.6, seated: false },
    ].filter((sp) => sp.floor < this.floors);

    // Fisher-Yates random shuffle using Math.random()!
    for (let i = candidateSpots.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [candidateSpots[i], candidateSpots[j]] = [candidateSpots[j], candidateSpots[i]];
    }

    const takeSpot = (preferGround = false) => {
      if (preferGround) {
        const gIdx = candidateSpots.findIndex((s) => s.floor === 0);
        if (gIdx !== -1) {
          const [picked] = candidateSpots.splice(gIdx, 1);
          if (picked.chairRef) picked.chairRef.occupied = true;
          return picked;
        }
      }
      const picked = candidateSpots.shift() || { floor: 0, x: 0, z: 2.5, rotY: 0, seated: false };
      if (picked.chairRef) picked.chairRef.occupied = true;
      return picked;
    };

    if (building.placeType === 'home') {
      // Spawn Mom AND Dad at random locations inside Your House!
      const parentSpecs = [
        {
          id: 'parent_mom',
          name: 'Mom',
          role: 'Parent • Your House',
          emoji: '👩',
          isParent: true,
          shirtColor: 0xec4899,
          pantsColor: 0x1e3a8a,
          skinColor: 0xffdbac,
          hairColor: 0x3b2f2f,
          seed: 11,
          lines: [
            'Thanks for letting me know you’re heading out, sweetheart! Have an awesome day at school!',
            'Stay on the sidewalks, obey the Walk signals, and look BOTH left and right before crossing!',
            'Watch out for any pesky raccoons on the way — see you after school! ❤️',
          ],
        },
        {
          id: 'parent_dad',
          name: 'Dad',
          role: 'Parent • Your House',
          emoji: '👨',
          isParent: true,
          shirtColor: 0x0284c7,
          pantsColor: 0x334155,
          skinColor: 0xf1c27d,
          hairColor: 0x27272a,
          seed: 22,
          lines: [
            'Glad you checked in before leaving! The front door is all yours — walk safely!',
            'Remember: green Walk signal on King Street, and check left & right at every side street!',
            'Proud of you, kiddo! Go earn all 3 Safety Stars!',
          ],
        },
      ];

      parentSpecs.forEach((pSpec, idx) => {
        // Place at least one parent on Floor 1 and let the other roam randomly across any floor!
        const spot = takeSpot(idx === 0 && Math.random() < 0.65);
        const mesh = createWorkerNpcMesh(pSpec, pSpec.seed, spot.seated);
        mesh.position.set(spot.x, spot.floor * FLOOR_H, spot.z);
        mesh.rotation.y = spot.rotY;
        this.root.add(mesh);
        const res = {
          ...pSpec,
          floor: spot.floor,
          x: spot.x,
          z: spot.z,
          rotY: spot.rotY,
          seated: spot.seated,
          mesh,
          lastLineIndex: -1,
        };
        this.residents.push(res);
      });
      this.worker = this.residents[0];
      this.workerMesh = this.residents[0].mesh;
    } else {
      // Other neighborhood houses: random spot for Homeowner + 1..2 extra family members!
      const ownerSpec = getWorkerSpec('house', building.name, building.houseNumber, this.floors);
      const ownerSpot = takeSpot(false);
      const ownerMesh = createWorkerNpcMesh(ownerSpec, building.id || 3, ownerSpot.seated);
      ownerMesh.position.set(ownerSpot.x, ownerSpot.floor * FLOOR_H, ownerSpot.z);
      ownerMesh.rotation.y = ownerSpot.rotY;
      this.root.add(ownerMesh);
      const ownerRes = {
        id: 'house_owner',
        ...ownerSpec,
        isParent: false,
        floor: ownerSpot.floor,
        x: ownerSpot.x,
        z: ownerSpot.z,
        rotY: ownerSpot.rotY,
        seated: ownerSpot.seated,
        seed: building.id || 3,
        mesh: ownerMesh,
        lastLineIndex: -1,
      };
      this.residents.push(ownerRes);
      this.worker = ownerRes;
      this.workerMesh = ownerMesh;

      const extraCount = 1 + Math.floor(Math.random() * 2);
      for (let k = 0; k < extraCount && candidateSpots.length > 0; k++) {
        const sp = takeSpot(false);
        addCustomer((building.id || 0) + k + 1, sp.floor, sp.x, sp.z, sp.rotY, {
          seated: sp.seated,
          activity: sp.seated ? 'dining' : 'walk',
        });
      }
    }
  }

  _buildPublicInterior(placeType, building, pal, addBox, addObstacle, addCustomer, addChair) {
    const titleText = building.name || 'Westdale Local Place';
    const subText = `${building.houseNumber ? `#${building.houseNumber} ` : ''}${building.streetAddr || ''} • ${this.floors}-Story Building`;
    const bannerTex = makeCanvasSign([titleText, subText], '#0f172a', '#ffffff', '#facc15', 740, 170);
    const banner = new THREE.Mesh(
      new THREE.PlaneGeometry(7.2, 1.55),
      new THREE.MeshStandardMaterial({ map: bannerTex, roughness: 0.4 })
    );
    banner.position.set(-1.5, 2.7, -HALF_D + 0.09);
    this.root.add(banner);

    this.root.add(createPottedPlant(-10.8, 0, 9.6));
    this.root.add(createPottedPlant(5.8, 0, 9.6));

    if (placeType === 'restaurant' || placeType === 'cafe') {
      const isCafe = placeType === 'cafe';
      // Wide Back Kitchen / Bakery Counter
      addBox(0, -1.5, -8.2, 9.6, 1.08, 1.2, 0x92400e, true);
      if (isCafe) {
        const glassCase = new THREE.Mesh(
          new THREE.BoxGeometry(3.4, 0.65, 0.85),
          new THREE.MeshStandardMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.45 })
        );
        glassCase.position.set(-3.2, 1.4, -8.2);
        this.root.add(glassCase);
      }

      // 6 Spacious Ground-Floor Dining Tables + Chairs + Diners Minding Their Own Business!
      const tableCoords = [
        [-8.0, -3.5], [-1.5, -3.5], [4.2, -3.5],
        [-8.0, 2.5], [-1.5, 2.5], [4.2, 2.5],
      ];
      let cIdx = (building.id || 0) % 5;
      for (const [tx, tz] of tableCoords) {
        this.root.add(
          createDiningTableMesh(tx, 0, tz, {
            width: isCafe ? 1.5 : 2.0,
            depth: 1.25,
            clothColor: isCafe ? 0xfde68a : 0xdc2626,
            mode: isCafe ? 'cafe' : 'restaurant',
          })
        );
        addObstacle(0, tx, tz, 2.3, 2.2);
        const seats = [
          [tx - 0.45, tz - 0.9, 0],
          [tx + 0.45, tz - 0.9, 0],
          [tx - 0.45, tz + 0.9, Math.PI],
          [tx + 0.45, tz + 0.9, Math.PI],
        ];
        seats.forEach(([sx, sz, rot], sIdx) => {
          const ch = addChair(0, sx, sz, rot, 0x78350f, isCafe ? 0xd97706 : 0xb91c1c, isCafe ? 'Café Chair' : 'Dining Chair');
          if (sIdx === 0 || (sIdx === 3 && (cIdx % 2 === 0))) {
            ch.occupied = true;
            addCustomer(cIdx++, 0, sx, sz, rot, { seated: true, activity: 'dining' });
          }
        });
      }
      this.workerPos.set(-1.5, 0, -9.5);

      // Upper Mezzanine Dining Floors!
      for (let f = 1; f < this.floors; f++) {
        for (const [tx, tz] of [[-7.8, -4.5], [-1.5, -4.5], [-7.8, 3.0], [-1.5, 3.0]]) {
          this.root.add(
            createDiningTableMesh(tx, f * FLOOR_H, tz, {
              width: 1.9,
              depth: 1.25,
              clothColor: isCafe ? 0xfde68a : 0xb91c1c,
              mode: isCafe ? 'cafe' : 'restaurant',
            })
          );
          addObstacle(f, tx, tz, 2.3, 2.2);
          const ch1 = addChair(f, tx - 0.45, tz - 0.9, 0, 0x78350f, 0xb91c1c, 'Dining Chair');
          addChair(f, tx + 0.45, tz + 0.9, Math.PI, 0x78350f, 0xb91c1c, 'Dining Chair');
          ch1.occupied = true;
          addCustomer(cIdx++, f, tx - 0.45, tz - 0.9, 0, { seated: true, activity: 'dining' });
        }
      }
    } else if (placeType === 'grocery') {
      const shelfColors = [0xef4444, 0x22c55e, 0xf59e0b, 0x3b82f6, 0xec4899, 0xa855f7];
      for (const sx of [-8.8, -3.8, 1.2]) {
        addBox(0, sx, -1.0, 1.3, 2.15, 9.5, 0x475569, true);
        for (let k = 0; k < 7; k++) {
          for (let row = 0; row < 3; row++) {
            addBox(0, sx, -5.0 + k * 1.3, 1.38, 0.32, 0.9, shelfColors[(k + row) % shelfColors.length], false, 0.4 + row * 0.58);
          }
        }
      }
      addBox(0, 5.0, 2.5, 2.4, 0.9, 3.2, 0x92400e, true); // Produce island
      addBox(0, -2.0, -8.6, 7.5, 1.05, 1.15, 0x15803d, true); // Checkout counter
      addCustomer(1, 0, -6.3, -2.2, Math.PI / 2, { seated: false, activity: 'shopping' });
      addCustomer(2, 0, -1.3, 1.4, -Math.PI / 2, { seated: false, activity: 'shopping' });
      addCustomer(3, 0, 3.6, -0.5, 0, { seated: false, activity: 'shopping' });
      this.workerPos.set(-2.0, 0, -9.8);

      for (let f = 1; f < this.floors; f++) {
        addBox(f, -6.5, -2.0, 1.4, 2.1, 8.0, 0x475569, true);
        addBox(f, -1.5, -2.0, 1.4, 2.1, 8.0, 0x475569, true);
      }
    } else if (placeType === 'library' || placeType === 'school') {
      for (let f = 0; f < this.floors; f++) {
        for (const sx of [-10.2, -5.8]) {
          addBox(f, sx, -2.0, 1.2, 2.5, 10.0, 0x78350f, true);
          for (let row = 0; row < 4; row++) {
            addBox(f, sx, -2.0, 1.28, 0.34, 9.4, [0xef4444, 0x3b82f6, 0x22c55e, 0xf59e0b][row], false, 0.4 + row * 0.55);
          }
        }
        for (const [tx, tz] of [[0.5, -2.5], [0.5, 3.5]]) {
          this.root.add(createDiningTableMesh(tx, f * FLOOR_H, tz, { width: 2.4, depth: 1.3, clothColor: null, mode: 'library' }));
          addObstacle(f, tx, tz, 2.7, 2.2);
          const chRead = addChair(f, tx - 0.5, tz - 0.9, 0, 0x78350f, 0x0369a1, 'Reading Chair');
          addChair(f, tx + 0.5, tz + 0.9, Math.PI, 0x78350f, 0x0369a1, 'Reading Chair');
          chRead.occupied = true;
          addCustomer(f * 2 + 1, f, tx - 0.5, tz - 0.9, 0, { seated: true, activity: 'reading' });
        }
      }
      addBox(0, 1.5, -8.5, 6.0, 1.05, 1.15, 0x0369a1, true);
      this.workerPos.set(1.5, 0, -9.8);
    } else {
      // Spacious Shop / Pharmacy / Bank / Church
      addBox(0, -1.5, -8.2, 8.2, 1.08, 1.15, pal.trim, true);
      for (let f = 0; f < this.floors; f++) {
        for (const [dx, dz] of [[-7.5, -2.5], [-7.5, 3.2], [-1.2, 1.5]]) {
          addBox(f, dx, dz, 2.4, 1.05, 3.4, pal.accent, true);
        }
        addCustomer(f + 1, f, -4.5, -1.5, Math.PI / 3, { seated: false, activity: 'shopping' });
      }
      this.workerPos.set(-1.5, 0, -9.6);
    }
  }

  /**
   * Resolves wall/furniture collisions on the player's current floor AND smoothly updates
   * `floorY` when walking up or down any 3D staircase! Returns the updated `floorY`.
   */
  resolveCollisions(pos, currentFloorY = 0) {
    const r = 0.52;
    pos.x = Math.max(-HALF_W + r, Math.min(HALF_W - r, pos.x));
    pos.z = Math.max(-HALF_D + r, Math.min(HALF_D - r, pos.z));

    let nextFloorY = currentFloorY;
    let onStair = false;

    // 1. Check if player is on any staircase flight (smooth continuous elevation!)
    for (const st of this.stairs) {
      const yBottom = st.fromFloor * FLOOR_H;
      const yTop = st.toFloor * FLOOR_H;
      if (currentFloorY < yBottom - 0.9 || currentFloorY > yTop + 0.9) continue;

      const minZ = Math.min(st.zStart, st.zEnd);
      const maxZ = Math.max(st.zStart, st.zEnd);
      if (pos.x >= st.minX - 0.15 && pos.x <= st.maxX + 0.15 && pos.z >= minZ - 0.65 && pos.z <= maxZ + 0.65) {
        const t = Math.max(0, Math.min(1, (pos.z - st.zStart) / (st.zEnd - st.zStart)));
        const targetY = yBottom + t * FLOOR_H;
        // Engage stair ramp when close to its height at this z
        if (Math.abs(currentFloorY - targetY) <= 1.25) {
          nextFloorY = targetY;
          onStair = true;
          break;
        }
      }
    }

    // Snap cleanly onto discrete floor slab when off the stairs
    if (!onStair) {
      const nearestFloorIdx = Math.max(0, Math.min(this.floors - 1, Math.round(nextFloorY / FLOOR_H)));
      nextFloorY = nearestFloorIdx * FLOOR_H;
    }

    const activeFloor = Math.max(0, Math.min(this.floors - 1, Math.round(nextFloorY / FLOOR_H)));

    // 2. Push out of solid furniture & guardrails on the active floor
    for (const box of this.obstacles) {
      if (box.floor !== activeFloor) continue;
      // Don't block top/bottom stair transitions while actively mid-stair
      if (onStair && Math.abs(nextFloorY - activeFloor * FLOOR_H) > 0.45) continue;

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

    return nextFloorY;
  }

  getCurrentFloorNumber(floorY = 0) {
    return Math.max(1, Math.min(this.floors, Math.round(floorY / FLOOR_H) + 1));
  }

  refreshCharacterMeshes() {
    if (!this.root) return;
    for (const r of this.residents) {
      if (r.mesh) this.root.remove(r.mesh);
      r.mesh = createWorkerNpcMesh(r, r.seed || 1, r.seated);
      r.mesh.position.set(r.x, r.floor * FLOOR_H, r.z);
      r.mesh.rotation.y = r.rotY || 0;
      this.root.add(r.mesh);
    }
    if (this.residents.length > 0) {
      this.worker = this.residents[0];
      this.workerMesh = this.residents[0].mesh;
    }
    for (const c of this.customers) {
      if (c.mesh) this.root.remove(c.mesh);
      c.mesh = createCustomerNpcMesh(c.idx, c.opts);
      c.mesh.position.set(c.x, c.floor * FLOOR_H, c.z);
      c.mesh.rotation.y = c.rotY || 0;
      this.root.add(c.mesh);
    }
  }

  update(playerPos, dt = 0.016, activeTalkResidentId = null) {
    this.animTime += dt;
    for (const r of this.residents) {
      if (!r.mesh) continue;
      if (r.mesh.userData?.isRealisticGlb) {
        r.mesh.userData.setAnimState(r.seated ? 'sit' : 'idle');
        r.mesh.userData.updateAnim(dt);
      }
      if (activeTalkResidentId === r.id && playerPos && !r.seated) {
        r.mesh.rotation.y = Math.atan2(playerPos.x - r.x, playerPos.z - r.z);
      } else {
        r.mesh.rotation.y = r.rotY || 0;
      }
    }

    for (const c of this.customers) {
      if (c.mesh?.userData?.isRealisticGlb) {
        c.mesh.userData.updateAnim(dt);
      }
    }
  }

  getNearbyResident(playerPos, floorY = 0) {
    if (!playerPos) return null;
    let best = null;
    let bestDist = Infinity;
    for (const r of this.residents) {
      if (Math.abs(floorY - r.floor * FLOOR_H) > 1.3) continue;
      const d = dist2D(playerPos.x, playerPos.z, r.x, r.z);
      if (d <= 4.8 && d < bestDist) {
        bestDist = d;
        best = r;
      }
    }
    return best;
  }

  getNearbyInteractable(playerPos, floorY = 0) {
    if (!playerPos) return null;
    let best = null;
    let bestDist = Infinity;
    for (const item of this.interactables) {
      if (item.occupied) continue;
      if (Math.abs(floorY - item.yBase) > 1.2) continue;
      const maxD = item.kind === 'bed' ? 2.45 : 1.75;
      const d = dist2D(playerPos.x, playerPos.z, item.x, item.z);
      if (d <= maxD && d < bestDist) {
        bestDist = d;
        best = item;
      }
    }
    return best;
  }

  isNearWorker(playerPos, floorY = 0) {
    return Boolean(this.getNearbyResident(playerPos, floorY));
  }

  isAtExitDoor(playerPos, floorY = 0) {
    if (!playerPos || floorY > 0.6) return false;
    return Math.abs(playerPos.x) <= 1.6 && playerPos.z >= HALF_D - 1.0;
  }

  getRandomResidentLine(res) {
    const target = res || this.worker;
    if (!target) return 'Welcome!';
    const lines = target.lines;
    let idx = Math.floor(Math.random() * lines.length);
    if (idx === target.lastLineIndex && lines.length > 1) {
      idx = (idx + 1) % lines.length;
    }
    target.lastLineIndex = idx;
    return lines[idx];
  }

  getRandomWorkerLine() {
    return this.getRandomResidentLine(this.worker);
  }
}
