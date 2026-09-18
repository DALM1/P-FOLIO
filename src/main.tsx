import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { I18nProvider } from './i18n/I18nProvider'
import { revealAppAfterBoot } from './utils/bootSplash'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <App />
    </I18nProvider>
  </React.StrictMode>,
)

if (typeof window !== 'undefined') {
  const fallbackTimeoutMs = 4200
  const handle = window.setTimeout(() => {
    revealAppAfterBoot('fallback-timeout')
  }, fallbackTimeoutMs)
  window.setTimeout(() => {
    try {
      window.clearTimeout(handle)
    } catch {
      /* noop */
    }
  }, fallbackTimeoutMs + 200)
}
