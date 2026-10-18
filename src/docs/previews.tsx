import { type ReactNode } from 'react'
import { ModalPreview, NavPreview } from '@/docs/preview-frames.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { Activity } from '@/components/ui/activity.tsx'
import { AppShell } from '@/components/ui/app-shell.tsx'
import { AuroraBackground } from '@/components/ui/aurora-background.tsx'
import { Avatar } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { BentoItem } from '@/components/ui/bento-grid.tsx'
import { Button } from '@/components/ui/button.tsx'
import { CaseStudy } from '@/components/ui/case-study.tsx'
import { Chapters } from '@/components/ui/chapters.tsx'
import { ChartBlock } from '@/components/ui/chart-block.tsx'
import { CommandPalette } from '@/components/ui/command-palette.tsx'
import { Contact } from '@/components/ui/contact.tsx'
import { Countdown } from '@/components/ui/countdown.tsx'
import { CtaBand } from '@/components/ui/cta-band.tsx'
import { DataTable } from '@/components/ui/data-table.tsx'
import { DraggableCard } from '@/components/ui/draggable-card.tsx'
import { FlipCard } from '@/components/ui/flip-card.tsx'
import { Footer } from '@/components/ui/footer.tsx'
import { GradientText } from '@/components/ui/gradient-text.tsx'
import { GridBackground } from '@/components/ui/grid-background.tsx'
import { Hero } from '@/components/ui/hero.tsx'
import { Input } from '@/components/ui/input.tsx'
import { KanbanBoard } from '@/components/ui/kanban-board.tsx'
import { Kit } from '@/components/ui/kit.tsx'
import { Kpi } from '@/components/ui/kpi.tsx'
import { Leaderboard } from '@/components/ui/leaderboard.tsx'
import { LogoCloud } from '@/components/ui/logo-cloud.tsx'
import { MagneticButton, type MagnetStyle } from '@/components/ui/magnetic-button.tsx'
import { Marquee, type MarqueeVariant } from '@/components/ui/marquee.tsx'
import { type ModalVariant } from '@/components/ui/modal.tsx'
import { News } from '@/components/ui/news.tsx'
import { Pricing } from '@/components/ui/pricing.tsx'
import { Process } from '@/components/ui/process.tsx'
import { Services } from '@/components/ui/services.tsx'
import { SettingsPanel } from '@/components/ui/settings-panel.tsx'
import { Stats } from '@/components/ui/stats.tsx'
import { Team } from '@/components/ui/team.tsx'
import { SpotlightCard } from '@/components/ui/spotlight-card.tsx'
import { Tabs } from '@/components/ui/tabs.tsx'
import { Testimonials } from '@/components/ui/testimonials.tsx'
import { TextReveal } from '@/components/ui/text-reveal.tsx'
import { Toast } from '@/components/ui/toast.tsx'
import { Tooltip } from '@/components/ui/tooltip.tsx'
import { Typewriter, type TypewriterVariant } from '@/components/ui/typewriter.tsx'
import type { ButtonProps } from '@/components/ui/button.tsx'
import type { DraggableCardProps } from '@/components/ui/draggable-card.tsx'
import type { FlipCardProps } from '@/components/ui/flip-card.tsx'
import type { FloatingNavbarProps } from '@/components/ui/floating-navbar.tsx'
import type { GradientTextProps } from '@/components/ui/gradient-text.tsx'
import type { GridBackgroundProps } from '@/components/ui/grid-background.tsx'
import type { HeroProps } from '@/components/ui/hero.tsx'
import type { AuroraBackgroundProps } from '@/components/ui/aurora-background.tsx'
import type { SpotlightCardProps } from '@/components/ui/spotlight-card.tsx'
import type { BentoItemProps } from '@/components/ui/bento-grid.tsx'
import type { TextRevealProps } from '@/components/ui/text-reveal.tsx'
import type { InputProps } from '@/components/ui/input.tsx'
import type { TabsProps } from '@/components/ui/tabs.tsx'
import type { AccordionProps } from '@/components/ui/accordion.tsx'
import type { TooltipProps } from '@/components/ui/tooltip.tsx'
import type { ToastProps } from '@/components/ui/toast.tsx'
import type { AvatarProps } from '@/components/ui/avatar.tsx'
import type { BadgeProps } from '@/components/ui/badge.tsx'
import type { PricingProps } from '@/components/ui/pricing.tsx'
import type { TestimonialsProps } from '@/components/ui/testimonials.tsx'
import type { FooterProps } from '@/components/ui/footer.tsx'

