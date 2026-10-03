// Turn an HTML file into one self-contained document: local stylesheets are
// inlined (following @import and url()), local images and fonts become data
// URIs, local scripts are inlined. Shared by the docs build (every file in
// /prototypes is bundled this way) and by bundle-prototype.mjs.
import { readFileSync, existsSync } from 'node:fs'
import { dirname, resolve, extname } from 'node:path'

const mime = { '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.gif': 'image/gif', '.webp': 'image/webp', '.woff2': 'font/woff2', '.woff': 'font/woff' }
const isLocal = (p) => p && !/^(https?:|data:|\/\/|#|mailto:)/.test(p)

function dataUri(file) {
  const ext = extname(file).toLowerCase()
  return `data:${mime[ext] ?? 'application/octet-stream'};base64,${readFileSync(file).toString('base64')}`
}

function flattenCss(file, seen, deps) {
  if (seen.has(file)) return ''
  seen.add(file)
  deps.add(file)
  const dir = dirname(file)
  let css = readFileSync(file, 'utf8')
  css = css.replace(/@import\s+(?:url\()?["']?([^"')]+)["']?\)?\s*;/g, (m, p) => (isLocal(p) ? flattenCss(resolve(dir, p), seen, deps) : m))
  css = css.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (m, p) => {
    if (!isLocal(p)) return m
    const f = resolve(dir, p)
    return existsSync(f) ? `url(${dataUri(f)})` : m
  })
  return css
}

/** @returns {{ html: string, deps: Set<string> }} the bundled HTML and every local file it pulled in */
export function inlineHtml(file) {
  const srcDir = dirname(file)
  const deps = new Set()
  let html = readFileSync(file, 'utf8')

  html = html.replace(/<link\b[^>]*rel=["']stylesheet["'][^>]*>/g, (tag) => {
    const href = /href=["']([^"']+)["']/.exec(tag)?.[1]
    if (!isLocal(href)) return tag
    const f = resolve(srcDir, href)
    if (!existsSync(f)) return tag
    return `<style>\n${flattenCss(f, new Set(), deps)}\n</style>`
  })
  html = html.replace(/(src|href)=["']([^"']+)["']/g, (m, attr, p) => {
    if (!isLocal(p)) return m
    const f = resolve(srcDir, p)
    if (!existsSync(f) || !mime[extname(f).toLowerCase()]) return m
    deps.add(f)
    return `${attr}="${dataUri(f)}"`
  })
  html = html.replace(/<script\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)><\/script>/g, (m, a, p, b) => {
    if (!isLocal(p)) return m
    const f = resolve(srcDir, p)
    if (!existsSync(f)) return m
    deps.add(f)
    return `<script${a}${b}>\n${readFileSync(f, 'utf8')}\n</script>`
  })
  html = html.replace(/<style\b[^>]*>([\s\S]*?)<\/style>/g, (m, css) =>
    m.replace(css, css.replace(/url\(\s*["']?([^"')]+)["']?\s*\)/g, (mm, p) => {
      if (!isLocal(p) || p.startsWith('data:')) return mm
      const f = resolve(srcDir, p)
      if (!existsSync(f)) return mm
      deps.add(f)
      return `url(${dataUri(f)})`
    })),
  )
  return { html, deps }
}

const meta = (html, name) => new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`).exec(html)?.[1]

/** Title, description, width and date: from the file's own <title>/<meta> tags, with fallbacks. */
export function readMeta(html, slug, mtime) {
  return {
    title: /<title>([^<]*)<\/title>/.exec(html)?.[1]?.trim() || slug.replace(/[-_]+/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    description: meta(html, 'description') ?? '',
    date: meta(html, 'date') ?? new Date(mtime).toISOString().slice(0, 10),
    width: Number(meta(html, 'width') ?? 1440),
  }
}
