# Wow benchmark — techniques seen, not copied

Survey date: 18 Oct 2026. Sources: 21st.dev trending and their own technique essays, Aceternity UI’s public catalog, Magic UI’s component index, Framer template galleries, Awwwards / Recent (formerly Godly) / Lapa-style landing pages, and product pages from Linear, Vercel, Stripe, and Apple. None of the implementations below were copied. This note records **what the work is doing**, so Nexara can invent original versions.

The owner bar: a visitor should be able to screenshot a signature variant and post it next to a top 21st.dev / Aceternity / Awwwards entry without it reading as generic SaaS chrome.

## What “memorable” actually is

The libraries that get bookmarked are not “more padding and a gradient.” They do one of these:

1. **The first gesture changes the page.** Scroll expands media, morphs a shape, or scrubs a timeline. The hero is a transition, not a poster.
2. **The pointer has physics.** Magnetic pull, tilt + glare, particle repulsion, a spotlight that reveals a second material.
3. **Type is choreographed.** Split-letter masks, scramble-to-settle, reserved-width word cycles, variable-font morphs, SVG path writing.
4. **The field is a material.** Shader meshes, grain, liquid glass, aurora curtains, orbiting marks, globes, particle atmospheres.
5. **State is theatrical.** Shared-element morphs, odometer ticks, path-drawn icons, staggered load sequences, view-like transitions.

Sensible variants stay. Signature variants must fail a “would this look normal on a 2023 SaaS landing page?” test.

## 21st.dev — what is trending, and why

Public trending (community, recommended sort) at survey time:

| Pattern | What it is doing |
| --- | --- |
| Scroll media expansion / container scroll | A media plate grows from a card to a full bleed as you scroll. Solves the fold by making the first scroll the reveal. |
| Spline / 3D scene | A real object in the hero, not a PNG of one. |
| Spotlight card | Pointer-locked radial wash that feels like a lamp, not a hover tint. |
| Radial orbital timeline | Events sit on a ring and rotate into focus. |
| Testimonial columns | Three vertical marquees at different speeds — density as proof. |
| Background paths | Animated SVG strokes as atmosphere. |
| Shader heroes | Fragment-shader color fields that respond to time and cursor. |
| Animated lists / AI chat | Staggered enter, streaming tokens, state icons that *act*. |

21st’s own essays (Aug 2026) are blunt about cost:

- CSS now owns scroll reveals (`animation-timeline: view()` / `scroll()`), marquees, shimmer, hover tilt, height-to-auto. JS is for gestures, input physics, cross-container layout, and orchestration.
- Animate `transform` and `opacity`. Do not animate `top`, `height`, `box-shadow`, or `background-position` on a phone.
- Split-letter headlines need `aria-label` on the real sentence and `aria-hidden` on the fragments.
- Cycling words must reserve the longest width and stop after a few cycles.
- Render the text in HTML. Animate appearance. Empty JS-only headlines fail search.
- Canvas / WebGL loops pause off-screen and under `prefers-reduced-motion`.

Nexara takeaway: ship scroll-driven heroes and shader fields, but treat those essays as constraints, not as components to clone.

## Aceternity UI — the recognisable set

The public catalog clusters into backgrounds (beams, boxes, gradient animation, aurora), text (generate, reveal-card, hover-outline, typewriter, flip-words), cards (3D tilt with `translateZ` layers, spotlight, stack, Evervault-style canvas reveal), navigation (floating pill, dock, resizable), heroes (parallax, lamp, spotlight), and theatrical overlays (animated modal, Apple-cards carousel).

Techniques, not recipes:

- **Layered perspective.** A container sets `perspective`; child items take different `translateZ` so hover tilt produces parallax between title, image, and CTA.
- **Lamp / spotlight as composition.** A soft conic or radial wash is the *stage*, copy sits in the hot spot.
- **Word-by-word generate.** Opacity + blur stagger on load — the sentence exists in the DOM first.
- **Card stack.** Offset sheets with a shared drag or auto-advance; the motion is the product.
- **Beams and collision.** Moving gradient lines that “hit” a target — ornamental, but the collision is the hook.

Nexara must not reproduce Aurora-as-three-blurred-blobs or a generic 3D-card wrapper. Our versions use Nexara tokens (iris / teal / gold / night ink), original shaders, and different anatomies.

## Magic UI — the effect menu

The index is a menu of *named effects*: Number Ticker, Orbiting Circles, Globe, Particles, Glare Hover, Hyper Text, Morphing Text, Warp Background, Dock, Marquee, Meteors, Rainbow / Shimmer / Shine buttons, Scroll Velocity, Icon Cloud, Flickering Grid, Animated Beam, Cool Mode / Confetti.

Useful observations:

- **One trick, finished.** Each component is a single memorable behaviour you can screenshot.
- **Tickers and odometers** make stats feel alive; a static “99.98%” does not.
- **Orbit / globe / icon cloud** turn a logo row into a spatial object.
- **Glare hover** is the current default for “premium card.”
- **Hyper text / morphing text** are the shareable type pieces.

