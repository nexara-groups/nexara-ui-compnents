# Theme decision

Recorded 24 October 2026. Five critics scored a shared slate, killed the generic entries, and re-scored a revised set until every critic was at 8 or above on the themes we are keeping.

The library already had heliograph (ember on void), paper, ink, and clinical. Those stay in the catalogue as legacy. None of the new themes is a recolor of them.

## What the research was for

Nexara sells into healthcare clinics, HVAC and engineering firms, sports associations, academies, software studios, and agency or portal dashboards. The references below are inspiration, not sources to copy.

2026 award and product sites (Awwwards, Godly, Linear, Vercel, Stripe, Raycast, Framer, Apple) have converged. Bento grids, dark mode with one neon accent, purple gradients, generic glass, and the Linear/Vercel template are table stakes. They no longer count as a theme. What still separates work is a specific material, a type pairing with a job, and motion that carries one idea. Healthcare writing this year keeps coming back to trust, serif-and-sans headlines, and a booking action that is not a spa. Sports clubs are bought by parents in daylight, not by a broadcast package. HVAC is a phone number and a competent crew. Dashboards fail when blur is the design.

Sources used for that reading: Framer’s 2026 UI trend notes, Toimi’s “what is actually working” survey (30 April 2026), the Lynxflow frequency study of award criteria, Orbix and G&CO on healthcare sites, and the clinic-typography notes that keep citing serif headlines plus a calm ground. Award sites still under-score accessibility. This library does not.

## The panel

1. Brand / Art Director
2. UX and conversion strategist
3. Motion designer
4. Front-end, accessibility, and performance engineer
5. Devil’s-advocate creative director

They scored distinctiveness, commercial usefulness, motion potential, mixability, and feasibility. An overall 8 means that critic would ship the theme as specified.

## Round 1, the slate they were given

Aperture, Fieldnote, Sideline, Folio, Signal, Vitrine, Quarry, Lantern, Poster, Harbor. Each critic could kill any of them and propose originals.

Killed by more than one critic, and not revived:

| Theme | Why it died |
| --- | --- |
| Signal | Ink plus a bento plus a cursor spotlight. A Linear clone. The spotlight is a mousemove listener. |
| Vitrine | Frosted glass as the theme. Contrast depends on whatever is behind it, and blur fails a 4× CPU pass. |
| Lantern | Umber and amber. Heliograph with a lampshade. |
| Harbor | Salt and kelp. Clinical with the serial numbers filed off. |
| Aperture | Warm paper, Fraunces, teal, a breath loop. Legacy paper plus legacy clinical. |
| Poster | Zero radius and a shout. An intake form cannot live in it. |
| Sideline | Night navy, diagonals, a scoreboard. A broadcast, and the buyer is a parent. |
| Folio | Ivory and a pull quote. Cream serif, 2024. The reading measure can be a token. It is not a theme. |

Originals that survived the first argument: Fixture and Docket (art director), Roster and Dispatch (UX), Chorus and Plumb (motion), Relay and Cast (engineer), Triplicate and Programme (devil). Quarry and Fieldnote were the only slate ideas anyone would still defend, and only after a change.

## Round 2, the four that could actually meet

The chair merged the originals that were the same job and applied the lifts the critics had named.

**Fieldnote.** Blueprint deleted. Ochre is a tape flag on the active row, never a wash. Phone and quote are both in the first frame.

**Programme.** Daylight newsprint. Process yellow lags 3px on the masthead and never holds type. A 3px claret stripe on the fixture row. No Bebas, no serif, no diagonals, no claret button. Register is painted in frame 0. Scores roll with `translateY`. A section change tears in four hard frames.

**Triplicate.** NCR clipboard for clinics and for portals. Desk, white sheet, canary, pink. Instrument Serif once, on the institution name. Radius 0. The clip is the only curve. Rows can be 32px. Muted text is `#4a545e`. The pink sheet says Filed in the same moment it appears.

**Quarry.** Cold ground `#d5d3cc`. The button is ink, not copper. Patina `#4d7568` is a 1px rule. Copper is the cut edge of the lid: `#6e3624` in light, `#d4845a` in dark, because `#6e3624` on the dark ground is 1.81:1 and disappears. The lid translates off once. Content underneath is already opaque. No animated shadow.

### Scores after the revisions

