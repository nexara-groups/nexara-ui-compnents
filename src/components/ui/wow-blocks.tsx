'use client'

import { motion } from 'framer-motion'
import { useId, useState } from 'react'
import { faces, LoopPause, MediaFrame, media } from '@/lib/media.tsx'
import { AnalogClock, GooPuddle, SplitFlap, useLiveRemain } from '@/lib/wow-fx.tsx'
import {
  BarcodeScan,
  BeamScan,
  ConstellationMap,
  DialGauge,
  FilmSprocket,
  FoldPanel,
  LensHover,
  MetronomeArm,
  MorseBlink,
  PolaroidFan,
  PrismSplit,
  RadarSweep,
  StampInk,
  TapeReels,
  ZipperSplit,
} from '@/lib/wow-unique.tsx'
import {
  CHECK_PATH,
  GlobeField,
  Grain,
  INK_PATH,
  LiquidFilter,
  MagneticWell,
  Odometer,
  ParticleField,
  PathDraw,
  ScrambleText,
  ScrollPin,
  ShaderMesh,
  SplitMask,
  WowStage,
  wowBtn,
} from '@/lib/wow.tsx'
import { cn, focusRing, touchTarget, useCountUp, useLoopControl } from '@/lib/utils.ts'
import type { WowProps } from '@/lib/wow-variants.ts'

function TabsWow({ variant, className }: WowProps) {
  const tabs = ['Rooms', 'Library', 'Export']
  const [active, setActive] = useState(tabs[0]!)
  return (
    <div className={cn('rounded-3xl border border-nx-border bg-nx-card p-4', className)}>
      {variant === 'zipper-tabs' ? (
        <ZipperSplit
          open
          className="mb-4 h-16 rounded-2xl bg-[#111113] text-white"
          left={<p className="p-4 font-serif text-2xl">{active}</p>}
          right={<p className="p-4 text-sm text-white/50">The panel splits. The control stays.</p>}
        />
      ) : null}
      <div className="flex flex-wrap gap-2">
        {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActive(tab)}
                className={cn(focusRing, touchTarget, 'relative rounded-full px-4 text-sm', active === tab ? 'text-nx-fg' : 'text-nx-muted')}
              >
                {variant === 'layout-morph' && active === tab ? (
                  <motion.span layoutId="nexara-tab-ink" className="absolute inset-0 rounded-full bg-[#111113]" />
                ) : null}
                {variant === 'liquid-ink' && active === tab ? <GooPuddle className="rounded-full" /> : null}
                <span className={cn('relative z-10', variant === 'layout-morph' && active === tab && 'text-white')}>
                  {variant === 'scramble-label' ? <ScrambleText text={tab} trigger="hover" /> : tab}
                </span>
              </button>
            ))}
      </div>
      <p className="mt-4 text-sm text-nx-muted">{active} stays in the room. The ink morphs; the panel does not remount a new chrome.</p>
    </div>
  )
}

