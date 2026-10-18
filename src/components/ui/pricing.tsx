'use client'

import { useState } from 'react'
import { MediaFrame, media } from '@/lib/media.tsx'
import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'cards',
  'toggle',
  'compare',
  'featured',
  'usage',
  'compact',
  'enterprise',
  'hobby',
  'table',
  'stacked',
] as const

export type PricingVariant = (typeof VARIANTS)[number]

export interface PricingProps {
  variant?: PricingVariant
  className?: string
}

const plans = [
  { name: 'Hobby', price: 0, yearly: 0, note: 'Personal rooms', cta: 'Start free', features: ['3 rooms', 'Community export', 'Public library'] },
  { name: 'Studio', price: 48, yearly: 38, note: 'Most teams', cta: 'Start Studio', features: ['Unlimited rooms', 'Shared libraries', 'Priority export', 'Audit trail'] },
  { name: 'Enterprise', price: null, yearly: null, note: 'Security review', cta: 'Talk to us', features: ['SSO / SAML', 'Audit log', 'Dedicated desk', 'SOC 2 packet'] },
]

const matrix = [
  { label: 'Rooms', hobby: '3', studio: 'Unlimited', enterprise: 'Unlimited' },
  { label: 'Export queue', hobby: 'Community', studio: 'Priority', enterprise: 'Dedicated' },
  { label: 'SSO', hobby: '—', studio: '—', enterprise: 'SAML' },
  { label: 'Audit log', hobby: '—', studio: '7 days', enterprise: 'Unlimited' },
]

/**
 * Pricing
 * Ten structurally different pricing sections. Copy this file plus `src/lib/utils.ts`.
 */
export function Pricing({ variant = 'cards', className }: PricingProps) {
  const [yearly, setYearly] = useState(false)

  return (
    <section data-nexara="pricing" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'cards' ? <Cards yearly={false} /> : null}
      {variant === 'toggle' ? (
        <div>
          <div className="mb-8 flex justify-center">
            <div className="inline-flex rounded-full bg-nx-elevated p-1 text-xs" role="group" aria-label="Billing period">
              <button type="button" className={cn(focusRing, 'rounded-full px-3 py-1.5', !yearly && 'bg-nx-card shadow-[var(--nx-shadow)]')} onClick={() => setYearly(false)}>
                Monthly
              </button>
              <button type="button" className={cn(focusRing, 'rounded-full px-3 py-1.5', yearly && 'bg-nx-card shadow-[var(--nx-shadow)]')} onClick={() => setYearly(true)}>
                Yearly <span className="text-nx-accent">−20%</span>
              </button>
            </div>
          </div>
          <Cards yearly={yearly} />
        </div>
      ) : null}
      {variant === 'featured' ? <Featured /> : null}
      {variant === 'compare' ? <Compare /> : null}
      {variant === 'usage' ? <Usage /> : null}
      {variant === 'compact' ? <Compact /> : null}
      {variant === 'enterprise' ? <Enterprise /> : null}
      {variant === 'hobby' ? <Hobby /> : null}
      {variant === 'table' ? <Table /> : null}
      {variant === 'stacked' ? <Stacked /> : null}
    </section>
  )
}

function Cards({ yearly }: { yearly: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {plans.map((plan) => (
        <article key={plan.name} className="flex flex-col rounded-[1.4rem] border border-nx-border bg-nx-card p-5 shadow-[var(--nx-shadow)]">
          <p className="text-sm font-medium">{plan.name}</p>
          <p className="mt-3 font-serif text-4xl tracking-tight">
            {plan.price == null ? 'Talk' : `$${yearly && plan.yearly ? plan.yearly : plan.price}`}
            {plan.price != null ? <span className="ml-1 text-sm text-nx-muted">/mo</span> : null}
          </p>
          <p className="mt-1 text-xs text-nx-muted">{plan.note}</p>
          <ul className="mt-5 flex-1 space-y-2 text-sm text-nx-muted">
            {plan.features.map((feature) => (
              <li key={feature} className="flex gap-2">
                <Check /> {feature}
              </li>
            ))}
          </ul>
          <span className="mt-6 inline-flex h-10 items-center justify-center rounded-xl bg-nx-fg text-sm text-nx-bg">{plan.cta}</span>
        </article>
      ))}
    </div>
  )
}

