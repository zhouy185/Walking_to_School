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
  createPlayerAvatarMesh,
  DEFAULT_AVATAR_CONFIG,
  disposeGroup,
} from './world/worldBuilder.js';
import { TrafficSystem } from './world/trafficSystem.js';
import { PedestrianSystem } from './world/pedestrianSystem.js';
import { InteriorRoom } from './world/interiorRoom.js';
import { PlayerController } from './player/controls.js';
import { SafetyRules, OFF_SIDEWALK_LIMIT_SEC } from './gameplay/safetyRules.js';
import { MiniMap } from './ui/minimap.js';

// DOM refs
const container = document.getElementById('canvas-container');
const distancePill = document.getElementById('distance-pill');
const zonePill = document.getElementById('zone-pill');
const starsRow = document.getElementById('stars-row');
const pointsPill = document.getElementById('points-pill');
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
function showFeedback({ type = 'info', icon = '🌟', text }) {
  feedbackBanner.className = `feedback-banner ${type}`;
  feedbackIcon.textContent = icon;
  feedbackText.textContent = text;
  if (feedbackTimer) clearTimeout(feedbackTimer);
  feedbackTimer = setTimeout(() => {
    feedbackBanner.classList.add('hidden');
  }, 4200);
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

async function init() {
  btnStart.disabled = true;

  // 1. Three.js Scene Setup (Bright, kid-friendly sunny Westdale morning!)
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x87ceeb);
  scene.fog = new THREE.Fog(0xbae6fd, 180, 520);

  const camera = new THREE.PerspectiveCamera(
    68,
    window.innerWidth / window.innerHeight,
    0.1,
    700
  );

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  container.appendChild(renderer.domElement);

  // Sunny sky lighting
  const hemiLight = new THREE.HemisphereLight(0xe0f2fe, 0x86efac, 0.9);
  scene.add(hemiLight);

  const sunLight = new THREE.DirectionalLight(0xfffbeb, 1.15);
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
    new THREE.MeshStandardMaterial({ color: 0x9be29b, roughness: 0.96 })
  );
  ground.rotation.x = -Math.PI / 2;
  ground.receiveShadow = true;
  scene.add(ground);

  // 2. Load pre-cached Westdale preset (<200ms)
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

      player.setPose(startPose.x, startPose.z, startPose.headingDeg);
      ground.position.set(startPose.x, 0, startPose.z);
      chunkManager.update(startPose.x, startPose.z);

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
  let dismissedIntersectionId = null;
  const uberCarMesh = createUberCarMesh();
  uberCarMesh.visible = false;
  scene.add(uberCarMesh);

  // Load saved custom avatar appearance (face, hairstyle, clothes, colors)
  const AVATAR_STORAGE_KEY = 'westdale-avatar-v1';
  let avatarConfig = { ...DEFAULT_AVATAR_CONFIG };
  try {
    const saved = localStorage.getItem(AVATAR_STORAGE_KEY);
    if (saved) avatarConfig = { ...DEFAULT_AVATAR_CONFIG, ...JSON.parse(saved) };
  } catch {
    // ignore
  }

  let playerAvatar = createPlayerAvatarMesh(avatarConfig);
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
    previewCamera = new THREE.PerspectiveCamera(42, 220 / 250, 0.1, 20);
    previewCamera.position.set(0, 1.12, 2.75);
    previewCamera.lookAt(0, 0.95, 0);

    previewScene.add(new THREE.HemisphereLight(0xffffff, 0xcbd5e1, 1.15));
    const key = new THREE.DirectionalLight(0xfffbeb, 1.0);
    key.position.set(2, 4, 3);
    previewScene.add(key);

    previewRenderer = new THREE.WebGLRenderer({
      canvas: avatarPreviewCanvas,
      antialias: true,
      alpha: true,
    });
    previewRenderer.setSize(220, 250, false);
    previewRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }

  function refreshAvatarPreviewMesh() {
    ensureAvatarPreview();
    if (!previewScene) return;
    if (previewAvatar) {
      previewScene.remove(previewAvatar);
      disposeGroup(previewAvatar);
    }
    previewAvatar = createPlayerAvatarMesh(avatarConfig);
    previewAvatar.rotation.y = 0.28; // Face slightly toward viewer so eyes, nose, ears & smile shine!
    previewScene.add(previewAvatar);
  }

  function syncAvatarPickerUI() {
    overlayAvatar?.querySelectorAll('[data-avatar-key]').forEach((groupEl) => {
      const key = groupEl.dataset.avatarKey;
      const curVal = avatarConfig[key];
      groupEl.querySelectorAll('[data-val]').forEach((btn) => {
        btn.classList.toggle('active', btn.dataset.val === curVal);
      });
    });
  }

  function openAvatarCustomizer() {
    player.unlock();
    avatarModalOpen = true;
    syncAvatarPickerUI();
    refreshAvatarPreviewMesh();
    overlayAvatar.classList.remove('hidden');
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
    groupEl.querySelectorAll('[data-val]').forEach((btn) => {
      btn.addEventListener('click', () => {
        avatarConfig[key] = btn.dataset.val;
        syncAvatarPickerUI();
        refreshAvatarPreviewMesh();
      });
    });
  });

  btnCustomizeAvatar?.addEventListener('click', openAvatarCustomizer);
  btnCustomizeAvatarHud?.addEventListener('click', openAvatarCustomizer);
  btnAvatarDone?.addEventListener('click', () => closeAvatarCustomizer(true));
  btnAvatarClose?.addEventListener('click', () => closeAvatarCustomizer(false));

  function toggleCameraView() {
    const mode = player.toggleViewMode();
    btnCameraView.textContent = mode === 'third' ? '👁️ 1st Person View (V)' : '👁️ 3rd Person View (V)';
    showFeedback({
      type: 'info',
      icon: '👁️',
      text: mode === 'third' ? 'Switched to Third-Person View!' : 'Switched to First-Person View!',
    });
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
      if (insideBuilding) exitPublicBuilding();
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
  const interiorRoom = new InteriorRoom();

  function findNearbyPublicBuilding(pos, maxDist = 4.2) {
    let best = null;
    let bestDist = Infinity;
    for (const b of chunkManager.getActiveBuildings()) {
      if (!b.isPublicAccess || b.category === 'school' || !b.frontPt) continue;
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
    insideBuilding = b;
    lastBuildingEnterAt = performance.now();

    // Save exact outdoor sidewalk return spot right outside the door
    const pushX = Math.sin(b.frontAngle || 0) * 2.3;
    const pushZ = Math.cos(b.frontAngle || 0) * 2.3;
    outdoorReturnPose = {
      x: b.frontPt.x + pushX,
      z: b.frontPt.z + pushZ,
      headingDeg: ((b.frontAngle || 0) * 180) / Math.PI,
    };

    // Build walkable 3D interior room & move avatar into interiorScene!
    const roomSpawn = interiorRoom.loadBuilding(b);
    scene.remove(playerAvatar);
    interiorRoom.scene.add(playerAvatar);
    player.setPose(roomSpawn.x, roomSpawn.z, roomSpawn.headingDeg);

    npcDialog.classList.add('hidden');
    showFeedback({
      type: 'success',
      icon: '🚪',
      text: `Welcome inside ${b.name || 'this building'}! Walk around & press T to talk to ${interiorRoom.worker.name}!`,
    });
  }

  function exitPublicBuilding() {
    if (!insideBuilding) return;
    const b = insideBuilding;
    insideBuilding = null;
    lastBuildingExitAt = performance.now();
    npcDialog.classList.add('hidden');
    activeNpcDialogId = null;

    // Move avatar back to outdoor Westdale scene & restore sidewalk pose
    interiorRoom.scene.remove(playerAvatar);
    scene.add(playerAvatar);
    if (outdoorReturnPose) {
      player.setPose(outdoorReturnPose.x, outdoorReturnPose.z, outdoorReturnPose.headingDeg);
    }
    showFeedback({
      type: 'info',
      icon: '🚶',
      text: `Stepped back outside ${b.name || 'the building'} onto the sidewalk!`,
    });
  }

  enterBuildingPrompt.addEventListener('click', () => {
    if (insideBuilding) {
      exitPublicBuilding();
    } else {
      const hit = findNearbyPublicBuilding(player.position, 4.5);
      if (hit) enterPublicBuilding(hit.building);
    }
  });

  function talkToNearbyNpc() {
    if (!isPlaying || ridingBus || uberRide || safety.arrived || safety.gameOver) return;

    // If inside a building, talk to the Worker / Owner NPC!
    if (insideBuilding) {
      if (!interiorRoom.isNearWorker(player.position)) return;
      const w = interiorRoom.worker;
      const line = interiorRoom.getRandomWorkerLine();
      activeNpcDialogId = 'interior_worker';
      npcDialogName.textContent = `${w.emoji} ${w.name}`;
      npcDialogRole.textContent = w.role;
      npcDialogText.textContent = `"${line}"`;
      npcDialog.classList.remove('hidden');
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
        const hit = findNearbyPublicBuilding(player.position, 4.5);
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
    if (insideBuilding) return;
    if (e.code === 'KeyF') toggleBusRide();
    if (e.code === 'KeyU') openUberModal();
  });
  busPrompt.addEventListener('click', toggleBusRide);
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
    showFeedback({
      type: 'info',
      icon: '🏠',
      text: 'Move mouse to look around! Press ESC anytime to free your cursor and click HUD buttons (click screen to resume mouse look).',
    });
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
    }
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    uberRide = null;
    uberCarMesh.visible = false;
    uberBanner.classList.add('hidden');
    overlayUber.classList.add('hidden');
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
    player.setPose(startPose.x, startPose.z, startPose.headingDeg);
    chunkManager.update(startPose.x, startPose.z);
    miniMap.updatePlayer(startPose.x, startPose.z, startPose.headingDeg);

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
    }
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    uberRide = null;
    uberCarMesh.visible = false;
    uberBanner.classList.add('hidden');
    overlayUber.classList.add('hidden');
    vehicleInterior.classList.add('hidden');
    safety.reset();
    updateStarsUI(3);
    pointsPill.textContent = `🏆 ${safety.points} pts`;
    sidewalkWarning.classList.add('hidden');
    busPrompt.classList.add('hidden');
    overlayGameOver.classList.add('hidden');
    player.setPose(startPose.x, startPose.z, startPose.headingDeg);
    chunkManager.update(startPose.x, startPose.z);
    miniMap.updatePlayer(startPose.x, startPose.z, startPose.headingDeg);
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
  });

  // Main Animation Loop
  let prevTime = performance.now();
  function animate(now) {
    requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - prevTime) / 1000);
    prevTime = now;

    // Spin live 3D avatar preview while customizer modal is open
    if (avatarModalOpen && previewRenderer && previewScene && previewCamera && previewAvatar) {
      previewAvatar.rotation.y += dt * 0.85;
      previewRenderer.render(previewScene, previewCamera);
    }

    // Spin school entrance beacon crystal
    const crystal = schoolBeacon.getObjectByName('beaconCrystal');
    if (crystal) {
      crystal.rotation.y += dt * 1.4;
      crystal.position.y = 3.2 + Math.sin(now * 0.003) * 0.35;
    }

    // === WALKABLE 3D BUILDING INTERIOR LOOP ===
    if (insideBuilding) {
      player.update(dt, [], isPlaying);
      interiorRoom.resolveCollisions(player.position);
      player.syncCameraToPosition();
      interiorRoom.update(player.position);

      const pos = player.position;
      const headingDeg = player.getHeadingDeg();

      // Update Third-Person Student Avatar inside the room!
      const showAvatar = player.viewMode === 'third';
      playerAvatar.visible = showAvatar;
      if (showAvatar) {
        playerAvatar.position.set(pos.x, 0.02, pos.z);
        const headingRad = (headingDeg * Math.PI) / 180;
        playerAvatar.rotation.y = Math.atan2(Math.sin(headingRad), -Math.cos(headingRad));
        const swing = player.isMoving ? Math.sin(player.walkCycle) * 0.55 : 0;
        const { leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot } = playerAvatar.userData;
        leftLegPivot.rotation.x = swing;
        rightLegPivot.rotation.x = -swing;
        leftArmPivot.rotation.x = -swing * 0.75;
        rightArmPivot.rotation.x = swing * 0.75;
      }

      zonePill.className = 'pill pill-green';
      zonePill.textContent = `🏠 Inside: ${insideBuilding.name || 'Building'}`;
      busPrompt.classList.add('hidden');
      sidewalkWarning.classList.add('hidden');
      trafficLightHud.classList.add('hidden');
      lookWarningHud.classList.add('hidden');
      lookBadge.classList.add('hidden');

      // Show Exit prompt & auto-exit when walking out the green EXIT door
      enterBuildingPrompt.classList.remove('hidden');
      enterBuildingPrompt.innerHTML = `🚪 Walk to Exit Door or Press <kbd>G</kbd> to Go Outside`;
      if (interiorRoom.isAtExitDoor(pos) && now - lastBuildingEnterAt > 1600) {
        exitPublicBuilding();
        renderer.render(scene, camera);
        return;
      }

      // Show Talk prompt when near the Worker / Owner NPC!
      if (isPlaying && interiorRoom.isNearWorker(pos)) {
        const w = interiorRoom.worker;
        npcPrompt.classList.remove('hidden');
        npcPrompt.innerHTML = `💬 Press <kbd>T</kbd> to Talk to ${w.emoji} ${w.name}`;
      } else {
        npcPrompt.classList.add('hidden');
        if (activeNpcDialogId === 'interior_worker') {
          npcDialog.classList.add('hidden');
          activeNpcDialogId = null;
        }
      }

      renderer.render(interiorRoom.scene, camera);
      return;
    }

    const activeBuildings = chunkManager.getActiveBuildings();
    if (!ridingBus && !uberRide) {
      player.update(dt, activeBuildings, isPlaying);
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

    if (ridingBus && !uberRide) {
      // Seat camera realistically inside the front cabin of the Yellow School Bus looking out the windshield
      player.position.set(ridingBus.x, 1.5, ridingBus.z);
      camera.position.set(
        ridingBus.x + ridingBus.dirX * 1.1,
        2.05,
        ridingBus.z + ridingBus.dirZ * 1.1
      );
    }

    // Realistic Cabin Interior Overlay (School Bus or Uber Car)
    if (uberRide && uberRide.phase === 'ride') {
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

    // Update Third-Person Student Avatar (visible only in 3rd person while on foot!)
    const showAvatar = player.viewMode === 'third' && !ridingBus && !(uberRide && uberRide.phase === 'ride');
    playerAvatar.visible = showAvatar;
    if (showAvatar) {
      playerAvatar.position.set(pos.x, 0.16, pos.z);
      const headingRad = (headingDeg * Math.PI) / 180;
      playerAvatar.rotation.y = Math.atan2(Math.sin(headingRad), -Math.cos(headingRad));

      const swing = player.isMoving ? Math.sin(player.walkCycle) * 0.55 : 0;
      const { leftLegPivot, rightLegPivot, leftArmPivot, rightArmPivot } = playerAvatar.userData;
      leftLegPivot.rotation.x = swing;
      rightLegPivot.rotation.x = -swing;
      leftArmPivot.rotation.x = -swing * 0.75;
      rightArmPivot.rotation.x = swing * 0.75;
    }

    ground.position.set(pos.x, 0, pos.z);
    chunkManager.update(pos.x, pos.z);
    pedestrianSystem.update(dt, ridingBus || uberRide ? null : pos);

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

      // Public Building Entrance detection (walk right onto welcome mat OR press G / tap!)
      const nearPub = !ridingBus && !insideBuilding ? findNearbyPublicBuilding(pos, 4.5) : null;
      if (nearPub) {
        const b = nearPub.building;
        const label = b.name || 'Shop';
        enterBuildingPrompt.classList.remove('hidden');
        enterBuildingPrompt.innerHTML = `🚪 Press <kbd>G</kbd> or Walk In: ${label}`;
        // Automatically walk inside when stepping right onto the welcome mat (with 2.5s exit cooldown)
        if (nearPub.dist <= 1.65 && performance.now() - lastBuildingExitAt > 2500) {
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

    renderer.render(scene, camera);
  }

  requestAnimationFrame(animate);
}

init().catch((err) => {
  console.error('Initialization failed:', err);
  loadingStatus.textContent = `Error: ${err.message}`;
});
