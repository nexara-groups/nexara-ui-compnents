**CONDITIONAL**

# Round 5 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-1816708c-face-5378-ae7b-5d31e3047a12)  
**Evidence:** `docs/audit/round-5/focus-*.png` vs round-4 frames; `public/media/portrait-*.webp`, `mark-*.svg`, `venue-*.webp`, `*-reel.webm`, `journal-cover.webp`, `screen-*.webp`; `src/lib/media.tsx`; `src/components/ui/hero.tsx`; `src/docs/previews.tsx`; Playwright smoke already on this branch.

Live Sri / Rise / Nexara / VDRSA were a quality bar, not templates. I did not score replicas. Original fictional brands only.

## Verdict

**CONDITIONAL**

Four of the five bars I published in round 4 are closed. The fifth is not. I will not approve a pass that still labels a Carewell Clinic dashboard as Lumen and still captions a laptop as “Ducted lines.”

I would put cinema, logos, waitlist, doctors, journal, sports, shop, fashion, featured, wordmark, ac-remote, four-doors, and the four industry kits in front of a client tomorrow. I would not walk `hero / app` as a Lumen phone, and I would not walk `services / checklist` as HVAC photography. That is not a finished premium library. It is a photographic library with one stock UI and a few leftover stills wearing new captions.

## The five bars (claimed → found)

| Bar | Claimed | Found |
| --- | --- | --- |
| 1. People are photographic *or* the docs say illustrated and stop saying photographic | Closed by reshoot | **Hold.** Round-4 `team / doctors` was oil paint (Anitha in a scarf through Vikram in a lime jacket). Round-5 stills are photoreal generated portraits with pores, knit, stethoscope metal, flyaway hair, and distinct rooms. Docs still say “photographic portraits by default.” That sentence is no longer a lie. They are the same generated-photoreal register I already signed for Harbor night and Lamp 04 — not a photo assignment of real clinicians. |
| 2. `hero / logos` quote and mark row intact | Closed | **Hold.** Desktop and 390 both show the full line “The room finally feels finished.” and “Anitha Rao, Harbor.” Avatar well has `shrink-0`. Marks are flat SVG (Kite kite, Solum coin, Nimbus cloud, Vale V, Orbit ring) — not the 3D souvenir renders that ate the quote in round 4. Playwright quoted the same sentence. `logo-cloud / dealers` caption is now “Partner marks as flat originals,” which matches the file. |
| 3. Play either plays or the control is gone | Closed | **Hold.** `CinemaHero` wires `PlayControl` to `media.reel` (`cinema-reel.webm` + `.mp4`, 6.000s). News/video wires `sports-reel`; testimonials/video wires the Harbor reel. The cinema audit frame is captured on pause (`❚❚`). Playwright: cinema Play advances `currentTime`. I did not re-click news or testimonials; the control is the same `PlayControl` / `MediaFrame playing` path, not a ▶ span on a WebP. |
| 4. Every labelled still matches the label | Closed | **Fail.** Round-4’s named crimes are mostly gone: Pool is a pool, Climb is a wall, Field is a stadium, Court is a court, journal is a book (Issue 18 / vase), not Wren’s dusk house. App phones are now UI stills, not a laptop crop and a villa. The hole that remains is the Lumen phone: `media.screens.lumen` → `public/media/screen-lumen.webp` is **Carewell Clinic**, “Good morning, Dr. Anderson,” May 22, 2025. Carewell is not in source copy. It is burned into the pixels of a file this catalogue files under Lumen. Same class, also found: `services / checklist` labels “Ducted lines” on `device-hero` (laptop + coffee), “Cassette” on `glass-hero` (restaurant through sheers), “Plant” on the same living-room indoor unit as “VRF rooms.” |
| 5. Waitlist is one Join | Closed | **Hold.** `heroCopy('waitlist').action` is `''`; the preview passes no second button. The variant’s form is the only Join. Frame shows one. Playwright count is 1. |

## What I will sign

- The people pack is no longer a drawing sold as photography. Anitha through Vikram read as photoreal defaults. `team / doctors`, `team / featured`, `avatar / image`, and the waitlist stack all use that set.
- `hero / logos` is a cell I would copy. Quote, attribution, and mark row survive 1440 and 390.
- Play is a control, not costume. Reels exist; cinema is proven; news and testimonials are wired the same way.
- Journal is a cover. Sports disciplines (Track / Court / Field / Pool / Climb) are those rooms. Case-study film is Wren / Grove / Harbor / Lumen, not empty wells.
- Waitlist is one action.
- Original brands remain Harbor Climate, Lumen Care, Field Athletics, North, Wren Build, Grove Farms, Solum, Vale, Kite, Nimbus, Orbit, Marble. No Sri / Rise / Nexara / VDRSA traces required.

## What I will not pretend

- That `hero / app` is a Lumen product shot. The left phone is a Field sprint board. The right phone is Carewell Clinic. Lumen Care is the healthcare brand in this library. Carewell is a stock dashboard that survived the media rebuild.
- That HVAC checklist stills match their labels. A laptop is not ducted lines. Sheers over a dining room are not a cassette. The VRF living room is not a plant.
- That Anitha Rao is Ada Klein. Logos finally names the face. `testimonials / quote` and `marquee / avatars` still caption the same portrait Ada Klein / Jonah Ruiz / Mira Chen.
- That `testimonials / video` is Anitha speaking. It is the Harbor night reel with a play control. The chip still says “Playable still.” The reel plays; Anitha is not in it.
- That Field Athletics “Studio” is a training floor. It is a fashion cyclorama with a coat rail. It is a studio. It is not leftover dusk house. I will not hide the cell. I will not call it sport.
- That isolated `app-shell / agency` is a product. Round 4 said this. Round 5 still shows Menu-less chrome with empty Open / Waiting / Done. `kit / portal` remains the shell with furniture.

## Remaining cheapness (honest, not the bar)

- Marks are now marks. They are also generic (cloud, V, ring). Fine at strip size. Do not stretch them into a brand book.
- `kit / sports` audit frame holds Skaters / Clubs / Coaches / National events at 0. Count-up in-view was signed in round 4; this capture did not prove the numbers.
- Grain on every `MediaFrame` is still a studio finish. Fine on cinema; slightly dirty on the lamp.
- Fake durations (Match film · 4:12, Anitha · 2:18) on 6s Ken Burns reels. Every mock does this. I am not failing Play on it.

## Client tomorrow

Yes, for the cells that hold: cinema, logos, waitlist, doctors, journal, sports hero, disciplines (Studio aside), clinic, shop, fashion, featured, wordmark, ac-remote, four-doors, the kits.

No, for the catalogue as a finished walkthrough. I would skip `hero / app` and `services / checklist`. A client who reads “Lumen” and sees Carewell will not trust the rest of the stills.

## Approval bar leftover

Approve when the Lumen phone says Lumen (or the file is renamed to whatever clinic it actually is) and every HVAC checklist well depicts the service on the card. Until then this pass closed people, logos, Play, and Join, and left labelled stills as the hole.

**Consensus slot:** A11y is already conditional this round (APG radios/tabs, faint as content). I do not approve the whole library. I do approve the four bars that actually closed. Visual already approved the stills in round 4. I am not rubber-stamping bar 4.
