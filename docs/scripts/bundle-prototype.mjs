// Bundle an HTML prototype into one self-contained file for prototypes/.
//   node docs/scripts/bundle-prototype.mjs <source.html> <slug> [--title "…"] [--description "…"] [--width 1440]
// Inlines local stylesheets (resolving @import), local images as data URIs,
// and stamps <title>, description and date so the docs site can list it.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs'
import { dirname, resolve, extname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const [, , src, slug, ...rest] = process.argv
if (!src || !slug) {
  console.error('usage: bundle-prototype.mjs <source.html> <slug> [--title "…"] [--description "…"]')
  process.exit(1)
}
const opt = (k) => { const i = rest.indexOf(`--${k}`); return i >= 0 ? rest[i + 1] : undefined }
const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const srcDir = dirname(resolve(src))
const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' }
const isLocal = (p) => p && !/^(https?:|data:|\/\/|#|mailto:)/.test(p)

function dataUri(file) {
  const ext = extname(file).toLowerCase()
  const buf = readFileSync(file)
  return `data:${mime[ext] ?? 'application/octet-stream'};base64,${buf.toString('base64')}`
}

// Flatten a CSS file: follow @import, inline url() assets.
function flattenCss(file, seen = new Set()) {
  if (seen.has(file)) return ''
  seen.add(file)
  const dir = dirname(file)
  let css = readFileSync(file, 'utf8')
  css = css.replace(/@import\s+(?:url\()?["']?([^"')]+)["']?\)?\s*;/g, (m, p) => (isLocal(p) ? flattenCss(resolve(dir, p), seen) : m))
  css = css.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (m, p) => {
    if (!isLocal(p)) return m
    const f = resolve(dir, p)
    return existsSync(f) ? `url(${dataUri(f)})` : m
  })
  return `/* ${file.replace(root + '/', '')} */\n${css}`
}

let html = readFileSync(src, 'utf8')

// stylesheets
html = html.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/g, (tag) => {
  const href = /href=["']([^"']+)["']/.exec(tag)?.[1]
  if (!isLocal(href)) return tag
  const f = resolve(srcDir, href)
  if (!existsSync(f)) return tag
  return `<style>\n${flattenCss(f)}\n</style>`
})
// images, scripts
html = html.replace(/(src|href)=["']([^"']+)["']/g, (m, attr, p) => {
  if (!isLocal(p)) return m
  const f = resolve(srcDir, p)
  if (!existsSync(f)) return m
  const ext = extname(f).toLowerCase()
  if (mime[ext]) return `${attr}="${dataUri(f)}"`
  if (ext === '.js' && attr === 'src') return m // handled below
  return m
})
html = html.replace(/<script\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)><\/script>/g, (m, a, p, b) => {
  if (!isLocal(p)) return m
  const f = resolve(srcDir, p)
  return existsSync(f) ? `<script${a}${b}>\n${readFileSync(f, 'utf8')}\n</script>` : m
})
// inline url() in <style> blocks
html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g, (m, css) =>
  m.replace(css, css.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (mm, p) => {
    if (!isLocal(p) || p.startsWith('data:')) return mm
    const f = resolve(srcDir, p)
    return existsSync(f) ? `url(${dataUri(f)})` : mm
  })),
)

// metadata
const title = opt('title') ?? /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? slug
const description = opt('description') ?? /<meta\s+name=["']description["']\s+content=["']([^"']*)["']/.exec(html)?.[1] ?? ''
const date = new Date().toISOString().slice(0, 10)
const width = opt('width') ?? /<meta\s+name=["']width["']\s+content=["'](\d+)["']/.exec(html)?.[1] ?? '1440'
html = html.replace(/<title>[^<]*<\/title>/, '').replace(/<meta\s+name=["'](description|date|prototype|width)["'][^>]*>\s*/g, '')
const meta = `<title>${title}</title>\n<meta name="description" content="${description.replace(/"/g, '&quot;')}">\n<meta name="date" content="${date}">\n<meta name="prototype" content="${slug}">\n<meta name="width" content="${width}">`
html = html.includes('<head>') ? html.replace('<head>', `<head>\n${meta}`) : `${meta}\n${html}`

const out = join(root, 'prototypes', `${slug}.html`)
mkdirSync(dirname(out), { recursive: true })
writeFileSync(out, html)
console.log(`wrote ${out.replace(root + '/', '')} (${(html.length / 1024).toFixed(0)} KB)`)
