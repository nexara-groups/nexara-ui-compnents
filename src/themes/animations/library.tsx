'use client'

import { useLevel } from '@/themes/kit/level.ts'
import { ThemeProvider } from '@/themes/provider.tsx'
import { boldThemes } from '@/themes/bold.ts'
import { useEffect, useState } from 'react'

const items = [
  { name: 'Blob', owner: 'Lagoon', note: 'Two discs drift behind an opaque plate. The word stays still. Off shows the resting discs.' },
  { name: 'Clip reveal', owner: 'Strike', note: 'The line rises inside a crop. The full string is the accessible name.' },
  { name: 'Marquee', owner: 'Strike', note: 'One line, a hard crop. Pause on this page stops it. It is never a button label.' },
  { name: 'Split-flap', owner: 'Strike', note: 'Glyphs rotateX, 90ms linear, staggered 16ms.' },
  { name: 'Parallax rings', owner: 'Orrery', note: 'Three strokes turn a few degrees. The kit page uses the WebGL set when motion is rich.' },
  { name: 'Sticky scene', owner: 'Orrery', note: 'The ring pins, then eases. Labels do not move with it.' },
  { name: 'Stagger squash', owner: 'Rally', note: 'Shells squash 40ms apart. The words do not scale.' },
  { name: 'Scramble', owner: 'Array', note: 'One left-to-right step on a single timer. It settles on the word.' },
  { name: 'Scan', owner: 'Array', note: 'A rule draws with scaleX. It does not cross the word.' },
  { name: 'Step digits', owner: 'Array', note: 'Three frames, then the integer. Not a count-up tween.' },
  { name: 'Scroll progress', owner: 'Array', note: 'The 1px rule at the top follows this page.' },
]

