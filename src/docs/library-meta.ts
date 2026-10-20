import { HERO_TIER_META, HERO_VARIANTS } from '@/components/ui/hero.tsx'
import { NAVBAR_TIER_META, NAVBAR_VARIANTS } from '@/components/ui/navbar.tsx'
import { BENTO_TIER_META, BENTO_VARIANTS } from '@/components/ui/bento.tsx'
import { PRICING_TIER_META, PRICING_VARIANTS } from '@/components/ui/pricing.tsx'
import { TESTIMONIAL_TIER_META, TESTIMONIAL_VARIANTS } from '@/components/ui/testimonials.tsx'
import { STATS_TIER_META, STATS_VARIANTS } from '@/components/ui/stats.tsx'
import {
  renderBento,
  renderHero,
  renderNavbar,
  renderPricing,
  renderStats,
  renderTestimonials,
} from '@/docs/library-demos.tsx'
import type { VariantMeta } from '@/lib/library.ts'
import type { ReactNode } from 'react'

function metaFrom<Id extends string>(
  ids: readonly Id[],
  table: Record<Id, { tier: VariantMeta['tier']; title: string; note: string }>,
): VariantMeta<Id>[] {
  return ids.map((id) => ({ id, ...table[id] }))
}

export const libraryMeta: Record<
  string,
  { variants: VariantMeta[]; usage: (id: string) => string }
> = {
  hero: {
    variants: metaFrom(HERO_VARIANTS, HERO_TIER_META),
    usage: (id) => `<Hero variant="${id}" title="Ship the first screen." actions={<a href="#docs">Read the docs</a>} />`,
  },
  navbar: {
    variants: metaFrom(NAVBAR_VARIANTS, NAVBAR_TIER_META),
    usage: (id) => `<Navbar variant="${id}" logo="Mark" items={items} action={<a href="#start">Start</a>} />`,
  },
  bento: {
    variants: metaFrom(BENTO_VARIANTS, BENTO_TIER_META),
    usage: (id) => `<Bento variant="${id}" title="Show the work." tiles={tiles} />`,
  },
  pricing: {
    variants: metaFrom(PRICING_VARIANTS, PRICING_TIER_META),
    usage: (id) => `<Pricing variant="${id}" plans={plans} />`,
  },
  testimonials: {
    variants: metaFrom(TESTIMONIAL_VARIANTS, TESTIMONIAL_TIER_META),
    usage: (id) => `<Testimonials variant="${id}" items={voices} />`,
  },
  stats: {
    variants: metaFrom(STATS_VARIANTS, STATS_TIER_META),
    usage: (id) => `<Stats variant="${id}" items={figures} />`,
  },
}

export function renderLibrary(family: string, id: string): ReactNode {
  if (family === 'hero') return renderHero(id)
  if (family === 'navbar') return renderNavbar(id)
  if (family === 'bento') return renderBento(id)
  if (family === 'pricing') return renderPricing(id)
  if (family === 'testimonials') return renderTestimonials(id)
  if (family === 'stats') return renderStats(id)
  return null
}
