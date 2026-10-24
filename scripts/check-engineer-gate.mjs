import { readFileSync } from 'node:fs'
import { boldThemes } from '../src/themes/bold.ts'
import { contrast, guardColors, hexToHsv, hsvToHex } from '../src/themes/color.ts'
import { filterOptions, stepCalendar, stepCursor } from '../src/themes/kit/keys.ts'

const failures = []
function check(name, ok) {
  if (!ok) failures.push(name)
}

const first = new Date(2026, 9, 1).getDay()
check('october starts thursday', first === 4)
check('arrow right', stepCalendar(12, 31, first, 'ArrowRight') === 13)
check('arrow left clamps', stepCalendar(1, 31, first, 'ArrowLeft') === 1)
check('arrow up week', stepCalendar(12, 31, first, 'ArrowUp') === 5)
check('arrow down week', stepCalendar(12, 31, first, 'ArrowDown') === 19)
check('arrow down clamps', stepCalendar(30, 31, first, 'ArrowDown') === 31)
check('home starts the week', stepCalendar(12, 31, first, 'Home') === 11)
check('end finishes the week', stepCalendar(12, 31, first, 'End') === 17)
check('home on the first row', stepCalendar(1, 31, first, 'Home') === 1)
check('end on the first row', stepCalendar(1, 31, first, 'End') === 3)
check('escape blurs', stepCalendar(12, 31, first, 'Escape') === 'blur')
check('enter stays on the button', stepCalendar(12, 31, first, 'Enter') === null)

const clinics = ['North', 'North clinic', 'South clinic', 'Saturday group']
check('typeahead filters', filterOptions(clinics, 'nor').join('|') === 'North|North clinic')
check('empty query lists all', filterOptions(clinics, '  ').length === 4)
check('arrow wraps the list', stepCursor(0, 4, 'ArrowUp') === 3)
check('arrow moves down', stepCursor(0, 4, 'ArrowDown') === 1)
check('enter picks', stepCursor(1, 4, 'Enter') === 'pick')
check('escape closes', stepCursor(1, 4, 'Escape') === 'close')

check('red hue', Math.round(hexToHsv('#ff0000').h) === 0 && hexToHsv('#ff0000').s === 1)
check('bronze roundtrip', hsvToHex(hexToHsv('#b45309').h, hexToHsv('#b45309').s, hexToHsv('#b45309').v) === '#b45309')
check('white roundtrip', hsvToHex(hexToHsv('#ffffff').h, hexToHsv('#ffffff').s, hexToHsv('#ffffff').v) === '#ffffff')

const blocked = guardColors(
  { bg: '#ffffff', fg: '#ffffff', surface: '#ffffff', accent: '#ffffff', accentFg: '#ffffff', mark: '#ffffff', success: '#ffffff', warn: '#ffffff', danger: '#ffffff' },
  { bg: '#000000', fg: '#ffffff', surface: '#111111', accent: '#ffffff', accentFg: '#000000', mark: '#b45309', success: '#1f8a4c', warn: '#b45309', danger: '#ff1f3d' },
)
check('guard keeps the previous colours', blocked.colors.bg === '#000000' && blocked.reason?.includes('4.5'))

for (const theme of boldThemes) {
  for (const scheme of ['dark', 'light']) {
    const colors = theme.colors[scheme]
    const guarded = {
      bg: colors.bg,
      fg: colors.fg,
      surface: colors.surface,
      accent: colors.accent,
      accentFg: colors.accentFg,
      mark: colors.mark,
      success: colors.success,
      warn: colors.warn,
      danger: colors.danger,
    }
    const result = guardColors(guarded, guarded)
    check(`${theme.id} ${scheme} passes the guard`, result.reason === null)
    check(`${theme.id} ${scheme} text on background`, contrast(colors.fg, colors.bg) >= 4.5)
    check(`${theme.id} ${scheme} text on surface`, contrast(colors.fg, colors.surface) >= 4.5)
    check(`${theme.id} ${scheme} accent text`, contrast(colors.accentFg, colors.accent) >= 4.5)
    for (const key of ['mark', 'success', 'warn', 'danger']) {
      check(`${theme.id} ${scheme} ${key} on background`, contrast(colors[key], colors.bg) >= 3)
      check(`${theme.id} ${scheme} ${key} on surface`, contrast(colors[key], colors.surface) >= 3)
      check(`${theme.id} ${scheme} ${key} on text`, contrast(colors[key], colors.fg) >= 3)
    }
  }
}

