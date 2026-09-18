import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Environment, Float, MeshReflectorMaterial, Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import type { Group, Mesh } from 'three'
import { getAssetUrl } from '../utils/assetUrl'
import { revealAppAfterBoot } from '../utils/bootSplash'

const MODEL_PATH = getAssetUrl('/assets-kh/3d/Keyblade_KH_Final.obj')
const ACCENT = '#f0c77a'
const ACCENT_HOT = '#ffd98a'

function useResponsiveScene() {
  const compute = () => {
    if (typeof window === 'undefined') {
      return {
        sizeMul: 1, camZ: 6.2, camFov: 42, ringMul: 1, starsR: 90, spark: 10 }
    }
    const w = window.innerWidth
    if (w < 430) {
      return {
        sizeMul: 0.7, camZ: 7.4, camFov: 45, ringMul: 0.82, starsR: 165, spark: 21 }
    }
    if (w < 640) {
      return {
        sizeMul: 0.84, camZ: 6.9, camFov: 43, ringMul: 0.92, starsR: 140, spark: 16 }
    }
    if (w < 1024) {
      return {
        sizeMul: 0.94, camZ: 6.4, camFov: 42, ringMul: 0.98, starsR: 110, spark: 12 }
    }
    return { sizeMul: 1, camZ: 6.2, camFov: 42, ringMul: 1, starsR: 90, spark: 10 }
  }
  const fallback = { sizeMul: 1, camZ: 6.2, camFov: 42, ringMul: 1, starsR: 90, spark: 10 }
  const [v, setV] = useState(() =>
    typeof window !== 'undefined' ? compute() : fallback,
  )
  const prevRef = useRef<Record<string, number> | null>(null)
  useEffect(() => {
    if (typeof window === 'undefined') return
    let raf = 0
    const same = (a: Record<string, number>, b: Record<string, number>) =>
      Object.keys(a).every((k) => Math.abs((a as any)[k] - (b as any)[k]) < 1e-9)
    const onEvt = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const next = compute() as any
        const cur = (prevRef.current ?? v) as any
        if (prevRef.current && same(cur, next)) return
        prevRef.current = next
        setV(next)
      })
    }
    window.addEventListener('resize', onEvt, { passive: true })
    window.addEventListener('orientationchange', onEvt)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onEvt)
      window.removeEventListener('orientationchange', onEvt)
    }
  }, [v])
  return v
}

function HeroKeyblade({ spinBoost = false, sizeMul = 1 }: { spinBoost?: boolean; sizeMul?: number }) {
  const outer = useRef<Group>(null)
  const inner = useRef<Group>(null)
  const raw = useLoader(OBJLoader, MODEL_PATH)
  const boostRef = useRef<number | null>(null)
  const tRef = useRef(0)

  const normalized = useMemo(() => {
    const clone = raw.clone()
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const SIZE = 4.6 * sizeMul
    clone.position.sub(center)
    clone.scale.setScalar(SIZE / maxDim)
    clone.rotation.set(0, 0, -Math.PI / 2.15)

    clone.traverse((child) => {
      const mesh = child as Mesh
      if ((mesh as any).isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.material = new THREE.MeshPhysicalMaterial({
          color: new THREE.Color(ACCENT).lerp(new THREE.Color('#fff6d0'), 0.38),
          metalness: 0.94,
          roughness: 0.16,
          clearcoat: 0.8,
          clearcoatRoughness: 0.22,
          emissive: new THREE.Color(ACCENT).multiplyScalar(0.14),
          emissiveIntensity: 1.1,
          envMapIntensity: 1.3,
          reflectivity: 0.65,
          sheen: 0.2,
          sheenRoughness: 0.4,
        })
      }
    })
    return clone
  }, [raw, sizeMul])

  useFrame((_, delta) => {
    tRef.current += delta
    const t = tRef.current
    const target = spinBoost ? 11 : 1
    if (boostRef.current === null && spinBoost) {
      boostRef.current = 1
    }
    if (boostRef.current !== null) {
      boostRef.current += (target - boostRef.current) * Math.min(1, delta * 6.5)
    }
    if (outer.current) {
      outer.current.rotation.y = Math.sin(t * 0.32) * 0.6 - 0.15
      outer.current.rotation.x = Math.sin(t * 0.22) * 0.18 - 0.15
      outer.current.position.y = Math.sin(t * 0.9) * 0.25
    }
    if (inner.current) {
      const boost = spinBoost || boostRef.current !== null
      const mul = boost ? (boostRef.current ?? 1) : 0.9
      inner.current.rotation.z += delta * 0.35 + delta * (boost ? mul * 0.2 : 0)
      inner.current.rotation.x += delta * 0.18 + delta * (boost ? mul * 0.8 : 0)
      inner.current.rotation.y += delta * 0.22 + delta * (boost ? mul * 0.10 : 0)
      inner.current.position.x = Math.sin(t * 0.2) * 0.15
      inner.current.position.y = Math.cos(t * 0.2) * 0.22
    }
  })

  return (
    <group ref={outer} position={[0, 0.25, 0]} rotation={[-0.15, -0.15, 0]}>
      <group
        ref={inner}
        position={[0.2, -0.15, 0]}
      >
        <primitive object={normalized} />
      </group>
      <pointLight
        position={[1.4, 0.8, 2.2]}
        intensity={2.4}
        color={ACCENT_HOT}
        distance={9}
        decay={1.6}
      />
      <pointLight
        position={[-2.8, -1.4, -1.6]}
        intensity={1.1}
        color="#78b4ff"
        distance={10}
        decay={2}
      />
    </group>
  )
}

