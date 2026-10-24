'use client'

import { Perforation, ThemeButton, useSeen } from '@/themes/primitives.tsx'

export function ProgrammeCta({
  title = 'Their name. The age group. Done.',
  lede = 'Takes a minute. Shirt size can change later. The fee you saw on the sheet is the fee on the form.',
  href = '#register',
}: {
  title?: string
  lede?: string
  href?: string
}) {
  const [ref, seen] = useSeen<HTMLElement>()

  return (
    <section ref={ref} id="register" className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="programme-cta-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <Perforation play={seen} />
        <h2 id="programme-cta-title" className="nx-display mt-6 max-w-[12ch] text-4xl leading-[0.88] md:text-7xl">
          {title}
        </h2>
        <p className="mt-5 max-w-[var(--nx-measure)] text-base leading-7" style={{ color: 'var(--nx-muted)' }}>
          {lede}
        </p>
        <div className="mt-8">
          <ThemeButton href={href}>Register a player</ThemeButton>
        </div>
      </div>
    </section>
  )
}
