#!/usr/bin/env node
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync, existsSync, statSync, rmSync } from 'node:fs'
import { join } from 'node:path'

const outDir = join(process.cwd(), 'docs/library/hero/refs')
mkdirSync(outDir, { recursive: true })

const ua =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36'

const downloads = [
  ['21st-scroll-expansion.png', 'https://cdn.21st.dev/user_2wfnj4jcSPR8JWRk7tpzrihdDV8/scroll-expansion-hero/default/preview.1746632883284.png'],
  ['21st-scroll-morph.png', 'https://cdn.21st.dev/prashantsom75/scroll-morph-hero/default/preview.1765164297799.png'],
  ['21st-smooth-scroll.png', 'https://cdn.21st.dev/ishamsu/smooth-scroll-hero/default/preview.1747142616016.png'],
  ['21st-shape-landing.png', 'https://cdn.21st.dev/kokonutd/shape-landing-hero/default/preview.1785431272869-4471b98b-d626-4c8e-979f-e8f3ec494409.png'],
  ['21st-horizon.png', 'https://cdn.21st.dev/user_2y0orG0S3NPUGUs5U6oQCBMLMkR/horizon-hero-section/default/preview.1750811163361.png'],
  ['21st-futuristic.png', 'https://cdn.21st.dev/larsen66/hero-futuristic/default/preview.1747063193351.png'],
  ['21st-prisma.png', 'https://cdn.21st.dev/rahil1202/prisma-hero/default/preview.1776747545948.png'],
  ['21st-hero-section-1.png', 'https://cdn.21st.dev/user_2tUYFzCDCVfrMrVC3TfB9DUBAyx/hero-section-1/default/preview.png?v=1'],
  ['21st-hero-section-9.png', 'https://cdn.21st.dev/user_2tUYFzCDCVfrMrVC3TfB9DUBAyx/hero-section-9/default/preview.png?v=1'],
  ['21st-hero-195.png', 'https://cdn.21st.dev/shadcnblockscom/hero-195/default/preview.1747616025475.png'],
  ['21st-waitlist.png', 'https://cdn.21st.dev/minhxthanh/waitlist-hero/default/preview.1764083294693.png'],
  ['magicui-hero-video-dark.png', 'https://startup-template-sage.vercel.app/hero-dark.png'],
  ['magicui-hero-video-light.png', 'https://startup-template-sage.vercel.app/hero-light.png'],
]

const pages = [
  ['21st-home.png', 'https://21st.dev'],
  ['21st-hero-gallery.png', 'https://21st.dev/community/components/s/hero'],
  ['21st-animated-hero.png', 'https://21st.dev/community/components/s/animated-hero'],
  ['21st-hero-section-gallery.png', 'https://21st.dev/community/components/s/hero-section'],
  ['21st-animated-hero-section.png', 'https://21st.dev/community/components/s/animated-hero-section'],
  ['aceternity-home.png', 'https://ui.aceternity.com'],
  ['aceternity-hero-section.png', 'https://ui.aceternity.com/hero-section'],
  ['aceternity-hero-blocks.png', 'https://ui.aceternity.com/blocks/hero-sections'],
  ['aceternity-hero-highlight.png', 'https://ui.aceternity.com/components/hero-highlight'],
  ['aceternity-hero-parallax.png', 'https://ui.aceternity.com/components/hero-parallax'],
  ['aceternity-github-globe.png', 'https://ui.aceternity.com/components/github-globe'],
  ['aceternity-spotlight.png', 'https://ui.aceternity.com/components/spotlight-new'],
  ['magicui-home.png', 'https://magicui.design'],
  ['magicui-hero-video.png', 'https://magicui.design/docs/components/hero-video-dialog'],
  ['magicui-animated-beam.png', 'https://magicui.design/docs/components/animated-beam'],
  ['framer-home.png', 'https://www.framer.com'],
  ['framer-marketplace.png', 'https://www.framer.com/marketplace/'],
  ['awwwards-home.png', 'https://www.awwwards.com'],
  ['awwwards-sotd.png', 'https://www.awwwards.com/websites/sites_of_the_day/'],
  ['godly.png', 'https://godly.website'],
  ['recent-design.png', 'https://www.recent.design'],
  ['lapa.png', 'https://www.lapa.ninja'],
  ['dribbble-web.png', 'https://dribbble.com/shots/popular/web-design'],
  ['pinterest-hero-ui.png', 'https://www.pinterest.com/search/pins/?q=saas%20landing%20hero%20ui'],
  ['linear.png', 'https://linear.app'],
  ['vercel.png', 'https://vercel.com'],
  ['cursor.png', 'https://cursor.com'],
  ['openai.png', 'https://openai.com'],
  ['anthropic.png', 'https://www.anthropic.com'],
  ['perplexity.png', 'https://www.perplexity.ai'],
  ['runway.png', 'https://runwayml.com'],
  ['lovable.png', 'https://lovable.dev'],
  ['stripe.png', 'https://stripe.com'],
  ['clerk.png', 'https://clerk.com'],
  ['resend.png', 'https://resend.com'],
  ['raycast.png', 'https://www.raycast.com'],
  ['apple.png', 'https://www.apple.com'],
  ['nextjs.png', 'https://nextjs.org'],
  ['v0.png', 'https://v0.dev'],
  ['figma.png', 'https://www.figma.com'],
  ['suno.png', 'https://suno.com'],
  ['midjourney.png', 'https://www.midjourney.com'],
  ['bruno-simon.png', 'https://bruno-simon.com'],
  ['cosmos.png', 'https://www.cosmos.so'],
  ['paper.png', 'https://paper.design'],
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

async function curlDownload(url, dest) {
  if (okFile(dest)) return true
  const result = await run('curl', ['-fsSL', '--max-time', '40', '-A', ua, '-o', dest, url], { timeoutMs: 45000 })
  return result.code === 0 && okFile(dest)
}

async function screenshot(url, dest, index) {
  if (okFile(dest)) return true
  const profile = `/tmp/chrome-hero-ref-${index}`
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

for (const [name, url] of downloads) {
  const dest = join(outDir, name)
  const ok = await curlDownload(url, dest)
  manifest.push({ file: name, url, kind: 'preview-still', ok, bytes: ok ? statSync(dest).size : 0 })
  console.log(ok ? `DL  ${name}` : `FAIL DL ${name}`)
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
