'use client'

import { MediaFrame, media } from '@/lib/media.tsx'
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

const brands = [
  { name: 'Kite', src: media.marks.kite },
  { name: 'Solum', src: media.marks.solum },
  { name: 'Nimbus', src: media.marks.nimbus },
  { name: 'Vale', src: media.marks.vale },
  { name: 'Orbit', src: media.marks.orbit },
  { name: 'Marble', src: media.marks.marble },
]

const press = [
  { name: 'Harbor Review', src: media.marks.kite },
  { name: 'Field Notes', src: media.marks.nimbus },
  { name: 'North Press', src: media.marks.orbit },
  { name: 'Lumen Weekly', src: media.marks.vale },
]

/**
 * Logo cloud
 * Twelve brand strips using original mark stills — never serif words as logos.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
export function LogoCloud({ variant = 'dealers', className }: LogoCloudProps) {
  const marks = variant === 'press' ? press : brands

  return (
    <section data-nexara="logo-cloud" data-variant={variant} className={cn('w-full', className)}>
      {variant === 'dealers' || variant === 'strip' || variant === 'grayscale' || variant === 'clients' ? (
        <div>
          <p className="mb-4 text-[11px] tracking-[0.2em] text-nx-faint uppercase">
            {variant === 'clients' ? 'In production' : 'Partner marks'}
          </p>
          <div className={cn('grid grid-cols-3 gap-3 sm:grid-cols-6', variant === 'grayscale' && 'opacity-70 grayscale')}>
            {marks.map((mark) => (
              <Mark key={mark.name} mark={mark} />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'grid' ? (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {brands.map((mark) => (
            <Mark key={mark.name} mark={mark} tall />
          ))}
        </div>
      ) : null}

      {variant === 'marquee' ? (
        <div className="overflow-hidden rounded-2xl border border-nx-border py-3">
          <div className="flex gap-4 px-4">
            {[...brands, ...brands].map((mark, index) => (
              <Mark key={`${mark.name}-${index}`} mark={mark} slim />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'partner' ? (
        <div className="rounded-[1.5rem] border border-nx-border p-6">
          <p className="text-xs tracking-[0.18em] text-nx-faint uppercase">Partner line</p>
          <p className="mt-3 font-serif text-3xl">The mark that sold the iron stays on the job.</p>
          <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {brands.slice(0, 4).map((mark) => (
              <Mark key={mark.name} mark={mark} />
            ))}
          </div>
        </div>
      ) : null}

      {variant === 'press' ? (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {press.map((mark) => (
            <Mark key={mark.name} mark={mark} />
          ))}
        </div>
      ) : null}

      {variant === 'compact' ? (
        <div className="flex flex-wrap gap-2">
          {brands.map((mark) => (
            <Mark key={mark.name} mark={mark} slim />
          ))}
        </div>
      ) : null}

      {variant === 'invert' ? (
        <div className="grid grid-cols-3 gap-3 rounded-[1.4rem] bg-[#111113] p-5 sm:grid-cols-6">
          {brands.map((mark) => (
            <Mark key={mark.name} mark={mark} invert />
          ))}
        </div>
      ) : null}

      {variant === 'stacked' ? (
        <ol className="space-y-2">
          {brands.map((mark, index) => (
            <li key={mark.name} className="flex items-center justify-between gap-3 border-b border-nx-border py-2 text-sm">
              <span className="flex items-center gap-3">
                <MediaFrame src={mark.src} alt="" grain={false} className="size-8 rounded-lg" imgClassName="object-contain p-1" />
                {mark.name}
              </span>
              <span className="text-nx-faint">{String(index + 1).padStart(2, '0')}</span>
            </li>
          ))}
        </ol>
      ) : null}

      {variant === 'badges' ? (
        <div className="flex flex-wrap gap-2">
          {brands.map((mark) => (
            <span key={mark.name} className="inline-flex items-center gap-2 rounded-full border border-nx-border px-3 py-1 text-xs">
              <MediaFrame src={mark.src} alt="" grain={false} className="size-5 rounded-full" />
              {mark.name}
            </span>
          ))}
        </div>
      ) : null}
    </section>
  )
}

function Mark({
  mark,
  tall,
  slim,
  invert,
}: {
  mark: { name: string; src: string }
  tall?: boolean
  slim?: boolean
  invert?: boolean
}) {
  return (
    <figure className={cn('overflow-hidden rounded-2xl border border-nx-border bg-nx-card', invert && 'border-white/10 bg-white/6', slim && 'min-w-28', tall && 'h-24')}>
      <MediaFrame src={mark.src} alt={mark.name} grain={false} className={cn(tall ? 'h-24' : 'h-16')} imgClassName="object-contain p-3" />
    </figure>
  )
}
