import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { useEffect, useMemo, useRef } from 'react'
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  ColorManagement,
  DoubleSide,
  Mesh,
  NormalBlending,
  Plane,
  Points,
  Raycaster,
  ShaderMaterial,
  Vector2,
  Vector3,
  type PerspectiveCamera,
} from 'three'
import type { Tier } from '../lib/device'
import { createBrain } from './brainGeometry'
import { causticsGLSL, fogGLSL } from './glsl'

// Semua warna diperlakukan apa adanya (tanpa konversi linear) agar shader, kabut & latar konsisten
ColorManagement.enabled = false

/* ------------------------------------------------------------------ */
/*  Keyframe dari DOM: setiap <section data-depth data-pitch data-brain> */
/* ------------------------------------------------------------------ */
interface Key { at: number; depth: number; pitch: number; brain: number; assemble: number }
const state = { depth: 5.5, pitch: -70, brain: 1, assemble: 0, pointer: new Vector2() }
const target = { ...state }

function readKeys(): Key[] {
  const els = Array.from(document.querySelectorAll<HTMLElement>('[data-depth]'))
  const vh = innerHeight
  return els
    .map((el) => {
      const r = el.getBoundingClientRect()
      return {
        // nilai tercapai ketika bagian atas section berada ±40% dari atas layar
        at: r.top + scrollY - vh * 0.4,
        depth: Number(el.dataset.depth),
        pitch: Number(el.dataset.pitch ?? 6),
        brain: Number(el.dataset.brain ?? 0),
        assemble: Number(el.dataset.assemble ?? el.dataset.brain ?? 0),
      }
    })
    .sort((a, b) => a.at - b.at)
    .map((k, i) => (i === 0 ? { ...k, at: Math.max(0, k.at) } : k))
}

function sample(keys: Key[], y: number) {
  if (!keys.length) return
  if (y <= keys[0].at) return Object.assign(target, keys[0])
  for (let i = 0; i < keys.length - 1; i++) {
    const a = keys[i], b = keys[i + 1]
    if (y <= b.at) {
      let t = (y - a.at) / Math.max(1, b.at - a.at)
      t = t * t * (3 - 2 * t)
      target.depth = a.depth + (b.depth - a.depth) * t
      target.pitch = a.pitch + (b.pitch - a.pitch) * t
      target.brain = a.brain + (b.brain - a.brain) * t
      target.assemble = a.assemble + (b.assemble - a.assemble) * t
      return
    }
  }
  Object.assign(target, keys[keys.length - 1])
}

/* ------------------------------------------------------------------ */
/*  Warna kedalaman                                                   */
/* ------------------------------------------------------------------ */
const SKY = new Color('#d6f4f8')
const C1 = new Color('#36b9cc')
const C2 = new Color('#1d5a6b')
const C3 = new Color('#0b1a21')
const tmpC = new Color()
function depthColor(y: number, out: Color) {
  if (y > 0) return out.copy(SKY)
  const t = Math.min(1, -y / 30)
  if (t < 0.4) return out.copy(C1).lerp(C2, t / 0.4)
  return out.copy(C2).lerp(C3, (t - 0.4) / 0.6)
}

