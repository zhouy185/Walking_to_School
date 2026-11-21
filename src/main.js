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
  createPoliceCarMesh,
  createPlayerAvatarMesh,
  disposeGroup,
} from './world/worldBuilder.js';
import { TrafficSystem } from './world/trafficSystem.js';
import { PedestrianSystem } from './world/pedestrianSystem.js';
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
const btnPoliceEscort = document.getElementById('btn-police-escort');
const btnPause = document.getElementById('btn-pause');
const lookWarningHud = document.getElementById('look-warning-hud');
const lookWarningTitle = document.getElementById('look-warning-title');
const lookWarningSub = document.getElementById('look-warning-sub');
const vehicleInterior = document.getElementById('vehicle-interior');
const cabinLedSign = document.getElementById('cabin-led-sign');
const dashSpeedVal = document.getElementById('dash-speed-val');
const dashScreen = document.getElementById('dash-screen');
const btnStart = document.getElementById('btn-start');
const btnPlayAgain = document.getElementById('btn-play-again');
const overlayStart = document.getElementById('overlay-start');
const overlayTitle = document.getElementById('overlay-title');
const overlayVictory = document.getElementById('overlay-victory');
const victoryStars = document.getElementById('victory-stars');
const victoryMessage = document.getElementById('victory-message');
const victoryStats = document.getElementById('victory-stats');
const overlayGameOver = document.getElementById('overlay-gameover');
const gameOverReason = document.getElementById('gameover-reason');
const btnTryAgain = document.getElementById('btn-try-again');
const sidewalkWarning = document.getElementById('sidewalk-warning');
const sidewalkCountdown = document.getElementById('sidewalk-countdown');
const sidewalkBarFill = document.getElementById('sidewalk-bar-fill');
const policeBanner = document.getElementById('police-banner');
const policeBannerSub = document.getElementById('police-banner-sub');
const trafficLightHud = document.getElementById('traffic-light-hud');
const trafficLightTitle = document.getElementById('traffic-light-title');
const trafficLightSub = document.getElementById('traffic-light-sub');
const busPrompt = document.getElementById('bus-prompt');
const npcPrompt = document.getElementById('npc-prompt');
const npcDialog = document.getElementById('npc-dialog');
const npcDialogName = document.getElementById('npc-dialog-name');
const npcDialogRole = document.getElementById('npc-dialog-role');
const npcDialogText = document.getElementById('npc-dialog-text');
const loadingStatus = document.getElementById('loading-status');
const homeAddressInput = document.getElementById('home-address-input');
const btnSearchAddress = document.getElementById('btn-search-address');
const addressResults = document.getElementById('address-results');
const selectedHomeLabel = document.getElementById('selected-home-label');
const missionTitleEl = document.getElementById('mission-title');
const quickPickChips = document.querySelectorAll('.chip-btn');

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
  const destXZ = latLonToXZ(preset.mission.destination.lat, preset.mission.destination.lon, ORIGIN);
  const schoolBeacon = createSchoolBeacon(destXZ.x, destXZ.z);
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
        selectedHomeLabel.innerHTML = `Selected Home: <strong>Marion Ave N, Westdale</strong>`;
        missionTitleEl.textContent = `From Your House to Cootes Paradise Elementary`;
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
        routeHint = await fetchOsrmPedestrianRoute(lat, lon, ORIGIN.lat, ORIGIN.lon);
        selectedHomeLabel.innerHTML = `Selected Home: <strong>${label}</strong>`;
        missionTitleEl.textContent = `From ${label} to Cootes Paradise Elementary`;
      }

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
      loadingStatus.textContent = `Ready! ${km >= 1000 ? `${(km / 1000).toFixed(1)} km` : `${km} m`} to Cootes Paradise Elementary School.`;
    } catch (err) {
      loadingStatus.textContent = `Could not load that address (${err.message}). Try another address!`;
    } finally {
      btnStart.disabled = false;
    }
  }

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
  let policeEscort = null; // { phase: 'approach' | 'escort', t, duration, fromX, fromZ, toX, toZ }
  const policeCarMesh = createPoliceCarMesh();
  policeCarMesh.visible = false;
  scene.add(policeCarMesh);

  const playerAvatar = createPlayerAvatarMesh();
  playerAvatar.visible = false; // Shown in Third-Person View
  scene.add(playerAvatar);

  function toggleCameraView() {
    const mode = player.toggleViewMode();
    btnCameraView.textContent = mode === 'third' ? '👁️ 1st Person View (V)' : '👁️ 3rd Person View (V)';
    showFeedback({
      type: 'info',
      icon: '👁️',
      text: mode === 'third' ? 'Switched to Third-Person View!' : 'Switched to First-Person View!',
    });
  }

  function startPoliceEscort(reason) {
    if (!isPlaying || policeEscort || safety.arrived || safety.gameOver) return;
    if (ridingBus) {
      ridingBus.mesh.visible = true;
      ridingBus = null;
    }
    sidewalkWarning.classList.add('hidden');
    busPrompt.classList.add('hidden');
    vehicleInterior.classList.add('hidden');

    const px = player.position.x;
    const pz = player.position.z;
    // Spawn police cruiser 20m away and drive smoothly up to player, then escort home!
    policeEscort = {
      phase: 'approach',
      t: 0,
      duration: 1.5,
      fromX: px + 18,
      fromZ: pz + 10,
      toX: px,
      toZ: pz,
      homeX: startPose.x,
      homeZ: startPose.z,
    };
    policeCarMesh.visible = true;
    policeCarMesh.position.set(policeEscort.fromX, 0.08, policeEscort.fromZ);
    policeBannerSub.textContent =
      reason || 'Friendly Police Car is here to give you a safe ride back to Your House!';
    policeBanner.classList.remove('hidden');
    showFeedback({
      type: 'info',
      icon: '🚓',
      text: 'Police Escort on the way! Hang tight for a safe ride home!',
    });
  }

  function toggleBusRide() {
    if (!isPlaying || policeEscort || safety.arrived || safety.gameOver) return;
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

  function talkToNearbyNpc() {
    if (!isPlaying || ridingBus || policeEscort || safety.arrived || safety.gameOver) return;
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
    if (e.code === 'KeyF') toggleBusRide();
    if (e.code === 'KeyT') talkToNearbyNpc();
    if (e.code === 'KeyV') toggleCameraView();
    if (e.code === 'KeyP') startPoliceEscort('You requested a friendly Police Escort back to Your House!');
  });
  busPrompt.addEventListener('click', toggleBusRide);
  npcPrompt.addEventListener('click', talkToNearbyNpc);
  btnCameraView.addEventListener('click', toggleCameraView);
  btnPoliceEscort.addEventListener('click', () =>
    startPoliceEscort('You requested a friendly Police Escort back to Your House!')
  );

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
      text: 'Walk down Marion Ave to King St W — walk on the sidewalks or press F to ride the Yellow School Bus!',
    });
  }

  function pauseGame() {
    if (!isPlaying || safety.arrived || safety.gameOver) return;
    isPlaying = false;
    overlayTitle.textContent = 'Walk Paused';
    btnStart.textContent = 'Resume Walking';
    overlayStart.classList.remove('hidden');
  }

  function restartGame() {
    if (ridingBus) ridingBus.mesh.visible = true;
    ridingBus = null;
    policeEscort = null;
    policeCarMesh.visible = false;
    policeBanner.classList.add('hidden');
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

  btnRouteHint.addEventListener('click', async () => {
    const visible = await miniMap.toggleRouteHint();
    btnRouteHint.textContent = visible ? '🗺️ Hide Route Hint' : '🗺️ Show Route Hint';
    btnRouteHint.classList.toggle('active', visible);
  });

  player.controls.addEventListener('unlock', () => {
    if (isPlaying && !safety.arrived && !safety.gameOver) {
      pauseGame();
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

    // Spin school entrance beacon crystal
    const crystal = schoolBeacon.getObjectByName('beaconCrystal');
    if (crystal) {
      crystal.rotation.y += dt * 1.4;
      crystal.position.y = 3.2 + Math.sin(now * 0.003) * 0.35;
    }

    const activeBuildings = chunkManager.getActiveBuildings();
    if (!ridingBus && !policeEscort) {
      player.update(dt, activeBuildings, isPlaying);
    }

    // Handle active requested Police Car Escort sequence
    if (policeEscort) {
      policeEscort.t += dt;
      // Flash red & blue roof lights
      const flash = Math.floor(now / 180) % 2 === 0;
      policeCarMesh.userData.redLightMat.color.setHex(flash ? 0xff2222 : 0x450a0a);
      policeCarMesh.userData.blueLightMat.color.setHex(flash ? 0x0a1e45 : 0x3b82f6);

      const u = Math.min(1, policeEscort.t / policeEscort.duration);
      const ease = u * u * (3 - 2 * u);
      const cx = policeEscort.fromX + (policeEscort.toX - policeEscort.fromX) * ease;
      const cz = policeEscort.fromZ + (policeEscort.toZ - policeEscort.fromZ) * ease;
      const dx = policeEscort.toX - policeEscort.fromX;
      const dz = policeEscort.toZ - policeEscort.fromZ;
      policeCarMesh.position.set(cx, 0.08, cz);
      policeCarMesh.rotation.y = Math.atan2(dx, dz);

      if (policeEscort.phase === 'escort') {
        policeCarMesh.visible = false; // Show realistic interior windshield view
        const escortHeading = forwardToHeadingDeg(dx, dz);
        player.setPose(cx, cz, escortHeading);
        camera.position.set(cx, 1.45, cz); // Seated car interior eye height
      }

      if (u >= 1) {
        if (policeEscort.phase === 'approach') {
          policeEscort.phase = 'escort';
          policeEscort.t = 0;
          policeEscort.duration = 4.2;
          policeEscort.fromX = policeEscort.toX;
          policeEscort.fromZ = policeEscort.toZ;
          policeEscort.toX = policeEscort.homeX;
          policeEscort.toZ = policeEscort.homeZ;
        } else {
          // Arrived back safely at Your House!
          policeEscort = null;
          policeCarMesh.visible = false;
          policeBanner.classList.add('hidden');
          vehicleInterior.classList.add('hidden');
          player.setPose(startPose.x, startPose.z, startPose.headingDeg);
          showFeedback({
            type: 'success',
            icon: '🏠',
            text: 'Police Car dropped you off safely at Your House!',
          });
        }
      }
    }

    // Update traffic first so bus position is fresh when riding
    const trafficPlayerPos = ridingBus || policeEscort ? null : player.position;
    const preStatus = safety.update(
      player.position,
      player,
      trafficSystem,
      dt,
      isPlaying && !ridingBus && !policeEscort
    );
    trafficSystem.update(dt, trafficPlayerPos, !ridingBus && !policeEscort && preStatus.inCrosswalk);

    if (ridingBus && !policeEscort) {
      // Seat camera realistically inside the front cabin of the Yellow School Bus looking out the windshield
      player.position.set(ridingBus.x, 1.5, ridingBus.z);
      camera.position.set(
        ridingBus.x + ridingBus.dirX * 1.1,
        2.05,
        ridingBus.z + ridingBus.dirZ * 1.1
      );
    }

    // Realistic Cabin Interior Overlay (School Bus or Police Car)
    if (policeEscort && policeEscort.phase === 'escort') {
      vehicleInterior.className = 'vehicle-interior police';
      cabinLedSign.textContent = '🚓 HAMILTON SAFETY POLICE • ESCORTING HOME';
      dashSpeedVal.textContent = '45';
      dashScreen.textContent = 'UNIT 104 • SAFE RIDE HOME';
    } else if (ridingBus && !policeEscort) {
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
    const showAvatar = player.viewMode === 'third' && !ridingBus && !(policeEscort && policeEscort.phase === 'escort');
    playerAvatar.visible = showAvatar;
    if (showAvatar) {
      playerAvatar.position.set(pos.x, 0.16, pos.z);
      // Avatar local +Z faces forward: headingDeg=0 (-Z) -> rotY=PI, headingDeg=90 (+X) -> rotY=PI/2
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
    pedestrianSystem.update(dt, ridingBus || policeEscort ? null : pos);

    compassReadout.textContent = `${headingToCardinal(headingDeg)} ${Math.round(headingDeg)}°`;
    miniMap.updatePlayer(pos.x, pos.z, headingDeg);
    miniMap.updateBuses(trafficSystem.getBuses());

    const status = preStatus;
    distancePill.textContent = `📍 ${status.distanceToGoal} m to school`;
    if (policeEscort) {
      zonePill.className = 'pill pill-blue';
      zonePill.textContent = '🚓 Police Escort Home';
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
    if (isPlaying && !policeEscort && !status.arrived && !status.gameOver) {
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
      const nearNpc = !ridingBus ? pedestrianSystem.getNearbyNpc(pos) : null;
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
    } else {
      busPrompt.classList.add('hidden');
      npcPrompt.classList.add('hidden');
      npcDialog.classList.add('hidden');
    }

    // Live 5-second road-lane warning banner & countdown bar
    if (isPlaying && !ridingBus && !policeEscort && status.offSidewalkSec > 0 && !status.gameOver) {
      const remaining = Math.max(0, OFF_SIDEWALK_LIMIT_SEC - status.offSidewalkSec);
      sidewalkCountdown.textContent = `${remaining.toFixed(1)}s`;
      sidewalkBarFill.style.width = `${(remaining / OFF_SIDEWALK_LIMIT_SEC) * 100}%`;
      sidewalkWarning.classList.remove('hidden');
    } else {
      sidewalkWarning.classList.add('hidden');
    }

    // Live Traffic Light RED / GREEN warning banner when near a signalized crosswalk
    if (isPlaying && !ridingBus && !policeEscort && !status.arrived && !status.gameOver) {
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

    // Proactive warning at any unsignalized intersection if you have not completed BOTH lookings yet!
    if (isPlaying && !ridingBus && !policeEscort && !status.arrived && !status.gameOver) {
      const nearUnsig = safety.getNearbyUnsignalizedCrosswalk(pos, 14.0);
      if (nearUnsig) {
        const trafficHidden = trafficLightHud.classList.contains('hidden');
        lookWarningHud.style.top = trafficHidden ? '124px' : '212px';
        const leftIcon = lookSt.lookedLeft ? '✅' : '⬜';
        const rightIcon = lookSt.lookedRight ? '✅' : '⬜';
        if (lookSt.lookedBoth) {
          lookWarningHud.className = 'look-warning-hud ready';
          lookWarningTitle.textContent = `✅ Ready to Cross ${nearUnsig.roadName}!`;
          lookWarningSub.textContent = `⬅️ Left: ${leftIcon}  •  ➡️ Right: ${rightIcon}  (Both checked!)`;
        } else {
          lookWarningHud.className = 'look-warning-hud';
          lookWarningTitle.textContent = !lookSt.lookedLeft && !lookSt.lookedRight
            ? `⚠️ Stop at ${nearUnsig.roadName} — Look BOTH Ways!`
            : lookSt.lookedLeft
              ? `⚠️ Almost Ready — Now Look RIGHT too!`
              : `⚠️ Almost Ready — Now Look LEFT too!`;
          lookWarningSub.textContent = `⬅️ Left: ${leftIcon}  •  ➡️ Right: ${rightIcon}  (Use Mouse or Q / E)`;
        }
      } else {
        lookWarningHud.classList.add('hidden');
      }
    } else {
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
