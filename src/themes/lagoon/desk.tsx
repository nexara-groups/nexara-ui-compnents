'use client'

import { CommandPalette, ContextMenu, MenuTrigger, Skeleton, SkeletonGroup, SplitButton, Spinner, useCommandShortcut, type CommandGroup, type MenuItem } from '@/themes/kit/controls.tsx'
import { useLevel } from '@/themes/kit/level.ts'
import { Drawer, ToastStack } from '@/themes/kit/overlays.tsx'
import { Icon, Logo, Sparkline, type IconName } from '@/themes/lagoon/art.tsx'
import { asset, doctors, hourly, queue as seedQueue, type QueueRow } from '@/themes/lagoon/data.ts'
import { screenHref } from '@/themes/lagoon/nav.ts'
import { Chip } from '@/themes/lagoon/parts.tsx'
import { useTheme } from '@/themes/provider.tsx'
import { useCallback, useEffect, useMemo, useState } from 'react'

const navItems: { id: string; label: string; icon: IconName; count?: number }[] = [
  { id: 'today', label: 'Today', icon: 'home' },
  { id: 'queue', label: 'Queue', icon: 'queue', count: 7 },
  { id: 'calendar', label: 'Calendar', icon: 'calendar' },
  { id: 'patients', label: 'Patients', icon: 'users' },
  { id: 'billing', label: 'Billing', icon: 'wallet' },
  { id: 'reports', label: 'Reports', icon: 'chart' },
]

const statusTone: Record<QueueRow['status'], string> = {
  Waiting: 'var(--nx-accent)',
  'In room': 'var(--nx-mark)',
  Done: 'var(--nx-muted)',
  Late: 'var(--nx-warn)',
  Lab: 'var(--nx-success)',
}

function StatusPill({ status }: { status: QueueRow['status'] }) {
  return (
    <span className="nx-mono inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[12px] whitespace-nowrap" style={{ background: `color-mix(in srgb, ${statusTone[status]} 16%, transparent)`, color: 'var(--nx-fg)' }}>
      <span aria-hidden className="h-1.5 w-1.5 rounded-full" style={{ background: statusTone[status] }} />
      {status}
    </span>
  )
}

function Sidebar({ active, onPick }: { active: string; onPick: (id: string) => void }) {
  const level = useLevel()
  const { scheme } = useTheme()
  return (
    <nav aria-label="Desk" className="hidden w-[232px] shrink-0 flex-col gap-1 p-4 lg:flex" style={{ borderRight: '1px solid var(--nx-line)', background: 'var(--nx-surface)' }}>
      <a href={screenHref('landing', scheme)} className="mb-6 px-2 no-underline" style={{ color: 'var(--nx-fg)' }}>
        <Logo />
        <span className="nx-mono mt-1 block pl-10 text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>Desk</span>
      </a>
      {navItems.map((item) => {
        const on = item.id === active
        return (
          <button
            key={item.id}
            type="button"
            aria-current={on ? 'page' : undefined}
            onClick={() => onPick(item.id)}
            className="flex min-h-11 items-center gap-3 px-3 text-left text-[15px]"
            style={{ background: on ? 'color-mix(in srgb, var(--nx-accent) 16%, transparent)' : 'transparent', borderRadius: on ? 12 : 22, transition: level === 'off' ? 'none' : 'border-radius 300ms var(--nx-ease)' }}
          >
            <Icon name={item.icon} />
            <span className="flex-1">{item.label}</span>
            {item.count ? <span className="nx-mono rounded-full px-2 text-[12px]" style={{ background: 'var(--nx-mark)', color: 'var(--nx-mark-fg)' }}>{item.count}</span> : null}
          </button>
        )
      })}
      <div className="mt-auto p-3" style={{ background: 'var(--nx-bg)', border: '1px solid var(--nx-line)', borderRadius: 16 }}>
        <p className="text-sm font-medium">Front desk, evening</p>
        <p className="mt-1 text-[13px]" style={{ color: 'var(--nx-muted)' }}>Shabana K. · till 9 pm</p>
      </div>
    </nav>
  )
}

