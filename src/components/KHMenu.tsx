import { useEffect, useMemo, useRef, useState } from 'react'
import { MENU_ITEMS, type SectionId } from '../types'
import { playMenuSelect } from '../utils/audio'

interface KHMenuProps {
  activeId?: SectionId
  onSelect?: (id: SectionId) => void
  onHover?: (id: SectionId) => void
  className?: string
}

const ITEM_HEIGHT = 76
const ITEM_GAP = 8
const ROW_STEP = ITEM_HEIGHT + ITEM_GAP

export default function KHMenu({ activeId, onSelect, onHover, className }: KHMenuProps) {
  const [hoveredId, setHoveredId] = useState<SectionId>(activeId ?? MENU_ITEMS[0].id)
  const lastPlayedRef = useRef<SectionId | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemsRef = useRef<HTMLButtonElement[]>([])

  const cursorIndex = useMemo(() => {
    return MENU_ITEMS.findIndex((m) => m.id === hoveredId)
  }, [hoveredId])

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

  return (
    <div
      ref={containerRef}
      className={`kh-menu relative pl-12 ${className ?? ''}`}
      role="menu"
      aria-label="Kingdom Hearts select menu"
    >
      <div
        className="kh-menu-cursor"
        style={{ transform: `translateY(${cursorIndex * ROW_STEP}px)` }}
        aria-hidden="true"
      >
        <div className="kh-menu-cursor-inner" />
      </div>

      {MENU_ITEMS.map((item, i) => {
        const active = item.id === hoveredId
        return (
          <button
            key={item.id}
            ref={(el) => {
              if (el) itemsRef.current[i] = el
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
            <span className="kh-menu-label">{item.label}</span>
          </button>
        )
      })}
    </div>
  )
}
