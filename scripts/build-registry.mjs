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
    files: [{ path: 'src/lib/utils.ts', type: 'registry:lib' }],
    usage: "import { cn, usePrefersReducedMotion } from '@/lib/utils'",
  },
  ['draggable-card', 'Draggable Card', 'Cards', 'A movable card with spring tilt, optional snap-back, a drag handle, and keyboard nudging.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['spotlight-card', 'Spotlight Card', 'Cards', 'Twelve product cards with a pointer wash on top of distinct anatomies.', ['clsx', 'tailwind-merge'], ['utils']],
  ['flip-card', 'Flip Card', 'Cards', 'A two-sided card that turns on hover or click.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['bento-grid', 'Bento Grid', 'Cards', 'A responsive mosaic of product tiles.', ['clsx', 'tailwind-merge'], ['utils']],
  ['button', 'Button', 'Buttons', 'Thirteen button constructions from solid to beam and link.', ['class-variance-authority', 'clsx', 'tailwind-merge'], ['utils']],
  ['magnetic-button', 'Magnetic Button', 'Buttons', 'Twelve product controls that lean toward a fine pointer.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['aurora-background', 'Aurora Background', 'Backgrounds', 'Twelve ambient scenes with content above the field.', ['clsx', 'tailwind-merge'], ['utils']],
  ['grid-background', 'Grid Background', 'Backgrounds', 'Twelve ruled and dotted surfaces.', ['clsx', 'tailwind-merge'], ['utils']],
  ['gradient-text', 'Gradient Text', 'Text', 'Twelve lettering models.', ['clsx', 'tailwind-merge'], ['utils']],
  ['typewriter', 'Typewriter', 'Text', 'Twelve devices that type and delete phrases.', ['clsx', 'tailwind-merge'], ['utils']],
  ['text-reveal', 'Text Reveal', 'Text', 'Twelve typographic compositions that stagger into view.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['floating-navbar', 'Floating Navbar', 'Navigation', 'Twelve navigation products.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['modal', 'Modal', 'Overlays', 'Twelve dialog anatomies with a focus trap and scroll lock.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
  ['hero', 'Hero', 'Sections', 'Twelve marketing page constructions.', ['framer-motion', 'clsx', 'tailwind-merge'], ['utils']],
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
]

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
    files: [{ path: `src/components/ui/${name}.tsx`, type: 'registry:ui' }],
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
