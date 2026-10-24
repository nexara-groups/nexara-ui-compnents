'use client'

import { DrawRule, Kicker, MarkList, useSeen } from '@/themes/primitives.tsx'
import { useState } from 'react'

export type FieldnoteService = { id: string; code: string; title: string; body: string; meta: string }

const defaultServices: FieldnoteService[] = [
  { id: 'callout', code: '01', title: 'Callout', body: 'A named fitter, a window, and the fault written down before anyone opens the cupboard.', meta: 'From £96, waived on a repair' },
  { id: 'plan', code: '02', title: 'House plan', body: 'Annual service, priority on cold mornings, and parts that are already on the van.', meta: '£18 a month' },
  { id: 'plant', code: '03', title: 'Plant', body: 'Replacement quoted on site. The old boiler leaves the same day when the flue allows it.', meta: 'Written quote, not a range' },
]

export function FieldnoteFeatures({
  kicker = 'What the van carries',
  title = 'Three ways the work shows up.',
  services = defaultServices,
}: {
  kicker?: string
  title?: string
  services?: FieldnoteService[]
}) {
  const [active, setActive] = useState(services[0]?.id ?? 'callout')
  const [ref, seen] = useSeen<HTMLDivElement>()
  const current = services.find((item) => item.id === active) ?? services[0]

  return (
    <section id="services" className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="fieldnote-features-title">
      <div ref={ref} className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:px-8 md:py-24 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <div>
          <Kicker>{kicker}</Kicker>
          <h2 id="fieldnote-features-title" className="nx-display mt-3 text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
          <DrawRule seen={seen} className="mt-6" />
          {current ? (
            <p className="mt-6 max-w-[var(--nx-measure)] text-base leading-7" style={{ color: 'var(--nx-muted)' }}>
              <span className="nx-mono mr-2 text-[11px] tracking-[0.14em]" style={{ color: 'var(--nx-fg)' }}>
                {current.code}
              </span>
              {current.body}
            </p>
          ) : null}
        </div>
        <MarkList
          label="Services"
          value={active}
          onChange={setActive}
          rows={services.map((service) => ({
            id: service.id,
            content: (
              <span className="grid gap-1">
                <span className="flex items-baseline justify-between gap-3">
                  <span className="text-lg font-medium">{service.title}</span>
                  <span className="nx-mono text-[11px]" style={{ color: 'var(--nx-muted)' }}>
                    {service.code}
                  </span>
                </span>
                <span className="text-sm" style={{ color: 'var(--nx-muted)' }}>
                  {service.meta}
                </span>
              </span>
            ),
          }))}
        />
      </div>
    </section>
  )
}
