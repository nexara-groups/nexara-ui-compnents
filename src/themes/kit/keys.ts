/** Keyboard steps for the calendar, combobox, and command list. No listeners live here. */

export function stepCalendar(day: number, days: number, firstWeekday: number, key: string): number | 'blur' | null {
  const clamp = (value: number) => Math.min(days, Math.max(1, value))
  if (key === 'ArrowLeft') return clamp(day - 1)
  if (key === 'ArrowRight') return clamp(day + 1)
  if (key === 'ArrowUp') return clamp(day - 7)
  if (key === 'ArrowDown') return clamp(day + 7)
  if (key === 'Home' || key === 'End') {
    const column = (day - 1 + firstWeekday) % 7
    const start = Math.max(1, day - column)
    const end = Math.min(days, day + (6 - column))
    return key === 'Home' ? start : end
  }
  if (key === 'Escape') return 'blur'
  return null
}

export function filterOptions(options: readonly string[], query: string) {
  const needle = query.trim().toLowerCase()
  if (!needle) return [...options]
  return options.filter((option) => option.toLowerCase().includes(needle))
}

export function stepCursor(index: number, length: number, key: string): number | 'pick' | 'close' | null {
  if (key === 'Escape') return 'close'
  if (key === 'Enter') return 'pick'
  if (length <= 0) return null
  if (key === 'ArrowDown') return (index + 1) % length
  if (key === 'ArrowUp') return (index - 1 + length) % length
  if (key === 'Home') return 0
  if (key === 'End') return length - 1
  return null
}
