'use client'

import { type NxTier } from '@/lib/library.ts'
import { springs, useContainedPointer } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, motion } from 'framer-motion'
import { useMemo, useRef, useState, type ReactNode } from 'react'

export const TESTIMONIAL_VARIANTS = [
  'pull',
  'plate',
  'stack',
  'ledger',
  'cast',
  'pin',
  'film',
  'held',
  'wall',
  'reel',
  'voice',
] as const

export type TestimonialVariant = (typeof TESTIMONIAL_VARIANTS)[number]

export const TESTIMONIAL_TIER_META: Record<TestimonialVariant, { tier: NxTier; title: string; note: string }> = {
  pull: { tier: 'basic', title: 'Pull', note: 'Type is the voice. Hanging mark and rule.' },
  plate: { tier: 'basic', title: 'Plate', note: 'Photograph gets the plate.' },
  stack: { tier: 'basic', title: 'Stack', note: 'A deck. Top card speaks.' },
  ledger: { tier: 'basic', title: 'Ledger', note: 'Numbered entries in a document.' },
  cast: { tier: 'intermediate', title: 'Cast', note: 'Portrait index drives the quote.' },
  pin: { tier: 'intermediate', title: 'Pin', note: 'Pinboard. CSS columns.' },
  film: { tier: 'intermediate', title: 'Film', note: 'Sprocket strip. Visitor drags.' },
  held: { tier: 'intermediate', title: 'Held', note: 'One card opens into a plate.' },
  wall: { tier: 'advanced', title: 'Wall', note: 'Shallow 3D masonry. One key light.' },
  reel: { tier: 'advanced', title: 'Reel', note: 'Physics reel. Cards have mass.' },
  voice: { tier: 'advanced', title: 'Voice', note: 'Waveform and transcript.' },
}

export type Voice = {
  id: string
  quote: ReactNode
  name?: ReactNode
  role?: ReactNode
  portrait?: ReactNode
  audioSrc?: string
  transcript?: ReactNode
}

export interface TestimonialsProps {
  variant?: TestimonialVariant
  eyebrow?: ReactNode
  title?: ReactNode
  items?: Voice[]
  held?: string
  onHeldChange?: (id: string) => void
  className?: string
}

const display = 'font-[family-name:var(--nx-font-display,ui-serif,Georgia,serif)]'
const mono = 'font-[family-name:var(--nx-font-mono,ui-monospace,monospace)]'
const body = 'font-[family-name:var(--nx-font-body,ui-sans-serif,system-ui,sans-serif)]'

/**
 * Testimonials
 * Eleven mechanisms. No default quotes. Tokens only.
 */
export function Testimonials({
  variant = 'pull',
  eyebrow,
  title,
  items = [],
  held,
  onHeldChange,
  className,
}: TestimonialsProps) {
  return (
    <section
      data-nexara="testimonials"
      data-variant={variant}
      data-tier={TESTIMONIAL_TIER_META[variant].tier}
      className={cn(body, 'px-4 py-12 md:px-8', className)}
      style={{ background: 'var(--nx-bg, inherit)', color: 'var(--nx-fg, inherit)' }}
    >
      <div className="mx-auto max-w-6xl">
        <Header eyebrow={eyebrow} title={title} />
        {items.length === 0 ? null : (
          <>
            {variant === 'pull' ? <Pull item={items[0]} /> : null}
            {variant === 'plate' ? <Plate item={items[0]} /> : null}
            {variant === 'stack' ? <Stack items={items} /> : null}
            {variant === 'ledger' ? <Ledger items={items} /> : null}
            {variant === 'cast' ? <Cast items={items} /> : null}
            {variant === 'pin' ? <Pin items={items} /> : null}
            {variant === 'film' ? <Film items={items} /> : null}
            {variant === 'held' ? <Held items={items} held={held} onHeldChange={onHeldChange} /> : null}
            {variant === 'wall' ? <Wall items={items} /> : null}
            {variant === 'reel' ? <Reel items={items} /> : null}
            {variant === 'voice' ? <VoiceNote item={items[0]} /> : null}
          </>
        )}
      </div>
    </section>
  )
}

