import { mkdirSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.THEME_ORIGIN ?? 'http://127.0.0.1:5173'
const out = 'docs/themes/proof/clips'
mkdirSync(out, { recursive: true })

const profile = `/tmp/chrome-theme-clips-${Date.now()}`
const port = 9556
const chrome = launchChrome({ profile, port, headless: true })

function scrollExpression(ms) {
  return `new Promise((ok) => {
    const start = performance.now()
    const step = (now) => {
      const p = Math.min(1, (now - start) / ${ms})
      const max = Math.max(0, document.body.scrollHeight - innerHeight)
      window.scrollTo(0, p * max)
      if (p < 1) requestAnimationFrame(step)
      else ok(true)
    }
    requestAnimationFrame(step)
  })`
}

async function grab(cdp, dir, n) {
  const shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 60, captureBeyondViewport: false })
  writeFileSync(`${dir}/${String(n).padStart(4, '0')}.jpg`, Buffer.from(shot.data, 'base64'))
}

async function record(cdp, { name, hash, width, height, mobile, frames = 48, run }) {
  const dir = `/tmp/theme-frames/${name}`
  mkdirSync(dir, { recursive: true })
  await cdp.send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile })
  await cdp.send('Page.navigate', { url: `${origin}/#${hash}` })
  await sleep(500)
  let n = 0
  const shooting = (async () => {
    for (; n < frames; n += 1) {
      await grab(cdp, dir, n)
    }
  })()
  await run(cdp)
  await shooting
  const target = `${out}/${name}.mp4`
  const result = spawnSync(
    'ffmpeg',
    ['-y', '-framerate', '12', '-i', `${dir}/%04d.jpg`, '-vf', 'scale=trunc(iw/2)*2:trunc(ih/2)*2', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', target],
    { stdio: 'ignore' },
  )
  console.log(name, 'ffmpeg', result.status)
}

try {
  const cdp = await connectCdp(port)
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')

  await record(cdp, {
    name: 'fieldnote-scroll',
    hash: 'themes/shot/fieldnote/light',
    width: 1280,
    height: 800,
    mobile: false,
    run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(4000), awaitPromise: true }),
  })

  await record(cdp, {
    name: 'fieldnote-tape',
    hash: 'themes/shot/fieldnote/light',
    width: 1280,
    height: 800,
    mobile: false,
    run: async (page) => {
      const expression = `new Promise(async (ok) => {
        const rows = [...document.querySelectorAll('[data-mark] button')]
        for (const row of rows) {
          row.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
          row.focus()
          await new Promise((r) => setTimeout(r, 700))
        }
        ok(rows.length)
      })`
      await page.send('Runtime.evaluate', { expression, awaitPromise: true })
    },
  })

  await record(cdp, {
    name: 'fieldnote-mobile',
    hash: 'themes/shot/fieldnote/light',
    width: 375,
    height: 812,
    mobile: true,
    run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(4000), awaitPromise: true }),
  })

  await record(cdp, {
    name: 'programme-scroll',
    hash: 'themes/shot/programme/light',
    width: 1280,
    height: 800,
    mobile: false,
    run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(4000), awaitPromise: true }),
  })

  await record(cdp, {
    name: 'programme-open',
    hash: 'themes/shot/programme/light',
    width: 1280,
    height: 800,
    mobile: false,
    run: () => sleep(2200),
  })

  await record(cdp, {
    name: 'programme-mobile',
    hash: 'themes/shot/programme/light',
    width: 375,
    height: 812,
    mobile: true,
    run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(4000), awaitPromise: true }),
  })

  await record(cdp, {
    name: 'mix-scroll',
    hash: 'themes/shot/mix/light',
    width: 1280,
    height: 800,
    mobile: false,
    run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(4500), awaitPromise: true }),
  })

  await record(cdp, {
    name: 'mix-file',
    hash: 'themes/shot/mix/light',
    width: 1280,
    height: 800,
    mobile: false,
    run: async (page) => {
      const expression = `new Promise(async (ok) => {
        document.querySelector('#register')?.scrollIntoView({ block: 'center' })
        await new Promise((r) => setTimeout(r, 400))
        const inputs = [...document.querySelectorAll('#register input')]
        const values = ['Ada Marsh', 'Under 12']
        inputs.forEach((input, index) => {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value').set
          setter.call(input, values[index] ?? 'Yes')
          input.dispatchEvent(new Event('input', { bubbles: true }))
        })
        await new Promise((r) => setTimeout(r, 500))
        document.querySelector('#register button[type="submit"]')?.click()
        await new Promise((r) => setTimeout(r, 900))
        ok(true)
      })`
      await page.send('Runtime.evaluate', { expression, awaitPromise: true })
    },
  })

  cdp.close()
} finally {
  killChrome(chrome, profile)
}
