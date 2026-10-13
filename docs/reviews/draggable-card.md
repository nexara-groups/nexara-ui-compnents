# Draggable Card

## Round 1
The tilt had no parent perspective, so the card squashed instead of leaning. Tilt followed drag offset and snapped flat on release. The active card could not stay above its sibling. The demo left flex gaps, and the grip was an extra tab stop.

## Round 2
Perspective, a velocity spring, and a rising z-index were added, and the demo became one board. The critic still found the z-index trapped inside each perspective wrapper, and the second card could clip at `left: 22rem`.

## Round 3
The wrapper carries the z-index, and the second card is anchored to the bottom-right with a max width.

## Agreement
Approved. The active card paints above the other, and both cards stay inside the stage.
