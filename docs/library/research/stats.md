# Stats — research moodboard (2025–2026)

Inspiration only. No layout, type, or motion is copied. This is a **section** family (stats / counters), not the Marquee `stats` track and not the Bento `stat` tile. Local stills from the earlier flagship pass live in `docs/flagship/references/` and `docs/flagship/proof/dashboard-1280.png` (brass counters).

## Sources opened this pass

| Source | What was actually looked at |
| --- | --- |
| 21st.dev `/community/components/s/stat` | 88 cards. Recurring: Numbers Stats Grid / Stats Grid (4-up), Stats cards with links, Stats Bento, Stats Band (hairline row + tiny inline chart), Ruixen Stats (hero CountUp over a live area chart), Featured Section Stats (CRM + blue-gradient Recharts), Activity Stats Card, Donut Chart With Center Stats, Partition Bar, Stacked Diverging bar, Globe CDN, 8-bit Stats Dashboard, Skill Level Meters, Sparkline stickers. |
| 21st.dev `/community/components/s/animated-number-counter` | 48 cards. Recurring: Magic `Number Ticker` (Dillion Verma), Number Flow (Barvian — barrels), Rolling Digits, Sliding Number, Shuffle Number, Animated Number Flip, Count Up, GitHub Stars Animation, Number Flow Trading, Skills Progress Dashboard, Ruixen Stats again. |
| Aceternity `/blocks/stats-sections` | **Stats With Number Ticker** (4-col, `useInView` + `useSpring`, count from 0, blur-to-clear, 0.1s stagger). **Stats With Gradient** (glass 4-up, purple `blur-3xl` beam, decorative SVG bars). **Stats With Grid Background** (same four-up on a grid wallpaper). **Stats For Changelog** is a *dated tab list*, not a counter. |
| Magic UI | `NumberTicker` is a *primitive*: inView once, `useSpring` (damping 60 / stiffness 100), `textContent` lerp, `en-US` format, `startValue` / `decimalPlaces` / `direction`. Not a section. Companion `AnimatedCircularProgressBar` is an indigo SVG gauge; the docs demo **loops 0→100→0**. |
| Number Flow (Barvian, `number-flow.barvian.me`) | Digit-roll odometer. `respectMotionPreference` defaults **true**. `trend`, `plugins.continuous`, prefix/suffix, `Intl` format. The mechanism 21st copies when it is not interpolating a string. |
| Awwwards 2025–26 | **State of AI 2025** (Vention) — on-scroll data viz, timeline, chapters; figures are stations. **Ai in Design Report 2026** (++hellohello, SOTD 26 Aug 2026, Framer) — editorial charts as magazine spreads, not KPI tiles. **Annual Awards 2025** Hall of Fame (Lando Norris SOTY) is a *scored list*, not a 4-up. Stack: scroll-tied type, GSAP/Framer, paper charts. |
| Pinterest Analytics + 2025–26 boards | Product Overview: impressions / engagements / saves / outbound clicks as cream rounded cards, green `%` chips, Pin Sans, 16px radius. Boards: cream editorial numbers vs dark glass “SaaS KPI” kits. The quiet metric is useful; the Overview 4-pack is the clone. |
| Dribbble 2025–26 | Glass dark KPI 4-packs with up-arrows; circular-progress clusters; analog gauges / VU / cockpit; isometric ops dashboards; “AI analytics” lucide + sparkline. Instrument shots are useful. Glass 4-packs are not. |
| Existing local captures | `docs/flagship/references/{21st,aceternity,magicui,awwwards,godly,linear,anthropic}.png`. Observatory: `docs/flagship/proof/dashboard-1280.png`. Marquee sample still bakes `128` / `Rooms`. |

## Named trends

1. **Digit-roll as the object** — barrels, not interpolating `textContent`. Number Flow; 21st Rolling Digits / Sliding Number.
2. **Count-from-zero on inView** — Magic NumberTicker; Aceternity Stats With Number Ticker. 2024 residue. Saturated as a section.
3. **Hairline stats band** — 21st Stats Band. A tape of figures, optional tiny inline chart, no card chrome.
4. **Sentence figures** — the number is a word in a claim. Awwwards report type; cream editorial (Anthropic / Pinterest chrome).
5. **Four-up KPI with delta arrows** — 21st Stats Grid; Aceternity four-col; Pinterest Overview; Dribbble KPI farms. The kill.
6. **Glass + gradient beam** — Aceternity Stats With Gradient. Atmosphere as the idea.
7. **CountUp on a live area chart** — Ruixen Stats; Featured Section Stats. Dashboard as marketing.
8. **One ring as completeness** — Magic circular gauge; 21st donut-with-center. A single hole is an object. Four donuts is a kit. Looping 0–100 is a loader.
9. **Scroll-tied chapters of data** — State of AI 2025; Ai in Design Report 2026. Figures as stations on native scroll.
10. **Contained analog instrument** — Dribbble gauges; flagship brass counters. A named dial in a plate, not a cockpit.
11. **Share as length** — 21st Partition Bar; stacked diverging bar. Comparison without vanity count-up.

## Saturated — do not ship

**Four metric cards with up-arrows.** Icon + figure + green chip + sparkline. Aceternity glass 4-col + purple beam. Count-from-zero blur stagger (0.1s × 4). Mesh/aurora behind numbers. GitHub stars widget. Globe CDN / dotted world map. `99.9%` uptime. `$ARR`. Skills meters. 8-bit dashboard costume. Infinite circular-progress loop. Number Flow Trading as the section. Marquee-of-stats (wrong family). Helio `128` / `Rooms` / brass as defaults. Dark navy + violet mesh.

## Library-useful (finite props, reduced-motion end state)

Hairline strip. Sentence figures. One ring (arc seats once). Comparative bars. Digit-roll barrels with the final figure already on the page. Spring wall of plates (not KPI chrome). Paper ledger. Versus pair. Native-scroll cascade (no hijack). Contained instrument dial with a required still. One aimed plot; numbers are captions. Theme via `--nx-*`. `prefers-reduced-motion` shows the final figures immediately.
