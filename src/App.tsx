import { useCallback, useEffect, useRef, useState } from 'react'
import AboutPage from './components/AboutPage'
import ContactPage from './components/ContactPage'
import HomePage from './components/HomePage'
import KHMenu from './components/KHMenu'
import KeybladeCanvas from './components/KeybladeCanvas'
import ProjectsPage from './components/ProjectsPage'
import SkillsPage from './components/SkillsPage'
import SectionView from './components/SectionView'
import { MENU_ITEMS, type SectionId } from './types'
import { useTranslation } from './i18n/I18nProvider'

type AppView = 'landing' | 'menu' | 'section'

function getSectionFromHash(): SectionId | null {
  const hash = window.location.hash.replace(/^#\//, '')
  const item = MENU_ITEMS.find((m) => m.id === hash)
  return item?.id ?? null
}

export default function App() {
  const { t } = useTranslation()
  const initialHash = (() => {
    if (typeof window === 'undefined') return null
    return getSectionFromHash()
  })()
  const initialView: AppView = (() => {
    if (typeof window === 'undefined') return 'landing'
    if (window.location.pathname === '/' && !window.location.hash) return 'section'
    return initialHash ? 'menu' : 'landing'
  })()

  const [view, setView] = useState<AppView>(initialView)
  const [activeSection, setActiveSection] = useState<SectionId | null>(
    initialView === 'section' ? 'home' : initialHash
  )
  const [hoveredMenu, setHoveredMenu] = useState<SectionId | null>(null)
  const pendingNavRef = useRef<SectionId | null>(null)

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
      if (window.location.pathname === '/' && !window.location.hash) {
        if (pending === 'home') {
          pendingNavRef.current = null
        }
        setActiveSection('home')
        setView('section')
        return
      }
      setActiveSection(null)
      setView('landing')
    }
    const onPopState = () => {
      if (pendingNavRef.current) return
      if (window.location.pathname === '/' && !window.location.hash) {
        setActiveSection('home')
        setView('section')
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

  const handlePressStart = useCallback(() => {
    pendingNavRef.current = 'home'
    if (window.location.hash) {
      window.location.hash = ''
    }
    window.history.replaceState('', document.title, window.location.pathname + window.location.search)
    setActiveSection('home')
    setView('section')
    pendingNavRef.current = null
  }, [])

  const handleSelect = useCallback((id: SectionId) => {
    pendingNavRef.current = id
    if (id === 'home') {
      if (window.location.hash) {
        window.location.hash = ''
      }
      window.history.replaceState('', document.title, window.location.pathname + window.location.search)
      setActiveSection('home')
      setView('section')
      pendingNavRef.current = null
      return
    }
    window.location.hash = `#/${id}`
  }, [])

  const handleBackToMenu = useCallback(() => {
    setView('menu')
  }, [])

  const handleHomeNavigate = useCallback(
    (section: Extract<SectionId, 'projects' | 'skills' | 'about' | 'contact'>) => {
      pendingNavRef.current = section
      window.location.hash = `#/${section}`
    },
    []
  )

  const handleHomeStart = useCallback(() => {
    setView('menu')
  }, [])

  if (view === 'landing') {
    return (
      <div className="relative flex min-h-[100dvh] w-full items-center justify-center">
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-8 px-4 py-10 text-center sm:px-6 sm:py-16 md:py-24 md:gap-12">
          <h1 className="kh-title kh-hero-title">
            DALM1
          </h1>
          <p className="font-khmenu text-[11px] uppercase tracking-[0.3em] text-primary/90 sm:text-sm sm:tracking-[0.35em] md:text-base">
            {t.common.portfolio}
          </p>

          <div className="mt-4 flex w-full flex-col items-center gap-3 sm:mt-8 sm:gap-4">
            <button type="button" onClick={handlePressStart} className="kh-press kh-blink">
              {t.landing.pressStart}
            </button>
            <span className="max-w-[85%] font-khmenu text-[9.5px] uppercase tracking-[0.3em] text-foreground/60 sm:text-[10px] sm:tracking-[0.4em]">
              {t.landing.beginHint}
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (view === 'section') {
    if (activeSection === 'home') {
      return <HomePage onBack={handleBackToMenu} onNavigate={handleHomeNavigate} onStart={handleHomeStart} />
    }
    if (activeSection === 'projects') {
      return <ProjectsPage onBack={handleBackToMenu} />
    }
    if (activeSection === 'skills') {
      return <SkillsPage onBack={handleBackToMenu} />
    }
    if (activeSection === 'about') {
      return <AboutPage onBack={handleBackToMenu} />
    }
    if (activeSection === 'contact') {
      return <ContactPage onBack={handleBackToMenu} />
    }
    return (
      <div className="relative flex min-h-full w-full items-start justify-center py-12 md:py-16">
        <SectionView section={activeSection!} onBack={handleBackToMenu} />
      </div>
    )
  }

  return (
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
  )
}
