'use client'

import { DrawRule, Kicker, useSeen } from '@/themes/primitives.tsx'

export type FieldnoteStat = { id: string; value: string; label: string; note: string }

const defaultStats: FieldnoteStat[] = [
  { id: 'time', value: '45m', label: 'Average arrival', note: 'Across last winter' },
  { id: 'years', value: '12', label: 'Years on the round', note: 'Same yard' },
  { id: 'vans', value: '4', label: 'Vans stocked', note: 'Not subcontracted' },
  { id: 'fee', value: '£0', label: 'Plan callout fee', note: 'House plan only' },
]

export function FieldnoteStats({
  kicker = 'The sheet, not a slogan',
  title = 'Figures a dispatcher would recognise.',
  items = defaultStats,
}: {
  kicker?: string
  title?: string
  items?: FieldnoteStat[]
}) {
  const [ref, seen] = useSeen<HTMLElement>()

  return (
    <section ref={ref} className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="fieldnote-stats-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-20">
        <Kicker>{kicker}</Kicker>
        <h2 id="fieldnote-stats-title" className="nx-display mt-3 max-w-[18ch] text-3xl font-semibold tracking-tight md:text-4xl">
          {title}
        </h2>
        <DrawRule seen={seen} className="mt-6" />
        <dl className="mt-2 grid gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div key={item.id} className="border-b py-6 sm:border-r sm:px-4 sm:first:pl-0" style={{ borderColor: 'var(--nx-line)' }}>
              <dt className="text-sm" style={{ color: 'var(--nx-muted)' }}>
                {item.label}
              </dt>
              <dd className="nx-mono mt-2 text-4xl tracking-tight md:text-5xl" style={{ color: 'var(--nx-fg)' }}>
                {item.value}
              </dd>
              <dd className="mt-2 text-sm" style={{ color: 'var(--nx-muted)' }}>
                {item.note}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
