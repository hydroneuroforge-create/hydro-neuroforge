import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float, Environment } from '@react-three/drei'
import * as THREE from 'three'

/* -------------------------------------------------------------
   Permukaan air beriak lembut (vertex animation via shader).
------------------------------------------------------------- */
function WaterSurface() {
  const matRef = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uColorDeep: { value: new THREE.Color('#0284c7') },
      uColorShallow: { value: new THREE.Color('#7dd3fc') },
    }),
    [],
  )

  useFrame((_, delta) => {
    if (matRef.current) matRef.current.uniforms.uTime.value += delta
  })

  const vertexShader = /* glsl */ `
    uniform float uTime;
    varying float vElevation;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      vec3 pos = position;
      float e =
        sin(pos.x * 1.5 + uTime * 0.9) * 0.18 +
        sin(pos.y * 2.0 + uTime * 1.3) * 0.12 +
        sin((pos.x + pos.y) * 1.0 + uTime * 0.6) * 0.10;
      pos.z += e;
      vElevation = e;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    }
  `

  const fragmentShader = /* glsl */ `
    uniform vec3 uColorDeep;
    uniform vec3 uColorShallow;
    varying float vElevation;
    varying vec2 vUv;
    void main() {
      float mixStrength = (vElevation + 0.4) * 1.2;
      vec3 color = mix(uColorDeep, uColorShallow, clamp(mixStrength, 0.0, 1.0));
      // kilau lembut
      float sparkle = smoothstep(0.28, 0.42, vElevation);
      color += sparkle * 0.4;
      gl_FragColor = vec4(color, 0.92);
    }
  `

  return (
    <mesh rotation={[-Math.PI / 2.2, 0, 0]} position={[0, -1.4, 0]}>
      <planeGeometry args={[22, 22, 90, 90]} />
      <shaderMaterial
        ref={matRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
      />
    </mesh>
  )
}

/* -------------------------------------------------------------
   Kolam terapi 3D (dinding kolam + air di dalam).
------------------------------------------------------------- */
function TherapyPool() {
  const groupRef = useRef<THREE.Group>(null)
  const innerWater = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y =
        Math.sin(state.clock.elapsedTime * 0.25) * 0.35
    }
    if (innerWater.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.01
      innerWater.current.scale.set(s, 1, s)
    }
  })

  return (
    <Float speed={1.4} rotationIntensity={0.15} floatIntensity={0.5}>
      <group ref={groupRef} position={[0, 0.2, 0]} scale={1}>
        {/* Dinding luar kolam */}
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[2.1, 2.1, 1.1, 48]} />
          <meshStandardMaterial
            color="#ffffff"
            roughness={0.35}
            metalness={0.05}
          />
        </mesh>
        {/* Bibir kolam */}
        <mesh position={[0, 0.56, 0]}>
          <torusGeometry args={[2.1, 0.09, 16, 48]} />
          <meshStandardMaterial color="#38bdf8" roughness={0.3} />
        </mesh>
        {/* Air di dalam kolam */}
        <mesh ref={innerWater} position={[0, 0.42, 0]}>
          <cylinderGeometry args={[1.95, 1.95, 0.12, 48]} />
          <meshStandardMaterial
            color="#7dd3fc"
            roughness={0.1}
            metalness={0.2}
            transparent
            opacity={0.9}
          />
        </mesh>
      </group>
    </Float>
  )
}

/* -------------------------------------------------------------
   Gelembung / partikel mengambang menenangkan.
------------------------------------------------------------- */
type BubbleDatum = {
  pos: [number, number, number]
  scale: number
  speed: number
  offset: number
}

function createBubbles(count: number): BubbleDatum[] {
  return Array.from({ length: count }, () => ({
    pos: [
      (Math.random() - 0.5) * 14,
      (Math.random() - 0.5) * 8,
      (Math.random() - 0.5) * 6 - 1,
    ] as [number, number, number],
    scale: Math.random() * 0.22 + 0.06,
    speed: Math.random() * 0.4 + 0.15,
    offset: Math.random() * Math.PI * 2,
  }))
}

function Bubbles({ count = 28 }: { count?: number }) {
  // Dibuat sekali di luar jalur render (initializer useRef).
  const dataRef = useRef<BubbleDatum[]>(null)
  if (dataRef.current === null) dataRef.current = createBubbles(count)
  const data = dataRef.current

  const refs = useRef<(THREE.Mesh | null)[]>([])

  useFrame((state) => {
    const t = state.clock.elapsedTime
    data.forEach((d, i) => {
      const m = refs.current[i]
      if (!m) return
      m.position.y = d.pos[1] + Math.sin(t * d.speed + d.offset) * 1.4
      m.position.x = d.pos[0] + Math.cos(t * d.speed * 0.6 + d.offset) * 0.5
    })
  })

  return (
    <>
      {data.map((d, i) => (
        <mesh
          key={i}
          ref={(el) => {
            refs.current[i] = el
          }}
          position={d.pos}
          scale={d.scale}
        >
          <sphereGeometry args={[1, 16, 16]} />
          <meshStandardMaterial
            color="#e0f2fe"
            roughness={0}
            metalness={0.1}
            transparent
            opacity={0.5}
          />
        </mesh>
      ))}
    </>
  )
}

export default function WaterScene() {
  return (
    <Canvas
      dpr={[1, 1.8]}
      camera={{ position: [0, 1.6, 7], fov: 45 }}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.9} />
      <directionalLight position={[5, 8, 5]} intensity={1.1} castShadow />
      <pointLight position={[-5, 2, 3]} intensity={0.6} color="#bae6fd" />

      <TherapyPool />
      <WaterSurface />
      <Bubbles />

      <Environment preset="sunset" />
    </Canvas>
  )
}
