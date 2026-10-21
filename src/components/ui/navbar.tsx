'use client'

import { type NxTier } from '@/lib/library.ts'
import { springs, useFocusTrap } from '@/lib/kit.tsx'
import { cn, usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useId, useRef, useState, type ReactNode } from 'react'

export const NAVBAR_VARIANTS = [
  'rail',
  'capsule',
  'column',
  'path',
  'map',
  'command',
  'dock',
  'mast',
  'curtain',
  'island',
  'galley',
] as const

export type NavbarVariant = (typeof NAVBAR_VARIANTS)[number]

export const NAVBAR_TIER_META: Record<NavbarVariant, { tier: NxTier; title: string; note: string }> = {
  rail: { tier: 'basic', title: 'Rail', note: 'Full-bleed bar. Wordmark, destinations, one action.' },
  capsule: { tier: 'basic', title: 'Capsule', note: 'Detached pill. Four destinations.' },
  column: { tier: 'basic', title: 'Column', note: 'Vertical index with section labels.' },
  path: { tier: 'basic', title: 'Path', note: 'Crumb trail. Last node is here.' },
  map: { tier: 'intermediate', title: 'Map', note: 'Multi-column destination panel.' },
  command: { tier: 'intermediate', title: 'Command', note: 'The field is the navigation.' },
  dock: { tier: 'intermediate', title: 'Dock', note: 'Icons over captions from an edge.' },
  mast: { tier: 'intermediate', title: 'Mast', note: 'Large mark plus index disclosure.' },
  curtain: { tier: 'advanced', title: 'Curtain', note: 'Viewport of type. Focus trap.' },
  island: { tier: 'advanced', title: 'Island', note: 'One surface morphs job.' },
  galley: { tier: 'advanced', title: 'Galley', note: 'Ruled editorial cells. Fill, not glow.' },
}

export type NavItem = {
  id: string
  label: ReactNode
  href?: string
  current?: boolean
  description?: ReactNode
  children?: NavItem[]
}

export type NavColumn = { id: string; title: ReactNode; items: NavItem[] }
export type NavSection = { id: string; label: ReactNode; items: NavItem[] }

export interface NavbarProps {
  variant?: NavbarVariant
  logo?: ReactNode
  items?: NavItem[]
  columns?: NavColumn[]
  sections?: NavSection[]
  action?: ReactNode
  results?: ReactNode
  onQuery?: (value: string) => void
  query?: string
  edge?: 'top' | 'bottom'
  magnify?: boolean
  morph?: 'none' | 'control' | 'scroll'
  compact?: boolean
  defaultOpen?: string
  className?: string
}

const mono = 'font-[family-name:var(--nx-font-mono,ui-monospace,monospace)]'
const display = 'font-[family-name:var(--nx-font-display,ui-serif,Georgia,serif)]'
const body = 'font-[family-name:var(--nx-font-body,ui-sans-serif,system-ui,sans-serif)]'

/**
 * Navbar
 * Eleven mechanisms: rail, capsule, column, path, map, command, dock,
 * mast, curtain, island, galley. Tokens only. No brand defaults.
 * Copy this file plus `src/lib/utils.ts`, `src/lib/library.ts`, and `src/lib/kit.tsx`.
 */
export function Navbar({
  variant = 'rail',
  logo,
  items = [],
  columns,
  sections,
  action,
  results,
  onQuery,
  query,
  edge = 'top',
  magnify = false,
  morph = 'none',
  compact,
  defaultOpen,
  className,
}: NavbarProps) {
  const props = { logo, items, columns, sections, action, results, onQuery, query, edge, magnify, morph, compact, defaultOpen, className }
  if (variant === 'capsule') return <CapsuleNav {...props} />
  if (variant === 'column') return <ColumnNav {...props} />
  if (variant === 'path') return <PathNav {...props} />
  if (variant === 'map') return <MapNav {...props} />
  if (variant === 'command') return <CommandNav {...props} />
  if (variant === 'dock') return <DockNav {...props} />
  if (variant === 'mast') return <MastNav {...props} />
  if (variant === 'curtain') return <CurtainNav {...props} />
  if (variant === 'island') return <IslandNav {...props} />
  if (variant === 'galley') return <GalleyNav {...props} />
  return <RailNav {...props} />
}

type Base = Omit<NavbarProps, 'variant'>

function Shell({
  variant,
  className,
  children,
  as: Tag = 'nav',
}: {
  variant: NavbarVariant
  className?: string
  children: ReactNode
  as?: 'nav' | 'div'
}) {
  return (
    <Tag
      data-nexara="navbar"
      data-variant={variant}
      data-tier={NAVBAR_TIER_META[variant].tier}
      className={cn(body, className)}
      style={{ background: 'var(--nx-bg, inherit)', color: 'var(--nx-fg, inherit)' }}
      aria-label="Primary"
    >
      {children}
    </Tag>
  )
}

