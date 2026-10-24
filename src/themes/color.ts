/** Relative luminance and WCAG contrast. The editor uses this guard and nothing else. */

function channel(value: number) {
  const c = value / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function luminance(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16)
  return 0.2126 * channel(n >> 16) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
}

export function contrast(a: string, b: string) {
  const x = luminance(a)
  const y = luminance(b)
  return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05)
}

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value))
}

export function hexToHsv(hex: string) {
  const n = Number.parseInt(hex.slice(1), 16)
  const r = ((n >> 16) & 255) / 255
  const g = ((n >> 8) & 255) / 255
  const b = (n & 255) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  let h = 0
  if (delta !== 0) {
    if (max === r) h = ((g - b) / delta) % 6
    else if (max === g) h = (b - r) / delta + 2
    else h = (r - g) / delta + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: max === 0 ? 0 : delta / max, v: max }
}

export function hsvToHex(h: number, s: number, v: number) {
  const hue = ((h % 360) + 360) % 360
  const sat = clamp01(s)
  const val = clamp01(v)
  const c = val * sat
  const x = c * (1 - Math.abs(((hue / 60) % 2) - 1))
  const m = val - c
  let r = 0
  let g = 0
  let b = 0
  if (hue < 60) [r, g, b] = [c, x, 0]
  else if (hue < 120) [r, g, b] = [x, c, 0]
  else if (hue < 180) [r, g, b] = [0, c, x]
  else if (hue < 240) [r, g, b] = [0, x, c]
  else if (hue < 300) [r, g, b] = [x, 0, c]
  else [r, g, b] = [c, 0, x]
  const channelHex = (value: number) => Math.round((value + m) * 255).toString(16).padStart(2, '0')
  return `#${channelHex(r)}${channelHex(g)}${channelHex(b)}`
}

export type GuardedColors = {
  bg: string
  fg: string
  surface: string
  accent: string
  accentFg: string
  mark: string
  success: string
  warn: string
  danger: string
}

/** Returns the previous colors when a pair fails. Text is 4.5:1. Marks and the accent body are 3:1. */
export function guardColors<T extends GuardedColors>(next: T, prev: T): { colors: T; reason: string | null } {
  const text: [string, string, string][] = [
    ['text on background', next.fg, next.bg],
    ['text on surface', next.fg, next.surface],
    ['accent text on accent', next.accentFg, next.accent],
  ]
  for (const [name, a, b] of text) {
    const ratio = contrast(a, b)
    if (ratio < 4.5) return { colors: prev, reason: `${name} is ${ratio.toFixed(2)}:1. Needs 4.5:1.` }
  }
  const marks: [string, string, string][] = [
    ['accent on background', next.accent, next.bg],
    ['accent on surface', next.accent, next.surface],
  ]
  for (const key of ['mark', 'success', 'warn', 'danger'] as const) {
    marks.push([`${key} on background`, next[key], next.bg])
    marks.push([`${key} on surface`, next[key], next.surface])
    marks.push([`${key} on text`, next[key], next.fg])
  }
  for (const [name, a, b] of marks) {
    const ratio = contrast(a, b)
    if (ratio < 3) return { colors: prev, reason: `${name} is ${ratio.toFixed(2)}:1. Needs 3:1.` }
  }
  return { colors: next, reason: null }
}
