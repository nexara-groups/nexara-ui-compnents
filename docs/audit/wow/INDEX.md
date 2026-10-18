# Wow signature audit

Research: [docs/research/wow-benchmark.md](../../research/wow-benchmark.md).

Every catalog family keeps its sensible variants and adds 4–5 gold **Signature** cells. Docs gallery chips them. Gold is not an Awwwards stamp.

## Proof

Motion: `round12-motion.webm` / `.gif` (pin-scroll chapters 01→04 + loaders). Chapter stills: `hero-pin-scroll-ch2.png`, `hero-pin-scroll-ch4.png`. Earlier clips: `round11-motion.webm`, `signatures-motion.webm`, `shader-void-motion.webm`.

Stills (1280, dark):

- Heroes: `hero-shader-void`, `hero-pin-scroll`, `hero-scramble-mast`, `hero-globe-orbit`, `hero-morph-stage`
- Buttons: `button-liquid`, `button-ink-path`, `button-glare`, `button-burst`
- Field / proof: `aurora-shader-mesh`, `aurora-globe-field`, `stats-odometer`, `pricing-shader-featured`, `testimonials-scramble-pull`, `footer-giant-marquee`, `modal-shader-veil`, `tabs-layout-morph`, `accordion-shader-row`, `cta-liquid-wash`, `nav-glass-liquid`, `card-glare-tilt`
- Kits: `kit-shader-clinic` (mesh mast + full healthcare page), `kit-globe-agency`, `kit-pin-sports`
- Loaders: `loader-pulse-halo`, `loader-path-infinity`, `loader-flap-wait`, `loader-prism-bar`, `loader-barcode-scan`
- App-kit: `app-radar-jump`, `kanban-wip-pendulum`, `card-lens-spec`, `testimonials-polaroid-quotes`, `stats-dial-gauge`, `nav-compass`, `pricing-prism-price`
- Phone 375 / tablet 768: `hero-pin-scroll-phone|tablet`, `loader-pulse-halo-phone|tablet`

## Checks held

- `prefers-reduced-motion` snaps to the end state (shader/particles/globe freeze; scramble shows the sentence; pin-scroll shows chapter 4 without an autoplay reel)
- Looping ornament has a visible Pause, including the loader family and GooPuddle sites
- 3D crystal is a separate Vite chunk (`wow-scene`) and only mounts in view
- Canvas DPR capped at 1.5; particle count drops under 500px
- 375 stacking holds on the captured heroes / buttons / kits / loaders (no page-level overflow in those shots)

## Dependencies added

- `three` and `@react-three/fiber` (lazy 3D only)
- `@types/three` (dev)

Shaders, particles, and the globe are raw WebGL / canvas and do not need those packages.

## Honest gaps

- Round 11 scored `a4c5592`: [sceptical lead](https://cursor.com/agents/bc-33a9cec7-833f-5dc0-b53d-ad5afdb8a0ea) **REJECT ALL** (0/47 standout); [motion critic](https://cursor.com/agents/bc-8f2a83c1-dfd0-57c5-b375-3216d9298256) **CONDITIONAL** 66/199; [a11y critic](https://cursor.com/agents/bc-057321bf-803c-5d03-8c2b-e49dd4c88308) **REJECT** on Pause / reduced-motion; visual critic stalled with no verdict.
- Round 12 answers those named blockers. Critics have not re-scored. This is not a unanimous approve.
- Pin-scroll is an object-centric CSS story on a stock device still. It is not a filmed Apple product page.
- Unique helpers are finished constructions inside this repo. They are not a claim that every gold cell would sit next to a top Aceternity globe.
- One leftover `OrbitRing` on `hero / globe-orbit`. One leftover `TiltGlare` on glare button and glare-tilt card.
- No physical-device pass. Captures are Playwright against Vite on `127.0.0.1:5173`.
