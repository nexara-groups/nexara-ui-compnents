import type { ComponentType } from 'react'
import {
  AuroraBackgroundDemo,
  BentoGridDemo,
  ButtonDemo,
  DraggableCardDemo,
  FlipCardDemo,
  FloatingNavbarDemo,
  GradientTextDemo,
  GridBackgroundDemo,
  HeroDemo,
  MagneticButtonDemo,
  MarqueeDemo,
  ModalDemo,
  SpotlightCardDemo,
  TextRevealDemo,
  TypewriterDemo,
} from '@/docs/demos.tsx'
import {
  FlagshipBentoDemo,
  FlagshipCinematicDemo,
  FlagshipDashboardDemo,
  FlagshipKineticDemo,
  FlagshipNavDemo,
  FlagshipOrbitalDemo,
  FlagshipPricingDemo,
  FlagshipStoryDemo,
  FlagshipVoicesDemo,
} from '@/docs/flagship-demos.tsx'

export type PropRow = {
  name: string
  type: string
  defaultValue?: string
  description: string
}

export type CatalogEntry = {
  slug: string
  name: string
  category: string
  description: string
  path: string
  dependencies: string[]
  registryDependencies: string[]
  usage: string
  props: PropRow[]
  Demo: ComponentType
  studio?: boolean
}

const motionDeps = ['framer-motion', 'clsx', 'tailwind-merge']
const styleDeps = ['clsx', 'tailwind-merge']

const flagshipDeps = ['framer-motion', 'clsx', 'tailwind-merge']

const libraryDeps = ['framer-motion', 'clsx', 'tailwind-merge']

