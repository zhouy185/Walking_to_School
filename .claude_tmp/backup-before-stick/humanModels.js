/**
 * Diverse 3D Rigged Human Character Loader & Biomechanical Animator:
 * - Loads 11 distinct everyday 3D human `.glb` models:
 *   • 9 CC0 Quaternius Modular Men & Women (`M_Casual`, `M_Casual2`, `M_Suit`, `M_Worker`,
 *     `M_Farmer`, `F_Casual`, `F_Suit`, `F_Worker`, `F_Adventurer`)
 *   • `rpm_human.glb` (Ready Player Me civilian) + `Michelle.glb` (casual woman in hoodie)
 * - Uses exact model-space axis calibration (`localAxis = inv(worldBindQ) * modelAxis`)
 *   so arms hang naturally at the sides (never T-pose!) and legs/knees/ankles/arms stride
 *   smoothly in sync with each character's real walking speed!
 * - Recolors individual clothing, hair, pants, and shoe materials so every person in the
 *   neighborhood looks genuinely different!
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as SkeletonUtils from 'three/examples/jsm/utils/SkeletonUtils.js';

const loader = new GLTFLoader();

const MODEL_MANIFEST = [
  { key: 'm_casual', url: '/models/people/M_Casual.glb', rig: 'quaternius', gender: 'm' },
  { key: 'm_casual2', url: '/models/people/M_Casual2.glb', rig: 'quaternius', gender: 'm' },
  { key: 'm_suit', url: '/models/people/M_Suit.glb', rig: 'quaternius', gender: 'm' },
  { key: 'm_worker', url: '/models/people/M_Worker.glb', rig: 'quaternius', gender: 'm' },
  { key: 'm_farmer', url: '/models/people/M_Farmer.glb', rig: 'quaternius', gender: 'm' },
  { key: 'f_casual', url: '/models/people/F_Casual.glb', rig: 'quaternius', gender: 'f' },
  { key: 'f_suit', url: '/models/people/F_Suit.glb', rig: 'quaternius', gender: 'f' },
  { key: 'f_worker', url: '/models/people/F_Worker.glb', rig: 'quaternius', gender: 'f' },
  { key: 'f_adventurer', url: '/models/people/F_Adventurer.glb', rig: 'quaternius', gender: 'f' },
  { key: 'rpm', url: '/models/rpm_human.glb', rig: 'rpm', gender: 'm' },
  { key: 'michelle', url: '/models/Michelle.glb', rig: 'mixamo', gender: 'f' },
];

export const FEMALE_ARCHETYPES = ['f_casual', 'f_suit', 'f_worker', 'f_adventurer', 'michelle'];
export const MALE_ARCHETYPES = ['m_casual', 'm_casual2', 'm_suit', 'm_worker', 'm_farmer', 'rpm'];
export const ALL_ARCHETYPES = MODEL_MANIFEST.map((m) => m.key);

const cache = {
  ready: false,
  loadingPromise: null,
  models: new Map(), // key -> { gltf, rig, gender }
};

export function areHumanModelsReady() {
  return cache.ready;
}

export function preloadHumanModels() {
  if (cache.loadingPromise) return cache.loadingPromise;

  const loadOne = (entry) =>
    new Promise((resolve) => {
      loader.load(
        entry.url,
        (gltf) => resolve({ ...entry, gltf }),
        undefined,
        () => resolve(null)
      );
    });

  cache.loadingPromise = Promise.all(MODEL_MANIFEST.map(loadOne)).then((results) => {
    for (const r of results) {
      if (r && r.gltf) {
        cache.models.set(r.key, r);
      }
    }
    cache.ready = cache.models.size > 0;
    return cache;
  });

  return cache.loadingPromise;
}

const WORLD_X = new THREE.Vector3(1, 0, 0);
const WORLD_Y = new THREE.Vector3(0, 1, 0);
const WORLD_Z = new THREE.Vector3(0, 0, 1);
const _tmpQuat = new THREE.Quaternion();
const _tmpQuat2 = new THREE.Quaternion();

/**
 * Captures a bone's bind quaternion and computes exact local-space unit axes corresponding
 * to character-space +X (right), +Y (up), and +Z (forward). This makes rotating any limb
 * forward/backward or down to the sides 100% immune to different glTF/Mixamo bone rolls!
 */
function captureBoneAxes(bone) {
  if (!bone) return null;
  const bindQ = bone.quaternion.clone();
  const worldQ = new THREE.Quaternion();
  bone.getWorldQuaternion(worldQ);
  const invWorldQ = worldQ.clone().invert();
  return {
    bone,
    bindQ,
    axX: WORLD_X.clone().applyQuaternion(invWorldQ).normalize(),
    axY: WORLD_Y.clone().applyQuaternion(invWorldQ).normalize(),
    axZ: WORLD_Z.clone().applyQuaternion(invWorldQ).normalize(),
  };
}

/**
 * Rotates a bone relative to its bind pose using CHARACTER-space axes.
 * Order (in character space): roll about Z first (e.g. drop T-pose arms to the sides),
 * then yaw about Y, then pitch about X (swing forward/back). Right-multiplying local
 * rotations composes them in reverse world order, so pitch is multiplied first.
 * (Before this fix, pitch was applied to the raw T-pose arm, which merely twisted it
 * along its own length — arms never swung and wrists corkscrewed while walking.)
 */
function setBoneRot(info, pitchX = 0, yawY = 0, rollZ = 0) {
  if (!info) return;
  info.bone.quaternion.copy(info.bindQ);
  if (pitchX !== 0) {
    _tmpQuat2.setFromAxisAngle(info.axX, pitchX);
    info.bone.quaternion.multiply(_tmpQuat2);
  }
  if (yawY !== 0) {
    _tmpQuat.setFromAxisAngle(info.axY, yawY);
    info.bone.quaternion.multiply(_tmpQuat);
  }
  if (rollZ !== 0) {
    _tmpQuat.setFromAxisAngle(info.axZ, rollZ);
    info.bone.quaternion.multiply(_tmpQuat);
  }
}

