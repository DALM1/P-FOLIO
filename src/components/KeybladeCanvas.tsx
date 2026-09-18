import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import type { Group } from 'three'
import { getAssetUrl } from '../utils/assetUrl'

const MODEL_PATH = getAssetUrl('/assets-kh/3d/Keyblade_KH_Final.obj')
const ACCENT = '#f0c77a'
const ACCENT_HOT = '#ffd98a'

function useResponsiveStars() {
  const compute = () => {
    if (typeof window === 'undefined') return { starsR: 85, spark: 9 }
    const w = window.innerWidth
    if (w < 430) return { starsR: 195, spark: 20 }
    if (w < 640) return { starsR: 170, spark: 15 }
    if (w < 1024) return { starsR: 120, spark: 11 }
    return { starsR: 85, spark: 9 }
  }
  const fallback = { starsR: 85, spark: 9 }
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

export interface KeybladeCameraPose {
  position?: [number, number, number]
  fov?: number
  travel?: boolean
}

interface KeybladeModelProps {
  modelPath: string
  accent: string
  travel?: boolean
  speedMul?: number
}

function KeybladeModel({ modelPath, accent, travel = false, speedMul = 1 }: KeybladeModelProps) {
  const groupRef = useRef<Group>(null)
  const raw = useLoader(OBJLoader, modelPath)
  const spinRef = useRef(1)
  const tRef = useRef(0)

  const normalized = useMemo(() => {
    const clone = raw.clone()
    const box = new THREE.Box3().setFromObject(clone)
    const size = new THREE.Vector3()
    const center = new THREE.Vector3()
    box.getSize(size)
    box.getCenter(center)
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const SIZE = 2.2
    clone.position.sub(center)
    clone.scale.setScalar(SIZE / maxDim)
    clone.rotation.set(0, 0, -Math.PI / 2)

    clone.traverse((child) => {
      const mesh = child as THREE.Mesh
      if ((mesh as any).isMesh) {
        mesh.castShadow = true
        mesh.receiveShadow = true
        mesh.material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(accent).lerp(new THREE.Color('#ffffff'), 0.35),
          metalness: 0.88,
          roughness: 0.22,
          emissive: new THREE.Color(accent).multiplyScalar(0.08),
          envMapIntensity: 1.1,
        })
      }
    })
    return clone
  }, [raw, accent])

  useFrame((_, delta) => {
    if (!groupRef.current) return
    tRef.current += delta
    const t = tRef.current
    spinRef.current += (speedMul - spinRef.current) * Math.min(1, delta * 10)
    const s = spinRef.current
    if (travel) {
      groupRef.current.position.x = Math.sin(t * 0.9) * 0.6
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.2 + 0.2
      groupRef.current.rotation.y += delta * s * 0.9
      groupRef.current.rotation.x = Math.sin(t * 0.8) * 0.18
      groupRef.current.rotation.z = -Math.PI / 2 + Math.sin(t * 1.1) * 0.08
    } else {
      groupRef.current.rotation.y += delta * 0.2 + delta * (s - 1) * 0.15
      groupRef.current.rotation.x += delta * 0.07 + delta * (s - 1) * 0.55
      groupRef.current.rotation.z = -Math.PI / 2 + Math.sin(t * 0.7) * 0.04
      groupRef.current.position.y = Math.sin(t * 1.4) * 0.12
    }
  })

  return (
    <group ref={groupRef} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
      <primitive object={normalized} />
    </group>
  )
}

interface KeybladeCanvasProps {
  className?: string
  pose?: KeybladeCameraPose
  speedMul?: number
}

export default function KeybladeCanvas({ className, pose, speedMul }: KeybladeCanvasProps) {
  const cam: { position: [number, number, number]; fov: number } = {
    position: pose?.position ?? [0, 0, 5.5],
    fov: pose?.fov ?? 40,
  }
  const travel = Boolean(pose?.travel)
  const { starsR, spark } = useResponsiveStars()

  return (
    <div className={className}>
      <Canvas
        camera={{ position: cam.position, fov: cam.fov, near: 0.1, far: 1200 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
        onCreated={({ gl, scene, camera }) => {
          scene.updateMatrixWorld(true)
          camera.updateProjectionMatrix()
          gl.info.reset()
        }}
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 6]}
          intensity={1.3}
          color={ACCENT}
          castShadow
        />
        <pointLight position={[-4, -3, 4]} intensity={0.7} color="#ffffff" />
        <Stars radius={starsR} depth={20} count={1200} factor={2.5} fade speed={0.2} />
        <Sparkles
          count={60}
          scale={spark}
          size={2.2}
          speed={0.3}
          color={ACCENT_HOT}
          opacity={0.7}
        />
        <Suspense fallback={<FallbackCube />}>
          <KeybladeModel modelPath={MODEL_PATH} accent={ACCENT} travel={travel} speedMul={speedMul} />
        </Suspense>
      </Canvas>
    </div>
  )
}

function FallbackCube() {
  return (
    <mesh position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 2]} scale={[0.9, 0.9, 0.9]}>
      <boxGeometry args={[1.9, 0.24, 0.3]} />
      <meshStandardMaterial
        color={ACCENT}
        emissive={ACCENT}
        emissiveIntensity={0.18}
        metalness={0.88}
        roughness={0.25}
      />
    </mesh>
  )
}
