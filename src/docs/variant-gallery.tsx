import { useState, type ReactNode } from 'react'
import { WOW_VARIANTS } from '@/lib/wow-variants.ts'

const PIN_IDS = new Set([
  'pin-scroll',
  'pin-steps',
  'pin-story',
  'scrub-essay',
  'scrub-timeline',
  'launch-scrub',
  'scrub-bars',
  'pin-sports',
  'scroll-film',
])

export type VariantDoc = {
  id: string
  name: string
  description: string
  usage: string
}

export function VariantGallery({
  items,
  render,
  previewClassName = '',
  family,
}: {
  items: readonly VariantDoc[]
  render: (id: string) => ReactNode
  previewClassName?: string
  family?: string
}) {
  const signatures = family ? new Set<string>(WOW_VARIANTS[family as keyof typeof WOW_VARIANTS] ?? []) : new Set<string>()
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article
          key={item.id}
          id={item.id}
          className={PIN_IDS.has(item.id) ? 'rounded-3xl border border-nx-border bg-nx-card' : 'overflow-hidden rounded-3xl border border-nx-border bg-nx-card'}
        >
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-nx-border px-4 py-3">
            <h3 className="font-mono text-sm text-nx-accent">
              {item.name} <span className="text-nx-muted">/ {item.id}</span>
              {signatures.has(item.id) ? (
                <span className="ml-2 rounded-full bg-[#111113] px-2 py-0.5 text-[10px] tracking-[0.16em] text-[#f3c27a] uppercase">
                  Signature
                </span>
              ) : null}
            </h3>
            <p className="max-w-xl text-sm text-nx-muted">{item.description}</p>
          </div>
          <div className={PIN_IDS.has(item.id) ? 'max-h-[80vh] overflow-y-auto p-4 md:p-6' : `p-4 md:p-6 ${previewClassName}`}>
            {render(item.id)}
          </div>
          <Usage code={item.usage} />
        </article>
      ))}
    </div>
  )
}

function Usage({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="flex items-start justify-between gap-3 border-t border-nx-border bg-nx-bg/50 px-4 py-3">
      <pre className="overflow-x-auto text-xs leading-5 text-nx-muted">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-nx-border px-3 text-xs text-nx-fg hover:bg-nx-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring"
        onClick={() => {
          void navigator.clipboard.writeText(code).then(() => {
            setCopied(true)
            window.setTimeout(() => setCopied(false), 1200)
          })
        }}
      >
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  )
}