Nexara signatures should each be one finished trick, not a pile of half-effects.

## Framer templates

What the popular templates share:

- Staggered page-load (eyebrow → display → lede → media, 40–80ms).
- Sticky section nav that morphs from a pill to a compact bar.
- Horizontal scroll “film” for case studies.
- Full-viewport chapters with a pinned index.
- Cursor-follow labels and magnetic primary buttons.
- Grain overlays and mesh gradients as house style.

## Awwwards / Recent (Godly) / Lapa

- **Awwwards** still rewards WebGL, unexpected scroll contracts, and custom type. Jury-scoring is design / usability / creativity / content — spectacle that breaks a trackpad fails usability.
- **Recent (ex-Godly)** previews motion in the thumbnail. If the motion is not visible in three seconds, it is not in this gallery.
- **Lapa** is the full-page landing narrative: hero → proof → method → price → close. Memorable landings change *material* between bands (night shader → paper → inverted closer), not just heading size.

## Linear / Vercel / Stripe / Apple — product pages

These are the quality of *craft*, not the look to clone.

| House | Motion contract | What to steal as a technique |
| --- | --- | --- |
| **Linear** | 200–350ms, expo-out, tight springs on *input*, 20ms list stagger | Precision. Magnetic / drag must feel physical, not bouncy. |
| **Vercel** | 150–250ms ease-out, almost no springs, silence as confidence | Restraint on app chrome. Save theatre for marketing signatures. |
| **Stripe** | Diagrams that *draw*, gradient meshes, numbers that tick, code that types | Product explanation as animation. Charts and processes should path-draw. |
| **Apple** | Tall track (300–500vh) + `position: sticky` child; scroll *is* the timeline; canvas frame sequences or scrubbed video; one shared progress value | Pin + scrub. Do not hijack the wheel. Reduced motion shows the last frame. |

Apple teardown notes (public 2026 writeups): one rAF loop, lerp/scrub values, animate transform/opacity, lazy-load distant media, cap device pixel ratio, test fast reverse scroll. Image sequences are memory-heavy — for a component library, procedural canvas / WebGL or a short original reel is the honest substitute.

## Technique → Nexara original

| Technique | What we build (original) | Where it lands first |
| --- | --- | --- |
| Scroll-driven storytelling | Sticky track, progress 0–1, media scale / chapter swap / timeline scrub. No wheel hijack. | Hero `pin-scroll`, Chapters, Process, Case study |
| 3D / WebGL | Lazy `three` + `@react-three/fiber` mesh; raw WebGL gradient-mesh shader; canvas globe. Pause off-screen. | Hero `shader-void` / `globe-orbit`, Aurora, Kit |
| Cursor physics | Spring magnet, gravity well, particle attract/repel | Magnetic button, Button `burst`, Cards |
| Text choreography | Scramble-to-settle, per-line mask, split letters with `aria-label`, odometer | Text families, Hero `scramble-mast`, Stats |
| Shared-element morph | `layoutId` between wordmark, card, and modal | Hero `morph-stage`, Modal, Tabs, App shell |
| Gradient mesh + grain | Fragment shader + SVG turbulence overlay | Backgrounds, Footer, CTA |
| Glass / liquid | Specular edge + SVG goo blobs that follow the pointer | Button `liquid`, Modal `liquid-sheet` |
| Marquee / orbit / globe | Perspective cylinder, orbital marks, Fibonacci sphere | Marquee, Logo cloud, Hero |
| Number ticker / odometer | Digit columns, flip tiles | Stats, KPI, Pricing, Countdown |
| View / load choreography | Staggered enter, layout morph | Kit, App shell, Toast |
| Tilt + glare | Perspective + specular highlight | Cards, Pricing, Team |
| SVG path drawing | `stroke-dashoffset` on mount / hover / scroll | Button `ink-path`, Chart, Process |
| Particle fields | 2D canvas, cursor force, mobile cap | Aurora, CTA, Testimonials |
| Lottie-like micro | Path morph icons, success draw, live dots | Toast, Badge, Activity |

## Mandatory critic test

For every signature variant:

1. Would a designer screenshot this?
2. Would it stand next to a top 21st.dev / Aceternity / Awwwards entry without looking like leftover SaaS chrome?
3. Does `prefers-reduced-motion` show a complete static end state?
4. Is there a visible pause control on looping ornament?
5. Does it hold 375 / 768 / 1280 without overflow or 44px-touch regressions?

If any critic can describe it as “normal,” it is not a signature variant.

## Dependencies

- Existing: `framer-motion`, `clsx`, `tailwind-merge`, `class-variance-authority`.
- Added for this pass: `three`, `@react-three/fiber` (lazy-loaded 3D only). `@types/three` is a devDependency.

Raw WebGL and canvas cover shaders, particles, and the globe so copy-paste consumers who skip 3D still get the field effects.
