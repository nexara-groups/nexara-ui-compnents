**APPROVE**

# Round 5 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-1816708c-face-5378-ae7b-5d31e3047a12)  
**Evidence:** Re-check of bar 4 after `5944b98`. Fresh frames `docs/audit/round-5/focus-hero-app.png`, `focus-services-checklist.png`, `focus-services-disciplines.png`, `focus-testimonials-quote.png`. Stills `public/media/screen-lumen.webp`, `hvac-*.webp`, `venue-studio.webp`. Source: `src/lib/media.tsx` (`hvac`, `screens.lumen`), `src/components/ui/services.tsx` `climate[]`, `src/components/ui/hero.tsx` Phone defaults, `testimonials.tsx`, `marquee.tsx`. Bars 1–3 and 5 re-confirmed in source; not re-litigated.

Live Sri / Rise / Nexara / VDRSA were a quality bar, not templates. I did not score replicas. Original fictional brands only.

## Verdict

**APPROVE**

The five bars I published in round 4 now hold. The Carewell phone and the HVAC leftover stills are gone. I would put the named cells in front of a client tomorrow.

This is an approve of those bars and those cells. It is not a stamp that isolated `app-shell / agency` is a product, or that every Ada Klein initial in a flip card has been renamed.

## The five bars (claimed → found)

| Bar | Claimed | Found |
| --- | --- | --- |
| 1. People are photographic *or* the docs say illustrated and stop saying photographic | Closed by reshoot | **Hold.** Photoreal generated portraits; docs still say photographic; the sentence matches the files. Same register as Harbor night. |
| 2. `hero / logos` quote and mark row intact | Closed | **Hold.** Full quote “The room finally feels finished.” / Anitha Rao, Harbor. `shrink-0` on the well. Flat SVG marks. Unchanged this re-check. |
| 3. Play either plays or the control is gone | Closed | **Hold.** `PlayControl` still drives `cinema-reel` / `sports-reel` (6s webm+mp4). Cinema was proven on this branch. Unchanged this re-check. |
| 4. Every labelled still matches the label | Closed by reshoot | **Hold.** See below. The two holes I named are closed. Studio is a gym. Quote and marquee name the faces. Video title in source is Harbor after dark. |
| 5. Waitlist is one Join | Closed | **Hold.** `heroCopy('waitlist').action` is still `''`. Form Join only. Unchanged this re-check. |

## Bar 4 re-check (claimed → found)

| Claim | Found |
| --- | --- |
| `screen-lumen.webp` is Lumen Care (Dr Rao, Anitha / Meera / Kiran / Latha); `hero / app` right phone uses it | **Yes.** File header is **Lumen Care**. Hello Dr Rao. Appointments: Anitha Rao, Meera Shah, Kiran Reddy, Latha Iyer. Chairs today 12. `Hero` app still defaults the tall phone to `media.screens.lumen`. Fresh `focus-hero-app.png` shows the cream list, not Carewell. Left phone remains the Field sprint board. |
| Checklist: Ducted → galvanized ducts, Cassette → ceiling cassette, Plant → plant room; VRF indoor unit kept | **Yes.** `climate[]` points at `media.hvac.ducted` / `cassette` / `plant` and `media.climate`. Frames match: ducts, four-way cassette over a board table, copper plant room, wall indoor unit. |
| Studio discipline is an athletic floor | **Yes.** `venue-studio.webp` is kettlebells, rack, rubber floor. `focus-services-disciplines.png` shows that still under Studio. Track / Court / Field / Pool / Climb still depict those rooms. |
| Quote + marquee name Anitha / Kiran / Meera on those portraits | **Yes.** `testimonials / quote` frame: Anitha Rao, Design lead, Harbor, on Anitha’s face. Marquee avatars: Anitha Rao, Kiran Reddy, Meera Shah. |
| Video title is Harbor after dark, not Anitha speaking | **Yes in source.** `HarborReel` title is `Harbor after dark` over `media.cinema`. `docs/audit/round-5/focus-testimonials-video.png` is **stale** — it still reads “Anitha on Harbor.” Recapture that PNG. I am scoring the file that ships, not the old frame. |

## What I will sign

- `hero / app` as a pair of product phones: Field sprint series and Lumen Care.
- `services / checklist` as HVAC photography. Ducted lines are ducts. Cassette is a cassette. Plant is a plant.
- `services / disciplines` including Studio. It is a training floor, not a fashion cyclorama.
- People, logos, Play, Join — as in the first pass.
- Cinema, journal, waitlist, doctors, sports, shop, fashion, featured, wordmark, ac-remote, four-doors, dealers, the four kits.

## What I will not pretend

- That Anitha is one person with one job. Team files her as Lumen cardiologist; testimonials files her as Harbor design lead. The face matches the name. The bible does not. Not a leftover still. Not a bar-4 fail.
- That `testimonials` quotes 4–6 (`Eli Park` / `Noor Hale` / `Sam Ori`) are Suresh, Latha, and Vikram. Those names sit on unused `src` fields; wall and grid do not paint the portraits. Quote and marquee, the cells I named, are clean.
- That Ada Klein is gone from the library. Spotlight and flip-card still use **AK** initials. Those are not photographic stills of Anitha.
- That isolated `app-shell / agency` is a desk. Empty Open / Waiting / Done. `kit / portal` is the shell with furniture.
- That the stale `focus-testimonials-video.png` is current.

## Remaining cheapness (honest, not the bar)

- Marks are marks and also generic. Fine at strip size.
- `kit / sports` still held counts at 0 in the earlier audit frame.
- Grain on every `MediaFrame`. Fine on cinema.
- Fake reel durations (4:12, 2:18) on 6s Ken Burns. Docs chip on testimonials/video still says “Playable still.” The reel plays.
- `four-crews` still uses leftover wells (laptop as Design, editorial as AMC). Not the checklist I failed. I am not moving the goalposts onto it.

## Client tomorrow

Yes. I would walk cinema, logos, waitlist, doctors, journal, sports, disciplines, clinic, shop, fashion, featured, wordmark, ac-remote, four-doors, `hero / app`, `services / checklist`, and the kits.

I would still skip isolated `app-shell / agency`. That was never one of the five bars.

## Approval bar leftover

None on the five. Recapture `focus-testimonials-video.png` so the audit folder matches source. Rename Anitha’s job or live with a two-desk fiction.

**Consensus slot:** The five bars hold. I approve the named cells. A11y remains conditional on APG and faint contrast — that is their lens, not this one.
