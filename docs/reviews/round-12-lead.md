# Round 12 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-7a27e41c-b8a5-59fb-abb9-d8c3851bcd2a)  
**Scored commit:** `daee816` on `cursor/visual-quality-overhaul-3ef7`  
**Evidence:** `docs/reviews/round-12-self.md`; `src/lib/wow-variants.ts`; `src/lib/wow-unique.tsx` (`LensHover`, `InfinityPath`); `src/components/ui/kit.tsx`; `wow-core.tsx` `HeroPin`; `wow-app.tsx` `LoaderWow` / `ShellWow` / `KanbanWow` / `SettingsWow`; `wow-signatures.tsx`; `src/docs/docs-app.tsx`; `src/docs/variant-gallery.tsx`; `src/lib/wow.tsx` `ScrollPin`; stills in `docs/audit/wow/` (hero-pin-scroll, ch2, ch4, phone/tablet; loaders pulse-halo / path-infinity / flap-wait / prism-bar / barcode-scan; app-radar-jump; kanban-wip-pendulum; settings-fold-profile; card-lens-spec; kit-pin-sports / shader-clinic / globe-agency; round12-motion.webm). I did not merge. I did not implement fixes.

Round 11 REJECT ALL on `a4c5592`: 0 / 47 families passed the standout test. Named lies: `LensHover` empty circle, `InfinityPath` a sine, pin-scroll a scaled card in a 36rem cage, loaders remounted helpers, `KitWow` demotion, docs sold gold as Awwwards. Worst leftover families: `loader`, `app-shell`, `kanban-board`, `spotlight-card`, `settings-panel`.

Round 12 claims those closed. I scored the claims, then the only test that matters: would a gold cell stand out next to a top 21st.dev, Aceternity, or Awwwards entry? Closing a named lie is not a bookmark. Unique-inside-this-repo is not a stamp. I refuse it.

## Verdict

**REJECT ALL**

**0 / 47 families pass the standout test. 47 / 47 fail.**

Named construction lies mostly closed. Standout did not move. I would not walk a single gold cell in `daee816` next to a top Aceternity globe, a 21st scroll-expand hero, or an Apple / Awwwards product film and ask anyone to take the comparison seriously.

Do not merge.

## The round-12 claims (claimed → found)

| Claim | Found |
| --- | --- |
| `LensHover` clones and scales the child | **Closed as a lie.** `lens-spec` is a lamp photo under a circular loupe; the still shows magnified travertine. The helper is a cloned, scaled child in a `size-32` clip. That is Aceternity’s lens, smaller. The family still fails standout. `glare-tilt` is still `TiltGlare`. |
| `InfinityPath` is a lemniscate | **Closed as a lie.** The still is a real ∞ with a traveling bead. `daee816` drew the full cubic. Loader `path-infinity` honors Pause. Cute CodePen. Not a family. |
| Pin-scroll is object-centric; Pause owns the reel | **Pause is real. The story is not.** `MediaFrame playing={loop.playing}` and reduced-motion snap to chapter 4. The object is one stock laptop still, scaled / rotated / lifted through four captions. See pin-scroll below. |
| `KitWow` is gone | **Closed.** `WowSignature` does not route `kit`. `<Kit />` still wraps industry pages. Proof stills for `globe-agency` and `pin-sports` still show the hat, not the page. `pin-sports` duplicates the same skater PNG as a “object.” |
| Docs no longer sell gold as Awwwards | **Closed.** Docs copy: gold chips “are not a 21st.dev or Awwwards stamp.” `INDEX.md` agrees. The self-note is honest. Honesty is not a pass. |
| Gallery pin is `max-h-[80vh]` so 520vh can scroll | **Cell grew. Cage remains.** Gallery pin cells are 80vh nested scrollers. `ScrollPin`’s pinned frame is still `h-[min(36rem,80vh)]`. `daee816` translates that 36rem pane inside the nested scroller so chapters 02–04 stay on screen. That is a gallery patch, not a page-level scroll story. Phone / tablet stills are still chapter 01. |
| `loader` / `app-shell` / `kanban` / `spotlight` / `settings` closed | **Remount lie closed. Worst-five closed? No.** Loaders are original CSS, not `ShaderMesh` remounts. Radar has Anitha and three briefs. Kanban has three columns. Lens magnifies. Fold has a portrait. None of that is a desk, a board, a shop, or a waiting system you would screenshot next to 21st.dev. |

