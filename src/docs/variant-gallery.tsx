import { useState, type ReactNode } from 'react'

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
}: {
  items: readonly VariantDoc[]
  render: (id: string) => ReactNode
  previewClassName?: string
}) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article key={item.id} id={item.id} className="overflow-hidden rounded-3xl border border-nx-border bg-nx-card">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-nx-border px-4 py-3">
            <h3 className="font-mono text-sm text-nx-accent">
              {item.name} <span className="text-nx-faint">/ {item.id}</span>
            </h3>
            <p className="max-w-xl text-sm text-nx-muted">{item.description}</p>
          </div>
          <div className={`p-4 md:p-6 ${previewClassName}`}>{render(item.id)}</div>
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
        className="h-8 shrink-0 rounded-full border border-nx-border px-3 text-xs text-nx-fg hover:bg-nx-soft focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-nx-ring"
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
