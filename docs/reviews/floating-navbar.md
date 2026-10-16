# Floating Navbar

## Round 1
The root was not a navigation landmark. Compact mode only changed padding by a few pixels. The demo’s sticky parent was only as tall as the bar, so the bar scrolled away. Escape did not return focus.

## Round 2
The bar is a labelled `nav`. Compact mode narrows the pill. The menu stays mounted for `aria-controls`. Escape returns focus to the toggle. The demo sticks the bar to its own scroll pane and does not change the docs hash.

## Agreement
Approved. The pill stays in the pane and tightens as that pane scrolls.

## Variants
floating, underline, bottom, dock, command, split, double, islands, tabs, sidebar, overlay, spy.

Bottom is a full-bleed edge bar. Dock is a centered pill that magnifies. Double is two rows. Islands are three pills. Sidebar stacks links. Overlay is a viewport dialog portaled to the body, and choosing a link closes it. Spy watches sections.

## Agreement
Approved.

## Structural pass
Underline, bottom, split, double, islands, tabs, and spy were the same link row in a different place. Tab-bar repeated the dock, so it became a transport bar (artwork, title, scrubber, skip). Final set: floating, dock, sidebar, overlay, command, transport, mega, app-bar, announcement, breadcrumb, segmented, wordmark. The strict critic approved them. Builder agrees.