function Featured() {
  return (
    <div className="grid items-stretch gap-4 md:grid-cols-3">
      {plans.map((plan) => {
        const featured = plan.name === 'Studio'
        return (
          <article
            key={plan.name}
            className={cn(
              'flex flex-col rounded-[1.5rem] border p-5',
              featured ? 'border-transparent bg-nx-fg text-nx-bg shadow-[var(--nx-shadow)] md:-translate-y-2 md:p-6' : 'border-nx-border bg-nx-card',
            )}
          >
            {featured ? <p className="mb-3 text-[10px] tracking-[0.18em] uppercase opacity-70">Recommended</p> : null}
            <p className="text-sm">{plan.name}</p>
            <p className="mt-2 font-serif text-5xl">{plan.price == null ? 'Talk' : `$${plan.price}`}</p>
            <ul className="mt-5 space-y-2 text-sm opacity-80">
              {plan.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
            <span className={cn('mt-6 inline-flex h-10 items-center justify-center rounded-xl text-sm', featured ? 'bg-nx-bg text-nx-fg' : 'bg-nx-fg text-nx-bg')}>
              {plan.cta}
            </span>
          </article>
        )
      })}
    </div>
  )
}

function Compare() {
  return (
    <div className="overflow-hidden rounded-[1.5rem] border border-nx-border">
      {plans.map((plan, index) => (
        <div key={plan.name} className={cn('grid gap-4 px-5 py-5 md:grid-cols-[8rem_5rem_1fr_auto]', index > 0 && 'border-t border-nx-border')}>
          <p className="font-medium">{plan.name}</p>
          <p className="font-serif text-2xl">{plan.price == null ? 'Talk' : `$${plan.price}`}</p>
          <p className="text-sm text-nx-muted">{plan.features.join(' · ')}</p>
          <span className="inline-flex h-9 items-center justify-center rounded-full bg-nx-fg px-3 text-xs text-nx-bg">{plan.cta}</span>
        </div>
      ))}
    </div>
  )
}

function Usage() {
  return (
    <div className="mx-auto max-w-lg rounded-[1.6rem] border border-nx-border bg-nx-card p-6 shadow-[var(--nx-shadow)]">
      <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">Usage</p>
      <p className="mt-2 font-serif text-5xl tracking-tight">
        $0.12<span className="ml-2 text-base text-nx-muted">per export</span>
      </p>
      <p className="mt-2 text-sm text-nx-muted">First 50 exports each month are free. Then you pay for successful jobs only.</p>
      <div className="mt-6">
        <div className="mb-2 flex justify-between text-xs text-nx-muted">
          <span>32 of 50 free</span>
          <span>This month</span>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-nx-elevated">
          <span className="block h-2 w-[64%] bg-nx-accent" />
        </div>
      </div>
      <span className="mt-6 inline-flex h-11 w-full items-center justify-center rounded-xl bg-nx-fg text-sm text-nx-bg">Enable usage billing</span>
    </div>
  )
}

function Compact() {
  return (
    <div className="flex flex-col items-start justify-between gap-4 rounded-[1.4rem] border border-nx-border bg-nx-card p-5 sm:flex-row sm:items-center">
      <div>
        <p className="text-sm font-medium">Studio</p>
        <p className="text-xs text-nx-muted">Unlimited rooms · Shared libraries</p>
      </div>
      <p className="font-serif text-4xl">$48</p>
      <span className="inline-flex h-10 items-center rounded-full bg-nx-fg px-4 text-sm text-nx-bg">Start Studio</span>
    </div>
  )
}

function Enterprise() {
  return (
    <div className="grid overflow-hidden rounded-[1.6rem] border border-nx-border md:grid-cols-2">
      <div className="relative overflow-hidden bg-nx-fg p-6 text-nx-bg md:p-8">
        <MediaFrame src={media.featured} alt="" className="pointer-events-none absolute inset-0 opacity-30" />
        <p className="relative text-xs tracking-[0.18em] uppercase opacity-70">Enterprise</p>
        <p className="relative mt-3 font-serif text-4xl leading-tight">A desk for the security review.</p>
        <p className="relative mt-3 text-sm opacity-70">SSO, audit logs, and a named engineer. We will send the SOC 2 packet before the call.</p>
        <span className="relative mt-6 inline-flex h-11 items-center rounded-full bg-nx-bg px-4 text-sm text-nx-fg">Talk to us</span>
      </div>
      <ul className="space-y-3 bg-nx-card p-6 text-sm md:p-8">
        {['SAML and SCIM', 'Unlimited audit retention', 'Private export corridor', 'On-call desk in your timezone'].map((item) => (
          <li key={item} className="flex gap-2 text-nx-muted">
            <Check /> {item}
          </li>
        ))}
      </ul>
    </div>
  )
}

function Hobby() {
  return (
    <div className="mx-auto max-w-md rounded-[1.6rem] border border-dashed border-nx-line bg-nx-bg p-6 text-center">
      <p className="text-xs tracking-[0.16em] text-nx-accent uppercase">Hobby</p>
      <p className="mt-2 font-serif text-5xl">$0</p>
      <p className="mt-2 text-sm text-nx-muted">Three rooms, the public library, and community export. Keep it as long as you want.</p>
      <ul className="mx-auto mt-5 max-w-xs space-y-2 text-left text-sm text-nx-muted">
        <li className="flex gap-2"><Check /> 3 rooms</li>
        <li className="flex gap-2"><Check /> Community export</li>
        <li className="flex gap-2"><Check /> Public components</li>
      </ul>
      <span className="mt-6 inline-flex h-11 items-center rounded-full border border-nx-line px-5 text-sm">Stay on Hobby</span>
    </div>
  )
}

function Table() {
  return (
    <div className="overflow-x-auto rounded-[1.4rem] border border-nx-border">
      <table className="w-full min-w-[32rem] text-left text-sm">
        <thead className="bg-nx-elevated text-xs tracking-[0.12em] text-nx-muted uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Feature</th>
            <th className="px-4 py-3 font-medium">Hobby</th>
            <th className="px-4 py-3 font-medium">Studio</th>
            <th className="px-4 py-3 font-medium">Enterprise</th>
          </tr>
        </thead>
        <tbody>
          {matrix.map((row) => (
            <tr key={row.label} className="border-t border-nx-border">
              <td className="px-4 py-3 font-medium">{row.label}</td>
              <td className="px-4 py-3 text-nx-muted">{row.hobby}</td>
              <td className="px-4 py-3 text-nx-muted">{row.studio}</td>
              <td className="px-4 py-3 text-nx-muted">{row.enterprise}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function Stacked() {
  return (
    <article className="mx-auto max-w-xl border-t border-nx-line pt-6">
      <p className="text-xs tracking-[0.2em] text-nx-muted uppercase">Studio · billed monthly</p>
      <p className="mt-3 font-serif text-7xl leading-none">$48</p>
      <p className="mt-4 max-w-sm text-sm leading-6 text-nx-muted">One plan for teams that already know they will ship more than three rooms. Libraries, priority export, and a seven-day audit trail.</p>
      <ul className="mt-6 space-y-2 border-y border-nx-border py-4 text-sm">
        {plans[1]!.features.map((feature) => (
          <li key={feature} className="flex justify-between">
            <span>{feature}</span>
            <span className="text-nx-accent">Included</span>
          </li>
        ))}
      </ul>
      <span className="mt-6 inline-flex h-11 items-center rounded-full bg-nx-fg px-5 text-sm text-nx-bg">Start Studio</span>
    </article>
  )
}

function Check() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" className="mt-0.5 shrink-0" aria-hidden="true">
      <path d="M3 7.2 5.8 10 11 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  )
}
