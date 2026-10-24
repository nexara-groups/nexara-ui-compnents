'use client'

import type { ThemeId, ThemeSlot } from '@/themes/contract.ts'

export type ThemeDoc = {
  theme: ThemeId
  slot: ThemeSlot
  title: string
  description: string
  path: string
  usage: string
  props: { name: string; type: string; description: string }[]
}

const provider = `import { ThemeProvider } from '@/themes/provider'
import { fieldnote, programme } from '@/themes/themes'`

export const themeDocs: ThemeDoc[] = [
  {
    theme: 'fieldnote',
    slot: 'navbar',
    title: 'Navbar',
    description: 'Job index. Phone and quote stay in the bar. Small screens open a dialog.',
    path: 'src/themes/fieldnote/navbar.tsx',
    usage: `${provider}\nimport { FieldnoteNavbar } from '@/themes/fieldnote/navbar'\n\n<ThemeProvider theme={fieldnote}><FieldnoteNavbar /></ThemeProvider>`,
    props: [
      { name: 'name', type: 'string', description: 'Wordmark.' },
      { name: 'phone / phoneHref', type: 'string', description: 'Dispatch number.' },
      { name: 'links', type: '{ href, label }[]', description: 'Index links.' },
    ],
  },
  {
    theme: 'fieldnote',
    slot: 'hero',
    title: 'Hero',
    description: 'The headline is set on the first frame. A tape flag moves between live rows. A station line tracks scroll.',
    path: 'src/themes/fieldnote/hero.tsx',
    usage: `${provider}\nimport { FieldnoteHero } from '@/themes/fieldnote/hero'\n\n<ThemeProvider theme={fieldnote}><FieldnoteHero station /></ThemeProvider>`,
    props: [
      { name: 'title / lede', type: 'string', description: 'First-screen copy.' },
      { name: 'rows', type: 'FieldnoteStatus[]', description: 'Live board. The active row wears the tape.' },
      { name: 'station', type: 'boolean', description: 'Draws the scroll station inside this section.' },
    ],
  },
  {
    theme: 'fieldnote',
    slot: 'features',
    title: 'Features',
    description: 'Services as a ruled list, not a card mosaic. The tape marks the row you are reading.',
    path: 'src/themes/fieldnote/features.tsx',
    usage: `${provider}\nimport { FieldnoteFeatures } from '@/themes/fieldnote/features'\n\n<ThemeProvider theme={fieldnote}><FieldnoteFeatures /></ThemeProvider>`,
    props: [{ name: 'services', type: 'FieldnoteService[]', description: 'Code, title, body, meta.' }],
  },
  {
    theme: 'fieldnote',
    slot: 'stats',
    title: 'Stats',
    description: 'Figures sit still. Rules draw in. No count-up.',
    path: 'src/themes/fieldnote/stats.tsx',
    usage: `${provider}\nimport { FieldnoteStats } from '@/themes/fieldnote/stats'\n\n<ThemeProvider theme={fieldnote}><FieldnoteStats /></ThemeProvider>`,
    props: [{ name: 'items', type: 'FieldnoteStat[]', description: 'Value, label, note.' }],
  },
  {
    theme: 'fieldnote',
    slot: 'testimonial',
    title: 'Testimonial',
    description: 'A service note on ruled paper. One quote, a job number, no stars.',
    path: 'src/themes/fieldnote/testimonial.tsx',
    usage: `${provider}\nimport { FieldnoteTestimonial } from '@/themes/fieldnote/testimonial'\n\n<ThemeProvider theme={fieldnote}><FieldnoteTestimonial /></ThemeProvider>`,
    props: [{ name: 'quote / name / job', type: 'string', description: 'The note.' }],
  },
  {
    theme: 'fieldnote',
    slot: 'pricing',
    title: 'Pricing',
    description: 'Plans are rows. The tape commits on click and previews on hover or focus.',
    path: 'src/themes/fieldnote/pricing.tsx',
    usage: `${provider}\nimport { FieldnotePricing } from '@/themes/fieldnote/pricing'\n\n<ThemeProvider theme={fieldnote}><FieldnotePricing /></ThemeProvider>`,
    props: [{ name: 'plans', type: 'FieldnotePlan[]', description: 'Name, price, response, parts.' }],
  },
  {
    theme: 'fieldnote',
    slot: 'cta',
    title: 'CTA',
    description: 'The phone number is the headline. Quote is the second action.',
    path: 'src/themes/fieldnote/cta.tsx',
    usage: `${provider}\nimport { FieldnoteCta } from '@/themes/fieldnote/cta'\n\n<ThemeProvider theme={fieldnote}><FieldnoteCta /></ThemeProvider>`,
    props: [{ name: 'phone / phoneHref', type: 'string', description: 'Dispatch line.' }],
  },
  {
    theme: 'fieldnote',
    slot: 'footer',
    title: 'Footer',
    description: 'Yard address, districts, licences. The tape is explained in one line.',
    path: 'src/themes/fieldnote/footer.tsx',
    usage: `${provider}\nimport { FieldnoteFooter } from '@/themes/fieldnote/footer'\n\n<ThemeProvider theme={fieldnote}><FieldnoteFooter /></ThemeProvider>`,
    props: [{ name: 'districts / licences', type: 'string[]', description: 'Index columns.' }],
  },
  {
    theme: 'programme',
    slot: 'navbar',
    title: 'Navbar',
    description: 'Masthead with a yellow plate that lags, then snaps. Claret never fills the button.',
    path: 'src/themes/programme/navbar.tsx',
    usage: `${provider}\nimport { ProgrammeNavbar } from '@/themes/programme/navbar'\n\n<ThemeProvider theme={programme}><ProgrammeNavbar /></ThemeProvider>`,
    props: [{ name: 'name / issue / links', type: 'string', description: 'Masthead and index.' }],
  },
  {
    theme: 'programme',
    slot: 'hero',
    title: 'Hero',
    description: 'Two names, a score that rolls once, staples, and a perforation. Register is in the first frame.',
    path: 'src/themes/programme/hero.tsx',
    usage: `${provider}\nimport { ProgrammeHero } from '@/themes/programme/hero'\n\n<ThemeProvider theme={programme}><ProgrammeHero /></ThemeProvider>`,
    props: [{ name: 'home / away / score', type: 'string', description: 'The fixture on the cover.' }],
  },
  {
    theme: 'programme',
    slot: 'features',
    title: 'Features',
    description: 'A fixture list. The claret rule widens on the row under the pointer and stays on the chosen row.',
    path: 'src/themes/programme/features.tsx',
    usage: `${provider}\nimport { ProgrammeFeatures } from '@/themes/programme/features'\n\n<ThemeProvider theme={programme}><ProgrammeFeatures /></ThemeProvider>`,
    props: [{ name: 'fixtures', type: 'Fixture[]', description: 'Age, kickoff, sides, gate.' }],
  },
  {
    theme: 'programme',
    slot: 'stats',
    title: 'Stats',
    description: 'Season figures in score windows. Digits travel once, then hold.',
    path: 'src/themes/programme/stats.tsx',
    usage: `${provider}\nimport { ProgrammeStats } from '@/themes/programme/stats'\n\n<ThemeProvider theme={programme}><ProgrammeStats /></ThemeProvider>`,
    props: [{ name: 'items', type: '{ value, label }[]', description: 'Played, won, drawn, lost.' }],
  },
  {
    theme: 'programme',
    slot: 'testimonial',
    title: 'Testimonial',
    description: 'Two notes from the stand, set like programme ads. No stars.',
    path: 'src/themes/programme/testimonial.tsx',
    usage: `${provider}\nimport { ProgrammeTestimonial } from '@/themes/programme/testimonial'\n\n<ThemeProvider theme={programme}><ProgrammeTestimonial /></ThemeProvider>`,
    props: [{ name: 'voices', type: 'ProgrammeVoice[]', description: 'Quote, name, detail.' }],
  },
  {
    theme: 'programme',
    slot: 'pricing',
    title: 'Pricing',
    description: 'A membership table. The claret rule marks the row. The button stays ink.',
    path: 'src/themes/programme/pricing.tsx',
    usage: `${provider}\nimport { ProgrammePricing } from '@/themes/programme/pricing'\n\n<ThemeProvider theme={programme}><ProgrammePricing /></ThemeProvider>`,
    props: [{ name: 'plans', type: 'Membership[]', description: 'Seat, fee, what it includes.' }],
  },
  {
    theme: 'programme',
    slot: 'cta',
    title: 'CTA',
    description: 'A perforation tears in four frames, then the register line.',
    path: 'src/themes/programme/cta.tsx',
    usage: `${provider}\nimport { ProgrammeCta } from '@/themes/programme/cta'\n\n<ThemeProvider theme={programme}><ProgrammeCta /></ThemeProvider>`,
    props: [{ name: 'title / href', type: 'string', description: 'The ask.' }],
  },
  {
    theme: 'programme',
    slot: 'footer',
    title: 'Footer',
    description: 'Pavilion address, training nights, charity number, another perforation.',
    path: 'src/themes/programme/footer.tsx',
    usage: `${provider}\nimport { ProgrammeFooter } from '@/themes/programme/footer'\n\n<ThemeProvider theme={programme}><ProgrammeFooter /></ThemeProvider>`,
    props: [{ name: 'address / nights', type: 'string[] / string', description: 'Colophon.' }],
  },
  {
    theme: 'triplicate',
    slot: 'cta',
    title: 'CTA',
    description: 'The sheet presses 8px, then hard-cuts white, canary, pink. Pink already says Filed.',
    path: 'src/themes/triplicate/cta.tsx',
    usage: `import { ThemeProvider } from '@/themes/provider'\nimport { triplicate } from '@/themes/themes'\nimport { TriplicateCta } from '@/themes/triplicate/cta'\n\n<ThemeProvider theme={triplicate}><TriplicateCta /></ThemeProvider>`,
    props: [
      { name: 'fields', type: '{ name, label }[]', description: 'What gets written.' },
      { name: 'institution', type: 'string', description: 'Serif, once.' },
    ],
  },
]