/**
 * Elbow bend for a forearm whose bind pose is a horizontal T-pose arm.
 * In bind space the elbow hinge is the vertical (Y) axis; it rotates down with the upper arm,
 * so a Y rotation always folds the forearm FORWARD. side = +1 for left arm, -1 for right arm.
 */
function setElbowBend(info, bend, side) {
  setBoneRot(info, 0, -side * bend, 0);
}

/**
 * Player-selectable characters with kid-friendly names. `slots` lists which colours can
 * really be changed on that model (Michelle uses one baked texture, RPM is bald, etc.).
 */
export const PLAYER_CHARACTERS = [
  { key: 'm_casual', label: 'Hoodie & Shorts', emoji: '🧢', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'm_casual2', label: 'Tee & Jeans', emoji: '👕', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'f_casual', label: 'Casual Bob', emoji: '👚', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'f_adventurer', label: 'Explorer', emoji: '🧭', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'michelle', label: 'Headphones', emoji: '🎧', slots: [], lockHead: true },
  { key: 'm_suit', label: 'Smart Suit', emoji: '👔', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'f_suit', label: 'Sharp Blazer', emoji: '🧥', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'm_worker', label: 'Hard Hat', emoji: '👷', slots: ['skin', 'top', 'pants', 'shoes'], defaultHat: 'hardhat' },
  { key: 'f_worker', label: 'Safety Vest', emoji: '🦺', slots: ['skin', 'hair', 'top', 'pants', 'shoes'], defaultHat: 'hardhat' },
  { key: 'm_farmer', label: 'Farmer', emoji: '🌾', slots: ['skin', 'top', 'pants', 'shoes'], defaultHat: 'sunhat' },
  { key: 'rpm', label: 'Dapper', emoji: '🎩', slots: ['skin', 'top', 'pants', 'shoes'] },
];

// [meshNamePattern, materialName, slot]. Secondary slots (top2, pants2, shoes2, skin2) get a darker shade.
const QUATERNIUS_RECOLOR = {
  m_casual: [[/Body/, 'Purple', 'top'], [/Feet/, 'Purple', 'shoes'], [/Legs/, 'LightBlue', 'pants']],
  m_casual2: [[/Body/, 'LightBrown', 'top'], [/Feet/, 'Red_Dark', 'shoes'], [/Legs/, 'LightBlue', 'pants']],
  m_suit: [[/Body/, 'Suit', 'top'], [/Legs/, 'Suit', 'pants'], [/Feet/, 'Black', 'shoes']],
  m_worker: [[/Body/, 'Worker_Vest', 'top'], [/Legs/, 'Brown', 'pants'], [/Legs/, 'Brown2', 'pants2'], [/Feet/, 'Black', 'shoes'], [/Feet/, 'Grey', 'shoes2']],
  m_farmer: [[/Body/, 'Brown', 'top'], [/Body/, 'LightBlue', 'pants'], [/Pants/, 'LightBlue', 'pants'], [/Feet/, 'Brown', 'shoes'], [/Feet/, 'Brown2', 'shoes2']],
  f_casual: [[/Body/, 'White', 'top'], [/Legs/, 'Orange', 'pants'], [/Feet/, 'Grey', 'shoes'], [/Head/, 'Hair_Blond', 'hair'], [/Head/, 'Hair_Brown', 'hair2']],
  f_suit: [[/Body/, 'Black', 'top'], [/Legs/, 'Black', 'pants'], [/Feet/, 'Black', 'shoes'], [/Head/, 'Hair_Blond', 'hair'], [/Head/, 'Hair_Brown', 'hair2']],
  f_worker: [[/Body/, 'Worker_Vest', 'top'], [/Legs/, 'Brown_02', 'pants'], [/Legs/, 'Brown2', 'pants2'], [/Feet/, 'Black', 'shoes'], [/Head/, 'DarkBrown', 'hair']],
  f_adventurer: [[/Body/, 'Green', 'top'], [/Body/, 'LightGreen', 'top2'], [/Legs/, 'Brown_02', 'pants'], [/Legs/, 'Brown2', 'pants2'], [/Feet/, 'Brown_02', 'shoes'], [/Feet/, 'Brown2', 'shoes2'], [/Head/, 'Hair_Brown', 'hair']],
};
const QUATERNIUS_HAIR = /^(Hair|Hair_Blond|Hair_Brown|Moustache)$/i;

function shade(hex, f) {
  return new THREE.Color(hex).multiplyScalar(f);
}

