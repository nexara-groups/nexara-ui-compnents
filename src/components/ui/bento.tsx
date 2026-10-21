'use client'

import { type NxTier } from '@/lib/library.ts'
import { springs } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useState, type ReactNode } from 'react'

export const BENTO_VARIANTS = [
  'mosaic',
  'reel',
  'sheet',
  'well',
  'dock',
  'stage',
  'spec',
  'expand',
  'inspect',
  'desk',
  'reflow',
] as const

export type BentoVariant = (typeof BENTO_VARIANTS)[number]

export const BENTO_TIER_META: Record<BentoVariant, { tier: NxTier; title: string; note: string }> = {
  mosaic: { tier: 'basic', title: 'Mosaic', note: 'Ranked spans. One cell is twice the others.' },
  reel: { tier: 'basic', title: 'Reel', note: 'Equal proof cells in a strip.' },
  sheet: { tier: 'basic', title: 'Sheet', note: 'Paper compartments. Type and rules.' },
  well: { tier: 'basic', title: 'Well', note: 'Evidence crops. Caption is a caption.' },
  dock: { tier: 'intermediate', title: 'Dock', note: 'Cells host working instruments.' },
  stage: { tier: 'intermediate', title: 'Stage', note: 'An index drives one shared plate.' },
  spec: { tier: 'intermediate', title: 'Spec', note: 'The figure occupies the cell.' },
  expand: { tier: 'intermediate', title: 'Expand', note: 'The selected cell becomes the detail.' },
  inspect: { tier: 'advanced', title: 'Inspect', note: 'A control scrubs media inside one cell.' },
  desk: { tier: 'advanced', title: 'Desk', note: 'Named objects. They do not share a radius.' },
  reflow: { tier: 'advanced', title: 'Reflow', note: 'Focus reweights the mosaic.' },
}

export type BentoTile = {
  id: string
  title?: ReactNode
  description?: ReactNode
  media?: ReactNode
  figure?: ReactNode
  span?: 'hero' | 'wide' | 'tall' | 'cell'
  href?: string
}

export interface BentoProps {
  variant?: BentoVariant
  eyebrow?: ReactNode
  title?: ReactNode
  description?: ReactNode
  tiles?: BentoTile[]
  selected?: string
  onSelect?: (id: string) => void
  inspect?: number
  onInspect?: (value: number) => void
  className?: string
}

const display = 'font-[family-name:var(--nx-font-display,ui-serif,Georgia,serif)]'
const mono = 'font-[family-name:var(--nx-font-mono,ui-monospace,monospace)]'
const body = 'font-[family-name:var(--nx-font-body,ui-sans-serif,system-ui,sans-serif)]'

/**
 * Bento
 * Eleven section mechanisms. Not item chrome. Tokens only.
 * Copy this file plus `src/lib/utils.ts` and `src/lib/library.ts`.
 */
export function Bento({
  variant = 'mosaic',
  eyebrow,
  title,
  description,
  tiles = [],
  selected,
  onSelect,
  inspect,
  onInspect,
  className,
}: BentoProps) {
  return (
    <section
      data-nexara="bento"
      data-variant={variant}
      data-tier={BENTO_TIER_META[variant].tier}
      className={cn(body, 'px-4 py-12 md:px-8', className)}
      style={{ background: 'var(--nx-bg, inherit)', color: 'var(--nx-fg, inherit)' }}
    >
      <Header eyebrow={eyebrow} title={title} description={description} />
      {variant === 'reel' ? <Reel tiles={tiles} /> : null}
      {variant === 'sheet' ? <Sheet tiles={tiles} /> : null}
      {variant === 'well' ? <Well tiles={tiles} /> : null}
      {variant === 'dock' ? <Dock tiles={tiles} /> : null}
      {variant === 'stage' ? <Stage tiles={tiles} selected={selected} onSelect={onSelect} /> : null}
      {variant === 'spec' ? <Spec tiles={tiles} /> : null}
      {variant === 'expand' ? <Expand tiles={tiles} selected={selected} onSelect={onSelect} /> : null}
      {variant === 'inspect' ? <Inspect tiles={tiles} inspect={inspect} onInspect={onInspect} /> : null}
      {variant === 'desk' ? <Desk tiles={tiles} /> : null}
      {variant === 'reflow' ? <Reflow tiles={tiles} /> : null}
      {variant === 'mosaic' ? <Mosaic tiles={tiles} /> : null}
    </section>
  )
}

