import { mkdirSync, writeFileSync } from 'node:fs'
import { spawnSync } from 'node:child_process'
import { connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.THEME_ORIGIN ?? 'http://127.0.0.1:5173'
const out = 'docs/themes/proof/clips'
mkdirSync(out, { recursive: true })

const profile = `/tmp/chrome-bold-clips-${Date.now()}`
const port = 9557
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
  await sleep(700)
  let n = 0
  const shooting = (async () => {
    for (; n < frames; n += 1) await grab(cdp, dir, n)
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
  const kits = ['lagoon', 'strike', 'orrery', 'rally', 'array']
  for (const id of kits) {
    await record(cdp, {
      name: `${id}-kit`,
      hash: `themes/shot/${id}/dark`,
      width: 1280,
      height: 800,
      mobile: false,
      run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(3600), awaitPromise: true }),
    })
  }
  await record(cdp, {
    name: 'animations-library',
    hash: 'themes/shot/animations/dark',
    width: 1280,
    height: 800,
    mobile: false,
    run: (page) => page.send('Runtime.evaluate', { expression: scrollExpression(4000), awaitPromise: true }),
  })
  await record(cdp, {
    name: 'compare-button',
    hash: 'themes/shot/compare/dark',
    width: 1440,
    height: 900,
    mobile: false,
    frames: 36,
    run: async (page) => {
      const expression = `new Promise(async (ok) => {
        const buttons = [...document.querySelectorAll('[data-compare="button"]')]
        for (const button of buttons) {
          button.dispatchEvent(new MouseEvent('mouseenter', { bubbles: true }))
          button.focus()
          await new Promise((r) => setTimeout(r, 500))
        }
        ok(buttons.length)
      })`
      await page.send('Runtime.evaluate', { expression, awaitPromise: true })
    },
  })
  await record(cdp, {
    name: 'compare-toast',
    hash: 'themes/shot/compare/dark',
    width: 1440,
    height: 900,
    mobile: false,
    frames: 36,
    run: async (page) => {
      const expression = `new Promise(async (ok) => {
        const buttons = [...document.querySelectorAll('[data-compare="toast"]')]
        for (const button of buttons) button.click()
        await new Promise((r) => setTimeout(r, 1200))
        ok(buttons.length)
      })`
      await page.send('Runtime.evaluate', { expression, awaitPromise: true })
    },
  })
  await record(cdp, {
    name: 'compare-modal',
    hash: 'themes/shot/compare/dark',
    width: 1440,
    height: 900,
    mobile: false,
    frames: 36,
    run: async (page) => {
      const expression = `new Promise(async (ok) => {
        const buttons = [...document.querySelectorAll('[data-compare="modal"]')]
        for (const button of buttons) button.click()
        await new Promise((r) => setTimeout(r, 900))
        ok(buttons.length)
      })`
      await page.send('Runtime.evaluate', { expression, awaitPromise: true })
    },
  })
  cdp.close()
} finally {
  killChrome(chrome, profile)
}
