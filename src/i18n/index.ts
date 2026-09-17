import type { FrTranslations } from './locales/fr'
import { fr } from './locales/fr'
import { en } from './locales/en'
import { zh } from './locales/zh'
import { ru } from './locales/ru'

export type Lang = 'fr' | 'en' | 'zh' | 'ru'

export const SUPPORTED_LANGS: Lang[] = ['fr', 'en', 'zh', 'ru']
export const DEFAULT_LANG: Lang = 'en'

type DeepRelax<T> = T extends (...args: infer A) => infer R
  ? (...args: A) => R
  : T extends readonly (infer V)[]
  ? readonly DeepRelax<V>[]
  : T extends object
  ? { readonly [K in keyof T]: DeepRelax<T[K]> }
  : T extends string
  ? string
  : T

export type TranslationsShape = DeepRelax<FrTranslations>

export const LOCALES: Record<Lang, TranslationsShape> = {
  fr,
  en,
  zh,
  ru,
}

const STORAGE_KEY = 'portfolio-kh:lang'

function matchesLang(raw: string | null): Lang | null {
  if (!raw) return null
  const lower = raw.toLowerCase()
  if (lower.startsWith('zh')) return 'zh'
  if (lower.startsWith('ru')) return 'ru'
  if (lower.startsWith('fr')) return 'fr'
  if (lower.startsWith('en')) return 'en'
  return null
}

export function detectInitialLang(): Lang {
  if (typeof window === 'undefined') return DEFAULT_LANG
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY)
    const forcedFromStorage = matchesLang(saved)
    if (forcedFromStorage) return forcedFromStorage
  } catch {
    /* noop */
  }
  const navs = [...(navigator.languages ?? []), navigator.language]
  for (const n of navs) {
    const hit = matchesLang(n)
    if (hit) return hit
  }
  return DEFAULT_LANG
}

export function persistLang(lang: Lang) {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(STORAGE_KEY, lang)
  } catch {
    /* noop */
  }
}

export type Translations = FrTranslations
