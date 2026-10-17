'use client'

import { cn } from '@/lib/utils.ts'

const VARIANTS = [
  'agency',
  'jobs',
  'care',
  'events',
  'studio',
  'compact',
  'swim',
  'priority',
  'owners',
  'wip',
  'simple',
  'review',
] as const

export type KanbanBoardVariant = (typeof VARIANTS)[number]

export interface KanbanBoardProps {
  variant?: KanbanBoardVariant
  className?: string
}

const boards: Record<string, Array<[string, string[]]>> = {
  agency: [
    ['Brief', ['Sai Nirmaan quote', 'Happy Farms store']],
    ['Build', ['Sri remote hero', 'Rise chapters']],
    ['Review', ['VDRSA medals', 'Qualigene portal']],
  ],
  jobs: [
    ['Design', ['VRF Bay 04', 'Chiller block B']],
    ['Install', ['Cassette wing', 'Drain riser 3']],
    ['Commission', ['Gas book', 'BMS handshake']],
  ],
  care: [
    ['Arrive', ['Ravi Teja · 09:20']],
    ['Chair', ['EECP 3 · Anitha']],
    ['Pharmacy', ['Script waiting']],
  ],
  events: [
    ['Lane', ['U16 500m']],
    ['Heat', ['Relay A']],
    ['Podium', ['Ananya Rao']],
  ],
}

/**
 * Kanban board
 * Twelve boards for agency, plant jobs, clinic flow, and race days.
 * Copy this file plus `src/lib/utils.ts`.
 */
export function KanbanBoard({ variant = 'agency', className }: KanbanBoardProps) {
  const columns = boards[variant] ?? boards.agency!
  const tight = variant === 'compact' || variant === 'simple'

  return (
    <div data-nexara="kanban-board" data-variant={variant} className={cn('grid gap-3 md:grid-cols-3', className)}>
      {columns.map(([title, cards]) => (
        <section key={title} className="rounded-[1.3rem] border border-nx-border bg-nx-elevated p-3">
          <header className="mb-2 flex items-center justify-between text-xs">
            <h3 className="font-medium">{title}</h3>
            <span className="text-nx-faint">{cards.length}</span>
          </header>
          <ul className="space-y-2">
            {cards.map((card) => (
              <li key={card} className={cn('rounded-xl border border-nx-border bg-nx-card p-3 text-sm', tight && 'p-2 text-xs')}>
                {card}
                {variant === 'priority' ? <p className="mt-1 text-[10px] text-nx-danger">High</p> : null}
                {variant === 'owners' ? <p className="mt-1 text-[10px] text-nx-muted">Latha</p> : null}
                {variant === 'wip' ? <p className="mt-1 text-[10px] text-nx-warn">WIP 2/3</p> : null}
                {variant === 'review' && title === 'Review' ? <p className="mt-1 text-[10px] text-nx-accent">Needs pass</p> : null}
                {variant === 'swim' ? <p className="mt-1 text-[10px] text-nx-faint">Studio swim</p> : null}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}
