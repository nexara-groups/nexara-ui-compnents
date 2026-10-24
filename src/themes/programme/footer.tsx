'use client'

import { Perforation, useSeen } from '@/themes/primitives.tsx'

export function ProgrammeFooter({
  name = 'Riverside Athletic',
  address = ['The Marsh Pavilion', 'Riverside Walk', 'London E3 4QA'],
  nights = 'Training: Tue and Thu, 18:00',
  charity = 'Charity 1182044',
}: {
  name?: string
  address?: string[]
  nights?: string
  charity?: string
}) {
  const [ref, seen] = useSeen<HTMLElement>()

  return (
    <footer ref={ref} className="border-t" style={{ borderColor: 'var(--nx-line)' }}>
      <div className="mx-auto max-w-6xl px-4 pt-8 md:px-8">
        <Perforation play={seen} />
      </div>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-3 md:px-8">
        <div>
          <p className="nx-display text-3xl">{name}</p>
          <address className="mt-3 text-sm leading-6 not-italic" style={{ color: 'var(--nx-muted)' }}>
            {address.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div className="text-sm leading-6">
          <p>{nights}</p>
          <p className="nx-mono mt-2 text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--nx-muted)' }}>
            {charity}
          </p>
        </div>
        <nav aria-label="Footer" className="text-sm">
          <ul className="space-y-2">
            <li>
              <a className="no-underline" style={{ color: 'var(--nx-fg)' }} href="#fixtures">
                Fixtures
              </a>
            </li>
            <li>
              <a className="no-underline" style={{ color: 'var(--nx-fg)' }} href="#membership">
                Membership
              </a>
            </li>
            <li>
              <a className="no-underline" style={{ color: 'var(--nx-fg)' }} href="#register">
                Register
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
