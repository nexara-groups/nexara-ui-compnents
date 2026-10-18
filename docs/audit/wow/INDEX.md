# Wow signature audit

Research: [docs/research/wow-benchmark.md](../../research/wow-benchmark.md).

Every catalog family keeps its sensible variants and adds 4–5 gold **Signature** cells. Docs gallery chips them. Gold is not an Awwwards stamp.

## Proof

Motion: `round13-motion.webm` / `.gif` (pin chapters 01–04 + loaders) when recaptured; prior `round12-motion.webm`. Chapter stills: `hero-pin-scroll-ch2.png`, `hero-pin-scroll-ch3.png`, `hero-pin-scroll-ch4.png`.

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

- Round 12 scored `daee816`: [visual critic](https://cursor.com/agents/bc-b4cae384-0890-52ff-b08a-f3f11c3573d1) **REJECT ALL** 0/47; [sceptical lead](https://cursor.com/agents/bc-7a27e41c-b8a5-59fb-abb9-d8c3851bcd2a) **REJECT ALL** 0/47. Motion / a11y were still running on that SHA.
- Round 13 closes the named leftovers (pin objects, pulse-halo station, fold desk, globe-agency page, morph cinema, destocked orbit/tilt). It does **not** claim the standout test.
- Pin-scroll is still CSS and stock photography. It is not a filmed Apple product page.
- One leftover `TiltGlare` on `glare-tilt` (the name). `OrbitRing` is off `globe-orbit`.
- No physical-device pass. Captures are Playwright against Vite on `127.0.0.1:5173`.
