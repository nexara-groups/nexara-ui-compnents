# Round 3 — critic panel

Compared side-by-side with:

| Piece | References |
| --- | --- |
| Cinematic hero | `references/apple.png`, `references/serve-robotics.png`, `references/temper.png` |
| Kinetic type | `references/format-obys.png`, `references/anthropic.png` |
| Orbital | `references/bruno-simon.png`, generated instrument still, `proof/webgl-beam-frame.png` |
| Nav | `references/stripe.png`, `references/linear.png` |
| Scroll story | `references/apple.png`, `references/temper.png` |
| Bento | `references/paper.png`, `references/temper.png` |
| Pricing | `references/stripe.png` |
| Voices | `references/cosmos.png`, `references/21st.png` |
| Dashboard | `references/linear.png`, `references/cursor.png`, `references/paper.png` |

Proof this round: `proof/landing-hero-375.png`, `proof/landing-768.png`, `proof/landing-1280.png`, `proof/section-bento.png`, `proof/section-bento-desk.png`, `proof/section-orbital.png`, `proof/webgl-beam-frame.png`, `proof/webgl-proof.json`, `proof/dashboard-1280.png`, `proof/dashboard-768.png`, `proof/dashboard-375.png`, `proof/focus-trap.json`, `proof/fog-contrast.json`, `proof/*.webm`.

## Visual designer

**Approve the full page. Approve the dashboard.**

The desk still (`section-bento-desk.png`) is no longer a kit grid. A CRT, a taped command slip, a key lamp, an analog ping, brass pipes, a framed plate, and a stack of lane stubs share one ground. They overlap. They do not share one radius. That was the hole.

The observatory (`dashboard-1280.png`) is a layout, not a theme. Iris lock on the left, brass counters and a paper dossier on the right, ledger underneath. Filter “iris” leaves one blip and one row. 375 keeps the radar, the counters, and the dossier without eating the viewport.

Notes I will not hide: the live WebGL instrument is a readable brass gem on a stand with a real beam. It is not the generated photograph sitting inside the compare plate. The lamp and the pipes are still the most “chip-like” objects on the desk.

375 / 768 / 1280 hold. Hero title is on the iris at every width.

## Motion designer

**Approve. WebGL is proven.**

Headless Chrome with SwiftShader painted a live canvas, not the fallback still.

- `canvas[data-helio-webgl="ready"]` mounted at 633×506
- Centre sample `[144, 67, 12, 255]` — brass / ember, not an empty clear
- Frame grab: `proof/webgl-beam-frame.png`
- Pointer throw visible in `section-orbital.png` and `orbital.webm`
- Default mode is beam. Loop pauses off-screen.

Also live: iris lock sweep, brass counters, dossier spline, lamp throw, ticket advance, compare plate. Not 60fps-measured. Transforms stay compositor-friendly. Lenis is still landing-only.

## Front-end / a11y / perf

**Approve.**

- Mobile menu focus trap: six Tabs stayed inside the dialog and wrapped to Close (`proof/focus-trap.json`). Escape restores the opener. Dashboard drawer is `inert` when closed and uses the same trap. Palette traps too.
- Fog `#c6bba8` on void `#07060b` measures **10.65:1** (`proof/fog-contrast.json`). Helper type is no longer the failure.
- Mega panel closes on scroll. It is `lg:block` only.
- Hash change resets scroll to 0.
- Canvas stays inside the plate. `preserveDrawingBuffer` is on for the frame grab.
- Table still has empty, loading, sort, filter, select. Radar and ledger stay in sync.

## Sceptical creative director

**Signs 21st.dev trending for the assembled page and for the dashboard. Does not sign Awwwards Site of the Day.**

I would put Helio on 21st.dev this week. The page has one idea from the iris through the desk through the night watch. That is the job.

I would not file it as an Awwwards SOTD. FORMAT, Temper, and Serve still keep a higher physical standard. Two tells remain:

1. The live beam is real and on the record. It is also a teaching model. The compare-plate photograph is still the better instrument.
2. The lamp and the tuning pipes are objects in the copy and chips in the picture.

The dashboard is the first time the product is not Linear after dark. I would ship the observatory. I would not hang it in an awards recap.

**Do not merge as “finished Awwwards work.”** Ship as a directed 21st.dev-trending draft.
