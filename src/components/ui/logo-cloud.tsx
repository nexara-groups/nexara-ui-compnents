'use client'

import { isWowVariant, WowSignature } from './wow-signatures.tsx'

import { LoopPause, MediaFrame, media } from '@/lib/media.tsx'
import { cn, useKeyframes, useLoopControl, usePrefersReducedMotion } from '@/lib/utils.ts'

const MARQUEE_CSS = `
@keyframes nexara-logo-marquee {
  to { transform: translateX(-50%); }
}
`

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
  'orbit-3d',
  'magnetic-marks',
  'glare-lockups',
  'particle-press',
] as const

export type LogoCloudVariant = (typeof VARIANTS)[number]

export interface LogoCloudProps {
  variant?: LogoCloudVariant
  className?: string
}

const partners = [
  { name: 'Kite', lockup: media.lockups.kite, city: 'Chennai plant', line: 'VRF iron' },
  { name: 'Solum', lockup: media.lockups.solum, city: 'Coimbatore bay', line: 'Ground loops' },
  { name: 'Nimbus', lockup: media.lockups.nimbus, city: 'Hyderabad desk', line: 'Controls' },
  { name: 'Vale', lockup: media.lockups.vale, city: 'Kochi yard', line: 'Copper' },
  { name: 'Orbit', lockup: media.lockups.orbit, city: 'Pune hall', line: 'Commission' },
  { name: 'Marble', lockup: media.lockups.marble, city: 'Bengaluru loft', line: 'Finish' },
]

const press = [
  { name: 'Harbor Review', lockup: media.press.harbor },
  { name: 'Field Notes', lockup: media.press.field },
  { name: 'North Press', lockup: media.press.north },
  { name: 'Lumen Weekly', lockup: media.press.lumen },
]

