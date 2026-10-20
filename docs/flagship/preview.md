# How to view Helio

This branch is a Vite SPA. GitHub Pages only deploys from `main`, so a public preview URL is not available until merge. A Vercel/Netlify token is not present in this environment.

## Local

```bash
npm install
npm run dev
```

Vite prints a local URL, usually `http://localhost:5173/`.

| Route | What you see |
| --- | --- |
| `/#flagship` | Full landing: iris hero, story, live bento, kinetic type, WebGL instrument, voices, pricing |
| `/#flagship-dashboard` | Night desk: sidebar, `⌘K` palette, live chart, table |
| `/#flagship-cinematic-hero` | Isolated piece in the docs catalogue |
| `/#draggable-card` | Original registry docs |

Production build:

```bash
npm run build
npm run preview
```

## After merge

The Pages workflow publishes to `https://nexara-groups.github.io/nexara-ui-compnents/#flagship`.
