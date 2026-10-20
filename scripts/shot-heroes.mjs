#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, rmSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const out = resolve(root, 'docs/library/hero/implemented')
mkdirSync(out, { recursive: true })

const variants = [
  'aurora',
  'brutal',
  'pastel',
  'editorial',
  'spotlight',
  'bento',
  'terminal',
  'cursor',
  'helix',
  'cinema',
  'atlas',
  'reveal',
  'rotate',
  'veil',
  'splice',
  'mesh',
  'glyph',
  'fan',
  'ribbon',
  'converse',
  'assemble',
  'iso',
  'league',
  'pop',
]

const phones = ['aurora', 'brutal', 'pastel']
const origin = process.env.HERO_SHOT_ORIGIN ?? 'http://127.0.0.1:5173'

function chromeShot(url, dest, size, index) {
  const profile = `/tmp/chrome-hero-${index}-${Date.now()}`
  mkdirSync(profile, { recursive: true })
  const [w, h] = size
  return new Promise((done) => {
    const child = spawn(
      'google-chrome',
      [
        '--headless=new',
        '--no-sandbox',
        '--hide-scrollbars',
        '--disable-dev-shm-usage',
        '--run-all-compositor-stages-before-draw',
        `--user-data-dir=${profile}`,
        `--window-size=${w},${h}`,
        '--force-device-scale-factor=1',
        '--virtual-time-budget=8000',
        '--timeout=20000',
        `--screenshot=${dest}`,
        url,
      ],
      { stdio: 'ignore' },
    )
    const t = setTimeout(() => child.kill('SIGKILL'), 28000)
    child.on('close', () => {
      clearTimeout(t)
      try {
        rmSync(profile, { recursive: true, force: true })
      } catch {
        /* ignore */
      }
      const ok = existsSync(dest) && statSync(dest).size > 30000
      console.log(ok ? `OK  ${dest} (${statSync(dest).size})` : `FAIL ${dest}`)
      done(ok)
    })
  })
}

async function batch(items, size) {
  for (let i = 0; i < items.length; i += size) {
    await Promise.all(items.slice(i, i + size).map((item) => item()))
  }
}

await batch(
  variants.map(
    (id, i) => () => chromeShot(`${origin}/#shot/${id}`, resolve(out, `${id}-desktop.png`), [1440, 900], i),
  ),
  3,
)

await batch(
  phones.map(
    (id, i) => () => chromeShot(`${origin}/#shot/${id}`, resolve(out, `${id}-phone.png`), [390, 844], 100 + i),
  ),
  3,
)
