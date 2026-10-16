# button

Surveyed 21st.dev Spectrum UI (Metal, Morph, Hold to Confirm, Loading), Aceternity (Moving Border, Hover Border Gradient), Motion Primitives (Border Trail, Glow), shadcn/ui (solid, outline, ghost, link), HeroUI and Park UI (flat, faded, shadow), Magic UI (shimmer), and Uiverse (neon, liquid, brutal). Destructive and secondary were rejected as colour swaps of solid.

Sources: [21st.dev](https://21st.dev), [Aceternity on 21st](https://21st.dev/@manuarora700/library/aceternity-ui), [Motion Primitives](https://docs.21st.dev/@ibelick/library/motion-primitives), [Spectrum UI](https://docs.21st.dev/@arihantcodes_1f7b8c4d/library/spectrum-ui), plus public catalogues from shadcn/ui, HeroUI, Magic UI, Park UI, and Uiverse. Ideas were reimplemented. No source was copied.

## Selected

- `solid` (Solid): Paper fill that presses in slightly.
- `outline` (Outline): Hairline that fills on hover.
- `ghost` (Ghost): Text until the pointer arrives.
- `gradient` (Gradient): Flare-to-iris fill plus a light sweep.
- `shimmer` (Shimmer): Dark control with a hover sweep.
- `neon-glow` (Neon glow): Iris ring that blooms on hover.
- `metal` (Metal): Brushed face, inset highlight, sheen on hover.
- `brutal` (Brutal): Hard offset shadow that collapses on press.
- `underline` (Underline): Text link whose rule draws in.
- `liquid` (Liquid): Tide fill whose corners wobble on hover.
- `spotlight` (Spotlight): A gold pool follows the pointer inside the control.
- `border-beam` (Border beam): A light runs around the perimeter.
- `split` (Split): A flare well holds the icon apart from the label.
- `hold` (Hold): Press and hold until the fill completes.

## Rejected

- Extra colour swaps of an existing treatment.
- Variants that only changed duration or opacity.

## Round 2

Round 2 kept solid, outline, shimmer, neon-glow, metal, brutal, underline, liquid, spotlight, border-beam, split, and hold. Ghost became swap (the label leaves, a second word enters). Gradient became flood (a paper disc grows from the pointer). Sources for the replacements: Uiverse press-hold and label-swap buttons, Aceternity hover-border and spotlight buttons, as reimplemented here.
