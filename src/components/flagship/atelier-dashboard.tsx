'use client'

import { Grain, HelioMark, cn, springs, useCount, useFocusTrap } from '@/components/flagship/primitives.tsx'
import { portraits } from '@/flagship/assets.ts'
import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { AnimatePresence, motion } from 'framer-motion'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'

type Status = 'open' | 'held' | 'archived'
type SignalRow = {
  id: string
  title: string
  owner: string
  studio: string
  status: Status
  strength: number
  updated: string
}

const seed: SignalRow[] = [
  { id: 'HX-18', title: 'Open the north iris', owner: 'Meera', studio: 'Harbor', status: 'open', strength: 86, updated: '2m' },
  { id: 'HX-21', title: 'Dim last week’s archive', owner: 'Eli', studio: 'Lamp', status: 'held', strength: 64, updated: '11m' },
  { id: 'HX-07', title: 'Seat for Vespers review', owner: 'Luz', studio: 'Vespers', status: 'open', strength: 71, updated: '18m' },
  { id: 'HX-30', title: 'Pulse the loft beam', owner: 'Hana', studio: 'Tide', status: 'archived', strength: 41, updated: '1h' },
  { id: 'HX-14', title: 'Hold the brass plate', owner: 'Otto', studio: '18', status: 'held', strength: 58, updated: '2h' },
  { id: 'HX-03', title: 'Rewrite the night lede', owner: 'Amir', studio: 'Signal', status: 'open', strength: 92, updated: '3h' },
  { id: 'HX-27', title: 'Close the rain window', owner: 'Meera', studio: 'Harbor', status: 'archived', strength: 33, updated: '5h' },
  { id: 'HX-11', title: 'Aim instrument at intake', owner: 'Eli', studio: 'Lamp', status: 'open', strength: 77, updated: '6h' },
]

const faces: Record<string, string> = {
  Meera: portraits.meera(),
  Eli: portraits.eli(),
  Luz: portraits.luz(),
  Hana: portraits.hana(),
  Otto: portraits.otto(),
  Amir: portraits.amir(),
}

const paletteCommands = [
  { id: 'jump-iris', label: 'Jump to iris', run: 'hero' },
  { id: 'new-signal', label: 'New signal', run: 'create' },
  { id: 'filter-open', label: 'Show open only', run: 'filter:open' },
  { id: 'filter-held', label: 'Show held only', run: 'filter:held' },
  { id: 'clear', label: 'Clear filters', run: 'clear' },
  { id: 'loading', label: 'Replay loading', run: 'load' },
]

const desks = ['Iris', 'Desk', 'Archive', 'Studio'] as const

export type AtelierDashboardProps = {
  className?: string
}

