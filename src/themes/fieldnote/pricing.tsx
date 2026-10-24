'use client'

import { Kicker, MarkList, ThemeButton } from '@/themes/primitives.tsx'
import { useState } from 'react'

export type FieldnotePlan = {
  id: string
  name: string
  price: string
  response: string
  parts: string
  note: string
}

const defaultPlans: FieldnotePlan[] = [
  { id: 'visit', name: 'Visit', price: '£96', response: 'Same day if the board allows', parts: 'Billed as fitted', note: 'The fee comes off the repair.' },
  { id: 'house', name: 'House plan', price: '£18/mo', response: 'Priority, including Sundays', parts: 'Common parts included', note: 'No callout fee while the plan is live.' },
  { id: 'block', name: 'Block', price: 'Quote', response: 'Named engineer for the building', parts: 'Plant schedule', note: 'One number for the managing agent.' },
]

export function FieldnotePricing({
  kicker = 'Written prices',
  title = 'Pick the row. The tape stays there.',
  plans = defaultPlans,
}: {
  kicker?: string
  title?: string
  plans?: FieldnotePlan[]
}) {
  const [active, setActive] = useState(plans[1]?.id ?? plans[0]?.id ?? 'house')
  const chosen = plans.find((plan) => plan.id === active) ?? plans[0]

  return (
    <section id="plans" className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="fieldnote-pricing-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <Kicker>{kicker}</Kicker>
        <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
          <h2 id="fieldnote-pricing-title" className="nx-display max-w-[16ch] text-3xl font-semibold tracking-tight md:text-5xl">
            {title}
          </h2>
          {chosen ? (
            <p className="max-w-xs text-sm leading-6" style={{ color: 'var(--nx-muted)' }}>
              {chosen.note}
            </p>
          ) : null}
        </div>
        <div className="nx-mono mt-8 hidden grid-cols-4 px-4 text-[11px] tracking-[0.14em] uppercase md:grid" style={{ color: 'var(--nx-muted)' }}>
          <span>Plan</span>
          <span>Response</span>
          <span>Parts</span>
          <span>Price</span>
        </div>
        <div className="mt-2 border-t" style={{ borderColor: 'var(--nx-line)' }}>
          <MarkList
            label="Service plans"
            value={active}
            onChange={setActive}
            rows={plans.map((plan) => ({
              id: plan.id,
              content: (
                <span className="grid gap-1 md:grid-cols-4 md:items-baseline md:gap-2">
                  <span className="font-medium">{plan.name}</span>
                  <span style={{ color: 'var(--nx-muted)' }}>{plan.response}</span>
                  <span className="hidden md:inline" style={{ color: 'var(--nx-muted)' }}>
                    {plan.parts}
                  </span>
                  <span className="nx-mono text-base" style={{ color: 'var(--nx-fg)' }}>
                    {plan.price}
                  </span>
                </span>
              ),
            }))}
          />
        </div>
        <p className="mt-4 text-sm md:hidden" style={{ color: 'var(--nx-muted)' }}>
          Parts: {chosen?.parts}
        </p>
        <div className="mt-6">
          <ThemeButton href="#quote">Quote the {chosen?.name ?? 'plan'}</ThemeButton>
        </div>
      </div>
    </section>
  )
}