/**
 * Logo cloud
 * Twelve brand strips. Dealers use original color lockups — different type,
 * mark, and ground — never six matching glyphs.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
function LogoCloudCore({ variant = 'dealers', className }: LogoCloudProps) {
  const loop = useLoopControl()
  const reduced = usePrefersReducedMotion()
  useKeyframes('nexara-logo-marquee', MARQUEE_CSS)

  return (
    <section data-nexara="logo-cloud" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'dealers' ? (
        <div>
          <p className="mb-4 text-[11px] tracking-[0.2em] text-nx-muted uppercase">Authorised dealers</p>
          <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {partners.map((brand) => (
              <li key={brand.name}>
                <Lockup src={brand.lockup} name={brand.name} />
                <p className="mt-2 text-xs text-nx-muted">{brand.city}</p>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'strip' ? (
        <div className="overflow-hidden rounded-[1.4rem] border border-nx-field bg-nx-card">
          <div className="flex items-center justify-between border-b border-nx-border px-4 py-2">
            <p className="text-[11px] tracking-[0.18em] text-nx-muted uppercase">On the job after handover</p>
            <p className="text-xs text-nx-muted">Harbor Climate</p>
          </div>
          <div className="flex gap-3 overflow-x-auto p-3">
            {partners.map((brand) => (
              <Lockup key={brand.name} src={brand.lockup} name={brand.name} className="min-w-40" />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'grid' ? (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {partners.map((brand) => (
            <article key={brand.name} className="overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card">
              <Lockup src={brand.lockup} name={brand.name} tall />
              <div className="flex items-center justify-between px-4 py-3 text-sm">
                <span>{brand.line}</span>
                <span className="text-nx-muted">{brand.city}</span>
              </div>
            </article>
          ))}
        </div>
      ) : null}

      {variant === 'marquee' ? (
        <div className="relative overflow-hidden rounded-[1.4rem] border border-nx-border py-4">
          <div className={cn('flex w-max gap-4 px-4', loop.playing && !reduced && 'motion-safe:animate-[nexara-logo-marquee_28s_linear_infinite]')}>
            {[...partners, ...partners].map((brand, index) => (
              <Lockup key={`${brand.name}-${index}`} src={brand.lockup} name={brand.name} className="min-w-40" />
            ))}
          </div>
          <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute top-3 right-3" />
        </div>
      ) : null}

      {variant === 'grayscale' ? (
        <div className="grid grid-cols-2 gap-3 opacity-80 grayscale sm:grid-cols-3">
          {partners.map((brand) => (
            <Lockup key={brand.name} src={brand.lockup} name={brand.name} />
          ))}
        </div>
      ) : null}

      {variant === 'partner' ? (
        <div className="rounded-[1.6rem] border border-nx-border bg-nx-card p-6 shadow-[var(--nx-shadow)]">
          <p className="text-[11px] tracking-[0.18em] text-nx-muted uppercase">Partner line</p>
          <p className="mt-3 max-w-xl font-serif text-3xl leading-tight">The mark that sold the iron stays on the job.</p>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {partners.slice(0, 4).map((brand) => (
              <Lockup key={brand.name} src={brand.lockup} name={brand.name} />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'press' ? (
        <div>
          <p className="mb-4 text-[11px] tracking-[0.2em] text-nx-muted uppercase">As written</p>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {press.map((title) => (
              <Lockup key={title.name} src={title.lockup} name={title.name} />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'clients' ? (
        <div>
          <p className="mb-4 text-[11px] tracking-[0.2em] text-nx-muted uppercase">In production</p>
          <ul className="grid gap-3 sm:grid-cols-2">
            {partners.slice(0, 4).map((brand) => (
              <li key={brand.name} className="flex items-center gap-3 rounded-2xl border border-nx-border bg-nx-card p-2">
                <Lockup src={brand.lockup} name={brand.name} className="w-36 shrink-0" />
                <span className="text-sm text-nx-muted">{brand.line}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      {variant === 'compact' ? (
        <div className="flex flex-wrap gap-2">
          {partners.map((brand) => (
            <Lockup key={brand.name} src={brand.lockup} name={brand.name} className="w-36" />
          ))}
        </div>
      ) : null}

      {variant === 'invert' ? (
        <div className="rounded-[1.5rem] bg-[#111113] p-5">
          <p className="mb-4 text-[11px] tracking-[0.18em] text-white/60 uppercase">Night strip</p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {partners.map((brand) => (
              <Lockup key={brand.name} src={brand.lockup} name={brand.name} invert />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'stacked' ? (
        <ol className="divide-y divide-nx-border rounded-[1.4rem] border border-nx-border bg-nx-card">
          {partners.map((brand, index) => (
            <li key={brand.name} className="flex items-center justify-between gap-4 px-4 py-3">
              <span className="flex items-center gap-3">
                <span className="w-8 font-mono text-xs text-nx-muted">{String(index + 1).padStart(2, '0')}</span>
                <Lockup src={brand.lockup} name={brand.name} className="w-36" />
              </span>
              <span className="text-sm text-nx-muted">{brand.city}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'badges' ? (
        <div className="flex flex-wrap gap-2">
          {partners.map((brand) => (
            <span key={brand.name} className="inline-flex items-center gap-2 rounded-full border border-nx-field bg-nx-card pr-3">
              <MediaFrame src={brand.lockup} alt="" grain={false} className="h-8 w-20 rounded-full" imgClassName="object-cover" />
              <span className="text-xs">{brand.name}</span>
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function Lockup({
  src,
  name,
  className,
  tall,
  invert,
}: {
  src: string
  name: string
  className?: string
  tall?: boolean
  invert?: boolean
}) {
  return (
    <figure className={cn('overflow-hidden rounded-2xl border border-nx-border bg-nx-card', invert && 'border-white/10', className)}>
      <MediaFrame
        src={src}
        alt={name}
        grain={false}
        className={cn(tall ? 'h-28' : 'h-16')}
        imgClassName="object-contain"
      />
    </figure>
  )
}

export function LogoCloud(props: LogoCloudProps) {
  if (isWowVariant('logo-cloud', props.variant)) {
    return (
      <WowSignature
        family="logo-cloud"
        variant={props.variant!}
        className={props.className}
        
       />
    )
  }
  return <LogoCloudCore {...props} />
}
