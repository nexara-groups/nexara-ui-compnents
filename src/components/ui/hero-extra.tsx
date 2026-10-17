'use client'

import { useState, type ReactNode } from 'react'
import { cn, focusRing } from '@/lib/utils.ts'

type ExtraHeroProps = {
  variant: ExtraHeroVariant
  eyebrow?: ReactNode
  title: ReactNode
  description?: ReactNode
  actions?: ReactNode
  media?: ReactNode
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
 * Extra hero anatomies studied from Nexara, Sri Engineering, Rise, VDRSA, and 21st.dev.
 * Original layouts — not copied source.
 */
export function ExtraHero({
  variant,
  eyebrow,
  title,
  description,
  actions,
  media,
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

  if (variant === 'ac-remote') return <AcRemote Title={Title} title={title} lede={lede} actions={actions} className={className} titleClass={titleClass} />
  if (variant === 'divisions') return <Divisions Title={Title} title={title} lede={lede} actions={actions} className={className} titleClass={titleClass} eyebrow={eyebrow} eyebrowClassName={eyebrowClassName} />
  if (variant === 'four-doors') return <FourDoors Title={Title} title={title} lede={lede} actions={actions} className={className} titleClass={titleClass} />
  if (variant === 'wordmark') {
    return (
      <section data-nexara="hero" data-variant="wordmark" className={cn('relative overflow-hidden bg-[#07070a] px-6 py-24 text-center text-white', className)}>
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 size-[46rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/8" />
          <div className="absolute top-1/2 left-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[#c8ff4d]/20" />
          <div className="absolute top-1/2 left-1/2 size-[18rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10" />
        </div>
        <p className={cn('relative text-[11px] tracking-[0.28em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? 'An engineering company'}</p>
        <Title className={cn(titleClass, 'relative mt-6 text-[18vw] leading-[0.78] text-white md:text-[9rem]')}>{title}</Title>
        <div className="relative mx-auto mt-6 max-w-xl text-white/70">{lede}</div>
        <div className={cn('relative mt-8 flex justify-center gap-3', actionsClassName)}>{actions}</div>
      </section>
    )
  }
  if (variant === 'clinic') {
    return (
      <section data-nexara="hero" data-variant="clinic" className={cn('bg-[#0b1220] px-6 py-20 text-[#f6f1ea]', className)}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className={cn('text-xs tracking-[0.2em] text-[#f3b4b0] uppercase', eyebrowClassName)}>{eyebrow ?? 'EECP · Madhurawada'}</p>
            <Title className={cn(titleClass, 'mt-4 text-5xl text-[#f6f1ea] md:text-7xl')}>{title}</Title>
            <div className="mt-4 max-w-md text-[#c9c2b8]">{lede}</div>
            <div className={cn('mt-8 flex flex-wrap gap-3', actionsClassName)}>{actions}</div>
          </div>
          <div className={cn('relative grid place-items-center', mediaClassName)}>
            {media ?? <HeartMark />}
            <svg className="mt-8 w-full text-[#f3b4b0]" viewBox="0 0 320 48" aria-hidden="true">
              <path d="M0 24h70l10-16 12 32 10-16h218" fill="none" stroke="currentColor" strokeWidth="1.4" />
            </svg>
          </div>
        </div>
      </section>
    )
  }
  if (variant === 'sports') {
    return (
      <section data-nexara="hero" data-variant="sports" className={cn('relative min-h-[28rem] overflow-hidden bg-[#111113] text-white', className)}>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,#2a2a22,transparent_45%),linear-gradient(180deg,#111113,#0a0a0c)]" />
        <div className="relative z-10 mx-auto flex min-h-[28rem] max-w-6xl flex-col justify-end px-6 py-12">
          <p className={cn('text-[11px] tracking-[0.2em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? 'APRSA · RSFI'}</p>
          <Title className={cn(titleClass, 'mt-3 max-w-3xl text-5xl text-white md:text-7xl')}>{title}</Title>
          <div className="mt-4 max-w-xl text-white/70">{lede}</div>
          <div className={cn('mt-8 flex flex-wrap gap-3', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }
  if (variant === 'editorial') {
    return (
      <section data-nexara="hero" data-variant="editorial" className={cn('px-6 py-16', className)}>
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-12">
          <div className="md:col-span-7">
            <Title className={cn(titleClass, 'text-5xl md:text-7xl')}>{title}</Title>
            <div className="mt-4 max-w-md">{lede}</div>
          </div>
          <div className={cn('grid grid-cols-2 gap-2 md:col-span-5', mediaClassName)}>
            <span className="h-40 rounded-2xl bg-[linear-gradient(140deg,#1b1b22,#4c46e0)]" />
            <span className="mt-8 h-40 rounded-2xl bg-[linear-gradient(140deg,#10241f,#22c5b0)]" />
            <span className="h-28 rounded-2xl bg-nx-elevated" />
            <span className="h-28 rounded-2xl bg-nx-fg" />
          </div>
          <div className={cn('md:col-span-12', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }
  if (variant === 'fan') {
    return (
      <section data-nexara="hero" data-variant="fan" className={cn('px-6 py-16 text-center', className)}>
        <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
        <div className="mx-auto mt-4 max-w-lg">{lede}</div>
        <div className={cn('mx-auto mt-10 flex h-48 items-end justify-center', mediaClassName)}>
          {[-18, 0, 18].map((deg) => (
            <span key={deg} className="mx-[-1.2rem] h-40 w-28 rounded-2xl border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]" style={{ transform: `rotate(${deg}deg)` }} />
          ))}
        </div>
        <div className={cn('mt-10 flex justify-center', actionsClassName)}>{actions}</div>
      </section>
    )
  }
  if (variant === 'glass-fold') {
    return (
      <section data-nexara="hero" data-variant="glass-fold" className={cn('relative overflow-hidden bg-[#0c1220] px-6 py-20 text-white', className)}>
        <div className="absolute inset-0 bg-[linear-gradient(120deg,#16324a_0%,transparent_40%),linear-gradient(200deg,#1b3a2a,transparent_50%)]" />
        <div className="relative mx-auto max-w-3xl rounded-[2rem] border border-white/15 bg-white/10 p-10 backdrop-blur-xl">
          <Title className={cn(titleClass, 'text-5xl text-white')}>{title}</Title>
          <div className="mt-4 text-white/70">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }
  if (variant === 'split-cards') {
    return (
      <section data-nexara="hero" data-variant="split-cards" className={cn('px-6 py-16', className)}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-2">
          <div>
            <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
            <div className="mt-4">{lede}</div>
            <div className={cn('mt-8', actionsClassName)}>{actions}</div>
          </div>
          <div className="grid gap-3">
            {['Sai Nirmaan', 'Sri Engineering', 'Rise Medical Hub'].map((name, index) => (
              <article key={name} className="flex items-center justify-between rounded-2xl border border-nx-border bg-nx-card p-4" style={{ transform: `translateX(${index * 12}px)` }}>
                <p className="font-medium">{name}</p>
                <span className="text-xs text-nx-muted">Live</span>
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
          {media ?? <div className="min-h-44 rounded-xl bg-nx-bg p-4 font-mono text-xs text-nx-muted">nexara.app/agency-os</div>}
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
        <pre className="mt-8 overflow-x-auto rounded-xl border border-white/10 bg-black/40 p-4 text-xs">{`{ "kit": "hvac", "variant": "ac-remote" }`}</pre>
        <div className={cn('mt-6', actionsClassName)}>{actions}</div>
      </section>
    )
  }
  if (variant === 'fashion') {
    return (
      <section data-nexara="hero" data-variant="fashion" className={cn('grid min-h-[26rem] md:grid-cols-2', className)}>
        <div className="flex flex-col justify-end bg-[#f3efe6] p-8 text-[#16140f]">
          <p className="text-[11px] tracking-[0.22em] uppercase">{eyebrow ?? 'Summer 2026'}</p>
          <Title className={cn(titleClass, 'mt-4 text-6xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
        <div className={cn('min-h-64 bg-[linear-gradient(160deg,#2a2420,#8a6a4a)]', mediaClassName)}>{media}</div>
      </section>
    )
  }
  if (variant === 'spiral') {
    return (
      <section data-nexara="hero" data-variant="spiral" className={cn('relative overflow-hidden bg-[#0a0a0c] px-6 py-24 text-center text-white', className)}>
        <div className="absolute inset-0 opacity-70" style={{ background: 'conic-gradient(from 120deg, #4c46e0, #22c5b0, #c8ff4d, #4c46e0)' }} />
        <div className="absolute inset-8 rounded-full bg-[#0a0a0c]" />
        <div className="relative">
          <Title className={cn(titleClass, 'text-5xl text-white')}>{title}</Title>
          <div className="mx-auto mt-4 max-w-lg text-white/70">{lede}</div>
          <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }
  if (variant === 'liquid') {
    return (
      <section data-nexara="hero" data-variant="liquid" className={cn('relative overflow-hidden px-6 py-24', className)}>
        <div className="absolute -top-20 -left-16 size-72 rounded-full bg-[#4c46e0]/40 blur-3xl" />
        <div className="absolute -right-10 bottom-0 size-80 rounded-full bg-[#22c5b0]/35 blur-3xl" />
        <div className="relative mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-5xl md:text-6xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
          <div className={cn('mt-8 flex justify-center', actionsClassName)}>{actions}</div>
        </div>
      </section>
    )
  }
  if (variant === 'tilted') {
    return (
      <section data-nexara="hero" data-variant="tilted" className={cn('overflow-hidden px-6 py-16', className)}>
        <div className="mx-auto max-w-3xl text-center">
          <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
        </div>
        <div className="mx-auto mt-10 grid max-w-5xl grid-cols-3 gap-3" style={{ transform: 'perspective(900px) rotateX(18deg)' }}>
          {Array.from({ length: 6 }, (_, index) => (
            <div key={index} className="h-24 rounded-xl border border-nx-border bg-nx-card" />
          ))}
        </div>
        <div className={cn('mt-10 flex justify-center', actionsClassName)}>{actions}</div>
      </section>
    )
  }
  if (variant === 'enterprise') {
    return (
      <section data-nexara="hero" data-variant="enterprise" className={cn('px-6 py-20', className)}>
        <div className="mx-auto max-w-3xl text-center">
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
        <div className={cn('min-h-72 overflow-hidden rounded-[1.6rem] bg-[linear-gradient(140deg,#1a1a14,#2c2418)] p-6 text-white', mediaClassName)}>
          <p className="text-[11px] tracking-[0.18em] uppercase opacity-70">Featured project</p>
          {media ?? <p className="mt-24 font-serif text-5xl">Sai Nirmaan</p>}
        </div>
        <div className="flex flex-col justify-end">
          <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
          <div className="mt-4">{lede}</div>
          <div className={cn('mt-8', actionsClassName)}>{actions}</div>
        </div>
      </div>
    </section>
  )
}

function AcRemote({
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
  const [on, setOn] = useState(true)
  const [temp, setTemp] = useState(18)
  const [mode, setMode] = useState<(typeof modes)[number]>('Chill')
  const [fan, setFan] = useState<(typeof fans)[number]>('Med')

  return (
    <section data-nexara="hero" data-variant="ac-remote" className={cn('relative overflow-hidden bg-[#e8f3ec] px-6 pt-16 pb-28 text-[#102018]', className)}>
      <div className="mx-auto max-w-4xl text-center">
        <p className="text-xs tracking-[0.18em] text-[#1f7a4a] uppercase">Hyderabad · Visakhapatnam · Vijayawada</p>
        <Title className={cn(titleClass, 'mt-4 text-5xl md:text-7xl')}>{title}</Title>
        <div className="mx-auto mt-4 max-w-xl">{lede}</div>
        <div className="mt-8 flex flex-wrap justify-center gap-3">{actions}</div>
      </div>
      <div className="pointer-events-none mx-auto mt-10 max-w-lg">
        <AcUnit on={on} />
      </div>
      <div className="absolute inset-x-0 bottom-0 bg-[#111113] px-4 py-3 text-white">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button type="button" className={cn(focusRing, 'rounded-full px-3 py-1.5 font-medium', on ? 'bg-[#9b1c12] text-white' : 'bg-white/10')} onClick={() => setOn((value) => !value)} aria-pressed={on} aria-label={on ? 'Power on' : 'Power off'}>
              {on ? 'ON' : 'OFF'}
            </button>
            <span className="font-serif text-2xl">{temp}°</span>
            <button type="button" className={cn(focusRing, 'size-8 rounded-full bg-white/10')} aria-label="Decrease temperature" onClick={() => setTemp((value) => Math.max(16, value - 1))}>−</button>
            <button type="button" className={cn(focusRing, 'size-8 rounded-full bg-white/10')} aria-label="Increase temperature" onClick={() => setTemp((value) => Math.min(30, value + 1))}>+</button>
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
  return (
    <section data-nexara="hero" data-variant="divisions" className={cn('bg-[#07070a] px-6 py-20 text-white', className)}>
      <div className="mx-auto max-w-5xl text-center">
        <p className={cn('text-[11px] tracking-[0.24em] text-[#c8ff4d] uppercase', eyebrowClassName)}>{eyebrow ?? 'The premise'}</p>
        <Title className={cn(titleClass, 'mt-4 text-5xl text-white md:text-7xl')}>{title}</Title>
        <div className="mx-auto mt-4 max-w-xl text-white/65">{lede}</div>
      </div>
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 md:grid-cols-3">
        {[
          ['01', 'Academy', 'We grow engineers.'],
          ['02', 'Labs', 'We build intelligence.'],
          ['03', 'Marketing', 'We make brands move.'],
        ].map(([index, name, line]) => (
          <article key={name} className="rounded-2xl border border-white/10 p-5 text-left">
            <p className="text-[11px] text-[#c8ff4d]">{index}</p>
            <p className="mt-3 font-serif text-3xl">{name}</p>
            <p className="mt-2 text-sm text-white/65">{line}</p>
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
  return (
    <section data-nexara="hero" data-variant="four-doors" className={cn('px-6 py-16', className)}>
      <div className="mx-auto max-w-3xl">
        <Title className={cn(titleClass, 'text-5xl')}>{title}</Title>
        <div className="mt-4">{lede}</div>
      </div>
      <div className="mx-auto mt-10 grid max-w-5xl gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ['EECP Therapy', 'Named chairs. Thirty-five sessions a week.'],
          ['Diagnostics', 'ECG, echo, and blood work on this floor.'],
          ['Pharmacy', 'Cardiac scripts without a second queue.'],
          ['OPD', 'Sixteen specialists. One reception.'],
        ].map(([door, line], index) => (
          <article key={door} className="rounded-[1.4rem] border border-nx-border bg-nx-card p-5">
            <p className="text-[11px] text-nx-faint">{String(index + 1).padStart(2, '0')}</p>
            <p className="mt-3 font-medium">{door}</p>
            <p className="mt-2 text-sm text-nx-muted">{line}</p>
          </article>
        ))}
      </div>
      <div className="mx-auto mt-8 max-w-5xl">{actions}</div>
    </section>
  )
}

function HeartMark() {
  return (
    <svg width="200" height="200" viewBox="0 0 200 200" aria-hidden="true">
      <circle cx="100" cy="100" r="86" fill="none" stroke="rgba(243,180,176,0.22)" />
      <circle cx="100" cy="100" r="62" fill="none" stroke="rgba(243,180,176,0.12)" />
      <path d="M100 148c-28-20-52-42-52-70 0-20 14-34 34-34 10 0 16 5 18 12 2-7 8-12 18-12 20 0 34 14 34 34 0 28-24 50-52 70Z" fill="#f3b4b0" />
      <path d="M86 78c8 14 10 16 22 4" fill="none" stroke="#0b1220" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M78 96c6-18 20-28 34-10 8 10 4 22-6 28" fill="none" stroke="#d98986" strokeWidth="1.6" />
    </svg>
  )
}

function AcUnit({ on }: { on: boolean }) {
  return (
    <svg viewBox="0 0 420 170" className="w-full drop-shadow-[0_24px_40px_rgba(16,32,24,0.18)]" aria-hidden="true">
      <rect x="24" y="28" width="372" height="96" rx="28" fill="#f7fffb" />
      <rect x="24" y="28" width="372" height="96" rx="28" fill="url(#ac-face)" />
      <rect x="24" y="28" width="372" height="96" rx="28" stroke="#c5d8cc" strokeWidth="1.2" fill="none" />
      <rect x="48" y="78" width="324" height="28" rx="14" fill="#d7ebe0" />
      <path d="M64 92h292" stroke="#9fbfad" strokeWidth="2" strokeDasharray="6 8" />
      <circle cx="78" cy="52" r="5" fill={on ? '#1f7a4a' : '#9aa89e'} />
      <rect x="92" y="48" width="46" height="8" rx="4" fill="#cfe6d8" />
      <path d="M40 128c40 18 300 18 340 0" fill="none" stroke="#b7cfc2" strokeWidth="6" strokeLinecap="round" />
      <defs>
        <linearGradient id="ac-face" x1="24" y1="28" x2="396" y2="124">
          <stop stopColor="#ffffff" />
          <stop offset="1" stopColor="#dceee4" />
        </linearGradient>
      </defs>
    </svg>
  )
}
