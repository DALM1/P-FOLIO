import { useEffect, useState } from 'react'
import type { GithubRepo, GithubUser } from '../types'

const GITHUB_USERNAME = 'DALM1'
const USER_URL = `https://api.github.com/users/${GITHUB_USERNAME}`
const REPOS_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`

interface Cache<T> {
  value: T
  ts: number
}

const CACHE_TTL_MS = 5 * 60 * 1000

const userCache = new Map<string, Cache<GithubUser | null>>()
const reposCache = new Map<string, Cache<GithubRepo[] | null>>()

function readCache<T>(m: Map<string, Cache<T | null>>, key: string): T | null | undefined {
  const entry = m.get(key)
  if (!entry) return undefined
  if (Date.now() - entry.ts > CACHE_TTL_MS) {
    m.delete(key)
    return undefined
  }
  return entry.value
}

function writeCache<T>(m: Map<string, Cache<T | null>>, key: string, value: T | null) {
  m.set(key, { value, ts: Date.now() })
}

export interface UseGitHubResult {
  user: GithubUser | null
  repos: GithubRepo[]
  loading: boolean
  error: string | null
}

export function useGitHub(): UseGitHubResult {
  const [user, setUser] = useState<GithubUser | null>(null)
  const [repos, setRepos] = useState<GithubRepo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    const cachedUser = readCache<GithubUser>(userCache, GITHUB_USERNAME)
    const cachedRepos = readCache<GithubRepo[]>(reposCache, GITHUB_USERNAME)

    if (cachedUser !== undefined && cachedRepos !== undefined) {
      setUser(cachedUser)
      setRepos(cachedRepos ?? [])
      setLoading(false)
      return
    }

    const run = async () => {
      setLoading(true)
      try {
        const [uRes, rRes] = await Promise.all([fetch(USER_URL), fetch(REPOS_URL)])
        if (!uRes.ok || !rRes.ok) throw new Error(`GitHub API HTTP ${uRes.status}/${rRes.status}`)
        const u = (await uRes.json()) as GithubUser
        const rs = (await rRes.json()) as GithubRepo[]
        const filtered = rs
          .filter((r) => !r.fork)
          .sort((a, b) => +new Date(b.pushed_at) - +new Date(a.pushed_at))
        if (cancelled) return
        writeCache<GithubUser>(userCache, GITHUB_USERNAME, u)
        writeCache<GithubRepo[]>(reposCache, GITHUB_USERNAME, filtered)
        setUser(u)
        setRepos(filtered)
      } catch (e: any) {
        if (cancelled) return
        setError(e?.message ?? 'Failed to load GitHub data')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    void run()
    return () => {
      cancelled = true
    }
  }, [])

  return { user, repos, loading, error }
}
