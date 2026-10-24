'use client'

import { guardColors, hexToHsv, hsvToHex, type GuardedColors } from '@/themes/color.ts'
import { themeToStyle, type MotionIntensity, type ThemeDefinition, type ThemeScheme } from '@/themes/contract.ts'
import { ThemeStage } from '@/themes/kit/stage.tsx'
import { ThemeProvider } from '@/themes/provider.tsx'
import { boldThemes } from '@/themes/bold.ts'
import { useEffect, useId, useMemo, useState, type PointerEvent } from 'react'

const pairs = ['lagoon', 'strike', 'orrery', 'rally', 'array'] as const
type Preview = 'landing' | 'dashboard' | 'form'
type Preset = {
  themeId: (typeof pairs)[number]
  scheme: ThemeScheme
  intensity: MotionIntensity
  colors: GuardedColors
  radius: number
  pair: (typeof pairs)[number]
}
type Width = 375 | 768 | 1280

function guarded(theme: ThemeDefinition, scheme: ThemeScheme): GuardedColors {
  const c = theme.colors[scheme]
  return {
    bg: c.bg,
    fg: c.fg,
    surface: c.surface,
    accent: c.accent,
    accentFg: c.accentFg,
    mark: c.mark,
    success: c.success ?? c.mark,
    warn: c.warn ?? c.mark,
    danger: c.danger ?? c.mark,
  }
}

