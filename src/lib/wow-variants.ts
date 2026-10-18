import type { ReactNode } from 'react'

export type WowProps = {
  family: string
  variant: string
  className?: string
  children?: ReactNode
  title?: ReactNode
  description?: ReactNode
  actions?: ReactNode
  eyebrow?: ReactNode
}

export const WOW_VARIANTS = {
  'draggable-card': ['physics-deck', 'magnetic-stack', 'prism-plate', 'particle-toss'],
  'spotlight-card': ['glare-tilt', 'shader-well', 'lens-spec', 'scramble-stat'],
  'flip-card': ['morph-face', 'liquid-flip', 'prism-face', 'path-reveal'],
  'bento-grid': ['depth-mosaic', 'shader-tile', 'peel-tile', 'ticker-tile'],
  button: ['liquid', 'ink-path', 'glare', 'burst', 'scramble'],
  'magnetic-button': ['gravity-well', 'comet-trail', 'ink-wake', 'shatter'],
  'aurora-background': ['shader-mesh', 'particle-field', 'liquid-glass', 'globe-field'],
  'grid-background': ['perspective-fly', 'circuit-draw', 'topo-pulse', 'hex-lattice'],
  'gradient-text': ['variable-morph', 'scramble', 'path-write', 'split-mask'],
  typewriter: ['odometer', 'scramble-line', 'matrix-rain', 'flap-3d'],
  'text-reveal': ['line-mask', 'letter-physics', 'kinetic-stack', 'svg-draw'],
  'floating-navbar': ['magnetic-pill', 'morph-dock', 'compass-nav', 'glass-liquid'],
  modal: ['shared-morph', 'shader-veil', 'liquid-sheet', 'particle-confirm'],
  hero: ['pin-scroll', 'shader-void', 'scramble-mast', 'globe-orbit', 'morph-stage'],
  marquee: ['cylinder-3d', 'tape-reels', 'velocity-scroll', 'grain-tape'],
  input: ['liquid-focus', 'magnetic-caret', 'path-underline', 'otp-flip'],
  tabs: ['layout-morph', 'liquid-ink', 'zipper-tabs', 'scramble-label'],
  accordion: ['height-morph', 'path-plus', 'kinetic-faq', 'shader-row'],
  tooltip: ['follow-lens', 'particle-hint', 'scramble-tip', 'magnetic-tag'],
  toast: ['spring-stack', 'path-check', 'liquid-slide', 'odometer-count'],
  avatar: ['radar-presence', 'shader-ring', 'particle-presence', 'holographic'],
  badge: ['morse-live', 'scramble-live', 'liquid-pill', 'path-ribbon'],
  pricing: ['prism-price', 'odometer-price', 'morph-toggle', 'shader-featured'],
  testimonials: ['wall-parallax', 'video-shader', 'polaroid-quotes', 'scramble-pull'],
  footer: ['giant-marquee', 'grain-night', 'barcode-marks', 'path-sitemap'],
  stats: ['odometer', 'dial-gauge', 'particle-pulse', 'film-mosaic'],
  countdown: ['flip-3d', 'shader-rings', 'analog-orbit', 'launch-scrub'],
  leaderboard: ['heat-race', 'podium-spring', 'live-odometer', 'particle-rank'],
  'case-study': ['scroll-film', 'shared-morph', 'film-stack', 'path-index'],
  services: ['fold-doors', 'stamp-crews', 'shader-cards', 'path-checklist'],
  process: ['scrub-timeline', 'pin-steps', 'path-rail', 'metronome-steps'],
  team: ['film-portraits', 'constellation-crew', 'holographic', 'particle-grid'],
  contact: ['map-shader', 'liquid-form', 'magnetic-branches', 'path-directions'],
  'cta-band': ['liquid-wash', 'scramble-cta', 'particle-close', 'beam-band'],
  chapters: ['pin-story', 'scrub-essay', 'parallax-index', 'path-folio'],
  news: ['velocity-tape', 'flip-headlines', 'shader-magazine', 'tape-digest'],
  'logo-cloud': ['orbit-3d', 'magnetic-marks', 'stamp-lockups', 'particle-press'],
  'app-shell': ['morph-sidebar', 'radar-jump', 'shader-desk', 'liquid-rail'],
  kpi: ['odometer-spark', 'ring-draw', 'particle-live', 'spark-delta'],
  'data-table': ['row-stagger', 'morph-cards', 'heat-cells', 'odometer-cells'],
  'kanban-board': ['spring-toss', 'peel-cards', 'wip-pendulum', 'particle-lane'],
  'chart-block': ['path-draw', 'particle-area', 'scrub-bars', 'shader-donut'],
  activity: ['stagger-feed', 'path-rail', 'live-odometer', 'liquid-chat'],
  'command-palette': ['scramble-search', 'morph-results', 'particle-jump', 'prism-row'],
  'settings-panel': ['morph-sections', 'liquid-toggle', 'path-security', 'fold-profile'],
  kit: ['shader-clinic', 'globe-agency', 'pin-sports', 'liquid-portal', 'scramble-academy'],
  loader: [
    'pulse-halo',
    'orbit-beads',
    'shader-fog',
    'path-infinity',
    'odometer-pct',
    'scramble-hold',
    'liquid-drop',
    'particle-drift',
    'flap-wait',
    'analog-sweep',
    'barcode-scan',
    'prism-bar',
  ],
} as const

export type WowFamily = keyof typeof WOW_VARIANTS

export function isWowVariant(family: string, id: string | undefined): boolean {
  if (!id) return false
  const list = WOW_VARIANTS[family as WowFamily]
  return Boolean(list && (list as readonly string[]).includes(id))
}
