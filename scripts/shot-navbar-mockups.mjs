#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync, statSync, rmSync } from 'node:fs'
import { resolve, join } from 'node:path'
import { pathToFileURL } from 'node:url'

const dir = resolve('docs/library/navbar/mockups')
const files = [
  '01-pill.html',
  '02-banner.html',
  '03-tabs.html',
  '04-clinic.html',
  '05-league.html',
  '06-pop.html',
  '07-mega.html',
  '08-command.html',
  '09-follow.html',
  '10-crumb.html',
  '11-kiln.html',
  '12-split.html',
  '13-island.html',
  '14-curtain.html',
  '15-dock.html',
  '16-rail.html',
  '17-folio.html',
  '18-portal.html',
]

function shot(url, dest, index) {
  const profile = `/tmp/chrome-nav-mock-${index}-${Date.now()}`
  mkdirSync(profile, { recursive: true })
  return new Promise((done) => {
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
        '--virtual-time-budget=6000',
        '--timeout=20000',
        `--screenshot=${dest}`,
        url,
      ],
      { stdio: 'ignore' },
    )
    const t = setTimeout(() => child.kill('SIGKILL'), 25000)
    child.on('close', () => {
      clearTimeout(t)
      try {
        rmSync(profile, { recursive: true, force: true })
      } catch {
        /* ignore */
      }
      const ok = existsSync(dest) && statSync(dest).size > 20000
      console.log(ok ? `OK  ${dest}` : `FAIL ${dest}`)
      done(ok)
    })
  })
}

for (let i = 0; i < files.length; i += 3) {
  await Promise.all(
    files.slice(i, i + 3).map((file, j) => {
      const url = pathToFileURL(join(dir, file)).href
      const dest = join(dir, file.replace('.html', '.png'))
      return shot(url, dest, i + j)
    }),
  )
}
