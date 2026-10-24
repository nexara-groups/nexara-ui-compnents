'use client'

import { Kicker, ThemeButton } from '@/themes/primitives.tsx'

export function FieldnoteCta({
  kicker = 'Dispatch',
  title = 'Call the yard. Or write the job.',
  phone = '020 7946 0184',
  phoneHref = 'tel:+442079460184',
  quoteHref = '#quote',
}: {
  kicker?: string
  title?: string
  phone?: string
  phoneHref?: string
  quoteHref?: string
}) {
  return (
    <section id="quote" className="border-t" style={{ borderColor: 'var(--nx-line)', background: 'var(--nx-surface)' }} aria-labelledby="fieldnote-cta-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <div className="flex items-center gap-3">
          <span aria-hidden className="inline-block h-6 w-[3px]" style={{ background: 'var(--nx-mark)' }} />
          <Kicker>{kicker}</Kicker>
        </div>
        <h2 id="fieldnote-cta-title" className="nx-display mt-4 max-w-[14ch] text-4xl leading-[0.95] font-semibold tracking-tight md:text-6xl">
          {title}
        </h2>
        <p className="mt-4 max-w-[var(--nx-measure)] text-base leading-7" style={{ color: 'var(--nx-muted)' }}>
          The phone is answered by the person who assigns the van. A quote asks for the postcode and what the boiler is doing.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a href={phoneHref} className="nx-mono text-3xl no-underline md:text-5xl" style={{ color: 'var(--nx-fg)' }}>
            {phone}
          </a>
          <ThemeButton href={quoteHref} kind="line">
            Request a quote
          </ThemeButton>
        </div>
      </div>
    </section>
  )
}
