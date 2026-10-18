# Nexara UI

Original, copy-paste React components aimed at premium cinematic UI quality: heroes, behavioral buttons, marketing sections, portal chrome, and industry kits. Live sites were used only as a quality bar, not as templates. The catalogue uses fictional brands (Harbor Climate, Lumen Care, Field Athletics, North Studio, Atlas Academy, Solum Lab) and bundled original media.

The code is written for this registry. It is not vendored from 21st, Aceternity, or shadcn. Components are React + TypeScript, styled with Tailwind CSS, and animated with Framer Motion where motion is doing real work. You copy a file into your app and own it. Heroes, teams, case studies, and logo clouds ship with photographic defaults in `public/media` and first-class `image` / `video` / `lottie` props.

## For agents

When someone says “use the draggable card from nexara-ui” (or any other component name):

1. Open [`registry.json`](./registry.json) and find the item whose `name` or `title` matches. Names use kebab-case (`draggable-card`). Titles are the words a person would say (`Draggable Card`).
2. Copy every file in that item’s `files` array.
3. Copy `src/lib/utils.ts` as well (`registryDependencies` lists it). Repeat for any other registry dependency, such as `button` for the magnetic button.
4. Install the item’s `dependencies`.
5. The components import `@/lib/utils` and `@/components/ui/...`. Map `@` to `src`, or rewrite those imports.
6. Tailwind CSS needs to scan the copied files. No extra plugin is required.
7. Use the `usage` string in the registry, or the live example on the docs site, as the starting point. Then restyle with the documented props and `className`.
8. Variants live on each item as `variants[]`. Look up `button / social` by finding the `button` item, then the variant whose `name` is `social`. Copy that variant’s `usage`.

Do not rewrite the component from scratch if it already exists here.

## Catalogue

| Component | Registry name | Path | Depends on |
| --- | --- | --- | --- |
| Utilities (`cn`, reduced motion) | `utils` | `src/lib/utils.ts` | clsx, tailwind-merge |
| Draggable Card | `draggable-card` | `src/components/ui/draggable-card.tsx` | framer-motion |
| Spotlight Card | `spotlight-card` | `src/components/ui/spotlight-card.tsx` | — |
| Flip Card | `flip-card` | `src/components/ui/flip-card.tsx` | framer-motion |
| Bento Grid | `bento-grid` | `src/components/ui/bento-grid.tsx` | — |
| Button (24 kinds, plus `button-extra.tsx`) | `button` | `src/components/ui/button.tsx` | class-variance-authority |
| Magnetic Button | `magnetic-button` | `src/components/ui/magnetic-button.tsx` | framer-motion, button |
| Aurora Background | `aurora-background` | `src/components/ui/aurora-background.tsx` | — |
| Grid Background | `grid-background` | `src/components/ui/grid-background.tsx` | — |
| Gradient Text | `gradient-text` | `src/components/ui/gradient-text.tsx` | — |
| Typewriter | `typewriter` | `src/components/ui/typewriter.tsx` | — |
| Text Reveal | `text-reveal` | `src/components/ui/text-reveal.tsx` | framer-motion |
| Floating Navbar | `floating-navbar` | `src/components/ui/floating-navbar.tsx` | framer-motion |
| Modal | `modal` | `src/components/ui/modal.tsx` | framer-motion |
| Hero (30 models, plus `hero-extra.tsx` and `src/lib/media.tsx`) | `hero` | `src/components/ui/hero.tsx` | framer-motion |
| Marquee | `marquee` | `src/components/ui/marquee.tsx` | — |
| Input | `input` | `src/components/ui/input.tsx` | — |
| Tabs | `tabs` | `src/components/ui/tabs.tsx` | — |
| Accordion | `accordion` | `src/components/ui/accordion.tsx` | — |
| Tooltip | `tooltip` | `src/components/ui/tooltip.tsx` | — |
| Toast | `toast` | `src/components/ui/toast.tsx` | — |
| Avatar | `avatar` | `src/components/ui/avatar.tsx` | — |
| Badge | `badge` | `src/components/ui/badge.tsx` | — |
| Pricing | `pricing` | `src/components/ui/pricing.tsx` | — |
| Testimonials | `testimonials` | `src/components/ui/testimonials.tsx` | — |
| Footer | `footer` | `src/components/ui/footer.tsx` | — |
| Stats | `stats` | `src/components/ui/stats.tsx` | — |
| Countdown | `countdown` | `src/components/ui/countdown.tsx` | — |
| Leaderboard | `leaderboard` | `src/components/ui/leaderboard.tsx` | — |
| Case Study | `case-study` | `src/components/ui/case-study.tsx` | — |
| Services | `services` | `src/components/ui/services.tsx` | — |
| Process | `process` | `src/components/ui/process.tsx` | — |
| Team | `team` | `src/components/ui/team.tsx` | — |
| Contact | `contact` | `src/components/ui/contact.tsx` | — |
| CTA band | `cta-band` | `src/components/ui/cta-band.tsx` | — |
| Chapters | `chapters` | `src/components/ui/chapters.tsx` | — |
| News | `news` | `src/components/ui/news.tsx` | — |
| Logo cloud | `logo-cloud` | `src/components/ui/logo-cloud.tsx` | — |
| App shell | `app-shell` | `src/components/ui/app-shell.tsx` | — |
| KPI | `kpi` | `src/components/ui/kpi.tsx` | — |
| Data table | `data-table` | `src/components/ui/data-table.tsx` | — |
| Kanban board | `kanban-board` | `src/components/ui/kanban-board.tsx` | — |
| Chart block | `chart-block` | `src/components/ui/chart-block.tsx` | — |
| Activity | `activity` | `src/components/ui/activity.tsx` | — |
| Command palette | `command-palette` | `src/components/ui/command-palette.tsx` | — |
| Settings panel | `settings-panel` | `src/components/ui/settings-panel.tsx` | — |
| Industry kit | `kit` | `src/components/ui/kit.tsx` | composed blocks |

