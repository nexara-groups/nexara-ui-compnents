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

function walkThemeFiles(dir, acc = []) {
  if (!existsSync(dir)) return acc
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name)
    if (entry.isDirectory()) walkThemeFiles(full, acc)
    else if (entry.name.endsWith('.ts') || entry.name.endsWith('.tsx')) acc.push(path.relative(root, full))
  }
  return acc
}

for (const rel of walkThemeFiles(path.join(root, 'src/themes'))) {
  if (!registered.has(rel)) errors.push(`Unregistered theme file: ${rel}`)
}

for (const item of registry.items ?? []) {
  if (item.type !== 'registry:theme') continue
  if (!item.theme || !item.component || !item.variant) {
    errors.push(`${item.name} needs theme, component, and variant`)
  }
}

const flagshipDir = path.join(root, 'src/components/flagship')
if (existsSync(flagshipDir)) {
  const flagshipFiles = readdirSync(flagshipDir).filter((file) => file.endsWith('.tsx') && file !== 'index.ts')
  for (const file of flagshipFiles) {
    const rel = `src/components/flagship/${file}`
    if (!registered.has(rel)) errors.push(`Unregistered component file: ${rel}`)
  }
}

if (!registered.has('src/lib/utils.ts')) {
  errors.push('src/lib/utils.ts is not in the registry')
}

for (const item of registry.items ?? []) {
  if (item.type !== 'registry:ui') continue
  if (!Array.isArray(item.variants) || item.variants.length < 10) {
    errors.push(`${item.name} needs at least 10 variants`)
    continue
  }
  const sourcePath = item.files?.[0]?.path
  const source = sourcePath ? readFileSync(path.join(root, sourcePath), 'utf8') : ''
  const seen = new Set()
  for (const variant of item.variants) {
    if (!variant.name || !variant.title || !variant.description || !variant.usage) {
      errors.push(`${item.name} variant is missing name, title, description, or usage`)
      continue
    }
    if (seen.has(variant.name)) errors.push(`${item.name} has a duplicate variant ${variant.name}`)
    seen.add(variant.name)
    if (!variant.usage.includes(variant.name)) {
      errors.push(`${item.name} usage for ${variant.name} does not mention that id`)
    }
    const quoted = source.includes(`'${variant.name}'`) || source.includes(`"${variant.name}"`)
    const key = new RegExp(`(?:^|\\n)\\s*${variant.name}\\s*:`).test(source)
    if (!quoted && !key) {
      errors.push(`${item.name} source is missing variant '${variant.name}'`)
    }
  }
}

if (errors.length > 0) {
  console.error(errors.join('\n'))
  process.exit(1)
}

console.log(`Registry OK (${registry.items.length} items)`)