export function AnimationLibrary() {
  const [paused, setPaused] = useState(false)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight)
      setProgress(window.scrollY / max)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div className="space-y-8">
      <div className="sticky top-0 z-10 h-px origin-left" style={{ background: '#9ee7ff', transform: `scaleX(${progress})` }} />
      <header>
        <h1 className="font-serif text-4xl">Animations</h1>
        <p className="mt-2 max-w-2xl text-zinc-300">Each primitive belongs to one theme. Spotlight, beams, magnetic targets, and a generic count-up are not in this library.</p>
        <button type="button" className="mt-4 h-11 border border-white/20 px-3" onClick={() => setPaused((value) => !value)}>{paused ? 'Play' : 'Pause'}</button>
      </header>
      <ul className="grid gap-4">
        {items.map((item) => {
          const theme = boldThemes.find((entry) => entry.name === item.owner) ?? boldThemes[0]
          return (
            <li key={item.name} className="border border-white/10">
              <div className="flex items-center justify-between px-4 py-3 text-sm text-zinc-300">
                <span>{item.name}</span>
                <span>{item.owner}</span>
              </div>
              <ThemeProvider theme={theme} scheme="dark" intensity={paused ? 'off' : 'rich'}>
                <div className="px-4 py-6">
                  <Demo name={item.name} />
                  <p className="mt-3 text-sm" style={{ color: 'var(--nx-muted)' }}>{item.note}</p>
                </div>
              </ThemeProvider>
              <pre className="overflow-x-auto border-t border-white/10 p-4 text-xs text-zinc-300">{`<${item.name.replaceAll(' ', '')} />`}</pre>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function Demo({ name }: { name: string }) {
  const level = useLevel()
  const moving = level !== 'off'
  if (name === 'Blob') {
    return (
      <div className="relative h-24 overflow-hidden">
        <span aria-hidden className="nx-motion absolute top-2 left-2 h-16 w-16 rounded-full" style={{ background: 'var(--nx-mark)', animation: moving ? 'nx-drift 2.4s var(--nx-ease) infinite' : undefined }} />
        <p className="relative inline-block px-3 py-6" style={{ background: 'var(--nx-bg)' }}>Book stays on the plate.</p>
      </div>
    )
  }
  if (name === 'Marquee') {
    const line = 'U10 09:30 · U12 11:00 · U14 13:30 · Gate from £4 · '
    return (
      <p className="overflow-hidden whitespace-nowrap tracking-[0.14em] uppercase" style={{ color: 'var(--nx-mark)' }}>
        <span className="nx-motion inline-block" style={{ animation: moving ? 'nx-marquee 8s linear infinite' : undefined }}>{line}{line}</span>
      </p>
    )
  }
  if (name === 'Clip reveal') {
    return (
      <p className="overflow-hidden text-4xl" aria-label="Riverside">
        <span className="nx-motion nx-display inline-block" style={{ animation: moving ? 'nx-rise 700ms cubic-bezier(0.16, 1, 0.3, 1) both' : undefined }} aria-hidden>Riverside</span>
      </p>
    )
  }
  if (name === 'Split-flap') {
    const word = 'Riverside'
    return (
      <p className="nx-display inline-flex text-4xl" aria-label={word} style={{ perspective: '600px' }}>
        {word.split('').map((glyph, index) => (
          <span key={`${glyph}-${index}`} aria-hidden className="nx-motion inline-block" style={{ transformOrigin: 'center bottom', animation: moving ? `nx-flap 90ms linear ${index * 16}ms both` : undefined }}>{glyph}</span>
        ))}
      </p>
    )
  }
  if (name === 'Parallax rings' || name === 'Sticky scene') {
    return (
      <div className="relative h-28" aria-hidden>
        <span className="nx-motion absolute top-6 left-8 h-16 w-16 rounded-full border" style={{ borderColor: 'var(--nx-mark)', animation: moving ? 'nx-orbit 2.8s linear infinite alternate' : undefined }} />
        <span className="absolute top-2 left-4 h-24 w-28 rounded-full border" style={{ borderColor: 'var(--nx-line)' }} />
      </div>
    )
  }
  if (name === 'Stagger squash') {
    return (
      <div className="flex gap-3">
        {['Join', 'Stay', 'Go'].map((word, index) => (
          <span key={word} className="relative inline-flex min-h-11 items-center px-3" style={{ color: 'var(--nx-accent-fg)' }}>
            <span aria-hidden className="nx-motion absolute inset-0" style={{ background: 'var(--nx-accent)', borderRadius: 'var(--nx-radius)', animation: moving ? `nx-slam 280ms cubic-bezier(0.34, 1.7, 0.64, 1) ${index * 40}ms both` : undefined }} />
            <span className="relative">{word}</span>
          </span>
        ))}
      </div>
    )
  }
  if (name === 'Scramble') return <Scramble />
  if (name === 'Step digits') return <StepDigits />
  if (name === 'Scan' || name === 'Scroll progress') {
    return (
      <div>
        <p className="mb-2">Call</p>
        <div className="h-px origin-left" style={{ background: 'var(--nx-line)' }}>
          <div className="nx-motion h-px origin-left" style={{ background: 'var(--nx-mark)', animation: moving ? 'nx-scan 900ms linear infinite' : 'none', transform: moving ? undefined : 'scaleX(1)' }} />
        </div>
      </div>
    )
  }
  return <p className="text-2xl">Join</p>
}

function Scramble() {
  const level = useLevel()
  const word = 'CALL'
  const [shown, setShown] = useState(word)
  useEffect(() => {
    if (level === 'off') {
      setShown(word)
      return
    }
    let step = 0
    const id = window.setInterval(() => {
      step += 1
      const next = word.split('').map((glyph, index) => (index < step ? glyph : '8')).join('')
      setShown(next)
      if (step >= word.length) window.clearInterval(id)
    }, 80)
    return () => window.clearInterval(id)
  }, [level])
  return <p className="nx-mono text-2xl" aria-label={word}>{shown}</p>
}

function StepDigits() {
  const level = useLevel()
  const frames = ['16', '17', '18']
  const [shown, setShown] = useState('18')
  useEffect(() => {
    if (level === 'off') {
      setShown('18')
      return
    }
    let step = 0
    setShown(frames[0])
    const id = window.setInterval(() => {
      step += 1
      setShown(frames[Math.min(step, frames.length - 1)])
      if (step >= frames.length - 1) window.clearInterval(id)
    }, 90)
    return () => window.clearInterval(id)
  }, [level])
  return <p className="nx-mono text-3xl" aria-label="18">{shown}</p>
}
