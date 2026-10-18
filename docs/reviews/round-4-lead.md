# Round 4 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-3facdc5c-af41-5810-bf98-3253c3ca9cc5)  
**Evidence:** `docs/audit/round-4/focus-*.png` vs round-3 clinic and team; `public/media`; `src/lib/media.tsx`; follow-up source in case-study, stats, hero-extra, kit, input, cta-band, contact, app-shell.

Live Sri / Rise / Nexara / VDRSA were a quality bar, not templates. I did not score replicas.

## Verdict

**CONDITIONAL**

Round 3’s crime is closed for the stills. It is not closed for people, and it is not a stamp on every named cell.

I would put cinema, clinic, sports, shop, fashion, editorial, featured, wordmark, ac-remote, and four-doors in front of a client as original premium defaults. I would ship the four industry kits as pages. I would not ship this catalogue tomorrow as a finished premium library: the doctor grid is oil paint, the logo row clips its own quote, Play reel does not play, and several named rooms are leftover stills with new captions.

## What I will sign

- The media rebuild is real. Harbor night, the Lumen corridor, the skater, Lamp 04 on travertine, the wool coat, the dusk house, the NORTH torus, the sunlit split-unit room, Wren Build at blue hour — these are cinematic generated stills, not SVG hearts, CSS rings, or empty radials.
- Original brands (Harbor Climate, Lumen Care, Field Athletics, North, Wren Build, Grove Farms, Solum, Vale). No Sri / Rise / Nexara / VDRSA traces required, and this pass mostly stopped asking for them.
- `case-study / tabs`: construction still + visible **Pause cases**. Tab click stops the loop.
- `stats` count-up waits on IntersectionObserver and holds at 0 until in view.
- AC remote: live power / 16–30° / mode / fan. Mode pills are actually coloured (Chill cyan, Spring green, Sunny yellow, Autumn orange).
- Healthcare CTAs: cream on navy in the hero and appointment band; salmon `#f3b4b0` on `#0b1220` in the form. Contrast hold from round 3 is closed.
- `input / otp`: paste and arrow keys.
- `kit / portal` at 390 stacks KPIs, board, activity, table under a Menu control.

## What I will not pretend

- That illustrated portraits are photography. `team / doctors` is a coherent oil-paint set (Anitha through Vikram). That is a register, and it can be beautiful. The file still says “photographic portraits by default.” Round 3 rejected drawings sold as photography. This is the same lie, better drawings, only in the people pack.
- That six 3D souvenir renders (Kite star, Solum coin, Nimbus hex, Vale V, Orbit disc, Marble cube) are a logo system. They beat serif-as-logo. They are not marks. At strip size they read as product photos of toys.
- That `hero / logos` is finished. The audit frame clips “The room finally feels finished.” to “finally feels finished.” and “Ada Klein, Harbor” to a stump. `MediaFrame` avatars in a flex row have no `shrink-0`; the portrait well eats the quote.
- That **Play reel** plays. `public/media` is WebP only. Cinema, news/video, testimonials/video are stills with a ▶ span.
- That sports “Pool / Climb / Studio / Field” are those rooms. They are `liquid-hero`, `spiral-hero`, the dusk house, and the torus. Same stills reappear as phone screens in `hero / app` and as the journal cover.
- That `app-shell` is a product. Isolated agency/mobile is Menu + empty Open / Waiting / Done. The portal *kit* is the only shell with furniture.
- That `hero / waitlist` is one action. The variant already has Join on the form; the docs preview passes a second Join.

## Follow-ups (claimed → found)

| Claim | Found |
| --- | --- |
| Case-study pause | Yes, on `tabs` / `autoplay`. Not on `reel`. |
| Count-up in-view | Yes. `useCountUp(..., active)` + observer `threshold: 0.35`. Holds at 0 off-screen. |
| AC mode colours | Yes. Four distinct tones, not one selected chip. |
| Healthcare CTA contrast | Yes. Cream / navy; form salmon on navy. |
| Portal shell on small screens | Yes for `kit / portal`. Isolated `app-shell` is still empty chrome. |
| OTP paste / arrows | Yes, in `OtpField`. |

## Remaining cheapness (honest)

- People: paint vs photo. Own the illustration or reshoot. Do not caption it as photography.
- `hero / logos` layout. Fix the avatar well before anyone copies that cell.
- Named rooms stuffed with leftover stills (sports disciplines, app phones, journal = featured).
- Dead play controls on cinema.
- Type-only chapters in the healthcare kit — acceptable as a written explainer, not as a photographic page.
- Isolated `services / checklist` and `case-study / film` frames show empty wells; the same `MediaFrame` paints inside `kit / hvac` and `case-study / tabs`. Recapture before treating those two as empty. Code has stills.
- `focus-app-shell-agency.png` is a blank frame. Round-3 had the chrome. Capture miss, not a new object.
- AC remote at 390: Autumn wraps; white gap under the still. Polish, not a reject.

## Approval bar for a later pass

Approve when: (1) people are photographic *or* the docs say illustrated and stop saying photographic, (2) `hero / logos` quote and mark row are intact, (3) Play either plays or the control is gone, (4) every labelled still matches the label, (5) waitlist is one Join. Until then this is a photographic library with a people-pack hangover and a few cells I would hide from a client walkthrough.

**Consensus slot:** visual and a11y still pending. Motion already conditional. I do not approve the whole library. I do approve the stills that replaced the drawings.
