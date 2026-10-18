'use client'

import { motion } from 'framer-motion'
import { useId, useState } from 'react'
import { faces, LoopPause } from '@/lib/media.tsx'
import {
  CHECK_PATH,
  GlobeField,
  Grain,
  INK_PATH,
  LiquidFilter,
  MagneticWell,
  Odometer,
  OrbitRing,
  ParticleField,
  PathDraw,
  ScrambleText,
  ScrollPin,
  ShaderMesh,
  SplitMask,
  TiltGlare,
  WowStage,
  wowBtn,
} from '@/lib/wow.tsx'
import { cn, focusRing, touchTarget, useCountUp, useLoopControl } from '@/lib/utils.ts'
import type { WowProps } from './wow-signatures.tsx'

function TabsWow({ variant, className }: WowProps) {
  const tabs = ['Rooms', 'Library', 'Export']
  const [active, setActive] = useState(tabs[0]!)
  return (
    <div className={cn('rounded-3xl border border-nx-border bg-nx-card p-4', className)}>
      <div className={cn('flex flex-wrap gap-2', variant === 'orbit-pills' && 'justify-center')}>
        {variant === 'orbit-pills' ? <OrbitRing items={tabs} radius={64} /> : null}
        {variant !== 'orbit-pills'
          ? tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(focusRing, touchTarget, 'relative rounded-full px-4 text-sm', active === tab ? 'text-nx-fg' : 'text-nx-muted')}
              >
                {variant === 'layout-morph' && active === tab ? (
                  <motion.span layoutId="nexara-tab-ink" className="absolute inset-0 rounded-full bg-[#111113]" />
                ) : null}
                {variant === 'liquid-ink' && active === tab ? <span className="absolute inset-0 rounded-full bg-[#4c46e0]/20 blur-sm" /> : null}
                <span className={cn('relative z-10', variant === 'layout-morph' && active === tab && 'text-white')}>
                  {variant === 'scramble-label' ? <ScrambleText text={tab} trigger="hover" /> : tab}
                </span>
              </button>
            ))
          : null}
      </div>
      <p className="mt-4 text-sm text-nx-muted">{active} stays in the room. The ink morphs; the panel does not remount a new chrome.</p>
    </div>
  )
}

