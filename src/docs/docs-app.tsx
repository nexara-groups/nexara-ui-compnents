import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { catalog, categories, type CatalogEntry } from '@/docs/catalog.tsx'
import { VariantGallery } from '@/docs/variant-gallery.tsx'
import { variantDocs } from '@/docs/variant-meta.ts'
import { renderVariantPreview } from '@/docs/previews.tsx'
import { cn } from '@/lib/utils.ts'

function readHash() {
  const value = window.location.hash.replace(/^#/, '')
  return value || 'draggable-card'
}

function useSlug() {
  const [slug, setSlug] = useState(readHash)

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#draggable-card')
    }
    const sync = () => setSlug(readHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return slug
}

function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-nx-border bg-nx-card shadow-[var(--nx-shadow)]">
      <div className="flex items-center justify-between border-b border-nx-border px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff6a3d]" />
          <span className="size-2.5 rounded-full bg-[#f5c16c]" />
          <span className="size-2.5 rounded-full bg-[#3ddec4]" />
        </div>
        <span className="text-[11px] tracking-[0.16em] text-nx-faint uppercase">Live preview</span>
      </div>
      <div className={cn('p-5 md:p-8', className)}>{children}</div>
    </div>
  )
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1600)
    } catch {
      setCopied(false)
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-nx-border bg-nx-elevated">
      <div className="flex items-center justify-between border-b border-nx-border px-4 py-2">
        <span className="text-[11px] tracking-[0.16em] text-nx-faint uppercase">Usage</span>
        <button
          type="button"
          onClick={() => void copy()}
          className="h-8 rounded-full border border-nx-border px-3 text-xs text-nx-fg hover:bg-nx-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-nx-fg">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function PropsTable({ rows }: { rows: CatalogEntry['props'] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-nx-border">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead className="bg-nx-elevated text-xs tracking-[0.14em] text-nx-faint uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-nx-border align-top">
              <td className="px-4 py-3 font-mono text-[13px] text-nx-accent">{row.name}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-nx-muted">{row.type}</td>
              <td className="px-4 py-3 text-nx-faint">{row.defaultValue ?? '—'}</td>
              <td className="px-4 py-3 text-nx-fg">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function useTheme() {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof document === 'undefined') return 'light'
    return document.documentElement.classList.contains('dark') ? 'dark' : 'light'
  })
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    try {
      localStorage.setItem('nexara-theme', theme)
    } catch {
      /* ignore */
    }
  }, [theme])
  return [theme, setTheme] as const
}

