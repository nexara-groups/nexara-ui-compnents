# Round 6 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-7f1a9580-c2ed-519b-8890-09d222396d10)  
**Evidence:** `docs/audit/coverage.md`; `docs/audit/round-6/focus-*.png` (dealers, dealers-mobile, press, partner, agency, agency-mobile, clinic, sports, button shimmer/beam/flow, aurora, gradient-text shimmer, input outline/otp, spotlight product/profile, accordion media, flip profile, footer brand, modal lightbox, navbar transport, pricing enterprise, process filmstrip, settings profile, tabs underline, toast avatar, leaderboard podium); source in `logo-cloud.tsx`, `app-shell.tsx`, `button.tsx`, `button-extra.tsx`, `aurora-background.tsx`, `gradient-text.tsx`, `input.tsx`, `src/index.css` (`--nx-field`), leftover cards/nav/forms. Compared dealers to `docs/audit/round-5/focus-logo-cloud-dealers.png`.

This is a leftover-component pass. Round 5 already approved the cinematic heroes / sections / kits. I scored the four named leftovers, then whether every leftover cell got that same media / pause / AA / furniture exercise. I did not score a claim that the whole catalogue is now 21st.dev.

## Verdict

**APPROVE the named leftovers. Do not claim the whole library is 21st.dev.**

The four bars I published after the visual overhaul hold in the frames and in source. I would walk dealers, press, agency (desktop and 390), clinic, sports, shimmer Pause, and spotlight product in front of a client tomorrow.

I would not walk `leaderboard / podium`. I would not sell grid, magnetic, badge, chart, typewriter, or text-reveal as cinematic scenes. Variant counts were already ≥10 before this pass. Count is not the exercise.

Do not merge until the owner says so.

## The four named leftovers (claimed → found)

| Bar | Claimed | Found |
| --- | --- | --- |
| 1. Motion loops get a visible pause and respect `prefers-reduced-motion` | `button / shimmer\|beam\|flow`, aurora, gradient / kinetic type | **Hold.** `LoopPause` sits next to shimmer, beam, and flow. Aurora fields and looping gradient / kinetic type ship the same control. Logo marquee pauses. `useLoopControl` ANDs with reduced motion. Fresh `focus-button-shimmer.png` / `beam` / `flow` / `aurora-aurora` / `gradient-text-shimmer` all show Pause. |
| 2. Field borders and leftover content captions reach WCAG AA | `--nx-field` ~3:1; leftover `text-nx-faint` content off those cells | **Hold on the leftover Input list.** `--nx-field` is `rgba(17, 17, 16, 0.45)` on white (~3:1, 1.4.11). Outline / OTP / search / password / amount / command / floating / settings profile / footer email use `fieldBorder`. Leftover process / leaderboard / kpi / kanban / countdown / chapters / stats / command / settings captions are `--nx-muted`, not `--nx-faint`. |
| 3. Isolated `app-shell / agency` (and sibling empty shells) ship furniture | Match `kit / portal` density, not empty Open / Waiting / Done | **Hold.** Agency is a desk: 24 / 7 / ₹86L, Brief / Build / Review, Anitha / Kiran / Meera activity with photographs. Clinic is Lumen chairs. Sports is Field OS heats plus a still. `Desk` defaults sidebar / mobile / rail to that furniture. 390px agency shows a Menu disclosure. |
| 4. Dealer strip is distinct lockups, not six matching glyphs | Color, type, and mark differ | **Hold.** Round-5 dealers were six matching 80×80 glyphs in white wells. Round-6 is teal Kite, ochre Solum, sky nimbus, forest Vale, ink Orbit, cream Marble, each with a city. Press is four different mastheads. Partner reuses the lockups. Mobile wraps 2×3. |

## Leftover catalogue (same exercise?)

Empty-geometry leftovers that used to be gradients, initials, or blank wells now sit on bundled stills or lockups: `spotlight / product` (Lamp 04 on travertine), `spotlight / profile` and `flip / profile` (Anitha, not AK), `accordion / media`, `modal / lightbox` (Harbor night), `footer / brand`, `process / filmstrip`, `settings / profile` (Latha), `toast / avatar`, `tooltip / avatar`, `bento` media default, `draggable / media`, `pricing / enterprise`. Tabs gained `aria-controls` and arrows. Modal OTP is the wired `Input` group.

That is the leftover exercise that mattered. It is not a reshoot of every primitive.

## What I will sign

- `logo-cloud / dealers` and `press` as original lockups, not one glyph family.
- Isolated `app-shell / agency` as a desk. Clinic and sports with it.
- `button / shimmer|beam|flow`, aurora, and looping gradient type as paused ornaments.
- `input / outline` and `otp` as AA field chrome.
- `spotlight / product` as an image-led shop card.
- The leftover pass as closing empty wells, pause, AA on the named fields, and furniture.

## What I will not pretend

- That the whole library is 21st.dev. Grid backgrounds, magnetic buttons, badges, chart blocks, typewriter, and text-reveal stay constructions. They already had ten-plus anatomies. They are not scenes. Coverage names them. I will not call that a miss of the leftover brief, and I will not let anyone caption them as cinema.
- That every leftover cell got photography. `activity`, `kanban-board`, `data-table`, `kpi`, and `command-palette` are still type-led. Coverage listed those gaps. This pass did not close them. Fine as desk chrome. Not a media-first rebuild.
- That `leaderboard / podium` is labelled. Source maps `[rows[1], rows[0], rows[2]]` onto `faces[index]`. The frame puts Anitha’s coat on **Vikram Setty**, Kiran on **Ananya Rao**, Meera Shah on **Meera Iyer**. I will not walk that cell. Recapture after the names match the faces.
- That Ada Klein is gone. Tooltip usage still says `content="Ada Klein"`. `spotlight / task` still chips **Ada**. Toast `mark()` still returns `AK` on a dead branch. The avatar toast *frame* is a photograph; the leftover string is not.
- That Anitha is one job. Flip and spotlight still file her as Harbor studio lead on the Lumen coat. Round 5 already lived with that bible. Not a named-leftover fail.
- That every nested field is `--nx-field`. `data-table` filter/select and `contact` email/brief still use `border-nx-line` (~1.3:1). Input `file` is a dashed line well. A11y approved the leftover Input list, not every form in the library.
- That decorative `--nx-faint` on already-overhauled heroes and services is this pass. It is not. A11y already named it.
- That hero entrance choreography landed. Motion already parked that as a new brief.

## Remaining cheapness (honest, not the four bars)

- Accordion media stills are real; the questions are still “Do I install a package?”
- Navbar transport is a 40px thumb and the word Work. Chrome with a still, not a scene.
- Weather and credit-card faces are still drawings. That is the model.
- Agency board tiles are type, not stills. The activity column is the photography. That was the empty-shell bar, and it holds.
- Dealer lockups are designed capsules, not storefront photography. The bar was distinct marks, not live dealer docs.

## Client tomorrow

Yes, for the named leftovers and the leftover cards that used to be empty.

Skip podium until names match faces. Skip selling badge / chart / magnetic / grid as 21st.dev. Skip claiming activity and kanban as a people pack.

## Approval bar leftover

None on the four named bars. Wire podium names to `faces`, or drop the portraits. Recapture is polish. Nested `data-table` / `contact` line borders are a11y’s leftover, not a reopen of Input.

**Consensus slot:** Visual, motion, and a11y already approve this leftover pass with construction-first cells named. I approve the four bars. I do not approve a library-wide 21st.dev caption. Coverage stays the honest gap list. Do not merge.
