# Navbar — research moodboard (2025–2026)

Inspiration only. No layout, type, or motion is copied. This is a **navigation** family (header / nav), not a restyle of `src/components/ui/floating-navbar.tsx`. Local stills from the earlier flagship pass live in `docs/flagship/references/`. Prior structural audit: `docs/research/floating-navbar.md`.

## Sources opened this pass

| Source | What was actually looked at |
| --- | --- |
| 21st.dev `/community/components/s/navbar` | 128 cards. Recurring: Tubelight, Truncating, Resizable, Morphing Island, Morphing Scroll, Adaptive Notch, LumaBar, Stacking, Floating Nav, NotchNav, Variable Font Hover, 3D Adaptive, Hover Gradient, Emoji Nav, Glow menu. Catalogue mixes in heroes. |
| 21st.dev `/community/components/s/header` | 38 cards. Header with Search (Efferd), Scroll Direction: Hide Header, Dither Sweep Navbar, Classic Header with Sheet, Distorted Glass, Hide On Scroll, Tab Navbar. |
| 21st.dev `/community/components/s/navigation` | 200 listed. First 60 is mostly breadcrumbs, pagination, footers, a few sidebars. The tag is noisy. |
| 21st.dev blog 2026-08-19 | Five shapes. Most-saved: Tubelight (Ayushmaan Singh) — lit indicator in a pill. Conventional bar is what most people ship (Header 3 / 2 by Efferd). Decorated glow/gradient. Menus that are not bars (FAB / fluid / circle). Full-screen overlay: Sterling Gate Kinetic Navigation. Warns: drawer is a dialog; `aria-current`; IntersectionObserver not a scroll handler; hover-only dropdowns; `scroll-margin-top`. |
| 21st.dev blog 2026-08-20 headers | One announcement occupant. Sticky stack eats 375. Banner scrolls away; header sticks. `100dvh`. |
| 21st.dev blog 2026-08-20 mobile | Bottom 3–5 with labels. Dock is a desktop flourish; magnification needs hover. `env(safe-area-inset-bottom)`. |
| 21st.dev blog 2026-08-21 floating | Pill vs dock vs FAB. Three problems: blur bill, anchors under the bar, room for four destinations. Hide-on-scroll threshold ≥100px or trackpad flicker. |
| Named 21st cards | Morphing Scroll Navbar (full-width → blurred capsule + reading progress). Morphing Island (`layoutId` dropdowns, glass). Adaptive Notch (triple-island → drawer). Dither Sweep (pixel dissolve, retracting wordmark). Command palettes (full-screen overlay / ⌘K popover). |
| Aceternity `/navbar` | Seven: Dark Shadow mega, Classic, Mega, Pill, Underline, With Children, Simple Hover (`layoutId`). Copy: being interesting is usually a mistake. Mega pays past ~15 destinations. |
| Aceternity Floating / Resizable / Navbar Menu / Sidebar | Hide down, reveal up. Width change on scroll. Hover “bignav”. Collapsible 60↔200 / grouped 70↔300. |
| Magic UI | No Floating Navbar. `Dock` is the nav object (iconSize / magnification / distance / direction). Blog 2025-10-18 and 2025-11-02: wrap Dock as a bottom bar, or put `AnimatedShinyText` on a conventional header. Effects, not headers. |
| Awwwards 2025–26 | PrimeAsia Leather (21 May 2025) fullscreen split menu. Ottografie 2025 dynamic navigation. Eddie (5 Oct 2025) adaptive header + menu. Off Menu (23 Apr 2026) popup menu. FPP WebGL unusual nav. Lacoste Ace Breaker unusual nav. Stack: GSAP, Next, type as the menu. |
| Godly / Recent | `godly.website` redirects to recent.design (discipline, not section). `godly.design/sections` still lists navbars among hero / CTA / footer. Recent itself is a left filter rail. CSS Anchor Filter Dot (Petr Knoll) — CSS-anchor sliding indicator. |
| Lapa | `/elements/menu/` — 12 live menu sections. |
| Pinterest 2025–26 | Ideas board “Website header menu design”: mega menus, cream chrome, floating bottom bars. Product chrome: warm cream, one saturated CTA, search as a pill. 2026 desktop case study: side navigation for goal-oriented sessions. |
| Dribbble / Behance | `navbar` / `mega-menu` / `floating-navbar`: Floating Navbar Light & Dark, dual-tier sidebar, Fireflies mega, Untitled UI Nav (Apr-era), overlay fullscreen. Behance: New Header (30 Apr 2026); V2 Menu Architecture context-aware menu (1 Feb 2026). Shot pages themselves JS-blocked; titles and case studies were read. |
| Existing local captures | `docs/flagship/references/{21st,21st-trending,aceternity,magicui,awwwards,godly,apple,linear,anthropic,cursor,framer}.png`. |

## Named trends

1. **Floating pill as product chrome** — detached, four destinations, lighter than a bar. 21st 2026-08-21; Aceternity Floating Navbar.
2. **Scroll-morph island** — one surface changes width / job (bar → capsule → field). Morphing Scroll Navbar; Morphing Island; Framer Dynamic Island Nav; 4-state island write-ups in 2026.
3. **Hide-on-scroll with a real threshold** — down hides, up reveals, ≥100px. Aceternity floating; Eddie adaptive header (Oct 2025). Sub-10px is flicker.
4. **Lit / anchored indicator** — Tubelight most-saved Aug 2026. CSS-anchor filter dot on Recent is the native 2026 version. Decoration unless the bead *is* the object.
5. **Mega as a map, not a list** — columns, microcopy, one featured card. Aceternity Mega; Wensity Navigation Menu; Design Shack 2025. Click, not hover-only.
6. **Command as the header** — the field *is* the nav. 21st command palettes; Morphing Command Nav (Sep 2026).
7. **Dock magnification** — Magic UI Dock. Pointer mass, not a link row. 21st: questionable on touch.
8. **Fullscreen type overlay** — destinations as architecture. PrimeAsia split menu; Off Menu popup; Sterling Gate Kinetic.
9. **Editorial print-fold chrome** — dither cells, retracting wordmark, hairline rules. Dither Sweep Navbar; Anthropic quiet header; Pinterest cream counter.
10. **Side rail for intent** — Pinterest 2026 desktop; Aceternity collapsible sidebar; Recent left filters.
11. **Sticky-stack tax** — banner + sticky + bottom bar eats 375. 21st 2026-08-20: one sticky occupant.

## Saturated — do not ship

Centered glass pill with a glow. Tubelight as the whole product. LumaBar / Distorted Glass / Hover Gradient. Adaptive Notch / NotchNav / Dynamic Island hardware clone. 3D Adaptive nav. Emoji Nav. Variable-font hover as the idea. `backdrop-filter` full-bleed on a scrolling page. Hide-on-10px-scroll. Underline vs pill vs split as variants. Bottom vs top as variants. MacOS dock clone (bouncing Finder icons). Icon-only bar. Hover-only mega. Industry costumes (`Login`, Features / Pricing / Blog, `$48/mo`). Dark navy + violet mesh. Helio / Nexara wordmarks. Hex in the source.

## Library-useful (finite props, reduced-motion end state)

Flush rail. Detached capsule (four destinations; compact optional). Vertical column. Crumb path. Multi-column map (click). Command field in the same plate. Dock with captions, magnification opt-in. Mast + index disclosure. Curtain overlay that is a real dialog. Shared-surface island, control-first, scroll opt-in. Ruled galley cells. Theme via `--nx-*`. `prefers-reduced-motion` shows the usable end state (expanded island, unmagnified dock, open curtain without stagger). 375: a way through at frame 0.
