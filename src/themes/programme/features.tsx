'use client'

import { MarkList } from '@/themes/primitives.tsx'
import { useMemo, useState } from 'react'

export type Fixture = {
  id: string
  age: string
  time: string
  home: string
  away: string
  pitch: string
  fee: string
}

const defaultFixtures: Fixture[] = [
  { id: 'u10', age: 'U10', time: '09:30', home: 'Riverside', away: 'Kiln Lane', pitch: 'Pitch 3', fee: '£4' },
  { id: 'u12', age: 'U12', time: '11:00', home: 'Riverside', away: 'Harbour', pitch: 'Pitch 2', fee: '£6' },
  { id: 'u14', age: 'U14', time: '13:30', home: 'Marsh', away: 'Riverside', pitch: 'Away', fee: '£6' },
]

export function ProgrammeFeatures({
  title = 'Saturday’s sheet',
  fixtures = defaultFixtures,
}: {
  title?: string
  fixtures?: Fixture[]
}) {
  const [active, setActive] = useState(fixtures[1]?.id ?? fixtures[0]?.id ?? 'u12')
  const ages = useMemo(() => [...new Set(fixtures.map((fixture) => fixture.age))], [fixtures])

  return (
    <section id="fixtures" className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="programme-fixtures-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <h2 id="programme-fixtures-title" className="nx-display text-4xl leading-none md:text-6xl">
            {title}
          </h2>
          <p className="nx-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>
            {ages.join(' · ')}
          </p>
        </div>
        <div className="nx-mono mt-8 hidden grid-cols-[4.5rem_5rem_1fr_auto] gap-3 px-4 text-[11px] tracking-[0.14em] uppercase md:grid" style={{ color: 'var(--nx-muted)' }}>
          <span>Age</span>
          <span>Kickoff</span>
          <span>Fixture</span>
          <span>Gate</span>
        </div>
        <div className="mt-2 border-t" style={{ borderColor: 'var(--nx-line)' }}>
          <MarkList
            label="Fixtures"
            grow
            value={active}
            onChange={setActive}
            rows={fixtures.map((fixture) => ({
              id: fixture.id,
              content: (
                <span className="grid gap-1 md:grid-cols-[4.5rem_5rem_1fr_auto] md:items-baseline md:gap-3">
                  <span className="nx-mono text-sm">{fixture.age}</span>
                  <span className="nx-mono text-sm">{fixture.time}</span>
                  <span className="text-lg">
                    {fixture.home}
                    <span style={{ color: 'var(--nx-muted)' }}> v </span>
                    {fixture.away}
                    <span className="mt-1 block text-sm md:hidden" style={{ color: 'var(--nx-muted)' }}>
                      {fixture.pitch}
                    </span>
                  </span>
                  <span className="nx-mono">{fixture.fee}</span>
                </span>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  )
}