function HaloRing({ ringMul = 1 }: { ringMul?: number }) {
  const ringRef = useRef<Mesh>(null)
  const ring2Ref = useRef<Mesh>(null)
  const tRef = useRef(0)
  useFrame((_, delta) => {
    tRef.current += delta
    const t = tRef.current
    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.18
      ringRef.current.rotation.x = Math.PI / 2.3 + Math.sin(t * 0.2) * 0.12
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.z = -t * 0.26
      ring2Ref.current.rotation.x = -Math.PI / 2.1 + Math.cos(t * 0.25) * 0.1
    }
  })
  return (
    <group>
      <mesh ref={ringRef} position={[0.3, -0.1, -1.4]}>
        <torusGeometry args={[3.2 * ringMul, 0.012, 12, Math.round(180 * ringMul)]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.85} />
      </mesh>
      <mesh ref={ring2Ref} position={[0.3, -0.1, -1.4]}>
        <torusGeometry args={[3.8 * ringMul, 0.007, 12, Math.round(200 * ringMul)]} />
        <meshBasicMaterial color="#ffffff" transparent opacity={0.45} />
      </mesh>
    </group>
  )
}

function GroundReflector() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-0.2, -3.3, 0.2]}>
      <circleGeometry args={[9, 96]} />
      <MeshReflectorMaterial
        blur={[220, 80]}
        resolution={512}
        mixBlur={1}
        mixStrength={3.8}
        mixContrast={1.1}
        depthScale={1.4}
        minDepthThreshold={0.4}
        maxDepthThreshold={1.4}
        color="#0b0818"
        metalness={0.45}
        mirror={0.7}
      />
    </mesh>
  )
}

interface KeybladeHeroBackgroundProps {
  className?: string
  intensity?: number
  spinBoost?: boolean
}

