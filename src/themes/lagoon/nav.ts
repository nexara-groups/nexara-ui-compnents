import type { ThemeScheme } from '@/themes/contract.ts'

export type LagoonScreen = 'landing' | 'desk' | 'book'

export function screenHref(screen: LagoonScreen, scheme: ThemeScheme, query = '') {
  return `#themes/lagoon/${screen}/${scheme}${query ? `?${query}` : ''}`
}

/** Scroll to an in-page section without touching the hash router. */
export function jumpTo(id: string, smooth: boolean) {
  const node = document.getElementById(id)
  if (!node) return
  node.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'start' })
  const heading = node.querySelector<HTMLElement>('h2, h3')
  if (heading) {
    heading.setAttribute('tabindex', '-1')
    heading.focus({ preventScroll: true })
  }
}

/** Parses `themes/lagoon/<screen>/<scheme>?query` into showcase props, or null for other routes. */
export function parseLagoonRoute(hash: string): { screen: LagoonScreen; scheme: ThemeScheme } | null {
  const match = /^themes\/lagoon\/(landing|desk|book)(?:\/(dark|light))?(?:\?.*)?$/.exec(hash)
  if (!match) return null
  return { screen: match[1] as LagoonScreen, scheme: (match[2] as ThemeScheme | undefined) ?? 'dark' }
}
