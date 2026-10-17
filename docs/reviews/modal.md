# Modal

## Round 1
Tall content could clip with no inner scroll. Focus could leave the dialog from the panel. The page shifted when the scrollbar disappeared, and the docs sidebar stayed scrollable underneath.

## Round 2
The panel scrolls inside a max height. The app root is `inert` while open. Scrollbar width is reserved. Focus that leaves the panel is pulled back.

## Agreement
Approved. The dialog holds background focus and scrolls its own content.

## Variants
dialog, sheet, drawer, fullscreen, alert, command, banner, split, lightbox, action-sheet, wizard, document.

Alert is an alertdialog. Drawer, sheet, and banner leave on the axis they entered. Split is two columns. Lightbox captions the body. Wizard shows step ticks. Document is a paper sheet.

## Agreement
Approved on the first variant pass.

## Structural pass
Sheet, fullscreen, and the old split were the same dialog entering from a different edge or split into columns. Alert was the same dialog with a warning mark, and document was the same paper sheet. They became an OTP code, an invoice, and a ticket. Final set: dialog, otp, command, lightbox, wizard, invoice, drawer, share, action-sheet, banner, ticket, auth. The strict critic approved them. Builder agrees.
