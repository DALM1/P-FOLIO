import { useCallback, useEffect, useRef, useState } from 'react'
import KeybladeHeroBackground from './KeybladeHeroBackground'
import { playMenuBright4, unlockAudio } from '../utils/audio'
import { useTranslation } from '../i18n/I18nProvider'

interface HomePageProps {
  onStart?: () => void
}

export default function HomePage({ onStart }: HomePageProps) {
  const { t } = useTranslation()
  const [entered, setEntered] = useState(false)
  const [transitioning, setTransitioning] = useState(false)
  const firedRef = useRef(false)

  const trigger = useCallback(() => {
    if (firedRef.current) return
    firedRef.current = true
    unlockAudio()
    playMenuBright4()
    setTransitioning(true)
    const t = window.setTimeout(() => {
      setEntered(true)
      onStart?.()
    }, 520)
    return () => window.clearTimeout(t)
  }, [onStart])

  useEffect(() => {
    const handle = (e: Event) => {
      e.preventDefault()
      trigger()
    }
    const key = (e: KeyboardEvent) => {
      if (e.repeat) return
      if (e.key === 'Escape' || e.key === 'Tab' || e.key.startsWith('F')) {
        trigger()
        return
      }
      trigger()
    }
    const cleanup: Array<() => void> = []
    if (!entered && !transitioning) {
      const click = (e: MouseEvent) => handle(e)
      const touch = (e: TouchEvent) => handle(e)
      const kd = (e: KeyboardEvent) => key(e)
      window.addEventListener('mousedown', click, { once: false })
      window.addEventListener('touchstart', touch, { once: false })
      window.addEventListener('keydown', kd, { once: false })
      cleanup.push(() => window.removeEventListener('mousedown', click))
      cleanup.push(() => window.removeEventListener('touchstart', touch))
      cleanup.push(() => window.removeEventListener('keydown', kd))
    }
    return () => {
      for (const f of cleanup) f()
    }
  }, [entered, transitioning, trigger])

  return (
    <div className="relative min-h-[100dvh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <KeybladeHeroBackground className="h-full w-full" spinBoost={transitioning} />
      </div>

      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-10 flex items-end justify-center pb-[calc(env(safe-area-inset-bottom,0)+5rem)] sm:pb-[calc(env(safe-area-inset-bottom,0)+6rem)] md:pb-[calc(env(safe-area-inset-bottom,0)+7rem)] transition-all duration-500 ${
          transitioning ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'
        }`}
      >
        <p className="max-w-[92vw] px-4 text-center font-khmenu text-[10.5px] uppercase tracking-[0.34em] text-primary/85 sm:text-xs sm:tracking-[0.4em] md:text-sm">
          {t.home.cta}
        </p>
      </div>

      <div
        className={`pointer-events-none absolute inset-0 z-20 transition-opacity duration-500 ${
          transitioning ? 'opacity-100' : 'opacity-0'
        }`}
        style={{
          background:
            'radial-gradient(circle at 50% 50%, rgba(240,199,122,0.18) 0%, rgba(7,5,15,0.55) 48%, rgba(0,0,0,0.98) 92%)',
        }}
      />
    </div>
  )
}
