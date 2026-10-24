'use client'

import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { DrawRule, Kicker, MarkList, Station, ThemeButton, useSeen } from '@/themes/primitives.tsx'
import { useRef, useState } from 'react'

export type FieldnoteStatus = { id: string; time: string; label: string; note: string }

const defaultRows: FieldnoteStatus[] = [
  { id: 'call', time: 'NOW', label: 'On call', note: 'A fitter is on the north round.' },
  { id: 'van', time: '45 MIN', label: 'Parts van', note: 'Common boilers ride in the van.' },
  { id: 'night', time: '24 HR', label: 'Night cover', note: 'The night number is the same number.' },
]

export type FieldnoteAction = { href: string; label: string; kind?: 'solid' | 'line' }

export function FieldnoteHero({
  kicker = 'Job board · North London',
  title = 'The boiler is the job.',
  lede = 'Northline answers the phone, names a time, and writes the visit on the sheet. The tape marks whichever row is live.',
  phone = '020 7946 0184',
  phoneHref = 'tel:+442079460184',
  quoteHref = '#quote',
  actions,
  rows = defaultRows,
  station = false,
}: {
  kicker?: string
  title?: string
  lede?: string
  phone?: string
  phoneHref?: string
  quoteHref?: string
  actions?: FieldnoteAction[]
  rows?: FieldnoteStatus[]
  station?: boolean
}) {
  const host = useRef<HTMLElement>(null)
  const [active, setActive] = useState(rows[0]?.id ?? 'call')
  const [ruleHost, seen] = useSeen<HTMLDivElement>()
  const reduce = usePrefersReducedMotion()
  const calls: FieldnoteAction[] = actions ?? [
    { href: phoneHref, label: `Call ${phone}` },
    { href: quoteHref, label: 'Request a quote', kind: 'line' },
  ]

  return (
    <section ref={host} className="relative overflow-hidden" aria-labelledby="fieldnote-hero-title">
      {station ? <Station host={host} /> : null}
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:px-8 md:py-20 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <div>
          <Kicker>{kicker}</Kicker>
          <h1
            id="fieldnote-hero-title"
            className="nx-display mt-4 max-w-[14ch] text-[2.6rem] leading-[0.96] font-semibold tracking-[-0.03em] md:text-6xl lg:text-7xl"
          >
            {title}
          </h1>
          <p className="mt-5 max-w-[var(--nx-measure)] text-base leading-7 md:text-lg" style={{ color: 'var(--nx-muted)' }}>
            {lede}
          </p>
          {calls.length > 0 ? (
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              {calls.map((action) => (
                <ThemeButton key={action.href + action.label} href={action.href} kind={action.kind ?? 'solid'}>
                  {action.label}
                </ThemeButton>
              ))}
            </div>
          ) : null}
        </div>
        <div ref={ruleHost} className="border" style={{ borderColor: 'var(--nx-line)', background: 'var(--nx-surface)' }}>
          <div className="flex items-center justify-between px-4 py-3">
            <Kicker>Live board</Kicker>
            <span className="nx-mono text-[11px]" style={{ color: 'var(--nx-muted)' }}>
              {reduce ? 'Still' : 'Tape follows the row'}
            </span>
          </div>
          <DrawRule seen={seen} />
          <MarkList
            label="Live jobs"
            value={active}
            onChange={setActive}
            rows={rows.map((row) => ({
              id: row.id,
              content: (
                <span className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
                  <span>
                    <span className="nx-mono mr-3 text-[11px] tracking-[0.12em]">
                      {row.time}
                    </span>
                    <span className="font-medium">{row.label}</span>
                  </span>
                  <span className="text-sm" style={{ color: 'var(--nx-muted)' }}>
                    {row.note}
                  </span>
                </span>
              ),
            }))}
          />
        </div>
      </div>
    </section>
  )
}
