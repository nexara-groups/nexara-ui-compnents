import { NX_PRESET_META, NX_PRESETS, NxTheme, type NxPreset, type NxScheme } from '@/lib/theme.tsx'
import { NX_TIERS, type NxTier, type VariantMeta } from '@/lib/library.ts'
import { cn } from '@/lib/utils.ts'
import { useEffect, useMemo, useState, type ReactNode } from 'react'
import type { PropRow } from '@/docs/catalog.tsx'

export function FamilyStudio({
  family,
  title,
  description,
  path,
  dependencies,
  variants,
  props,
  render,
  usage,
}: {
  family: string
  title: string
  description: string
  path: string
  dependencies: string[]
  variants: VariantMeta[]
  props: PropRow[]
  render: (id: string) => ReactNode
  usage: (id: string) => string
}) {
  const hashVariant = readVariant(family)
  const [tier, setTier] = useState<NxTier | 'all'>('all')
  const [variant, setVariant] = useState(hashVariant ?? variants[0]?.id ?? '')
  const [preset, setPreset] = useState<NxPreset>('heliograph')
  const [scheme, setScheme] = useState<NxScheme | undefined>(undefined)

  useEffect(() => {
    const next = readVariant(family)
    if (next && variants.some((item) => item.id === next)) setVariant(next)
    const sync = () => {
      const found = readVariant(family)
      if (found && variants.some((item) => item.id === found)) setVariant(found)
    }
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [family, variants])

  const visible = useMemo(
    () => variants.filter((item) => tier === 'all' || item.tier === tier),
    [tier, variants],
  )
  const current = variants.find((item) => item.id === variant) ?? visible[0] ?? variants[0]
  const code = current ? usage(current.id) : ''

  return (
    <article className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="max-w-2xl">
          <p className="text-[11px] tracking-[0.2em] text-[#f5c16c] uppercase">Library · {family}</p>
          <h1 className="mt-1 font-serif text-3xl tracking-tight md:text-4xl">{title}</h1>
          <p className="mt-2 text-sm leading-6 text-zinc-300">{description}</p>
        </div>
        {current ? (
          <p className="text-sm text-zinc-400">
            <span className="font-mono text-[#f5c16c]">
              {family} / {current.id}
            </span>
            <span className="mx-2 text-zinc-600">·</span>
            {current.note}
          </p>
        ) : null}
      </header>

      <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Tier filter">
        {(['all', ...NX_TIERS] as const).map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={tier === item}
            onClick={() => setTier(item)}
            className={cn(
              'h-8 rounded-full border border-white/15 px-2.5 text-[10px] tracking-[0.14em] uppercase',
              tier === item && 'bg-white/10',
            )}
          >
            {item}
          </button>
        ))}
        <span className="mx-1 h-4 w-px bg-white/10" aria-hidden="true" />
        {NX_PRESETS.map((item) => (
          <button
            key={item}
            type="button"
            aria-pressed={preset === item}
            onClick={() => setPreset(item)}
            className={cn('h-8 rounded-full border border-white/15 px-2.5 text-[10px]', preset === item && 'bg-white/10')}
          >
            {NX_PRESET_META[item].title}
          </button>
        ))}
        <button
          type="button"
          className="h-8 rounded-full border border-white/15 px-2.5 text-[10px]"
          onClick={() => setScheme((value) => (value === 'light' ? 'dark' : value === 'dark' ? undefined : 'light'))}
        >
          {scheme ?? 'token'}
        </button>
      </div>

      <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Variants">
        {visible.map((item) => (
          <a
            key={item.id}
            href={`#${family}/${item.id}`}
            role="tab"
            aria-selected={current?.id === item.id}
            onClick={() => setVariant(item.id)}
            className={cn(
              'h-8 rounded-full border border-white/15 px-2.5 font-mono text-[11px]',
              current?.id === item.id ? 'bg-white/10 text-[#f5c16c]' : 'text-zinc-300',
            )}
          >
            {item.id}
          </a>
        ))}
      </div>

      <div id="nx-preview" className="overflow-hidden rounded-3xl border border-white/10">
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
          <span className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">Live preview</span>
          <span className="font-mono text-[11px] text-zinc-500">
            {family} / {current?.id} · {current?.tier}
          </span>
        </div>
        <NxTheme preset={preset} scheme={scheme}>
          <div className="min-h-[22rem]">{current ? render(current.id) : null}</div>
        </NxTheme>
      </div>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Copy</h2>
        <p className="text-sm text-zinc-300">
          Copy <code className="text-[#f6f3ec]">{path}</code>
          {family === 'hero'
            ? ', hero-layouts.tsx, hero-scene.tsx, src/lib/hero-media.ts,'
            : ','}{' '}
          <code className="text-[#f6f3ec]">src/lib/utils.ts</code>,{' '}
          <code className="text-[#f6f3ec]">src/lib/library.ts</code>,{' '}
          <code className="text-[#f6f3ec]">src/lib/kit.tsx</code>, and <code className="text-[#f6f3ec]">src/lib/theme.tsx</code>.
          Dependencies: {dependencies.join(', ')}.
          {family === 'hero' ? (
            <>
              {' '}
              Packaged stills live in <code className="text-[#f6f3ec]">public/library/hero/</code>.
            </>
          ) : null}
        </p>
        <CodeBlock code={code} />
      </section>

      <section className="space-y-3">
        <h2 className="font-serif text-2xl">Props</h2>
        <PropsTable rows={props} />
      </section>
    </article>
  )
}

function readVariant(family: string) {
  const hash = window.location.hash.replace(/^#/, '')
  const [slug, variant] = hash.split('/')
  return slug === family ? variant : undefined
}

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">Usage</span>
        <button
          type="button"
          onClick={() => {
            void navigator.clipboard.writeText(code).then(() => {
              setCopied(true)
              window.setTimeout(() => setCopied(false), 1400)
            })
          }}
          className="h-8 rounded-full border border-white/15 px-3 text-xs"
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

function PropsTable({ rows }: { rows: PropRow[] }) {
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