function Header({ eyebrow, title, description }: { eyebrow?: ReactNode; title?: ReactNode; description?: ReactNode }) {
  if (eyebrow == null && title == null && description == null) return null
  return (
    <header className="mx-auto mb-8 max-w-6xl">
      {eyebrow ? (
        <p className={cn(mono, 'text-[11px] tracking-[0.2em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
          {eyebrow}
        </p>
      ) : null}
      {title ? <h2 className={cn(display, 'mt-3 text-[clamp(2rem,5vw,3.4rem)] leading-none')}>{title}</h2> : null}
      {description ? (
        <p className="mt-3 max-w-xl text-base leading-7" style={{ color: 'var(--nx-muted, inherit)' }}>
          {description}
        </p>
      ) : null}
    </header>
  )
}

function Mosaic({ tiles }: { tiles: BentoTile[] }) {
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-4">
      {tiles.map((tile, index) => (
        <Cell
          key={tile.id}
          tile={tile}
          className={index === 0 ? 'md:col-span-2 md:row-span-2 min-h-72' : 'min-h-36'}
        />
      ))}
    </div>
  )
}

function Reel({ tiles }: { tiles: BentoTile[] }) {
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <Cell key={tile.id} tile={tile} className="min-h-44" />
      ))}
    </div>
  )
}

function Sheet({ tiles }: { tiles: BentoTile[] }) {
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto max-w-6xl border" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
      {tiles.map((tile) => (
        <article key={tile.id} className="grid gap-4 border-b px-5 py-6 md:grid-cols-[8rem_minmax(0,1fr)]" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
          <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
            {tile.figure ?? tile.id}
          </p>
          <div>
            {tile.title ? <h3 className={cn(display, 'text-2xl')}>{tile.title}</h3> : null}
            {tile.description ? <p className="mt-2 leading-7" style={{ color: 'var(--nx-muted, inherit)' }}>{tile.description}</p> : null}
          </div>
        </article>
      ))}
    </div>
  )
}

function Well({ tiles }: { tiles: BentoTile[] }) {
  const reduced = usePrefersReducedMotion()
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
      {tiles.map((tile) => (
        <motion.figure
          key={tile.id}
          initial={reduced ? false : { y: 12, opacity: 0.85 }}
          animate={{ y: 0, opacity: 1 }}
          transition={springs.heavy}
          className="min-h-56 overflow-hidden"
          style={{ background: 'var(--nx-elev, transparent)' }}
        >
          <div className="min-h-44 [&>*]:h-full [&>*]:w-full [&>*]:object-cover">{tile.media}</div>
          <figcaption className="px-3 py-3 text-sm">
            {tile.title}
            {tile.description ? (
              <span className="mt-1 block" style={{ color: 'var(--nx-muted, inherit)' }}>
                {tile.description}
              </span>
            ) : null}
          </figcaption>
        </motion.figure>
      ))}
    </div>
  )
}