| Theme | Art | UX | Motion | Engineer | Devil |
| --- | --- | --- | --- | --- | --- |
| Fieldnote | 8 | 8 | 9 | 9 | 8, once the dark tape stayed `#8a5a12` |
| Programme | 8 | 8 | 8 | 8 | 8, claret is a stripe only |
| Triplicate | 8 | 8 | 8 | 9 | 8 |
| Quarry | 8, once the dark lid edge is `#d4845a` | 8 | 8 | 9 | 8 |

The devil blocked a `translateX(110%)` exit on Triplicate. That reads as a card dismiss. The motion designer had asked for it so the step would not be a fade. The gesture they both signed is a 40ms press (`translateY(8px)`) and then a hard cut, inside the clip, from white to canary to pink. Opacity does not tween. Pink already reads Filed. Reduced motion shows that pink sheet at rest.

The engineer’s contrast pass changed three hexes. Fieldnote’s light tape-and-ring pair `#8a5a12` on `#e4e0d4` is 4.48:1, so the focus ring is ink `#1b1914` in light and `#f3efe6` in dark, not the tape. The tape itself stays `#8a5a12` in both schemes, which is what the devil required. The dark ground is `#101216` so the tape clears 3.17:1 as a graphic. Programme yellow `#f5e642` sits on `#141414` (14.3:1) and never under type. The dark focus ring is `#e5e2d8`. Triplicate muted `#4a545e` clears 4.5:1 on the desk, the sheet, canary, and pink. Carbon `#1c2430` on canary is 12.6:1 and on pink is 11.2:1. Quarry’s patina `#4d7568` clears 3:1 on `#d5d3cc` (3.45) and on `#1a1c19` (3.32). It is a line, not text.

Academies use Programme as the catalogue and Triplicate as the form. Software studios are not given a Linear skin. Quarry is the craft-studio language. A studio that wants the clone can retint tokens. That refusal is the point.

## Token contract

Every theme fills the same fields. Components read CSS variables. A foreign component keeps its choreography and takes the active color, type, radius, and durations.

| Token | Job |
| --- | --- |
| `--nx-bg` `--nx-fg` `--nx-muted` | Page, text, secondary text |
| `--nx-accent` `--nx-accent-fg` | The button fill and its label |
| `--nx-surface` `--nx-line` `--nx-ring` | Sheet, 1px rule, focus |
| `--nx-mark` `--nx-mark-fg` | Tape, stripe, or patina. Never the only status |
| `--nx-plate` | Second plate. Type does not sit on it |
| `--nx-ply` | Confirmation sheet (Triplicate pink) |
| `--nx-hardware` | Clip or staple |
| `--nx-font-display` `--nx-font-body` `--nx-font-mono` | Pairing |
| `--nx-radius` `--nx-measure` | Shape and reading width |
| `--nx-ease` `--nx-dur-instant` `--nx-dur-fast` `--nx-dur-base` `--nx-dur-slow` `--nx-dur-cine` | Motion preset |

Reduced motion sets the durations aside and shows the end state. The DOM does not change. Motion is transform and opacity. No scroll-linked layout, no blur on a scrolling layer, no backdrop-filter except where a later theme explicitly budgets it. None of these four do.

## Fieldnote

Mood. A service notebook for HVAC and engineering callouts. One ochre tape flag marks the active row.

Light. bg `#e4e0d4`, fg `#1b1914`, muted `#5c564c`, accent `#1b1914`, accent-fg `#f7f4ee`, surface `#efeae0`, line `#c9c2b4`, ring `#1b1914`, mark `#8a5a12`, mark-fg `#fff8ee`.

Dark. bg `#101216`, fg `#f3efe6`, muted `#a39c90`, accent `#f3efe6`, accent-fg `#101216`, surface `#1a1d22`, line `#3a3d36`, ring `#f3efe6`, mark `#8a5a12`, mark-fg `#fff8ee`.

Type. IBM Plex Sans for words. IBM Plex Mono for times, prices, and job numbers. No display face.

Radius 2px. No shadow. No blueprint grid. Icons are 1.5px technical strokes, and a status is always a word.

Motion, `snap`. Ease `cubic-bezier(0.2, 0, 0, 1)`. Durations 40 / 120 / 160 / 380 / 640ms. The tape translates to the active row. Rules draw with `scaleX`. A station line’s `scaleY` tracks page progress and does not affect layout. Reduced motion parks the tape, finishes the rules, and sets the station to full.

References, not sources. A printer’s job ticket. A ward whiteboard. A carbon copy. Not a Teenage Engineering catalogue and not a docs site.

## Programme

Mood. The stapled booklet on a folding chair. Sunday league, a school play, a course list. The broadcast stays outside.

