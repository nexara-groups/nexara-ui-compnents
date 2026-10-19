# Visual audit scores

Method: live docs site at `http://127.0.0.1:5173`, full-page screenshots of every component gallery at **1440×1100** and **390×844**, dark only (the site has no light theme). Compared against 21st.dev, Magic UI, Aceternity, shadcn/ui, Origin UI, Linear, Vercel, Stripe, Raycast. See `docs/audit/references.md` and `docs/audit/before/`.

Axes, 1–10: **Q** design quality, **D** distinctness from siblings, **M** modernity. A variant must hit **8 on every axis** to keep. Verdict: keep / redesign / replace.

There is no light-mode capture. That alone caps **M** at 6 for the catalogue.

## Docs chrome

| Surface | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| Docs shell | 5 | 3 | 4 | redesign | Dark-only, Fraunces/Outfit boutique stack, carnival gold/orange, no theme toggle |

## Button

| Variant | Q | D | M | Verdict | Note vs reference |
| --- | --- | --- | --- | --- | --- |
| solid | 6 | 4 | 6 | redesign | Generic white pill. Linear/shadcn primary is denser, not a capsule on black. |
| gradient | 5 | 5 | 4 | replace | 2018 gel highlight. Magic UI shimmer/rainbow is the current CTA language. |
| glass | 6 | 6 | 7 | redesign | Closest to 2026 glass, but contrast and hairline are thin. |
| neumorphic | 3 | 7 | 2 | replace | Explicitly dated. |
| pressable | 5 | 7 | 4 | replace | Game-UI lip, not product. |
| glow-outline | 5 | 6 | 5 | replace | 2021 neon ring. |
| split | 7 | 8 | 7 | redesign | Anatomy is distinct; finish is crude. |
| avatar-pill | 6 | 7 | 6 | redesign | Useful model, toy execution. |
| border-beam | 6 | 8 | 7 | redesign | Right idea (Magic UI beam); muddy conic. |
| brutalist | 5 | 8 | 5 | replace | Offset-shadow meme. |
| skeuomorphic | 3 | 8 | 2 | replace | Rivets. |
| social | 7 | 8 | 7 | redesign | Right OAuth anatomy; needs provider density. |
| segment | 6 | 6 | 6 | replace | Reads as split with a chevron. |

## Magnetic button

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| pill | 6 | 5 | 6 | redesign | Only modern control in the set. |
| keycap | 5 | 8 | 5 | redesign | Keep as a keyboard key, not a toy. |
| bulb | 3 | 8 | 2 | replace | Illustration, not a control. |
| dock | 5 | 7 | 6 | redesign | macOS dock is still current; this is a gradient square. |
| sticker | 4 | 7 | 3 | replace | Tape meme. |
| medal | 3 | 8 | 2 | replace | |
| stamp | 3 | 8 | 2 | replace | |
| badge | 6 | 7 | 6 | redesign | |
| shutter | 4 | 8 | 3 | replace | |
| ticket | 4 | 8 | 3 | replace | |
| tag | 4 | 8 | 3 | replace | |
| wax | 3 | 9 | 1 | replace | Student Dribbble. |

## Draggable card

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| glass | 6 | 6 | 6 | redesign | Empty frosted tile. |
| film | 4 | 7 | 3 | replace | Sprockets as decoration. |
| sticker | 4 | 7 | 3 | replace | |
| window | 5 | 7 | 5 | redesign | Title-bar drag is a real model. |
| ticket | 4 | 7 | 3 | replace | |
| polaroid | 5 | 7 | 4 | replace | Keep the media-caption idea as a photo widget. |
| dossier | 4 | 6 | 3 | replace | |
| receipt | 5 | 7 | 4 | replace | |
| comic | 3 | 8 | 2 | replace | |
| playing | 4 | 7 | 3 | replace | |
| boarding | 4 | 7 | 3 | replace | |
| postcard | 4 | 6 | 3 | replace | |

## Spotlight card

Shared shell: `rounded-3xl border-white/10 bg-[#12131c]`. Distinctness is field-swapping, not anatomy.

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| profile | 5 | 5 | 5 | redesign | Same card, avatar row. |
| pricing | 5 | 5 | 5 | redesign | $48 with two bullets. Stripe/Origin pricing is a plan object. |
| product | 4 | 4 | 4 | redesign | Orange gradient blob for “Lamp 04”. |
| testimonial | 5 | 4 | 5 | redesign | Stars + one line. |
| stat | 5 | 5 | 5 | redesign | Thin sparkline. |
| music | 5 | 5 | 5 | redesign | |
| weather | 5 | 5 | 5 | redesign | |
| notification | 5 | 5 | 5 | redesign | |
| repo | 5 | 5 | 5 | redesign | |
| task | 5 | 5 | 5 | redesign | |
| article | 5 | 5 | 5 | redesign | |
| place | 4 | 5 | 4 | redesign | Fake map dots. |

