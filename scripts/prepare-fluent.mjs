import { readdir, readFile, mkdir, writeFile } from 'node:fs/promises'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), '..')
const config = JSON.parse(await readFile(join(rootDir, 'now.config.json'), 'utf8'))
const scope = config.scope

if (!/^(x|sn)_[a-z0-9_]+$/.test(scope) || scope.length < 4 || scope.length > 18) {
    throw new Error('now.config.json scope must match x_<name> or sn_<name> and be 4 to 18 characters long.')
}

if (`${scope}_asset_req`.length > 30) {
    throw new Error('The configured scope makes the longest BJIT ERP table name exceed ServiceNow’s 30-character limit.')
}

async function findTemplates(directory) {
    const entries = await readdir(directory, { withFileTypes: true })
    const files = await Promise.all(entries.map(async (entry) => {
        const path = join(directory, entry.name)
        return entry.isDirectory() ? findTemplates(path) : path.endsWith('.now.ts.template') ? [path] : []
    }))
    return files.flat()
}

const templateRoot = join(rootDir, 'src', 'fluent-templates')
const outputRoot = join(rootDir, 'src', 'fluent')
const templates = await findTemplates(templateRoot)

if (!templates.length) {
    throw new Error(`No Fluent templates found in ${templateRoot}.`)
}

for (const templatePath of templates) {
    const outputPath = join(
        outputRoot,
        relative(templateRoot, templatePath).replace(/\.template$/, ''),
    )
    const source = await readFile(templatePath, 'utf8')
    const generated = source.replaceAll('__SCOPE__', scope)

    if (generated.includes('__SCOPE__')) {
        throw new Error(`Unexpanded scope token in ${relative(rootDir, templatePath)}.`)
    }

    await mkdir(dirname(outputPath), { recursive: true })
    await writeFile(outputPath, generated)
}

console.log(`Generated ${templates.length} Fluent files for scope ${scope}.`)