function Kpi({ label, value, delta, series, note }: { label: string; value: string; delta: string; series: number[]; note: string }) {
  return (
    <div className="flex flex-col p-4 md:p-5" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
      <p className="text-[13px]" style={{ color: 'var(--nx-muted)' }}>{label}</p>
      <p className="mt-2 flex items-baseline gap-2">
        <span className="nx-mono text-[30px] leading-none tracking-tight">{value}</span>
        <span className="nx-mono text-[12px]" style={{ color: 'var(--nx-muted)' }}>{delta}</span>
      </p>
      <div className="mt-3">
        <Sparkline values={series} label={note} />
      </div>
    </div>
  )
}

function VisitsChart({ range, loading }: { range: 'today' | 'week'; loading: boolean }) {
  const level = useLevel()
  const values = hourly[range]
  const max = Math.max(...values)
  const peak = values.indexOf(max)
  if (loading) {
    return (
      <SkeletonGroup label="Loading visits by hour" className="flex h-56 items-end gap-2">
        {values.map((_, index) => (
          <div key={index} className="flex-1" style={{ height: `${35 + ((index * 37) % 55)}%` }}>
            <Skeleton className="h-full w-full" radius={10} />
          </div>
        ))}
      </SkeletonGroup>
    )
  }
  return (
    <figure>
      <div className="flex h-56 items-end gap-1.5 md:gap-2" role="img" aria-label={`Visits by hour, ${range === 'today' ? 'today' : 'average over the last 7 days'}. Busiest at ${hourly.labels[peak]} with ${max}.`}>
        {values.map((value, index) => (
          <div key={hourly.labels[index]} className="flex h-full flex-1 flex-col justify-end">
            <span
              className="block w-full"
              style={{
                height: `${(value / max) * 100}%`,
                background: index === peak ? 'var(--nx-mark)' : 'var(--nx-accent)',
                opacity: index === peak ? 1 : 0.8,
                borderRadius: range === 'today' ? '999px 999px 8px 8px' : '10px 10px 6px 6px',
                transition: level === 'off' ? 'none' : `height ${level === 'rich' ? 520 : 280}ms var(--nx-ease) ${level === 'rich' ? index * 18 : 0}ms, border-radius 420ms var(--nx-ease)`,
              }}
            />
          </div>
        ))}
      </div>
      <figcaption className="nx-mono mt-2 flex justify-between text-[11px]" style={{ color: 'var(--nx-muted)' }}>
        {hourly.labels.filter((_, index) => index % 2 === 0).map((label) => (
          <span key={label}>{label}</span>
        ))}
      </figcaption>
    </figure>
  )
}

function Timeline() {
  const rows = [
    { doctor: doctors[0], blocks: [[0, 3], [3.5, 6], [8, 12.5]] },
    { doctor: doctors[1], blocks: [[1, 4], [8.5, 13]] },
    { doctor: doctors[2], blocks: [[0, 2.5], [3, 5.5], [9, 11]] },
    { doctor: doctors[3], blocks: [[2, 5], [7.5, 10.5]] },
  ]
  const now = 8.6
  return (
    <div className="relative">
      <div className="nx-mono mb-2 ml-[120px] flex justify-between text-[11px]" style={{ color: 'var(--nx-muted)' }}>
        {['8a', '11a', '2p', '5p', '8p'].map((label) => (
          <span key={label}>{label}</span>
        ))}
      </div>
      <ul className="space-y-2.5">
        {rows.map(({ doctor, blocks }) => (
          <li key={doctor.id} className="flex items-center gap-3">
            <span className="flex w-[108px] shrink-0 items-center gap-2 text-[13px]">
              <img src={asset(doctor.photo)} alt="" className="h-7 w-7 rounded-full object-cover" />
              {doctor.name.split(' ')[1]}
            </span>
            <span className="relative h-7 flex-1 rounded-full" style={{ background: 'color-mix(in srgb, var(--nx-fg) 6%, transparent)' }}>
              {blocks.map(([start, end]) => (
                <span key={start} className="absolute top-1 bottom-1" style={{ left: `${(start / 13) * 100}%`, width: `${((end - start) / 13) * 100}%`, background: 'var(--nx-accent)', opacity: 0.75, borderRadius: 999 }} />
              ))}
              <span className="sr-only">
                {doctor.name}: {blocks.length} booked blocks today
              </span>
            </span>
          </li>
        ))}
      </ul>
      <span aria-hidden className="pointer-events-none absolute top-5 bottom-0 w-px" style={{ left: `calc(120px + (100% - 120px) * ${now / 13})`, background: 'var(--nx-mark)' }}>
        <span className="absolute -top-1 -left-[3px] h-[7px] w-[7px] rounded-full" style={{ background: 'var(--nx-mark)' }} />
      </span>
    </div>
  )
}