function recolorCharacterMaterials(model, rig, { variant, topColor, pantsColor, shoeColor, hairColor, skinColor, skinBlend = 0.55, showBeard, showHeadwear }) {
  const preciseMap = QUATERNIUS_RECOLOR[variant];
  const slotColor = {
    top: topColor != null ? new THREE.Color(topColor) : null,
    top2: topColor != null ? shade(topColor, 0.8) : null,
    pants: pantsColor != null ? new THREE.Color(pantsColor) : null,
    pants2: pantsColor != null ? shade(pantsColor, 0.78) : null,
    shoes: shoeColor != null ? new THREE.Color(shoeColor) : null,
    shoes2: shoeColor != null ? shade(shoeColor, 0.75) : null,
    hair: hairColor != null ? new THREE.Color(hairColor) : null,
    hair2: hairColor != null ? shade(hairColor, 0.7) : null,
  };
  model.traverse((obj) => {
    if (!obj.isMesh) return;
    obj.castShadow = true;
    obj.receiveShadow = true;
    // Mark shared GLB geometry & textures so chunk/interior `disposeGroup` never destroys cached character buffers!
    obj.userData.sharedGeometry = true;

    if (rig === 'rpm') {
      const mName = obj.name || '';
      const matName = obj.material?.name || '';
      if (/Beard/i.test(mName) || /Beard/i.test(matName)) obj.visible = Boolean(showBeard);
      if (/Headwear/i.test(matName) || mName === 'Mesh') obj.visible = Boolean(showHeadwear);
    }

    const mats = Array.isArray(obj.material) ? obj.material.map((m) => m.clone()) : obj.material ? [obj.material.clone()] : [];
    for (const m of mats) {
      m.userData = { ...m.userData, sharedMap: true };
      const name = m.name || '';
      const meshName = obj.name || '';

      if (rig === 'quaternius' && preciseMap) {
        // Exact per-model clothing map (shirt vs. shorts vs. sneakers), so colours land where expected
        const hit = preciseMap.find(([meshRe, matName]) => meshRe.test(meshName) && matName === name);
        if (hit && slotColor[hit[2]]) {
          m.color.copy(slotColor[hit[2]]);
        } else if (QUATERNIUS_HAIR.test(name) && slotColor.hair) {
          m.color.copy(slotColor.hair);
        } else if (/^Skin$/i.test(name) && skinColor != null) {
          m.color.lerp(new THREE.Color(skinColor), skinBlend);
        } else if (/^Skin_Darker$/i.test(name) && skinColor != null) {
          m.color.lerp(shade(skinColor, 0.85), skinBlend);
        }
      } else if (rig === 'quaternius') {
        // Quaternius uses crisp separate flat-shaded materials by part name!
        if (/^(Purple|LightBrown|Suit|Worker_Vest|Green|Orange|Red_Dark)$/i.test(name) || (/Body/i.test(meshName) && /^(White|Grey|Black)$/i.test(name))) {
          if (topColor != null) m.color.set(topColor);
        } else if (/^(LightBlue|Beige)$/i.test(name) || (/Legs/i.test(meshName) && /^(Black|Grey|Brown|Suit|DarkBrown)$/i.test(name))) {
          if (pantsColor != null) m.color.set(pantsColor);
        } else if (/Feet/i.test(meshName) && shoeColor != null && !/Skin/i.test(name)) {
          m.color.set(shoeColor);
        } else if (/^(Hair|Hair_Blond|Hair_Brown|Moustache)$/i.test(name) && hairColor != null) {
          m.color.set(hairColor);
        } else if (/^Skin$/i.test(name) && skinColor != null) {
          m.color.lerp(new THREE.Color(skinColor), 0.55);
        }
      } else if (rig === 'rpm') {
        if (/Outfit_Top/i.test(meshName) || /Outfit_Top/i.test(name)) {
          if (topColor != null) {
            m.map = null;
            m.color.set(topColor);
            m.roughness = 0.78;
          }
        } else if (/Outfit_Bottom/i.test(meshName) || /Outfit_Bottom/i.test(name)) {
          if (pantsColor != null) {
            m.map = null;
            m.color.set(pantsColor);
            m.roughness = 0.85;
          }
        } else if (/Footwear/i.test(meshName) || /Footwear/i.test(name)) {
          if (shoeColor != null) {
            m.map = null;
            m.color.set(shoeColor);
            m.roughness = 0.65;
          }
        } else if (/Skin|Body/i.test(name) && skinColor != null) {
          m.color.lerp(new THREE.Color(skinColor), Math.min(0.75, skinBlend * 0.8));
        }
      } else if (rig === 'mixamo') {
        if (topColor != null) {
          m.color.lerp(new THREE.Color(topColor), 0.25);
        }
      }
      m.needsUpdate = true;
    }
    obj.material = Array.isArray(obj.material) ? mats : mats[0] || obj.material;
  });
}

/**
 * Creates a cloned, naturally animated 3D human character facing +Z with feet at y = 0.
 */
