# Round 2 — critic panel

Compared side-by-side with:

| Piece | References |
| --- | --- |
| Cinematic hero | `references/apple.png`, `references/serve-robotics.png`, `references/temper.png` |
| Kinetic type | `references/format-obys.png`, `references/anthropic.png` |
| Orbital | `references/bruno-simon.png`, generated instrument still |
| Nav | `references/stripe.png`, `references/linear.png` |
| Scroll story | `references/apple.png`, `references/temper.png` |
| Bento | `references/paper.png`, `references/aceternity.png` |
| Pricing | `references/stripe.png` |
| Voices | `references/cosmos.png`, `references/21st.png` |
| Dashboard | `references/linear.png`, `references/cursor.png`, `references/paper.png` |

Proof: `proof/landing-hero-1280.png`, `proof/section-*.png`, `proof/nav-mega.png`, `proof/dashboard-ready.png`, `proof/*.webm`.

## Visual designer

**Approve, with notes.**

The hero still now holds a sentence on the iris. The brass ring sitting in the bowl of the “g” in *signal* is the kind of accident you keep. Story (desk lamp, glass, reticle) is in Temper/Apple territory. Kinetic type is FORMAT-adjacent without copying the crop. Pricing voice (“Four seats. One beam.”) is specific.

Bento stills are still the weak plate: a thin spark in a large well. Voices, before the featured-card pass, were six equal dark chips — a wall without masonry. Dashboard is a competent night console, not a photograph.

Against Nexara Groups (quality floor, not a source): we do not have a 3D wordmark. We do have a directed dark page with one accent born on an object. That is the right trade.

## Motion designer

**Approve the ideas. Conditional on a real browser for WebGL.**

- Iris: one idea, followed. Chapter ticks jump. Clip exists (`cinematic.webm`).
- Kinetic: letters lift and lock. Clip exists.
- Pricing: ring walks, switch throws. Clip exists.
- Orbital: headless Chrome painted the generated still, not the canvas. The fallback is a beautiful plate; the live beam is unproven in this capture environment. `preserveDrawingBuffer` was added. Reduced-motion already uses the still.
- Nav mega morphs the same plate. Mobile mega is now `lg:block` only.

Not 60fps-measured. Transforms are compositor-friendly. Lenis is landing-only.

## Front-end / a11y / perf

**Approve, with follow-ups.**

- Dashboard sidebar is a drawer below `md`. Search + Site remain reachable.
- Mega panel no longer paints on small screens.
- Radios, switches, `aria-current`, focus rings on ion, Escape on mega/drawer/palette.
- Command palette is a dialog with arrow keys.
- Table has empty and loading states.
- Canvas is `absolute inset-0` inside an `overflow-hidden` plate.
- Follow-up: measure contrast of `fog` on `void` (helper type). Follow-up: trap focus in the mobile drawer.

## Sceptical creative director

**Partial pass. Honest.**

I would bookmark the hero still and the kinetic still on 21st.dev. Those two frames have a point of view.

I would not file the assembled page as an Awwwards Site of the Day. FORMAT, Temper, and Serve are *objects in a room*. Our bento and dashboard are still *UI in a theme*. The art direction is coherent. The last twenty percent of surprise is missing from the middle of the page.

Gate for “this would hold as a 21st.dev trending entry”: **yes, for the cinematic hero and the kinetic type, as components.**

Gate for “this would hold as an Awwwards-level *site*”: **not yet.** Remaining gap: the live bento must look as considered as the iris, and the WebGL instrument must be seen doing something a still cannot.

**Do not merge as “finished.”** Ship as a draft of a directed product.