/* ------------------------------------------------------------------ */
/*  Permukaan air                                                     */
/* ------------------------------------------------------------------ */
const RIPPLES = 5
function Surface({ fog }: { fog: FogUniforms }) {
  const { camera, gl } = useThree()
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        side: DoubleSide,
        uniforms: {
          uTime: { value: 0 },
          uCam: { value: new Vector3() },
          uRipples: { value: Array.from({ length: RIPPLES }, () => new Vector3(0, 0, -99)) },
          ...fog,
        },
        vertexShader: /* glsl */ `
          varying vec3 vW;
          void main(){
            vec4 w = modelMatrix * vec4(position, 1.0);
            vW = w.xyz;
            gl_Position = projectionMatrix * viewMatrix * w;
          }`,
        fragmentShader: /* glsl */ `
          uniform float uTime;
          uniform vec3 uCam;
          uniform vec3 uRipples[${RIPPLES}];
          varying vec3 vW;
          ${fogGLSL}
          ${causticsGLSL}
          void main(){
            vec2 p = vW.xz;
            vec2 off = vec2(0.0);
            float ring = 0.0;
            for (int i = 0; i < ${RIPPLES}; i++){
              vec3 r = uRipples[i];
              float age = uTime - r.z;
              if (age > 0.0 && age < 3.5){
                vec2 d = p - r.xy;
                float dist = length(d);
                float front = age * 2.6;
                float env = exp(-abs(dist - front) * 2.2) * exp(-age * 0.9);
                float w = sin((dist - front) * 7.0) * env;
                off += (d / (dist + 0.001)) * w * 0.35;
                ring += max(w, 0.0) * 0.5;
              }
            }
            vec3 V = normalize(uCam - vW);
            float dist = length(uCam - vW);
            float c = hnc_caustics(p * 0.5 + off, uTime * 0.75);
            vec3 col;
            if (gl_FrontFacing){
              // dilihat dari atas: kolam toska + jaring cahaya + kilau matahari
              vec3 deep = vec3(0.02, 0.52, 0.62);
              vec3 shallow = vec3(0.30, 0.84, 0.88);
              float band = 0.5 + 0.5 * sin(p.x * 0.11 + 1.3) * sin(p.y * 0.09);
              col = mix(deep, shallow, 0.35 + 0.4 * band);
              col += vec3(0.80, 1.0, 1.0) * c * 0.34;
              float sp = hnc_caustics(p * 2.2 + off * 2.0, uTime * 1.6 + 4.0);
              col += pow(max(sp - 1.05, 0.0), 2.0) * 1.4;
              col += ring * vec3(0.9, 1.0, 1.0) * 0.5;
              float fres = pow(1.0 - clamp(V.y, 0.0, 1.0), 4.0);
              col = mix(col, vec3(0.86, 0.97, 0.99), fres * 0.8);
              gl_FragColor = vec4(hnc_fog(col, dist), 1.0);
            } else {
              // dilihat dari bawah: jendela Snell terang + pantulan total
              float win = smoothstep(0.45, 0.85, -V.y);
              vec3 sky = vec3(0.56, 0.86, 0.92);
              col = mix(uFogColor * 1.2, sky, win * 0.85);
              col += c * (0.12 + 0.35 * win) * vec3(0.85, 1.0, 1.0);
              col += ring * 0.3;
              gl_FragColor = vec4(hnc_fog(col, dist * 0.6), 1.0);
            }
          }`,
      }),
    [fog],
  )

  // riak saat disentuh / kursor bergerak (hanya terasa ketika di atas air)
  useEffect(() => {
    const ray = new Raycaster()
    const plane = new Plane(new Vector3(0, 1, 0), 0)
    const hit = new Vector3()
    const ndc = new Vector2()
    let idx = 0
    let last = 0
    const add = (x: number, y: number, force: boolean) => {
      const now = performance.now()
      if (!force && now - last < 220) return
      last = now
      ndc.set((x / innerWidth) * 2 - 1, -(y / innerHeight) * 2 + 1)
      ray.setFromCamera(ndc, camera)
      if (!ray.ray.intersectPlane(plane, hit)) return
      const r = mat.uniforms.uRipples.value[idx++ % RIPPLES] as Vector3
      r.set(hit.x, hit.z, mat.uniforms.uTime.value)
    }
    const down = (e: PointerEvent) => add(e.clientX, e.clientY, true)
    const move = (e: PointerEvent) => e.pointerType === 'mouse' && add(e.clientX, e.clientY, false)
    addEventListener('pointerdown', down, { passive: true })
    addEventListener('pointermove', move, { passive: true })
    return () => {
      removeEventListener('pointerdown', down)
      removeEventListener('pointermove', move)
    }
  }, [camera, gl, mat])

  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime
    mat.uniforms.uCam.value.copy(camera.position)
  })

  return (
    <mesh rotation-x={-Math.PI / 2} material={mat} frustumCulled={false}>
      <planeGeometry args={[260, 260, 1, 1]} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Dasar kolam                                                       */
/* ------------------------------------------------------------------ */
const FLOOR_Y = -38
function Floor({ fog }: { fog: FogUniforms }) {
  const { camera } = useThree()
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        uniforms: { uTime: { value: 0 }, uCam: { value: new Vector3() }, ...fog },
        vertexShader: /* glsl */ `
          varying vec3 vW;
          void main(){ vec4 w = modelMatrix * vec4(position,1.0); vW = w.xyz; gl_Position = projectionMatrix * viewMatrix * w; }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform vec3 uCam; varying vec3 vW;
          ${fogGLSL}
          ${causticsGLSL}
          void main(){
            vec2 p = vW.xz;
            float c = hnc_caustics(p * 0.35, uTime * 0.6);
            vec3 base = vec3(0.10, 0.36, 0.42);
            vec3 col = base + vec3(0.45, 0.85, 0.9) * c * 0.35;
            gl_FragColor = vec4(hnc_fog(col, length(uCam - vW)), 1.0);
          }`,
      }),
    [fog],
  )
  useFrame(({ clock }) => {
    mat.uniforms.uTime.value = clock.elapsedTime
    mat.uniforms.uCam.value.copy(camera.position)
  })
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={FLOOR_Y} material={mat}>
      <planeGeometry args={[200, 200, 1, 1]} />
    </mesh>
  )
}

