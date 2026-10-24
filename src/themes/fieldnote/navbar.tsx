'use client'

import { cn } from '@/lib/utils.ts'
import { Kicker, ThemeButton, useMenuDialog } from '@/themes/primitives.tsx'
import { useCallback, useState } from 'react'

export type FieldnoteNavLink = { href: string; label: string }

const defaultLinks: FieldnoteNavLink[] = [
  { href: '#services', label: 'Callouts' },
  { href: '#plans', label: 'Plans' },
  { href: '#districts', label: 'Districts' },
]

export function FieldnoteNavbar({
  name = 'Northline',
  job = 'MECH / EST 1978',
  phone = '020 7946 0184',
  phoneHref = 'tel:+442079460184',
  links = defaultLinks,
  className,
}: {
  name?: string
  job?: string
  phone?: string
  phoneHref?: string
  links?: FieldnoteNavLink[]
  className?: string
}) {
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])
  const { ref: panelRef, titleId } = useMenuDialog(open, close)

  return (
    <header className={cn('relative z-20 border-b', className)} style={{ borderColor: 'var(--nx-line)', background: 'var(--nx-bg)' }}>
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-4 py-3 md:px-8">
        <a href="#top" className="min-w-0 no-underline" style={{ color: 'var(--nx-fg)' }}>
          <span className="block text-lg font-semibold tracking-tight">{name}</span>
          <span className="nx-mono block text-[10px] tracking-[0.14em]" style={{ color: 'var(--nx-muted)' }}>
            {job}
          </span>
        </a>
        <nav className="ml-auto hidden items-center gap-6 md:flex" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-sm no-underline" style={{ color: 'var(--nx-fg)' }}>
              {link.label}
            </a>
          ))}
          <ThemeButton href={phoneHref}>Call {phone}</ThemeButton>
          <ThemeButton href="#quote" kind="line">
            Request a quote
          </ThemeButton>
        </nav>
        <button
          type="button"
          className="ml-auto min-h-11 border px-3 text-sm md:hidden"
          style={{ borderColor: 'var(--nx-fg)', borderRadius: 'var(--nx-radius)' }}
          aria-expanded={open}
          aria-controls={`${titleId}-panel`}
          onClick={() => setOpen(true)}
        >
          Index
        </button>
      </div>
      {open ? (
        <div className="fixed inset-0 z-40 md:hidden" style={{ background: 'color-mix(in srgb, var(--nx-fg) 35%, transparent)' }}>
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            id={`${titleId}-panel`}
            className="absolute inset-x-3 top-3 border p-4"
            style={{ background: 'var(--nx-surface)', borderColor: 'var(--nx-line)', color: 'var(--nx-fg)' }}
          >
            <div className="flex items-center justify-between gap-3">
              <Kicker>
                <span id={titleId}>Job index</span>
              </Kicker>
              <button type="button" className="min-h-11 px-3" onClick={close}>
                Close
              </button>
            </div>
            <ul className="mt-4 space-y-1">
              {links.map((link) => (
                <li key={link.href} className="border-t" style={{ borderColor: 'var(--nx-line)' }}>
                  <a href={link.href} className="block py-3 text-lg no-underline" style={{ color: 'var(--nx-fg)' }} onClick={close}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-4 flex flex-col gap-2">
              <ThemeButton href={phoneHref}>Call {phone}</ThemeButton>
              <ThemeButton href="#quote" kind="line">
                Request a quote
              </ThemeButton>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  )
}
