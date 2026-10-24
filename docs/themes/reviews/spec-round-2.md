# Spec under gate, round 2

The beige themes stay on disk until this spec clears. Critics score this document, not the current components.

## Themes

| Theme | Client | Ground / text | Mark | Type | Motion, and nothing else |
| --- | --- | --- | --- | --- | --- |
| Lagoon | Clinics | `#041816` / `#e8fff8`, daylight foam `#e8fff8` / abyss `#041816` | Biolume `#3ef0c2` as the Book fill with abyss text. Magenta `#e23d8a` is one bloom clipped behind that button. | Newsreader, IBM Plex Sans | Frame radius 24 to 12. Inner disc scale 1.4 to 1 inside a clip. Blob translate 8px behind the plate. |
| Strike | Sports | `#090909` / `#f4f4f2`, daylight inverted | Crimson `#ff1f3d` is the flap underside and a 2px rule. Button is bone `#f4f4f2` with `#090909` text. | Archivo Black, Archivo | Glyph `rotateX` −90 to 0, 90ms linear, stagger 16ms. Marquee is `translateX`. |
| Orrery | Studios | `#07060b` / `#f7f1e4` | Night rim `#e4b15a` on obsidian is 10.32:1. Day rim `#6e4a16` on ivory is 7.03:1. Never the night gold on ivory. Button is ivory with obsidian text. | Instrument Serif on the name, IBM Plex Sans | Shell `rotateX` 8deg, label counter-rotated. Modal scale 1.06 to 1 plus `rotateX`. Three WebGL ring strokes, no particles. |
| Rally | Academies | `#1a1240` / `#fff6ee`, daylight `#fff1e0` / ink | Coral `#ff5a36` is the only fill, ink text on it (5.62:1). Butter `#ffd23f` is the press face, large type only. | Outfit, IBM Plex Sans | Shell `scaleX` 1.12 / `scaleY` 0.88. Label counter-scaled. Release `cubic-bezier(0.34, 1.7, 0.64, 1)`. Twelve squares once on success. |
| Array | Engineering | `#0e1214` / `#e7f6f8`, daylight inverted | Night grid `#9ee7ff` on graphite is 13.74:1. Day grid `#0e6e7a` on `#e7f6f8` is 5.36:1. Night tick `#ffb020` on graphite is 10.30:1. Day tick `#8a4e00` on the day ground is 5.97:1. The tick is never drawn on the grid stroke. | IBM Plex Sans, IBM Plex Mono | Rule `scaleX` 0 to 1 in 140ms. The button does not scale. Glyphs step opacity every 24ms on one timer. |

First frame actions: Book, Register, Start trial, Join, Call. Opaque plates. Labels do not move. Targets are at least 44px. Intensity off and reduced motion show the end state. Subtle runs one property. Rich runs the set.

## Button, toast, modal

| | Button | Toast | Modal |
| --- | --- | --- | --- |
| Lagoon | Clip and inner disc | `translateX` 28 to 0, opacity | Corner ornament scales 1.8 to 1. The dialog does not scale. |
| Strike | Flap glyphs | Clip, `translateY` 100% to 0, 180ms | Same shutter |
| Orrery | `rotateX` 8deg | `rotateX` 14 to 0, opacity | Scale 1.06 to 1, `rotateX` 8 to 0, opacity, 280ms |
| Rally | Squash the shell | `scaleX` 0.7 `scaleY` 1.25 to 1, then twelve squares | Shell squash, title counter-scaled |
| Array | `scaleX` rule | 1px bar `translateY`, body opacity | Rules `scaleX`, then glyph steps |

Every toast has a 44px Pause control that freezes the shell and a 44px Dismiss. The message is text and does not travel.

## Not shipped

Spotlight, beams, magnetic hit targets, generic count-up, shimmer skeletons, a shared spinner, `backdrop-filter`, goo blur, animated `box-shadow`.

## Editor

Pickers for background, surface, text, accent, accent text, and the marks success, warn, and danger. Refusal keeps the previous value. Pairs:

- text vs background and text vs surface, at least 4.5:1
- accent text vs accent, at least 4.5:1
- accent vs background and accent vs surface, at least 3:1
- mark, success, warn, and danger vs background, vs surface, and vs text, at least 3:1 Radius is clamped: Lagoon 16–28, Strike 0–2, Orrery 2–8, Rally 14–22, Array 0–2. The font control only switches among the five locked pairs. Intensity is off, subtle, or rich. Presets store theme, scheme, intensity, and the guarded colors.

## Library owners

Blob and liquid wipe: Lagoon. Clip reveal, marquee, split-flap: Strike. Parallax rings and the sticky scene: Orrery. Stagger squash: Rally. Scramble, scan, step digits, scroll-progress rule: Array.
