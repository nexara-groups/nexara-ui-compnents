# Round 11 — design lead

**From:** [Sceptical design lead](https://cursor.com/agents/bc-33a9cec7-833f-5dc0-b53d-ad5afdb8a0ea)  
**Scored commit:** `a4c5592` on `cursor/visual-quality-overhaul-3ef7`  
**Evidence:** `docs/reviews/round-11-self.md`; `src/lib/wow-variants.ts`; `src/lib/wow-unique.tsx`; `src/components/ui/kit.tsx`; `wow-core.tsx` `HeroPin`; `wow-app.tsx` `LoaderWow` / `ShellWow` / `KitWow`; `wow-blocks.tsx`; `loader.tsx`; `src/docs/variant-gallery.tsx`; stills in `docs/audit/wow/` (pin-scroll desktop/phone, shader-void, globe-orbit, morph-stage, scramble-mast, kit-clinic / globe-agency / pin-sports, loaders, radar-jump, wip-pendulum, lens-spec, compass-nav, prism-price, polaroid, dial-gauge, liquid, flap-3d, matrix-rain, ink-path, cta-wash, giant-marquee). I did not merge. I did not implement fixes.

Round 7 rejected all 46 families on the standout test. Follow-ups claimed names now match, kits wrap pages, orbit/tilt destocked, pin-scroll is a four-chapter story, and a loader family exists. I scored those claims, then the only test that matters: would a gold cell stand out next to a top 21st.dev, Aceternity, or Awwwards entry? If a gold cell is still a dressed-up orbit/tilt, a remount of `ShaderMesh` / `ParticleField` / `GooPuddle` / `ScrambleText` / `Odometer`, or empty chrome, the family fails.

The self-note is honest that this is not an Awwwards claim. The docs page is not: it still tells visitors the gold chips were “built to stand next to 21st.dev / Aceternity / Awwwards.” I refuse that stamp.

## Verdict

**REJECT ALL**

**0 / 47 families pass the standout test. 47 / 47 fail.** (46 catalog families plus the new `loader` family.)

Destock is real. Standout is not. Unique-inside-this-repo is not a 21st.dev bookmark. I would not walk a single gold cell in this commit next to a top Aceternity globe, a 21st scroll-expand hero, or an Awwwards product film and ask anyone to take the comparison seriously.

Do not merge.

## The five follow-up claims (claimed → found)

| Claim | Found |
| --- | --- |
| Names now match | **Mostly.** `OrbitRing` no longer wraps most gold cells. `TiltGlare` is left on `button / glare` and `spotlight / glare-tilt`. That is destock, not a stamp. The new names (lens, prism, peel, zipper, radar, Morse, polaroid, barcode, dial, fold, stamp, metronome, constellation, film, tape, pendulum, beam) are real files. They are CodePen toys, not finished scenes. `lens-spec` is still a lie: `LensHover` draws an empty circle (`backdropFilter: none`, no magnified child). `path-infinity` is a sine in the still. `orbit-beads`, `orbit-3d`, and `analog-orbit` kept the orbit name. |
| Kits wrap industry pages | **On `<Kit />` only.** `kit.tsx` mounts a mast, then `KitCore` (`healthcare`, `agency`, `sports`, `portal`, `academy`). `kit-shader-clinic.png` is a real Lumen page under a mesh hat. `WowSignature` still routes `family === 'kit'` to `KitWow`, which is the one-card demotion (shader title, globe + headline, pin without the sports page, icosahedron, scramble). Proof stills for `globe-agency` and `pin-sports` show the hat, not the page. A hat on a page that rounds 5–6 already approved is not a new signature. |
| Orbit / tilt destocked | **Count, not material.** `OrbitRing` remains on `hero / globe-orbit`. `TiltGlare` remains on glare button and glare card. The stock wrapper moved to `ShaderMesh` (void, clinic, featured price, accordion row, modal veil, contact map, news magazine, CTA wash, loader fog, flip, bento…), then `ParticleField`, `GooPuddle`, `ScrambleText`, `Odometer`, `PathDraw`, `MagneticWell`. Destocking one trick and spraying the next is not destocking. `docs/audit/wow/INDEX.md` still says “Orbit/tilt reuse remains” and “There is no dedicated loader family,” then claims the opposite. The audit file does not believe the commit. |
| Pin-scroll is a four-chapter story | **Four captions on a scaled card.** See pin-scroll below. |
| Loader family exists | **Twelve remounts in a dark well.** See loader below. Existence is not distinction. |

## Pin-scroll

Still a scaled card. Not an Apple-level scroll story.

`HeroPin` is 420vh of `ScrollPin`. Progress scales a `h-44` / `md:h-56` plate from 0.42 → 1, eases radius and inset, and swaps four headlines via `Math.floor(p * 4)`. Chapter 0 is a laptop still at 40% opacity plus the same laptop cropped into the plate. Chapter 1 paints a text spec list (612 g, nano-etched glass, Harbor chip). Chapter 2 overlays a looping reel on that same small plate and names three finishes. Chapter 3 is the lockup. Progress ticks. Pause sits on a “scroll story.” Copy is meta: “A plate, not a banner.” “The product starts as a card on the desk.” “The hero is the transition.”

Apple product pages move a filmed or 3D object through space, lock callouts to the object, and change material on the object. This commit scales a stock laptop photo and changes the caption. The gallery still cages it in `max-h-[36rem] overflow-y-auto`, so the 420vh “story” is a nested scrollbar. Phone still is chapter 01 only. `INDEX.md` already admits it is “still not a filmed Apple product film.” I agree. I will not let the four ticks upgrade the grade.

`kit / pin-sports` is the same trick on a skater still: three chapter strings over one photo. `KitWow`’s pin is worse — a `WowStage` and a count.

## Loader

Not distinctive. A family of remounts.

`LoaderWow` is one night well. Variants drop in `ShaderMesh`, `ParticleField`, `GooPuddle`, `RadarSweep` (the “allowed” orbit), `InfinityPath`, `Odometer`, `ScrambleText`, `SplitFlap`, `AnalogClock`, `BarcodeScan`, `PrismSplit`, or a gold ring that scales. `LoaderCore` is a pulse circle that never ships, because the default id is already a wow variant.

Stills: `pulse-halo` is a ring and “Loading Harbor.” `path-infinity` is a lavender sine, not an infinity. `flap-wait` is four tiles that say WAIT. `prism-bar` is the word Loading. That is Magic UI’s leftovers drawer, not a loader system you would screenshot next to a 21st.dev or Aceternity waiting state. Twelve chips do not make a family memorable.

## Families that pass the standout test

None.

I looked for a pass. `kit / shader-clinic` is the only gold cell that is a page. The page is the leftover clinic from rounds 5–6. The signature is a mesh mast — the same `ShaderMesh` as `hero / shader-void` and `cta / liquid-wash`. `hero / shader-void` is a pretty iris blob with serif type. It is the middle of every 2024 shader-hero list, not the top. `button / liquid` is two goo blobs. `typewriter / matrix-rain` is a CodePen. `typewriter / flap-3d` is four mid-cycle tiles. `footer / giant-marquee` is NEXARA NEXARA. Competent catalog chrome. Not a stamp.

## Families that do not (47)

Gold cell that is dressed orbit/tilt, a shared-helper hat, or empty chrome fails the family.

| Family | Why it fails |
| --- | --- |
| `hero` | Pin-scroll is a scaled laptop card. Globe-orbit still wears `OrbitRing` on the Aceternity globe. Shader-void is the house mesh. Scramble-mast is split type on black. Morph-stage source is cinema → reel; the shipped still is still an N on a dark plate. |
| `button` | Liquid is commodity goo. Ink-path is an underline you cannot see in the still. Glare is `TiltGlare`. Burst is `ParticleField`. Scramble is scramble. |
| `magnetic-button` | Magnetic well, blur trail, ink-wake dots, shatter letters. |
| `aurora-background` | Same mesh / particles / globe / glass card as the hero hats. |
| `grid-background` | Canvas floors (perspective, circuit, topo, hex). Construction fields, not scenes. |
| `kit` | Clinic page + mesh hat. Globe-agency proof is the globe, not the agency. Pin-sports is a captioned still. Liquid-portal is the lazy icosahedron. Scramble-academy is scramble. `KitWow` still demotes. |
| `loader` | See above. |
| `app-shell` | `radar-jump` is three lines and a CSS radar (H / A / K). Shader-desk is “Rooms / Library.” Liquid-rail is N / W / A. Morph-sidebar is a width toggle. |
| `kanban-board` | `wip-pendulum` is a hanging “2 / 3” card. Peel cards are three tickets. Particle-lane is particles plus a sentence. |
| `spotlight-card` | `glare-tilt` kept. `lens-spec` is type (“Travertine · $220”) under a fake loupe that does not magnify. Shader-well is the mesh. Scramble-stat is an odometer. |
| `pricing` | Three plan cards. Prism on $48 is invisible in the still. Featured is the mesh on the middle card. |
| `testimonials` | Polaroid is a stack (the still does not even fan). Scramble quote. Video + caption. Three quote cards. |
| `floating-navbar` | Pill + toy compass. Mesh + glass pill. Collapsing dock labels. Magnetic pill. |
| `stats` | Odometer row. Dial is a generic SVG gauge (needle vs arc do not agree). Particles + ticker. Four tickers. |
| `footer` | Giant wordmark tape. Grain night. Barcode bars. Drawn sitemap. |
| `cta-band` | Same mesh as shader-void. Scramble closer. Particles. Beam sweep. |
| `modal` | Mesh veil. Goo sheet. Shared N. Particle confirm. |
| `tabs` | Zipper is two panels sliding 18%. Layout-morph ink. Goo. Scramble labels. |
| `accordion` | Mesh behind “Do I install a package?” Path plus. Scramble FAQ. |
| `flip-card` | Shader / goo / conic / path on a tap-to-turn plate. |
| `bento-grid` | One mesh tile, one gold triangle “peel,” one ticker. |
| `draggable-card` | Drag plate, magnetic stack, RGB type, particle toss. |
| `marquee` | Cylinder, two dashed “reels,” velocity tape, grain tape. |
| `input` | Goo blob, caret, path underline, four OTP boxes. |
| `gradient-text` / `typewriter` / `text-reveal` | Morph, scramble, mask, path, matrix, flap. Aceternity / Magic UI already shipped the menu. |
| `tooltip` / `toast` / `avatar` / `badge` | Fake lens, particle hint, scramble, magnetic tag; check path; radar-on-a-face; Morse blink. |
| `countdown` / `leaderboard` / `case-study` | Clock + “orbit” name. Heat bars. Horizontal film of three titled cards. |
| `services` / `process` / `team` / `contact` | Stamp bounce, fold doors, swinging metronome line, constellation dots, mesh “Harbor Bay,” magnetic city cards. |
| `chapters` / `news` / `logo-cloud` | Sticky stills or chapter text. Tape / flap headlines. `orbit-3d` is `GlobeField`. |
| `kpi` / `data-table` / `chart-block` / `activity` | Ring 78%, heat grid, six bars, two chat bubbles, a path. |
| `command-palette` | Filter list. Prism row is RGB on “Open Harbor.” |
| `settings-panel` | Toggle + a sentence. Path + a sentence. Fold name card. |

## What I will sign

- `OrbitRing` is no longer the default gold wrapper. That was the round-7 reuse complaint. The count dropped.
- `<Kit variant="shader-clinic" />` still composes the healthcare page under a mast. The wrap in `kit.tsx` is real.
- `loader` is a registered family with `role="status"`.
- `HeroPin` has four chapter strings, ticks, and 420vh. The *attempt* is larger than the dead pin from round 7.
- Gallery captions moved some leftover `--nx-faint` to `--nx-muted`. Contrast leftover, not this bar.

## What I will not pretend

- That destock earned a 21st.dev / Awwwards stamp. The house style is one night card: `#07070c`, gold mono eyebrow, serif lockup, iris mesh. Forty-seven variations of that card is a system, not a gallery of standout objects.
- That unique helpers are unique *work*. `LensHover` does not zoom. `PrismSplit` is RGB offset. `PeelCorner` is a gold triangle. `RadarSweep` is conic CSS. `CompassNeedle` is a line. `ZipperSplit` slides 18%. `MorseBlink` is a dot. `TapeReels` are two dashed circles. `PendulumCard` is a card on a string. `InfinityPath` is a stroke. I will not caption those as signatures.
- That pin-scroll is a product film. It is a scaled laptop and four captions.
- That the loader family is a point of view. It is twelve existing helpers with a new slug.
- That app-kit “product copy” is a desk. “Find a room.” / “Open Harbor” / “2 / 3” / “Anitha Rao · Harbor desk” is labeled empty chrome.
- That `KitWow` is gone. It is the `WowSignature` kit path.
- That `hero / morph-stage.png` is current. Source is cinema / reel. The still is an N.
- That `INDEX.md` is a clean gap list. It still denies the loader family and then announces it.

## Remaining cheapness (honest leftovers)

- Shared mesh is the new orbit. If the next pass destocks `ShaderMesh` the way this one destocked `OrbitRing`, do not replace it with another house material on every chip.
- Gallery pin cells remain a 36rem nested scroller. A 420vh story that cannot be scrolled as a page is still dead in the place people will judge it.
- Dual kit implementations. Delete `KitWow` or make it the page. Do not keep both.
- Named leftover stills: `pricing-tilt-glare.png` is still indexed after tilt left pricing. Morph-stage still is stale. Globe-agency and pin-sports stills do not show the wrapped pages.
- Docs still sell the gold chip as an Awwwards peer. Stop, or earn it.
- No physical-device pass. Playwright on `127.0.0.1:5173`.

## Client tomorrow

No. Not for the gold chips. I would still walk the leftover clinic / sports / cinema pages from rounds 5–6. I would not walk pin-scroll, the loader row, radar-jump, pendulum kanban, lens-spec, or compass-nav as “signature.”

## Approval bar leftover

Every family still needs one gold cell that would be bookmarked on 21st.dev or Aceternity *as itself*, not as “Nexara’s night card plus helper X.” Pin-scroll needs the object to be the story, not the caption. Loader needs a waiting construction that is not a remount. App-kit needs a desk, not a radar and a hanging card. `LensHover` must magnify or lose the name.

**Consensus slot:** Visual / motion / a11y have not signed `a4c5592`. I reject all 47 families on the standout test. Destock is a count change. It is not a stamp. Do not merge.
