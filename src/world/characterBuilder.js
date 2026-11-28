/**
 * Stylized-Realistic 3D Character Builder (Street Fighter-inspired proportions):
 * - Sculpted V-taper torso, rounded shoulders, neck, jawline, detailed eyes/brows/nose/mouth
 * - Multi-joint articulated limbs: shoulders + elbows + forearms + hands, hips + knees + calves + sneakers
 * - Rich hairstyles & headgear (spiky, headband, cap, short, long, pigtails, curly, chef, helmet)
 * - Smooth multi-joint walking, idle breathing stance, seated dining, and combat swing animations
 */

import * as THREE from 'three';

export function createStylizedHumanMesh(opts = {}) {
  const {
    scale = 1.0,
    skinColor = 0xf1c27d,
    hairColor = 0x27272a,
    hairStyle = 'short', // 'short' | 'spiky' | 'headband' | 'cap' | 'long' | 'pigtails' | 'curly' | 'chef' | 'helmet'
    topColor = 0xef4444,
    pantsColor = 0x1e3a8a,
    shoeColor = 0xf8fafc,
    accentColor = 0xfacc15,
    outfitStyle = 'tshirt', // 'tshirt' | 'hoodie' | 'jacket' | 'vest'
    backpackColor = null,
    headbandColor = 0xdc2626,
    wristWraps = false,
    seated = false,
    activity = 'walk',
  } = opts;

  const g = new THREE.Group();

  const skinMat = new THREE.MeshStandardMaterial({ color: skinColor, roughness: 0.52, metalness: 0.04 });
  const hairMat = new THREE.MeshStandardMaterial({ color: hairColor, roughness: 0.72 });
  const topMat = new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.62 });
  const pantsMat = new THREE.MeshStandardMaterial({ color: pantsColor, roughness: 0.76 });
  const shoeMat = new THREE.MeshStandardMaterial({ color: shoeColor, roughness: 0.55 });
  const soleMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.7 });
  const beltMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
  const buckleMat = new THREE.MeshStandardMaterial({ color: accentColor, metalness: 0.65, roughness: 0.3 });
  const darkMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35 });
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.25 });
  const irisMat = new THREE.MeshStandardMaterial({ color: 0x1e40af, roughness: 0.3 });
  const mouthMat = new THREE.MeshStandardMaterial({ color: 0x9f1239, roughness: 0.6 });

  // Root body group for idle breathing & walk bobbing
  const bodyRoot = new THREE.Group();
  g.add(bodyRoot);

  // === PELVIS & BELT ===
  const pelvis = new THREE.Mesh(new THREE.SphereGeometry(0.165, 12, 10), pantsMat);
  pelvis.scale.set(1.22, 0.72, 0.85);
  pelvis.position.y = 0.84;
  pelvis.castShadow = true;
  bodyRoot.add(pelvis);

  const belt = new THREE.Mesh(new THREE.CylinderGeometry(0.195, 0.195, 0.065, 14), beltMat);
  belt.scale.set(1.06, 1.0, 0.76);
  belt.position.y = 0.91;
  const buckle = new THREE.Mesh(new THREE.BoxGeometry(0.085, 0.065, 0.04), buckleMat);
  buckle.position.set(0, 0.91, 0.155);
  bodyRoot.add(belt, buckle);

  // === ARTICULATED LEGS (Hip -> Thigh -> Knee -> Calf -> Detailed Sneaker) ===
  const buildLeg = (side) => {
    const hipPivot = new THREE.Group();
    hipPivot.position.set(side * 0.125, 0.83, 0);

    // Sculpted athletic thigh
    const thigh = new THREE.Mesh(new THREE.CapsuleGeometry(0.084, 0.23, 6, 10), pantsMat);
    thigh.position.y = -0.19;
    thigh.castShadow = true;
    hipPivot.add(thigh);

    // Knee joint pivot
    const kneePivot = new THREE.Group();
    kneePivot.position.set(0, -0.39, 0);
    hipPivot.add(kneePivot);

    // Calf / shin
    const calf = new THREE.Mesh(new THREE.CapsuleGeometry(0.068, 0.24, 6, 10), pantsMat);
    calf.position.y = -0.18;
    calf.castShadow = true;
    kneePivot.add(calf);

    // Detailed 3D Sneaker (rubber sole + upper + toe cap + stripe)
    const shoeGroup = new THREE.Group();
    shoeGroup.position.set(0, -0.39, 0.04);
    const sole = new THREE.Mesh(new THREE.BoxGeometry(0.135, 0.045, 0.27), soleMat);
    sole.position.y = -0.025;
    const upper = new THREE.Mesh(new THREE.BoxGeometry(0.128, 0.085, 0.23), shoeMat);
    upper.position.set(0, 0.03, -0.01);
    const toeCap = new THREE.Mesh(new THREE.SphereGeometry(0.066, 8, 8), shoeMat);
    toeCap.scale.set(0.95, 0.65, 1.1);
    toeCap.position.set(0, 0.02, 0.1);
    shoeGroup.add(sole, upper, toeCap);
    kneePivot.add(shoeGroup);

    return { hipPivot, kneePivot };
  };

  const leftLeg = buildLeg(-1);
  const rightLeg = buildLeg(1);
  bodyRoot.add(leftLeg.hipPivot, rightLeg.hipPivot);

  // === SCULPTED UPPER BODY (V-taper athletic chest & abs) ===
  const torsoGroup = new THREE.Group();
  torsoGroup.position.y = 0.93;
  bodyRoot.add(torsoGroup);

  // Tapered waist / core
  const waist = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.165, 0.22, 14), topMat);
  waist.scale.set(1.08, 1.0, 0.74);
  waist.position.y = 0.1;
  waist.castShadow = true;
  torsoGroup.add(waist);

  // Broad athletic chest
  const chest = new THREE.Mesh(new THREE.CylinderGeometry(0.245, 0.185, 0.34, 14), topMat);
  chest.scale.set(1.14, 1.0, 0.76);
  chest.position.y = 0.36;
  chest.castShadow = true;
  torsoGroup.add(chest);

  // Sculpted pectoral contour
  for (const sx of [-0.095, 0.095]) {
    const pec = new THREE.Mesh(new THREE.SphereGeometry(0.105, 10, 8), topMat);
    pec.scale.set(1.1, 0.85, 0.58);
    pec.position.set(sx, 0.38, 0.14);
    torsoGroup.add(pec);
  }

  // Outfit details (jacket lapels, hoodie hood, crossing-guard reflective vest, or athletic collar)
  if (outfitStyle === 'jacket') {
    const innerShirt = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.5, 0.26), whiteMat);
    innerShirt.position.set(0, 0.28, 0.05);
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.11, 0.03, 6, 12), topMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.53, 0);
    torsoGroup.add(innerShirt, collar);
  } else if (outfitStyle === 'hoodie') {
    const hood = new THREE.Mesh(new THREE.SphereGeometry(0.16, 10, 8), topMat);
    hood.scale.set(1.15, 0.6, 0.9);
    hood.position.set(0, 0.52, -0.12);
    const pocket = new THREE.Mesh(new THREE.BoxGeometry(0.26, 0.14, 0.04), topMat);
    pocket.position.set(0, 0.14, 0.145);
    torsoGroup.add(hood, pocket);
  } else if (outfitStyle === 'vest') {
    const stripeMat = new THREE.MeshStandardMaterial({
      color: 0xfef08a,
      emissive: 0xeab308,
      emissiveIntensity: 0.25,
    });
    for (const sx of [-0.11, 0.11]) {
      const vStripe = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.48, 0.32), stripeMat);
      vStripe.position.set(sx, 0.28, 0.01);
      torsoGroup.add(vStripe);
    }
    const hStripe = new THREE.Mesh(new THREE.BoxGeometry(0.46, 0.06, 0.33), stripeMat);
    hStripe.position.set(0, 0.15, 0.01);
    torsoGroup.add(hStripe);
  } else {
    // Crewneck / sporty collar trim
    const collar = new THREE.Mesh(new THREE.TorusGeometry(0.105, 0.022, 6, 12), whiteMat);
    collar.rotation.x = Math.PI / 2;
    collar.position.set(0, 0.52, 0.01);
    torsoGroup.add(collar);
  }

  // Optional Backpack (for player avatar / classmates)
  if (backpackColor) {
    const packMat = new THREE.MeshStandardMaterial({ color: backpackColor, roughness: 0.6 });
    const pack = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.15), packMat);
    pack.position.set(0, 0.3, -0.22);
    pack.castShadow = true;
    const packPocket = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.16, 0.06), packMat);
    packPocket.position.set(0, 0.2, -0.3);
    torsoGroup.add(pack, packPocket);
  }

  // === ARTICULATED ARMS (Deltoid -> Upper Arm -> Elbow -> Forearm -> Wrist -> Sculpted Fist) ===
  const shortSleeve = outfitStyle === 'tshirt' || outfitStyle === 'vest';
  const buildArm = (side) => {
    const shoulderPivot = new THREE.Group();
    shoulderPivot.position.set(side * 0.295, 0.47, 0);

    // Rounded deltoid shoulder cap
    const deltoid = new THREE.Mesh(new THREE.SphereGeometry(0.088, 10, 8), topMat);
    deltoid.scale.set(1.05, 1.0, 0.95);
    shoulderPivot.add(deltoid);

    // Upper arm (sleeve or muscular bicep)
    const upperArmMat = shortSleeve ? skinMat : topMat;
    if (shortSleeve) {
      const sleeve = new THREE.Mesh(new THREE.CylinderGeometry(0.078, 0.074, 0.13, 10), topMat);
      sleeve.position.y = -0.05;
      shoulderPivot.add(sleeve);
    }
    const upperArm = new THREE.Mesh(new THREE.CapsuleGeometry(0.062, 0.16, 6, 10), upperArmMat);
    upperArm.position.y = -0.15;
    upperArm.castShadow = true;
    shoulderPivot.add(upperArm);

    // Elbow pivot
    const elbowPivot = new THREE.Group();
    elbowPivot.position.set(0, -0.28, 0);
    elbowPivot.rotation.x = -0.22; // Natural athletic elbow curve!
    shoulderPivot.add(elbowPivot);

    const forearmMat = shortSleeve ? skinMat : topMat;
    const forearm = new THREE.Mesh(new THREE.CapsuleGeometry(0.052, 0.16, 6, 10), forearmMat);
    forearm.position.y = -0.12;
    forearm.castShadow = true;
    elbowPivot.add(forearm);

    if (wristWraps) {
      const wrap = new THREE.Mesh(
        new THREE.CylinderGeometry(0.058, 0.055, 0.075, 10),
        new THREE.MeshStandardMaterial({ color: headbandColor, roughness: 0.7 })
      );
      wrap.position.y = -0.21;
      elbowPivot.add(wrap);
    }

    // Sculpted fist / hand
    const hand = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.095, 0.085), skinMat);
    hand.position.y = -0.27;
    const thumb = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.055, 0.04), skinMat);
    thumb.position.set(-side * 0.045, -0.26, 0.03);
    elbowPivot.add(hand, thumb);

    return { shoulderPivot, elbowPivot };
  };

  const leftArm = buildArm(-1);
  const rightArm = buildArm(1);
  torsoGroup.add(leftArm.shoulderPivot, rightArm.shoulderPivot);

  // === NECK & SCULPTED HEAD (Street-Fighter stylized realism) ===
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.068, 0.082, 0.13, 12), skinMat);
  neck.position.y = 0.56;
  torsoGroup.add(neck);

  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.72, 0.01);
  torsoGroup.add(headGroup);

  // Cranium + tapered jawline/chin
  const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.155, 16, 14), skinMat);
  cranium.scale.set(0.96, 1.06, 1.0);
  cranium.position.y = 0.03;
  cranium.castShadow = true;
  headGroup.add(cranium);

  const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.118, 0.078, 0.11, 12), skinMat);
  jaw.scale.set(1.0, 1.0, 0.96);
  jaw.position.set(0, -0.065, 0.02);
  headGroup.add(jaw);

  // Ears
  for (const sx of [-0.15, 0.15]) {
    const ear = new THREE.Mesh(new THREE.SphereGeometry(0.036, 8, 8), skinMat);
    ear.scale.set(0.55, 1.15, 0.8);
    ear.position.set(sx, 0.01, -0.01);
    headGroup.add(ear);
  }

  // Expressive Eyes (sclera + iris + pupil + glint + sculpted eyebrows)
  for (const sx of [-0.056, 0.056]) {
    const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.028, 10, 8), whiteMat);
    sclera.scale.set(1.15, 0.82, 0.65);
    sclera.position.set(sx, 0.035, 0.135);
    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.017, 8, 8), irisMat);
    iris.position.set(sx, 0.035, 0.148);
    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.01, 8, 8), darkMat);
    pupil.position.set(sx, 0.035, 0.158);
    const glint = new THREE.Mesh(new THREE.SphereGeometry(0.005, 6, 6), whiteMat);
    glint.position.set(sx + 0.006, 0.042, 0.165);
    const brow = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.015, 0.02), hairMat);
    brow.position.set(sx, 0.072, 0.142);
    brow.rotation.z = sx < 0 ? -0.1 : 0.1; // Confident heroic brow angle!
    headGroup.add(sclera, iris, pupil, glint, brow);
  }

  // Sculpted Nose bridge
  const nose = new THREE.Mesh(new THREE.ConeGeometry(0.022, 0.065, 5), skinMat);
  nose.rotation.x = Math.PI * 0.25;
  nose.position.set(0, 0.0, 0.155);
  headGroup.add(nose);

  // Confident Smile / Mouth
  const mouth = new THREE.Mesh(
    new THREE.TorusGeometry(0.036, 0.009, 6, 12, Math.PI * 0.8),
    mouthMat
  );
  mouth.position.set(0, -0.042, 0.136);
  mouth.rotation.z = Math.PI * 1.1;
  headGroup.add(mouth);

  // === HAIRSTYLES & HEADGEAR ===
  const hairCap = new THREE.Mesh(
    new THREE.SphereGeometry(0.162, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56),
    hairMat
  );
  hairCap.scale.set(0.98, 1.05, 1.02);
  hairCap.position.y = 0.04;

  if (hairStyle === 'spiky' || hairStyle === 'headband') {
    headGroup.add(hairCap);
    // Iconic 3D swept-back martial-arts hair spikes!
    const spikeGeom = new THREE.ConeGeometry(0.052, 0.16, 6);
    const spikeConfigs = [
      [0, 0.18, 0.04, -0.35, 0],
      [-0.08, 0.16, 0.02, -0.3, 0.35],
      [0.08, 0.16, 0.02, -0.3, -0.35],
      [-0.12, 0.12, -0.06, -0.6, 0.55],
      [0.12, 0.12, -0.06, -0.6, -0.55],
      [0, 0.14, -0.11, -0.85, 0],
    ];
    for (const [sx, sy, sz, rx, rz] of spikeConfigs) {
      const sp = new THREE.Mesh(spikeGeom, hairMat);
      sp.position.set(sx, sy, sz);
      sp.rotation.set(rx, 0, rz);
      headGroup.add(sp);
    }
    if (hairStyle === 'headband') {
      const bandMat = new THREE.MeshStandardMaterial({ color: headbandColor, roughness: 0.65 });
      const band = new THREE.Mesh(new THREE.TorusGeometry(0.156, 0.022, 6, 18), bandMat);
      band.rotation.x = Math.PI / 2;
      band.position.set(0, 0.1, 0.005);
      // Trailing headband ribbons in back!
      const tailL = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.22, 0.012), bandMat);
      tailL.position.set(-0.04, 0.01, -0.18);
      tailL.rotation.set(0.35, 0, 0.18);
      const tailR = new THREE.Mesh(new THREE.BoxGeometry(0.032, 0.2, 0.012), bandMat);
      tailR.position.set(0.04, 0.02, -0.18);
      tailR.rotation.set(0.45, 0, -0.2);
      headGroup.add(band, tailL, tailR);
    }
  } else if (hairStyle === 'cap') {
    const capMat = new THREE.MeshStandardMaterial({ color: topColor, roughness: 0.68 });
    headGroup.add(hairCap);
    const dome = new THREE.Mesh(
      new THREE.SphereGeometry(0.168, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.48),
      capMat
    );
    dome.position.y = 0.055;
    const brim = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.028, 0.18), capMat);
    brim.position.set(0, 0.085, 0.15);
    brim.rotation.x = 0.08;
    headGroup.add(dome, brim);
  } else if (hairStyle === 'long') {
    headGroup.add(hairCap);
    const backHair = new THREE.Mesh(new THREE.BoxGeometry(0.32, 0.38, 0.12), hairMat);
    backHair.position.set(0, -0.09, -0.12);
    const sideL = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.3, 0.12), hairMat);
    sideL.position.set(-0.15, -0.06, -0.02);
    const sideR = new THREE.Mesh(new THREE.BoxGeometry(0.07, 0.3, 0.12), hairMat);
    sideR.position.set(0.15, -0.06, -0.02);
    headGroup.add(backHair, sideL, sideR);
  } else if (hairStyle === 'pigtails') {
    headGroup.add(hairCap);
    const tieMat = new THREE.MeshStandardMaterial({ color: accentColor, roughness: 0.5 });
    for (const sx of [-0.19, 0.19]) {
      const bun = new THREE.Mesh(new THREE.SphereGeometry(0.095, 10, 8), hairMat);
      bun.position.set(sx, 0.09, -0.04);
      const tie = new THREE.Mesh(new THREE.TorusGeometry(0.04, 0.014, 6, 10), tieMat);
      tie.position.set(sx * 0.84, 0.09, -0.03);
      tie.rotation.y = Math.PI / 2;
      headGroup.add(bun, tie);
    }
  } else if (hairStyle === 'curly') {
    const curls = [
      [0, 0.17, 0], [-0.1, 0.14, 0.04], [0.1, 0.14, 0.04],
      [-0.14, 0.07, -0.04], [0.14, 0.07, -0.04], [0, 0.12, -0.12],
      [-0.1, 0.07, -0.12], [0.1, 0.07, -0.12], [0, 0.16, 0.08],
    ];
    const curlGeom = new THREE.SphereGeometry(0.078, 8, 8);
    for (const [cx, cy, cz] of curls) {
      const c = new THREE.Mesh(curlGeom, hairMat);
      c.position.set(cx, cy, cz);
      headGroup.add(c);
    }
  } else if (hairStyle === 'chef') {
    headGroup.add(hairCap);
    const hatBase = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.145, 0.12, 12), whiteMat);
    hatBase.position.y = 0.18;
    const hatPuff = new THREE.Mesh(new THREE.SphereGeometry(0.175, 12, 10), whiteMat);
    hatPuff.scale.set(1.05, 0.78, 1.05);
    hatPuff.position.y = 0.27;
    headGroup.add(hatBase, hatPuff);
  } else if (hairStyle === 'helmet') {
    const helmetMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.35, metalness: 0.25 });
    const shell = new THREE.Mesh(
      new THREE.SphereGeometry(0.175, 14, 10, 0, Math.PI * 2, 0, Math.PI * 0.56),
      helmetMat
    );
    shell.position.y = 0.05;
    const visor = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.03, 0.14), helmetMat);
    visor.position.set(0, 0.085, 0.14);
    headGroup.add(shell, visor);
  } else {
    // 'short' sculpted hair with sideburns & swept bangs
    headGroup.add(hairCap);
    const bangs = new THREE.Mesh(new THREE.BoxGeometry(0.24, 0.055, 0.08), hairMat);
    bangs.position.set(0, 0.125, 0.115);
    bangs.rotation.x = 0.15;
    headGroup.add(bangs);
  }

  // Apply seated pose cleanly if seated on a chair!
  if (seated) {
    bodyRoot.position.y = -0.32;
    leftLeg.hipPivot.rotation.x = -1.48;
    rightLeg.hipPivot.rotation.x = -1.48;
    leftLeg.kneePivot.rotation.x = 1.48;
    rightLeg.kneePivot.rotation.x = 1.48;
    leftArm.shoulderPivot.rotation.x = -0.55;
    rightArm.shoulderPivot.rotation.x = -0.6;
    leftArm.elbowPivot.rotation.x = -0.7;
    rightArm.elbowPivot.rotation.x = -0.75;
  }

  // Optional shopping basket held in right hand
  if (!seated && activity === 'shopping') {
    const basket = new THREE.Mesh(
      new THREE.BoxGeometry(0.24, 0.18, 0.2),
      new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.7 })
    );
    basket.position.set(0, -0.34, 0.06);
    rightArm.elbowPivot.add(basket);
    rightArm.shoulderPivot.rotation.x = -0.35;
    rightArm.elbowPivot.rotation.x = -0.4;
  }

  g.scale.setScalar(scale);

  // Expose unified pivot handles compatible with existing animation loops!
  g.userData = {
    bodyRoot,
    torsoGroup,
    headGroup,
    headPivot: headGroup,
    leftLegPivot: leftLeg.hipPivot,
    rightLegPivot: rightLeg.hipPivot,
    leftKneePivot: leftLeg.kneePivot,
    rightKneePivot: rightLeg.kneePivot,
    leftArmPivot: leftArm.shoulderPivot,
    rightArmPivot: rightArm.shoulderPivot,
    leftElbowPivot: leftArm.elbowPivot,
    rightElbowPivot: rightArm.elbowPivot,
    // Legacy aliases for any code reading leftLeg/rightLeg/leftArm/rightArm
    leftLeg: leftLeg.hipPivot,
    rightLeg: rightLeg.hipPivot,
    leftArm: leftArm.shoulderPivot,
    rightArm: rightArm.shoulderPivot,
    seated,
    activity,
  };
  return g;
}

