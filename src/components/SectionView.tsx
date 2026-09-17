import type { SectionId } from '../types'

interface SectionViewProps {
  section: SectionId
  onBack?: () => void
}

const SECTION_TITLES: Record<SectionId, string> = {
  home: 'Home',
  projects: 'Projects',
  skills: 'Skills',
  about: 'About',
  contact: 'Contact',
}

export default function SectionView({ section, onBack }: SectionViewProps) {
  return (
    <div className="relative w-full max-w-3xl px-6 py-8 md:py-12">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="kh-title text-3xl md:text-4xl">{SECTION_TITLES[section]}</h2>
        {onBack && (
          <button
            type="button"
            onClick={onBack}
            className="font-khmenu text-xs uppercase tracking-[0.3em] text-primary/90 hover:text-primary"
          >
            ← Back
          </button>
        )}
      </div>

      <div className="kh-menu-item !text-[18px] !font-khmenu !grid-cols-1 !pl-8 !min-h-[48px] !gap-0 !cursor-default !transform-none !items-center">
        <span className="!tracking-[0.2em] uppercase text-foreground/85">
          Content for {SECTION_TITLES[section]} — coming in the next update
        </span>
      </div>
    </div>
  )
}
