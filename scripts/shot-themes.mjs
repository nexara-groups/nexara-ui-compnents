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
]

const profile = `/tmp/chrome-theme-shot-${Date.now()}`
const port = 9333
const chrome = launchChrome({ profile, port, headless: true })

try {
  const cdp = await connectCdp(port)
  await cdp.send('Page.enable')
  for (const [name, hash, width, height, mobile, scrollY] of shots) {
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
    await sleep(400)
    const shot = await cdp.send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: false })
    writeFileSync(`${out}/${name}.png`, Buffer.from(shot.data, 'base64'))
    console.log(name, shot.data.length)
  }
  cdp.close()
} finally {
  killChrome(chrome, profile)
}
