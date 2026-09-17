import { useCallback, useEffect, useRef, useState } from 'react'
import KeybladeCanvas from './KeybladeCanvas'
import { BrandLogo, type BrandLogoId } from './BrandLogos'
import { useBackOnLeftArrow } from '../hooks/useBackOnLeftArrow'
import { playMenuOpen, playMenuSelect } from '../utils/audio'

interface ContactPageProps {
  onBack?: () => void
}

type ContactKind = 'url' | 'mailto' | 'tel' | 'copy'

interface ContactEntry {
  id: string
  label: string
  handle: string
  kind: ContactKind
  actionLabel: string
  actionHref?: string
  copyValue?: string
  accent: string
  icon: BrandLogoId
}

const CONTACTS: ContactEntry[] = [
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'in/dimitri-almon-111d42',
    kind: 'url',
    actionLabel: 'View profile ↗',
    actionHref: 'https://www.linkedin.com/in/dimitri-almon-111d42/',
    accent: '#0a66c2',
    icon: 'linkedin',
  },
  {
    id: 'github',
    label: 'GitHub',
    handle: 'DALM1',
    kind: 'url',
    actionLabel: 'View profile ↗',
    actionHref: 'https://github.com/DALM1',
    accent: '#f0c77a',
    icon: 'github',
  },
  {
    id: 'wechat',
    label: 'WeChat',
    handle: 'DALM101',
    kind: 'copy',
    actionLabel: 'Copy ID',
    copyValue: 'DALM101',
    accent: '#07c160',
    icon: 'wechat',
  },
  {
    id: 'whatsapp',
    label: 'WhatsApp',
    handle: '+33 6 15 33 15 77',
    kind: 'tel',
    actionLabel: 'Message ↗',
    actionHref: 'https://wa.me/33615331577',
    accent: '#25d366',
    icon: 'whatsapp',
  },
  {
    id: 'instagram',
    label: 'Instagram',
    handle: '@thatsdalm',
    kind: 'url',
    actionLabel: 'View profile ↗',
    actionHref: 'https://www.instagram.com/thatsdalm',
    accent: '#e1306c',
    icon: 'instagram',
  },
  {
    id: 'steam',
    label: 'Steam',
    handle: 'profiles/76561199391362471',
    kind: 'url',
    actionLabel: 'View profile ↗',
    actionHref: 'https://steamcommunity.com/profiles/76561199391362471/',
    accent: '#1b2838',
    icon: 'steam',
  },
]

function IconBadge({ id, accent }: { id: BrandLogoId; accent: string }) {
  const base =
    'flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border-2'
  return (
    <span
      className={base}
      style={{
        borderColor: accent,
        color: '#fff8e7',
        background: `linear-gradient(145deg, ${accent}22, ${accent}0a 60%)`,
        boxShadow: `0 0 16px ${accent}66, inset 0 0 12px ${accent}22`,
      }}
    >
      <BrandLogo
        id={id}
        className="h-7 w-7"
        style={{ filter: `drop-shadow(0 0 4px ${accent}88)` }}
      />
    </span>
  )
}

