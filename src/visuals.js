/**
 * Visual quality layer for the outdoor world:
 *  - Image-based lighting (soft sky reflections on cars, windows and paint)
 *  - Sun disc + glow in the sky, sun-follow shadows (sharp near the player at any distance)
 *  - Grass ground texture with subtle mowing variation
 *  - Post-processing: ambient occlusion (High), soft bloom, warm colour grade + vignette, FXAA-free output
 *  - Graphics quality presets: 'high' | 'medium' | 'low' (auto-picks Low on phones/tablets)
 */
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const STORAGE_KEY = 'westdale.graphics';

export function defaultQuality() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'high' || saved === 'medium' || saved === 'low') return saved;
  } catch {
    /* ignore */
  }
  const touch = 'ontouchstart' in window || navigator.maxTouchPoints > 1;
  const small = Math.min(window.screen.width, window.screen.height) < 900;
  return touch || small ? 'low' : 'high';
}

// Colour grade: gentle warm highlights / cool shadows, a touch of saturation, soft vignette.
const GradeShader = {
  uniforms: {
    tDiffuse: { value: null },
    uSat: { value: 1.14 },
    uVignette: { value: 0.28 },
    uWarm: { value: 0.035 },
  },
  vertexShader: `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`,
  fragmentShader: `
    uniform sampler2D tDiffuse; uniform float uSat; uniform float uVignette; uniform float uWarm;
    varying vec2 vUv;
    void main(){
      vec4 c = texture2D(tDiffuse, vUv);
      float l = dot(c.rgb, vec3(0.2126, 0.7152, 0.0722));
      c.rgb = mix(vec3(l), c.rgb, uSat);
      // split-tone: warm highlights, cool shadows
      c.rgb += mix(vec3(-0.01, 0.0, 0.025), vec3(uWarm, uWarm * 0.55, -uWarm * 0.4), smoothstep(0.15, 0.85, l));
      float d = distance(vUv, vec2(0.5));
      c.rgb *= 1.0 - uVignette * smoothstep(0.38, 0.9, d);
      gl_FragColor = c;
    }`,
};

export function makeGrassTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 256);
  let sd = 7;
  const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
  // speckled blades
  for (let i = 0; i < 9000; i++) {
    const v = 200 + Math.floor(rnd() * 55);
    ctx.fillStyle = `rgba(${v - 20},${v},${v - 40},0.55)`;
    ctx.fillRect(rnd() * 256, rnd() * 256, 1.2, 2.4);
  }
  for (let i = 0; i < 2500; i++) {
    ctx.fillStyle = 'rgba(70,90,40,0.18)';
    ctx.fillRect(rnd() * 256, rnd() * 256, 1, 2);
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.anisotropy = 8;
  return t;
}

// Large-scale mowing / patchiness variation (multiplies on top of the fine grass)
function makePatchTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 128, 128);
  let sd = 19;
  const rnd = () => ((sd = (sd * 16807) % 2147483647) / 2147483647);
  for (let i = 0; i < 70; i++) {
    const r = 6 + rnd() * 18;
    const g = ctx.createRadialGradient(0, 0, 0, 0, 0, r);
    const dark = rnd() < 0.55;
    g.addColorStop(0, dark ? 'rgba(150,170,110,0.35)' : 'rgba(255,255,220,0.3)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    for (const ox of [-128, 0, 128])
      for (const oy of [-128, 0, 128]) {
        ctx.save();
        ctx.translate(rnd() * 0 + (i * 37) % 128 + ox, (i * 61) % 128 + oy);
        ctx.fillStyle = g;
        ctx.fillRect(-r, -r, r * 2, r * 2);
        ctx.restore();
      }
  }
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  return t;
}

let sharedGrass = null;
/** World-space grass texture (1 tile = 4 m) shared by parks / school grounds / fields. */
export function getAreaGrassTexture() {
  if (!sharedGrass) {
    sharedGrass = makeGrassTexture();
    sharedGrass.repeat.set(0.25, 0.25);
  }
  return sharedGrass;
}

let pitchTex = null;
/** Mowed stripes for sports fields (1 tile = 16 m, 2 stripes). */
export function getPitchTexture() {
  if (pitchTex) return pitchTex;
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const base = makeGrassTexture().image;
  ctx.drawImage(base, 0, 0);
  ctx.fillStyle = 'rgba(255,255,230,0.16)';
  ctx.fillRect(0, 0, 128, 256);
  ctx.fillStyle = 'rgba(40,60,20,0.08)';
  ctx.fillRect(128, 0, 128, 256);
  pitchTex = new THREE.CanvasTexture(c);
  pitchTex.colorSpace = THREE.SRGBColorSpace;
  pitchTex.wrapS = pitchTex.wrapT = THREE.RepeatWrapping;
  pitchTex.repeat.set(1 / 16, 1 / 16);
  pitchTex.anisotropy = 8;
  return pitchTex;
}

export function upgradeGround(ground) {
  const mat = ground.material;
  mat.map = makeGrassTexture();
  mat.map.repeat.set(600, 600); // 4 m per tile on a 2400 m plane
  mat.color.setHex(0x6fae4f);
  const patch = makePatchTexture();
  // Second, much larger-scale texture modulates the grass (no extra UVs needed)
  mat.onBeforeCompile = (shader) => {
    shader.uniforms.tPatch = { value: patch };
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nuniform sampler2D tPatch;')
      .replace(
        '#include <map_fragment>',
        `#include <map_fragment>
        diffuseColor.rgb *= texture2D(tPatch, vMapUv * 0.018).rgb;`
      );
  };
  mat.needsUpdate = true;
}

