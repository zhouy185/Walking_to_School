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
  { key: 'michelle', label: 'Headphones', emoji: '🎧', slots: [], noHat: true },
  { key: 'm_suit', label: 'Smart Suit', emoji: '👔', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'f_suit', label: 'Sharp Blazer', emoji: '🧥', slots: ['skin', 'hair', 'top', 'pants', 'shoes'] },
  { key: 'm_worker', label: 'Hard Hat', emoji: '👷', slots: ['skin', 'top', 'pants', 'shoes'], noHat: true },
  { key: 'f_worker', label: 'Safety Vest', emoji: '🦺', slots: ['skin', 'hair', 'top', 'pants', 'shoes'], noHat: true },
  { key: 'm_farmer', label: 'Farmer', emoji: '🌾', slots: ['skin', 'top', 'pants', 'shoes'], noHat: true },
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
  };

  const rightHandBone = pick('HandR', 'RightHand', 'mixamorigRightHand');
  const rightArmBone = pick('UpperArmR', 'RightArm', 'mixamorigRightArm');

  // Arm drop from bind T-pose down to relaxed sides:
  // Quaternius & Mixamo bind poses are horizontal T-pose (~1.28 rad down); RPM is A-pose (~0.35 rad down)
  const armDownAngle = rig === 'rpm' ? 0.42 : 1.36;

  // Normalize scale so scale=1.0 is ~1.72m tall
  const rawScale = rig === 'quaternius' ? 0.93 * scale : scale;
  model.scale.set(rawScale * widthScale, rawScale, rawScale * widthScale);
  wrapper.add(model);

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
    // Arms hang close to the body (small outward splay) and swing forward/back opposite the legs.
    const armSwing = 0.36 * w;
    setBoneRot(rigBones.uArmL, s * armSwing, 0, -armDownAngle);
    setBoneRot(rigBones.uArmR, -s * armSwing, 0, armDownAngle);
    // Relaxed elbows; bend a bit more on the forward swing (like real walking)
    setElbowBend(rigBones.lArmL, 0.1 + Math.max(0, s) * 0.2 * w, 1);
    setElbowBend(rigBones.lArmR, 0.1 + Math.max(0, -s) * 0.2 * w, -1);

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
 * Player accessories (backpack, hats, glasses)
 * Each model has different proportions, so we MEASURE the posed mesh (head top, face front,
 * back of torso) from skinned vertices, build the accessory in character space, then
 * `bone.attach()` it so it rides along with the head / chest during the walk cycle.
 * ---------------------------------------------------------------------------------------- */
const _v = new THREE.Vector3();
const measureCache = new Map();

function measureCharacter(wrapper) {
  const ud = wrapper.userData;
  const { model, rigBones } = ud;
  const key = `${ud.variantKey}|${model.scale.y.toFixed(3)}`;
  if (measureCache.has(key)) return measureCache.get(key);

  wrapper.updateMatrixWorld(true);
  const toLocal = new THREE.Matrix4().copy(wrapper.matrixWorld).invert();
  const headBone = rigBones.head?.bone;
  const chestBone = (rigBones.chest || rigBones.spine)?.bone;
  const headPos = headBone ? headBone.getWorldPosition(new THREE.Vector3()).applyMatrix4(toLocal) : new THREE.Vector3(0, 1.5, 0);
  const chestPos = chestBone ? chestBone.getWorldPosition(new THREE.Vector3()).applyMatrix4(toLocal) : new THREE.Vector3(0, 1.2, 0);

  const m = {
    headTop: -Infinity,
    headFront: -Infinity,
    headBack: Infinity,
    headHalfW: 0,
    eyeY: null,
    eyeFront: -Infinity,
    eyeHalfSpan: 0,
    backZ: Infinity,
    chestY: chestPos.y,
  };
  const eyeYs = [];

  model.traverse((obj) => {
    if (!obj.isMesh || !obj.visible || !obj.geometry?.attributes?.position) return;
    const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
    const isEye = /Eye(Left|Right)?$/i.test(obj.name) || mats.some((mt) => /^(Eye|Wolf3D_Eye)$/i.test(mt?.name || ''));
    const isHeadwear = /Headwear|Beard/i.test(obj.name);
    if (isHeadwear) return;
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
  const headH = m.headTop - headPos.y;
  if (eyeYs.length) {
    m.eyeY = eyeYs.reduce((a, b) => a + b, 0) / eyeYs.length;
  } else {
    m.eyeY = headPos.y + headH * 0.52;
    m.eyeFront = m.headFront - 0.01;
    m.eyeHalfSpan = m.headHalfW * 0.55;
  }
  if (!Number.isFinite(m.eyeFront)) m.eyeFront = m.headFront;
  m.headPos = headPos;
  m.headH = headH;
  measureCache.set(key, m);
  return m;
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
  // Round the box a little for a softer, toy-like look
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
  // Shoulder straps peeking over the shoulders
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
    const brim = new THREE.Mesh(new THREE.CylinderGeometry(r * 0.92, r * 0.92, 0.014, 20, 1, false, -Math.PI / 2, Math.PI), accMat(shade(color, 0.8), 0.7));
    brim.scale.set(1, 1, 0.95);
    brim.position.set(0, 0.004, r * 0.55);
    g.add(brim);
    const button = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 6), mat);
    button.position.y = r * 0.92;
    g.add(button);
    // Seat the cap down to just above the eyebrows
    const capBase = Math.max(m.headTop - r * 0.9, m.eyeY + 0.035);
    g.position.set(0, capBase, cz);
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
    const beanieBase = Math.max(m.headTop - r * 0.95, m.eyeY + 0.03);
    g.position.set(0, beanieBase, cz);
  }
  return g;
}