## Flip card

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| credit | 6 | 7 | 6 | redesign | Only one that reads as an object. |
| badge | 5 | 6 | 5 | replace | |
| playing | 4 | 6 | 3 | replace | |
| product | 4 | 5 | 4 | redesign | Flat orange slab. |
| flashcard | 5 | 6 | 5 | redesign | Useful study model. |
| ticket | 4 | 6 | 3 | replace | |
| profile | 5 | 5 | 5 | redesign | Purple circle. |
| pricing | 5 | 5 | 5 | redesign | |
| passport | 4 | 6 | 3 | replace | |
| vinyl | 4 | 7 | 3 | replace | |
| book | 4 | 6 | 4 | replace | Type on a rectangle. |
| postcard | 4 | 5 | 3 | replace | |

## Bento grid

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| chart | 5 | 5 | 5 | redesign | Empty spark, no product data. |
| quote | 6 | 6 | 6 | redesign | |
| editorial | 6 | 6 | 6 | redesign | |
| terminal | 6 | 7 | 6 | redesign | |
| schedule | 5 | 6 | 5 | redesign | |
| scoreboard | 5 | 7 | 5 | redesign | |
| stat | 5 | 5 | 5 | redesign | |
| compare | 5 | 6 | 5 | redesign | |
| media | 5 | 6 | 5 | redesign | |
| calendar | 6 | 7 | 6 | redesign | |
| kanban | 5 | 6 | 5 | redesign | |
| invoice | 5 | 6 | 5 | redesign | |

## Aurora background

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| aurora | 6 | 6 | 6 | redesign | Soft curtains, under-resolved vs Aceternity. |
| starfield | 4 | 6 | 4 | redesign | Sparse dots. |
| meteors | 5 | 6 | 5 | redesign | One streak. |
| mesh | 6 | 6 | 6 | redesign | Closest to current mesh gradients. |
| radar | 4 | 7 | 4 | replace | Line drawing. |
| sunset | 4 | 6 | 4 | replace | Sun disc clipart. |
| clouds | 3 | 5 | 3 | replace | |
| rain | 3 | 5 | 3 | replace | |
| constellation | 3 | 6 | 3 | replace | Three dots and a polyline. |
| mountains | 3 | 6 | 2 | replace | Two triangles. |
| city | 3 | 6 | 2 | replace | Rectangle skyline. |
| lightning | 2 | 6 | 2 | replace | A bolt glyph. |

## Grid background

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| graph | 6 | 6 | 6 | redesign | Fine, not Vercel/Magic density. |
| dots | 6 | 6 | 7 | redesign | Keep; refine fade. |
| isometric | 6 | 7 | 6 | redesign | |
| hex | 5 | 7 | 5 | redesign | |
| circuit | 5 | 7 | 5 | redesign | |
| blueprint | 5 | 8 | 5 | redesign | |
| notebook | 5 | 8 | 5 | redesign | |
| perspective | 5 | 8 | 6 | redesign | |
| topography | 5 | 7 | 5 | redesign | |
| herringbone | 5 | 7 | 4 | replace | Flooring, not product. |
| pixel | 4 | 6 | 3 | replace | |
| brick | 4 | 7 | 3 | replace | |

## Gradient text

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| gradient | 6 | 5 | 6 | redesign | Default clip, no sheen. |
| stroke | 6 | 6 | 6 | redesign | |
| marker | 5 | 6 | 5 | redesign | |
| glitch | 5 | 7 | 5 | redesign | |
| neon | 4 | 6 | 4 | replace | 2020 neon. |
| engraved | 5 | 6 | 4 | replace | |
| ribbon | 3 | 8 | 2 | replace | Prize ribbon. |
| stencil | 4 | 7 | 3 | replace | |
| boxed | 5 | 7 | 5 | redesign | |
| script | 5 | 6 | 5 | redesign | |
| seal | 3 | 8 | 2 | replace | Circular path gimmick. |
| halftone | 4 | 7 | 3 | replace | |

## Typewriter

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| terminal | 6 | 7 | 6 | redesign | Right model, thin chrome. |
| chat | 6 | 7 | 6 | redesign | |
| search | 6 | 7 | 7 | redesign | |
| editor | 6 | 7 | 6 | redesign | |
| split-flap | 6 | 8 | 6 | redesign | Still current (Vestaboard/Aceternity). |
| news | 5 | 7 | 5 | redesign | |
| lower-third | 5 | 7 | 5 | redesign | |
| dispatch | 4 | 7 | 3 | replace | Radio slip. |
| shipping | 4 | 7 | 3 | replace | Parcel label. |
| redaction | 5 | 7 | 5 | redesign | |
| script | 5 | 6 | 5 | redesign | |
| teletype | 4 | 7 | 3 | replace | Paper roll. |