const phrases = ['deliberate.', 'movable.', 'alive.']
const tabItems = [
  { id: 'rooms', label: 'Rooms', count: 24, panel: '24 rooms are open this week across Harbor and Atlas.' },
  { id: 'library', label: 'Library', count: 128, panel: '128 components ready to copy into a product.' },
  { id: 'export', label: 'Export', count: 6, panel: 'Six packs sit in the queue.' },
]
const faqItems = [
  { id: 'a', title: 'Do I install a package?', content: 'No. Copy the component file and src/lib/utils.ts.' },
  { id: 'b', title: 'Light and dark?', content: 'Yes. Surfaces read CSS tokens from the page theme.' },
  { id: 'c', title: 'How do agents find a variant?', content: 'Ask for component / variant. Names are kebab-case.' },
]

function heroCopy(id: string) {
  const map: Record<string, { eyebrow: string; title: string; description: string; action: string }> = {
    saas: { eyebrow: 'Component registry', title: 'Ship the interface your team already described', description: 'A product window beside the pitch. Swap the title, actions, and media.', action: 'Browse the registry' },
    app: { eyebrow: 'iOS and Android', title: 'Take the room with you', description: 'Store badges and a pair of phones. The mast travels.', action: 'Get the app' },
    cinema: { eyebrow: 'Watch', title: 'Harbor after dark', description: 'A reel, a play control, and a title that sits on the grade.', action: 'Visit Harbor' },
    logos: { eyebrow: 'Trusted in production', title: 'Studios already here', description: 'A logo row and a quote from Harbor.', action: 'See the list' },
    pricing: { eyebrow: 'Pricing', title: 'One plan for the desk', description: 'The price card leads. $48, three includes, a start.', action: 'Start Studio' },
    studio: { eyebrow: 'Studio index', title: 'Move the furniture', description: 'A typographic masthead. Folio on the right, rule under the title.', action: 'Open the index' },
    shop: { eyebrow: 'In stock', title: 'Lamp 04', description: 'A stage, a price, and four finishes.', action: 'Add to bag' },
    event: { eyebrow: '12 Nov · Harbor Hall', title: 'Harbor Hall', description: 'Date, place, and a countdown.', action: 'Reserve a seat' },
    search: { eyebrow: 'Library', title: 'Find a component', description: 'Search is the primary action.', action: 'Search' },
    product: { eyebrow: 'This week', title: 'Twenty-four rooms open', description: 'App chrome, a sidebar, and three metric tiles.', action: 'Open overview' },
    journal: { eyebrow: 'The journal', title: 'Issue 18', description: 'A magazine cover beside the feature.', action: 'Read the issue' },
    waitlist: { eyebrow: '2,400 already in', title: 'Ask for a seat', description: 'Avatars, a count, and an email field.', action: '' },
    'ac-remote': { eyebrow: 'Harbor Climate', title: 'Cooling that stays commissioned.', description: 'Power, temperature, mode, and fan on a live remote bar.', action: 'Ask for a plant walk' },
    divisions: { eyebrow: 'The premise', title: 'One core. Three forces.', description: 'Academy, Labs, and Studio under one roof.', action: 'Meet the desk' },
    'four-doors': { eyebrow: 'Lumen Care', title: 'Four doors, one floor.', description: 'Therapy, consult, pharmacy, lab.', action: 'Book a chair' },
    wordmark: { eyebrow: 'A studio in the dark', title: 'NORTH', description: 'Giant inverted wordmark on a night field.', action: 'Write the brief' },
    clinic: { eyebrow: 'Private care', title: 'Heart care, considered.', description: 'Sixteen specialists. The file is read first.', action: 'Request a slot' },
    sports: { eyebrow: 'Field Athletics', title: 'A season you can stand on.', description: 'Athletes, clubs, coaches, and a medal book.', action: 'See the championships' },
    editorial: { eyebrow: 'Collage', title: 'We grow engineers.', description: 'Open type closed by a picture grid.', action: 'Join the room' },
    fan: { eyebrow: 'Lookbook', title: 'Three cuts of the same room.', description: 'A fan of cards under the title.', action: 'Browse' },
    'glass-fold': { eyebrow: 'After dark', title: 'The desk after dark.', description: 'A frosted plate on a dusk field.', action: 'Enter' },
    'split-cards': { eyebrow: 'Clients', title: 'Bring the dealer to the plant.', description: 'Pitch beside live project cards.', action: 'Open a case' },
    device: { eyebrow: 'Portal', title: 'Reports without the waiting room.', description: 'Browser chrome under the pitch.', action: 'Open Agency OS' },
    devtool: { eyebrow: 'CLI', title: 'npx nexara add hero', description: 'Monospace installer landing.', action: 'Copy the command' },
    fashion: { eyebrow: 'Summer 2026', title: 'Summer cut.', description: 'Split lookbook mast.', action: 'See the look' },
    spiral: { eyebrow: 'Field', title: 'Turn the season.', description: 'A conic field with a void.', action: 'Enter' },
    liquid: { eyebrow: 'Wash', title: 'The room dissolves.', description: 'Soft orbs behind the title.', action: 'Continue' },
    tilted: { eyebrow: 'Grid', title: 'A floor you can tilt.', description: 'Perspective tiles under the pitch.', action: 'Tilt' },
    enterprise: { eyebrow: 'SOC 2 · SSO', title: 'The desk that passes review.', description: 'Dual CTA for security teams.', action: 'Talk to us' },
    featured: { eyebrow: 'Featured', title: 'Wren Build, quoted in a day.', description: 'A featured project beside the pitch.', action: 'Read the case' },
    'pin-scroll': { eyebrow: 'Scroll the plate', title: 'The hero is the transition', description: 'A media plate that grows from a card to a field.', action: 'Keep scrolling' },
    'shader-void': { eyebrow: 'Void field', title: 'The room opens.', description: 'A WebGL mesh that follows the pointer.', action: 'Enter the void' },
    'scramble-mast': { eyebrow: 'Lettering', title: 'Hold the mast', description: 'Masked display type that settles, then scrambles on hover.', action: 'Read the folio' },
    'globe-orbit': { eyebrow: 'Orbit', title: 'Studios in motion', description: 'A projected sphere with orbiting marks.', action: 'See the rooms' },
    'morph-stage': { eyebrow: 'Shared element', title: 'Open the stage', description: 'A wordmark that becomes a live mesh.', action: 'Open the stage' },
  }
  return map[id] ?? map.saas!
}

