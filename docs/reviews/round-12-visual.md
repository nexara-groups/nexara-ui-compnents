# Round 12 — visual

**From:** [Visual designer critic](https://cursor.com/agents/bc-b4cae384-0890-52ff-b08a-f3f11c3573d1)  
**Scored commit:** `daee816` on `cursor/visual-quality-overhaul-3ef7`  
**Evidence:** stills in `docs/audit/wow/` (especially `hero-pin-scroll.png`, `hero-pin-scroll-ch2.png`, `hero-pin-scroll-ch4.png`, `hero-pin-scroll-phone|tablet.png`, `loader-pulse-halo.png`, `loader-path-infinity.png`, `loader-flap-wait.png`, `loader-prism-bar.png`, `loader-barcode-scan.png`, `app-radar-jump.png`, `kanban-wip-pendulum.png`, `card-lens-spec.png`, `settings-fold-profile.png`, `kit-pin-sports.png`, plus shader-void, globe-orbit, morph-stage, scramble-mast, clinic/agency kits, buttons, pricing, nav, stats, footer, CTA, modal, tabs, accordion, aurora, typewriter, countdown); `docs/reviews/round-12-self.md`; `src/lib/wow-variants.ts`; `src/lib/wow-unique.tsx` (`LensHover`, `InfinityPath`, `FoldPanel`); `src/components/ui/kit.tsx`; `wow-core.tsx` `HeroPin`; `wow-app.tsx` `LoaderWow` / `ShellWow` / `KanbanWow` / `SettingsWow`; `src/docs/variant-gallery.tsx`; `src/docs/docs-app.tsx`; `src/docs/previews.tsx`. I did not merge. I did not implement fixes.

Round 7 rejected every gold family on the standout test. Round 11 visual never wrote. Round 11 lead rejected `a4c5592` at 0 / 47. This commit claims the pin now stays on screen through chapters 02–04, the loaders are an original family, the app-kit cells are desks, the loupe magnifies, the infinity is a lemniscate, `KitWow` is gone, and the docs stopped selling gold as an Awwwards stamp.

I scored those claims. Then I scored the only test that matters for this lens: **would a designer screenshot a gold cell next to a top 21st.dev, Aceternity, or Awwwards entry?** Empty chrome, dressed-up orbit/tilt, and generic shader/particle farms fail. Unique-inside-this-repo is not a bookmark.

## Verdict

**REJECT ALL**

**0 / 47 families keep. 47 / 47 fail.**

Destock and named-lie cleanup are real. Standout is not. I would not walk a single gold cell in this commit next to a top Aceternity globe, a 21st scroll-expand hero, or an Awwwards product film and ask anyone to take the comparison seriously.

Do not merge.

## The seven follow-up claims (claimed → found)

| Claim | Found |
| --- | --- |
| Object-centric pin-scroll; chapters 02–04 visible in the gallery | **Visible, not object-centric.** Nested gallery pin is `max-h-[80vh]` and `ScrollPin` translates the frame, so `hero-pin-scroll-ch2.png` and `hero-pin-scroll-ch4.png` exist. That closes the dead-scroller complaint. The object is still one stock laptop still. It scales, tilts, and picks up a purple wash. Callouts are two hairline captions. Chapter 04 is titled from the docs preview: “The hero is the transition.” Phone and tablet stills remain chapter 01 only. No still of chapter 03 (“Midnight turns iris”). |
| Original loader family | **Original constructions. Empty chrome.** Twelve toys in one night well. Not remounts of `ShaderMesh`. Not a waiting system I would screenshot. |
| Real app-kit desks | **Labeled chrome.** `radar-jump` has a rail and three rows. `wip-pendulum` is two peel chips and a card on a string. `fold-profile` is a bust and two lines. That is not a desk. |
| Magnifying lens | **Code clones the child. The still is a circle.** `LensHover` scales a copy under a 128px clip. `card-lens-spec.png` is leftover Lamp 04 with a white hairline loupe and a black half-card. Magnification is not the picture. |
| Real infinity path | **True.** `InfinityPath` is a lemniscate with a traveling bead. `loader-path-infinity.png` is that stroke. Named lie closed. Visual grade unchanged: CodePen. |
| `KitWow` deleted | **True.** `WowApp` does not route kits. `<Kit />` wraps the leftover industry pages under a gold mast. Proof stills for `globe-agency` and `pin-sports` still show the hat. |
| Honest docs | **True.** Docs say gold chips “are not a 21st.dev or Awwwards stamp.” I will not let honesty about the stamp become the stamp. |

## Pin-scroll — do the stills now show a product story?

**No.** They show a chapter ticker on one photograph.

A product story changes the object’s job: material, scale in space, who is using it, what the machine can do. Apple and the better 21st pin/expand heroes lock type to the object and let the object replace the page. These three frames are the same North Display laptop on the same black marble, with a cup and a pencil that never move.

- **`hero-pin-scroll.png` (01).** Best frame in the gold catalogue. Quiet desk, milled plate, Instrument Serif “North Display,” gold mono eyebrow, four ticks. Composition holds. Photography is a stock device still. Copy is “It starts on the desk.” That is a card, not a film.
- **`hero-pin-scroll-ch2.png` (02).** Same still, slightly larger. “nano-etched glass” and “Harbor chip” hang on gold ticks. Two Pause pills — one in the mast, one in the corner. Specs arrived. The glass did not. The chip did not.
- **`hero-pin-scroll-ch4.png` (04).** Same still, larger, iris grade (`#7c6cff` at 20%). Headline overlays the keyboard: “The hero is the transition.” Deck line: “A media plate that grows from a card to a field.” That is the component talking about itself. `previews.tsx` feeds chapter 04 those strings. Dual Pause stays. “Keep scrolling” sits on the plate.

Gallery pin is no longer a 36rem coffin. Chapters 02 and 04 can be captured. That is a proof fix. It is not a story. Phone and tablet stills prove the scroller people will actually use still opens on the card. `kit / pin-sports` is the same trick on the leftover skater: chapter 01, then a second crop of the same body in the corner.

I would not put this sequence next to a top 21st scroll-expand or an Awwwards hardware film.

## Loader stills

A family of original wait-marks in one `#111113` well. Pause is on the plate. `role="status"` is not this lens. The pictures are.

- **`loader-pulse-halo.png`** — three hairline rings, a gold dot, “Harbor pack.” Default still. Empty chrome.
- **`loader-path-infinity.png`** — lavender lemniscate, gold bead. The name is finally true. The picture is a stroke.
- **`loader-flap-wait.png`** — mid-cycle tiles. W, a chevron, a dash. Not WAIT. Not a station.
- **`loader-prism-bar.png`** — red/blue pill. RGB offset as a progress bar.
- **`loader-barcode-scan.png`** — twenty-eight white ticks and a gold scan line. Tiny equalizer.
- Phone halo is the same rings, narrower.

`round12-motion.gif` opens on the halo. That is the honest poster for the family. I would not screenshot any of these next to a 21st or Aceternity waiting state. Twelve chips do not make a point of view.

## App-kit, lens, sports — the other claimed desks

- **`app-radar-jump.png`.** Anitha, North OS, three rooms, three briefs, a CSS radar. Denser than the round-11 three-line card. Still a night list. Pause sits on the sweep. The right half is black.
- **`kanban-wip-pendulum.png`.** Brief chips, a 16px Field screenshot, a hanging “2 / 3.” Pendulum is a card on a string. Not a board.
- **`card-lens-spec.png`.** Leftover travertine lamp (rounds 5–6 already signed that still). Gold identity is the circle. Right half empty.
- **`settings-fold-profile.png`.** Circular bust, name, “Harbor desk · SSO on.” Fold starts closed. Hours live on the back. This is the empty-chrome still of the commit.
- **`kit-pin-sports.png`.** Leftover speed-skater, strong crop. “The athlete is the object.” The inset is the same file. Chapter 01 only. The sports page from `<Kit />` is not in the frame.

## House style (why nothing stands out)

Every gold cell is the same night card: `#07070c` / `#111113`, gold mono eyebrow, Instrument Serif lockup, iris/teal mesh or a Fibonacci globe, a white pill, a Pause. Type is leftover-approved and still the best thing here. Photography that works is leftover-approved (clinic floor, skater, lamp, device, Anitha). The gold pass did not shoot a new object. It put a helper on the house card.

`ShaderMesh` is the new orbit: void, clinic mast, featured price, modal veil, CTA wash, aurora, glass nav. `GlobeField` is the other hat: hero orbit, aurora field, kit agency. `ParticleField` / goo / scramble / odometer fill the rest. Destocking `OrbitRing` and then spraying the house mesh is not destocking.

## Families that pass the standout test

None.

I looked. `hero / pin-scroll` 01 is the only gold frame I would hang in a moodboard, and I would hang it as a dark-device study, not as a 21st pin. `kit / shader-clinic` is a page because rounds 5–6 already built Lumen. The gold mast is the house mesh. `card / lens-spec` is a leftover product still plus a circle. `footer / giant-marquee` is NEXARA NEXARA. Competent catalogue chrome. Not a stamp.

## Families that do not (47)

A gold family fails if its signature cell is empty chrome, dressed orbit/tilt, a shader/particle/globe remount, or leftover photography with a helper hat.

| Family | Why it fails |
| --- | --- |
| `hero` | Pin-scroll is one laptop at three scales. Globe-orbit still wears `OrbitRing` on the house globe. Shader-void is the 2024 iris blob. Scramble-mast is split type on black. Morph-stage source is cinema → reel; the shipped still is still an N on a dark plate. |
| `button` | Liquid is two goo blobs on Continue. Ink-path is a word. Glare is `TiltGlare` on a grey pill. Burst is an empty pill (particles need hover). Scramble is scramble. |
| `magnetic-button` | Shatter still is the word “shatter.” Gravity / comet / ink-wake are helper hats on the same pill. |
| `aurora-background` | House mesh. House globe. Same materials as the hero hats. |
| `grid-background` | Canvas floors. Construction fields, not scenes. No still needed to fail the screenshot test. |
| `kit` | Clinic page + mesh hat. Globe-agency proof is the globe. Pin-sports is a captioned still plus a duplicate crop. Liquid-portal is the lazy icosahedron. Scramble-academy is scramble. Page wrap is real; the gold identity is the hat. |
| `loader` | See above. |
| `app-shell` | Radar-jump is a list and a toy sweep. Shader-desk is “Rooms / Library” on the laptop still. Liquid-rail is N / W / A. Morph-sidebar is a width toggle. |
| `kanban-board` | Pendulum is a hanging 2 / 3. Peel is three tickets. Particle-lane is particles plus a sentence. |
| `spotlight-card` | `glare-tilt` kept: “Lamp 04” over an empty well, no lamp. `lens-spec` is leftover photography plus a circle. Shader-well is the mesh. Scramble-stat is an odometer. |
| `pricing` | Three plan cards. Prism on $48 is invisible. Featured is the mesh on the middle card, same body copy on all three. `pricing-tilt-glare.png` is still indexed after tilt left pricing. |
| `testimonials` | Polaroid is a stack (the still does not fan). Scramble quote is one sentence. |
| `floating-navbar` | Pill + toy compass. Mesh + glass pill. |
| `stats` | Odometer row. Dial is a generic SVG; needle sits at 12 while the gold arc runs 8-to-4. |
| `footer` | Giant wordmark tape. |
| `cta-band` | Same mesh as shader-void. “Ask for a seat.” |
| `modal` | Same mesh, twice, stacked. “The overlay is a field.” |
| `tabs` | Rooms / Library / Export and a sentence. Ink is not in the still. |
| `accordion` | Docs FAQ (“Do I install a package?”). Shader row shows no shader. |
| `flip-card` / `bento-grid` / `draggable-card` | Helper hats on plates. Physics-deck is a text card on black. |
| `marquee` / `input` | Tape, goo, caret, path. Catalogue leftovers. |
| `gradient-text` / `typewriter` / `text-reveal` | Morph, scramble, mask, path, matrix rain, flap tiles (G N ² blank). Aceternity / Magic UI already shipped the menu. |
| `tooltip` / `toast` / `avatar` / `badge` | Fake lens, particles, scramble, Morse. |
| `countdown` / `leaderboard` / `case-study` | Analog clock that kept the orbit name. Heat bars. Film of titled cards. |
| `services` / `process` / `team` / `contact` | Stamp, fold, metronome, constellation, mesh map. |
| `chapters` / `news` / `logo-cloud` | Sticky type or house globe (`orbit-3d`). |
| `kpi` / `data-table` / `chart-block` / `activity` | Ring 78%, heat, six bars, two chat bubbles. |
| `command-palette` | Filter list. Prism row is RGB on a label. |
| `settings-panel` | Fold-profile is the empty bust. Path + a sentence. Toggle + a sentence. |

## Keep

None.

I am not moving leftover-approved clinic / sports / lamp / device stills into this keep list because they wear a gold hat. Rounds 5–6 already signed those pages. This pass is the gold chips.

## What I will sign

- Gallery pin cells are 80vh and the nested scroller actually drives `ScrollPin`. Chapters 02 and 04 can be seen. That was a real hole.
- `InfinityPath` is a lemniscate. The still matches the name.
- `LensHover` clones and scales the child. The name is no longer an empty circle in code.
- `KitWow` is gone. `<Kit />` still wraps healthcare / agency / sports / portal / academy.
- Docs no longer caption gold as a 21st.dev / Awwwards peer.
- Loaders are drawn as themselves, not as `ShaderMesh` remounts.
- Type on the house card is still leftover-good: Instrument Serif, gold mono, restrained tracking.

## What I will not pretend

- That visible chapters are a product story. One laptop, three scales, two callouts, a purple wash, and a meta headline is a ticker.
- That an original loader stroke is a distinctive waiting family.
- That a radar, a pendulum, and a closed fold are desks.
- That a white circle on leftover travertine is a shop loupe I would bookmark.
- That deleting `KitWow` made `globe-agency` or `pin-sports` into pages in the proof.
- That destock earned a stamp. The house night card is a system. Forty-seven variations of that card is not a gallery of standout objects.
- That `hero-morph-stage.png` is current. Source is cinema / reel. The still is an N.
- That phone pin is a chapter story. It is 01.

## Five worst leftover cells

1. **`settings-panel / fold-profile`** — claimed desk. Still is a bust and two lines on a black field. Fold is closed. Hours and SSO sit on the back, invisible.
2. **`loader / pulse-halo`** — claimed family head. Three hairline rings and “Harbor pack.” The motion poster opens here.
3. **`spotlight-card / glare-tilt`** — leftover tilt kept. “Lamp 04” over an empty well. No lamp, no glare, no product.
4. **`hero / morph-stage`** — source is a cinema plate that opens to a reel. The shipped still is a letter N. Proof lie.
5. **`kit / globe-agency`** — claimed page wrap. Still is the Fibonacci globe and “Move the furniture.” The agency page is below the capture.

Honorable cheapness, same class: `draggable-card / physics-deck` (a text card), `button / glare` and `button / burst` (empty Continue), `accordion / shader-row` (docs FAQ, no mesh), `kanban-board / wip-pendulum` (a card on a string), `card / lens-spec` (half-empty leftover lamp), `nav / compass` (pill + toy).

## Remaining cheapness

- Dual Pause on pin chapters 02 and 04. The story control and the reel control sit in the same frame.
- Chapter 04 copy is docs-meta. Product name dies at 03.
- No chapter 03 still. The finish change is the claimed beat and it has no picture.
- Shared mesh / globe / particle farm is the visual identity. If the next pass destocks `ShaderMesh` the way this one destocked `OrbitRing`, do not replace it with another house material on every chip.
- Polaroid still does not fan. Dial needle and arc do not agree. Pricing leftover `tilt-glare` still is indexed.
- No physical-device pass. Playwright on `127.0.0.1:5173`.

## Client tomorrow

No. Not for the gold chips. I would still walk the leftover clinic / sports / cinema pages from rounds 5–6. I would not walk pin-scroll, the loader row, radar-jump, pendulum kanban, lens-spec, fold-profile, or compass-nav as “signature.”

## Approval bar leftover

Every family still needs one gold cell that would be bookmarked on 21st.dev or Aceternity *as itself*, not as “Nexara’s night card plus helper X.” Pin-scroll needs the object to change, not the caption. Loader needs a waiting construction with a point of view. App-kit needs furniture, not a radar and a hanging card. A lens still has to *look* magnified. A fold still has to fold.

**Consensus slot:** Motion / a11y / lead have not signed `daee816`. I reject all 47 families on the standout test. Chapters 02–04 being capturable is a proof fix. It is not a product story. Do not merge.
