import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  LOCALES,
  SUPPORTED_LANGS,
  DEFAULT_LANG,
  detectInitialLang,
  persistLang,
  type Lang,
  type TranslationsShape,
} from './index'

interface I18nContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: TranslationsShape
  supported: Lang[]
}

const I18nContext = createContext<I18nContextValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => detectInitialLang())

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang === 'zh' ? 'zh-CN' : lang
    }
  }, [lang])

  const setLang = useCallback((next: Lang) => {
    if (!SUPPORTED_LANGS.includes(next)) next = DEFAULT_LANG
    setLangState(next)
    persistLang(next)
  }, [])

  const value = useMemo<I18nContextValue>(() => {
    const dict = LOCALES[lang] ?? LOCALES[DEFAULT_LANG]
    return {
      lang,
      setLang,
      t: dict,
      supported: SUPPORTED_LANGS,
    }
  }, [lang, setLang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useTranslation(): I18nContextValue {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useTranslation must be used inside <I18nProvider>')
  }
  return ctx
}
