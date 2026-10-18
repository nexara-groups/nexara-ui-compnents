'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import {
  GlobeField,
  Grain,
  INK_PATH,
  LazyMesh3D,
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
import { cn, focusRing, touchTarget, useCountUp } from '@/lib/utils.ts'
import type { WowProps } from './wow-signatures.tsx'

function ShellWow({ variant, className }: WowProps) {
  const [open, setOpen] = useState(true)
  if (variant === 'shader-desk') {
    return (
      <WowStage shader className={cn('min-h-72 p-4', className)}>
        <div className="grid gap-3 md:grid-cols-[8rem_1fr]">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-3 text-sm">
            Rooms
            <br />
            Library
          </div>
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <p className="font-serif text-3xl">Night desk</p>
            <p className="mt-2 text-sm text-white/60">The chrome is a field, not a gray sidebar.</p>
          </div>
        </div>
      </WowStage>
    )
  }
  if (variant === 'command-orbit') {
    return (
      <div className={cn('relative min-h-64 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={['Jump', 'Create', 'Atlas', 'K']} radius={88} />
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
        <div className="relative flex-1 p-5">
          <ShaderMesh />
          <p className="relative z-10 font-serif text-3xl">Rail on a mesh</p>
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
  if (variant === 'glare-delta') {
    return (
      <TiltGlare className={cn('rounded-3xl bg-[#111113] p-5 text-white', className)}>
        <p className="text-sm text-white/50">WoW</p>
        <p className="font-serif text-4xl">+18%</p>
      </TiltGlare>
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
      <div className={cn('grid gap-3 md:hidden', className)}>
        {rows.map((row) => (
          <TiltGlare key={row.name} className="rounded-2xl border border-nx-border p-4">
            <p className="font-medium">{row.name}</p>
            <p className="text-sm text-nx-muted">${row.amt}</p>
          </TiltGlare>
        ))}
        <div className="hidden overflow-x-auto md:block">
          <table className="w-full text-sm">
            <tbody>
              {rows.map((row) => (
                <tr key={row.name} className="border-b border-nx-border">
                  <td className="py-3">{row.name}</td>
                  <td>${row.amt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
  if (variant === 'heat-cells') {
    return (
      <div className={cn('grid grid-cols-3 gap-1', className)}>
        {Array.from({ length: 12 }, (_, i) => (
          <div key={i} className="h-10 rounded-md" style={{ background: `rgba(76,70,224,${0.15 + (i % 4) * 0.2})` }} />
        ))}
      </div>
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
  if (variant === 'orbit-wip') {
    return (
      <div className={cn('relative min-h-52 overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <OrbitRing items={['2/3', '1/2', '1/1']} radius={86} />
      </div>
    )
  }
  if (variant === 'particle-lane') {
    return (
      <div className={cn('relative overflow-hidden rounded-[1.6rem] bg-[#07070c] p-4 text-white', className)}>
        <ParticleField count={40} />
        <p className="relative z-10 font-serif text-2xl">Review lane</p>
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
              <TiltGlare className="rounded-2xl border border-nx-border bg-nx-card p-3">{card}</TiltGlare>
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
      <div className={cn('relative min-h-44 overflow-hidden rounded-3xl bg-[#07070c]', className)}>
        <ParticleField count={50} />
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
              <div key={i} className="flex-1 rounded-t-lg bg-[#4c46e0]" style={{ height: `${h * (0.3 + p * 0.7)}%` }} />
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
        <p className="text-sm text-white/50">Events today</p>
        <p className="font-serif text-5xl">
          <Odometer value={n} digits={2} />
        </p>
      </div>
    )
  }
  if (variant === 'liquid-chat') {
    return (
      <div className={cn('space-y-2', className)}>
        <div className="max-w-[80%] rounded-2xl rounded-bl-md bg-[#4c46e0] px-3 py-2 text-sm text-white">The room is ready.</div>
        <div className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-nx-soft px-3 py-2 text-sm">On my way.</div>
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
            <li key={item} className={cn(touchTarget, 'flex items-center rounded-xl px-2 text-sm', variant === 'glare-row' && 'hover:bg-white/10')}>
              {item}
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
        <PathDraw d={INK_PATH} className="h-8 w-32 text-[#0c8a5e]" />
        <p className="mt-3 font-serif text-2xl">SSO is drawn, not stamped.</p>
      </div>
    )
  }
  if (variant === 'glare-profile') {
    return (
      <TiltGlare className={cn('rounded-3xl bg-[#111113] p-5 text-white', className)}>
        <p className="font-serif text-3xl">Anitha Rao</p>
        <p className="text-sm text-white/50">Harbor desk</p>
      </TiltGlare>
    )
  }
  return (
    <div className={cn('rounded-3xl border border-nx-border p-5', className)}>
      <div className="flex items-center justify-between">
        <p className="font-medium">Dark desk</p>
        <button
          type="button"
          aria-pressed={on}
          onClick={() => setOn((v) => !v)}
          className={cn(focusRing, 'relative h-11 w-16 rounded-full', on ? 'bg-[#4c46e0]' : 'bg-nx-soft')}
        >
          <motion.span layout className="absolute top-1 size-9 rounded-full bg-white" animate={{ left: on ? 28 : 4 }} />
        </button>
      </div>
      {variant === 'morph-sections' ? <motion.p layout className="mt-4 text-sm text-nx-muted">Appearance travels with the switch.</motion.p> : null}
    </div>
  )
}

function KitWow({ variant, className }: WowProps) {
  if (variant === 'shader-clinic') {
    return (
      <WowStage shader className={cn('space-y-6 p-6', className)}>
        <p className="font-mono text-[11px] text-[#f3c27a]">LUMEN CARE</p>
        <SplitMask text={'Heart care,\nconsidered.'} className="font-serif text-5xl leading-[0.9] md:text-6xl" />
        <p className="max-w-md text-sm text-white/65">Four doors. A shader field instead of a stock navy hero.</p>
        <button type="button" className={cn(wowBtn, 'bg-white text-[#111]')}>
          Book a chair
        </button>
      </WowStage>
    )
  }
  if (variant === 'globe-agency') {
    return (
      <div className={cn('overflow-hidden rounded-[1.6rem] bg-[#07070c] text-white', className)}>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="p-6">
            <p className="font-mono text-[11px] text-[#f3c27a]">NORTH STUDIO</p>
            <h3 className="mt-3 font-serif text-5xl">Move the furniture.</h3>
            <p className="mt-3 text-sm text-white/60">A globe of rooms, not a logo strip.</p>
          </div>
          <div className="relative min-h-64">
            <GlobeField />
            <OrbitRing items={['Work', 'Labs', 'Press']} radius={90} />
          </div>
        </div>
      </div>
    )
  }
  if (variant === 'pin-sports') {
    return (
      <ScrollPin height="220vh" className={className}>
        {(p) => (
          <WowStage className="w-full min-h-[28rem] p-6">
            <p className="font-mono text-[11px] text-[#f3c27a]">FIELD ATHLETICS</p>
            <p className="mt-3 font-serif text-5xl md:text-6xl">A season you can stand on.</p>
            <p className="mt-4 text-sm text-white/60">Scroll scrubs the medal book. {Math.round(p * 16)} events in view.</p>
          </WowStage>
        )}
      </ScrollPin>
    )
  }
  if (variant === 'liquid-portal') {
    return (
      <div className={cn('overflow-hidden rounded-[1.6rem] bg-[#07070c]', className)}>
        <LazyMesh3D className="min-h-64" />
        <div className="p-6 text-white">
          <p className="font-mono text-[11px] text-[#f3c27a]">AGENCY OS</p>
          <p className="mt-2 font-serif text-4xl">The desk after dark.</p>
        </div>
      </div>
    )
  }
  return (
    <WowStage className={cn('p-6', className)}>
      <p className="font-mono text-[11px] text-[#f3c27a]">ATLAS ACADEMY</p>
      <ScrambleText text="We grow engineers." className="mt-3 block font-serif text-5xl" />
      <p className="mt-4 max-w-md text-sm text-white/60">Hover the title. The letters refuse to sit still until they mean it.</p>
    </WowStage>
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
  if (family === 'kit') return <KitWow {...props} />
  return (
    <WowStage className={props.className}>
      <Grain />
      <p className="p-5 font-serif text-2xl">{props.variant}</p>
    </WowStage>
  )
}
