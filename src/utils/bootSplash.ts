export type BootRevealReason = 'hero-ready' | 'fallback-timeout'

export function revealAppAfterBoot(reason: BootRevealReason = 'hero-ready') {
  if (typeof window === 'undefined') return
  const root = document.getElementById('root')
  if (root && !root.dataset.khUnmasked) {
    root.style.visibility = 'visible'
    root.style.opacity = '1'
    root.dataset.khUnmasked = '1'
  }
  try {
    document.body.classList.remove('kh-app-masked')
  } catch {
    /* noop */
  }
  const splash = document.getElementById('kh-initial-splash')
  if (splash && !splash.dataset.khFading) {
    splash.dataset.khFading = '1'
    splash.style.opacity = '0'
    const remove = () => {
      try {
        splash.parentNode?.removeChild(splash)
      } catch {
        /* noop */
      }
    }
    setTimeout(remove, 420)
  }
  void reason
}
