import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import KeybladeCanvas from './KeybladeCanvas'
import { BrandLogo, type BrandLogoId } from './BrandLogos'
import { useBackOnLeftArrow } from '../hooks/useBackOnLeftArrow'
import { playComputerOff, playMenuOpen, playMenuSelect } from '../utils/audio'
import { useTranslation } from '../i18n/I18nProvider'
import { getAssetUrl } from '../utils/assetUrl'

interface ContactPageProps {
  onBack?: () => void
}

type ContactKind = 'url' | 'mailto' | 'tel' | 'copy'

interface ContactEntryBase {
  id: string
  handle: string
  kind: ContactKind
  actionHref?: string
  copyValue?: string
  accent: string
  icon: BrandLogoId
}

const CONTACTS_BASE: ContactEntryBase[] = [
  {
    id: 'linkedin',
    handle: 'in/dimitri-almon-111d42',
    kind: 'url',
    actionHref: 'https://www.linkedin.com/in/dimitri-almon-111d42/',
    accent: '#0a66c2',
    icon: 'linkedin',
  },
  {
    id: 'github',
    handle: 'DALM1',
    kind: 'url',
    actionHref: 'https://github.com/DALM1',
    accent: '#f0c77a',
    icon: 'github',
  },
  {
    id: 'wechat',
    handle: 'DALM101',
    kind: 'copy',
    copyValue: 'DALM101',
    accent: '#07c160',
    icon: 'wechat',
  },
  {
    id: 'whatsapp',
    handle: '+33 6 15 33 15 77',
    kind: 'tel',
    actionHref: 'https://wa.me/33615331577',
    accent: '#25d366',
    icon: 'whatsapp',
  },
  {
    id: 'instagram',
    handle: '@thatsdalm',
    kind: 'url',
    actionHref: 'https://www.instagram.com/thatsdalm',
    accent: '#e1306c',
    icon: 'instagram',
  },
  {
    id: 'steam',
    handle: 'profiles/76561199391362471',
    kind: 'url',
    actionHref: 'https://steamcommunity.com/profiles/76561199391362471/',
    accent: '#1b2838',
    icon: 'steam',
  },
]

interface ContactEntry extends ContactEntryBase {
  label: string
  actionLabel: string
}

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
  const { t } = useTranslation()
  const firedRef = useRef(false)
  const copyRef = useRef<Map<string, number>>(new Map())
  const [, forceRender] = useState(0)

  const CONTACTS: ContactEntry[] = useMemo(() => {
    const labelFor: Record<string, string> = {
      linkedin: 'LinkedIn',
      github: 'GitHub',
      wechat: 'WeChat',
      whatsapp: 'WhatsApp',
      instagram: 'Instagram',
      steam: 'Steam',
    }
    return CONTACTS_BASE.map((c) => {
      let actionLabel = t.contact.viewProfile
      if (c.kind === 'tel') actionLabel = t.contact.message
      if (c.kind === 'copy') actionLabel = t.contact.copyId
      return {
        ...c,
        label: labelFor[c.id] ?? c.id,
        actionLabel,
      }
    })
  }, [t])

  const handleBack = useCallback(() => {
    onBack?.()
  }, [onBack])

  useBackOnLeftArrow(onBack)

  useEffect(() => {
    if (firedRef.current) return
    firedRef.current = true
    playMenuOpen()
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

  const onExternalLinkClick = useCallback(
    (entry: ContactEntry) => {
      if (entry.kind === 'copy') return
      playComputerOff()
    },
    [],
  )

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

      <header className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
        <div className="relative flex flex-col items-start gap-4 sm:gap-5">
          <div className="relative -mt-2 -ml-2 kh-travel" style={{ width: 'clamp(140px, 38vw, 200px)', height: 'clamp(140px, 38vw, 200px)', maxWidth: '260px', maxHeight: '260px' }}>
            <KeybladeCanvas
              className="h-full w-full"
              pose={{ travel: false, fov: 40, position: [0, 0, 5.2] }}
            />
          </div>
          <div className="flex flex-col items-start gap-2 md:-mt-8 md:pl-4 kh-fade-in">
            <span className="kh-section-heading-sm text-primary/85">
              {t.contact.subtitle(CONTACTS.length)}
            </span>
            <h1 className="kh-title text-3xl sm:text-4xl md:text-5xl">{t.contact.title}</h1>
            <p className="max-w-[56ch] text-[13.5px] text-foreground/80 sm:text-sm md:text-[15px]">
              {t.contact.intro}
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 kh-fade-in">
          <div className="flex items-center gap-3">
            <div
              className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-sm border-2 font-khmenu text-base font-bold sm:h-12 sm:w-12 sm:text-lg"
              style={{
                borderColor: '#f0c77a',
                boxShadow: '0 0 14px rgba(240,199,122,0.4)',
                color: '#fbe4a9',
              }}
            >
              <img
                src={getAssetUrl('/assets-kh/pdp-portfolio.jpeg')}
                alt=""
                className="h-full w-full object-cover"
                draggable={false}
              />
            </div>
            <div className="flex flex-col items-start gap-0.5">
              <span className="font-khmenu text-sm font-bold uppercase tracking-[0.2em] text-primary sm:tracking-[0.22em]">
                {t.contact.userTitle}
              </span>
              <span className="text-[12.5px] text-foreground/80 sm:text-[13px]">
                {t.contact.userRole}
              </span>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-[11.5px] sm:gap-3 sm:text-[12px]">
                <span className="kh-hud-stat">{t.contact.statWhatsapp}</span>
                <span className="kh-hud-stat">{t.contact.statWechat}</span>
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
              onClick={() => onExternalLinkClick(c)}
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
                  {c.kind === 'copy' ? (copied ? t.contact.copied : c.actionLabel) : c.actionLabel}
                </button>
                <div
                  className="flex items-center gap-1 font-khmenu text-[10px] uppercase tracking-[0.28em] text-foreground/55"
                  aria-hidden="true"
                >
                  {c.kind === 'copy'
                    ? t.contact.kindClipboard
                    : c.kind === 'tel'
                    ? t.contact.kindWhatsapp
                    : t.contact.kindExternal}
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
