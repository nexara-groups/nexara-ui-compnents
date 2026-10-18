'use client'

import { type ReactNode, useState } from 'react'
import { MediaFrame, faces, media } from '@/lib/media.tsx'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'sidebar',
  'rail',
  'top',
  'split',
  'dense',
  'agency',
  'clinic',
  'sports',
  'academy',
  'collapsed',
  'command',
  'mobile',
] as const

export type AppShellVariant = (typeof VARIANTS)[number]

export interface AppShellProps {
  variant?: AppShellVariant
  className?: string
  children?: ReactNode
}

const nav = {
  agency: ['Overview', 'Leads', 'Boards', 'Invoices', 'Library'],
  clinic: ['Today', 'Patients', 'Therapy', 'Pharmacy', 'Rooms'],
  sports: ['Season', 'Athletes', 'Events', 'Medals', 'Clubs'],
  academy: ['Cohorts', 'Lessons', 'Faculty', 'Briefs', 'Handover'],
}

/**
 * App shell
 * Twelve portal layouts. Isolated canvases ship real furniture — leads, rooms,
 * heats, briefs — not empty Open / Waiting / Done tiles.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
export function AppShell({ variant = 'sidebar', className, children }: AppShellProps) {
  const [open, setOpen] = useState(variant !== 'collapsed' && variant !== 'mobile')
  const [menu, setMenu] = useState(false)
  const items =
    variant === 'clinic'
      ? nav.clinic
      : variant === 'sports'
        ? nav.sports
        : variant === 'academy'
          ? nav.academy
          : nav.agency
  const brand =
    variant === 'clinic' ? 'Lumen desk' : variant === 'sports' ? 'Field OS' : variant === 'academy' ? 'Atlas' : 'North OS'
  const canvas = children ?? <Desk variant={variant} />

  if (variant === 'top') {
    return (
      <TopShell brand={brand} items={items} className={className}>
        {canvas}
      </TopShell>
    )
  }

  if (variant === 'split') {
    return (
      <div data-nexara="app-shell" data-variant={variant} className={cn('grid overflow-hidden rounded-[1.4rem] border border-nx-border md:grid-cols-[1fr_18rem]', className)}>
        <div className="p-4">{canvas}</div>
        <aside className="border-t border-nx-border bg-nx-elevated p-4 md:border-t-0 md:border-l">
          <p className="text-xs text-nx-muted">Inspector</p>
          <p className="mt-2 text-sm font-medium">Lead · Wren Build</p>
          <p className="mt-1 text-xs text-nx-muted">Anitha Rao · quoted this morning</p>
          <MediaFrame src={media.cases.build} alt="Wren Build still" className="mt-3 h-24 rounded-xl" />
        </aside>
      </div>
    )
  }

  if (variant === 'command') {
    return (
      <div data-nexara="app-shell" data-variant={variant} className={cn('rounded-[1.4rem] border border-nx-border bg-nx-card p-4', className)}>
        <button type="button" className={cn(focusRing, 'flex h-11 w-full items-center justify-between rounded-xl border border-nx-field px-3 text-sm text-nx-muted')}>
          Jump to a room
          <kbd className="rounded bg-nx-elevated px-1.5 font-mono text-[10px]">⌘K</kbd>
        </button>
        <div className="mt-4">{canvas}</div>
      </div>
    )
  }

  const rail = variant === 'rail' || variant === 'collapsed'
  const dense = variant === 'dense'
  const navId = `nexara-desk-${variant}`
  const menuOpen = variant === 'mobile' ? open : menu

  return (
    <div
      data-nexara="app-shell"
      data-variant={variant}
      className={cn('grid min-h-72 overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card', open ? (rail ? 'grid-cols-1 md:grid-cols-[4rem_1fr]' : 'grid-cols-1 md:grid-cols-[13rem_1fr]') : 'grid-cols-1', className)}
    >
      {open ? (
        <aside
          id={navId}
          className={cn(
            'border-r border-nx-border bg-nx-elevated p-3',
            variant === 'sports' && 'bg-[#111113] text-white',
            variant === 'clinic' && 'bg-[#0b1220] text-[#f6f1ea]',
            variant !== 'mobile' && !menu && 'max-md:hidden',
          )}
        >
          <p className={cn('px-1 text-xs tracking-[0.16em] uppercase', rail && 'sr-only')}>{brand}</p>
          <nav className="mt-4 grid gap-1" aria-label="Desk">
            {items.map((item, index) => (
              <button
                key={item}
                type="button"
                className={cn(
                  focusRing,
                  'min-h-11 min-w-11 rounded-lg px-2 text-left text-sm',
                  index === 0 ? 'bg-nx-soft text-nx-accent' : 'text-current/70',
                  rail && 'text-center',
                  dense && 'text-xs',
                )}
              >
                {rail ? <span aria-label={item}>{item.slice(0, 1)}</span> : item}
              </button>
            ))}
          </nav>
        </aside>
      ) : null}
      <div className="p-4">
        {variant === 'mobile' || variant === 'sidebar' || variant === 'agency' || variant === 'clinic' || variant === 'sports' || variant === 'academy' || variant === 'dense' ? (
          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls={navId}
            className={cn(focusRing, 'mb-3 inline-flex min-h-11 items-center rounded-lg border border-nx-field px-3 text-xs md:hidden')}
            onClick={() => (variant === 'mobile' ? setOpen((value) => !value) : setMenu((value) => !value))}
          >
            {menuOpen ? 'Hide menu' : 'Menu'}
          </button>
        ) : null}
        {canvas}
      </div>
    </div>
  )
}

function TopShell({ brand, items, className, children }: { brand: string; items: string[]; className?: string; children: ReactNode }) {
  const [open, setOpen] = useState(false)
  return (
    <div data-nexara="app-shell" data-variant="top" className={cn('overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card', className)}>
      <header className="flex items-center justify-between gap-3 border-b border-nx-border px-4 py-3">
        <p className="font-medium">{brand}</p>
        <nav className="hidden gap-3 text-sm text-nx-muted md:flex">
          {items.slice(0, 4).map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="inline-flex min-h-11 min-w-11 items-center px-1">
              {item}
            </a>
          ))}
        </nav>
        <button
          type="button"
          className={cn(focusRing, 'inline-flex min-h-11 items-center rounded-lg border border-nx-field px-3 text-xs md:hidden')}
          aria-expanded={open}
          aria-controls="nexara-desk-top"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </header>
      {open ? (
        <nav id="nexara-desk-top" className="grid gap-1 border-b border-nx-border px-3 py-2 md:hidden" aria-label="Desk">
          {items.slice(0, 4).map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="flex min-h-11 items-center rounded-lg px-2 text-sm">
              {item}
            </a>
          ))}
        </nav>
      ) : null}
      <div className="p-4">{children}</div>
    </div>
  )
}

function Desk({ variant }: { variant: AppShellVariant }) {
  if (variant === 'clinic') return <ClinicDesk />
  if (variant === 'sports') return <SportsDesk />
  if (variant === 'academy') return <AcademyDesk />
  return <AgencyDesk />
}

function AgencyDesk() {
  return (
    <div>
      <p className="text-xs text-nx-muted">North OS · Overview</p>
      <p className="mt-1 font-serif text-2xl">Leads that already have a room.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Open leads" value="24" note="Wren, Solum, Vale" />
        <Metric label="Friday demos" value="7" note="This week" />
        <Metric label="Booked" value="₹86L" note="Studio corridor" />
      </div>
      <div className="mt-4 grid gap-3 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-2xl border border-nx-border">
          <p className="border-b border-nx-border px-3 py-2 text-xs text-nx-muted">Board</p>
          <ul className="grid gap-2 p-3 sm:grid-cols-3">
            {[
              { col: 'Brief', item: 'Wren Build mast' },
              { col: 'Build', item: 'Harbor plant walk' },
              { col: 'Review', item: 'Issue 18 index' },
            ].map((row) => (
              <li key={row.col} className="rounded-xl border border-nx-border bg-nx-elevated p-3 text-sm">
                <p className="text-[11px] text-nx-muted">{row.col}</p>
                <p className="mt-1 font-medium">{row.item}</p>
              </li>
            ))}
          </ul>
        </div>
        <Activity />
      </div>
    </div>
  )
}

function ClinicDesk() {
  return (
    <div>
      <p className="text-xs text-nx-muted">Lumen desk · Today</p>
      <p className="mt-1 font-serif text-2xl">Chairs that already have a name.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Consults" value="16" note="Before noon walk-ins" />
        <Metric label="Therapy" value="9" note="Named chairs" />
        <Metric label="Scripts" value="4" note="Same-floor pharmacy" />
      </div>
      <ul className="mt-4 space-y-2">
        {faces.slice(0, 3).map((face, index) => (
          <li key={face.name} className="flex items-center gap-3 rounded-xl border border-nx-border px-3 py-2">
            <MediaFrame src={face.src} alt={face.name} grain={false} className="size-10 rounded-full" />
            <span className="min-w-0 flex-1">
              <span className="block text-sm font-medium">{face.name}</span>
              <span className="text-xs text-nx-muted">{['Consult · Room 2', 'Therapy · Chair 4', 'Pharmacy · Window'][index]}</span>
            </span>
            <span className="text-xs text-nx-muted">{['08:40', '09:10', '09:35'][index]}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

function SportsDesk() {
  return (
    <div>
      <p className="text-xs text-nx-muted">Field OS · Season</p>
      <p className="mt-1 font-serif text-2xl">Heats that post the same night.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="Gold" value="12" note="U19 book" />
        <Metric label="Clubs" value="28" note="Named coaches" />
        <Metric label="Lanes" value="8" note="Harbor Hall" />
      </div>
      <MediaFrame src={media.venues.track} alt="Harbor Hall track" className="mt-4 h-28 rounded-2xl" />
    </div>
  )
}

function AcademyDesk() {
  return (
    <div>
      <p className="text-xs text-nx-muted">Atlas · Cohorts</p>
      <p className="mt-1 font-serif text-2xl">Briefs that ship on Friday.</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Metric label="In room" value="18" note="Cohort 07" />
        <Metric label="Demos" value="3" note="This Friday" />
        <Metric label="Leads" value="6" note="Named after handover" />
      </div>
      <MediaFrame src={media.journal} alt="Atlas brief" className="mt-4 h-28 rounded-2xl" />
    </div>
  )
}

function Metric({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border border-nx-border bg-nx-elevated p-3">
      <p className="text-xs text-nx-muted">{label}</p>
      <p className="mt-1 font-serif text-3xl">{value}</p>
      <p className="mt-1 text-xs text-nx-muted">{note}</p>
    </div>
  )
}

function Activity() {
  return (
    <div className="rounded-2xl border border-nx-border">
      <p className="border-b border-nx-border px-3 py-2 text-xs text-nx-muted">Activity</p>
      <ul className="space-y-2 p-3">
        {faces.slice(0, 3).map((face, index) => (
          <li key={face.name} className="flex items-center gap-3 text-sm">
            <MediaFrame src={face.src} alt="" grain={false} className="size-8 rounded-full" />
            <span>
              <span className="font-medium">{face.name.split(' ')[0]}</span>
              <span className="text-nx-muted"> {['moved Wren to Review', 'quoted Harbor plant', 'closed Issue 18 still'][index]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  )
}
