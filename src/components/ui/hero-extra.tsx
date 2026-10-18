'use client'

import { useState, type ReactNode } from 'react'
import { MediaFrame, media } from '@/lib/media.tsx'
import { cn, focusRing } from '@/lib/utils.ts'

type ExtraHeroProps = {
  variant: ExtraHeroVariant
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
  image?: string
  video?: string
  poster?: string
  lottie?: string
  className?: string
  eyebrowClassName?: string
  titleClassName?: string
  descriptionClassName?: string
  actionsClassName?: string
  mediaClassName?: string
  titleAs?: 'h1' | 'h2' | 'h3'
}

export const EXTRA_HERO = [
  'ac-remote',
  'divisions',
  'four-doors',
  'wordmark',
  'clinic',
  'sports',
  'editorial',
  'fan',
  'glass-fold',
  'split-cards',
  'device',
  'devtool',
  'fashion',
  'spiral',
  'liquid',
  'tilted',
  'enterprise',
  'featured',
] as const

export type ExtraHeroVariant = (typeof EXTRA_HERO)[number]

const modes = ['Chill', 'Spring', 'Sunny', 'Autumn'] as const
const fans = ['Quiet', 'Med', 'Turbo'] as const
const modeTone = {
  Chill: 'bg-[#7dd3fc] text-[#082f49]',
  Spring: 'bg-[#86efac] text-[#14532d]',
  Sunny: 'bg-[#fde68a] text-[#713f12]',
  Autumn: 'bg-[#fdba74] text-[#7c2d12]',
} as const

/**
 * Extra hero anatomies. Original layouts and bundled cinematic media.
 * Copy this file, `src/lib/media.tsx`, `src/lib/utils.ts`, and `public/media`.
 */