export function createRealisticHumanInstance({
  variant = 'm_casual',
  scale = 1.0,
  widthScale = 1.0,
  topColor = null,
  pantsColor = null,
  shoeColor = null,
  skinColor = null,
  hairColor = null,
  showBeard = false,
  showHeadwear = false,
  seated = false,
  timeOffset = 0,
  skinBlend = 0.55,
} = {}) {
  if (!cache.ready) return null;

  let entry = cache.models.get(variant);
  if (!entry) {
    // Fallback to first loaded model
    entry = cache.models.values().next().value;
  }
  if (!entry) return null;

  const { gltf, rig } = entry;
  const wrapper = new THREE.Group();
  const model = SkeletonUtils.clone(gltf.scene);

  recolorCharacterMaterials(model, rig, {
    variant: entry.key,
    skinBlend,
    topColor,
    pantsColor,
    shoeColor,
    hairColor,
    skinColor,
    showBeard,
    showHeadwear,
  });

  // Ensure world matrices are fresh in bind T-pose before calibrating bone axes!
  model.position.set(0, 0, 0);
  model.rotation.set(0, 0, 0);
  model.scale.set(1, 1, 1);
  model.updateMatrixWorld(true);

  const bonesByName = {};
  model.traverse((obj) => {
    if (obj.isBone) bonesByName[obj.name] = obj;
  });

  const pick = (...names) => {
    for (const n of names) {
      if (bonesByName[n]) return bonesByName[n];
    }
    return null;
  };

  const rigBones = {
    hips: captureBoneAxes(pick('Hips', 'mixamorigHips')),
    spine: captureBoneAxes(pick('Torso', 'Spine1', 'mixamorigSpine1', 'Spine')),
    chest: captureBoneAxes(pick('Chest', 'Spine2', 'mixamorigSpine2')),
    head: captureBoneAxes(pick('Head', 'mixamorigHead')),
    uArmL: captureBoneAxes(pick('UpperArmL', 'LeftArm', 'mixamorigLeftArm')),
    lArmL: captureBoneAxes(pick('LowerArmL', 'LeftForeArm', 'mixamorigLeftForeArm')),
    uArmR: captureBoneAxes(pick('UpperArmR', 'RightArm', 'mixamorigRightArm')),
    lArmR: captureBoneAxes(pick('LowerArmR', 'RightForeArm', 'mixamorigRightForeArm')),
    uLegL: captureBoneAxes(pick('UpperLegL', 'LeftUpLeg', 'mixamorigLeftUpLeg')),
    lLegL: captureBoneAxes(pick('LowerLegL', 'LeftLeg', 'mixamorigLeftLeg')),
    footL: captureBoneAxes(pick('FootL', 'LeftFoot', 'mixamorigLeftFoot')),
    uLegR: captureBoneAxes(pick('UpperLegR', 'RightUpLeg', 'mixamorigRightUpLeg')),
    lLegR: captureBoneAxes(pick('LowerLegR', 'RightLeg', 'mixamorigRightLeg')),
    footR: captureBoneAxes(pick('FootR', 'RightFoot', 'mixamorigRightFoot')),
    handL: captureBoneAxes(pick('HandL', 'LeftHand', 'mixamorigLeftHand')),
    handR: captureBoneAxes(pick('HandR', 'RightHand', 'mixamorigRightHand')),
  };

  // Finger chains for a natural loose fist. Bone names differ per rig:
  // Quaternius "Index2L…Index4L" (men) / "Index1L…Index3L" (women); RPM "LeftHandIndex1…4"; Mixamo "mixamorigLeftHandIndex1…4".
  const fingerChains = { L: [], R: [] };
  for (const side of ['L', 'R']) {
    const long = side === 'L' ? 'Left' : 'Right';
    for (const finger of ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky']) {
      const chain = [];
      for (let n = 1; n <= 4; n++) {
        const b = pick(`${finger}${n}${side}`, `${long}Hand${finger}${n}`, `mixamorig${long}Hand${finger}${n}`);
        if (b && b.children.length) chain.push(captureBoneAxes(b)); // skip end/tip helper bones
      }
      if (chain.length) fingerChains[side].push({ finger, chain });
    }
  }

  const rightHandBone = pick('HandR', 'RightHand', 'mixamorigRightHand');
  const rightArmBone = pick('UpperArmR', 'RightArm', 'mixamorigRightArm');

  // Arm drop from bind T-pose down to relaxed sides:
  // Quaternius & Mixamo bind poses are horizontal T-pose (~1.28 rad down); RPM is A-pose (~0.35 rad down)
  const armDownAngle = rig === 'rpm' ? 0.5 : 1.44;

  // Normalize scale so scale=1.0 is ~1.72m tall
  const rawScale = rig === 'quaternius' ? 0.93 * scale : scale;
  model.scale.set(rawScale * widthScale, rawScale, rawScale * widthScale);
  wrapper.add(model);

  // Loose fist: knuckle → middle → tip flexion (radians). Fingers fold toward the palm, which faces the thigh.
  const FIST_CURL = [1.05, 1.25, 0.85];
  const applyHands = (amount) => {
    for (const side of ['L', 'R']) {
      const sign = side === 'L' ? -1 : 1;
      for (const { finger, chain } of fingerChains[side]) {
        chain.forEach((info, j) => {
          if (finger === 'Thumb') {
            // Thumb tucks forward across the index finger instead of curling into the palm
            setBoneRot(info, sign * 0.6 * amount, 0, sign * (j === 0 ? 0.3 : 0.55) * amount);
          } else {
            const extra = finger === 'Pinky' ? 1.1 : finger === 'Index' ? 0.9 : 1;
            setBoneRot(info, 0, 0, sign * FIST_CURL[Math.min(j, 2)] * extra * amount);
          }
        });
      }
    }
  };

  let animState = seated ? 'seated' : 'idle';
  let phase = timeOffset * 3.1;
  let walkSpeed = 1.45;
  let walkBlend = animState === 'walk' ? 1 : 0;

  const applyPose = () => {
    if (seated || animState === 'sit') {
      model.rotation.x = 0;
      model.position.set(0, -0.38 * scale, 0);
      setBoneRot(rigBones.uLegL, -1.46, 0, 0);
      setBoneRot(rigBones.uLegR, -1.46, 0, 0);
      setBoneRot(rigBones.lLegL, 1.44, 0, 0);
      setBoneRot(rigBones.lLegR, 1.44, 0, 0);
      setBoneRot(rigBones.footL, 0, 0, 0);
      setBoneRot(rigBones.footR, 0, 0, 0);
      setBoneRot(rigBones.uArmL, -0.52, 0, -armDownAngle * 0.85);
      setBoneRot(rigBones.uArmR, -0.56, 0, armDownAngle * 0.85);
      setElbowBend(rigBones.lArmL, 0.9, 1);
      setElbowBend(rigBones.lArmR, 0.95 + Math.max(0, Math.sin(phase * 1.4)) * 0.25, -1);
      setBoneRot(rigBones.spine, 0, 0, 0);
      setBoneRot(rigBones.head, 0.08 + Math.sin(phase * 0.9) * 0.05, Math.sin(phase * 0.65) * 0.18, 0);
      applyHands(0.55);
      return;
    }

    if (animState === 'lie') {
      // Lie flat on back on top of the mattress with head resting on pillow!
      model.rotation.x = -Math.PI / 2;
      model.position.set(0, 0.14 * scale, 0.82 * scale);
      setBoneRot(rigBones.uLegL, 0.04, 0, 0);
      setBoneRot(rigBones.uLegR, 0.04, 0, 0);
      setBoneRot(rigBones.lLegL, 0.06, 0, 0);
      setBoneRot(rigBones.lLegR, 0.06, 0, 0);
      setBoneRot(rigBones.footL, 0.15, 0, 0);
      setBoneRot(rigBones.footR, 0.15, 0, 0);
      setBoneRot(rigBones.uArmL, 0, 0, -armDownAngle * 0.95);
      setBoneRot(rigBones.uArmR, 0, 0, armDownAngle * 0.95);
      setElbowBend(rigBones.lArmL, 0.12, 1);
      setElbowBend(rigBones.lArmR, 0.12, -1);
      setBoneRot(rigBones.spine, Math.sin(phase * 1.1) * 0.02, 0, 0);
      setBoneRot(rigBones.head, 0.12, 0, 0);
      applyHands(0.4);
      return;
    }

    model.rotation.x = 0;
    model.position.x = 0;
    model.position.z = 0;

    const w = walkBlend;
    const s = Math.sin(phase);
    const c = Math.cos(phase);

    // Subtle vertical stride bounce when walking + gentle idle breathing
    const walkBob = Math.abs(c) * 0.032 * w;
    const idleBreath = Math.sin(phase * 1.3) * 0.008 * (1 - w);
    model.position.y = walkBob + idleBreath;

    // Legs: in model space (+Z forward, +X right), negative X rotation swings thigh FORWARD (+Z)!
    const strideAmp = 0.48 * w;
    const thighL = -s * strideAmp;
    const thighR = s * strideAmp;

    // Knee bends backward (+X rotation) cleanly during forward swing lift + slight stance cushion
    const liftL = Math.max(0, c) * 0.68 * w + 0.05;
    const liftR = Math.max(0, -c) * 0.68 * w + 0.05;

    setBoneRot(rigBones.uLegL, thighL, 0, 0);
    setBoneRot(rigBones.uLegR, thighR, 0, 0);
    setBoneRot(rigBones.lLegL, liftL, 0, 0);
    setBoneRot(rigBones.lLegR, liftR, 0, 0);
    setBoneRot(rigBones.footL, -thighL * 0.32, 0, 0);
    setBoneRot(rigBones.footR, -thighR * 0.32, 0, 0);

    // Arms: dropped naturally to the sides (`±armDownAngle` around Z) + opposite swing to legs!
    // Arms hang close to the body and swing clearly forward/back, opposite the legs
    // (left arm forward when the right leg is forward). Forward swing is a bit bigger than back.
    // (Negative pitch = forward. Left leg is forward when s > 0, so the left arm swings BACK then.)
    const armSwing = 0.56 * w;
    const pitchL = s > 0 ? s * armSwing * 0.75 : s * armSwing; // back (+) smaller, forward (−) larger
    const pitchR = s < 0 ? -s * armSwing * 0.75 : -s * armSwing;
    setBoneRot(rigBones.uArmL, pitchL, 0, -armDownAngle);
    setBoneRot(rigBones.uArmR, pitchR, 0, armDownAngle);
    // Relaxed elbows that fold more as each arm comes forward
    setElbowBend(rigBones.lArmL, 0.14 + Math.max(0, -s) * 0.34 * w, 1);
    setElbowBend(rigBones.lArmR, 0.14 + Math.max(0, s) * 0.34 * w, -1);
    // Hands relaxed in line with the forearm, tucked slightly toward the thigh
    setBoneRot(rigBones.handL, 0, 0, -0.12);
    setBoneRot(rigBones.handR, 0, 0, 0.12);
    // Relaxed half-curl when standing, natural loose fist when walking
    applyHands(0.6 + 0.4 * w);

    // Natural subtle torso counter-twist & steady head
    setBoneRot(rigBones.spine, 0.03 * w, s * 0.07 * w, 0);
    setBoneRot(rigBones.head, 0, -s * 0.04 * w + Math.sin(phase * 0.45) * 0.06 * (1 - w), 0);
  };

  applyPose();

  const setAnimState = (nextState, speed = null) => {
    animState = nextState;
    if (speed !== null && Number.isFinite(speed)) {
      walkSpeed = speed;
    }
  };

  const updateAnim = (dt) => {
    const targetBlend = animState === 'walk' || animState === 'run' ? 1 : 0;
    walkBlend += (targetBlend - walkBlend) * Math.min(1, dt * 10);
    if (seated) {
      phase += dt * 1.6;
    } else if (walkBlend > 0.05) {
      // Synchronize stride frequency directly to real ground speed so feet never slide!
      const freq = Math.max(3.2, Math.min(9.5, walkSpeed * 3.1));
      phase += dt * freq;
    } else {
      phase += dt * 1.8;
    }
    applyPose();
  };

  wrapper.userData = {
    isRealisticGlb: true,
    variantKey: entry.key,
    scaleParam: scale,
    isMichelle: rig === 'mixamo',
    rig,
    model,
    bonesByName,
    rigBones,
    rightHandBone,
    rightArmBone,
    armDownAngle,
    setBoneRot,
    setElbowBend,
    setAnimState,
    updateAnim,
    seated,
  };

  return wrapper;
}

