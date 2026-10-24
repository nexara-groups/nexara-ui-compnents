'use client'

import { cn } from '@/lib/utils.ts'
import { Misregister, Perforation, ThemeButton, useMenuDialog, useSeen } from '@/themes/primitives.tsx'
import { useCallback, useState } from 'react'

export type ProgrammeNavLink = { href: string; label: string }

const defaultLinks: ProgrammeNavLink[] = [
  { href: '#fixtures', label: 'Fixtures' },
  { href: '#membership', label: 'Membership' },
  { href: '#academy', label: 'Academy' },
]

export function ProgrammeNavbar({
  name = 'Riverside',
  issue = 'Issue 14 · Saturday',
  links = defaultLinks,
  className,
}: {
  name?: string
  issue?: string
  links?: ProgrammeNavLink[]
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const { ref: panelRef, titleId } = useMenuDialog(open, close)
  const [bar, seen] = useSeen<HTMLElement>()

  return (
    <header ref={bar} className={cn('relative z-20', className)} style={{ background: 'var(--nx-bg)' }}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-8">
        <a href="#top" className="nx-display text-2xl leading-none no-underline md:text-3xl" style={{ color: 'var(--nx-fg)' }}>
          <Misregister>{name}</Misregister>
        </a>
        <p className="nx-mono hidden text-[11px] tracking-[0.14em] uppercase sm:block" style={{ color: 'var(--nx-muted)' }}>
          {issue}
        </p>
        <nav className="ml-auto hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm no-underline" style={{ color: 'var(--nx-fg)' }}>
              {link.label}
            </a>
          ))}
          <ThemeButton href="#register">Register</ThemeButton>
        </nav>
        <button
          type="button"
          className="ml-auto min-h-11 border px-3 text-sm md:hidden"
          style={{ borderColor: 'var(--nx-fg)' }}
          aria-expanded={open}
          aria-controls={`${titleId}-panel`}
          onClick={() => setOpen(true)}
        >
          Sheet
        </button>
      </div>
      <Perforation play={seen} />
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: 'color-mix(in srgb, var(--nx-fg) 40%, transparent)' }}>
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            id={`${titleId}-panel`}
            className="absolute inset-x-0 top-0 p-4"
            style={{ background: 'var(--nx-bg)', color: 'var(--nx-fg)' }}
          >
            <Perforation play />
            <div className="mt-3 flex items-center justify-between">
              <p id={titleId} className="nx-display text-3xl">
                {name}
              </p>
              <button type="button" className="min-h-11 px-3" onClick={close}>
                Close
              </button>
            </div>
            <ul className="mt-6">
              {links.map((link) => (
                <li key={link.href} className="border-t" style={{ borderColor: 'var(--nx-line)' }}>
                  <a href={link.href} className="block py-4 text-2xl no-underline" style={{ color: 'var(--nx-fg)' }} onClick={close}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <ThemeButton href="#register">Register a player</ThemeButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
