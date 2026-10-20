# Navbar — role debate

Six agents argued before implementation. They did not agree on names. They agreed on the kills.

## Roles

- Trend researcher
- Product / UX strategist
- Visual designer
- Motion designer
- Front-end (API / perf / a11y)
- Sceptical creative director

## Fights

**Jobs vs objects.** UX named jobs (`top`, `bottom`, `side`, `overlay`, `search`…). Visual said those thumbnail as the same flex row and demanded objects (rail, capsule, column, path, map, command, dock, mast, curtain, island, galley). CD agreed with Visual on mechanism names, UX on first-frame wayfinding: a way through is visible at 375 before anything morphs.

**Pill as the default.** Researcher: the 2025–26 bar is a floating pill; Tubelight is the most-saved card on 21st (19 Aug 2026). UX: a pill holds four destinations; most pastes arrive with eight plus an action. CD: if the default is a glowing glass pill, the family has failed. FE: `backdrop-filter` on a bar over a scrolling page is the expensive path; anchors land under the overlay unless `scroll-margin` exists. Converged: default paste is `rail`. Signature paste is `island`. `capsule` is basic and honest about the four-item cap. Glow is never the idea.

**How timid is Advanced.** Motion: `island` is a 4-state scroll morph (expanded / compact / live-activity / drawer), width spring, optical blur crossfade. UX: that is a landing page. Frame 0 on 375 must show destinations or a labelled trigger — never an 8px hardware notch. Visual: do not draw an Apple cutout. FE: hide-on-scroll at 10px flickers on a trackpad; IntersectionObserver on a 1px sentinel; threshold ≥100px; no wheel hijack. Converged: `island` is control-first; scroll morph is opt-in; expanded at frame 0; reduced-motion is the expanded end state, not a tiny pill.

**Dock is a Mac.** Researcher: Magic UI Dock is the named 2025–26 object; 21st mobile guide (20 Aug 2026) already says magnification is pointer-only. CD: if the default is bouncing Finder icons, the variant does not exist. FE: tooltips-only fails touch and SR; labels required; `env(safe-area-inset-bottom)`; `100dvh`; 44px targets; 3–5 items. Motion: magnification is the motion idea, opt-in, static sizes under reduced-motion. UX: bottom vs top is an edge, not a twelfth variant. Converged: `dock` ships with captions; mag opt-in; not a MacOS clone; `edge` is a prop, not an id.

**Bead, underline, segmented.** Researcher: Tubelight and the CSS-anchor filter dot (Recent / Petr Knoll) are the 2026 indicator. Visual: a sliding highlight is a className on `rail` or `capsule`. If the bead is the product, it is a tab, not a navbar. CD killed it. Motion: one motion idea per variant. Converged: no `bead` / `tubelight` / `underline` / `segmented` id. An optional indicator token may ride on `rail` or `capsule`. It is not a layout.

**Command vs a search slot.** UX: a search field in the header is a slot on `rail`. Visual: when the field *is* the composition, that is `command` (same object language as Hero). FE: no default `⌘K`, no “Search or jump”, no fake results; empty is empty. Converged: `command` is a variant. Search on `rail` is a prop. `app-bar` dies.

**One file vs eleven files.** FE: one `navbar.tsx`. Curtain / island motion does not leak into a `rail` paste. Visual: eleven DOMs, not className swaps of the same logo / links / CTA row. Converged: one public `Navbar` with eleven *layouts*, not eleven grids of the same slots. Overlay portal is a sibling, not a paint.

**WebGL / 3D menus.** Researcher: FPP and Lacoste Ace Breaker shipped unusual WebGL nav in this window. More WebGL ≠ quality. CD: if the default is a 3D menu, the variant does not exist. FE: BASIC files never import a scene. Converged: no WebGL navbar. `curtain` is type.

**Basic.** UX demanded four shippable pastes. CD refused jumbotron glass and hamburger-only first frames. Researcher refused gradient-as-nav and LumaBar. Converged: `rail`, `capsule`, `column`, `path` — scenes, not sparkle stacks. A labelled menu trigger counts as a way through on 375.

**What died.** The old `floating-navbar` enum: `floating | dock | sidebar | overlay | command | transport | mega | app-bar | announcement | breadcrumb | segmented | wordmark`, plus the earlier kills (`underline | bottom | split | double | islands | tabs | spy | tab-bar`). Announcement is a slot (21st: one occupant), not a layout. Transport is a music costume. Adaptive Notch / triple-island / Dynamic Island hardware. Hide-on-scroll as an id. Helio / Nexara copy as defaults. Hex. A 12th “live-activity notch” (cap is 11).

## Converged ship list (11)

| id | tier | Mechanism | Motion idea |
| --- | --- | --- | --- |
| `rail` | basic | Full-bleed bar. Wordmark, destinations, one action. | Nothing required. |
| `capsule` | basic | Detached pill over the page. Four destinations. | Compact optional. Open at frame 0. |
| `column` | basic | Vertical index with section labels. | None. |
| `path` | basic | Crumb trail. Last node is here. | None. |
| `map` | intermediate | Multi-column destination panel from the bar. | Panel seats. Click, not hover-only. |
| `command` | intermediate | The field *is* the navigation. Results in the same plate. | Snap on select. |
| `dock` | intermediate | Icons over captions. Pointer-magnified from an edge. | Magnify opt-in. |
| `mast` | intermediate | Large mark + index disclosure. No link row. | Disclosure. |
| `curtain` | advanced | Trigger opens a viewport of type. Destinations as architecture. | Type seats. Focus trap. |
| `island` | advanced | One surface morphs job (bar ↔ compact ↔ field). | Morph. Control-first. Scroll opt-in. |
| `galley` | advanced | Ruled editorial cells. Fill, not glow. | Cell fill. Wordmark may retract. |

## Sign-off bar

Each id is a different mechanism. Tokens + copy restyle it to a hospital or an HVAC brand. First frame holds a way through. Advanced never ships a notch. Basic never ships a glowing glass pill. Empty is empty. `prefers-reduced-motion` shows the usable end state. Helio is a docs tenant, not the API. This family is a `nav`, not a flex row with twelve classNames.
