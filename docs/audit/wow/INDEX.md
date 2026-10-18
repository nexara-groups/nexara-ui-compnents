# Wow signature audit

Proof lives here: screenshots and short captures of the signature variants. Research: [docs/research/wow-benchmark.md](../../research/wow-benchmark.md).

Every catalog family has 4–5 signature variants (gold **Signature** chip on the docs page). Sensible variants were not removed.

## Checks

- `prefers-reduced-motion` shows a complete end state
- Looping ornament has a visible Pause control
- WebGL / 3D is lazy (`wow-scene` chunk) and pauses off-screen
- 375 / 768 / 1280: no page-level overflow (same responsive bar as `docs/audit/responsive.md`)
- Mandatory critic test: would this stand out next to top entries on 21st.dev, Aceternity, and Awwwards?

## Dependencies added

- `three`
- `@react-three/fiber`
- `@types/three` (dev)

Raw WebGL (`ShaderMesh`) and canvas (`ParticleField`, `GlobeField`) ship without those packages. The 3D crystal is lazy-loaded only when `LazyMesh3D` is on screen.