/* ------------------------------------------------------------------------------------------
 * Player head & accessories: hairstyles, hats, glasses, backpack
 * Each model has different proportions, so we MEASURE the posed mesh (bare head top, face
 * front, eyes, back of torso) from skinned vertices, build/transplant the item in character
 * space, then `bone.attach()` it so it rides along with the head / chest while walking.
 * Hairstyles and the hard hat / sun hat are borrowed from the other Quaternius models and
 * re-fitted to the chosen head.
 * ---------------------------------------------------------------------------------------- */
export const HAIR_STYLES = [
  { key: 'own', label: 'Original' },
  { key: 'spiky', label: 'Spiky', donor: 'm_casual' },
  { key: 'ponytail', label: 'Ponytail', donor: 'm_casual2' },
  { key: 'parted', label: 'Side Part', donor: 'm_suit' },
  { key: 'pixie', label: 'Pixie', donor: 'f_adventurer' },
  { key: 'crop', label: 'Short Crop', donor: 'f_worker' },
  { key: 'bob', label: 'Bob', donor: 'f_casual' },
  { key: 'longbob', label: 'Long Bob', donor: 'f_suit' },
  { key: 'bald', label: 'Bald' },
];

export const HAT_STYLES = [
  { key: 'none', label: 'No Hat' },
  { key: 'cap', label: 'Cap', tintable: true },
  { key: 'beanie', label: 'Beanie', tintable: true },
  { key: 'hardhat', label: 'Hard Hat', donor: 'm_worker' },
  { key: 'sunhat', label: 'Sun Hat', donor: 'm_farmer' },
];

const HAIR_PART_MAT = /^(Hair|Hair_Blond|Hair_Brown)$/i;

function headPartKind(variant, obj) {
  if (!/Head/.test(obj.name || '')) return null;
  const mat = (Array.isArray(obj.material) ? obj.material[0] : obj.material)?.name || '';
  if (HAIR_PART_MAT.test(mat) || (variant === 'f_worker' && mat === 'DarkBrown')) return 'hair';
  if ((variant === 'm_worker' || variant === 'f_worker') && mat === 'Worker_Yellow') return 'hat';
  if (variant === 'm_farmer' && (mat === 'Beige' || mat === 'Red')) return 'hat';
  return null;
}