function Links({ items, className }: { items: NavItem[]; className?: string }) {
  if (items.length === 0) return null
  return (
    <ul className={cn('flex flex-wrap items-center gap-1', className)}>
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href}
            aria-current={item.current ? 'page' : undefined}
            className="inline-flex h-11 items-center px-3 text-sm"
            style={item.current ? { color: 'var(--nx-accent, inherit)' } : undefined}
          >
            {item.label}
          </a>
        </li>
      ))}
    </ul>
  )
}

function RailNav({ logo, items = [], action, className }: Base) {
  const [open, setOpen] = useState(false)
  return (
    <Shell variant="rail" className={cn('border-b px-4', className)} >
      <div
        className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4"
        style={{ borderColor: 'var(--nx-line, currentColor)' }}
      >
        <div className="min-w-0">{logo}</div>
        <div className="hidden md:block">
          <Links items={items} />
        </div>
        <div className="flex items-center gap-2">
          {action}
          <button
            type="button"
            className="h-11 px-3 text-sm md:hidden"
            style={{ border: '1px solid var(--nx-line, currentColor)' }}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            Menu
          </button>
        </div>
      </div>
      {open ? (
        <div className="border-t py-3 md:hidden" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
          <Links items={items} className="flex-col items-stretch" />
        </div>
      ) : null}
    </Shell>
  )
}

function CapsuleNav({ logo, items = [], action, className }: Base) {
  const shown = items.slice(0, 4)
  return (
    <Shell variant="capsule" className={cn('px-4 py-4', className)}>
      <div
        className="mx-auto flex max-w-3xl items-center justify-between gap-3 rounded-full px-3 py-1"
        style={{ border: '1px solid var(--nx-line, currentColor)', background: 'var(--nx-elev, transparent)' }}
      >
        <div className="px-2">{logo}</div>
        <Links items={shown} />
        {action}
      </div>
    </Shell>
  )
}

