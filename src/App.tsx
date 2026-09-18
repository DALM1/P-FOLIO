import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import HomePage from './components/HomePage'
import KHMenu from './components/KHMenu'
import KeybladeCanvas from './components/KeybladeCanvas'
import PageStarsLayer from './components/PageStarsLayer'
import ProjectsPage from './components/ProjectsPage'
import SkillsPage from './components/SkillsPage'
import SectionView from './components/SectionView'
import { MENU_ITEMS, type SectionId } from './types'
import { useTranslation } from './i18n/I18nProvider'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js'
import { getAssetUrl } from './utils/assetUrl'

type AppView = 'landing' | 'menu' | 'section'

type PageSectionId = Exclude<SectionId, 'home'>

function getSectionFromHash(): PageSectionId | null {
  const hash = window.location.hash.replace(/^#\//, '')
  const item = MENU_ITEMS.find((m) => m.id === hash && m.id !== 'home')
  return (item?.id as PageSectionId) ?? null
}

export default function App() {
  const { t } = useTranslation()
  const modelUrl = useMemo(() => getAssetUrl('/assets-kh/3d/Keyblade_KH_Final.obj'), [])
  try {
    useLoader.preload(OBJLoader, modelUrl)
  } catch {
    // ignore if preload context unavailable (SSR / init)
  }

  const initialHash = (() => {
    if (typeof window === 'undefined') return null
    return getSectionFromHash()
  })()
  const initialView: AppView = (() => {
    if (typeof window === 'undefined') return 'landing'
    return initialHash ? 'menu' : 'landing'
  })()

  const [view, setView] = useState<AppView>(initialView)
  const [activeSection, setActiveSection] = useState<PageSectionId | null>(initialHash)
  const [hoveredMenu, setHoveredMenu] = useState<SectionId | null>(null)
  const pendingNavRef = useRef<PageSectionId | null>(null)

  useEffect(() => {
    const onHashChange = () => {
      const sec = getSectionFromHash()
      const pending = pendingNavRef.current
      if (pending) {
        if (sec === pending) {
          pendingNavRef.current = null
          setActiveSection(pending)
          setView('section')
          return
        }
      }
      if (sec) {
        setActiveSection(sec)
        setView('menu')
        return
      }
      pendingNavRef.current = null
      setActiveSection(null)
      setView('landing')
    }
    const onPopState = () => {
      if (pendingNavRef.current) return
      if (!window.location.hash) {
        setActiveSection(null)
        setView('menu')
        return
      }
      onHashChange()
    }
    window.addEventListener('hashchange', onHashChange)
    window.addEventListener('popstate', onPopState)
    return () => {
      window.removeEventListener('hashchange', onHashChange)
      window.removeEventListener('popstate', onPopState)
    }
  }, [])

  const handleEnterFromLanding = useCallback(() => {
    setView('menu')
  }, [])

  const handleSelect = useCallback((id: SectionId) => {
    if (id === 'home') {
      pendingNavRef.current = null
      if (window.location.hash) {
        window.location.hash = ''
      }
      window.history.replaceState('', document.title, window.location.pathname + window.location.search)
      setActiveSection(null)
      setView('menu')
      return
    }
    pendingNavRef.current = id
    window.location.hash = `#/${id}`
  }, [])

  const handleBackToMenu = useCallback(() => {
    setView('menu')
  }, [])

  if (view === 'landing') {
    return <HomePage onStart={handleEnterFromLanding} />
  }

  return (
    <>
      <PageStarsLayer
        className="pointer-events-none fixed inset-0 -z-10 select-none overflow-hidden"
        aria-hidden="true"
      />
      {view === 'section' ? (
        activeSection === 'projects' ? (
          <ProjectsPage onBack={handleBackToMenu} />
        ) : activeSection === 'skills' ? (
          <SkillsPage onBack={handleBackToMenu} />
        ) : activeSection === 'about' ? (
          <AboutPage onBack={handleBackToMenu} />
        ) : activeSection === 'contact' ? (
          <ContactPage onBack={handleBackToMenu} />
        ) : (
          <div className="relative flex min-h-full w-full items-start justify-center py-12 md:py-16">
            <SectionView section={activeSection!} onBack={handleBackToMenu} />
          </div>
        )
      ) : (
        <div className="relative flex min-h-[100dvh] w-full items-start justify-center px-4 py-6 sm:px-6 sm:py-10 md:py-16 lg:items-center">
          <div className="relative z-10 flex w-full max-w-6xl flex-col items-center gap-6 lg:flex-row lg:items-start lg:justify-between lg:gap-12 sm:gap-8">
            <div className="flex w-full max-w-[560px] flex-col items-center gap-4 lg:items-start lg:max-w-[460px] xl:max-w-[520px]">
              <div className="flex flex-col items-center gap-2 text-center lg:items-start lg:text-left">
                <h1 className="kh-title kh-hero-title">
                  DALM1
                </h1>
                <p className="font-khmenu text-[10px] uppercase tracking-[0.3em] text-primary/85 sm:text-[11px] sm:tracking-[0.36em] md:text-xs md:tracking-[0.4em]">
                  {t.common.connectingHearts}
                </p>
              </div>
              <KeybladeCanvas
                className="h-[210px] w-[180px] max-w-[70vw] sm:h-[260px] sm:w-[220px] md:h-[320px] md:w-[260px] lg:h-[360px] lg:w-[300px] lg:max-w-none lg:-mt-2"
                speedMul={hoveredMenu ? 2.1 : 1}
              />
            </div>

            <div className="flex w-full justify-center lg:justify-end">
              <div className="w-full max-w-[560px] lg:w-auto">
                <KHMenu
                  activeId={activeSection ?? undefined}
                  onSelect={handleSelect}
                  onHover={setHoveredMenu}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