export default function KeybladeHeroBackground({
  className,
  intensity = 1,
  spinBoost = false,
}: KeybladeHeroBackgroundProps) {
  const { sizeMul, camZ, camFov, ringMul, starsR, spark } = useResponsiveScene()
  const [loaded, setLoaded] = useState(false)
  const loadedOnceRef = useRef(false)
  const setLoadedOnce = useCallback(() => {
    if (loadedOnceRef.current) return
    loadedOnceRef.current = true
    setLoaded(true)
    revealAppAfterBoot('hero-ready')
  }, [])
  return (
    <div
      className={
        (className ?? '') +
        (loaded ? ' opacity-100 transition-opacity duration-200 ease-out' : ' opacity-0')
      }
      aria-hidden={false}
    >
      <Canvas
        camera={{ position: [0.1, -0.2, camZ], fov: camFov, near: 0.1, far: 2000 }}
        gl={{
          antialias: true,
          alpha: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.08 * intensity,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl, scene, camera }) => {
          scene.updateMatrixWorld(true)
          camera.updateProjectionMatrix()
          gl.info.reset()
        }}
      >
        <fog attach="fog" args={['#0a0718', 9, 26]} />
        <color attach="background" args={['#07050f']} />
        <ambientLight intensity={0.35} color="#fff1cc" />
        <directionalLight
          position={[5, 6.5, 4.5]}
          intensity={1.6}
          color={ACCENT_HOT}
          castShadow
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-left={-8}
          shadow-camera-right={8}
          shadow-camera-top={8}
          shadow-camera-bottom={-8}
          shadow-camera-near={0.5}
          shadow-camera-far={40}
        />
        <hemisphereLight args={[ACCENT_HOT, '#1b1030', 0.4]} />
        <spotLight
          position={[-5.5, -2, -3]}
          angle={0.45}
          penumbra={1}
          intensity={2.1}
          color="#8fb8ff"
          distance={20}
        />

        <Stars
          radius={starsR}
          depth={60}
          count={4200}
          factor={3.8}
          fade
          speed={0.35}
          saturation={0.4}
        />
        <Sparkles
          count={80}
          scale={spark}
          size={2.4}
          speed={0.35}
          color={ACCENT_HOT}
          opacity={0.75}
        />

        <Suspense fallback={<FallbackHero sizeMul={sizeMul} />}>
          <Environment preset="sunset" />
          <group onUpdate={setLoadedOnce}>
            <Float
              speed={1.2}
              rotationIntensity={0.4}
              floatIntensity={0.7}
              floatingRange={[-0.15, 0.25]}
            >
              <HeroKeyblade spinBoost={spinBoost} sizeMul={sizeMul} />
            </Float>
            <HaloRing ringMul={ringMul} />
            <GroundReflector />
          </group>
        </Suspense>
      </Canvas>
    </div>
  )
}

function FallbackHero({ sizeMul = 1 }: { sizeMul?: number }) {
  const SIZE = 4.6 * sizeMul
  const matLame = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: new THREE.Color(ACCENT).lerp(new THREE.Color('#fff6d0'), 0.38),
        metalness: 0.94,
        roughness: 0.16,
        clearcoat: 0.8,
        clearcoatRoughness: 0.22,
        emissive: new THREE.Color(ACCENT).multiplyScalar(0.14),
        emissiveIntensity: 1.1,
      }),
    [],
  )
  const matGrip = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#2a1a06',
        metalness: 0.35,
        roughness: 0.72,
        emissive: new THREE.Color('#120a00'),
        emissiveIntensity: 0.4,
      }),
    [],
  )
  const matTip = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#fff4cf',
        metalness: 0.98,
        roughness: 0.08,
        emissive: new THREE.Color(ACCENT_HOT),
        emissiveIntensity: 1.35,
        clearcoat: 1,
      }),
    [],
  )
  const L = SIZE * 0.9
  const W = SIZE * 0.12
  const T = SIZE * 0.08
  return (
    <group position={[0, 0.25, 0]} rotation={[-0.15, -0.15, 0]}>
      <group position={[0.2, -0.15, 0]}>
        <group rotation={[0, 0, -Math.PI / 2.15]}>
          <mesh position={[0, L * 0.32, 0]} material={matLame}>
            <boxGeometry args={[W, L * 0.78, T]} />
          </mesh>
          <mesh position={[0, L * 0.3, 0]} material={matTip}>
            <boxGeometry args={[W * 0.62, L * 0.72, T * 0.55]} />
          </mesh>
          <mesh position={[0, -L * 0.15, 0]} material={matTip}>
            <boxGeometry args={[W * 2.35, W * 0.6, T * 0.8]} />
          </mesh>
          <mesh position={[0, -L * 0.32, 0]} material={matGrip}>
            <cylinderGeometry args={[W * 0.48, W * 0.44, L * 0.22, 18]} />
          </mesh>
          <mesh position={[0, -L * 0.445, 0]} material={matTip}>
            <cylinderGeometry args={[W * 0.62, W * 0.58, L * 0.035, 20]} />
          </mesh>
          <mesh position={[0, -L * 0.5, 0]} rotation={[0, 0, -Math.PI / 8]} material={matTip}>
            <sphereGeometry args={[W * 0.52, 22, 16]} />
          </mesh>
        </group>
      </group>
      <pointLight position={[1.4, 0.8, 2.2]} intensity={1.8} color={ACCENT_HOT} distance={9} decay={1.6} />
    </group>
  )
}