## Pin-scroll

Still a scaled card. Not an Apple-level scroll story.

`HeroPin` is 520vh of `ScrollPin`. Progress scales one `media.device` plate (0.52 → 1.14), eases `rotateX` / `rotateZ` / `y`, and swaps four headlines via `Math.floor(p * 4)`. Chapter 0 is the laptop on marble. Chapter 1 hangs two CSS labels (“nano-etched glass”, “Harbor chip”) on the same photo — the chip line points at the trackpad. Chapter 2 overlays the reel and a purple `mix-blend-color`. Chapter 3 is the lockup. Copy is still meta, from `previews.tsx`: “The hero is the transition.” “A media plate that grows from a card to a field.” “Keep scrolling.”

`round12-motion.webm` (5s) is the proof they asked me to believe. It shows the plate growing, the captions swapping, then the plate covering the headline. In `hero-pin-scroll-ch4.png` the “nano-etched glass” callout collides with “The hero is the transition.” Apple product pages move a filmed or 3D object through space, lock callouts to the object, and change material *on the object*. This commit grades a stock laptop purple and changes the caption.

The gallery still judges it in a nested 80vh cage with a 36rem frame. Phone and tablet captures never leave chapter 01. `kit / pin-sports` is the same trick: one skater still, plus a second copy of that still in the corner, plus four chapter strings. `INDEX.md` already admits it is “not a filmed Apple product page.” I agree. Four ticks and a nested `translateY` do not upgrade the grade.

## Loader

Not distinctive. A family of original CSS toys in one night well.

Round 11’s remount complaint is closed: `LoaderWow` no longer drops in `ShaderMesh` / `ParticleField` / `GooPuddle` / `Odometer` / `ScrambleText` / `SplitFlap` / `AnalogClock`. Twelve constructions, `role="status"`, Pause, reduced-motion. Existence plus Pause is not a point of view.

Stills and the motion clip: `pulse-halo` is concentric gold rings and “Harbor pack.” `path-infinity` is a lavender lemniscate. `flap-wait` is four tiles mid-cycle (the clip shows empty / garbled glyphs). `prism-bar` is a red/blue pill. `barcode-scan` is CSS bars and a gold scan line. `orbit-beads` kept the orbit name. Same `#111113` well on every chip. That is Magic UI’s leftovers drawer with the shared helpers peeled off. I would not screenshot any of them next to a 21st.dev or Aceternity waiting state.

## Families that pass the standout test

None.

I looked for a pass. `spotlight / lens-spec` is the only gold cell whose named mechanic is now true in the still — and it is a smaller Aceternity lens. `kit / shader-clinic` is still the only gold cell that is a page; the page is the leftover clinic from rounds 5–6; the signature is the house mesh mast. `hero / shader-void` is the middle of every 2024 shader-hero list (and `cta / liquid-wash`, `aurora / shader-mesh`, `nav / glass-liquid`, `modal / shader-veil`, `pricing / shader-featured` are the same blob cropped). `hero / globe-orbit` is the Aceternity globe with inverted orbit labels. `hero / morph-stage` source is cinema → reel; the shipped still is still an N. `button / liquid` is two goo blobs. `typewriter / matrix-rain` is a CodePen. `typewriter / flap-3d` is four mid-cycle tiles. `footer / giant-marquee` is NEXARA NEXARA. Competent catalog chrome. Not a stamp.

## Families that do not (47)

Gold cell that is dressed orbit/tilt, a shared-helper hat, a CSS toy in a night card, or empty chrome fails the family.

