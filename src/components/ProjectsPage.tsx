import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import KeybladeCanvas from './KeybladeCanvas'
import { useBackOnLeftArrow } from '../hooks/useBackOnLeftArrow'
import { useGitHub } from '../hooks/useGitHub'
import type { GithubRepo } from '../types'
import { playMenuOpen } from '../utils/audio'

interface ProjectsPageProps {
  onBack?: () => void
}

const LANG_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  Python: '#3572A5',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  Svelte: '#ff3e00',
  Go: '#00ADD8',
  Rust: '#dea584',
  C: '#555555',
  'C++': '#f34b7d',
  'C#': '#178600',
  Java: '#b07219',
  Kotlin: '#A97BFF',
  Dart: '#00B4AB',
  Swift: '#F05138',
  Ruby: '#701516',
  PHP: '#4F5D95',
  Shell: '#89e051',
  Lua: '#000080',
  R: '#198CE7',
  Jupyter: '#DA5B0B',
  MDX: '#fcb32c',
  Dockerfile: '#384d54',
}

function formatRelative(iso: string): string {
  const diffMs = Date.now() - +new Date(iso)
  const s = Math.floor(diffMs / 1000)
  if (s < 60) return `${s}s`
  const m = Math.floor(s / 60)
  if (m < 60) return `${m}m`
  const h = Math.floor(m / 60)
  if (h < 24) return `${h}h`
  const d = Math.floor(h / 24)
  if (d < 30) return `${d}d`
  const mo = Math.floor(d / 30)
  if (mo < 12) return `${mo}mo`
  return `${Math.floor(mo / 12)}y`
}

