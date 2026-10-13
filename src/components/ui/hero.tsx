'use client'

import { motion } from 'framer-motion'
import { useId, type ReactNode } from 'react'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'

const heroItem = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: 'spring' as const, stiffness: 380, damping: 34 },
  },
}

const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
}

export interface HeroProps {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  align?: 'center' | 'split'
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
  titleAs?: 'h1' | 'h2' | 'h3'
}

/**
 * Hero
 * A marketing intro with centered or split layout and a staggered entrance.
 * Pass any node as `title` (for example gradient text) or `media`.
 */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  align = 'center',
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  mediaClassName,
  titleAs = 'h2',
}: HeroProps) {
  const reduced = usePrefersReducedMotion()
  const split = align === 'split'
  const titleId = useId()
  const TitleTag = titleAs

  return (
    <section data-nexara="hero" aria-labelledby={titleId} className={cn('relative px-6 py-16 md:px-10 md:py-24', className)}>
      <motion.div
        className={cn(
          'mx-auto grid w-full max-w-6xl items-center gap-10',
          split ? 'md:grid-cols-2' : 'justify-items-center text-center',
        )}
        initial={reduced ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.45 }}
        variants={reduced ? undefined : heroContainer}
      >
        <div className={cn(split ? 'max-w-xl' : 'max-w-3xl')}>
          {eyebrow ? (
            <motion.p
              variants={reduced ? undefined : heroItem}
              className={cn(
                'mb-5 inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.18em] text-zinc-300 uppercase',
                eyebrowClassName,
              )}
            >
              {eyebrow}
            </motion.p>
          ) : null}
          <motion.div variants={reduced ? undefined : heroItem}>
            <TitleTag
              id={titleId}
              className={cn(
                'font-serif text-4xl leading-[1.05] tracking-tight text-[#f6f3ec] text-balance md:text-6xl',
                titleClassName,
              )}
            >
              {title}
            </TitleTag>
          </motion.div>
          {description ? (
            <motion.p
              variants={reduced ? undefined : heroItem}
              className={cn(
                'mt-5 text-base leading-7 text-zinc-300 text-pretty md:text-lg',
                split ? 'max-w-lg' : 'mx-auto max-w-2xl',
                descriptionClassName,
              )}
            >
              {description}
            </motion.p>
          ) : null}
          {actions ? (
            <motion.div
              variants={reduced ? undefined : heroItem}
              className={cn('mt-8 flex flex-wrap items-center gap-3', !split && 'justify-center', actionsClassName)}
            >
              {actions}
            </motion.div>
          ) : null}
        </div>
        {media ? (
          <motion.div
            variants={reduced ? undefined : heroItem}
            className={cn('w-full', !split && 'max-w-xl justify-self-center', mediaClassName)}
          >
            {media}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}
