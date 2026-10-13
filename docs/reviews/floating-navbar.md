# Floating Navbar

## Round 1
The root was not a navigation landmark. Compact mode only changed padding by a few pixels. The demo’s sticky parent was only as tall as the bar, so the bar scrolled away. Escape did not return focus.

## Round 2
The bar is a labelled `nav`. Compact mode narrows the pill. The menu stays mounted for `aria-controls`. Escape returns focus to the toggle. The demo sticks the bar to its own scroll pane and does not change the docs hash.

## Agreement
Approved. The pill stays in the pane and tightens as that pane scrolls.
