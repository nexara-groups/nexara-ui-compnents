'use client'

import { AnimationLibrary } from '@/themes/animations/library.tsx'
import { exportTheme, THEME_IDS, THEME_SLOTS, type ThemeColors, type ThemeDefinition, type ThemeId, type ThemeScheme, type ThemeSelection, type ThemeSlot } from '@/themes/contract.ts'
import { ThemeEditor } from '@/themes/kit/editor.tsx'
import { ThemeStage } from '@/themes/kit/stage.tsx'
import { themeDocs } from '@/themes/meta.ts'
import { MixPage, mixSelection, slotThemes, ThemeBlock, ThemeCompose } from '@/themes/pages.tsx'
import { ThemeProvider } from '@/themes/provider.tsx'
import { riversideMix, themeList, themes } from '@/themes/themes.ts'
import { cn } from '@/lib/utils.ts'
import { useEffect, useMemo, useState, type ReactNode } from 'react'

type Route =
  | { page: 'overview' }
  | { page: 'builder' }
  | { page: 'editor' }
  | { page: 'animations' }
  | { page: 'mix' }
  | { page: 'all' }
  | { page: 'kit'; theme: ThemeId }
  | { page: 'theme'; theme: ThemeId; slot?: ThemeSlot }

function parseRoute(hash: string): Route {
  const [, a, b] = hash.replace(/^#/, '').split('/')
  if (a === 'builder') return { page: 'builder' }
  if (a === 'editor') return { page: 'editor' }
  if (a === 'animations') return { page: 'animations' }
  if (a === 'mix') return { page: 'mix' }
  if (a === 'all') return { page: 'all' }
  if (a && (THEME_IDS as readonly string[]).includes(a)) {
    const theme = a as ThemeId
    if (b === 'kit') return { page: 'kit', theme }
    const slot = THEME_SLOTS.find((item) => item === b)
    return { page: 'theme', theme, slot }
  }
  return { page: 'overview' }
}

function useRoute() {
  const [route, setRoute] = useState<Route>(() => parseRoute(window.location.hash))
  useEffect(() => {
    const sync = () => setRoute(parseRoute(window.location.hash))
    window.addEventListener('hashchange', sync)
    return () => window.removeEventListener('hashchange', sync)
  }, [])
  return route
}

const nav = [
  { href: '#themes', label: 'Overview' },
  { href: '#themes/all', label: 'All components' },
  { href: '#themes/builder', label: 'Theme builder' },
  { href: '#themes/editor', label: 'Live editor' },
  { href: '#themes/animations', label: 'Animations' },
  { href: '#themes/mix', label: 'Mix demo' },
]

export function ThemesApp() {
  const route = useRoute()
  const [scheme, setScheme] = useState<ThemeScheme>('light')
  const [filter, setFilter] = useState<ThemeId | 'all'>('all')

  return (
    <div className="min-h-screen bg-[#09090f] text-[#f6f3ec]">
      <a href="#themes-main" className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-[#f6f3ec] focus:px-3 focus:py-2 focus:text-[#16140f]">
        Skip to content
      </a>
      <header className="border-b border-white/10">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
          <a href="#themes" className="no-underline">
            <span className="block font-serif text-xl">Nexara UI</span>
            <span className="text-xs text-zinc-400">Themes</span>
          </a>
          <div className="flex items-center gap-2 text-sm">
            <a className="rounded-full border border-white/15 px-3 py-1.5 no-underline" href="#hero">
              Legacy
            </a>
            <SchemeSwitch scheme={scheme} onChange={setScheme} />
          </div>
        </div>
      </header>
      <div className="mx-auto grid max-w-7xl md:grid-cols-[16rem_minmax(0,1fr)]">
        <aside className="border-white/10 px-4 py-4 md:sticky md:top-0 md:h-screen md:overflow-auto md:border-r md:py-6">
          <nav aria-label="Themes" className="space-y-5">
            <ul className="space-y-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a className="block rounded-xl px-3 py-2 text-sm text-zinc-300 no-underline hover:bg-white/5" href={item.href}>
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            {themeList.map((theme) => (
              <div key={theme.id}>
                <a className="px-3 text-[11px] tracking-[0.18em] text-zinc-500 uppercase no-underline" href={`#themes/${theme.id}`}>
                  {theme.name}
                </a>
                <ul className="mt-2 space-y-1">
                  <li>
                    <a className="block rounded-xl px-3 py-1.5 text-sm text-zinc-300 no-underline hover:bg-white/5" href={`#themes/${theme.id}`}>
                      Full page
                    </a>
                  </li>
                  {theme.personality ? (
                    <li>
                      <a className="block rounded-xl px-3 py-1.5 text-sm text-zinc-300 no-underline hover:bg-white/5" href={`#themes/${theme.id}/kit`}>
                        Kit
                      </a>
                    </li>
                  ) : null}
                  {themeDocs
                    .filter((doc) => doc.theme === theme.id)
                    .map((doc) => (
                      <li key={doc.slot}>
                        <a className="block rounded-xl px-3 py-1.5 text-sm text-zinc-300 no-underline hover:bg-white/5" href={`#themes/${theme.id}/${doc.slot}`}>
                          {doc.title}
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            ))}
          </nav>
        </aside>
        <main id="themes-main" className="min-w-0 px-4 py-8 md:px-8 md:py-10">
          {route.page === 'overview' ? <Overview /> : null}
          {route.page === 'all' ? <AllComponents filter={filter} onFilter={setFilter} scheme={scheme} /> : null}
          {route.page === 'mix' ? <MixView scheme={scheme} /> : null}
          {route.page === 'builder' ? <Builder /> : null}
          {route.page === 'editor' ? <ThemeEditor /> : null}
          {route.page === 'animations' ? <AnimationLibrary /> : null}
          {route.page === 'kit' ? <KitView id={route.theme} scheme={scheme} /> : null}
          {route.page === 'theme' ? <ThemeView id={route.theme} slot={route.slot} scheme={scheme} /> : null}
        </main>
      </div>
    </div>
  )
}

function SchemeSwitch({ scheme, onChange }: { scheme: ThemeScheme; onChange: (scheme: ThemeScheme) => void }) {
  return (
    <div className="flex rounded-full border border-white/15 p-0.5" role="group" aria-label="Color scheme">
      {(['light', 'dark'] as const).map((item) => (
        <button
          key={item}
          type="button"
          aria-pressed={scheme === item}
          onClick={() => onChange(item)}
          className={cn('h-8 rounded-full px-3 text-xs capitalize', scheme === item && 'bg-white/10')}
        >
          {item}
        </button>
      ))}
    </div>
  )
}

function Overview() {
  return (
    <article className="space-y-8">
      <header className="max-w-3xl">
        <p className="text-[11px] tracking-[0.2em] text-[#f5c16c] uppercase">Themes</p>
        <h1 className="mt-2 font-serif text-4xl tracking-tight md:text-5xl">Five motion languages. One contract.</h1>
        <p className="mt-3 text-base leading-7 text-zinc-300">
          Lagoon, Strike, Orrery, Rally, and Array each move differently. The live editor retints inside a contrast guard. The earlier beige themes stay in the catalogue as legacy pages.
        </p>
      </header>
      <div className="grid gap-4 md:grid-cols-2">
        {themeList.map((theme) => (
          <a key={theme.id} href={`#themes/${theme.id}`} className="rounded-3xl border border-white/10 p-5 no-underline hover:bg-white/5">
            <p className="font-serif text-2xl text-[#f6f3ec]">{theme.name}</p>
            <p className="mt-2 text-sm leading-6 text-zinc-300">{theme.mood}</p>
            <p className="mt-3 text-xs tracking-[0.14em] text-zinc-500 uppercase">{theme.verticals.join(' · ')}</p>
          </a>
        ))}
      </div>
    </article>
  )
}

function ThemeView({ id, slot, scheme }: { id: ThemeId; slot?: ThemeSlot; scheme: ThemeScheme }) {
  const theme = themes[id]
  const doc = themeDocs.find((item) => item.theme === id && item.slot === slot)
  if (doc) {
    return (
      <article className="space-y-6">
        <header>
          <p className="text-[11px] tracking-[0.2em] text-[#f5c16c] uppercase">
            {theme.name} / {doc.slot}
          </p>
          <h1 className="mt-2 font-serif text-4xl">{doc.title}</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">{doc.description}</p>
        </header>
        <Frame scheme={scheme} theme={theme}>
          <ThemeBlock theme={id} slot={doc.slot} />
        </Frame>
        <Usage code={doc.usage} />
        <Props rows={doc.props} />
      </article>
    )
  }
  if (theme.personality) {
    return (
      <article className="space-y-6">
        <header>
          <p className="text-[11px] tracking-[0.2em] text-[#f5c16c] uppercase">{theme.motion.id}</p>
          <h1 className="mt-2 font-serif text-4xl">{theme.name}</h1>
          <p className="mt-3 max-w-2xl text-zinc-300">{theme.mood}</p>
        </header>
        <Frame scheme={scheme} theme={theme}>
          <ThemeStage mode="landing" />
        </Frame>
      </article>
    )
  }
  const selection = Object.fromEntries(
    THEME_SLOTS.filter((item) => slotThemes[item].includes(id)).map((item) => [item, id]),
  ) as ThemeSelection
  return (
    <article className="space-y-6">
      <header>
        <p className="text-[11px] tracking-[0.2em] text-[#f5c16c] uppercase">{theme.motion.id}</p>
        <h1 className="mt-2 font-serif text-4xl">{theme.name}</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">{theme.mood}</p>
        <p className="mt-2 text-sm text-zinc-400">
          {theme.type.display.split(',')[0]} · radius {theme.radius} · {theme.texture}
        </p>
        <a className="mt-4 inline-block text-sm text-[#f5c16c] no-underline" href={`#themes/shot/${id}/${scheme}`}>
          Open the full page
        </a>
      </header>
      <Swatches theme={theme} scheme={scheme} />
      <Frame scheme={scheme} theme={theme}>
        {id === 'quarry' ? (
          <p className="px-6 py-16 text-sm" style={{ color: 'var(--nx-muted)' }}>
            Quarry is tokenised. Its sections are the next build. The lid, the ink button, and the patina rule are in the contract.
          </p>
        ) : (
          <ThemeCompose theme={theme} scheme={scheme} selection={selection} />
        )}
      </Frame>
    </article>
  )
}

function AllComponents({
  filter,
  onFilter,
  scheme,
}: {
  filter: ThemeId | 'all'
  onFilter: (filter: ThemeId | 'all') => void
  scheme: ThemeScheme
}) {
  const docs = themeDocs.filter((doc) => filter === 'all' || doc.theme === filter)
  return (
    <article className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">All components</h1>
        <label className="mt-4 block text-sm text-zinc-300">
          Theme
          <select
            className="mt-2 block h-11 rounded-full border border-white/15 bg-transparent px-3"
            value={filter}
            onChange={(event) => onFilter(event.target.value as ThemeId | 'all')}
          >
            <option value="all">All themes</option>
            {themeList.map((theme) => (
              <option key={theme.id} value={theme.id}>
                {theme.name}
              </option>
            ))}
          </select>
        </label>
      </header>
      {docs.map((doc) => (
        <section key={`${doc.theme}-${doc.slot}`} className="space-y-3">
          <h2 className="font-serif text-2xl">
            <a className="no-underline" href={`#themes/${doc.theme}/${doc.slot}`}>
              {doc.theme} / {doc.slot}
            </a>
          </h2>
          <Frame scheme={scheme} theme={themes[doc.theme]}>
            <ThemeBlock theme={doc.theme} slot={doc.slot} />
          </Frame>
        </section>
      ))}
    </article>
  )
}

function KitView({ id, scheme }: { id: ThemeId; scheme: ThemeScheme }) {
  const theme = themes[id]
  return (
    <article className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">{theme.name} kit</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">Forms, buttons, overlays, and feedback in this theme’s motion. Labels stay still.</p>
      </header>
      <Frame scheme={scheme} theme={theme}>
        <ThemeStage mode="kit" />
      </Frame>
    </article>
  )
}

function MixView({ scheme }: { scheme: ThemeScheme }) {
  return (
    <article className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Mix demo</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Riverside Athletic borrows Programme’s masthead and fixture list, Fieldnote’s spec hero and footer, and Triplicate’s filing sheet. One token set retints the tape, the stripe, and the button.
        </p>
        <a className="mt-3 inline-block text-sm text-[#f5c16c]" href={`#themes/shot/mix/${scheme}`}>
          Open the full page
        </a>
      </header>
      <Frame scheme={scheme} theme={riversideMix}>
        <MixPage scheme={scheme} />
      </Frame>
    </article>
  )
}

function Builder() {
  const [name, setName] = useState('Custom')
  const [scheme, setScheme] = useState<ThemeScheme>('light')
  const [base, setBase] = useState<ThemeDefinition>(riversideMix)
  const [selection, setSelection] = useState<ThemeSelection>(mixSelection)
  const [copied, setCopied] = useState(false)
  const colors = base.colors[scheme]
  const keys: (keyof ThemeColors)[] = ['bg', 'fg', 'muted', 'accent', 'accentFg', 'surface', 'mark', 'plate']

  const payload = useMemo(() => JSON.stringify(exportTheme(name, base, scheme, selection), null, 2), [name, base, scheme, selection])

  function paint(key: keyof ThemeColors, value: string) {
    setBase((current) => ({
      ...current,
      colors: { ...current.colors, [scheme]: { ...current.colors[scheme], [key]: value } },
    }))
  }

  return (
    <article className="space-y-6">
      <header>
        <h1 className="font-serif text-4xl">Theme builder</h1>
        <p className="mt-3 max-w-2xl text-zinc-300">
          Choose a component for each slot, retint the contract, and copy the theme config with the component list.
        </p>
      </header>
      <div className="grid gap-3 md:grid-cols-2">
        <label className="text-sm text-zinc-300">
          Name
          <input className="mt-1 h-11 w-full rounded-2xl border border-white/15 bg-transparent px-3" value={name} onChange={(event) => setName(event.target.value)} />
        </label>
        <div className="self-end">
          <SchemeSwitch scheme={scheme} onChange={setScheme} />
        </div>
        {THEME_SLOTS.map((slot) => (
          <label key={slot} className="text-sm text-zinc-300 capitalize">
            {slot}
            <select
              className="mt-1 h-11 w-full rounded-2xl border border-white/15 bg-[#12131c] px-3"
              value={selection[slot]}
              onChange={(event) => setSelection((current) => ({ ...current, [slot]: event.target.value as ThemeId }))}
            >
              {slotThemes[slot].map((theme) => (
                <option key={theme} value={theme}>
                  {theme}
                </option>
              ))}
            </select>
          </label>
        ))}
        {keys.map((key) => (
          <label key={key} className="text-sm text-zinc-300">
            {key}
            <input
              type="color"
              className="mt-1 h-11 w-full bg-transparent"
              value={toColorInput(colors[key] || '#000000')}
              onChange={(event) => paint(key, event.target.value)}
            />
          </label>
        ))}
      </div>
      <Frame scheme={scheme} theme={base}>
        <ThemeCompose theme={base} scheme={scheme} selection={selection} />
      </Frame>
      <Usage code={payload} label={copied ? 'Copied' : 'Copy export'} onCopy={() => setCopied(true)} />
    </article>
  )
}

function toColorInput(value: string) {
  return /^#[0-9a-fA-F]{6}$/.test(value) ? value : '#000000'
}

function Frame({ theme, scheme, children }: { theme: ThemeDefinition; scheme: ThemeScheme; children: ReactNode }) {
  return (
    <ThemeProvider theme={theme} scheme={scheme} className="overflow-hidden rounded-3xl border border-white/10">
      {children}
    </ThemeProvider>
  )
}

function Swatches({ theme, scheme }: { theme: ThemeDefinition; scheme: ThemeScheme }) {
  const colors = theme.colors[scheme]
  return (
    <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
      {(Object.keys(colors) as (keyof ThemeColors)[]).map((key) => (
        <li key={key} className="rounded-2xl border border-white/10 p-3 text-xs">
          <span className="mb-2 block h-8 rounded" style={{ background: colors[key] }} />
          <span className="text-zinc-400">{key}</span>
          <span className="mt-1 block font-mono text-zinc-200">{colors[key]}</span>
        </li>
      ))}
    </ul>
  )
}

function Usage({ code, label = 'Copy', onCopy }: { code: string; label?: string; onCopy?: () => void }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40">
      <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
        <span className="text-[11px] tracking-[0.16em] text-zinc-400 uppercase">Usage</span>
        <button
          type="button"
          className="h-8 rounded-full border border-white/15 px-3 text-xs"
          onClick={() => {
            void navigator.clipboard.writeText(code)
            setCopied(true)
            onCopy?.()
          }}
        >
          {copied ? 'Copied' : label}
        </button>
      </div>
      <pre className="overflow-x-auto p-4 text-sm leading-6 text-zinc-200">
        <code>{code}</code>
      </pre>
    </div>
  )
}

function Props({ rows }: { rows: { name: string; type: string; description: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border border-white/10">
      <table className="w-full min-w-[36rem] text-left text-sm">
        <thead className="text-xs tracking-[0.14em] text-zinc-400 uppercase">
          <tr>
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-t border-white/10">
              <td className="px-4 py-3 font-mono text-[#f5c16c]">{row.name}</td>
              <td className="px-4 py-3 font-mono text-xs text-zinc-300">{row.type}</td>
              <td className="px-4 py-3 text-zinc-200">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
