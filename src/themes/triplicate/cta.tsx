'use client'

import { usePrefersReducedMotion } from '@/lib/utils.ts'
import { useState, type FormEvent } from 'react'

export type TriplicateField = { name: string; label: string; type?: string }

const clinicFields: TriplicateField[] = [
  { name: 'patient', label: 'Patient name' },
  { name: 'when', label: 'Visit time', type: 'text' },
]

export function TriplicateCta({
  institution = 'Riverside Clinic',
  kicker = 'Front desk',
  title = 'Book the visit on the sheet.',
  fields = clinicFields,
  action = 'File the visit',
}: {
  institution?: string
  kicker?: string
  title?: string
  fields?: TriplicateField[]
  action?: string
}) {
  const reduce = usePrefersReducedMotion()
  const [step, setStep] = useState<0 | 1 | 2>(0)
  const [pressed, setPressed] = useState(false)
  const [values, setValues] = useState<Record<string, string>>({})

  function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (step === 2) return
    if (reduce) {
      setStep(2)
      return
    }
    setPressed(true)
    window.setTimeout(() => setPressed(false), 40)
    window.setTimeout(() => setStep(1), 40)
    window.setTimeout(() => setStep(2), 190)
  }

  const sheet = step === 2 ? 'var(--nx-ply)' : step === 1 ? 'var(--nx-plate)' : 'var(--nx-surface)'

  return (
    <section id="register" className="px-4 py-16 md:px-8 md:py-24" aria-labelledby="triplicate-title" style={{ background: 'var(--nx-bg)', color: 'var(--nx-fg)' }}>
      <div className="mx-auto max-w-xl">
        <p className="nx-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: 'var(--nx-muted)' }}>
          {kicker}
        </p>
        <h2 id="triplicate-title" className="nx-display mt-3 text-4xl leading-tight md:text-5xl">
          {institution}
        </h2>
        <p className="mt-3 text-base leading-7" style={{ color: 'var(--nx-muted)' }}>
          {title}
        </p>
        <div className="mt-6" style={{ transform: pressed && !reduce ? 'translateY(8px)' : 'none', transition: reduce ? 'none' : 'transform 40ms linear' }}>
          <div aria-hidden className="mx-auto h-3 w-14" style={{ background: 'var(--nx-hardware)', borderBottomLeftRadius: 999, borderBottomRightRadius: 999 }} />
          <div className="border px-4 py-5" style={{ background: sheet, borderColor: 'var(--nx-line)', color: 'var(--nx-fg)' }}>
            {step < 2 ? (
              <form onSubmit={onSubmit} className="grid gap-4">
                {fields.map((field) => (
                  <label key={field.name} className="grid gap-1 text-sm">
                    {field.label}
                    <input
                      required
                      name={field.name}
                      type={field.type ?? 'text'}
                      value={values[field.name] ?? ''}
                      onChange={(event) => setValues((current) => ({ ...current, [field.name]: event.target.value }))}
                      className="min-h-11 border bg-transparent px-3"
                      style={{ borderColor: 'var(--nx-fg)', borderRadius: 0, color: 'var(--nx-fg)' }}
                    />
                  </label>
                ))}
                <button type="submit" className="min-h-11 px-4 font-medium" style={{ background: 'var(--nx-accent)', color: 'var(--nx-accent-fg)' }}>
                  {step === 1 ? 'Filing' : action}
                </button>
              </form>
            ) : (
              <div>
                <p className="nx-display text-5xl">Filed</p>
                <dl className="mt-4 grid gap-2 text-sm">
                  {fields.map((field) => (
                    <div key={field.name}>
                      <dt className="nx-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--nx-muted)' }}>
                        {field.label}
                      </dt>
                      <dd>{values[field.name] || '—'}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
