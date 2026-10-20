#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, existsSync, statSync, rmSync } from 'node:fs'
import { resolve } from 'node:path'

const origin = process.env.HERO_SHOT_ORIGIN ?? 'http://127.0.0.1:5173'
const out = resolve('docs/library/hero/implemented')
mkdirSync(out, { recursive: true })

const clips = ['aurora', 'cinema', 'cursor', 'atlas']

function run(cmd, args, extra = {}) {
  return new Promise((done, fail) => {
    const child = spawn(cmd, args, { stdio: extra.stdio ?? 'ignore', env: { ...process.env, DISPLAY: ':1' }, ...extra })
    const t = setTimeout(() => child.kill('SIGKILL'), extra.timeout ?? 20000)
    child.on('close', (code) => {
      clearTimeout(t)
      done(code)
    })
    child.on('error', fail)
  })
}

for (const id of clips) {
  const profile = `/tmp/chrome-clip-${id}-${Date.now()}`
  mkdirSync(profile, { recursive: true })
  const dest = resolve(out, `${id}-motion.webm`)
  const chrome = spawn(
    'google-chrome',
    [
      `--user-data-dir=${profile}`,
      '--no-first-run',
      '--no-default-browser-check',
      '--disable-infobars',
      '--disable-session-crashed-bubble',
      '--window-size=1440,900',
      '--window-position=0,0',
      `--app=${origin}/#shot/${id}`,
    ],
    { env: { ...process.env, DISPLAY: ':1' }, stdio: 'ignore' },
  )
  await new Promise((r) => setTimeout(r, 3500))
  await run('ffmpeg', [
    '-y',
    '-f',
    'x11grab',
    '-video_size',
    '1440x900',
    '-framerate',
    '30',
    '-i',
    ':1+0,0',
    '-t',
    '4',
    '-an',
    '-c:v',
    'libvpx-vp9',
    '-b:v',
    '2M',
    '-pix_fmt',
    'yuv420p',
    dest,
  ], { timeout: 18000 })
  chrome.kill('SIGKILL')
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
  const ok = existsSync(dest) && statSync(dest).size > 20000
  console.log(ok ? `OK  ${dest} (${statSync(dest).size})` : `FAIL ${dest}`)
}
