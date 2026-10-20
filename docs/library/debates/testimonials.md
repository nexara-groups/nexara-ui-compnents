# Testimonials — role debate

Six agents argued before implementation. They did not agree on names. They agreed on the kills. Family: **testimonials** (also called **voices**).

## Roles

- Trend researcher
- Product / UX strategist
- Visual designer
- Motion designer
- Front-end (API / perf / a11y)
- Sceptical creative director

## Fights

**Jobs vs objects.** UX named jobs (`featured`, `wall`, `cycle`, `reel`, `reviews`…). Visual said those thumbnail as the same starred card with an avatar chip and demanded objects (pull slab, evidence plate, deck, ledger, pinboard, filmstrip, held plate, instrument wall). Researcher waved 122 21st cards and said density *is* the trend. CD sided with Visual on mechanism names, with UX on first-frame literacy: a sentence you can read before anything moves.

**Marquee as the family.** Researcher: Magic UI’s Jack/@jack dual-row *and* Aceternity Infinite Moving Cards *are* the 2025–26 thumbnail; Efferd’s three-column scroller shipped Jul 2026. CD: if the default is an infinite logo+quote farm, the family does not exist. FE: duplicated nodes, no keyboard pause, WCAG 2.2 2.2.2, `prefers-reduced-motion` ignored. Motion: a loop is not a motion *idea*; it is a screensaver. Converged: marquees live in **Marquee**. Testimonials never CSS-loop as the point. `film` is visitor-driven (peek, drag, snap). Reduced = a static strip.

**Stars and costumes.** Researcher: ★★★★★ is on almost every 21st card; UX said ratings are a real review-product job. CD: five gold stars are a costume, same species as Tweet-card chrome, glass swipers, and circular face orbits. Converged: no star strip in the component. A score is an optional slot on a voice; empty omits it; never default `5`. Platform skins are out. Quote marks live in CSS, not in the copy.

**Default people.** FE: the current `TestimonialWall` ships `Meera Iyer` / Harbor Press if you omit `voices`. Researcher noted Magic UI ships Jack and Aceternity ships Dickens. CD: Helio is a docs tenant. UX: a paste with no customers must not invent customers. Converged: **no default names, quotes, roles, studios, handles, or avatars in the API.** Empty `items` renders an empty section (or a named empty slot). Demo copy lives in docs. Theme through CSS variables (`--nx-*`), never palettes or hex.

**One file vs eleven files.** FE: one `testimonials.tsx` plus lazy siblings so a `pull` paste does not import physics, Web Audio, or 3D. Visual: eleven DOMs, not `className` swaps of the same card. Converged: one public `Testimonials` (alias `Voices`) with eleven *layouts*, not eleven paints of SpotlightCard. `data-nexara="testimonials"` + `data-variant="{id}"`. Physics / wall-light / audio are siblings.

**How timid is Advanced.** UX: advanced still pastes on a Monday; no 320vh quote opera. Visual: do not draw Magic UI’s `perspective: 300px` carnival or a sphere of faces. Motion: `wall` is shared light, ≤ `rotateX 8° / rotateY 6°`; `reel` has mass and pauses offscreen; `voice` is a playhead, not autoplay. Researcher wanted Voice Testimonial and 3D Marquee both in the set. CD: if the default is a spinning quote tunnel, the variant does not exist. Converged: `wall` reduced = `pin`; `reel` reduced = `stack`; `voice` requires a transcript still and never autoplays. No WebGL sphere. Audio/video are slots on other variants — omit chrome when missing — and a layout only when the recording *is* the object.

**Basic.** UX demanded four shippable pastes. CD refused jumbotron 3-up cards. Researcher refused gradient glass and gold stars. Visual refused “it’s a card grid but quieter.” Converged: `pull`, `plate`, `stack`, `ledger` — scenes, not review widgets.

**What died.** SpotlightCard `testimonial`. Helio `defaultVoices`. Infinite moving cards as a testimonials variant. Dual-row Jack marquee (and its vertical / 3D twins). Glass swiper. Circular orbits. Typewriter quotes. Tweet-card skins. Five gold stars as chrome. Autoplay as default. Logo+quote welded band. `align`. Industry costumes. A 12th “wall of love marquee” (cap is 11). Masonry-as-bento stays in **Bento**’s kill list; **this** family owns the pinboard.

## Converged ship list (11)

| id | tier | Mechanism | Motion idea |
| --- | --- | --- | --- |
| `pull` | basic | Type is the voice. Hanging mark, rule, attribution. One quote. | Nothing required. |
| `plate` | basic | Photograph gets the plate. Quote is the caption column. | None. |
| `stack` | basic | A deck. Top card speaks; the pile is the control. | Seat on change. Zero springs on load. |
| `ledger` | basic | Voices as numbered entries in a document. No card chrome. | Zero. |
| `cast` | intermediate | Portrait well. Index is the control; quote crossfades. | Snap on select. No autoplay default. |
| `pin` | intermediate | Pinboard. CSS columns, mixed weights, optional mask-to-more. | None required. |
| `film` | intermediate | Sprocket strip. Next frame peeks. Visitor drags. | Snap. No CSS infinite. |
| `held` | intermediate | A field of cards; one opens into a held-quote plate. | FLIP open/close. |
| `wall` | advanced | Shallow 3D masonry. One shared key light. | Pointer leans the room. Reduced = `pin`. |
| `reel` | advanced | Physics reel. Cards have mass; a flick restacks. | Springs. Pause offscreen. Reduced = `stack`. |
| `voice` | advanced | The recording is the object. Waveform + transcript. | Playhead. No autoplay. Reduced = transcript. |

## Sign-off bar

Each id is a different mechanism. Tokens + media + copy restyle it to a hospital or an HVAC brand. First frame holds a sentence. Advanced never ships a quote sphere or a looping marquee. Basic never ships five gold stars or Jack/@jack. Empty is empty. Helio is a docs tenant, not the API. Marquee is another family.