export function LagoonDesk() {
  const { scheme } = useTheme()
  const level = useLevel()
  const [active, setActive] = useState('today')
  const [range, setRange] = useState<'today' | 'week'>('today')
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState(seedQueue)
  const [toast, setToast] = useState<string | null>(null)
  const [palette, setPalette] = useState(false)
  const [menu, setMenu] = useState(false)
  const [filter, setFilter] = useState<'all' | 'waiting'>('all')
  const [today] = useState(() => new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' }))
  const openPalette = useCallback(() => setPalette(true), [])
  const closePalette = useCallback(() => setPalette(false), [])
  const closeMenu = useCallback(() => setMenu(false), [])
  const dismiss = useCallback(() => setToast(null), [])
  useCommandShortcut(openPalette, true)

  useEffect(() => {
    if (!loading) return
    const id = window.setTimeout(() => setLoading(false), level === 'off' ? 200 : 650)
    return () => window.clearTimeout(id)
  }, [loading, level])

  const switchRange = (next: 'today' | 'week') => {
    if (next === range) return
    setRange(next)
    setLoading(true)
  }

  const update = (token: string, status: QueueRow['status'], message: string) => {
    setRows((list) => list.map((row) => (row.token === token ? { ...row, status } : row)))
    setToast(message)
  }

  const rowMenu = (row: QueueRow): MenuItem[] => [
    { label: 'Check in', hint: 'C', disabled: row.status !== 'Late' && row.status !== 'Waiting', onSelect: () => update(row.token, 'Waiting', `${row.name} checked in. Token ${row.token}.`) },
    { label: 'Send to room', hint: 'R', disabled: row.status === 'In room' || row.status === 'Done', onSelect: () => update(row.token, 'In room', `${row.name} sent to ${row.doctor}.`) },
    { label: 'Send to lab', hint: 'L', onSelect: () => update(row.token, 'Lab', `${row.name} sent to the lab counter.`) },
    { label: 'Text a reminder', hint: 'T', onSelect: () => setToast(`Reminder sent to ${row.name.split(' ')[0]}.`) },
    { label: 'Mark no-show', danger: true, disabled: row.status === 'Done', onSelect: () => update(row.token, 'Done', `${row.name} marked as no-show.`) },
  ]

  const groups: CommandGroup[] = useMemo(
    () => [
      {
        label: 'Patients in the queue',
        items: rows.map((row) => ({ id: `p-${row.token}`, label: row.name, hint: `${row.token} · ${row.doctor.split(' ').slice(1).join(' ')}`, keywords: row.reason, onSelect: () => setToast(`${row.name}: ${row.reason}, ${row.status.toLowerCase()}.`) })),
      },
      {
        label: 'Actions',
        items: [
          { id: 'walkin', label: 'Add a walk-in', hint: 'N', onSelect: () => setToast('Walk-in form opened.') },
          { id: 'sms', label: 'Text everyone running late', hint: '3 patients', onSelect: () => setToast('Delay text sent to 3 patients.') },
          { id: 'close', label: 'Close the day', hint: 'after 9 pm', onSelect: () => setToast('Day closes at 9 pm. 12 visits still open.') },
        ],
      },
      {
        label: 'Go to',
        items: navItems.map((item) => ({ id: `go-${item.id}`, label: item.label, onSelect: () => setActive(item.id) })),
      },
    ],
    [rows],
  )

  const visible = filter === 'waiting' ? rows.filter((row) => row.status === 'Waiting' || row.status === 'Late') : rows

  return (
    <div className="flex min-h-svh" style={{ background: 'var(--nx-bg)' }}>
      <Sidebar active={active} onPick={setActive} />
      <div className="min-w-0 flex-1">
        <header className="sticky top-0 z-20 flex h-16 items-center gap-3 px-4 md:px-6" style={{ background: 'var(--nx-bg)', borderBottom: '1px solid var(--nx-line)' }}>
          <button type="button" aria-label="Open navigation" onClick={() => setMenu(true)} className="inline-flex min-h-11 min-w-11 items-center justify-center rounded-full lg:hidden" style={{ border: '1px solid var(--nx-line)' }}>
            <Icon name="menu" />
          </button>
          <button type="button" onClick={openPalette} className="flex min-h-11 min-w-0 flex-1 items-center gap-3 px-4 text-left text-sm md:max-w-md" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 999, color: 'var(--nx-muted)' }}>
            <Icon name="search" className="h-4 w-4 shrink-0" />
            <span className="truncate">Find a patient, token or action</span>
            <kbd className="nx-mono ml-auto hidden rounded-md px-1.5 text-[11px] md:inline" style={{ border: '1px solid var(--nx-line)' }}>Ctrl K</kbd>
          </button>
          <div className="ml-auto flex items-center gap-2">
            <button type="button" aria-label="Notifications, 2 new" className="relative inline-flex min-h-11 min-w-11 items-center justify-center rounded-full" style={{ border: '1px solid var(--nx-line)' }} onClick={() => setToast('2 reports ready: Farhan S., Deepa R.')}>
              <Icon name="bell" />
              <span aria-hidden className="absolute top-2 right-2.5 h-2 w-2 rounded-full" style={{ background: 'var(--nx-mark)' }} />
            </button>
            <div className="hidden sm:block">
              <SplitButton
                label="New visit"
                onClick={() => setToast('Booked visit form opened.')}
                menuLabel="Other visit types"
                items={[
                  { label: 'Walk-in', hint: 'N', onSelect: () => setToast('Walk-in added to the queue as A-23.') },
                  { label: 'Teleconsult', onSelect: () => setToast('Teleconsult link created.') },
                  { label: 'Home sample pickup', onSelect: () => setToast('Pickup slot form opened.') },
                ]}
              />
            </div>
          </div>
        </header>

        <main className="space-y-5 p-4 md:p-6">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="nx-mono text-[12px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>{today}</p>
              <h1 className="nx-display mt-1 text-[clamp(28px,3vw,40px)] leading-tight">Good evening, Shabana.</h1>
              <p className="mt-1 text-[15px]" style={{ color: 'var(--nx-muted)' }}>Seven people in the lobby. Dr. Arjun is running eight minutes behind.</p>
            </div>
            <div className="sm:hidden">
              <SplitButton label="New visit" onClick={() => setToast('Booked visit form opened.')} menuLabel="Other visit types" items={[{ label: 'Walk-in', onSelect: () => setToast('Walk-in added to the queue as A-23.') }, { label: 'Teleconsult', onSelect: () => setToast('Teleconsult link created.') }]} />
            </div>
          </div>

          <section aria-label="Today at a glance" className="grid grid-cols-2 gap-3 md:gap-4 xl:grid-cols-4">
            <Kpi label="Visits today" value="64" delta="+9 on last week" series={[41, 48, 52, 47, 55, 58, 64]} note="Visits per day over the last 7 days, rising to 64." />
            <Kpi label="In the lobby" value="7" delta="2 kids" series={[3, 5, 8, 6, 9, 7, 7]} note="People waiting through the day, now 7." />
            <Kpi label="Average wait" value="12m" delta="−3m" series={[18, 16, 15, 14, 15, 13, 12]} note="Average wait in minutes, falling to 12." />
            <Kpi label="No-shows" value="3%" delta="2 of 64" series={[6, 5, 5, 4, 4, 3, 3]} note="No-show rate, falling to 3 percent." />
          </section>

          <div className="grid gap-5 xl:grid-cols-12">
            <section aria-labelledby="queue-title" className="min-w-0 overflow-hidden xl:col-span-8" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
              <div className="flex flex-wrap items-center justify-between gap-3 px-4 pt-4 md:px-5">
                <div>
                  <h2 id="queue-title" className="nx-display text-[22px]">Queue</h2>
                  <p className="text-[13px]" style={{ color: 'var(--nx-muted)' }}>Right-click a row, or press Shift F10, for actions.</p>
                </div>
                <div className="flex gap-2" role="group" aria-label="Filter queue">
                  <Chip selected={filter === 'all'} onClick={() => setFilter('all')}>All {rows.length}</Chip>
                  <Chip selected={filter === 'waiting'} onClick={() => setFilter('waiting')}>Waiting</Chip>
                </div>
              </div>
              <div className="mt-3" role="table" aria-label="Patients in the queue">
                <div role="row" className="nx-mono hidden grid-cols-[72px_1.4fr_1fr_1fr_110px_64px_48px] gap-3 px-5 py-2 text-[11px] tracking-[0.1em] uppercase md:grid" style={{ color: 'var(--nx-muted)', borderBottom: '1px solid var(--nx-line)' }}>
                  <span role="columnheader">Token</span>
                  <span role="columnheader">Patient</span>
                  <span role="columnheader">Reason</span>
                  <span role="columnheader">Doctor</span>
                  <span role="columnheader">Status</span>
                  <span role="columnheader">Wait</span>
                  <span role="columnheader"><span className="sr-only">Actions</span></span>
                </div>
                {visible.map((row) => (
                  <ContextMenu key={row.token} items={rowMenu(row)} label={`Actions for ${row.name}`}>
                    <div role="row" className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3 md:grid-cols-[72px_1.4fr_1fr_1fr_110px_64px_48px] md:px-5" style={{ borderBottom: '1px solid color-mix(in srgb, var(--nx-line) 60%, transparent)', opacity: row.status === 'Done' ? 0.6 : 1 }}>
                      <span role="cell" className="nx-mono hidden text-[13px] md:block">{row.token}</span>
                      <span role="cell" className="min-w-0">
                        <span className="block truncate text-[15px] font-medium">{row.name}</span>
                        <span className="nx-mono block text-[12px]" style={{ color: 'var(--nx-muted)' }}>
                          <span className="md:hidden">{row.token} · </span>
                          {row.age} yrs · {row.booked}
                        </span>
                      </span>
                      <span role="cell" className="hidden truncate text-[14px] md:block">{row.reason}</span>
                      <span role="cell" className="hidden truncate text-[14px] md:block" style={{ color: 'var(--nx-muted)' }}>{row.doctor.replace('Dr. ', 'Dr ')}</span>
                      <span role="cell" className="row-span-2 flex items-center gap-1 justify-self-end md:row-span-1 md:justify-self-start">
                        <StatusPill status={row.status} />
                      </span>
                      <span role="cell" className="nx-mono hidden text-[13px] md:block">{row.status === 'Done' ? '—' : `${row.wait}m`}</span>
                      <span role="cell" className="hidden md:block">
                        <MenuTrigger items={rowMenu(row)} label={`More actions for ${row.name}`}>
                          <Icon name="more" />
                        </MenuTrigger>
                      </span>
                      <span className="text-[13px] md:hidden" style={{ color: 'var(--nx-muted)' }}>{row.reason}</span>
                    </div>
                  </ContextMenu>
                ))}
              </div>
            </section>

            <section aria-labelledby="hours-title" className="flex min-w-0 flex-col p-4 md:p-5 xl:col-span-4" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
              <div className="flex items-center justify-between gap-2">
                <h2 id="hours-title" className="nx-display text-[22px]">Visits by hour</h2>
                <div className="flex items-center gap-2" role="group" aria-label="Range">
                  {loading ? <Spinner label="Updating chart" size={16} /> : null}
                  <Chip selected={range === 'today'} onClick={() => switchRange('today')}>Today</Chip>
                  <Chip selected={range === 'week'} onClick={() => switchRange('week')}>7 days</Chip>
                </div>
              </div>
              <div className="mt-5">
                <VisitsChart range={range} loading={loading} />
              </div>
              <dl className="mt-auto grid grid-cols-3 gap-2 pt-5">
                {(range === 'today'
                  ? [['Busiest', '5 pm'], ['Quietest', '2 pm'], ['Lab draws', '18']]
                  : [['Busiest', '5 pm'], ['Quietest', '8 pm'], ['Avg wait', '14m']]
                ).map(([term, value]) => (
                  <div key={term} className="p-3" style={{ background: 'var(--nx-bg)', border: '1px solid var(--nx-line)', borderRadius: 14 }}>
                    <dt className="text-[12px]" style={{ color: 'var(--nx-muted)' }}>{term}</dt>
                    <dd className="nx-mono mt-1 text-[18px]">{value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-[13px] leading-snug" style={{ color: 'var(--nx-muted)' }}>
                {range === 'today' ? 'Evening peak at 5 pm. Two extra slots opened with Dr. Meera.' : 'Weekday average. Mondays run about 12% busier.'}
              </p>
            </section>
          </div>

          <div className="grid gap-5 xl:grid-cols-12">
            <section aria-labelledby="rooms-title" className="min-w-0 p-4 md:p-5 xl:col-span-8" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
              <div className="flex items-center justify-between">
                <h2 id="rooms-title" className="nx-display text-[22px]">Rooms today</h2>
                <span className="nx-mono text-[12px]" style={{ color: 'var(--nx-muted)' }}>Now 4:36 pm</span>
              </div>
              <div className="mt-4 overflow-x-auto">
                <div className="min-w-[520px]">
                  <Timeline />
                </div>
              </div>
            </section>
            <section aria-labelledby="attention-title" className="min-w-0 p-4 md:p-5 xl:col-span-4" style={{ background: 'var(--nx-surface)', border: '1px solid var(--nx-line)', borderRadius: 'var(--nx-radius)' }}>
              <h2 id="attention-title" className="nx-display text-[22px]">Needs you</h2>
              <ul className="mt-3 space-y-2">
                {[
                  { icon: 'file' as const, title: 'Lab report ready', body: 'Farhan Siddiqui · lipid profile' },
                  { icon: 'phone' as const, title: 'Callback requested', body: 'Meenakshi P. · asks about home pickup' },
                  { icon: 'wallet' as const, title: 'Payment pending', body: 'Token A-19 · ₹1,850 health check' },
                ].map((item) => (
                  <li key={item.title} className="flex items-start gap-3 p-3" style={{ background: 'var(--nx-bg)', border: '1px solid var(--nx-line)', borderRadius: 16 }}>
                    <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full" style={{ background: 'color-mix(in srgb, var(--nx-accent) 16%, transparent)' }}>
                      <Icon name={item.icon} className="h-[18px] w-[18px]" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14px] font-medium">{item.title}</span>
                      <span className="block truncate text-[13px]" style={{ color: 'var(--nx-muted)' }}>{item.body}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </main>
      </div>

      <nav aria-label="Desk sections" className="fixed inset-x-0 bottom-0 z-30 flex justify-around px-2 pb-[max(env(safe-area-inset-bottom),6px)] pt-1.5 lg:hidden" style={{ background: 'var(--nx-surface)', borderTop: '1px solid var(--nx-line)' }}>
        {navItems.slice(0, 4).map((item) => {
          const on = item.id === active
          return (
            <button key={item.id} type="button" aria-current={on ? 'page' : undefined} onClick={() => setActive(item.id)} className="flex min-h-12 min-w-16 flex-col items-center justify-center gap-0.5 text-[11px]" style={{ color: on ? 'var(--nx-fg)' : 'var(--nx-muted)' }}>
              <span className="inline-flex h-7 w-12 items-center justify-center" style={{ background: on ? 'color-mix(in srgb, var(--nx-accent) 22%, transparent)' : 'transparent', borderRadius: on ? 10 : 999, transition: level === 'off' ? 'none' : 'border-radius 300ms var(--nx-ease)' }}>
                <Icon name={item.icon} />
              </span>
              {item.label}
            </button>
          )
        })}
      </nav>
      <div className="h-16 lg:hidden" aria-hidden />

      <Drawer title="Tidewell Desk" open={menu} onClose={closeMenu}>
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.id}>
              <button type="button" className="flex min-h-12 w-full items-center gap-3 px-2 text-left text-[17px]" onClick={() => { setActive(item.id); closeMenu() }}>
                <Icon name={item.icon} />
                {item.label}
              </button>
            </li>
          ))}
        </ul>
        <a href={screenHref('landing', scheme)} className="mt-6 inline-flex min-h-11 items-center text-sm" style={{ color: 'var(--nx-fg)' }}>Back to tidewell.in</a>
      </Drawer>
      <CommandPalette open={palette} onClose={closePalette} groups={groups} placeholder="Find a patient, token or action" label="Search the desk" />
      <ToastStack message={toast} onDismiss={dismiss} />
    </div>
  )
}
