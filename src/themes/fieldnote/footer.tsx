'use client'

export function FieldnoteFooter({
  name = 'Northline Mechanical',
  lines = ['Unit 4, Goods Yard', 'Queen’s Crescent', 'London NW5 4ET'],
  districts = ['NW1', 'NW3', 'NW5', 'NW6', 'N6', 'N19'],
  licences = ['Gas Safe 584221', 'Insured to £5m', 'VAT GB 294 1182 07'],
  links = [
    { href: '#services', label: 'Callouts' },
    { href: '#plans', label: 'Plans' },
    { href: '#quote', label: 'Quote' },
  ],
}: {
  name?: string
  lines?: string[]
  districts?: string[]
  licences?: string[]
  links?: { href: string; label: string }[]
}) {
  return (
    <footer id="districts" className="border-t" style={{ borderColor: 'var(--nx-line)' }}>
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-4 md:px-8">
        <div>
          <p className="font-semibold">{name}</p>
          <address className="mt-3 text-sm leading-6 not-italic" style={{ color: 'var(--nx-muted)' }}>
            {lines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div>
          <p className="nx-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>
            Districts
          </p>
          <ul className="mt-3 grid grid-cols-3 gap-1 text-sm">
            {districts.map((district) => (
              <li key={district} className="nx-mono">
                {district}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="nx-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>
            On the van
          </p>
          <ul className="mt-3 space-y-1 text-sm" style={{ color: 'var(--nx-muted)' }}>
            {licences.map((licence) => (
              <li key={licence}>{licence}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="nx-mono text-[11px] tracking-[0.14em] uppercase" style={{ color: 'var(--nx-muted)' }}>
            Index
          </p>
          <ul className="mt-3 space-y-1 text-sm">
            {links.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="no-underline" style={{ color: 'var(--nx-fg)' }}>
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p className="nx-mono border-t px-4 py-4 text-[11px] tracking-[0.12em] md:px-8" style={{ borderColor: 'var(--nx-line)', color: 'var(--nx-muted)' }}>
        The tape marks the live row. It is not a warning by itself.
      </p>
    </footer>
  )
}