function ColumnNav({ logo, sections, items = [], action, className }: Base) {
  const groups = sections && sections.length > 0 ? sections : [{ id: 'main', label: null, items }]
  return (
    <Shell variant="column" className={cn('h-full min-h-80 w-64 border-r px-4 py-6', className)}>
      <div className="mb-8">{logo}</div>
      {groups.map((group) => (
        <div key={group.id} className="mb-6">
          {group.label ? (
            <p className={cn(mono, 'mb-2 text-[11px] tracking-[0.18em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
              {group.label}
            </p>
          ) : null}
          <Links items={group.items} className="flex-col items-stretch" />
        </div>
      ))}
      <div className="mt-auto">{action}</div>
    </Shell>
  )
}

function PathNav({ items = [], logo, action, className }: Base) {
  return (
    <Shell variant="path" className={cn('px-4 py-4', className)}>
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4">
        {logo}
        <ol className="flex min-w-0 flex-wrap items-center gap-2 text-sm">
          {items.map((item, index) => {
            const last = index === items.length - 1
            return (
              <li key={item.id} className="flex items-center gap-2">
                {index > 0 ? (
                  <span aria-hidden="true" style={{ color: 'var(--nx-muted, inherit)' }}>
                    /
                  </span>
                ) : null}
                {last || !item.href ? (
                  <span aria-current={last ? 'page' : undefined}>{item.label}</span>
                ) : (
                  <a href={item.href} className="underline-offset-4 hover:underline">
                    {item.label}
                  </a>
                )}
              </li>
            )
          })}
        </ol>
        {action}
      </div>
    </Shell>
  )
}

function MapNav({ logo, items = [], columns, action, defaultOpen, className }: Base) {
  const [open, setOpen] = useState<string | null>(defaultOpen ?? null)
  const reduced = usePrefersReducedMotion()
  const groups = columns && columns.length > 0 ? columns : items.filter((item) => item.children?.length).map((item) => ({
    id: item.id,
    title: item.label,
    items: item.children ?? [],
  }))
  return (
    <Shell variant="map" className={cn('relative border-b', className)}>
      <div className="mx-auto flex min-h-16 max-w-6xl items-center justify-between gap-4 px-4">
        {logo}
        <ul className="flex flex-wrap items-center gap-1">
          {(items.length ? items : groups.map((g) => ({ id: g.id, label: g.title }))).map((item) => (
            <li key={item.id}>
              <button
                type="button"
                aria-expanded={open === item.id}
                className="h-11 px-3 text-sm"
                onClick={() => setOpen((value) => (value === item.id ? null : item.id))}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        {action}
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={reduced ? undefined : { height: 0, opacity: 0 }}
            transition={springs.ui}
            className="overflow-hidden border-t"
            style={{ borderColor: 'var(--nx-line, currentColor)', background: 'var(--nx-elev, transparent)' }}
          >
            <div className="mx-auto grid max-w-6xl gap-6 px-4 py-8 sm:grid-cols-2 lg:grid-cols-3">
              {groups.map((group) => (
                <div key={group.id}>
                  <p className={cn(mono, 'mb-3 text-[11px] tracking-[0.16em] uppercase')} style={{ color: 'var(--nx-muted, inherit)' }}>
                    {group.title}
                  </p>
                  <Links items={group.items} className="flex-col items-stretch" />
                </div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Shell>
  )
}

function CommandNav({ logo, action, results, onQuery, query, items = [], className }: Base) {
  const id = useId()
  return (
    <Shell variant="command" className={cn('px-4 py-6', className)}>
      <div className="mx-auto max-w-2xl">
        <div className="mb-4 flex items-center justify-between">{logo}{action}</div>
        <div style={{ border: '1px solid var(--nx-line, currentColor)', background: 'var(--nx-elev, transparent)' }}>
          <label className="sr-only" htmlFor={id}>
            Jump
          </label>
          <input
            id={id}
            value={query}
            onChange={(event) => onQuery?.(event.target.value)}
            className="h-14 w-full bg-transparent px-4 outline-none"
            style={{ color: 'var(--nx-fg, inherit)' }}
          />
          {results ?? (items.length > 0 ? (
            <ul className="border-t" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
              {items.map((item) => (
                <li key={item.id}>
                  <a href={item.href} className="flex h-12 items-center px-4 text-sm">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          ) : null)}
        </div>
      </div>
    </Shell>
  )
}

function DockNav({ items = [], edge = 'bottom', magnify, className }: Base) {
  const reduced = usePrefersReducedMotion()
  const [hot, setHot] = useState<string | null>(null)
  return (
    <Shell
      variant="dock"
      className={cn('px-4 py-3', edge === 'bottom' ? 'pb-[max(0.75rem,env(safe-area-inset-bottom))]' : '', className)}
    >
      <ul className="mx-auto flex max-w-lg items-end justify-center gap-1">
        {items.slice(0, 5).map((item) => {
          const grow = !reduced && magnify && hot === item.id
          return (
            <li key={item.id}>
              <a
                href={item.href}
                aria-current={item.current ? 'page' : undefined}
                onPointerEnter={() => setHot(item.id)}
                onPointerLeave={() => setHot(null)}
                className="flex min-h-11 min-w-14 flex-col items-center justify-end gap-1 px-2"
              >
                <motion.span
                  animate={{ scale: grow ? 1.28 : 1 }}
                  transition={springs.snap}
                  className="grid size-9 place-items-center"
                  style={{ background: 'var(--nx-elev, transparent)', border: '1px solid var(--nx-line, currentColor)' }}
                >
                  {item.description ?? item.label?.toString?.()?.slice(0, 1)}
                </motion.span>
                <span className={cn(mono, 'text-[10px] tracking-[0.12em] uppercase')}>{item.label}</span>
              </a>
            </li>
          )
        })}
      </ul>
    </Shell>
  )
}

function MastNav({ logo, items = [], action, className }: Base) {
  const [open, setOpen] = useState(false)
  return (
    <Shell variant="mast" className={cn('px-4 py-8', className)}>
      <div className="mx-auto flex max-w-6xl items-end justify-between gap-6">
        <div className={cn(display, 'text-[clamp(2rem,6vw,4.5rem)] leading-none')}>{logo}</div>
        <div className="flex items-center gap-3">
          {action}
          <button
            type="button"
            aria-expanded={open}
            className={cn(mono, 'h-11 px-3 text-[11px] tracking-[0.16em] uppercase')}
            style={{ border: '1px solid var(--nx-line, currentColor)' }}
            onClick={() => setOpen((value) => !value)}
          >
            Index
          </button>
        </div>
      </div>
      {open ? (
        <div className="mx-auto mt-6 max-w-6xl border-t pt-4" style={{ borderColor: 'var(--nx-line, currentColor)' }}>
          <Links items={items} className="flex-col items-stretch md:flex-row" />
        </div>
      ) : null}
    </Shell>
  )
}

function CurtainNav({ logo, items = [], action, className }: Base) {
  const [open, setOpen] = useState(false)
  const root = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  useFocusTrap(open, root, () => setOpen(false))
  return (
    <Shell variant="curtain" className={cn('relative px-4 py-4', className)}>
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        {logo}
        <div className="flex items-center gap-2">
          {action}
          <button
            type="button"
            aria-expanded={open}
            className="h-11 px-3 text-sm"
            style={{ border: '1px solid var(--nx-line, currentColor)' }}
            onClick={() => setOpen(true)}
          >
            Open
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            ref={root}
            role="dialog"
            aria-modal="true"
            aria-label="Index"
            initial={reduced ? false : { y: '-8%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={reduced ? undefined : { y: '-4%', opacity: 0 }}
            transition={springs.heavy}
            className="fixed inset-0 z-50 flex flex-col px-6 py-8"
            style={{ background: 'var(--nx-bg, inherit)', color: 'var(--nx-fg, inherit)' }}
          >
            <div className="flex items-center justify-between">
              {logo}
              <button type="button" className="h-11 px-3" onClick={() => setOpen(false)}>
                Close
              </button>
            </div>
            <ul className="mt-12 space-y-3">
              {items.map((item, index) => (
                <li key={item.id}>
                  <a href={item.href} className={cn(display, 'block text-[clamp(2.2rem,8vw,5.5rem)] leading-[0.9]')}>
                    <span className={cn(mono, 'mr-4 text-sm')} style={{ color: 'var(--nx-muted, inherit)' }}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </Shell>
  )
}

function IslandNav({ logo, items = [], action, results, onQuery, morph = 'control', compact, className }: Base) {
  const reduced = usePrefersReducedMotion()
  const [mode, setMode] = useState<'bar' | 'field' | 'compact'>(compact ? 'compact' : 'bar')
  useEffect(() => {
    if (morph !== 'scroll' || reduced) return
    const onScroll = () => setMode(window.scrollY > 120 ? 'compact' : 'bar')
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [morph, reduced])
  return (
    <Shell variant="island" className={cn('px-4 py-4', className)}>
      <motion.div
        layout
        className="mx-auto flex max-w-3xl items-center justify-between gap-3 overflow-hidden px-3 py-2"
        style={{
          border: '1px solid var(--nx-line, currentColor)',
          background: 'var(--nx-elev, transparent)',
          borderRadius: mode === 'compact' ? 999 : 18,
        }}
        transition={springs.ui}
      >
        {logo}
        {mode === 'field' ? (
          <input
            className="h-11 flex-1 bg-transparent outline-none"
            onChange={(event) => onQuery?.(event.target.value)}
            aria-label="Jump"
          />
        ) : (
          <Links items={mode === 'compact' ? items.slice(0, 2) : items} />
        )}
        <div className="flex items-center gap-2">
          {morph === 'control' && !reduced ? (
            <button type="button" className="h-11 px-3 text-sm" onClick={() => setMode((value) => (value === 'field' ? 'bar' : 'field'))}>
              {mode === 'field' ? 'Links' : 'Jump'}
            </button>
          ) : null}
          {action}
        </div>
      </motion.div>
      {results}
    </Shell>
  )
}

function GalleyNav({ logo, items = [], action, className }: Base) {
  const [hot, setHot] = useState<string | null>(null)
  return (
    <Shell variant="galley" className={cn('border-y', className)}>
      <div className="mx-auto grid max-w-6xl grid-cols-2 md:grid-cols-[minmax(8rem,0.6fr)_repeat(auto-fit,minmax(6rem,1fr))_auto]">
        <div className="flex items-center px-4 py-4" style={{ borderRight: '1px solid var(--nx-line, currentColor)' }}>
          {logo}
        </div>
        {items.map((item) => {
          const fill = hot === item.id || item.current
          return (
            <a
              key={item.id}
              href={item.href}
              aria-current={item.current ? 'page' : undefined}
              onPointerEnter={() => setHot(item.id)}
              onPointerLeave={() => setHot(null)}
              className="relative flex h-16 items-center justify-center px-3 text-sm"
              style={{ borderRight: '1px solid var(--nx-line, currentColor)' }}
            >
              <motion.span
                className="absolute inset-0"
                animate={{ scaleY: fill ? 1 : 0 }}
                style={{ originY: 1, background: 'var(--nx-accent, currentColor)' }}
                transition={springs.snap}
                aria-hidden="true"
              />
              <span className="relative z-10" style={{ color: fill ? 'var(--nx-accent-fg, inherit)' : 'inherit' }}>
                {item.label}
              </span>
            </a>
          )
        })}
        <div className="flex items-center px-4">{action}</div>
      </div>
    </Shell>
  )
}
