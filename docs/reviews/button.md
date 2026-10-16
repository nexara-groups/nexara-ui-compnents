# Button

## Round 1
The gradient pan hitched, the shimmer died before it crossed the label, and loading used native `disabled`, which dropped focus. The focus ring offset assumed a zinc-950 page.

## Round 2
The gradient is visible at rest and the sweep is a transform. Loading stays focusable, keeps the label width, and exposes “Loading”. The sweep then parked a white band after hover, and the demo swapped the label to “Saving”.

## Round 3
The keyframes fade the band out, and the demo keeps the “Save view” label.

## Agreement
Approved. The sheen leaves the button, and the loading state no longer changes the width.

## Variants
Twelve treatments plus swap and flood: solid, outline, swap, flood, shimmer, neon-glow, metal, brutal, underline, liquid, spotlight, border-beam, split, hold.

Round 1 of the variant critique asked to replace liquid and neon-glow and to fix underline clipping, flood contrast, swap naming, outline fill, and hold blur. Those landed: liquid pours from the bottom, neon-glow parks a segment on the nearest edge, the underline rule sits inside the label, flood clips a dark label above the live type, and hold cancels on blur.

## Agreement
Approved. The critic signed off after the flood label was stacked above the live type.
