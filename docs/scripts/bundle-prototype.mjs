// Copy an HTML prototype into prototypes/ as one self-contained file.
//   node docs/scripts/bundle-prototype.mjs <source.html> <slug> [--title "…"] [--description "…"] [--width 1440]
// You do not need this to publish a prototype: any .html dropped into
// prototypes/ is bundled by the docs build. Use it when the source lives
// elsewhere (a test folder, a one-off) and you want a frozen copy.
import { writeFileSync, mkdirSync } from 'node:fs'
import { dirname, resolve, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { inlineHtml, readMeta } from './lib/inline-html.mjs'

const [, , src, slug, ...rest] = process.argv
if (!src || !slug) {
  console.error('usage: bundle-prototype.mjs <source.html> <slug> [--title "…"] [--description "…"] [--width 1440]')
  process.exit(1)
}
const opt = (k) => { const i = rest.indexOf(`--${k}`); return i >= 0 ? rest[i + 1] : undefined }
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')

let { html } = inlineHtml(resolve(src))
const m = readMeta(html, slug, Date.now())
const title = opt('title') ?? m.title
const description = opt('description') ?? m.description
const width = opt('width') ?? String(m.width)
const date = new Date().toISOString().slice(0, 10)
html = html.replace(/<title>[^<]*<\/title>/, '').replace(/<meta\s+name=["'](description|date|prototype|width)["'][^>]*>\s*/g, '')
const meta = `<title>${title}</title>\n<meta name="description" content="${description.replace(/"/g, '&quot;')}">\n<meta name="date" content="${date}">\n<meta name="width" content="${width}">`
html = html.includes('<head>') ? html.replace('<head>', `<head>\n${meta}`) : `${meta}\n${html}`

const out = join(root, 'prototypes', `${slug}.html`)
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, html)
console.log(`wrote ${out.replace(root + '/', '')} (${(html.length / 1024).toFixed(0)} KB)`)