function RepoCard({ repo, index }: { repo: GithubRepo; index: number }) {
  const langColor = LANG_COLORS[repo.language ?? ''] ?? '#f0c77a'
  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noreferrer noopener"
      className="kh-hud-card block kh-fade-in"
      style={{ animationDelay: `${Math.min(index, 16) * 30}ms` }}
      aria-label={`Open repository ${repo.name}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 flex-col gap-2">
          <h3 className="truncate font-khmenu text-xl font-bold uppercase tracking-[0.2em] text-white">
            {repo.name}
          </h3>
          {repo.description && (
            <p className="max-w-[56ch] text-sm leading-relaxed text-foreground/85">
              {repo.description}
            </p>
          )}

          <div className="mt-1 flex flex-wrap items-center gap-2">
            {repo.language && (
              <span className="kh-hud-tag" style={{ borderColor: langColor + '99', color: langColor }}>
                <span
                  aria-hidden="true"
                  className="mr-2 inline-block h-2.5 w-2.5 rounded-full"
                  style={{ background: langColor, boxShadow: `0 0 6px ${langColor}` }}
                />
                {repo.language}
              </span>
            )}
            {repo.topics.slice(0, 3).map((t) => (
              <span key={t} className="kh-hud-tag" style={{ opacity: 0.85 }}>
                {t}
              </span>
            ))}
            {repo.archived && <span className="kh-hud-tag" style={{ borderColor: '#ef444488', color: '#fca5a5' }}>Archived</span>}
          </div>
        </div>

        <div className="flex shrink-0 flex-col items-end gap-2">
          <div className="flex items-center gap-3">
            <span className="kh-hud-stat">★ {repo.stargazers_count}</span>
            <span className="kh-hud-stat">⑂ {repo.forks_count}</span>
          </div>
          <span className="kh-hud-stat opacity-80">
            Pushed {formatRelative(repo.pushed_at)} ago
          </span>
          {repo.homepage && (
            <a
              href={repo.homepage}
              onClick={(e) => e.stopPropagation()}
              target="_blank"
              rel="noreferrer noopener"
              className="kh-hud-tag hover:brightness-125"
            >
              Homepage ↗
            </a>
          )}
        </div>
      </div>
    </a>
  )
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [travelling, setTravelling] = useState(true)
  const firedRef = useRef(false)
  const { repos, loading, error, user } = useGitHub()

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

  const topLanguages = useMemo(() => {
    const counts = new Map<string, number>()
    repos.forEach((r) => {
      if (r.language) counts.set(r.language, (counts.get(r.language) ?? 0) + 1)
    })
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, 6)
  }, [repos])

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
              pose={{ travel: travelling, fov: travelling ? 52 : 40, position: travelling ? [0.6, -0.4, 4.2] : [0, 0, 5.2] }}
            />
          </div>
          <div className="flex flex-col items-start gap-2 md:-mt-8 md:pl-4 kh-fade-in">
            <span className="font-khmenu text-[11px] uppercase tracking-[0.35em] text-primary/85">
              {user?.public_repos ? `Public Repositories · ${user.public_repos}` : 'Loading repositories…'}
            </span>
            <h1 className="kh-title text-4xl md:text-5xl">Projects</h1>
            <p className="max-w-[56ch] text-sm text-foreground/80 md:text-[15px]">
              Recent public projects from{' '}
              <a
                className="text-primary underline decoration-primary/40 underline-offset-4 hover:decoration-primary"
                href="https://github.com/DALM1"
                target="_blank"
                rel="noreferrer noopener"
              >
                github.com/DALM1
              </a>
              . Forks are hidden.
            </p>
          </div>
        </div>

        <div className="flex flex-col items-start gap-3 kh-fade-in">
          <div className="flex items-center gap-3">
            {user?.avatar_url && (
              <img
                src={user.avatar_url}
                alt={`${user.login} avatar`}
                className="h-12 w-12 rounded-full border-2"
                style={{ borderColor: '#f0c77a', boxShadow: '0 0 14px rgba(240,199,122,0.35)' }}
              />
            )}
            <div className="flex flex-col items-start">
              <span className="font-khmenu text-sm font-bold uppercase tracking-[0.22em] text-primary">
                {user?.name ?? user?.login ?? 'DALM1'}
              </span>
              {user?.bio && (
                <span className="max-w-[36ch] text-[13px] leading-snug text-foreground/80">{user.bio}</span>
              )}
              <div className="mt-1 flex items-center gap-3 text-[12px]">
                <span className="kh-hud-stat">Followers {user?.followers ?? 0}</span>
                <span className="kh-hud-stat">Following {user?.following ?? 0}</span>
              </div>
            </div>
          </div>

          {topLanguages.length > 0 && (
            <div className="flex flex-wrap items-center gap-2">
              {topLanguages.map(([lang, count]) => (
                <span
                  key={lang}
                  className="kh-hud-tag"
                  style={{
                    borderColor: `${LANG_COLORS[lang] ?? '#f0c77a'}aa`,
                    color: LANG_COLORS[lang] ?? '#fbe4a9',
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="mr-2 inline-block h-2 w-2 rounded-full"
                    style={{ background: LANG_COLORS[lang] ?? '#f0c77a' }}
                  />
                  {lang} · {count}
                </span>
              ))}
            </div>
          )}
        </div>
      </header>

      <section className="relative flex flex-col gap-4 pt-4">
        {loading && (
          <div className="kh-hud-card kh-fade-in">
            <div className="flex items-center gap-3">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ background: '#f0c77a', boxShadow: '0 0 10px #f0c77a' }} />
              <span className="font-khmenu text-sm uppercase tracking-[0.28em] text-foreground/85">
                Loading repositories from GitHub…
              </span>
            </div>
          </div>
        )}
        {error && (
          <div className="kh-hud-card kh-fade-in" style={{ filter: 'drop-shadow(0 0 10px rgba(239,68,68,0.3))' }}>
            <div className="flex items-start gap-3">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ background: '#ef4444', boxShadow: '0 0 10px #ef4444' }} />
              <div>
                <span className="block font-khmenu text-sm uppercase tracking-[0.28em] text-red-200">
                  Could not load repositories
                </span>
                <span className="mt-1 block text-[13px] text-foreground/85">{error}</span>
              </div>
            </div>
          </div>
        )}
        {!loading && !error && repos.length === 0 && (
          <div className="kh-hud-card kh-fade-in">
            <span className="font-khmenu text-sm uppercase tracking-[0.28em] text-foreground/85">
              No public non-fork repositories yet.
            </span>
          </div>
        )}
        {!loading && !error && repos.length > 0 && (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {repos.map((repo, i) => (
              <RepoCard key={repo.id} repo={repo} index={i} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