export function AtelierDashboard({ className }: AtelierDashboardProps) {
  const reduced = usePrefersReducedMotion()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [nav, setNav] = useState<(typeof desks)[number]>('Iris')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status | 'all'>('all')
  const [sortKey, setSortKey] = useState<keyof SignalRow>('strength')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [loading, setLoading] = useState(true)
  const [palette, setPalette] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [focusId, setFocusId] = useState('HX-18')
  const [live, setLive] = useState(128)
  const [points, setPoints] = useState(() => Array.from({ length: 24 }, (_, i) => 30 + ((i * 17) % 50)))
  const drawerRef = useRef<HTMLElement>(null)
  const paletteRef = useRef<HTMLDivElement>(null)
  const closeDrawer = useCallback(() => setMobileOpen(false), [])
  const closePalette = useCallback(() => setPalette(false), [])

  useFocusTrap(mobileOpen, drawerRef, closeDrawer)
  useFocusTrap(palette, paletteRef, closePalette)

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700)
    return () => window.clearTimeout(timer)
  }, [])

  useEffect(() => {
    const id = window.setInterval(() => {
      setLive((value) => value + (Math.random() > 0.55 ? 1 : 0))
      setPoints((current) => current.slice(1).concat(20 + Math.round(Math.random() * 70)))
    }, 1400)
    return () => window.clearInterval(id)
  }, [])

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      const meta = event.metaKey || event.ctrlKey
      if (meta && event.key.toLowerCase() === 'k') {
        event.preventDefault()
        setPalette((value) => !value)
        setPaletteQuery('')
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (!mobileOpen) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [mobileOpen])

  const rows = useMemo(() => {
    const filtered = seed.filter((row) => {
      const text = `${row.title} ${row.owner} ${row.id}`.toLowerCase()
      const matchesQuery = text.includes(query.trim().toLowerCase())
      const matchesStatus = status === 'all' || row.status === status
      return matchesQuery && matchesStatus
    })
    return [...filtered].sort((a, b) => {
      const left = a[sortKey]
      const right = b[sortKey]
      const cmp = typeof left === 'number' && typeof right === 'number' ? left - right : String(left).localeCompare(String(right))
      return sortDir === 'asc' ? cmp : -cmp
    })
  }, [query, sortDir, sortKey, status])

  const commands = paletteCommands.filter((item) => item.label.toLowerCase().includes(paletteQuery.toLowerCase()))
  const focused = seed.find((row) => row.id === focusId) ?? seed[0]
  const openCount = seed.filter((row) => row.status === 'open').length
  const heldCount = seed.filter((row) => row.status === 'held').length

  function toggleSort(key: keyof SignalRow) {
    if (sortKey === key) setSortDir((value) => (value === 'asc' ? 'desc' : 'asc'))
    else {
      setSortKey(key)
      setSortDir('desc')
    }
  }

  function runCommand(run: string) {
    if (run === 'filter:open') setStatus('open')
    if (run === 'filter:held') setStatus('held')
    if (run === 'clear') {
      setStatus('all')
      setQuery('')
    }
    if (run === 'load') {
      setLoading(true)
      window.setTimeout(() => setLoading(false), 700)
    }
    if (run === 'create') {
      setQuery('')
      setStatus('all')
    }
    setPalette(false)
  }

  return (
    <div className={cn('relative min-h-svh overflow-x-hidden bg-void text-ivory', className)}>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(255,77,28,0.12),transparent_34%),radial-gradient(circle_at_88%_12%,rgba(62,224,198,0.08),transparent_28%)]" />
      <Grain className="opacity-[0.07]" />

      {mobileOpen ? (
        <button type="button" className="fixed inset-0 z-20 bg-void/70 md:hidden" aria-label="Close navigation" onClick={closeDrawer} />
      ) : null}

      <aside
        ref={drawerRef}
        className={cn(
          'fixed inset-y-0 left-0 z-30 flex w-64 flex-col border-r border-brass/25 bg-[#14100c] px-4 pt-6 pb-5 shadow-[20px_0_40px_-28px_rgba(0,0,0,0.8)] transition-transform duration-300 md:hidden',
          mobileOpen ? 'translate-x-0' : '-translate-x-full',
        )}
        aria-hidden={!mobileOpen}
        inert={!mobileOpen}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-2 font-serif text-xl">
            <HelioMark className="size-7" /> Helio
          </span>
          <button
            type="button"
            onClick={closeDrawer}
            className="h-10 rounded-full border border-ivory/15 px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
          >
            Close
          </button>
        </div>
        <nav className="mt-8 space-y-2" aria-label="Desk">
          {desks.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => {
                setNav(item)
                setMobileOpen(false)
              }}
              className={cn(
                'flex h-12 w-full items-center rounded-full px-4 text-left font-serif text-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                nav === item ? 'bg-ivory/8 text-ivory' : 'text-ivory/55',
              )}
            >
              {item}
            </button>
          ))}
        </nav>
      </aside>

      <header className="relative border-b border-brass/25 bg-[linear-gradient(180deg,#1a1610_0%,#100e16_100%)]">
        <div className="flex h-16 items-center gap-3 px-4 md:px-6">
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-full border border-ivory/15 md:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
            onClick={() => setMobileOpen(true)}
            aria-label="Open navigation"
            aria-expanded={mobileOpen}
          >
            ☰
          </button>
          <HelioMark className="size-7" />
          <p className="hidden font-serif text-xl tracking-tight sm:block">Helio</p>
          <p className="hidden font-mono text-[10px] tracking-[0.2em] text-brass uppercase md:block">Observatory · {nav}</p>
          <nav className="ml-4 hidden items-center gap-1 md:flex" aria-label="Desk">
            {desks.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setNav(item)}
                className={cn(
                  'h-9 rounded-full px-3 font-mono text-[11px] tracking-[0.16em] uppercase focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                  nav === item ? 'bg-ember text-[#1a0904]' : 'text-ivory/55 hover:text-ivory',
                )}
              >
                {item}
              </button>
            ))}
          </nav>
          <button
            type="button"
            onClick={() => setPalette(true)}
            className="ml-auto flex h-10 min-w-0 flex-1 items-center justify-between rounded-full border border-ivory/10 bg-void/60 px-4 text-sm text-fog md:max-w-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
          >
            <span>Search the desk</span>
            <kbd className="hidden font-mono text-[10px] tracking-[0.14em] text-ivory/40 sm:inline">⌘K</kbd>
          </button>
          <a href="#flagship" className="shrink-0 text-sm text-ivory/70 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion">
            Site
          </a>
        </div>
        <div className="flex h-2 justify-between px-3" aria-hidden="true">
          {Array.from({ length: 48 }, (_, i) => (
            <span key={i} className={cn('w-px bg-brass/35', i % 6 === 0 ? 'h-2' : 'mt-1 h-1')} />
          ))}
        </div>
      </header>

      <main className="relative px-4 py-6 md:px-6">
        <div className="grid items-start gap-5 xl:grid-cols-12">
          <IrisRadar
            rows={loading ? [] : rows}
            focusId={focusId}
            onFocus={setFocusId}
            reduced={reduced}
            className="xl:col-span-7"
          />
          <div className="grid gap-5 xl:col-span-5">
            <div className="grid grid-cols-3 gap-3">
              <BrassCounter label="Open" value={openCount} />
              <BrassCounter label="Held" value={heldCount} />
              <BrassCounter label="Pulses" value={live} live />
            </div>
            <Dossier row={focused} points={points} reduced={reduced} />
          </div>
        </div>

        <PaperLedger
          query={query}
          setQuery={setQuery}
          status={status}
          setStatus={setStatus}
          rows={rows}
          loading={loading}
          selected={selected}
          setSelected={setSelected}
          focusId={focusId}
          setFocusId={setFocusId}
          sortKey={sortKey}
          sortDir={sortDir}
          toggleSort={toggleSort}
        />
      </main>

      <AnimatePresence>
        {palette ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-void/70 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closePalette}
          >
            <motion.div
              ref={paletteRef}
              role="dialog"
              aria-modal="true"
              aria-label="Command palette"
              transition={springs.ui}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 12, opacity: 0 }}
              className="w-full max-w-lg overflow-hidden rounded-[1.4rem] border border-ivory/10 bg-carbon shadow-[0_40px_80px_-40px_rgba(0,0,0,0.9)]"
              onClick={(event) => event.stopPropagation()}
            >
              <input
                autoFocus
                value={paletteQuery}
                onChange={(event) => {
                  setPaletteQuery(event.target.value)
                  setPaletteIndex(0)
                }}
                onKeyDown={(event) => {
                  if (event.key === 'ArrowDown') {
                    event.preventDefault()
                    setPaletteIndex((value) => Math.min(commands.length - 1, value + 1))
                  }
                  if (event.key === 'ArrowUp') {
                    event.preventDefault()
                    setPaletteIndex((value) => Math.max(0, value - 1))
                  }
                  if (event.key === 'Enter') {
                    const item = commands[paletteIndex]
                    if (item) runCommand(item.run)
                  }
                }}
                placeholder="Type a command"
                className="h-14 w-full border-b border-ivory/8 bg-transparent px-4 text-base outline-none"
              />
              <ul className="max-h-72 overflow-auto p-2">
                {commands.length === 0 ? (
                  <li className="px-3 py-6 text-sm text-fog">No command matches.</li>
                ) : (
                  commands.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onMouseEnter={() => setPaletteIndex(index)}
                        onClick={() => runCommand(item.run)}
                        className={cn(
                          'flex h-11 w-full items-center rounded-xl px-3 text-left text-sm',
                          index === paletteIndex ? 'bg-ivory/8 text-ivory' : 'text-ivory/70',
                        )}
                      >
                        {item.label}
                      </button>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  )
}

