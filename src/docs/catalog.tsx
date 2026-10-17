import type { ComponentType } from 'react'
import {
  AccordionDemo,
  AuroraBackgroundDemo,
  AvatarDemo,
  BadgeDemo,
  BentoGridDemo,
  ButtonDemo,
  DraggableCardDemo,
  FlipCardDemo,
  FloatingNavbarDemo,
  FooterDemo,
  GradientTextDemo,
  GridBackgroundDemo,
  HeroDemo,
  InputDemo,
  MagneticButtonDemo,
  MarqueeDemo,
  ModalDemo,
  PricingDemo,
  SpotlightCardDemo,
  TabsDemo,
  TestimonialsDemo,
  TextRevealDemo,
  ToastDemo,
  TooltipDemo,
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
    description: 'A card you can throw inside a frame. It tilts while dragging, snaps back on request, and moves with the arrow keys.',
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
      { name: 'variant', type: 'glass | window | note | media | task | invite | file | widget | message | stack | compact | calendar', defaultValue: 'glass', description: 'Card product. See the gallery for a live demo of each.' },
      { name: 'bounds', type: "'parent' | 'viewport' | RefObject", defaultValue: 'parent', description: 'Play area. parent creates one; a ref shares an external frame.' },
      { name: 'snapBack', type: 'boolean', defaultValue: 'false', description: 'Spring back to the start on release.' },
      { name: 'dragElastic', type: 'number', defaultValue: '0.16', description: 'Rubber-band past the edges, from 0 to 1.' },
      { name: 'dragMomentum', type: 'boolean', defaultValue: 'true', description: 'Coast after a flick. Disabled when snapBack is on.' },
      { name: 'tilt', type: 'boolean', defaultValue: 'true', description: 'Rotate slightly while dragging.' },
      { name: 'tiltMax', type: 'number', defaultValue: '7', description: 'Maximum tilt in degrees.' },
      { name: 'glow', type: 'boolean', defaultValue: 'true', description: 'Soft color bloom in the corner.' },
      { name: 'glowColor', type: 'string', description: 'Any CSS color for the bloom.' },
      { name: 'handle', type: 'boolean', defaultValue: 'false', description: 'Drag only from the grip so inner controls stay clickable.' },
      { name: 'keyboardStep', type: 'number', defaultValue: '16', description: 'Arrow-key distance in pixels. Shift triples it.' },
      { name: 'disabled', type: 'boolean', defaultValue: 'false', description: 'Turns dragging and keyboard movement off.' },
      { name: 'className', type: 'string', description: 'Tailwind classes for the card.' },
      { name: 'stageClassName', type: 'string', description: 'Classes for the generated play area when bounds is parent.' },
    ],
    Demo: DraggableCardDemo,
  },
  {
    slug: 'spotlight-card',
    name: 'Spotlight Card',
    category: 'Cards',
    description: 'Twelve product cards. A pointer wash sits on top of a different anatomy each time.',
    path: 'src/components/ui/spotlight-card.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { SpotlightCard } from '@/components/ui/spotlight-card'

export function Example() {
  return <SpotlightCard variant="pricing" />
}`,
    props: [
      { name: 'variant', type: 'profile | pricing | product | testimonial | stat | player | weather | inbox | repo | task | article | place', defaultValue: 'profile', description: 'Card product. Anatomy differs; the wash is shared.' },
      { name: 'spotlightColor', type: 'string', description: 'CSS color of the radial wash.' },
      { name: 'spotlightSize', type: 'number', defaultValue: '220', description: 'Glow diameter in pixels.' },
      { name: 'className', type: 'string', description: 'Layout and color overrides.' },
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
  return <FlipCard variant="credit" className="h-80" />
}`,
    props: [
      { name: 'variant', type: 'credit | product | pricing | profile | metric | invite | auth | feature | quote | plan | media | flashcard', defaultValue: 'credit', description: 'Object that turns. Front and back are optional overrides.' },
      { name: 'front / back', type: 'ReactNode', description: 'The two faces.' },
      { name: 'flipOn', type: "'hover' | 'click'", defaultValue: 'hover', description: 'Hover also flips while focus is inside.' },
      { name: 'duration', type: 'number', defaultValue: '0.55', description: 'Turn length in seconds.' },
    ],
    Demo: FlipCardDemo,
  },
  {
    slug: 'bento-grid',
    name: 'Bento Grid',
    category: 'Cards',
    description: 'A responsive mosaic of product tiles. Spans collapse to a single column on small screens.',
    path: 'src/components/ui/bento-grid.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { BentoGrid, BentoItem } from '@/components/ui/bento-grid'

export function Example() {
  return (
    <BentoGrid columns={3}>
      <BentoItem colSpan={2} variant="chart" title="Uptime" description="Last hour." />
      <BentoItem variant="quote" title="Stay in the room." />
    </BentoGrid>
  )
}`,
    props: [
      { name: 'columns', type: '2 | 3 | 4', defaultValue: '3', description: 'Column count from the md breakpoint up. BentoGrid.' },
      { name: 'variant', type: 'chart | quote | editorial | terminal | schedule | scoreboard | stat | compare | media | calendar | kanban | invoice', defaultValue: 'chart', description: 'Tile product. BentoItem.' },
      { name: 'colSpan / rowSpan', type: '1 | 2 | 3 | 4', description: 'How many columns or rows a tile spans.' },
    ],
    Demo: BentoGridDemo,
  },
  {
    slug: 'button',
    name: 'Button',
    category: 'Buttons',
    description: 'Thirteen constructions: solid, soft, outline, ghost, glass, gradient, destructive, split, social, icon, shimmer, beam, and link.',
    path: 'src/components/ui/button.tsx',
    dependencies: ['class-variance-authority', ...styleDeps],
    registryDependencies: ['utils'],
    usage: `import { Button } from '@/components/ui/button'

export function Example() {
  return <Button variant="gradient">Continue</Button>
}`,
    props: [
      { name: 'variant', type: 'solid | soft | outline | ghost | glass | gradient | destructive | split | social | icon | shimmer | beam | link', defaultValue: 'solid', description: 'Construction. Each option is a different control.' },
      { name: 'size', type: "'sm' | 'md' | 'lg'", defaultValue: 'md', description: 'Height and padding.' },
      { name: 'radius', type: "'md' | 'lg' | 'full'", defaultValue: 'lg', description: 'Corner radius.' },
      { name: 'loading', type: 'boolean', defaultValue: 'false', description: 'Shows a spinner and sets aria-busy.' },
      { name: 'href', type: 'string', description: 'Renders an anchor instead of a button.' },
    ],
    Demo: ButtonDemo,
  },
  {
    slug: 'magnetic-button',
    name: 'Magnetic Button',
    category: 'Buttons',
    description: 'A product control that leans toward a fine pointer. Touch and reduced motion leave it still.',
    path: 'src/components/ui/magnetic-button.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { MagneticButton } from '@/components/ui/magnetic-button'

export function Example() {
  return <MagneticButton magnet="pill">Come closer</MagneticButton>
}`,
    props: [
      { name: 'magnet', type: 'pill | orb | dock | fab | chip | glow | tilt | text | badge | glass | key | split', defaultValue: 'pill', description: 'Control anatomy. Every style pulls toward a fine pointer.' },
      { name: 'strength', type: 'number', defaultValue: '16', description: 'Maximum travel in pixels.' },
      { name: 'proximity', type: 'number', defaultValue: '24', description: 'Extra hit padding that still attracts the control.' },
    ],
    Demo: MagneticButtonDemo,
  },
  {
    slug: 'aurora-background',
    name: 'Aurora Background',
    category: 'Backgrounds',
    description: 'Twelve ambient scenes. Content sits in a layer above the field.',
    path: 'src/components/ui/aurora-background.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { AuroraBackground } from '@/components/ui/aurora-background'

export function Example() {
  return (
    <AuroraBackground variant="mesh" className="min-h-80 rounded-3xl">
      <div className="p-10">Foreground</div>
    </AuroraBackground>
  )
}`,
    props: [
      { name: 'variant', type: 'aurora | mesh | grain | dusk | spotlight | prism | plasma | fog | orbit | ember | tide | stars', defaultValue: 'aurora', description: 'Scene.' },
      { name: 'className / contentClassName', type: 'string', description: 'Outer frame and inner content classes.' },
    ],
    Demo: AuroraBackgroundDemo,
  },
  {
    slug: 'grid-background',
    name: 'Grid Background',
    category: 'Backgrounds',
    description: 'A ruled or dotted surface. The fade can follow the pointer.',
    path: 'src/components/ui/grid-background.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { GridBackground } from '@/components/ui/grid-background'

export function Example() {
  return (
    <GridBackground variant="dots" className="min-h-64">
      <div className="p-8">Content</div>
    </GridBackground>
  )
}`,
    props: [
      { name: 'variant', type: 'graph | dots | plus | isometric | hex | circuit | blueprint | notebook | perspective | topo | diagonal | fade', defaultValue: 'graph', description: 'Surface.' },
      { name: 'size', type: 'number', defaultValue: '28', description: 'Cell size in pixels.' },
      { name: 'fade', type: 'boolean', defaultValue: 'true', description: 'Masks the pattern with a radial falloff.' },
    ],
    Demo: GridBackgroundDemo,
  },
  {
    slug: 'gradient-text',
    name: 'Gradient Text',
    category: 'Text',
    description: 'Twelve lettering models. Turn animation off for a static blend.',
    path: 'src/components/ui/gradient-text.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { GradientText } from '@/components/ui/gradient-text'

export function Example() {
  return (
    <h1 className="text-6xl">
      <GradientText variant="shimmer">Harbor</GradientText>
    </h1>
  )
}`,
    props: [
      { name: 'variant', type: 'gradient | shimmer | stroke | mask | aurora | italic | highlight | underline | boxed | kinetic | glow | fade', defaultValue: 'gradient', description: 'Lettering model.' },
      { name: 'animate', type: 'boolean', defaultValue: 'true', description: 'Pans the gradient. Off when reduced motion is requested.' },
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
  return <Typewriter variant="terminal" phrases={['cards.', 'heroes.']} />
}`,
    props: [
      { name: 'variant', type: 'terminal | chat | search | editor | flap | headline | caption | prompt | label | redact | italic | tape', defaultValue: 'terminal', description: 'Device that types.' },
      { name: 'phrases', type: 'string[]', description: 'Lines to cycle.' },
      { name: 'paused', type: 'boolean', defaultValue: 'false', description: 'Holds the current phrase.' },
      { name: 'showControls', type: 'boolean', defaultValue: 'true', description: 'Shows a pause control when the line loops.' },
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
  return <TextReveal variant="editorial" text="Arrive one word at a time." />
}`,
    props: [
      { name: 'variant', type: 'editorial | display | highlight | outline | split | caption | quote | columns | note | index | folio | stack', defaultValue: 'editorial', description: 'Typographic composition.' },
      { name: 'text', type: 'string', description: 'The copy to split.' },
      { name: 'by', type: "'word' | 'char'", defaultValue: 'word', description: 'Split unit.' },
    ],
    Demo: TextRevealDemo,
  },
  {
    slug: 'floating-navbar',
    name: 'Floating Navbar',
    category: 'Navigation',
    description: 'Twelve navigation products. The floating pill still compacts on scroll.',
    path: 'src/components/ui/floating-navbar.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { FloatingNavbar } from '@/components/ui/floating-navbar'

export function Example() {
  return (
    <FloatingNavbar
      variant="floating"
      logo={<span>Nexara</span>}
      items={[{ label: 'Work', href: '/work', active: true }]}
    />
  )
}`,
    props: [
      { name: 'variant', type: 'floating | dock | sidebar | overlay | command | transport | mega | app-bar | announcement | breadcrumb | segmented | wordmark', defaultValue: 'floating', description: 'Navigation product.' },
      { name: 'items', type: '{ label, href, active? }[]', description: 'Links. active sets aria-current="page".' },
      { name: 'contained', type: 'boolean', defaultValue: 'false', description: 'Stick inside a parent instead of fixing to the viewport.' },
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
import { Modal, ModalContent } from '@/components/ui/modal'

export function Example() {
  const [open, setOpen] = useState(false)
  return (
    <Modal open={open} onOpenChange={setOpen}>
      <button type="button" onClick={() => setOpen(true)}>Open</button>
      <ModalContent variant="dialog" title="Edit name">
        Body
      </ModalContent>
    </Modal>
  )
}`,
    props: [
      { name: 'variant', type: 'dialog | confirm | otp | command | lightbox | wizard | form | drawer | share | sheet | notice | auth', defaultValue: 'dialog', description: 'Dialog product. Anatomy differs, not only the edge it enters from.' },
      { name: 'inline', type: 'boolean', defaultValue: 'false', description: 'Renders the panel in place for galleries. Skips portal and focus trap.' },
      { name: 'title', type: 'ReactNode', description: 'Required name of the dialog.' },
    ],
    Demo: ModalDemo,
  },
  {
    slug: 'hero',
    name: 'Hero',
    category: 'Sections',
    description: 'Twelve marketing pages: SaaS, app, cinema, logos, pricing, studio, shop, event, search, product, journal, waitlist.',
    path: 'src/components/ui/hero.tsx',
    dependencies: motionDeps,
    registryDependencies: ['utils'],
    usage: `import { Hero } from '@/components/ui/hero'
import { Button } from '@/components/ui/button'

export function Example() {
  return (
    <Hero
      variant="saas"
      title="Ship the interface your team already described"
      actions={<Button>Begin</Button>}
    />
  )
}`,
    props: [
      { name: 'variant', type: 'saas | app | cinema | logos | pricing | studio | shop | event | search | product | journal | waitlist', description: 'Hero product. When omitted, align center selects saas and align split selects product.' },
      { name: 'title', type: 'ReactNode', description: 'Rendered in an h2 unless titleAs is set.' },
      { name: 'actions / media', type: 'ReactNode', description: 'Slots.' },
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
  return <Marquee variant="logos" duration={24} />
}`,
    props: [
      { name: 'variant', type: 'logos | quotes | ticker | avatars | stats | products | changelog | tags | reviews | apps | metrics | awards', defaultValue: 'logos', description: 'Track product. Omitting children shows that product’s sample.' },
      { name: 'duration', type: 'number', defaultValue: '28', description: 'Seconds for one full loop.' },
      { name: 'showControls', type: 'boolean', defaultValue: 'true', description: 'Shows a pause button.' },
    ],
    Demo: MarqueeDemo,
  },
  {
    slug: 'input',
    name: 'Input',
    category: 'Forms',
    description: 'Twelve field constructions, from a hairline box to OTP, file, tags, and a floating label.',
    path: 'src/components/ui/input.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Input } from '@/components/ui/input'

export function Example() {
  return <Input variant="search" placeholder="Search the library" />
}`,
    props: [
      { name: 'variant', type: 'outline | filled | underline | ghost | search | otp | file | password | amount | tag | command | floating', defaultValue: 'outline', description: 'Field construction.' },
      { name: 'label / hint', type: 'ReactNode', description: 'Optional caption and helper.' },
    ],
    Demo: InputDemo,
  },
  {
    slug: 'tabs',
    name: 'Tabs',
    category: 'Forms',
    description: 'Ten tab anatomies: underline, pill, segmented, vertical, icon, card, folder, minimal, badge, rail.',
    path: 'src/components/ui/tabs.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Tabs } from '@/components/ui/tabs'

export function Example() {
  return <Tabs variant="underline" items={[{ id: 'a', label: 'Rooms', panel: 'Open.' }]} />
}`,
    props: [
      { name: 'variant', type: 'underline | pill | segmented | vertical | icon | card | folder | minimal | badge | rail', defaultValue: 'underline', description: 'Tab anatomy.' },
      { name: 'items', type: '{ id, label, panel, count? }[]', description: 'Tabs and their panels.' },
    ],
    Demo: TabsDemo,
  },
  {
    slug: 'accordion',
    name: 'Accordion',
    category: 'Forms',
    description: 'Ten disclosure constructions, including numbered, FAQ, media, and timeline.',
    path: 'src/components/ui/accordion.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Accordion } from '@/components/ui/accordion'

export function Example() {
  return <Accordion variant="plus" items={[{ id: 'a', title: 'Install?', content: 'Copy the file.' }]} />
}`,
    props: [
      { name: 'variant', type: 'plus | chevron | bordered | separated | flush | numbered | icon | media | faq | timeline', defaultValue: 'plus', description: 'Disclosure anatomy.' },
      { name: 'type', type: "'single' | 'multiple'", defaultValue: 'single', description: 'One open row, or many.' },
    ],
    Demo: AccordionDemo,
  },
  {
    slug: 'tooltip',
    name: 'Tooltip',
    category: 'Feedback',
    description: 'Ten hint constructions, from a chip to a metric card.',
    path: 'src/components/ui/tooltip.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Tooltip } from '@/components/ui/tooltip'

export function Example() {
  return <Tooltip variant="kbd" content="⌘K">Hover</Tooltip>
}`,
    props: [
      { name: 'variant', type: 'default | inverse | rich | kbd | success | warning | follow | plain | avatar | metric', defaultValue: 'default', description: 'Hint anatomy.' },
      { name: 'content', type: 'ReactNode', description: 'The hint.' },
      { name: 'defaultOpen', type: 'boolean', defaultValue: 'false', description: 'Show the hint at rest, used by the gallery.' },
    ],
    Demo: TooltipDemo,
  },
  {
    slug: 'toast',
    name: 'Toast',
    category: 'Feedback',
    description: 'Ten notification constructions, including action, progress, avatar, compact, and stacked.',
    path: 'src/components/ui/toast.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Toast } from '@/components/ui/toast'

export function Example() {
  return <Toast variant="success" title="Export ready" />
}`,
    props: [
      { name: 'variant', type: 'success | error | warning | info | loading | action | progress | avatar | compact | stacked', defaultValue: 'info', description: 'Notification construction.' },
      { name: 'title / description', type: 'string', description: 'Copy.' },
    ],
    Demo: ToastDemo,
  },
  {
    slug: 'avatar',
    name: 'Avatar',
    category: 'Identity',
    description: 'Ten identity constructions: image, initials, status, group, square, ring, upload, icon, story, mention.',
    path: 'src/components/ui/avatar.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Avatar } from '@/components/ui/avatar'

export function Example() {
  return <Avatar variant="status" name="Ada Klein" />
}`,
    props: [
      { name: 'variant', type: 'image | initials | status | group | square | ring | upload | icon | story | mention', defaultValue: 'initials', description: 'Identity construction.' },
      { name: 'name', type: 'string', defaultValue: 'Ada Klein', description: 'Used for initials and the mention label.' },
    ],
    Demo: AvatarDemo,
  },
  {
    slug: 'badge',
    name: 'Badge',
    category: 'Identity',
    description: 'Ten status chips, including count, removable, glow, and a corner ribbon.',
    path: 'src/components/ui/badge.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Badge } from '@/components/ui/badge'

export function Example() {
  return <Badge variant="status">Passing</Badge>
}`,
    props: [
      { name: 'variant', type: 'solid | soft | outline | dot | count | status | removable | icon | glow | ribbon', defaultValue: 'soft', description: 'Chip construction.' },
    ],
    Demo: BadgeDemo,
  },
  {
    slug: 'pricing',
    name: 'Pricing',
    category: 'Sections',
    description: 'Ten pricing sections: cards, toggle, compare, featured, usage, compact, enterprise, hobby, table, stacked.',
    path: 'src/components/ui/pricing.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Pricing } from '@/components/ui/pricing'

export function Example() {
  return <Pricing variant="featured" />
}`,
    props: [
      { name: 'variant', type: 'cards | toggle | compare | featured | usage | compact | enterprise | hobby | table | stacked', defaultValue: 'cards', description: 'Section anatomy.' },
    ],
    Demo: PricingDemo,
  },
  {
    slug: 'testimonials',
    name: 'Testimonials',
    category: 'Sections',
    description: 'Ten social-proof constructions: quote, grid, wall, slider, tweet, video, stat, logo, stacked, featured.',
    path: 'src/components/ui/testimonials.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Testimonials } from '@/components/ui/testimonials'

export function Example() {
  return <Testimonials variant="grid" />
}`,
    props: [
      { name: 'variant', type: 'quote | grid | wall | slider | tweet | video | stat | logo | stacked | featured', defaultValue: 'quote', description: 'Social-proof anatomy.' },
    ],
    Demo: TestimonialsDemo,
  },
  {
    slug: 'footer',
    name: 'Footer',
    category: 'Sections',
    description: 'Ten closing constructions: mega, compact, centered, newsletter, app, legal, social, sitemap, brand, split.',
    path: 'src/components/ui/footer.tsx',
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { Footer } from '@/components/ui/footer'

export function Example() {
  return <Footer variant="mega" />
}`,
    props: [
      { name: 'variant', type: 'mega | compact | centered | newsletter | app | legal | social | sitemap | brand | split', defaultValue: 'mega', description: 'Footer anatomy.' },
    ],
    Demo: FooterDemo,
  },
]

export const categories = ['Cards', 'Buttons', 'Backgrounds', 'Text', 'Navigation', 'Overlays', 'Forms', 'Feedback', 'Identity', 'Sections'] as const
