'use client'

import { Grain, HelioMark, cn, springs } from '@/components/flagship/primitives.tsx'
import { AnimatePresence, LayoutGroup, motion, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

type PlanId = 'desk' | 'studio' | 'signal'

type Plan = {
  id: PlanId
  name: string
  monthly: number
  blurb: string
  features: string[]
}

const plans: Plan[] = [
  {
    id: 'desk',
    name: 'Desk',
    monthly: 32,
    blurb: 'One room. Iris, archive, and a single beam.',
    features: ['2 seats', 'Night desk', '30-day archive', 'Email pulse'],
  },
  {
    id: 'studio',
    name: 'Studio',
    monthly: 74,
    blurb: 'The working plate. Shared instrument, live tiles, command.',
    features: ['8 seats', 'Pinned chapters', 'Live bento', 'Command palette', 'Priority pulse'],
  },
  {
    id: 'signal',
    name: 'Signal',
    monthly: 160,
    blurb: 'A house of rooms. Audit, SSO, and a dedicated dimmer.',
    features: ['Unlimited seats', 'SSO', 'Audit log', 'Dedicated instrument', 'On-desk review'],
  },
]

const compareRows = [
  { label: 'Seats included', desk: '2', studio: '8', signal: 'Unlimited' },
  { label: 'Iris / reveal', desk: 'Yes', studio: 'Yes', signal: 'Yes' },
  { label: 'Live tiles', desk: '—', studio: 'Yes', signal: 'Yes' },
  { label: 'Command palette', desk: '—', studio: 'Yes', signal: 'Yes' },
  { label: 'SSO + audit', desk: '—', studio: '—', signal: 'Yes' },
  { label: 'On-desk review', desk: '—', studio: 'Add-on', signal: 'Included' },
]

export type PricingAtelierProps = {
  className?: string
}

export function PricingAtelier({ className }: PricingAtelierProps) {
  const [annual, setAnnual] = useState(true)
  const [selected, setSelected] = useState<PlanId>('studio')
  const [seats, setSeats] = useState(6)
  const [openRow, setOpenRow] = useState<string | null>(compareRows[0]?.label ?? null)

  const selectedPlan = plans.find((plan) => plan.id === selected) ?? plans[1]
  const extra = Math.max(0, seats - (selected === 'desk' ? 2 : selected === 'studio' ? 8 : seats))
  const seatFee = selected === 'signal' ? 0 : extra * (annual ? 9 : 12)
  const base = selectedPlan.monthly * (annual ? 10 : 12)
  const total = base + seatFee * (annual ? 10 : 12)

  return (
    <section id="plans" className={cn('relative bg-void px-4 py-24 md:px-8 md:py-32', className)}>
      <Grain className="opacity-[0.08]" />
      <div className="relative mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] text-brass uppercase">
              <HelioMark className="size-6" />
              Fig 2.0 · Seats
            </p>
            <h2 className="mt-4 font-serif text-[clamp(2.2rem,5vw,4.6rem)] leading-[0.94] tracking-[-0.04em] text-ivory">
              Four seats. One beam.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <span className={cn('text-sm', annual ? 'text-fog' : 'text-ivory')}>Monthly</span>
            <button
              type="button"
              role="switch"
              aria-checked={annual}
              onClick={() => setAnnual((value) => !value)}
              className="relative h-8 w-14 rounded-full border border-ivory/15 bg-carbon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
            >
              <motion.span
                layout
                className="absolute top-1 size-6 rounded-full bg-ember"
                animate={{ left: annual ? 28 : 4 }}
                transition={springs.snap}
              />
            </button>
            <span className={cn('text-sm', annual ? 'text-ivory' : 'text-fog')}>Annual · two months dark</span>
          </div>
        </div>

        <LayoutGroup>
          <div className="relative mt-12 grid gap-4 lg:grid-cols-3">
            {plans.map((plan) => {
              const current = plan.id === selected
              const shown = annual ? Math.round(plan.monthly * (10 / 12)) : plan.monthly
              return (
                <motion.article
                  key={plan.id}
                  layout
                  onClick={() => setSelected(plan.id)}
                  onKeyDown={(event) => {
                    if (event.key === 'Enter' || event.key === ' ') {
                      event.preventDefault()
                      setSelected(plan.id)
                    }
                  }}
                  tabIndex={0}
                  className={cn(
                    'relative cursor-pointer rounded-[1.8rem] border bg-carbon p-6 outline-none focus-visible:ring-2 focus-visible:ring-ion',
                    current ? 'border-transparent' : 'border-ivory/10',
                  )}
                >
                  {current ? (
                    <motion.span
                      layoutId="plan-ring"
                      className="absolute inset-0 rounded-[1.8rem] border-2 border-ember"
                      transition={springs.ui}
                    />
                  ) : null}
                  <div className="relative">
                    <div className="flex items-baseline justify-between">
                      <h3 className="font-serif text-3xl text-ivory">{plan.name}</h3>
                      {plan.id === 'studio' ? (
                        <span className="font-mono text-[10px] tracking-[0.18em] text-brass uppercase">Held</span>
                      ) : null}
                    </div>
                    <p className="mt-3 text-sm leading-6 text-fog">{plan.blurb}</p>
                    <p className="mt-6 flex items-end gap-1">
                      <PriceFigure value={shown} />
                      <span className="mb-2 text-sm text-fog">/ seat month</span>
                    </p>
                    <ul className="mt-6 space-y-2 text-sm text-ivory/80">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex gap-2">
                          <span className="mt-2 size-1 rounded-full bg-brass" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </LayoutGroup>

        <div className="mt-10 grid gap-6 rounded-[1.8rem] border border-ivory/10 bg-carbon p-6 md:grid-cols-[1.1fr_0.9fr]">
          <div>
            <h3 className="font-serif text-2xl text-ivory">Compare the plate</h3>
            <table className="mt-4 w-full text-left text-sm">
              <thead className="font-mono text-[10px] tracking-[0.16em] text-fog uppercase">
                <tr>
                  <th className="py-2 font-medium">Line</th>
                  <th className="py-2 font-medium">Desk</th>
                  <th className="py-2 font-medium">Studio</th>
                  <th className="py-2 font-medium">Signal</th>
                </tr>
              </thead>
              <tbody>
                {compareRows.map((row) => (
                  <tr key={row.label} className="border-t border-ivory/8">
                    <td className="py-3">
                      <button
                        type="button"
                        onClick={() => setOpenRow((value) => (value === row.label ? null : row.label))}
                        className="text-ivory/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ion"
                      >
                        {row.label}
                      </button>
                      <AnimatePresence>
                        {openRow === row.label ? (
                          <motion.p
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden pt-1 text-xs text-fog"
                          >
                            {row.label === 'Seats included'
                              ? 'Extra seats are a dimmer fee, not a new plan.'
                              : 'Included means it ships on the plate. A dash means it does not.'}
                          </motion.p>
                        ) : null}
                      </AnimatePresence>
                    </td>
                    <td className="py-3 text-ivory/70">{row.desk}</td>
                    <td className="py-3 text-ivory/70">{row.studio}</td>
                    <td className="py-3 text-ivory/70">{row.signal}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="rounded-[1.4rem] border border-ivory/10 bg-void p-5">
            <p className="font-mono text-[11px] tracking-[0.18em] text-brass uppercase">Seat math</p>
            <label className="mt-4 block text-sm text-fog">
              Seats on {selectedPlan.name}
              <input
                type="range"
                min={1}
                max={24}
                value={seats}
                onChange={(event) => setSeats(Number(event.target.value))}
                className="mt-3 w-full"
              />
            </label>
            <p className="mt-2 font-serif text-4xl text-ivory">{seats}</p>
            <p className="mt-4 text-sm text-fog">
              {annual ? 'Annual, two months unlit.' : 'Month to month.'} Extra seats {selected === 'signal' ? 'are included.' : `are ${annual ? '$9' : '$12'} each.`}
            </p>
            <p className="mt-6 font-serif text-5xl tracking-tight text-ivory">${total.toLocaleString()}</p>
            <p className="mt-1 font-mono text-[11px] tracking-[0.16em] text-fog uppercase">
              {annual ? 'per year' : 'per year equivalent'}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

function PriceFigure({ value }: { value: number }) {
  const spring = useSpring(value, springs.heavy)
  const [label, setLabel] = useState(`$${value}`)

  useEffect(() => {
    spring.set(value)
  }, [spring, value])

  useEffect(() => {
    return spring.on('change', (latest) => {
      setLabel(`$${Math.round(latest)}`)
    })
  }, [spring])

  return <span className="font-serif text-6xl tracking-tight text-ivory">{label}</span>
}