/** Female Quaternius models have no scalp under their hair. */
export function isShellHead(udOrKey) {
  const key = typeof udOrKey === 'string' ? udOrKey : udOrKey?.variantKey;
  return /^f_/.test(key || '');
}

const _v = new THREE.Vector3();
const measureCache = new Map();

function measureCharacter(wrapper, tag = '') {
  const ud = wrapper.userData;
  const { model, rigBones } = ud;
  const key = `${ud.variantKey}|${model.scale.y.toFixed(3)}|${tag}`;
  if (measureCache.has(key)) return measureCache.get(key);

  wrapper.updateMatrixWorld(true);
  const toLocal = new THREE.Matrix4().copy(wrapper.matrixWorld).invert();
  const headBone = rigBones.head?.bone;
  const chestBone = (rigBones.chest || rigBones.spine)?.bone;
  const headPos = headBone ? headBone.getWorldPosition(new THREE.Vector3()).applyMatrix4(toLocal) : new THREE.Vector3(0, 1.5, 0);
  const chestPos = chestBone ? chestBone.getWorldPosition(new THREE.Vector3()).applyMatrix4(toLocal) : new THREE.Vector3(0, 1.2, 0);
  const isFemaleQuat = ud.rig === 'quaternius' && /^f_/.test(ud.variantKey);

  const m = {
    headTop: -Infinity,
    headFront: -Infinity,
    headBack: Infinity,
    headHalfW: 0,
    eyeFront: -Infinity,
    eyeHalfSpan: 0,
    backZ: Infinity,
    chestY: chestPos.y,
  };
  const eyeYs = [];
  let eyesIncludeBrows = false;

  model.traverse((obj) => {
    if (!obj.isMesh || !obj.visible || !obj.geometry?.attributes?.position) return;
    if (/Headwear|Beard/i.test(obj.name)) return;
    const matName = (Array.isArray(obj.material) ? obj.material[0] : obj.material)?.name || '';
    const isEye =
      /Eye(Left|Right)?$/i.test(obj.name) ||
      /^(Eye|Wolf3D_Eye)$/i.test(matName) ||
      (isFemaleQuat && /Head/.test(obj.name) && matName === 'Brown');
    if (isEye && matName === 'Brown') eyesIncludeBrows = true;
    const pos = obj.geometry.attributes.position;
    const step = Math.max(1, Math.floor(pos.count / 6000));
    for (let i = 0; i < pos.count; i += step) {
      obj.getVertexPosition(i, _v);
      _v.applyMatrix4(obj.matrixWorld).applyMatrix4(toLocal);
      if (isEye) {
        eyeYs.push(_v.y);
        m.eyeFront = Math.max(m.eyeFront, _v.z);
        m.eyeHalfSpan = Math.max(m.eyeHalfSpan, Math.abs(_v.x));
        continue;
      }
      if (_v.y > headPos.y && Math.abs(_v.x) < 0.2) {
        m.headTop = Math.max(m.headTop, _v.y);
        m.headFront = Math.max(m.headFront, _v.z);
        m.headBack = Math.min(m.headBack, _v.z);
        m.headHalfW = Math.max(m.headHalfW, Math.abs(_v.x));
      }
      if (Math.abs(_v.y - chestPos.y) < 0.12 && Math.abs(_v.x) < 0.12) {
        m.backZ = Math.min(m.backZ, _v.z);
      }
    }
  });

  if (!Number.isFinite(m.headTop)) m.headTop = headPos.y + 0.22;
  if (!Number.isFinite(m.headFront)) m.headFront = headPos.z + 0.1;
  if (!Number.isFinite(m.headBack)) m.headBack = headPos.z - 0.1;
  if (!m.headHalfW) m.headHalfW = 0.1;
  if (!Number.isFinite(m.backZ)) m.backZ = chestPos.z - 0.11;
  m.headPos = headPos;
  m.rig = ud.rig;
  m.headH = m.headTop - headPos.y;
  if (eyeYs.length) {
    eyeYs.sort((a, b) => a - b);
    // Female Quaternius eyes share a material with the eyebrows → use the lower part
    m.eyeY = eyesIncludeBrows ? eyeYs[Math.floor(eyeYs.length * 0.3)] : eyeYs.reduce((a, b) => a + b, 0) / eyeYs.length;
  } else {
    m.eyeY = headPos.y + m.headH * 0.4;
    m.eyeFront = m.headFront - 0.02;
    m.eyeHalfSpan = m.headHalfW * 0.45;
  }
  if (!Number.isFinite(m.eyeFront)) m.eyeFront = m.headFront;
  measureCache.set(key, m);
  return m;
}

/** Bakes another model's hair / hat meshes (posed) into static geometry + its bare-head measurements. */
const donorCache = new Map();
function getDonorParts(donorKey, kind, scaleParam) {
  const key = `${donorKey}|${kind}|${scaleParam}`;
  if (donorCache.has(key)) return donorCache.get(key);
  const inst = createRealisticHumanInstance({ variant: donorKey, scale: scaleParam });
  if (!inst || inst.userData.variantKey !== donorKey) return null;
  inst.updateMatrixWorld(true);
  const parts = [];
  const toHide = [];
  inst.userData.model.traverse((obj) => {
    if (!obj.isMesh) return;
    const k = headPartKind(donorKey, obj);
    if (!k) return;
    toHide.push(obj);
    if (k !== kind) return;
    const src = obj.geometry;
    const n = src.attributes.position.count;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      obj.getVertexPosition(i, _v);
      _v.applyMatrix4(obj.matrixWorld);
      arr[i * 3] = _v.x;
      arr[i * 3 + 1] = _v.y;
      arr[i * 3 + 2] = _v.z;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(arr, 3));
    if (src.index) g.setIndex(src.index.clone());
    g.computeVertexNormals();
    const mat = (Array.isArray(obj.material) ? obj.material[0] : obj.material).clone();
    mat.flatShading = true;
    parts.push({ geometry: g, material: mat, matName: mat.name });
  });
  toHide.forEach((o) => (o.visible = false));
  const bare = measureCharacter(inst, 'bare');
  const result = { parts, m: bare };
  donorCache.set(key, result);
  return result;
}

