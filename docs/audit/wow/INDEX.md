# Wow signature audit

Research: [docs/research/wow-benchmark.md](../../research/wow-benchmark.md).

Every catalog family keeps its sensible variants and adds 4–5 gold **Signature** cells. Docs gallery chips them.

## Proof

Motion: `signatures-motion.webm`, `signatures-motion.gif` (shader hero pointer, liquid button, stats ticker).

Stills (1280, dark):

- Heroes: `hero-shader-void`, `hero-pin-scroll`, `hero-scramble-mast`, `hero-globe-orbit`, `hero-morph-stage`
- Buttons: `button-liquid`, `button-ink-path`, `button-glare`, `button-burst`
- Field / proof: `aurora-shader-mesh`, `aurora-globe-field`, `stats-odometer`, `pricing-tilt-glare`, `pricing-shader-featured`, `testimonials-scramble-pull`, `footer-giant-marquee`, `modal-shader-veil`, `tabs-layout-morph`, `accordion-shader-row`, `cta-liquid-wash`, `nav-glass-liquid`, `card-glare-tilt`
- Kits: `kit-shader-clinic`, `kit-globe-agency`
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

- App-kit signatures (settings morph, command scramble, table heat, kanban orbit) are thinner than the hero / button / background / kit set. A critic who only opens those will still say “normal.”
- Pin-scroll and scrub variants need a tall track; in the docs gallery they read as a short sticky preview, not a full Apple product page.
- Odometer is a per-digit spring, not a mechanical split-flap reel (a reel overflowed Geist Mono).
- No physical-device pass. computerUse was not used; captures are Playwright against Vite on `127.0.0.1:5173`.
- Independent critic panel for this pass is running and has not signed yet.