export const catalog: CatalogEntry[] = [
  {
    slug: 'flagship-cinematic-hero',
    name: 'Cinematic Hero',
    category: 'Flagship',
    description: 'Scroll-driven iris reveal of the Helio instrument. Chapters, bloom, and a contained product still.',
    path: 'src/components/flagship/cinematic-hero.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { CinematicHero } from '@/components/flagship/cinematic-hero'

<CinematicHero title="A desk that keeps the signal." />`,
    props: [
      { name: 'title', type: 'string', description: 'Display headline.' },
      { name: 'lede', type: 'string', description: 'Supporting sentence.' },
      { name: 'primaryHref', type: 'string', description: 'Primary CTA target.' },
    ],
    Demo: FlagshipCinematicDemo,
  },
  {
    slug: 'flagship-orbital-hero',
    name: 'Orbital Hero',
    category: 'Flagship',
    description: 'Contained WebGL heliograph that aims at the cursor. Orbit, beam, and focus modes.',
    path: 'src/components/flagship/orbital-hero.tsx',
    dependencies: [...flagshipDeps, 'three', '@react-three/fiber', '@react-three/drei'],
    registryDependencies: ['utils'],
    usage: `import { OrbitalHero } from '@/components/flagship/orbital-hero'

<OrbitalHero title="Aim the instrument." />`,
    props: [
      { name: 'title', type: 'string', description: 'Section headline.' },
      { name: 'lede', type: 'string', description: 'How to use the scene.' },
    ],
    Demo: FlagshipOrbitalDemo,
  },
  {
    slug: 'flagship-kinetic-hero',
    name: 'Kinetic Hero',
    category: 'Flagship',
    description: 'Editorial letters with mass. Click to lock, scroll to shear.',
    path: 'src/components/flagship/kinetic-hero.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { KineticHero } from '@/components/flagship/kinetic-hero'

<KineticHero lines={['THE NIGHT', 'KEEPS SIGNAL']} />`,
    props: [
      { name: 'lines', type: 'string[]', description: 'Two display lines.' },
      { name: 'lede', type: 'string', description: 'Instruction under the type.' },
    ],
    Demo: FlagshipKineticDemo,
  },
  {
    slug: 'flagship-atelier-nav',
    name: 'Atelier Nav',
    category: 'Flagship',
    description: 'Morphing mega-menu bar and a full-viewport mobile drawer.',
    path: 'src/components/flagship/atelier-nav.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { AtelierNav } from '@/components/flagship/atelier-nav'

<AtelierNav logo="Helio" />`,
    props: [
      { name: 'logo', type: 'string', defaultValue: 'Helio', description: 'Wordmark.' },
      { name: 'links', type: 'NavLink[]', description: 'Primary links, optional mega columns.' },
    ],
    Demo: FlagshipNavDemo,
  },
  {
    slug: 'flagship-scroll-story',
    name: 'Scroll Story',
    category: 'Flagship',
    description: 'Pinned copy and a synced instrument plate that changes mode by chapter.',
    path: 'src/components/flagship/scroll-story.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { ScrollStory } from '@/components/flagship/scroll-story'

<ScrollStory />`,
    props: [{ name: 'chapters', type: 'StoryChapter[]', description: 'Kicker, title, body, mode.' }],
    Demo: FlagshipStoryDemo,
  },
  {
    slug: 'flagship-live-bento',
    name: 'Live Bento',
    category: 'Flagship',
    description: 'Working tiles: sparkline, command filter, compare slider, lane, ping.',
    path: 'src/components/flagship/live-bento.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { LiveBento } from '@/components/flagship/live-bento'

<LiveBento />`,
    props: [{ name: 'className', type: 'string', description: 'Section classes.' }],
    Demo: FlagshipBentoDemo,
  },
  {
    slug: 'flagship-pricing',
    name: 'Pricing Atelier',
    category: 'Flagship',
    description: 'Monthly/annual morph, spring highlight, comparison table, seat math.',
    path: 'src/components/flagship/pricing-atelier.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { PricingAtelier } from '@/components/flagship/pricing-atelier'

<PricingAtelier />`,
    props: [{ name: 'className', type: 'string', description: 'Section classes.' }],
    Demo: FlagshipPricingDemo,
  },
  {
    slug: 'flagship-testimonials',
    name: 'Testimonial Wall',
    category: 'Flagship',
    description: 'Shallow 3D masonry of studio voices with filters and a held quote.',
    path: 'src/components/flagship/testimonial-wall.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { TestimonialWall } from '@/components/flagship/testimonial-wall'

<TestimonialWall />`,
    props: [{ name: 'voices', type: 'Voice[]', description: 'Quotes, portraits, studio tags.' }],
    Demo: FlagshipVoicesDemo,
  },
  {
    slug: 'flagship-dashboard',
    name: 'Atelier Dashboard',
    category: 'Flagship',
    description: 'Sidebar, command palette, live chart, sortable filtered table, empty and loading states.',
    path: 'src/components/flagship/atelier-dashboard.tsx',
    dependencies: flagshipDeps,
    registryDependencies: ['utils'],
    usage: `import { AtelierDashboard } from '@/components/flagship/atelier-dashboard'

<AtelierDashboard />`,
    props: [{ name: 'className', type: 'string', description: 'Shell classes.' }],
    Demo: FlagshipDashboardDemo,
  },
  {
    slug: 'draggable-card',
    name: 'Draggable Card',
    category: 'Cards',
    description:
      'A card you can throw inside a frame. It tilts while dragging, snaps back on request, and moves with the arrow keys.',
    path: 'src/components/ui/draggable-card.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { useRef } from 'react'
import { DraggableCard } from '@/components/ui/draggable-card'

export function Example() {
  const stageRef = useRef<HTMLDivElement>(null)
  return (
    <div ref={stageRef} className="relative h-96">
      <DraggableCard bounds={stageRef} variant="window" snapBack={false}>
        <p>Drag me</p>
      </DraggableCard>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: 'glass | film | sticker | window | ticket | polaroid | dossier | receipt | comic | playing | boarding | postcard', defaultValue: 'glass', description: 'Physical object. See the variant list for a live demo of each.' },
      { name: 'bounds', type: "'parent' | 'viewport' | RefObject", defaultValue: 'parent', description: 'Play area. parent creates one; a ref shares an external frame.' },
      { name: 'snapBack', type: 'boolean', defaultValue: 'false', description: 'Spring back to the start on release.' },
      { name: 'dragElastic', type: 'number', defaultValue: '0.16', description: 'Rubber-band past the edges, from 0 to 1.' },
      { name: 'dragMomentum', type: 'boolean', defaultValue: 'true', description: 'Coast after a flick. Disabled when snapBack is on.' },
      { name: 'tilt', type: 'boolean', defaultValue: 'true', description: 'Rotate slightly while dragging.' },
      { name: 'tiltMax', type: 'number', defaultValue: '7', description: 'Maximum tilt in degrees.' },
      { name: 'glow', type: 'boolean', defaultValue: 'true', description: 'Soft color bloom in the corner.' },
      { name: 'glowColor', type: 'string', defaultValue: 'rgba(139, 124, 255, 0.55)', description: 'Any CSS color for the bloom.' },
      { name: 'handle', type: 'boolean', defaultValue: 'false', description: 'Drag only from the grip so inner controls stay clickable.' },
      { name: 'keyboardStep', type: 'number', defaultValue: '16', description: 'Arrow-key distance in pixels. Shift triples it.' },
      { name: 'initialX / initialY', type: 'number', defaultValue: '0', description: 'Starting offset.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Turns dragging and keyboard movement off.' },
      { name: 'className', type: 'string', description: 'Tailwind classes for the card. Merged with the variant.' },
      { name: 'stageClassName', type: 'string', description: 'Classes for the generated play area when bounds is parent.' },
      { name: 'onDragEnd', type: '(point: { x: number; y: number }) => void', description: 'Fires with the resting point.' },
    ],
    Demo: DraggableCardDemo,
  },
  {
    slug: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'Cards',
    description: 'A card whose highlight and hairline follow the pointer without re-rendering on each move.',
    path: 'src/components/ui/spotlight-card.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { SpotlightCard } from '@/components/ui/spotlight-card'

export function Example() {
  return (
    <SpotlightCard spotlightColor="rgba(255, 106, 61, 0.45)" spotlightSize={320} className="p-6">
      <h3>Follow the light</h3>
    </SpotlightCard>
  )
}`,
    props: [
      { name: 'variant', type: 'profile | pricing | product | testimonial | stat | music | weather | notification | repo | task | article | place', defaultValue: 'profile', description: 'Card product. A pointer wash sits on top of the anatomy.' },
      { name: 'spotlightColor', type: 'string', defaultValue: 'rgba(139, 124, 255, 0.45)', description: 'CSS color of the radial wash.' },
      { name: 'spotlightSize', type: 'number', defaultValue: '280', description: 'Glow diameter in pixels.' },
      { name: 'borderGlow', type: 'boolean', defaultValue: 'true', description: 'Brightens a 1px edge under the pointer.' },
      { name: 'className', type: 'string', description: 'Layout, padding, and color overrides.' },
      { name: 'contentClassName', type: 'string', description: 'Classes for the inner content wrapper.' },
    ],
    Demo: SpotlightCardDemo,
  },
  {
    slug: 'flip-card',
    name: 'Flip Card',
    category: 'Cards',
    description: 'A two-sided card that turns on hover or on click, with a keyboard path to the back face.',
    path: 'src/components/ui/flip-card.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { FlipCard } from '@/components/ui/flip-card'

export function Example() {
  return (
    <FlipCard
      className="h-80"
      flipOn="hover"
      front={<p>Front</p>}
      back={<p>Back</p>}
    />
  )
}`,
    props: [
      { name: 'variant', type: 'credit | badge | playing | product | flashcard | ticket | profile | pricing | passport | vinyl | book | postcard', defaultValue: 'credit', description: 'Object that turns. Front and back are optional.' },
      { name: 'front / back', type: 'ReactNode', description: 'The two faces.' },
      { name: 'flipOn', type: "'hover' | 'click'", defaultValue: 'hover', description: 'Hover also flips while focus is inside.' },
      { name: 'flipped', type: 'boolean', description: 'Controlled face. Pair with onFlippedChange.' },
      { name: 'defaultFlipped', type: 'boolean', defaultValue: 'false', description: 'Initial face when uncontrolled.' },
      { name: 'duration', type: 'number', defaultValue: '0.55', description: 'Turn length in seconds.' },
      { name: 'className', type: 'string', defaultValue: 'h-72', description: 'Height and width. Override h-72 with another height class.' },
      { name: 'frontClassName / backClassName', type: 'string', description: 'Per-face surface classes.' },
    ],
    Demo: FlipCardDemo,
  },
  {
    slug: 'bento-grid',
    name: 'Bento Grid',
    category: 'Cards',
    description: 'A responsive mosaic of spotlight tiles. Spans collapse to a single column on small screens.',
    path: 'src/components/ui/bento-grid.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { BentoGrid, BentoItem } from '@/components/ui/bento-grid'

export function Example() {
  return (
    <BentoGrid columns={3}>
      <BentoItem colSpan={2} title="Wide tile" description="Spans two columns from the md breakpoint." />
      <BentoItem title="Tile" description="One column." href="#bento" />
    </BentoGrid>
  )
}`,
    props: [
      { name: 'columns', type: '2 | 3 | 4', defaultValue: '3', description: 'Column count from the md breakpoint up. BentoGrid.' },
      { name: 'gap', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Grid gap. BentoGrid.' },
      { name: 'variant', type: 'chart | quote | editorial | terminal | schedule | scoreboard | stat | compare | media | calendar | kanban | invoice', defaultValue: 'chart', description: 'Tile product. BentoItem.' },
      { name: 'colSpan', type: '1 | 2 | 3 | 4', defaultValue: '1', description: 'How many columns a tile spans. BentoItem.' },
      { name: 'rowSpan', type: '1 | 2', defaultValue: '1', description: 'How many rows a tile spans. BentoItem.' },
      { name: 'title / description / icon', type: 'ReactNode', description: 'Tile content. Title renders as a heading.' },
      { name: 'href', type: 'string', description: 'Renders the tile as a link.' },
      { name: 'spotlight', type: 'boolean', defaultValue: 'true', description: 'Pointer-following wash.' },
      { name: 'spotlightColor', type: 'string', description: 'CSS color of that wash.' },
      { name: 'className', type: 'string', description: 'Extra Tailwind classes on the grid or the tile.' },
    ],
    Demo: BentoGridDemo,
  },
  {
    slug: 'button',
    name: 'Button',
    category: 'Buttons',
    description: 'Twelve button constructions: flat, gel, glass, neumorphic, 3D, glow, split, avatar, beam, brutalist, skeuomorphic, and social.',
    path: 'src/components/ui/button.tsx',
    dependencies: ['class-variance-authority', ...styleDeps],
    registryDependencies: ['utils'],
    usage: `import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <Button variant="gradient" size="lg" radius="full" rightIcon={<span aria-hidden>→</span>}>
      Continue
    </Button>
  )
}`,
    props: [
      { name: 'variant', type: 'solid | gradient | glass | neumorphic | pressable | glow-outline | split | avatar-pill | border-beam | brutalist | skeuomorphic | social | segment', defaultValue: 'solid', description: 'Construction. Each option is a different control, not a hover effect.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Height and padding. md is 44px tall.' },
      { name: 'radius', type: "'md' | 'lg' | 'full'", defaultValue: 'full', description: 'Corner radius.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinner, sets aria-busy, and blocks activation.' },
      { name: 'href', type: 'string', description: 'Renders an anchor instead of a button.' },
      { name: 'leftIcon / rightIcon', type: 'ReactNode', description: 'Slots beside the label.' },
      { name: 'className', type: 'string', description: 'Tailwind overrides merged through tailwind-merge.' },
    ],
    Demo: ButtonDemo,
  },
  {
    slug: 'magnetic-button',
    name: 'Magnetic Button',
    category: 'Buttons',
    description: 'A button that leans toward a fine pointer. Touch and reduced motion leave it still.',
    path: 'src/components/ui/magnetic-button.tsx',
    dependencies: motionDeps.concat('class-variance-authority'),
    registryDependencies: ['utils', 'button'],
    usage: `import { MagneticButton } from '@/components/ui/magnetic-button'

export function Example() {
  return (
    <MagneticButton magnet="pill" strength={20} proximity={16}>
      Come closer
    </MagneticButton>
  )
}`,
    props: [
      { name: 'magnet', type: 'pill | keycap | bulb | dock | sticker | medal | stamp | badge | shutter | ticket | tag | wax', defaultValue: 'pill', description: 'Object. Every style pulls toward a fine pointer.' },
      { name: 'strength', type: 'number', defaultValue: '18', description: 'Maximum travel in pixels.' },
      { name: 'proximity', type: 'number', defaultValue: '28', description: 'Extra hit padding that still attracts the control.' },
      { name: 'className', type: 'string', description: 'Passed through to the inner button.' },
    ],
    Demo: MagneticButtonDemo,
  },
  {
    slug: 'aurora-background',
    name: 'Aurora Background',
    category: 'Backgrounds',
    description: 'Drifting color fields with optional film grain. Content sits in a layer above the effect.',
    path: 'src/components/ui/aurora-background.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { AuroraBackground } from '@/components/ui/aurora-background'

export function Example() {
  return (
    <AuroraBackground colors={['#ff6a3d', '#8b7cff', '#3ddec4']} className="min-h-80 rounded-3xl">
      <div className="p-10">Foreground content</div>
    </AuroraBackground>
  )
}`,
    props: [
      { name: 'variant', type: 'aurora | starfield | meteors | mesh | radar | sunset | clouds | rain | constellation | mountains | city | lightning', defaultValue: 'aurora', description: 'Scene.' },
      { name: 'colors', type: 'string[]', defaultValue: 'flare, iris, tide, gold', description: 'Up to five CSS colors.' },
      { name: 'duration', type: 'number', defaultValue: '14', description: 'Base loop length in seconds.' },
      { name: 'blur', type: "'sm' | 'md' | 'lg' | 'xl'", defaultValue: 'lg', description: 'How soft the fields are.' },
      { name: 'intensity', type: 'number', defaultValue: '0.55', description: 'Blob opacity from 0 to 1.' },
      { name: 'pause', type: 'boolean', defaultValue: 'false', description: 'Freezes the fields.' },
      { name: 'noise', type: 'boolean', defaultValue: 'true', description: 'Adds a faint grain overlay.' },
      { name: 'className / contentClassName', type: 'string', description: 'Outer frame and inner content classes.' },
    ],
    Demo: AuroraBackgroundDemo,
  },
  {
    slug: 'grid-background',
    name: 'Grid Background',
    category: 'Backgrounds',
    description: 'A dotted or ruled surface. The fade can follow the pointer so the pattern appears under the cursor.',
    path: 'src/components/ui/grid-background.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { GridBackground } from '@/components/ui/grid-background'

export function Example() {
  return (
    <GridBackground variant="dots" size={28} fade interactive className="min-h-64">
      <div className="p-8">Content</div>
    </GridBackground>
  )
}`,
    props: [
      { name: 'variant', type: 'graph | dots | isometric | hex | circuit | blueprint | notebook | perspective | topography | herringbone | pixel | brick', defaultValue: 'graph', description: 'Surface. Blueprint, notebook, and perspective are different objects from a repeating tile.' },
      { name: 'size', type: 'number', defaultValue: '28', description: 'Cell size in pixels.' },
      { name: 'color', type: 'string', defaultValue: 'rgba(246, 243, 236, 0.16)', description: 'Pattern color.' },
      { name: 'fade', type: 'boolean', defaultValue: 'true', description: 'Masks the pattern with a radial falloff.' },
      { name: 'interactive', type: 'boolean', defaultValue: 'true', description: 'Moves the mask with the pointer.' },
      { name: 'className / contentClassName', type: 'string', description: 'Outer frame and inner content classes.' },
    ],
    Demo: GridBackgroundDemo,
  },
  {
    slug: 'gradient-text',
    name: 'Gradient Text',
    category: 'Text',
    description: 'Lettering clipped to a moving gradient. Turn animation off for a static blend.',
    path: 'src/components/ui/gradient-text.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { GradientText } from '@/components/ui/gradient-text'

export function Example() {
  return (
    <h1 className="text-6xl">
      <GradientText from="#ff6a3d" via="#f5c16c" to="#8b7cff">Hello</GradientText>
    </h1>
  )
}`,
    props: [
      { name: 'variant', type: 'gradient | stroke | marker | glitch | neon | engraved | ribbon | stencil | boxed | script | seal | halftone', defaultValue: 'gradient', description: 'Lettering model.' },
      { name: 'as', type: "'span' | 'p' | 'h1' | 'h2' | 'h3' | 'div'", defaultValue: 'span', description: 'Element to render.' },
      { name: 'from / via / to', type: 'string', description: 'CSS colors for the gradient stops.' },
      { name: 'animate', type: 'boolean', defaultValue: 'true', description: 'Pans the gradient. Off when reduced motion is requested.' },
      { name: 'duration', type: 'number', defaultValue: '8', description: 'Seconds for one sweep.' },
      { name: 'className', type: 'string', description: 'Size, weight, and tracking.' },
    ],
    Demo: GradientTextDemo,
  },
  {
    slug: 'typewriter',
    name: 'Typewriter',
    category: 'Text',
    description: 'Types and deletes a list of phrases. Reduced motion shows the first phrase in full.',
    path: 'src/components/ui/typewriter.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Typewriter } from '@/components/ui/typewriter'

export function Example() {
  return (
    <p>
      We build <Typewriter phrases={['cards.', 'heroes.', 'tools.']} />
    </p>
  )
}`,
    props: [
      { name: 'variant', type: 'terminal | chat | search | editor | split-flap | news | lower-third | dispatch | shipping | redaction | script | teletype', defaultValue: 'terminal', description: 'Device that types.' },
      { name: 'phrases', type: 'string[]', description: 'Lines to cycle. Memoize or keep the array stable if you can.' },
      { name: 'typeSpeed', type: 'number', defaultValue: '48', description: 'Milliseconds per typed character.' },
      { name: 'deleteSpeed', type: 'number', defaultValue: '28', description: 'Milliseconds per deleted character.' },
      { name: 'pause', type: 'number', defaultValue: '1400', description: 'Milliseconds to hold a finished phrase.' },
      { name: 'loop', type: 'boolean', defaultValue: 'true', description: 'When false, typing stops on the last phrase.' },
      { name: 'cursor', type: 'boolean', defaultValue: 'true', description: 'Shows the blinking caret.' },
      { name: 'onPhraseComplete', type: '(phrase: string) => void', description: 'Fires when a phrase finishes typing.' },
      { name: 'className / cursorClassName', type: 'string', description: 'Text and caret classes.' },
    ],
    Demo: TypewriterDemo,
  },
  {
    slug: 'text-reveal',
    name: 'Text Reveal',
    category: 'Text',
    description: 'Staggers words or characters into place when the block enters the viewport.',
    path: 'src/components/ui/text-reveal.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { TextReveal } from '@/components/ui/text-reveal'

export function Example() {
  return (
    <TextReveal
      as="h2"
      by="word"
      className="text-5xl"
      text="Arrive one word at a time."
    />
  )
}`,
    props: [
      { name: 'variant', type: 'editorial | headline | marker | outline | split | figure | quote | medallion | columns | annotation | index | running-head', defaultValue: 'editorial', description: 'Typographic composition.' },
      { name: 'text', type: 'string', description: 'The copy to split. Do not pass children.' },
      { name: 'by', type: "'word' | 'char'", defaultValue: 'word', description: 'Split unit. Prefer word for paragraphs.' },
      { name: 'as', type: "'p' | 'h1' | 'h2' | 'h3' | 'span' | 'div'", defaultValue: 'p', description: 'Element to render.' },
      { name: 'container', type: 'RefObject<HTMLElement | null>', description: 'Scroll container. Defaults to the window.' },
      { name: 'className / wordClassName', type: 'string', description: 'Block classes and per-unit classes.' },
    ],
    Demo: TextRevealDemo,
  },
  {
    slug: 'floating-navbar',
    name: 'Floating Navbar',
    category: 'Navigation',
    description: 'A pill navigation bar that compacts on scroll and collapses into a menu on small screens.',
    path: 'src/components/ui/floating-navbar.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { FloatingNavbar } from '@/components/ui/floating-navbar'

export function Example() {
  return (
    <FloatingNavbar
      logo={<span>Nexara</span>}
      items={[
        { label: 'Work', href: '/work', active: true },
        { label: 'Notes', href: '/notes' },
      ]}
      actions={<a href="/start">Start</a>}
    />
  )
}`,
    props: [
      { name: 'logo', type: 'ReactNode', description: 'Brand slot at the leading edge.' },
      { name: 'items', type: '{ label, href, active? }[]', description: 'Links. active sets aria-current="page".' },
      { name: 'actions', type: 'ReactNode', description: 'Trailing slot, usually a button.' },
      { name: 'variant', type: 'floating | dock | sidebar | overlay | command | transport | mega | app-bar | announcement | breadcrumb | segmented | wordmark', defaultValue: 'floating', description: 'Navigation product.' },
      { name: 'shrinkOnScroll', type: 'boolean', defaultValue: 'true', description: 'Reduces padding after the page moves.' },
      { name: 'contained', type: 'boolean', defaultValue: 'false', description: 'Stick inside a parent instead of fixing to the viewport.' },
      { name: 'blur', type: 'boolean', defaultValue: 'true', description: 'Backdrop blur behind floating and solid bars.' },
      { name: 'scrollRoot', type: 'RefObject<HTMLElement | null>', description: 'Scroll container to watch. Defaults to the window.' },
      { name: 'menuLabel', type: 'string', defaultValue: 'Menu', description: 'Accessible name of the small-screen toggle.' },
      { name: 'className / menuClassName', type: 'string', description: 'Bar position overrides and menu panel classes.' },
    ],
    Demo: FloatingNavbarDemo,
  },
  {
    slug: 'modal',
    name: 'Modal',
    category: 'Overlays',
    description: 'A dialog with a focus trap, escape to close, backdrop dismiss, and body scroll locking.',
    path: 'src/components/ui/modal.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { useState } from 'react'
import { Modal, ModalClose, ModalContent } from '@/components/ui/modal'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      <ModalContent title="Edit name" description="This stays in view until you dismiss it.">
        <ModalClose>Close</ModalClose>
      </ModalContent>
    </Modal>
  )
}`,
    props: [
      { name: 'open / defaultOpen / onOpenChange', type: 'boolean / (open: boolean) => void', description: 'Controlled or uncontrolled open state. Modal.' },
      { name: 'title', type: 'ReactNode', description: 'Required name of the dialog. ModalContent.' },
      { name: 'description', type: 'ReactNode', description: 'Optional supporting line, wired to aria-describedby.' },
      { name: 'variant', type: 'dialog | otp | command | lightbox | wizard | invoice | drawer | share | action-sheet | banner | ticket | auth', defaultValue: 'dialog', description: 'Dialog product. Anatomy differs, not only the edge it enters from.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Max width of the panel.' },
      { name: 'dismissible', type: 'boolean', defaultValue: 'true', description: 'Backdrop click and Escape close the dialog.' },
      { name: 'hideClose', type: 'boolean', defaultValue: 'false', description: 'Hides the icon close button.' },
      { name: 'initialFocus', type: "'auto' | 'panel' | 'close'", defaultValue: 'auto', description: 'Where focus lands when the dialog opens.' },
      { name: 'className / overlayClassName', type: 'string', description: 'Panel and backdrop classes.' },
    ],
    Demo: ModalDemo,
  },
  {
    slug: 'hero',
    name: 'Hero',
    category: 'Library',
    studio: true,
    description: 'Twelve first-screen visual languages, filled with product chrome by default. Themeable, original, not a Helio recolor.',
    path: 'src/components/ui/hero.tsx',
    dependencies: [...libraryDeps, 'three', '@react-three/fiber', '@react-three/drei'],
    registryDependencies: ['utils', 'theme', 'kit'],
    usage: `import { Hero } from '@/components/ui/hero'

<Hero variant="aurora" />`,
    props: [
      { name: 'variant', type: 'aurora | brutal | pastel | editorial | spotlight | bento | terminal | cursor | helix | cinema | atlas | reveal', defaultValue: 'aurora', description: 'Visual language. Ask for hero / aurora.' },
      { name: 'title', type: 'ReactNode', description: 'Headline. Default copy ships filled; pass your own to restyle.' },
      { name: 'actions', type: 'ReactNode', description: 'Way through. Slot for buttons. Defaults are included.' },
      { name: 'media', type: 'ReactNode | null', description: 'Proof asset. Undefined uses packaged stills. null hides media.' },
      { name: 'logos / stats', type: 'string[] / HeroStat[]', description: 'Proof row. Defaults are realistic.' },
      { name: 'lines / prompt', type: 'HeroChatLine[] / string', description: 'Terminal chat and field.' },
      { name: 'chapters / events', type: 'HeroChapter[] / HeroEvent[]', description: 'Cinema chapters and atlas event feed.' },
      { name: 'scene / fallback', type: 'ReactNode / ReactNode', description: 'Helix WebGL plate and photographed still.' },
      { name: 'progress', type: 'none | scroll', description: 'Reveal. Scroll pin is opt-in, 160vh max, no wheel hijack.' },
      { name: 'className', type: 'string', description: 'Section classes. CSS variables --hero-* retint a language.' },
    ],
    Demo: HeroDemo,
  },
  {
    slug: 'navbar',
    name: 'Navbar',
    category: 'Library',
    studio: true,
    description: 'Eleven navigation mechanisms from a full-bleed rail to a morphing island. Not a glowing pill rack.',
    path: 'src/components/ui/navbar.tsx',
    dependencies: libraryDeps,
    registryDependencies: ['utils', 'theme', 'kit'],
    usage: `import { Navbar } from '@/components/ui/navbar'

<Navbar variant="rail" logo="Mark" items={[{ id: 'work', label: 'Work', href: '/work' }]} />`,
    props: [
      { name: 'variant', type: 'rail | capsule | column | path | map | command | dock | mast | curtain | island | galley', defaultValue: 'rail', description: 'Mechanism. Ask for navbar / island.' },
      { name: 'logo', type: 'ReactNode', description: 'Wordmark slot. Empty omits chrome.' },
      { name: 'items', type: 'NavItem[]', description: 'Destinations.' },
      { name: 'columns / sections', type: 'NavColumn[] / NavSection[]', description: 'Map columns and column-nav groups.' },
      { name: 'action', type: 'ReactNode', description: 'Trailing control.' },
      { name: 'edge / magnify', type: 'top | bottom / boolean', description: 'Dock placement and pointer magnify.' },
      { name: 'morph', type: 'none | control | scroll', description: 'Island. Control-first.' },
    ],
    Demo: HeroDemo,
  },
  {
    slug: 'bento',
    name: 'Bento',
    category: 'Library',
    studio: true,
    description: 'Eleven feature-section mechanisms. Ranked mosaics, paper sheets, working docks — not icon cards.',
    path: 'src/components/ui/bento.tsx',
    dependencies: libraryDeps,
    registryDependencies: ['utils', 'theme', 'kit'],
    usage: `import { Bento } from '@/components/ui/bento'

<Bento variant="mosaic" title="Show the work." tiles={[{ id: 'a', title: 'Proof' }]} />`,
    props: [
      { name: 'variant', type: 'mosaic | reel | sheet | well | dock | stage | spec | expand | inspect | desk | reflow', defaultValue: 'mosaic', description: 'Mechanism. Ask for bento / desk.' },
      { name: 'tiles', type: 'BentoTile[]', description: 'Cells. Empty omits the grid.' },
      { name: 'selected / onSelect', type: 'string / callback', description: 'Stage and expand.' },
      { name: 'inspect / onInspect', type: 'number / callback', description: 'Scrub 0–1 inside inspect.' },
    ],
    Demo: HeroDemo,
  },
  {
    slug: 'pricing',
    name: 'Pricing',
    category: 'Library',
    studio: true,
    description: 'Eleven pricing mechanisms. Published figures, sliders, tables — no neon Recommended cards.',
    path: 'src/components/ui/pricing.tsx',
    dependencies: libraryDeps,
    registryDependencies: ['utils', 'theme', 'kit'],
    usage: `import { Pricing } from '@/components/ui/pricing'

<Pricing variant="slab" plans={[{ id: 'solo', name: 'Solo', price: '24' }]} />`,
    props: [
      { name: 'variant', type: 'offer | pair | slab | ledger | toggle | seats | meter | table | quote | morph | dossier', defaultValue: 'slab', description: 'Mechanism. Ask for pricing / quote.' },
      { name: 'plans', type: 'PricePlan[]', description: 'Offers. Empty omits cards. No baked amounts.' },
      { name: 'rows', type: 'PriceRow[]', description: 'Comparison matrix.' },
      { name: 'period / seats / usage', type: 'month | year / number / number', description: 'Working controls.' },
      { name: 'formula', type: 'fn', description: 'Quote total. Reuser owns the math.' },
    ],
    Demo: HeroDemo,
  },
  {
    slug: 'testimonials',
    name: 'Testimonials',
    category: 'Library',
    studio: true,
    description: 'Eleven voice mechanisms. Pull quotes to a physics reel. No default names, no gold stars.',
    path: 'src/components/ui/testimonials.tsx',
    dependencies: libraryDeps,
    registryDependencies: ['utils', 'theme', 'kit'],
    usage: `import { Testimonials } from '@/components/ui/testimonials'

<Testimonials variant="pull" items={[{ id: 'a', quote: 'The first screen held still.' }]} />`,
    props: [
      { name: 'variant', type: 'pull | plate | stack | ledger | cast | pin | film | held | wall | reel | voice', defaultValue: 'pull', description: 'Mechanism. Ask for testimonials / wall.' },
      { name: 'items', type: 'Voice[]', description: 'Quotes. Empty is empty.' },
      { name: 'held / onHeldChange', type: 'string / callback', description: 'Held plate.' },
    ],
    Demo: HeroDemo,
  },
  {
    slug: 'stats',
    name: 'Stats',
    category: 'Library',
    studio: true,
    description: 'Eleven figure mechanisms from a hairline strip to a plotted field. Reduced motion shows the number at rest.',
    path: 'src/components/ui/stats.tsx',
    dependencies: libraryDeps,
    registryDependencies: ['utils', 'theme', 'kit'],
    usage: `import { Stats } from '@/components/ui/stats'

<Stats variant="strip" items={[{ id: 'a', value: 128, label: 'rooms' }]} />`,
    props: [
      { name: 'variant', type: 'strip | sentence | ring | bar | wall | barrel | ledger | versus | cascade | dial | plot', defaultValue: 'strip', description: 'Mechanism. Ask for stats / dial.' },
      { name: 'items', type: 'StatItem[]', description: 'Figures. Empty is empty.' },
      { name: 'sentence', type: 'ReactNode', description: 'Optional claim for sentence variant.' },
      { name: 'progress', type: 'none | control | scroll', description: 'Cascade. Control-first.' },
    ],
    Demo: HeroDemo,
  },
  {
    slug: 'marquee',
    name: 'Marquee',
    category: 'Sections',
    description: 'An infinite horizontal loop with edge fade, hover pause, and a visible pause control.',
    path: 'src/components/ui/marquee.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Marquee } from '@/components/ui/marquee'

export function Example() {
  return (
    <Marquee duration={24} pauseOnHover fade>
      <span className="px-4">One</span>
      <span className="px-4">Two</span>
      <span className="px-4">Three</span>
    </Marquee>
  )
}`,
    props: [
      { name: 'variant', type: 'logos | quotes | ticker | stubs | filmstrip | pills | stats | hazard | profiles | log | tiles | medals', defaultValue: 'logos', description: 'Track product. Omitting children shows that product’s sample.' },
      { name: 'duration', type: 'number', defaultValue: '28', description: 'Seconds for one full loop. Larger is slower.' },
      { name: 'direction', type: "'left' | 'right'", defaultValue: 'left', description: 'Travel direction.' },
      { name: 'pauseOnHover', type: 'boolean', defaultValue: 'true', description: 'Pauses while the pointer is over the track.' },
      { name: 'gap', type: 'number', defaultValue: '16', description: 'Space between items, in pixels.' },
      { name: 'repeat', type: 'number', defaultValue: '2', description: 'Extra copies so a short row still fills the width.' },
      { name: 'fade', type: 'boolean', defaultValue: 'true', description: 'Fades the left and right edges.' },
      { name: 'showControls', type: 'boolean', defaultValue: 'true', description: 'Shows a pause button for touch and keyboard users.' },
      { name: 'className', type: 'string', description: 'Outer wrapper classes.' },
    ],
    Demo: MarqueeDemo,
  },
]

export const categories = ['Library', 'Flagship', 'Cards', 'Buttons', 'Backgrounds', 'Text', 'Navigation', 'Overlays', 'Sections'] as const
