'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { cn, focusRing } from '@/lib/utils.ts'

const VARIANTS = [
  'appointment',
  'lime',
  'split',
  'dark',
  'form',
  'store',
  'partner',
  'waitlist',
  'quote',
  'emergency',
  'studio',
  'event',
  'liquid-wash',
  'scramble-cta',
  'particle-close',
  'glare-band',
] as const

export type CtaBandVariant = (typeof VARIANTS)[number]

export interface CtaBandProps {
  variant?: CtaBandVariant
  className?: string
}

/**
 * CTA band
 * Twelve closing bands: clinic appointment, Nexara lime, store, emergency.
 * Copy this file plus `src/lib/utils.ts`.
 */
function CtaBandCore({ variant = 'appointment', className }: CtaBandProps) {
  return (
    <section data-nexara="cta-band" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'appointment' ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.6rem] bg-[#0b1220] px-6 py-8 text-[#f6f1ea]">
          <div>
            <p className="text-xs tracking-[0.18em] text-[#f6f1ea] uppercase">Lumen Care</p>
            <p className="mt-2 font-serif text-3xl">Book the next therapy chair.</p>
          </div>
          <a className={cn(focusRing, 'inline-flex min-h-11 items-center rounded-full bg-[#f6f1ea] px-5 text-sm text-[#0b1220]')} href="#contact">
            Request a slot
          </a>
        </div>
      ) : null}

      {variant === 'lime' ? (
        <div className="rounded-[1.6rem] bg-[#c8ff4d] px-6 py-8 text-[#111113]">
          <p className="text-xs tracking-[0.2em] uppercase">North Studio</p>
          <p className="mt-2 font-serif text-4xl">Send the brief. We answer with a named lead.</p>
          <a className={cn(focusRing, 'mt-5 inline-flex min-h-11 items-center rounded-full bg-[#111113] px-5 text-sm text-white')} href="#contact">
            Write to the studio
          </a>
        </div>
      ) : null}

      {variant === 'split' ? (
        <div className="grid overflow-hidden rounded-[1.5rem] border border-nx-border md:grid-cols-2">
          <div className="p-6">
            <p className="font-serif text-3xl">Plant walk</p>
            <p className="mt-2 text-sm text-nx-muted">Hyderabad mornings. Bring the drawing.</p>
          </div>
          <div className="bg-nx-fg p-6 text-nx-bg">
            <p className="font-serif text-3xl">AMC desk</p>
            <p className="mt-2 text-sm opacity-70">Quarterly wash, leak walk, gas book.</p>
          </div>
        </div>
      ) : null}

      {variant === 'dark' ? (
        <div className="rounded-[1.5rem] bg-[#07070a] px-6 py-10 text-center text-white">
          <p className="font-serif text-4xl">One core. Three forces.</p>
          <a className={cn(focusRing, 'mt-5 inline-flex min-h-11 items-center rounded-full border border-white/20 px-5 text-sm')} href="#hero">
            Meet Academy, Labs, Marketing
          </a>
        </div>
      ) : null}

      {variant === 'form' ? (
        <form className="flex flex-col gap-3 rounded-[1.4rem] border border-nx-border p-5 sm:flex-row">
          <input className={cn(focusRing, 'min-h-11 min-w-0 flex-1 rounded-xl bg-nx-bg px-3')} placeholder="Work email" />
          <button type="button" className={cn(focusRing, 'h-11 rounded-xl bg-nx-fg px-5 text-nx-bg')}>
            Join the desk
          </button>
        </form>
      ) : null}

      {variant === 'store' ? (
        <div className="flex flex-wrap items-center gap-3 rounded-[1.4rem] bg-[#111113] p-5 text-white">
          <p className="flex-1 font-serif text-2xl">Take the season with you.</p>
          <span className="rounded-xl border border-white/15 px-4 py-2 text-sm">App Store</span>
          <span className="rounded-xl border border-white/15 px-4 py-2 text-sm">Google Play</span>
        </div>
      ) : null}

      {variant === 'partner' ? (
        <div className="rounded-[1.4rem] border border-nx-border px-6 py-6">
          <p className="font-serif text-3xl">Bring the dealer to the plant.</p>
          <p className="mt-2 text-sm text-nx-muted">Kite, Solum, Nimbus, and Vale stay on the job after handover.</p>
        </div>
      ) : null}

      {variant === 'waitlist' ? (
        <div className="text-center">
          <p className="font-serif text-4xl">2,400 already in the room.</p>
          <button type="button" className={cn(focusRing, 'mt-4 inline-flex min-h-11 items-center rounded-full bg-nx-fg px-5 text-sm text-nx-bg')}>
            Ask for a seat
          </button>
        </div>
      ) : null}

      {variant === 'quote' ? (
        <div className="rounded-[1.4rem] bg-nx-elevated px-6 py-8">
          <p className="font-serif text-3xl">Need a plant quote by Friday?</p>
          <a className={cn(focusRing, 'mt-4 inline-flex min-h-11 items-center text-sm text-nx-accent')} href="#contact">
            Send the drawing →
          </a>
        </div>
      ) : null}

      {variant === 'emergency' ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.4rem] bg-nx-danger px-5 py-5 text-white">
          <p className="font-serif text-2xl">24h cardiac desk</p>
          <p className="font-mono">+91 891 270 4499</p>
        </div>
      ) : null}

      {variant === 'studio' ? (
        <div className="rounded-[1.5rem] border border-nx-line px-6 py-8">
          <p className="text-xs tracking-[0.18em] text-nx-muted uppercase">North studio</p>
          <p className="mt-2 font-serif text-3xl">Hire the desk, not a slide.</p>
        </div>
      ) : null}

      {variant === 'event' ? (
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-[1.4rem] bg-[#111113] px-6 py-6 text-white">
          <div>
            <p className="text-[#c8ff4d]">12 Dec</p>
            <p className="font-serif text-2xl">Field Night Championships</p>
          </div>
          <a className={cn(focusRing, 'inline-flex min-h-11 items-center rounded-full bg-[#c8ff4d] px-4 text-sm text-[#111]')} href="#countdown">
            Reserve a lane
          </a>
        </div>
      ) : null}
    </section>
  )
}

export function CtaBand(props: CtaBandProps) {
  if (isWowVariant('cta-band', props.variant)) {
    return (
      <WowSignature
        family="cta-band"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <CtaBandCore {...props} />
}
