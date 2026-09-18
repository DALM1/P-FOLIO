import { Suspense, useEffect, useMemo, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Sparkles, Stars } from '@react-three/drei'

const ACCENT_HOT = '#ffd98a'

function useResponsiveStars() {
  const compute = () => {
    if (typeof window === 'undefined') {
      return { starsR: 120, spark: 9, depth: 60, count: 4200, factor: 3.8 }
    }
    const w = window.innerWidth
    if (w < 430) return { starsR: 195, spark: 20, depth: 80, count: 4200, factor: 3.8 }
    if (w < 640) return { starsR: 170, spark: 15, depth: 70, count: 4200, factor: 3.8 }
    if (w < 1024) return { starsR: 120, spark: 11, depth: 65, count: 4200, factor: 3.8 }
    return { starsR: 85, spark: 9, depth: 60, count: 4200, factor: 3.8 }
  }
  const fallback = { starsR: 85, spark: 9, depth: 60, count: 4200, factor: 3.8 }
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

function StarsContent() {
  const { starsR, spark, depth, count, factor } = useResponsiveStars()
  return (
    <>
      <ambientLight intensity={0.35} color="#fff1cc" />
      <hemisphereLight args={[ACCENT_HOT, '#1b1030', 0.4]} />
      <Stars
        radius={starsR}
        depth={depth}
        count={count}
        factor={factor}
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
    </>
  )
}

export default function PageStarsLayer({ className }: { className?: string }) {
  const wrapRef = useRef<HTMLDivElement | null>(null)
  const cameraSetup = useMemo(
    () => ({ position: [0.1, -0.1, 5.5] as [number, number, number], fov: 52, near: 0.1, far: 4000 }),
    [],
  )
  return (
    <div
      ref={wrapRef}
      className={
        className ??
        'pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden'
      }
      aria-hidden="true"
    >
      <Canvas
        camera={cameraSetup}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        dpr={[1, 2]}
        onCreated={({ gl, scene, camera }) => {
          scene.updateMatrixWorld(true)
          camera.updateProjectionMatrix()
          gl.info.reset()
        }}
      >
        <Suspense fallback={null}>
          <StarsContent />
        </Suspense>
      </Canvas>
    </div>
  )
}
