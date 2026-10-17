import { type ReactNode } from 'react'
import { ModalPreview, NavPreview } from '@/docs/preview-frames.tsx'
import { Accordion } from '@/components/ui/accordion.tsx'
import { AuroraBackground } from '@/components/ui/aurora-background.tsx'
import { Avatar } from '@/components/ui/avatar.tsx'
import { Badge } from '@/components/ui/badge.tsx'
import { BentoItem } from '@/components/ui/bento-grid.tsx'
import { Button } from '@/components/ui/button.tsx'
import { DraggableCard } from '@/components/ui/draggable-card.tsx'
import { FlipCard } from '@/components/ui/flip-card.tsx'
import { Footer } from '@/components/ui/footer.tsx'
import { GradientText } from '@/components/ui/gradient-text.tsx'
import { GridBackground } from '@/components/ui/grid-background.tsx'
import { Hero } from '@/components/ui/hero.tsx'
import { Input } from '@/components/ui/input.tsx'
import { MagneticButton, type MagnetStyle } from '@/components/ui/magnetic-button.tsx'
import { Marquee, type MarqueeVariant } from '@/components/ui/marquee.tsx'
import { type ModalVariant } from '@/components/ui/modal.tsx'
import { Pricing } from '@/components/ui/pricing.tsx'
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
    return (
      <Button variant={id as ButtonProps['variant']}>
        {id === 'social' ? 'Atlas' : id === 'icon' ? 'Go' : id === 'destructive' ? 'Delete' : 'Continue'}
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
    return (
      <div className="overflow-hidden rounded-2xl border border-nx-border bg-nx-bg">
        <Hero
          variant={id as HeroProps['variant']}
          titleAs="h3"
          eyebrow="Nexara"
          title={
            id === 'shop'
              ? 'Lamp 04'
              : id === 'event'
                ? 'Harbor Hall'
                : id === 'journal'
                  ? 'Issue 18'
                  : 'Ship the interface your team already described'
          }
          description="Real product copy. No lorem. Swap the title, actions, and media."
          actions={<Button size="sm">Begin</Button>}
          className="px-4 py-8 md:py-10"
          titleClassName="text-3xl md:text-4xl"
        />
      </div>
    )
  }
  if (slug === 'marquee') return <Marquee variant={id as MarqueeVariant} duration={18} showControls={false} />
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
  return null
}
