# Wow signature audit

Research: [docs/research/wow-benchmark.md](../../research/wow-benchmark.md).

Every catalog family keeps its sensible variants and adds 4–5 gold **Signature** cells. Docs gallery chips them.

## Proof

Motion: `signatures-motion.webm`, `signatures-motion.gif` (docs tour: liquid button, stats ticker). `shader-void-motion.webm` / `.gif` is the shader hero with pointer and Pause.

Stills (1280, dark):

- Heroes: `hero-shader-void`, `hero-pin-scroll`, `hero-scramble-mast`, `hero-globe-orbit`, `hero-morph-stage`
- Buttons: `button-liquid`, `button-ink-path`, `button-glare`, `button-burst`
- Field / proof: `aurora-shader-mesh`, `aurora-globe-field`, `stats-odometer`, `pricing-tilt-glare`, `pricing-shader-featured`, `testimonials-scramble-pull`, `footer-giant-marquee`, `modal-shader-veil`, `tabs-layout-morph`, `accordion-shader-row`, `cta-liquid-wash`, `nav-glass-liquid`, `card-glare-tilt`
- Kits: `kit-shader-clinic` (mesh mast + full healthcare page), `kit-globe-agency`
- Round-8 name-true cells: `typewriter-flap-3d`, `typewriter-matrix-rain`, `countdown-analog`, `card-physics-deck`, `button-shatter`
- Phone 375 / tablet 768: `hero-shader-void-phone|tablet`, `button-liquid-phone|tablet`, `kit-shader-clinic-phone|tablet`

## Checks held

- `prefers-reduced-motion` snaps to the end state (shader/particles/globe freeze; scramble shows the sentence; pin-scroll shows progress 1)
- Looping ornament has a visible Pause
- 3D crystal is a separate Vite chunk (`wow-scene`) and only mounts in view
- Canvas DPR capped at 1.5; particle count drops under 500px
- 375 stacking holds on the captured heroes / buttons / kits (no page-level overflow in those shots)

## Dependencies added

- `three` and `@react-three/fiber` (lazy 3D only)
- `@types/three` (dev)

Shaders, particles, and the globe are raw WebGL / canvas and do not need those packages.

## Honest gaps

- Round 7 scored `22635c5`: [sceptical lead](https://cursor.com/agents/bc-c3fab7ac-44b4-5275-a268-eeaf13349c84) and [visual critic](https://cursor.com/agents/bc-d5d4a6f8-a618-56e4-9ca6-689558025919) **REJECT ALL**; [motion critic](https://cursor.com/agents/bc-28ecc41f-1ba1-5bb2-98e4-746b10d26a9a) **CONDITIONAL** (47 keep / 140 fail); [a11y critic](https://cursor.com/agents/bc-e2db98fd-82b6-5e62-99a5-6fcf7f9d73c8) **REJECT ALL**.
- Rounds 8–10 (`7222670`, `494cd5e`, `d894f18`) answered named lies, the visual worst eight, the motion rAF contract, and the seven a11y blockers. Critics have not re-scored. This is not a unanimous approve.
- Orbit/tilt reuse remains. App-kit signatures are still thinner than hero / button / background / kit.
- Pin-scroll now has a media plate and a gallery scroller; it is still not an Apple product page.
- There is no dedicated loader family.
- Gallery chrome contrast leftovers from rounds 5–6 remain.
- No physical-device pass. Captures are Playwright against Vite on `127.0.0.1:5173`.
