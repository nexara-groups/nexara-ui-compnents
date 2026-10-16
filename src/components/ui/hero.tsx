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

const VARIANTS = [
  'center',
  'split',
  'mast',
  'cinematic',
  'statement',
  'bento',
  'overlap',
  'index',
  'band',
  'asymmetric',
  'stacked',
  'rail',
] as const

export type HeroVariant = (typeof VARIANTS)[number]

export interface HeroProps {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  /** Layout. When omitted, `align` still selects center or split. */
  variant?: HeroVariant
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
 * Twelve intro layouts. Title, actions, and media are slots.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  variant,
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
  const layout: HeroVariant = variant ?? (align === 'split' ? 'split' : 'center')
  const titleId = useId()
  const TitleTag = titleAs
  const centered = layout === 'center' || layout === 'stacked' || layout === 'mast'

  const eyebrowNode =
    eyebrow && layout !== 'rail' && layout !== 'index' ? (
      <motion.p
        variants={reduced ? undefined : heroItem}
        className={cn(
          layout === 'mast'
            ? 'mb-4 text-xs tracking-[0.28em] text-[#f5c16c] uppercase'
            : 'mb-5 inline-flex items-center rounded-full border border-white/15 px-3 py-1 text-xs tracking-[0.18em] text-zinc-300 uppercase',
          eyebrowClassName,
        )}
      >
        {eyebrow}
      </motion.p>
    ) : null

  const titleNode = (
    <motion.div variants={reduced ? undefined : heroItem}>
      <TitleTag
        id={titleId}
        className={cn(
          'font-serif leading-[0.95] tracking-tight text-[#f6f3ec] text-balance',
          layout === 'mast' && 'text-5xl md:text-8xl',
          layout === 'statement' && 'text-5xl md:text-7xl',
          layout === 'index' && 'text-3xl md:text-5xl',
          layout !== 'mast' && layout !== 'statement' && layout !== 'index' && 'text-4xl md:text-6xl',
          titleClassName,
        )}
      >
        {title}
      </TitleTag>
    </motion.div>
  )

  const descriptionNode = description ? (
    <motion.p
      variants={reduced ? undefined : heroItem}
      className={cn(
        'max-w-lg text-base leading-7 text-zinc-300 text-pretty md:text-lg',
        layout === 'statement' && 'md:text-base',
        centered && layout !== 'mast' && 'mx-auto',
        descriptionClassName,
      )}
    >
      {description}
    </motion.p>
  ) : null

  const actionsNode =
    actions && layout !== 'band' ? (
      <motion.div
        variants={reduced ? undefined : heroItem}
        className={cn('mt-8 flex flex-wrap items-center gap-3', centered && 'justify-center', actionsClassName)}
      >
        {actions}
      </motion.div>
    ) : null

  const mediaNode = media ? (
    <motion.div
      variants={reduced ? undefined : heroItem}
      className={cn('w-full', centered && 'max-w-xl justify-self-center', mediaClassName)}
    >
      {layout === 'bento' ? (
        <div className="grid grid-cols-5 grid-rows-2 gap-3">
          <div className="col-span-3 row-span-2 min-h-40 overflow-hidden rounded-2xl border border-white/10 bg-[#12131c] p-3">
            {media}
          </div>
          <div className="col-span-2 rounded-2xl bg-[#ff6a3d]" aria-hidden="true" />
          <div className="col-span-2 rounded-2xl bg-[#8b7cff]" aria-hidden="true" />
        </div>
      ) : (
        media
      )}
    </motion.div>
  ) : null

  const copy = (
    <>
      {eyebrowNode}
      {titleNode}
      {layout === 'mast' && description ? (
        <div className="mx-auto mt-6 w-full max-w-xl border-t border-[#f5c16c]/50 pt-5">{descriptionNode}</div>
      ) : null}
      {layout === 'mast' ? null : <div className="mt-5">{descriptionNode}</div>}
      {actionsNode}
    </>
  )

  const grid =
    layout === 'split' || layout === 'bento'
      ? 'md:grid-cols-2'
      : layout === 'asymmetric'
        ? 'md:grid-cols-5'
        : layout === 'overlap' || layout === 'statement'
          ? 'md:grid-cols-12'
          : layout === 'rail'
            ? 'md:grid-cols-[auto_minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-center'
            : layout === 'index'
              ? 'md:grid-cols-[4.5rem_minmax(0,1.2fr)_minmax(0,0.9fr)] md:items-baseline'
              : layout === 'mast'
                ? 'w-full text-left'
                : 'justify-items-center text-center'

