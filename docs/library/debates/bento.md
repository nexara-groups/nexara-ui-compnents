# Bento — role debate

Six agents argued before implementation. They did not agree on names. They agreed on the kills.

## Roles

- Trend researcher
- Product / UX strategist
- Visual designer
- Motion designer
- Front-end (API / perf / a11y)
- Sceptical creative director

## Fights

**Jobs vs objects.** UX named jobs (`rank`, `reel`, `proof`, `list`…). Visual said those thumbnail as the same 2+4+2 kit and demanded objects (mosaic, reel, sheet, well, dock, stage). CD agreed with Visual on mechanism names, UX on first-frame scan: a sentence readable before any cell moves.

**Section vs item chrome.** Researcher wanted the old twelve costumes (`chart | quote | editorial | terminal | schedule | scoreboard | stat | compare | media | calendar | kanban | invoice`). FE: those are skins on `bento-grid.tsx` — item chrome, not a family. This file is a `<section data-nexara="bento">`. Converged: eleven *layouts*, not eleven paints of `BentoItem`. Tile slots may host proof; they are not variants. The old enum dies.

**Working widgets vs empty paste.** Researcher: Magic UI calendar / list / beam is the 2026 bar; Ink Orbit diagrams prove the cell. UX: most pastes arrive with four sentences and one screenshot. They do not own a Calendar. FE: required `Icon`, `href`, `cta`, `background` is an API smell; empty string is empty; optional slots omit chrome. Converged: `dock` hosts instruments as slots; no default widget; no Helio sparkline.

**How timid is Advanced.** UX: `inspect` is one cell with a control, not a 200vh Apple page. Visual: `desk` must not ship Helio furniture (CRT, brass pipes, Lamp 04). Motion: `reflow` is pointer/focus, desktop-only, no wheel hijack; reduced-motion = the static mosaic. Converged: control-first inspect, empty desk slots, reflow opt-in.

**Basic.** UX demanded four shippable pastes. CD refused Lucide mosaics and jumbotrons of equal cards. Researcher refused glow-border 2+4+2 and 1px glass specs. Converged: `mosaic`, `reel`, `sheet`, `well` — scenes, not icon stacks.

**What died.** The old item enum. Spotlight / status / brutal. `columns` as the variant. Helio copy as defaults. Infinite pan. Holographic / cybernetic. Skeleton-farm loops as a layout. Required icons. Mesh/aurora tiles. Industry costumes. Masonry-as-bento (wrong family). Swapy drag (no keyboard map). A 12th “Bentolio” dashboard (cap is 11).

## Converged ship list (11)

| id | tier | Mechanism | Motion idea |
| --- | --- | --- | --- |
| `mosaic` | basic | Ranked spans. One cell is twice the others. Copy + optional media. | Nothing required. |
| `reel` | basic | Equal proof cells in a strip. Highlights, not a mosaic. | None. |
| `sheet` | basic | Paper compartments. Type and rules. No card chrome. | None. |
| `well` | basic | Evidence crops. The picture is the tile. Caption is a caption. | Plate seats once. |
| `dock` | intermediate | Cells host working instruments. Slots, not required widgets. | Tick. Pause offscreen. |
| `stage` | intermediate | An index of cells drives one shared plate. | Snap on select. |
| `spec` | intermediate | The figure occupies the cell. Unit and label are secondary. | Optional count. Number at rest. |
| `expand` | intermediate | The selected cell becomes the detail. Same geometry. | Layout spring. |
| `inspect` | advanced | A control scrubs *their* media inside one cell. | Control-first. No hijack. |
| `desk` | advanced | Named objects on a plate. They do not share a radius. | Pointer optional. Still is valid. |
| `reflow` | advanced | Focus reweights the mosaic. Neighbours yield. | Layout spring. Static if reduced. |

## Sign-off bar

Each id is a different mechanism. Tokens + media + copy restyle it to a hospital or an HVAC brand. First frame holds a sentence. Advanced never ships a looping skeleton farm. Basic never ships a Lucide mosaic. Empty is empty. Helio is a docs tenant, not the API. This family is a section, not a tile.
