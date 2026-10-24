'use client'

import { Misregister, Perforation, ScoreWindow, ThemeButton, useSeen } from '@/themes/primitives.tsx'

export function ProgrammeHero({
  home = 'Riverside',
  away = 'Harbour',
  score = '2–1',
  meta = 'Saturday · Pitch 2 · Gate £6',
  lede = 'Put their name down before Thursday. The sheet closes at noon, and the age group is on the row, not in a poster.',
  registerHref = '#register',
}: {
  home?: string
  away?: string
  score?: string
  meta?: string
  lede?: string
  registerHref?: string
}) {
  const [ref, seen] = useSeen<HTMLElement>()

  return (
    <section ref={ref} className="relative" aria-labelledby="programme-hero-title">
      <div className="relative mx-auto max-w-6xl px-4 pt-8 pb-12 md:px-8 md:pt-12">
        <div
          aria-hidden
          className="pointer-events-none h-6 opacity-40"
          style={{
            backgroundImage: 'radial-gradient(var(--nx-fg) 0.6px, transparent 0.7px)',
            backgroundSize: '4px 4px',
          }}
        />
        <div className="mt-4 grid grid-cols-[3px_minmax(0,1fr)] gap-4">
          <span aria-hidden className="w-[3px] min-w-[3px] self-stretch" style={{ background: 'var(--nx-mark)' }} />
          <div className="min-w-0">
            <div className="mb-5 flex gap-3" aria-hidden>
              <span className="inline-block h-4 w-3" style={{ background: 'var(--nx-hardware)' }} />
              <span className="inline-block h-4 w-3" style={{ background: 'var(--nx-hardware)' }} />
            </div>
            <p className="nx-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: 'var(--nx-muted)' }}>
              {meta}
            </p>
            <h1 id="programme-hero-title" className="nx-display mt-4 text-[3.2rem] leading-[0.84] tracking-[-0.03em] md:text-7xl lg:text-8xl">
              <span className="block">
                <Misregister>{home}</Misregister>
              </span>
              <span className="mt-2 flex flex-wrap items-end gap-x-4 gap-y-2">
                <ScoreWindow value={score} play={seen} />
                <span className="block">{away}</span>
              </span>
            </h1>
            <Perforation play={seen} />
            <p className="mt-6 max-w-[var(--nx-measure)] text-base leading-7 md:text-lg" style={{ color: 'var(--nx-muted)' }}>
              {lede}
            </p>
            <div className="mt-7">
              <ThemeButton href={registerHref}>Register a player</ThemeButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
