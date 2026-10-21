#!/usr/bin/env node
import { writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { attachPage, connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.HERO_SHOT_ORIGIN ?? 'http://127.0.0.1:5173'
const throttle = Number(process.env.HERO_CPU_THROTTLE ?? 4)
const sampleMs = Number(process.env.HERO_PERF_MS ?? 4000)
const variants = (
  process.env.HERO_PERF_VARIANTS ??
  'aurora,cinema,cursor,atlas,mesh,fan,ribbon,converse,assemble,veil,rotate,pop,league,iso,helix,glyph'
).split(',')

const profile = `/tmp/chrome-hero-perf-${Date.now()}`
const port = 9444
const chrome = launchChrome({ profile, port, headless: true })

const probe = `(() => {
  const state = { frames: 0, longs: [], start: performance.now() }
  const loop = () => { state.frames += 1; state.raf = requestAnimationFrame(loop) }
  state.raf = requestAnimationFrame(loop)
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) state.longs.push({ d: entry.duration, t: entry.startTime })
    }).observe({ type: 'longtask', buffered: false })
  } catch (e) {}
  window.__heroPerf = state
  return true
})()`

const read = `(() => {
  const s = window.__heroPerf
  if (!s) return { ok: false }
  const elapsed = performance.now() - s.start
  cancelAnimationFrame(s.raf)
  const durations = s.longs.map((x) => x.d)
  return {
    ok: true,
    elapsed,
    frames: s.frames,
    fps: s.frames / (elapsed / 1000),
    longTasks: s.longs.length,
    maxLongMs: durations.length ? Math.max(...durations) : 0,
    sumLongMs: durations.reduce((a, b) => a + b, 0),
  }
})()`

const rows = []
try {
  const cdp = await connectCdp(port)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle })
  for (const id of variants) {
    await attachPage(cdp, `${origin}/?h=${id}#shot/${id}`)
    await cdp.send('Runtime.evaluate', { expression: probe, returnByValue: true })
    await sleep(sampleMs)
    const result = await cdp.send('Runtime.evaluate', { expression: read, returnByValue: true })
    const value = result?.result?.value ?? { ok: false }
    const row = {
      variant: id,
      cpuThrottle: throttle,
      fps: value.fps ? Number(value.fps.toFixed(1)) : null,
      frames: value.frames ?? 0,
      elapsedMs: value.elapsed ? Math.round(value.elapsed) : sampleMs,
      longTasks: value.longTasks ?? null,
      maxLongMs: value.maxLongMs ? Number(value.maxLongMs.toFixed(1)) : 0,
      sumLongMs: value.sumLongMs ? Number(value.sumLongMs.toFixed(1)) : 0,
    }
    rows.push(row)
    console.log(
      `${id.padEnd(10)}  ${String(row.fps).padStart(5)} fps  longs ${String(row.longTasks).padStart(3)}  max ${String(row.maxLongMs).padStart(6)}ms`,
    )
  }
  cdp.close()
} finally {
  killChrome(chrome, profile)
}

const summary = {
  cpuThrottle: throttle,
  sampleMs,
  measuredAt: new Date().toISOString(),
  rows,
  meanFps: Number((rows.reduce((a, r) => a + (r.fps ?? 0), 0) / Math.max(1, rows.length)).toFixed(1)),
  totalLongTasks: rows.reduce((a, r) => a + (r.longTasks ?? 0), 0),
}
const dest = resolve('docs/library/hero/perf.json')
writeFileSync(dest, JSON.stringify(summary, null, 2))
console.log(`wrote ${dest} mean ${summary.meanFps} fps, ${summary.totalLongTasks} long tasks`)