check('orrery mark', boldThemes.find((theme) => theme.id === 'orrery').colors.dark.mark === '#b45309')
check('rally day fill', boldThemes.find((theme) => theme.id === 'rally').colors.light.accent === '#9a3412')
check('rally night fill', boldThemes.find((theme) => theme.id === 'rally').colors.dark.accent === '#ff5a36')
check('rally night ground', boldThemes.find((theme) => theme.id === 'rally').colors.dark.bg === '#1a1240')
check('status success', boldThemes[0].colors.dark.success === '#1f8a4c')
check('status warn', boldThemes[0].colors.dark.warn === '#b45309')
check('status danger', boldThemes[0].colors.dark.danger === '#ff1f3d')

const files = [
  'src/themes/show/rings.tsx',
  'src/themes/kit/button.tsx',
  'src/themes/kit/fields.tsx',
  'src/themes/kit/overlays.tsx',
  'src/themes/kit/editor.tsx',
  'src/themes/kit/stage.tsx',
  'src/themes/animations/library.tsx',
  'src/index.css',
]
const source = files.map((file) => readFileSync(new URL(`../${file}`, import.meta.url), 'utf8')).join('\n')
const themes = readFileSync(new URL('../src/themes/show/rings.tsx', import.meta.url), 'utf8')
const button = readFileSync(new URL('../src/themes/kit/button.tsx', import.meta.url), 'utf8')
const fields = readFileSync(new URL('../src/themes/kit/fields.tsx', import.meta.url), 'utf8')
const overlays = readFileSync(new URL('../src/themes/kit/overlays.tsx', import.meta.url), 'utf8')
const editor = readFileSync(new URL('../src/themes/kit/editor.tsx', import.meta.url), 'utf8')
const stage = readFileSync(new URL('../src/themes/kit/stage.tsx', import.meta.url), 'utf8')

check('no backdrop-filter', !source.includes('backdrop-filter') && !source.includes('backdrop-blur'))
check('no blur filter', !/(?<![.\w])blur\(/.test(source))
check('no goo filter', !/feGaussianBlur|filter:\s*url\(#goo|svg[^>]+goo/.test(source))
check('no document pointer listener', !/addEventListener\(\s*['"]pointer/.test(source))
check('no continuous webgl', !source.includes('frameloop="always"') && !source.includes("frameloop: 'always'"))
check('webgl demand', themes.includes('frameloop="demand"') && themes.includes('dpr={[1, 1.25]}') && themes.includes('invalidate'))
check('confetti is 12 nodes after enrol', button.includes('length: 12') && stage.includes("personality === 'tactile' && enrolled"))
check('drop frame file input', fields.includes('type="file"') && fields.includes('minHeight: 44') && fields.includes('absolute inset-0') && !fields.includes('className="sr-only" type="file"'))
check('command dialog', overlays.includes('role="dialog"') && overlays.includes('Command search') && overlays.includes('useMenuDialog'))
check('context menu key', overlays.includes("event.key === 'ContextMenu'") && overlays.includes('ArrowDown') && overlays.includes('role="menu"'))
check('split button and fab', button.includes('export function SplitButton') && button.includes('export function Fab') && button.includes('aria-label={label}'))
check('spinner name', button.includes('sr-only">Loading') && button.includes('nx-motion'))
check('editor square hue hex', editor.includes('square') && editor.includes('hue') && editor.includes('hex') && editor.includes('guardColors'))

if (failures.length) {
  console.error(failures.join('\n'))
  process.exit(1)
}
console.log('engineer gate checks passed')
