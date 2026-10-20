# Heliograph — art direction

Helio is a fictional night desk for product studios. The flagship pieces share one art direction so the landing page and dashboard read as a single product, not a component zoo.

The name is a signalling instrument: a mirror that throws a concentrated beam. The brand idea is **a warm signal in a dark room**, not another purple-gradient SaaS kit.

## Palette

| Token | Hex | Role |
| --- | --- | --- |
| `void` | `#07060b` | Page ground. Slightly brown-black, never pure `#000` or cool navy. |
| `carbon` | `#100e16` | Raised panels, sidebar, cards. |
| `panel` | `#1a1722` | Nested wells, inputs, table chrome. |
| `ivory` | `#f3ead8` | Primary type and hairlines. Warm paper, not `#fff`. |
| `ember` | `#ff4d1c` | The signal. One accent per view. CTAs, live dots, selected plan. |
| `brass` | `#d9a85a` | Metal, price figures, seals, 3D crystal. Luxury, not gold-gradient kitsch. |
| `ion` | `#3ee0c6` | Instrument readouts, charts, success. Cool counterweight to ember. |
| `fog` | `#c6bba8` | Secondary copy. Warm paper-dust, ≥4.5:1 on void. Never `#a1a1aa`. |

Rules:

- Ember is rationed. If two ember objects compete, one becomes ivory.
- No violet, no electric indigo, no cyan-magenta mesh. That is the generic look this pass is leaving behind.
- Light sections (rare) use ivory ground and void type. The dashboard stays night.

## Lighting

Treat every surface as if a single tungsten key sits upper-left and a thin ion rim sits opposite.

- Key: warm, ~40° elevation. Soft contact shadow under cards (`0 28px 60px -36px rgba(0,0,0,0.85)`).
- Rim: 1px ivory hairline at 12% on the top edge of raised plates.
- Bounce: 4% ivory wash in the lower third of large wells.
- Bloom: ember/brass only, never on body type.
- Grain: 4–6% monochrome film grain over full-bleed scenes. It kills banding and cheap digital gradients.

WebGL lights follow the same plot: one warm directional, one cool rim, dim ivory hemisphere. No HDRI mall-reflections.

## Type pairing

| Role | Face | Optical size / weight |
| --- | --- | --- |
| Display | **Fraunces** | opsz 144, weight 520–600, tracking `-0.04em` |
| UI / body | **Instrument Sans** | 400–600, tracking `-0.01em` |
| Instrument | **IBM Plex Mono** | 400–500, tracking `0.04em` on labels |

Scale (desktop):

`11 / 13 / 15 / 17 / 22 / 40 / 72 / 120 / 168`

Display lines are allowed to break awkwardly. Widows are better than shrinking type to fit. On 375px the 168 step becomes ~56–64, never a timid 32.

Eyebrows are mono, 11px, tracked `0.22em`, ivory at 55% or brass.

## Spacing rhythm

Eight-pixel base. Section padding `120 / 160 / 200`. Component gutters `16 / 24 / 40`. Do not stack equal vertical gaps — alternate a tight cluster with a long rest, the way Stripe alternates dense and empty bands.

Asymmetry is default. A 12-column page may leave columns 1–2 empty. Centered stacks are reserved for the kinetic interlude and the pricing closer.

## Depth

Three layers only:

1. Ground (void + grain)
2. Plate (carbon, 1px hairline, 24–40 radius)
3. Signal (ember/brass object, bloom)

Cards do not float in infinite glass. If a tile needs lift, give it a contact shadow and a brighter top hairline, not a second blur.

Perspective on the testimonial wall is shallow (`rotateX 8° / rotateY 6°`). Deep CSS 3D is a carnival trick.

The WebGL canvas is a plate, not a portal. `overflow: hidden` on the host. The canvas is `width/height 100%` of that host and never `position: fixed` to the viewport unless the host itself is the viewport section.

## Texture

- Film grain overlay (SVG turbulence, `mix-blend-mode: overlay`)
- Hairline engravings (0.5–1px ivory at 8–14%)
- Brass as a flat-to-satin fill, not a rainbow metallic
- Mono rules and tick marks on instrument UI
- No skeuomorphic leather, no neumorphism, no comic shadows

## Motion principles

Motion is a character. Each flagship piece owns **one** unexpected idea and refuses a second.

| Piece | The idea |
| --- | --- |
| Cinematic hero | An iris opens. Scroll is the camera assistant. |
| Orbital hero | A brass instrument aims its beam at the cursor. |
| Kinetic hero | Letters are physical and can be locked. |
| Navbar | The bar and the mega-panel are one morphing plate. |
| Scroll story | The instrument on the right is the same object changing mode. |
| Live bento | Instruments sit on a desk. The lamp lights the room. |
| Pricing | The highlight ring is a spring that walks between plans. |
| Testimonials | A shallow wall of cards with a shared light. |
| Dashboard | The iris locks a signal. Paper holds the ledger. |

### Curves

```
spring.ui     { stiffness: 380, damping: 32, mass: 0.78 }
spring.heavy  { stiffness: 170, damping: 26, mass: 1.05 }
spring.snap   { stiffness: 520, damping: 38, mass: 0.6 }
ease.enter    cubic-bezier(0.16, 1, 0.3, 1)     // 700–1100ms cinematic
ease.exit     cubic-bezier(0.7, 0, 0.84, 0)     // 280–400ms
ease.hold     cubic-bezier(0.22, 1, 0.36, 1)
```

Stagger 40–70ms. Never more than 9 items in a stagger.

Load sequence (landing): grain → wordmark → iris closed → first line → iris opens on first scroll. The page is usable at frame 0; the sequence is garnish.

### Reduced motion

If `prefers-reduced-motion: reduce`:

- No scroll-linked transforms. Show the end state.
- No WebGL loop. Show a still of the instrument.
- No marquees. Static row.
- Focus rings and state changes remain.

### Performance

- 60fps on a 1280 laptop. Compositor-only transforms and opacity on the hot path.
- WebGL `dpr` clamped to `[1, 1.5]`. Pause the loop when the section leaves the viewport.
- Lenis is opt-in on the landing page only.
- Images are generated stills, not video, unless a proof clip.

## Interaction voice

- Pointer: magnetic pull ≤ 10px on primary CTAs. The object leans, it does not chase.
- Keyboard: every control that looks clickable is a button or a link. Mega-menu, mobile drawer, and command palette trap focus. Escape closes.
- States: idle, hover, active, selected, loading, empty, error. If a tile cannot show three of these, it is a poster.

## What we will not do

- Purple mesh gradients, spotlight cards as the whole aesthetic, or glassmorphism for its own sake.
- Twelve variants of the same hero.
- Stock photography of smiling teams.
- Copying layout, type, or motion from the owner’s agency sites. Those are a quality floor, not a source file.
- Letting a canvas escape its section.
- Shipping a static screenshot where a live control was promised.

## Product voice

Helio speaks like a night-shift instrument tech: short, specific, a little dry.

Examples:

- “Open the iris. The desk keeps the signal.”
- “Four seats. One beam.”
- “Archive is not a grave. It is a dimmer.”

No “unleash”, “supercharge”, “next-gen”, or “AI-powered everything”.
