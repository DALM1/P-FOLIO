import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import KeybladeCanvas from './KeybladeCanvas'
import { useBackOnLeftArrow } from '../hooks/useBackOnLeftArrow'
import { useGitHub } from '../hooks/useGitHub'
import { playMenuOpen } from '../utils/audio'
import { useTranslation } from '../i18n/I18nProvider'

interface SkillsPageProps {
  onBack?: () => void
}

type SkillTier = 'S' | 'A' | 'B' | 'C'

const TIER_META: Record<SkillTier, { accent: string; glow: string }> = {
  S: { accent: '#f59e0b', glow: 'rgba(245,158,11,0.55)' },
  A: { accent: '#f0c77a', glow: 'rgba(240,199,122,0.45)' },
  B: { accent: '#60a5fa', glow: 'rgba(96,165,250,0.4)' },
  C: { accent: '#34d399', glow: 'rgba(52,211,153,0.38)' },
}

const CATEGORIES = [
  {
    id: 'frontend',
    title: 'Frontend',
    icon: '◤',
    skills: [
      { name: 'TypeScript', tier: 'S' as SkillTier, level: 96 },
      { name: 'React / Next.js', tier: 'S' as SkillTier, level: 95 },
      { name: 'Tailwind CSS', tier: 'S' as SkillTier, level: 94 },
      { name: 'Vue / Nuxt', tier: 'A' as SkillTier, level: 82 },
      { name: 'Svelte', tier: 'B' as SkillTier, level: 72 },
      { name: 'Three.js / R3F', tier: 'A' as SkillTier, level: 86 },
    ],
  },
  {
    id: 'backend',
    title: 'Backend',
    icon: '◈',
    skills: [
      { name: 'Node.js / Express', tier: 'S' as SkillTier, level: 93 },
      { name: 'Python / FastAPI', tier: 'A' as SkillTier, level: 85 },
      { name: 'PostgreSQL / Prisma', tier: 'A' as SkillTier, level: 87 },
      { name: 'Go / Gin', tier: 'B' as SkillTier, level: 74 },
      { name: 'Rust / Axum', tier: 'C' as SkillTier, level: 58 },
      { name: 'GraphQL / Apollo', tier: 'A' as SkillTier, level: 80 },
    ],
  },
  {
    id: 'mobile',
    title: 'Mobile & Desktop',
    icon: '◉',
    skills: [
      { name: 'React Native', tier: 'A' as SkillTier, level: 84 },
      { name: 'Tauri (Rust)', tier: 'A' as SkillTier, level: 81 },
      { name: 'Electron', tier: 'B' as SkillTier, level: 75 },
      { name: 'Flutter / Dart', tier: 'C' as SkillTier, level: 60 },
      { name: 'Swift', tier: 'C' as SkillTier, level: 48 },
      { name: 'Kotlin', tier: 'C' as SkillTier, level: 52 },
    ],
  },
  {
    id: 'ops',
    title: 'DevOps & Cloud',
    icon: '◆',
    skills: [
      { name: 'Docker', tier: 'A' as SkillTier, level: 86 },
      { name: 'GitHub Actions', tier: 'A' as SkillTier, level: 85 },
      { name: 'AWS', tier: 'B' as SkillTier, level: 72 },
      { name: 'Vercel / Cloudflare', tier: 'S' as SkillTier, level: 92 },
      { name: 'Nginx', tier: 'B' as SkillTier, level: 70 },
      { name: 'Kubernetes', tier: 'C' as SkillTier, level: 55 },
    ],
  },
  {
    id: 'ai',
    title: 'AI & Security',
    icon: '✦',
    skills: [
      { name: 'LLM / OpenAI API', tier: 'A' as SkillTier, level: 88 },
      { name: 'RAG / Embeddings', tier: 'A' as SkillTier, level: 83 },
      { name: 'Prompt Engineering', tier: 'S' as SkillTier, level: 94 },
      { name: 'Malware Analysis', tier: 'B' as SkillTier, level: 71 },
      { name: 'PyTorch', tier: 'C' as SkillTier, level: 58 },
      { name: 'Reverse Engineering', tier: 'C' as SkillTier, level: 54 },
    ],
  },
  {
    id: 'tools',
    title: 'Tools & Methods',
    icon: '✧',
    skills: [
      { name: 'Git / GitHub', tier: 'S' as SkillTier, level: 97 },
      { name: 'Linux / Shell', tier: 'A' as SkillTier, level: 89 },
      { name: 'Figma', tier: 'B' as SkillTier, level: 70 },
      { name: 'Agile / Scrum', tier: 'A' as SkillTier, level: 82 },
      { name: 'Testing / Vitest', tier: 'A' as SkillTier, level: 80 },
      { name: 'CI / CD', tier: 'A' as SkillTier, level: 83 },
    ],
  },
] as const