| Family | Why it fails |
| --- | --- |
| `hero` | Pin-scroll is a scaled laptop card. Globe-orbit still wears `OrbitRing`. Shader-void is the house mesh. Scramble-mast is split type on black. Morph-stage still is an N. |
| `button` | Liquid is commodity goo. Ink-path is a hairline you can barely see. Glare is `TiltGlare`. Burst is `ParticleField`. Scramble is scramble. |
| `magnetic-button` | Magnetic well, blur trail, ink-wake dots, shatter letters. |
| `aurora-background` | Same mesh / particles / globe / glass card as the hero hats. `globe-field` is a sphere and the word “globe-field.” |
| `grid-background` | Canvas floors. Construction fields, not scenes. |
| `kit` | Clinic page + mesh hat. Globe-agency proof is the globe, not the agency. Pin-sports is a captioned still of the same athlete twice. Liquid-portal is the lazy icosahedron. Scramble-academy is scramble. |
| `loader` | See above. |
| `app-shell` | `radar-jump` is a list with faces and a CSS radar; Pause sits on the sweep. Shader-desk is a photo with “Rooms / Library.” Liquid-rail is N / W / A on a Lumen still. Morph-sidebar is a width toggle. |
| `kanban-board` | `wip-pendulum` proof overlaps Brief tickets and hangs “2 / 3” on a string. Peel cards are gold triangles. Particle-lane is particles plus a sentence. |
| `spotlight-card` | `glare-tilt` kept. `lens-spec` now magnifies — and still would not be bookmarked next to Aceternity’s lens. Shader-well is a photo hat. Scramble-stat is an odometer. |
| `pricing` | Three plan cards. Prism on $48 is invisible in the still. Featured is the mesh on the middle card. |
| `testimonials` | Polaroid is a barely-fanned stack. Scramble quote. Video + caption. |
| `floating-navbar` | Pill + toy compass. Mesh + glass pill. Collapsing dock labels. Magnetic pill. |
| `stats` | Odometer row. Dial is a generic SVG gauge (needle vs arc still do not agree). Particles + ticker. |
| `footer` | Giant wordmark tape. Grain night. Barcode bars. Drawn sitemap. |
| `cta-band` | Same mesh as shader-void. Scramble closer. Particles. Beam sweep. |
| `modal` | Mesh veil, twice in the still. Goo sheet. Shared N. Particle confirm. |
| `tabs` | Zipper is two panels sliding 38%. Layout-morph ink. Goo. Scramble labels. |
| `accordion` | Mesh behind FAQ is invisible in the still. Path plus. Scramble FAQ. |
| `flip-card` | Shader / goo / conic / path on a tap-to-turn plate. |
| `bento-grid` | One mesh tile, one gold triangle “peel,” one ticker. |
| `draggable-card` | Drag plate, magnetic stack, RGB type, particle toss. |
| `marquee` | Cylinder, two dashed “reels,” velocity tape, grain tape. |
| `input` | Goo blob, caret, path underline, four OTP boxes. |
| `gradient-text` / `typewriter` / `text-reveal` | Morph, scramble, mask, path, matrix, flap. Aceternity / Magic UI already shipped the menu. |
| `tooltip` / `toast` / `avatar` / `badge` | Fake lens, particle hint, scramble, magnetic tag; check path; radar-on-a-face; Morse blink. |
| `countdown` / `leaderboard` / `case-study` | Clock + “orbit” name. Heat bars. Horizontal film of titled cards. |
| `services` / `process` / `team` / `contact` | Stamp bounce, fold doors, swinging metronome line, constellation dots, mesh “Harbor Bay,” magnetic city cards. |
| `chapters` / `news` / `logo-cloud` | Sticky stills or chapter text. Tape / flap headlines. `orbit-3d` is `GlobeField`. |
| `kpi` / `data-table` / `chart-block` / `activity` | Ring 78%, heat grid, six bars, two chat bubbles, a path. |
| `command-palette` | Filter list. Prism row is RGB on “Open Harbor.” |
| `settings-panel` | Toggle + a sentence. Path + a sentence. Fold is a lonely portrait card; the still is 70% empty. |

