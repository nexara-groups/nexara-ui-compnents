'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { LoopPause, faces, media } from '@/lib/media.tsx'
import { AreaSpark, GooPuddle, HeatGrid } from '@/lib/wow-fx.tsx'
import {
  FoldPanel,
  InfinityPath,
  PeelCorner,
  PendulumCard,
  PrismSplit,
  RadarSweep,
} from '@/lib/wow-unique.tsx'
import {
  Grain,
  INK_PATH,
  MagneticWell,
  Odometer,
  ParticleField,
  PathDraw,
  ScrambleText,
  ScrollPin,
  WowStage,
} from '@/lib/wow.tsx'
import { cn, focusRing, touchTarget, useCountUp, useLoopControl } from '@/lib/utils.ts'
import type { WowProps } from '@/lib/wow-variants.ts'

function ShellWow({ variant, className }: WowProps) {
  const [open, setOpen] = useState(true)
  if (variant === 'shader-desk') {
    return (
      <div className={cn('relative min-h-72 overflow-hidden rounded-[1.6rem]', className)}>
        <img src={media.device} alt="" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-0 bg-[#07070c]/60" />
        <div className="relative z-10 grid gap-3 p-4 text-white md:grid-cols-[9rem_1fr]">
          <div className="rounded-2xl border border-white/15 bg-black/30 p-3 text-sm backdrop-blur-sm">
            Rooms
            <br />
            Library
          </div>
          <div className="rounded-2xl border border-white/15 bg-black/30 p-4 backdrop-blur-sm">
            <p className="font-serif text-3xl">Night desk</p>
            <p className="mt-2 text-sm text-white/70">Anitha’s Harbor room is live. The chrome sits on a photograph, not a mesh hat.</p>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'radar-jump') {
    return (
      <div className={cn('grid min-h-[32rem] overflow-hidden rounded-[1.6rem] bg-[#111113] text-white md:grid-cols-[15rem_1fr]', className)}>
        <aside className="border-white/10 p-4 md:border-r">
          <img src={faces[0].src} alt={faces[0].name} className="size-14 rounded-2xl object-cover" />
          <p className="mt-3 font-medium">North OS</p>
          <p className="text-sm text-white/70">{faces[0].name} · Harbor desk</p>
          <p className="mt-4 text-[11px] tracking-[0.16em] text-white/70 uppercase">Rooms</p>
          <ul className="mt-2 space-y-2 text-sm">
            <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
              Harbor Hall <span className="text-[#f3c27a]">2 live</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
              Atlas Lab <span className="text-white/70">review</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
              Vale Chair <span className="text-[#f3c27a]">open</span>
            </li>
            <li className="flex items-center justify-between rounded-xl bg-white/5 px-3 py-2">
              Wren Plant <span className="text-white/70">idle</span>
            </li>
          </ul>
          <p className="mt-5 text-[11px] text-white/70">Friday 10:00–18:00 · Harbor Bay</p>
        </aside>
        <div className="relative p-5">
          <img src={media.screens.lumen} alt="" className="absolute inset-0 size-full object-cover opacity-25" />
          <div className="relative z-10">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-serif text-3xl">Jump the desk</p>
                <p className="mt-1 text-sm text-white/70">Friday 16:00 · two briefs waiting. Lumen is already on the glass.</p>
              </div>
              <RadarSweep items={['H', 'A', 'V']} className="w-28" />
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              {[
                { who: faces[0], job: 'Open Harbor', note: '2 briefs' },
                { who: faces[1], job: 'Atlas review', note: 'due Friday' },
                { who: faces[2], job: 'Create a chair', note: 'Vale' },
              ].map((row) => (
                <li key={row.job} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/35 px-3 py-2">
                  <img src={row.who.src} alt="" className="size-8 rounded-full object-cover" />
                  <span className="flex-1">{row.job}</span>
                  <span className="text-white/70">{row.note}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'liquid-rail') {
    return (
      <div className={cn('flex min-h-64 overflow-hidden rounded-[1.6rem] bg-[#111113] text-white', className)}>
        <div className="flex w-16 flex-col items-center gap-3 border-r border-white/10 py-4">
          {['N', 'W', 'A'].map((n) => (
            <span key={n} className="flex size-11 items-center justify-center rounded-2xl bg-white/10">
              {n}
            </span>
          ))}
        </div>
        <div className="relative flex-1">
          <img src={media.screens.lumen} alt="" className="absolute inset-0 size-full object-cover opacity-50" />
          <div className="relative z-10 p-5">
            <p className="font-serif text-3xl">Rail on a desk</p>
            <p className="mt-2 text-sm text-white/70">Lumen is already open. The letters stay identity.</p>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className={cn('flex min-h-64 overflow-hidden rounded-[1.6rem] border border-nx-border', className)}>
      <motion.aside layout className={cn('border-r border-nx-border bg-nx-card p-3', open ? 'w-40' : 'w-16')}>
        <button type="button" className={cn(focusRing, touchTarget, 'rounded-xl px-2')} onClick={() => setOpen((v) => !v)}>
          {open ? 'North OS' : 'N'}
        </button>
        {open ? <p className="mt-3 text-sm text-nx-muted">Leads · Board</p> : null}
      </motion.aside>
      <div className="flex-1 p-5">
        <p className="font-serif text-3xl">Morph sidebar</p>
        <p className="mt-2 text-sm text-nx-muted">The rail keeps identity while it collapses.</p>
      </div>
    </div>
  )
}

function KpiWow({ variant, className }: WowProps) {
  const n = useCountUp(846, 1400, true)
  if (variant === 'ring-draw') {
    return (
      <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
        <svg viewBox="0 0 80 80" className="size-24">
          <motion.circle
            cx="40"
            cy="40"
            r="28"
            fill="none"
            stroke="#4c46e0"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 0.78 }}
            transition={{ duration: 1.4 }}
          />
        </svg>
        <p className="mt-2 font-serif text-3xl">78%</p>
      </div>
    )
  }
  if (variant === 'particle-live') {
    return (
      <div className={cn('relative overflow-hidden rounded-3xl bg-[#07070c] p-5 text-white', className)}>
        <ParticleField count={36} />
        <p className="relative z-10 text-[11px] text-[#f3c27a]">Live</p>
        <p className="relative z-10 font-serif text-5xl">
          <Odometer value={n} digits={3} />
        </p>
      </div>
    )
  }
  if (variant === 'spark-delta') {
    return (
      <div className={cn('rounded-3xl bg-[#111113] p-5 text-white', className)}>
        <p className="text-sm text-white/70">Week over week</p>
        <p className="font-serif text-4xl">+18%</p>
        <AreaSpark className="mt-3" />
      </div>
    )
  }
  return (
    <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
      <p className="text-sm text-nx-muted">Booked</p>
      <p className="font-serif text-5xl">
        ₹<Odometer value={n} digits={3} />
      </p>
    </div>
  )
}

function TableWow({ variant, className }: WowProps) {
  const rows = [
    { name: 'Wren Build', amt: 48 },
    { name: 'Harbor Hall', amt: 12 },
    { name: 'Atlas Lab', amt: 86 },
  ]
  const a = useCountUp(48, 1000, true)
  if (variant === 'morph-cards') {
    return (
      <div className={cn('grid gap-3 sm:grid-cols-3', className)}>
        {rows.map((row) => (
          <motion.article layout key={row.name} className="rounded-2xl border border-nx-border p-4">
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-nx-muted">${row.amt}</p>
          </motion.article>
        ))}
      </div>
    )
  }
  if (variant === 'heat-cells') {
    return (
      <HeatGrid
        className={className}
        cells={[
          { label: 'Wren', heat: 0.48 },
          { label: 'Harbor', heat: 0.22 },
          { label: 'Atlas', heat: 0.86 },
          { label: 'Vale', heat: 0.61 },
          { label: 'Kite', heat: 0.33 },
          { label: 'Solum', heat: 0.74 },
          { label: 'Nimbus', heat: 0.41 },
          { label: 'Farm', heat: 0.19 },
          { label: 'Track', heat: 0.92 },
        ]}
      />
    )
  }
  return (
    <div className={cn('overflow-x-auto rounded-3xl border border-nx-border', className)}>
      <table className="w-full min-w-[20rem] text-left text-sm">
        <thead>
          <tr className="text-nx-muted">
            <th className="p-3">Job</th>
            <th className="p-3">Amount</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <motion.tr key={row.name} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <td className="p-3">{row.name}</td>
              <td className="p-3">{variant === 'odometer-cells' && i === 0 ? <Odometer value={a} digits={2} /> : row.amt}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function KanbanWow({ variant, className }: WowProps) {
  const cols = [
    { name: 'Brief', cards: ['Wren', 'Farm'] },
    { name: 'Build', cards: ['Remote'] },
    { name: 'Review', cards: ['Atlas'] },
  ]
  if (variant === 'wip-pendulum') {
    return (
      <div className={cn('grid gap-3 overflow-hidden rounded-[1.6rem] bg-[#07070c] p-4 text-white md:grid-cols-3', className)}>
        <div className="min-w-0 space-y-2 overflow-hidden">
          <p className="text-xs tracking-[0.16em] text-white/70 uppercase">Brief · 2</p>
          {['Wren pack', 'Farm brief'].map((card) => (
            <PeelCorner key={card} className="rounded-2xl border border-white/10 bg-white/5 p-3" label={card}>
              <p className="font-medium">{card}</p>
              <p className="text-xs text-white/70">Anitha · today</p>
            </PeelCorner>
          ))}
        </div>
        <div className="min-w-0 space-y-2 overflow-hidden">
          <p className="text-xs tracking-[0.16em] text-white/70 uppercase">Build · 1</p>
          <PeelCorner className="rounded-2xl border border-white/10 bg-white/5 p-3" label="Remote">
            <img src={media.screens.field} alt="" className="mb-2 h-20 w-full rounded-lg object-cover" />
            <p className="font-medium">Remote lane</p>
            <p className="text-xs text-white/70">Kiran · in flight</p>
          </PeelCorner>
        </div>
        <div className="min-w-0 overflow-hidden">
          <p className="mb-2 text-xs tracking-[0.16em] text-white/70 uppercase">Review · WIP 2 / 3</p>
          <PendulumCard className="min-h-48 bg-transparent p-0">
            <img src={media.screens.lumen} alt="" className="mb-2 h-14 w-full rounded-lg object-cover" />
            <p className="text-xs text-white/70">Atlas hangs</p>
            <p className="font-serif text-3xl">2 / 3</p>
            <p className="mt-1 text-sm text-white/70">Farm brief must land first.</p>
          </PendulumCard>
        </div>
      </div>
    )
  }
  if (variant === 'particle-lane') {
    return (
      <div className={cn('relative overflow-hidden rounded-[1.6rem] bg-[#07070c] p-4 text-white', className)}>
        <ParticleField count={40} />
        <p className="relative z-10 font-serif text-2xl">Review lane</p>
        <p className="relative z-10 mt-2 text-sm text-white/70">Atlas waits. Two briefs in the queue.</p>
      </div>
    )
  }
  return (
    <div className={cn('flex gap-3 overflow-x-auto pb-2', className)}>
      {cols.map((col) => (
        <div key={col.name} className="min-w-[10rem] space-y-2">
          <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">{col.name}</p>
          {col.cards.map((card) => (
            <MagneticWell key={card}>
              <PeelCorner className="rounded-2xl border border-nx-border bg-nx-card p-3" label={card}>
                <p className="font-medium">{card}</p>
                <p className="text-xs text-nx-muted">{col.name} · Anitha</p>
              </PeelCorner>
            </MagneticWell>
          ))}
        </div>
      ))}
    </div>
  )
}

function ChartWow({ variant, className }: WowProps) {
  if (variant === 'particle-area') {
    return (
      <div className={cn('relative min-h-44 overflow-hidden rounded-3xl bg-[#07070c] p-4', className)}>
        <AreaSpark withParticles />
      </div>
    )
  }
  if (variant === 'shader-donut') {
    return (
      <WowStage shader className={cn('flex min-h-44 items-center justify-center', className)}>
        <svg viewBox="0 0 80 80" className="size-28">
          <motion.circle cx="40" cy="40" r="26" fill="none" stroke="white" strokeWidth="8" initial={{ pathLength: 0 }} animate={{ pathLength: 0.64 }} />
        </svg>
      </WowStage>
    )
  }
  if (variant === 'scrub-bars') {
    return (
      <ScrollPin height="160vh" className={className}>
        {(p) => (
          <div className="flex h-40 w-full items-end gap-2">
            {[40, 70, 55, 90, 62, 80].map((h, i) => (
              <div
                key={i}
                className="flex-1 origin-bottom rounded-t-lg bg-[#4c46e0]"
                style={{ height: `${h}%`, transform: `scaleY(${0.3 + p * 0.7})` }}
              />
            ))}
          </div>
        )}
      </ScrollPin>
    )
  }
  return (
    <div className={cn('rounded-3xl border border-nx-border p-4', className)}>
      <svg viewBox="0 0 120 48" className="h-28 w-full text-[#4c46e0]">
        <motion.path
          d="M4 40 C 20 36, 28 12, 44 18 S 72 44, 88 22 110 10, 116 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.6 }}
        />
      </svg>
    </div>
  )
}

function ActivityWow({ variant, className }: WowProps) {
  const items = ['Anitha booked a chair', 'Harbor exported a pack', 'Atlas passed review']
  const n = useCountUp(24, 1000, true)
  if (variant === 'path-rail') {
    return (
      <div className={cn('rounded-3xl border border-nx-border p-4', className)}>
        <PathDraw d="M12 8 V 90 M12 16 H 80 M12 40 H 70 M12 64 H 90" className="h-28 w-full text-[#4c46e0]" />
      </div>
    )
  }
  if (variant === 'live-odometer') {
    return (
      <div className={cn('rounded-3xl bg-[#111113] p-5 text-white', className)}>
        <p className="text-sm text-white/70">Events today</p>
        <p className="font-serif text-5xl">
          <Odometer value={n} digits={2} />
        </p>
      </div>
    )
  }
  if (variant === 'liquid-chat') {
    return (
      <div className={cn('space-y-3', className)}>
        <div className="relative max-w-[80%] overflow-hidden rounded-2xl rounded-bl-md bg-[#4c46e0] px-3 py-2 text-sm text-white">
          <GooPuddle />
          <span className="relative z-10">The room is ready.</span>
        </div>
        <div className="relative ml-auto max-w-[80%] overflow-hidden rounded-2xl rounded-br-md bg-nx-soft px-3 py-2 text-sm">
          <GooPuddle />
          <span className="relative z-10">On my way.</span>
        </div>
      </div>
    )
  }
  return (
    <ul className={cn('space-y-2', className)}>
      {items.map((item, i) => (
        <motion.li key={item} initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.1 }} className="rounded-2xl border border-nx-border px-3 py-2 text-sm">
          {item}
        </motion.li>
      ))}
    </ul>
  )
}

function CommandWow({ variant, className }: WowProps) {
  const [q, setQ] = useState('')
  const items = ['Open Harbor', 'Jump Atlas', 'Create brief'].filter((item) => item.toLowerCase().includes(q.toLowerCase()))
  return (
    <div className={cn('overflow-hidden rounded-3xl border border-nx-border bg-nx-card', variant === 'particle-jump' && 'border-white/10 bg-[#07070c] text-white', className)}>
      {variant === 'particle-jump' ? <ParticleField count={30} /> : null}
      <div className="relative z-10 p-3">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={cn(focusRing, 'min-h-11 w-full bg-transparent px-2')}
          placeholder={variant === 'scramble-search' ? 'scramble…' : 'Jump'}
        />
        {variant === 'scramble-search' ? <ScrambleText text={q || 'open atlas'} className="block px-2 text-xs text-current/50" /> : null}
        <ul className="mt-2">
          {items.map((item) => (
            <li key={item}>
              <button type="button" className={cn(touchTarget, 'flex w-full items-center rounded-xl px-2 text-left text-sm', variant === 'prism-row' && 'hover:bg-white/10')}>
                {variant === 'prism-row' ? <PrismSplit>{item}</PrismSplit> : item}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function SettingsWow({ variant, className }: WowProps) {
  const [on, setOn] = useState(true)
  if (variant === 'path-security') {
    return (
      <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
        <p className="text-xs tracking-[0.16em] text-nx-muted uppercase">Security</p>
        <PathDraw d={INK_PATH} className="mt-3 h-8 w-32 text-[#0c8a5e]" />
        <p className="mt-3 font-serif text-2xl">SSO is drawn, not stamped.</p>
        <p className="mt-2 text-sm text-nx-muted">Passkeys on. Harbor is the named partner. Last check Friday 16:02.</p>
      </div>
    )
  }
  if (variant === 'fold-profile') {
    return (
      <div className={cn('grid gap-3 overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#111113] p-4 text-white md:grid-cols-[1.1fr_0.9fr]', className)}>
        <FoldPanel
          defaultOpen
          className="w-full"
          front={
            <div className="overflow-hidden rounded-3xl bg-[#16161c]">
              <img src={media.people.anitha} alt="Anitha Rao" className="h-36 w-full object-cover" />
              <div className="p-4">
                <p className="font-serif text-3xl">Anitha Rao</p>
                <p className="mt-1 text-sm text-white/70">Harbor desk · SSO on</p>
                <p className="mt-3 text-sm text-white/70">Mon–Fri 10:00–18:00 · Harbor Bay</p>
                <p className="mt-1 text-xs text-white/70">Last check Friday 16:02</p>
              </div>
            </div>
          }
          back={
            <div className="rounded-3xl border border-white/15 bg-white/5 p-4 text-sm">
              <p className="font-medium">Security</p>
              <p className="mt-1 text-white/70">Passkeys. Named partner. Audit keeps seven years.</p>
              <p className="mt-3 font-medium">Desk</p>
              <p className="mt-1 text-white/70">Harbor Hall is live. Atlas is in review.</p>
            </div>
          }
        />
        <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
          <p className="text-[11px] tracking-[0.16em] text-white/70 uppercase">Desk hours</p>
          <p className="mt-2 font-serif text-3xl">10–18</p>
          <p className="mt-2 text-sm text-white/70">Harbor Bay. Fold the portrait for the partner book.</p>
          <ul className="mt-4 space-y-2 text-sm text-white/70">
            <li>SSO · passkeys</li>
            <li>Named partner · Vale</li>
            <li>Friday demo · 16:00</li>
          </ul>
        </div>
      </div>
    )
  }
  return (
    <div className={cn('space-y-4 rounded-3xl border border-nx-border p-5', className)}>
      <div className="flex items-center gap-3">
        <img src={media.people.anitha} alt="" className="size-11 rounded-full object-cover" />
        <div>
          <p className="font-medium">Anitha Rao</p>
          <p className="text-sm text-nx-muted">Harbor desk</p>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <p className="font-medium">Dark desk</p>
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
          className={cn(focusRing, 'relative h-11 w-16 overflow-hidden rounded-full', on ? 'bg-[#4c46e0]' : 'bg-nx-soft')}
        >
          {variant === 'liquid-toggle' ? <GooPuddle /> : null}
          <motion.span layout className="absolute top-1 size-9 rounded-full bg-white" animate={{ left: on ? 28 : 4 }} />
        </button>
      </div>
      {variant === 'morph-sections' ? <motion.p layout className="text-sm text-nx-muted">Appearance travels with the switch. Hours stay 10–18.</motion.p> : null}
    </div>
  )
}

function LoaderWow({ variant, className, title }: WowProps) {
  const n = useCountUp(72, 1600, true)
  const label = String(title ?? 'Harbor pack')
  const loop = useLoopControl(true)
  return (
    <div
      role="status"
      aria-live="polite"
      aria-label={`Loading ${label}`}
      className={cn('relative flex min-h-52 flex-col items-center justify-center overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#111113] p-6 text-white', className)}
    >
      {variant === 'pulse-halo' ? (
        <div className="relative size-40">
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-[#f3c27a]/70"
              style={{ inset: `${i * 7}px` }}
              animate={loop.playing ? { scale: [0.92, 1.08, 0.92], opacity: [0.85, 0.25, 0.85] } : undefined}
              transition={{ duration: 2.2, repeat: Infinity, delay: i * 0.18 }}
            />
          ))}
          <img src={media.device} alt="" className="absolute inset-10 rounded-2xl object-cover" />
          <span className="absolute inset-0 m-auto size-2.5 rounded-full bg-[#f3c27a]" />
        </div>
      ) : null}
      {variant === 'pulse-halo' ? (
        <ol className="relative z-10 mt-4 flex gap-1" aria-label="Harbor pack progress">
          {Array.from({ length: 12 }, (_, i) => (
            <li key={i} className={cn('h-1 w-3 rounded-full', i < 4 ? 'bg-[#f3c27a]' : 'bg-white/20')} />
          ))}
        </ol>
      ) : null}
      {variant === 'orbit-beads' ? (
        <div className="relative size-28">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="absolute inset-0"
              animate={loop.playing ? { rotate: [i * 120, i * 120 + 360] } : { rotate: i * 120 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'linear' }}
            >
              <span className="absolute top-0 left-1/2 size-3 -translate-x-1/2 rounded-full bg-[#f3c27a]" />
            </motion.span>
          ))}
          <span className="absolute inset-0 m-auto size-2 rounded-full bg-white" />
        </div>
      ) : null}
      {variant === 'shader-fog' ? (
        <motion.div
          aria-hidden="true"
          className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,#7c6cff55,transparent_45%),radial-gradient(circle_at_70%_70%,#f3c27a33,transparent_40%)]"
          animate={loop.playing ? { opacity: [0.4, 0.9, 0.4], scale: [1, 1.08, 1] } : undefined}
          transition={{ duration: 4, repeat: Infinity }}
        />
      ) : null}
      {variant === 'path-infinity' ? <InfinityPath className="w-56" playing={loop.playing} pauseable={false} /> : null}
      {variant === 'odometer-pct' ? (
        <div className="w-48">
          <p className="font-serif text-5xl tabular-nums">{n}%</p>
          <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-white/10">
            <span className="block h-full bg-[#f3c27a]" style={{ width: `${n}%` }} />
          </span>
        </div>
      ) : null}
      {variant === 'scramble-hold' ? (
        <p className="font-serif text-3xl">
          Hold
          <motion.span aria-hidden="true" className="ml-2 inline-block w-8" animate={loop.playing ? { opacity: [0, 1, 0] } : undefined} transition={{ duration: 1.2, repeat: Infinity }}>
            —
          </motion.span>
        </p>
      ) : null}
      {variant === 'liquid-drop' ? (
        <motion.span
          aria-hidden="true"
          className="block size-10 rounded-full bg-[#7c6cff]"
          animate={loop.playing ? { y: [-28, 18, 18], borderRadius: ['50%', '50%', '42% 42% 50% 50%'], scaleY: [1, 1, 0.7] } : undefined}
          transition={{ duration: 1.6, repeat: Infinity }}
        />
      ) : null}
      {variant === 'particle-drift' ? (
        <div aria-hidden="true" className="relative h-24 w-12 rounded-full border border-white/20">
          {Array.from({ length: 8 }, (_, i) => (
            <motion.span
              key={i}
              className="absolute left-1/2 size-1.5 -translate-x-1/2 rounded-full bg-[#f3c27a]"
              animate={loop.playing ? { y: [8, 80], opacity: [1, 0] } : undefined}
              transition={{ duration: 1.4, repeat: Infinity, delay: i * 0.12 }}
            />
          ))}
        </div>
      ) : null}
      {variant === 'flap-wait' ? (
        <div className="flex gap-1 font-mono text-2xl">
          {['W', 'A', 'I', 'T'].map((ch, i) => (
            <motion.span
              key={ch}
              className="inline-flex size-10 items-center justify-center rounded-md border border-white/15 bg-[#16161c]"
              animate={loop.playing ? { rotateX: [0, 0, -90, 0] } : { rotateX: 0 }}
              transition={{ duration: 2.4, repeat: Infinity, delay: i * 0.16, times: [0, 0.55, 0.75, 1] }}
            >
              {ch}
            </motion.span>
          ))}
        </div>
      ) : null}
      {variant === 'analog-sweep' ? (
        <div className="relative size-28 rounded-full border border-white/20">
          <motion.span
            aria-hidden="true"
            className="absolute top-3 left-1/2 h-11 w-px origin-bottom bg-[#f3c27a]"
            animate={loop.playing ? { rotate: 360 } : undefined}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <span className="absolute inset-0 m-auto size-2 rounded-full bg-white" />
        </div>
      ) : null}
      {variant === 'barcode-scan' ? (
        <div className="relative w-56">
          <div className="flex h-12 items-end gap-px">
            {Array.from({ length: 28 }, (_, i) => (
              <span key={i} className="flex-1 bg-white" style={{ height: `${30 + ((i * 13) % 70)}%` }} />
            ))}
          </div>
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 w-0.5 bg-[#f3c27a]"
            animate={loop.playing ? { x: [0, 210] } : undefined}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'linear' }}
          />
          <p className="mt-2 font-mono text-[11px] tracking-[0.2em] text-white/70">HBR-4802</p>
        </div>
      ) : null}
      {variant === 'prism-bar' ? (
        <div className="relative h-3 w-56 overflow-hidden rounded-full bg-white/10">
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 bg-[#ff3b30] mix-blend-screen"
            animate={loop.playing ? { x: ['-20%', '80%'] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity }}
          />
          <motion.span
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-1/2 bg-[#32ade6] mix-blend-screen"
            animate={loop.playing ? { x: ['-10%', '90%'] } : undefined}
            transition={{ duration: 1.4, repeat: Infinity, delay: 0.08 }}
          />
        </div>
      ) : null}
      <p className="relative z-10 mt-5 text-sm text-white/70">{label}</p>
      {!loop.reduced ? <LoopPause playing={loop.playing} onToggle={loop.toggle} className="absolute right-3 bottom-3" /> : null}
    </div>
  )
}

export function WowApp(props: WowProps) {
  const { family } = props
  if (family === 'app-shell') return <ShellWow {...props} />
  if (family === 'kpi') return <KpiWow {...props} />
  if (family === 'data-table') return <TableWow {...props} />
  if (family === 'kanban-board') return <KanbanWow {...props} />
  if (family === 'chart-block') return <ChartWow {...props} />
  if (family === 'activity') return <ActivityWow {...props} />
  if (family === 'command-palette') return <CommandWow {...props} />
  if (family === 'settings-panel') return <SettingsWow {...props} />
  if (family === 'loader') return <LoaderWow {...props} />
  return (
    <WowStage className={props.className}>
      <Grain />
      <p className="p-5 font-serif text-2xl">{props.variant}</p>
    </WowStage>
  )
}
