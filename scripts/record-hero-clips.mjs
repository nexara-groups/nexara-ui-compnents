#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, statSync, rmSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { attachPage, connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.HERO_SHOT_ORIGIN ?? 'http://127.0.0.1:5173'
const out = resolve('docs/library/hero/implemented')
mkdirSync(out, { recursive: true })

const clips = [
  'aurora',
  'cinema',
  'cursor',
  'atlas',
  'mesh',
  'fan',
  'ribbon',
  'converse',
  'assemble',
  'veil',
  'rotate',
  'pop',
]

function ffmpegFrames(dir, dest, fps) {
  return new Promise((done, fail) => {
    const child = spawn(
      'ffmpeg',
      [
        '-y',
        '-framerate',
        String(Math.max(12, fps)),
        '-i',
        resolve(dir, '%04d.jpg'),
        '-an',
        '-c:v',
        'libvpx-vp9',
        '-b:v',
        '2.4M',
        '-pix_fmt',
        'yuv420p',
        dest,
      ],
      { stdio: 'ignore' },
    )
    const t = setTimeout(() => child.kill('SIGKILL'), 20000)
    child.on('close', (code) => {
      clearTimeout(t)
      if (code === 0) done()
      else fail(new Error(`ffmpeg ${code}`))
    })
    child.on('error', fail)
  })
}

async function recordClip(id, index) {
  const profile = `/tmp/chrome-clip-${id}-${Date.now()}`
  const port = 9330 + index
  const framesDir = `/tmp/hero-clip-frames-${id}`
  rmSync(framesDir, { recursive: true, force: true })
  mkdirSync(framesDir, { recursive: true })
  const chrome = launchChrome({ profile, port, headless: true })
  const dest = resolve(out, `${id}-motion.webm`)
  try {
    const cdp = await connectCdp(port)
    const frames = []
    const off = cdp.on(async (msg) => {
      if (msg.method !== 'Page.screencastFrame') return
      const { data, sessionId } = msg.params
      const n = frames.length
      frames.push(n)
      writeFileSync(resolve(framesDir, `${String(n + 1).padStart(4, '0')}.jpg`), Buffer.from(data, 'base64'))
      try {
        await cdp.send('Page.screencastFrameAck', { sessionId })
      } catch {
        /* ignore */
      }
    })
    await cdp.send('Page.enable')
    await cdp.send('Runtime.enable')
    await cdp.send('Emulation.setDeviceMetricsOverride', {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
    })
    await cdp.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 72,
      everyNthFrame: 1,
      maxWidth: 1440,
      maxHeight: 900,
    })
    await cdp.send('Page.navigate', { url: `${origin}/#shot/${id}` })
    await sleep(4200)
    try {
      await cdp.send('Page.stopScreencast')
    } catch {
      /* ignore */
    }
    off()
    cdp.close()
    const count = readdirSync(framesDir).filter((f) => f.endsWith('.jpg')).length
    if (count < 12) throw new Error(`only ${count} frames`)
    const fps = Math.round(count / 4)
    await ffmpegFrames(framesDir, dest, fps)
  } finally {
    killChrome(chrome, profile)
    rmSync(framesDir, { recursive: true, force: true })
  }
  const ok = existsSync(dest) && statSync(dest).size > 20000
  console.log(ok ? `OK  ${dest} (${statSync(dest).size})` : `FAIL ${dest}`)
  return ok
}

let failed = 0
for (let i = 0; i < clips.length; i++) {
  try {
    const ok = await recordClip(clips[i], i)
    if (!ok) failed += 1
  } catch (err) {
    failed += 1
    console.log(`FAIL ${clips[i]} ${err.message}`)
  }
}
if (failed) process.exitCode = 1
