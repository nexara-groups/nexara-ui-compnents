#!/usr/bin/env node
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'

const dir = resolve('docs/library/hero/mockups')
mkdirSync(dir, { recursive: true })

const pages = [
  {
    file: '13-rotate.html',
    title: '13 Rotate — Vesper',
    body: `<style>
      html,body{height:100%;margin:0;background:#f4f1ea;font-family:Outfit,sans-serif;color:#1c1914}
      nav{display:flex;justify-content:space-between;padding:22px 40px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:40px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:72px;line-height:.92;letter-spacing:-.05em;margin:12px 0}
      .k{font-family:monospace;font-size:11px;letter-spacing:.22em;color:#0f766e;text-transform:uppercase}
      .puck{width:420px;height:420px;border-radius:36px;overflow:hidden;transform:perspective(1200px) rotateY(-18deg) rotateX(8deg);box-shadow:0 40px 80px -36px rgba(28,25,20,.45)}
      .puck img{width:100%;height:100%;object-fit:cover}
      .chip{position:absolute;background:#fff;padding:10px 14px;border-radius:16px;box-shadow:0 10px 30px rgba(0,0,0,.12);font-size:13px}
      .btn{height:44px;border:0;border-radius:999px;padding:0 16px;background:#0f766e;color:#fff;font-weight:600}
    </style>
    <nav><strong>Vesper</strong><span>Clinic · Device · Trials</span></nav>
    <div class="grid">
      <div>
        <p class="k">Vesper Pulse · 510(k) cleared</p>
        <h1>A clinic device<br>you can turn.</h1>
        <p>Pulse sits on the intake desk at Harbor Clinic. The puck turns — heart rate, SpO₂, and skin temperature on one ring.</p>
        <button class="btn">Reserve Pulse</button>
      </div>
      <div style="position:relative">
        <div class="puck"><img src="./assets/hero-device-puck.jpg" alt=""></div>
        <div class="chip" style="top:24px;right:0">HR 72 bpm</div>
        <div class="chip" style="bottom:40px;left:0">SpO₂ 98%</div>
      </div>
    </div>`,
  },
  {
    file: '14-veil.html',
    title: '14 Veil — Kin',
    body: `<style>
      html,body{height:100%;margin:0;background:#000;color:#f7efe2;font-family:"Bebas Neue",sans-serif}
      .stage{position:relative;height:100vh;overflow:hidden}
      video,img.bg{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .copy{position:relative;z-index:2;height:100%;display:flex;flex-direction:column;justify-content:flex-end;padding:48px}
      h1{font-size:22vw;line-height:.78;margin:0;mix-blend-mode:difference;color:#fff;letter-spacing:.04em}
      p{font-family:Newsreader,serif;font-style:italic;max-width:28rem}
      nav{position:relative;z-index:3;display:flex;justify-content:space-between;padding:22px 40px;letter-spacing:.28em}
    </style>
    <div class="stage">
      <img class="bg" src="./assets/hero-cinema-night.jpg" alt="">
      <nav><strong>KIN</strong><span>FASHION FILM · SS26</span></nav>
      <div class="copy">
        <p style="font-family:monospace;letter-spacing:.28em;color:#e8c36a">KIN PICTURES · REEL 04</p>
        <h1>VEIL</h1>
        <p>The type is a window. Rain, sodium lamps, and a coat that moves.</p>
      </div>
    </div>`,
  },
  {
    file: '15-splice.html',
    title: '15 Splice — Hearth',
    body: `<style>
      html,body{height:100%;margin:0;background:#ece7dc;font-family:Fraunces,serif;color:#1a1612}
      nav{display:flex;justify-content:space-between;padding:22px 40px}
      .grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:36px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:64px;line-height:.9}
      h1 i{color:#9a3412}
      .split{position:relative;height:520px;border-radius:28px;overflow:hidden}
      .split img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .before{clip-path:inset(0 48% 0 0)}
      .bar{position:absolute;top:0;bottom:0;left:52%;width:2px;background:#fff}
      .knob{position:absolute;top:50%;left:52%;transform:translate(-50%,-50%);width:40px;height:40px;border-radius:50%;background:#fff;display:grid;place-items:center;font-size:12px;font-weight:700}
    </style>
    <nav><strong>Hearth</strong><span>Rooms · Studio · Book</span></nav>
    <div class="grid">
      <div>
        <p style="font-family:monospace;letter-spacing:.2em;color:#9a3412;font-size:11px">HEARTH STUDIO · LOFT 4B</p>
        <h1>The room,<br><i>rewritten.</i></h1>
        <p>Tuesday’s empty plaster on the left, Friday’s oak and linen on the right.</p>
      </div>
      <div class="split">
        <img src="./assets/hero-room-after.jpg" alt="">
        <img class="before" src="./assets/hero-room-before.jpg" alt="">
        <div class="bar"></div><div class="knob">◂▸</div>
      </div>
    </div>`,
  },
  {
    file: '16-mesh.html',
    title: '16 Mesh — Iris',
    body: `<style>
      html,body{height:100%;margin:0;background:#12081c;color:#f6f0ff;font-family:Syne,sans-serif;text-align:center}
      .blob{position:absolute;filter:blur(70px);border-radius:40%}
      nav{position:relative;z-index:2;display:flex;justify-content:space-between;padding:22px 40px}
      .hero{position:relative;z-index:2;padding-top:18vh}
      h1{font-size:18vw;letter-spacing:-.06em;line-height:.86;margin:0}
      .cards{display:grid;grid-template-columns:repeat(3,1fr);gap:12px;max-width:720px;margin:40px auto 0;text-align:left}
      .card{border:1px solid rgba(255,255,255,.15);background:rgba(255,255,255,.08);padding:16px;border-radius:16px}
    </style>
    <div class="blob" style="width:50vw;height:50vw;left:8%;top:-10%;background:radial-gradient(circle,#f472b6,transparent 64%)"></div>
    <div class="blob" style="width:46vw;height:46vw;right:-8%;top:20%;background:radial-gradient(circle,#818cf8,transparent 62%)"></div>
    <div class="blob" style="width:40vw;height:40vw;left:30%;bottom:-18%;background:radial-gradient(circle,#22d3ee,transparent 60%)"></div>
    <nav><strong>Iris</strong><span>Canvas · Tokens · Pricing</span></nav>
    <div class="hero">
      <p style="font-family:monospace;letter-spacing:.24em;color:#f9a8d4;font-size:11px">IRIS CANVAS · LIVE MESH</p>
      <h1>IRIS</h1>
      <p>A morphing mesh, then the product. Tokens, type, and a live proof card.</p>
      <div class="cards">
        <div class="card"><small>PALETTE</small><b>Magenta · Violet · Ice</b></div>
        <div class="card"><small>DEPLOYS</small><b>2,184 this week</b></div>
        <div class="card"><small>STUDIOS</small><b>Northstar · Vale · Harbor</b></div>
      </div>
    </div>`,
  },
  {
    file: '17-glyph.html',
    title: '17 Glyph — North',
    body: `<style>
      html,body{height:100%;margin:0;background:#0b0b0b;color:#f5f1e8;font-family:Syne,sans-serif}
      nav{display:flex;justify-content:space-between;padding:22px 40px;letter-spacing:.2em}
      .stage{display:flex;flex-direction:column;align-items:center;justify-content:center;height:calc(100vh - 72px)}
      .word{display:flex;gap:.02em;font-size:18vw;font-weight:800;line-height:1;letter-spacing:-.06em}
      .word span{background-size:cover;background-position:50% 40%;-webkit-background-clip:text;color:transparent}
      p{max-width:36rem;text-align:center;color:#c4bdb0}
    </style>
    <nav><strong>NORTH</strong><span>Work · Studio · Index</span></nav>
    <div class="stage">
      <p style="font-family:monospace;letter-spacing:.24em;color:#f97316;font-size:11px">NORTHBOUND · INDEPENDENT STUDIO</p>
      <div class="word">
        <span style="background-image:url('./assets/hero-agency-wall.jpg')">N</span>
        <span style="background-image:url('./assets/hero-editorial-architecture.jpg')">O</span>
        <span style="background-image:url('./assets/hero-print-mountains.jpg')">R</span>
        <span style="background-image:url('./assets/hero-magazine-spread.jpg')">T</span>
        <span style="background-image:url('./assets/hero-startup-loft.jpg')">H</span>
      </div>
      <p>Photography lives inside the letters. Campaigns, spaces, and the type that holds them.</p>
    </div>`,
  },
  {
    file: '18-fan.html',
    title: '18 Fan — Folio',
    body: `<style>
      html,body{height:100%;margin:0;background:#f6f3ec;font-family:"Plus Jakarta Sans",sans-serif;color:#171412}
      nav{display:flex;justify-content:space-between;padding:22px 40px}
      .grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:32px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:56px;line-height:.94}
      .fan{position:relative;height:480px}
      .card{position:absolute;top:40px;left:50%;width:210px;background:#fff;border-radius:18px;overflow:hidden;box-shadow:0 24px 50px -28px rgba(23,20,18,.5)}
      .card img{height:180px;width:100%;object-fit:cover;display:block}
      .card p{padding:10px 12px;margin:0;font-size:13px}
    </style>
    <nav><strong>Folio</strong><span>Work · People · Journal</span></nav>
    <div class="grid">
      <div>
        <p style="font-family:monospace;letter-spacing:.2em;color:#be123c;font-size:11px">FOLIO · INDEPENDENT AGENCY</p>
        <h1>Work that<br>lands in a fan.</h1>
        <p>Five campaigns, one stack. Harbor Athletic, Vesper, and Hearth.</p>
      </div>
      <div class="fan">
        <article class="card" style="transform:translateX(-50%) rotate(-22deg) translateX(-84px)"><img src="./assets/hero-athlete.jpg"><p>Harbor Athletic</p></article>
        <article class="card" style="transform:translateX(-50%) rotate(-11deg) translateX(-42px)"><img src="./assets/hero-device-puck.jpg"><p>Vesper Pulse</p></article>
        <article class="card" style="transform:translateX(-50%) rotate(0)"><img src="./assets/hero-room-after.jpg"><p>Hearth 4B</p></article>
        <article class="card" style="transform:translateX(-50%) rotate(11deg) translateX(42px)"><img src="./assets/hero-academy.jpg"><p>Playfield</p></article>
        <article class="card" style="transform:translateX(-50%) rotate(22deg) translateX(84px)"><img src="./assets/hero-cinema-night.jpg"><p>Kin Veil</p></article>
      </div>
    </div>`,
  },
  {
    file: '19-ribbon.html',
    title: '19 Ribbon — Yard',
    body: `<style>
      html,body{height:100%;margin:0;background:#111;color:#f5f1ea;font-family:Syne,sans-serif}
      .row{display:flex;gap:12px;overflow:hidden;padding:20px 0}
      .row figure{flex:0 0 220px;margin:0;border-radius:16px;overflow:hidden}
      .row img{height:140px;width:100%;object-fit:cover;display:block}
      figcaption{background:#1a1a1a;padding:8px 12px;font-family:monospace;font-size:11px;letter-spacing:.14em;color:#facc15}
      .mid{text-align:center;padding:40px 24px}
      h1{font-size:96px;line-height:.86;letter-spacing:-.06em;margin:8px 0}
    </style>
    <div class="row">
      <figure><img src="./assets/hero-agency-wall.jpg"><figcaption>NORTH WALL</figcaption></figure>
      <figure><img src="./assets/hero-athlete.jpg"><figcaption>NIGHT TRACK</figcaption></figure>
      <figure><img src="./assets/hero-room-after.jpg"><figcaption>LOFT 4B</figcaption></figure>
      <figure><img src="./assets/hero-academy.jpg"><figcaption>PLAYFIELD</figcaption></figure>
      <figure><img src="./assets/hero-magazine-spread.jpg"><figcaption>FOLIO 11</figcaption></figure>
      <figure><img src="./assets/hero-cinema-night.jpg"><figcaption>KIN REEL</figcaption></figure>
    </div>
    <div class="mid">
      <p style="font-family:monospace;letter-spacing:.24em;color:#facc15;font-size:11px">YARD STUDIO · SELECTED WORK</p>
      <h1>SEE THE<br>WORK.</h1>
      <p>An infinite ribbon of commissions. Two lanes, always moving, always named.</p>
    </div>
    <div class="row">
      <figure><img src="./assets/hero-device-puck.jpg"><figcaption>PULSE</figcaption></figure>
      <figure><img src="./assets/hero-hvac-roof.jpg"><figcaption>KILN ROOF</figcaption></figure>
      <figure><img src="./assets/hero-iso-plant.jpg"><figcaption>PLANT 03</figcaption></figure>
      <figure><img src="./assets/hero-clinic-lobby.jpg"><figcaption>HARBOR</figcaption></figure>
      <figure><img src="./assets/hero-startup-loft.jpg"><figcaption>YARD HQ</figcaption></figure>
      <figure><img src="./assets/hero-print-mountains.jpg"><figcaption>PRINT 07</figcaption></figure>
    </div>`,
  },
  {
    file: '20-converse.html',
    title: '20 Converse — Harbor Clinic',
    body: `<style>
      html,body{height:100%;margin:0;background:#f7f5f2;font-family:"IBM Plex Sans",sans-serif;color:#1c1917}
      nav{display:flex;justify-content:space-between;padding:22px 40px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:52px;line-height:.94}
      .chat{background:#fff;border-radius:28px;overflow:hidden;box-shadow:0 30px 60px -32px rgba(28,25,23,.35)}
      .bubble{margin:8px 16px;padding:10px 12px;border-radius:16px;font-size:13px}
      .user{margin-left:48px;background:#0369a1;color:#fff}
      .agent{margin-right:48px;background:#f3efe9}
      .lobby{height:120px;width:100%;object-fit:cover;display:block}
    </style>
    <nav><strong>Harbor Clinic</strong><span>Visit · Doctors · Records</span></nav>
    <div class="grid">
      <div>
        <p style="font-family:monospace;letter-spacing:.2em;color:#0369a1;font-size:11px">HARBOR CLINIC · INTAKE</p>
        <h1>The visit<br>starts as a chat.</h1>
        <p>Named doctors, real rooms, a Pulse reading from last week if you have one.</p>
      </div>
      <div class="chat">
        <img class="lobby" src="./assets/hero-clinic-lobby.jpg" alt="">
        <div class="bubble user">I’d like a follow-up for my knee. Thursday if Dr. Okonkwo is in.</div>
        <div class="bubble agent">Thursday 9:20 is open on Dr. Okonkwo’s list. I’ll hold it for Harbor Clinic, room 2.</div>
        <div class="bubble user">Please send the pre-visit note to my phone.</div>
        <div class="bubble agent">Sent. Bring the Pulse ring if you still have last week’s reading.</div>
      </div>
    </div>`,
  },
  {
    file: '21-assemble.html',
    title: '21 Assemble — Nimbus',
    body: `<style>
      html,body{height:100%;margin:0;background:#071018;color:#e8f4ff;font-family:"DM Sans",sans-serif}
      nav{display:flex;justify-content:space-between;padding:22px 40px}
      .grid{display:grid;grid-template-columns:.85fr 1.15fr;gap:32px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:56px;line-height:.92}
      .tiles{display:grid;grid-template-columns:1fr 1fr;gap:12px}
      .tile{border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);padding:16px;border-radius:16px;backdrop-filter:blur(12px)}
      .wide{grid-column:1 / -1}
      small{font-family:monospace;letter-spacing:.16em;color:#67e8f9}
    </style>
    <nav><strong>Nimbus</strong><span>Ops · Regions · Status</span></nav>
    <div class="grid">
      <div>
        <p style="font-family:monospace;letter-spacing:.22em;color:#22d3ee;font-size:11px">NIMBUS · GLASS OPS</p>
        <h1>The desk<br>assembles itself.</h1>
        <p>Tiles fly in, numbers count, the sparkline keeps moving.</p>
      </div>
      <div class="tiles">
        <div class="tile wide"><small>ARR</small><b style="font-size:32px;display:block">$248k</b></div>
        <div class="tile"><small>LATENCY</small><b>98ms</b></div>
        <div class="tile"><small>LIVE</small><b>14 agents</b></div>
        <div class="tile wide"><img src="./assets/hero-glass-laptop.jpg" alt="" style="height:110px;width:100%;object-fit:cover;border-radius:12px"></div>
      </div>
    </div>`,
  },
  {
    file: '22-iso.html',
    title: '22 Iso — Kiln',
    body: `<style>
      html,body{height:100%;margin:0;background:#e8eef2;font-family:"Space Grotesk",sans-serif;color:#123043}
      nav{display:flex;justify-content:space-between;padding:22px 40px}
      .grid{display:grid;grid-template-columns:1fr 1fr;gap:36px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:54px;line-height:.94}
      .plate{position:relative;border-radius:28px;overflow:hidden;height:520px}
      .plate img{width:100%;height:100%;object-fit:cover}
      .chip{position:absolute;background:#fff;padding:8px 12px;border-radius:12px;font-size:12px;box-shadow:0 8px 24px rgba(18,48,67,.18)}
    </style>
    <nav><strong>Kiln Mechanical</strong><span>Plants · Service · Drawings</span></nav>
    <div class="grid">
      <div>
        <p style="font-family:monospace;letter-spacing:.2em;color:#c2410c;font-size:11px">KILN · PLANT 03 · HVAC</p>
        <h1>The plant,<br>in one drawing.</h1>
        <p>Coils, ducts, and live temperatures from plant 03.</p>
      </div>
      <div class="plate">
        <img src="./assets/hero-iso-plant.jpg" alt="">
        <div class="chip" style="top:16px;left:16px">Coil A · 64°</div>
        <div class="chip" style="bottom:24px;right:16px;background:#c2410c;color:#fff">Roof plant 03</div>
      </div>
    </div>`,
  },
  {
    file: '23-league.html',
    title: '23 League — Harbor Athletic',
    body: `<style>
      html,body{height:100%;margin:0;background:#04150f;color:#e8ffe9;font-family:Archivo,sans-serif}
      .stage{position:relative;height:100vh;overflow:hidden}
      .stage img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}
      .veil{position:absolute;inset:0;background:linear-gradient(90deg,#04150f,rgba(4,21,15,.55),transparent)}
      nav, .copy{position:relative;z-index:2}
      nav{display:flex;justify-content:space-between;padding:22px 40px;letter-spacing:.14em}
      .copy{padding:0 48px;position:absolute;bottom:64px;max-width:40rem}
      h1{font-size:72px;line-height:.88;letter-spacing:-.05em}
      .gold{color:#facc15}
    </style>
    <div class="stage">
      <img src="./assets/hero-athlete.jpg" alt="">
      <div class="veil"></div>
      <nav><strong>HARBOR ATHLETIC</strong><span>Fixtures · Clubs · Tickets</span></nav>
      <div class="copy">
        <p style="font-family:monospace;letter-spacing:.24em;color:#facc15;font-size:11px">HARBOR ATHLETIC · NIGHT MEET</p>
        <h1>The association,<br>after dark.</h1>
        <p>Friday night under the floodlights. <span class="gold">48.02</span> women’s 400 · 12 clubs on the card.</p>
      </div>
    </div>`,
  },
  {
    file: '24-pop.html',
    title: '24 Pop — Playfield',
    body: `<style>
      html,body{height:100%;margin:0;background:#fff7ed;font-family:Outfit,sans-serif;color:#1c1917}
      .blob{position:absolute;border-radius:50%;filter:blur(32px);opacity:.8}
      nav{position:relative;z-index:2;display:flex;justify-content:space-between;padding:22px 40px}
      .grid{position:relative;z-index:2;display:grid;grid-template-columns:1fr 1fr;gap:36px;padding:20px 48px;align-items:center;height:calc(100vh - 72px)}
      h1{font-size:58px;line-height:.92}
      h1 span{color:#f43f5e}
      .photo{border-radius:32px;overflow:hidden;height:520px;border:4px solid #fff;box-shadow:0 30px 60px -28px rgba(80,40,40,.35)}
      .photo img{width:100%;height:100%;object-fit:cover}
    </style>
    <div class="blob" style="width:180px;height:180px;left:8%;top:18%;background:#fb7185"></div>
    <div class="blob" style="width:160px;height:160px;left:72%;top:12%;background:#38bdf8"></div>
    <div class="blob" style="width:140px;height:140px;left:18%;top:70%;background:#facc15"></div>
    <nav><strong>Playfield</strong><span>Classes · Teachers · Apply</span></nav>
    <div class="grid">
      <div>
        <p style="font-family:monospace;letter-spacing:.18em;color:#f43f5e;font-size:11px">PLAYFIELD ACADEMY · SPRING TERM</p>
        <h1>A school that<br>looks like <span>Saturday.</span></h1>
        <p>Morning drawing, afternoon games, a courtyard that already looks like the first day of term.</p>
      </div>
      <div class="photo"><img src="./assets/hero-academy.jpg" alt=""></div>
    </div>`,
  },
]

const font = `https://fonts.googleapis.com/css2?family=Archivo:wght@400;800&family=Bebas+Neue&family=DM+Sans:wght@400;700&family=Fraunces:ital,wght@0,600;1,520&family=IBM+Plex+Sans:wght@400;600&family=Newsreader:ital,wght@1,400&family=Outfit:wght@400;700&family=Plus+Jakarta+Sans:wght@600;800&family=Space+Grotesk:wght@500;700&family=Syne:wght@700;800&display=swap`

for (const page of pages) {
  writeFileSync(
    resolve(dir, page.file),
    `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${page.title}</title>
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link href="${font}" rel="stylesheet" />
</head>
<body>
${page.body}
</body>
</html>
`,
  )
  console.log('wrote', page.file)
}
