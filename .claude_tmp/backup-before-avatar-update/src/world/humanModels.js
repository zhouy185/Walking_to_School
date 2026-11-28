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

function setBoneRot(info, pitchX = 0, yawY = 0, rollZ = 0) {
  if (!info) return;
  info.bone.quaternion.copy(info.bindQ);
  if (rollZ !== 0) {
    _tmpQuat.setFromAxisAngle(info.axZ, rollZ);
    info.bone.quaternion.multiply(_tmpQuat);
  }
  if (pitchX !== 0) {
    _tmpQuat2.setFromAxisAngle(info.axX, pitchX);
    info.bone.quaternion.multiply(_tmpQuat2);
  }
  if (yawY !== 0) {
    _tmpQuat.setFromAxisAngle(info.axY, yawY);
    info.bone.quaternion.multiply(_tmpQuat);
  }
}

function recolorCharacterMaterials(model, rig, { topColor, pantsColor, shoeColor, hairColor, skinColor, showBeard, showHeadwear }) {
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

      if (rig === 'quaternius') {
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
          m.color.lerp(new THREE.Color(skinColor), 0.42);
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
  const armDownAngle = rig === 'rpm' ? 0.36 : 1.28;

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
      setBoneRot(rigBones.lArmL, -0.65, 0, 0);
      setBoneRot(rigBones.lArmR, -0.72 + Math.max(0, Math.sin(phase * 1.4)) * -0.28, 0, 0);
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
      setBoneRot(rigBones.lArmL, -0.12, 0, 0);
      setBoneRot(rigBones.lArmR, -0.12, 0, 0);
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
    const armSwing = 0.38 * w;
    setBoneRot(rigBones.uArmL, s * armSwing, 0, -armDownAngle);
    setBoneRot(rigBones.uArmR, -s * armSwing, 0, armDownAngle);
    setBoneRot(rigBones.lArmL, -0.18 - Math.max(0, -s) * 0.28 * w, 0, 0);
    setBoneRot(rigBones.lArmR, -0.18 - Math.max(0, s) * 0.28 * w, 0, 0);

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
    isMichelle: rig === 'mixamo',
    rig,
    model,
    bonesByName,
    rigBones,
    rightHandBone,
    rightArmBone,
    armDownAngle,
    setBoneRot,
    setAnimState,
    updateAnim,
    seated,
  };

  return wrapper;
}