## What I will sign

- `LensHover` magnifies. The empty-circle lie is dead.
- `InfinityPath` is an ∞. The sine lie is dead.
- `KitWow` is gone from `WowSignature`.
- Docs no longer caption gold chips as a 21st.dev / Awwwards peer.
- Loaders are original constructions with Pause and `role="status"`, not remounts of the house helpers.
- `HeroPin` Pause stops the reel. Reduced motion snaps to chapter 4. Nested gallery pin now *shows* chapters 02–04. The *attempt* is larger than round 11.
- Radar / kanban / fold have faces and product nouns. That is furniture, not a scene.
- `OrbitRing` remains only on `hero / globe-orbit`. `TiltGlare` remains on glare button and glare-tilt card.

## What I will not pretend

- That closing named lies earned a 21st.dev / Awwwards stamp. The house style is still one night card: `#07070c`, gold mono eyebrow, serif lockup, iris mesh. Forty-seven variations of that card is a system, not a gallery of standout objects.
- That unique helpers are unique *work*. `PrismSplit` is RGB offset. `PeelCorner` is a gold triangle. `RadarSweep` is conic CSS. `CompassNeedle` is a line. `ZipperSplit` slides 38%. `MorseBlink` is a dot. `TapeReels` are two dashed circles. `PendulumCard` is a card on a string. `InfinityPath` is a stroke with a bead. `LensHover` is a cloned child. I will not caption those as signatures.
- That pin-scroll is a product film. It is a scaled laptop and four captions, now visible in the nested cage.
- That the loader family is a point of view. It is twelve CSS toys with a new slug and a Pause button.
- That app-kit “desks” are desks. “Jump the desk” + a radar the Pause sits on, overlapping Brief tickets + a hanging “2 / 3”, and a portrait with empty width, are labelled chrome.
- That `hero / morph-stage.png` is current. Source is cinema / reel. The still is an N.
- That `kit-globe-agency.png` and `kit-pin-sports.png` show wrapped pages. They show the hat.
- That unique-inside-this-repo is the owner bar. The self-note already admits it is not. I agree, and I score against the bar they named.

## Remaining cheapness (honest leftovers)

- Shared mesh is still the new orbit. Void, clinic, featured price, accordion row, modal veil, CTA wash, aurora, nav glass — one blob, many crops.
- Gallery pin cells remain nested 80vh scrollers around a 36rem frame. A 520vh story that cannot be scrolled as a page is still dead in the place people will judge it.
- Pin chapter 4 type collides with the plate. Meta copy (“The hero is the transition”) survived the object-centric rewrite.
- Dual kit proofs: `<Kit />` wraps; the stills sell the mast.
- Dial gauge needle and arc still disagree.
- Polaroid still does not fan.
- Prism price is invisible.
- No physical-device pass. Playwright on `127.0.0.1:5173`. The 5s motion clip is a scrub of the scaled card plus four loader wells.

## Client tomorrow

No. Not for the gold chips. I would still walk the leftover clinic / sports / cinema pages from rounds 5–6. I would not walk pin-scroll, the loader row, radar-jump, pendulum kanban, fold-profile, or compass-nav as “signature.” I would mention `lens-spec` as the one named lie that became a real loupe, then I would not put it next to Aceternity.

## Approval bar leftover

Every family still needs one gold cell that would be bookmarked on 21st.dev or Aceternity *as itself*, not as “Nexara’s night card plus helper X.” Pin-scroll needs the object to be the story — filmed or 3D, callouts locked to glass and chip without covering the title, on a page, not in an 80vh cage. Loader needs one waiting construction you would steal, not twelve. App-kit needs a desk. Kanban needs a board that does not overlap its own tickets. Kit proofs need to be the pages.

**Five worst leftover families:** `hero`, `loader`, `kanban-board`, `app-shell`, `kit`.

**Consensus slot:** Visual / motion / a11y have not signed `daee816`. I reject all 47 families on the standout test. Named lies closed. The stamp is not earned. Do not merge.
