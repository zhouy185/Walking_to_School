# MetaHuman characters

Drop optimized `.glb` files in this folder and list them in `manifest.json`. The game loads them
in the background after the regular characters, so startup stays fast. Until a file has
loaded, the game shows a regular character in its place and swaps it in automatically.

```json
{
  "characters": [
    { "id": "maya", "label": "Maya", "file": "maya.glb", "gender": "f", "heightM": 1.35, "roles": ["player"], "emoji": "🧒" },
    { "id": "mom",  "label": "Mom",  "file": "mom.glb",  "gender": "f", "heightM": 1.68, "roles": ["mom"] },
    { "id": "dad",  "label": "Dad",  "file": "dad.glb",  "gender": "m", "heightM": 1.80, "roles": ["dad"] }
  ]
}
```

| field     | meaning |
|-----------|---------|
| `id`      | short unique name (letters, numbers, `-`, `_`) |
| `file`    | the `.glb` in this folder |
| `heightM` | standing height in metres, top of hair included. The model is resized to exactly this |
| `roles`   | `player` = appears under **Customize Avatar**; `mom` / `dad` = the parents at home |
| `gender`, `label`, `emoji` | shown on the character card |

Orientation, units (cm or m) and Z-up vs Y-up don't matter — the game detects and fixes them.
The file only needs Unreal's standard skeleton names (`pelvis`, `thigh_l`, `upperarm_l`, `head`, …).

## Getting a MetaHuman out of Unreal (5.6 or later)

1. **Create** the character in the MetaHuman Character editor. For the player, make a child
   (shorter body type). Pick clothes and a **card-based** hairstyle — strand hair (grooms) can't
   be shown in a browser.
2. **Assemble** it (UE Optimized is fine) so the body, face and clothing skeletal meshes exist
   as assets.
3. **Export** from the Content Browser (right-click → *Asset Actions → Export…* → FBX):
   - the **body** skeletal mesh, the **face** skeletal mesh, and any clothing skeletal meshes;
   - the hair / eyebrow **card** meshes (static meshes are fine);
   - their **textures** (base colour + normal) into one folder: select them → *Export…* → PNG/TGA.
   In the FBX options, export LODs on, Morph Targets off. Ignore the "DCC Export" option — that
   one produces DNA files for Maya / Houdini, not meshes.
4. **Convert** with Blender 4.2+ (free):
   ```bash
   blender -b -P scripts/metahuman_to_glb.py -- \
     --body Body.fbx --face Face.fbx --extra Hair_Cards.fbx Eyebrows.fbx \
     --textures ./Textures --lod 2 --tex 1024 \
     --out public/models/metahuman/maya.raw.glb
   ```
5. **Shrink** for the web (meshopt geometry + WebP textures, typically 5–10× smaller):
   ```bash
   npm run optimize-metahuman -- public/models/metahuman/maya.raw.glb public/models/metahuman/maya.glb
   ```
6. Add the entry to `manifest.json`, run `npm run dev`, and pick the character under
   **Customize Avatar** (or walk up to Mom / Dad in the house).

**Size budget:** aim for under ~8 MB per character (LOD 2, 1024 px textures). Use LOD 3 and
`--tex 512` for anyone who only appears small on screen.
