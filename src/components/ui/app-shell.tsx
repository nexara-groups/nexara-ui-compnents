'use client'

import { type ReactNode, useState } from 'react'
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
 * Twelve portal layouts for Agency OS and industry desks.
 * Copy this file plus `src/lib/utils.ts`.
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

  if (variant === 'top') {
    return (
      <div data-nexara="app-shell" data-variant={variant} className={cn('overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card', className)}>
        <header className="flex items-center justify-between border-b border-nx-border px-4 py-3">
          <p className="font-medium">{brand}</p>
          <nav className="flex gap-3 text-sm text-nx-muted">
            {items.slice(0, 4).map((item) => (
              <span key={item}>{item}</span>
            ))}
          </nav>
        </header>
        <div className="p-4">{children ?? <Blank title="Top navigation" />}</div>
      </div>
    )
  }

  if (variant === 'split') {
    return (
      <div data-nexara="app-shell" data-variant={variant} className={cn('grid overflow-hidden rounded-[1.4rem] border border-nx-border md:grid-cols-[1fr_18rem]', className)}>
        <div className="p-4">{children ?? <Blank title="Workspace" />}</div>
        <aside className="border-t border-nx-border bg-nx-elevated p-4 md:border-t-0 md:border-l">
          <p className="text-xs text-nx-faint">Inspector</p>
          <p className="mt-2 text-sm">Lead · Wren Build</p>
        </aside>
      </div>
    )
  }

  if (variant === 'command') {
    return (
      <div data-nexara="app-shell" data-variant={variant} className={cn('rounded-[1.4rem] border border-nx-border bg-nx-card p-4', className)}>
        <button type="button" className={cn(focusRing, 'flex h-10 w-full items-center justify-between rounded-xl border border-nx-line px-3 text-sm text-nx-muted')}>
          Jump to a room
          <kbd className="rounded bg-nx-elevated px-1.5 font-mono text-[10px]">⌘K</kbd>
        </button>
        <div className="mt-4">{children ?? <Blank title="Command-first desk" />}</div>
      </div>
    )
  }

  const rail = variant === 'rail' || variant === 'collapsed'
  const dense = variant === 'dense'

  return (
    <div
      data-nexara="app-shell"
      data-variant={variant}
      className={cn('grid min-h-72 overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card', open ? (rail ? 'grid-cols-1 md:grid-cols-[4rem_1fr]' : 'grid-cols-1 md:grid-cols-[13rem_1fr]') : 'grid-cols-1', className)}
    >
      {open ? (
        <aside
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
              <span
                key={item}
                className={cn(
                  'rounded-lg px-2 py-1.5 text-sm',
                  index === 0 ? 'bg-nx-soft text-nx-accent' : 'text-current/70',
                  rail && 'text-center',
                  dense && 'py-1 text-xs',
                )}
              >
                {rail ? item.slice(0, 1) : item}
              </span>
            ))}
          </nav>
        </aside>
      ) : null}
      <div className="p-4">
        {variant === 'mobile' || variant === 'sidebar' || variant === 'agency' || variant === 'clinic' || variant === 'sports' || variant === 'academy' || variant === 'dense' ? (
          <button type="button" className={cn(focusRing, 'mb-3 rounded-lg border border-nx-border px-3 py-1.5 text-xs md:hidden')} onClick={() => (variant === 'mobile' ? setOpen((value) => !value) : setMenu((value) => !value))}>
            {variant === 'mobile' ? (open ? 'Hide menu' : 'Menu') : menu ? 'Hide menu' : 'Menu'}
          </button>
        ) : null}
        {children ?? <Blank title={`${brand} canvas`} />}
      </div>
    </div>
  )
}

function Blank({ title }: { title: string }) {
  return (
    <div>
      <p className="text-xs text-nx-faint">Canvas</p>
      <p className="mt-2 font-serif text-2xl">{title}</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {['Open', 'Waiting', 'Done'].map((label) => (
          <div key={label} className="rounded-xl border border-nx-border p-3 text-sm">
            {label}
          </div>
        ))}
      </div>
    </div>
  )
}