export default function ContactPage({ onBack }: ContactPageProps) {
  const [travelling, setTravelling] = useState(true)
  const firedRef = useRef(false)
  const copyRef = useRef<Map<string, number>>(new Map())
  const [, forceRender] = useState(0)

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

  const flashCopied = useCallback((id: string) => {
    copyRef.current.set(id, Date.now())
    forceRender((n) => n + 1)
    window.setTimeout(() => {
      copyRef.current.delete(id)
      forceRender((n) => n + 1)
    }, 1500)
  }, [])

  const onCardAction = useCallback(
    async (entry: ContactEntry) => {
      playMenuSelect()
      if (entry.kind === 'copy' && entry.copyValue) {
        try {
          if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(entry.copyValue)
          } else {
            const ta = document.createElement('textarea')
            ta.value = entry.copyValue
            ta.style.position = 'fixed'
            ta.style.left = '-9999px'
            document.body.appendChild(ta)
            ta.select()
            document.execCommand('copy')
            document.body.removeChild(ta)
          }
          flashCopied(entry.id)
        } catch {
          /* noop */
        }
      }
    },
    [flashCopied],
  )

  return (
    <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-8 px-6 py-10 md:py-14">
      {onBack && (
        <button
          type="button"
          onClick={handleBack}
          className="pointer-events-auto absolute right-6 top-10 z-30 font-khmenu text-xs uppercase tracking-[0.3em] text-primary/90 transition-opacity hover:text-primary md:right-8 md:top-14"
        >
          ← Back to menu
        </button>
      )}

      <header className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="relative flex flex-col items-start gap-4">
          <div className="relative h-[200px] w-[200px] md:h-[260px] md:w-[260px] -mt-2 -ml-4 kh-travel">
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
            <span className="font-khmenu text-[11px] uppercase tracking-[0.35em] text-primary/85">
              {`Reach Out · ${CONTACTS.length} channels`}
            </span>
            <h1 className="kh-title text-4xl md:text-5xl">Contact</h1>
            <p className="max-w-[56ch] text-sm text-foreground/80 md:text-[15px]">
              Pick a channel — cards open directly when possible. WeChat ID copies to clipboard on click.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 kh-fade-in">
          <div className="flex items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-sm border-2 font-khmenu text-lg font-bold"
              style={{
                borderColor: '#f0c77a',
                boxShadow: '0 0 14px rgba(240,199,122,0.4)',
                color: '#fbe4a9',
              }}
            >
              @
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-khmenu text-sm font-bold uppercase tracking-[0.22em] text-primary">
                Dimitri Almon · DALM1
              </span>
              <span className="text-[13px] text-foreground/80">
                Full Stack Engineer — Malware Analysis — AI Specialization
              </span>
              <div className="mt-1 flex items-center gap-3 text-[12px]">
                <span className="kh-hud-stat">WhatsApp · FR</span>
                <span className="kh-hud-stat">WeChat · DALM101</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {CONTACTS.map((c) => (
              <span
                key={c.id}
                className="kh-hud-tag"
                style={{
                  borderColor: `${c.accent}aa`,
                  color: c.accent.match(/^(?:#f|white)/i) ? '#fbe4a9' : c.accent,
                }}
              >
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-2 w-2 rounded-full"
                  style={{ background: c.accent, boxShadow: `0 0 8px ${c.accent}aa` }}
                />
                {c.label}
              </span>
            ))}
          </div>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-5 pt-2 md:grid-cols-2 lg:grid-cols-3">
        {CONTACTS.map((c, i) => {
          const copied = copyRef.current.has(c.id)
          const Wrapper: any =
            c.actionHref && c.kind !== 'copy' ? 'a' : 'div'
          const wrapperProps =
            c.actionHref && c.kind !== 'copy'
              ? { href: c.actionHref, target: '_blank', rel: 'noreferrer noopener' }
              : {}
          return (
            <Wrapper
              key={c.id}
              {...wrapperProps}
              className="kh-hud-card kh-fade-in block group"
              style={{ animationDelay: `${i * 45}ms` }}
              onMouseEnter={() => playMenuSelect()}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex min-w-0 items-start gap-4">
                  <IconBadge id={c.icon} accent={c.accent} />
                  <div className="flex min-w-0 flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <h3
                        className="font-khmenu text-base font-bold uppercase tracking-[0.24em] text-white"
                        style={{ textShadow: `0 0 6px ${c.accent}55` }}
                      >
                        {c.label}
                      </h3>
                      <span
                        className="inline-block h-2 w-2 rounded-full"
                        style={{ background: c.accent, boxShadow: `0 0 8px ${c.accent}aa` }}
                        aria-hidden="true"
                      />
                    </div>
                    <p className="truncate font-khmenu text-sm tracking-[0.12em] text-foreground/90">
                      {c.handle}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <button
                  type="button"
                  onClick={(e) => {
                    if (c.kind === 'copy') {
                      e.preventDefault()
                      e.stopPropagation()
                      void onCardAction(c)
                    }
                  }}
                  className="font-khmenu text-[11px] uppercase tracking-[0.24em] transition-all"
                  style={{
                    color: copied ? '#34d399' : c.accent,
                    textShadow: copied
                      ? '0 0 8px rgba(52,211,153,0.55)'
                      : `0 0 8px ${c.accent}55`,
                  }}
                >
                  {c.kind === 'copy' ? (copied ? '✓ Copied!' : c.actionLabel) : c.actionLabel}
                </button>
                <div
                  className="flex items-center gap-1 font-khmenu text-[10px] uppercase tracking-[0.28em] text-foreground/55"
                  aria-hidden="true"
                >
                  {c.kind === 'copy' ? 'Clipboard' : c.kind === 'tel' ? 'WhatsApp' : 'External'}
                  <span
                    className="inline-block h-1.5 w-1.5 rotate-45 border-t border-r"
                    style={{ borderColor: c.accent }}
                  />
                </div>
              </div>
            </Wrapper>
          )
        })}
      </section>
    </div>
  )
}
