'use client'

import { lagoon } from '@/themes/bold.ts'
import type { MotionIntensity, ThemeScheme } from '@/themes/contract.ts'
import { LagoonBook } from '@/themes/lagoon/book.tsx'
import { LagoonDesk } from '@/themes/lagoon/desk.tsx'
import { LagoonLanding } from '@/themes/lagoon/landing.tsx'
import { screenHref, type LagoonScreen } from '@/themes/lagoon/nav.ts'
import { ThemeProvider } from '@/themes/provider.tsx'
import { useEffect, useState } from 'react'

const screens: { id: LagoonScreen; label: string }[] = [
  { id: 'landing', label: 'Landing' },
  { id: 'desk', label: 'Dashboard' },
  { id: 'book', label: 'Booking form' },
]

const titles: Record<LagoonScreen, string> = {
  landing: 'Tidewell Clinic, Indiranagar',
  desk: 'Tidewell Desk',
  book: 'Book a visit · Tidewell',
}

function readIntensity(): MotionIntensity {
  const value = typeof window === 'undefined' ? null : window.localStorage.getItem('nx-lagoon-motion')
  return value === 'off' || value === 'subtle' || value === 'rich' ? value : 'rich'
}

export function LagoonShowcase({ screen, scheme }: { screen: LagoonScreen; scheme: ThemeScheme }) {
  const [intensity, setIntensity] = useState<MotionIntensity>(readIntensity)
  const other: ThemeScheme = scheme === 'dark' ? 'light' : 'dark'

  useEffect(() => {
    window.localStorage.setItem('nx-lagoon-motion', intensity)
  }, [intensity])

  useEffect(() => {
    const previous = document.title
    document.title = titles[screen]
    return () => {
      document.title = previous
    }
  }, [screen])

  return (
    <>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 bg-black px-4 py-2 text-[12px] text-zinc-300" role="region" aria-label="Theme showcase controls">
        <a href="#themes/lagoon" className="text-zinc-400 no-underline hover:text-white">
          ← Lagoon theme
        </a>
        <nav aria-label="Showcase screens" className="flex gap-1">
          {screens.map((item) => (
            <a
              key={item.id}
              href={screenHref(item.id, scheme)}
              aria-current={item.id === screen ? 'page' : undefined}
              className={`inline-flex min-h-8 items-center rounded-full px-3 no-underline ${item.id === screen ? 'bg-white text-black' : 'text-zinc-300 hover:bg-white/10'}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="ml-auto flex flex-wrap items-center gap-3">
          <a href={screenHref(screen, other)} className="inline-flex min-h-8 items-center rounded-full border border-white/20 px-3 text-zinc-200 no-underline hover:bg-white/10">
            {other === 'light' ? 'Light scheme' : 'Dark scheme'}
          </a>
          <fieldset className="flex items-center gap-1">
            <legend className="sr-only">Motion</legend>
            <span aria-hidden className="mr-1 text-zinc-500">Motion</span>
            {(['off', 'subtle', 'rich'] as const).map((level) => (
              <label key={level} className={`inline-flex min-h-8 cursor-pointer items-center rounded-full px-3 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-white ${intensity === level ? 'bg-white text-black' : 'hover:bg-white/10'}`}>
                <input type="radio" name="lagoon-motion" value={level} checked={intensity === level} onChange={() => setIntensity(level)} className="sr-only" />
                {level}
              </label>
            ))}
          </fieldset>
        </div>
      </div>
      <ThemeProvider key={screen} theme={lagoon} scheme={scheme} intensity={intensity}>
        {screen === 'landing' ? <LagoonLanding /> : null}
        {screen === 'desk' ? <LagoonDesk /> : null}
        {screen === 'book' ? <LagoonBook /> : null}
      </ThemeProvider>
    </>
  )
}
