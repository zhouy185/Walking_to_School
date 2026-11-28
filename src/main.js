/**
 * Westdale Safe Walk — Main Entrypoint
 * 3D Kid-Friendly Pedestrian & Traffic Safety Game centered on
 * Cootes Paradise Elementary School (43.26407, -79.90231), Westdale, Hamilton, ON.
 */

import './style.css';
import * as THREE from 'three';
import {
  ORIGIN,
  latLonToXZ,
  dist2D,
  forwardToHeadingDeg,
  headingToCardinal,
  closestPointOnSegment2D,
} from './geo.js';
import {
  loadPresetMission,
  searchAddress,
  fetchOverpassRadius,
  fetchOsrmPedestrianRoute,
} from './data/osmCache.js';
import { parseOsmElements } from './data/osmParser.js';
import { ChunkManager } from './world/chunkManager.js';
import {
  createSchoolBeacon,
  createSchoolWalkways,
  createHomeWalkway,
  createBusStops,
  createUberCarMesh,
  createAmbulanceMesh,
  createBikePoliceMesh,
  createPlayerAvatarMesh,
  DEFAULT_AVATAR_CONFIG,
  disposeGroup,
} from './world/worldBuilder.js';
import { TrafficSystem } from './world/trafficSystem.js';
import { PedestrianSystem } from './world/pedestrianSystem.js';
import { WildlifeSystem } from './world/wildlifeSystem.js';
import { InteriorRoom } from './world/interiorRoom.js';
import { animateHumanWalk } from './world/characterBuilder.js';
import {
  preloadHumanModels,
  onHumanModelLoaded,
  areHumanModelsReady,
  PLAYER_CHARACTERS,
  isShellHead,
  attachStickToHand,
  applyStickPose,
  STICK_SWING_IMPACT,
} from './world/humanModels.js';

// Overhead diagonal stick strike: wind-up above the shoulder → chop down to the lower-left
const STICK_SWING_DURATION = 0.55;
import { PlayerController } from './player/controls.js';
import { SafetyRules, OFF_SIDEWALK_LIMIT_SEC } from './gameplay/safetyRules.js';
import { MiniMap } from './ui/minimap.js';
import { vegetationUniforms } from './world/vegetationBuilder.js';
import { Visuals, upgradeGround } from './visuals.js';

// DOM refs
const container = document.getElementById('canvas-container');
const distancePill = document.getElementById('distance-pill');
const zonePill = document.getElementById('zone-pill');
const starsRow = document.getElementById('stars-row');
const pointsPill = document.getElementById('points-pill');
const healthBarFill = document.getElementById('health-bar-fill');
const healthText = document.getElementById('health-text');
const btnSelectRock = document.getElementById('btn-select-rock');
const btnSelectStick = document.getElementById('btn-select-stick');
const stickModeRow = document.getElementById('stick-mode-row');
const btnStickWield = document.getElementById('btn-stick-wield');
const btnStickThrow = document.getElementById('btn-stick-throw');
const btnAttackMode = document.getElementById('btn-attack-mode');
const attackBanner = document.getElementById('attack-banner');
const btnTouchThrow = document.getElementById('btn-touch-throw');
const crosshairEl = document.getElementById('crosshair');
const damageFlash = document.getElementById('damage-flash');
const overlayHospital = document.getElementById('overlay-hospital');
const hospitalStatus = document.getElementById('hospital-status');
const hospitalBarFill = document.getElementById('hospital-bar-fill');
const btnLeaveHospital = document.getElementById('btn-leave-hospital');
const lookBadge = document.getElementById('look-check-badge');
const compassReadout = document.getElementById('compass-readout');
const feedbackBanner = document.getElementById('feedback-banner');
const feedbackIcon = document.getElementById('feedback-icon');
const feedbackText = document.getElementById('feedback-text');
const btnRouteHint = document.getElementById('btn-route-hint');
const btnCameraView = document.getElementById('btn-camera-view');
const btnCustomizeAvatar = document.getElementById('btn-customize-avatar');
const btnCustomizeAvatarHud = document.getElementById('btn-customize-avatar-hud');
const overlayAvatar = document.getElementById('overlay-avatar');
const avatarPreviewCanvas = document.getElementById('avatar-preview-canvas');
const btnAvatarDone = document.getElementById('btn-avatar-done');
const btnAvatarClose = document.getElementById('btn-avatar-close');
const btnCallUber = document.getElementById('btn-call-uber');
const overlayUber = document.getElementById('overlay-uber');
const uberDestInput = document.getElementById('uber-dest-input');
const btnSearchUber = document.getElementById('btn-search-uber');
const uberResults = document.getElementById('uber-results');
const uberStatus = document.getElementById('uber-status');
const btnUberCancel = document.getElementById('btn-uber-cancel');
const uberQuickBtns = document.querySelectorAll('.uber-quick-btn');
const btnRestartHome = document.getElementById('btn-restart-home');
const btnPause = document.getElementById('btn-pause');
const btnVictoryChangeHome = document.getElementById('btn-victory-change-home');
const btnGameOverChangeHome = document.getElementById('btn-gameover-change-home');
const lookWarningHud = document.getElementById('look-warning-hud');
const lookWarningTitle = document.getElementById('look-warning-title');
const lookWarningSub = document.getElementById('look-warning-sub');
const clipRectLeft = document.getElementById('clip-rect-left');
const clipRectRight = document.getElementById('clip-rect-right');
const lookArrowsRow = document.getElementById('look-arrows-row');
const lookForwardBox = document.getElementById('look-forward-box');
const lookLeftBox = document.getElementById('look-left-box');
const lookRightBox = document.getElementById('look-right-box');
const lookLeftLabel = document.getElementById('look-left-label');
const lookRightLabel = document.getElementById('look-right-label');
const vehicleInterior = document.getElementById('vehicle-interior');
const cabinLedSign = document.getElementById('cabin-led-sign');
const dashSpeedVal = document.getElementById('dash-speed-val');
const dashScreen = document.getElementById('dash-screen');
const btnStart = document.getElementById('btn-start');
const btnPlayAgain = document.getElementById('btn-play-again');
const overlayStart = document.getElementById('overlay-start');
const overlayTitle = document.getElementById('overlay-title');
const overlayVictory = document.getElementById('overlay-victory');
const victoryHeading = document.getElementById('victory-heading');
const victorySubtitle = document.getElementById('victory-subtitle');
const victoryStars = document.getElementById('victory-stars');
const victoryMessage = document.getElementById('victory-message');
const victoryStats = document.getElementById('victory-stats');
const overlayGameOver = document.getElementById('overlay-gameover');
const gameOverReason = document.getElementById('gameover-reason');
const btnTryAgain = document.getElementById('btn-try-again');
const sidewalkWarning = document.getElementById('sidewalk-warning');
const sidewalkCountdown = document.getElementById('sidewalk-countdown');
const sidewalkBarFill = document.getElementById('sidewalk-bar-fill');
const uberBanner = document.getElementById('uber-banner');
const uberBannerSub = document.getElementById('uber-banner-sub');
const trafficLightHud = document.getElementById('traffic-light-hud');
const trafficLightTitle = document.getElementById('traffic-light-title');
const trafficLightSub = document.getElementById('traffic-light-sub');
const busPrompt = document.getElementById('bus-prompt');
const enterBuildingPrompt = document.getElementById('enter-building-prompt');
const npcPrompt = document.getElementById('npc-prompt');
const npcDialog = document.getElementById('npc-dialog');
const npcDialogName = document.getElementById('npc-dialog-name');
const npcDialogRole = document.getElementById('npc-dialog-role');
const npcDialogText = document.getElementById('npc-dialog-text');
const btnCloseNpcDialog = document.getElementById('btn-close-npc-dialog');
const loadingStatus = document.getElementById('loading-status');
const homeAddressInput = document.getElementById('home-address-input');
const btnSearchAddress = document.getElementById('btn-search-address');
const addressResults = document.getElementById('address-results');
const selectedHomeLabel = document.getElementById('selected-home-label');
const destAddressInput = document.getElementById('dest-address-input');
const btnSearchDest = document.getElementById('btn-search-dest');
const destResults = document.getElementById('dest-results');
const selectedDestLabel = document.getElementById('selected-dest-label');
const missionTitleEl = document.getElementById('mission-title');
const quickPickChips = document.querySelectorAll('.chip-btn:not(.dest-chip-btn):not(.uber-quick-btn)');
const destPickChips = document.querySelectorAll('.dest-chip-btn');
const minimapWrapper = document.getElementById('minimap-wrapper');
const btnExpandMap = document.getElementById('btn-expand-map');
const btnFitRoute = document.getElementById('btn-fit-route');
const minimapLegend = document.getElementById('minimap-legend');
const touchControlsEl = document.getElementById('touch-controls');
const touchJoystickEl = document.getElementById('touch-joystick');
const touchJoystickKnob = document.getElementById('touch-joystick-knob');
const btnTouchLookLeft = document.getElementById('btn-touch-look-left');
const btnTouchLookRight = document.getElementById('btn-touch-look-right');

let feedbackTimer = null;
// Friendly tip pop-ups can be switched off (safety warnings & successes always show).
const btnTipsToggle = document.getElementById('btn-tips-toggle');
let tipsEnabled = true;
try {
  tipsEnabled = localStorage.getItem('westdale.tipsEnabled') !== 'false';
} catch {
  /* storage unavailable */
}
function renderTipsToggle() {
  if (!btnTipsToggle) return;
  btnTipsToggle.textContent = tipsEnabled ? '💬 Tips: On' : '🔕 Tips: Off';
  btnTipsToggle.classList.toggle('tips-off', !tipsEnabled);
}
renderTipsToggle();
btnTipsToggle?.addEventListener('click', () => {
  tipsEnabled = !tipsEnabled;
  try {
    localStorage.setItem('westdale.tipsEnabled', String(tipsEnabled));
  } catch {
    /* storage unavailable */
  }
  renderTipsToggle();
  if (!tipsEnabled) feedbackBanner.classList.add('hidden');
  btnTipsToggle.blur();
});

function showFeedback({ type = 'info', icon = '🌟', text }) {
  if (!tipsEnabled && type === 'info') return;
  feedbackBanner.className = `feedback-banner ${type}`;
  feedbackIcon.textContent = icon;
  feedbackText.textContent = text;
  // Restart the slide-in animation for back-to-back messages
  void feedbackBanner.offsetWidth;
  if (feedbackTimer) clearTimeout(feedbackTimer);
  // Short messages leave quickly; long ones stay just long enough to read
  const readMs = Math.min(5200, Math.max(2600, 1400 + String(text || '').length * 35));
  feedbackTimer = setTimeout(() => {
    feedbackBanner.classList.add('hidden');
  }, type === 'warning' ? readMs + 800 : readMs);
}

function updateStarsUI(count) {
  const starEls = starsRow.querySelectorAll('.star');
  starEls.forEach((el, idx) => {
    if (idx < count) {
      el.classList.add('active');
      el.classList.remove('lost');
    } else {
      el.classList.remove('active');
      el.classList.add('lost');
    }
  });
}

function updateZonePill(zone, streetName) {
  if (zone === 'road_lane') {
    zonePill.className = 'pill pill-red';
    zonePill.textContent = `🚧 Road Lane (${streetName})`;
  } else if (zone === 'grass') {
    zonePill.className = 'pill pill-green';
    zonePill.textContent = `🌿 Safe Grass / Park`;
  } else if (zone === 'crosswalk_signalized') {
    zonePill.className = 'pill pill-amber';
    zonePill.textContent = `🚦 Signalized Crosswalk`;
  } else if (zone === 'crosswalk_unsignalized') {
    zonePill.className = 'pill pill-amber';
    zonePill.textContent = `👀 Crosswalk (${streetName})`;
  } else if (zone === 'sidewalk') {
    zonePill.className = 'pill pill-green';
    zonePill.textContent = `✅ Safe Sidewalk (${streetName})`;
  } else {
    zonePill.className = 'pill pill-green';
    zonePill.textContent = `🌳 ${streetName}`;
  }
}

/**
 * Finds a safe sidewalk spawn point right outside Hamilton Public Library – Westdale Branch
 * (near King St W & Paisley Ave), facing East-Northeast toward Cootes Paradise School.
 */
function computeSafeStartPosition(missionStart, parsed) {
  const raw = latLonToXZ(missionStart.lat, missionStart.lon);
  // Snap onto the north sidewalk of King Street West closest to the library
  let bestHit = null;
  let bestRoad = null;
  for (const road of parsed.roads) {
    if (!/king street/i.test(road.name)) continue;
    for (let i = 0; i < road.points.length - 1; i++) {
      const a = road.points[i];
      const b = road.points[i + 1];
      const hit = closestPointOnSegment2D(raw.x, raw.z, a.x, a.z, b.x, b.z);
      if (!bestHit || hit.dist < bestHit.dist) {
        bestHit = { ...hit, ax: a.x, az: a.z, bx: b.x, bz: b.z };
        bestRoad = road;
      }
    }
  }

  if (bestHit && bestRoad) {
    // Offset onto the north sidewalk (smaller Z = north)
    const dx = bestHit.bx - bestHit.ax;
    const dz = bestHit.bz - bestHit.az;
    const len = Math.hypot(dx, dz) || 1;
    let nx = -dz / len;
    let nz = dx / len;
    if (nz > 0) {
      nx = -nx;
      nz = -nz;
    }
    const swDist = bestRoad.width / 2 + bestRoad.sidewalkWidth * 0.5;
    return {
      x: bestHit.x + nx * swDist,
      z: bestHit.z + nz * swDist,
      headingDeg: 68, // Facing ENE along King St W toward Cootes Paradise Elementary School!
    };
  }

  return { x: raw.x, z: raw.z, headingDeg: 68 };
}

