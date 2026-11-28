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
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js';
import { VRMLoaderPlugin, VRMNodeConstraintManager, VRMSpringBoneManager, VRMSpringBoneJoint } from '@pixiv/three-vrm';

const loader = new GLTFLoader();
// MetaHuman exports are compressed with meshopt (see scripts/optimize-metahuman.mjs)
loader.setMeshoptDecoder(MeshoptDecoder);
// VRoid Studio characters (.vrm) need the VRM plugin (cartoon MToon shading, humanoid bone map)
const vrmLoader = new GLTFLoader();
vrmLoader.setMeshoptDecoder(MeshoptDecoder);
vrmLoader.register((parser) => new VRMLoaderPlugin(parser));

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
        r.eyes = applyRealismPass(r.gltf.scene, r.rig);
        cache.models.set(r.key, r);
      }
    }
    cache.ready = cache.models.size > 0;
    // Heavy MetaHuman characters stream in afterwards, one at a time, without delaying startup
    loadMetaHumans();
    return cache;
  });

  return cache.loadingPromise;
}

/* ------------------------------------------------------------------------------------------
 * MetaHuman characters (drop-in, optional)
 * Put optimized .glb files in public/models/metahuman/ and list them in manifest.json there:
 *   { "characters": [ { "id": "maya", "label": "Maya", "file": "maya.glb", "gender": "f",
 *                       "heightM": 1.35, "roles": ["player"], "emoji": "🧒" } ] }
 * roles: "player" (appears in Customize Avatar), "mom", "dad" (the parents at home).
 * Each file loads lazily after the regular characters, so startup stays fast.
 * ---------------------------------------------------------------------------------------- */
const METAHUMAN_DIR = '/models/metahuman/';
const metaHumans = new Map(); // key -> manifest entry
const modelListeners = new Set();
let metaHumanPromise = null;

/** Called with the model key whenever a lazily loaded character becomes available. */
export function onHumanModelLoaded(cb) {
  modelListeners.add(cb);
  return () => modelListeners.delete(cb);
}

/** Key of a loaded MetaHuman for a role ('mom', 'dad', 'player'), or null. */
export function metaHumanForRole(role) {
  for (const m of metaHumans.values()) {
    if (m.roles.includes(role) && cache.models.has(m.key)) return m.key;
  }
  return null;
}

// Custom characters can live in either folder: models/characters/ (VRoid .vrm or any rigged .glb)
// or models/metahuman/ (Unreal exports). Both use the same manifest format.
const CUSTOM_DIRS = ['/models/characters/', METAHUMAN_DIR];

async function readManifest(dir) {
  try {
    const res = await fetch(`${dir}manifest.json`, { cache: 'no-cache' });
    if (!res.ok || !/json/i.test(res.headers.get('content-type') || '')) return [];
    const json = await res.json();
    const list = Array.isArray(json) ? json : json.characters || [];
    return list
      .filter((c) => c && c.id && (c.file || c.url))
      .map((c) => {
        const url = c.url || `${dir}${c.file}`;
        return {
          key: `${dir === METAHUMAN_DIR ? 'mh' : 'cc'}_${String(c.id).replace(/[^\w-]/g, '_')}`,
          url,
          label: c.label || String(c.id),
          emoji: c.emoji || (c.gender === 'f' ? '👩' : '👨'),
          gender: c.gender === 'f' ? 'f' : 'm',
          heightM: Number(c.heightM) > 0.5 ? Number(c.heightM) : 1.7,
          roles: Array.isArray(c.roles) ? c.roles.map((r) => String(r).toLowerCase()) : ['player'],
          rig: /\.vrm(\?|$)/i.test(url) ? 'vrm' : 'metahuman',
        };
      });
  } catch {
    return [];
  }
}

async function readMetaHumanManifest() {
  const lists = await Promise.all(CUSTOM_DIRS.map(readManifest));
  return lists.flat();
}

/** VRM humanoid bone → Unreal name, so VRoid characters reuse the same animator as MetaHumans. */
const VRM_TO_UE = {
  hips: 'pelvis', spine: 'spine_01', chest: 'spine_03', upperChest: 'spine_05', neck: 'neck_01', head: 'head',
  leftUpperLeg: 'thigh_l', leftLowerLeg: 'calf_l', leftFoot: 'foot_l', leftToes: 'ball_l',
  rightUpperLeg: 'thigh_r', rightLowerLeg: 'calf_r', rightFoot: 'foot_r', rightToes: 'ball_r',
  leftShoulder: 'clavicle_l', leftUpperArm: 'upperarm_l', leftLowerArm: 'lowerarm_l', leftHand: 'hand_l',
  rightShoulder: 'clavicle_r', rightUpperArm: 'upperarm_r', rightLowerArm: 'lowerarm_r', rightHand: 'hand_r',
};
for (const [vs, us] of [['left', 'l'], ['right', 'r']]) {
  VRM_TO_UE[`${vs}ThumbMetacarpal`] = `thumb_01_${us}`;
  VRM_TO_UE[`${vs}ThumbProximal`] = `thumb_02_${us}`;
  VRM_TO_UE[`${vs}ThumbDistal`] = `thumb_03_${us}`;
  for (const [vf, uf] of [['Index', 'index'], ['Middle', 'middle'], ['Ring', 'ring'], ['Little', 'pinky']]) {
    VRM_TO_UE[`${vs}${vf}Proximal`] = `${uf}_01_${us}`;
    VRM_TO_UE[`${vs}${vf}Intermediate`] = `${uf}_02_${us}`;
    VRM_TO_UE[`${vs}${vf}Distal`] = `${uf}_03_${us}`;
  }
}

/**
 * Re-creates a VRoid character's hair / skirt physics (spring bones) and twist constraints on a
 * SkeletonUtils clone, so every copy of the character gets its own swaying hair.
 */
function cloneVrmRuntime(vrm, srcRoot, dstRoot) {
  if (!vrm) return null;
  const map = new Map();
  const walk = (a, b) => {
    if (!a || !b) return;
    map.set(a, b);
    for (let i = 0; i < a.children.length; i++) walk(a.children[i], b.children[i]);
  };
  walk(srcRoot, dstRoot);
  const to = (o) => (o ? map.get(o) || null : null);

  let constraints = null;
  if (vrm.nodeConstraintManager?.constraints?.size) {
    constraints = new VRMNodeConstraintManager();
    for (const c of vrm.nodeConstraintManager.constraints) {
      const d = to(c.destination);
      const src = to(c.source);
      if (!d || !src) continue;
      const nc = new c.constructor(d, src);
      nc.weight = c.weight;
      if ('aimAxis' in c) nc.aimAxis = c.aimAxis;
      if ('rollAxis' in c) nc.rollAxis = c.rollAxis;
      constraints.addConstraint(nc);
    }
  }

  let springs = null;
  if (vrm.springBoneManager?.joints?.size) {
    springs = new VRMSpringBoneManager();
    const groupMap = new Map();
    const toGroup = (g) => {
      if (!groupMap.has(g)) {
        const colliders = [];
        for (const col of g.colliders) {
          const cc = to(col);
          if (!cc) continue;
          cc.shape = col.shape; // Object3D.clone() can't copy the collider shape
          colliders.push(cc);
        }
        groupMap.set(g, { name: g.name, colliders });
      }
      return groupMap.get(g);
    };
    for (const j of vrm.springBoneManager.joints) {
      const bone = to(j.bone);
      if (!bone) continue;
      const nj = new VRMSpringBoneJoint(bone, to(j.child), { ...j.settings }, (j.colliderGroups || []).map(toGroup));
      if (j.center) nj.center = to(j.center);
      springs.addJoint(nj);
    }
  }
  return { constraints, springs };
}

/**
 * Mixamo-style skeletons (Mixamo auto-rigger, Meshy, Tripo, many store characters) → Unreal names,
 * so any rigged humanoid .glb dropped into models/characters/ uses the same animator.
 */