export default function SkillsPage({ onBack }: SkillsPageProps) {
  const { t } = useTranslation()
  const [travelling, setTravelling] = useState(true)
  const firedRef = useRef(false)
  const { repos } = useGitHub()

  const TIER_COLORS: Record<SkillTier, { accent: string; glow: string; label: string }> = {
    S: { ...TIER_META.S, label: t.skills.tierLegend.tierS.replace('Tier S — ', '') },
    A: { ...TIER_META.A, label: t.skills.tierLegend.tierA.replace('Tier A — ', '') },
    B: { ...TIER_META.B, label: t.skills.tierLegend.tierB.replace('Tier B — ', '') },
    C: { ...TIER_META.C, label: t.skills.tierLegend.tierC.replace('Tier C — ', '') },
  }

  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  useBackOnLeftArrow(onBack)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    playMenuOpen()
    const t = window.setTimeout(() => setTravelling(false), 520)
    return () => window.clearTimeout(t)
  }, [])

  const repoLanguageCount = useMemo(() => {
    const counts = new Map<string, number>()
    repos.forEach((r) => r.language && counts.set(r.language, (counts.get(r.language) ?? 0) + 1))
    return counts
  }, [repos])

  return (
    <div className="kh-page gap-6 sm:gap-8">
      {onBack && (
        <button
          type="button"
          onClick={handleBack}
          className="kh-btn-back hover:text-primary"
        >
          {t.common.backToMenu}
        </button>
      )}

      <header className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="relative flex flex-col items-start gap-4 sm:gap-5">
          <div className="relative -mt-2 -ml-2 kh-travel" style={{ width: 'clamp(140px, 38vw, 200px)', height: 'clamp(140px, 38vw, 200px)', maxWidth: '260px', maxHeight: '260px' }}>
            <KeybladeCanvas
              className="h-full w-full"
              pose={{
                travel: travelling,
                fov: travelling ? 52 : 40,
                position: travelling ? [0.6, -0.4, 4.2] : [0, 0, 5.2],
              }}
            />
          </div>
          <div className="flex flex-col items-start gap-2 md:-mt-8 md:pl-4 kh-fade-in">
            <span className="kh-section-heading-sm text-primary/85">
              {t.skills.subtitle(CATEGORIES.reduce((s, c) => s + c.skills.length, 0))}
            </span>
            <h1 className="kh-title text-3xl sm:text-4xl md:text-5xl">{t.skills.title}</h1>
            <p className="max-w-[56ch] text-[13.5px] text-foreground/80 sm:text-sm md:text-[15px]">
              {t.skills.intro}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 kh-fade-in">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 items-center justify-center rounded-sm border-2 font-khmenu text-xl font-bold shrink-0 sm:h-12 sm:w-12 sm:text-2xl"
              style={{ borderColor: TIER_COLORS.S.accent, boxShadow: `0 0 14px ${TIER_COLORS.S.glow}`, color: TIER_COLORS.S.accent }}
            >
              S
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-khmenu text-sm font-bold uppercase tracking-[0.2em] text-primary sm:tracking-[0.22em]">
                {t.skills.tierLegend.SMaster}
              </span>
              <span className="text-[12.5px] text-foreground/80 sm:text-[13px]">
                {t.skills.tierLegend.SDesc}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 pt-1 text-[11px] sm:gap-x-6 sm:text-[12px]">
            {(['S', 'A', 'B', 'C'] as SkillTier[]).map((tier) => {
              const color = TIER_COLORS[tier]
              const labelFromI18n = t.skills.tierLegend[`tier${tier}` as const]
              return (
                <div key={tier} className="flex items-center gap-2">
                  <span
                    className="inline-block h-2.5 w-2.5 rounded-full"
                    style={{ background: color.accent, boxShadow: `0 0 8px ${color.glow}` }}
                  />
                  <span className="font-khmenu tracking-[0.18em] uppercase text-foreground/85">
                    {labelFromI18n}
                  </span>
                </div>
              )
            })}
          </div>

          {repoLanguageCount.size > 0 && (
            <div className="flex flex-wrap items-center gap-2 pt-2">
              {[...repoLanguageCount.entries()]
                .sort((a, b) => b[1] - a[1])
                .slice(0, 8)
                .map(([lang, count]) => (
                  <span key={lang} className="kh-hud-tag">
                    {lang} · {count}
                  </span>
                ))}
            </div>
          )}
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 pt-2 md:grid-cols-2">
        {CATEGORIES.map((cat, ci) => {
          const title =
            t.skills.categories[cat.id as keyof typeof t.skills.categories] ?? cat.title
          const countLabel = t.skills.count(cat.skills.length)
          return (
            <article
              key={cat.id}
              className="kh-hud-card kh-fade-in"
              style={{ animationDelay: `${ci * 50}ms` }}
            >
              <header className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span
                    className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary"
                    style={{
                      borderColor: 'rgba(240,199,122,0.7)',
                      background: 'rgba(240,199,122,0.1)',
                      boxShadow: '0 0 10px rgba(240,199,122,0.25)',
                    }}
                    aria-hidden="true"
                  >
                    {cat.icon}
                  </span>
                  <h2 className="font-khmenu text-lg font-bold uppercase tracking-[0.24em] text-white">
                    {title}
                  </h2>
                </div>
                <span className="font-khmenu text-[10px] uppercase tracking-[0.28em] text-primary/80">
                  {countLabel}
                </span>
              </header>

              <div className="flex flex-col gap-3">
                {cat.skills.map((s, i) => {
                  const tier = TIER_COLORS[s.tier]
                return (
                  <div key={s.name} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between text-[13px]">
                      <div className="flex items-center gap-2">
                        <span
                          className="flex h-5 w-5 items-center justify-center rounded-sm border font-khmenu text-[10px] font-bold"
                          style={{
                            borderColor: tier.accent,
                            color: tier.accent,
                            boxShadow: `0 0 8px ${tier.glow}`,
                          }}
                        >
                          {s.tier}
                        </span>
                        <span className="font-khmenu tracking-[0.14em] uppercase text-foreground/95">
                          {s.name}
                        </span>
                      </div>
                      <span className="font-khmenu tracking-[0.2em] uppercase text-primary/90">
                        {s.level}%
                      </span>
                    </div>
                    <div
                      className="relative h-2 overflow-hidden rounded-full border border-black/60"
                      style={{
                        background:
                          'linear-gradient(90deg, rgba(0,0,0,0.6), rgba(0,0,0,0.2) 60%, rgba(240,199,122,0.05))',
                      }}
                    >
                      <div
                        className="h-full transition-[width] duration-700 ease-out"
                        style={{
                          width: `${s.level}%`,
                          background: `linear-gradient(90deg, ${tier.accent} 0%, rgba(255,255,255,0.9) 100%)`,
                          boxShadow: `0 0 12px ${tier.glow}`,
                          animationDelay: `${(ci * cat.skills.length + i) * 20}ms`,
                        }}
                      />
                      <div
                        className="pointer-events-none absolute inset-0 opacity-25"
                        style={{
                          background:
                            'repeating-linear-gradient(90deg, transparent 0 6px, rgba(0,0,0,0.4) 6px 7px)',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )
              })}
              </div>
            </article>
          )
        })}
      </section>
    </div>
  )
}