function AccordionWow({ variant, className }: WowProps) {
  const items = [
    { q: 'When is the Harbor desk open?', a: 'Monday to Friday, 10:00–18:00 in Harbor Bay.' },
    { q: 'Do we keep passkeys?', a: 'Yes. SSO and a named partner. Audit keeps seven years.' },
    { q: 'Who takes Friday’s demo?', a: 'A named lead. The reel is the brief.' },
  ]
  const [open, setOpen] = useState(0)
  return (
    <div className={cn('relative min-h-56 overflow-hidden rounded-3xl border border-nx-border', variant === 'shader-row' && 'border-white/10 bg-[#07070c] text-white', className)}>
      {variant === 'shader-row' ? <ShaderMesh /> : null}
      <div className="relative z-10">
        {items.map((item, i) => (
          <div key={item.q} className="border-b border-current/10">
            <button
              type="button"
              aria-expanded={open === i}
              aria-controls={`wow-acc-${i}`}
              className={cn(focusRing, 'flex min-h-11 w-full items-center justify-between px-4 py-3 text-left')}
              onClick={() => setOpen(i)}
            >
              <span className="font-medium">{variant === 'kinetic-faq' ? <ScrambleText text={item.q} trigger="hover" /> : item.q}</span>
              {variant === 'path-plus' ? (
                <PathDraw d={open === i ? 'M8 20 H 32 M 20 8 V 32' : 'M8 20 H 32'} className="h-6 w-6" />
              ) : (
                <span>{open === i ? '–' : '+'}</span>
              )}
            </button>
            <div id={`wow-acc-${i}`} hidden={open !== i} className="overflow-hidden">
              {open === i ? <p className="px-4 pb-4 text-sm opacity-70">{item.a}</p> : null}
            </div>
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
        <span className="inline-flex min-h-11 items-center rounded-full bg-[#111113] px-3 text-sm text-white">Anitha Rao</span>
      </MagneticWell>
    )
  }
  return (
    <LensHover className={cn('inline-flex rounded-2xl bg-[#111113] px-3 py-2 text-sm text-white', className)}>
      Jump any room
    </LensHover>
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
      {variant === 'liquid-slide' ? <GooPuddle /> : null}
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
  if (variant === 'radar-presence') {
    return (
      <div className={cn('relative flex items-center justify-center', className)}>
        <RadarSweep items={['Live', 'Desk', 'NYC']} />
        <img src={face?.src} alt={face?.name} className="absolute size-12 rounded-full object-cover" />
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
  const id = useId().replace(/:/g, '')
  if (variant === 'morse-live') {
    return <MorseBlink text={String(children ?? 'LIVE')} className={className} />
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
      <GooPuddle />
      <span className="relative z-10">{children ?? 'Live'}</span>
      <span className="sr-only">{id}</span>
    </span>
  )
}

function PricingWow({ variant, className }: WowProps) {
  const price = useCountUp(48, 1400, true)
  const [year, setYear] = useState(false)
  const plans = [
    { name: 'Hobby', n: 0, feats: ['One room', 'Community notes'] },
    { name: 'Studio', n: year ? 38 : 48, feats: ['Four rooms', 'Export', 'Desk hours'] },
    { name: 'Desk', n: year ? 90 : 110, feats: ['Unlimited rooms', 'SSO', 'Named partner'] },
  ]
  return (
    <div className={cn('grid gap-4 md:grid-cols-3', className)}>
      {plans.map((plan, i) => (
        <div key={plan.name} className={cn('rounded-3xl border border-nx-border bg-nx-card p-5', i === 1 && variant === 'shader-featured' && 'overflow-hidden border-white/10 bg-[#07070c] text-white')}>
          {i === 1 && variant === 'shader-featured' ? <ShaderMesh /> : null}
          <div className="relative z-10">
            <p className="text-sm text-current/60">{plan.name}{i === 1 ? ' · recommended' : ''}</p>
            <p className="mt-2 font-serif text-4xl">
              {variant === 'prism-price' && i === 1 ? (
                <PrismSplit>${plan.n}</PrismSplit>
              ) : variant === 'odometer-price' ? (
                <Odometer value={i === 1 ? price : plan.n} digits={3} />
              ) : (
                `$${plan.n}`
              )}
            </p>
            <ul className="mt-3 space-y-1 text-sm opacity-70">
              {plan.feats.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
            {variant === 'morph-toggle' && i === 1 ? (
              <button type="button" className={cn(wowBtn, 'mt-4 bg-nx-fg text-nx-bg')} onClick={() => setYear((v) => !v)}>
                {year ? 'Yearly' : 'Monthly'}
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  )
}

function TestimonialsWow({ variant, className }: WowProps) {
  const loop = useLoopControl(true)
  const quotes = [
    { q: 'Stay in the room.', who: 'Anitha Rao' },
    { q: 'The furniture finally moved.', who: 'Kiran Reddy' },
    { q: 'We shipped the mast on Friday.', who: 'Meera Shah' },
  ]
  if (variant === 'polaroid-quotes') {
    return (
      <PolaroidFan
        className={className}
        faces={faces.slice(0, 3)}
        quote={quotes[0]?.q ?? 'Stay in the room.'}
        who={`${quotes[0]?.who ?? 'Anitha Rao'} · Harbor Review`}
      />
    )
  }
  if (variant === 'video-shader') {
    return (
      <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#07070c] text-white', className)}>
        <MediaFrame src={media.cinema} alt="" video={media.reel} playing={loop.playing} className="absolute inset-0" grain={false} />
        <div className="absolute inset-0 bg-gradient-to-t from-[#07070c] via-[#07070c]/30 to-transparent" />
        <div className="relative z-10 p-6">
          <p className="font-serif text-3xl">“The reel is the quote.”</p>
          <p className="mt-3 text-sm text-white/70">Harbor Review · Anitha Rao</p>
        </div>
        {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3 z-20" /> : null}
      </div>
    )
  }
  if (variant === 'scramble-pull') {
    return (
      <div className={cn('rounded-[1.6rem] bg-[#111113] p-6 text-white', className)}>
        <ScrambleText text="Stay in the room." className="block font-serif text-4xl" />
        <p className="mt-4 text-sm text-white/70">Anitha Rao · Harbor</p>
      </div>
    )
  }
  return (
    <div className={cn('grid gap-3 md:grid-cols-3', className)}>
      {quotes.map((item, i) => (
        <motion.blockquote
          key={item.who}
          className="rounded-3xl border border-nx-border bg-nx-card p-4"
          initial={{ y: 24 + i * 18 }}
          whileInView={{ y: i * 12 }}
          viewport={{ once: true, amount: 0.4 }}
        >
          <img src={faces[i]?.src} alt={item.who} className="mb-3 size-10 rounded-full object-cover" />
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
  if (variant === 'barcode-marks') {
    return <BarcodeScan labels={['Work', 'Notes', 'Legal', 'Press']} className={className} />
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
  if (variant === 'dial-gauge') {
    return <DialGauge value={Math.min(99, a % 100)} label="Athletes booked" className={className} />
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
  if (variant === 'film-mosaic') {
    return (
      <div className={cn('grid gap-3 sm:grid-cols-2', className)}>
        {[a, b, c, 16].map((n, i) => (
          <div key={i} className="rounded-3xl bg-[#111113] p-5 text-white">
            <p className="font-serif text-4xl">
              <Odometer value={n} digits={i === 0 ? 4 : 3} />
            </p>
          </div>
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
            <Odometer value={item.n} digits={item.l === 'Athletes' ? 4 : item.l === 'Uptime' ? 3 : 2} />
          </p>
          <p className="mt-2 text-sm text-nx-muted">{item.l}</p>
        </div>
      ))}
    </div>
  )
}

function CountdownWow({ variant, className }: WowProps) {
  const live = useLiveRemain()
  const d = useCountUp(12, 800, true)
  const h = useCountUp(6, 800, true)
  const clock = useLoopControl(true)
  if (variant === 'shader-rings') {
    return (
      <WowStage shader className={cn('grid grid-cols-2 gap-4 p-6', className)}>
        {[
          [`${String(live.d).padStart(2, '0')}d`, 'days'],
          [`${String(live.h).padStart(2, '0')}h`, 'hours'],
          [`${String(live.m).padStart(2, '0')}m`, 'min'],
          [`${String(live.s).padStart(2, '0')}s`, 'sec'],
        ].map(([cell, label]) => (
          <div key={label}>
            <p className="font-serif text-4xl">{cell}</p>
            <p className="text-[11px] text-white/70">{label}</p>
          </div>
        ))}
      </WowStage>
    )
  }
  if (variant === 'analog-orbit') {
    return (
      <div className={cn('relative min-h-56 overflow-hidden rounded-[1.6rem] bg-[#07070c] p-6 text-white', className)}>
        <AnalogClock paused={!clock.playing} />
        <p className="mt-4 text-center font-mono text-sm text-white/70">
          {live.d}d {live.h}h {live.m}m {live.s}s
        </p>
        {!clock.reduced ? <LoopPause playing={clock.playing} onToggle={clock.toggle} className="absolute right-3 bottom-3" /> : null}
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
    const podium = [
      { name: 'Atlas', h: 120, place: 2, src: media.people.kiran },
      { name: 'Harbor', h: 160, place: 1, src: media.people.anitha },
      { name: 'Vale', h: 96, place: 3, src: media.people.meera },
    ]
    return (
      <div className={cn('flex items-end justify-center gap-3', className)}>
        {podium.map((item) => (
          <div key={item.name} className="flex w-24 flex-col items-center">
            <img src={item.src} alt={item.name} className="mb-2 size-12 rounded-full object-cover" />
            <motion.div
              initial={{ scaleY: 0.2 }}
              animate={{ scaleY: 1 }}
              style={{ height: item.h, transformOrigin: 'bottom' }}
              className="flex w-full items-end justify-center rounded-t-2xl bg-[#111113] pb-3 font-serif text-2xl text-white"
            >
              {item.place}
            </motion.div>
            <p className="mt-2 text-xs text-nx-muted">{item.name}</p>
          </div>
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
    <div className={cn('space-y-3', className)}>
      {rows.map((row, i) => (
        <div key={row.name} className="flex items-center gap-3">
          <span className="w-6 font-mono text-sm">{row.n}</span>
          <div className="relative h-8 flex-1 overflow-hidden rounded-full bg-nx-soft">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-[#4c46e0]"
              initial={{ width: 0 }}
              animate={{ width: `${row.pts}%` }}
              transition={{ duration: 1.1, delay: i * 0.12 }}
            />
            {variant === 'heat-race' ? (
              <motion.span
                className="absolute top-1 size-6 rounded-full bg-[#f3c27a]"
                initial={{ left: 0 }}
                animate={{ left: `calc(${row.pts}% - 1.5rem)` }}
                transition={{ duration: 1.1, delay: i * 0.12 }}
              />
            ) : null}
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
          <div key={name} className="min-w-[14rem] rounded-3xl bg-[#111113] p-5 text-white">
            <p className="font-serif text-2xl">{name}</p>
            <p className="mt-2 text-sm text-white/50">Horizontal film. Flick the reel.</p>
          </div>
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
    <FilmSprocket
      className={className}
      frames={[
        { src: media.cases.build, caption: 'Wren Build' },
        { src: media.cases.farm, caption: 'Harbor Farm' },
        { src: media.cases.track, caption: 'Night Track' },
      ]}
    />
  )
}

function ServicesWow({ variant, className }: WowProps) {
  const doors = ['Consult', 'Lab', 'Pharmacy', 'Therapy']
  if (variant === 'stamp-crews') {
    return (
      <div className={cn('flex flex-wrap gap-3', className)}>
        {doors.map((d) => (
          <StampInk key={d}>{d}</StampInk>
        ))}
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
        <FoldPanel
          key={d}
          className="rounded-3xl border border-nx-border"
          front={<p className="p-4 font-serif text-2xl">{d}</p>}
          back={<p className="p-4 text-sm text-nx-muted">Book the {d.toLowerCase()} door.</p>}
        />
      ))}
    </div>
  )
}

function ProcessWow({ variant, className }: WowProps) {
  const steps = ['Brief', 'Build', 'Review', 'Handover']
  if (variant === 'scrub-timeline') {
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
  if (variant === 'pin-steps') {
    return (
      <div className={cn('space-y-[40vh]', className)}>
        {steps.map((step, i) => (
          <div key={step} className="sticky top-4 rounded-[1.6rem] border border-white/10 bg-[#111113] p-6 text-white" style={{ top: 16 + i * 12 }}>
            <p className="font-mono text-[11px] text-[#f3c27a]">0{i + 1}</p>
            <p className="mt-2 font-serif text-4xl">{step}</p>
          </div>
        ))}
      </div>
    )
  }
  if (variant === 'metronome-steps') {
    return <MetronomeArm steps={steps} className={className} />
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
  if (variant === 'constellation-crew') {
    return (
      <ConstellationMap
        className={className}
        nodes={people.map((p, i) => ({ name: p.name.split(' ')[0]!, x: 18 + i * 20, y: 16 + (i % 2) * 18 }))}
      />
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
        <figure key={p.name} className="overflow-hidden rounded-3xl">
          <img src={p.src} alt={p.name} className="aspect-[3/4] w-full object-cover" />
          {variant === 'holographic' ? <Grain /> : null}
          {variant === 'film-portraits' ? <figcaption className="bg-[#111113] px-2 py-1 text-[10px] text-white/60">{p.name}</figcaption> : null}
        </figure>
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
    <BeamScan className={cn('rounded-[1.6rem] bg-[#4c46e0] px-6 py-12 text-white', className)}>
      <p className="font-serif text-4xl">The closer scans.</p>
    </BeamScan>
  )
}

function ChaptersWow({ variant, className }: WowProps) {
  const chapters = ['Mast', 'Harbor', 'Atlas', 'Night']
  if (variant === 'pin-story') {
    return (
      <div className={cn('space-y-24', className)}>
        {chapters.map((chapter, i) => (
          <div key={chapter} className="sticky top-6 overflow-hidden rounded-[1.6rem] relative">
            <img src={[media.cinema, media.clinic, media.sports, media.fashion][i]} alt="" className="h-64 w-full object-cover" />
            <p className="absolute bottom-4 left-5 font-serif text-4xl text-white">0{i + 1} {chapter}</p>
          </div>
        ))}
      </div>
    )
  }
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
  if (variant === 'tape-digest') {
    return <TapeReels items={['Mon', 'Tue', 'Wed', 'Thu']} className={className} />
  }
  if (variant === 'flip-headlines') {
    return (
      <div className={cn('space-y-3 rounded-[1.6rem] bg-[#07070c] p-4', className)}>
        {lines.map((line) => (
          <SplitFlap key={line} text={line.replace(/[^A-Za-z0-9 ]/g, '').slice(0, 14).toUpperCase()} />
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
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="ml-4 mt-2" /> : null}
    </div>
  )
}

function LogoWow({ variant, className }: WowProps) {
  const marks = [
    { name: 'Kite', src: media.marks.kite },
    { name: 'Solum', src: media.marks.solum },
    { name: 'Nimbus', src: media.marks.nimbus },
    { name: 'Vale', src: media.marks.vale },
  ]
  if (variant === 'orbit-3d') {
    return (
      <div className={cn('relative min-h-48 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <GlobeField />
        <p className="absolute inset-x-0 bottom-4 text-center font-mono text-xs tracking-[0.2em] text-white/60">
          {marks.map((m) => m.name).join(' · ')}
        </p>
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
  if (variant === 'magnetic-marks') {
    return (
      <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
        {marks.map((m) => (
          <MagneticWell key={m.name}>
            <div className="flex items-center justify-center rounded-2xl border border-nx-border bg-nx-card px-4 py-6">
              <img src={m.src} alt={m.name} className="h-8" />
            </div>
          </MagneticWell>
        ))}
      </div>
    )
  }
  return (
    <div className={cn('grid grid-cols-2 gap-3 md:grid-cols-4', className)}>
      {marks.map((m) => (
        <StampInk key={m.name} className="flex items-center justify-center border-nx-border text-sm normal-case">
          <img src={m.src} alt={m.name} className="h-8" />
        </StampInk>
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