export function ThemeEditor() {
  const [themeId, setThemeId] = useState<(typeof pairs)[number]>('lagoon')
  const [scheme, setScheme] = useState<ThemeScheme>('dark')
  const [intensity, setIntensity] = useState<MotionIntensity>('rich')
  const [density, setDensity] = useState(1)
  const [preview, setPreview] = useState<Preview>('landing')
  const [width, setWidth] = useState<Width>(1280)
  const [pair, setPair] = useState<(typeof pairs)[number]>('lagoon')
  const [radius, setRadius] = useState(22)
  const [reason, setReason] = useState<string | null>(null)
  const [presets, setPresets] = useState<Preset[]>([])
  const base = boldThemes.find((item) => item.id === themeId) ?? boldThemes[0]
  const [colors, setColors] = useState(() => guarded(base, 'dark'))

  useEffect(() => {
    const saved = window.localStorage.getItem('nx-theme-presets')
    if (saved) {
      const parsed = JSON.parse(saved) as Array<Preset | string>
      setPresets(parsed.map((item) => (typeof item === 'string' ? JSON.parse(item) as Preset : item)))
    }
  }, [])

  function loadTheme(id: (typeof pairs)[number], nextScheme = scheme) {
    const next = boldThemes.find((item) => item.id === id) ?? boldThemes[0]
    setThemeId(id)
    setPair(id)
    setColors(guarded(next, nextScheme))
    setRadius(Number.parseFloat(next.radius))
    setReason(null)
  }

  const theme = useMemo(() => {
    const source = boldThemes.find((item) => item.id === pair) ?? base
    return {
      ...base,
      type: source.type,
      radius: `${clampRadius(base, radius)}px`,
      colors: {
        ...base.colors,
        [scheme]: { ...base.colors[scheme], ...colors },
      },
    }
  }, [base, colors, pair, radius, scheme])

  function paint(key: keyof GuardedColors, value: string) {
    const next = { ...colors, [key]: value }
    const result = guardColors(next, colors)
    setColors(result.colors)
    setReason(result.reason)
    return result.reason === null
  }

  function savePreset() {
    const entry: Preset = { themeId, scheme, intensity, colors, radius, pair }
    const next = [...presets, entry].slice(-8)
    setPresets(next)
    window.localStorage.setItem('nx-theme-presets', JSON.stringify(next))
  }

  function applyPreset(entry: Preset) {
    const next = boldThemes.find((item) => item.id === entry.themeId) ?? boldThemes[0]
    const fallback = guarded(next, entry.scheme)
    const result = guardColors(entry.colors, fallback)
    setThemeId(entry.themeId)
    setScheme(entry.scheme)
    setIntensity(entry.intensity)
    setPair(pairs.includes(entry.pair as (typeof pairs)[number]) ? entry.pair as (typeof pairs)[number] : entry.themeId)
    setRadius(clampRadius(next, entry.radius))
    setColors(result.colors)
    setReason(result.reason)
  }

  const css = Object.entries(themeToStyle(theme, scheme)).map(([key, value]) => `${key}: ${value};`).join('\n')
  const ts = JSON.stringify({ name: theme.name, scheme, intensity, colors, type: theme.type, radius: theme.radius, personality: theme.personality }, null, 2)

  return (
    <div className="space-y-6 text-zinc-100">
      <header>
        <h1 className="font-serif text-4xl">Live theme editor</h1>
        <p className="mt-2 max-w-2xl text-zinc-300">Pick a theme, then edit the guarded colors, a clamped radius, one of the five type pairs, density, and motion intensity. A pair that fails contrast snaps back.</p>
      </header>
      <div className="grid gap-3 md:grid-cols-3">
        <label className="text-sm">Theme
          <select className="mt-1 h-11 w-full border border-white/15 bg-transparent px-2" value={themeId} onChange={(event) => loadTheme(event.target.value as (typeof pairs)[number])}>
            {pairs.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>
        <label className="text-sm">Type pair
          <select className="mt-1 h-11 w-full border border-white/15 bg-transparent px-2" value={pair} onChange={(event) => setPair(event.target.value as (typeof pairs)[number])}>
            {pairs.map((id) => <option key={id} value={id}>{id}</option>)}
          </select>
        </label>
        <label className="text-sm">Motion
          <select className="mt-1 h-11 w-full border border-white/15 bg-transparent px-2" value={intensity} onChange={(event) => setIntensity(event.target.value as MotionIntensity)}>
            <option value="off">off</option>
            <option value="subtle">subtle</option>
            <option value="rich">rich</option>
          </select>
        </label>
        {(Object.keys(colors) as (keyof GuardedColors)[]).map((key) => (
          <GuardedColor key={key} name={key} value={colors[key]} onChange={(value) => paint(key, value)} />
        ))}
        <label className="text-sm">Radius {theme.radius}
          <input className="mt-1 w-full" type="range" min={base.radiusClamp?.[0] ?? 0} max={base.radiusClamp?.[1] ?? 24} value={radius} onChange={(event) => setRadius(clampRadius(base, Number(event.target.value)))} />
        </label>
        <label className="text-sm">Density {density.toFixed(2)}
          <input className="mt-1 w-full" type="range" min={0.85} max={1.2} step={0.05} value={density} onChange={(event) => setDensity(Number(event.target.value))} />
        </label>
      </div>
      {reason ? <p role="status" className="text-sm text-[#f5c16c]">{reason}</p> : null}
      <div className="flex flex-wrap gap-2">
        {(['dark', 'light'] as const).map((item) => (
          <button key={item} type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} aria-pressed={scheme === item} onClick={() => { setScheme(item); loadTheme(themeId, item) }}>{item}</button>
        ))}
        {([375, 768, 1280] as const).map((item) => (
          <button key={item} type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} aria-pressed={width === item} onClick={() => setWidth(item)}>{item === 375 ? 'Mobile' : item === 768 ? 'Tablet' : 'Desktop'}</button>
        ))}
        {(['landing', 'dashboard', 'form'] as const).map((item) => (
          <button key={item} type="button" className="h-11 px-3 capitalize" style={{ border: '1px solid rgba(255,255,255,0.2)' }} aria-pressed={preview === item} onClick={() => setPreview(item)}>{item}</button>
        ))}
        <button type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => loadTheme(themeId)}>Reset</button>
        <button type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} onClick={savePreset}>Save preset</button>
        {presets.map((entry, index) => (
          <button key={`${entry.themeId}-${index}`} type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => applyPreset(entry)}>
            {entry.themeId} {index + 1}
          </button>
        ))}
        <button type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => void navigator.clipboard.writeText(css)}>Copy CSS</button>
        <button type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => void navigator.clipboard.writeText(ts)}>Copy TS</button>
        <button type="button" className="h-11 px-3" style={{ border: '1px solid rgba(255,255,255,0.2)' }} onClick={() => download('theme.json', ts)}>Download</button>
      </div>
      <div className="mx-auto overflow-hidden border border-white/10" style={{ width: width === 1280 ? '100%' : width, maxWidth: '100%' }}>
        <ThemeProvider theme={theme} scheme={scheme} intensity={intensity} density={density}>
          <ThemeStage mode={preview === 'form' ? 'form' : preview} />
        </ThemeProvider>
      </div>
    </div>
  )
}