export function renderVariantPreview(slug: string, id: string): ReactNode {
  if (slug === 'draggable-card') {
    return (
      <DraggableCard variant={id as DraggableCardProps['variant']} bounds="parent" stageClassName="min-h-52" className="max-w-[16rem]">
        <p className="text-lg font-medium capitalize">{id}</p>
        <p className="mt-1 text-sm text-nx-muted">Drag inside the frame.</p>
      </DraggableCard>
    )
  }
  if (slug === 'spotlight-card') {
    return <SpotlightCard variant={id as SpotlightCardProps['variant']} className="min-h-36 max-w-sm" />
  }
  if (slug === 'flip-card') {
    return <FlipCard variant={id as FlipCardProps['variant']} className="h-52 max-w-sm" label={id} />
  }
  if (slug === 'bento-grid') {
    return <BentoItem variant={id as BentoItemProps['variant']} title={id} description="A tile you can drop into any grid." className="min-h-36" />
  }
  if (slug === 'button') {
    const label =
      id === 'social'
        ? 'Atlas'
        : id === 'icon' || id === 'fab'
          ? 'Go'
          : id === 'destructive'
            ? 'Delete'
            : id === 'store'
              ? 'App Store'
              : id === 'swap'
                ? 'Start a brief'
                : id === 'success'
                  ? 'Saved'
                  : id === 'progress'
                    ? 'Saving 62%'
                    : id === 'toggle'
                      ? 'Live view'
                      : id === 'flow'
                        ? 'Book a room'
                        : id === 'badge' || id === 'notify'
                          ? 'Inbox'
                          : 'Continue'
    return (
      <Button variant={id as ButtonProps['variant']} count={3} progress={62} state={id === 'success' ? 'success' : 'idle'}>
        {label}
      </Button>
    )
  }
  if (slug === 'magnetic-button') {
    return <MagneticButton magnet={id as MagnetStyle}>{id}</MagneticButton>
  }
  if (slug === 'aurora-background') {
    return (
      <AuroraBackground variant={id as AuroraBackgroundProps['variant']} className="min-h-40 rounded-2xl" contentClassName="flex min-h-40 items-end p-5">
        <p className="font-serif text-2xl text-white">{id}</p>
      </AuroraBackground>
    )
  }
  if (slug === 'grid-background') {
    return (
      <GridBackground variant={id as GridBackgroundProps['variant']} className="min-h-40 rounded-2xl" contentClassName="flex min-h-40 items-end p-5">
        <p className="text-sm">{id}</p>
      </GridBackground>
    )
  }
  if (slug === 'gradient-text') {
    return (
      <p className="font-serif text-4xl leading-tight md:text-5xl">
        <GradientText variant={id as GradientTextProps['variant']}>Night, gold, and iris.</GradientText>
      </p>
    )
  }
  if (slug === 'typewriter') {
    return (
      <p className="font-serif text-3xl">
        <Typewriter variant={id as TypewriterVariant} phrases={phrases} />
      </p>
    )
  }
  if (slug === 'text-reveal') {
    return <TextReveal variant={id as TextRevealProps['variant']} className="max-w-xl font-serif text-3xl" text="A line that arrives with its own motion." />
  }
  if (slug === 'floating-navbar') return <NavPreview variant={id as NonNullable<FloatingNavbarProps['variant']>} />
  if (slug === 'modal') return <ModalPreview variant={id as ModalVariant} />
  if (slug === 'hero') {
    const copy = heroCopy(id)
    return (
      <div className="overflow-hidden rounded-2xl border border-nx-border bg-nx-bg">
        <Hero
          variant={id as HeroProps['variant']}
          titleAs="h3"
          eyebrow={copy.eyebrow}
          title={copy.title}
          description={copy.description}
          actions={copy.action ? <Button size="sm">{copy.action}</Button> : undefined}
          className="px-4 py-8 md:py-10"
          titleClassName="text-3xl md:text-4xl"
        />
      </div>
    )
  }
  if (slug === 'marquee') return <Marquee variant={id as MarqueeVariant} duration={18} />
  if (slug === 'input') return <Input variant={id as InputProps['variant']} placeholder="Harbor" label={id === 'floating' ? 'Studio' : undefined} />
  if (slug === 'tabs') return <Tabs variant={id as TabsProps['variant']} items={tabItems} />
  if (slug === 'accordion') return <Accordion variant={id as AccordionProps['variant']} items={faqItems} />
  if (slug === 'tooltip') {
    return (
      <div className="flex justify-center py-8">
        <Tooltip variant={id as TooltipProps['variant']} content="Jump any room" defaultOpen>
          <Button size="sm">Hover</Button>
        </Tooltip>
      </div>
    )
  }
  if (slug === 'toast') return <Toast variant={id as ToastProps['variant']} />
  if (slug === 'avatar') return <Avatar variant={id as AvatarProps['variant']} />
  if (slug === 'badge') {
    return (
      <div className="relative h-16">
        <Badge variant={id as BadgeProps['variant']}>{id === 'count' ? '12' : 'Live'}</Badge>
      </div>
    )
  }
  if (slug === 'pricing') return <Pricing variant={id as PricingProps['variant']} />
  if (slug === 'testimonials') return <Testimonials variant={id as TestimonialsProps['variant']} />
  if (slug === 'footer') return <Footer variant={id as FooterProps['variant']} />
  const simple = {
    stats: Stats,
    countdown: Countdown,
    leaderboard: Leaderboard,
    'case-study': CaseStudy,
    services: Services,
    process: Process,
    team: Team,
    contact: Contact,
    'cta-band': CtaBand,
    chapters: Chapters,
    news: News,
    'logo-cloud': LogoCloud,
    'app-shell': AppShell,
    kpi: Kpi,
    'data-table': DataTable,
    'kanban-board': KanbanBoard,
    'chart-block': ChartBlock,
    activity: Activity,
    'command-palette': CommandPalette,
    'settings-panel': SettingsPanel,
    kit: Kit,
  } as const
  const Preview = simple[slug as keyof typeof simple]
  if (Preview) return <Preview variant={id as never} />
  return null
}
