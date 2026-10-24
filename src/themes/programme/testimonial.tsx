'use client'

export type ProgrammeVoice = { id: string; quote: string; name: string; detail: string }

const defaultVoices: ProgrammeVoice[] = [
  {
    id: 'a',
    quote: 'I can see the kickoff from the car park. Nobody made me download a thing.',
    name: 'Helen Adeyemi',
    detail: 'U12 parent',
  },
  {
    id: 'b',
    quote: 'The fee was on the sheet before I filled the form. That was the whole pitch.',
    name: 'Marcus Bell',
    detail: 'Household member',
  },
]

export function ProgrammeTestimonial({
  kicker = 'Notes from the stand',
  voices = defaultVoices,
}: {
  kicker?: string
  voices?: ProgrammeVoice[]
}) {
  return (
    <section id="academy" className="border-t" style={{ borderColor: 'var(--nx-line)' }} aria-labelledby="programme-voices-title">
      <div className="mx-auto max-w-6xl px-4 py-16 md:px-8 md:py-24">
        <h2 id="programme-voices-title" className="nx-mono text-[11px] tracking-[0.16em] uppercase" style={{ color: 'var(--nx-muted)' }}>
          {kicker}
        </h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {voices.map((voice) => (
            <figure key={voice.id} className="border p-5" style={{ borderColor: 'var(--nx-fg)' }}>
              <blockquote className="text-xl leading-snug md:text-2xl">{voice.quote}</blockquote>
              <figcaption className="mt-6 text-sm">
                <span className="block font-semibold">{voice.name}</span>
                <span className="nx-mono text-[11px] tracking-[0.12em] uppercase" style={{ color: 'var(--nx-muted)' }}>
                  {voice.detail}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}