  return (
    <section
      data-nexara="hero"
      data-variant={layout}
      aria-labelledby={titleId}
      className={cn(
        'relative px-6 py-16 md:px-10 md:py-24',
        layout === 'cinematic' && 'isolate flex min-h-[32rem] items-end overflow-hidden',
        layout === 'mast' && 'pt-10',
        className,
      )}
    >
      {layout === 'cinematic' && media ? <div className="absolute inset-0 z-0 opacity-80">{media}</div> : null}
      <motion.div
        className={cn('mx-auto grid w-full max-w-6xl items-center gap-8 md:gap-10', grid)}
        initial={reduced ? false : 'hidden'}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        variants={reduced ? undefined : heroContainer}
      >
        {layout === 'index' ? (
          <>
            <motion.p variants={reduced ? undefined : heroItem} className={cn('font-serif text-4xl text-[#f5c16c]', eyebrowClassName)}>
              {eyebrow ?? '01'}
            </motion.p>
            <div>
              {titleNode}
              {actionsNode}
            </div>
            <div>{descriptionNode}</div>
          </>
        ) : null}

        {layout === 'statement' ? (
          <>
            <div className="md:col-span-7">
              {eyebrowNode}
              {titleNode}
              {actionsNode}
            </div>
            <div className="md:col-span-5 md:pb-3">{descriptionNode}</div>
            {mediaNode ? <div className="md:col-span-12">{mediaNode}</div> : null}
          </>
        ) : null}

        {layout === 'overlap' ? (
          <>
            <div className="z-10 max-w-xl md:col-span-7 md:col-start-1 md:row-start-1">{copy}</div>
            {mediaNode ? <div className="md:col-span-7 md:col-start-6 md:row-start-1">{mediaNode}</div> : null}
          </>
        ) : null}

        {layout === 'rail' ? (
          <>
            <div className="md:flex md:h-full md:items-center md:pr-4">
              {eyebrow ? (
                <motion.p
                  variants={reduced ? undefined : heroItem}
                  className={cn(
                    'text-xs tracking-[0.22em] text-[#f5c16c] uppercase md:[writing-mode:vertical-rl]',
                    eyebrowClassName,
                  )}
                >
                  {eyebrow}
                </motion.p>
              ) : (
                <span className="hidden w-4 md:block" aria-hidden="true" />
              )}
            </div>
            <div>
              {titleNode}
              <div className="mt-5">{descriptionNode}</div>
              {actionsNode}
            </div>
            {mediaNode}
          </>
        ) : null}

        {layout === 'cinematic' ? <div className="relative z-10 max-w-3xl">{copy}</div> : null}
        {layout === 'mast' ? (
          <div className="w-full max-w-none text-left">
            <div className="flex items-end justify-between gap-6 border-b border-[#f6f3ec] pb-3">
              <p className="font-serif text-sm tracking-[0.28em] text-[#f5c16c] uppercase">{eyebrow ?? 'Nexara'}</p>
              <p className="text-xs tracking-[0.18em] text-zinc-400 uppercase">Vol. 04</p>
            </div>
            <div className="py-8 md:py-12">{titleNode}</div>
            <div className="grid gap-6 border-t border-white/15 pt-6 md:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)]">
              <div>{descriptionNode}</div>
              <div>{actionsNode}</div>
            </div>
            {mediaNode ? <div className="mt-8">{mediaNode}</div> : null}
          </div>
        ) : null}

        {layout === 'stacked' ? mediaNode : null}
        {layout === 'center' || layout === 'split' || layout === 'bento' || layout === 'band' || layout === 'asymmetric' || layout === 'stacked' ? (
          <div className={cn(layout === 'asymmetric' && 'md:col-span-3', (layout === 'split' || layout === 'bento') && 'max-w-xl', centered && 'max-w-3xl')}>
            {copy}
          </div>
        ) : null}
        {layout === 'center' || layout === 'split' || layout === 'bento' || layout === 'asymmetric' || layout === 'band' ? (
          <div className={cn(layout === 'asymmetric' && 'md:col-span-2')}>{mediaNode}</div>
        ) : null}
        {layout === 'band' && actions ? (
          <motion.div
            variants={reduced ? undefined : heroItem}
            className={cn('col-span-full flex flex-wrap items-center gap-3 border-t border-white/10 pt-6', actionsClassName)}
          >
            {actions}
          </motion.div>
        ) : null}
      </motion.div>
    </section>
  )
}
