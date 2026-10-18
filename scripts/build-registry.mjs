import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const meta = readFileSync(path.join(root, 'src/docs/variant-meta.ts'), 'utf8')

function parseVariants(source) {
  const docs = {}
  const start = source.indexOf('export const variantDocs')
  const body = source.slice(start)
  const block = /(?:'([^']+)'|([A-Za-z0-9_-]+)):\s*\[/g
  const starts = []
  let match
  while ((match = block.exec(body))) {
    starts.push({ slug: match[1] ?? match[2], index: match.index + match[0].length })
  }
  for (let i = 0; i < starts.length; i += 1) {
    const current = starts[i]
    const end = i + 1 < starts.length ? starts[i + 1].index : body.length
    const chunk = body.slice(current.index, end)
    const variants = []
    const item = /\{\s*id:\s*'([^']+)',\s*name:\s*'([^']+)',\s*description:\s*'([^']*)',\s*usage:\s*`([^`]*)`\s*\}/g
    let row
    while ((row = item.exec(chunk))) {
      variants.push({
        name: row[1],
        title: row[2],
        description: row[3],
        usage: row[4],
      })
    }
    if (variants.length) docs[current.slug] = variants
  }
  return docs
}

const variants = parseVariants(meta)

const itemsMeta = [
  {
    name: 'utils',
    type: 'registry:lib',
    title: 'cn and motion helpers',
    description: 'Class merging, reduced-motion detection, and one-time keyframe injection used by every Nexara component.',
    categories: ['Utilities'],
    dependencies: ['clsx', 'tailwind-merge'],
    registryDependencies: [],
    files: [
      { path: 'src/lib/utils.ts', type: 'registry:lib' },
      { path: 'src/lib/media.tsx', type: 'registry:lib' },
    ],
    usage: "import { cn, usePrefersReducedMotion } from '@/lib/utils'",
  },
  ['draggable-card', 'Draggable Card', 'Cards', 'A movable card with spring tilt, optional snap-back, a drag handle, and keyboard nudging.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['spotlight-card', 'Spotlight Card', 'Cards', 'Twelve product cards with a pointer wash on top of distinct anatomies.', ['clsx', 'tailwind-merge'], ['utils']],
  ['flip-card', 'Flip Card', 'Cards', 'A two-sided card that turns on hover or click.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['bento-grid', 'Bento Grid', 'Cards', 'A responsive mosaic of product tiles.', ['clsx', 'tailwind-merge'], ['utils']],
  ['button', 'Button', 'Buttons', 'Twenty-four button constructions including toggle, theme, FAB, store, swap, progress, and groups.', ['class-variance-authority', 'clsx', 'tailwind-merge'], ['utils']],
  ['magnetic-button', 'Magnetic Button', 'Buttons', 'Twelve product controls that lean toward a fine pointer.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['aurora-background', 'Aurora Background', 'Backgrounds', 'Twelve ambient scenes with content above the field.', ['clsx', 'tailwind-merge'], ['utils']],
  ['grid-background', 'Grid Background', 'Backgrounds', 'Twelve ruled and dotted surfaces.', ['clsx', 'tailwind-merge'], ['utils']],
  ['gradient-text', 'Gradient Text', 'Text', 'Twelve lettering models.', ['clsx', 'tailwind-merge'], ['utils']],
  ['typewriter', 'Typewriter', 'Text', 'Twelve devices that type and delete phrases.', ['clsx', 'tailwind-merge'], ['utils']],
  ['text-reveal', 'Text Reveal', 'Text', 'Twelve typographic compositions that stagger into view.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['floating-navbar', 'Floating Navbar', 'Navigation', 'Twelve navigation products.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['modal', 'Modal', 'Overlays', 'Twelve dialog anatomies with a focus trap and scroll lock.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['hero', 'Hero', 'Sections', 'Thirty marketing page constructions with first-class image, video, and lottie slots.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['marquee', 'Marquee', 'Sections', 'Twelve continuous tracks with pause control.', ['clsx', 'tailwind-merge'], ['utils']],
  ['input', 'Input', 'Forms', 'Twelve field constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['tabs', 'Tabs', 'Forms', 'Ten tab anatomies.', ['clsx', 'tailwind-merge'], ['utils']],
  ['accordion', 'Accordion', 'Forms', 'Ten disclosure constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['tooltip', 'Tooltip', 'Feedback', 'Ten hint constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['toast', 'Toast', 'Feedback', 'Ten notification constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['avatar', 'Avatar', 'Identity', 'Ten identity constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['badge', 'Badge', 'Identity', 'Ten status chips.', ['clsx', 'tailwind-merge'], ['utils']],
  ['pricing', 'Pricing', 'Sections', 'Ten pricing sections.', ['clsx', 'tailwind-merge'], ['utils']],
  ['testimonials', 'Testimonials', 'Sections', 'Ten social-proof constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['footer', 'Footer', 'Sections', 'Ten closing constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['stats', 'Stats', 'Sections', 'Twelve count-up constructions for climate, care, and sport desks.', ['clsx', 'tailwind-merge'], ['utils']],
  ['countdown', 'Countdown', 'Sections', 'Twelve event and race clocks.', ['clsx', 'tailwind-merge'], ['utils']],
  ['leaderboard', 'Leaderboard', 'Sections', 'Twelve medal-tally constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['case-study', 'Case Study', 'Sections', 'Twelve client-story constructions including a tabbed carousel.', ['clsx', 'tailwind-merge'], ['utils']],
  ['services', 'Services', 'Sections', 'Twelve service grids: HVAC checklists, four crews, clinic doors.', ['clsx', 'tailwind-merge'], ['utils']],
  ['process', 'Process', 'Sections', 'Twelve step constructions including the written Nexara process.', ['clsx', 'tailwind-merge'], ['utils']],
  ['team', 'Team', 'Sections', 'Twelve people grids for doctors, crews, and coaches.', ['clsx', 'tailwind-merge'], ['utils']],
  ['contact', 'Contact', 'Sections', 'Twelve branch, map, and appointment constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['cta-band', 'Cta Band', 'Sections', 'Twelve closing bands.', ['clsx', 'tailwind-merge'], ['utils']],
  ['chapters', 'Chapters', 'Sections', 'Twelve scroll-driven storytelling constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['news', 'News', 'Sections', 'Twelve bulletin and notes constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['logo-cloud', 'Logo Cloud', 'Sections', 'Twelve dealer and client strips.', ['clsx', 'tailwind-merge'], ['utils']],
  ['app-shell', 'App Shell', 'App', 'Twelve portal layouts for Agency OS.', ['clsx', 'tailwind-merge'], ['utils']],
  ['kpi', 'Kpi', 'App', 'Twelve dashboard metric tiles.', ['clsx', 'tailwind-merge'], ['utils']],
  ['data-table', 'Data Table', 'App', 'Twelve filterable tables.', ['clsx', 'tailwind-merge'], ['utils']],
  ['kanban-board', 'Kanban Board', 'App', 'Twelve boards for agency, plant, and clinic.', ['clsx', 'tailwind-merge'], ['utils']],
  ['chart-block', 'Chart Block', 'App', 'Twelve SVG chart constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['activity', 'Activity', 'App', 'Twelve activity feeds.', ['clsx', 'tailwind-merge'], ['utils']],
  ['command-palette', 'Command Palette', 'App', 'Twelve jump menus.', ['clsx', 'tailwind-merge'], ['utils']],
  ['settings-panel', 'Settings Panel', 'App', 'Twelve settings constructions.', ['clsx', 'tailwind-merge'], ['utils']],
  ['kit', 'Kit', 'Kits', 'Twelve industry pages composed from the blocks.', ['clsx', 'tailwind-merge'], ['utils', 'hero', 'stats', 'services', 'process', 'team', 'contact', 'cta-band', 'chapters', 'news', 'logo-cloud', 'leaderboard', 'countdown', 'case-study', 'app-shell', 'kpi', 'data-table', 'kanban-board', 'activity', 'accordion', 'footer', 'button']],
]

const extraFiles = {
  hero: [
    { path: 'src/components/ui/hero-extra.tsx', type: 'registry:ui' },
    { path: 'src/lib/media.tsx', type: 'registry:lib' },
  ],
  button: [{ path: 'src/components/ui/button-extra.tsx', type: 'registry:ui' }],
  team: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  'logo-cloud': [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  'case-study': [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  services: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  testimonials: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  avatar: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  news: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  contact: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
  marquee: [{ path: 'src/lib/media.tsx', type: 'registry:lib' }],
}

const items = itemsMeta.map((entry) => {
  if (!Array.isArray(entry)) return entry
  const [name, title, category, description, dependencies, registryDependencies] = entry
  const itemVariants = variants[name]
  if (!itemVariants || itemVariants.length < 10) {
    throw new Error(`${name} is missing 10 variants (got ${itemVariants?.length ?? 0})`)
  }
  const names = itemVariants.map((item) => item.name).join(', ')
  return {
    name,
    type: 'registry:ui',
    title,
    description: `${description} Variants: ${names}.`,
    categories: [category],
    dependencies,
    registryDependencies,
    files: [{ path: `src/components/ui/${name}.tsx`, type: 'registry:ui' }, ...(extraFiles[name] ?? [])],
    usage: itemVariants[0].usage,
    variants: itemVariants,
  }
})

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'nexara-ui',
  homepage: '.',
  items,
}

writeFileSync(path.join(root, 'registry.json'), `${JSON.stringify(registry, null, 2)}\n`)
console.log(`Wrote registry.json (${items.length} items)`)
