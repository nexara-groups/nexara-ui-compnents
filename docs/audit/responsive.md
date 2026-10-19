# Device-responsive audit

**Date:** 18 Oct 2026  
**Branch:** `cursor/visual-quality-overhaul-3ef7`  
**Method:** Playwright Chromium against the live docs site at `127.0.0.1:5173`. Every catalog hash (all named variants on the page) was measured at **375×812**, **768×1024**, and **1280×800**.

This is a real browser, not a CSS emulator. It is not a physical phone. Cursor computer-use was not available in this environment.

## Pass bar

| Check | Rule |
| --- | --- |
| Page overflow | `documentElement.scrollWidth` must not exceed the viewport (internal `overflow-x-auto` on a table or code sample is allowed) |
| Clipped text | Visible copy must not sit in `overflow: hidden` with a wider scroll box |
| Touch | `button`, links, inputs, selects, tabs, radios, and switches ≥ **44×44** |
| Type | Body copy inside `[data-nexara]` ≥ 12px. Uppercase tracking labels may stay 11px |
| Stacking | Grids collapse; nav uses a hamburger / select / drawer; tables become cards or scroll inside their frame |

Raw per-viewport metrics: [`results.json`](./responsive/results.json).

## Result

**46 / 46 components pass at 375, 768, and 1280** after the fixes below. No page-level horizontal scroll remained on the final pass.

### Per component

| Component | 375 | 768 | 1280 | Notes |
| --- | :---: | :---: | :---: | --- |
| draggable-card | Pass | Pass | Pass | Snap-back checkbox is 44px |
| spotlight-card | Pass | Pass | Pass | Task checkbox is 44px |
| flip-card | Pass | Pass | Pass | Show back/front is 44px |
| bento-grid | Pass | Pass | Pass | Single column under `md` |
| button | Pass | Pass | Pass | Default `sm`/`md` are `min-h-11` |
| magnetic-button | Pass | Pass | Pass | Text magnet has a 44px hit |
| aurora-background | Pass | Pass | Pass | |
| grid-background | Pass | Pass | Pass | |
| gradient-text | Pass | Pass | Pass | |
| typewriter | Pass | Pass | Pass | Pause is 44px |
| text-reveal | Pass | Pass | Pass | |
| floating-navbar | Pass | Pass | Pass | Hamburger on floating, mega, app-bar, announcement, overlay |
| modal | Pass | Pass | Pass | Command field is 44px tall |
| hero | Pass | Pass | Pass | Splits stack until `lg` (1024) |
| marquee | Pass | Pass | Pass | Pause is 44px |
| input | Pass | Pass | Pass | Tag field is 44px tall |
| tabs | Pass | Pass | Pass | Horizontal lists scroll; tabs are 44px |
| accordion | Pass | Pass | Pass | Triggers are 44px |
| tooltip | Pass | Pass | Pass | |
| toast | Pass | Pass | Pass | Undo is 44px |
| avatar | Pass | Pass | Pass | |
| badge | Pass | Pass | Pass | Chips are not buttons |
| pricing | Pass | Pass | Pass | Cards stack; compare table scrolls inside |
| testimonials | Pass | Pass | Pass | |
| footer | Pass | Pass | Pass | Links and Join are 44px |
| stats | Pass | Pass | Pass | |
| countdown | Pass | Pass | Pass | Event clock is 2×2 on phone |
| leaderboard | Pass | Pass | Pass | `table` collapses to cards under `md` |
| case-study | Pass | Pass | Pass | Tabs, dots, and pause are 44px |
| services | Pass | Pass | Pass | |
| process | Pass | Pass | Pass | Filmstrip scrolls inside |
| team | Pass | Pass | Pass | |
| contact | Pass | Pass | Pass | |
| cta-band | Pass | Pass | Pass | |
| chapters | Pass | Pass | Pass | Rail hides under `lg` |
| news | Pass | Pass | Pass | Ticker wraps instead of truncating |
| logo-cloud | Pass | Pass | Pass | City labels are 12px |
| app-shell | Pass | Pass | Pass | Menu / top hamburger on phone; rail letters are 44px |
| kpi | Pass | Pass | Pass | |
| data-table | Pass | Pass | Pass | Cards on phone; table from `md` |
| kanban-board | Pass | Pass | Pass | Snap-scroll columns on phone |
| chart-block | Pass | Pass | Pass | |
| activity | Pass | Pass | Pass | |
| command-palette | Pass | Pass | Pass | |
| settings-panel | Pass | Pass | Pass | Switch is 44px |
| kit | Pass | Pass | Pass | Composed pages inherit the fixes |

## What changed

- Shared `touchTarget` (`min-h-11 min-w-11`) in `src/lib/utils.ts`. Default button `sm`/`md` and icon sizes are 44px.
- `LoopPause`, docs Copy / theme / nav, tabs, accordion, navbar, shells, forms, and pause controls meet 44px.
- Docs chrome: mobile `<select>` jump (already present); sidebar hidden under `md`.
- App shell: hamburger on sidebar / industry desks; new hamburger on the `top` variant.
- Floating navbar: hamburger on mega and app-bar; breadcrumbs wrap; dock / segmented scroll inside.
- Data table and leaderboard `table`: card list on phone, table from tablet.
- Kanban: horizontal snap-scroll on phone, three columns from `md`.
- Hero splits wait until `lg` so 768 stays a single column.
- News ticker wraps. Countdown / event clocks use a 2×2 grid on phone.

## Honest leftovers

These did **not** fail the automated bar. They are still not perfect.

1. **Uppercase eyebrows and table headers stay 11px.** Intentional captions, not body copy.
2. **Dock labels are 10px** under a 44px hit area. The icon is the target.
3. **Badge / count / status chips are not 44px.** They are not controls. Removable is still a span, not a button.
4. **Pricing compare and the medals board** scroll sideways *inside* their frame on a 375px page. The page itself does not.
5. **Docs usage `<pre>` blocks** scroll sideways. That is sample code, not a component.
6. **Docs header** at 375 wraps the “Copy-paste…” line next to the theme toggle. Tight, not overflowing.
7. **Kanban on phone** peeks the next column. That is the mobile pattern; it is not a stacked list.
8. **Tooltip and magnetic** stay pointer-first. Touch gets the 44px control without the magnet.
9. **Flip-card** still flips on hover on a fine pointer. Phone uses the 44px Show back control.
10. **No physical device.** Chromium at 375 / 768 / 1280 only. Safe-area notches, iOS 100dvh, and real foldables were not in this run.
11. **Variants were measured on the catalog page**, where every named variant of a slug is mounted together. Isolated `/#variant-id` cards were not opened one-by-one as separate routes.

## Screenshots

Phone (375) and tablet (768) of representative pages live in [`docs/audit/responsive/`](./responsive/).
