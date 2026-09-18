import { useCallback, useEffect, useMemo, useRef } from 'react'
import KeybladeCanvas from './KeybladeCanvas'
import { useBackOnLeftArrow } from '../hooks/useBackOnLeftArrow'
import { useGitHub } from '../hooks/useGitHub'
import { playMenuOpen } from '../utils/audio'
import { useTranslation } from '../i18n/I18nProvider'
import { getAssetUrl } from '../utils/assetUrl'

interface AboutPageProps {
  onBack?: () => void
}

const TIMELINE_ACCENTS: Record<number, string> = {
  0: '#60a5fa',
  1: '#ef4444',
  2: '#34d399',
  3: '#a78bfa',
  4: '#22d3ee',
  5: '#f97316',
  6: '#f0c77a',
  7: '#f472b6',
  8: '#fb7185',
  9: '#c084fc',
  10: '#f59e0b',
  11: '#2dd4bf',
}

export default function AboutPage({ onBack }: AboutPageProps) {
  const { t } = useTranslation()
  const firedRef = useRef(false)
  const { user } = useGitHub()

  const TIMELINE = useMemo(() => {
    return t.about.timeline.map((e, i) => ({
      ...e,
      accent: TIMELINE_ACCENTS[i] ?? '#f0c77a',
    }))
  }, [t])

  const KEY_INTERESTS = t.about.interests

  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  useBackOnLeftArrow(onBack)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    playMenuOpen()
  }, [])

  return (
    <div className="kh-page gap-6 sm:gap-8 relative">
      {onBack && (
        <button
          type="button"
          onClick={handleBack}
          className="kh-btn-back hover:text-primary"
        >
          {t.common.backToMenu}
        </button>
      )}

      <header className="relative grid grid-cols-1 items-start gap-5 sm:gap-6 md:grid-cols-[auto_1fr] md:gap-8">
        <div className="flex w-full flex-row items-center gap-4 md:flex-col md:items-start kh-fade-in sm:justify-center md:justify-start">
          <div
            className="relative shrink-0 overflow-hidden rounded-md border-2 backdrop-blur-sm"
            style={{
              borderColor: '#f0c77a',
              boxShadow: '0 0 24px rgba(240,199,122,0.35)',
              width: 'clamp(112px, 28vw, 144px)',
              height: 'clamp(112px, 28vw, 144px)',
              maxWidth: 'clamp(112px, 28vw, 180px)',
              maxHeight: 'clamp(112px, 28vw, 180px)',
            }}
          >
            <img
              src={getAssetUrl('/assets-kh/pdp-portfolio.jpeg')}
              alt="Dimitri Almon portrait"
              className="h-full w-full object-cover"
              loading="eager"
              decoding="async"
            />
            <div
              className="pointer-events-none absolute inset-0 mix-blend-overlay"
              style={{
                background:
                  'linear-gradient(160deg, rgba(240,199,122,0.18) 0%, rgba(0,0,0,0) 55%, rgba(0,0,0,0.35) 100%)',
              }}
              aria-hidden="true"
            />
          </div>

          <div className="relative shrink-0 kh-travel" style={{ width: 'clamp(112px, 28vw, 144px)', height: 'clamp(112px, 28vw, 144px)', maxWidth: 'clamp(112px, 28vw, 180px)', maxHeight: 'clamp(112px, 28vw, 180px)' }}>
            <KeybladeCanvas
              className="h-full w-full"
              pose={{ travel: false, fov: 40, position: [0, 0, 5.2] }}
            />
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 md:gap-5 kh-fade-in">
          <div className="flex flex-col items-start gap-2">
            <span className="kh-section-heading-sm text-primary/85">
              {t.about.subtitle}
            </span>
            <h1 className="kh-title text-3xl sm:text-4xl md:text-5xl">{t.about.title}</h1>
            <p className="max-w-[68ch] text-[14.5px] leading-relaxed text-foreground/90 sm:text-[15px] md:text-[16px]">
              {t.about.intro}
              <span className="font-bold text-primary">Dimitri Almon (玄一Xuán Yī)</span>
              , {t.about.role}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${user.login} GitHub avatar`}
                className="h-10 w-10 rounded-full border-2"
                style={{ borderColor: '#f0c77a', boxShadow: '0 0 12px rgba(240,199,122,0.45)' }}
              />
            )}
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-khmenu text-sm font-bold uppercase tracking-[0.22em] text-primary">
                {user?.name ?? 'Dimitri Almon'} · {user?.login ?? 'DALM1'}
              </span>
              <span className="text-[13px] text-foreground/80">
                {t.about.stats(user?.public_repos ?? '—', user?.followers ?? '—', user?.following ?? '—')}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {KEY_INTERESTS.map((tag) => (
              <span key={tag} className="kh-hud-tag" style={{ opacity: 0.92 }}>
                {tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-[1.2fr_0.8fr] pt-2">
        <article className="kh-hud-card kh-fade-in flex flex-col gap-4">
          <header className="flex items-center gap-3">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary"
              style={{
                borderColor: 'rgba(240,199,122,0.7)',
                background: 'rgba(240,199,122,0.1)',
                boxShadow: '0 0 10px rgba(240,199,122,0.25)',
              }}
              aria-hidden="true"
            >
              ✦
            </span>
            <h2 className="font-khmenu text-lg font-bold uppercase tracking-[0.24em] text-white">
              {t.about.sections.parcours}
            </h2>
          </header>

          <div className="flex flex-col gap-3.5 text-[14px] leading-[1.8] text-foreground/92 sm:gap-4 sm:text-[14.5px] sm:leading-[1.85] md:text-[15px]">
            <p>
              {t.about.bioParagraphs[0]?.content}
            </p>

            {t.about.bioParagraphs.slice(1, 4).map((p, i) => (
              <p key={i}>{p.content}</p>
            ))}

            <p className="pt-1.5 font-khmenu text-sm uppercase tracking-[0.22em] text-primary sm:text-base">
              {t.about.sections.engEntrepreneurship}
            </p>

            {t.about.engEntrepreneurship.map((p, i) => (
              <p key={`eng-${i}`}>{p.content}</p>
            ))}

            <p className="pt-1.5 font-khmenu text-sm uppercase tracking-[0.22em] text-primary sm:text-base">
              {t.about.sections.roboticsSystems}
            </p>

            {t.about.roboticsSystems.map((p, i) => (
              <p key={`rob-${i}`}>{p.content}</p>
            ))}

            {t.about.bioFooter.map((p, i) => (
              <p key={`foot-${i}`} className={i === 0 ? 'pt-1' : ''}>
                {p}
              </p>
            ))}

            <p className="pt-1.5 font-khmenu text-sm uppercase tracking-[0.22em] text-primary sm:text-base">
              {t.about.sections.buildArchitectAutomate}
            </p>
          </div>
        </article>

        <aside className="flex flex-col gap-6">
          <article className="kh-hud-card kh-fade-in flex flex-col gap-4" style={{ animationDelay: '80ms' }}>
            <header className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary shrink-0"
                style={{
                  borderColor: 'rgba(240,199,122,0.7)',
                  background: 'rgba(240,199,122,0.1)',
                  boxShadow: '0 0 10px rgba(240,199,122,0.25)',
                }}
                aria-hidden="true"
              >
                ◈
              </span>
              <h2 className="font-khmenu text-base font-bold uppercase tracking-[0.22em] text-white sm:text-lg sm:tracking-[0.24em]">
                Timeline
              </h2>
            </header>

            <ol className="relative flex flex-col gap-4 border-l pl-4 sm:pl-5" style={{ borderColor: 'rgba(240,199,122,0.35)' }}>
              {TIMELINE.map((e, i) => (
                <li key={e.title} className="relative flex flex-col items-start gap-1 kh-fade-in" style={{ animationDelay: `${i * 35}ms` }}>
                  <span
                    className="absolute -left-[24px] top-1 inline-flex h-3 w-3 items-center justify-center rounded-full border-2 sm:-left-[29px] sm:h-3.5 sm:w-3.5"
                    style={{
                      borderColor: e.accent,
                      background: e.accent,
                      boxShadow: `0 0 10px ${e.accent}`,
                    }}
                    aria-hidden="true"
                  />
                  <span
                    className="font-khmenu text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.28em]"
                    style={{ color: e.accent, textShadow: `0 0 6px ${e.accent}66` }}
                  >
                    {e.year}
                  </span>
                  <h3 className="font-khmenu text-[14px] font-bold uppercase tracking-[0.16em] text-white sm:text-[15px] sm:tracking-[0.18em]">
                    {e.title}
                  </h3>
                  <p className="text-[12.5px] leading-relaxed text-foreground/88 sm:text-[13px]">{e.body}</p>
                </li>
              ))}
            </ol>
          </article>

          <article
            className="kh-hud-card kh-fade-in flex flex-col gap-3"
            style={{ animationDelay: '140ms' }}
          >
            <header className="flex items-center gap-3">
              <span
                className="flex h-8 w-8 items-center justify-center rounded-sm border font-khmenu text-primary"
                style={{
                  borderColor: 'rgba(240,199,122,0.7)',
                  background: 'rgba(240,199,122,0.1)',
                  boxShadow: '0 0 10px rgba(240,199,122,0.25)',
                }}
                aria-hidden="true"
              >
                ✧
              </span>
              <h2 className="font-khmenu text-lg font-bold uppercase tracking-[0.24em] text-white">
                {t.about.philosophy.title}
              </h2>
            </header>
            <p className="text-[14px] leading-relaxed text-foreground/90">
              {t.about.philosophy.body}
            </p>
            <ul className="flex flex-wrap items-center gap-2 pt-1">
              {t.about.philosophy.tags.map((tag) => (
                <li key={tag} className="kh-hud-tag" style={{ opacity: 0.9 }}>
                  {tag}
                </li>
              ))}
            </ul>
          </article>
        </aside>
      </section>
    </div>
  )
}
