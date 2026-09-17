export type SectionId = 'home' | 'projects' | 'skills' | 'about' | 'contact'

export interface MenuItem {
  id: SectionId
  label: string
  hash: string
}

export const MENU_ITEMS: MenuItem[] = [
  { id: 'home', label: 'Home', hash: '#/home' },
  { id: 'projects', label: 'Projects', hash: '#/projects' },
  { id: 'skills', label: 'Skills', hash: '#/skills' },
  { id: 'about', label: 'About', hash: '#/about' },
  { id: 'contact', label: 'Contact', hash: '#/contact' },
]

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  watchers_count: number
  topics: string[]
  pushed_at: string
  updated_at: string
  created_at: string
  homepage: string | null
  fork: boolean
  archived: boolean
  default_branch: string
  open_issues_count: number
}

export interface GithubUser {
  login: string
  name: string | null
  avatar_url: string
  bio: string | null
  public_repos: number
  followers: number
  following: number
  html_url: string
  location: string | null
  company: string | null
  blog: string | null
}
