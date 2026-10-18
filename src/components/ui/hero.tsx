'use client'

import { type ReactNode, useState } from 'react'
import { MediaFrame, PlayControl, faces, media } from '@/lib/media.tsx'
import { cn, focusRing } from '@/lib/utils.ts'
import { EXTRA_HERO, ExtraHero, type ExtraHeroVariant } from './hero-extra.tsx'

const CORE_HERO = [
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

const VARIANTS = [...CORE_HERO, ...EXTRA_HERO] as const

const marks = [
  { name: 'Kite', src: media.marks.kite },
  { name: 'Solum', src: media.marks.solum },
  { name: 'Nimbus', src: media.marks.nimbus },
  { name: 'Vale', src: media.marks.vale },
  { name: 'Orbit', src: media.marks.orbit },
] as const

const waitlistFaces = faces.slice(0, 4)

export type HeroVariant = (typeof VARIANTS)[number]

export interface HeroProps {
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  image?: string
  video?: string
  poster?: string
  lottie?: string
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
 * Thirty marketing pages. Media is first-class: pass `image`, `video`,
 * `poster`, `lottie`, or `media` children. Defaults are bundled originals.
 * Copy this file, `hero-extra.tsx`, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
export function Hero({
  eyebrow,
  title,
  description,
  actions,
  media: mediaSlot,
  image,
  video,
  poster,
  lottie,
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
  if ((EXTRA_HERO as readonly string[]).includes(layout)) {
    return (
      <ExtraHero
        variant={layout as ExtraHeroVariant}
        eyebrow={eyebrow}
        title={title}
        description={description}
        actions={actions}
        media={mediaSlot}
        image={image}
        video={video}
        poster={poster}
        lottie={lottie}
        className={className}
        eyebrowClassName={eyebrowClassName}
        titleClassName={titleClassName}
        descriptionClassName={descriptionClassName}
        actionsClassName={actionsClassName}
        mediaClassName={mediaClassName}
        titleAs={titleAs}
      />
    )
  }
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
          <div className={cn('overflow-hidden rounded-2xl border border-nx-border bg-nx-card p-3 shadow-[var(--nx-shadow)]', mediaClassName)}>
            <div className="mb-3 flex items-center gap-2">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-nx-faint">harbor.studio/library</span>
            </div>
            <MediaFrame src={image ?? media.device} video={video} poster={poster} lottie={lottie} alt="Product still" className="min-h-48 rounded-xl">
              {mediaSlot}
            </MediaFrame>
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
            <Phone src={image ?? media.screens.field} compact />
            <Phone src={image ?? media.screens.lumen} />
          </div>
        </div>
      ) : null}

      {layout === 'cinema' ? (
        <CinemaHero
          Title={Title}
          title={title}
          lede={lede}
          actions={actions}
          mediaSlot={mediaSlot}
          image={image}
          video={video}
          poster={poster}
          lottie={lottie}
          titleClass={titleClass}
          actionsClassName={actionsClassName}
          mediaClassName={mediaClassName}
        />
      ) : null}

      {layout === 'logos' ? (
        <div className="mx-auto max-w-5xl text-center">
          <p className={cn('text-xs tracking-[0.18em] text-nx-muted uppercase', eyebrowClassName)}>{eyebrow ?? 'Trusted in production'}</p>
          <Title className={cn(titleClass, 'mt-3 text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-xl">{lede}</div>
          <ul className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-5">
            {marks.map((mark) => (
              <li key={mark.name} className="overflow-hidden rounded-xl border border-nx-border bg-nx-card">
                <MediaFrame src={mark.src} alt={mark.name} grain={false} className="h-16" imgClassName="object-contain p-3" />
              </li>
            ))}
          </ul>
          <blockquote className="mx-auto mt-10 max-w-xl text-left">
            <p className="font-serif text-2xl">“The room finally feels finished.”</p>
            <footer className="mt-2 flex min-w-0 items-center gap-3 text-sm text-nx-muted">
              <MediaFrame src={media.people.anitha} alt="Anitha Rao" grain={false} className="size-9 shrink-0 rounded-full" />
              <span className="min-w-0">Anitha Rao, Harbor</span>
            </footer>
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
          <div className="overflow-hidden rounded-[1.6rem] border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]">
            <MediaFrame src={image ?? media.glass} alt="" className="h-28" />
            <div className="p-6">
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
            <MediaFrame src={image ?? media.featured} alt="" className="h-32 rounded-2xl" />
            <div className={actionsClassName}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'shop' ? (
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <MediaFrame src={image ?? media.lamp} video={video} poster={poster} lottie={lottie} alt="Lamp 04" grain={false} className={cn('min-h-72 rounded-[1.6rem]', mediaClassName)}>
            {mediaSlot}
          </MediaFrame>
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
        <div className="relative mx-auto max-w-4xl overflow-hidden rounded-[1.8rem] px-6 py-16 text-center text-white">
          <MediaFrame src={image ?? media.sports} alt="" className="absolute inset-0" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="relative">
            <p className={cn('text-xs tracking-[0.22em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? '12 Nov · Harbor Hall'}</p>
            <Title className={cn(titleClass, 'mt-4 text-5xl text-white md:text-7xl')}>{title}</Title>
            <div className="mx-auto mt-4 max-w-lg text-white/75">{lede}</div>
            <div className="mt-8 grid grid-cols-4 gap-2">
              {[['12', 'Days'], ['04', 'Hours'], ['18', 'Min'], ['09', 'Sec']].map(([value, unit]) => (
                <div key={unit} className="rounded-2xl border border-white/15 bg-white/8 py-4 backdrop-blur-md">
                  <p className="font-serif text-3xl">{value}</p>
                  <p className="text-[10px] tracking-[0.16em] text-white/65 uppercase">{unit}</p>
                </div>
              ))}
            </div>
            <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'search' ? (
        <div className="mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg">{lede}</div>
          <form className="mt-8 flex overflow-hidden rounded-full border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]" action="#" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-hero-search">Search</label>
            <input id="nexara-hero-search" className={cn(focusRing, 'h-14 flex-1 rounded-full bg-transparent px-5 text-nx-fg')} placeholder="Search the library" />
            <button type="submit" className="m-1 rounded-full bg-nx-fg px-5 text-sm text-nx-bg">Search</button>
          </form>
          <div className={cn('mt-4 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      ) : null}

      {layout === 'product' ? (
        <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[14rem_minmax(0,1fr)]">
          <aside className="rounded-3xl border border-nx-border bg-nx-card p-4">
            <p className="text-sm font-medium">{eyebrow ?? 'Harbor'}</p>
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
              {mediaSlot ?? (
                <>
                  <Stat label="Open" value="24" src={media.cases.build} />
                  <Stat label="Shipped" value="128" src={media.cases.farm} />
                  <Stat label="Queue" value="6" src={media.cases.lab} />
                </>
              )}
            </div>
            <div className={cn('mt-6', actionsClassName)}>{actions}</div>
          </div>
        </div>
      ) : null}

      {layout === 'journal' ? (
        <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-[0.85fr_1.15fr]">
          <div className={cn('relative min-h-72 overflow-hidden', mediaClassName)}>
            <MediaFrame src={image ?? media.journal} video={video} poster={poster} lottie={lottie} alt="Issue 18 cover" className="absolute inset-0">
              {mediaSlot}
            </MediaFrame>
            {mediaSlot ? null : (
              <div className="absolute inset-0 flex flex-col justify-between p-6 text-white">
                <p className="text-xs tracking-[0.2em] uppercase">Issue 18</p>
                <p className="font-serif text-6xl leading-none">Cover</p>
              </div>
            )}
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
          <div className="mb-4 flex justify-center -space-x-2" role="img" aria-label={waitlistFaces.map((person) => person.name).join(', ')}>
            {waitlistFaces.map((person) => (
              <MediaFrame key={person.src} src={person.src} alt={person.name} grain={false} className="size-10 shrink-0 rounded-full border-2 border-nx-bg" />
            ))}
          </div>
          <p className={cn('text-xs tracking-[0.18em] text-nx-muted uppercase', eyebrowClassName)}>{eyebrow ?? '2,400 already in'}</p>
          <Title className={cn(titleClass, 'mt-3 text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-md">{lede}</div>
          <form className="mt-6 flex gap-2" action="#" onSubmit={(event) => event.preventDefault()}>
            <label className="sr-only" htmlFor="nexara-waitlist">Email</label>
            <input id="nexara-waitlist" type="email" placeholder="you@studio.com" className={cn(focusRing, 'h-12 flex-1 rounded-full border border-nx-border bg-nx-card px-4 text-nx-fg')} />
            <button type="submit" className="h-12 rounded-full bg-nx-fg px-5 text-sm text-nx-bg">Join</button>
          </form>
          {actions ? <div className={cn('mt-4', actionsClassName)}>{actions}</div> : null}
        </div>
      ) : null}
    </section>
  )
}

function CinemaHero({
  Title,
  title,
  lede,
  actions,
  mediaSlot,
  image,
  video,
  poster,
  lottie,
  titleClass,
  actionsClassName,
  mediaClassName,
}: {
  Title: 'h1' | 'h2' | 'h3'
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  mediaSlot?: ReactNode
  image?: string
  video?: string
  poster?: string
  lottie?: string
  titleClass: string
  actionsClassName?: string
  mediaClassName?: string
}) {
  const [playing, setPlaying] = useState(false)
  return (
    <div className="relative mx-auto min-h-[24rem] max-w-6xl overflow-hidden rounded-[1.8rem]">
      <MediaFrame
        src={image ?? media.cinema}
        video={video ?? media.reel}
        poster={poster ?? media.cinema}
        lottie={lottie}
        playing={playing}
        alt=""
        className={cn('absolute inset-0', mediaClassName)}
      >
        {mediaSlot}
      </MediaFrame>
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-black/10" />
      <div className="relative z-10 flex min-h-[24rem] flex-col justify-end p-8 md:p-12">
        <Title className={cn(titleClass, 'max-w-xl text-5xl text-white md:text-6xl')}>{title}</Title>
        <div className="mt-3 max-w-lg text-white/75">{lede}</div>
        <div className={cn('mt-6 flex items-center gap-3', actionsClassName)}>
          <PlayControl playing={playing} onToggle={() => setPlaying((value) => !value)} />
          {actions}
        </div>
      </div>
    </div>
  )
}

function Phone({ src, compact = false }: { src: string; compact?: boolean }) {
  return (
    <div className={cn('w-28 overflow-hidden rounded-[1.6rem] border border-nx-border bg-[#111113] p-1.5 shadow-[var(--nx-shadow)]', compact ? 'h-44' : 'h-52')}>
      <div className="flex h-full flex-col rounded-[1.15rem] bg-[#16161a] p-2">
        <span className="mx-auto mb-2 h-1 w-8 rounded-full bg-white/20" />
        <MediaFrame src={src} alt="" grain={false} className="h-20 rounded-lg" />
        <span className="mt-2 h-1.5 w-16 rounded bg-white/25" />
        <span className="mt-1.5 h-1.5 w-12 rounded bg-white/12" />
        <span className="mt-auto h-7 rounded-lg bg-white/10" />
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

function Stat({ label, value, src }: { label: string; value: string; src: string }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-nx-border bg-nx-card">
      <MediaFrame src={src} alt="" className="h-16" />
      <div className="p-4">
        <p className="text-xs text-nx-muted">{label}</p>
        <p className="font-serif text-3xl">{value}</p>
      </div>
    </div>
  )
}
