# Custom characters

Put rigged characters here: `.glb` files from an AI 3D tool such as **Meshy** or **Tripo**, from
Mixamo or an asset store, or `.vrm` files from **VRoid Studio**. List them in `manifest.json`. They load in the
background after the regular characters; until a file has loaded, a regular character stands in
and is swapped automatically.

```json
{
  "characters": [
    { "id": "maya", "label": "Maya", "file": "maya.vrm", "gender": "f", "heightM": 1.35, "roles": ["player"], "emoji": "🧒" },
    { "id": "mom",  "label": "Mom",  "file": "mom.vrm",  "gender": "f", "heightM": 1.66, "roles": ["mom"] },
    { "id": "dad",  "label": "Dad",  "file": "dad.vrm",  "gender": "m", "heightM": 1.78, "roles": ["dad"] }
  ]
}
```

| field     | meaning |
|-----------|---------|
| `id`      | short unique name (letters, numbers, `-`, `_`) |
| `file`    | the `.vrm` (or rigged `.glb`) in this folder |
| `heightM` | standing height in metres, top of hair included — the model is resized to exactly this |
| `roles`   | `player` = appears under **Customize Avatar**; `mom` / `dad` = the parents at home |
| `gender`, `label`, `emoji` | shown on the character card |

What the game does with a VRoid character automatically: keeps its cartoon (MToon) shading,
sizes and orients it, runs it with the same walking / sitting animation as everyone else,
makes it blink, and gives every copy its own hair / skirt physics.

## Making one in VRoid Studio (free, Mac or Windows)

1. Create a new model and shape the face, hair and outfit. For the player, use the
   **Body → Height** slider to make a child (the game sets the final height from `heightM`).
2. **Export → Export as VRM**, VRM 1.0 or 0.0 both work. In the export dialog, set
   *Reduce polygons* to about 20,000–30,000, *Texture atlas resolution* to 2048, and
   *Bones: reduce* off. That keeps a character around 5–10 MB.
3. Copy the `.vrm` here, add a line to `manifest.json`, and run `npm run dev`.

## Pixar-style characters from a picture (Meshy, Tripo …)

1. Start from a **full-body** picture: front view, standing straight, arms slightly away from the
   body, whole figure including shoes, plain background.
2. In the AI tool: *Image to 3D* → check the result → **Auto-rig** (humanoid) → export **GLB**.
   Around 20–50k triangles and 1024–2048 px textures keeps it light.
3. Copy the `.glb` here and add it to `manifest.json` (same format as above).

The game understands Mixamo-style bone names (Hips, LeftUpLeg, LeftArm, Head …), which is what
Mixamo and most auto-riggers produce, as well as Unreal and VRM skeletons. If a file is rejected,
the browser console says so.

Licences: check the tool's terms. Free plans often require attribution (e.g. CC BY 4.0) or allow
non-commercial use only.