function Dock({ tiles }: { tiles: BentoTile[] }) {
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
      {tiles.map((tile) => (
        <div key={tile.id} className="min-h-48 p-4" style={{ border: '1px solid var(--nx-line, currentColor)' }}>
          <p className={cn(mono, 'text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
            {tile.title}
          </p>
          <div className="mt-4 min-h-28">{tile.media ?? tile.description}</div>
        </div>
      ))}
    </div>
  )
}

function Stage({ tiles, selected, onSelect }: { tiles: BentoTile[]; selected?: string; onSelect?: (id: string) => void }) {
  const [current, setCurrent] = useState(selected ?? tiles[0]?.id ?? '')
  const active = tiles.find((tile) => tile.id === (selected ?? current))
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[16rem_minmax(0,1fr)]">
      <ol>
        {tiles.map((tile) => {
          const on = tile.id === (selected ?? current)
          return (
            <li key={tile.id}>
              <button
                type="button"
                aria-current={on ? 'true' : undefined}
                className="flex h-12 w-full items-center justify-between border-b text-left text-sm"
                style={{ borderColor: 'var(--nx-line, currentColor)', color: on ? 'var(--nx-accent, inherit)' : 'inherit' }}
                onClick={() => {
                  setCurrent(tile.id)
                  onSelect?.(tile.id)
                }}
              >
                {tile.title}
              </button>
            </li>
          )
        })}
      </ol>
      <div className="min-h-72 p-4" style={{ background: 'var(--nx-elev, transparent)' }}>
        <AnimatePresence mode="wait">
          <motion.div key={active?.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={springs.snap}>
            {active?.media ?? active?.description}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}

function Spec({ tiles }: { tiles: BentoTile[] }) {
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto grid max-w-6xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {tiles.map((tile) => (
        <article key={tile.id} className="p-5" style={{ border: '1px solid var(--nx-line, currentColor)' }}>
          <p className={cn(display, 'text-[clamp(2.4rem,6vw,4rem)] leading-none')}>{tile.figure ?? tile.title}</p>
          <p className={cn(mono, 'mt-3 text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
            {tile.description ?? tile.title}
          </p>
        </article>
      ))}
    </div>
  )
}

function Expand({ tiles, selected, onSelect }: { tiles: BentoTile[]; selected?: string; onSelect?: (id: string) => void }) {
  const [current, setCurrent] = useState(selected ?? tiles[0]?.id ?? '')
  const reduced = usePrefersReducedMotion()
  if (tiles.length === 0) return null
  return (
    <LayoutGroup>
      <div className="mx-auto grid max-w-6xl gap-3 md:grid-cols-3">
        {tiles.map((tile) => {
          const open = tile.id === (selected ?? current)
          return (
            <motion.button
              key={tile.id}
              layout
              type="button"
              onClick={() => {
                setCurrent(tile.id)
                onSelect?.(tile.id)
              }}
              className={cn('text-left', open ? 'md:col-span-2 min-h-64' : 'min-h-40')}
              style={{ background: 'var(--nx-elev, transparent)' }}
              transition={reduced ? { duration: 0 } : springs.ui}
            >
              <div className="p-5">
                <h3 className={cn(display, 'text-2xl')}>{tile.title}</h3>
                {open ? <p className="mt-3 leading-7" style={{ color: 'var(--nx-muted, inherit)' }}>{tile.description}</p> : null}
                {open ? <div className="mt-4">{tile.media}</div> : null}
              </div>
            </motion.button>
          )
        })}
      </div>
    </LayoutGroup>
  )
}

function Inspect({ tiles, inspect, onInspect }: { tiles: BentoTile[]; inspect?: number; onInspect?: (value: number) => void }) {
  const [value, setValue] = useState(inspect ?? 0.35)
  const lead = tiles[0]
  if (!lead) return null
  return (
    <div className="mx-auto max-w-6xl">
      <div className="relative min-h-80 overflow-hidden" style={{ background: 'var(--nx-elev, transparent)' }}>
        <div className="absolute inset-0 [&>*]:h-full [&>*]:w-full [&>*]:object-cover" style={{ clipPath: `inset(0 ${100 - value * 100}% 0 0)` }}>
          {lead.media}
        </div>
        <div className="absolute inset-y-0" style={{ left: `${value * 100}%`, width: 1, background: 'var(--nx-accent, currentColor)' }} />
      </div>
      <label className={cn(mono, 'mt-4 flex items-center gap-3 text-[11px] tracking-[0.16em] uppercase')}>
        <span style={{ color: 'var(--nx-muted, inherit)' }}>Inspect</span>
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={inspect ?? value}
          onChange={(event) => {
            const next = Number(event.target.value)
            setValue(next)
            onInspect?.(next)
          }}
          className="h-11 flex-1"
        />
      </label>
    </div>
  )
}

function Desk({ tiles }: { tiles: BentoTile[] }) {
  if (tiles.length === 0) return null
  const radii = [0, 28, 8, 999, 4, 18]
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap items-end gap-6">
      {tiles.map((tile, index) => (
        <article
          key={tile.id}
          className="min-h-40 min-w-40 p-4"
          style={{
            background: 'var(--nx-elev, transparent)',
            borderRadius: radii[index % radii.length],
            transform: `rotate(${(index % 2 === 0 ? -1 : 1) * (2 + index)}deg)`,
          }}
        >
          <h3 className={cn(display, 'text-xl')}>{tile.title}</h3>
          <div className="mt-3">{tile.media ?? tile.description}</div>
        </article>
      ))}
    </div>
  )
}

function Reflow({ tiles }: { tiles: BentoTile[] }) {
  const [hot, setHot] = useState<string | null>(null)
  const reduced = usePrefersReducedMotion()
  if (tiles.length === 0) return null
  return (
    <div className="mx-auto flex max-w-6xl flex-wrap gap-3">
      {tiles.map((tile) => {
        const focus = hot === tile.id
        return (
          <motion.article
            key={tile.id}
            onPointerEnter={() => setHot(tile.id)}
            onPointerLeave={() => setHot(null)}
            onFocus={() => setHot(tile.id)}
            onBlur={() => setHot(null)}
            tabIndex={0}
            animate={{ flexGrow: reduced ? 1 : focus ? 2.2 : 1, minHeight: focus ? 220 : 160 }}
            transition={springs.ui}
            className="min-w-[12rem] flex-1 p-5"
            style={{ background: 'var(--nx-elev, transparent)' }}
          >
            <h3 className={cn(display, 'text-2xl')}>{tile.title}</h3>
            {focus ? <p className="mt-3" style={{ color: 'var(--nx-muted, inherit)' }}>{tile.description}</p> : null}
          </motion.article>
        )
      })}
    </div>
  )
}

function Cell({ tile, className }: { tile: BentoTile; className?: string }) {
  const inner = (
    <>
      {tile.media}
      {tile.title ? <h3 className={cn(display, 'text-2xl')}>{tile.title}</h3> : null}
      {tile.description ? <p className="mt-2 text-sm leading-6" style={{ color: 'var(--nx-muted, inherit)' }}>{tile.description}</p> : null}
    </>
  )
  const cls = cn('p-5', className)
  const style = { background: 'var(--nx-elev, transparent)' }
  if (tile.href) {
    return (
      <a href={tile.href} className={cls} style={style}>
        {inner}
      </a>
    )
  }
  return (
    <article className={cls} style={style}>
      {inner}
    </article>
  )
}
