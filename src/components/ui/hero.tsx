'use client'

import { type ReactNode } from 'react'
import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'saas',
  'download',
  'video',
  'logos',
  'pricing',
  'agency',
  'commerce',
  'event',
  'search',
  'dashboard',
  'editorial',
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
 * Twelve products: SaaS mockup, app download, video, logo cloud, pricing,
 * agency masthead, commerce stage, event countdown, search, dashboard,
 * magazine cover, and a waitlist.
 * Copy this file plus `src/lib/utils.ts`.
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
  const layout: HeroVariant = variant ?? (align === 'split' ? 'dashboard' : 'saas')
  const Title = titleAs
  const titleClass = cn('font-serif text-[#f6f3ec] text-balance', titleClassName)
  const lede = description ? (
    <p className={cn('text-base leading-7 text-zinc-300 text-pretty', descriptionClassName)}>{description}</p>
  ) : null

  return (
    <section data-nexara="hero" data-variant={layout} className={cn('relative overflow-hidden px-6 py-14 md:px-10', className)}>
      {layout === 'saas' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className={cn('mb-4 text-xs tracking-[0.2em] text-[#f5c16c] uppercase', eyebrowClassName)}>{eyebrow ?? 'Product'}</p>
            <Title className={cn(titleClass, 'text-4xl md:text-6xl')}>{title}</Title>
            <div className="mt-5 max-w-md">{lede}</div>
            <div className={cn('mt-8 flex flex-wrap gap-3', actionsClassName)}>{actions}</div>
          </div>
          <div className={cn('rounded-2xl border border-white/10 bg-[radial-gradient(circle_at_20%_0%,#8b7cff55,transparent_45%),linear-gradient(180deg,#171822,#0c0d14)] p-3 shadow-2xl', mediaClassName)}>
            <div className="mb-3 flex gap-1.5">
              <span className="size-2.5 rounded-full bg-[#ff6a3d]" />
              <span className="size-2.5 rounded-full bg-[#f5c16c]" />
              <span className="size-2.5 rounded-full bg-[#3ddec4]" />
            </div>
            <div className="min-h-40 rounded-xl bg-white/5 p-4">{media ?? <WindowMock />}</div>
          </div>
        </div>
      ) : null}

      {layout === 'download' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className={cn('mb-3 text-xs tracking-[0.18em] text-zinc-400 uppercase', eyebrowClassName)}>{eyebrow ?? 'iOS and Android'}</p>
            <Title className={cn(titleClass, 'text-4xl md:text-6xl')}>{title}</Title>
            <div className="mt-4 max-w-md">{lede}</div>
            <div className={cn('mt-6 flex flex-wrap gap-3', actionsClassName)}>
              <StoreBadge store="App Store" />
              <StoreBadge store="Google Play" />
              {actions}
            </div>
          </div>
          <div className={cn('flex items-end justify-center gap-4', mediaClassName)}>
            <Phone tone="#ff6a3d" />
            <Phone tone="#8b7cff" tall />
          </div>
        </div>
      ) : null}

      {layout === 'video' ? (
        <div className="relative mx-auto min-h-[22rem] max-w-6xl overflow-hidden rounded-3xl">
          <div className={cn('absolute inset-0 bg-[#141018]', mediaClassName)}>{media ?? <div className="h-full w-full bg-[linear-gradient(120deg,#1c1428,#3d1d16_50%,#10241f)]" />}</div>
          <div className="relative z-10 flex min-h-[22rem] flex-col justify-end p-8">
            <Title className={cn(titleClass, 'max-w-xl text-4xl md:text-6xl')}>{title}</Title>
            <div className="mt-3 max-w-lg">{lede}</div>
            <div className={cn('mt-6 flex items-center gap-3', actionsClassName)}>
              <span className="inline-flex size-12 items-center justify-center rounded-full bg-[#f6f3ec] text-[#16140f]">▶</span>
              {actions}
            </div>
          </div>
        </div>
      ) : null}

      {layout === 'logos' ? (
        <div className="mx-auto max-w-5xl text-center">
          <Title className={cn(titleClass, 'text-4xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-xl">{lede}</div>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-3">
            {['North', 'Kite', 'Field', 'Harbor', 'Lumen'].map((name) => (
              <li key={name} className="rounded-full border border-white/10 px-4 py-2 text-xs tracking-[0.16em] text-zinc-400 uppercase">
                {name}
              </li>
            ))}
          </ul>
          <blockquote className="mx-auto mt-8 max-w-xl border-t border-white/10 pt-6 text-left">
            <p className="font-serif text-xl text-[#f6f3ec]">“{eyebrow ?? 'The room finally feels finished.'}”</p>
            <footer className="mt-2 text-sm text-zinc-400">{description ?? 'Ada Klein, studio lead'}</footer>
          </blockquote>
          <div className={cn('mt-6 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'pricing' ? (
        <div className="mx-auto grid max-w-5xl gap-8 md:grid-cols-[1.1fr_0.9fr] md:items-center">
          <div>
            <p className={cn('text-xs tracking-[0.18em] text-[#f5c16c] uppercase', eyebrowClassName)}>{eyebrow ?? 'Pricing'}</p>
            <Title className={cn(titleClass, 'mt-3 text-4xl md:text-5xl')}>{title}</Title>
            <div className="mt-4">{lede}</div>
          </div>
          <div className="rounded-3xl border border-white/10 bg-[#12131c] p-6">
            <p className="text-sm text-zinc-400">Studio</p>
            <p className="mt-2 font-serif text-5xl text-[#f6f3ec]">$48<span className="text-lg text-zinc-400">/mo</span></p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li>Unlimited rooms</li>
              <li>Shared libraries</li>
              <li>Priority export</li>
            </ul>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'agency' ? (
        <div className="mx-auto max-w-6xl">
          <div className="flex items-end justify-between border-b border-white/15 pb-3">
            <p className={cn('text-xs tracking-[0.28em] text-[#f5c16c] uppercase', eyebrowClassName)}>{eyebrow ?? 'Studio index'}</p>
            <p className="text-xs text-zinc-500">04 — 12</p>
          </div>
          <Title className={cn(titleClass, 'py-8 text-6xl leading-[0.85] md:text-8xl')}>{title}</Title>
          <div className="grid gap-6 border-t border-white/15 pt-6 md:grid-cols-[1.4fr_0.6fr]">
            <div>{lede}</div>
            <div className={actionsClassName}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'commerce' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-8 md:grid-cols-2">
          <div className={cn('flex min-h-64 items-center justify-center rounded-3xl bg-[#f6f3ec] text-[#1c1915]', mediaClassName)}>
            {media ?? <p className="font-serif text-3xl">Lamp 04</p>}
          </div>
          <div>
            <p className={cn('text-xs tracking-[0.18em] uppercase text-[#ff6a3d]', eyebrowClassName)}>{eyebrow ?? 'In stock'}</p>
            <Title className={cn(titleClass, 'mt-2 text-4xl')}>{title}</Title>
            <p className="mt-3 font-serif text-3xl text-[#f5c16c]">$220</p>
            <div className="mt-3">{lede}</div>
            <div className="mt-4 flex gap-2" aria-label="Finishes">
              {['#1c1915', '#f6f3ec', '#ff6a3d', '#8b7cff'].map((swatch) => (
                <span key={swatch} className="size-7 rounded-full border border-white/30" style={{ background: swatch }} />
              ))}
            </div>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'event' ? (
        <div className="mx-auto max-w-4xl text-center">
          <p className={cn('text-xs tracking-[0.22em] text-[#f5c16c] uppercase', eyebrowClassName)}>{eyebrow ?? '12 Nov · Harbor Hall'}</p>
          <Title className={cn(titleClass, 'mt-4 text-5xl md:text-7xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg">{lede}</div>
          <div className="mt-8 grid grid-cols-4 gap-2">
            {[
              ['12', 'Days'],
              ['04', 'Hours'],
              ['18', 'Min'],
              ['09', 'Sec'],
            ].map(([value, unit]) => (
              <div key={unit} className="rounded-2xl border border-white/10 bg-[#12131c] py-4">
                <p className="font-serif text-3xl text-[#f6f3ec]">{value}</p>
                <p className="text-[10px] tracking-[0.16em] text-zinc-400 uppercase">{unit}</p>
              </div>
            ))}
          </div>
          <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'search' ? (
        <div className="mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-4xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg">{lede}</div>
          <form className="mt-8 flex overflow-hidden rounded-full border border-white/15 bg-[#12131c]" action="#" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-hero-search">Search</label>
            <input id="nexara-hero-search" className="h-14 flex-1 bg-transparent px-5 text-[#f6f3ec] outline-none" placeholder="Search the library" />
            <button type="submit" className="m-1 rounded-full bg-[#f6f3ec] px-5 text-sm text-[#16140f]">Search</button>
          </form>
          <div className={cn('mt-4 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'dashboard' ? (
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-white/10 bg-[#12131c] p-4">
            <p className="font-serif text-lg">{eyebrow ?? 'Nexara'}</p>
            <ul className="mt-4 space-y-2 text-sm text-zinc-300">
              <li className="rounded-xl bg-white/10 px-3 py-2">Overview</li>
              <li className="px-3 py-2">Rooms</li>
              <li className="px-3 py-2">Library</li>
            </ul>
          </aside>
          <div>
            <Title className={cn(titleClass, 'text-3xl md:text-5xl')}>{title}</Title>
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

      {layout === 'editorial' ? (
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[0.8fr_1.2fr]">
          <div className={cn('min-h-64 bg-[#f6f3ec] p-6 text-[#1c1915]', mediaClassName)}>
            <p className="text-xs tracking-[0.2em] uppercase">Issue 18</p>
            {media ?? <p className="mt-16 font-serif text-5xl leading-none">Cover</p>}
          </div>
          <div className="flex flex-col justify-end">
            <p className={cn('text-xs tracking-[0.22em] text-[#f5c16c] uppercase', eyebrowClassName)}>{eyebrow ?? 'The journal'}</p>
            <Title className={cn(titleClass, 'mt-3 text-5xl leading-[0.9] md:text-7xl')}>{title}</Title>
            <div className="mt-4 max-w-md border-t border-white/15 pt-4">{lede}</div>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'waitlist' ? (
        <div className="mx-auto max-w-xl text-center">
          <div className="mb-4 flex justify-center -space-x-2">
            {['#ff6a3d', '#f5c16c', '#8b7cff', '#3ddec4'].map((tone) => (
              <span key={tone} className="size-8 rounded-full border-2 border-[#09090f]" style={{ background: tone }} />
            ))}
          </div>
          <p className={cn('text-xs tracking-[0.18em] text-zinc-400 uppercase', eyebrowClassName)}>{eyebrow ?? '2,400 already in'}</p>
          <Title className={cn(titleClass, 'mt-3 text-4xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-md">{lede}</div>
          <form className="mt-6 flex gap-2" action="#" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-waitlist">Email</label>
            <input id="nexara-waitlist" type="email" placeholder="you@studio.com" className="h-12 flex-1 rounded-full border border-white/15 bg-transparent px-4 text-[#f6f3ec] outline-none" />
            <button type="submit" className="h-12 rounded-full bg-[#f6f3ec] px-5 text-sm text-[#16140f]">Join</button>
          </form>
          <div className={cn('mt-4', actionsClassName)}>{actions}</div>
        </div>
      ) : null}
    </section>
  )
}

function WindowMock() {
  return (
    <div className="grid h-36 grid-cols-3 gap-2">
      <div className="col-span-2 rounded-lg bg-white/10" />
      <div className="rounded-lg bg-[#ff6a3d]/70" />
      <div className="rounded-lg bg-[#3ddec4]/50" />
      <div className="col-span-2 rounded-lg bg-white/5" />
    </div>
  )
}

function Phone({ tone, tall = false }: { tone: string; tall?: boolean }) {
  return (
    <div className={cn('w-24 rounded-[1.4rem] border border-white/20 bg-[#101118] p-2', tall ? 'h-48' : 'h-40')}>
      <div className="h-full rounded-[1rem]" style={{ background: tone }} />
    </div>
  )
}

function StoreBadge({ store }: { store: string }) {
  return (
    <span className="inline-flex h-12 min-w-36 flex-col justify-center rounded-xl border border-white/15 px-3 text-left">
      <span className="text-[10px] text-zinc-400">Download on the</span>
      <span className="text-sm text-[#f6f3ec]">{store}</span>
    </span>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#12131c] p-4">
      <p className="text-xs text-zinc-400">{label}</p>
      <p className="font-serif text-3xl text-[#f6f3ec]">{value}</p>
    </div>
  )
}