const MIXAMO_TO_UE = {
  Hips: 'pelvis', Spine: 'spine_01', Spine1: 'spine_03', Spine2: 'spine_05', Neck: 'neck_01', Head: 'head',
  LeftUpLeg: 'thigh_l', LeftLeg: 'calf_l', LeftFoot: 'foot_l', LeftToeBase: 'ball_l',
  RightUpLeg: 'thigh_r', RightLeg: 'calf_r', RightFoot: 'foot_r', RightToeBase: 'ball_r',
  LeftShoulder: 'clavicle_l', LeftArm: 'upperarm_l', LeftForeArm: 'lowerarm_l', LeftHand: 'hand_l',
  RightShoulder: 'clavicle_r', RightArm: 'upperarm_r', RightForeArm: 'lowerarm_r', RightHand: 'hand_r',
};
for (const [side, us] of [['Left', 'l'], ['Right', 'r']]) {
  for (const [mf, uf] of [['Thumb', 'thumb'], ['Index', 'index'], ['Middle', 'middle'], ['Ring', 'ring'], ['Pinky', 'pinky']]) {
    for (let n = 1; n <= 3; n++) MIXAMO_TO_UE[`${side}Hand${mf}${n}`] = `${uf}_0${n}_${us}`;
  }
}

/** Renames a Mixamo-named skeleton to Unreal names. Returns false if it isn't one. */
function renameMixamoSkeleton(scene) {
  const bones = [];
  scene.traverse((o) => {
    if (o.isBone) bones.push(o);
  });
  const strip = (n) => n.replace(/^.*[:|]/, '').replace(/^mixamorig\d*_?/i, '');
  const found = bones.filter((b) => MIXAMO_TO_UE[strip(b.name)]);
  if (!['Hips', 'LeftUpLeg', 'LeftArm', 'Head'].every((k) => found.some((b) => strip(b.name) === k))) return false;
  for (const b of found) b.name = MIXAMO_TO_UE[strip(b.name)];
  // A Spine without Spine2 (some auto-riggers): make sure the chest bone exists under its expected name
  if (!found.some((b) => b.name === 'spine_05')) {
    const s1 = bones.find((b) => b.name === 'spine_03');
    if (s1) s1.name = 'spine_05';
  }
  return true;
}

function prepareVrm(gltf) {
  const vrm = gltf.userData.vrm;
  if (!vrm?.humanoid) return false;
  // three-vrm already renames VRM 0.x thumbs to the VRM 1.0 scheme, so one table covers both
  const used = new Set();
  for (const [vrmName, ueName] of Object.entries(VRM_TO_UE)) {
    const node = vrm.humanoid.getRawBoneNode(vrmName);
    if (!node || used.has(node)) continue;
    node.name = ueName;
    used.add(node);
  }
  // Chest fallbacks so spine/chest bones always exist under the names the animator looks for
  if (!vrm.humanoid.getRawBoneNode('upperChest')) {
    const chest = vrm.humanoid.getRawBoneNode('chest');
    if (chest) chest.name = 'spine_05';
  }
  gltf.scene.traverse((o) => {
    if (!o.isMesh) return;
    o.frustumCulled = false; // skinned VRM meshes have stale bounds once posed
    const mats = Array.isArray(o.material) ? o.material : [o.material];
    for (const m of mats) {
      if (!m) continue;
      m.userData.shared = true; // MToon materials are shared by every copy of the character
      m.userData.sharedMap = true;
    }
  });
  return true;
}

function loadMetaHumans() {
  if (metaHumanPromise) return metaHumanPromise;
  metaHumanPromise = (async () => {
    const list = await readMetaHumanManifest();
    for (const entry of list) metaHumans.set(entry.key, entry);
    for (const entry of list) {
      try {
        const gltf = await (entry.rig === 'vrm' ? vrmLoader : loader).loadAsync(entry.url);
        if (entry.rig === 'vrm' && !prepareVrm(gltf)) {
          console.warn(`[Characters] ${entry.url}: not a valid VRM humanoid`);
          continue;
        }
        if (entry.rig !== 'vrm' && !findBones(gltf.scene, UE_BONES).pelvis) {
          if (renameMixamoSkeleton(gltf.scene)) entry.rig = 'metahuman';
        }
        const prep = prepareMetaHuman(gltf.scene, entry);
        if (!prep) {
          console.warn(`[Characters] ${entry.url}: no humanoid skeleton found (expected Unreal, Mixamo or VRM bone names)`);
          continue;
        }
        if (entry.rig !== 'vrm') applyRealismPass(gltf.scene, 'metahuman');
        cache.models.set(entry.key, { ...entry, ...prep, gltf });
        if (entry.roles.includes('player') && !PLAYER_CHARACTERS.some((c) => c.key === entry.key)) {
          PLAYER_CHARACTERS.push({ key: entry.key, label: entry.label, emoji: entry.emoji, slots: [], lockHead: true, metahuman: true });
        }
        for (const cb of modelListeners) {
          try {
            cb(entry.key);
          } catch (err) {
            console.error(err);
          }
        }
      } catch (err) {
        console.warn(`[MetaHuman] could not load ${entry.url}`, err);
      }
    }
  })();
  return metaHumanPromise;
}

const UE_BONES = {
  pelvis: ['pelvis'],
  thighL: ['thigh_l'],
  thighR: ['thigh_r'],
  footL: ['foot_l'],
  footR: ['foot_r'],
  armL: ['upperarm_l'],
  armR: ['upperarm_r'],
  foreL: ['lowerarm_l'],
  foreR: ['lowerarm_r'],
  head: ['head'],
};

function findBones(scene, table) {
  const byName = {};
  scene.traverse((o) => {
    if (o.isBone) byName[o.name.toLowerCase().replace(/^.*[:|]/, '')] = o;
  });
  const out = {};
  for (const [k, names] of Object.entries(table)) out[k] = names.map((n) => byName[n]).find(Boolean) || null;
  return out;
}

/**
 * Normalizes an exported MetaHuman so it behaves like every other character:
 * Y-up, facing +Z, feet on y = 0, centred on the pelvis, and exactly `heightM` tall.
 * Works whether the export came out Z-up / Y-up, in cm or m, facing ±Y or ±Z.
 */
function prepareMetaHuman(scene, entry) {
  scene.updateMatrixWorld(true);
  const b = findBones(scene, UE_BONES);
  if (!b.pelvis || !b.head || !b.armL || !b.armR || !b.thighL || !b.thighR) return null;
  const wp = (o) => o.getWorldPosition(new THREE.Vector3());

  // Wrap everything in a correction group (clones keep it, so this runs once per file)
  const fix = new THREE.Group();
  fix.name = 'MetaHumanFix';
  while (scene.children.length) fix.add(scene.children[0]);
  scene.add(fix);
  scene.updateMatrixWorld(true);

  // 1. Up axis: pelvis → head becomes +Y
  const feetMid = wp(b.footL || b.thighL).add(wp(b.footR || b.thighR)).multiplyScalar(0.5);
  const up = wp(b.head).sub(feetMid).normalize();
  fix.quaternion.premultiply(new THREE.Quaternion().setFromUnitVectors(up, new THREE.Vector3(0, 1, 0)));
  scene.updateMatrixWorld(true);

  // 2. Facing: character's left is +X when facing +Z, so forward = (left − right) × up
  const across = wp(b.armL).sub(wp(b.armR));
  across.y = 0;
  const fwd = new THREE.Vector3().crossVectors(across, new THREE.Vector3(0, 1, 0)).normalize();
  const yaw = Math.atan2(fwd.x, fwd.z);
  fix.quaternion.premultiply(new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), -yaw));
  scene.updateMatrixWorld(true);

  // 3. Height & ground (skinned, so hair cards and shoes count)
  let box = new THREE.Box3().setFromObject(scene, true);
  const h = box.max.y - box.min.y;
  if (!(h > 1e-4)) return null;
  fix.scale.multiplyScalar(entry.heightM / h);
  scene.updateMatrixWorld(true);
  box = new THREE.Box3().setFromObject(scene, true);
  const pelvis = wp(b.pelvis);
  fix.position.x -= pelvis.x;
  fix.position.z -= pelvis.z;
  fix.position.y -= box.min.y;
  scene.updateMatrixWorld(true);

  // 4. How far the arms must drop from the bind pose (A-pose ≈ 45°, T-pose ≈ 90°) to hang naturally
  const armDir = wp(b.foreL).sub(wp(b.armL)).normalize();
  const fromDown = Math.acos(THREE.MathUtils.clamp(-armDir.y, -1, 1));
  return { armDownAngle: Math.max(0, fromDown - 0.13), bodyScale: entry.heightM / 1.72 };
}

