'use client'

import { ThemeButton } from '@/themes/primitives.tsx'
import { useState } from 'react'

export type Membership = {
  id: string
  name: string
  price: string
  period: string
  includes: string
}

const defaultPlans: Membership[] = [
  { id: 'player', name: 'Player', price: '£90', period: 'a season', includes: 'Training, the Saturday sheet, and one shirt' },
  { id: 'household', name: 'Household', price: '£210', period: 'a season', includes: 'Three players at one address' },
  { id: 'coach', name: 'Coach', price: '£0', period: 'while qualified', includes: 'Listed on the sheet. DBS stays with the club' },
]

export function ProgrammePricing({
  title = 'What it costs to be on the sheet',
  plans = defaultPlans,
}: {
  title?: string
  plans?: Membership[]
}) {
  const [active, setActive] = useState(plans[0]?.id ?? 'player')

  return (
    <section id="membership" className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="programme-price-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <h2 id="programme-price-title" className="nx-display max-w-[14ch] text-4xl leading-[0.9] md:text-6xl">
          {title}
        </h2>
        <div className="mt-8 overflow-x-auto">
          <table className="w-full min-w-[36rem] border-collapse text-left">
            <caption className="sr-only">Membership prices for the season</caption>
            <thead>
              <tr className="nx-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>
                <th scope="col" className="border-b py-2 pr-4 font-medium" style={{ borderColor: 'var(--nx-line)' }}>
                  Seat
                </th>
                <th scope="col" className="border-b py-2 pr-4 font-medium" style={{ borderColor: 'var(--nx-line)' }}>
                  Fee
                </th>
                <th scope="col" className="border-b py-2 font-medium" style={{ borderColor: 'var(--nx-line)' }}>
                  Includes
                </th>
              </tr>
            </thead>
            <tbody>
              {plans.map((plan) => {
                const on = plan.id === active
                return (
                  <tr key={plan.id} style={{ boxShadow: on ? 'inset 3px 0 0 var(--nx-mark)' : undefined }}>
                    <th scope="row" className="border-b py-4 pr-4 font-medium" style={{ borderColor: 'var(--nx-line)' }}>
                      <button type="button" className="min-h-11 text-left" aria-pressed={on} onClick={() => setActive(plan.id)}>
                        {plan.name}
                      </button>
                    </th>
                    <td className="nx-mono border-b py-4 pr-4" style={{ borderColor: 'var(--nx-line)' }}>
                      {plan.price}
                      <span className="mt-1 block text-[11px] tracking-normal" style={{ color: 'var(--nx-muted)' }}>
                        {plan.period}
                      </span>
                    </td>
                    <td className="border-b py-4 text-sm" style={{ borderColor: 'var(--nx-line)', color: 'var(--nx-muted)' }}>
                      {plan.includes}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <ThemeButton href="#register">Register · {plans.find((plan) => plan.id === active)?.name}</ThemeButton>
        </div>
      </div>
    </section>
  )
}
