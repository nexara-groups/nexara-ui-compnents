#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync, statSync, rmSync } from 'node:fs'
import { join, resolve } from 'node:path'

const dir = resolve('docs/library/hero/mockups')
const out = resolve('docs/library/hero/mockups')
const files = [
  '01-aurora.html',
  '02-spotlight.html',
  '03-helix.html',
  '04-brutal.html',
  '05-bento.html',
  '06-cinema.html',
  '07-editorial.html',
  '08-terminal.html',
  '09-atlas.html',
  '10-pastel.html',
  '11-cursor.html',
  '12-reveal.html',
]

function shot(url, dest, index) {
  const profile = `/tmp/chrome-mock-${index}-${Date.now()}`
  mkdirSync(profile, { recursive: true })
  return new Promise((resolvePromise) => {
    const child = spawn(
      'google-chrome',
      [
        '--headless=new',
        '--disable-gpu',
        '--no-sandbox',
        '--hide-scrollbars',
        '--disable-dev-shm-usage',
        `--user-data-dir=${profile}`,
        '--window-size=1440,900',
        '--force-device-scale-factor=1',
        '--virtual-time-budget=8000',
        '--timeout=18000',
        `--screenshot=${dest}`,
        url,
      ],
      { stdio: 'ignore' },
    )
    const t = setTimeout(() => child.kill('SIGKILL'), 24000)
    child.on('close', () => {
      clearTimeout(t)
      try {
        rmSync(profile, { recursive: true, force: true })
      } catch {
        /* ignore */
      }
      const ok = existsSync(dest) && statSync(dest).size > 20000
      console.log(ok ? `OK  ${dest}` : `FAIL ${dest}`)
      resolvePromise(ok)
    })
  })
}

for (let i = 0; i < files.length; i++) {
  const file = files[i]
  const url = `file://${join(dir, file)}`
  const dest = join(out, file.replace('.html', '.png'))
  await shot(url, dest, i)
}