function BrassCounter({ label, value, live }: { label: string; value: number; live?: boolean }) {
  const node = useCount(value)
  return (
    <article className="relative overflow-hidden rounded-[1.1rem] border border-brass/30 bg-[#16120d] px-3 py-4 shadow-[inset_0_1px_0_rgba(243,234,216,0.12),0_16px_28px_-22px_rgba(0,0,0,0.8)]">
      <p className="font-mono text-[10px] tracking-[0.16em] text-brass uppercase">{label}</p>
      <p className="mt-2 font-serif text-[clamp(1.8rem,4vw,2.6rem)] leading-none text-ivory">
        <span ref={node}>{value}</span>
        {live ? <span className="ml-2 inline-block size-2 rounded-full bg-ion align-middle" /> : null}
      </p>
    </article>
  )
}

function IrisRadar({
  rows,
  focusId,
  onFocus,
  reduced,
  className,
}: {
  rows: SignalRow[]
  focusId: string
  onFocus: (id: string) => void
  reduced: boolean
  className?: string
}) {
  const [hover, setHover] = useState<string | null>(null)
  const plotted = rows.map((row, i) => {
    const angle = (i / Math.max(rows.length, 1)) * Math.PI * 2 - Math.PI / 2
    const radius = 16 + (1 - row.strength / 100) * 28
    return { ...row, x: 50 + Math.cos(angle) * radius, y: 50 + Math.sin(angle) * radius }
  })
  const locked = plotted.find((row) => row.id === focusId)

  return (
    <section className={cn('relative overflow-hidden rounded-[2rem] border border-brass/25 bg-[#120f0c] p-5 shadow-[0_30px_60px_-40px_rgba(0,0,0,0.9)]', className)}>
      <div className="flex items-end justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-brass uppercase">Iris lock</p>
          <h1 className="mt-1 font-serif text-[clamp(2rem,4vw,3.4rem)] leading-none tracking-[-0.03em]">Night watch</h1>
        </div>
        <p className="font-mono text-[10px] tracking-[0.16em] text-fog uppercase">{rows.length} in beam</p>
      </div>
      <div className="relative mx-auto mt-4 aspect-square max-w-[34rem]">
        <svg viewBox="0 0 100 100" className="h-full w-full">
          <defs>
            <radialGradient id="irisWell" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#1c1812" />
              <stop offset="70%" stopColor="#0b0908" />
              <stop offset="100%" stopColor="#07060b" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="48" fill="url(#irisWell)" stroke="#d9a85a" strokeOpacity="0.35" strokeWidth="0.6" />
          {[16, 28, 40].map((r) => (
            <circle key={r} cx="50" cy="50" r={r} fill="none" stroke="#f3ead8" strokeOpacity="0.08" strokeWidth="0.3" />
          ))}
          {Array.from({ length: 12 }, (_, i) => {
            const a = (i / 12) * Math.PI * 2
            return (
              <line
                key={i}
                x1={50 + Math.cos(a) * 43}
                y1={50 + Math.sin(a) * 43}
                x2={50 + Math.cos(a) * 47}
                y2={50 + Math.sin(a) * 47}
                stroke="#d9a85a"
                strokeWidth="0.4"
              />
            )
          })}
          {!reduced ? (
            <motion.g
              animate={{ rotate: 360 }}
              transition={{ duration: 7.5, repeat: Infinity, ease: 'linear' }}
              style={{ transformOrigin: '50px 50px' }}
            >
              <line x1="50" y1="50" x2="50" y2="8" stroke="#3ee0c6" strokeOpacity="0.55" strokeWidth="0.4" />
              <path d="M50 50 L54 12 A 38 38 0 0 0 46 12 Z" fill="#3ee0c6" opacity="0.08" />
            </motion.g>
          ) : (
            <line x1="50" y1="50" x2="50" y2="8" stroke="#3ee0c6" strokeOpacity="0.35" strokeWidth="0.4" />
          )}
          {locked ? (
            <motion.circle
              cx={locked.x}
              cy={locked.y}
              r="5.2"
              fill="none"
              stroke="#ff4d1c"
              strokeWidth="0.5"
              initial={false}
              animate={{ cx: locked.x, cy: locked.y }}
              transition={springs.heavy}
            />
          ) : null}
          {plotted.map((row) => (
            <g key={row.id}>
              <circle
                cx={row.x}
                cy={row.y}
                r={row.id === focusId ? 2.1 : 1.35}
                fill={row.status === 'open' ? '#ff4d1c' : row.status === 'held' ? '#d9a85a' : '#c6bba8'}
                className="cursor-pointer"
                onClick={() => onFocus(row.id)}
                onPointerEnter={() => setHover(row.id)}
                onPointerLeave={() => setHover(null)}
              />
            </g>
          ))}
        </svg>
        <p className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 font-mono text-[10px] tracking-[0.18em] text-ivory/45 uppercase">
          {hover ?? focusedTitle(plotted, focusId)}
        </p>
      </div>
    </section>
  )
}