/**
 * Multi-joint athletic walk & idle breathing stance animation (Street Fighter-style energy!).
 */
export function animateHumanWalk(mesh, walkPhase, isMoving, idleTime = 0, options = {}) {
  const u = mesh?.userData;
  if (!u || !u.leftLegPivot) return;

  if (options.posture === 'sit') {
    if (u.bodyRoot) {
      u.bodyRoot.rotation.x = 0;
      u.bodyRoot.position.set(0, -0.32, 0);
    }
    u.leftLegPivot.rotation.x = -1.48;
    u.rightLegPivot.rotation.x = -1.48;
    if (u.leftKneePivot) u.leftKneePivot.rotation.x = 1.48;
    if (u.rightKneePivot) u.rightKneePivot.rotation.x = 1.48;
    u.leftArmPivot.rotation.x = -0.55;
    u.rightArmPivot.rotation.x = -0.55;
    return;
  }

  if (options.posture === 'lie') {
    if (u.bodyRoot) {
      u.bodyRoot.rotation.x = -Math.PI / 2;
      u.bodyRoot.position.set(0, 0.14, 0.78);
    }
    u.leftLegPivot.rotation.x = 0;
    u.rightLegPivot.rotation.x = 0;
    if (u.leftKneePivot) u.leftKneePivot.rotation.x = 0;
    if (u.rightKneePivot) u.rightKneePivot.rotation.x = 0;
    u.leftArmPivot.rotation.x = 0;
    u.rightArmPivot.rotation.x = 0;
    return;
  }

  if (u.bodyRoot) {
    u.bodyRoot.rotation.x = 0;
    u.bodyRoot.position.z = 0;
  }

  if (isMoving) {
    const s = Math.sin(walkPhase);
    const c = Math.cos(walkPhase);
    u.leftLegPivot.rotation.x = s * 0.58;
    u.rightLegPivot.rotation.x = -s * 0.58;
    // Natural knee bend when each leg swings forward/up!
    if (u.leftKneePivot) u.leftKneePivot.rotation.x = Math.max(0, -c) * 0.62 + 0.08;
    if (u.rightKneePivot) u.rightKneePivot.rotation.x = Math.max(0, c) * 0.62 + 0.08;

    u.leftArmPivot.rotation.x = -s * 0.52;
    if (!options.overrideRightArm) {
      u.rightArmPivot.rotation.x = s * 0.52;
    }
    if (u.leftElbowPivot) u.leftElbowPivot.rotation.x = -0.28 - Math.max(0, -s) * 0.35;
    if (u.rightElbowPivot && !options.overrideRightArm) {
      u.rightElbowPivot.rotation.x = -0.28 - Math.max(0, s) * 0.35;
    }
    if (u.bodyRoot) u.bodyRoot.position.y = Math.abs(c) * 0.045;
    if (u.torsoGroup) u.torsoGroup.rotation.y = s * 0.08;
  } else {
    // Subtle athletic idle breathing stance
    const breath = Math.sin(idleTime * 2.6);
    u.leftLegPivot.rotation.x = 0.04;
    u.rightLegPivot.rotation.x = -0.04;
    if (u.leftKneePivot) u.leftKneePivot.rotation.x = 0.06;
    if (u.rightKneePivot) u.rightKneePivot.rotation.x = 0.06;
    u.leftArmPivot.rotation.x = -0.08 + breath * 0.03;
    if (!options.overrideRightArm) {
      u.rightArmPivot.rotation.x = -0.08 - breath * 0.03;
    }
    if (u.leftElbowPivot) u.leftElbowPivot.rotation.x = -0.26;
    if (u.rightElbowPivot && !options.overrideRightArm) {
      u.rightElbowPivot.rotation.x = -0.26;
    }
    if (u.bodyRoot) u.bodyRoot.position.y = breath * 0.015;
    if (u.torsoGroup) u.torsoGroup.rotation.y = 0;
  }
}
