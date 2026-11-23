# Westdale Safe Walk 🚸🏫

A 3D kid-friendly pedestrian and traffic safety game built with **Vite**, **Three.js**, **Leaflet**, and **OpenStreetMap** data, centered around **Cootes Paradise Elementary School** (`43.26407, -79.90231`) in Westdale, Hamilton, Ontario.

## Features

- **Real OpenStreetMap 3D Neighborhood**
  - Uses real OSM road geometry, lane counts, one-way streets, bike lanes, raised curbed sidewalks, white zebra crosswalks, corner street-name signs, and red octagonal `STOP` signs.
  - Extrudes neighborhood landmarks including **Cootes Paradise Elementary School** (with a glowing entrance plaza beacon and safe school walkways), **Westdale Library**, local churches, King Street shops, and houses.
  - Streams `300m × 300m` grid chunks (`3×3` active neighborhood) with `IndexedDB` caching (`localStorage` fallback) and sequentially throttled Overpass/Nominatim requests.
- **Choose Any Starting Home Address**
  - Start from **Your House** on Marion Ave N, pick a quick-start location (Westdale Library, Locke St S, Dundas), or search any address on the map via **Nominatim** to dynamically load its surrounding streets and OSRM pedestrian route.
- **Traffic Signals, School Buses & NPC Neighbors**
  - Cycling 3D traffic lights and pedestrian `WALK` / `STOP` heads at signalized intersections, paired with a clear HUD traffic-light warning banner (`RED` / `GREEN` countdown).
  - 8 low-poly vehicles (including 2 rideable **Yellow School Buses**) that obey red lights and stop for pedestrians in crosswalks.
  - 10 animated NPC pedestrians walking on sidewalks that you can chat with (`T`).
  - On-demand **Police Escort** (`P` or HUD button) with an inside-the-vehicle cabin view for both the School Bus and Police Cruiser.
- **Pedestrian Safety Rules & Scoring**
  - **3 Safety Stars & Safety Points** (starting at `100 pts`).
  - **Stay Out of Road Lanes**: Walking on sidewalks, crosswalks, or grass is safe; staying in a road lane outside a crosswalk triggers a 5-second countdown warning before Game Over.
  - **Obey Red Lights**: Crossing on a red `STOP` signal deducts points (`-30 pts`).
  - **Look BOTH Left & Right**: Crossing unsignalized intersections requires checking both left and right (`Mouse` or `Q`/`E`), with a live intersection checklist warning.
- **Synchronized 2D Leaflet Mini-Map**
  - Displays OpenStreetMap standard tiles, a heading-aligned directional player arrow (`-Z` = `0°` North, turning right = `90°` East), home/school/bus-stop pins, live moving school buses, and a **Show / Hide Route Hint** toggle powered by **OSRM**.

## Controls

| Key / Input | Action |
| --- | --- |
| `W` `A` `S` `D` / Arrow Keys | Walk |
| `Mouse` or `Q` / `E` | Look around (and look left/right at crosswalks) |
| `V` | Switch between First-Person and Third-Person (Student Avatar) view |
| `F` | Board / exit a nearby Yellow School Bus |
| `T` | Talk to a nearby NPC pedestrian |
| `P` | Request a Police Escort ride back to Your House |
| `ESC` | Pause |

## Getting Started

### Prerequisites
- Node.js (v18+ recommended) and npm

### Install & Run

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/` on your computer, or open the printed **Network** URL (e.g. `http://192.168.x.x:5173/`) in Safari on your **iPad or iPhone** on the same Wi-Fi network.

### iPad & iPhone Touch Controls
- **Left-thumb virtual joystick**: Walk in any direction
- **Drag anywhere on the screen** (or hold **⬅️ Look L** / **Look R ➡️**): Look around and check both ways at intersections
- **Tap on-screen buttons**: Switch 1st/3rd person view, show route hint, board/exit the school bus, talk to NPCs, or call a police escort home

### Other Scripts

- **Production build:**
  ```bash
  npm run build
  ```
- **Preview production build:**
  ```bash
  npm run preview
  ```
- **Refresh pre-cached Westdale OSM + OSRM preset (`public/preset-mission.json`):**
  ```bash
  npm run fetch-preset
  ```

## Project Structure

- [index.html](file:///Users/yz/Documents/Projects/Walking/index.html) — Game HUD, address picker, vehicle cabin overlay, and start/pause/victory/game-over screens
- [scripts/fetch-preset.mjs](file:///Users/yz/Documents/Projects/Walking/scripts/fetch-preset.mjs) — Fetches the 450m Westdale Overpass dataset and OSRM route into `public/preset-mission.json`
- [src/main.js](file:///Users/yz/Documents/Projects/Walking/src/main.js) — Three.js scene setup, game loop, HUD updates, bus/police rides, and address switching
- [src/geo.js](file:///Users/yz/Documents/Projects/Walking/src/geo.js) — Local `(lat, lon)` to `(x, z)` meter projection and spatial helpers
- [src/data/osmCache.js](file:///Users/yz/Documents/Projects/Walking/src/data/osmCache.js) — Preset loader, IndexedDB chunk caching, Nominatim geocoding, OSRM routing, and throttled Overpass queries
- [src/data/osmParser.js](file:///Users/yz/Documents/Projects/Walking/src/data/osmParser.js) — Parses OSM roads, lanes, sidewalks, crosswalks, stop signs, signals, and buildings
- [src/world/chunkManager.js](file:///Users/yz/Documents/Projects/Walking/src/world/chunkManager.js) — `300m × 300m` `3×3` chunk streaming and GPU resource disposal
- [src/world/worldBuilder.js](file:///Users/yz/Documents/Projects/Walking/src/world/worldBuilder.js) — Low-poly 3D meshes for streets, sidewalks, zebra crossings, signs, buildings, avatar, and vehicles
- [src/world/trafficSystem.js](file:///Users/yz/Documents/Projects/Walking/src/world/trafficSystem.js) — Traffic light cycling, `WALK`/`STOP` signals, and school zone cars/buses
- [src/world/pedestrianSystem.js](file:///Users/yz/Documents/Projects/Walking/src/world/pedestrianSystem.js) — Animated NPC pedestrians and dialogue lines
- [src/player/controls.js](file:///Users/yz/Documents/Projects/Walking/src/player/controls.js) — First/third-person movement, building collision, and look-left/right sweep tracking
- [src/gameplay/safetyRules.js](file:///Users/yz/Documents/Projects/Walking/src/gameplay/safetyRules.js) — Safety Stars, Safety Points, road-lane countdown, and intersection checks
- [src/ui/minimap.js](file:///Users/yz/Documents/Projects/Walking/src/ui/minimap.js) — Synchronized 2D Leaflet mini-map and OSRM route hint

## License & Attribution

Licensed under the **Apache License 2.0** ([LICENSE](file:///Users/yz/Documents/Projects/Walking/LICENSE)).

Any copy, deployment, or derivative work must retain the copyright notice and include the attribution notice in [NOTICE](file:///Users/yz/Documents/Projects/Walking/NOTICE) acknowledging **zhouy185** as the original author.
