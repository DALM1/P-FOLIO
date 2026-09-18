export function getAssetUrl(path: string): string {
  const base = (import.meta.env.BASE_URL ?? '/').replace(/\/$/, '')
  const clean = path.startsWith('/') ? path : `/${path}`
  return base + clean
}
