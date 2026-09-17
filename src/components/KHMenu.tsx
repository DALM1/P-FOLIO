import { useEffect, useMemo, useRef, useState } from 'react'
import { MENU_ITEMS, type SectionId } from '../types'
import { playMenuSelect } from '../utils/audio'
import { useTranslation } from '../i18n/I18nProvider'

interface KHMenuProps {
  activeId?: SectionId
  onSelect?: (id: SectionId) => void
  onHover?: (id: SectionId) => void
  className?: string
}

export default function KHMenu({ activeId, onSelect, onHover, className }: KHMenuProps) {
  const { t } = useTranslation()
  const [hoveredId, setHoveredId] = useState<SectionId>(activeId ?? MENU_ITEMS[0].id)
  const lastPlayedRef = useRef<SectionId | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<Array<HTMLButtonElement | null>>([])
  const [cursorOffset, setCursorOffset] = useState(0)

  const cursorIndex = useMemo(() => {
    return MENU_ITEMS.findIndex((m) => m.id === hoveredId)
  }, [hoveredId])

  const recomputeCursor = useMemo(() => {
    return () => {
      const el = itemsRef.current[cursorIndex]
      if (!el || !containerRef.current) return
      const containerRect = containerRef.current.getBoundingClientRect()
      const itemRect = el.getBoundingClientRect()
      setCursorOffset(itemRect.top - containerRect.top)
    }
  }, [cursorIndex])

  useEffect(() => {
    recomputeCursor()
  }, [recomputeCursor, hoveredId])

  useEffect(() => {
    if (activeId) setHoveredId(activeId)
  }, [activeId])

  useEffect(() => {
    if (lastPlayedRef.current !== hoveredId) {
      lastPlayedRef.current = hoveredId
      playMenuSelect()
    }
    onHover?.(hoveredId)
  }, [hoveredId, onHover])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const cur = MENU_ITEMS.findIndex((m) => m.id === hoveredId)
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault()
        const next = (cur + 1) % MENU_ITEMS.length
        setHoveredId(MENU_ITEMS[next]!.id)
      } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault()
        const prev = (cur - 1 + MENU_ITEMS.length) % MENU_ITEMS.length
        setHoveredId(MENU_ITEMS[prev]!.id)
      } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onSelect?.(hoveredId)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [hoveredId, onSelect])

  useEffect(() => {
    if (typeof ResizeObserver === 'undefined') return
    const obs = new ResizeObserver(() => {
      recomputeCursor()
    })
    if (containerRef.current) obs.observe(containerRef.current)
    itemsRef.current.forEach((el) => {
      if (el) obs.observe(el)
    })
    const onResize = () => recomputeCursor()
    window.addEventListener('resize', onResize)
    window.addEventListener('orientationchange', onResize)
    return () => {
      obs.disconnect()
      window.removeEventListener('resize', onResize)
      window.removeEventListener('orientationchange', onResize)
    }
  }, [recomputeCursor])

  return (
    <div
      ref={containerRef}
      className={`kh-menu relative pl-[calc(var(--kh-cursor-w)*1.15)] ${className ?? ''}`}
      role="menu"
      aria-label="Kingdom Hearts select menu"
    >
      <div
        className="kh-menu-cursor"
        style={{ transform: `translateY(${cursorOffset}px)` }}
        aria-hidden="true"
      >
        <div className="kh-menu-cursor-inner" />
      </div>

      {MENU_ITEMS.map((item, i) => {
        const active = item.id === hoveredId
        const label = t.menu[item.id] ?? item.label
        return (
          <button
            key={item.id}
            ref={(el) => {
              itemsRef.current[i] = el
            }}
            type="button"
            role="menuitem"
            data-id={item.id}
            className={`kh-menu-item ${active ? 'active' : ''}`}
            onMouseEnter={() => setHoveredId(item.id)}
            onFocus={() => setHoveredId(item.id)}
            onClick={() => onSelect?.(item.id)}
          >
            <span className="justify-self-start" />
            <span className="kh-menu-label truncate pr-1">{label}</span>
          </button>
        )
      })}
    </div>
  )
}
