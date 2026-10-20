# Stats — role debate

Six agents argued before implementation. They did not agree on names. They agreed on the kills.

## Roles

- Trend researcher
- Product / UX strategist
- Visual designer
- Motion designer
- Front-end (API / perf / a11y)
- Sceptical creative director

## Fights

**Jobs vs objects.** UX named jobs (`proof`, `claim`, `share`, `live`, `compare`…). Visual said those thumbnail as the same 4-up kit and demanded objects (strip, sentence, ring, bar, wall, barrel, ledger, versus, cascade, dial, plot). CD agreed with Visual on mechanism names, UX on first-frame reading: the figure is legible before anything ticks.

**Four cards with up-arrows.** UX: that is what people paste from 21st, Aceternity, Pinterest Overview, and every Dribbble KPI shot; Basic needs a dashboard four. Researcher: 88 “stat” cards, Aceternity’s ticker / gradient / grid blocks, and the glass 4-pack are one silhouette. CD: if the thumbnail is an up-arrow, the variant is dead. Converged: no 4-up metric grid. `strip` is a tape. `wall` is plates without icon, green chip, or sparkline sticker. Deltas, if any, are captions on `versus` and `ledger`, never the silhouette.

**Count-up vs barrels.** Researcher: Magic NumberTicker and Aceternity’s inView spring are count-from-zero; that is exhausted. Motion: digit-roll (Number Flow / Rolling Digits) is the 2025–26 mechanism; interpolating `textContent` is a loading state. Looping rings (Magic circular demo) are loaders. FE: announcing every frame is an a11y bug; non-`tabular-nums` thrashes layout; `aria-live="polite"` once when settled; `Intl.NumberFormat`; `prefers-reduced-motion` skips the tick and paints the final figure at frame 0. Converged: count-up is never a variant. Optional seat on `barrel` and `wall`. Reduced-motion shows final figures immediately.

**Section vs leftover chrome.** Researcher wanted the old Marquee `stats` track and the Bento `stat` tile as layouts. FE: those are a tape product and a cell product. This file is a `<section data-nexara="stats">`. Converged: eleven *layouts*, not eleven paints of a figure/label pair. Marquee and Bento keep their own jobs. The trading ticker, GitHub stars widget, and Skills Progress Dashboard die.

**How timid is Advanced.** UX: `cascade` default is one viewport with a control; a 400vh annual-report is a landing page. Visual: do not draw four cards inside the dial. Motion: scroll cascade is opt-in, native scroll, no wheel hijack, ≤180vh, stations not chapters-of-chapters. Researcher: more globes ≠ quality (21st Globe CDN; Dribbble world-map dashboards). Converged: control-first cascade, scroll opt-in; `dial` is a clipped instrument, not a cockpit; `plot` is one aimed field, not a Recharts farm under a CountUp.

**One file vs eleven files.** FE: one `stats.tsx` plus a lazy `stats-barrel.tsx` so a strip paste does not import digit barrels. Visual: eleven DOMs, not className swaps on a 4-col grid. Converged: one public `Stats` with eleven *layouts*, not eleven skins of the same slots. Barrel code is a sibling.

**Helio numbers / theme.** CD: if defaults are `128` rooms / `18` lamps / brass, it is a tenant, not a library. Visual: colour through `--nx-*`; no baked ember; `--nx-cool` is not “up.” FE: no default values array; empty copy is empty; docs fixtures only. UX needed *some* numbers to demo. Converged: brand-agnostic API, theme via CSS vars, Helio is a docs tenant.

**Basic.** UX demanded four shippable pastes. CD refused jumbotrons of vanity (`99.9%`, `$ARR`, `10k` users). Researcher refused gradient-as-stats and the glass 4-pack. Converged: `strip`, `sentence`, `ring`, `bar` — scenes, not KPI cards.

**What died.** Four metric cards with up-arrows. Count-from-zero as a layout. Aceternity glass + purple beam. Globe / dotted world map. GitHub stars. Skills meters. 8-bit dashboard. Number Flow Trading. Marquee-of-stats as a Stats variant. Helio copy as defaults. Green/red delta as the silhouette. Infinite circular loop. Industry costumes. A 12th “live dashboard” (cap is 11).

## Converged ship list (11)

| id | tier | Mechanism | Motion idea |
| --- | --- | --- | --- |
| `strip` | basic | Hairline tape of figures. No cards. | Nothing required. |
| `sentence` | basic | The claim is a sentence. Figures are words in it. | None. |
| `ring` | basic | Completeness as a circle. The figure sits in the hole. | Arc seats once. |
| `bar` | basic | Share as length. Comparative, not vanity. | Fill once. |
| `wall` | intermediate | Spring wall of plates. Each plate is one figure. | Layout spring. |
| `barrel` | intermediate | Digit barrels. The odometer is the object. | Digit roll. |
| `ledger` | intermediate | Paper rows: label, figure, note. | Rule seats. |
| `versus` | intermediate | Two figures face across a rule. | Snap on change. |
| `cascade` | advanced | Stations of figures on native scroll. | Control-first. Scroll opt-in. |
| `dial` | advanced | Aimed instrument in a clipped plate. | Needle. Pointer optional. |
| `plot` | advanced | One field of data. Numbers are captions. | Trace seats. Pause offscreen. |

## Sign-off bar

Each id is a different mechanism. Tokens + copy restyle it to a hospital or an HVAC brand. First frame holds the figure. Advanced never ships a globe. Basic never ships four KPI cards. Helio is a docs tenant, not the API. Theme via `--nx-*`. Reduced-motion shows the final figures immediately.
