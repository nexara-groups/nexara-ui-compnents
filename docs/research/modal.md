# Modal — structural audit

Sheet and fullscreen were removed. They were the dialog moved to an edge or stretched to the viewport. Share and auth replaced them. Drawer, banner, and action sheet stayed only because their contents are different products, not because of the edge they use.

| Variant | Reference | What is structurally different |
| --- | --- | --- |
| dialog | [shadcn Dialog](https://ui.shadcn.com/docs/components/dialog) | Title, description, and body in a centered card. |
| otp | One-time-code dialogs | Four digit boxes and a resend control. Replaces alert, which was the same dialog with a warning mark. |
| command | [shadcn Command](https://ui.shadcn.com/docs/components/command) | A command field above the results. |
| lightbox | Lightbox patterns on [21st.dev](https://21st.dev/) | A media well, then a caption. |
| wizard | Multi-step dialogs | A step track. |
| invoice | Invoice sheets | Line items and a total on paper. Replaces document, which was the same paper sheet. |
| drawer | [shadcn Drawer](https://ui.shadcn.com/docs/components/drawer) used as navigation | A list of destinations, not a relocated dialog. |
| share | iOS share sheets | A grid of targets. |
| action-sheet | Action sheets | Stacked full-width actions. |
| banner | Announcement bars | A single inline notice and a dismiss. |
| ticket | Admit tickets | A barcode and a code. Replaces split, which was the same dialog in two columns. |
| auth | Login dialogs in [shadcn blocks](https://ui.shadcn.com/blocks) | A color panel beside an email form and a provider row. |

Ideas were reimplemented. No source was copied.
