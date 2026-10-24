import { mkdirSync, writeFileSync } from 'node:fs'
import { connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.THEME_ORIGIN ?? 'http://127.0.0.1:5173'
const throttle = Number(process.env.THEME_CPU ?? 4)
const sampleMs = 4000
const pages = ['fieldnote', 'programme', 'mix']
const profile = `/tmp/chrome-theme-perf-${Date.now()}`
const port = 9445
const chrome = launchChrome({ profile, port, headless: true })

const probe = `(() => {
  const state = { frames: 0, longs: [], start: performance.now() }
  const loop = () => { state.frames += 1; state.raf = requestAnimationFrame(loop) }
  state.raf = requestAnimationFrame(loop)
  try {
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) state.longs.push(entry.duration)
    }).observe({ type: 'longtask', buffered: false })
  } catch {}
  const start = performance.now()
  const scroll = (now) => {
    const p = Math.min(1, (now - start) / ${sampleMs})
    window.scrollTo(0, p * Math.max(0, document.body.scrollHeight - innerHeight))
    if (p < 1) requestAnimationFrame(scroll)
  }
  requestAnimationFrame(scroll)
  window.__themePerf = state
  return true
})()`

const read = `(() => {
  const s = window.__themePerf
  const elapsed = performance.now() - s.start
  cancelAnimationFrame(s.raf)
  return {
    elapsed,
    frames: s.frames,
    fps: s.frames / (elapsed / 1000),
    longTasks: s.longs.length,
    maxLongMs: s.longs.length ? Math.max(...s.longs) : 0,
  }
})()`

const rows = []
try {
  const cdp = await connectCdp(port)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  await cdp.send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 800, deviceScaleFactor: 1, mobile: false })
  await cdp.send('Emulation.setCPUThrottlingRate', { rate: throttle })
  for (const id of pages) {
    await cdp.send('Page.navigate', { url: `${origin}/#themes/shot/${id}/light` })
    await sleep(1000)
    await cdp.send('Runtime.evaluate', { expression: probe })
    await sleep(sampleMs + 300)
    const result = await cdp.send('Runtime.evaluate', { expression: read, returnByValue: true })
    const value = result.result.value
    const row = {
      page: id,
      cpuThrottle: throttle,
      fps: Number(value.fps.toFixed(1)),
      frames: value.frames,
      longTasks: value.longTasks,
      maxLongMs: Number(value.maxLongMs.toFixed(1)),
    }
    rows.push(row)
    console.log(`${id.padEnd(12)} ${row.fps} fps  longs ${row.longTasks}  max ${row.maxLongMs}ms`)
  }
  cdp.close()
} finally {
  killChrome(chrome, profile)
}

mkdirSync('docs/themes/proof', { recursive: true })
writeFileSync('docs/themes/proof/perf.json', JSON.stringify({ throttle, sampleMs, rows }, null, 2) + '\n')