// Gradient sky dome + soft low-poly clouds. Follows the camera so the horizon never "ends".
function createSkyDome(topColor, horizonColor) {
  const group = new THREE.Group();
  group.name = 'skyDome';

  const skyMat = new THREE.ShaderMaterial({
    uniforms: {
      topColor: { value: topColor.clone() },
      horizonColor: { value: horizonColor.clone() },
      groundColor: { value: new THREE.Color(0xcfe3c4) },
    },
    vertexShader: `
      varying vec3 vDir;
      void main() {
        vDir = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: `
      uniform vec3 topColor;
      uniform vec3 horizonColor;
      uniform vec3 groundColor;
      varying vec3 vDir;
      void main() {
        float h = vDir.y;
        vec3 col = h > 0.0
          ? mix(horizonColor, topColor, pow(clamp(h, 0.0, 1.0), 0.55))
          : mix(horizonColor, groundColor, clamp(-h * 6.0, 0.0, 1.0));
        gl_FragColor = vec4(col, 1.0);
        #include <colorspace_fragment>
      }`,
    side: THREE.BackSide,
    depthWrite: false,
    fog: false,
    toneMapped: false,
  });
  const sky = new THREE.Mesh(new THREE.SphereGeometry(640, 32, 16), skyMat);
  sky.renderOrder = -10;
  sky.frustumCulled = false;
  group.add(sky);

  // Puffy clouds ring (unlit-ish, never fogged out)
  const cloudMat = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    emissive: 0xdbeafe,
    emissiveIntensity: 0.55,
    fog: false,
    flatShading: true,
  });
  const puffGeo = new THREE.IcosahedronGeometry(1, 1);
  let seed = 7;
  const rand = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  for (let i = 0; i < 16; i++) {
    const cloud = new THREE.Group();
    const puffs = 3 + Math.floor(rand() * 3);
    for (let j = 0; j < puffs; j++) {
      const puff = new THREE.Mesh(puffGeo, cloudMat);
      const r = 14 + rand() * 12;
      puff.scale.set(r * 1.3, r * 0.7, r);
      puff.position.set((j - puffs / 2) * 18 + rand() * 6, rand() * 6, rand() * 10 - 5);
      cloud.add(puff);
    }
    const ang = (i / 16) * Math.PI * 2 + rand() * 0.3;
    const dist = 430 + rand() * 120;
    cloud.position.set(Math.cos(ang) * dist, 130 + rand() * 90, Math.sin(ang) * dist);
    cloud.lookAt(0, cloud.position.y, 0);
    group.add(cloud);
  }
  return group;
}

async function init() {
  btnStart.disabled = true;

  // 1. Three.js Scene Setup (Bright, kid-friendly sunny Westdale morning!)
  const scene = new THREE.Scene();
  const SKY_TOP = new THREE.Color(0x3d8fdb);
  const SKY_HORIZON = new THREE.Color(0xd9eefb);
  scene.background = SKY_HORIZON.clone();
  scene.fog = new THREE.Fog(SKY_HORIZON.getHex(), 170, 560);
  const skyGroup = createSkyDome(SKY_TOP, SKY_HORIZON);
  scene.add(skyGroup);

  const camera = new THREE.PerspectiveCamera(
    68,
    window.innerWidth / window.innerHeight,
    0.1,
    700
  );
  scene.add(camera);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  // Filmic tone mapping: softer highlights, richer midtones (less "flat CG" look)
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.12;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  container.appendChild(renderer.domElement);

  // Sunny morning lighting: cool sky fill + warm low sun
  const hemiLight = new THREE.HemisphereLight(0xd6ecff, 0x6f9a5a, 1.05);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xffeccc, 2.1);
  sunLight.position.set(120, 180, 90);
  sunLight.castShadow = true;
  sunLight.shadow.mapSize.set(2048, 2048);
  sunLight.shadow.camera.near = 20;
  sunLight.shadow.camera.far = 500;
  const d = 220;
  sunLight.shadow.camera.left = -d;
  sunLight.shadow.camera.right = d;
  sunLight.shadow.camera.top = d;
  sunLight.shadow.camera.bottom = -d;
  scene.add(sunLight);

  // Lush neighborhood ground plane
  const ground = new THREE.Mesh(
    new THREE.PlaneGeometry(2400, 2400),
    new THREE.MeshStandardMaterial({ color: 0x86c46e, roughness: 1.0 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);
  upgradeGround(ground);

  // Reflections, sun glow, follow-cam shadows, post-processing & graphics quality presets
  const visuals = new Visuals({ renderer, scene, camera, sunLight, hemiLight, skyGroup });
  const btnGraphics = document.getElementById('btn-graphics');
  const QUALITY_LABEL = { high: '✨ Graphics: High', medium: '🌤️ Graphics: Medium', low: '⚡ Graphics: Low' };
  const renderGraphicsBtn = () => {
    if (btnGraphics) btnGraphics.textContent = QUALITY_LABEL[visuals.quality];
  };
  renderGraphicsBtn();
  btnGraphics?.addEventListener('click', () => {
    const order = ['high', 'medium', 'low'];
    visuals.setQuality(order[(order.indexOf(visuals.quality) + 1) % order.length]);
    renderGraphicsBtn();
    btnGraphics.blur();
  });

  // 2. Load pre-cached Westdale preset (<200ms) immediately; stream 3D human GLBs in parallel without blocking view!
  const t0 = performance.now();
  const preset = await loadPresetMission();
  const parsed = parseOsmElements(preset.osm.elements);
  const loadMs = Math.round(performance.now() - t0);
  loadingStatus.textContent = `Westdale loaded in ${loadMs}ms (${parsed.roads.length} streets, ${parsed.buildings.length} buildings)`;

  // 3. Chunk Manager (300m x 300m streaming, 3x3 active neighborhood)
  const chunkManager = new ChunkManager(scene);
  chunkManager.loadPresetParsed(parsed);

  // 4. Destination Entrance Plaza, Safe School Walkways, Your House Walkway & Bus Stops
  let destXZ = latLonToXZ(preset.mission.destination.lat, preset.mission.destination.lon, ORIGIN);
  let currentHomeInfo = { lat: preset.mission.start.lat, lon: preset.mission.start.lon, label: 'Marion Ave N, Westdale' };
  let currentDestInfo = {
    lat: preset.mission.destination.lat,
    lon: preset.mission.destination.lon,
    label: 'Cootes Paradise Elementary School',
  };
  let schoolBeacon = createSchoolBeacon(destXZ.x, destXZ.z, '🏫 School Entrance', currentDestInfo.label);
  scene.add(schoolBeacon);

  const schoolWalkways = createSchoolWalkways(destXZ, parsed);
  scene.add(schoolWalkways.group);

  let homeWalkway = createHomeWalkway(parsed);
  scene.add(homeWalkway.group);

  const busStopsData = createBusStops(parsed, destXZ);
  scene.add(busStopsData.group);

  // 5. Traffic Signals + 8 School Zone Vehicles + 10 Friendly NPC Pedestrians
  const trafficSystem = new TrafficSystem(scene, parsed, busStopsData.stops);
  const pedestrianSystem = new PedestrianSystem(scene, parsed);

  // 6. Player Controls & Safe Spawn outside Your House (fallback to Westdale Library)
  let activeParsed = parsed;
  let startPose = homeWalkway.startPose || computeSafeStartPosition(preset.mission.start, parsed);
  const player = new PlayerController(camera, renderer.domElement);
  player.onCanvasClickLock = () => {
    if (isPlaying && !safety.arrived && !safety.gameOver) {
      player.lock();
    }
  };
  player.setPose(startPose.x, startPose.z, startPose.headingDeg);
  chunkManager.update(startPose.x, startPose.z);

  // 7. Safety Rules Engine (both school walkways & your house front walkway are safe!)
  let allSafeWalkways = [...schoolWalkways.paths, ...homeWalkway.paths];
  const safety = new SafetyRules(activeParsed, destXZ, showFeedback, allSafeWalkways);

  // 7b. Wild Animals (20 raccoons/coyotes/bunnies) & Safe Sidewalk/Grass Rocks & Sticks!
  const wildlifeSystem = new WildlifeSystem(scene, parsed, safety);

  // 8. Synchronized 2D Leaflet Mini-Map (with Your House, Bus Stops & live moving Buses)
  const miniMap = new MiniMap('minimap', preset.mission, preset.routeHint, {
    homeXZ: homeWalkway.homePos,
    busStops: busStopsData.stops,
  });
  miniMap.updatePlayer(startPose.x, startPose.z, startPose.headingDeg);

  // Merge helper when adding a custom neighborhood outside the preset
  function mergeParsedData(base, extra) {
    const mergeById = (a, b) => {
      const seen = new Set(a.map((x) => x.id));
      const out = [...a];
      for (const item of b) {
        if (!seen.has(item.id)) {
          out.push(item);
          seen.add(item.id);
        }
      }
      return out;
    };
    return {
      roads: mergeById(base.roads, extra.roads),
      footways: mergeById(base.footways, extra.footways),
      buildings: mergeById(base.buildings, extra.buildings),
      parks: mergeById(base.parks, extra.parks),
      intersections: mergeById(base.intersections, extra.intersections),
      crosswalks: mergeById(base.crosswalks, extra.crosswalks),
      signalNodes: mergeById(base.signalNodes, extra.signalNodes),
      stopSigns: mergeById(base.stopSigns || [], extra.stopSigns || []),
    };
  }

  /**
   * Switches the starting Home Address to any (lat, lon) anywhere on the map!
   */
  async function applyHomeAddress({ lat, lon, label, isDefaultMarion = false }) {
    btnStart.disabled = true;
    addressResults.classList.add('hidden');
    loadingStatus.textContent = `Loading neighborhood for ${label}...`;

    try {
      // Remove previous home walkway mesh
      if (homeWalkway?.group) {
        scene.remove(homeWalkway.group);
        disposeGroup(homeWalkway.group);
      }

      let routeHint = preset.routeHint;

      if (isDefaultMarion) {
        homeWalkway = createHomeWalkway(activeParsed);
        currentHomeInfo = { lat: preset.mission.start.lat, lon: preset.mission.start.lon, label: 'Marion Ave N, Westdale' };
        selectedHomeLabel.innerHTML = `Selected Home: <strong>${currentHomeInfo.label}</strong>`;
      } else {
        const customXZ = latLonToXZ(lat, lon, ORIGIN);
        const distFromOrigin = dist2D(customXZ.x, customXZ.z, 0, 0);

        if (distFromOrigin > 360) {
          const rawData = await fetchOverpassRadius(lat, lon, 350);
          const extraParsed = parseOsmElements(rawData.elements || []);
          activeParsed = mergeParsedData(activeParsed, extraParsed);
          chunkManager.addParsedData(extraParsed);
        }

        homeWalkway = createHomeWalkway(activeParsed, customXZ, label);
        currentHomeInfo = { lat, lon, label };
        selectedHomeLabel.innerHTML = `Selected Home: <strong>${label}</strong>`;
      }

      routeHint = await fetchOsrmPedestrianRoute(
        currentHomeInfo.lat,
        currentHomeInfo.lon,
        currentDestInfo.lat,
        currentDestInfo.lon
      );
      missionTitleEl.textContent = `From ${currentHomeInfo.label} to ${currentDestInfo.label}`;

      scene.add(homeWalkway.group);
      startPose = homeWalkway.startPose || computeSafeStartPosition(preset.mission.start, activeParsed);
      allSafeWalkways = [...schoolWalkways.paths, ...homeWalkway.paths];

      safety.setWorldData(activeParsed, allSafeWalkways);
      safety.reset();
      updateStarsUI(3);
      pointsPill.textContent = `🏆 ${safety.points} pts`;
      if (ridingBus) ridingBus.mesh.visible = true;
      ridingBus = null;
      vehicleInterior.classList.add('hidden');

      ground.position.set(startPose.x, 0, startPose.z);
      chunkManager.update(startPose.x, startPose.z);
      wildlifeSystem.relocateNear(startPose.x, startPose.z);
      spawnInsideYourHouse();

      if (homeWalkway.homePos) {
        miniMap.setHomeLocation(homeWalkway.homePos, routeHint);
      }
      miniMap.updatePlayer(startPose.x, startPose.z, startPose.headingDeg);

      const km = Math.round(dist2D(startPose.x, startPose.z, destXZ.x, destXZ.z));
      loadingStatus.textContent = `Ready! ${km >= 1000 ? `${(km / 1000).toFixed(1)} km` : `${km} m`} to ${currentDestInfo.label}.`;
    } catch (err) {
      loadingStatus.textContent = `Could not load that address (${err.message}). Try another address!`;
    } finally {
      btnStart.disabled = false;
    }
  }

  /**
   * Switches the Destination (School or ANY place on the map!).
   */
  async function applyDestinationAddress({ lat, lon, label, isDefaultSchool = false }) {
    btnStart.disabled = true;
    destResults.classList.add('hidden');
    loadingStatus.textContent = `Setting destination to ${label}...`;

    try {
      const targetLat = isDefaultSchool ? ORIGIN.lat : lat;
      const targetLon = isDefaultSchool ? ORIGIN.lon : lon;
      const targetLabel = isDefaultSchool ? 'Cootes Paradise Elementary School' : label;

      const newDestXZ = latLonToXZ(targetLat, targetLon, ORIGIN);
      if (dist2D(newDestXZ.x, newDestXZ.z, 0, 0) > 360) {
        const rawData = await fetchOverpassRadius(targetLat, targetLon, 350);
        const extraParsed = parseOsmElements(rawData.elements || []);
        activeParsed = mergeParsedData(activeParsed, extraParsed);
        chunkManager.addParsedData(extraParsed);
        safety.setWorldData(activeParsed, allSafeWalkways);
      }

      destXZ = newDestXZ;
      currentDestInfo = { lat: targetLat, lon: targetLon, label: targetLabel };

      // Move glowing 3D destination beacon & sign
      if (schoolBeacon) {
        scene.remove(schoolBeacon);
        disposeGroup(schoolBeacon);
      }
      schoolBeacon = createSchoolBeacon(
        destXZ.x,
        destXZ.z,
        isDefaultSchool ? '🏫 School Entrance' : '🎯 Destination',
        targetLabel
      );
      scene.add(schoolBeacon);

      safety.setDestination(destXZ, targetLabel);
      const routeHint = await fetchOsrmPedestrianRoute(
        currentHomeInfo.lat,
        currentHomeInfo.lon,
        targetLat,
        targetLon
      );
      miniMap.setDestinationLocation(destXZ, routeHint);

      selectedDestLabel.innerHTML = `Selected Destination: <strong>${targetLabel}</strong>`;
      missionTitleEl.textContent = `From ${currentHomeInfo.label} to ${targetLabel}`;

      const km = Math.round(dist2D(startPose.x, startPose.z, destXZ.x, destXZ.z));
      loadingStatus.textContent = `Ready! ${km >= 1000 ? `${(km / 1000).toFixed(1)} km` : `${km} m`} to ${targetLabel}.`;
    } catch (err) {
      loadingStatus.textContent = `Could not set destination (${err.message}). Try another address!`;
    } finally {
      btnStart.disabled = false;
    }
  }

  async function runDestSearch() {
    const q = destAddressInput.value.trim();
    if (!q) return;
    btnSearchDest.disabled = true;
    btnSearchDest.textContent = '...';
    destResults.innerHTML = '';
    destResults.classList.add('hidden');
    loadingStatus.textContent = `Searching "${q}" on OpenStreetMap...`;

    try {
      const results = await searchAddress(q);
      if (results.length === 0) {
        loadingStatus.textContent = `No results found for "${q}". Try adding a street name or city!`;
      } else {
        loadingStatus.textContent = `Pick your destination below:`;
        for (const r of results) {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'address-result-item';
          item.textContent = `🎯 ${r.displayName}`;
          item.addEventListener('click', () => {
            destPickChips.forEach((c) => c.classList.remove('active'));
            destAddressInput.value = r.shortName;
            applyDestinationAddress({ lat: r.lat, lon: r.lon, label: r.shortName });
          });
          destResults.appendChild(item);
        }
        destResults.classList.remove('hidden');
      }
    } catch (err) {
      loadingStatus.textContent = `Search failed: ${err.message}`;
    } finally {
      btnSearchDest.disabled = false;
      btnSearchDest.textContent = 'Search';
    }
  }

  btnSearchDest?.addEventListener('click', runDestSearch);
  destAddressInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runDestSearch();
    }
  });
  destPickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      destPickChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      if (chip.dataset.destPreset === 'cootes') {
        destAddressInput.value = '';
        applyDestinationAddress({ isDefaultSchool: true, label: 'Cootes Paradise Elementary School' });
      } else {
        const lat = Number.parseFloat(chip.dataset.lat);
        const lon = Number.parseFloat(chip.dataset.lon);
        const label = chip.dataset.label || chip.textContent.trim();
        destAddressInput.value = label;
        applyDestinationAddress({ lat, lon, label });
      }
    });
  });

  // Wire Address Search & Quick-Pick Chips
  async function runAddressSearch() {
    const q = homeAddressInput.value.trim();
    if (!q) return;
    btnSearchAddress.disabled = true;
    btnSearchAddress.textContent = '...';
    addressResults.innerHTML = '';
    addressResults.classList.add('hidden');
    loadingStatus.textContent = `Searching "${q}" on OpenStreetMap...`;

    try {
      const results = await searchAddress(q);
      if (results.length === 0) {
        loadingStatus.textContent = `No results found for "${q}". Try adding a street name or city!`;
      } else {
        loadingStatus.textContent = `Pick your home address below:`;
        addressResults.innerHTML = '';
        for (const r of results) {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'address-result-item';
          item.textContent = `📍 ${r.displayName}`;
          item.addEventListener('click', () => {
            quickPickChips.forEach((c) => c.classList.remove('active'));
            homeAddressInput.value = r.shortName;
            applyHomeAddress({ lat: r.lat, lon: r.lon, label: r.shortName });
          });
          addressResults.appendChild(item);
        }
        addressResults.classList.remove('hidden');
      }
    } catch (err) {
      loadingStatus.textContent = `Search failed: ${err.message}`;
    } finally {
      btnSearchAddress.disabled = false;
      btnSearchAddress.textContent = 'Search';
    }
  }

  btnSearchAddress.addEventListener('click', runAddressSearch);
  homeAddressInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runAddressSearch();
    }
  });

  quickPickChips.forEach((chip) => {
    chip.addEventListener('click', () => {
      quickPickChips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
      if (chip.dataset.preset === 'marion') {
        homeAddressInput.value = '';
        applyHomeAddress({ isDefaultMarion: true, label: 'Marion Ave N, Westdale' });
      } else {
        const lat = Number.parseFloat(chip.dataset.lat);
        const lon = Number.parseFloat(chip.dataset.lon);
        const label = chip.dataset.label || chip.textContent.trim();
        homeAddressInput.value = label;
        applyHomeAddress({ lat, lon, label });
      }
    });
  });

  let isPlaying = false;
  let ridingBus = null;
  let uberRide = null; // { phase: 'approach' | 'ride', t, duration, fromX, fromZ, toX, toZ, destX, destZ, destLabel }
  let ambulanceRescue = null; // { phase: 'approach' | 'ride' | 'hospital', t, duration, fromX, fromZ, toX, toZ, returnX, returnZ }
  let playerHealth = 100;
  let rockCount = 10;
  let stickCount = 0;
  let selectedWeapon = 'rock'; // 'rock' | 'stick'
  let stickAction = 'wield'; // 'wield' (melee swing) | 'throw'
  let stickSwingTimer = 0;
  let pendingStickHit = 0;
  let stickSwingCooldown = 0;
  let attackMode = false;
  let damageFlashTimer = null;
  const throwRaycaster = new THREE.Raycaster();
  const throwNdc = new THREE.Vector2();
  let dismissedIntersectionId = null;

  // 1st-Person Held Stick & Rock meshes attached to the camera
  const fpStickPivot = new THREE.Group();
  fpStickPivot.position.set(0.36, -0.28, -0.58);
  const fpStickMesh = new THREE.Mesh(
    new THREE.CylinderGeometry(0.022, 0.032, 0.78, 8),
    new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.88 })
  );
  fpStickMesh.position.set(0, 0.24, -0.14);
  fpStickMesh.rotation.set(-0.55, 0, 0.16);
  fpStickPivot.add(fpStickMesh);
  fpStickPivot.visible = false;
  camera.add(fpStickPivot);

  const fpRockMesh = new THREE.Mesh(
    new THREE.DodecahedronGeometry(0.085, 0),
    new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.9, flatShading: true })
  );
  fpRockMesh.position.set(0.34, -0.24, -0.52);
  fpRockMesh.visible = false;
  camera.add(fpRockMesh);

  const uberCarMesh = createUberCarMesh();
  uberCarMesh.visible = false;
  scene.add(uberCarMesh);

  const ambulanceMesh = createAmbulanceMesh();
  ambulanceMesh.visible = false;
  scene.add(ambulanceMesh);

  let bikePolice = null; // { phase: 'approach' | 'confiscate' | 'leave', t, duration, fromX, fromZ, toX, toZ }
  const bikePoliceMesh = createBikePoliceMesh();
  bikePoliceMesh.visible = false;
  scene.add(bikePoliceMesh);

  function summonBikePolice(hitNpc) {
    if (bikePolice) return;
    const px = player.position.x;
    const pz = player.position.z;
    bikePolice = {
      phase: 'approach',
      t: 0,
      duration: 1.8,
      fromX: px + 20,
      fromZ: pz - 12,
      toX: px + 1.8,
      toZ: pz + 1.4,
      hitNpcName: hitNpc?.name || 'a pedestrian',
    };
    bikePoliceMesh.visible = true;
    bikePoliceMesh.position.set(bikePolice.fromX, 0.14, bikePolice.fromZ);
    showFeedback({
      type: 'warning',
      icon: '🚴‍♂️',
      text: `Whoa! You hit ${bikePolice.hitNpcName}! A Police Officer on a bike is riding over!`,
    });
  }

  function updateHealthUI() {
    const clamped = Math.max(0, Math.min(100, Math.round(playerHealth)));
    if (healthBarFill) healthBarFill.style.width = `${clamped}%`;
    if (healthText) healthText.textContent = `❤️ ${clamped} / 100`;
  }

  function updateAmmoUI() {
    if (btnSelectRock) {
      btnSelectRock.textContent = `🪨 ${rockCount} Rock${rockCount === 1 ? '' : 's'}`;
      btnSelectRock.classList.toggle('active', selectedWeapon === 'rock');
    }
    if (btnSelectStick) {
      btnSelectStick.textContent = `🪵 ${stickCount} Stick${stickCount === 1 ? '' : 's'}`;
      btnSelectStick.classList.toggle('active', selectedWeapon === 'stick');
    }
    if (stickModeRow) {
      stickModeRow.classList.toggle('hidden', selectedWeapon !== 'stick');
    }
    if (btnStickWield) btnStickWield.classList.toggle('active', stickAction === 'wield');
    if (btnStickThrow) btnStickThrow.classList.toggle('active', stickAction === 'throw');
    if (btnTouchThrow) {
      btnTouchThrow.textContent =
        selectedWeapon === 'stick' && stickAction === 'wield' ? '🏏 SWING!' : '⚾ THROW!';
    }
    if (attackBanner) {
      if (selectedWeapon === 'stick') {
        attackBanner.innerHTML =
          stickAction === 'wield'
            ? `🏏 <strong>WIELDING STICK!</strong> Left-Click / <kbd>Space</kbd> to <b>Swing</b> • Right-Click to <b>Throw</b> • <kbd>B</kbd> Switch Mode • <kbd>1</kbd> Rock`
            : `🪵 <strong>THROWING STICK!</strong> Left-Click / <kbd>Space</kbd> to <b>Throw</b> • Right-Click to <b>Swing</b> • <kbd>B</kbd> Switch Mode • <kbd>1</kbd> Rock`;
      } else {
        attackBanner.innerHTML = `🪨 <strong>THROWING ROCKS!</strong> Click / <kbd>Space</kbd> to throw at wild animals • <kbd>2</kbd> Switch to Stick • <kbd>C</kbd> Exit`;
      }
    }
  }

  function selectWeapon(kind, announce = true) {
    selectedWeapon = kind === 'stick' ? 'stick' : 'rock';
    updateAmmoUI();
    if (announce) {
      if (selectedWeapon === 'stick') {
        if (stickCount <= 0) {
          showFeedback({
            type: 'warning',
            icon: '🪵',
            text: 'Stick selected, but you have 0 sticks! Pick up a glowing 🪵 stick on the sidewalk or grass.',
          });
        } else {
          showFeedback({
            type: 'info',
            icon: '🪵',
            text: `Equipped Stick (${stickCount})! ${stickAction === 'wield' ? '🏏 Wield Mode: Left-Click to Swing, Right-Click to Throw (B to switch).' : '🎯 Throw Mode: Left-Click to Throw, Right-Click to Swing (B to switch).'}`,
          });
        }
      } else {
        showFeedback({
          type: 'info',
          icon: '🪨',
          text: `Equipped Rocks (${rockCount})! Click or press Space in Attack Mode to throw.`,
        });
      }
    }
  }

  function setStickAction(mode, announce = true) {
    stickAction = mode === 'throw' ? 'throw' : 'wield';
    selectedWeapon = 'stick';
    updateAmmoUI();
    if (announce) {
      showFeedback({
        type: 'info',
        icon: stickAction === 'wield' ? '🏏' : '🎯',
        text:
          stickAction === 'wield'
            ? 'Stick Mode: 🏏 WIELD (Swing to fend off wild animals without losing your stick!)'
            : 'Stick Mode: 🎯 THROW (Toss a stick at wild animals!)',
      });
    }
  }

  updateAmmoUI();

  function setAttackMode(enabled) {
    attackMode = Boolean(enabled);
    btnAttackMode?.classList.toggle('active', attackMode);
    if (btnAttackMode) {
      btnAttackMode.textContent = attackMode ? '🎯 Attack Mode: ON (C)' : '🎯 Attack Mode (C)';
    }
    attackBanner?.classList.toggle('hidden', !attackMode);
    crosshairEl?.classList.toggle('attack-reticle', attackMode);
    if (btnTouchThrow) {
      btnTouchThrow.classList.toggle('hidden', !(attackMode && player.isTouchDevice));
    }
    updateAmmoUI();
    if (attackMode) {
      const activeDesc =
        selectedWeapon === 'stick'
          ? stickAction === 'wield'
            ? `Wielding Stick (${stickCount}) — Left-Click to swing, Right-Click to throw!`
            : `Throwing Stick (${stickCount}) — Left-Click to throw, Right-Click to swing!`
          : `Throwing Rocks (${rockCount}) — Click or press Space to throw!`;
      showFeedback({
        type: 'info',
        icon: selectedWeapon === 'stick' ? '🪵' : '🪨',
        text: `Attack Mode ON! ${activeDesc} Press 1/2 to switch Rock/Stick.`,
      });
    }
  }

  function handleAnimalHitFeedback(animal, partialOnly) {
    if (partialOnly) {
      showFeedback({
        type: 'info',
        icon: selectedWeapon === 'stick' ? '🪵' : '🪨',
        text: `Direct hit on the ${animal.label}! (${animal.hp} hit${animal.hp === 1 ? '' : 's'} left)`,
      });
    } else {
      safety.points += 10;
      showFeedback({
        type: 'success',
        icon: '🌟',
        text: `+10 pts! You scared off the ${animal.emoji} ${animal.label}!`,
      });
    }
  }

  function wieldStickAttack() {
    if (stickCount <= 0) {
      showFeedback({
        type: 'warning',
        icon: '🪵',
        text: 'No stick to wield! Pick up a glowing 🪵 stick on the sidewalk or grass, or press 1 for Rocks.',
      });
      return;
    }
    if (stickSwingCooldown > 0) return;
    stickSwingTimer = STICK_SWING_DURATION;
    stickSwingCooldown = STICK_SWING_DURATION + 0.05;
    // The blow lands when the stick comes down, not the instant you click
    pendingStickHit = STICK_SWING_DURATION * STICK_SWING_IMPACT;
  }

  function resolveStickHit() {
    const forward = new THREE.Vector3();
    camera.getWorldDirection(forward);
    const origin = new THREE.Vector3(player.position.x, 1.2, player.position.z);
    wildlifeSystem.meleeAttack(
      origin,
      forward,
      handleAnimalHitFeedback,
      pedestrianSystem.npcs,
      (hitNpc) => summonBikePolice(hitNpc)
    );
  }

  function throwSelectedItem(kind, clientX = null, clientY = null) {
    if (kind === 'rock') {
      if (rockCount <= 0) {
        showFeedback({
          type: 'warning',
          icon: '🪨',
          text:
            stickCount > 0
              ? 'Out of rocks! Press 2 to switch to your 🪵 Stick, or pick up more rocks on the sidewalk!'
              : 'Out of rocks! Walk over glowing 🪨 rocks or 🪵 sticks on the sidewalk or grass to pick them up!',
        });
        return;
      }
      rockCount -= 1;
    } else {
      if (stickCount <= 0) {
        showFeedback({
          type: 'warning',
          icon: '🪵',
          text:
            rockCount > 0
              ? 'Out of sticks! Press 1 to switch to 🪨 Rocks, or pick up more sticks on the sidewalk!'
              : 'Out of sticks! Walk over glowing 🪵 sticks or 🪨 rocks on the sidewalk or grass to pick them up!',
        });
        return;
      }
      stickCount -= 1;
    }
    updateAmmoUI();

    if (clientX !== null && clientY !== null && !player.controls.isLocked) {
      throwNdc.x = (clientX / window.innerWidth) * 2 - 1;
      throwNdc.y = -(clientY / window.innerHeight) * 2 + 1;
    } else {
      throwNdc.set(0, 0); // Center crosshair when pointer-locked or Space pressed
    }
    throwRaycaster.setFromCamera(throwNdc, camera);
    const origin = new THREE.Vector3(player.position.x, 1.35, player.position.z);
    const dir = throwRaycaster.ray.direction.clone().normalize();
    wildlifeSystem.throwProjectile(origin, dir, kind);
  }

  function performAttack(clientX = null, clientY = null, useAltStickAction = false) {
    if (!isPlaying || !attackMode || insideBuilding || ridingBus || uberRide || ambulanceRescue) return;
    if (selectedWeapon === 'stick') {
      const action = useAltStickAction
        ? stickAction === 'wield'
          ? 'throw'
          : 'wield'
        : stickAction;
      if (action === 'wield') {
        wieldStickAttack();
      } else {
        throwSelectedItem('stick', clientX, clientY);
      }
    } else {
      throwSelectedItem('rock', clientX, clientY);
    }
  }

  function startAmbulanceRescue() {
    if (ambulanceRescue) return;
    setAttackMode(false);
    if (insideBuilding) exitPublicBuilding(true);
    if (ridingBus) {
      ridingBus.mesh.visible = true;
      ridingBus = null;
    }
    uberRide = null;
    uberCarMesh.visible = false;
    uberBanner.classList.add('hidden');
    sidewalkWarning.classList.add('hidden');
    busPrompt.classList.add('hidden');
    vehicleInterior.classList.add('hidden');

    const px = player.position.x;
    const pz = player.position.z;
    ambulanceRescue = {
      phase: 'approach',
      t: 0,
      duration: 1.6,
      fromX: px + 22,
      fromZ: pz + 12,
      toX: px,
      toZ: pz,
      returnX: px,
      returnZ: pz,
    };
    ambulanceMesh.visible = true;
    ambulanceMesh.position.set(ambulanceRescue.fromX, 0.08, ambulanceRescue.fromZ);
    uberBanner.classList.remove('hidden');
    uberBannerSub.textContent = 'Health reached 0! Ambulance is taking you to the hospital!';
    showFeedback({
      type: 'warning',
      icon: '🚑',
      text: 'Oh no! 0 HP! An ambulance is rushing you to the hospital for treatment!',
    });
  }

  btnAttackMode?.addEventListener('click', () => setAttackMode(!attackMode));
  btnSelectRock?.addEventListener('click', () => selectWeapon('rock', true));
  btnSelectStick?.addEventListener('click', () => selectWeapon('stick', true));
  btnStickWield?.addEventListener('click', () => setStickAction('wield', true));
  btnStickThrow?.addEventListener('click', () => setStickAction('throw', true));
  btnTouchThrow?.addEventListener('click', (e) => {
    e.stopPropagation();
    performAttack(null, null, false);
  });
  renderer.domElement.addEventListener('mousedown', (e) => {
    if (!attackMode || !isPlaying) return;
    if (e.button === 0) {
      performAttack(e.clientX, e.clientY, false);
    } else if (e.button === 2 && selectedWeapon === 'stick') {
      performAttack(e.clientX, e.clientY, true);
    }
  });
  renderer.domElement.addEventListener('contextmenu', (e) => {
    if (attackMode && selectedWeapon === 'stick') {
      e.preventDefault();
    }
  });
  btnLeaveHospital?.addEventListener('click', () => {
    overlayHospital.classList.add('hidden');
    btnLeaveHospital.classList.add('hidden');
    if (hospitalBarFill) hospitalBarFill.style.width = '0%';
    playerHealth = 100;
    updateHealthUI();
    if (ambulanceRescue) {
      player.setPose(ambulanceRescue.returnX, ambulanceRescue.returnZ, player.getHeadingDeg());
      ambulanceRescue = null;
    }
    // Give breathing room from animals right after hospital discharge
    wildlifeSystem.relocateNear(player.position.x + 28, player.position.z + 24);
    showFeedback({
      type: 'success',
      icon: '❤️',
      text: 'All healed at the hospital! Full 100 / 100 HP restored!',
    });
  });

  // Load saved custom avatar appearance (face, hairstyle, clothes, colors)
  const AVATAR_STORAGE_KEY = 'westdale-avatar-v1';
  let avatarConfig = { ...DEFAULT_AVATAR_CONFIG };
  try {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved) avatarConfig = { ...DEFAULT_AVATAR_CONFIG, ...JSON.parse(saved) };
  } catch {
    // ignore
  }

  function attachHeldStickToAvatar(avatar) {
    if (avatar?.userData?.isRealisticGlb && avatar.userData.rightHandBone) {
      attachStickToHand(avatar);
      return;
    }
    const parent = avatar?.userData?.rightElbowPivot || avatar?.userData?.rightArmPivot;
    if (!parent) return;
    const stick = new THREE.Mesh(
      new THREE.CylinderGeometry(0.024, 0.03, 0.88, 8),
      new THREE.MeshStandardMaterial({ color: 0x92400e, roughness: 0.9 })
    );
    stick.position.set(0, -0.26, 0.34);
    stick.rotation.x = Math.PI / 2.3;
    stick.visible = false;
    parent.add(stick);
    avatar.userData.heldStick = stick;
  }

  let playerAvatar = createPlayerAvatarMesh(avatarConfig);
  attachHeldStickToAvatar(playerAvatar);
  playerAvatar.visible = false; // Shown in Third-Person View
  scene.add(playerAvatar);

  function rebuildPlayerAvatar() {
    const parentScene = insideBuilding ? interiorRoom.scene : scene;
    const wasVisible = playerAvatar.visible;
    const prevPos = playerAvatar.position.clone();
    const prevRotY = playerAvatar.rotation.y;
    parentScene.remove(playerAvatar);
    disposeGroup(playerAvatar);

    playerAvatar = createPlayerAvatarMesh(avatarConfig);
    attachHeldStickToAvatar(playerAvatar);
    playerAvatar.visible = wasVisible;
    playerAvatar.position.copy(prevPos);
    playerAvatar.rotation.y = prevRotY;
    parentScene.add(playerAvatar);
  }

  // Live 3D Avatar Preview Renderer inside Customizer Modal
  let previewRenderer = null;
  let previewScene = null;
  let previewCamera = null;
  let previewAvatar = null;
  let avatarModalOpen = false;

  function ensureAvatarPreview() {
    if (previewRenderer || !avatarPreviewCanvas) return;
    previewScene = new THREE.Scene();
    previewCamera = new THREE.PerspectiveCamera(30, 240 / 300, 0.1, 20);
    previewCamera.position.set(0, 1.0, 3.6);
    previewCamera.lookAt(0, 0.86, 0);

    previewScene.add(new THREE.HemisphereLight(0xffffff, 0xb7c9a8, 1.6));
    const key = new THREE.DirectionalLight(0xfff1dc, 1.8);
    key.position.set(2, 4, 3);
    previewScene.add(key);
    const rim = new THREE.DirectionalLight(0xcfe6ff, 0.9);
    rim.position.set(-3, 2, -2);
    previewScene.add(rim);

    previewRenderer = new THREE.WebGLRenderer({
      canvas: avatarPreviewCanvas,
      antialias: true,
      alpha: true,
    });
    previewRenderer.toneMapping = THREE.ACESFilmicToneMapping;
    previewRenderer.toneMappingExposure = 1.1;
    previewRenderer.setSize(240, 300, false);
    previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function refreshAvatarPreviewMesh() {
    ensureAvatarPreview();
    if (!previewScene) return;
    const prevRot = previewAvatar ? previewAvatar.rotation.y : 0.35;
    if (previewAvatar) {
      previewScene.remove(previewAvatar);
      disposeGroup(previewAvatar);
    }
    previewAvatar = createPlayerAvatarMesh(avatarConfig);
    previewAvatar.rotation.y = prevRot;
    previewScene.add(previewAvatar);
  }

  // ---- Character cards with live thumbnails (rendered in your current colours) ----
  const avatarCharGrid = document.getElementById('avatar-character-grid');
  const avatarPreviewName = document.getElementById('avatar-preview-name');
  const avatarFixedNote = document.getElementById('avatar-fixed-note');
  const avatarHeadNote = document.getElementById('avatar-head-note');
  let thumbRenderer = null;
  let thumbTimer = null;

  function buildCharacterCards() {
    if (!avatarCharGrid) return;
    for (const c of PLAYER_CHARACTERS) {
      // Cards are appended on demand: MetaHumans register themselves once they finish loading
      if (avatarCharGrid.querySelector(`.av-char[data-val="${c.key}"]`)) continue;
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'av-char';
      btn.dataset.val = c.key;
      btn.title = c.label;
      btn.innerHTML = `<span class="av-char-ph">${c.emoji}</span><span class="av-char-label">${c.label}</span>`;
      btn.addEventListener('click', () => setAvatarOption('character', c.key));
      avatarCharGrid.appendChild(btn);
    }
  }

  function renderCharacterThumbs() {
    if (!avatarCharGrid || !areHumanModelsReady()) return;
    try {
      if (!thumbRenderer) {
        thumbRenderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, preserveDrawingBuffer: true });
        thumbRenderer.setPixelRatio(1);
        thumbRenderer.setSize(152, 192, false);
        thumbRenderer.toneMapping = THREE.ACESFilmicToneMapping;
        thumbRenderer.toneMappingExposure = 1.1;
      }
      const tScene = new THREE.Scene();
      tScene.add(new THREE.HemisphereLight(0xffffff, 0xb7c9a8, 1.7));
      const k = new THREE.DirectionalLight(0xfff1dc, 1.8);
      k.position.set(2, 4, 3);
      tScene.add(k);
      // Frame head-to-knees so faces, hats & outfits read clearly on small cards
      const tCam = new THREE.PerspectiveCamera(26, 152 / 192, 0.1, 20);
      tCam.position.set(0, 1.18, 2.75);
      tCam.lookAt(0, 1.04, 0);
      for (const btn of avatarCharGrid.querySelectorAll('.av-char')) {
        const info = PLAYER_CHARACTERS.find((c) => c.key === btn.dataset.val);
        const hat = avatarConfig.hat === 'none' && info?.defaultHat ? info.defaultHat : avatarConfig.hat;
        const mesh = createPlayerAvatarMesh({ ...avatarConfig, character: btn.dataset.val, hat });
        mesh.rotation.y = 0.45;
        tScene.add(mesh);
        thumbRenderer.render(tScene, tCam);
        const url = thumbRenderer.domElement.toDataURL('image/png');
        tScene.remove(mesh);
        disposeGroup(mesh);
        const ph = btn.querySelector('.av-char-ph, img');
        if (ph && ph.tagName === 'IMG') {
          ph.src = url;
        } else if (ph) {
          const img = document.createElement('img');
          img.alt = '';
          img.src = url;
          ph.replaceWith(img);
        }
      }
    } catch (err) {
      console.warn('Avatar thumbnails unavailable', err);
    }
  }

  function scheduleThumbs() {
    if (thumbTimer) clearTimeout(thumbTimer);
    thumbTimer = setTimeout(renderCharacterThumbs, 180);
  }

  function syncAvatarPickerUI() {
    overlayAvatar?.querySelectorAll('[data-avatar-key]').forEach((groupEl) => {
      const key = groupEl.dataset.avatarKey;
      const curVal = avatarConfig[key];
      groupEl.querySelectorAll('[data-val]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.val === curVal);
      });
    });
    // Grey out options the chosen character can't actually show
    const info = PLAYER_CHARACTERS.find((c) => c.key === avatarConfig.character) || PLAYER_CHARACTERS[0];
    const lockHead = Boolean(info.lockHead);
    const hair = avatarConfig.hair || 'own';
    const slotOk = {
      hairstyle: !lockHead,
      haircolor: !lockHead && hair !== 'bald' && (hair !== 'own' || info.slots.includes('hair')),
      hat: !lockHead,
      hatcolor: !lockHead && (avatarConfig.hat === 'cap' || avatarConfig.hat === 'beanie'),
      glasses: !lockHead,
    };
    overlayAvatar?.querySelectorAll('.avatar-group[data-slot]').forEach((g) => {
      const slot = g.dataset.slot;
      const ok = slot in slotOk ? slotOk[slot] : info.slots.includes(slot);
      g.classList.toggle('is-disabled', !ok);
    });
    // Female models have no scalp under their hair, so "Bald" isn't offered for them
    const baldChip = overlayAvatar?.querySelector('[data-avatar-key="hair"] [data-val="bald"]');
    if (baldChip) baldChip.classList.toggle('hidden', isShellHead(info.key));
    avatarFixedNote?.classList.toggle('hidden', info.slots.length > 0);
    avatarHeadNote?.classList.toggle('hidden', !lockHead);
    if (avatarPreviewName) avatarPreviewName.textContent = `${info.emoji} ${info.label}`;
  }

  function setAvatarOption(key, val) {
    avatarConfig[key] = val;
    if (key === 'character') {
      const info = PLAYER_CHARACTERS.find((c) => c.key === val);
      // Workers & farmer come with their own hat unless you've already picked one
      if (info?.defaultHat && avatarConfig.hat === 'none') avatarConfig.hat = info.defaultHat;
      if (avatarConfig.hair === 'bald' && isShellHead(val)) avatarConfig.hair = 'own';
    }
    syncAvatarPickerUI();
    refreshAvatarPreviewMesh();
    if (key !== 'character') scheduleThumbs();
  }

  // Tabs
  overlayAvatar?.querySelectorAll('.avatar-tab').forEach((tab) => {
    tab.addEventListener('click', () => {
      overlayAvatar.querySelectorAll('.avatar-tab').forEach((t) => t.classList.toggle('active', t === tab));
      overlayAvatar.querySelectorAll('.avatar-panel').forEach((p) => {
        p.classList.toggle('hidden', p.dataset.panel !== tab.dataset.tab);
      });
    });
  });

  // 🎲 Surprise Me: random character + coordinated colours + gear
  document.getElementById('btn-avatar-random')?.addEventListener('click', () => {
    const pickFrom = (key) => {
      const vals = [...(overlayAvatar.querySelector(`[data-avatar-key="${key}"]`)?.querySelectorAll('[data-val]') || [])].map(
        (b) => b.dataset.val
      );
      return vals[Math.floor(Math.random() * vals.length)];
    };
    for (const key of ['character', 'hair', 'skinColor', 'hairColor', 'topColor', 'pantsColor', 'shoeColor', 'backpackColor', 'hat', 'hatColor', 'glasses']) {
      const v = key === 'character' ? PLAYER_CHARACTERS[Math.floor(Math.random() * PLAYER_CHARACTERS.length)].key : pickFrom(key);
      if (v) avatarConfig[key] = v;
    }
    // Keep it tasteful: glasses & hats only sometimes
    if (Math.random() < 0.5) avatarConfig.glasses = 'none';
    if (Math.random() < 0.4) avatarConfig.hat = 'none';
    if (Math.random() < 0.35) avatarConfig.hair = 'own';
    if (avatarConfig.hair === 'bald' && isShellHead(avatarConfig.character)) avatarConfig.hair = 'own';
    syncAvatarPickerUI();
    refreshAvatarPreviewMesh();
    scheduleThumbs();
  });

  function openAvatarCustomizer() {
    player.unlock();
    avatarModalOpen = true;
    buildCharacterCards();
    syncAvatarPickerUI();
    refreshAvatarPreviewMesh();
    overlayAvatar.classList.remove('hidden');
    scheduleThumbs();
    if (!areHumanModelsReady()) {
      preloadHumanModels().then(() => {
        if (!avatarModalOpen) return;
        refreshAvatarPreviewMesh();
        scheduleThumbs();
      });
    }
  }

  function closeAvatarCustomizer(switchToThirdPerson = false) {
    avatarModalOpen = false;
    overlayAvatar.classList.add('hidden');
    try {
      localStorage.setItem(AVATAR_STORAGE_KEY, JSON.stringify(avatarConfig));
    } catch {
      // ignore
    }
    rebuildPlayerAvatar();
    if (switchToThirdPerson) {
      player.setViewMode('third');
      btnCameraView.textContent = '👁️ 1st Person View (V)';
      if (!isPlaying && overlayStart.classList.contains('hidden')) {
        startGame();
      }
    }
  }

  overlayAvatar?.querySelectorAll('[data-avatar-key]').forEach((groupEl) => {
    const key = groupEl.dataset.avatarKey;
    if (key === 'character') return; // cards wire themselves
    groupEl.querySelectorAll('[data-val]').forEach((btn) => {
      btn.addEventListener('click', () => setAvatarOption(key, btn.dataset.val));
    });
  });

  btnCustomizeAvatar?.addEventListener('click', openAvatarCustomizer);
  btnCustomizeAvatarHud?.addEventListener('click', openAvatarCustomizer);
  btnAvatarDone?.addEventListener('click', () => closeAvatarCustomizer(true));
  btnAvatarClose?.addEventListener('click', () => closeAvatarCustomizer(false));

  function toggleCameraView() {
    const mode = player.toggleViewMode();
    btnCameraView.textContent = mode === 'third' ? '👁️ 1st Person View (V)' : '👁️ 3rd Person View (V)';
  }

  function openUberModal() {
    if (!isPlaying || uberRide || safety.arrived || safety.gameOver) return;
    player.unlock();
    uberResults.classList.add('hidden');
    uberResults.innerHTML = '';
    uberStatus.textContent = 'Enter any destination address or pick a quick stop below!';
    overlayUber.classList.remove('hidden');
    setTimeout(() => uberDestInput?.focus(), 50);
  }

  function closeUberModal() {
    overlayUber.classList.add('hidden');
  }

  async function startUberRideTo({ lat, lon, x, z, label }) {
    if (uberRide) return;
    uberStatus.textContent = `Summoning your Uber to ${label}...`;

    try {
      let targetX = x;
      let targetZ = z;

      if (typeof lat === 'number' && typeof lon === 'number') {
        const xz = latLonToXZ(lat, lon, ORIGIN);
        targetX = xz.x;
        targetZ = xz.z;

        // Pre-fetch neighborhood around destination if outside currently loaded Westdale preset
        if (dist2D(targetX, targetZ, 0, 0) > 360) {
          uberStatus.textContent = `Loading streets around ${label}...`;
          const rawData = await fetchOverpassRadius(lat, lon, 350);
          const extraParsed = parseOsmElements(rawData.elements || []);
          activeParsed = mergeParsedData(activeParsed, extraParsed);
          chunkManager.addParsedData(extraParsed);
          safety.setWorldData(activeParsed, allSafeWalkways);
        }

        // Snap drop-off safely onto the nearest sidewalk outside buildings!
        let bestRoadHit = null;
        let bestRoad = null;
        for (const r of activeParsed.roads) {
          if (r.highway === 'service') continue;
          for (let i = 0; i < r.points.length - 1; i++) {
            const h = closestPointOnSegment2D(
              targetX,
              targetZ,
              r.points[i].x,
              r.points[i].z,
              r.points[i + 1].x,
              r.points[i + 1].z
            );
            if (!bestRoadHit || h.dist < bestRoadHit.dist) {
              bestRoadHit = h;
              bestRoad = r;
            }
          }
        }
        if (bestRoadHit && bestRoad) {
          const dx = targetX - bestRoadHit.x;
          const dz = targetZ - bestRoadHit.z;
          const len = Math.hypot(dx, dz) || 1;
          const sw = bestRoad.width * 0.5 + 1.0;
          targetX = bestRoadHit.x + (dx / len) * sw;
          targetZ = bestRoadHit.z + (dz / len) * sw;
        }
      }

      closeUberModal();
      if (insideBuilding) exitPublicBuilding(true);
      if (ridingBus) {
        ridingBus.mesh.visible = true;
        ridingBus = null;
      }
      sidewalkWarning.classList.add('hidden');
      busPrompt.classList.add('hidden');
      vehicleInterior.classList.add('hidden');

      const px = player.position.x;
      const pz = player.position.z;
      uberRide = {
        phase: 'approach',
        t: 0,
        duration: 1.4,
        fromX: px + 18,
        fromZ: pz + 10,
        toX: px,
        toZ: pz,
        destX: targetX,
        destZ: targetZ,
        destLabel: label || 'Your Destination',
      };
      uberCarMesh.visible = true;
      uberCarMesh.position.set(uberRide.fromX, 0.08, uberRide.fromZ);
      uberBannerSub.textContent = `Destination: ${uberRide.destLabel}`;
      uberBanner.classList.remove('hidden');
      showFeedback({
        type: 'info',
        icon: '🚗',
        text: `Your Uber to ${uberRide.destLabel} is pulling up now!`,
      });
    } catch (err) {
      uberStatus.textContent = `Could not route to ${label}: ${err.message}`;
    }
  }

  async function runUberSearch() {
    const q = uberDestInput.value.trim();
    if (!q) return;
    btnSearchUber.disabled = true;
    btnSearchUber.textContent = '...';
    uberResults.innerHTML = '';
    uberResults.classList.add('hidden');
    uberStatus.textContent = `Searching "${q}"...`;

    try {
      const results = await searchAddress(q);
      if (results.length === 0) {
        uberStatus.textContent = `No results found for "${q}". Try adding a street or city!`;
      } else {
        uberStatus.textContent = `Choose your Uber destination:`;
        for (const r of results) {
          const item = document.createElement('button');
          item.type = 'button';
          item.className = 'address-result-item';
          item.textContent = `📍 ${r.displayName}`;
          item.addEventListener('click', () => {
            startUberRideTo({ lat: r.lat, lon: r.lon, label: r.shortName });
          });
          uberResults.appendChild(item);
        }
        uberResults.classList.remove('hidden');
      }
    } catch (err) {
      uberStatus.textContent = `Search failed: ${err.message}`;
    } finally {
      btnSearchUber.disabled = false;
      btnSearchUber.textContent = 'Search';
    }
  }

  btnCallUber?.addEventListener('click', openUberModal);
  btnUberCancel?.addEventListener('click', closeUberModal);
  btnSearchUber?.addEventListener('click', runUberSearch);
  uberDestInput?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      runUberSearch();
    }
  });
  uberQuickBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      if (btn.dataset.uberPreset === 'home') {
        startUberRideTo({ x: startPose.x, z: startPose.z, label: 'Your House' });
      } else if (btn.dataset.uberPreset === 'school') {
        startUberRideTo({
          x: destXZ.x,
          z: destXZ.z + 14,
          label: 'Cootes Paradise Elementary School',
        });
      } else {
        startUberRideTo({
          lat: Number.parseFloat(btn.dataset.lat),
          lon: Number.parseFloat(btn.dataset.lon),
          label: btn.dataset.label || btn.textContent.trim(),
        });
      }
    });
  });

  function toggleBusRide() {
    if (!isPlaying || uberRide || safety.arrived || safety.gameOver) return;
    if (ridingBus) {
      // Hop off bus safely onto the nearest sidewalk / bus stop
      const exitPt = trafficSystem.getSafeExitPoint(ridingBus);
      ridingBus.mesh.visible = true;
      ridingBus = null;
      vehicleInterior.classList.add('hidden');
      player.setPose(exitPt.x, exitPt.z, player.getHeadingDeg());
      showFeedback({
        type: 'success',
        icon: '🚌',
        text: `Hopped off safely at ${exitPt.stopName}!`,
      });
    } else {
      const nearBus = trafficSystem.getNearbyBus(player.position);
      if (nearBus) {
        ridingBus = nearBus;
        ridingBus.mesh.visible = false; // Hide exterior box so panoramic cabin view is clear
        const busHeading = forwardToHeadingDeg(ridingBus.dirX, ridingBus.dirZ);
        player.setPose(ridingBus.x, ridingBus.z, busHeading);
        safety.offSidewalkSec = 0;
        safety.wasOffSidewalk = false;
        showFeedback({
          type: 'success',
          icon: '🚌',
          text: 'All aboard the School Bus! Look out the windshield and press F to get off at a stop!',
        });
      }
    }
  }

  let activeNpcDialogId = null;
  let npcDialogTimer = null;

  function closeNpcDialog() {
    npcDialog.classList.add('hidden');
    activeNpcDialogId = null;
    if (npcDialogTimer) {
      clearTimeout(npcDialogTimer);
      npcDialogTimer = null;
    }
  }
  btnCloseNpcDialog?.addEventListener('click', closeNpcDialog);
  let insideBuilding = null;
  let outdoorReturnPose = null;
  let lastBuildingExitAt = 0;
  let lastBuildingEnterAt = 0;
  let notifiedParentsBeforeLeaving = false;
  let lastParentWarnAt = 0;
  let postureState = null; // { kind: 'chair' | 'bed', target, returnX, returnZ, returnFloorY, startedAt }
  const interiorRoom = new InteriorRoom();

  function getYourHouseBuilding() {
    const existing = activeParsed.buildings.find((b) => b.category === 'home');
    if (existing && dist2D(existing.centroid.x, existing.centroid.z, startPose.x, startPose.z) < 45) {
      return existing;
    }
    // Custom starting home address anywhere on the map!
    return {
      id: 836552889,
      name: currentHomeInfo.label || 'Your House',
      houseNumber: '',
      streetAddr: currentHomeInfo.label || 'Westdale',
      category: 'home',
      placeType: 'home',
      isPublicAccess: false,
      floors: 2,
      height: 6.6,
      frontPt: { x: startPose.x, z: startPose.z },
      frontAngle: ((startPose.headingDeg || 0) * Math.PI) / 180,
    };
  }

  function spawnInsideYourHouse() {
    postureState = null;
    notifiedParentsBeforeLeaving = false;
    const homeBld = getYourHouseBuilding();
    insideBuilding = homeBld;
    lastBuildingEnterAt = performance.now();
    outdoorReturnPose = {
      x: startPose.x,
      z: startPose.z,
      headingDeg: startPose.headingDeg,
    };

    interiorRoom.loadBuilding(homeBld);
    scene.remove(playerAvatar);
    interiorRoom.scene.add(playerAvatar);
    scene.remove(camera);
    interiorRoom.scene.add(camera);
    // Start inside Your House near the Foyer / Living Room looking toward the Kitchen & Stairs!
    player.setPose(-3.6, 5.2, 22, 0);
    camera.updateMatrixWorld(true);
  }

  function standUpFromFurniture(announce = false) {
    if (!postureState) return;
    const prev = postureState;
    postureState = null;
    player.floorY = prev.returnFloorY;
    player.position.set(prev.returnX, prev.returnFloorY + 1.5, prev.returnZ);
    player.syncCameraToPosition();
    if (announce) {
      showFeedback({
        type: 'info',
        icon: '🧍',
        text: `Stood up from the ${prev.target.label}!`,
      });
    }
  }

  function toggleInteriorFurniture() {
    if (!insideBuilding || !isPlaying) return;
    if (postureState) {
      standUpFromFurniture(true);
      return;
    }
    const item = interiorRoom.getNearbyInteractable(player.position, player.floorY);
    if (!item) return;

    const returnX = item.kind === 'bed' ? item.standX : player.position.x;
    const returnZ = item.kind === 'bed' ? item.standZ : player.position.z;
    postureState = {
      kind: item.kind,
      target: item,
      returnX,
      returnZ,
      returnFloorY: item.yBase,
      startedAt: performance.now(),
    };
    player.isMoving = false;
    const lookDeg = ((item.rotY || 0) * 180) / Math.PI;
    player.setPose(item.x, item.z, item.kind === 'bed' ? 180 : lookDeg, item.yBase);
    showFeedback({
      type: 'info',
      icon: item.kind === 'bed' ? '🛏️' : '🪑',
      text:
        item.kind === 'bed'
          ? `Lying down on ${item.label}! Move mouse to look around, or press F / WASD to get up.`
          : `Sitting on ${item.label}! Move mouse to look around, or press F / WASD to stand up.`,
    });
  }

  function getBuildingDisplayLabel(b) {
    if (!b) return 'Building';
    if (b.name) return b.name;
    if (b.houseNumber) return `#${b.houseNumber} ${b.streetAddr || 'House'}`.trim();
    return b.streetAddr ? `${b.streetAddr} House` : 'Neighborhood House';
  }

  function findNearbyEnterableBuilding(pos, maxDist = 4.6) {
    let best = null;
    let bestDist = Infinity;
    for (const b of chunkManager.getActiveBuildings()) {
      if (!b.frontPt) continue;
      // Don't hijack victory beacon right at the active destination!
      if (dist2D(b.frontPt.x, b.frontPt.z, destXZ.x, destXZ.z) < 10) continue;
      const d = dist2D(pos.x, pos.z, b.frontPt.x, b.frontPt.z);
      if (d <= maxDist && d < bestDist) {
        bestDist = d;
        best = { building: b, dist: d };
      }
    }
    return best;
  }

  function enterPublicBuilding(b) {
    if (!b || insideBuilding || ridingBus || uberRide || safety.arrived || safety.gameOver) return;
    if (!isPlaying) {
      isPlaying = true;
      overlayStart.classList.add('hidden');
      overlayVictory.classList.add('hidden');
      overlayGameOver.classList.add('hidden');
    }
    enterBuildingPrompt?.blur?.();
    if (document.activeElement && document.activeElement !== document.body) {
      document.activeElement.blur?.();
    }
    postureState = null;
    insideBuilding = b;
    lastBuildingEnterAt = performance.now();

    const pushX = Math.sin(b.frontAngle || 0) * 2.4;
    const pushZ = Math.cos(b.frontAngle || 0) * 2.4;
    outdoorReturnPose = {
      x: b.frontPt.x + pushX,
      z: b.frontPt.z + pushZ,
      headingDeg: ((b.frontAngle || 0) * 180) / Math.PI,
    };

    const roomSpawn = interiorRoom.loadBuilding(b);
    scene.remove(playerAvatar);
    interiorRoom.scene.add(playerAvatar);
    scene.remove(camera);
    interiorRoom.scene.add(camera);
    player.setPose(roomSpawn.x, roomSpawn.z, roomSpawn.headingDeg, roomSpawn.floorY || 0);
    camera.updateMatrixWorld(true);

    const bLabel = getBuildingDisplayLabel(b);
    const flInfo = interiorRoom.floors > 1 ? ` (${interiorRoom.floors} Floors — stairs on the right!)` : ' (1 Floor)';
    npcDialog.classList.add('hidden');
    showFeedback({
      type: 'success',
      icon: b.isPublicAccess ? '🚪' : '🏠',
      text: `Entered ${bLabel}${flInfo}! Walk around, press F on chairs/beds, or press G to exit.`,
    });
  }

  function exitPublicBuilding(forceExit = false) {
    if (!insideBuilding) return;
    if (!forceExit && insideBuilding.placeType === 'home' && !notifiedParentsBeforeLeaving) {
      const nowMs = performance.now();
      if (nowMs - lastParentWarnAt > 2000) {
        lastParentWarnAt = nowMs;
        showFeedback({
          type: 'warning',
          icon: '🏡',
          text: 'Wait! Let Mom or Dad know before leaving the house! Find 👩 Mom or 👨 Dad inside (check upstairs too!) and press T!',
        });
      }
      return;
    }

    postureState = null;
    const b = insideBuilding;
    insideBuilding = null;
    lastBuildingExitAt = performance.now();
    npcDialog.classList.add('hidden');
    activeNpcDialogId = null;

    interiorRoom.scene.remove(playerAvatar);
    scene.add(playerAvatar);
    interiorRoom.scene.remove(camera);
    scene.add(camera);
    if (outdoorReturnPose) {
      player.setPose(outdoorReturnPose.x, outdoorReturnPose.z, outdoorReturnPose.headingDeg, 0);
    }
    camera.updateMatrixWorld(true);
    showFeedback({
      type: 'info',
      icon: '🚶',
      text: `Stepped outside ${getBuildingDisplayLabel(b)} onto the sidewalk! Stay safe & watch the crosswalks!`,
    });
  }

  enterBuildingPrompt.addEventListener('click', () => {
    if (insideBuilding) {
      exitPublicBuilding(false);
    } else {
      const hit = findNearbyEnterableBuilding(player.position, 4.8);
      if (hit) enterPublicBuilding(hit.building);
    }
  });

  function talkToNearbyNpc() {
    if (!isPlaying || ridingBus || uberRide || safety.arrived || safety.gameOver) return;

    // If inside a building/house, talk to the nearby Parent / Homeowner / Worker NPC!
    if (insideBuilding) {
      const res = interiorRoom.getNearbyResident(player.position, player.floorY);
      if (!res) return;
      const line = interiorRoom.getRandomResidentLine(res);
      activeNpcDialogId = res.id;
      npcDialogName.textContent = `${res.emoji} ${res.name}`;
      npcDialogRole.textContent = res.role;
      npcDialogText.textContent = `"${line}"`;
      npcDialog.classList.remove('hidden');

      if (res.isParent && !notifiedParentsBeforeLeaving) {
        notifiedParentsBeforeLeaving = true;
        showFeedback({
          type: 'success',
          icon: '❤️',
          text: `You let ${res.name} know you’re leaving! The front door is now unlocked — head out safely!`,
        });
      }

      if (npcDialogTimer) clearTimeout(npcDialogTimer);
      npcDialogTimer = setTimeout(() => {
        npcDialog.classList.add('hidden');
        activeNpcDialogId = null;
      }, 6500);
      return;
    }

    const npc = pedestrianSystem.getNearbyNpc(player.position);
    if (!npc) return;

    const line = pedestrianSystem.getRandomLine(npc);
    activeNpcDialogId = npc.id;
    npcDialogName.textContent = `${npc.emoji} ${npc.name}`;
    npcDialogRole.textContent = npc.role;
    npcDialogText.textContent = `"${line}"`;
    npcDialog.classList.remove('hidden');

    if (npcDialogTimer) clearTimeout(npcDialogTimer);
    npcDialogTimer = setTimeout(() => {
      npcDialog.classList.add('hidden');
      activeNpcDialogId = null;
    }, 6500);
  }

  window.addEventListener('keydown', (e) => {
    if (document.activeElement?.tagName === 'INPUT') return;
    if (e.code === 'KeyG') {
      if (insideBuilding) {
        exitPublicBuilding();
      } else {
        const hit = findNearbyEnterableBuilding(player.position, 4.8);
        if (hit) enterPublicBuilding(hit.building);
      }
      return;
    }
    if (e.code === 'KeyX' && activeNpcDialogId) {
      closeNpcDialog();
      return;
    }
    if (e.code === 'KeyT') talkToNearbyNpc();
    if (e.code === 'KeyV') toggleCameraView();
    if (e.code === 'KeyR') btnRouteHint.click();
    if (e.code === 'KeyM') toggleExpandMap();
    if (e.code === 'KeyC') setAttackMode(!attackMode);
    if (e.code === 'Digit1') selectWeapon('rock', true);
    if (e.code === 'Digit2') selectWeapon('stick', true);
    if (e.code === 'KeyB') {
      setStickAction(stickAction === 'wield' ? 'throw' : 'wield', true);
    }
    if (e.code === 'Space' && postureState) {
      e.preventDefault();
      standUpFromFurniture(true);
      return;
    }
    if (e.code === 'Space' && attackMode) {
      e.preventDefault();
      performAttack(null, null, false);
      return;
    }
    if (insideBuilding) {
      if (e.code === 'KeyF') {
        toggleInteriorFurniture();
      }
      return;
    }
    if (e.code === 'KeyF') toggleBusRide();
    if (e.code === 'KeyU') openUberModal();
  });
  busPrompt.addEventListener('click', () => {
    busPrompt.blur?.();
    if (insideBuilding) {
      toggleInteriorFurniture();
    } else {
      toggleBusRide();
    }
  });
  npcPrompt.addEventListener('click', talkToNearbyNpc);
  btnCameraView.addEventListener('click', toggleCameraView);

  // Wire Dual-Thumb Touch Controls for iPad & iPhone
  if (player.isTouchDevice && touchControlsEl && touchJoystickEl && touchJoystickKnob) {
    touchControlsEl.classList.remove('hidden');

    let joyTouchId = null;
    const maxRadius = 42;

    const updateJoystick = (clientX, clientY) => {
      const rect = touchJoystickEl.getBoundingClientRect();
      const cx = rect.left + rect.width * 0.5;
      const cy = rect.top + rect.height * 0.5;
      let dx = clientX - cx;
      let dy = clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist > maxRadius) {
        dx = (dx / dist) * maxRadius;
        dy = (dy / dist) * maxRadius;
      }
      touchJoystickKnob.style.transform = `translate(${dx}px, ${dy}px)`;
      // Up on screen (negative dy) = walk forward (+Z); Right (+dx) = strafe right (+X)
      player.setTouchMove(dx / maxRadius, -dy / maxRadius);
    };

    const resetJoystick = () => {
      joyTouchId = null;
      touchJoystickKnob.style.transform = 'translate(0px, 0px)';
      player.setTouchMove(0, 0);
    };

    touchJoystickEl.addEventListener(
      'touchstart',
      (e) => {
        e.preventDefault();
        if (joyTouchId !== null) return;
        const t = e.changedTouches[0];
        if (!t) return;
        joyTouchId = t.identifier;
        updateJoystick(t.clientX, t.clientY);
      },
      { passive: false }
    );

    touchJoystickEl.addEventListener(
      'touchmove',
      (e) => {
        e.preventDefault();
        if (joyTouchId === null) return;
        for (const t of e.changedTouches) {
          if (t.identifier === joyTouchId) {
            updateJoystick(t.clientX, t.clientY);
            break;
          }
        }
      },
      { passive: false }
    );

    const endJoy = (e) => {
      if (joyTouchId === null) return;
      for (const t of e.changedTouches) {
        if (t.identifier === joyTouchId) {
          resetJoystick();
          break;
        }
      }
    };
    touchJoystickEl.addEventListener('touchend', endJoy, { passive: true });
    touchJoystickEl.addEventListener('touchcancel', endJoy, { passive: true });

    // Hold-to-look left/right helper buttons for easy crosswalk checks on iPad/iPhone
    const bindHoldBtn = (btn, onChange) => {
      if (!btn) return;
      const start = (e) => {
        e.preventDefault();
        onChange(true);
      };
      const end = () => onChange(false);
      btn.addEventListener('touchstart', start, { passive: false });
      btn.addEventListener('touchend', end, { passive: true });
      btn.addEventListener('touchcancel', end, { passive: true });
      btn.addEventListener('mousedown', start);
      window.addEventListener('mouseup', end);
    };

    let lookLHeld = false;
    let lookRHeld = false;
    bindHoldBtn(btnTouchLookLeft, (v) => {
      lookLHeld = v;
      player.setTouchTurn(lookLHeld, lookRHeld);
    });
    bindHoldBtn(btnTouchLookRight, (v) => {
      lookRHeld = v;
      player.setTouchTurn(lookLHeld, lookRHeld);
    });
  }

  // Expose debug handle for automated verification
  window.__WESTDALE_GAME__ = {
    player,
    safety,
    trafficSystem,
    miniMap,
    parsed,
    startPose,
    destXZ,
    busStops: busStopsData.stops,
    toggleBusRide,
    exitBuilding: () => exitPublicBuilding(true),
    renderStats: () => ({ calls: renderer.info.render.calls, triangles: renderer.info.render.triangles, quality: visuals.quality }),
    debugEquipStick: () => {
      stickCount = Math.max(stickCount, 1);
      selectedWeapon = 'stick';
      stickAction = 'wield';
    },
    setPlayerPose: (x, z, headingDeg) => {
      player.setPose(x, z, headingDeg);
      chunkManager.update(x, z);
      miniMap.updatePlayer(x, z, player.getHeadingDeg());
    },
  };

  function startGame() {
    isPlaying = true;
    overlayStart.classList.add('hidden');
    overlayVictory.classList.add('hidden');
    overlayGameOver.classList.add('hidden');
    sidewalkWarning.classList.add('hidden');
    player.lock();
    if (insideBuilding && insideBuilding.placeType === 'home' && !notifiedParentsBeforeLeaving) {
      showFeedback({
        type: 'info',
        icon: '🏡',
        text: 'Good morning! Explore Your House (press F to sit on chairs or lie on beds) and press T to tell Mom or Dad before leaving!',
      });
    } else {
      showFeedback({
        type: 'info',
        icon: '🏠',
        text: 'Move mouse to look around! Press ESC anytime to free your cursor and click HUD buttons.',
      });
    }
  }

  function pauseGame() {
    if (!isPlaying || safety.arrived || safety.gameOver) return;
    isPlaying = false;
    overlayTitle.textContent = 'Walk Paused';
    btnStart.textContent = 'Resume Walking';
    overlayStart.classList.remove('hidden');
  }

  function resetToHomePicker() {
    isPlaying = false;
    player.unlock();
    if (insideBuilding) {
      insideBuilding = null;
      interiorRoom.scene.remove(playerAvatar);
      scene.add(playerAvatar);
      interiorRoom.scene.remove(camera);
      scene.add(camera);
    }
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    uberRide = null;
    uberCarMesh.visible = false;
    uberBanner.classList.add('hidden');
    overlayUber.classList.add('hidden');
    ambulanceRescue = null;
    ambulanceMesh.visible = false;
    overlayHospital?.classList.add('hidden');
    playerHealth = 100;
    rockCount = 10;
    stickCount = 0;
    selectedWeapon = 'rock';
    stickAction = 'wield';
    stickSwingTimer = 0;
    pendingStickHit = 0;
    stickSwingCooldown = 0;
    updateHealthUI();
    updateAmmoUI();
    setAttackMode(false);
    vehicleInterior.classList.add('hidden');
    sidewalkWarning.classList.add('hidden');
    busPrompt.classList.add('hidden');
    npcPrompt.classList.add('hidden');
    npcDialog.classList.add('hidden');
    enterBuildingPrompt.classList.add('hidden');
    trafficLightHud.classList.add('hidden');
    lookWarningHud.classList.add('hidden');
    overlayVictory.classList.add('hidden');
    overlayGameOver.classList.add('hidden');

    safety.reset();
    updateStarsUI(3);
    pointsPill.textContent = `🏆 ${safety.points} pts`;
    chunkManager.update(startPose.x, startPose.z);
    miniMap.updatePlayer(startPose.x, startPose.z, startPose.headingDeg);
    spawnInsideYourHouse();

    overlayTitle.textContent = 'Restart & Choose Your Home';
    btnStart.textContent = 'Start Walking!';
    overlayStart.classList.remove('hidden');
    setTimeout(() => homeAddressInput?.focus(), 50);
  }

  function restartGame() {
    if (insideBuilding) {
      insideBuilding = null;
      interiorRoom.scene.remove(playerAvatar);
      scene.add(playerAvatar);
      interiorRoom.scene.remove(camera);
      scene.add(camera);
    }
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    uberRide = null;
    uberCarMesh.visible = false;
    uberBanner.classList.add('hidden');
    overlayUber.classList.add('hidden');
    ambulanceRescue = null;
    ambulanceMesh.visible = false;
    overlayHospital?.classList.add('hidden');
    playerHealth = 100;
    rockCount = 10;
    stickCount = 0;
    selectedWeapon = 'rock';
    stickAction = 'wield';
    stickSwingTimer = 0;
    pendingStickHit = 0;
    stickSwingCooldown = 0;
    updateHealthUI();
    updateAmmoUI();
    setAttackMode(false);
    vehicleInterior.classList.add('hidden');
    safety.reset();
    updateStarsUI(3);
    pointsPill.textContent = `🏆 ${safety.points} pts`;
    sidewalkWarning.classList.add('hidden');
    busPrompt.classList.add('hidden');
    overlayGameOver.classList.add('hidden');
    chunkManager.update(startPose.x, startPose.z);
    miniMap.updatePlayer(startPose.x, startPose.z, startPose.headingDeg);
    spawnInsideYourHouse();
    overlayTitle.textContent = 'Westdale Safe Walk';
    btnStart.textContent = 'Start Walking!';
    startGame();
  }

  function showGameOver(reason) {
    isPlaying = false;
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    vehicleInterior.classList.add('hidden');
    player.unlock();
    sidewalkWarning.classList.add('hidden');
    gameOverReason.textContent =
      reason ||
      'You stayed in the road lane for more than 5 seconds. Always walk on the sidewalk and cross only at white zebra crosswalks!';
    overlayGameOver.classList.remove('hidden');
  }

  function showVictory(elapsedSec) {
    isPlaying = false;
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    vehicleInterior.classList.add('hidden');
    player.unlock();
    sidewalkWarning.classList.add('hidden');
    const s = safety.stars;
    if (victoryHeading) victoryHeading.textContent = `Arrived Safely!`;
    if (victorySubtitle) {
      victorySubtitle.innerHTML = `Welcome to <strong>${currentDestInfo.label}</strong>!`;
    }
    victoryStars.textContent = '★'.repeat(s) + '☆'.repeat(3 - s);
    if (s === 3) {
      victoryMessage.textContent = `Amazing job! You earned ${safety.points} Safety Points and all 3 Stars!`;
    } else if (s === 2) {
      victoryMessage.textContent = `Great walk! You earned ${safety.points} Safety Points — keep practicing those crosswalk checks!`;
    } else {
      victoryMessage.textContent = `You made it to school with ${safety.points} Safety Points! Try again for an even higher score!`;
    }
    victoryStats.innerHTML = `
      <div class="stat-box"><div class="stat-value">${safety.points}</div><div class="stat-label">Safety Pts</div></div>
      <div class="stat-box"><div class="stat-value">${elapsedSec || 0}s</div><div class="stat-label">Walk Time</div></div>
      <div class="stat-box"><div class="stat-value">${safety.safeCrossings}</div><div class="stat-label">Safe Crossings</div></div>
    `;
    overlayVictory.classList.remove('hidden');
  }

  // Wire UI Buttons & PointerLock events
  btnStart.disabled = false;
  btnStart.addEventListener('click', startGame);
  btnPause.addEventListener('click', () => {
    player.unlock();
    pauseGame();
  });
  btnPlayAgain.addEventListener('click', restartGame);
  btnTryAgain.addEventListener('click', restartGame);
  btnRestartHome.addEventListener('click', resetToHomePicker);
  btnVictoryChangeHome?.addEventListener('click', resetToHomePicker);
  btnGameOverChangeHome?.addEventListener('click', resetToHomePicker);

  btnRouteHint.addEventListener('click', async () => {
    const visible = await miniMap.toggleRouteHint();
    btnRouteHint.textContent = visible ? '🗺️ Hide Route Hint' : '🗺️ Show Route Hint';
    btnRouteHint.classList.toggle('active', visible);
  });

  async function toggleExpandMap() {
    const nextExpanded = !miniMap.isExpanded;
    if (nextExpanded) {
      player.unlock(); // Free cursor on desktop so user can zoom & drag the map!
    }
    minimapWrapper.classList.toggle('expanded', nextExpanded);
    btnExpandMap.textContent = nextExpanded ? '✕ Close' : '⤢';
    btnFitRoute.classList.toggle('hidden', !nextExpanded);
    minimapLegend.classList.toggle('hidden', !nextExpanded);
    await miniMap.setExpanded(nextExpanded);
    if (miniMap.routeVisible) {
      btnRouteHint.textContent = '🗺️ Hide Route Hint';
      btnRouteHint.classList.add('active');
    }
  }

  btnExpandMap?.addEventListener('click', toggleExpandMap);
  btnFitRoute?.addEventListener('click', () => miniMap.fitFullRoute());

  player.controls.addEventListener('unlock', () => {
    // Releasing pointer lock with ESC frees the cursor WITHOUT pausing so you can click any HUD button!
    if (isPlaying && !safety.arrived && !safety.gameOver) {
      showFeedback({
        type: 'info',
        icon: '🖱️',
        text: 'Cursor free! Click any HUD button, or click the 3D scene to look with mouse again.',
      });
    }
  });

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    visuals.resize();
  });

  // Main Animation Loop
  let prevTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - prevTime) / 1000);
    vegetationUniforms.uTime.value = now / 1000;
    prevTime = now;

    // Spin live 3D avatar preview while customizer modal is open
    if (avatarModalOpen && previewRenderer && previewScene && previewCamera && previewAvatar) {
      previewAvatar.rotation.y += dt * 0.6;
      if (previewAvatar.userData?.isRealisticGlb) {
        previewAvatar.userData.updateAnim(dt);
      }
      previewRenderer.render(previewScene, previewCamera);
    }

    // Spin school entrance beacon crystal
    const crystal = schoolBeacon.getObjectByName('beaconCrystal');
    if (crystal) {
      crystal.rotation.y += dt * 1.4;
      crystal.position.y = 3.2 + Math.sin(now * 0.003) * 0.35;
    }

    // === WALKABLE MULTI-FLOOR 3D BUILDING & HOUSE INTERIOR LOOP ===
    if (insideBuilding) {
      fpStickPivot.visible = false;
      fpRockMesh.visible = false;
      const interiorCanMove = overlayStart.classList.contains('hidden') && !avatarModalOpen;

      if (postureState) {
        // Allow Q/E keyboard rotation while seated/lying, and stand up automatically if WASD/joystick moved after 0.45s!
        const wantsMove =
          player.keys.forward ||
          player.keys.backward ||
          player.keys.left ||
          player.keys.right ||
          Math.hypot(player.touchMoveX, player.touchMoveZ) > 0.25;
        if (interiorCanMove && wantsMove && now - postureState.startedAt > 450) {
          standUpFromFurniture(false);
        } else {
          if (interiorCanMove && (player.keys.turnLeft || player.keys.turnRight)) {
            const euler = new THREE.Euler().setFromQuaternion(camera.quaternion, 'YXZ');
            if (player.keys.turnLeft) euler.y += 2.0 * dt;
            if (player.keys.turnRight) euler.y -= 2.0 * dt;
            camera.quaternion.setFromEuler(euler);
          }
          const t = postureState.target;
          player.floorY = t.yBase;
          player.position.set(t.x, t.yBase + 1.5, t.z);
          player.syncCameraToPosition();
          if (player.viewMode === 'first') {
            camera.position.set(
              t.x,
              postureState.kind === 'bed' ? t.bedTopY + 0.35 : t.yBase + 1.08,
              t.z
            );
          }
        }
      }

      if (!postureState) {
        player.update(dt, [], interiorCanMove);
        player.floorY = interiorRoom.resolveCollisions(player.position, player.floorY);
        // Prevent walking out of Your House until Mom or Dad has been notified!
        if (
          insideBuilding.placeType === 'home' &&
          !notifiedParentsBeforeLeaving &&
          player.floorY <= 0.6 &&
          Math.abs(player.position.x) <= 2.1 &&
          player.position.z > 9.45
        ) {
          player.position.z = 9.45;
          if (now - lastParentWarnAt > 2000) {
            lastParentWarnAt = now;
            showFeedback({
              type: 'warning',
              icon: '🏡',
              text: 'Wait! Let Mom or Dad know before leaving the house! Find 👩 Mom or 👨 Dad inside and press T!',
            });
          }
        }
        player.syncCameraToPosition();
      }

      // Keep 3rd-person camera cleanly inside the building walls
      if (player.viewMode === 'third') {
        camera.position.x = Math.max(-11.4, Math.min(11.4, camera.position.x));
        camera.position.z = Math.max(-10.4, Math.min(10.4, camera.position.z));
      }
      interiorRoom.update(player.position, dt, activeNpcDialogId);

      const pos = player.position;
      const headingDeg = player.getHeadingDeg();
      const curFloorNum = interiorRoom.getCurrentFloorNumber(player.floorY);

      // Update Third-Person Avatar inside the multi-floor building (walk, idle, sit on chair, or lie on bed!)
      const showAvatar = player.viewMode === 'third';
      playerAvatar.visible = showAvatar;
      if (showAvatar) {
        if (postureState) {
          const t = postureState.target;
          playerAvatar.position.set(t.x, postureState.kind === 'bed' ? t.bedTopY : t.yBase + 0.02, t.z);
          playerAvatar.rotation.y = postureState.kind === 'bed' ? Math.PI : t.rotY || 0;
          if (playerAvatar.userData?.isRealisticGlb) {
            playerAvatar.userData.setAnimState(postureState.kind === 'bed' ? 'lie' : 'sit');
            playerAvatar.userData.updateAnim(dt);
          } else {
            animateHumanWalk(playerAvatar, 0, false, now * 0.001, {
              posture: postureState.kind === 'bed' ? 'lie' : 'sit',
            });
          }
        } else {
          playerAvatar.position.set(pos.x, player.floorY + 0.02, pos.z);
          const headingRad = (headingDeg * Math.PI) / 180;
          playerAvatar.rotation.y = Math.atan2(Math.sin(headingRad), -Math.cos(headingRad));
          if (playerAvatar.userData?.isRealisticGlb) {
            playerAvatar.userData.setAnimState(player.isMoving ? 'walk' : 'idle', 3.4);
            playerAvatar.userData.updateAnim(dt);
          } else {
            animateHumanWalk(playerAvatar, player.walkCycle, player.isMoving, now * 0.001);
          }
        }
      }

      zonePill.className = 'pill pill-green';
      zonePill.textContent = `🏠 ${getBuildingDisplayLabel(insideBuilding)} • Floor ${curFloorNum}/${interiorRoom.floors}`;
      sidewalkWarning.classList.add('hidden');
      trafficLightHud.classList.add('hidden');
      lookWarningHud.classList.add('hidden');
      lookBadge.classList.add('hidden');

      // Chair / Bed Sit & Lie Down Prompt (uses #bus-prompt button so F & tap both work!)
      if (interiorCanMove) {
        if (postureState) {
          busPrompt.classList.remove('hidden');
          busPrompt.classList.add('riding');
          busPrompt.innerHTML =
            postureState.kind === 'bed'
              ? `🛏️ Lying on ${postureState.target.label} — Press <kbd>F</kbd> or Move to Get Up`
              : `🪑 Sitting on ${postureState.target.label} — Press <kbd>F</kbd> or Move to Stand Up`;
        } else {
          const nearFurn = interiorRoom.getNearbyInteractable(pos, player.floorY);
          if (nearFurn) {
            busPrompt.classList.remove('hidden');
            busPrompt.classList.remove('riding');
            busPrompt.innerHTML =
              nearFurn.kind === 'bed'
                ? `🛏️ Press <kbd>F</kbd> to Lie Down on ${nearFurn.label}`
                : `🪑 Press <kbd>F</kbd> to Sit on ${nearFurn.label}`;
          } else {
            busPrompt.classList.add('hidden');
          }
        }
      } else {
        busPrompt.classList.add('hidden');
      }

      // Show Exit / Parent-Check prompt & auto-exit when walking out the ground-floor green EXIT door
      const needsParentCheck = insideBuilding.placeType === 'home' && !notifiedParentsBeforeLeaving;
      enterBuildingPrompt.classList.remove('hidden');
      if (needsParentCheck) {
        enterBuildingPrompt.innerHTML = `🔒 Find 👩 Mom or 👨 Dad &amp; Press <kbd>T</kbd> Before Leaving House!`;
      } else {
        enterBuildingPrompt.innerHTML =
          curFloorNum > 1
            ? `🪜 Floor ${curFloorNum}/${interiorRoom.floors} — Walk Down Stairs or Press <kbd>G</kbd> to Exit`
            : `🚪 Walk to Front Door or Press <kbd>G</kbd> to Go Outside`;
      }
      if (!needsParentCheck && !postureState && interiorRoom.isAtExitDoor(pos, player.floorY) && now - lastBuildingEnterAt > 1600) {
        exitPublicBuilding(false);
        renderer.render(scene, camera);
        return;
      }

      // Show Talk prompt when near Mom, Dad, Homeowner, or Worker NPC!
      const nearRes = interiorCanMove ? interiorRoom.getNearbyResident(pos, player.floorY) : null;
      if (nearRes) {
        npcPrompt.classList.remove('hidden');
        npcPrompt.innerHTML =
          nearRes.isParent && !notifiedParentsBeforeLeaving
            ? `💬 Press <kbd>T</kbd> to Let ${nearRes.emoji} ${nearRes.name} Know You’re Leaving!`
            : `💬 Press <kbd>T</kbd> to Talk to ${nearRes.emoji} ${nearRes.name}`;
      } else {
        npcPrompt.classList.add('hidden');
        if (activeNpcDialogId && interiorRoom.residents.some((r) => r.id === activeNpcDialogId)) {
          npcDialog.classList.add('hidden');
          activeNpcDialogId = null;
        }
      }

      camera.updateMatrixWorld(true);
      renderer.render(interiorRoom.scene, camera);
      return;
    }

    const activeBuildings = chunkManager.getActiveBuildings();
    if (!ridingBus && !uberRide && !ambulanceRescue) {
      // Build solid colliders so player cannot walk through people, bus stops, or stopped vehicles!
      const solidCircles = [];
      for (const npc of pedestrianSystem.npcs) {
        solidCircles.push({ x: npc.x, z: npc.z, r: 0.48 });
      }
      for (const stop of busStopsData.stops) {
        solidCircles.push({ x: stop.x, z: stop.z, r: 0.95 });
      }
      for (const c of chunkManager.getParkedCarColliders(player.position.x, player.position.z, 25)) {
        solidCircles.push(c);
      }
      for (const car of trafficSystem.cars) {
        if (car.currentSpeed <= 1.2) {
          solidCircles.push({ x: car.x, z: car.z, r: car.isBus ? 2.1 : 1.45 });
        }
      }
      player.update(dt, activeBuildings, isPlaying, solidCircles);
    }

    // Handle active Ambulance Rescue -> Hospital Treatment sequence!
    if (ambulanceRescue) {
      ambulanceRescue.t += dt;
      const flash = Math.floor(now / 170) % 2 === 0;
      ambulanceMesh.userData.redLightMat.color.setHex(flash ? 0xff2222 : 0x450a0a);
      ambulanceMesh.userData.whiteLightMat.color.setHex(flash ? 0x64748b : 0xffffff);

      if (ambulanceRescue.phase === 'approach' || ambulanceRescue.phase === 'ride') {
        const u = Math.min(1, ambulanceRescue.t / ambulanceRescue.duration);
        const ease = u * u * (3 - 2 * u);
        const cx = ambulanceRescue.fromX + (ambulanceRescue.toX - ambulanceRescue.fromX) * ease;
        const cz = ambulanceRescue.fromZ + (ambulanceRescue.toZ - ambulanceRescue.fromZ) * ease;
        const dx = ambulanceRescue.toX - ambulanceRescue.fromX;
        const dz = ambulanceRescue.toZ - ambulanceRescue.fromZ;
        ambulanceMesh.position.set(cx, 0.08, cz);
        ambulanceMesh.rotation.y = Math.atan2(dx, dz);

        if (ambulanceRescue.phase === 'ride') {
          ambulanceMesh.visible = false;
          const ambHeading = forwardToHeadingDeg(dx, dz);
          player.setPose(cx, cz, ambHeading);
          camera.position.set(cx, 1.7, cz);
        }

        if (u >= 1) {
          if (ambulanceRescue.phase === 'approach') {
            ambulanceRescue.phase = 'ride';
            ambulanceRescue.t = 0;
            ambulanceRescue.duration = 2.8;
            ambulanceRescue.fromX = ambulanceRescue.toX;
            ambulanceRescue.fromZ = ambulanceRescue.toZ;
            ambulanceRescue.toX = ambulanceRescue.returnX + 60;
            ambulanceRescue.toZ = ambulanceRescue.returnZ - 45;
          } else {
            // Arrived at Hamilton Children's Hospital — start treatment!
            ambulanceRescue.phase = 'hospital';
            ambulanceRescue.t = 0;
            ambulanceRescue.duration = 2.4;
            ambulanceMesh.visible = false;
            uberBanner.classList.add('hidden');
            vehicleInterior.classList.add('hidden');
            player.unlock();
            hospitalStatus.textContent =
              'Doctors are treating your bumps and scrapes — health points restoring...';
            btnLeaveHospital.classList.add('hidden');
            overlayHospital.classList.remove('hidden');
          }
        }
      } else if (ambulanceRescue.phase === 'hospital') {
        const u = Math.min(1, ambulanceRescue.t / ambulanceRescue.duration);
        if (hospitalBarFill) hospitalBarFill.style.width = `${Math.round(u * 100)}%`;
        playerHealth = Math.round(u * 100);
        updateHealthUI();
        if (u >= 1 && btnLeaveHospital.classList.contains('hidden')) {
          hospitalStatus.textContent = 'Treatment complete! You regained all 100 Health Points!';
          btnLeaveHospital.classList.remove('hidden');
        }
      }
    }

    // Handle active Uber Ride sequence (approach -> inside-car ride -> safe sidewalk drop-off!)
    if (uberRide) {
      uberRide.t += dt;
      const u = Math.min(1, uberRide.t / uberRide.duration);
      const ease = u * u * (3 - 2 * u);
      const cx = uberRide.fromX + (uberRide.toX - uberRide.fromX) * ease;
      const cz = uberRide.fromZ + (uberRide.toZ - uberRide.fromZ) * ease;
      const dx = uberRide.toX - uberRide.fromX;
      const dz = uberRide.toZ - uberRide.fromZ;
      uberCarMesh.position.set(cx, 0.08, cz);
      uberCarMesh.rotation.y = Math.atan2(dx, dz);

      if (uberRide.phase === 'ride') {
        uberCarMesh.visible = false; // Show realistic interior windshield view
        const rideHeading = forwardToHeadingDeg(dx, dz);
        player.setPose(cx, cz, rideHeading);
        camera.position.set(cx, 1.45, cz);
      }

      if (u >= 1) {
        if (uberRide.phase === 'approach') {
          uberRide.phase = 'ride';
          uberRide.t = 0;
          uberRide.duration = 4.2;
          uberRide.fromX = uberRide.toX;
          uberRide.fromZ = uberRide.toZ;
          uberRide.toX = uberRide.destX;
          uberRide.toZ = uberRide.destZ;
        } else {
          // Arrived safely at chosen Uber destination!
          const arrivedLabel = uberRide.destLabel;
          const dropX = uberRide.destX;
          const dropZ = uberRide.destZ;
          uberRide = null;
          uberCarMesh.visible = false;
          uberBanner.classList.add('hidden');
          vehicleInterior.classList.add('hidden');
          player.setPose(dropX, dropZ, player.getHeadingDeg());
          showFeedback({
            type: 'success',
            icon: '🚗',
            text: `Your Uber arrived at ${arrivedLabel}! Thanks for riding!`,
          });
        }
      }
    }

    // Update traffic first so bus position is fresh when riding
    const trafficPlayerPos = ridingBus || uberRide ? null : player.position;
    const preStatus = safety.update(
      player.position,
      player,
      trafficSystem,
      dt,
      isPlaying && !ridingBus && !uberRide
    );
    trafficSystem.update(dt, trafficPlayerPos, !ridingBus && !uberRide && preStatus.inCrosswalk);

    // Check if hit by a moving vehicle -> health drops to 0 HP & Ambulance rescues you!
    if (isPlaying && !insideBuilding && !ridingBus && !uberRide && !ambulanceRescue && !preStatus.arrived && !preStatus.gameOver) {
      for (const car of trafficSystem.cars) {
        if (car.currentSpeed <= 1.2) continue;
        const dx = player.position.x - car.x;
        const dz = player.position.z - car.z;
        const along = dx * car.dirX + dz * car.dirZ;
        const across = -dx * car.dirZ + dz * car.dirX;
        const halfLen = car.isBus ? 3.2 : 2.1;
        const halfWid = car.isBus ? 1.25 : 1.05;
        if (Math.abs(along) <= halfLen && Math.abs(across) <= halfWid) {
          playerHealth = 0;
          updateHealthUI();
          if (damageFlash) {
            damageFlash.classList.remove('hidden');
            if (damageFlashTimer) clearTimeout(damageFlashTimer);
            damageFlashTimer = setTimeout(() => damageFlash.classList.add('hidden'), 400);
          }
          showFeedback({
            type: 'warning',
            icon: '💥',
            text: 'Hit by a moving vehicle! Health dropped to 0 HP — Ambulance is on the way!',
          });
          startAmbulanceRescue();
          break;
        }
      }
    }

    if (ridingBus && !uberRide) {
      // Seat camera realistically inside the front cabin of the Yellow School Bus looking out the windshield
      player.position.set(ridingBus.x, 1.5, ridingBus.z);
      camera.position.set(
        ridingBus.x + ridingBus.dirX * 1.1,
        2.05,
        ridingBus.z + ridingBus.dirZ * 1.1
      );
    }

    // Realistic Cabin Interior Overlay (School Bus, Uber Car, or Ambulance)
    if (ambulanceRescue && ambulanceRescue.phase === 'ride') {
      vehicleInterior.className = 'vehicle-interior police';
      cabinLedSign.textContent = '🚑 AMBULANCE • EN ROUTE TO HAMILTON HOSPITAL';
      dashSpeedVal.textContent = '62';
      dashScreen.textContent = '🏥 EMERGENCY TREATMENT AHEAD';
    } else if (uberRide && uberRide.phase === 'ride') {
      vehicleInterior.className = 'vehicle-interior police';
      cabinLedSign.textContent = `🚗 UBER • TO ${uberRide.destLabel.toUpperCase()}`;
      dashSpeedVal.textContent = '48';
      dashScreen.textContent = '🚗 UBER RIDE IN PROGRESS';
    } else if (ridingBus && !uberRide) {
      vehicleInterior.className = 'vehicle-interior bus';
      const kmh = Math.round((ridingBus.currentSpeed || 0) * 3.6);
      dashSpeedVal.textContent = String(kmh);
      cabinLedSign.textContent = ridingBus.atStopName
        ? `🚌 STOPPED: ${ridingBus.atStopName.toUpperCase()}`
        : '🚌 SCHOOL BUS • KING ST W → COOTES PARADISE';
      dashScreen.textContent = kmh === 0 ? '🛑 DOORS OPEN (PRESS F)' : '🟢 NEXT STOP AHEAD';
    } else {
      vehicleInterior.classList.add('hidden');
    }

    const pos = player.position;
    const headingDeg = player.getHeadingDeg();

    // Update 1st-Person Held Stick / Rock & Stick Swing Animation!
    if (stickSwingCooldown > 0) stickSwingCooldown = Math.max(0, stickSwingCooldown - dt);
    if (stickSwingTimer > 0) stickSwingTimer = Math.max(0, stickSwingTimer - dt);
    if (pendingStickHit > 0) {
      pendingStickHit -= dt;
      if (pendingStickHit <= 0) {
        pendingStickHit = 0;
        if (isPlaying && attackMode && selectedWeapon === 'stick' && stickCount > 0) resolveStickHit();
      }
    }

    const canShowWeapon =
      isPlaying &&
      attackMode &&
      !insideBuilding &&
      !ridingBus &&
      !uberRide &&
      !ambulanceRescue;
    const showFpStick = canShowWeapon && player.viewMode === 'first' && selectedWeapon === 'stick' && stickCount > 0;
    const showFpRock = canShowWeapon && player.viewMode === 'first' && selectedWeapon === 'rock' && rockCount > 0;
    fpStickPivot.visible = showFpStick;
    fpRockMesh.visible = showFpRock;

    if (showFpStick) {
      if (stickSwingTimer > 0) {
        const p = 1 - stickSwingTimer / STICK_SWING_DURATION; // 0 -> 1
        // Raise up & back over the right shoulder, then chop diagonally down to the lower-left
        const up = p < 0.4 ? Math.sin((p / 0.4) * Math.PI * 0.5) : p < 0.48 ? 1 : Math.max(0, 1 - (p - 0.48) / 0.14);
        const chop = p < 0.48 ? 0 : p < 0.66 ? Math.pow((p - 0.48) / 0.18, 2) : Math.min(1, Math.max(0, 1 - (p - 0.78) / 0.22));
        fpStickPivot.rotation.set(up * 0.75 - chop * 1.25, chop * 0.55, -up * 0.25 + chop * 0.95);
        fpStickPivot.position.set(0.36 + up * 0.06 - chop * 0.38, -0.28 + up * 0.22 - chop * 0.12, -0.58 + up * 0.08 - chop * 0.1);
      } else {
        const bob = player.isMoving ? Math.sin(player.walkCycle * 1.5) * 0.025 : 0;
        fpStickPivot.rotation.set(0, 0, 0);
        fpStickPivot.position.set(0.36, -0.28 + bob, -0.58);
      }
    }

    // Update Third-Person Student Avatar (visible only in 3rd person while on foot!)
    const showAvatar = player.viewMode === 'third' && !ridingBus && !(uberRide && uberRide.phase === 'ride');
    playerAvatar.visible = showAvatar;
    if (showAvatar) {
      playerAvatar.position.set(pos.x, 0.16, pos.z);
      const headingRad = (headingDeg * Math.PI) / 180;
      playerAvatar.rotation.y = Math.atan2(Math.sin(headingRad), -Math.cos(headingRad));

      const isSwingingStick = stickSwingTimer > 0 && selectedWeapon === 'stick' && stickCount > 0;
      const { heldStick } = playerAvatar.userData;
      if (heldStick) {
        heldStick.visible = canShowWeapon && selectedWeapon === 'stick' && stickCount > 0;
      }
      if (playerAvatar.userData?.isRealisticGlb) {
        playerAvatar.userData.setAnimState(player.isMoving ? 'walk' : 'idle', 3.4);
        playerAvatar.userData.updateAnim(dt);
        // Holding the stick: ready stance; swinging: wind-up above the shoulder → diagonal chop
        if (heldStick?.visible) {
          applyStickPose(playerAvatar, isSwingingStick ? 1 - stickSwingTimer / STICK_SWING_DURATION : null);
        }
      } else {
        animateHumanWalk(playerAvatar, player.walkCycle, player.isMoving, now * 0.001, {
          overrideRightArm: isSwingingStick,
        });
        const { rightArmPivot, rightElbowPivot } = playerAvatar.userData;
        if (isSwingingStick) {
          const p = 1 - stickSwingTimer / STICK_SWING_DURATION;
          rightArmPivot.rotation.x = -1.6 + Math.sin(p * Math.PI) * 1.85;
          if (rightElbowPivot) rightElbowPivot.rotation.x = -0.35;
        }
      }
    }

    ground.position.set(pos.x, 0, pos.z);
    chunkManager.update(pos.x, pos.z);
    pedestrianSystem.update(dt, ridingBus || uberRide || ambulanceRescue ? null : pos, activeNpcDialogId);

    // Update Bike Police Officer riding up to confiscate rocks & sticks if player hit a person!
    if (bikePolice) {
      bikePolice.t += dt;
      const flash = Math.floor(now / 160) % 2 === 0;
      bikePoliceMesh.userData.blueLightMat.color.setHex(flash ? 0x3b82f6 : 0x1e3a8a);
      bikePoliceMesh.userData.redLightMat.color.setHex(flash ? 0x450a0a : 0xef4444);

      if (bikePolice.phase === 'approach' || bikePolice.phase === 'leave') {
        if (bikePolice.phase === 'approach') {
          // Track player smoothly as officer pedals up
          bikePolice.toX = player.position.x + 1.8;
          bikePolice.toZ = player.position.z + 1.4;
        }
        const u = Math.min(1, bikePolice.t / bikePolice.duration);
        const ease = u * u * (3 - 2 * u);
        const cx = bikePolice.fromX + (bikePolice.toX - bikePolice.fromX) * ease;
        const cz = bikePolice.fromZ + (bikePolice.toZ - bikePolice.fromZ) * ease;
        bikePoliceMesh.position.set(cx, 0.14, cz);
        bikePoliceMesh.rotation.y = Math.atan2(
          bikePolice.toX - bikePolice.fromX,
          bikePolice.toZ - bikePolice.fromZ
        );
        bikePoliceMesh.userData.frontWheel.rotation.x += dt * 10;
        bikePoliceMesh.userData.rearWheel.rotation.x += dt * 10;

        if (u >= 1) {
          if (bikePolice.phase === 'approach') {
            bikePolice.phase = 'confiscate';
            bikePolice.t = 0;
            bikePolice.duration = 2.6;
            // Confiscate ALL throwing items!
            rockCount = 0;
            stickCount = 0;
            updateAmmoUI();
            setAttackMode(false);
            showFeedback({
              type: 'warning',
              icon: '👮',
              text: 'Bike Police Officer: "Never throw stuff at people! All your rocks & sticks are confiscated!"',
            });
          } else {
            bikePolice = null;
            bikePoliceMesh.visible = false;
          }
        }
      } else if (bikePolice.phase === 'confiscate') {
        bikePoliceMesh.rotation.y = Math.atan2(
          player.position.x - bikePoliceMesh.position.x,
          player.position.z - bikePoliceMesh.position.z
        );
        if (bikePolice.t >= bikePolice.duration) {
          bikePolice.phase = 'leave';
          bikePolice.t = 0;
          bikePolice.duration = 2.0;
          bikePolice.fromX = bikePoliceMesh.position.x;
          bikePolice.fromZ = bikePoliceMesh.position.z;
          bikePolice.toX = bikePolice.fromX - 24;
          bikePolice.toZ = bikePolice.fromZ + 18;
        }
      }
    }

    // Update Wild Animals (Raccoons, Coyotes, Mad Bunnies), Safe Pickups, & NPC Hit Check!
    const canWildAttack =
      isPlaying && !insideBuilding && !ridingBus && !uberRide && !ambulanceRescue && !preStatus.arrived && !preStatus.gameOver;
    wildlifeSystem.update(
      dt,
      pos,
      canWildAttack,
      (animal, dmg) => {
        playerHealth = Math.max(0, playerHealth - dmg);
        updateHealthUI();
        if (damageFlash) {
          damageFlash.classList.remove('hidden');
          if (damageFlashTimer) clearTimeout(damageFlashTimer);
          damageFlashTimer = setTimeout(() => damageFlash.classList.add('hidden'), 240);
        }
        if (playerHealth <= 0) {
          startAmbulanceRescue();
        } else {
          showFeedback({
            type: 'warning',
            icon: animal.emoji,
            text: `Ouch! A ${animal.label} attacked you (-${dmg} HP)! Press C for Throw Mode to chase it off!`,
          });
        }
      },
      handleAnimalHitFeedback,
      (pickedKind) => {
        if (pickedKind === 'rock') {
          rockCount += 1;
          showFeedback({ type: 'success', icon: '🪨', text: `Picked up a Rock! (${rockCount} rocks — press 1 to select)` });
        } else {
          stickCount += 1;
          showFeedback({ type: 'success', icon: '🪵', text: `Picked up a Stick! (${stickCount} sticks — press 2 to Wield or Throw!)` });
        }
        updateAmmoUI();
      },
      pedestrianSystem.npcs,
      (hitNpc) => summonBikePolice(hitNpc)
    );

    compassReadout.textContent = `${headingToCardinal(headingDeg)} ${Math.round(headingDeg)}°`;
    miniMap.updatePlayer(pos.x, pos.z, headingDeg);
    miniMap.updateBuses(trafficSystem.getBuses());

    const status = preStatus;
    const distLabel =
      status.distanceToGoal >= 1000
        ? `${(status.distanceToGoal / 1000).toFixed(1)} km`
        : `${status.distanceToGoal} m`;
    distancePill.textContent = `📍 ${distLabel} to goal`;
    if (uberRide) {
      zonePill.className = 'pill pill-blue';
      zonePill.textContent = `🚗 Uber → ${uberRide.destLabel}`;
    } else if (ridingBus) {
      zonePill.className = 'pill pill-blue';
      zonePill.textContent = ridingBus.atStopName
        ? `🚌 Stopped: ${ridingBus.atStopName}`
        : '🚌 Riding School Bus';
    } else {
      updateZonePill(status.zone, status.streetName);
    }
    updateStarsUI(status.stars);
    pointsPill.textContent = `🏆 ${status.points} pts`;

    // Bus Boarding / Exiting HUD prompt
    if (isPlaying && !uberRide && !status.arrived && !status.gameOver) {
      if (ridingBus) {
        busPrompt.classList.remove('hidden');
        busPrompt.classList.add('riding');
        busPrompt.innerHTML = ridingBus.atStopName
          ? `🚏 At ${ridingBus.atStopName} — Press <kbd>F</kbd> to Get Off!`
          : `🚌 Riding School Bus — Press <kbd>F</kbd> to Get Off at a Stop`;
      } else {
        const nearBus = trafficSystem.getNearbyBus(pos);
        if (nearBus) {
          busPrompt.classList.remove('hidden');
          busPrompt.classList.remove('riding');
          busPrompt.innerHTML = `🚌 Press <kbd>F</kbd> to Board the School Bus!`;
        } else {
          busPrompt.classList.add('hidden');
        }
      }

      // Friendly NPC Talk prompt
      const nearNpc = !ridingBus && !insideBuilding ? pedestrianSystem.getNearbyNpc(pos) : null;
      if (nearNpc) {
        npcPrompt.classList.remove('hidden');
        npcPrompt.innerHTML = `💬 Press <kbd>T</kbd> to Talk to ${nearNpc.emoji} ${nearNpc.name}`;
      } else {
        npcPrompt.classList.add('hidden');
        if (activeNpcDialogId) {
          npcDialog.classList.add('hidden');
          activeNpcDialogId = null;
        }
      }

      // Any Building OR House Entrance detection (press G / tap prompt, or walk right into doorway!)
      const nearBld = !ridingBus && !insideBuilding ? findNearbyEnterableBuilding(pos, 4.6) : null;
      if (nearBld) {
        const b = nearBld.building;
        const label = getBuildingDisplayLabel(b);
        const floorsTag = `${b.floors || 2}F`;
        enterBuildingPrompt.classList.remove('hidden');
        enterBuildingPrompt.innerHTML = `🚪 Press <kbd>G</kbd> or Walk In: ${label} (${floorsTag})`;
        // Auto-enter when stepping right up to the front door / welcome mat (with 2.5s exit cooldown)
        const autoDist = b.isPublicAccess ? 1.65 : 1.15;
        if (nearBld.dist <= autoDist && performance.now() - lastBuildingExitAt > 2500) {
          enterPublicBuilding(b);
        }
      } else {
        enterBuildingPrompt.classList.add('hidden');
      }
    } else {
      busPrompt.classList.add('hidden');
      npcPrompt.classList.add('hidden');
      npcDialog.classList.add('hidden');
      enterBuildingPrompt.classList.add('hidden');
    }

    // Live 5-second road-lane warning banner & countdown bar
    if (isPlaying && !ridingBus && !uberRide && status.offSidewalkSec > 0 && !status.gameOver) {
      const remaining = Math.max(0, OFF_SIDEWALK_LIMIT_SEC - status.offSidewalkSec);
      sidewalkCountdown.textContent = `${remaining.toFixed(1)}s`;
      sidewalkBarFill.style.width = `${(remaining / OFF_SIDEWALK_LIMIT_SEC) * 100}%`;
      sidewalkWarning.classList.remove('hidden');
    } else {
      sidewalkWarning.classList.add('hidden');
    }

    // Live Traffic Light RED / GREEN warning banner when near a signalized crosswalk
    if (isPlaying && !ridingBus && !uberRide && !status.arrived && !status.gameOver) {
      const sigInfo = trafficSystem.getNearestSignalPrompt(pos);
      if (sigInfo) {
        trafficLightHud.className = `traffic-light-hud ${sigInfo.light}`;
        if (sigInfo.light === 'green') {
          trafficLightTitle.textContent = `🟢 Light is GREEN — WALK! (${sigInfo.secondsLeft}s)`;
          trafficLightSub.textContent = `Safe to cross ${sigInfo.roadName} on the white zebra stripes!`;
        } else if (sigInfo.light === 'amber') {
          trafficLightTitle.textContent = `🟡 Light turning RED soon! (${sigInfo.secondsLeft}s)`;
          trafficLightSub.textContent = `Wait for the next GREEN Walk light across ${sigInfo.roadName}!`;
        } else {
          trafficLightTitle.textContent = `🔴 Light is RED — STOP! (${sigInfo.secondsLeft}s)`;
          trafficLightSub.textContent = `Do NOT cross ${sigInfo.roadName} — crossing on red costs -30 pts!`;
        }
      } else {
        trafficLightHud.classList.add('hidden');
      }
    } else {
      trafficLightHud.classList.add('hidden');
    }

    // Live Look Left & Look Right checklist indicator + Proactive Intersection Warning!
    const lookSt = player.getLookStatus();
    if (lookSt.lookedBoth) {
      lookBadge.textContent = '👀 Looked Left & Right! ✅';
      lookBadge.classList.remove('hidden');
    } else if (lookSt.lookedLeft) {
      lookBadge.textContent = '⬅️ Looked Left — Look Right too! ➡️';
      lookBadge.classList.remove('hidden');
    } else if (lookSt.lookedRight) {
      lookBadge.textContent = '➡️ Looked Right — Look Left too! ⬅️';
      lookBadge.classList.remove('hidden');
    } else {
      lookBadge.classList.add('hidden');
    }

    // Interactive Intersection Look Left & Right Arrow Gauge — triggers ONLY when standing on a yellow curb pad AND facing the crosswalk!
    if (isPlaying && !ridingBus && !uberRide && !status.arrived && !status.gameOver) {
      // Picks the single best pad you're standing on (stable at corners where pads touch),
      // and only when facing across the street; stays locked while you look left/right.
      const padHit = safety.getCrosswalkAtYellowPad(pos, headingDeg, player.activeIntersectionId);
      const nearUnsig = padHit ? padHit.cw : null;

      if (nearUnsig) {
        const interKey = nearUnsig.id;
        player.setIntersectionContext(interKey, padHit.crossHeadingDeg);
        const curLook = player.getLookStatus();

        // Hide the arrow box as soon as you start crossing after checking both ways
        if (curLook.lookedBoth && (player.isMoving || status.inCrosswalk)) {
          dismissedIntersectionId = interKey;
        }

        if (dismissedIntersectionId === interKey) {
          lookWarningHud.classList.add('hidden');
        } else {
          const pL = curLook.leftProgress;
          const pR = curLook.rightProgress;

          // Fill left arrow right-to-left (x shrinks from 110 -> 0 as width grows 0 -> 110)
          const wL = Math.round(pL * 110);
          clipRectLeft?.setAttribute('x', String(110 - wL));
          clipRectLeft?.setAttribute('width', String(wL));

          // Fill right arrow left-to-right (x stays 0 as width grows 0 -> 110)
          const wR = Math.round(pR * 110);
          clipRectRight?.setAttribute('width', String(wR));

          lookLeftBox?.classList.toggle('done', curLook.lookedLeft);
          lookRightBox?.classList.toggle('done', curLook.lookedRight);
          if (lookLeftLabel) {
            lookLeftLabel.textContent = curLook.lookedLeft ? '✅ LEFT DONE' : `LEFT ${Math.round(pL * 100)}%`;
          }
          if (lookRightLabel) {
            lookRightLabel.textContent = curLook.lookedRight ? '✅ RIGHT DONE' : `RIGHT ${Math.round(pR * 100)}%`;
          }

          if (curLook.lookedBoth) {
            lookWarningHud.className = 'look-warning-hud ready';
            lookWarningTitle.textContent = `Now you can cross!`;
            lookWarningSub.textContent = `Walk straight across ${nearUnsig.roadName} on the white zebra stripes!`;
            lookArrowsRow?.classList.add('hidden');
            lookForwardBox?.classList.remove('hidden');
          } else {
            lookWarningHud.className = 'look-warning-hud';
            lookWarningTitle.textContent = `🚸 You are now at the intersection!`;
            lookWarningSub.textContent = !curLook.lookedLeft && !curLook.lookedRight
              ? `Look LEFT & RIGHT to fill both arrows before crossing ${nearUnsig.roadName}!`
              : curLook.lookedLeft
                ? `Great! Now look RIGHT to fill the right arrow!`
                : `Great! Now look LEFT to fill the left arrow!`;
            lookArrowsRow?.classList.remove('hidden');
            lookForwardBox?.classList.add('hidden');
          }
        }
      } else {
        // Keep completed look check active while stepping off the yellow pad into the crosswalk!
        if (!status.inCrosswalk) {
          dismissedIntersectionId = null;
          player.setIntersectionContext(null);
        }
        lookWarningHud.classList.add('hidden');
      }
    } else {
      dismissedIntersectionId = null;
      player.setIntersectionContext(null);
      lookWarningHud.classList.add('hidden');
    }

    if (status.gameOver && overlayGameOver.classList.contains('hidden')) {
      showGameOver(status.gameOverReason);
    }

    if (status.arrived && overlayVictory.classList.contains('hidden')) {
      showVictory(status.elapsedSec);
    }

    camera.getWorldPosition(skyGroup.position);
    visuals.update(player.position);
    visuals.render();
  }

  // Start the game right INSIDE Your House! (You must let Mom or Dad know before heading out!)
  spawnInsideYourHouse();

  // Stream diverse 3D GLB human models in the background and hot-swap onto NPCs & player avatar without delaying startup!
  preloadHumanModels().then(() => {
    pedestrianSystem.refreshMeshes();
    rebuildPlayerAvatar();
    if (insideBuilding) {
      interiorRoom.refreshCharacterMeshes();
    }
  });

  // Large MetaHuman characters stream in later — swap them in the moment each one is ready
  onHumanModelLoaded((key) => {
    if (avatarConfig.character === key) rebuildPlayerAvatar();
    if (insideBuilding) interiorRoom.refreshCharacterMeshes();
    if (avatarModalOpen) {
      buildCharacterCards();
      syncAvatarPickerUI();
      refreshAvatarPreviewMesh();
      scheduleThumbs();
    }
  });

  requestAnimationFrame(animate);
}

init().catch((err) => {
  console.error('Initialization failed:', err);
  loadingStatus.textContent = `Error: ${err.message}`;
});
