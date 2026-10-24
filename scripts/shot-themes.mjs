import { mkdirSync, writeFileSync } from 'node:fs'
import { connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.THEME_ORIGIN ?? 'http://127.0.0.1:5173'
const out = 'docs/themes/proof'
mkdirSync(out, { recursive: true })

const shots = [
  ['fieldnote-desktop', 'themes/shot/fieldnote/light', 1280, 800, false, 0],
  ['fieldnote-mobile', 'themes/shot/fieldnote/light', 375, 812, true, 0],
  ['programme-desktop', 'themes/shot/programme/light', 1280, 800, false, 0],
  ['programme-mobile', 'themes/shot/programme/light', 375, 812, true, 0],
  ['mix-desktop', 'themes/shot/mix/light', 1280, 800, false, 0],
  ['mix-mobile', 'themes/shot/mix/light', 375, 812, true, 0],
  ['fieldnote-dark', 'themes/shot/fieldnote/dark', 1280, 800, false, 0],
  ['programme-dark', 'themes/shot/programme/dark', 1280, 800, false, 0],
  ['fieldnote-pricing', 'themes/shot/fieldnote/light', 1280, 800, false, 2200],
  ['programme-pricing', 'themes/shot/programme/light', 1280, 800, false, 1800],
  ['lagoon-desktop', 'themes/shot/lagoon/dark', 1280, 800, false, 0],
  ['lagoon-mobile', 'themes/shot/lagoon/dark', 375, 812, true, 0],
  ['strike-desktop', 'themes/shot/strike/dark', 1280, 800, false, 0],
  ['strike-mobile', 'themes/shot/strike/dark', 375, 812, true, 0],
  ['orrery-desktop', 'themes/shot/orrery/dark', 1280, 800, false, 0],
  ['orrery-mobile', 'themes/shot/orrery/dark', 375, 812, true, 0],
  ['rally-desktop', 'themes/shot/rally/dark', 1280, 800, false, 0],
  ['rally-mobile', 'themes/shot/rally/dark', 375, 812, true, 0],
  ['array-desktop', 'themes/shot/array/dark', 1280, 800, false, 0],
  ['array-mobile', 'themes/shot/array/dark', 375, 812, true, 0],
  ['editor-desktop', 'themes/shot/editor/dark', 1280, 900, false, 0],
  ['editor-mobile', 'themes/shot/editor/dark', 375, 812, true, 0],
  ['compare-desktop', 'themes/shot/compare/dark', 1440, 900, false, 0],
  ['animations-desktop', 'themes/shot/animations/dark', 1280, 800, false, 0],
  ['lagoon-form', 'themes/shot/lagoon/dark/form', 1280, 900, false, 0, '', true],
  ['lagoon-form-mobile', 'themes/shot/lagoon/dark/form', 375, 812, true, 0],
  ['strike-form', 'themes/shot/strike/dark/form', 1280, 900, false, 0, '', true],
  ['strike-form-mobile', 'themes/shot/strike/dark/form', 375, 812, true, 0],
  ['orrery-form', 'themes/shot/orrery/dark/form', 1280, 900, false, 0, '', true],
  ['orrery-form-mobile', 'themes/shot/orrery/dark/form', 375, 812, true, 0],
  ['rally-form', 'themes/shot/rally/dark/form', 1280, 900, false, 0, '', true],
  ['rally-form-mobile', 'themes/shot/rally/dark/form', 375, 812, true, 0],
  ['array-form', 'themes/shot/array/dark/form', 1280, 900, false, 0, '', true],
  ['array-form-mobile', 'themes/shot/array/dark/form', 375, 812, true, 0],
  ['lagoon-modal', 'themes/shot/lagoon/dark', 1280, 800, false, 0, '[data-theme-stage] button'],
  ['strike-modal', 'themes/shot/strike/dark', 1280, 800, false, 0, '[data-theme-stage] button'],
  ['orrery-modal', 'themes/shot/orrery/dark', 1280, 800, false, 0, '[data-theme-stage] button'],
  ['rally-modal', 'themes/shot/rally/dark', 1280, 800, false, 0, '[data-theme-stage] button'],
  ['array-modal', 'themes/shot/array/dark', 1280, 800, false, 0, '[data-theme-stage] button'],
  ['lagoon-toast', 'themes/shot/lagoon/dark/form', 1280, 800, false, 0, 'form button[type="submit"]'],
  ['strike-light', 'themes/shot/strike/light', 1280, 800, false, 0],
  ['rally-light', 'themes/shot/rally/light', 1280, 800, false, 0],
  ['orrery-light', 'themes/shot/orrery/light', 1280, 800, false, 0],
]

const only = (process.env.THEME_ONLY ?? '').split(',').map((item) => item.trim()).filter(Boolean)
const selected = only.length ? shots.filter((shot) => only.some((name) => shot[0] === name || shot[0].startsWith(`${name}-`) || shot[0].startsWith(name))) : shots

const profile = `/tmp/chrome-theme-shot-${Date.now()}`
const port = 9333
const chrome = launchChrome({ profile, port, headless: true })

try {
  const cdp = await connectCdp(port)
  await cdp.send('Page.enable')
  for (const [name, hash, width, height, mobile, scrollY, click, full] of selected) {
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width,
      height,
      deviceScaleFactor: 1,
      mobile,
    })
    await cdp.send('Page.navigate', { url: `${origin}/#${hash}` })
    await sleep(900)
    if (scrollY) {
      await cdp.send('Runtime.evaluate', { expression: `window.scrollTo(0, ${scrollY})` })
      await sleep(400)
    }
    await cdp.send('Runtime.evaluate', {
      expression: `document.fonts ? document.fonts.ready : Promise.resolve()`,
      awaitPromise: true,
    })
    if (click) {
      await cdp.send('Runtime.evaluate', { expression: `document.querySelector(${JSON.stringify(click)})?.click()`, awaitPromise: true })
      await sleep(500)
    }
    await sleep(400)
    let shot
    if (full) {
      const metrics = await cdp.send('Page.getLayoutMetrics')
      const content = metrics.cssContentSize ?? metrics.contentSize
      const clip = { x: 0, y: 0, width: Math.min(content.width, width), height: Math.min(content.height, 4200), scale: 1 }
      shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip })
    } else {
      shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    }
    writeFileSync(`${out}/${name}.png`, Buffer.from(shot.data, 'base64'))
    console.log(name, shot.data.length)
  }
  cdp.close()
} finally {
  killChrome(chrome, profile)
}