/* ------------------------------------------------------------------------------------------
 * Realism pass (runs ONCE per loaded model; clones share the result):
 * 1. Smooth the faceted low-poly Quaternius surfaces with crease-angle normal smoothing, so
 *    faces, limbs and clothing read as rounded forms instead of flat facets (hard edges such
 *    as shoe soles and collars are kept).
 * 2. Swap flat plastic-looking materials for physically based ones per surface type:
 *    skin (soft sub-surface-like sheen), hair (glossy strands), eyes (wet highlight),
 *    fabric (cloth sheen, high roughness), denim, leather shoes, hard-hat plastic.
 * ---------------------------------------------------------------------------------------- */
const _fa = new THREE.Vector3();
const _fb = new THREE.Vector3();
const _fc = new THREE.Vector3();

/**
 * Crease-angle smoothing across one or more geometries that share a coordinate frame.
 * Vertex count / skin weights stay untouched — only the NORMAL attribute is rewritten.
 */
export function smoothNormalsAcross(geometries, creaseDeg = 60) {
  const cosCrease = Math.cos((creaseDeg * Math.PI) / 180);
  const q = (v) => Math.round(v * 2e4);
  const buckets = new Map(); // posKey -> [{ n: unitFaceNormal, w: area }]
  const vertFaces = []; // per geometry: per vertex list of face indices into faceList
  const faceList = [];
  const vertKeys = [];

  geometries.forEach((geo, gi) => {
    const pos = geo.attributes.position;
    const idx = geo.index;
    const triCount = idx ? idx.count / 3 : pos.count / 3;
    const vf = Array.from({ length: pos.count }, () => []);
    const keys = new Array(pos.count);
    for (let i = 0; i < pos.count; i++) keys[i] = `${q(pos.getX(i))},${q(pos.getY(i))},${q(pos.getZ(i))}`;
    for (let t = 0; t < triCount; t++) {
      const a = idx ? idx.getX(t * 3) : t * 3;
      const b = idx ? idx.getX(t * 3 + 1) : t * 3 + 1;
      const c = idx ? idx.getX(t * 3 + 2) : t * 3 + 2;
      _fa.fromBufferAttribute(pos, a);
      _fb.fromBufferAttribute(pos, b).sub(_fa);
      _fc.fromBufferAttribute(pos, c).sub(_fa);
      const n = new THREE.Vector3().crossVectors(_fb, _fc);
      const area = n.length();
      if (area < 1e-12) continue;
      n.divideScalar(area);
      const face = { n, w: area };
      const fi = faceList.push(face) - 1;
      for (const v of [a, b, c]) {
        vf[v].push(fi);
        let bucket = buckets.get(keys[v]);
        if (!bucket) buckets.set(keys[v], (bucket = new Set()));
        bucket.add(fi);
      }
    }
    vertFaces[gi] = vf;
    vertKeys[gi] = keys;
  });

  const ref = new THREE.Vector3();
  const acc = new THREE.Vector3();
  geometries.forEach((geo, gi) => {
    const pos = geo.attributes.position;
    const out = new Float32Array(pos.count * 3);
    for (let i = 0; i < pos.count; i++) {
      const own = vertFaces[gi][i];
      if (!own.length) continue;
      ref.set(0, 0, 0);
      for (const fi of own) ref.addScaledVector(faceList[fi].n, faceList[fi].w);
      ref.normalize();
      acc.set(0, 0, 0);
      for (const fi of buckets.get(vertKeys[gi][i])) {
        const f = faceList[fi];
        if (f.n.dot(ref) >= cosCrease) acc.addScaledVector(f.n, f.w);
      }
      if (acc.lengthSq() < 1e-16) acc.copy(ref);
      acc.normalize();
      out[i * 3] = acc.x;
      out[i * 3 + 1] = acc.y;
      out[i * 3 + 2] = acc.z;
    }
    geo.setAttribute('normal', new THREE.BufferAttribute(out, 3));
  });
}

const WHITE = new THREE.Color(1, 1, 1);

/** Picks physically based surface settings from a Quaternius material + mesh name. */
function surfaceFor(matName, meshName) {
  if (/^Skin(_Darker)?$/i.test(matName)) return 'skin';
  if (/^Eye$/i.test(matName) || (/Head/.test(meshName) && /^Brown$/.test(matName))) return 'eye';
  if (/^(Hair|Hair_Blond|Hair_Brown|Moustache|Eyebrows)$/i.test(matName)) return 'hair';
  if (/Head/.test(meshName) && /^DarkBrown$/i.test(matName)) return 'hair';
  if (/^Worker_Yellow$/i.test(matName)) return 'plastic';
  if (/Head/.test(meshName) && /^(Beige|Red)$/i.test(matName)) return 'straw';
  if (/Feet/.test(meshName)) return /^(White|Grey)$/i.test(matName) ? 'sneaker' : 'leather';
  if (/^LightBlue$/i.test(matName)) return 'denim';
  if (/^(Suit|Black)$/i.test(matName)) return 'wool';
  return 'cloth';
}

function makeRealMaterial(src, surface) {
  const m = new THREE.MeshPhysicalMaterial({
    name: src.name,
    color: src.color.clone(),
    side: src.side,
    transparent: src.transparent,
    opacity: src.opacity,
    metalness: 0,
  });
  m.userData.surface = surface;
  switch (surface) {
    case 'skin':
      // Lifelike skin: matte-satin with a warm scattered sheen at grazing angles
      m.color.lerp(new THREE.Color(0xc99a7e), 0.18);
      m.roughness = 0.5;
      m.sheen = 0.22;
      m.sheenRoughness = 0.5;
      m.sheenColor.set(0xff9a80);
      m.specularIntensity = 0.45;
      break;
    case 'eye':
      // The painted eye block now frames the real eyeball as a soft lash-line / lid shadow
      m.color.set(0x4a3122);
      m.roughness = 0.6;
      break;
    case 'hair':
      m.roughness = 0.42;
      m.sheen = 0.9;
      m.sheenRoughness = 0.3;
      m.userData.sheenFromColor = 0.55;
      break;
    case 'plastic':
      m.roughness = 0.32;
      m.clearcoat = 0.6;
      m.clearcoatRoughness = 0.2;
      break;
    case 'straw':
      m.roughness = 0.9;
      m.sheen = 0.4;
      m.sheenRoughness = 0.7;
      m.userData.sheenFromColor = 0.45;
      break;
    case 'leather':
      m.roughness = 0.45;
      m.clearcoat = 0.35;
      m.clearcoatRoughness = 0.35;
      break;
    case 'sneaker':
      m.roughness = 0.7;
      m.sheen = 0.3;
      m.sheenRoughness = 0.6;
      m.userData.sheenFromColor = 0.5;
      break;
    case 'denim':
      m.roughness = 0.93;
      m.specularIntensity = 0.35;
      m.sheen = 0.4;
      m.sheenRoughness = 0.65;
      m.userData.sheenFromColor = 0.4;
      break;
    case 'wool':
      m.roughness = 0.82;
      m.specularIntensity = 0.5;
      m.sheen = 0.45;
      m.sheenRoughness = 0.6;
      m.userData.sheenFromColor = 0.5;
      break;
    default: // cotton / knit cloth
      m.roughness = 0.9;
      m.specularIntensity = 0.35;
      m.sheen = 0.4;
      m.sheenRoughness = 0.75;
      m.userData.sheenFromColor = 0.42;
  }
  syncSheen(m);
  return m;
}

/** Cloth & hair sheen follows the (re)coloured base colour so recolouring stays natural. */
function syncSheen(m) {
  const k = m.userData?.sheenFromColor;
  if (k == null || !m.sheenColor) return;
  m.sheenColor.copy(m.color).lerp(WHITE, k).multiplyScalar(0.5);
}

/**
 * Finds the two painted eye blocks of a Quaternius head (in bind pose, model space).
 * Men use an 'Eye' material; women share one 'Brown' material between eyes and brows,
 * so per side we keep only the lower cluster.
 */
