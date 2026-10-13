import { existsSync, readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const registry = JSON.parse(readFileSync(path.join(root, 'registry.json'), 'utf8'))
const errors = []
const names = new Set()
const registered = new Set()

if (!Array.isArray(registry.items) || registry.items.length === 0) {
  errors.push('registry.json is missing items')
}

for (const item of registry.items ?? []) {
  if (!item.name || !item.type || !item.title || !item.description) {
    errors.push(`Item is missing name, type, title, or description: ${item.name ?? '(unnamed)'}`)
  }
  if (names.has(item.name)) errors.push(`Duplicate registry name: ${item.name}`)
  names.add(item.name)
  if (!Array.isArray(item.files) || item.files.length === 0) {
    errors.push(`${item.name} has no files`)
  }
  if (!Array.isArray(item.dependencies)) {
    errors.push(`${item.name} dependencies must be an array`)
  }
  if (typeof item.usage !== 'string' || item.usage.trim().length === 0) {
    errors.push(`${item.name} is missing a usage example`)
  }
  for (const file of item.files ?? []) {
    registered.add(file.path)
    if (!existsSync(path.join(root, file.path))) {
      errors.push(`${item.name} points at a missing file: ${file.path}`)
    }
  }
}

const uiDir = path.join(root, 'src/components/ui')
const componentFiles = readdirSync(uiDir).filter((file) => file.endsWith('.tsx') && file !== 'index.ts')
for (const file of componentFiles) {
  const rel = `src/components/ui/${file}`
  if (!registered.has(rel)) errors.push(`Unregistered component file: ${rel}`)
}

if (!registered.has('src/lib/utils.ts')) {
  errors.push('src/lib/utils.ts is not in the registry')
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Registry OK (${registry.items.length} items)`)
