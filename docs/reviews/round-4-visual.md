# Round 4 — visual

**From:** [Visual designer critic](bc-514c0a38-69f6-5b14-afde-fd52437963e7)  
**Evidence:** `docs/audit/round-4/focus-*.png` (desktop 1440 + mobile 390), bundled stills in `public/media`, and the media wiring on `cursor/visual-quality-overhaul-3ef7`.  
**Bar:** premium, photographic / cinematic, polished, modern. Live Sri / Rise / Nexara / VDRSA are quality examples only — not a replica score.

## Verdict

**APPROVE**

I would ship this visual pass. Round 3 named the anatomies and filled them with drawings. Round 4 fills the same anatomies with stills. The library now looks like a 2026 marketing kit, not a CSS costume.

## Keep

Cinematic and product stills that already read finished:

- `hero / cinema`, `sports`, `clinic`, `fashion`, `shop`, `ac-remote`, `four-doors`, `editorial`, `featured`, `device`, `wordmark`, `logos`, `journal`, `waitlist`
- `case-study / tabs`
- `team / doctors`, `team / featured`
- `logo-cloud / dealers`, `logo-cloud / grid`
- `services / doors`
- `kit / healthcare`, `kit / hvac`, `kit / sports` (mast + season desk), `kit / agency` (NORTH field)
- `cta-band / appointment`, `testimonials / quote`
- Type-led models that do not pretend to be photographs: `process / written`, `process / three`, `services / why`, `chapters / eight`, `countdown / event`, `leaderboard / medals`, `kit / portal`

## Redesign

These are premium-adjacent, not empty — they still leak the media set:

- `hero / glass-fold` — the still is already a sheers blur; the frosted plate turns it back into a brown wash
- `hero / app` — phone chrome wrapping a laptop crop and a villa crop. A device hero needs an app surface
- `services / disciplines` and the venue row on `kit / sports` — Track / Court / Climb are the torus, gold spiral, and liquid splash reused as “venues”
- `team / *` portraits — six oil-study faces. Better than initials; not photography. Grade or reshoot
- `case-study / film` and the isolated `services / checklist` card — both wells look empty in the gallery frames, while `kit / hvac` proves the checklist stills exist. The docs card has to show the media, not crop to type
- `app-shell / agency` desktop frame is a blank cream plate. `kit / portal` mobile is the real desk; fix the preview
- `marquee / avatars` — still AK / JR / MC chips

## Replace

Nothing on the Round 3 replace list remains. Empty 21st.dev geometry, brown case rectangles, and Instrument Serif dealer words are retired.

Do not delete `avatar / initials`. It is an explicit primitive. Do not treat type-led chapters or process as missing photos.

## Weak spots

- The people set is one painterly grade. Fashion and clinic interiors look shot; the doctors look rendered.
- Six 3D token marks are a coherent fictional lockup, then get stretched into “press” and “partner” without new drawings.
- `liquid`, `spiral`, and the NORTH torus are cinematic as hero fields. They are wrong as sports venues.
- Docs labels still lie: avatar image is tagged “Gradient photo stand-in”; dealers is tagged “HVAC dealer wordmarks.”
- Full-page kit captures (healthcare, HVAC) are too small to proof type. The cropped heroes are the trustworthy frames.
- Grain overlay on every `MediaFrame` is a studio finish. Fine on cinema; slightly dirty on the lamp and the coat.

## Initials, empty geometry, text-only marks

**Gone as the library’s default language.**

- People default to bundled portraits (`team`, `waitlist`, `testimonials / quote`, `avatar / image|group`). Initials remain only when asked (`avatar / initials`) plus the leftover `marquee / avatars` chips.
- The Round 3 empty-geometry heroes (`editorial`, `fan`, `glass-fold`, `split-cards`, `device`, `fashion`, `spiral`, `liquid`, `tilted`, `featured`) now take WebP stills. I have frames for most of them; `fan` / `spiral` / `liquid` / `tilted` / `split-cards` are wired the same way in code.
- Logo clouds and `hero / logos` are mark stills, not serif words. Stacked / badge variants pair a mark with a name. That is a lockup, not a wordmark costume.

I am not scoring replicas of the live sites. I am scoring whether this catalogue now looks expensive. It does.