/** Re-fits donor parts onto the target head: match head width, bare-head top and head centre. */
function fitDonorParts(donor, target, { tint = null, tintMats = null, lift = 0, extraScale = 1 } = {}) {
  const g = new THREE.Group();
  const s = THREE.MathUtils.clamp(target.headHalfW / donor.m.headHalfW, 0.75, 1.3) * extraScale;
  const cD = (donor.m.headFront + donor.m.headBack) / 2;
  const cT = (target.headFront + target.headBack) / 2;
  for (const p of donor.parts) {
    const mat = p.material.clone();
    mat.userData = { ...mat.userData, sharedMap: true };
    if (tint && (!tintMats || tintMats.test(p.matName))) {
      mat.color.set(/Hair_Brown/i.test(p.matName) ? shade(tint, 0.72) : tint);
    }
    const mesh = new THREE.Mesh(p.geometry, mat);
    mesh.userData.sharedGeometry = true;
    mesh.castShadow = true;
    mesh.scale.setScalar(s);
    mesh.position.set(0, target.headTop + lift - donor.m.headTop * s, cT - cD * s);
    g.add(mesh);
  }
  return g;
}

function accMat(color, roughness = 0.7) {
  return new THREE.MeshStandardMaterial({ color, roughness });
}

function buildBackpack(m, color) {
  const g = new THREE.Group();
  const main = accMat(color, 0.78);
  const dark = accMat(shade(color, 0.72), 0.8);
  const w = 0.28;
  const h = 0.34;
  const d = 0.13;
  const body = new THREE.Mesh(new THREE.BoxGeometry(w, h, d, 2, 2, 2), main);
  const p = body.geometry.attributes.position;
  for (let i = 0; i < p.count; i++) {
    const x = p.getX(i) / (w / 2);
    const y = p.getY(i) / (h / 2);
    const z = p.getZ(i) / (d / 2);
    const k = 1 - 0.08 * (x * x * y * y + x * x * z * z * 0.5);
    p.setXYZ(i, p.getX(i) * k, p.getY(i), p.getZ(i) * (1 - 0.1 * y * y));
  }
  body.geometry.computeVertexNormals();
  g.add(body);
  const pocket = new THREE.Mesh(new THREE.BoxGeometry(w * 0.72, h * 0.4, 0.05), dark);
  pocket.position.set(0, -h * 0.18, -d / 2 - 0.018);
  g.add(pocket);
  const flap = new THREE.Mesh(new THREE.BoxGeometry(w * 0.96, 0.05, d * 1.05), dark);
  flap.position.set(0, h / 2 - 0.01, 0);
  g.add(flap);
  for (const sx of [-1, 1]) {
    const strap = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.03, 0.16), dark);
    strap.position.set(sx * w * 0.3, h / 2 + 0.005, d / 2 + 0.05);
    g.add(strap);
  }
  g.position.set(0, m.chestY - 0.1, m.backZ - d / 2 + 0.012);
  return g;
}

function buildHat(m, style, color) {
  const g = new THREE.Group();
  const r = Math.max(0.085, m.headHalfW * 1.12);
  const cz = (m.headFront + m.headBack) / 2;
  const mat = accMat(color, 0.75);
  if (style === 'cap') {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(r, 20, 10, 0, Math.PI * 2, 0, Math.PI / 2), mat);
    dome.scale.set(1, 0.92, 1.1);
    g.add(dome);
    const brim = new THREE.Mesh(
      new THREE.CylinderGeometry(r * 0.92, r * 0.92, 0.014, 20, 1, false, -Math.PI / 2, Math.PI),
      accMat(shade(color, 0.8), 0.7)
    );
    brim.scale.set(1, 1, 0.95);
    brim.position.set(0, 0.004, r * 0.55);
    g.add(brim);
    const button = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), mat);
    button.position.y = r * 0.92;
    g.add(button);
    g.position.set(0, Math.max(m.headTop - r * 0.9, m.eyeY + 0.035), cz);
  } else if (style === 'beanie') {
    const dome = new THREE.Mesh(new THREE.SphereGeometry(r * 1.02, 20, 12, 0, Math.PI * 2, 0, Math.PI / 2), mat);
    dome.scale.set(1, 1.0, 1.06);
    g.add(dome);
    const cuff = new THREE.Mesh(new THREE.CylinderGeometry(r * 1.06, r * 1.08, 0.055, 22, 1, true), accMat(shade(color, 0.82), 0.85));
    cuff.position.y = 0.012;
    cuff.material.side = THREE.DoubleSide;
    g.add(cuff);
    const pom = new THREE.Mesh(new THREE.IcosahedronGeometry(0.036, 1), accMat(0xffffff, 0.95));
    pom.position.y = r * 1.02;
    g.add(pom);
    g.position.set(0, Math.max(m.headTop - r * 0.95, m.eyeY + 0.03), cz);
  }
  return g;
}

