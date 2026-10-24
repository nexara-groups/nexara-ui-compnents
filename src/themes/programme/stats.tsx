'use client'

import { ScoreWindow, useSeen } from '@/themes/primitives.tsx'

export type ProgrammeStat = { id: string; value: string; label: string }

const defaultStats: ProgrammeStat[] = [
  { id: 'played', value: '18', label: 'Played' },
  { id: 'won', value: '14', label: 'Won' },
  { id: 'drawn', value: '02', label: 'Drawn' },
  { id: 'lost', value: '01', label: 'Lost' },
]

export function ProgrammeStats({
  title = 'The season, as a score.',
  items = defaultStats,
}: {
  title?: string
  items?: ProgrammeStat[]
}) {
  const [ref, seen] = useSeen<HTMLElement>()

  return (
    <section ref={ref} className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="programme-stats-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <h2 id="programme-stats-title" className="nx-display text-3xl md:text-5xl">
          {title}
        </h2>
        <dl className="mt-8 grid grid-cols-2 gap-px md:grid-cols-4" style={{ background: 'var(--nx-line)' }}>
          {items.map((item) => (
            <div key={item.id} className="px-4 py-6" style={{ background: 'var(--nx-bg)' }}>
              <dt className="nx-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>
                {item.label}
              </dt>
              <dd className="nx-display mt-3 text-5xl md:text-6xl">
                <ScoreWindow value={item.value} play={seen} />
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
