'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'saas',
  'app',
  'cinema',
  'logos',
  'pricing',
  'studio',
  'shop',
  'event',
  'search',
  'product',
  'journal',
  'waitlist',
] as const

export type HeroVariant = (typeof VARIANTS)[number]

export interface HeroProps {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  variant?: HeroVariant
  align?: 'center' | 'split'
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
  titleAs?: 'h1' | 'h2' | 'h3'
}

/**
 * Hero
 * Twelve marketing pages. Copy this file plus `src/lib/utils.ts`.
 */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media,
  variant,
  align = 'center',
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  mediaClassName,
  titleAs = 'h2',
}: HeroProps) {
  const layout: HeroVariant = variant ?? (align === 'split' ? 'product' : 'saas')
  const Title = titleAs
  const titleClass = cn('font-serif tracking-tight text-balance text-nx-fg', titleClassName)
  const lede = description ? (
    <p className={cn('text-base leading-7 text-nx-muted text-pretty', descriptionClassName)}>{description}</p>
  ) : null

  return (
    <section data-nexara="hero" data-variant={layout} className={cn('relative overflow-hidden px-6 py-16 md:px-10', className)}>
      {layout === 'saas' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-[1.05fr_0.95fr]">
          <div>
            <p className={cn('mb-4 text-xs tracking-[0.2em] text-nx-accent uppercase', eyebrowClassName)}>{eyebrow ?? 'Component registry'}</p>
            <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
            <div className="mt-5 max-w-md">{lede}</div>
            <div className={cn('mt-8 flex flex-wrap gap-3', actionsClassName)}>{actions}</div>
            <dl className="mt-10 grid max-w-md grid-cols-3 gap-4 text-sm">
              <div><dt className="text-nx-faint">Teams</dt><dd className="font-medium">2,400</dd></div>
              <div><dt className="text-nx-faint">Variants</dt><dd className="font-medium">180+</dd></div>
              <div><dt className="text-nx-faint">Copy time</dt><dd className="font-medium">12s</dd></div>
            </dl>
          </div>
          <div className={cn('rounded-2xl border border-nx-border bg-nx-card p-3 shadow-[var(--nx-shadow)]', mediaClassName)}>
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-nx-faint">nexara.app/library</span>
            </div>
            <div className="min-h-48 rounded-xl bg-nx-bg p-4">{media ?? <ProductWindow />}</div>
          </div>
        </div>
      ) : null}

      {layout === 'app' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={cn('mb-3 text-xs tracking-[0.18em] text-nx-muted uppercase', eyebrowClassName)}>{eyebrow ?? 'iOS and Android'}</p>
            <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
            <div className="mt-4 max-w-md">{lede}</div>
            <div className={cn('mt-6 flex flex-wrap gap-3', actionsClassName)}>
              <StoreBadge store="App Store" />
              <StoreBadge store="Google Play" />
              {actions}
            </div>
          </div>
          <div className={cn('flex items-end justify-center gap-4', mediaClassName)}>
            <Phone compact />
            <Phone />
          </div>
        </div>
      ) : null}

      {layout === 'cinema' ? (
        <div className="relative mx-auto min-h-[24rem] max-w-6xl overflow-hidden rounded-[1.8rem]">
          <div className={cn('absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,#4c46e055,transparent_40%),linear-gradient(140deg,#0c0c10,#1a1428_50%,#10241f)]', mediaClassName)}>
            {media}
          </div>
          <div className="absolute inset-0 bg-black/25" />
          <div className="relative z-10 flex min-h-[24rem] flex-col justify-end p-8 md:p-12">
            <Title className={cn(titleClass, 'max-w-xl text-5xl text-white md:text-6xl')}>{title}</Title>
            <div className="mt-3 max-w-lg text-white/75">{lede}</div>
            <div className={cn('mt-6 flex items-center gap-3', actionsClassName)}>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-white text-[#111]">
                <span className="ml-0.5">▶</span>
              </span>
              {actions}
            </div>
          </div>
        </div>
      ) : null}

      {layout === 'logos' ? (
        <div className="mx-auto max-w-5xl text-center">
          <p className={cn('text-xs tracking-[0.18em] text-nx-muted uppercase', eyebrowClassName)}>{eyebrow ?? 'Trusted in production'}</p>
          <Title className={cn(titleClass, 'mt-3 text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-xl">{lede}</div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {['Harbor', 'Atlas', 'Field', 'Lumen', 'North'].map((name) => (
              <li key={name} className="rounded-xl border border-nx-border bg-nx-card py-3 text-sm font-medium">
                {name}
              </li>
            ))}
          </ul>
          <blockquote className="mx-auto mt-10 max-w-xl text-left">
            <p className="font-serif text-2xl">“{typeof eyebrow === 'string' ? eyebrow : 'The room finally feels finished.'}”</p>
            <footer className="mt-2 text-sm text-nx-muted">Ada Klein, Harbor</footer>
          </blockquote>
          <div className={cn('mt-6 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'pricing' ? (
        <div className="mx-auto grid max-w-5xl items-center gap-10 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={cn('text-xs tracking-[0.18em] text-nx-accent uppercase', eyebrowClassName)}>{eyebrow ?? 'Pricing'}</p>
            <Title className={cn(titleClass, 'mt-3 text-5xl')}>{title}</Title>
            <div className="mt-4">{lede}</div>
          </div>
          <div className="rounded-[1.6rem] border border-nx-border bg-nx-card p-6 shadow-[var(--nx-shadow)]">
            <p className="text-sm text-nx-muted">Studio</p>
            <p className="mt-2 font-serif text-5xl">$48<span className="text-lg text-nx-muted">/mo</span></p>
            <ul className="mt-5 space-y-2 text-sm text-nx-muted">
              <li>Unlimited rooms</li>
              <li>Shared libraries</li>
              <li>Priority export</li>
            </ul>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'studio' ? (
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between border-b border-nx-line pb-3">
            <p className={cn('text-xs tracking-[0.28em] text-nx-muted uppercase', eyebrowClassName)}>{eyebrow ?? 'Studio index'}</p>
            <p className="text-xs text-nx-faint">04 — 12</p>
          </div>
          <Title className={cn(titleClass, 'py-10 text-6xl leading-[0.88] md:text-8xl')}>{title}</Title>
          <div className="grid gap-6 border-t border-nx-line pt-6 md:grid-cols-[1.4fr_0.6fr]">
            <div>{lede}</div>
            <div className={actionsClassName}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'shop' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div className={cn('flex min-h-72 items-center justify-center rounded-[1.6rem] bg-[radial-gradient(circle_at_30%_20%,#ddd9ff,transparent_42%),linear-gradient(160deg,#f3f1ea,#e4ddd0)]', mediaClassName)}>
            {media ?? <span className="h-40 w-16 rounded-full bg-[linear-gradient(180deg,#f7f2ea,#b9aa94)] shadow-2xl" />}
          </div>
          <div>
            <p className={cn('text-xs tracking-[0.18em] text-nx-accent uppercase', eyebrowClassName)}>{eyebrow ?? 'In stock'}</p>
            <Title className={cn(titleClass, 'mt-2 text-5xl')}>{title}</Title>
            <p className="mt-3 font-serif text-3xl">$220</p>
            <div className="mt-3">{lede}</div>
            <div className="mt-4 flex gap-2" aria-label="Finishes">
              {['#1c1915', '#f4f4f1', '#4c46e0', '#c4b7a4'].map((swatch) => (
                <span key={swatch} className="size-7 rounded-full border border-nx-border" style={{ background: swatch }} />
              ))}
            </div>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'event' ? (
        <div className="mx-auto max-w-4xl text-center">
          <p className={cn('text-xs tracking-[0.22em] text-nx-accent uppercase', eyebrowClassName)}>{eyebrow ?? '12 Nov · Harbor Hall'}</p>
          <Title className={cn(titleClass, 'mt-4 text-5xl md:text-7xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg">{lede}</div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {[['12', 'Days'], ['04', 'Hours'], ['18', 'Min'], ['09', 'Sec']].map(([value, unit]) => (
              <div key={unit} className="rounded-2xl border border-nx-border bg-nx-card py-4">
                <p className="font-serif text-3xl">{value}</p>
                <p className="text-[10px] tracking-[0.16em] text-nx-muted uppercase">{unit}</p>
              </div>
            ))}
          </div>
          <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'search' ? (
        <div className="mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg">{lede}</div>
          <form className="mt-8 flex overflow-hidden rounded-full border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]" action="#" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-hero-search">Search</label>
            <input id="nexara-hero-search" className="h-14 flex-1 bg-transparent px-5 text-nx-fg outline-none" placeholder="Search the library" />
            <button type="submit" className="m-1 rounded-full bg-nx-fg px-5 text-sm text-nx-bg">Search</button>
          </form>
          <div className={cn('mt-4 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'product' ? (
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-nx-border bg-nx-card p-4">
            <p className="text-sm font-medium">{eyebrow ?? 'Nexara'}</p>
            <ul className="mt-4 space-y-1 text-sm text-nx-muted">
              <li className="rounded-xl bg-nx-soft px-3 py-2 text-nx-fg">Overview</li>
              <li className="px-3 py-2">Rooms</li>
              <li className="px-3 py-2">Library</li>
            </ul>
          </aside>
          <div>
            <Title className={cn(titleClass, 'text-4xl md:text-5xl')}>{title}</Title>
            <div className="mt-3 max-w-xl">{lede}</div>
            <div className={cn('mt-6 grid gap-3 sm:grid-cols-3', mediaClassName)}>
              {media ?? (
                <>
                  <Stat label="Open" value="24" />
                  <Stat label="Shipped" value="128" />
                  <Stat label="Queue" value="6" />
                </>
              )}
            </div>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'journal' ? (
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div className={cn('min-h-72 bg-nx-fg p-6 text-nx-bg', mediaClassName)}>
            <p className="text-xs tracking-[0.2em] uppercase">Issue 18</p>
            {media ?? <p className="mt-20 font-serif text-6xl leading-none">Cover</p>}
          </div>
          <div className="flex flex-col justify-end">
            <p className={cn('text-xs tracking-[0.22em] text-nx-accent uppercase', eyebrowClassName)}>{eyebrow ?? 'The journal'}</p>
            <Title className={cn(titleClass, 'mt-3 text-5xl leading-[0.9] md:text-7xl')}>{title}</Title>
            <div className="mt-4 max-w-md border-t border-nx-line pt-4">{lede}</div>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'waitlist' ? (
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex justify-center -space-x-2">
            {['AK', 'JR', 'MC', 'EP'].map((initials, index) => (
              <span key={initials} className="inline-flex size-9 items-center justify-center rounded-full border-2 border-nx-bg bg-nx-soft text-[11px] font-medium" style={{ zIndex: 4 - index }}>
                {initials}
              </span>
            ))}
          </div>
          <p className={cn('text-xs tracking-[0.18em] text-nx-muted uppercase', eyebrowClassName)}>{eyebrow ?? '2,400 already in'}</p>
          <Title className={cn(titleClass, 'mt-3 text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-md">{lede}</div>
          <form className="mt-6 flex gap-2" action="#" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-waitlist">Email</label>
            <input id="nexara-waitlist" type="email" placeholder="you@studio.com" className="h-12 flex-1 rounded-full border border-nx-border bg-nx-card px-4 text-nx-fg outline-none" />
            <button type="submit" className="h-12 rounded-full bg-nx-fg px-5 text-sm text-nx-bg">Join</button>
          </form>
          <div className={cn('mt-4', actionsClassName)}>{actions}</div>
        </div>
      ) : null}
    </section>
  )
}

function ProductWindow() {
  return (
    <div className="grid h-40 grid-cols-3 gap-2">
      <div className="col-span-2 rounded-lg border border-nx-border bg-nx-card p-3">
        <p className="text-[11px] text-nx-muted">Uptime</p>
        <p className="font-serif text-3xl">99.98</p>
      </div>
      <div className="rounded-lg bg-nx-accent/90 p-3 text-nx-accent-fg">
        <p className="text-[11px] opacity-80">Queue</p>
        <p className="font-serif text-3xl">6</p>
      </div>
      <div className="rounded-lg border border-nx-border bg-nx-card" />
      <div className="col-span-2 rounded-lg border border-nx-border bg-nx-elevated" />
    </div>
  )
}

function Phone({ compact = false }: { compact?: boolean }) {
  return (
    <div className={cn('w-28 rounded-[1.6rem] border border-nx-border bg-[#111113] p-2 shadow-[var(--nx-shadow)]', compact ? 'h-44' : 'h-52')}>
      <div className="flex h-full flex-col rounded-[1.15rem] bg-[#16161a] p-3">
        <span className="mx-auto mb-3 h-1 w-8 rounded-full bg-white/20" />
        <span className="h-16 rounded-xl bg-[linear-gradient(135deg,#4c46e0,#22c5b0)]" />
        <span className="mt-3 h-2 w-16 rounded bg-white/20" />
        <span className="mt-2 h-2 w-12 rounded bg-white/10" />
        <span className="mt-auto h-8 rounded-lg bg-white/10" />
      </div>
    </div>
  )
}

function StoreBadge({ store }: { store: string }) {
  return (
    <span className="inline-flex h-12 min-w-36 flex-col justify-center rounded-xl border border-nx-border bg-nx-card px-3 text-left">
      <span className="text-[10px] text-nx-muted">Download on the</span>
      <span className="text-sm">{store}</span>
    </span>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-nx-border bg-nx-card p-4">
      <p className="text-xs text-nx-muted">{label}</p>
      <p className="font-serif text-3xl">{value}</p>
    </div>
  )
}
