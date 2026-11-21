# Project Instructions: 3D Kid-Friendly Pedestrian & Traffic Safety Game

## 1. Tech Stack & Architecture
- **Core Stack:** Vite + Vanilla JavaScript (ES modules), `three` (3D rendering), and `leaflet` (2D synchronized mini-map). Keep dependencies lightweight and pure web-based.
- **No Proprietary Map APIs:** Never use Google Maps/Street View APIs or paid map keys. Rely exclusively on free, open data sources:
  - **OpenStreetMap Overpass API** (`https://overpass-api.de/api/interpreter`) for road geometry, sidewalks, crosswalks, traffic signals, stop signs, and building footprints.
  - **OpenStreetMap Standard Tiles** (`https://tile.openstreetmap.org/{z}/{x}/{y}.png`) for the 2D Leaflet mini-map.
  - **Nominatim** (`https://nominatim.openstreetmap.org`) for geocoding/address search.
  - **OSRM** (`https://router.project-osrm.org/route/v1/foot/`) for pedestrian route calculation.

## 2. Coordinate System & Spatial Invariants (CRITICAL)
- **Local Projection Origin:** Convert `(lat, lon)` to local 3D meters `(x, z)` relative to an origin `(originLat, originLon)`:
  - `x = (lon - originLon) * 111320 * Math.cos(originLat * Math.PI / 180)` (East = `+X`)
  - `z = -(lat - originLat) * 111320` (North = `-Z`)
- **Heading Alignment:** Verify that a Three.js camera facing `-Z` (yaw = `0`) points straight North (`0°` / up) on the 2D Leaflet mini-map. Turning right (`-Y` rotation) must rotate the mini-map directional arrow clockwise toward East (`+X`).
- **Chunk Streaming:** Stream neighborhood data in `300m x 300m` grid chunks around the player, keeping only the active `3x3` chunk neighborhood in the Three.js scene and disposing geometries/materials of unloaded chunks to prevent memory leaks.

## 3. Caching & Rate-Limit Protection
- **Cache Overpass Responses:** Always cache fetched Overpass chunk data in `IndexedDB` (or `localStorage` fallback) keyed by chunk grid ID (`chunk_${gx}_${gz}`), and include a pre-cached default preset mission in `public/preset-mission.json` so initial load works offline and in under 200ms.
- **Throttle Network Requests:** Never fire parallel bursts to Overpass or Nominatim; queue chunk requests sequentially with a minimum `500ms` delay and a descriptive `User-Agent` / `Referer`.

## 4. Gameplay, Controls & Kid-Friendly Rules
- **First-Person Movement:** Use Three.js `PointerLockControls` with WASD / Arrow keys at `1.5m` eye height. Include solid building collision detection and an accessible click-to-lock / ESC-to-pause overlay.
- **Continuous Sidewalks:** If an OSM road lacks explicit parallel `highway=footway` geometries, automatically generate walkable sidewalk strips along both sides of the road ribbon and zebra crosswalks at intersections so kids always have a valid safe path.
- **Traffic & Safety Rules:**
  - Use a **3 Safety Stars** system with a `3-second` invulnerability cooldown after any rule infraction so stars do not drain multiple times for a single mistake.
  - Enforce: (1) staying off road lanes outside crosswalks, (2) obeying cycling pedestrian Walk (white person) vs. Don't Walk (red hand) signals at `highway=traffic_signals`, and (3) looking left and right (checking camera yaw sweep) before stepping into unsignalized crosswalks.
  - Keep all feedback positive, clear, and age-appropriate for children ages 7–11.

## 5. Verification Workflow
- After implementing or modifying spatial, camera, or UI features, start the Vite dev server, open the app in the integrated browser, and verify that:
  1. No console or Overpass parsing errors occur.
  2. The 3D street layout visually matches the 2D Leaflet mini-map orientation.