export function DocsApp() {
  const slug = useSlug()
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useTheme()
  const entry = catalog.find((item) => item.slug === slug)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return catalog
    return catalog.filter((item) => {
      const variants = variantDocs[item.slug as keyof typeof variantDocs] ?? []
      const hay = [
        item.name,
        item.slug,
        item.category,
        item.description,
        ...variants.map((variant) => `${item.slug} / ${variant.id} ${variant.name} ${variant.description}`),
      ]
        .join(' ')
        .toLowerCase()
      return hay.includes(needle)
    })
  }, [query])

  return (
    <div className="min-h-screen bg-nx-bg text-nx-fg">
      <a
        href="#component-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-nx-fg focus:px-4 focus:py-2 focus:text-nx-bg"
      >
        Skip to component
      </a>
      <header className="border-b border-nx-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a href="#draggable-card" className="group flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-xl border border-nx-border bg-nx-card font-serif text-lg">
              N
            </span>
            <span>
              <span className="block font-serif text-xl leading-none tracking-tight">Nexara UI</span>
              <span className="mt-1 block text-xs text-nx-muted">Copy-paste components for agents and people</span>
            </span>
          </a>
          <div className="flex items-center gap-3">
            <p className="hidden text-sm text-nx-muted sm:block">{catalog.length} components</p>
            <button
              type="button"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="h-9 rounded-full border border-nx-border px-3 text-xs text-nx-fg hover:bg-nx-soft"
            >
              {theme === 'dark' ? 'Light' : 'Dark'}
            </button>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl md:grid-cols-[16.5rem_minmax(0,1fr)]">
        <aside className="border-nx-border px-4 py-4 md:sticky md:top-0 md:h-screen md:overflow-auto md:border-r md:px-4 md:py-6">
          <label className="mb-4 block md:hidden">
            <span className="sr-only">Jump to a component</span>
            <select
              value={entry?.slug ?? 'draggable-card'}
              onChange={(event) => {
                window.location.hash = event.target.value
              }}
              className="h-11 w-full rounded-2xl border border-nx-border bg-nx-card px-3 text-sm"
            >
              {catalog.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.category} · {item.name}
                </option>
              ))}
            </select>
          </label>
          <label className="mb-5 hidden md:block">
            <span className="sr-only">Filter components</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Filter components"
              className="h-10 w-full rounded-full border border-nx-border bg-transparent px-3 text-sm outline-none placeholder:text-nx-faint focus:ring-2 focus:ring-nx-ring"
            />
          </label>
          <nav className="hidden md:block" aria-label="Components">
            {categories.map((category) => {
              const items = filtered.filter((item) => item.category === category)
              if (items.length === 0) return null
              return (
                <div key={category} className="mb-5">
                  <p className="mb-2 px-3 text-[11px] tracking-[0.18em] text-nx-faint uppercase">{category}</p>
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const current = item.slug === slug
                      return (
                        <li key={item.slug}>
                          <a
                            href={`#${item.slug}`}
                            aria-current={current ? 'page' : undefined}
                            className={cn(
                              'block rounded-xl px-3 py-2 text-sm text-nx-muted hover:bg-nx-soft hover:text-nx-fg',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring',
                              current && 'bg-nx-soft text-nx-fg',
                            )}
                          >
                            {item.name}
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              )
            })}
            {filtered.length === 0 ? <p className="px-3 text-sm text-nx-muted">No components match.</p> : null}
          </nav>
        </aside>

        <main id="component-main" className="min-w-0 px-4 py-8 md:px-8 md:py-10">
          {entry ? <ComponentPage entry={entry} /> : <Missing slug={slug} />}
        </main>
      </div>
    </div>
  )
}

function ComponentPage({ entry }: { entry: CatalogEntry }) {
  const Demo = entry.Demo
  return (
    <article className="space-y-8">
      <header className="max-w-3xl">
        <p className="text-[11px] tracking-[0.2em] text-nx-accent uppercase">{entry.category}</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{entry.name}</h1>
        <p className="mt-3 text-base leading-7 text-nx-muted">{entry.description}</p>
      </header>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Variants</h2>
        <p className="text-sm leading-6 text-nx-muted">
          Ask for <span className="text-nx-fg">{entry.slug} / {variantDocs[entry.slug as keyof typeof variantDocs]?.[0]?.id ?? 'variant'}</span> or
          any id below. Each block is a live preview and a copyable usage line.
        </p>
        <VariantGallery
          items={variantDocs[entry.slug as keyof typeof variantDocs] ?? []}
          render={(id) => renderVariantPreview(entry.slug, id)}
        />
      </section>
      <Preview>
        <Demo />
      </Preview>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Install by copying</h2>
        <p className="text-sm leading-6 text-nx-muted">
          Copy <code className="text-nx-fg">{entry.path}</code> and{' '}
          <code className="text-nx-fg">src/lib/utils.ts</code>. Dependencies:{' '}
          {entry.dependencies.join(', ')}.
          {entry.registryDependencies.filter((item) => item !== 'utils').length > 0
            ? ` Also copy ${entry.registryDependencies.filter((item) => item !== 'utils').join(', ')}.`
            : ''}
        </p>
        <CodeBlock code={entry.usage} />
      </section>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Props</h2>
        <PropsTable rows={entry.props} />
      </section>
    </article>
  )
}

function Missing({ slug }: { slug: string }) {
  return (
    <div className="max-w-xl">
      <h1 className="font-serif text-4xl">No component named {slug}</h1>
      <p className="mt-3 text-nx-muted">
        The registry names are the hash of each page. Start with the{' '}
        <a className="text-nx-accent underline-offset-4 hover:underline" href="#draggable-card">
          draggable card
        </a>
        .
      </p>
    </div>
  )
}
