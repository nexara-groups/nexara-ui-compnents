/** Packaged stills for hero defaults. Always prefix with the Vite base. */
export function heroAsset(file: string) {
  const base = import.meta.env.BASE_URL ?? '/'
  return `${base}library/hero/${file}`
}

export const HERO_STILLS = {
  laptop: 'hero-glass-laptop.jpg',
  helix: 'hero-3d-helix.jpg',
  portrait: 'hero-brutal-portrait.jpg',
  desk: 'hero-brutal-desk.jpg',
  cinema: 'hero-cinema-night.jpg',
  atrium: 'hero-editorial-architecture.jpg',
  globe: 'hero-globe-night.jpg',
  phone: 'hero-phone-pastel.jpg',
  mountains: 'hero-print-mountains.jpg',
  magazine: 'hero-magazine-spread.jpg',
} as const

export const DEFAULT_LOGOS = ['Northstar', 'Vale', 'Harbor', 'Ampere', 'Folio'] as const