function AccordionWow({ variant, className }: WowProps) {
  const items = [
    { q: 'Do I install a package?', a: 'No. Copy the file and the wow helpers.' },
    { q: 'Does motion pause?', a: 'Yes. Reduced motion and a visible pause control.' },
    { q: 'Will this look normal?', a: 'If it does, it is not a signature variant.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-nx-border', variant === 'shader-row' && 'border-white/10 bg-[#07070c] text-white', className)}>
      {variant === 'shader-row' ? <ShaderMesh /> : null}
      <div className="relative z-10">
        {items.map((item, i) => (
          <div key={item.q} className="border-b border-current/10">
            <button type="button" className={cn(focusRing, 'flex min-h-11 w-full items-center justify-between px-4 py-3 text-left')} onClick={() => setOpen(i)}>
              <span className="font-medium">{variant === 'kinetic-faq' ? <ScrambleText text={item.q} trigger="hover" /> : item.q}</span>
              {variant === 'path-plus' ? (
                <PathDraw d={open === i ? 'M8 20 H 32 M 20 8 V 32' : 'M8 20 H 32'} className="h-6 w-6" />
              ) : (
                <span>{open === i ? '–' : '+'}</span>
              )}
            </button>
            <motion.div initial={false} animate={{ height: open === i ? 'auto' : 0 }} className="overflow-hidden">
              <p className="px-4 pb-4 text-sm opacity-70">{item.a}</p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  )
}

function TooltipWow({ variant, className }: WowProps) {
  if (variant === 'particle-hint') {
    return (
      <div className={cn('relative inline-flex', className)}>
        <button type="button" className={cn(wowBtn, 'bg-nx-fg text-nx-bg')}>
          Hover
        </button>
        <div className="absolute top-full left-1/2 mt-3 w-40 -translate-x-1/2 overflow-hidden rounded-2xl bg-[#111113] p-3 text-xs text-white">
          <ParticleField count={24} />
          <span className="relative z-10">Jump any room</span>
        </div>
      </div>
    )
  }
  if (variant === 'scramble-tip') {
    return (
      <div className={cn('rounded-2xl bg-[#111113] px-3 py-2 text-white', className)}>
        <ScrambleText text="Jump any room" />
      </div>
    )
  }
  if (variant === 'magnetic-tag') {
    return (
      <MagneticWell className={className}>
        <span className="inline-flex min-h-11 items-center rounded-full bg-[#111113] px-3 text-sm text-white">Ada Klein</span>
      </MagneticWell>
    )
  }
  return (
    <TiltGlare className={cn('inline-flex rounded-2xl bg-[#111113] px-3 py-2 text-sm text-white', className)}>
      Jump any room
    </TiltGlare>
  )
}

function ToastWow({ variant, className }: WowProps) {
  const n = useCountUp(12, 900, true)
  return (
    <motion.div
      initial={{ y: 18, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className={cn('relative overflow-hidden rounded-2xl border border-nx-border bg-nx-card p-4 shadow-[var(--nx-shadow)]', className)}
    >
      {variant === 'liquid-slide' ? <span className="absolute inset-y-0 left-0 w-1 bg-[#4c46e0]" /> : null}
      <div className="flex items-center gap-3">
        {variant === 'path-check' ? <PathDraw d={CHECK_PATH} className="h-8 w-12 text-[#0c8a5e]" /> : null}
        <div>
          <p className="font-medium">{variant === 'odometer-count' ? <>Inbox <Odometer value={n} digits={2} /></> : 'Saved to Harbor'}</p>
          <p className="text-sm text-nx-muted">{variant === 'spring-stack' ? 'Springs in, does not fade in place.' : 'The mark draws itself.'}</p>
        </div>
      </div>
    </motion.div>
  )
}

function AvatarWow({ variant, className }: WowProps) {
  const face = faces[0]
  if (variant === 'orbit-status') {
    return (
      <div className={cn('relative size-24', className)}>
        <OrbitRing items={['Live']} radius={40} />
        <img src={face?.src} alt={face?.name} className="absolute inset-6 size-12 rounded-full object-cover" />
      </div>
    )
  }
  if (variant === 'shader-ring' || variant === 'holographic') {
    return (
      <div className={cn('relative size-20 overflow-hidden rounded-full', className)}>
        <ShaderMesh />
        <img src={face?.src} alt={face?.name} className="absolute inset-1 rounded-full object-cover" />
      </div>
    )
  }
  return (
    <div className={cn('relative size-20', className)}>
      <ParticleField count={20} />
      <img src={face?.src} alt={face?.name} className="relative size-20 rounded-full object-cover" />
    </div>
  )
}

function BadgeWow({ variant, className, children }: WowProps) {
  const loop = useLoopControl(true)
  const id = useId().replace(/:/g, '')
  if (variant === 'beam-orbit') {
    return (
      <span className={cn('relative inline-flex min-h-11 items-center rounded-full bg-[#111113] px-3 text-sm text-white', className)}>
        <motion.span
          aria-hidden="true"
          className="absolute inset-[-2px] rounded-full border border-[#7c6cff]"
          animate={loop.playing ? { rotate: 360 } : undefined}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
          style={{ borderRightColor: 'transparent' }}
        />
        <span className="relative">{children ?? 'Live'}</span>
      </span>
    )
  }
  if (variant === 'scramble-live') return <span className={cn('rounded-full bg-[#4c46e0] px-3 py-2 text-sm text-white', className)}><ScrambleText text="LIVE" trigger="hover" /></span>
  if (variant === 'path-ribbon') {
    return (
      <span className={cn('inline-flex flex-col items-start', className)}>
        <span className="rounded-sm bg-[#e11d48] px-2 py-1 text-xs text-white">Sale</span>
        <PathDraw d={INK_PATH} className="h-5 w-16 text-[#e11d48]" />
      </span>
    )
  }
  return (
    <span className={cn('relative inline-flex min-h-11 items-center overflow-hidden rounded-full bg-[#111113] px-3 text-sm text-white', className)}>
      <span className="absolute -left-1 size-8 rounded-full bg-[#22c5b0]" style={{ filter: `url(#${id})` }} />
      <span className="relative z-10">{children ?? 'Live'}</span>
    </span>
  )
}

function PricingWow({ variant, className }: WowProps) {
  const price = useCountUp(48, 1400, true)
  const [year, setYear] = useState(false)
  const plans = [
    { name: 'Hobby', n: 0 },
    { name: 'Studio', n: year ? 38 : 48 },
    { name: 'Desk', n: year ? 90 : 110 },
  ]
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {plans.map((plan, i) => (
        <TiltGlare key={plan.name} className={cn('rounded-3xl border border-nx-border bg-nx-card p-5', i === 1 && variant === 'shader-featured' && 'overflow-hidden border-white/10 bg-[#07070c] text-white')}>
          {i === 1 && variant === 'shader-featured' ? <ShaderMesh /> : null}
          <div className="relative z-10">
            <p className="text-sm text-current/60">{plan.name}</p>
            <p className="mt-2 font-serif text-4xl">
              {variant === 'odometer-price' ? <Odometer value={i === 1 ? price : plan.n} digits={3} /> : `$${plan.n}`}
            </p>
            {variant === 'morph-toggle' && i === 1 ? (
              <button type="button" className={cn(wowBtn, 'mt-4 bg-nx-fg text-nx-bg')} onClick={() => setYear((v) => !v)}>
                {year ? 'Yearly' : 'Monthly'}
              </button>
            ) : (
              <p className="mt-3 text-sm opacity-70">The number ticks. The featured plate is a field.</p>
            )}
          </div>
        </TiltGlare>
      ))}
    </div>
  )
}

function TestimonialsWow({ variant, className }: WowProps) {
  const quotes = [
    { q: 'Stay in the room.', who: 'Anitha Rao' },
    { q: 'The furniture finally moved.', who: 'Kiran Reddy' },
    { q: 'We shipped the mast on Friday.', who: 'Meera Shah' },
  ]
  if (variant === 'orbit-quotes') {
    return (
      <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={quotes.map((item) => item.who.split(' ')[0]!)} radius={96} />
      </div>
    )
  }
  if (variant === 'video-shader') {
    return (
      <WowStage shader className={cn('min-h-56 p-6', className)}>
        <p className="font-serif text-3xl">“The reel is the quote.”</p>
        <p className="mt-3 text-sm text-white/60">Harbor Review · Anitha Rao</p>
      </WowStage>
    )
  }
  if (variant === 'scramble-pull') {
    return (
      <div className={cn('rounded-[1.6rem] bg-[#111113] p-6 text-white', className)}>
        <ScrambleText text="Stay in the room." className="block font-serif text-4xl" />
        <p className="mt-4 text-sm text-white/50">Anitha Rao · Harbor</p>
      </div>
    )
  }
  return (
    <div className={cn('grid gap-3 md:grid-cols-3', className)}>
      {quotes.map((item, i) => (
        <motion.blockquote key={item.who} className="rounded-3xl border border-nx-border bg-nx-card p-4" style={{ y: i * 8 }}>
          <p className="font-serif text-xl">{item.q}</p>
          <footer className="mt-3 text-sm text-nx-muted">{item.who}</footer>
        </motion.blockquote>
      ))}
    </div>
  )
}

function FooterWow({ variant, className }: WowProps) {
  const loop = useLoopControl(true)
  if (variant === 'giant-marquee') {
    return (
      <div className={cn('overflow-hidden rounded-[1.6rem] bg-[#07070c] py-8 text-white', className)}>
        <motion.p className="flex gap-10 font-serif text-6xl whitespace-nowrap md:text-8xl" animate={loop.playing ? { x: ['0%', '-40%'] } : undefined} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}>
          <span>NEXARA</span>
          <span>NEXARA</span>
          <span>NEXARA</span>
        </motion.p>
        {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="ml-4 mt-4" /> : null}
      </div>
    )
  }
  if (variant === 'orbit-marks') {
    return (
      <div className={cn('relative min-h-48 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={['Work', 'Notes', 'Legal', 'Press']} radius={88} />
      </div>
    )
  }
  if (variant === 'path-sitemap') {
    return (
      <div className={cn('rounded-[1.6rem] border border-nx-border p-6', className)}>
        <PathDraw d="M10 8 H 110 M10 8 V 32 M40 8 V 32 M80 8 V 32" className="h-16 w-full text-[#4c46e0]" />
        <p className="mt-4 font-serif text-2xl">The map draws itself.</p>
      </div>
    )
  }
  return (
    <WowStage className={cn('px-6 py-10', className)}>
      <p className="font-serif text-4xl">Night closer</p>
      <p className="mt-3 text-sm text-white/60">Grain on a void. Not a legal row.</p>
    </WowStage>
  )
}

function StatsWow({ variant, className }: WowProps) {
  const a = useCountUp(1860, 1400, true)
  const b = useCountUp(998, 1400, true)
  const c = useCountUp(48, 1400, true)
  if (variant === 'orbit-ring') {
    return (
      <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={[String(a), String(b), String(c), '16']} radius={90} />
      </div>
    )
  }
  if (variant === 'particle-pulse') {
    return (
      <div className={cn('relative overflow-hidden rounded-[1.6rem] bg-[#07070c] p-6 text-white', className)}>
        <ParticleField count={60} />
        <p className="relative z-10 font-serif text-6xl">
          <Odometer value={a} digits={4} />
        </p>
        <p className="relative z-10 mt-2 text-sm text-white/50">Athletes in the book</p>
      </div>
    )
  }
  if (variant === 'glare-mosaic') {
    return (
      <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
        {[a, b, c, 16].map((n, i) => (
          <TiltGlare key={i} className="rounded-3xl bg-[#111113] p-5 text-white">
            <p className="font-serif text-4xl">
              <Odometer value={n} digits={i === 0 ? 4 : 3} />
            </p>
          </TiltGlare>
        ))}
      </div>
    )
  }
  return (
    <div className={cn('grid gap-4 sm:grid-cols-3', className)}>
      {[
        { n: a, l: 'Athletes' },
        { n: b, l: 'Uptime' },
        { n: c, l: 'Studios' },
      ].map((item) => (
        <div key={item.l} className="rounded-3xl border border-nx-border p-5">
          <p className="font-serif text-5xl">
            <Odometer value={item.n} digits={item.n > 99 ? 4 : 2} />
          </p>
          <p className="mt-2 text-sm text-nx-muted">{item.l}</p>
        </div>
      ))}
    </div>
  )
}

function CountdownWow({ variant, className }: WowProps) {
  const d = useCountUp(12, 800, true)
  const h = useCountUp(6, 800, true)
  if (variant === 'shader-rings') {
    return (
      <WowStage shader className={cn('grid grid-cols-2 gap-4 p-6', className)}>
        {['12d', '06h', '18m', '04s'].map((cell) => (
          <p key={cell} className="font-serif text-4xl">
            {cell}
          </p>
        ))}
      </WowStage>
    )
  }
  if (variant === 'analog-orbit') {
    return (
      <div className={cn('relative min-h-48 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={['d', 'h', 'm', 's']} radius={80} />
      </div>
    )
  }
  if (variant === 'launch-scrub') {
    return (
      <ScrollPin height="180vh" className={className}>
        {(p) => (
          <WowStage className="w-full min-h-64 p-6">
            <p className="font-mono text-[11px] text-[#f3c27a]">T-MINUS</p>
            <p className="mt-3 font-serif text-6xl">{Math.round((1 - p) * 12)}d</p>
          </WowStage>
        )}
      </ScrollPin>
    )
  }
  return (
    <div className={cn('flex gap-2', className)}>
      {[d, h, 18, 4].map((n, i) => (
        <span key={i} className="flex h-20 w-16 items-center justify-center rounded-2xl bg-[#111113] font-mono text-3xl text-white">
          <Odometer value={n} digits={2} />
        </span>
      ))}
    </div>
  )
}

function LeaderboardWow({ variant, className }: WowProps) {
  const rows = [
    { n: 1, name: 'Harbor', pts: 98 },
    { n: 2, name: 'Atlas', pts: 86 },
    { n: 3, name: 'Vale', pts: 74 },
  ]
  const a = useCountUp(98, 1000, true)
  if (variant === 'podium-spring') {
    return (
      <div className={cn('flex items-end justify-center gap-3', className)}>
        {[86, 98, 74].map((h, i) => (
          <motion.div key={i} initial={{ height: 40 }} animate={{ height: 40 + h }} className="flex w-20 items-end justify-center rounded-t-2xl bg-[#111113] text-white">
            {i + 1}
          </motion.div>
        ))}
      </div>
    )
  }
  if (variant === 'particle-rank') {
    return (
      <div className={cn('relative overflow-hidden rounded-3xl bg-[#07070c] p-5 text-white', className)}>
        <ParticleField count={40} />
        {rows.map((row) => (
          <p key={row.name} className="relative z-10 flex justify-between py-2 font-serif text-2xl">
            <span>{row.name}</span>
            <span>{row.pts}</span>
          </p>
        ))}
      </div>
    )
  }
  return (
    <div className={cn('space-y-2', className)}>
      {rows.map((row) => (
        <div key={row.name} className="flex items-center gap-3">
          <span className="w-6 font-mono text-sm">{row.n}</span>
          <div className="h-3 flex-1 overflow-hidden rounded-full bg-nx-soft">
            <motion.div className="h-full bg-[#4c46e0]" initial={{ width: 0 }} animate={{ width: `${row.pts}%` }} />
          </div>
          {variant === 'live-odometer' ? <Odometer value={row.n === 1 ? a : row.pts} digits={2} /> : <span>{row.pts}</span>}
        </div>
      ))}
    </div>
  )
}

function CaseWow({ variant, className }: WowProps) {
  const [on, setOn] = useState(false)
  if (variant === 'scroll-film') {
    return (
      <div className={cn('flex gap-4 overflow-x-auto pb-2', className)}>
        {['Wren', 'Farm', 'Track'].map((name) => (
          <TiltGlare key={name} className="min-w-[14rem] rounded-3xl bg-[#111113] p-5 text-white">
            <p className="font-serif text-2xl">{name}</p>
            <p className="mt-2 text-sm text-white/50">Horizontal film. Flick the reel.</p>
          </TiltGlare>
        ))}
      </div>
    )
  }
  if (variant === 'shared-morph') {
    return (
      <button type="button" onClick={() => setOn((v) => !v)} className={cn('w-full text-left', className)}>
        <motion.div layout className="overflow-hidden rounded-3xl bg-[#111113] p-5 text-white">
          <motion.p layout className={on ? 'font-serif text-5xl' : 'font-serif text-2xl'}>
            Wren Build
          </motion.p>
          {on ? <p className="mt-3 text-sm text-white/60">The title keeps its identity while the plate grows.</p> : null}
        </motion.div>
      </button>
    )
  }
  if (variant === 'path-index') {
    return (
      <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
        <PathDraw d="M10 8 V 88 M10 20 H 90 M10 44 H 70 M10 68 H 80" className="h-24 w-full text-[#4c46e0]" />
        <p className="mt-3 font-serif text-2xl">01 Wren · 02 Farm · 03 Track</p>
      </div>
    )
  }
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {['Wren', 'Farm'].map((name) => (
        <TiltGlare key={name} className="rounded-3xl bg-[#111113] p-5 text-white">
          <p className="font-serif text-2xl">{name}</p>
        </TiltGlare>
      ))}
    </div>
  )
}

function ServicesWow({ variant, className }: WowProps) {
  const doors = ['Consult', 'Lab', 'Pharmacy', 'Therapy']
  if (variant === 'orbit-crews') {
    return (
      <div className={cn('relative min-h-52 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={doors} radius={92} />
      </div>
    )
  }
  if (variant === 'shader-cards') {
    return (
      <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
        {doors.slice(0, 2).map((d) => (
          <WowStage key={d} shader className="min-h-36 p-4">
            <p className="font-serif text-2xl">{d}</p>
          </WowStage>
        ))}
      </div>
    )
  }
  if (variant === 'path-checklist') {
    return (
      <ul className={cn('space-y-3', className)}>
        {doors.map((d) => (
          <li key={d} className="flex items-center gap-3">
            <PathDraw d={CHECK_PATH} className="h-6 w-10 text-[#0c8a5e]" />
            <span>{d}</span>
          </li>
        ))}
      </ul>
    )
  }
  return (
    <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
      {doors.map((d) => (
        <TiltGlare key={d} className="rounded-3xl border border-nx-border p-4">
          <p className="font-serif text-2xl">{d}</p>
        </TiltGlare>
      ))}
    </div>
  )
}

function ProcessWow({ variant, className }: WowProps) {
  const steps = ['Brief', 'Build', 'Review', 'Handover']
  if (variant === 'pin-steps' || variant === 'scrub-timeline') {
    return (
      <ScrollPin height="200vh" className={className}>
        {(p) => {
          const i = Math.min(steps.length - 1, Math.floor(p * steps.length))
          return (
            <div className="w-full rounded-[1.6rem] bg-[#111113] p-6 text-white">
              <p className="font-mono text-[11px] text-[#f3c27a]">0{i + 1}</p>
              <p className="mt-2 font-serif text-5xl">{steps[i]}</p>
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                <div className="h-full bg-[#f3c27a]" style={{ width: `${p * 100}%` }} />
              </div>
            </div>
          )
        }}
      </ScrollPin>
    )
  }
  if (variant === 'orbit-rhythm') {
    return (
      <div className={cn('relative min-h-52 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={steps} radius={90} />
      </div>
    )
  }
  return (
    <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
      <PathDraw d="M8 28 C 30 8, 50 32, 70 16 S 100 10, 112 24" className="h-12 w-full text-[#4c46e0]" />
      <p className="mt-3 font-serif text-2xl">The rail draws the week.</p>
    </div>
  )
}

function TeamWow({ variant, className }: WowProps) {
  const people = faces.slice(0, 4)
  if (variant === 'orbit-crew') {
    return (
      <div className={cn('relative min-h-52 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={people.map((p) => p.name.split(' ')[0]!)} radius={88} />
      </div>
    )
  }
  if (variant === 'particle-grid') {
    return (
      <div className={cn('relative grid grid-cols-2 gap-3 overflow-hidden rounded-[1.6rem] bg-[#07070c] p-4', className)}>
        <ParticleField count={36} />
        {people.map((p) => (
          <img key={p.name} src={p.src} alt={p.name} className="relative z-10 aspect-square rounded-2xl object-cover" />
        ))}
      </div>
    )
  }
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
      {people.map((p) => (
        <TiltGlare key={p.name} className="overflow-hidden rounded-3xl">
          <img src={p.src} alt={p.name} className="aspect-[3/4] w-full object-cover" />
          {variant === 'holographic' ? <Grain /> : null}
        </TiltGlare>
      ))}
    </div>
  )
}

function ContactWow({ variant, className }: WowProps) {
  const id = useId().replace(/:/g, '')
  if (variant === 'map-shader') {
    return (
      <WowStage shader className={cn('min-h-56 p-6', className)}>
        <p className="font-mono text-[11px] text-[#f3c27a]">13.08 · 80.27</p>
        <p className="mt-2 font-serif text-3xl">Harbor Bay</p>
      </WowStage>
    )
  }
  if (variant === 'magnetic-branches') {
    return (
      <div className={cn('grid gap-3 sm:grid-cols-3', className)}>
        {['Harbor', 'Atlas', 'Vale'].map((city) => (
          <MagneticWell key={city}>
            <div className="rounded-3xl border border-nx-border p-4">
              <p className="font-serif text-2xl">{city}</p>
            </div>
          </MagneticWell>
        ))}
      </div>
    )
  }
  if (variant === 'path-directions') {
    return (
      <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
        <PathDraw d="M10 30 C 30 10, 50 40, 80 16 S 110 20, 112 28" className="h-16 w-full text-[#4c46e0]" />
        <p className="mt-3 text-sm text-nx-muted">Bay road, then the north door.</p>
      </div>
    )
  }
  return (
    <form className={cn('space-y-3 rounded-3xl border border-nx-border p-5', className)}>
      <LiquidFilter id={id} />
      <input className={cn(focusRing, 'min-h-11 w-full rounded-xl border border-nx-field px-3')} placeholder="Name" />
      <input className={cn(focusRing, 'min-h-11 w-full rounded-xl border border-nx-field px-3')} placeholder="Email" />
      <button type="button" className={cn(wowBtn, 'bg-nx-fg text-nx-bg')}>
        Send the brief
      </button>
    </form>
  )
}

function CtaWow({ variant, className }: WowProps) {
  if (variant === 'liquid-wash' || variant === 'particle-close') {
    return (
      <WowStage shader={variant === 'liquid-wash'} particles={variant === 'particle-close'} className={cn('px-6 py-12', className)}>
        <p className="font-serif text-4xl md:text-5xl">Ask for a seat.</p>
        <button type="button" className={cn(wowBtn, 'mt-6 bg-white text-[#111]')}>
          Write the desk
        </button>
      </WowStage>
    )
  }
  if (variant === 'scramble-cta') {
    return (
      <div className={cn('rounded-[1.6rem] bg-[#111113] px-6 py-12 text-white', className)}>
        <ScrambleText text="Book the room." className="block font-serif text-5xl" />
        <button type="button" className={cn(wowBtn, 'mt-6 bg-white text-[#111]')}>
          Continue
        </button>
      </div>
    )
  }
  return (
    <TiltGlare className={cn('rounded-[1.6rem] bg-[#4c46e0] px-6 py-12 text-white', className)}>
      <p className="font-serif text-4xl">The closer tilts.</p>
    </TiltGlare>
  )
}

function ChaptersWow({ variant, className }: WowProps) {
  const chapters = ['Mast', 'Harbor', 'Atlas', 'Night']
  if (variant === 'parallax-index') {
    return (
      <div className={cn('grid gap-3 md:grid-cols-[8rem_1fr]', className)}>
        <ol className="font-mono text-sm text-nx-muted">
          {chapters.map((c, i) => (
            <li key={c}>0{i + 1} {c}</li>
          ))}
        </ol>
        <SplitMask text={'The night\ncontinues.'} className="font-serif text-4xl" />
      </div>
    )
  }
  if (variant === 'path-folio') {
    return (
      <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
        <PathDraw d={INK_PATH} className="h-10 w-40 text-[#4c46e0]" />
        <p className="mt-4 font-serif text-3xl">Folio 18</p>
      </div>
    )
  }
  return (
    <ScrollPin height="210vh" className={className}>
      {(p) => {
        const i = Math.min(chapters.length - 1, Math.floor(p * chapters.length))
        return (
          <WowStage className="w-full min-h-72 p-6">
            <p className="font-mono text-[11px] text-[#f3c27a]">Chapter 0{i + 1}</p>
            <p className="mt-3 font-serif text-6xl">{chapters[i]}</p>
          </WowStage>
        )
      }}
    </ScrollPin>
  )
}

function NewsWow({ variant, className }: WowProps) {
  const loop = useLoopControl(true)
  const lines = ['Lane change on Harbor', 'Atlas ships Friday', 'Vale opens a chair']
  if (variant === 'shader-magazine') {
    return (
      <WowStage shader className={cn('min-h-48 p-6', className)}>
        <p className="font-mono text-[11px] text-[#f3c27a]">Issue 18</p>
        <p className="mt-2 font-serif text-4xl">The night desk</p>
      </WowStage>
    )
  }
  if (variant === 'orbit-digest') {
    return (
      <div className={cn('relative min-h-48 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={['Mon', 'Tue', 'Wed', 'Thu']} radius={80} />
      </div>
    )
  }
  if (variant === 'flip-headlines') {
    return (
      <div className={cn('space-y-2', className)}>
        {lines.map((line) => (
          <p key={line} className="overflow-hidden rounded-2xl bg-[#111113] px-4 py-3 font-serif text-xl text-white">
            <ScrambleText text={line} trigger="hover" />
          </p>
        ))}
      </div>
    )
  }
  return (
    <div className={cn('overflow-hidden rounded-2xl bg-[#111113] py-3 text-white', className)}>
      <motion.p className="flex gap-10 whitespace-nowrap px-4 font-mono text-sm" animate={loop.playing ? { x: ['0%', '-40%'] } : undefined} transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}>
        {lines.concat(lines).map((l, i) => (
          <span key={i}>{l} ·</span>
        ))}
      </motion.p>
    </div>
  )
}

function LogoWow({ variant, className }: WowProps) {
  const marks = ['Kite', 'Solum', 'Nimbus', 'Vale']
  if (variant === 'orbit-3d') {
    return (
      <div className={cn('relative min-h-48 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <GlobeField />
        <OrbitRing items={marks} radius={100} />
      </div>
    )
  }
  if (variant === 'particle-press') {
    return (
      <div className={cn('relative overflow-hidden rounded-[1.6rem] bg-[#07070c] p-6 text-white', className)}>
        <ParticleField count={50} />
        <p className="relative z-10 font-serif text-3xl">Harbor Review</p>
      </div>
    )
  }
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
      {marks.map((m) => (
        <MagneticWell key={m}>
          <TiltGlare className="rounded-2xl border border-nx-border bg-nx-card px-4 py-6 text-center font-serif text-xl">{m}</TiltGlare>
        </MagneticWell>
      ))}
    </div>
  )
}

export function WowBlocks(props: WowProps) {
  const { family } = props
  if (family === 'tabs') return <TabsWow {...props} />
  if (family === 'accordion') return <AccordionWow {...props} />
  if (family === 'tooltip') return <TooltipWow {...props} />
  if (family === 'toast') return <ToastWow {...props} />
  if (family === 'avatar') return <AvatarWow {...props} />
  if (family === 'badge') return <BadgeWow {...props} />
  if (family === 'pricing') return <PricingWow {...props} />
  if (family === 'testimonials') return <TestimonialsWow {...props} />
  if (family === 'footer') return <FooterWow {...props} />
  if (family === 'stats') return <StatsWow {...props} />
  if (family === 'countdown') return <CountdownWow {...props} />
  if (family === 'leaderboard') return <LeaderboardWow {...props} />
  if (family === 'case-study') return <CaseWow {...props} />
  if (family === 'services') return <ServicesWow {...props} />
  if (family === 'process') return <ProcessWow {...props} />
  if (family === 'team') return <TeamWow {...props} />
  if (family === 'contact') return <ContactWow {...props} />
  if (family === 'cta-band') return <CtaWow {...props} />
  if (family === 'chapters') return <ChaptersWow {...props} />
  if (family === 'news') return <NewsWow {...props} />
  if (family === 'logo-cloud') return <LogoWow {...props} />
  return (
    <WowStage className={cn('min-h-40 p-5', props.className)}>
      <p className="font-serif text-2xl">{props.family}</p>
      <p className="text-sm text-white/60">{props.variant}</p>
    </WowStage>
  )
}
