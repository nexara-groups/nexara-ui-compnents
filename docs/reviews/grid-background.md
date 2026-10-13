# Grid Background

## Round 1
The pattern was only a moving vignette, edge dots were sliced, and a re-render wiped the pointer position.

## Round 2
A dim field stays visible. A brighter centered mask tracks the pointer, returns to rest on leave, and stays still when reduced motion is requested. Coordinates live on the pattern node so React does not clear them.

## Agreement
Approved. The field remains visible and the highlight follows the pointer.
