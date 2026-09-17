import { useEffect, useRef } from 'react'
import { playMenuPrevious } from '../utils/audio'

interface Options {
  enabled?: boolean
  throttleMs?: number
}

export function useBackOnLeftArrow(onBack: (() => void) | undefined, opts: Options = {}) {
  const { enabled = true, throttleMs = 150 } = opts
  const lastTsRef = useRef<number>(0)

  useEffect(() => {
    if (!enabled || typeof window === 'undefined') return

    const handler = (e: KeyboardEvent) => {
      if (e.repeat) return
      const isTrigger =
        e.key === 'ArrowLeft' ||
        e.key === 'Escape' ||
        e.key === 'Backspace' ||
        e.code === 'BrowserBack'
      if (!isTrigger) return
      const now = performance.now()
      if (now - lastTsRef.current < throttleMs) return
      lastTsRef.current = now
      if (isTrigger && onBack) {
        e.preventDefault()
        playMenuPrevious()
        onBack()
      }
    }

    window.addEventListener('keydown', handler, { passive: false })
    return () => window.removeEventListener('keydown', handler)
  }, [enabled, onBack, throttleMs])
}
