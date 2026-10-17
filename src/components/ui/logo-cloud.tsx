'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'dealers',
  'strip',
  'grid',
  'marquee',
  'grayscale',
  'partner',
  'press',
  'clients',
  'compact',
  'invert',
  'stacked',
  'badges',
] as const

export type LogoCloudVariant = (typeof VARIANTS)[number]

export interface LogoCloudProps {
  variant?: LogoCloudVariant
  className?: string
}

const dealers = ['Voltas', 'Daikin', 'Dunham-Bush', 'O General', 'Blue Star', 'Hitachi']
const clients = ['Sai Nirmaan', 'Happy Farms', 'Sri', 'Rise', 'IARSA', 'Qualigene', 'Voice']
const press = ['The Hindu', 'Eenadu', 'YourStory', 'Inc42']

/**
 * Logo cloud
 * Twelve brand strips: HVAC dealers, Nexara clients, press marks.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function LogoCloud({ variant = 'dealers', className }: LogoCloudProps) {
  const marks = variant === 'clients' || variant === 'stacked' ? clients : variant === 'press' ? press : dealers

  return (
    <section data-nexara="logo-cloud" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'dealers' || variant === 'strip' || variant === 'grayscale' || variant === 'clients' ? (
        <div>
          <p className="mb-4 text-[11px] tracking-[0.2em] text-nx-faint uppercase">
            {variant === 'clients' ? 'In production' : 'Authorised dealers'}
          </p>
          <div className={cn('flex flex-wrap items-center gap-x-8 gap-y-3', variant === 'grayscale' && 'opacity-60')}>
            {marks.map((name) => (
              <span key={name} className="font-serif text-2xl">
                {name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {dealers.map((name) => (
            <span key={name} className="grid h-20 place-items-center rounded-2xl border border-nx-border bg-nx-card font-serif text-xl">
              {name}
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'marquee' ? (
        <div className="overflow-hidden rounded-2xl border border-nx-border py-4">
          <div className="flex gap-10 px-6">
            {[...dealers, ...dealers].map((name, index) => (
              <span key={`${name}-${index}`} className="whitespace-nowrap font-serif text-2xl">
                {name}
              </span>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'partner' ? (
        <div className="rounded-[1.5rem] border border-nx-border p-6">
          <p className="text-xs tracking-[0.18em] text-nx-faint uppercase">Partner line</p>
          <p className="mt-3 font-serif text-3xl">The brand that sold the iron stays on the job.</p>
          <div className="mt-5 flex flex-wrap gap-4 text-sm text-nx-muted">
            {dealers.slice(0, 4).map((name) => (
              <span key={name}>{name}</span>
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'press' ? (
        <div className="flex flex-wrap gap-6 text-sm tracking-[0.16em] text-nx-muted uppercase">
          {press.map((name) => (
            <span key={name}>{name}</span>
          ))}
        </div>
      ) : null}

      {variant === 'compact' ? (
        <p className="text-sm text-nx-muted">{dealers.join(' · ')}</p>
      ) : null}

      {variant === 'invert' ? (
        <div className="flex flex-wrap gap-6 rounded-[1.4rem] bg-[#111113] px-6 py-5 text-white">
          {dealers.map((name) => (
            <span key={name} className="font-serif text-xl">
              {name}
            </span>
          ))}
        </div>
      ) : null}

      {variant === 'stacked' ? (
        <ol className="space-y-2">
          {clients.map((name, index) => (
            <li key={name} className="flex justify-between border-b border-nx-border py-2 text-sm">
              <span>{name}</span>
              <span className="text-nx-faint">{String(index + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'badges' ? (
        <div className="flex flex-wrap gap-2">
          {dealers.map((name) => (
            <span key={name} className="rounded-full border border-nx-border px-3 py-1 text-xs">
              {name}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}
