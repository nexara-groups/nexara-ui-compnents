import { spawn } from 'node:child_process'
import { existsSync, readFileSync, rmSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

export function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms))
}

export function launchChrome({ profile, port, url = 'about:blank', headless = true, extra = [] }) {
  mkdirSync(profile, { recursive: true })
  const args = [
    `--user-data-dir=${profile}`,
    `--remote-debugging-port=${port}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-infobars',
    '--disable-session-crashed-bubble',
    '--disable-translate',
    '--disable-features=Translate,InfiniteSessionRestore',
    '--hide-scrollbars',
    '--disable-dev-shm-usage',
    '--no-sandbox',
    '--autoplay-policy=no-user-gesture-required',
    '--disable-background-timer-throttling',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--force-device-scale-factor=1',
    '--window-size=1440,900',
    '--window-position=0,0',
    ...extra,
    url,
  ]
  if (headless) args.unshift('--headless=new')
  const child = spawn('google-chrome', args, {
    env: { ...process.env, DISPLAY: process.env.DISPLAY ?? ':1' },
    stdio: 'ignore',
  })
  return child
}

export async function waitDevtools(profile, timeout = 12000) {
  const file = resolve(profile, 'DevToolsActivePort')
  const start = Date.now()
  while (!existsSync(file)) {
    if (Date.now() - start > timeout) throw new Error(`no DevToolsActivePort in ${profile}`)
    await sleep(40)
  }
  const [port] = readFileSync(file, 'utf8').split('\n')
  return Number(port)
}

export async function connectCdp(port, tries = 40) {
  let last = 'no page'
  for (let i = 0; i < tries; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${port}/json/list`)
      if (res.ok) {
        const list = await res.json()
        const page = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl)
        if (page) return openCdp(page.webSocketDebuggerUrl)
        last = `targets ${list.length}`
      } else {
        last = `HTTP ${res.status}`
      }
    } catch (err) {
      last = err.message
    }
    await sleep(80)
  }
  throw new Error(`CDP connect failed: ${last}`)
}

export function openCdp(wsUrl) {
  return new Promise((ok, fail) => {
    const ws = new WebSocket(wsUrl)
    const client = {
      ws,
      id: 0,
      pending: new Map(),
      listeners: [],
      send(method, params = {}) {
        const id = ++client.id
        return new Promise((resolve, reject) => {
          client.pending.set(id, { resolve, reject })
          ws.send(JSON.stringify({ id, method, params }))
        })
      },
      on(fn) {
        client.listeners.push(fn)
        return () => {
          client.listeners = client.listeners.filter((x) => x !== fn)
        }
      },
      close() {
        try {
          ws.close()
        } catch {
          /* ignore */
        }
      },
    }
    ws.addEventListener('open', () => ok(client))
    ws.addEventListener('error', () => fail(new Error(`ws error ${wsUrl}`)))
    ws.addEventListener('message', (ev) => {
      const msg = JSON.parse(String(ev.data))
      if (msg.id && client.pending.has(msg.id)) {
        const { resolve, reject } = client.pending.get(msg.id)
        client.pending.delete(msg.id)
        if (msg.error) reject(new Error(msg.error.message ?? JSON.stringify(msg.error)))
        else resolve(msg.result)
      } else if (msg.method) {
        for (const fn of client.listeners) fn(msg)
      }
    })
  })
}

export async function attachPage(cdp, url) {
  await cdp.send('Page.enable')
  await cdp.send('Runtime.enable')
  await cdp.send('Emulation.setDeviceMetricsOverride', {
    width: 1440,
    height: 900,
    deviceScaleFactor: 1,
    mobile: false,
  })
  await cdp.send('Page.navigate', { url })
  await Promise.race([
    new Promise((resolve) => {
      const off = cdp.on((msg) => {
        if (msg.method === 'Page.loadEventFired') {
          off()
          resolve()
        }
      })
    }),
    sleep(8000),
  ])
  await cdp.send('Runtime.evaluate', {
    expression: `new Promise((ok) => {
      const tick = () => {
        if (document.querySelector('[data-nexara="hero"], [data-nexara="navbar"]')) return ok(true)
        requestAnimationFrame(tick)
      }
      tick()
      setTimeout(() => ok(false), 8000)
    })`,
    awaitPromise: true,
  })
  await sleep(80)
}

export function killChrome(child, profile) {
  try {
    child.kill('SIGKILL')
  } catch {
    /* ignore */
  }
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
}
