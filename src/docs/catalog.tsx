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
}

const motionDeps = ['framer-motion', 'clsx', 'tailwind-merge']
const styleDeps = ['clsx', 'tailwind-merge']

export const catalog: CatalogEntry[] = [
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
      <DraggableCard bounds={stageRef} variant="elevated" snapBack={false}>
        <p>Drag me</p>
      </DraggableCard>
    </div>
  )
}`,
    props: [
      { name: 'variant', type: "'glass' | 'solid' | 'outline' | 'elevated'", defaultValue: 'glass', description: 'Surface treatment.' },
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
      { name: 'variant', type: "'glass' | 'solid' | 'outline' | 'ink'", defaultValue: 'glass', description: 'Surface treatment.' },
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
    description: 'Solid, outline, ghost, gradient, and shimmer actions, including a loading state and link mode.',
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
      { name: 'variant', type: "'solid' | 'outline' | 'ghost' | 'gradient' | 'shimmer'", defaultValue: 'solid', description: 'Visual style.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Height and padding. md is 44px tall.' },
      { name: 'radius', type: "'md' | 'lg' | 'full'", defaultValue: 'full', description: 'Corner radius.' },
      { name: 'shimmer', type: 'boolean', defaultValue: 'false', description: 'Adds the light sweep on hover to any variant.' },
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
    <MagneticButton variant="outline" strength={20} proximity={16}>
      Come closer
    </MagneticButton>
  )
}`,
    props: [
      { name: 'strength', type: 'number', defaultValue: '18', description: 'Maximum travel in pixels.' },
      { name: 'proximity', type: 'number', defaultValue: '28', description: 'Extra hit padding that still attracts the control.' },
      { name: 'innerShift', type: 'number', defaultValue: '0.35', description: 'How far the label shifts relative to the shell, from 0 to 1.' },
      { name: 'variant / size / radius', type: 'Button variants', description: 'Same visual props as Button.' },
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
      { name: 'variant', type: "'grid' | 'dots'", defaultValue: 'grid', description: 'Ruled lines or dots.' },
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
      { name: 'variant', type: "'floating' | 'solid' | 'transparent'", defaultValue: 'floating', description: 'Surface of the bar.' },
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
    category: 'Sections',
    description: 'A centered or split intro with staggered entrance. Title, actions, and media are slots.',
    path: 'src/components/ui/hero.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { Hero } from '@/components/ui/hero'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <Hero
      align="split"
      eyebrow="New"
      title="A room with movable parts"
      description="Compose this with any background or media."
      actions={<Button>Begin</Button>}
      media={<img alt="" src="/cover.jpg" />}
    />
  )
}`,
    props: [
      { name: 'align', type: "'center' | 'split'", defaultValue: 'center', description: 'Centered stack, or copy beside media from the md breakpoint.' },
      { name: 'eyebrow', type: 'ReactNode', description: 'Small label above the title.' },
      { name: 'title', type: 'ReactNode', description: 'Rendered in an h2. Pass text or a gradient span.' },
      { name: 'description', type: 'ReactNode', description: 'Supporting paragraph.' },
      { name: 'actions', type: 'ReactNode', description: 'Button row.' },
      { name: 'media', type: 'ReactNode', description: 'Right column in split layout. Hidden when omitted.' },
      { name: 'className', type: 'string', description: 'Section padding and background overrides.' },
      { name: 'titleClassName / descriptionClassName / actionsClassName / mediaClassName / eyebrowClassName', type: 'string', description: 'Per-slot Tailwind classes.' },
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

export const categories = ['Cards', 'Buttons', 'Backgrounds', 'Text', 'Navigation', 'Overlays', 'Sections'] as const
