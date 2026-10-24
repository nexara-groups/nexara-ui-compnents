'use client'

import { Kicker } from '@/themes/primitives.tsx'

export function FieldnoteTestimonial({
  kicker = 'Service note 1842',
  quote = 'They left the mechanical room cleaner than they found it, and the invoice matched the note on the door.',
  name = 'Priya Raman',
  place = 'Block B, Kilburn',
  job = 'JOB 1842 · 12 MAR',
}: {
  kicker?: string
  quote?: string
  name?: string
  place?: string
  job?: string
}) {
  return (
    <section className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="fieldnote-note-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <figure
          className="relative px-4 py-8 md:px-10"
          style={{
            backgroundImage:
              'repeating-linear-gradient(to bottom, transparent, transparent 31px, var(--nx-line) 32px)',
            backgroundColor: 'var(--nx-surface)',
          }}
        >
          <Kicker>{kicker}</Kicker>
          <blockquote id="fieldnote-note-title" className="mt-8 max-w-[28ch] text-2xl leading-snug font-medium md:text-4xl">
            {quote}
          </blockquote>
          <figcaption className="mt-8 flex flex-wrap items-end justify-between gap-3 text-sm">
            <span>
              <span className="block font-medium">{name}</span>
              <span style={{ color: 'var(--nx-muted)' }}>{place}</span>
            </span>
            <span className="nx-mono text-[11px] tracking-[0.14em]" style={{ color: 'var(--nx-muted)' }}>
              {job}
            </span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
