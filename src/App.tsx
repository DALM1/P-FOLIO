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

type AppView = 'landing' | 'menu' | 'section'

function getSectionFromHash(): SectionId | null {
  const hash = window.location.hash.replace(/^#\//, '')
  const item = MENU_ITEMS.find((m) => m.id === hash)
  return item?.id ?? null
}

export default function App() {
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
      <div className="relative flex min-h-full w-full items-center justify-center">
        <div className="relative z-10 flex w-full max-w-4xl flex-col items-center gap-12 px-6 py-16 text-center md:py-24">
          <h1 className="kh-title text-4xl md:text-6xl lg:text-7xl">
            DALM1
          </h1>
          <p className="font-khmenu text-sm uppercase tracking-[0.35em] text-primary/90 md:text-base">
            Kingdom Hearts Portfolio
          </p>

          <div className="mt-8 flex flex-col items-center gap-4">
            <button type="button" onClick={handlePressStart} className="kh-press kh-blink">
              Press Start
            </button>
            <span className="font-khmenu text-[10px] uppercase tracking-[0.4em] text-foreground/60">
              Click anywhere or press Enter to begin
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
    <div className="relative flex min-h-full w-full items-center justify-center px-6 py-10 md:py-16">
      <div className="relative z-10 flex w-full max-w-6xl flex-col items-start gap-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="grid w-full max-w-[560px] grid-cols-1 items-start gap-x-8 gap-y-4 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-y-0">
          <h1 className="kh-title col-span-1 row-span-2 text-4xl md:text-5xl lg:text-6xl md:self-start md:pt-3">
            DALM1
          </h1>
          <p className="font-khmenu col-span-1 row-start-2 text-xs uppercase tracking-[0.4em] text-primary/85 md:col-start-1 md:row-start-2 md:self-end md:pb-3">
            Connecting hearts together
          </p>
          <KeybladeCanvas
            className="col-span-1 row-span-2 h-[360px] w-[300px] max-w-[80vw] md:col-start-2 md:row-span-2 md:-mt-6"
            speedMul={hoveredMenu ? 2.1 : 1}
          />
        </div>

        <div className="w-full md:w-auto">
          <KHMenu
            activeId={activeSection ?? undefined}
            onSelect={handleSelect}
            onHover={setHoveredMenu}
          />
        </div>
      </div>
    </div>
  )
}
