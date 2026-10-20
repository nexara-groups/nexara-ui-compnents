# Hero — role debate

Six agents argued before implementation. They did not agree on names. They agreed on the kills.

## Roles

- Trend researcher
- Product / UX strategist
- Visual designer
- Motion designer
- Front-end (API / perf / a11y)
- Sceptical creative director

## Fights

**Jobs vs objects.** UX named jobs (`split`, `stack`, `capture`…). Visual said those thumbnail as the same kit and demanded objects (aperture, folio, flip-board, instrument plate). CD agreed with Visual on mechanism names, UX on first-frame conversion.

**How timid is Advanced.** UX: iris default is one viewport with a control; 320vh was a landing page. Visual: do not draw split inside the hole. Motion: scroll-linked iris is opt-in, ≤180vh, no wheel hijack. Converged: control-first default, scroll opt-in, CTA opacity 1 at frame 0.

**One file vs eleven files.** FE: one `hero.tsx` plus a lazy `hero-scene.tsx` so a split paste does not import R3F. Visual: eleven DOMs, not className swaps. Converged: one public `Hero` with eleven *layouts*, not eleven grids of the same slots. Scene is a sibling.

**WebGL.** Researcher: more WebGL ≠ quality. CD: if the default is a sphere, the variant does not exist. Motion: required still, pause offscreen, `preserveDrawingBuffer`. Converged: `orbit` is a clipped plate; default instrument is a gimbaled *plate*, not an icosahedron candy; `scene` and `fallback` are slots.

**Basic.** UX demanded four shippable pastes. CD refused jumbotrons. Researcher refused gradient-as-hero. Converged: `still`, `folio`, `frame`, `stack` — scenes, not sparkle stacks.

**What died.** The old `saas | download | video | logos | pricing | agency | commerce | event | search | dashboard | editorial | waitlist` enum. Helio copy as defaults. `align`. Mesh/aurora variants. MacBook lid. Hero Parallax flock. Chapter-scroll as a 12th (cap is 11).

## Converged ship list (11)

| id | tier | Mechanism | Motion idea |
| --- | --- | --- | --- |
| `still` | basic | Full-bleed media. Type as caption. One action. | Nothing required. |
| `folio` | basic | Paper room: claim, paragraph, hard cut into a photograph. | None. |
| `frame` | basic | Working surface gets more pixels than the pitch. | Plate seats once. |
| `stack` | basic | Sentence + two doors. Fastest paste. | Zero springs. |
| `command` | intermediate | The field *is* the composition. Results in the same plate. | Snap on select. |
| `fan` | intermediate | Overlapping photographs. Click brings one forward. | Layout spring. |
| `board` | intermediate | Split-flap wall spells the claim. | Flap tick. |
| `cover` | intermediate | Type as architecture + a working index. | Rule seats. |
| `iris` | advanced | Mechanical aperture onto *their* media. | Hole. Control-first. Scroll opt-in. |
| `orbit` | advanced | Aimed instrument in a clipped plate. | Pointer. WebGL optional. |
| `kinetic` | advanced | Letters have mass. Lock / unlock. CTA in the rail. | Physics. |

## Sign-off bar

Each id is a different mechanism. Tokens + media + copy restyle it to a hospital or an HVAC brand. First frame holds a sentence. Advanced never ships a sphere. Basic never ships a jumbotron. Helio is a docs tenant, not the API.