/* ------------------------------------------------------------------ */
/*  Berkas cahaya matahari (god rays)                                 */
/* ------------------------------------------------------------------ */
function Rays({ count, fog }: { count: number; fog: FogUniforms }) {
  const { camera } = useThree()
  const meshes = useRef<(Mesh | null)[]>([])
  const data = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: (Math.sin(i * 12.9898) * 0.5 + 0.5) * 26 - 13,
        z: -(Math.cos(i * 78.233) * 0.5 + 0.5) * 22 - 3,
        w: 1.6 + ((i * 37) % 10) / 3,
        tilt: ((i % 5) - 2) * 0.05 + 0.12,
        phase: i * 1.7,
      })),
    [count],
  )
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: AdditiveBlending,
        side: DoubleSide,
        uniforms: { uTime: { value: 0 }, uStrength: { value: 0 }, ...fog },
        vertexShader: /* glsl */ `
          varying vec2 vUv; varying float vDist;
          void main(){
            vUv = uv;
            vec4 mv = modelViewMatrix * vec4(position, 1.0);
            vDist = -mv.z;
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          uniform float uTime; uniform float uStrength;
          varying vec2 vUv; varying float vDist;
          ${fogGLSL}
          void main(){
            float edge = smoothstep(0.0, 0.5, vUv.x) * smoothstep(1.0, 0.5, vUv.x);
            float fall = pow(vUv.y, 2.2);
            float flick = 0.65 + 0.35 * sin(uTime * 0.9 + vUv.x * 6.0 + gl_FragCoord.x * 0.002);
            float a = edge * fall * flick * uStrength * (1.0 - hnc_fogAmount(vDist) * 0.8);
            a *= smoothstep(0.5, 4.0, vDist);
            gl_FragColor = vec4(vec3(0.75, 0.97, 1.0) * a, 1.0);
          }`,
      }),
    [fog],
  )
  useFrame(({ clock }) => {
    const t = clock.elapsedTime
    mat.uniforms.uTime.value = t
    // hanya terlihat di bawah air, memudar di kedalaman
    const y = camera.position.y
    mat.uniforms.uStrength.value = y > 0 ? 0 : Math.min(1, -y / 1.5) * (0.42 - Math.min(0.3, -y / 120))
    meshes.current.forEach((m, i) => {
      if (!m) return
      const d = data[i]
      m.rotation.set(0, Math.atan2(camera.position.x - d.x, camera.position.z - d.z), d.tilt + Math.sin(t * 0.2 + d.phase) * 0.04)
    })
  })
  return (
    <>
      {data.map((d, i) => (
        <mesh key={i} ref={(m) => void (meshes.current[i] = m)} position={[d.x, -22, d.z]} scale={[d.w, 44, 1]} material={mat} frustumCulled={false}>
          <planeGeometry args={[1, 1]} />
        </mesh>
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Gelembung & partikel melayang                                     */
/* ------------------------------------------------------------------ */
function Particles({ count, kind, fog }: { count: number; kind: 'bubble' | 'snow'; fog: FogUniforms }) {
  const { gl } = useThree()
  const geo = useMemo(() => {
    const g = new BufferGeometry()
    const p = new Float32Array(count * 3)
    const s = new Float32Array(count * 4)
    for (let i = 0; i < count; i++) {
      const r1 = Math.abs(Math.sin(i * 12.9898 + (kind === 'bubble' ? 1 : 7)) * 43758.5453) % 1
      const r2 = Math.abs(Math.sin(i * 78.233 + 3.1) * 43758.5453) % 1
      const r3 = Math.abs(Math.sin(i * 39.425 + 5.7) * 43758.5453) % 1
      const r4 = Math.abs(Math.sin(i * 11.135 + 9.2) * 43758.5453) % 1
      p.set([r1 * 22 - 11, r2 * 40, r3 * 24 - 18], i * 3)
      s.set([r4, 0.4 + r1 * 0.8, r2 * 6.28, 0.5 + r3], i * 4)
    }
    g.setAttribute('position', new BufferAttribute(p, 3))
    g.setAttribute('aData', new BufferAttribute(s, 4))
    return g
  }, [count, kind])
  const mat = useMemo(
    () =>
      new ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: kind === 'bubble' ? NormalBlending : AdditiveBlending,
        uniforms: {
          uTime: { value: 0 },
          uPR: { value: Math.min(gl.getPixelRatio(), 2) },
          uSpeed: { value: kind === 'bubble' ? 1.6 : 0.12 },
          uSize: { value: kind === 'bubble' ? 46 : 14 },
          uCamY: { value: 0 },
          ...fog,
        },
        vertexShader: /* glsl */ `
          attribute vec4 aData; // seed, speed, phase, size
          uniform float uTime, uPR, uSpeed, uSize, uCamY;
          varying float vA; varying float vDist;
          void main(){
            vec3 p = position;
            float range = 40.0;
            // kolom partikel mengikuti kamera secara vertikal
            p.y = uCamY + 14.0 - range + mod(position.y + uTime * uSpeed * aData.y - uCamY, range);
            p.x += sin(uTime * 1.3 * aData.y + aData.z) * 0.25;
            p.z += cos(uTime * 1.1 * aData.y + aData.z) * 0.2;
            vec4 mv = modelViewMatrix * vec4(p, 1.0);
            vDist = -mv.z;
            gl_PointSize = clamp(uSize * aData.w * uPR / max(vDist, 0.5), 0.0, 64.0);
            vA = smoothstep(-0.3, -1.2, p.y) * smoothstep(0.2, 2.0, vDist);
            gl_Position = projectionMatrix * mv;
          }`,
        fragmentShader: /* glsl */ `
          varying float vA; varying float vDist;
          ${fogGLSL}
          void main(){
            vec2 c = gl_PointCoord - 0.5;
            float d = length(c);
            if (d > 0.5) discard;
            ${
              kind === 'bubble'
                ? `float rim = smoothstep(0.32, 0.47, d) * smoothstep(0.5, 0.46, d);
                   float hi = smoothstep(0.16, 0.0, length(c - vec2(-0.15, -0.15)));
                   float a = (rim * 0.75 + hi * 0.9 + 0.08) * vA * (1.0 - hnc_fogAmount(vDist));
                   gl_FragColor = vec4(vec3(0.85, 1.0, 1.0), a);`
                : `float a = smoothstep(0.5, 0.0, d) * 0.35 * vA * (1.0 - hnc_fogAmount(vDist));
                   gl_FragColor = vec4(vec3(0.7, 0.95, 1.0) * a, 1.0);`
            }
          }`,
      }),
    [gl, kind, fog],
  )
  const ref = useRef<Points>(null)
  useFrame(({ clock, camera }) => {
    mat.uniforms.uTime.value = clock.elapsedTime
    mat.uniforms.uCamY.value = camera.position.y
  })
  return <points ref={ref} geometry={geo} material={mat} frustumCulled={false} />
}

/* ------------------------------------------------------------------ */
/*  Otak neuron bercahaya (simbol logo)                               */
/* ------------------------------------------------------------------ */
function Brain({ count }: { count: number }) {
  const { gl } = useThree()
  const { points, segs } = useMemo(() => createBrain(count), [count])
  const common = /* glsl */ `
    attribute vec3 aScatter; attribute float aSeed;
    uniform float uTime, uAssemble;
    varying float vPulse; varying float vSeed;
    vec3 brainPos(){
      float a = clamp(uAssemble * 1.5 - aSeed * 0.5, 0.0, 1.0);
      a = a * a * (3.0 - 2.0 * a);
      vec3 drift = vec3(sin(uTime * 0.6 + aSeed * 20.0), cos(uTime * 0.5 + aSeed * 13.0), sin(uTime * 0.4 + aSeed * 7.0)) * 0.25 * (1.0 - a);
      vec3 p = mix(aScatter + drift, position, a);
      vPulse = pow(0.5 + 0.5 * sin(dot(position, vec3(2.3, 3.1, 4.2)) * 2.2 - uTime * 2.4), 10.0)
             + pow(0.5 + 0.5 * sin(dot(position, vec3(-3.7, 1.3, 2.1)) * 2.6 - uTime * 1.7 + 2.0), 14.0);
      vSeed = aSeed;
      return p;
    }`
  const colors = /* glsl */ `
    uniform vec3 uColA, uColB; uniform float uOpacity;
    varying float vPulse; varying float vSeed;`
  const mats = useMemo(() => {
    const uniforms = {
      uTime: { value: 0 },
      uAssemble: { value: 0 },
      uOpacity: { value: 1 },
      uPR: { value: Math.min(gl.getPixelRatio(), 2) },
      uColA: { value: new Color('#0f2028') },
      uColB: { value: new Color('#2ec4d6') },
    }
    const pm = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `${common}
        uniform float uPR;
        void main(){
          vec4 mv = modelViewMatrix * vec4(brainPos(), 1.0);
          gl_PointSize = clamp((3.2 + vPulse * 3.0) * uPR * 6.0 / max(-mv.z, 0.5), 1.0, 22.0);
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: `${colors}
        void main(){
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float core = smoothstep(0.5, 0.0, d);
          vec3 col = mix(uColA, uColB, 0.35 + 0.65 * vSeed) + vec3(1.0) * vPulse * 0.9;
          gl_FragColor = vec4(col, core * uOpacity * (0.7 + vPulse * 0.3));
        }`,
    })
    const lm = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms,
      vertexShader: `${common}
        void main(){ gl_Position = projectionMatrix * modelViewMatrix * vec4(brainPos(), 1.0); }`,
      fragmentShader: `${colors}
        uniform float uAssemble;
        void main(){
          vec3 col = mix(uColA, uColB, 0.6) + vec3(0.8, 1.0, 1.0) * vPulse;
          gl_FragColor = vec4(col, (0.22 + vPulse * 0.6) * uOpacity * pow(uAssemble, 3.0));
        }`,
    })
    return { pm, lm, uniforms }
  }, [gl, common, colors])

  const group = useRef<Points>(null)
  const fwd = useMemo(() => new Vector3(), [])
  const right = useMemo(() => new Vector3(), [])
  const camUp = useMemo(() => new Vector3(), [])
  useFrame(({ clock, camera, size }) => {
    const g = group.current
    if (!g) return
    const t = clock.elapsedTime
    const u = mats.uniforms
    u.uTime.value = t
    u.uAssemble.value = state.assemble
    u.uOpacity.value = state.brain
    // warna: navy di atas air (kontras dengan toska), toska terang di bawah air
    const under = camera.position.y < 0 ? 1 : 0
    u.uColA.value.set(under ? '#1d5a6b' : '#0f2028')
    u.uColB.value.set(under ? '#a9ecf3' : '#14485a')
    // posisi relatif kamera: di depan, sedikit ke kanan di layar lebar
    camera.getWorldDirection(fwd)
    right.crossVectors(fwd, camera.up).normalize()
    camUp.crossVectors(right, fwd).normalize()
    const wide = size.width / size.height > 1.1
    const dist = wide ? 5.4 : 6.2
    g.position.copy(camera.position).addScaledVector(fwd, dist).addScaledVector(right, wide ? 1.9 : 0).addScaledVector(camUp, wide ? 0 : 1.5 - (1 - state.brain) * 0.6)
    g.quaternion.copy(camera.quaternion)
    g.rotateY(t * 0.18 + state.pointer.x * 0.35)
    g.rotateX(-0.15 + state.pointer.y * 0.2)
    const s = (wide ? 1.15 : 1.0) * (0.8 + 0.2 * state.brain)
    g.scale.setScalar(s)
    g.visible = state.brain > 0.02
  })
  return (
    <points ref={group} geometry={points} material={mats.pm} frustumCulled={false}>
      <lineSegments geometry={segs} material={mats.lm} frustumCulled={false} />
    </points>
  )
}

/* ------------------------------------------------------------------ */
/*  Kamera & kabut mengikuti scroll                                    */
/* ------------------------------------------------------------------ */
type FogUniforms = { uFogColor: { value: Color }; uFogDensity: { value: number } }

function Rig({ fog, tier }: { fog: FogUniforms; tier: Tier }) {
  const { camera, gl, setDpr } = useThree()
  const keys = useRef<Key[]>([])
  useEffect(() => {
    const update = () => (keys.current = readKeys())
    update()
    const ro = new ResizeObserver(update)
    ro.observe(document.body)
    const onMove = (e: PointerEvent) => state.pointer.set((e.clientX / innerWidth) * 2 - 1, (e.clientY / innerHeight) * 2 - 1)
    addEventListener('pointermove', onMove, { passive: true })
    return () => {
      ro.disconnect()
      removeEventListener('pointermove', onMove)
    }
  }, [])

  // penyesuaian resolusi otomatis bila FPS turun
  const perf = useRef({ acc: 0, frames: 0, level: 0 })
  const levels = tier === 'high' ? [1.75, 1.35, 1, 0.8] : [1.25, 1, 0.8, 0.66]
  useEffect(() => setDpr(Math.min(devicePixelRatio, levels[0])), []) // eslint-disable-line react-hooks/exhaustive-deps

  useFrame((s, dt) => {
    sample(keys.current, scrollY)
    const k = 1 - Math.exp(-Math.min(dt, 0.05) * 3.2)
    state.depth += (target.depth - state.depth) * k
    state.pitch += (target.pitch - state.pitch) * k
    state.brain += (target.brain - state.brain) * k
    state.assemble += (target.assemble - state.assemble) * (1 - Math.exp(-Math.min(dt, 0.05) * 1.4))
    const t = s.clock.elapsedTime
    const cam = camera as PerspectiveCamera
    cam.position.set(Math.sin(t * 0.15) * 0.6 + state.pointer.x * 0.3, state.depth + Math.sin(t * 0.5) * 0.08, 8)
    cam.rotation.set(((state.pitch - state.pointer.y * 2) * Math.PI) / 180, Math.sin(t * 0.11) * 0.05 - state.pointer.x * 0.04, 0, 'YXZ')
    // kabut & warna latar
    const y = cam.position.y
    depthColor(y, tmpC)
    fog.uFogColor.value.copy(tmpC)
    fog.uFogDensity.value = y > 0 ? 0.012 : 0.045 + Math.min(1, -y / 30) * 0.035
    gl.setClearColor(tmpC)

    // monitor performa
    const p = perf.current
    p.acc += dt
    p.frames++
    if (p.acc > 2) {
      const ms = (p.acc / p.frames) * 1000
      if (ms > 24 && p.level < levels.length - 1) {
        p.level++
        setDpr(Math.min(devicePixelRatio, levels[p.level]))
      }
      p.acc = 0
      p.frames = 0
    }
  })
  return null
}

function Scene({ tier }: { tier: Tier }) {
  const fog = useMemo<FogUniforms>(() => ({ uFogColor: { value: new Color(SKY) }, uFogDensity: { value: 0.012 } }), [])
  const high = tier === 'high'
  return (
    <>
      <Rig fog={fog} tier={tier} />
      <Surface fog={fog} />
      <Floor fog={fog} />
      <Rays count={high ? 10 : 6} fog={fog} />
      <Particles kind="bubble" count={high ? 220 : 110} fog={fog} />
      <Particles kind="snow" count={high ? 500 : 220} fog={fog} />
      <Brain count={high ? 2600 : 1500} />
    </>
  )
}

export default function DiveScene({ tier, onReady }: { tier: Tier; onReady?: () => void }) {
  return (
    <Canvas
      linear
      flat
      camera={{ fov: 55, near: 0.1, far: 140, position: [0, 5.5, 8] }}
      gl={{ antialias: false, alpha: false, powerPreference: 'high-performance', stencil: false }}
      dpr={1}
      onCreated={() => requestAnimationFrame(() => onReady?.())}
      style={{ position: 'absolute', inset: 0 }}
      aria-hidden="true"
    >
      <Scene tier={tier} />
    </Canvas>
  )
}
