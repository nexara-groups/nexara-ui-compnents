# Round 7 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-c3fab7ac-44b4-5275-a268-eeaf13349c84)  
**Branch scored:** `cursor/visual-quality-overhaul-3ef7` @ `22635c5` (`feat: add signature wow variants across every catalog family`). This file lives on `cursor/round-7-lead-review-9c84`. I did not edit the overhaul branch.  
**Evidence:** `docs/research/wow-benchmark.md`; `src/components/ui/wow-signatures.tsx` `WOW_VARIANTS`; full source of `wow-core.tsx`, `wow-blocks.tsx`, `wow-app.tsx`, `src/lib/wow.tsx`, `wow-scene.tsx`; family early-returns (`isWowVariant` → `<WowSignature />`); docs chip copy in `src/docs/docs-app.tsx`; variant marketing in `src/docs/variant-meta.ts`; `docs/audit/wow/INDEX.md` (claims proof, contains **zero frames**). Round 5/6 leftover approvals are not on trial.

This is the wow-signature pass. The owner already said it: *I don't see anything special in any component. They are all general and normal.* I treated the “4–5 signature variants per ~46 families” claim as inflated until source proved otherwise. It did not.

Mandatory test (benchmark, quoted): would a designer screenshot this next to a top 21st.dev / Aceternity / Awwwards entry without it reading as leftover SaaS chrome? If a family only got a tinted card or a slower fade, that family is rejected.

## Verdict

**REJECT ALL**

Reject the wow-signature pass. Reject the Signature chip. Reject the claim that every catalog family now has 4–5 memorable anatomies.

I am not reopening round 5 cinema / people / kits, and I am not reopening the four round 6 leftover bars. Those cells were never this pass. The gold chip is this pass. The chip is a sticker sheet.

Do not merge.

## The count (claimed → found)

| Claim | Found |
| --- | --- |
| ~46 families × 4–5 signatures | **46 keys** in `WOW_VARIANTS`. **187 named IDs** (43×4 + button/hero/kit ×5). The spreadsheet is real. The signatures are not. |
| Each ID is a finished, family-specific trick | **~15 helpers** in `src/lib/wow.tsx` (`ShaderMesh`, `ParticleField`, `GlobeField`, `Grain`, `ScrambleText`, `SplitMask`, `Odometer`, `PathDraw`, `TiltGlare`, `MagneticWell`, `OrbitRing`, `ScrollPin`, `LiquidFilter`, `WowStage`, `LazyMesh3D`) **stamped onto every family**. Docs even advertise the kit, not the family: “shaders, scramble, pin-scroll, globes, odometers, tilt-glare.” |
| Names describe distinct behaviours | Repeated **aliases**. `process / pin-steps` **is** `scrub-timeline`. `chapters / pin-story` **is** `scrub-essay`. `logo-cloud / magnetic-marks` **is** `glare-lockups`. `flip-card` four names, **one** `rotateY` card (`liquid-flip` only adds the mesh). `gradient-text / scramble` **is** `typewriter / scramble-line`. `path-write` **is** `svg-draw`. `heat-race` **is** the leftover progress-bar default. |
| Would stand next to 21st.dev / Aceternity / Awwwards | **No family.** The honest ceiling is mid Magic UI / Aceternity-lite wallpaper: a dark `#07070c` rounded plate, serif line, gold mono eyebrow, one helper. That is 2024 SaaS chrome. It is not an Awwwards entry. It is not a 21st.dev bookmark. |
| Proof in `docs/audit/wow/` | `INDEX.md` says “Proof lives here.” The folder is **a manifesto and no screenshots**. Unproven on purpose until someone lit the cells. I will not light them into being good. |
| Signature is the family, upgraded | Every family **early-returns**. `DraggableCard variant="physics-deck"` **drops drag**. `Kit variant="shader-clinic"` **drops the healthcare page** (hero + stats + doors + chapters + team + contact) for a shader well, a split mask, and a button. The Signature chip is **cheaper** than the sensible cell it sits next to. |

## Closest to the bar (still fail)

These are the only cells with actual craft in the helper kit. I would not walk them next to the galleries named in the brief.

