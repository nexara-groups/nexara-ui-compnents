# Round 6 — visual

**From:** [Visual designer critic](https://cursor.com/agents/bc-7cdfe0aa-4c28-5a26-93d3-cc0b6a36e499)  
**Evidence:** `docs/audit/round-6/focus-*.png` against `docs/audit/round-5/`; lockups in `public/media/lockup-*.svg`; wiring in `src/lib/media.tsx`, `logo-cloud.tsx`, `app-shell.tsx`, leftover cards / nav / footer / forms / pricing / process / leaderboard. Coverage list: `docs/audit/coverage.md`.  
**Bar:** premium, photographic / cinematic, polished, modern. Live Sri / Rise / Nexara / VDRSA are a quality bar only — not a replica score. Original fictional brands and bundled stills only. This pass is leftover registry items, not a rewrite of the approved hero / section / kit catalogue.

## Verdict

**APPROVE**

Round 5 approved the cinematic pass and left four visual leftovers: matching dealer glyphs, empty isolated shells, gradient/initials cards, and type-led marketing chrome. This pass closed those cells with original lockups and bundled stills. I would ship the leftover visual pass. I will not pretend every remaining construction is a scene, or that every face is the person named under it.

## What I will sign

- `logo-cloud / dealers` is a family of lockups, not six matching 80×80 glyphs. Teal KITE (diamond, tracked sans), ochre SOLUM (disc on a ground line), sky *nimbus* (italic serif), forest Vale (serif V), ink ORBIT (ringed planet, tracked caps), cream MARBLE (rounded square + serif). Cities sit under the marks. Round 5’s one-icon family is retired as the dealer default.
- `logo-cloud / press` is four mastheads, not the dealer glyphs restretched. Harbor Review (italic serif on brown), FIELD NOTES VOL. 04 (mono on ink), NORTH PRESS (heavy sans), Lumen WEEKLY (serif + tracking). Original fiction. Not Sri / Rise / VDRSA traces.
- Isolated `app-shell / agency` is a desk. 24 / 7 / ₹86L, a three-column board (Wren Build mast / Harbor plant walk / Issue 18 index), and named activity with photographs. The 390 frame keeps Menu disclosure and the same furniture. Round 5’s empty Open / Waiting / Done is gone.
- `app-shell / clinic` and `app-shell / sports` match that density: named chairs with Anitha / Kiran / Meera and times; Field OS heats plus the Harbor Hall still. Sibling `sidebar` / `mobile` canvases now default to the same Agency desk instead of blank columns.
- Leftover cards that used to be gradients or drawings now sit on bundled stills: `spotlight-card / product` is Lamp 04 on travertine, `flip-card / profile` is Anitha, `accordion / media` is journal / consult / studio thumbs, `modal / lightbox` is the Harbor night still, `bento-grid / media` defaults to the featured villa instead of an empty child slot, `draggable-card / media` ships the journal cover.
- Marketing leftovers that coverage called type-led now have original media where the anatomy asked for it: `footer / brand` carries the four dealer lockups under the Nexara word, `pricing / enterprise` is a talk-to-us card on the night villa, `process / filmstrip` is four stills with Brief → Handover copy, `leaderboard / podium` is 1–2–3 stands with portraits instead of medal type alone.
- People chips that coverage named as initials now use the pack: `toast / avatar`, `tooltip / avatar`, `settings-panel / profile` (Latha Iyer), `spotlight-card / profile`. Ada Klein is no longer the profile default.
- Forms stay construction-first and look finished as fields: `input / outline` and `input / otp` use a visible `--nx-field` hairline. I am not scoring them as cinematic scenes.
- Pause is visible on `button / shimmer|beam|flow`, `aurora-background / aurora`, and `gradient-text / shimmer`. That is a motion contract, but it is also a visual one: the loop no longer pretends to be a static object.

## What I will not pretend

- That Kite / Solum / Nimbus / Vale / Orbit / Marble are six agency identities you would send to press. They are original color lockups. That is the brief. They are still 240×72 SVG plates with one mark and one word. Coherent. Cheap at source. Better than Round 5’s matching black glyphs.
- That `leaderboard / podium` is a finished people object. The stands reorder ranks as 2 / 1 / 3, then paint `faces[index]` independently of the names. Anitha’s clinic coat sits under **Vikram Setty**. Kiran’s navy sweater sits under **Ananya Rao** (labelled U16 in the table). Meera Shah is close enough to Meera Iyer. Photography landed. Identity did not.
- That Anitha is a studio lead. `spotlight-card / profile`, `spotlight-card / testimonial`, and `flip-card / profile` keep the stethoscope bust and caption it “Studio lead · Harbor.” Round 5 already said: either rename the people or stop swapping roles onto the portraits. This pass closed Ada Klein on the profile face. It did not close the costume.
- That `process / filmstrip` step 04 is a handover still. Brief is the Wren build. Weekly demo is the journal. Named lead is the night villa. Handover is the gym / kettlebell studio. The wells are filled. The last label is a leftover reuse.
- That `floating-navbar / transport` is a player. It is a 40px Harbor crop, the first nav label (“Work” in the gallery), a hairline scrubber, and ◀ ▶. Artwork exists. Density does not.
- That grid backgrounds, magnetic buttons, badges, KPI tiles, chart blocks, typewriter, text-reveal, isolated kanban, and activity feeds are cinematic. They already have ten-plus anatomies. They are constructions. Coverage said so. I am not scoring that as a miss of this leftover brief.
- That weather suns and credit-card faces are photography. `spotlight-card / weather` is still a drawn orb on a sky wash. `flip-card / credit` is still a gold chip on a purple slab. That is the model.

## Keep

Leftover cells that now read finished for this brief, plus type-led models that should stay type:

- `logo-cloud / dealers`, `partner`, `press`
- `app-shell / agency` (desktop + 390), `clinic`, `sports`
- `spotlight-card / product`, `article`, `place`, `player`
- `flip-card / product`, `media`
- `accordion / media`, `modal / lightbox`, `bento-grid / media`, `draggable-card / media`
- `footer / brand`, `pricing / enterprise`
- `toast / avatar`, `settings-panel / profile`
- `input / outline`, `input / otp` (desktop + 390)
- `tabs / underline` as a primitive
- Type-led models that do not pretend to be photographs: `process / written`, `process / three`, `leaderboard / medals`, `pricing / cards|table|hobby`, `footer / mega|compact|legal`, `kpi / *`, `chart-block / *`, `grid-background / *`, `magnetic-button / *`, `badge / *`

## Redesign

Premium-adjacent. I would not hide them from a walkthrough. I would not copy them as finished:

- `leaderboard / podium` — wire each stand to the athlete it names, or drop the portraits. Do not ship Anitha as Vikram.
- `spotlight-card / profile` and `flip-card / profile` — Anitha stays a clinician, or the caption stops saying Studio lead. Same pack under the wrong job is still the Round 5 leftover.
- `process / filmstrip` — replace the gym still on Handover, or relabel the step to a studio.
- `floating-navbar / transport` — give it a real title, time, and artwork well, or stop showing it as a media object.
- `flip-card / media` reverse still says **Mira Chen** on a Meera / Issue 18 cover. Same name-swap class.
- `spotlight-card / task` still carries an **Ada** chip. Ada Klein is gone from the profile face; the tag is the last initial.

## Replace

Nothing on the leftover empty-geometry list remains. Matching dealer glyphs, empty Open / Waiting / Done shells, gradient product wells, gradient accordion media, empty lightbox, and initials-as-default on toast / tooltip / settings are retired.

Do not delete `avatar / initials`, `flip-card / credit`, or `spotlight-card / weather`. They are explicit primitives. Do not treat type-led chapters, process rails, medal tables, or chart blocks as missing photos.

## Honest leftover cheapness

- Lockups: original, distinct, still one plate size. Grayscale / invert / badges recycle the same six. Fine as a dealer line. Thin as a press wall if you count every variant as a new identity.
- People: the same six generated busts. Clinic costume is Anitha only. Podium and “studio lead” keep spending her on the wrong story.
- Isolated shells: agency is the real desk. Sports is a mast plus one still — denser than Round 5, thinner than `kit / portal`.
- Accordion media copy in the gallery is still docs-meta (“Do I install a package?”). The thumbs closed the gradient leftover. The voice did not become a product FAQ.
- `gradient-text / shimmer` parks a Pause pill in the tracking. Visible control, awkward typesetting.
- Kanban / activity / data-table still name people in type (`Ananya Rao`, `Latha`, `Dr. Rao`) without portraits. Coverage called that. I am not asking this pass to photograph every row.

## Initials, empty geometry, text-only marks

**Gone as the leftover catalogue’s default language.**

- Dealer and press rows are color lockups, not serif words and not six matching glyphs.
- Isolated agency / clinic / sports shells ship furniture.
- Product / profile / lightbox / accordion / bento media wells take bundled stills.
- People chips default to the pack. Initials remain only when asked.

Round 3 named the anatomies. Round 4 filled heroes with stills. Round 5 stopped selling paint as photography and toys as logos. Round 6 stops selling leftover chrome as empty. I am scoring whether this leftover pass looks expensive. It does. I am not scoring whether every named cell is a shoot. It is not.
