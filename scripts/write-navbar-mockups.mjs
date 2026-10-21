#!/usr/bin/env node
import { mkdirSync, writeFileSync, copyFileSync, existsSync } from 'node:fs'
import { join } from 'node:path'

const dir = join(process.cwd(), 'docs/library/navbar/mockups')
const assets = join(dir, 'assets')
mkdirSync(assets, { recursive: true })
const stills = [
  'hero-glass-laptop.jpg',
  'hero-clinic-lobby.jpg',
  'hero-athlete.jpg',
  'hero-academy.jpg',
  'hero-hvac-roof.jpg',
  'hero-cinema-night.jpg',
  'hero-startup-loft.jpg',
  'hero-iso-plant.jpg',
  'hero-agency-wall.jpg',
  'hero-device-puck.jpg',
  'hero-magazine-spread.jpg',
]
for (const file of stills) {
  const src = join(process.cwd(), 'public/library/hero', file)
  if (existsSync(src)) copyFileSync(src, join(assets, file))
}

const font = (families) =>
  `<link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="https://fonts.googleapis.com/css2?${families}&display=swap" rel="stylesheet" />`

function page(title, fonts, css, body) {
  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${title}</title>
  ${fonts}
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    html, body { height: 100%; }
    button, a { font: inherit; color: inherit; text-decoration: none; }
    ${css}
  </style>
</head>
<body>
${body}
</body>
</html>
`
}

const mockups = []

mockups.push([
  '01-pill.html',
  page(
    '01 Pill — Lumen',
    font('family=Syne:wght@600;800&family=IBM+Plex+Mono:wght@400;500'),
    `
    body { font-family: Syne, sans-serif; color: #eef7ff; background: #04060f; overflow: hidden; }
    .hero { position: relative; min-height: 100vh; }
    .aurora { position: absolute; inset: -20%; filter: blur(70px); }
    .b1 { position:absolute; width:50vw; height:50vw; left:-10%; top:-20%; border-radius:50%; background:radial-gradient(circle,#5b8cff,transparent 62%); }
    .b2 { position:absolute; width:46vw; height:46vw; right:-12%; top:10%; border-radius:50%; background:radial-gradient(circle,#7c5cff,transparent 64%); }
    .bar { position: relative; z-index: 4; display: flex; justify-content: center; padding: 22px 24px; }
    .pill { display: flex; align-items: center; gap: 22px; padding: 10px 12px 10px 18px; border-radius: 999px;
      background: rgba(8,12,24,.55); border: 1px solid rgba(255,255,255,.18); backdrop-filter: blur(18px);
      box-shadow: 0 18px 40px -24px #000, inset 0 1px 0 rgba(255,255,255,.22); }
    .mark { display:flex; align-items:center; gap:8px; font-weight:800; }
    .dot { width:9px; height:9px; border-radius:50%; background: conic-gradient(#2ee6c7,#7c5cff,#5b8cff,#2ee6c7); }
    .links { display:flex; gap:4px; }
    .links a { padding: 8px 12px; border-radius: 999px; font-size: 13px; color: #c9d7ea; }
    .links a.here { background: rgba(255,255,255,.1); color: #fff; }
    .cta { height: 36px; padding: 0 14px; border-radius: 999px; border: 0; background: #eef7ff; color: #08101c; font-weight: 800; font-size: 13px; }
    .copy { position: relative; z-index: 3; padding: 80px 64px 0; max-width: 36rem; }
    .kicker { font-family: "IBM Plex Mono", monospace; font-size: 11px; letter-spacing: .22em; text-transform: uppercase; color: #8ef0dc; }
    h1 { font-size: 72px; line-height: .9; letter-spacing: -.05em; font-weight: 800; margin: 16px 0; }
    p { color: #c5d4ea; line-height: 1.55; }
    .glass { position: absolute; right: 56px; top: 160px; width: 520px; border-radius: 28px; overflow: hidden; border: 1px solid rgba(255,255,255,.2);
      transform: perspective(1200px) rotateY(-8deg); box-shadow: 0 40px 80px -32px #000; }
    .glass img { width: 100%; height: 340px; object-fit: cover; display: block; }
    `,
    `<div class="hero">
      <div class="aurora" aria-hidden="true"><i class="b1"></i><i class="b2"></i></div>
      <div class="bar">
        <nav class="pill" aria-label="Primary">
          <div class="mark"><span class="dot"></span> Lumen</div>
          <div class="links"><a class="here" href="#">Product</a><a href="#">Studio</a><a href="#">Pricing</a></div>
          <button class="cta" type="button">Open the desk</button>
        </nav>
      </div>
      <div class="copy">
        <p class="kicker">Design OS · v2.4</p>
        <h1>Light the work before the brief.</h1>
        <p>A floating capsule over the aurora. Links drift toward the pointer. The CTA is a solid chip, not a ghost.</p>
      </div>
      <figure class="glass"><img src="./assets/hero-glass-laptop.jpg" alt="" /></figure>
    </div>`,
  ),
])

mockups.push([
  '02-banner.html',
  page(
    '02 Banner — Lumen',
    font('family=Syne:wght@600;800&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: Syne, sans-serif; color: #10141c; background: #f4f1ea; overflow: hidden; }
    .note { background: #111; color: #facc15; display: flex; justify-content: center; gap: 18px; align-items: center;
      font-family: "IBM Plex Mono", monospace; font-size: 12px; letter-spacing: .12em; text-transform: uppercase; height: 36px; }
    .note b { color: #fff; font-weight: 500; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 14px 40px; background: rgba(244,241,234,.92); border-bottom: 1px solid #e4ddd0; }
    .mark { font-weight: 800; }
    nav a { margin: 0 14px; font-size: 14px; color: #4a453c; }
    .cta { height: 38px; padding: 0 16px; border-radius: 999px; border: 0; background: #111; color: #f4f1ea; font-weight: 800; }
    .hero { padding: 72px 64px; display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
    h1 { font-size: 64px; line-height: .92; letter-spacing: -.05em; }
    p { margin-top: 16px; color: #5c574e; line-height: 1.6; max-width: 28rem; }
    img { width: 100%; height: 380px; object-fit: cover; border-radius: 28px; }
    `,
    `<div class="note">Studio 12 opens Thursday · 18 seats left <b>Reserve a desk</b></div>
    <nav aria-label="Primary">
      <strong class="mark">Lumen</strong>
      <div><a href="#">Product</a><a href="#">Studio</a><a href="#">Pricing</a></div>
      <button class="cta" type="button">Open the desk</button>
    </nav>
    <div class="hero">
      <div>
        <h1>The bar absorbs the news.</h1>
        <p>A live announcement strip sits on the bar. On scroll it collapses into a yellow pip beside the wordmark — not a second header.</p>
      </div>
      <img src="./assets/hero-glass-laptop.jpg" alt="" />
    </div>`,
  ),
])

mockups.push([
  '03-tabs.html',
  page(
    '03 Tabs — Iris',
    font('family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: Syne, sans-serif; color: #f6f0ff; background: #12081c; overflow: hidden; }
    .mesh { position: absolute; inset: -10%; filter: blur(80px); }
    .m1 { position:absolute; width:48vw; height:48vw; left:8%; top:-10%; border-radius:40%; background:radial-gradient(circle,#f472b6,transparent 64%); }
    .m2 { position:absolute; width:42vw; height:42vw; right:-8%; top:20%; border-radius:42%; background:radial-gradient(circle,#818cf8,transparent 62%); }
    nav { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; padding: 20px 40px; }
    .tabs { display: flex; gap: 4px; padding: 6px; border-radius: 999px; background: rgba(255,255,255,.06); border: 1px solid rgba(255,255,255,.12); }
    .tabs a { position: relative; z-index: 1; padding: 8px 16px; font-size: 13px; }
    .tabs a.here { background: #fff; color: #12081c; border-radius: 999px; font-weight: 800; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #fff; color: #12081c; font-weight: 800; }
    .copy { position: relative; z-index: 2; padding: 90px 64px; }
    .kicker { font-family: "IBM Plex Mono", monospace; letter-spacing: .2em; font-size: 11px; color: #f9a8d4; text-transform: uppercase; }
    h1 { font-size: 84px; letter-spacing: -.06em; line-height: .86; margin-top: 12px; }
    `,
    `<div class="mesh" aria-hidden="true"><i class="m1"></i><i class="m2"></i></div>
    <nav aria-label="Primary">
      <strong>Iris</strong>
      <div class="tabs">
        <a class="here" href="#">Canvas</a><a href="#">Tokens</a><a href="#">Pricing</a>
      </div>
      <button class="cta" type="button">Open Iris</button>
    </nav>
    <div class="copy">
      <p class="kicker">Iris canvas · liquid indicator</p>
      <h1>IRIS</h1>
    </div>`,
  ),
])

mockups.push([
  '04-clinic.html',
  page(
    '04 Clinic — Harbor',
    font('family=IBM+Plex+Sans:wght@400;600;700&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: "IBM Plex Sans", sans-serif; color: #1c1917; background: #f7f5f2; overflow: hidden; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; background: #fff; border-bottom: 1px solid #ece7e0; }
    .status { font-family: "IBM Plex Mono", monospace; font-size: 12px; color: #0369a1; }
    .status i { display: inline-block; width: 8px; height: 8px; border-radius: 50%; background: #22c55e; margin-right: 8px; }
    nav a { margin: 0 14px; font-size: 14px; color: #57534e; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #0369a1; color: #fff; font-weight: 700; }
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 56px 40px; align-items: center; }
    h1 { font-size: 56px; letter-spacing: -.04em; line-height: .94; }
    p { margin-top: 16px; color: #57534e; line-height: 1.6; max-width: 28rem; }
    img { width: 100%; height: 360px; object-fit: cover; border-radius: 28px; }
    `,
    `<nav aria-label="Primary">
      <strong>Harbor Clinic</strong>
      <div><a href="#">Visit</a><a href="#">Doctors</a><a href="#">Records</a></div>
      <span class="status"><i></i>Dr. Okonkwo · in clinic</span>
      <button class="cta" type="button">Hold Thursday 9:20</button>
    </nav>
    <div class="hero">
      <div>
        <h1>The visit starts as a chat.</h1>
        <p>Named doctor, real room, a Pulse reading from last week. The bar is the intake desk.</p>
      </div>
      <img src="./assets/hero-clinic-lobby.jpg" alt="" />
    </div>`,
  ),
])

mockups.push([
  '05-league.html',
  page(
    '05 League — Harbor Athletic',
    font('family=Archivo:wght@600;800&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: Archivo, sans-serif; color: #e8ffe9; background: #04150f; overflow: hidden; }
    .hero { min-height: 100vh; background: linear-gradient(90deg,#04150f 18%,#04150f88 48%,transparent), url('./assets/hero-athlete.jpg') 70% 40%/cover no-repeat; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; }
    .score { font-family: "IBM Plex Mono", monospace; font-size: 13px; color: #facc15; letter-spacing: .14em; }
    nav a { margin: 0 14px; font-size: 13px; color: #b8e0b4; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #facc15; color: #04150f; font-weight: 800; }
    .copy { padding: 120px 40px 0; max-width: 18ch; }
    h1 { font-size: 72px; line-height: .88; letter-spacing: -.05em; font-weight: 800; }
    `,
    `<div class="hero">
      <nav aria-label="Primary">
        <strong>HARBOR ATHLETIC</strong>
        <div><a href="#">Fixtures</a><a href="#">Clubs</a><a href="#">Tickets</a></div>
        <span class="score">W400 · 48.02</span>
        <button class="cta" type="button">Get tickets</button>
      </nav>
      <div class="copy"><h1>The association, after dark.</h1></div>
    </div>`,
  ),
])

mockups.push([
  '06-pop.html',
  page(
    '06 Pop — Playfield',
    font('family=Outfit:wght@500;700;800'),
    `
    body { font-family: Outfit, sans-serif; color: #1c1917; background: #fff7ed; overflow: hidden; }
    .blob { position: absolute; border-radius: 50%; filter: blur(30px); opacity: .8; }
    nav { position: relative; z-index: 2; display: flex; align-items: center; justify-content: space-between; padding: 18px 40px; }
    .chips { display: flex; gap: 8px; }
    .chips span { padding: 6px 12px; border-radius: 999px; background: #fff; font-size: 12px; font-weight: 700; box-shadow: 0 8px 20px -16px #000; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #f43f5e; color: #fff; font-weight: 700; }
    .hero { position: relative; z-index: 2; display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 40px; align-items: center; }
    h1 { font-size: 60px; line-height: .92; letter-spacing: -.05em; }
    h1 span { color: #f43f5e; }
    img { width: 100%; height: 380px; object-fit: cover; border-radius: 32px; border: 6px solid #fff; }
    `,
    `<span class="blob" style="left:8%;top:12%;width:180px;height:180px;background:#fb7185"></span>
    <span class="blob" style="right:12%;top:8%;width:160px;height:160px;background:#38bdf8"></span>
    <nav aria-label="Primary">
      <strong style="font-size:22px">Playfield</strong>
      <div class="chips"><span>Drawing · 10:00</span><span>Games · 13:30</span></div>
      <div><a href="#" style="margin:0 12px;font-size:14px">Classes</a><a href="#" style="margin:0 12px;font-size:14px">Teachers</a></div>
      <button class="cta" type="button">Apply for spring</button>
    </nav>
    <div class="hero">
      <h1>A school that looks like <span>Saturday.</span></h1>
      <img src="./assets/hero-academy.jpg" alt="" />
    </div>`,
  ),
])

mockups.push([
  '07-mega.html',
  page(
    '07 Mega — Folio',
    font('family=Plus+Jakarta+Sans:wght@500;700;800'),
    `
    body { font-family: "Plus Jakarta Sans", sans-serif; color: #171412; background: #f6f3ec; overflow: hidden; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; }
    nav a { margin: 0 14px; font-size: 14px; color: #6b645c; }
    nav a.here { color: #be123c; font-weight: 800; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #be123c; color: #fff; font-weight: 700; }
    .panel { margin: 0 40px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; background: #fff; border-radius: 24px; padding: 16px;
      border: 1px solid #17141214; box-shadow: 0 30px 60px -36px #0006; }
    figure { overflow: hidden; border-radius: 16px; }
    figure img { width: 100%; height: 180px; object-fit: cover; display: block; }
    figcaption { padding: 10px 4px 0; font-size: 13px; font-weight: 700; }
    figcaption small { display: block; color: #6b645c; font-weight: 500; }
    h1 { padding: 48px 40px 0; font-size: 56px; letter-spacing: -.05em; }
    `,
    `<nav aria-label="Primary">
      <strong>Folio</strong>
      <div><a class="here" href="#">Work</a><a href="#">People</a><a href="#">Journal</a></div>
      <button class="cta" type="button">Start a project</button>
    </nav>
    <div class="panel">
      <figure><img src="./assets/hero-athlete.jpg" alt="" /><figcaption>Harbor Athletic<small>Identity · 2026</small></figcaption></figure>
      <figure><img src="./assets/hero-device-puck.jpg" alt="" /><figcaption>Vesper Pulse<small>Device · 12s</small></figcaption></figure>
      <figure><img src="./assets/hero-cinema-night.jpg" alt="" /><figcaption>Kin Veil<small>Fashion film</small></figcaption></figure>
    </div>
    <h1>Work that lands in a fan.</h1>`,
  ),
])

mockups.push([
  '08-command.html',
  page(
    '08 Command — Relay',
    font('family=IBM+Plex+Sans:wght@400;600&family=IBM+Plex+Mono:wght@400;500'),
    `
    body { font-family: "IBM Plex Sans", sans-serif; color: #e7edf3; background: #0b0d10; overflow: hidden; }
    nav { display: flex; align-items: center; gap: 16px; padding: 16px 28px; border-bottom: 1px solid #1e242c; }
    .field { flex: 1; display: flex; align-items: center; gap: 10px; height: 44px; padding: 0 14px; border-radius: 12px; background: #141a22; border: 1px solid #2a3340; font-family: "IBM Plex Mono", monospace; font-size: 13px; color: #8b9aab; }
    .k { margin-left: auto; font-family: "IBM Plex Mono", monospace; font-size: 11px; border: 1px solid #2a3340; padding: 4px 8px; border-radius: 6px; color: #8b9aab; }
    .list { width: min(720px, 90%); margin: 24px auto; background: #141a22; border: 1px solid #2a3340; border-radius: 16px; overflow: hidden; }
    .row { display: grid; grid-template-columns: 88px 1fr auto; gap: 12px; padding: 12px 16px; font-family: "IBM Plex Mono", monospace; font-size: 13px; border-top: 1px solid #1e242c; }
    .row:first-child { border: 0; background: #1a2430; }
    .file { color: #4ade80; }
    h1 { text-align: center; margin-top: 80px; font-size: 42px; letter-spacing: -.04em; }
    `,
    `<nav aria-label="Command">
      <strong>Relay</strong>
      <div class="field">Ask Relay… checkout-edge canary</div>
      <span class="k">⌘K</span>
    </nav>
    <div class="list">
      <div class="row"><span class="file">src/</span><span>checkout-edge.ts</span><span>open</span></div>
      <div class="row"><span class="file">ops/</span><span>canary 12% on checkout-edge</span><span>status</span></div>
      <div class="row"><span class="file">doc/</span><span>Auth sessions</span><span>jump</span></div>
    </div>
    <h1>The field is the navigation.</h1>`,
  ),
])

mockups.push([
  '09-follow.html',
  page(
    '09 Follow — Northbound',
    font('family=Syne:wght@700;800'),
    `
    body { font-family: Syne, sans-serif; color: #f5f1e8; background: #0b0b0b; overflow: hidden; }
    .spot { position: absolute; width: 28rem; height: 20rem; left: 42%; top: 0; transform: translateX(-50%);
      background: radial-gradient(closest-side, #f9731644, transparent 70%); pointer-events: none; }
    nav { position: relative; display: flex; align-items: center; justify-content: space-between; padding: 22px 40px; }
    nav a { margin: 0 18px; font-size: 14px; color: #b5aea2; }
    nav a.here { color: #fff; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #f97316; color: #1a0b00; font-weight: 800; }
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 48px 40px; align-items: center; }
    h1 { font-size: 64px; line-height: .9; letter-spacing: -.05em; }
    img { width: 100%; height: 360px; object-fit: cover; border-radius: 8px; }
    `,
    `<div class="spot" aria-hidden="true"></div>
    <nav aria-label="Primary">
      <strong>NORTH</strong>
      <div><a class="here" href="#">Work</a><a href="#">Studio</a><a href="#">Index</a></div>
      <button class="cta" type="button">Start a brief</button>
    </nav>
    <div class="hero">
      <h1>Photography lives inside the letters.</h1>
      <img src="./assets/hero-agency-wall.jpg" alt="" />
    </div>`,
  ),
])

mockups.push([
  '10-crumb.html',
  page(
    '10 Crumb — Prism docs',
    font('family=Plus+Jakarta+Sans:wght@500;700&family=IBM+Plex+Mono:wght@400'),
    `
    body { font-family: "Plus Jakarta Sans", sans-serif; color: #111827; background: #f6f7fb; overflow: hidden; }
    nav { display: grid; grid-template-columns: auto 1fr auto; gap: 24px; align-items: center; padding: 14px 28px 0; }
    .path { font-family: "IBM Plex Mono", monospace; font-size: 12px; color: #6b7280; }
    .path b { color: #111827; }
    .pct { font-family: "IBM Plex Mono", monospace; font-size: 12px; color: #6b7280; }
    .bar { height: 2px; background: #e5e7eb; margin-top: 12px; }
    .bar i { display: block; width: 42%; height: 100%; background: #111827; }
    .page { display: grid; grid-template-columns: 220px 1fr; gap: 32px; padding: 32px 28px; }
    aside { font-size: 13px; color: #6b7280; line-height: 2; }
    aside .here { color: #111827; font-weight: 700; }
    article h1 { font-size: 40px; letter-spacing: -.04em; }
    article p { margin-top: 16px; max-width: 38rem; line-height: 1.7; color: #374151; }
    `,
    `<nav aria-label="Docs">
      <strong>Prism</strong>
      <div class="path">Product / Auth / <b>Sessions</b></div>
      <span class="pct">42%</span>
    </nav>
    <div class="bar" aria-hidden="true"><i></i></div>
    <div class="page">
      <aside>Overview<br>Auth<br><span class="here">Sessions</span><br>Webhooks<br>Limits</aside>
      <article>
        <h1>Sessions</h1>
        <p>A breadcrumb and a reading hairline. The nav is orientation, not a marketing CTA rack.</p>
      </article>
    </div>`,
  ),
])

mockups.push([
  '11-kiln.html',
  page(
    '11 Kiln — Mechanical',
    font('family=Space+Grotesk:wght@500;700&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: "Space Grotesk", sans-serif; color: #123043; background: #e8eef2; overflow: hidden; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 16px 40px; background: #fff; border-bottom: 1px solid #d5dee4; }
    .plant { font-family: "IBM Plex Mono", monospace; font-size: 12px; padding: 6px 10px; border: 1px solid #12304322; border-radius: 8px; }
    .temp { font-family: "IBM Plex Mono", monospace; color: #c2410c; font-weight: 700; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #c2410c; color: #fff; font-weight: 700; }
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 32px; padding: 48px 40px; align-items: center; }
    h1 { font-size: 56px; line-height: .94; letter-spacing: -.05em; }
    img { width: 100%; height: 360px; object-fit: cover; border-radius: 28px; }
    `,
    `<nav aria-label="Primary">
      <strong>Kiln Mechanical</strong>
      <span class="plant">Plant 03 ▾</span>
      <span class="temp">Supply 64°</span>
      <div><a href="#" style="margin:0 12px;font-size:14px;color:#4b6473">Plants</a><a href="#" style="margin:0 12px;font-size:14px;color:#4b6473">Drawings</a></div>
      <button class="cta" type="button">Call the shop</button>
    </nav>
    <div class="hero">
      <h1>The plant, in one drawing.</h1>
      <img src="./assets/hero-iso-plant.jpg" alt="" />
    </div>`,
  ),
])

mockups.push([
  '12-split.html',
  page(
    '12 Split — Vesper',
    font('family=Outfit:wght@500;700'),
    `
    body { font-family: Outfit, sans-serif; color: #1c1914; background: #f4f1ea; overflow: hidden; }
    nav { display: flex; align-items: center; justify-content: space-between; padding: 18px 48px; }
    .links { opacity: .35; font-size: 14px; }
    .links a { margin: 0 12px; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #0f766e; color: #fff; font-weight: 700; }
    .hero { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; padding: 40px 48px; align-items: center; }
    h1 { font-size: 56px; line-height: .92; letter-spacing: -.05em; }
    .puck { width: 100%; height: 380px; object-fit: cover; border-radius: 36px; transform: perspective(1200px) rotateY(18deg); box-shadow: 0 40px 80px -36px #0005; }
    `,
    `<nav aria-label="Primary">
      <strong>Vesper</strong>
      <div class="links"><a href="#">Clinic</a><a href="#">Device</a><a href="#">Trials</a></div>
      <button class="cta" type="button">Book a demo</button>
    </nav>
    <div class="hero">
      <div>
        <h1>A clinic device you can turn.</h1>
        <p style="margin-top:16px;color:#5c574e;max-width:28rem;line-height:1.6">On scroll the bar splits: wordmark to the left edge, CTA to the right, links dissolve. This frame is mid-split.</p>
      </div>
      <img class="puck" src="./assets/hero-device-puck.jpg" alt="" />
    </div>`,
  ),
])

mockups.push([
  '13-island.html',
  page(
    '13 Island — Nimbus',
    font('family=DM+Sans:wght@500;700&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: "DM Sans", sans-serif; color: #e8f4ff; background: #071018; overflow: hidden; }
    .hero { min-height: 100vh; background: radial-gradient(40rem 20rem at 50% 0%, #22d3ee22, transparent); }
    .wrap { display: flex; justify-content: center; padding: 18px; }
    .island { display: flex; align-items: center; gap: 16px; padding: 10px 14px; border-radius: 22px; background: #0b2530; border: 1px solid #22d3ee44;
      box-shadow: 0 20px 40px -24px #000; min-width: 420px; }
    .pip { width: 8px; height: 8px; border-radius: 50%; background: #22d3ee; box-shadow: 0 0 12px #22d3ee; }
    .meta { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: #67e8f9; letter-spacing: .14em; }
    .avatars { display: flex; }
    .avatars b { width: 24px; height: 24px; border-radius: 50%; background: #16313c; border: 2px solid #0b2530; margin-left: -6px; font-size: 9px; display: grid; place-items: center; }
    h1 { text-align: center; margin-top: 120px; font-size: 64px; letter-spacing: -.05em; }
    p { text-align: center; color: #9ec4d8; margin-top: 12px; }
    `,
    `<div class="hero">
      <div class="wrap">
        <nav class="island" aria-label="Island">
          <i class="pip"></i>
          <strong>Nimbus</strong>
          <span class="meta">14 agents · canary 12%</span>
          <div class="avatars"><b>A</b><b>K</b><b>M</b></div>
        </nav>
      </div>
      <h1>The desk assembles itself.</h1>
      <p>A notch that morphs: mark → live tray → command. Not an iPhone screenshot.</p>
    </div>`,
  ),
])

mockups.push([
  '14-curtain.html',
  page(
    '14 Curtain — Kin',
    font('family=Bebas+Neue&family=Newsreader:ital@1&family=IBM+Plex+Mono:wght@500'),
    `
    body { background: #050505; color: #f7efe2; overflow: hidden; }
    .bg { position: absolute; inset: 0; background: url('./assets/hero-cinema-night.jpg') center/cover; filter: brightness(.35); }
    nav { position: relative; z-index: 2; display: flex; justify-content: space-between; padding: 22px 40px; font-family: "IBM Plex Mono", monospace; font-size: 12px; letter-spacing: .28em; }
    .menu { position: relative; z-index: 2; padding: 40px 40px 0; font-family: "Bebas Neue", sans-serif; }
    .menu a { display: block; font-size: 14vw; line-height: .78; letter-spacing: .04em; }
    .menu a small { font-family: Newsreader, serif; font-style: italic; font-size: 1.2rem; letter-spacing: 0; margin-left: 18px; opacity: .7; }
    `,
    `<div class="bg"></div>
    <nav><strong>KIN</strong><span>CLOSE</span></nav>
    <div class="menu">
      <a href="#">FILM <small>reel 04</small></a>
      <a href="#">SLOT <small>book</small></a>
      <a href="#">STUDIO <small>ss26</small></a>
    </div>`,
  ),
])

mockups.push([
  '15-dock.html',
  page(
    '15 Dock — Yard',
    font('family=Syne:wght@700;800'),
    `
    body { font-family: Syne, sans-serif; color: #f5f1ea; background: #111; overflow: hidden; }
    .hero { min-height: 100vh; background: url('./assets/hero-startup-loft.jpg') center/cover; }
    .scrim { position: absolute; inset: 0; background: linear-gradient(to top, #111 0%, transparent 45%); }
    h1 { position: relative; z-index: 2; padding: 80px 40px 0; font-size: 72px; letter-spacing: -.06em; }
    .dock { position: absolute; z-index: 3; left: 50%; bottom: 28px; transform: translateX(-50%); display: flex; align-items: flex-end; gap: 10px;
      padding: 12px 16px; border-radius: 28px; background: rgba(20,20,20,.72); border: 1px solid rgba(255,255,255,.12); backdrop-filter: blur(16px); }
    .dock span { width: 52px; height: 52px; border-radius: 16px; background: #222; display: grid; place-items: center; font-size: 11px; letter-spacing: .08em; }
    .dock span.hot { width: 72px; height: 72px; background: #facc15; color: #111; font-weight: 800; }
    `,
    `<div class="hero">
      <div class="scrim"></div>
      <h1>SEE THE WORK.</h1>
      <nav class="dock" aria-label="Dock">
        <span>INDEX</span><span>PRINT</span><span class="hot">FILM</span><span>YARD</span><span>BOOK</span>
      </nav>
    </div>`,
  ),
])

mockups.push([
  '16-rail.html',
  page(
    '16 Rail — Nimbus',
    font('family=DM+Sans:wght@500;700&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: "DM Sans", sans-serif; color: #e8f4ff; background: #071018; overflow: hidden; display: grid; grid-template-columns: 220px 1fr; min-height: 100vh; }
    aside { border-right: 1px solid #16313c; padding: 20px 16px; }
    .mark { font-weight: 700; margin-bottom: 24px; }
    aside a { display: flex; align-items: center; gap: 10px; padding: 10px 12px; border-radius: 12px; font-size: 14px; color: #9ec4d8; }
    aside a.here { background: #0b2530; color: #fff; }
    .pip { width: 8px; height: 8px; border-radius: 50%; background: #22d3ee; }
    .pip.off { background: #2a4450; }
    main { padding: 40px; }
    h1 { font-size: 48px; letter-spacing: -.05em; }
    .tiles { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-top: 28px; }
    .tile { background: #0b2530; border: 1px solid #22d3ee33; border-radius: 16px; padding: 16px; }
    .tile small { font-family: "IBM Plex Mono", monospace; font-size: 10px; color: #67e8f9; letter-spacing: .16em; }
    .tile b { display: block; font-size: 28px; margin-top: 6px; }
    `,
    `<aside>
      <div class="mark">Nimbus</div>
      <nav aria-label="Rail">
        <a class="here" href="#"><i class="pip"></i>Ops</a>
        <a href="#"><i class="pip"></i>Regions</a>
        <a href="#"><i class="pip off"></i>Status</a>
        <a href="#"><i class="pip off"></i>Agents</a>
      </nav>
    </aside>
    <main>
      <h1>Regions on one rail.</h1>
      <div class="tiles">
        <div class="tile"><small>ARR</small><b>248k</b></div>
        <div class="tile"><small>P95</small><b>98ms</b></div>
      </div>
    </main>`,
  ),
])

mockups.push([
  '17-folio.html',
  page(
    '17 Folio — Northbound',
    font('family=Syne:wght@700;800&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: Syne, sans-serif; color: #f5f1e8; background: #0b0b0b; overflow: hidden; }
    nav { display: flex; align-items: flex-start; justify-content: space-between; padding: 24px 40px; }
    .index { font-family: "IBM Plex Mono", monospace; font-size: 13px; line-height: 2; color: #b5aea2; }
    .index b { color: #f97316; }
    .cta { height: 40px; padding: 0 16px; border-radius: 999px; border: 0; background: #f97316; color: #1a0b00; font-weight: 800; }
    .letters { display: flex; gap: 8px; padding: 40px; }
    .letters span { flex: 1; height: 280px; background-size: cover; background-position: center; font-size: 18vw; line-height: 280px; text-align: center;
      font-weight: 800; -webkit-background-clip: text; color: transparent; }
    `,
    `<nav aria-label="Primary">
      <strong>NORTHBOUND</strong>
      <div class="index"><b>01</b> Harbor<br>02 Pulse<br>03 Hearth<br>04 Kin<br>05 Playfield</div>
      <button class="cta" type="button">Start a brief</button>
    </nav>
    <div class="letters">
      <span style="background-image:url('./assets/hero-agency-wall.jpg')">N</span>
      <span style="background-image:url('./assets/hero-magazine-spread.jpg')">O</span>
      <span style="background-image:url('./assets/hero-cinema-night.jpg')">R</span>
    </div>`,
  ),
])

mockups.push([
  '18-portal.html',
  page(
    '18 Portal — Agency OS',
    font('family=DM+Sans:wght@500;700&family=IBM+Plex+Mono:wght@500'),
    `
    body { font-family: "DM Sans", sans-serif; color: #e8f4ff; background: #071018; overflow: hidden; }
    nav { display: flex; align-items: center; gap: 16px; padding: 12px 20px; background: #0b2530; border-bottom: 1px solid #16313c; }
    .ws { font-size: 13px; padding: 6px 10px; border-radius: 8px; background: #071018; border: 1px solid #22d3ee33; }
    .search { flex: 1; height: 36px; border-radius: 8px; background: #071018; border: 1px solid #16313c; color: #9ec4d8; font-family: "IBM Plex Mono", monospace; font-size: 12px; padding: 0 12px; display: flex; align-items: center; }
    .live { font-family: "IBM Plex Mono", monospace; font-size: 11px; color: #67e8f9; }
    .live i { display: inline-block; width: 6px; height: 6px; border-radius: 50%; background: #22d3ee; margin-right: 6px; }
    .grid { display: grid; grid-template-columns: 1.2fr .8fr; gap: 12px; padding: 20px; }
    .tile { background: #0b2530; border: 1px solid #22d3ee33; border-radius: 16px; padding: 16px; min-height: 160px; }
    .tile small { font-family: "IBM Plex Mono", monospace; font-size: 10px; letter-spacing: .16em; color: #67e8f9; }
    img { width: 100%; height: 200px; object-fit: cover; border-radius: 12px; margin-top: 12px; }
    `,
    `<nav aria-label="Portal">
      <strong>Nimbus</strong>
      <span class="ws">Folio ▾</span>
      <div class="search">Jump to incident, agent, region… ⌘K</div>
      <span class="live"><i></i>14 on desk</span>
      <span class="live">watch checkout-edge</span>
    </nav>
    <div class="grid">
      <div class="tile"><small>INCIDENTS</small><p style="margin-top:12px;font-family:IBM Plex Mono,monospace;font-size:13px">14:02 checkout-edge · watch<br>13:51 ingest-eu · clear</p></div>
      <div class="tile"><small>DESK CAM</small><img src="./assets/hero-startup-loft.jpg" alt="" /></div>
    </div>`,
  ),
])

for (const [name, html] of mockups) {
  writeFileSync(join(dir, name), html)
  console.log('wrote', name)
}
console.log(mockups.length, 'mockups')