function GuardedColor({ name, value, onChange }: { name: string; value: string; onChange: (value: string) => boolean }) {
  const id = useId()
  const hsv = hexToHsv(value)
  const [hex, setHex] = useState(value)
  const [seen, setSeen] = useState(value)
  if (seen !== value) {
    setSeen(value)
    setHex(value)
  }

  function commitHsv(h: number, s: number, v: number) {
    onChange(hsvToHex(h, s, v))
  }

  function point(event: PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    if (rect.width === 0 || rect.height === 0) return
    const s = Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width))
    const v = Math.min(1, Math.max(0, 1 - (event.clientY - rect.top) / rect.height))
    commitHsv(hsv.h, s, v)
  }

  return (
    <div className="text-sm">
      <span className="mb-1 block" id={`${id}-name`}>{name}</span>
      <div
        role="slider"
        tabIndex={0}
        aria-label={`${name} square`}
        aria-describedby={`${id}-square`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(hsv.v * 100)}
        aria-valuetext={`saturation ${Math.round(hsv.s * 100)}, brightness ${Math.round(hsv.v * 100)}`}
        className="relative mt-1 h-28 w-full touch-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        style={{
          backgroundColor: `hsl(${hsv.h} 100% 50%)`,
          backgroundImage: 'linear-gradient(to top, #000, transparent), linear-gradient(to right, #fff, transparent)',
        }}
        onPointerDown={(event) => {
          event.currentTarget.setPointerCapture(event.pointerId)
          point(event)
        }}
        onPointerMove={(event) => {
          if (event.currentTarget.hasPointerCapture(event.pointerId)) point(event)
        }}
        onKeyDown={(event) => {
          const step = event.shiftKey ? 0.1 : 0.04
          if (event.key === 'ArrowLeft') commitHsv(hsv.h, hsv.s - step, hsv.v)
          else if (event.key === 'ArrowRight') commitHsv(hsv.h, hsv.s + step, hsv.v)
          else if (event.key === 'ArrowDown') commitHsv(hsv.h, hsv.s, hsv.v - step)
          else if (event.key === 'ArrowUp') commitHsv(hsv.h, hsv.s, hsv.v + step)
          else return
          event.preventDefault()
        }}
      >
        <span
          aria-hidden
          className="absolute h-3 w-3"
          style={{
            left: `${hsv.s * 100}%`,
            top: `${(1 - hsv.v) * 100}%`,
            transform: 'translate(-50%, -50%)',
            border: '2px solid #fff',
            outline: '1px solid #111',
            borderRadius: 999,
          }}
        />
      </div>
      <span id={`${id}-square`} className="sr-only">Left and right change saturation. Up and down change brightness.</span>
      <input
        className="mt-2 h-11 w-full"
        type="range"
        min={0}
        max={360}
        step={1}
        aria-label={`${name} hue`}
        value={Math.round(hsv.h)}
        onChange={(event) => commitHsv(Number(event.target.value), hsv.s, hsv.v)}
      />
      <input
        className="mt-2 h-11 w-full border border-white/20 bg-transparent px-2"
        style={{ color: 'inherit' }}
        aria-label={`${name} hex`}
        spellCheck={false}
        value={hex}
        onChange={(event) => {
          const next = event.target.value
          setHex(next)
          if (!/^#[0-9a-fA-F]{6}$/.test(next)) return
          if (!onChange(next.toLowerCase())) setHex(value)
        }}
      />
    </div>
  )
}

function clampRadius(theme: ThemeDefinition, value: number) {
  const [min, max] = theme.radiusClamp ?? [0, 24]
  return Math.min(max, Math.max(min, value))
}

function download(name: string, body: string) {
  const blob = new Blob([body], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = name
  link.click()
  URL.revokeObjectURL(url)
}