| Cell | What it actually is | Why it still fails |
| --- | --- | --- |
| `hero / shader-void` | Real WebGL fbm mesh (iris / teal / gold) + scramble title | Aceternity aurora / 21st shader-hero wallpaper. A rounded night card, not a page. |
| `hero / pin-scroll` | Sticky track, shader plate scale 0.42→1 | Benchmark wanted **media** expansion. Copy says “media plate.” Source is a mesh blob. Gallery `article` is `overflow-hidden`, so **sticky cannot pin**. A tall empty well with a scaling wash. |
| `hero / globe-orbit` | Canvas Fibonacci sphere + `OrbitRing` pills | Magic UI Globe, smaller and with pill labels. Competent demo. Not a scene. |
| `hero / scramble-mast` | `SplitMask` + hover scramble | Aceternity generate / Magic UI HyperText. Type trick, not a hero. |
| `hero / morph-stage` | `layoutId` on a box; open = spinning icosahedron | One `three` crystal (`wow-scene.tsx`), used twice. Shared-element morph with no other element. |
| `aurora / shader-mesh` | Same mesh as the hero void | Background that is the hero void, cropped. |
| `kit / shader-clinic` | Split mask on the mesh | Inverse of round 5: the Signature **clinic** is thinner than `kit / healthcare`. |
| `kit / globe-agency` | Copy + globe | Logo-cloud orbit with a headline. |
| `stats / odometer`, `gradient-text / scramble`, `text-reveal / line-mask` | Digit columns / scramble / line mask | One-trick Magic UI. Fine as ornaments. Not family signatures. Not Awwwards. |

If a critic can describe it as “normal,” it is not a signature. I can describe every row above as normal.

## Families that fail the standout test

**All 46.** Grouped by what I actually found, not by the name on the chip.

### Tinted night card + one helper (generic SaaS)

These are the owner’s quote in source. Dark radius, gold eyebrow, helper, caption.

- **spotlight-card** — `glare-tilt` is Magic UI glare on a card with a black well; `shader-well` is the mesh cropped to a card; `orbit-badge` is three pills on `OrbitRing`; `scramble-stat` is an odometer on `#111113`.
- **bento-grid** — `depth-mosaic` is glare; `shader-tile` / `orbit-tile` / `ticker-tile` are mesh / ring / odometer **tiles**, not a bento.
- **pricing** — three glare cards; featured optional mesh; odometer on one number.
- **testimonials** — `wall-parallax` is three quotes with `y: i * 8` (not parallax); `video-shader` is a quote on a mesh (no video); `orbit-quotes` is first names on a ring; `scramble-pull` is scramble on a night plate.
- **footer** — giant “NEXARA” marquee; mesh + grain; orbit of nav words; one SVG “sitemap.”
- **stats** — odometer cards; orbit of numbers; particles under a number; glare mosaic of numbers.
- **cta-band** — mesh or particles behind “Ask for a seat”; scramble headline; purple glare band.
- **news** — CSS ticker; scramble rows branded as “flip-headlines”; mesh “magazine”; orbit of weekdays.
- **logo-cloud** — globe+orbit; particles + “Harbor Review”; two names for the same glare lockup grid.
- **contact** — mesh with coordinates; unused goo on a form; magnetic city cards; one SVG path.
- **team** — glare portraits; orbit of first names; grain overlay branded holographic; particles under four faces.
- **services** — glare doors; orbit of door names; two mesh cards; check-path list.
- **case-study** — horizontal glare cards branded “scroll-film”; layout font-size morph; two glare cards; one SVG index.
- **kpi** — odometer; SVG `pathLength` ring; particles + number; glare “+18%.”
- **app-shell** — mesh behind a two-pane sketch; orbit of “Jump/Create”; rail + mesh; `layout` width toggle branded morph-sidebar.

### Name does not match the motion

