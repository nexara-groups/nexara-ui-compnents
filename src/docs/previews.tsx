import { type ReactNode } from 'react'
import { ModalPreview, NavPreview } from '@/docs/preview-frames.tsx'
import { AuroraBackground } from '@/components/ui/aurora-background.tsx'
import { BentoItem } from '@/components/ui/bento-grid.tsx'
import { Button } from '@/components/ui/button.tsx'
import { DraggableCard } from '@/components/ui/draggable-card.tsx'
import { FlipCard } from '@/components/ui/flip-card.tsx'
import { GradientText } from '@/components/ui/gradient-text.tsx'
import { GridBackground } from '@/components/ui/grid-background.tsx'
import { Hero } from '@/components/ui/hero.tsx'
import { MagneticButton, type MagnetStyle } from '@/components/ui/magnetic-button.tsx'
import { Marquee, type MarqueeVariant } from '@/components/ui/marquee.tsx'
import { type ModalVariant } from '@/components/ui/modal.tsx'
import { SpotlightCard } from '@/components/ui/spotlight-card.tsx'
import { TextReveal } from '@/components/ui/text-reveal.tsx'
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

const phrases = ['deliberate.', 'movable.', 'alive.']

export function renderVariantPreview(slug: string, id: string): ReactNode {
  if (slug === 'draggable-card') {
    return (
      <DraggableCard variant={id as DraggableCardProps['variant']} bounds="parent" stageClassName="min-h-52" className="max-w-[16rem]">
        <p className="font-serif text-2xl capitalize">{id}</p>
        <p className="mt-1 text-sm text-zinc-400">Drag inside the frame.</p>
      </DraggableCard>
    )
  }
  if (slug === 'spotlight-card') {
    return (
      <SpotlightCard variant={id as SpotlightCardProps['variant']} className="min-h-36 max-w-sm">
        <p className="font-serif text-2xl capitalize">{id}</p>
        <p className="mt-2 text-sm text-zinc-300">Move the pointer across the face.</p>
      </SpotlightCard>
    )
  }
  if (slug === 'flip-card') {
    return (
      <FlipCard
        variant={id as FlipCardProps['variant']}
        className="h-52 max-w-sm"
        label={id}
      />
    )
  }
  if (slug === 'bento-grid') {
    return (
      <BentoItem variant={id as BentoItemProps['variant']} title={id} description="A tile treatment you can drop into any grid." className="min-h-36" />
    )
  }
  if (slug === 'button') {
    return (
      <Button variant={id as ButtonProps['variant']} radius={id === 'brutalist' || id === 'pressable' ? 'md' : 'full'}>
        {id === 'social' ? 'Atlas' : 'Continue'}
      </Button>
    )
  }
  if (slug === 'magnetic-button') {
    return (
      <MagneticButton magnet={id as MagnetStyle}>{id}</MagneticButton>
    )
  }
  if (slug === 'aurora-background') {
    return (
      <AuroraBackground variant={id as AuroraBackgroundProps['variant']} className="min-h-40 rounded-2xl" contentClassName="flex min-h-40 items-end p-5">
        <p className="font-serif text-2xl text-[#f6f3ec]">{id}</p>
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
    return (
      <TextReveal variant={id as TextRevealProps['variant']} className="max-w-xl font-serif text-3xl" text="A line that arrives with its own motion." />
    )
  }
  if (slug === 'floating-navbar') return <NavPreview variant={id as NonNullable<FloatingNavbarProps['variant']>} />
  if (slug === 'modal') return <ModalPreview variant={id as ModalVariant} />
  if (slug === 'hero') {
    return (
      <div className="overflow-hidden rounded-2xl border border-white/10">
        <Hero
          variant={id as HeroProps['variant']}
          titleAs="h3"
          title="Ship the first screen."
          description="A short line for the layout."
          actions={<Button size="sm">Read the docs</Button>}
          className="px-4 py-8 md:py-10"
          titleClassName="text-3xl md:text-4xl"
        />
      </div>
    )
  }
  if (slug === 'marquee') {
    return (
      <Marquee variant={id as MarqueeVariant} duration={18} showControls={false} />
    )
  }
  return null
}
