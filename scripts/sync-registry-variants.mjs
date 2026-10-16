import { readFileSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const metaUrl = pathToFileURL(path.join(root, 'src/docs/variant-meta.ts')).href
const { variantDocs } = await import(metaUrl)
const registryPath = path.join(root, 'registry.json')
const registry = JSON.parse(readFileSync(registryPath, 'utf8'))

for (const item of registry.items) {
  const docs = variantDocs[item.name]
  if (!docs) continue
  item.variants = docs.map((variant) => ({
    name: variant.id,
    title: variant.name,
    description: variant.description,
    usage: variant.usage,
  }))
  const names = docs.map((variant) => variant.id).join(', ')
  if (!String(item.description).includes('Variants:')) {
    item.description = `${item.description} Variants: ${names}.`
  }
}

writeFileSync(registryPath, `${JSON.stringify(registry, null, 2)}\n`)
console.log('Synced variants into registry.json')