- **magnetic-button / shatter** — docs: “Tracking opens on hover.” Source: `letterSpacing`. Not shatter.
- **typewriter / flap-3d** — docs: “Split-flap tiles with depth.” Source: static `GATE` in four boxes. No flap.
- **typewriter / matrix-rain** — particles + scramble of a fake export. Not rain.
- **gradient-text / variable-morph** — `letterSpacing` loop. Not a variable font.
- **draggable-card / physics-deck** — `TiltGlare`. **Not draggable.** The family is the drag system; the Signature exits it.
- **draggable-card / particle-toss** — particles + `MagneticWell`. No toss.
- **flip-card / hologram** — docs claim a shader field. `FlipWow` only mounts `ShaderMesh` on `liquid-flip`. Hologram is grain on the same flip.
- **modal / shared-morph** — `layoutId` on a static “N.” No trigger in another cell.
- **marquee / cylinder-3d** — `rotateX(18deg)` on a ticker.
- **countdown / shader-rings** — frozen `12d 06h 18m 04s` on a mesh.
- **countdown / analog-orbit** — `d h m s` pills on `OrbitRing`.
- **leaderboard / heat-race** — leftover bar chart. The named “race” is the default branch.
- **leaderboard / podium-spring** — three gray columns growing. Round 6 already refused the photographic podium.
- **activity / liquid-chat** — two chat bubbles. No liquid.
- **toast / liquid-slide** — a 1px indigo bar.
- **tabs / liquid-ink** — blur wash on the active pill.
- **badge / liquid-pill** — a teal circle with `filter: url(#id)` and **no** `LiquidFilter` in the tree.
- **accordion / height-morph** — every accordion ever.
- **input / magnetic-caret** — magnet on the field, not a caret.
- **chart-block / particle-area** — particles, no area.
- **data-table / heat-cells** — twelve opacity-tinted divs.
- **data-table / morph-cards** — phone cards inside `md:hidden`, desktop table also `hidden md:block` **inside that parent**. Desktop morph is dead.
- **settings-panel / liquid-toggle** — a switch.
- **grid-background / topo-pulse** — expanding rings. `circuit-draw` is one path. `hex-orbit` is `OrbitRing`. `perspective-fly` is a CSS grid floor.

### Shared primitive, many gold chips

`OrbitRing` is the same rotating pill ring on: magnetic orbit-pull, spotlight orbit-badge, bento orbit-tile, grid hex-orbit, nav orbit-nav, marquee logo-orbit, tabs orbit-pills, avatar orbit-status, testimonials orbit-quotes, footer orbit-marks, stats orbit-ring, countdown analog-orbit, services orbit-crews, process orbit-rhythm, team orbit-crew, chapters (index is type; digest is orbit), news orbit-digest, logo-cloud orbit-3d, app-shell command-orbit, kanban orbit-wip.

`TiltGlare` is the “premium card” default the benchmark already named as Magic UI’s current default. Using it on spotlight, bento, pricing, team, case, services, kanban, kpi, settings, cta, logo-cloud does not make twelve signatures.

`WowStage shader` is the same mesh under hero, aurora, modal veil, bento tile, contact map, news magazine, cta wash, kit clinic, app-shell desk.

That is inflation. Four names per family, one trick per library.

## Benchmark tests 3–5 (also fail, not the headline)

Headline fail is standout. The other bars are not clean either:

- **Pause on looping ornament.** `LoopPause` exists on aurora, hero globe, a couple of marquees, footer marquee, and `WowStage` when shader/particles/globe. `wow-app.tsx` has **zero** direct pause controls. Most `OrbitRing` cells spin without a pause. Round 6 approved leftover loops because those loops had Pause. This pass reopened the hole under a new chip.
- **Pin-scroll in the gallery.** `VariantGallery` articles are `overflow-hidden`. Sticky pin is structurally dead in the place the chip is shown. `process / pin-steps`, `chapters / pin-story|scrub-essay`, `countdown / launch-scrub`, `chart-block / scrub-bars`, `kit / pin-sports` inherit the same death.
- **Reduced motion.** Helpers generally freeze. That is the one bar that is mostly held, and it does not make a Signature.

## What I will not pretend

- That 187 IDs are 187 ideas. They are 15 helpers × 46 early-returns.
- That `kit / shader-clinic` is an upgrade on `kit / healthcare`. It is a demotion with a gold chip.
- That `hero / pin-scroll` is 21st.dev scroll-media expansion. There is no media. There is no working pin in the docs gallery.
- That `LazyMesh3D` is a 3D program. It is one icosahedron and a torus, used on `hero / morph-stage` and `kit / liquid-portal`.
- That Ada Klein is gone. `tooltip / magnetic-tag` still renders the string **Ada Klein**.
- That this pass has visual proof. `docs/audit/wow/` has no frames. I scored source. Source is enough to reject.
- That round 6’s “do not claim the whole library is 21st.dev” was closed by adding a Signature chip that names 21st.dev in the docs intro.

## Client tomorrow

I would still walk round 5 cinema / logos / waitlist / kits and the named round 6 leftovers.

I would not walk any gold Signature cell as a 21st.dev / Aceternity / Awwwards peer. If the owner still does not see anything special, the owner is correctly reading the file.

## Approval bar leftover

The wow pass has to stop being a combinatorial wrap of `wow.tsx`. A signature is **one finished trick that belongs to that family**, screenshotable in three seconds, with a name that is true. Until a family has that, it has zero signatures — not four.

**Consensus slot:** This lead rejects the wow-signature pass in full. Other round 7 lenses may praise the helpers. Helpers are not signatures. Do not merge.
