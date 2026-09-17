import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import { Stars } from '@react-three/drei'
import * as THREE from 'three'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import type { Group } from 'three'

const MODEL_PATH = '/assets-kh/3d/Keyblade_KH_Final.obj'
const ACCENT = '#f0c77a'

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

  useFrame((state, delta) => {
    if (!groupRef.current) return
    const t = state.clock.elapsedTime
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
    <group ref={groupRef}>
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
  const camera: { position: [number, number, number]; fov: number } = {
    position: pose?.position ?? [0, 0, 5.5],
    fov: pose?.fov ?? 40,
  }
  const travel = Boolean(pose?.travel)

  return (
    <div className={className}>
      <Canvas
        camera={{ position: camera.position, fov: camera.fov }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
        shadows
      >
        <ambientLight intensity={0.45} />
        <directionalLight
          position={[4, 6, 6]}
          intensity={1.3}
          color={ACCENT}
          castShadow
        />
        <pointLight position={[-4, -3, 4]} intensity={0.7} color="#ffffff" />
        <Stars radius={50} depth={20} count={1200} factor={2.5} fade speed={0.2} />
        <Suspense fallback={null}>
          <KeybladeModel modelPath={MODEL_PATH} accent={ACCENT} travel={travel} speedMul={speedMul} />
        </Suspense>
      </Canvas>
    </div>
  )
}
