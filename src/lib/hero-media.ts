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
  clinic: 'hero-clinic-lobby.jpg',
  puck: 'hero-device-puck.jpg',
  hvac: 'hero-hvac-roof.jpg',
  athlete: 'hero-athlete.jpg',
  academy: 'hero-academy.jpg',
  agency: 'hero-agency-wall.jpg',
  before: 'hero-room-before.jpg',
  after: 'hero-room-after.jpg',
  loft: 'hero-startup-loft.jpg',
  leaf: 'hero-leaf-texture.jpg',
  ring: 'hero-health-ring.jpg',
  iso: 'hero-iso-plant.jpg',
  veil: 'hero-veil.mp4',
} as const

export const DEFAULT_LOGOS = ['Northstar', 'Vale', 'Harbor', 'Ampere', 'Folio'] as const