function focusedTitle(rows: SignalRow[], id: string) {
  return rows.find((row) => row.id === id)?.title ?? 'Empty plate'
}

function Dossier({ row, points, reduced }: { row?: SignalRow; points: number[]; reduced: boolean }) {
  const maxPoint = Math.max(...points, 1)
  const path = points
    .map((y, i) => {
      const x = (i / (points.length - 1)) * 100
      const ny = 28 - (y / maxPoint) * 22
      return `${i === 0 ? 'M' : 'L'} ${x} ${ny}`
    })
    .join(' ')

  if (!row) {
    return (
      <article className="rounded-[1.4rem] bg-[#efe6d4] px-6 py-10 text-[#2a2218]">
        <p className="font-serif text-3xl">No signal in the beam.</p>
      </article>
    )
  }

  return (
    <article className="relative overflow-hidden bg-[#efe6d4] px-6 pt-8 pb-5 text-[#2a2218] shadow-[0_24px_40px_-28px_rgba(0,0,0,0.75)]">
      <span className="absolute top-0 left-1/2 h-5 w-16 -translate-x-1/2 -translate-y-1/2 rotate-[-3deg] bg-[#d8c38a]/85" />
      <span className="absolute top-0 bottom-0 left-7 w-px bg-[#d36b5c]/50" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-[#8a5a32] uppercase">Dossier · {row.id}</p>
          <h2 className="mt-2 max-w-xs font-serif text-3xl leading-[0.95]">{row.title}</h2>
        </div>
        <img src={faces[row.owner]} alt="" className="size-14 rounded-full object-cover ring-1 ring-[#2a2218]/20" />
      </div>
      <p className="mt-3 text-sm text-[#5a4630]">
        {row.owner} · {row.studio} · {row.updated}
      </p>
      <svg viewBox="0 0 100 32" className="mt-5 h-20 w-full overflow-visible text-[#b33a12]" aria-hidden="true">
        <motion.path
          d={path}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduced ? 0 : 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
      </svg>
      <div className="mt-2 flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase">
        <span>{row.status}</span>
        <span>{row.strength} strength</span>
      </div>
    </article>
  )
}

function PaperLedger({
  query,
  setQuery,
  status,
  setStatus,
  rows,
  loading,
  selected,
  setSelected,
  focusId,
  setFocusId,
  sortKey,
  sortDir,
  toggleSort,
}: {
  query: string
  setQuery: (value: string) => void
  status: Status | 'all'
  setStatus: (value: Status | 'all') => void
  rows: SignalRow[]
  loading: boolean
  selected: string[]
  setSelected: (value: string[] | ((current: string[]) => string[])) => void
  focusId: string
  setFocusId: (value: string) => void
  sortKey: keyof SignalRow
  sortDir: 'asc' | 'desc'
  toggleSort: (key: keyof SignalRow) => void
}) {
  return (
    <section className="relative mt-5 overflow-hidden rounded-[1.2rem] bg-[#efe6d4] text-[#2a2218] shadow-[0_28px_50px_-32px_rgba(0,0,0,0.8)]">
      <span className="absolute top-0 bottom-0 left-8 w-px bg-[#d36b5c]/45" />
      <div className="flex flex-wrap items-center gap-3 border-b border-[#2a2218]/10 px-4 py-3 md:px-10">
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Filter title, owner, id"
          className="h-10 flex-1 rounded-none border-b border-[#2a2218]/20 bg-transparent px-1 text-sm outline-none focus:border-[#2a2218]"
        />
        <div className="flex gap-1" role="radiogroup" aria-label="Status">
          {(['all', 'open', 'held', 'archived'] as const).map((item) => (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={status === item}
              onClick={() => setStatus(item)}
              className={cn(
                'h-9 rounded-full px-3 text-xs capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#2a2218]',
                status === item ? 'bg-[#1a0904] text-[#f3ead8]' : 'text-[#5a4630]',
              )}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="space-y-2 p-6 md:px-10" aria-busy="true" aria-label="Loading signals">
          {Array.from({ length: 5 }, (_, i) => (
            <div key={i} className="h-12 animate-pulse rounded-sm bg-[#2a2218]/8" />
          ))}
        </div>
      ) : rows.length === 0 ? (
        <div className="px-6 py-16 text-center md:px-10">
          <p className="font-serif text-3xl">The plate is empty.</p>
          <p className="mt-2 text-sm text-[#5a4630]">Clear the filter or write a new signal.</p>
          <button
            type="button"
            onClick={() => {
              setQuery('')
              setStatus('all')
            }}
            className="mt-6 h-10 rounded-full border border-[#2a2218]/20 px-4 text-sm"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="font-mono text-[10px] tracking-[0.14em] text-[#8a5a32] uppercase">
              <tr>
                <th className="px-4 py-3 md:pl-10">
                  <span className="sr-only">Select</span>
                </th>
                {(['id', 'title', 'owner', 'status', 'strength'] as const).map((key) => (
                  <th key={key} className="px-4 py-3 font-medium">
                    <button type="button" onClick={() => toggleSort(key)} className="uppercase">
                      {key}
                      {sortKey === key ? (sortDir === 'asc' ? ' ↑' : ' ↓') : ''}
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => {
                const on = selected.includes(row.id)
                return (
                  <tr
                    key={row.id}
                    className={cn(
                      'cursor-pointer border-t border-[#2a2218]/8 hover:bg-[#2a2218]/4',
                      focusId === row.id && 'bg-[#d8c38a]/25',
                    )}
                    onClick={() => setFocusId(row.id)}
                  >
                    <td className="px-4 py-3 md:pl-10" onClick={(event) => event.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={on}
                        onChange={() =>
                          setSelected((current) => (on ? current.filter((id) => id !== row.id) : [...current, row.id]))
                        }
                        aria-label={`Select ${row.id}`}
                      />
                    </td>
                    <td className="px-4 py-3 font-mono text-[#8a5a32]">{row.id}</td>
                    <td className="px-4 py-3">{row.title}</td>
                    <td className="px-4 py-3 text-[#5a4630]">{row.owner}</td>
                    <td className="px-4 py-3">
                      <span
                        className={cn(
                          'rounded-full px-2 py-0.5 font-mono text-[10px] tracking-[0.14em] uppercase',
                          row.status === 'open' && 'bg-[#ff4d1c]/15 text-[#b33a12]',
                          row.status === 'held' && 'bg-[#d9a85a]/25 text-[#8a5a32]',
                          row.status === 'archived' && 'bg-[#2a2218]/8 text-[#5a4630]',
                        )}
                      >
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">{row.strength}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}
      <p className="border-t border-[#2a2218]/10 px-4 py-3 font-mono text-[10px] tracking-[0.16em] text-[#8a5a32] uppercase md:px-10">
        {selected.length} selected · {rows.length} visible · lock {focusId}
      </p>
    </section>
  )
}