function Header({ eyebrow, title }: { eyebrow?: ReactNode; title?: ReactNode }) {
  if (eyebrow == null && title == null) return null
  return (
    <header className="mb-10">
      {eyebrow ? (
        <p className={cn(mono, 'text-[11px] tracking-[0.2em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className={cn(display, 'mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-none')}>{title}</h2> : null}
    </header>
  )
}

function Byline({ item }: { item: Voice }) {
  if (item.name == null && item.role == null) return null
  return (
    <footer className="mt-6 text-sm">
      {item.name ? <div>{item.name}</div> : null}
      {item.role ? <div style={{ color: 'var(--nx-muted, inherit)' }}>{item.role}</div> : null}
    </footer>
  )
}

function Pull({ item }: { item?: Voice }) {
  if (!item) return null
  return (
    <blockquote className="max-w-3xl">
      <span className={cn(display, 'block text-7xl leading-none')} aria-hidden="true" style={{ color: 'var(--nx-metal, inherit)' }}>
        “
      </span>
      <p className={cn(display, 'text-[clamp(1.8rem,4vw,3rem)] leading-[1.15]')}>{item.quote}</p>
      <div className="mt-6 h-px w-24" style={{ background: 'var(--nx-metal, currentColor)' }} />
      <Byline item={item} />
    </blockquote>
  )
}

function Plate({ item }: { item?: Voice }) {
  if (!item) return null
  return (
    <figure className="grid gap-6 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
      <div className="min-h-72 overflow-hidden" style={{ background: 'var(--nx-elev, transparent)' }}>
        {item.portrait}
      </div>
      <figcaption className="flex flex-col justify-end">
        <p className={cn(display, 'text-3xl leading-snug')}>{item.quote}</p>
        <Byline item={item} />
      </figcaption>
    </figure>
  )
}

function Stack({ items }: { items: Voice[] }) {
  const [index, setIndex] = useState(0)
  const item = items[index]
  if (!item) return null
  return (
    <div className="relative max-w-xl">
      {items.slice(index + 1, index + 3).map((_, i) => (
        <div
          key={i}
          className="absolute inset-x-3 top-3 h-full"
          style={{
            background: 'var(--nx-elev, transparent)',
            transform: `translateY(${(i + 1) * 8}px)`,
            opacity: 0.5 - i * 0.15,
          }}
          aria-hidden="true"
        />
      ))}
      <article className="relative p-6" style={{ background: 'var(--nx-elev, transparent)' }}>
        <p className={cn(display, 'text-2xl leading-snug')}>{item.quote}</p>
        <Byline item={item} />
        <div className="mt-6 flex gap-2">
          <button type="button" className="h-11 px-3" disabled={index === 0} onClick={() => setIndex((value) => value - 1)}>
            Prev
          </button>
          <button
            type="button"
            className="h-11 px-3"
            disabled={index >= items.length - 1}
            onClick={() => setIndex((value) => value + 1)}
          >
            Next
          </button>
        </div>
      </article>
    </div>
  )
}

function Ledger({ items }: { items: Voice[] }) {
  return (
    <ol>
      {items.map((item, index) => (
        <li key={item.id} className="grid gap-4 border-t py-6 md:grid-cols-[4rem_minmax(0,1fr)]" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
          <span className={cn(mono, 'text-[11px] tracking-[0.16em]')} style={{ color: 'var(--nx-muted, inherit)' }}>
            {String(index + 1).padStart(2, '0')}
          </span>
          <div>
            <p className="text-lg leading-7">{item.quote}</p>
            <Byline item={item} />
          </div>
        </li>
      ))}
    </ol>
  )
}

function Cast({ items }: { items: Voice[] }) {
  const [current, setCurrent] = useState(items[0]?.id ?? '')
  const item = items.find((voice) => voice.id === current) ?? items[0]
  if (!item) return null
  return (
    <div className="grid gap-8 lg:grid-cols-[12rem_minmax(0,1fr)]">
      <ul className="flex gap-3 lg:flex-col">
        {items.map((voice) => (
          <li key={voice.id}>
            <button
              type="button"
              aria-pressed={voice.id === current}
              onClick={() => setCurrent(voice.id)}
              className="size-16 overflow-hidden"
              style={{
                background: 'var(--nx-elev, transparent)',
                boxShadow: voice.id === current ? 'inset 0 0 0 2px var(--nx-accent, currentColor)' : undefined,
              }}
            >
              {voice.portrait ?? <span className="grid size-full place-items-center text-sm">{voice.name}</span>}
            </button>
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait">
        <motion.blockquote key={item.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={springs.snap}>
          <p className={cn(display, 'text-3xl leading-snug')}>{item.quote}</p>
          <Byline item={item} />
        </motion.blockquote>
      </AnimatePresence>
    </div>
  )
}

function Pin({ items }: { items: Voice[] }) {
  return (
    <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
      {items.map((item) => (
        <article key={item.id} className="mb-4 break-inside-avoid p-4" style={{ background: 'var(--nx-elev, transparent)' }}>
          <p>{item.quote}</p>
          <Byline item={item} />
        </article>
      ))}
    </div>
  )
}

function Film({ items }: { items: Voice[] }) {
  const scroller = useRef<HTMLDivElement>(null)
  return (
    <div
      ref={scroller}
      className="flex snap-x gap-4 overflow-x-auto pb-4"
      style={{ borderTop: '8px solid var(--nx-elev, currentColor)', borderBottom: '8px solid var(--nx-elev, currentColor)' }}
    >
      {items.map((item) => (
        <article
          key={item.id}
          className="w-[min(80vw,22rem)] shrink-0 snap-start p-5"
          style={{ background: 'var(--nx-elev, transparent)' }}
        >
          <div className="mb-4 min-h-32">{item.portrait}</div>
          <p>{item.quote}</p>
          <Byline item={item} />
        </article>
      ))}
    </div>
  )
}

function Held({
  items,
  held,
  onHeldChange,
}: {
  items: Voice[]
  held?: string
  onHeldChange?: (id: string) => void
}) {
  const [open, setOpen] = useState(held ?? '')
  const current = items.find((item) => item.id === (held ?? open))
  return (
    <div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <motion.button
            key={item.id}
            layout
            type="button"
            onClick={() => {
              setOpen(item.id)
              onHeldChange?.(item.id)
            }}
            className="p-4 text-left"
            style={{ background: 'var(--nx-elev, transparent)' }}
          >
            <p className="line-clamp-4">{item.quote}</p>
            <Byline item={item} />
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {current ? (
          <motion.blockquote
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mt-6 p-6"
            style={{ background: 'var(--nx-elev, transparent)' }}
          >
            <p className={cn(display, 'text-3xl')}>{current.quote}</p>
            <Byline item={current} />
          </motion.blockquote>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function Wall({ items }: { items: Voice[] }) {
  const reduced = usePrefersReducedMotion()
  const pointer = useContainedPointer<HTMLDivElement>()
  return (
    <div
      ref={pointer.ref}
      onPointerMove={pointer.onPointerMove}
      onPointerLeave={pointer.onPointerLeave}
      className="columns-1 gap-4 md:columns-2 lg:columns-3"
      style={{ perspective: 1200 }}
    >
      {items.map((item, index) => (
        <motion.article
          key={item.id}
          className="mb-4 break-inside-avoid p-4"
          style={{
            background: 'var(--nx-elev, transparent)',
            rotateY: reduced ? 0 : pointer.sx,
            rotateX: reduced ? 0 : pointer.sy,
            transformStyle: 'preserve-3d',
          }}
        >
          <p>{item.quote}</p>
          <Byline item={item} />
          <span className="sr-only">{index}</span>
        </motion.article>
      ))}
    </div>
  )
}

function Reel({ items }: { items: Voice[] }) {
  const reduced = usePrefersReducedMotion()
  const [order, setOrder] = useState(items.map((item) => item.id))
  const list = useMemo(() => order.map((id) => items.find((item) => item.id === id)).filter(Boolean) as Voice[], [items, order])
  const top = list[0]
  if (!top) return null
  return (
    <div className="max-w-md">
      <motion.article
        drag={reduced ? false : 'x'}
        dragConstraints={{ left: 0, right: 0 }}
        onDragEnd={(_, info) => {
          if (Math.abs(info.offset.x) > 80) {
            setOrder((current) => [...current.slice(1), current[0]!])
          }
        }}
        className="p-6"
        style={{ background: 'var(--nx-elev, transparent)' }}
        transition={springs.heavy}
      >
        <p className={cn(display, 'text-2xl')}>{top.quote}</p>
        <Byline item={top} />
      </motion.article>
      <p className={cn(mono, 'mt-4 text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
        Flick to restack
      </p>
    </div>
  )
}

function VoiceNote({ item }: { item?: Voice }) {
  const [playing, setPlaying] = useState(false)
  if (!item) return null
  return (
    <figure className="max-w-xl">
      <div className="flex items-end gap-1" aria-hidden="true">
        {Array.from({ length: 28 }).map((_, index) => (
          <span
            key={index}
            className="w-1"
            style={{
              height: `${8 + ((index * 17) % 36)}px`,
              background: playing && index < 12 ? 'var(--nx-accent, currentColor)' : 'var(--nx-line, currentColor)',
            }}
          />
        ))}
      </div>
      {item.audioSrc ? (
        <audio
          className="mt-4 w-full"
          src={item.audioSrc}
          controls
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
        />
      ) : (
        <button
          type="button"
          className="mt-4 h-11 px-4"
          style={{ border: '1px solid var(--nx-line, currentColor)' }}
          onClick={() => setPlaying((value) => !value)}
        >
          {playing ? 'Pause' : 'Play'}
        </button>
      )}
      <figcaption className="mt-6">
        <p>{item.transcript ?? item.quote}</p>
        <Byline item={item} />
      </figcaption>
    </figure>
  )
}
