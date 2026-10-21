#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, statSync, rmSync, copyFileSync } from 'node:fs'
import { join } from 'node:path'

const outDir = join(process.cwd(), 'docs/library/navbar/refs')
mkdirSync(outDir, { recursive: true })
const heroRefs = join(process.cwd(), 'docs/library/hero/refs')

const ua =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const copies = [
  'linear.png',
  'vercel.png',
  'apple.png',
  'stripe.png',
  'framer-home.png',
  'raycast.png',
  'cursor.png',
  'aceternity-home.png',
  'magicui-home.png',
  '21st-home.png',
  'awwwards-home.png',
  'godly.png',
  'clerk.png',
  'resend.png',
  'openai.png',
  'anthropic.png',
]

const pages = [
  ['21st-navbar-gallery.png', 'https://21st.dev/community/components/s/navbar'],
  ['21st-header-gallery.png', 'https://21st.dev/community/components/s/header'],
  ['21st-floating-navbar.png', 'https://21st.dev/community/components/explore/floating-navbar'],
  ['21st-navigation-menu.png', 'https://21st.dev/community/components/s/navigation-menu'],
  ['21st-mega-menu.png', 'https://21st.dev/@anelkabag/components/navbar2'],
  ['21st-efferd-nav.png', 'https://21st.dev/@efferd/components/navigation-menu'],
  ['21st-wensity-nav.png', 'https://21st.dev/@wensity/components/navigation-menu'],
  ['aceternity-floating-navbar.png', 'https://ui.aceternity.com/components/floating-navbar'],
  ['aceternity-navbar-menu.png', 'https://ui.aceternity.com/components/navbar-menu'],
  ['aceternity-resizable-navbar.png', 'https://ui.aceternity.com/components/resizable-navbar'],
  ['aceternity-floating-dock.png', 'https://ui.aceternity.com/components/floating-dock'],
  ['aceternity-sidebar.png', 'https://ui.aceternity.com/components/sidebar'],
  ['magicui-dock.png', 'https://magicui.design/docs/components/dock'],
  ['magicui-home-nav.png', 'https://magicui.design'],
  ['linear-nav.png', 'https://linear.app'],
  ['vercel-nav.png', 'https://vercel.com'],
  ['raycast-nav.png', 'https://www.raycast.com'],
  ['arc-nav.png', 'https://arc.net'],
  ['framer-nav.png', 'https://www.framer.com'],
  ['stripe-nav.png', 'https://stripe.com'],
  ['apple-nav.png', 'https://www.apple.com'],
  ['nextjs-nav.png', 'https://nextjs.org'],
  ['cursor-nav.png', 'https://cursor.com'],
  ['notion-nav.png', 'https://www.notion.so'],
  ['figma-nav.png', 'https://www.figma.com'],
  ['awwwards-nav.png', 'https://www.awwwards.com'],
  ['godly-nav.png', 'https://godly.website'],
  ['landbook.png', 'https://land-book.com'],
  ['mobbin.png', 'https://mobbin.com'],
  ['lapa-nav.png', 'https://www.lapa.ninja'],
  ['dribbble-navbar.png', 'https://dribbble.com/search/shots/popular/web-design?q=navbar%20ui'],
  ['pinterest-navbar.png', 'https://www.pinterest.com/search/pins/?q=website%20navbar%20ui%20saas'],
  ['paper-nav.png', 'https://paper.design'],
  ['cosmos-nav.png', 'https://www.cosmos.so'],
  ['runway-nav.png', 'https://runwayml.com'],
  ['perplexity-nav.png', 'https://www.perplexity.ai'],
]

function okFile(path) {
  try {
    return existsSync(path) && statSync(path).size > 12000
  } catch {
    return false
  }
}

function run(cmd, args, extra = {}) {
  return new Promise((resolve) => {
    const child = spawn(cmd, args, { stdio: 'ignore', ...extra })
    const t = setTimeout(() => {
      child.kill('SIGKILL')
      resolve({ code: 1, killed: true })
    }, extra.timeoutMs ?? 40000)
    child.on('close', (code) => {
      clearTimeout(t)
      resolve({ code: code ?? 1, killed: false })
    })
  })
}

async function screenshot(url, dest, index) {
  if (okFile(dest)) return true
  const profile = `/tmp/chrome-nav-ref-${index}-${Date.now()}`
  mkdirSync(profile, { recursive: true })
  const result = await run(
    'google-chrome',
    [
      '--headless=new',
      '--disable-gpu',
      '--no-sandbox',
      '--hide-scrollbars',
      '--ignore-certificate-errors',
      '--disable-dev-shm-usage',
      `--user-agent=${ua}`,
      `--user-data-dir=${profile}`,
      '--window-size=1440,900',
      '--force-device-scale-factor=1',
      '--virtual-time-budget=10000',
      '--timeout=22000',
      `--screenshot=${dest}`,
      url,
    ],
    { timeoutMs: 28000 },
  )
  try {
    rmSync(profile, { recursive: true, force: true })
  } catch {
    /* ignore */
  }
  return (result.code === 0 || existsSync(dest)) && okFile(dest)
}

const manifest = []

for (const name of copies) {
  const src = join(heroRefs, name)
  const dest = join(outDir, `hero-${name}`)
  if (existsSync(src)) {
    copyFileSync(src, dest)
    manifest.push({ file: `hero-${name}`, url: `copied:${name}`, kind: 'copied-hero-ref', ok: true, bytes: statSync(dest).size })
    console.log(`COPY ${name}`)
  } else {
    manifest.push({ file: `hero-${name}`, url: `copied:${name}`, kind: 'copied-hero-ref', ok: false, bytes: 0 })
    console.log(`MISS ${name}`)
  }
}

let i = 0
for (const [name, url] of pages) {
  const dest = join(outDir, name)
  const ok = await screenshot(url, dest, i++)
  manifest.push({ file: name, url, kind: 'page-screenshot', ok, bytes: ok && existsSync(dest) ? statSync(dest).size : 0 })
  console.log(ok ? `SHOT ${name}` : `FAIL SHOT ${name}`)
}

writeFileSync(join(outDir, 'manifest.json'), JSON.stringify({ capturedAt: new Date().toISOString(), items: manifest }, null, 2))
console.log(`captured ${manifest.filter((item) => item.ok).length}/${manifest.length}`)