function makeSunSprite() {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,245,1)');
  g.addColorStop(0.09, 'rgba(255,250,225,1)');
  g.addColorStop(0.16, 'rgba(255,236,190,0.55)');
  g.addColorStop(0.45, 'rgba(255,220,160,0.14)');
  g.addColorStop(1, 'rgba(255,210,150,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  const s = new THREE.Sprite(
    new THREE.SpriteMaterial({ map: t, transparent: true, depthWrite: false, fog: false, toneMapped: false, blending: THREE.AdditiveBlending })
  );
  s.scale.set(220, 220, 1);
  s.renderOrder = -9;
  return s;
}

export class Visuals {
  constructor({ renderer, scene, camera, sunLight, hemiLight, skyGroup }) {
    this.renderer = renderer;
    this.scene = scene;
    this.camera = camera;
    this.sun = sunLight;
    this.hemi = hemiLight;
    this.skyGroup = skyGroup;
    this.sunDir = sunLight.position.clone().normalize();
    this.quality = defaultQuality();

    // Soft image-based lighting: cars, glass and paint pick up sky reflections
    const pmrem = new THREE.PMREMGenerator(renderer);
    this.envMap = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    pmrem.dispose();
    scene.environment = this.envMap;
    scene.environmentIntensity = 0.22;
    // IBL adds ambient fill, so pull the hemisphere fill back to keep contrast
    hemiLight.intensity = 0.7;
    renderer.toneMappingExposure = 1.0;

    // Sun disc in the sky dome
    this.sunSprite = makeSunSprite();
    this.sunSprite.position.copy(this.sunDir).multiplyScalar(560);
    skyGroup.add(this.sunSprite);

    // Shadows follow the player so they're crisp everywhere
    scene.add(sunLight.target);

    this._buildComposer();
    this.setQuality(this.quality);
  }

  _buildComposer() {
    const { renderer, scene, camera } = this;
    const size = renderer.getSize(new THREE.Vector2());
    this.composer = new EffectComposer(renderer);
    this.renderPass = new RenderPass(scene, camera);
    this.composer.addPass(this.renderPass);
    this.aoPass = new GTAOPass(scene, camera, size.x, size.y);
    this.aoPass.updateGtaoMaterial({ radius: 1.4, distanceExponent: 1.6, thickness: 2, scale: 1.05 });
    this.aoPass.blendIntensity = 0.85;
    this.composer.addPass(this.aoPass);
    this.bloomPass = new UnrealBloomPass(new THREE.Vector2(size.x, size.y), 0.22, 0.55, 0.92);
    this.composer.addPass(this.bloomPass);
    this.outputPass = new OutputPass();
    this.composer.addPass(this.outputPass);
    this.gradePass = new ShaderPass(GradeShader);
    this.composer.addPass(this.gradePass);
  }

  setQuality(q) {
    this.quality = q;
    try {
      localStorage.setItem(STORAGE_KEY, q);
    } catch {
      /* ignore */
    }
    const r = this.renderer;
    const dpr = window.devicePixelRatio || 1;
    r.setPixelRatio(q === 'high' ? Math.min(dpr, 2) : q === 'medium' ? Math.min(dpr, 1.5) : Math.min(dpr, 1.25));
    this.usePost = q !== 'low';
    // Post chain tone-maps the sky too (it would turn pale); compensate with deeper sky colours
    const skyMat = this.skyGroup.children.find((c) => c.material?.uniforms?.topColor)?.material;
    if (skyMat) {
      skyMat.uniforms.topColor.value.setHex(this.usePost ? 0x1f6fd1 : 0x3d8fdb);
      skyMat.uniforms.horizonColor.value.setHex(this.usePost ? 0xc4e2f8 : 0xd9eefb);
    }
    this.aoPass.enabled = q === 'high';
    this.bloomPass.enabled = q !== 'low';
    this.sun.shadow.mapSize.set(q === 'low' ? 1024 : 2048, q === 'low' ? 1024 : 2048);
    if (this.sun.shadow.map) {
      this.sun.shadow.map.dispose();
      this.sun.shadow.map = null;
    }
    const d = q === 'low' ? 70 : 95;
    const cam = this.sun.shadow.camera;
    cam.left = -d;
    cam.right = d;
    cam.top = d;
    cam.bottom = -d;
    cam.near = 10;
    cam.far = 420;
    cam.updateProjectionMatrix();
    this.sun.shadow.bias = -0.0004;
    this.sun.shadow.normalBias = 0.04;
    this.resize();
  }

  resize() {
    const w = window.innerWidth;
    const h = window.innerHeight;
    this.composer.setPixelRatio(this.renderer.getPixelRatio());
    this.composer.setSize(w, h);
  }

  /** Call every outdoor frame before render. */
  update(focus) {
    // Snap the shadow frustum to texel steps to avoid shimmering
    const step = 2;
    const fx = Math.round(focus.x / step) * step;
    const fz = Math.round(focus.z / step) * step;
    this.sun.target.position.set(fx, 0, fz);
    this.sun.position.set(fx + this.sunDir.x * 220, this.sunDir.y * 220, fz + this.sunDir.z * 220);
    this.sun.target.updateMatrixWorld();
  }

  render() {
    if (this.usePost) {
      // Post chain applies tone mapping in OutputPass; render pass must output linear HDR
      this.composer.render();
    } else {
      this.renderer.render(this.scene, this.camera);
    }
  }
}