Light. bg `#dcd8ce`, fg `#141414`, muted `#5a574e`, accent `#141414`, accent-fg `#f4f1ea`, surface `#e4e0d6`, line `#b9b3a6`, ring `#141414`, mark `#8e1d2c`, plate `#f5e642` on `#141414` only.

Dark. bg `#0e0e0c`, fg `#e5e2d8`, muted `#a39e92`, accent `#e5e2d8`, accent-fg `#0e0e0c`, mark `#e85d6c`, ring `#e5e2d8`.

Type. Archivo for the lines. Archivo Black for two names and the score only. IBM Plex Mono for gate, price, and minute. No serif. No Bebas.

Radius 0. Perforation is an 8px dashed rule. Two staple marks. Halftone sits behind the masthead only. The claret mark is a 3px stripe. It widens to 6px under the pointer. It never fills a button, a header, or a second row.

Motion, `tear`. Durations 50 / 90 / 140 / 360 / 800ms. The yellow plate starts 3px out of register and snaps under the wordmark, whose own ground keeps the type off the yellow. A perforation steps through four frames. Digits `translateY` inside a clip, 90ms, stagger 30ms, then hold. Not `rotateX`. Not a count-up. Reduced motion shows the registered plate, the final frame, and the final score.

## Triplicate

Mood. A metal clipboard and an NCR set. Clinics book here. Portals run here. The same sheet files a player.

Light. desk `#d8d9d6`, sheet `#f4f4f0`, carbon `#1c2430`, muted `#4a545e`, impression `#2a4a73`, accent-fg `#f4f6fa`, canary `#f6e7a8`, pink `#f0d4d6`, clip `#9aa1a6`.

Dark. bg `#17191e`, fg `#e4e2dc`, muted `#9a958c`, accent `#9eb6d4`, accent-fg `#10141c`.

Type. IBM Plex Sans and Mono. Instrument Serif on the institution name only.

Motion, `press`. 40ms `translateY(8px)`, then a hard step to canary, then to pink, still inside the clip. The word Filed is on the pink sheet before it is revealed. Reduced motion shows that sheet immediately.

This run builds the filing CTA. Navbar, hero, features, stats, testimonial, pricing, and footer for Triplicate are specified and not built.

## Quarry

Mood. Cold ground for an engineering firm or a craft studio. Copper is a cut edge. The ask is an ink button with a patina rule.

Light. bg `#d5d3cc`, fg `#1e2420`, muted `#4a5550`, accent `#221f1c`, accent-fg `#fbf6f1`, surface `#e7e4dc`, patina `#4d7568`, lid edge `#6e3624`.

Dark. bg `#1a1c19`, fg `#e6e1d6`, muted `#9a958a`, accent `#e6e1d6`, accent-fg `#1a1c19`, lid edge `#d4845a`.

Type. Instrument Serif for the firm name. IBM Plex Sans. IBM Plex Mono for specs. Radius 2px.

Motion, `lid`. One cover `translateY(0 → -101%)` over 860ms, `cubic-bezier(0.7, 0, 0.15, 1)`, once, content already opaque. At most four lids. A press is `translateY(1px)` for 80ms. No scrub. No animated shadow. Reduced motion removes the cover.

Quarry is tokenised in this run. Its sections are the next build.

## What shipped from the decision

Fieldnote and Programme are built as full first sets: navbar, hero, features, stats, testimonial, pricing, CTA, footer. Triplicate’s CTA is built so the mix demo can file a form. The mix puts Programme, Fieldnote, and Triplicate under one contract (Riverside Athletic). The builder exports that config and the component list.

Legacy heroes and navbars were not deleted and were not used as the base.

## Built-page gate

After the pages existed, the same five roles scored the stills. The first pass failed. Fieldnote’s live note sat under the wrong row. Programme’s yellow plate snapped flush and disappeared, so the page read as the same stone ground as the boiler sheet. The mix offered Call and Request a quote.

The revision put the note inside its row, left the yellow plate 3px off the wordmark with the letters on newsprint, kept claret as a stripe, made Call the only filled Fieldnote action, and left the mix with one Register plus a held score. The second pass:

| Page | Art | UX | Motion | Engineer | Devil |
| --- | --- | --- | --- | --- | --- |
| Fieldnote | 8 | 9 | 9 | 9 | 8 |
| Programme | 8 | 9 | 8 | 8 | 8 |
| Riverside mix | 8 | 9 | 8 | 8 | 8 |
