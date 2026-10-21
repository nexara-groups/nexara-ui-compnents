#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, statSync, rmSync, readdirSync } from 'node:fs'
import { resolve } from 'node:path'
import { attachPage, connectCdp, killChrome, launchChrome, sleep } from './cdp.mjs'

const origin = process.env.NAV_SHOT_ORIGIN ?? 'http://127.0.0.1:5173'
const out = resolve('docs/library/navbar/implemented')
mkdirSync(out, { recursive: true })

const clips = (
  process.argv[2] ??
  'pill,tabs,league,mega,command,follow,split,island,curtain,dock,rail,portal'
).split(',')

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
  const profile = `/tmp/chrome-nav-clip-${id}-${Date.now()}`
  const port = 9530 + index
  const framesDir = `/tmp/nav-clip-frames-${id}`
  rmSync(framesDir, { recursive: true, force: true })
  mkdirSync(framesDir, { recursive: true })
  const chrome = launchChrome({ profile, port, headless: true })
  const dest = resolve(out, `${id}-motion.webm`)
  try {
    const cdp = await connectCdp(port)
    const frames = []
    const off = cdp.on((msg) => {
      if (msg.method !== 'Page.screencastFrame') return
      const { data, sessionId } = msg.params
      const n = frames.length
      frames.push(n)
      try {
        cdp.send('Page.screencastFrameAck', { sessionId })
      } catch {
        /* ignore */
      }
      writeFileSync(resolve(framesDir, `${String(n + 1).padStart(4, '0')}.jpg`), Buffer.from(data, 'base64'))
    })
    await attachPage(cdp, `${origin}/#navshot/${id}`)
    await sleep(120)
    await cdp.send('Page.startScreencast', {
      format: 'jpeg',
      quality: 55,
      everyNthFrame: 1,
      maxWidth: 1280,
      maxHeight: 800,
    })
    const nudge = (async () => {
      for (let i = 0; i < 16; i++) {
        await cdp.send('Input.dispatchMouseEvent', {
          type: 'mouseMoved',
          x: 280 + (i % 8) * 90,
          y: id === 'mega' ? 88 + (i % 5) * 36 : id === 'dock' ? 720 : 36 + (i % 3) * 10,
        })
        if (id === 'command' || id === 'portal') {
          await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key: 'ArrowDown', windowsVirtualKeyCode: 40 })
          await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key: 'ArrowDown', windowsVirtualKeyCode: 40 })
        }
        if (id === 'command' && i === 3) {
          await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: 560, y: 42, button: 'left', clickCount: 1 })
          await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: 560, y: 42, button: 'left', clickCount: 1 })
          await cdp.send('Input.insertText', { text: 'can' })
        }
        await sleep(220)
      }
    })()
    const deadline = Date.now() + 5200
    while (frames.length < 36 && Date.now() < deadline) {
      await sleep(60)
    }
    await Promise.race([nudge, sleep(100)])
    try {
      await cdp.send('Page.stopScreencast')
    } catch {
      /* ignore */
    }
    off()
    let count = readdirSync(framesDir).filter((f) => f.endsWith('.jpg')).length
    if (count < 12) {
      for (let i = count; i < 24; i++) {
        const shot = await cdp.send('Page.captureScreenshot', { format: 'jpeg', quality: 55 })
        writeFileSync(
          resolve(framesDir, `${String(i + 1).padStart(4, '0')}.jpg`),
          Buffer.from(shot.data, 'base64'),
        )
        await cdp.send('Input.dispatchMouseEvent', {
          type: 'mouseMoved',
          x: 320 + (i % 10) * 70,
          y: 40,
        })
        await sleep(140)
      }
      count = readdirSync(framesDir).filter((f) => f.endsWith('.jpg')).length
    }
    cdp.close()
    if (count < 10) throw new Error(`only ${count} frames`)
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
