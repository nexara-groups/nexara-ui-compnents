# Testimonials — research moodboard (2025–2026)

Inspiration only. No layout, type, or motion is copied. Family name: **testimonials** (also called **voices**). This is a **section** family, not the `SpotlightCard` `testimonial` skin and not Marquee’s `quotes` track. Local stills from the earlier flagship pass live in `docs/flagship/references/`.

## Sources opened this pass

| Source | What was actually looked at |
| --- | --- |
| 21st.dev `/community/components/s/testimonials` | 122 listed (page still says “42”). Recurring: Testimonials Marquee (ShadcnSpace), Infinite Moving Cards (nexus-ui / Manu Arora), Infinite Testimonials Scroller (Efferd, three vertical columns, Jul 2026), Community Testimonial (Dhileep, Oct 2025, looping horizontals), Animated Cards Stack (YoucefBnm, scroll-reveal pile), Glass Testimonial swiper (Jahed, drag + frost — saturated), Circular Testimonials (Maxim Bortnikov), Voice Testimonial (Ayushmaan Singh), Editorial / Split / Minimal (Jatin Yadav), Image Testimonial Grid, Single Voice Spotlight, Scroll Reel Testimonials (SMAmmar), Profile Card Testimonial Carousel (Arunachalam), Twitter Testimonial Cards, Typewriter Testimonial, 3D Testimonails (Sean Hello), Testimonial Basic (video thumbs + stars, ui layout). |
| Aceternity | `Infinite Moving Cards` (Dickens/Shakespeare loop, `items[{quote,name,title}]`, speed/direction/pauseOnHover). `Animated Testimonials` (stacked portrait well, quote crossfade, `autoplay` default false / 5s). `Testimonials Marquee Grid` (two rows, react-fast-marquee 50 vs 70, mask-image edges). `3D Marquee` (four image columns, sold for testimonials *and* heroes — carnival cousin). |
| Magic UI | `Marquee` demo *is* testimonials: Jack / @jack / “I’ve never seen anything like this before”, two rows, reverse, pauseOnHover, edge fades, `avatar.vercel.sh`. Vertical demo: two opposite columns. 3D demo: four vertical tracks at `perspective: 300px` + `rotateX(20deg) rotateY(-10deg) rotateZ(20deg)`. `Tweet Card` as a live X embed (homepage testimonials still argue a “View Tweet” button, Jun 2025). |
| Awwwards SOTD 2025–26 | Champions For Good: Testimonial Section from *video*, plus a scrolled twin. Shed (Isaac Powell / Thomas Aufresne): Shed Testimonials as an Interaction, GSAP + Nuxt, not a card grid. Inversa (Exo Ape): Client Testimonials as a named element. Byooooob (31 Jan 2025): animated testimonials, retro, custom cursor. Locomotive *Books of Design*: typographic quote layout — mark + setting, no stars. |
| Pinterest / 2025–26 trend writing | “Wall of love” masonry (mixed heights, one oversized pull, fade-to-more); cream editorial quote on paper; polaroid / taped-note stacks; dark SaaS 3-up with gold stars (saturated). Same cream-serif counter as Anthropic boards. |
| Dribbble / Behance | Dribbble `/tags/testimonials` ~2,580 shots. Recurring: 3-up avatar cards + ★★★★★ (kill), stacked decks, masonry walls, huge italic pull quotes (`/tags/pull-quote`, `/tags/pullquote` — Fanshark, Shane Doyle dark editorial, Daily UI #039). Behance: magazine case-study quotes, paper grain, hanging marks, letterbox portraits — print, not widgets. |
| Product counters (not kits) | Linear `/switch` and `/customers`: dark editorial quotes, no cards, “Building with Linear since…”, a story link. Stripe customers: one voice as a narrative, logos as a *rule*, not a marquee glued to quotes. Cosmos.so masonry-with-depth (local `cosmos.png`) — the wall is the product. |
| Existing local captures | `docs/flagship/references/{21st,21st-trending,aceternity,magicui,awwwards,godly,linear,stripe,anthropic,cosmos}.png`. Flagship wall: `docs/flagship/proof/section-voices.png`. Current `TestimonialWall` (filters, held quote, shallow `rotateX 8° / rotateY 6°`, **Helio `defaultVoices`**). |

## Named trends

1. **Editorial pull, not a card** — hero-scale italic, hanging mark, hairline rule, mono attribution. Books of Design; Swiper Quotes Bold (Fraunces + claret mark, no stars); Linear switch quotes; Dribbble pull-quote tag.
2. **Portrait as evidence plate** — a photograph occupies a room, not a 32px chip. 21st Split / Image Grid / Testimonial Basic video thumbs; Framer Scene Testimonial letterbox.
3. **Deck as the control** — a pile you cycle. Motion UI `testimonials-stack` (Jul 2026, flick restacks); 21st Animated Cards Stack; Framer Testimonial Depth (layered, drag, keyboard). Keep the pile; kill the glass.
4. **Portrait-well switcher** — stacked faces share one quote plate. Aceternity Animated Testimonials. Autoplay is the trap.
5. **Pinboard density** — CSS columns, mixed card *kinds*, mask fade into “more”. Pinterest wall-of-love; shadcn.io testimonials-masonry; CodeFronts wall (Aug 2026); Cosmos; flagship voices.
6. **Filmstrip, visitor-driven** — next frame peeks; drag/snap; no CSS infinite. 21st Scroll Reel; ReTestimonial Filmstrip. Opposite of Magic UI’s loop.
7. **Held quote** — a field of cards, one opens (FLIP / dialog) into a plate you can actually read. DVR Labs Testimonial Wall (May 2026); flagship held-quote aside.
8. **Shallow 3D wall, shared light** — the room leans, cards do not orbit. Flagship `rotateX 8° / rotateY 6°`. Saturated cousin: Magic UI 3D marquee + Aceternity 3D Marquee.
9. **Physics flick** — cards have mass; a throw restacks. Motion UI stack; Framer Testimonial Depth. Reduced-motion = a still deck.
10. **Voice as a recording** — waveform + transcript; play is the control. 21st Voice Testimonial. No autoplay audio.
11. **Cream / dark editorial counter** — paper or near-black, rules instead of cards, one accent. Anthropic; Linear. The anti-kit.

## Saturated — do not ship

Infinite logo+quote marquees (Magic UI Jack/@jack dual-row, vertical, and 3D-perspective farms; Aceternity Infinite Moving Cards + Marquee Grid; 21st Infinite Testimonials Scroller / Community Testimonial loops). Five gold stars as chrome. Tweet/X card skins. Glassmorphism swiper. Circular face orbits. Typewriter quotes. `avatar.vercel.sh` chips. Dickens-as-customer. Helio `Meera Iyer` / Harbor Press as defaults. Dark navy + violet quote glass. Autoplay that cannot be paused from the keyboard. Logo marquee welded onto quotes as one variant. Deep CSS carnival (`rotateZ(20deg)` quote tunnels).

## Library-useful (finite props, reduced-motion end state)

Pull-quote slab. Portrait evidence plate. Static deck. Document ledger. Portrait-well switcher with autoplay *off*. CSS-column pinboard (mask/more, not a loop). Visitor-driven filmstrip. Held-quote open. Shallow 3D wall with a required still. Physics reel paused offscreen. Recording + transcript fallback. Theme through CSS variables. Empty `items` is empty — never invent a person.
