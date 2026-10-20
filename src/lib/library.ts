export const NX_TIERS = ['basic', 'intermediate', 'advanced'] as const
export type NxTier = (typeof NX_TIERS)[number]

export type VariantMeta<Id extends string = string> = {
  id: Id
  title: string
  tier: NxTier
  note: string
}

export function asText(node: unknown): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node)
  return ''
}

export function nxVar(name: string, fallback = 'inherit') {
  return `var(--nx-${name},${fallback})`
}
