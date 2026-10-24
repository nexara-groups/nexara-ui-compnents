import { useEffect, useMemo, useState, type ReactNode } from 'react'
import { catalog, categories, type CatalogEntry } from '@/docs/catalog.tsx'
import { VariantGallery } from '@/docs/variant-gallery.tsx'
import { variantDocs } from '@/docs/variant-meta.ts'
import { renderVariantPreview } from '@/docs/previews.tsx'
import { FamilyStudio } from '@/docs/studio.tsx'
import { libraryMeta, renderLibrary } from '@/docs/library-meta.ts'
import { cn } from '@/lib/utils.ts'

function readHash() {
  const value = window.location.hash.replace(/^#/, '')
  return value.split('/')[0] || 'hero'
}

function useSlug() {
  const [slug, setSlug] = useState(readHash)

  useEffect(() => {
    if (!window.location.hash) {
      window.history.replaceState(null, '', '#hero')
    }
    const sync = () => setSlug(readHash())
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])

  return slug
}

function Preview({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d14] shadow-[0_30px_80px_-48px_rgba(0,0,0,0.9)]">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5">
        <div className="flex items-center gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[#ff6a3d]" />
          <span className="size-2.5 rounded-full bg-[#f5c16c]" />
          <span className="size-2.5 rounded-full bg-[#3ddec4]" />
        </div>
        <span className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">Live preview</span>
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
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">Usage</span>
        <button
          type="button"
          onClick={() => void copy()}
          className="h-8 rounded-full border border-white/15 px-3 text-xs text-zinc-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function PropsTable({ rows }: { rows: CatalogEntry['props'] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[40rem] border-collapse text-left text-sm">
        <thead className="bg-white/[0.03] text-xs tracking-[0.14em] text-zinc-400 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-white/10 align-top">
              <td className="px-4 py-3 font-mono text-[13px] text-[#f5c16c]">{row.name}</td>
              <td className="px-4 py-3 font-mono text-[12px] text-zinc-300">{row.type}</td>
              <td className="px-4 py-3 text-zinc-400">{row.defaultValue ?? '—'}</td>
              <td className="px-4 py-3 text-zinc-200">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function DocsApp() {
  const slug = useSlug()
  const [query, setQuery] = useState('')
  const entry = catalog.find((item) => item.slug === slug)

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase()
    if (!needle) return catalog
    return catalog.filter((item) =>
      [item.name, item.slug, item.category, item.description].join(' ').toLowerCase().includes(needle),
    )
  }, [query])

  return (
    <div className="min-h-screen bg-[#09090f] text-[#f6f3ec]">
      <a
        href="#component-main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-[#f6f3ec] focus:px-4 focus:py-2 focus:text-[#16140f]"
      >
        Skip to component
      </a>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a href="#hero" className="group flex items-center gap-3">
            <span className="inline-flex size-9 items-center justify-center rounded-xl border border-white/15 bg-white/[0.03] font-serif text-lg">
              N
            </span>
            <span>
              <span className="block font-serif text-xl leading-none tracking-tight">Nexara UI</span>
              <span className="mt-1 block text-xs text-zinc-400">Copy-paste components for agents and people</span>
            </span>
          </a>
          <div className="flex items-center gap-3 text-sm">
            <a
              href="#themes"
              className="rounded-full border border-white/15 px-3 py-1.5 text-[#f6f3ec] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
            >
              Themes
            </a>
            <a
              href="#flagship"
              className="rounded-full border border-white/15 px-3 py-1.5 text-[#f6f3ec] hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
            >
              Helio flagship
            </a>
            <p className="hidden text-zinc-400 sm:block">{catalog.length} components</p>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-7xl md:grid-cols-[16.5rem_minmax(0,1fr)]">
        <aside className="border-white/10 px-4 py-4 md:sticky md:top-0 md:h-screen md:overflow-auto md:border-r md:px-4 md:py-6">
          <label className="mb-4 block md:hidden">
            <span className="sr-only">Jump to a component</span>
            <select
              value={entry?.slug ?? 'hero'}
              onChange={(event) => {
                window.location.hash = event.target.value
              }}
              className="h-11 w-full rounded-2xl border border-white/15 bg-[#12131c] px-3 text-sm"
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
              className="h-10 w-full rounded-full border border-white/15 bg-transparent px-3 text-sm outline-none placeholder:text-zinc-500 focus:ring-2 focus:ring-[#8b7cff]"
            />
          </label>
          <nav className="hidden md:block" aria-label="Components">
            {categories.map((category) => {
              const items = filtered.filter((item) => item.category === category)
              if (items.length === 0) return null
              return (
                <div key={category} className="mb-5">
                  <p className="mb-2 px-3 text-[11px] tracking-[0.18em] text-zinc-500 uppercase">{category}</p>
                  <ul className="space-y-1">
                    {items.map((item) => {
                      const current = item.slug === slug
                      return (
                        <li key={item.slug}>
                          <a
                            href={`#${item.slug}`}
                            aria-current={current ? 'page' : undefined}
                            className={cn(
                              'block rounded-xl px-3 py-2 text-sm text-zinc-300 hover:bg-white/5 hover:text-[#f6f3ec]',
                              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]',
                              current && 'bg-white/10 text-[#f6f3ec]',
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
            {filtered.length === 0 ? <p className="px-3 text-sm text-zinc-400">No components match.</p> : null}
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
  if (entry.studio) {
    const meta = libraryMeta[entry.slug]
    return (
      <FamilyStudio
        key={entry.slug}
        family={entry.slug}
        title={entry.name}
        description={entry.description}
        path={entry.path}
        dependencies={entry.dependencies}
        variants={meta?.variants ?? []}
        props={entry.props}
        render={(id) => renderLibrary(entry.slug, id)}
        usage={(id) => meta?.usage(id) ?? entry.usage}
      />
    )
  }
  const Demo = entry.Demo
  return (
    <article className="space-y-8">
      <header className="max-w-3xl">
        <p className="text-[11px] tracking-[0.2em] text-[#f5c16c] uppercase">{entry.category}</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">{entry.name}</h1>
        <p className="mt-3 text-base leading-7 text-zinc-300">{entry.description}</p>
      </header>
      {variantDocs[entry.slug as keyof typeof variantDocs] ? (
        <section className="space-y-3">
          <h2 className="font-serif text-2xl">Variants</h2>
          <p className="text-sm leading-6 text-zinc-300">
            Ask for <span className="text-[#f6f3ec]">{entry.slug} / {variantDocs[entry.slug as keyof typeof variantDocs]?.[0]?.id ?? 'variant'}</span> or
            any id below. Each block is a live preview and a copyable usage line.
          </p>
          <VariantGallery
            items={variantDocs[entry.slug as keyof typeof variantDocs] ?? []}
            render={(id) => renderVariantPreview(entry.slug, id)}
          />
        </section>
      ) : (
        <p className="text-sm text-zinc-300">
          Full assembled site:{' '}
          <a className="text-[#f5c16c] underline-offset-4 hover:underline" href="#flagship">
            #flagship
          </a>
          {' · '}
          <a className="text-[#f5c16c] underline-offset-4 hover:underline" href="#flagship-dashboard">
            #flagship-dashboard
          </a>
        </p>
      )}
      <Preview>
        <Demo />
      </Preview>
      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Install by copying</h2>
        <p className="text-sm leading-6 text-zinc-300">
          Copy <code className="text-[#f6f3ec]">{entry.path}</code> and{' '}
          <code className="text-[#f6f3ec]">src/lib/utils.ts</code>. Dependencies:{' '}
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
      <p className="mt-3 text-zinc-300">
        The registry names are the hash of each page. Start with the{' '}
        <a className="text-[#f5c16c] underline-offset-4 hover:underline" href="#hero">
          hero
        </a>
        .
      </p>
    </div>
  )
}
