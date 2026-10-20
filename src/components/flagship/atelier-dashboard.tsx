'use client'

import { Grain, HelioMark, cn, springs } from '@/components/flagship/primitives.tsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'

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

const paletteCommands = [
  { id: 'jump-iris', label: 'Jump to iris', run: 'hero' },
  { id: 'new-signal', label: 'New signal', run: 'create' },
  { id: 'filter-open', label: 'Show open only', run: 'filter:open' },
  { id: 'filter-held', label: 'Show held only', run: 'filter:held' },
  { id: 'clear', label: 'Clear filters', run: 'clear' },
  { id: 'loading', label: 'Replay loading', run: 'load' },
]

export type AtelierDashboardProps = {
  className?: string
}

export function AtelierDashboard({ className }: AtelierDashboardProps) {
  const [collapsed, setCollapsed] = useState(false)
  const [nav, setNav] = useState('Signals')
  const [query, setQuery] = useState('')
  const [status, setStatus] = useState<Status | 'all'>('all')
  const [sortKey, setSortKey] = useState<keyof SignalRow>('strength')
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc')
  const [loading, setLoading] = useState(true)
  const [palette, setPalette] = useState(false)
  const [paletteQuery, setPaletteQuery] = useState('')
  const [paletteIndex, setPaletteIndex] = useState(0)
  const [selected, setSelected] = useState<string[]>([])
  const [live, setLive] = useState(128)
  const [points, setPoints] = useState(() => Array.from({ length: 24 }, (_, i) => 30 + ((i * 17) % 50)))

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
      if (event.key === 'Escape') setPalette(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

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

  const maxPoint = Math.max(...points, 1)
  const path = points
    .map((y, i) => {
      const x = (i / (points.length - 1)) * 100
      const ny = 36 - (y / maxPoint) * 28
      return `${i === 0 ? 'M' : 'L'} ${x} ${ny}`
    })
    .join(' ')

  return (
    <div className={cn('flex min-h-svh bg-void text-ivory', className)}>
      <aside
        className={cn(
          'sticky top-0 flex h-svh flex-col border-r border-ivory/8 bg-carbon transition-[width] duration-300',
          collapsed ? 'w-[4.5rem]' : 'w-60',
        )}
      >
        <div className="flex h-16 items-center gap-2 px-4">
          <HelioMark className="size-7" />
          {collapsed ? null : <span className="font-serif text-xl">Helio</span>}
        </div>
        <nav className="flex-1 space-y-1 px-2" aria-label="Desk">
          {['Signals', 'Desk', 'Archive', 'Studio'].map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setNav(item)}
              className={cn(
                'flex h-10 w-full items-center gap-3 rounded-xl px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                nav === item ? 'bg-ivory/8 text-ivory' : 'text-ivory/55 hover:text-ivory',
              )}
            >
              <span className="size-1.5 rounded-full bg-brass" />
              {collapsed ? <span className="sr-only">{item}</span> : item}
            </button>
          ))}
        </nav>
        <button
          type="button"
          onClick={() => setCollapsed((value) => !value)}
          className="m-3 h-10 rounded-xl border border-ivory/10 text-xs text-fog focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
        >
          {collapsed ? '›' : 'Collapse'}
        </button>
      </aside>

      <div className="min-w-0 flex-1">
        <header className="flex h-16 items-center justify-between gap-3 border-b border-ivory/8 px-4 md:px-6">
          <button
            type="button"
            onClick={() => setPalette(true)}
            className="flex h-10 min-w-0 flex-1 items-center justify-between rounded-full border border-ivory/10 bg-carbon px-4 text-sm text-fog md:max-w-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
          >
            <span>Search the desk</span>
            <kbd className="font-mono text-[10px] tracking-[0.14em] text-ivory/40">⌘K</kbd>
          </button>
          <a href="#flagship" className="text-sm text-ivory/60 hover:text-ivory">
            Back to site
          </a>
        </header>

        <main className="relative px-4 py-6 md:px-6">
          <Grain className="opacity-[0.06]" />
          <div className="relative">
            <p className="font-mono text-[11px] tracking-[0.2em] text-brass uppercase">{nav} · live</p>
            <h1 className="mt-2 font-serif text-4xl tracking-tight">Night desk</h1>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Kpi label="Open signals" value={seed.filter((row) => row.status === 'open').length} />
              <Kpi label="Held" value={seed.filter((row) => row.status === 'held').length} />
              <Kpi label="Pulses tonight" value={live} live />
            </div>

            <section className="mt-4 overflow-hidden rounded-[1.6rem] border border-ivory/10 bg-carbon p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-sm text-ivory">Strength</h2>
                <p className="font-mono text-[10px] tracking-[0.16em] text-fog uppercase">Hover the line</p>
              </div>
              <Chart path={path} points={points} />
            </section>

            <section className="mt-4 overflow-hidden rounded-[1.6rem] border border-ivory/10 bg-carbon">
              <div className="flex flex-wrap items-center gap-3 border-b border-ivory/8 px-4 py-3">
                <input
                  value={query}
                  onChange={(event) => setQuery(event.target.value)}
                  placeholder="Filter title, owner, id"
                  className="h-10 flex-1 rounded-full border border-ivory/10 bg-void px-4 text-sm outline-none focus:ring-2 focus:ring-ion"
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
                        'h-9 rounded-full px-3 text-xs capitalize focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion',
                        status === item ? 'bg-ember text-[#1a0904]' : 'text-ivory/60',
                      )}
                    >
                      {item}
                    </button>
                  ))}
                </div>
              </div>

              {loading ? (
                <div className="space-y-2 p-4" aria-busy="true" aria-label="Loading signals">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div key={i} className="h-12 animate-pulse rounded-xl bg-ivory/5" />
                  ))}
                </div>
              ) : rows.length === 0 ? (
                <div className="px-6 py-16 text-center">
                  <p className="font-serif text-3xl text-ivory">The plate is empty.</p>
                  <p className="mt-2 text-sm text-fog">Clear the filter or write a new signal.</p>
                  <button
                    type="button"
                    onClick={() => {
                      setQuery('')
                      setStatus('all')
                    }}
                    className="mt-6 h-10 rounded-full border border-ivory/15 px-4 text-sm"
                  >
                    Clear filters
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[40rem] text-left text-sm">
                    <thead className="font-mono text-[10px] tracking-[0.14em] text-fog uppercase">
                      <tr>
                        <th className="px-4 py-3">
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
                          <tr key={row.id} className="border-t border-ivory/8 hover:bg-ivory/4">
                            <td className="px-4 py-3">
                              <input
                                type="checkbox"
                                checked={on}
                                onChange={() =>
                                  setSelected((current) =>
                                    on ? current.filter((id) => id !== row.id) : [...current, row.id],
                                  )
                                }
                                aria-label={`Select ${row.id}`}
                              />
                            </td>
                            <td className="px-4 py-3 font-mono text-brass">{row.id}</td>
                            <td className="px-4 py-3 text-ivory">{row.title}</td>
                            <td className="px-4 py-3 text-fog">{row.owner}</td>
                            <td className="px-4 py-3 capitalize text-ivory/80">{row.status}</td>
                            <td className="px-4 py-3 text-ion">{row.strength}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                </div>
              )}
              <p className="border-t border-ivory/8 px-4 py-3 font-mono text-[10px] tracking-[0.16em] text-fog uppercase">
                {selected.length} selected · {rows.length} visible
              </p>
            </section>
          </div>
        </main>
      </div>

      <AnimatePresence>
        {palette ? (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center bg-void/70 px-4 pt-[12vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPalette(false)}
          >
            <motion.div
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

function Kpi({ label, value, live }: { label: string; value: number; live?: boolean }) {
  return (
    <article className="rounded-[1.4rem] border border-ivory/10 bg-carbon p-5">
      <p className="font-mono text-[10px] tracking-[0.16em] text-fog uppercase">{label}</p>
      <p className="mt-3 font-serif text-4xl text-ivory">
        {value}
        {live ? <span className="ml-2 inline-block size-2 rounded-full bg-ion align-middle" /> : null}
      </p>
    </article>
  )
}

function Chart({ path, points }: { path: string; points: number[] }) {
  const [hover, setHover] = useState<number | null>(null)
  return (
    <div className="relative mt-4">
      <svg
        viewBox="0 0 100 40"
        className="h-40 w-full overflow-visible text-ion"
        onMouseLeave={() => setHover(null)}
        onMouseMove={(event) => {
          const box = event.currentTarget.getBoundingClientRect()
          const x = (event.clientX - box.left) / box.width
          setHover(Math.min(points.length - 1, Math.max(0, Math.round(x * (points.length - 1)))))
        }}
      >
        <path d={path} fill="none" stroke="currentColor" strokeWidth="1.2" vectorEffect="non-scaling-stroke" />
        {hover !== null ? (
          <circle
            cx={(hover / (points.length - 1)) * 100}
            cy={36 - (points[hover]! / Math.max(...points, 1)) * 28}
            r="1.4"
            fill="#ff4d1c"
          />
        ) : null}
      </svg>
      {hover !== null ? (
        <p className="absolute top-2 right-2 font-mono text-[11px] text-ivory">{points[hover]} strength</p>
      ) : null}
    </div>
  )
}