## Text reveal

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| editorial | 6 | 6 | 6 | redesign | Drop cap is fine; type is timid. |
| headline | 6 | 6 | 6 | redesign | |
| marker | 5 | 5 | 5 | redesign | Same as gradient-text marker. |
| outline | 5 | 5 | 5 | redesign | Same as gradient-text stroke. |
| split | 6 | 6 | 6 | redesign | |
| figure | 5 | 6 | 5 | redesign | |
| quote | 6 | 6 | 6 | redesign | |
| medallion | 4 | 7 | 3 | replace | Seal again. |
| columns | 6 | 7 | 6 | redesign | |
| annotation | 5 | 6 | 5 | redesign | |
| index | 5 | 6 | 5 | redesign | |
| running-head | 5 | 6 | 5 | redesign | |

## Floating navbar

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| floating | 6 | 6 | 6 | redesign | Pill is the right Linear/Vercel model; finish is generic. |
| dock | 5 | 7 | 6 | redesign | |
| sidebar | 5 | 7 | 5 | redesign | Empty app column. |
| overlay | 5 | 6 | 5 | redesign | |
| command | 6 | 7 | 7 | redesign | Raycast-adjacent; needs kbd and results. |
| transport | 5 | 8 | 5 | redesign | Player chrome is distinct, thin. |
| mega | 5 | 7 | 5 | redesign | |
| app-bar | 5 | 6 | 5 | redesign | |
| announcement | 5 | 6 | 6 | redesign | |
| breadcrumb | 5 | 7 | 6 | redesign | |
| segmented | 5 | 6 | 6 | redesign | |
| wordmark | 5 | 6 | 5 | redesign | |

## Modal

Gallery shows only “Open {variant}” pills. Variants are not visible at rest — a docs failure. From source, several are novelty (ticket) or the same panel with a different header.

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| dialog | 6 | 5 | 6 | redesign | |
| otp | 6 | 7 | 7 | redesign | Keep; show it open in the gallery. |
| command | 6 | 7 | 7 | redesign | |
| lightbox | 5 | 7 | 6 | redesign | |
| wizard | 5 | 7 | 6 | redesign | |
| invoice | 5 | 7 | 5 | redesign | |
| drawer | 5 | 7 | 6 | redesign | |
| share | 5 | 6 | 5 | redesign | |
| action-sheet | 5 | 7 | 6 | redesign | |
| banner | 5 | 6 | 5 | replace | Not a modal. |
| ticket | 4 | 7 | 3 | replace | |
| auth | 6 | 7 | 6 | redesign | |

## Hero

Every preview uses the same title (“Move the furniture”) and empty media. That is the single loudest reject.

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| saas | 5 | 5 | 5 | redesign | Traffic-light window + color tiles. Vercel/Linear heroes show a real product. |
| download | 4 | 6 | 4 | redesign | Two empty phones. |
| video | 4 | 5 | 4 | redesign | Gradient + play glyph. |
| logos | 5 | 5 | 5 | redesign | Word pills, not marks. |
| pricing | 5 | 6 | 5 | redesign | |
| agency | 6 | 7 | 6 | redesign | Best of the set; still template. |
| commerce | 5 | 6 | 5 | redesign | |
| event | 5 | 6 | 5 | redesign | |
| search | 5 | 5 | 5 | redesign | |
| dashboard | 4 | 6 | 4 | redesign | Toy sidebar. |
| editorial | 6 | 7 | 6 | redesign | |
| waitlist | 5 | 5 | 5 | redesign | Color-dot avatars. |

## Marquee

| Variant | Q | D | M | Verdict | Note |
| --- | --- | --- | --- | --- | --- |
| logos | 5 | 5 | 5 | redesign | Uppercase words. |
| quotes | 5 | 6 | 5 | redesign | |
| ticker | 6 | 7 | 6 | redesign | |
| stubs | 4 | 7 | 3 | replace | |
| filmstrip | 4 | 7 | 3 | replace | |
| pills | 5 | 5 | 5 | redesign | |
| stats | 5 | 6 | 5 | redesign | |
| hazard | 3 | 8 | 2 | replace | Caution tape. |
| profiles | 5 | 6 | 5 | redesign | |
| log | 5 | 7 | 5 | redesign | |
| tiles | 4 | 6 | 4 | replace | Color squircles. |
| medals | 3 | 8 | 2 | replace | |

## Missing categories (not in catalogue)

pricing section, testimonials, feature section, footer, input/form, tabs, accordion, tooltip, toast, avatar, badge — all expected by Origin/shadcn/21st. **Add** if capacity allows.

## Counts

- Variants scored: 180
- Keep as-is: **0**
- Redesign: **118**
- Replace: **62**
- Below 8 on any axis: **180 / 180**
