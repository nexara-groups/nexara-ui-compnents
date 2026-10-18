import type { ComponentType } from 'react'
import {
  ActivityDemo,
  AppShellDemo,
  CaseStudyDemo,
  ChaptersDemo,
  ChartBlockDemo,
  CommandPaletteDemo,
  ContactDemo,
  CountdownDemo,
  CtaBandDemo,
  DataTableDemo,
  KanbanBoardDemo,
  KitDemo,
  KpiDemo,
  LeaderboardDemo,
  LogoCloudDemo,
  NewsDemo,
  ProcessDemo,
  ServicesDemo,
  SettingsPanelDemo,
  StatsDemo,
  TeamDemo,
} from '@/docs/demos.tsx'

const styleDeps = ['clsx', 'tailwind-merge']

function entry(
  slug: string,
  name: string,
  category: string,
  description: string,
  variants: string,
  Demo: ComponentType,
) {
  const pascal = name.replace(/\s/g, '')
  return {
    slug,
    name,
    category,
    description,
    path: `src/components/ui/${slug}.tsx`,
    dependencies: styleDeps,
    registryDependencies: ['utils'],
    usage: `import { ${pascal} } from '@/components/ui/${slug}'\n\nexport function Example() {\n  return <${pascal} />\n}`,
    props: [{ name: 'variant', type: variants, description: 'Anatomy. See the gallery for each construction.' }],
    Demo,
  }
}

export const catalogMore: ReturnType<typeof entry>[] = [
  entry('stats', 'Stats', 'Sections', 'Count-up figures for climate, care, and sport desks.', 'countup | ribbon | ticker | year | split | dark | sports | clinic | stacked | compare | mosaic | live', StatsDemo),
  entry('countdown', 'Countdown', 'Sections', 'Event, race, exam, and launch clocks.', 'event | flip | circular | inline | poster | race | exam | launch | match | ribbon | minimal | analog', CountdownDemo),
  entry('leaderboard', 'Leaderboard', 'Sections', 'Medal tallies, podiums, and club points.', 'medals | table | podium | clubs | tally | heat | compact | nation | age | live | points | disciplines', LeaderboardDemo),
  entry('case-study', 'Case Study', 'Sections', 'Tabbed client carousel and twelve case anatomies.', 'tabs | autoplay | stack | film | split | mosaic | quote | before | logo | index | featured | reel', CaseStudyDemo),
  entry('services', 'Services', 'Sections', 'HVAC checklists, four crews, clinic doors, why-us.', 'checklist | four-crews | doors | cards | numbered | icons | rows | hover | compact | partner | why | disciplines', ServicesDemo),
  entry('process', 'Process', 'Sections', 'Written studio steps and a three-step clinic rhythm.', 'written | three | timeline | numbered | rail | cards | brief | weekly | handover | rhythm | checklist | filmstrip', ProcessDemo),
  entry('team', 'Team', 'Sections', 'Doctors, crews, faculty, and coaches.', 'doctors | grid | featured | list | crew | faculty | coaches | circle | directory | compact | editorial | hours', TeamDemo),
  entry('contact', 'Contact', 'Sections', 'Branches, maps, appointment, and emergency desk.', 'branches | map | appointment | split | offices | hours | form | directions | emergency | studio | compact | visit', ContactDemo),
  entry('cta-band', 'Cta Band', 'Sections', 'Closing bands for clinic, studio, plant, and events.', 'appointment | lime | split | dark | form | store | partner | waitlist | quote | emergency | studio | event', CtaBandDemo),
  entry('chapters', 'Chapters', 'Sections', 'Scroll-driven storytelling, including eight clinic chapters.', 'eight | scrolly | rail | cards | film | numbered | essay | split | sticky | accordion | manifesto | lesson', ChaptersDemo),
  entry('news', 'News', 'Sections', 'Bulletins, notes, and magazine cards.', 'bulletin | cards | list | featured | ticker | magazine | compact | video | digest | alert | editorial | feed', NewsDemo),
  entry('logo-cloud', 'Logo Cloud', 'Sections', 'Dealer, client, and press marks.', 'dealers | strip | grid | marquee | grayscale | partner | press | clients | compact | invert | stacked | badges', LogoCloudDemo),
  entry('app-shell', 'App Shell', 'App', 'Portal layouts for Agency OS and industry desks.', 'sidebar | rail | top | split | dense | agency | clinic | sports | academy | collapsed | command | mobile', AppShellDemo),
  entry('kpi', 'Kpi', 'App', 'Dashboard metric tiles.', 'metric | spark | delta | progress | ring | compare | live | currency | queue | health | target | stack', KpiDemo),
  entry('data-table', 'Data Table', 'App', 'Filterable tables for leads, patients, jobs, athletes.', 'filter | compact | invoices | patients | jobs | athletes | leads | inventory | tickets | dense | grouped | export', DataTableDemo),
  entry('kanban-board', 'Kanban Board', 'App', 'Agency, plant, clinic, and race boards.', 'agency | jobs | care | events | studio | compact | swim | priority | owners | wip | simple | review', KanbanBoardDemo),
  entry('chart-block', 'Chart Block', 'App', 'SVG charts with no chart library.', 'area | bars | line | donut | compare | funnel | heat | stack | spark | goal | mix | clock', ChartBlockDemo),
  entry('activity', 'Activity', 'App', 'Feeds, audit logs, and clinic events.', 'feed | compact | chat | audit | tickets | care | sports | deploy | mentions | files | timeline | digest', ActivityDemo),
  entry('command-palette', 'Command Palette', 'App', 'Jump menus for pages, patients, jobs, athletes.', 'default | pages | jump | create | search | patients | jobs | athletes | settings | recent | empty | help', CommandPaletteDemo),
  entry('settings-panel', 'Settings Panel', 'App', 'Profile, billing, clinic, and danger settings.', 'profile | team | billing | appearance | notifications | security | api | clinic | branches | compact | danger | integrations', SettingsPanelDemo),
  entry('kit', 'Kit', 'Kits', 'Industry pages: healthcare, HVAC, sports, agency, academy.', 'healthcare | hvac | sports | agency | academy | portal | pharmacy | events | dealer | lab | studio | association', KitDemo),
]
