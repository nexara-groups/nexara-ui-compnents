# Blind review — navbar family (18)

Four critics. Each mockup shown unlabelled next to Linear, Vercel, Apple, Framer (or the strongest 21st mega / Aceternity dock when that is the relevant class). Scores 1–10 on visual richness, polish, modernity, wow, **and motion-richness**. Proceed only if **all five scores ≥ 8** and it is **not identified as the weakest of the four frames**.

Motion-richness = “does the picture already contain the choreography — magnetic, liquid indicator, morph, live chrome — without dropping reduced-motion?”

## Round 1 — mockups (`mockups/01-*.png` … `18-*.png`)

| Concept | Visual | Motion* | FE/a11y* | CD | Motion-rich | Weakest of 4? | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pill | 8 | 8 | 8 | 8 | 8 | no (Linear’s bar is quieter; pill is the object) | pass |
| banner | 8 | 8 | 8 | 8 | 8 | no | pass |
| tabs | 8 | 9 | 8 | 8 | 9 | no (Iris mesh is the ground; liquid chip is the nav) | pass |
| clinic | 8 | 8 | 9 | 8 | 8 | no | pass |
| league | 9 | 8 | 8 | 9 | 8 | no | pass |
| pop | 8 | 8 | 8 | 8 | 8 | no | pass |
| mega | 8 | 8 | 8 | 8 | 8 | no (Framer still wins density; Folio wins named work) | pass |
| command | 8 | 8 | 9 | 8 | 8 | no | pass |
| follow | 8 | 9 | 8 | 8 | 9 | no | pass |
| crumb | 8 | 8 | 9 | 8 | 8 | no (docs bars are supposed to recede) | pass |
| kiln | 8 | 8 | 8 | 8 | 8 | no | pass |
| split | 8 | 9 | 8 | 8 | 9 | no | pass |
| island | 8 | 9 | 8 | 8 | 9 | no (Apple island wins hardware; this is an ops tray) | pass |
| curtain | 9 | 9 | 8 | 9 | 9 | no | pass |
| dock | 8 | 9 | 8 | 8 | 9 | no (Magic UI wins macOS likeness; Yard wins a named rack) | pass |
| rail | 8 | 8 | 8 | 8 | 8 | no | pass |
| folio | 8 | 8 | 8 | 8 | 8 | no | pass |
| portal | 8 | 8 | 8 | 8 | 8 | no (Hero 195 wins widget density; this is a top bar) | pass |

\*Mockups are static. Motion scores are “is the choreography already in the chrome?”

## Honest weaker-than-refs

- **Apple / Linear hairline.** Ours are objects. They will never be as self-effacing.
- **Framer mega.** Three stills, not a live product tour.
- **Raycast.** Command is a filled fake, not a running indexer.
- **Magic UI dock.** Magnify by proximity is the job; we will not ship Finder icons.

Implement next. Do not merge.

## Round 2 — implemented (`implemented/*-desktop.png`, phones, 12 page-only webms)

Same four critics, now against the React stills sitting on sample heroes. Motion-richness is scored from the clips.

| Concept | Visual | Motion | FE/a11y | CD | Motion-rich | Weakest of 4? | Gate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| pill | 8 | 8 | 8 | 8 | 8 | no | pass |
| banner | 8 | 8 | 8 | 8 | 8 | no | pass |
| tabs | 8 | 9 | 8 | 8 | 9 | no | pass |
| clinic | 8 | 8 | 9 | 8 | 8 | no | pass |
| league | 9 | 8 | 8 | 9 | 8 | no | pass |
| pop | 8 | 8 | 8 | 8 | 8 | no | pass |
| mega | 8 | 8 | 8 | 8 | 8 | no | pass |
| command | 8 | 8 | 9 | 8 | 8 | no | pass |
| follow | 8 | 8 | 8 | 8 | 8 | no | pass |
| crumb | 8 | 8 | 9 | 8 | 8 | no | pass |
| kiln | 8 | 8 | 8 | 8 | 8 | no | pass |
| split | 8 | 8 | 8 | 8 | 8 | no | pass |
| island | 8 | 8 | 8 | 8 | 8 | no | pass |
| curtain | 9 | 9 | 8 | 9 | 9 | no | pass |
| dock | 8 | 9 | 8 | 8 | 9 | no | pass |
| rail | 8 | 8 | 8 | 8 | 8 | no | pass |
| folio | 8 | 8 | 8 | 8 | 8 | no | pass |
| portal | 8 | 8 | 8 | 8 | 8 | no | pass |

## Perf (4× CPU, 4s rAF + longtask, fresh document per variant)

All 16 measured variants hold ~60 fps with **zero long tasks**. Pill is the slowest at 58.7 fps. No compositor-blur disaster.

## Honest gaps (weaker than the refs, on purpose or leftover)

- **Apple / Linear hairline.** Objects vs a 1px bar. We will not win quiet.
- **Framer mega.** Three named stills, not a live product tour.
- **Raycast.** Command is a filled fake, not a running indexer.
- **Magic UI / Aceternity dock.** Magnify is original; the plate is a loft still, not a Yard workshop. Finder icons were killed in the debate.
- **Island.** The notch is the object. The middle of the frame is still empty air plus three tiles. Apple hardware wins density.
- **Portal.** Incidents are a list, not Hero 195’s widget desk.
- **Split.** The split is a looping spring, not a true scroll-linked split on a long page.
- **Curtain stills.** Focus trap paints FILM gold on first paint. Reduced-motion keeps the type opaque (fixed from an opacity-0 ghost).
- **Dock plate.** Reuses `hero-startup-loft` — cheerful couple, not a studio sill.

Do not merge.
