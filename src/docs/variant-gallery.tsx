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
  items: VariantDoc[]
  render: (id: string) => ReactNode
  previewClassName?: string
}) {
  return (
    <div className="grid gap-4">
      {items.map((item) => (
        <article key={item.id} id={item.id} className="overflow-hidden rounded-3xl border border-white/10 bg-[#0c0d14]">
          <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-white/10 px-4 py-3">
            <h3 className="font-mono text-sm text-[#f5c16c]">
              {item.name} <span className="text-zinc-500">/ {item.id}</span>
            </h3>
            <p className="max-w-xl text-sm text-zinc-300">{item.description}</p>
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
    <div className="flex items-start justify-between gap-3 border-t border-white/10 bg-black/30 px-4 py-3">
      <pre className="overflow-x-auto text-xs leading-5 text-zinc-200">
        <code>{code}</code>
      </pre>
      <button
        type="button"
        className="h-8 shrink-0 rounded-full border border-white/15 px-3 text-xs text-zinc-100 hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8b7cff]"
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