function findQuaterniusEyes(scene) {
  // Men: 'Eye' material; women: 'Brown' on the head. Each eye is a small slanted block.
  let eyeObj = null;
  for (const re of [/^Eye$/i, /^Brown$/]) {
    scene.traverse((obj) => {
      if (eyeObj || !obj.isMesh || !/Head/.test(obj.name || '')) return;
      if (re.test(obj.material?.name || '')) eyeObj = obj;
    });
    if (eyeObj) break;
  }
  if (!eyeObj || eyeObj.geometry.attributes.position.count > 200) return null;
  const pos = eyeObj.geometry.attributes.position;
  const sides = { L: [], R: [] };
  for (let i = 0; i < pos.count; i++) {
    const v = new THREE.Vector3().fromBufferAttribute(pos, i).applyMatrix4(eyeObj.matrixWorld);
    sides[v.x >= 0 ? 'L' : 'R'].push(v);
  }
  const out = [];
  for (const side of ['L', 'R']) {
    const pts = sides[side];
    if (pts.length < 8) return null;
    const box = new THREE.Box3().setFromPoints(pts);
    const size = box.getSize(new THREE.Vector3());
    // Front face = the 4 unique corners nearest the camera (+Z)
    const uniq = [];
    for (const p of pts) if (!uniq.some((u) => u.distanceToSquared(p) < 1e-8)) uniq.push(p);
    const front = uniq.sort((p, q) => q.z - p.z).slice(0, 4);
    const center = front.reduce((acc, p) => acc.add(p), new THREE.Vector3()).divideScalar(front.length);
    const inner = front.reduce((m, p) => (Math.abs(p.x) < Math.abs(m.x) ? p : m));
    const outer = front.reduce((m, p) => (Math.abs(p.x) > Math.abs(m.x) ? p : m));
    const t = new THREE.Vector3().subVectors(outer, inner);
    if (side === 'R') t.negate();
    const yaw = Math.atan2(-t.z, t.x); // facing direction follows the curve of the face
    out.push({ side, center, yaw: Number.isFinite(yaw) ? yaw : 0, w: size.x, h: size.y });
  }
  return out;
}

