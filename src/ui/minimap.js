/**
 * Synchronized 2D Leaflet Mini-Map:
 * - Uses OpenStreetMap Standard Tiles (https://tile.openstreetmap.org/{z}/{x}/{y}.png)
 * - Displays directional player arrow aligned with 3D camera heading:
 *     3D facing -Z (yaw = 0) -> 0° North (arrow pointing UP)
 *     Turning right (-Y)     -> clockwise toward East (+X, 90°)
 * - Supports "Show / Hide Route Hint" toggle using OSRM pedestrian route
 */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { xzToLatLon } from '../geo.js';

export class MiniMap {
  constructor(containerId, mission, presetRouteHint = null, extraMarkers = {}) {
    this.mission = mission;
    this.presetRouteHint = presetRouteHint;
    this.routeLayer = null;
    this.routeVisible = false;
    this.routeCoordsLatLon = null;
    this.busMarkers = [];

    const initialCenter = extraMarkers.homeXZ
      ? xzToLatLon(extraMarkers.homeXZ.x, extraMarkers.homeXZ.z)
      : { lat: mission.start.lat, lon: mission.start.lon };

    this.map = L.map(containerId, {
      center: [initialCenter.lat, initialCenter.lon],
      zoom: 17,
      zoomControl: false,
      attributionControl: false,
      dragging: false,
      scrollWheelZoom: false,
      doubleClickZoom: false,
      boxZoom: false,
      keyboard: false,
    });

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
      attribution: '&copy; OpenStreetMap contributors',
    }).addTo(this.map);

    // Your House marker
    this.homeMarker = null;
    if (extraMarkers.homeXZ) {
      const hll = xzToLatLon(extraMarkers.homeXZ.x, extraMarkers.homeXZ.z);
      this.homeMarker = L.marker([hll.lat, hll.lon], {
        icon: L.divIcon({
          className: 'landmark-pin-wrap',
          html: '<div class="landmark-pin home" title="Your House">🏠</div>',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        }),
      }).addTo(this.map);
    }

    // Westdale Library marker
    L.marker([mission.start.lat, mission.start.lon], {
      icon: L.divIcon({
        className: 'landmark-pin-wrap',
        html: '<div class="landmark-pin start" title="Westdale Library">📚</div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      }),
    }).addTo(this.map);

    // Bus Stop markers
    for (const stop of extraMarkers.busStops || []) {
      const sll = xzToLatLon(stop.x, stop.z);
      L.marker([sll.lat, sll.lon], {
        icon: L.divIcon({
          className: 'landmark-pin-wrap',
          html: `<div class="landmark-pin busstop" title="${stop.name}">🚏</div>`,
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        }),
      }).addTo(this.map);
    }

    // Destination marker (Cootes Paradise Elementary School)
    L.marker([mission.destination.lat, mission.destination.lon], {
      icon: L.divIcon({
        className: 'landmark-pin-wrap',
        html: '<div class="landmark-pin school" title="Cootes Paradise Elementary School">🏫</div>',
        iconSize: [26, 26],
        iconAnchor: [13, 13],
      }),
    }).addTo(this.map);

    // Directional Player Arrow (points UP = North at 0deg; rotates clockwise for East = 90deg)
    this.playerMarker = L.marker([initialCenter.lat, initialCenter.lon], {
      zIndexOffset: 1000,
      icon: L.divIcon({
        className: 'player-arrow-wrapper',
        html: `
          <svg id="minimap-player-arrow" class="player-arrow-svg" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
            <circle cx="16" cy="16" r="14" fill="rgba(37, 99, 235, 0.22)" />
            <polygon points="16,3 25,26 16,21 7,26" fill="#2563eb" stroke="#ffffff" stroke-width="2.2" stroke-linejoin="round" />
          </svg>
        `,
        iconSize: [28, 28],
        iconAnchor: [14, 14],
      }),
    }).addTo(this.map);

    if (presetRouteHint?.coordinates?.length) {
      this.routeCoordsLatLon = presetRouteHint.coordinates.map(([lon, lat]) => [lat, lon]);
    }
  }

  updatePlayer(x, z, headingDeg) {
    const { lat, lon } = xzToLatLon(x, z);
    this.playerMarker.setLatLng([lat, lon]);
    this.map.setView([lat, lon], this.map.getZoom(), { animate: false });

    const arrowEl = document.getElementById('minimap-player-arrow');
    if (arrowEl) {
      arrowEl.style.transform = `rotate(${headingDeg.toFixed(1)}deg)`;
    }
  }

  setHomeLocation(homeXZ, routeHint = null) {
    const hll = xzToLatLon(homeXZ.x, homeXZ.z);
    if (this.homeMarker) {
      this.homeMarker.setLatLng([hll.lat, hll.lon]);
    } else {
      this.homeMarker = L.marker([hll.lat, hll.lon], {
        icon: L.divIcon({
          className: 'landmark-pin-wrap',
          html: '<div class="landmark-pin home" title="Your House">🏠</div>',
          iconSize: [26, 26],
          iconAnchor: [13, 13],
        }),
      }).addTo(this.map);
    }
    this.mission.start = { ...this.mission.start, lat: hll.lat, lon: hll.lon };
    this.routeCoordsLatLon = routeHint?.coordinates?.length
      ? routeHint.coordinates.map(([lon, lat]) => [lat, lon])
      : null;

    if (this.routeVisible && this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
      this.routeLayer = null;
      if (this.routeCoordsLatLon) {
        this.routeLayer = L.polyline(this.routeCoordsLatLon, {
          color: '#2563eb',
          weight: 5,
          opacity: 0.85,
          dashArray: '8, 8',
        }).addTo(this.map);
      }
    }
  }

  updateBuses(buses) {
    while (this.busMarkers.length < buses.length) {
      const m = L.marker([this.mission.start.lat, this.mission.start.lon], {
        zIndexOffset: 600,
        icon: L.divIcon({
          className: 'landmark-pin-wrap',
          html: '<div class="landmark-pin bus" title="School Bus">🚌</div>',
          iconSize: [22, 22],
          iconAnchor: [11, 11],
        }),
      }).addTo(this.map);
      this.busMarkers.push(m);
    }
    buses.forEach((bus, i) => {
      const ll = xzToLatLon(bus.x, bus.z);
      this.busMarkers[i].setLatLng([ll.lat, ll.lon]);
    });
  }

  async toggleRouteHint() {
    this.routeVisible = !this.routeVisible;

    if (!this.routeVisible) {
      if (this.routeLayer) {
        this.map.removeLayer(this.routeLayer);
        this.routeLayer = null;
      }
      return false;
    }

    // Fetch live from OSRM pedestrian routing if not yet cached
    if (!this.routeCoordsLatLon) {
      try {
        const s = this.mission.start;
        const d = this.mission.destination;
        const url = `https://router.project-osrm.org/route/v1/foot/${s.lon},${s.lat};${d.lon},${d.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          const coords = data.routes?.[0]?.geometry?.coordinates;
          if (coords?.length) {
            this.routeCoordsLatLon = coords.map(([lon, lat]) => [lat, lon]);
          }
        }
      } catch {
        // Fallback to straight line if offline
        this.routeCoordsLatLon = [
          [this.mission.start.lat, this.mission.start.lon],
          [this.mission.destination.lat, this.mission.destination.lon],
        ];
      }
    }

    if (this.routeCoordsLatLon) {
      this.routeLayer = L.polyline(this.routeCoordsLatLon, {
        color: '#2563eb',
        weight: 5,
        opacity: 0.85,
        dashArray: '8, 8',
      }).addTo(this.map);
    }

    return true;
  }
}