export function ExtraHero({
  variant,
  eyebrow,
  title,
  description,
  actions,
  media: mediaSlot,
  image,
  video,
  poster,
  lottie,
  className,
  eyebrowClassName,
  titleClassName,
  descriptionClassName,
  actionsClassName,
  mediaClassName,
  titleAs = 'h2',
}: ExtraHeroProps) {
  const Title = titleAs
  const titleClass = cn('font-serif tracking-tight text-balance', titleClassName)
  const lede = description ? <p className={cn('text-base leading-7 text-pretty text-nx-muted', descriptionClassName)}>{description}</p> : null
  const shot = { image, video, poster, lottie, slot: mediaSlot, className: mediaClassName }

  if (variant === 'ac-remote') return <AcRemote Title={Title} title={title} lede={lede} actions={actions} className={className} titleClass={titleClass} shot={shot} />
  if (variant === 'divisions') return <Divisions Title={Title} title={title} lede={lede} actions={actions} className={className} titleClass={titleClass} eyebrow={eyebrow} eyebrowClassName={eyebrowClassName} />
  if (variant === 'four-doors') return <FourDoors Title={Title} title={title} lede={lede} actions={actions} className={className} titleClass={titleClass} />

  if (variant === 'wordmark') {
    return (
      <section data-nexara="hero" data-variant="wordmark" className={cn('relative min-h-[28rem] overflow-hidden bg-[#07070a] px-6 py-24 text-center text-white', className)}>
        <MediaFrame src={image ?? media.field} video={video} poster={poster} alt="" className="absolute inset-0" imgClassName="scale-105" />
        <div className="absolute inset-0 bg-black/35" />
        <p className={cn('relative text-[11px] tracking-[0.28em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? 'A studio in the dark'}</p>
        <Title className={cn(titleClass, 'relative mt-6 text-[16vw] leading-[0.78] text-white md:text-[8.5rem]')}>{title}</Title>
        <div className="relative mx-auto mt-6 max-w-xl text-white/70">{lede}</div>
        <div className={cn('relative mt-8 flex justify-center gap-3', actionsClassName)}>{actions}</div>
      </section>
    )
  }

  if (variant === 'clinic') {
    return (
      <section data-nexara="hero" data-variant="clinic" className={cn('relative overflow-hidden bg-[#0b1220] text-[#f6f1ea]', className)}>
        <div className="mx-auto grid max-w-6xl items-stretch md:grid-cols-2">
          <div className="px-6 py-16 md:py-20">
            <p className={cn('text-xs tracking-[0.2em] text-[#f3b4b0] uppercase', eyebrowClassName)}>{eyebrow ?? 'Private care'}</p>
            <Title className={cn(titleClass, 'mt-4 text-5xl text-[#f6f1ea] md:text-7xl')}>{title}</Title>
            <div className="mt-4 max-w-md text-[#c9c2b8]">{lede}</div>
            <div className={cn('mt-8 flex flex-wrap gap-3', actionsClassName)}>{actions}</div>
          </div>
          <MediaFrame src={image ?? media.clinic} video={video} poster={poster} alt="Quiet clinic corridor" className={cn('min-h-72', mediaClassName)}>
            {mediaSlot}
          </MediaFrame>
        </div>
      </section>
    )
  }

  if (variant === 'sports') {
    return (
      <section data-nexara="hero" data-variant="sports" className={cn('relative min-h-[30rem] overflow-hidden bg-[#111113] text-white', className)}>
        <MediaFrame src={image ?? media.sports} video={video} poster={poster} alt="Night track" className="absolute inset-0" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
        <div className="relative z-10 mx-auto flex min-h-[30rem] max-w-6xl flex-col justify-end px-6 py-12">
          <p className={cn('text-[11px] tracking-[0.2em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? 'Season desk'}</p>
          <Title className={cn(titleClass, 'mt-3 max-w-3xl text-5xl text-white md:text-7xl')}>{title}</Title>
          <div className="mt-4 max-w-xl text-white/75">{lede}</div>
          <div className={cn('mt-8 flex flex-wrap gap-3', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }

  if (variant === 'editorial') {
    return (
      <section data-nexara="hero" data-variant="editorial" className={cn('px-6 py-16', className)}>
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-12">
          <div className="md:col-span-6">
            <Title className={cn(titleClass, 'text-5xl md:text-7xl')}>{title}</Title>
            <div className="mt-4 max-w-md">{lede}</div>
            <div className={cn('mt-8', actionsClassName)}>{actions}</div>
          </div>
          <div className={cn('grid grid-cols-2 gap-2 md:col-span-6', mediaClassName)}>
            {mediaSlot ?? (
              <>
                <MediaFrame src={media.editorial[0]} alt="Books and fruit" className="h-44 rounded-2xl" />
                <MediaFrame src={media.editorial[1]} alt="Silk and gold" className="mt-8 h-44 rounded-2xl" />
                <MediaFrame src={media.editorial[2]} alt="Rain window" className="h-32 rounded-2xl" />
                <MediaFrame src={media.editorial[3]} alt="Ceramic vessel" className="h-32 rounded-2xl" />
              </>
            )}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'fan') {
    return (
      <section data-nexara="hero" data-variant="fan" className={cn('px-6 py-16 text-center', className)}>
        <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
        <div className="mx-auto mt-4 max-w-lg">{lede}</div>
        <div className={cn('mx-auto mt-10 flex h-64 items-end justify-center', mediaClassName)}>
          {mediaSlot ??
            media.fan.map((src, index) => (
              <MediaFrame
                key={src}
                src={src}
                alt={`Look ${index + 1}`}
                className="mx-[-1.4rem] h-56 w-36 rounded-2xl border border-white/40 shadow-[var(--nx-shadow)]"
                imgClassName="object-cover"
              >
                <img src={src} alt={`Look ${index + 1}`} className="size-full object-cover" style={{ transform: `rotate(${[-14, 0, 14][index]}deg)` }} />
              </MediaFrame>
            ))}
        </div>
        <div className={cn('mt-10 flex justify-center', actionsClassName)}>{actions}</div>
      </section>
    )
  }

  if (variant === 'glass-fold') {
    return (
      <section data-nexara="hero" data-variant="glass-fold" className={cn('relative overflow-hidden px-6 py-20 text-white', className)}>
        <MediaFrame src={image ?? media.glass} video={video} poster={poster} alt="" className="absolute inset-0" />
        <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-white/25 bg-black/25 p-10 shadow-[var(--nx-shadow)] backdrop-blur-md">
          <Title className={cn(titleClass, 'text-5xl text-white')}>{title}</Title>
          <div className="mt-4 text-white/75">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }

  if (variant === 'split-cards') {
    const cards = [
      ['Wren Build', media.cases.build],
      ['Grove Farm', media.cases.farm],
      ['Harbor Climate', media.cases.climate],
    ] as const
    return (
      <section data-nexara="hero" data-variant="split-cards" className={cn('px-6 py-16', className)}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
            <div className="mt-4">{lede}</div>
            <div className={cn('mt-8', actionsClassName)}>{actions}</div>
          </div>
          <div className="grid gap-3">
            {cards.map(([name, src], index) => (
              <article key={name} className="overflow-hidden rounded-2xl border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]" style={{ transform: `translateX(${index * 12}px)` }}>
                <MediaFrame src={src} alt={name} className="h-20" />
                <p className="px-4 py-3 font-medium">{name}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (variant === 'device') {
    return (
      <section data-nexara="hero" data-variant="device" className={cn('px-6 py-16', className)}>
        <div className="mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
        <div className={cn('mx-auto mt-10 w-full max-w-4xl rounded-[1.4rem] border border-nx-border bg-nx-card p-3 shadow-[var(--nx-shadow)]', mediaClassName)}>
          <div className="flex gap-1.5 px-2 py-2">
            <span className="size-2.5 rounded-full bg-[#ff5f57]" />
            <span className="size-2.5 rounded-full bg-[#febc2e]" />
            <span className="size-2.5 rounded-full bg-[#28c840]" />
          </div>
          <MediaFrame src={image ?? media.device} video={video} poster={poster} alt="Desk and machine" className="min-h-52 rounded-xl">
            {mediaSlot}
          </MediaFrame>
        </div>
      </section>
    )
  }

  if (variant === 'devtool') {
    return (
      <section data-nexara="hero" data-variant="devtool" className={cn('bg-[#0c0c0e] px-6 py-16 font-mono text-[#d7ffe1]', className)}>
        <p className="text-[11px] text-[#7dff9a]">{eyebrow ?? 'npx nexara add hero'}</p>
        <Title className={cn('mt-4 text-4xl tracking-tight md:text-6xl', titleClassName)}>{title}</Title>
        <div className="mt-4 max-w-xl text-[#9aa89e]">{lede}</div>
        <pre className="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs">{`{ "kit": "climate", "media": "first-class" }`}</pre>
        <div className={cn('mt-6', actionsClassName)}>{actions}</div>
      </section>
    )
  }

  if (variant === 'fashion') {
    return (
      <section data-nexara="hero" data-variant="fashion" className={cn('grid min-h-[28rem] md:grid-cols-2', className)}>
        <div className="flex flex-col justify-end bg-[#f3efe6] p-8 text-[#16140f]">
          <p className="text-[11px] tracking-[0.22em] uppercase">{eyebrow ?? 'Look 04'}</p>
          <Title className={cn(titleClass, 'mt-4 text-6xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
        <MediaFrame src={image ?? media.fashion} video={video} poster={poster} alt="Lookbook still" grain={false} className={cn('min-h-72', mediaClassName)}>
          {mediaSlot}
        </MediaFrame>
      </section>
    )
  }

  if (variant === 'spiral') {
    return (
      <section data-nexara="hero" data-variant="spiral" className={cn('relative overflow-hidden bg-[#0a0a0c] px-6 py-24 text-center text-white', className)}>
        <MediaFrame src={image ?? media.spiral} video={video} poster={poster} alt="" className="absolute inset-0" />
        <div className="absolute inset-0 bg-black/25" />
        <div className="relative">
          <Title className={cn(titleClass, 'text-5xl text-white')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg text-white/75">{lede}</div>
          <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }

  if (variant === 'liquid') {
    return (
      <section data-nexara="hero" data-variant="liquid" className={cn('relative overflow-hidden px-6 py-24', className)}>
        <MediaFrame src={image ?? media.liquid} video={video} poster={poster} alt="" className="absolute inset-0" />
        <div className="relative mx-auto max-w-3xl text-center text-white">
          <Title className={cn(titleClass, 'text-5xl text-white md:text-6xl')}>{title}</Title>
          <div className="mt-4 text-white/75">{lede}</div>
          <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }

  if (variant === 'tilted') {
    const tiles = [...media.editorial, ...media.fan].slice(0, 6)
    return (
      <section data-nexara="hero" data-variant="tilted" className={cn('overflow-hidden px-6 py-16', className)}>
        <div className="mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-3 gap-3" style={{ transform: 'perspective(900px) rotateX(16deg)' }}>
          {tiles.map((src) => (
            <MediaFrame key={src} src={src} alt="" className="h-28 rounded-xl border border-nx-border" />
          ))}
        </div>
        <div className={cn('mt-10 flex justify-center', actionsClassName)}>{actions}</div>
      </section>
    )
  }

  if (variant === 'enterprise') {
    return (
      <section data-nexara="hero" data-variant="enterprise" className={cn('relative overflow-hidden px-6 py-20', className)}>
        <MediaFrame src={image ?? media.device} video={video} poster={poster} alt="" className="absolute inset-0 opacity-30" />
        <div className="relative mx-auto max-w-3xl text-center">
          <p className="text-xs tracking-[0.18em] text-nx-muted uppercase">{eyebrow ?? 'SOC 2 · SSO · Audit'}</p>
          <Title className={cn(titleClass, 'mt-4 text-5xl md:text-6xl')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-xl">{lede}</div>
          <div className={cn('mt-8 flex flex-wrap justify-center gap-3', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }

  return (
    <section data-nexara="hero" data-variant="featured" className={cn('px-6 py-16', className)}>
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <MediaFrame src={image ?? media.featured} video={video} poster={poster} alt="Featured project" className={cn('min-h-72 rounded-[1.6rem]', mediaClassName)}>
          {mediaSlot}
        </MediaFrame>
        <div className="flex flex-col justify-end">
          <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
      </div>
    </section>
  )
}

type Shot = { image?: string; video?: string; poster?: string; lottie?: string; slot?: ReactNode; className?: string }

function AcRemote({
  Title,
  title,
  lede,
  actions,
  className,
  titleClass,
  shot,
}: {
  Title: 'h1' | 'h2' | 'h3'
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  className?: string
  titleClass: string
  shot: Shot
}) {
  const [on, setOn] = useState(true)
  const [temp, setTemp] = useState(18)
  const [mode, setMode] = useState<(typeof modes)[number]>('Chill')
  const [fan, setFan] = useState<(typeof fans)[number]>('Med')

  return (
    <section data-nexara="hero" data-variant="ac-remote" className={cn('relative overflow-hidden bg-[#e8f3ec] text-[#102018]', className)}>
      <div className="grid items-end md:grid-cols-[1.05fr_0.95fr]">
        <div className="px-6 pt-16 pb-10 md:pb-28">
          <p className="text-xs tracking-[0.18em] text-[#1f7a4a] uppercase">Harbor Climate</p>
          <Title className={cn(titleClass, 'mt-4 text-5xl md:text-7xl')}>{title}</Title>
          <div className="mt-4 max-w-xl">{lede}</div>
          <div className="mt-8 flex flex-wrap gap-3">{actions}</div>
        </div>
        <MediaFrame
          src={shot.image ?? media.climate}
          video={shot.video}
          poster={shot.poster}
          lottie={shot.lottie}
          alt="Climate appliance in a sunlit room"
          className={cn('min-h-72', !on && 'opacity-60', shot.className)}
        >
          {shot.slot}
        </MediaFrame>
      </div>
      <div className="bg-[#111113] px-4 py-3 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              type="button"
              className={cn(focusRing, 'rounded-full px-3 py-1.5 font-medium', on ? 'bg-[#9b1c12] text-white' : 'bg-white/10')}
              onClick={() => setOn((value) => !value)}
              aria-pressed={on}
              aria-label={on ? 'Power on' : 'Power off'}
            >
              {on ? 'ON' : 'OFF'}
            </button>
            <span className="font-serif text-2xl">{temp}°</span>
            <button type="button" className={cn(focusRing, 'size-8 rounded-full bg-white/10')} aria-label="Decrease temperature" onClick={() => setTemp((value) => Math.max(16, value - 1))}>
              −
            </button>
            <button type="button" className={cn(focusRing, 'size-8 rounded-full bg-white/10')} aria-label="Increase temperature" onClick={() => setTemp((value) => Math.min(30, value + 1))}>
              +
            </button>
          </div>
          <div className="flex flex-wrap items-center gap-1" role="radiogroup" aria-label="Mode">
            <span className="mr-1 text-[10px] tracking-[0.16em] text-white/45 uppercase">Mode</span>
            {modes.map((item) => (
              <button key={item} type="button" role="radio" aria-checked={mode === item} className={cn(focusRing, 'rounded-full px-3 py-1.5', mode === item ? modeTone[item] : 'text-white/70')} onClick={() => setMode(item)}>
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-1" role="radiogroup" aria-label="Fan">
            <span className="mr-1 text-[10px] tracking-[0.16em] text-white/45 uppercase">Fan</span>
            {fans.map((item) => (
              <button key={item} type="button" role="radio" aria-checked={fan === item} className={cn(focusRing, 'rounded-full px-3 py-1.5', fan === item ? 'bg-white text-[#111]' : 'text-white/70')} onClick={() => setFan(item)}>
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function Divisions({
  Title,
  title,
  lede,
  actions,
  className,
  titleClass,
  eyebrow,
  eyebrowClassName,
}: {
  Title: 'h1' | 'h2' | 'h3'
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  className?: string
  titleClass: string
  eyebrow?: ReactNode
  eyebrowClassName?: string
}) {
  const rooms = [
    ['01', 'Academy', 'We grow people.', media.cases.voice],
    ['02', 'Labs', 'We build intelligence.', media.cases.lab],
    ['03', 'Studio', 'We make brands move.', media.venues.studio],
  ] as const
  return (
    <section data-nexara="hero" data-variant="divisions" className={cn('bg-[#07070a] px-6 py-20 text-white', className)}>
      <div className="mx-auto max-w-5xl text-center">
        <p className={cn('text-[11px] tracking-[0.24em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? 'The premise'}</p>
        <Title className={cn(titleClass, 'mt-4 text-5xl text-white md:text-7xl')}>{title}</Title>
        <div className="mx-auto mt-4 max-w-xl text-white/65">{lede}</div>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
        {rooms.map(([index, name, line, src]) => (
          <article key={name} className="overflow-hidden rounded-2xl border border-white/10">
            <MediaFrame src={src} alt={name} className="h-36" />
            <div className="p-5 text-left">
              <p className="text-[11px] text-[#c8ff4d]">{index}</p>
              <p className="mt-3 font-serif text-3xl">{name}</p>
              <p className="mt-2 text-sm text-white/65">{line}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-center">{actions}</div>
    </section>
  )
}

function FourDoors({
  Title,
  title,
  lede,
  actions,
  className,
  titleClass,
}: {
  Title: 'h1' | 'h2' | 'h3'
  title: ReactNode
  lede: ReactNode
  actions?: ReactNode
  className?: string
  titleClass: string
}) {
  const doors = [
    ['Therapy', 'A named chair, never a queue.', media.doors.therapy],
    ['Consult', 'The file is read before the door.', media.doors.consult],
    ['Pharmacy', 'Scripts without a second desk.', media.doors.pharmacy],
    ['Lab', 'The sample and the report stay here.', media.doors.lab],
  ] as const
  return (
    <section data-nexara="hero" data-variant="four-doors" className={cn('px-6 py-16', className)}>
      <div className="mx-auto max-w-3xl">
        <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
        <div className="mt-4">{lede}</div>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {doors.map(([name, line, src], index) => (
          <article key={name} className="overflow-hidden rounded-[1.4rem] border border-nx-border bg-nx-card">
            <MediaFrame src={src} alt={name} className="h-32" />
            <div className="p-5">
              <p className="text-[11px] text-nx-faint">{String(index + 1).padStart(2, '0')}</p>
              <p className="mt-3 font-medium">{name}</p>
              <p className="mt-2 text-sm text-nx-muted">{line}</p>
            </div>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-5xl">{actions}</div>
    </section>
  )
}