const IRIS_COLORS = [0x7a4e2c, 0x5e3b22, 0x8a5e34, 0x4d321e, 0x5d86ad, 0x6f8f55, 0x96703f];
const irisMatCache = new Map();
let scleraMat = null;
function irisMaterial(hex) {
  if (irisMatCache.has(hex)) return irisMatCache.get(hex);
  const cv = document.createElement('canvas');
  cv.width = cv.height = 64;
  const g = cv.getContext('2d');
  const col = new THREE.Color(hex);
  const css = (c, k = 1) => `rgb(${Math.round(c.r * 255 * k)},${Math.round(c.g * 255 * k)},${Math.round(c.b * 255 * k)})`;
  const grad = g.createRadialGradient(32, 32, 4, 32, 32, 32);
  grad.addColorStop(0, css(col, 0.55));
  grad.addColorStop(0.55, css(col, 1.15));
  grad.addColorStop(0.88, css(col, 0.8));
  grad.addColorStop(1, css(col, 0.35)); // dark limbal ring
  g.fillStyle = grad;
  g.beginPath();
  g.arc(32, 32, 32, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#080605';
  g.beginPath();
  g.arc(32, 32, 11, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = 'rgba(255,255,255,0.85)'; // catch-light
  g.beginPath();
  g.arc(24, 23, 5, 0, Math.PI * 2);
  g.fill();
  const tex = new THREE.CanvasTexture(cv);
  tex.colorSpace = THREE.SRGBColorSpace;
  const m = new THREE.MeshPhysicalMaterial({ map: tex, roughness: 0.25, clearcoat: 1, clearcoatRoughness: 0.03 });
  m.userData.shared = true;
  m.userData.sharedMap = true;
  irisMatCache.set(hex, m);
  return m;
}

/** Real eyes (sclera + iris + pupil with a wet highlight) laid over the painted eye blocks. */
function buildEyeOverlay(spec, irisHex) {
  if (!scleraMat) {
    scleraMat = new THREE.MeshPhysicalMaterial({ color: 0xeee6dc, roughness: 0.3, clearcoat: 1, clearcoatRoughness: 0.05 });
    scleraMat.userData.shared = true;
  }
  const scleras = [];
  const irises = [];
  const rot = new THREE.Matrix4();
  for (const e of spec) {
    // Almond-shaped opening: the dark painted block peeks out above/below like lids & lashes
    const rx = e.w * 0.5;
    const ry = e.h * 0.34;
    const rz = ry * 0.6;
    const sc = new THREE.SphereGeometry(1, 18, 10);
    sc.scale(rx, ry, rz);
    sc.translate(0, 0, -rz * 0.2);
    const ir = ry * 0.97;
    const iris = new THREE.CircleGeometry(ir, 22);
    iris.translate(-Math.sign(e.center.x) * rx * 0.06, 0, rz * 0.8 + 0.0003);
    rot.makeRotationY(e.yaw).setPosition(e.center.x, e.center.y + e.h * 0.04, e.center.z);
    sc.applyMatrix4(rot);
    iris.applyMatrix4(rot);
    scleras.push(sc);
    irises.push(iris);
  }
  const g = new THREE.Group();
  const sclera = new THREE.Mesh(mergeGeometries(scleras), scleraMat);
  const iris = new THREE.Mesh(mergeGeometries(irises), irisMaterial(irisHex));
  for (const m of [sclera, iris]) {
    m.userData.isEyeOverlay = true;
    m.castShadow = false;
    g.add(m);
  }
  scleras.concat(irises).forEach((x) => x.dispose());
  return g;
}

function applyRealismPass(scene, rig) {
  scene.updateMatrixWorld(true);
  let eyes = null;
  if (rig === 'quaternius') {
    eyes = findQuaterniusEyes(scene);
    // Smooth each multi-primitive mesh as one surface so material seams (cuff → wrist) blend
    const groups = new Map();
    scene.traverse((obj) => {
      if (!obj.isMesh || !obj.geometry?.attributes?.position) return;
      const k = obj.parent?.uuid || obj.uuid;
      if (!groups.has(k)) groups.set(k, []);
      groups.get(k).push(obj);
    });
    for (const objs of groups.values()) {
      const isHead = objs.some((o) => /Head/.test(o.name || ''));
      // Faces get a much softer crease so cheeks, nose & jaw read as rounded forms…
      smoothNormalsAcross(objs.map((o) => o.geometry), isHead ? 85 : 58);
      // …while sculpted hair keeps its strand-clump edges
      const hairGeos = objs
        .filter((o) => surfaceFor(o.material?.name || '', o.name || '') === 'hair' && o.geometry.attributes.position.count > 200)
        .map((o) => o.geometry);
      if (hairGeos.length) smoothNormalsAcross(hairGeos, 50);
    }

    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const swap = (mat) => (mat && mat.color ? makeRealMaterial(mat, surfaceFor(mat.name || '', obj.name || '')) : mat);
      obj.material = Array.isArray(obj.material) ? obj.material.map(swap) : swap(obj.material);
    });
  } else if (rig === 'metahuman') {
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      const label = `${obj.name} ${mats.map((m) => m?.name || '').join(' ')}`;
      // Unreal-only translucent helper layers render as grey films outside Unreal → hide them
      if (/eye_?shell|eye_?edge|eye_?occlusion|cartilage|saliva|lacrimal/i.test(label)) {
        obj.visible = false;
        return;
      }
      obj.castShadow = true;
      obj.receiveShadow = true;
      for (const m of mats) {
        if (!m) continue;
        // Hair cards, lashes & brows: alpha-tested (no sorting artefacts), visible from both sides
        if (/hair|lash|brow|beard|mustache|fuzz|card|groom/i.test(label) || m.alphaTest > 0 || m.transparent) {
          m.transparent = false;
          m.alphaTest = Math.max(m.alphaTest || 0, 0.42);
          m.depthWrite = true;
          m.side = THREE.DoubleSide;
          m.roughness = Math.min(m.roughness ?? 0.5, 0.5);
        }
        if (/skin|head|face|body/i.test(m.name || '')) m.roughness = THREE.MathUtils.clamp(m.roughness ?? 0.55, 0.45, 0.65);
        m.metalness = Math.min(m.metalness ?? 0, 0.05);
      }
    });
  } else {
    // Textured RPM / Mixamo models: tune skin & eyes, leave baked textures alone
    scene.traverse((obj) => {
      if (!obj.isMesh) return;
      const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
      for (const m of mats) {
        if (!m) continue;
        if (/Skin|Body/i.test(m.name || '')) {
          m.roughness = Math.max(0.55, Math.min(m.roughness ?? 0.6, 0.65));
        } else if (/Eye/i.test(m.name || '')) {
          m.roughness = 0.1;
        }
      }
    });
  }
  return eyes;
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
  if (info?.hinge) {
    info.bone.quaternion.copy(info.bindQ);
    _tmpQuat.setFromAxisAngle(info.hinge, bend);
    info.bone.quaternion.multiply(_tmpQuat);
    return;
  }
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
    // VRoid characters keep their own cartoon (MToon) materials untouched
    if (rig === 'vrm') return;

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
      syncSheen(m);
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
  // MetaHuman & VRoid characters share Unreal bone names and arrive pre-sized / pre-oriented
  const isUE = rig === 'metahuman' || rig === 'vrm';
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
    hips: captureBoneAxes(pick('Hips', 'mixamorigHips', 'pelvis')),
    spine: captureBoneAxes(pick('Torso', 'Spine1', 'mixamorigSpine1', 'Spine', 'spine_03')),
    chest: captureBoneAxes(pick('Chest', 'Spine2', 'mixamorigSpine2', 'spine_05', 'spine_04')),
    head: captureBoneAxes(pick('Head', 'mixamorigHead', 'head')),
    uArmL: captureBoneAxes(pick('UpperArmL', 'LeftArm', 'mixamorigLeftArm', 'upperarm_l')),
    lArmL: captureBoneAxes(pick('LowerArmL', 'LeftForeArm', 'mixamorigLeftForeArm', 'lowerarm_l')),
    uArmR: captureBoneAxes(pick('UpperArmR', 'RightArm', 'mixamorigRightArm', 'upperarm_r')),
    lArmR: captureBoneAxes(pick('LowerArmR', 'RightForeArm', 'mixamorigRightForeArm', 'lowerarm_r')),
    uLegL: captureBoneAxes(pick('UpperLegL', 'LeftUpLeg', 'mixamorigLeftUpLeg', 'thigh_l')),
    lLegL: captureBoneAxes(pick('LowerLegL', 'LeftLeg', 'mixamorigLeftLeg', 'calf_l')),
    footL: captureBoneAxes(pick('FootL', 'LeftFoot', 'mixamorigLeftFoot', 'foot_l')),
    uLegR: captureBoneAxes(pick('UpperLegR', 'RightUpLeg', 'mixamorigRightUpLeg', 'thigh_r')),
    lLegR: captureBoneAxes(pick('LowerLegR', 'RightLeg', 'mixamorigRightLeg', 'calf_r')),
    footR: captureBoneAxes(pick('FootR', 'RightFoot', 'mixamorigRightFoot', 'foot_r')),
    handL: captureBoneAxes(pick('HandL', 'LeftHand', 'mixamorigLeftHand', 'hand_l')),
    handR: captureBoneAxes(pick('HandR', 'RightHand', 'mixamorigRightHand', 'hand_r')),
  };

  // Finger chains. Bone names differ per rig:
  // Quaternius "Index2L…Index4L" (men) / "Index1L…Index3L" (women); RPM "LeftHandIndex1…4";
  // Mixamo "mixamorigLeftHandIndex1…4"; Unreal / MetaHuman "index_01_l…index_03_l".
  const fingerChains = { L: [], R: [] };
  for (const side of ['L', 'R']) {
    const long = side === 'L' ? 'Left' : 'Right';
    const ue = side.toLowerCase();
    for (const finger of ['Thumb', 'Index', 'Middle', 'Ring', 'Pinky']) {
      const chain = [];
      for (let n = 1; n <= 4; n++) {
        const b = pick(`${finger}${n}${side}`, `${long}Hand${finger}${n}`, `mixamorig${long}Hand${finger}${n}`, `${finger.toLowerCase()}_0${n}_${ue}`);
        // Skip end/tip helper bones (no children) — except Unreal, whose last knuckle is a leaf
        if (b && (b.children.length || isUE)) chain.push(captureBoneAxes(b));
      }
      if (chain.length) fingerChains[side].push({ finger, chain });
    }
  }

  // Per-rig curl hinges, measured from the bind pose so every skeleton (T-pose, A-pose,
  // palms down or in) curls its fingers toward the PALM, never sideways into a claw.
  const wpos = (bone) => bone.getWorldPosition(new THREE.Vector3());
  const toLocalAxis = (info, v) =>
    new THREE.Vector3().addScaledVector(info.axX, v.x).addScaledVector(info.axY, v.y).addScaledVector(info.axZ, v.z).normalize();
  const palm = { L: null, R: null };
  for (const side of ['L', 'R']) {
    const hand = side === 'L' ? rigBones.handL : rigBones.handR;
    const base = (name) => fingerChains[side].find((f) => f.finger === name)?.chain[0]?.bone;
    const idx = base('Index');
    const mid = base('Middle') || idx;
    const pky = base('Pinky') || base('Ring');
    if (!hand || !idx || !mid || !pky) continue;
    const along = wpos(mid).sub(wpos(hand.bone));
    const across = wpos(idx).sub(wpos(pky));
    const n = side === 'L' ? new THREE.Vector3().crossVectors(along, across) : new THREE.Vector3().crossVectors(across, along);
    palm[side] = { normal: n.normalize(), along: along.normalize() };
    for (const { finger, chain } of fingerChains[side]) {
      let prevDir = along.clone();
      chain.forEach((info, j) => {
        const child = info.bone.children.find((c) => c.isBone);
        const dir = child ? wpos(child).sub(wpos(info.bone)).normalize() : prevDir.clone();
        prevDir = dir;
        // Thumb: flex toward the palm AND toward the index finger so it rests alongside it
        const toward = finger === 'Thumb' ? palm[side].normal.clone().add(palm[side].along).normalize() : palm[side].normal;
        const hinge = new THREE.Vector3().crossVectors(dir, toward);
        if (hinge.lengthSq() < 1e-8) return;
        info.curlAxis = toLocalAxis(info, hinge.normalize());
        void j;
      });
    }
  }

  // Blinking for characters that ship an eyes-closed shape (VRoid "Fcl_EYE_Close", ARKit "eyeBlink…")
  const blinkTargets = [];
  model.traverse((o) => {
    const dict = o.morphTargetDictionary;
    if (!o.isMesh || !dict || !o.morphTargetInfluences) return;
    for (const [name, idx] of Object.entries(dict)) {
      if (/^(Fcl_EYE_Close|blink|Blink|eyesClosed|eyeBlink(Left|Right|_L|_R)?)$/.test(name)) blinkTargets.push([o, idx]);
    }
  });
  let blinkClock = 1 + ((timeOffset * 1.7) % 3);

  // VRoid: per-copy hair/skirt physics and twist constraints, initialised in the bind pose
  const vrmRuntime = rig === 'vrm' ? cloneVrmRuntime(gltf.userData.vrm, gltf.scene, model) : null;
  if (vrmRuntime) {
    model.updateMatrixWorld(true);
    vrmRuntime.constraints?.setInitState();
    vrmRuntime.springs?.setInitState();
  }

  // Lifelike eyes for the Quaternius heads (attached in bind pose so they ride the head bone)
  if (entry.eyes && rigBones.head?.bone) {
    const irisHex = IRIS_COLORS[Math.abs(Math.floor((timeOffset * 7.31 + (scale || 1) * 13 + entry.key.length) * 101)) % IRIS_COLORS.length];
    const eyeGroup = buildEyeOverlay(entry.eyes, irisHex);
    model.add(eyeGroup);
    model.updateMatrixWorld(true);
    rigBones.head.bone.attach(eyeGroup);
  }

  const rightHandBone = pick('HandR', 'RightHand', 'mixamorigRightHand', 'hand_r');
  const rightArmBone = pick('UpperArmR', 'RightArm', 'mixamorigRightArm', 'upperarm_r');

  // Arm drop from bind T-pose down to relaxed sides:
  // Quaternius & Mixamo bind poses are horizontal T-pose (~1.28 rad down); RPM is A-pose (~0.35 rad down)
  const armDownAngle = isUE ? entry.armDownAngle : rig === 'rpm' ? 0.5 : 1.44;
  // MetaHumans arrive already sized to their manifest height; others are sized by `scale`
  const bodyScale = isUE ? entry.bodyScale : scale;

  // A-pose rigs (MetaHuman): the elbow hinge is perpendicular to the bind-pose arm and to
  // "forward", not simply the vertical axis used for T-pose rigs
  if (isUE) {
    for (const [up, lo] of [[rigBones.uArmL, rigBones.lArmL], [rigBones.uArmR, rigBones.lArmR]]) {
      if (!up || !lo) continue;
      const d = lo.bone.getWorldPosition(new THREE.Vector3()).sub(up.bone.getWorldPosition(new THREE.Vector3())).normalize();
      const hinge = new THREE.Vector3().crossVectors(d, WORLD_Z).normalize();
      lo.hinge = new THREE.Vector3()
        .addScaledVector(lo.axX, hinge.x)
        .addScaledVector(lo.axY, hinge.y)
        .addScaledVector(lo.axZ, hinge.z)
        .normalize();
    }
  }

  // Normalize scale so scale=1.0 is ~1.72m tall
  const rawScale = isUE ? 1 : rig === 'quaternius' ? 0.93 * scale : scale;
  model.scale.set(rawScale * widthScale, rawScale, rawScale * widthScale);
  wrapper.add(model);

  // Hand shapes (radians per knuckle: base → middle → tip). Real relaxed hands curl a little,
  // and progressively more from index to pinky ("finger cascade").
  const RELAXED = [0.2, 0.3, 0.18];
  const CUPPED = [0.38, 0.5, 0.3];
  const CASCADE = { Index: 0.75, Middle: 1, Ring: 1.15, Pinky: 1.3 };
  const curlBone = (info, angle) => {
    info.bone.quaternion.copy(info.bindQ);
    if (info.curlAxis && angle) {
      _tmpQuat.setFromAxisAngle(info.curlAxis, angle);
      info.bone.quaternion.multiply(_tmpQuat);
    }
  };
  // amount: 0 = flat/open, 0.5 = relaxed (standing, resting), 1 = loosely cupped (walking)
  const applyHands = (amount) => {
    const t = Math.min(1, amount * 2);
    const u = Math.max(0, amount * 2 - 1);
    for (const side of ['L', 'R']) {
      for (const { finger, chain } of fingerChains[side]) {
        chain.forEach((info, j) => {
          const k = Math.min(j, 2);
          if (finger === 'Thumb') {
            curlBone(info, (j === 0 ? 0.12 : 0.18) * t + 0.08 * u);
          } else {
            const base = RELAXED[k] * t + (CUPPED[k] - RELAXED[k]) * u;
            curlBone(info, base * (CASCADE[finger] || 1));
          }
        });
      }
    }
  };

  /* ---- Seated arms: 2-bone IK so hands REST on the thighs (any rig, any body size) ---- */
  const _ikA = new THREE.Vector3();
  const _ikB = new THREE.Vector3();
  const _ikC = new THREE.Vector3();
  const _ikQ = new THREE.Quaternion();
  const _ikQ2 = new THREE.Quaternion();
  const rotateBoneWorld = (bone, worldQ) => {
    // bone.world = parent.world * local  →  local' = parent⁻¹ * q * parent * local
    bone.parent.getWorldQuaternion(_ikQ2);
    const inv = _ikQ2.clone().invert();
    bone.quaternion.premultiply(inv.multiply(worldQ).multiply(_ikQ2));
    bone.updateMatrixWorld(true);
  };
  const solveArmIK = (up, lo, hand, target, pole) => {
    if (!up || !lo || !hand) return;
    const S = up.bone.getWorldPosition(new THREE.Vector3());
    const E = lo.bone.getWorldPosition(new THREE.Vector3());
    const W = hand.bone.getWorldPosition(new THREE.Vector3());
    const a = S.distanceTo(E);
    const b = E.distanceTo(W);
    const c = THREE.MathUtils.clamp(S.distanceTo(target), Math.abs(a - b) + 1e-3, a + b - 1e-3);
    // 1) Elbow: bend so shoulder→wrist distance equals shoulder→target distance
    const curInner = _ikA.subVectors(S, E).angleTo(_ikB.subVectors(W, E));
    const wantInner = Math.acos(THREE.MathUtils.clamp((a * a + b * b - c * c) / (2 * a * b), -1, 1));
    const hingeW = _ikC.crossVectors(_ikA, _ikB).normalize();
    if (hingeW.lengthSq() > 0.5) rotateBoneWorld(lo.bone, _ikQ.setFromAxisAngle(hingeW, wantInner - curInner));
    // 2) Shoulder: aim the shoulder→wrist line at the target
    const W2 = hand.bone.getWorldPosition(new THREE.Vector3());
    rotateBoneWorld(up.bone, _ikQ.setFromUnitVectors(W2.sub(S).normalize(), _ikA.subVectors(target, S).normalize()));
    // 3) Twist about that line so the elbow points toward the pole (out & back, like a real elbow)
    const axis = _ikA.subVectors(target, S).normalize();
    const E2 = lo.bone.getWorldPosition(new THREE.Vector3()).sub(S);
    const e = E2.addScaledVector(axis, -E2.dot(axis));
    const p = pole.clone().addScaledVector(axis, -pole.dot(axis));
    if (e.lengthSq() > 1e-8 && p.lengthSq() > 1e-8) {
      let ang = e.angleTo(p);
      if (new THREE.Vector3().crossVectors(e, p).dot(axis) < 0) ang = -ang;
      rotateBoneWorld(up.bone, _ikQ.setFromAxisAngle(axis, ang));
    }
  };
  const palmWorld = (side) => {
    const hand = side === 'L' ? rigBones.handL : rigBones.handR;
    const base = (name) => fingerChains[side].find((f) => f.finger === name)?.chain[0]?.bone;
    const idx = base('Index');
    const mid = base('Middle') || idx;
    const pky = base('Pinky') || base('Ring');
    if (!hand || !idx || !pky) return null;
    const along = wpos(mid).sub(wpos(hand.bone));
    const across = wpos(idx).sub(wpos(pky));
    const n = side === 'L' ? new THREE.Vector3().crossVectors(along, across) : new THREE.Vector3().crossVectors(across, along);
    return { normal: n.normalize(), along: along.normalize() };
  };
  const restHandsOnThighs = (lift) => {
    wrapper.updateMatrixWorld(true);
    const toWorld = (v) => v.applyQuaternion(wrapper.getWorldQuaternion(new THREE.Quaternion()));
    for (const side of ['L', 'R']) {
      const up = side === 'L' ? rigBones.uArmL : rigBones.uArmR;
      const lo = side === 'L' ? rigBones.lArmL : rigBones.lArmR;
      const hand = side === 'L' ? rigBones.handL : rigBones.handR;
      const thigh = side === 'L' ? rigBones.uLegL : rigBones.uLegR;
      const calf = side === 'L' ? rigBones.lLegL : rigBones.lLegR;
      if (!up || !lo || !hand || !thigh || !calf) continue;
      const hip = wpos(thigh.bone);
      const knee = wpos(calf.bone);
      const thighLen = hip.distanceTo(knee);
      // Wrist sits ~40% down the thigh, on top of it and a touch toward the inside
      const target = hip.clone().lerp(knee, 0.4);
      const sx = side === 'L' ? 1 : -1;
      target.add(toWorld(new THREE.Vector3(-sx * thighLen * 0.06, thighLen * (0.2 + (side === 'R' ? lift : 0)), 0)));
      const pole = toWorld(new THREE.Vector3(sx * 0.7, -0.2, -1).normalize());
      solveArmIK(up, lo, hand, target, pole);
      // Palm down on the thigh, fingers pointing toward the knee
      lo.bone.updateMatrixWorld(true);
      const pw = palmWorld(side);
      if (pw) {
        const down = toWorld(new THREE.Vector3(0, -1, 0));
        const fwd = toWorld(new THREE.Vector3(sx * -0.15, -0.25, 1).normalize());
        const q1 = new THREE.Quaternion().setFromUnitVectors(pw.normal, down);
        const along2 = pw.along.clone().applyQuaternion(q1);
        const fwdFlat = fwd.clone().addScaledVector(down, -fwd.dot(down)).normalize();
        const alongFlat = along2.addScaledVector(down, -along2.dot(down)).normalize();
        let yaw = alongFlat.angleTo(fwdFlat);
        if (new THREE.Vector3().crossVectors(alongFlat, fwdFlat).dot(down) < 0) yaw = -yaw;
        const q = new THREE.Quaternion().setFromAxisAngle(down, yaw).multiply(q1);
        // Split the turn between forearm (pronation) and wrist so the skin doesn't candy-wrap
        const half = new THREE.Quaternion().slerp(q, 0.5);
        rotateBoneWorld(lo.bone, half);
        const pw2 = palmWorld(side);
        if (pw2) {
          const r1 = new THREE.Quaternion().setFromUnitVectors(pw2.normal, down);
          const a2 = pw2.along.clone().applyQuaternion(r1);
          const af = a2.addScaledVector(down, -a2.dot(down)).normalize();
          let y2 = af.angleTo(fwdFlat);
          if (new THREE.Vector3().crossVectors(af, fwdFlat).dot(down) < 0) y2 = -y2;
          rotateBoneWorld(hand.bone, new THREE.Quaternion().setFromAxisAngle(down, y2).multiply(r1));
        }
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
      model.position.set(0, -0.38 * bodyScale, 0);
      setBoneRot(rigBones.uLegL, -1.46, 0, 0);
      setBoneRot(rigBones.uLegR, -1.46, 0, 0);
      setBoneRot(rigBones.lLegL, 1.44, 0, 0);
      setBoneRot(rigBones.lLegR, 1.44, 0, 0);
      setBoneRot(rigBones.footL, 0, 0, 0);
      setBoneRot(rigBones.footR, 0, 0, 0);
      // Start from relaxed hanging arms, then IK the hands onto the thighs
      setBoneRot(rigBones.uArmL, -0.3, 0, -armDownAngle);
      setBoneRot(rigBones.uArmR, -0.3, 0, armDownAngle);
      setElbowBend(rigBones.lArmL, 0.9, 1);
      setElbowBend(rigBones.lArmR, 0.9, -1);
      setBoneRot(rigBones.handL, 0, 0, 0);
      setBoneRot(rigBones.handR, 0, 0, 0);
      setBoneRot(rigBones.spine, 0.06, 0, 0);
      setBoneRot(rigBones.head, 0.08 + Math.sin(phase * 0.9) * 0.05, Math.sin(phase * 0.65) * 0.18, 0);
      applyHands(0.32); // fingers lie mostly flat on the thigh
      // Occasional small gesture with the right hand (lifts off the thigh, then settles)
      const gesture = Math.max(0, Math.sin(phase * 0.35)) ** 8;
      restHandsOnThighs(gesture * 0.35);
      return;
    }

    if (animState === 'lie') {
      // Lie flat on back on top of the mattress with head resting on pillow!
      model.rotation.x = -Math.PI / 2;
      model.position.set(0, 0.14 * bodyScale, 0.82 * bodyScale);
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
      applyHands(0.45);
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
    // Hands relaxed in line with the forearm, palms turned toward the thighs (measured per rig)
    if (handFix.L) rigBones.handL.bone.quaternion.copy(rigBones.handL.bindQ).multiply(handFix.L);
    else setBoneRot(rigBones.handL, 0, 0, -0.12);
    if (handFix.R) rigBones.handR.bone.quaternion.copy(rigBones.handR.bindQ).multiply(handFix.R);
    else setBoneRot(rigBones.handR, 0, 0, 0.12);
    // Relaxed hands when standing, loosely cupped when walking
    applyHands(0.5 + 0.35 * w);

    // Natural subtle torso counter-twist & steady head
    setBoneRot(rigBones.spine, 0.03 * w, s * 0.07 * w, 0);
    setBoneRot(rigBones.head, 0, -s * 0.04 * w + Math.sin(phase * 0.45) * 0.06 * (1 - w), 0);
  };

  // Measure once: which wrist rotation makes each palm face its thigh with fingers hanging down?
  // (T-pose, A-pose and palms-forward rigs all end up with the same natural hand.)
  const handFix = { L: null, R: null };
  if (!seated) {
    applyPose();
    model.updateMatrixWorld(true);
    for (const side of ['L', 'R']) {
      const hand = side === 'L' ? rigBones.handL : rigBones.handR;
      const pw = palmWorld(side);
      if (!hand || !pw) continue;
      const sx = side === 'L' ? 1 : -1;
      const wantN = new THREE.Vector3(-sx, 0, -0.2).normalize();
      const wantA = new THREE.Vector3(0, -1, 0.08).normalize();
      const q1 = new THREE.Quaternion().setFromUnitVectors(pw.normal, wantN);
      const a1 = pw.along.clone().applyQuaternion(q1).addScaledVector(wantN, -pw.along.clone().applyQuaternion(q1).dot(wantN)).normalize();
      const aW = wantA.clone().addScaledVector(wantN, -wantA.dot(wantN)).normalize();
      let tw = a1.angleTo(aW);
      if (new THREE.Vector3().crossVectors(a1, aW).dot(wantN) < 0) tw = -tw;
      const q = new THREE.Quaternion().setFromAxisAngle(wantN, tw).multiply(q1);
      rotateBoneWorld(hand.bone, q);
      handFix[side] = hand.bindQ.clone().invert().multiply(hand.bone.quaternion);
    }
  }
  applyPose();
  // VRoid: start hair/skirt physics from the posed character (not the T-pose) and let it settle,
  // so nobody appears with hair flying sideways on their first frame
  if (vrmRuntime) {
    wrapper.updateMatrixWorld(true);
    vrmRuntime.constraints?.update();
    wrapper.updateMatrixWorld(true);
    vrmRuntime.springs?.setInitState();
    for (let i = 0; i < 45; i++) vrmRuntime.springs?.update(1 / 60);
  }

  const setAnimState = (nextState, speed = null) => {
    animState = nextState;
    if (speed !== null && Number.isFinite(speed)) {
      walkSpeed = speed;
    }
  };

  const updateBlink = (dt) => {
    if (!blinkTargets.length) return;
    blinkClock -= dt;
    // A blink takes ~0.15 s; next one in 2–5 s
    const t = blinkClock < 0 ? Math.min(1, -blinkClock / 0.15) : 0;
    const w = t > 0 ? Math.sin(t * Math.PI) : 0;
    for (const [mesh, idx] of blinkTargets) mesh.morphTargetInfluences[idx] = w;
    if (t >= 1) blinkClock = 2 + Math.random() * 3;
  };

  const lastPos = new THREE.Vector3(NaN, 0, 0);
  const lastQuat = new THREE.Quaternion();
  const curPos = new THREE.Vector3();
  const curQuat = new THREE.Quaternion();
  const updateVrm = (dt) => {
    if (!vrmRuntime) return;
    wrapper.updateMatrixWorld(true);
    vrmRuntime.constraints?.update();
    if (vrmRuntime.springs) {
      // Teleports (spawning, entering a building, respawn) would fling the hair → snap it back
      wrapper.getWorldPosition(curPos);
      wrapper.getWorldQuaternion(curQuat);
      const jumped = !Number.isFinite(lastPos.x) || curPos.distanceTo(lastPos) > 1.2 || curQuat.angleTo(lastQuat) > 1.2;
      lastPos.copy(curPos);
      lastQuat.copy(curQuat);
      if (jumped) {
        vrmRuntime.springs.setInitState();
        for (let i = 0; i < 20; i++) vrmRuntime.springs.update(1 / 60);
      } else {
        vrmRuntime.springs.update(Math.min(dt, 0.05));
      }
    }
  };

  const updateAnim = (dt) => {
    updateBlink(dt);
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
    updateVrm(dt);
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
    if (obj.userData.isEyeOverlay) return;
    if (/Headwear|Beard/i.test(obj.name)) return;
    const matName = (Array.isArray(obj.material) ? obj.material[0] : obj.material)?.name || '';
    const isEye =
      /Eye(Left|Right)?$/i.test(obj.name) ||
      /^(Eye|Wolf3D_Eye)$/i.test(matName) ||
      ((ud.rig === 'metahuman' || ud.rig === 'vrm') && /eye(?!lash|brow|shell|edge|_?occlusion)/i.test(matName)) ||
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
    smoothNormalsAcross([g], 58);
    const mat = (Array.isArray(obj.material) ? obj.material[0] : obj.material).clone();
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

function fabricMat(color, roughness = 0.88) {
  const m = new THREE.MeshPhysicalMaterial({ color, roughness, sheen: 0.9, sheenRoughness: 0.7 });
  m.sheenColor.copy(m.color).lerp(WHITE, 0.4).multiplyScalar(0.5);
  return m;
}

function buildBackpack(m, color) {
  const g = new THREE.Group();
  const main = fabricMat(color, 0.86);
  const dark = fabricMat(shade(color, 0.72), 0.9);
  const w = 0.28;
  const h = 0.34;
  const d = 0.13;
  // Soft, padded nylon body (rounded edges) instead of a hard box
  const body = new THREE.Mesh(new RoundedBoxGeometry(w, h, d, 4, 0.045), main);
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
  const pocket = new THREE.Mesh(new RoundedBoxGeometry(w * 0.72, h * 0.4, 0.05, 3, 0.02), dark);
  pocket.position.set(0, -h * 0.18, -d / 2 - 0.018);
  g.add(pocket);
  const flap = new THREE.Mesh(new RoundedBoxGeometry(w * 0.96, 0.05, d * 1.05, 3, 0.022), dark);
  flap.position.set(0, h / 2 - 0.01, 0);
  g.add(flap);
  // Metal zipper pull on the front pocket + grab loop on top
  const metal = new THREE.MeshStandardMaterial({ color: 0xb8bcc2, metalness: 0.9, roughness: 0.3 });
  const pull = new THREE.Mesh(new RoundedBoxGeometry(0.012, 0.03, 0.006, 2, 0.003), metal);
  pull.position.set(w * 0.2, -h * 0.02, -d / 2 - 0.046);
  g.add(pull);
  const loop = new THREE.Mesh(new THREE.TorusGeometry(0.03, 0.007, 6, 14, Math.PI), dark);
  loop.position.set(0, h / 2 + 0.015, 0);
  g.add(loop);
  for (const sx of [-1, 1]) {
    const strap = new THREE.Mesh(new RoundedBoxGeometry(0.045, 0.03, 0.16, 2, 0.01), dark);
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

/* ------------------------------------------------------------------------------------------
 * Held stick + overhead diagonal strike
 * The stick is fitted INTO the fist: its axis runs along the knuckle line (pinky → index),
 * centred in the palm, so it rotates naturally with the wrist. The swing is keyframed:
 *   ready → wind-up (stick raised above the right shoulder, tip pointing up/back)
 *   → strike (tip chops diagonally down across the body to lower-left) → recover.
 * ---------------------------------------------------------------------------------------- */
function pickBone(ud, ...names) {
  for (const n of names) if (ud.bonesByName[n]) return ud.bonesByName[n];
  return null;
}

export function attachStickToHand(wrapper, { length = 0.9 } = {}) {
  const ud = wrapper?.userData;
  if (!ud?.isRealisticGlb) return null;
  const hand = pickBone(ud, 'HandR', 'RightHand', 'mixamorigRightHand');
  const index = pickBone(ud, 'Index1R', 'Index2R', 'RightHandIndex1', 'mixamorigRightHandIndex1');
  const pinky = pickBone(ud, 'Pinky1R', 'Pinky2R', 'RightHandPinky1', 'mixamorigRightHandPinky1');
  const middle = pickBone(ud, 'Middle1R', 'Middle2R', 'RightHandMiddle1', 'mixamorigRightHandMiddle1');
  if (!hand) return null;
  wrapper.updateMatrixWorld(true);
  const pH = hand.getWorldPosition(new THREE.Vector3());
  const pI = index ? index.getWorldPosition(new THREE.Vector3()) : null;
  const pP = pinky ? pinky.getWorldPosition(new THREE.Vector3()) : null;
  const pM = middle ? middle.getWorldPosition(new THREE.Vector3()) : pH.clone();

  // Knuckle line = stick axis (pointing out past the thumb/index side)
  const axis = pI && pP ? pI.clone().sub(pP).normalize() : new THREE.Vector3(0, 0, 1);
  const fingerDir = pM.clone().sub(pH).normalize();
  const palmNormal = new THREE.Vector3().crossVectors(axis, fingerDir).normalize();
  const handLen = pM.distanceTo(pH);
  // Grip point: halfway down the palm, nudged into the curled fingers
  const grip = pH.clone().lerp(pM, 0.85).addScaledVector(palmNormal, handLen * 0.35);

  const g = new THREE.Group();
  const wood = new THREE.MeshStandardMaterial({ color: 0x8b5a2b, roughness: 0.92, flatShading: true });
  const dark = new THREE.MeshStandardMaterial({ color: 0x5c3a1c, roughness: 0.95, flatShading: true });
  // Stick runs along +Y; grip at y = 0, ~15% sticks out below the fist
  const butt = length * 0.15;
  const shaft = new THREE.Mesh(new THREE.CylinderGeometry(0.019, 0.026, length, 7), wood);
  shaft.position.y = length / 2 - butt;
  g.add(shaft);
  const knot = new THREE.Mesh(new THREE.SphereGeometry(0.026, 6, 4), dark);
  knot.scale.set(1, 0.6, 1);
  knot.position.set(0.012, length * 0.48, 0);
  g.add(knot);
  const twig = new THREE.Mesh(new THREE.CylinderGeometry(0.006, 0.009, 0.1, 5), wood);
  twig.position.set(0.035, length * 0.62, 0);
  twig.rotation.z = -0.8;
  g.add(twig);
  g.traverse((o) => {
    if (o.isMesh) o.castShadow = true;
  });

  // Orient +Y to the knuckle axis in world space, then hand the group to the hand bone
  const wq = new THREE.Quaternion().setFromUnitVectors(new THREE.Vector3(0, 1, 0), axis);
  wrapper.add(g);
  const invParent = new THREE.Matrix4().copy(wrapper.matrixWorld).invert();
  const local = new THREE.Matrix4().compose(grip, wq, new THREE.Vector3(1, 1, 1)).premultiply(invParent);
  local.decompose(g.position, g.quaternion, g.scale);
  g.updateMatrixWorld(true);
  hand.attach(g);
  g.visible = false;
  ud.heldStick = g;
  return g;
}

// Right-arm/torso keyframes. roll is relative to the arm-down angle (1 = at side, 0 = T-pose, <0 above).
// pitch < 0 swings the arm forward; yaw > 0 brings the right arm across the chest.
const STICK_KEYS = {
  // Ready: elbow bent, stick angled up & forward in front of the right shoulder
  ready: { roll: 0.8, pitch: -0.45, yaw: 0.15, elbow: 1.35, wristP: 0.0, wristR: 0.35, wristY: -0.6, spineY: 0.0, spineP: 0.0 },
  // Wind-up: hand raised by the right ear, stick tip up & slightly back above the shoulder, torso coils right
  windup: { roll: -0.05, pitch: -0.75, yaw: -0.5, elbow: 1.9, wristP: -1.0, wristR: 0.6, wristY: -0.4, spineY: 0.32, spineP: -0.08 },
  // Strike: arm extends across the body, tip chopped diagonally down to the lower-left, torso uncoils & leans in
  strike: { roll: 0.9, pitch: -0.75, yaw: 1.0, elbow: 0.1, wristP: 0.3, wristR: 0.3, wristY: -0.4, spineY: -0.38, spineP: 0.16 },
};
const STICK_TIMELINE = [
  [0.0, 'ready'],
  [0.38, 'windup'],
  [0.46, 'windup'],
  [0.66, 'strike'],
  [0.8, 'strike'],
  [1.0, 'ready'],
];
export const STICK_SWING_IMPACT = 0.6; // fraction of the swing when the blow lands

function easeInOut(x) {
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

/**
 * Poses the right arm (+ torso twist) for holding / swinging the stick.
 * t = null → ready stance; t in [0,1] → swing progress. Call AFTER updateAnim().
 */
export function applyStickPose(wrapper, t = null, overrideKeys = null) {
  const ud = wrapper?.userData;
  if (!ud?.isRealisticGlb) return;
  const keys = overrideKeys || STICK_KEYS;
  let k;
  if (t == null) {
    k = keys.ready;
  } else {
    let i = 0;
    while (i < STICK_TIMELINE.length - 2 && t > STICK_TIMELINE[i + 1][0]) i++;
    const [t0, a] = STICK_TIMELINE[i];
    const [t1, b] = STICK_TIMELINE[i + 1];
    // The downward strike accelerates; everything else eases
    const raw = THREE.MathUtils.clamp((t - t0) / Math.max(1e-6, t1 - t0), 0, 1);
    const f = b === 'strike' && a === 'windup' ? raw * raw : easeInOut(raw);
    k = {};
    for (const key of Object.keys(keys[a])) k[key] = keys[a][key] + (keys[b][key] - keys[a][key]) * f;
  }
  const rb = ud.rigBones;
  const down = ud.armDownAngle;
  ud.setBoneRot(rb.uArmR, k.pitch, k.yaw, down * k.roll);
  ud.setElbowBend(rb.lArmR, k.elbow, -1);
  ud.setBoneRot(rb.handR, k.wristP, k.wristY || 0, k.wristR);
  if (rb.chest) ud.setBoneRot(rb.chest, k.spineP * 0.5, k.spineY * 0.5, 0);
  ud.setBoneRot(rb.spine, k.spineP, k.spineY * 0.5, 0);
}