function buildGlasses(m, style) {
  const g = new THREE.Group();
  const span = Math.max(0.028, Math.min(0.045, m.eyeHalfSpan * 0.85));
  const lensR = Math.max(0.022, span * 0.78);
  const frame = accMat(style === 'shades' ? 0x111827 : 0x1f2937, 0.4);
  for (const sx of [-1, 1]) {
    const ring = new THREE.Mesh(new THREE.TorusGeometry(lensR, 0.0055, 6, 20), frame);
    ring.position.set(sx * span, 0, 0);
    g.add(ring);
    if (style === 'shades') {
      const lens = new THREE.Mesh(
        new THREE.CircleGeometry(lensR, 20),
        new THREE.MeshStandardMaterial({ color: 0x0b1220, roughness: 0.15, metalness: 0.4, transparent: true, opacity: 0.88 })
      );
      lens.position.set(sx * span, 0, 0.001);
      g.add(lens);
    }
    // Temple arm running back toward the ear
    const armLen = Math.max(0.06, (m.eyeFront - (m.headFront + m.headBack) / 2) * 1.05);
    const arm = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.006, armLen), frame);
    arm.position.set(sx * (span + lensR), 0, -armLen / 2);
    g.add(arm);
  }
  const bridge = new THREE.Mesh(new THREE.BoxGeometry(Math.max(0.01, span * 2 - lensR * 2 + 0.006), 0.006, 0.006), frame);
  g.add(bridge);
  g.position.set(0, m.eyeY + 0.004, m.eyeFront + 0.006);
  return g;
}

/**
 * Adds accessories to a realistic GLB character created by createRealisticHumanInstance.
 * opts: { backpackColor: '#hex' | 'none', hat: 'none'|'cap'|'beanie', hatColor, glasses: 'none'|'round'|'shades' }
 */
export function addAvatarAccessories(wrapper, opts = {}) {
  if (!wrapper?.userData?.isRealisticGlb) return;
  const ud = wrapper.userData;
  const m = measureCharacter(wrapper);
  const headBone = ud.rigBones.head?.bone;
  const chestBone = (ud.rigBones.chest || ud.rigBones.spine)?.bone;
  wrapper.updateMatrixWorld(true);

  const attachTo = (bone, obj) => {
    wrapper.add(obj);
    obj.updateMatrixWorld(true);
    if (bone) bone.attach(obj);
    obj.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = true;
      }
    });
  };

  if (opts.backpackColor && opts.backpackColor !== 'none') {
    attachTo(chestBone, buildBackpack(m, opts.backpackColor));
  }
  const charInfo = PLAYER_CHARACTERS.find((c) => c.key === ud.variantKey);
  if (opts.hat && opts.hat !== 'none' && !charInfo?.noHat) {
    attachTo(headBone, buildHat(m, opts.hat, opts.hatColor || '#ef4444'));
  }
  if (opts.glasses && opts.glasses !== 'none') {
    attachTo(headBone, buildGlasses(m, opts.glasses));
  }
}
