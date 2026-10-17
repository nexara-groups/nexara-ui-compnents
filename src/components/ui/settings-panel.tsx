'use client'

import { useState } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'profile',
  'team',
  'billing',
  'appearance',
  'notifications',
  'security',
  'api',
  'clinic',
  'branches',
  'compact',
  'danger',
  'integrations',
] as const

export type SettingsPanelVariant = (typeof VARIANTS)[number]

export interface SettingsPanelProps {
  variant?: SettingsPanelVariant
  className?: string
}

/**
 * Settings panel
 * Twelve settings constructions for Agency OS and clinic desks.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function SettingsPanel({ variant = 'profile', className }: SettingsPanelProps) {
  const [on, setOn] = useState(true)

  return (
    <section data-nexara="settings-panel" data-variant={variant} className={cn('rounded-[1.4rem] border border-nx-border bg-nx-card p-5', className)}>
      {variant === 'profile' ? (
        <div className="grid gap-3">
          <h3 className="font-serif text-2xl">Profile</h3>
          <label className="text-sm">
            Name
            <input className={cn(focusRing, 'mt-1 h-10 w-full rounded-lg border border-nx-line px-3')} defaultValue="Latha Iyer" />
          </label>
          <label className="text-sm">
            Desk
            <input className={cn(focusRing, 'mt-1 h-10 w-full rounded-lg border border-nx-line px-3')} defaultValue="Nexara Academy" />
          </label>
        </div>
      ) : null}

      {variant === 'team' ? (
        <ul className="space-y-2 text-sm">
          {['Latha · Owner', 'Suresh · Plant', 'Dr. Rao · Care'].map((row) => (
            <li key={row} className="flex justify-between rounded-xl border border-nx-border px-3 py-2">
              {row}
              <span className="text-nx-faint">Edit</span>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'billing' ? (
        <div>
          <p className="text-xs text-nx-faint">Studio plan</p>
          <p className="mt-2 font-serif text-4xl">$48</p>
          <p className="mt-1 text-sm text-nx-muted">Next invoice 12 Nov · Harbor</p>
        </div>
      ) : null}

      {variant === 'appearance' ? (
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium">Dark desk</p>
            <p className="text-sm text-nx-muted">Matches the docs theme token.</p>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={on}
            className={cn(focusRing, 'h-7 w-12 rounded-full', on ? 'bg-nx-fg' : 'bg-nx-line')}
            onClick={() => setOn((value) => !value)}
          >
            <span className={cn('block size-5 translate-x-1 rounded-full bg-nx-card transition', on && 'translate-x-6')} />
          </button>
        </div>
      ) : null}

      {variant === 'notifications' ? (
        <ul className="space-y-3 text-sm">
          {['Weekly demo reminder', 'EECP chair alerts', 'Medal posts'].map((item) => (
            <li key={item} className="flex items-center justify-between">
              {item}
              <span className="text-xs text-nx-ok">On</span>
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'security' ? (
        <div>
          <p className="font-medium">SSO / SAML</p>
          <p className="mt-2 text-sm text-nx-muted">Required on Enterprise. Audit log keeps seven years on the clinic desk.</p>
        </div>
      ) : null}

      {variant === 'api' ? (
        <div className="font-mono text-xs">
          <p className="text-nx-faint">Publishable key</p>
          <p className="mt-2 rounded-lg bg-nx-elevated px-3 py-2">nx_pk_live_••••18</p>
        </div>
      ) : null}

      {variant === 'clinic' ? (
        <div>
          <p className="text-xs tracking-[0.16em] text-nx-faint uppercase">Care desk</p>
          <p className="mt-2 font-serif text-2xl">16 specialists · 4 doors</p>
          <p className="mt-2 text-sm text-nx-muted">EECP chairs publish to the public site after 20:00.</p>
        </div>
      ) : null}

      {variant === 'branches' ? (
        <ul className="space-y-2 text-sm">
          {['Hyderabad plant', 'Vizag bay', 'Vijayawada collab'].map((item) => (
            <li key={item} className="rounded-xl border border-nx-border px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      ) : null}

      {variant === 'compact' ? (
        <p className="text-sm">
          Theme, members, and billing sit in one panel. Copy this file and keep the tokens.
        </p>
      ) : null}

      {variant === 'danger' ? (
        <div>
          <p className="font-medium text-nx-danger">Archive this desk</p>
          <p className="mt-2 text-sm text-nx-muted">Leads stay in the audit log. Public pages go dark.</p>
          <button type="button" className={cn(focusRing, 'mt-4 h-9 rounded-lg bg-nx-danger px-3 text-sm text-white')}>
            Archive
          </button>
        </div>
      ) : null}

      {variant === 'integrations' ? (
        <ul className="space-y-2 text-sm">
          {['Google Calendar · OPD', 'WhatsApp · plant quotes', 'Stripe · studio'].map((item) => (
            <li key={item} className="rounded-xl bg-nx-elevated px-3 py-2">
              {item}
            </li>
          ))}
        </ul>
      ) : null}
    </section>
  )
}
