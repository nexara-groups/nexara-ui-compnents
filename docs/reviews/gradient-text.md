# Gradient Text

## Round 1
The pan cut back to the start on every loop. Safari could keep a solid fill, and forced colors could hide the glyphs. The demo’s line-height clipped a descender.

## Round 2
The sweep eases out and back. `-webkit-text-fill-color` is set, with a forced-colors override. The demo line has room for the Fraunces descender.

## Agreement
Approved. The gradient moves without a visible seam.

## Variants
sweep, flicker, shimmer, stroke, marker, spark, glitch, wave, clip, kinetic, underline, flip.

Kinetic letter-spacing is no longer overwritten by the sweep animation. Flicker samples the opacity dip. Wave and flip run per letter when the children are a string.

## Agreement
Approved.

## Structural pass
Sweep, flicker, shimmer, wave, kinetic, and flip were the same glyphs with a different motion. Foil and chrome were another metal fill, and extrude was the same glyphs offset. They became ribbon, stencil, and seal. The first stencil painted a bar under the letters. A blend-mode band stayed opaque in Chrome. The shipped stencil is two clipped copies with a gap through the middle, and the seal sets the word on a circular path. The strict critic approved both. Builder agrees.