function buildGlasses(m, style) {
  const g = new THREE.Group();
  // Lens centres sit over the pupils; size scales with the eye spacing of each face
  const span = THREE.MathUtils.clamp(m.eyeHalfSpan * 0.72, 0.026, 0.04);
  const lensR = THREE.MathUtils.clamp(span * 0.62, 0.016, 0.026);
  const tube = 0.0042;
  const frame = accMat(style === 'shades' ? 0x111827 : 0x1f2937, 0.4);
  for (const sx of [-1, 1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(lensR, tube, 6, 22), frame);
    ring.position.set(sx * span, 0, 0);
    g.add(ring);
    if (style === 'shades') {
      const lens = new THREE.Mesh(
        new THREE.CircleGeometry(lensR, 22),
        new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.15, metalness: 0.4, transparent: true, opacity: 0.88 })
      );
      lens.position.set(sx * span, 0, 0.001);
      g.add(lens);
    }
    // Temple arm: from the outer rim straight back to just past the ear line
    const sideX = Math.min(m.headHalfW * 0.98, span + lensR + 0.01);
    const backZ = (m.headFront + m.headBack) / 2 - (m.eyeFront + 0.008);
    const armLen = Math.max(0.05, -backZ);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.005, armLen), frame);
    arm.position.set(sx * sideX, 0.004, -armLen / 2);
    g.add(arm);
    const hinge = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.002, sideX - span - lensR + 0.004), 0.005, 0.005), frame);
    hinge.position.set(sx * (span + lensR + (sideX - span - lensR) / 2), 0.002, 0);
    g.add(hinge);
  }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.008, span * 2 - lensR * 2 + 0.004), 0.005, 0.005), frame);
  bridge.position.y = 0.004;
  g.add(bridge);
  // Realistic (RPM) faces curve back steeply from deep-set eyes → sit the frame further out
  g.position.set(0, m.eyeY + 0.002, m.eyeFront + (m.rig === 'rpm' ? 0.024 : 0.008));
  return g;
}

/**
 * Dresses a realistic GLB character created by createRealisticHumanInstance.
 * opts: { hair: HAIR_STYLES key, hairColor, hat: HAT_STYLES key, hatColor,
 *         glasses: 'none'|'round'|'shades', backpackColor: '#hex'|'none' }
 */
export function addAvatarAccessories(wrapper, opts = {}) {
  if (!wrapper?.userData?.isRealisticGlb) return;
  const ud = wrapper.userData;
  const info = PLAYER_CHARACTERS.find((c) => c.key === ud.variantKey);
  const lockHead = Boolean(info?.lockHead);
  let hairStyle = lockHead ? 'own' : opts.hair || 'own';
  if (hairStyle === 'bald' && isShellHead(ud)) hairStyle = 'crop';
  const hat = lockHead ? 'none' : opts.hat || 'none';
  const headBone = ud.rigBones.head?.bone;
  const chestBone = (ud.rigBones.chest || ud.rigBones.spine)?.bone;

  // 1. Hide the model's own hair (if restyled) and its built-in hat (hats are chosen separately)
  const hideHair = hairStyle !== 'own';
  ud.model.traverse((obj) => {
    if (!obj.isMesh) return;
    const k = headPartKind(ud.variantKey, obj);
    if (k === 'hat' || (k === 'hair' && hideHair)) obj.visible = false;
  });
  const m = measureCharacter(wrapper, hideHair ? 'nohair' : 'hair');
  wrapper.updateMatrixWorld(true);

  const attachTo = (bone, obj) => {
    wrapper.add(obj);
    obj.updateMatrixWorld(true);
    if (bone) bone.attach(obj);
    obj.traverse((o) => {
      if (o.isMesh) o.castShadow = true;
    });
  };

  // 2. Transplanted hairstyle
  let hairTop = m.headTop;
  let hairHalfW = m.headHalfW;
  // Female Quaternius heads are only a face shell (the hair IS the back of the skull), so give
  // them a fitted hair-coloured skull layer under any new style.
  if (hideHair && isShellHead(ud)) {
    const rx = m.headHalfW * 0.95;
    const ry = rx * 1.36;
    const rz = rx * 1.12;
    const skullColor = hairStyle === 'bald' ? null : opts.hairColor || '#4a2f1b';
    let skinCol = null;
    ud.model.traverse((o) => {
      if (!skinCol && o.isMesh && /^Skin$/i.test(o.material?.name || '')) skinCol = o.material.color.clone();
    });
    const skull = new THREE.Mesh(
      new THREE.SphereGeometry(1, 20, 14),
      new THREE.MeshStandardMaterial({ color: skullColor || skinCol || 0xc8a27a, roughness: 0.9, flatShading: true })
    );
    skull.scale.set(rx, ry, rz);
    skull.position.set(0, m.eyeY - 0.004, m.eyeFront - rz - 0.012);
    attachTo(headBone, skull);
    hairTop = Math.max(hairTop, m.eyeY - 0.004 + ry);
  }
  const hairDef = HAIR_STYLES.find((h) => h.key === hairStyle);
  if (hairDef?.donor) {
    const donor = getDonorParts(hairDef.donor, 'hair', ud.scaleParam ?? 1);
    if (donor && donor.parts.length) {
      const hairGroup = fitDonorParts(donor, m, { tint: opts.hairColor || null });
      wrapper.add(hairGroup);
      hairGroup.updateMatrixWorld(true);
      const box = new THREE.Box3().setFromObject(hairGroup);
      hairTop = Math.max(hairTop, box.max.y);
      hairHalfW = Math.max(hairHalfW, Math.min(box.max.x, -box.min.x));
      wrapper.remove(hairGroup);
      attachTo(headBone, hairGroup);
    }
  }

  // 3. Hat (sits on top of whatever hair is there)
  const withHair = { ...m, headTop: hairTop, headHalfW: Math.max(m.headHalfW, hairHalfW * 0.92) };
  const hatDef = HAT_STYLES.find((h) => h.key === hat);
  if (hatDef?.donor) {
    const donor = getDonorParts(hatDef.donor, 'hat', ud.scaleParam ?? 1);
    if (donor && donor.parts.length) {
      const extra = THREE.MathUtils.clamp(withHair.headHalfW / m.headHalfW, 1, 1.18);
      const lift = (hairTop - m.headTop) * 0.75;
      attachTo(headBone, fitDonorParts(donor, m, { lift, extraScale: extra }));
    }
  } else if (hat === 'cap' || hat === 'beanie') {
    attachTo(headBone, buildHat(withHair, hat, opts.hatColor || '#ef4444'));
  }

  // 4. Glasses & backpack
  if (!lockHead && opts.glasses && opts.glasses !== 'none') {
    attachTo(headBone, buildGlasses(m, opts.glasses));
  }
  if (opts.backpackColor && opts.backpackColor !== 'none') {
    attachTo(chestBone, buildBackpack(m, opts.backpackColor));
  }
}
