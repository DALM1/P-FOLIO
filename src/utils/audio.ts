import { getAssetUrl } from './assetUrl'

export type SoundId = 'select' | 'open' | 'move' | 'previous' | 'bright4' | 'computerOff'

const PATHS: Record<SoundId, string> = {
  select: getAssetUrl('/sound-ui/Menu Select.wav'),
  open: getAssetUrl('/sound-ui/Menu Open.wav'),
  move: getAssetUrl('/sound-ui/Menu Move.wav'),
  previous: getAssetUrl('/sound-ui/Menu Previous.wav'),
  bright4: getAssetUrl('/audio/Menu-bright-4.mp3'),
  computerOff: getAssetUrl('/sound-ui/Computer Off.wav'),
}

const DEFAULTS: Record<SoundId, { volume: number; lockMs: number }> = {
  select: { volume: 0.6, lockMs: 70 },
  open: { volume: 0.8, lockMs: 120 },
  move: { volume: 0.5, lockMs: 40 },
  previous: { volume: 0.75, lockMs: 140 },
  bright4: { volume: 0.82, lockMs: 180 },
  computerOff: { volume: 0.7, lockMs: 200 },
}

const cache: Partial<Record<SoundId, HTMLAudioElement>> = {}
let unlocked = false
const locks: Partial<Record<SoundId, number | null>> = {}

function ensure(sound: SoundId): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null
  let el = cache[sound]
  if (!el) {
    el = new Audio(PATHS[sound])
    el.preload = 'auto'
    el.volume = DEFAULTS[sound].volume
    cache[sound] = el
  }
  return el
}

export function unlockAudio(): void {
  if (unlocked) return
  const a = ensure('select')
  if (!a) return
  a.play()
    .catch(() => void 0)
    .finally(() => {
      try { a.currentTime = 0 } catch { /* noop */ }
    })
  unlocked = true
}

export function playSound(sound: SoundId): void {
  if (!unlocked) return
  if (locks[sound] !== undefined && locks[sound] !== null) return
  const el = ensure(sound)
  if (!el) return
  try { el.currentTime = 0 } catch { /* noop */ }
  el.play().catch(() => void 0)
  locks[sound] = window.setTimeout(() => {
    locks[sound] = null
  }, DEFAULTS[sound].lockMs)
}

export const playMenuSelect = () => playSound('select')
export const playMenuOpen = () => playSound('open')
export const playMenuMove = () => playSound('move')
export const playMenuPrevious = () => playSound('previous')
export const playMenuBright4 = () => playSound('bright4')
export const playComputerOff = () => playSound('computerOff')

if (typeof window !== 'undefined') {
  const tryUnlock = () => {
    unlockAudio()
    window.removeEventListener('pointerdown', tryUnlock)
    window.removeEventListener('keydown', tryUnlock)
    window.removeEventListener('touchstart', tryUnlock)
  }
  window.addEventListener('pointerdown', tryUnlock, { once: false })
  window.addEventListener('keydown', tryUnlock, { once: false })
  window.addEventListener('touchstart', tryUnlock, { once: false })
}