Every component also needs `clsx` and `tailwind-merge` through `src/lib/utils.ts`. Copy `src/lib/media.tsx` and `public/media` with any item that shows a person, product, or brand mark. Each component has at least ten variants, and each variant is a different design, not a recolor or a different hover. The names are on the registry item (`variants[].name`) and on the docs page as `component / variant`. Look up `hero / ac-remote`, `section / stats-countup` as `stats / countup`, `button / toggle`, or `kit / healthcare`. The docs search matches those strings. The docs site has a light/dark toggle. Research notes are in `docs/research/`. Media attribution is in `docs/research/media.md`. Critique notes are in `docs/reviews/`. The scored visual audit is in `docs/audit/`.

## Live preview

[Live preview](https://nexara-groups.github.io/nexara-ui-compnents/)

That URL is the GitHub Pages site for this repo. Component pages are hash routes, for example [button](https://nexara-groups.github.io/nexara-ui-compnents/#button). The deploy workflow is [`.github/workflows/pages.yml`](./.github/workflows/pages.yml). It publishes on every push to `main`.

## Docs site

One command installs dependencies and starts the catalogue:

```bash
npm install && npm run dev
```

The site opens on the draggable card. Each page has a live preview, a copyable usage snippet, and the prop table. `npm run build` typechecks and builds. `npm run lint` runs oxlint and checks that `registry.json` points at real files and that every component file is registered.

## Using a component

```tsx
import { useRef } from 'react'
import { DraggableCard } from '@/components/ui/draggable-card'

export function Board() {
  const stageRef = useRef<HTMLDivElement>(null)

  return (
    <div ref={stageRef} className="relative h-96">
      <DraggableCard bounds={stageRef} variant="window">
        <p>Drag me</p>
      </DraggableCard>
    </div>
  )
}
```

Customization is layered:

- **Variants and props** change behavior and preset looks (`variant`, `size`, `snapBack`, colors, timing).
- **`className` and slot classes** (`contentClassName`, `titleClassName`, and the rest) merge with `tailwind-merge`, so later utilities win.
- **Composition** is preferred for bigger scenes. The hero does not embed the aurora; you wrap one in the other.

## Alias

`tsconfig` and Vite already map `@/*` to `src/*`. In another app:

```json
{
  "compilerOptions": {
    "paths": { "@/*": ["./src/*"] }
  }
}
```

On TypeScript older than 6, also set `"baseUrl": "."`.

## Adding a component

Add the source under `src/components/ui/`, export it from `src/components/ui/index.ts`, add a docs demo and catalogue entry, and add a `registry.json` item with `name`, `title`, `description`, `dependencies`, `files`, and `usage`. Run the builder/critic loop and record it in `docs/reviews/<name>.md` before calling the component done.
