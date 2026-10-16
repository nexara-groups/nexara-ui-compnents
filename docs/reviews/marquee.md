# Marquee

## Round 1
Short content could leave a gap in the loop. The pause button sat on the track and resumed the animation when the pointer moved onto it. Duplicate copies were tabbable.

## Round 2
Copies are measured until each half covers the frame. Duplicate copies are inert. The button moved outside the track, but hover was still bound to the wrapper, so Play could not start while the pointer was over the control. The measurement sample was still tabbable.

## Round 3
Hover pause listens only on the track, and only for a mouse. The measurement sample is inert.

## Agreement
Approved. Play starts the loop from the control, and hidden copies are not focusable.

## Variants
fade, pingpong, cylinder, vertical, spotlight, stepped, parallax, overlap, velocity, dwell, reverse-hover, cascade.

Parallax is two speeds with one shared pause. Dwell holds mid-loop. Cascade bobs each item. Stepped jumps by a count that includes the repeated copies.

## Agreement
Approved.
