import { marked, type Renderer, type Tokens, type TokensList } from 'marked'
import { highlight } from './highlight'

/* ------------------------------------------------------------------ */
/* Helpers                                                              */
/* ------------------------------------------------------------------ */

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

export function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[`*_]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Plain text of an inline-markdown string (strips code ticks, emphasis, links). */
export function plainText(md: string): string {
  return md
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .replace(/[`*_]/g, '')
    .trim()
}

/* ------------------------------------------------------------------ */
/* Link rewriting                                                       */
/* ------------------------------------------------------------------ */

/** Specs link to sibling markdown files; map those onto site routes. */
export function rewriteHref(href: string): string {
  if (/^(https?:)?\/\//.test(href) || href.startsWith('#') || href.startsWith('/')) return href
  const clean = href.replace(/^(\.\.\/)+/, '').replace(/^\.\//, '')
  if (/grepmd\/RULES\.md/i.test(clean) || /^RULES\.md/i.test(clean)) return '/rules'
  if (/CONTRADICTIONS\.md/i.test(clean)) return '/contradictions'
  if (/DESIGN\.md/i.test(clean)) return '/'
  const comp = clean.match(/^(?:Components\/)?([a-z0-9-]+)\/[a-z0-9-]+\.md/i)
  if (comp) return `/components/${comp[1]}`
  return href
}

/* ------------------------------------------------------------------ */
/* Renderer                                                             */
/* ------------------------------------------------------------------ */

const rendererExt: Partial<Renderer> = {}

rendererExt.code = function ({ text, lang }: Tokens.Code) {
  const language = (lang || '').trim().toLowerCase()
  const body = highlight(text, language)
  const cls = language ? ` lang-${escapeHtml(language)}` : ''
  return (
    `<figure class="doc-code" data-lang="${escapeHtml(language)}">` +
    `<pre><code class="doc-code__body${cls}">${body}</code></pre>` +
    `<button type="button" class="grep-icon-btn grep-icon-btn--ghost grep-icon-btn--24 doc-code__copy" aria-label="Copy code" data-copy>` +
    `<svg class="grep-icon-btn__icon" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3.48338 2.08294C3.09678 2.08294 2.78338 2.39634 2.78338 2.78294V3.69522H2.05005V2.78294C2.05005 1.99133 2.69177 1.34961 3.48338 1.34961H4.21321V2.08294H3.48338Z" fill="currentColor"/><path d="M6.34654 2.08294H4.88689V1.34961H6.34654V2.08294Z" fill="currentColor"/><path d="M8.47987 2.08294H7.02022V1.34961H8.47987V2.08294Z" fill="currentColor"/><path d="M9.88338 2.08294H9.15356V1.34961H9.88338C10.675 1.34961 11.3167 1.99133 11.3167 2.78294V3.69522H10.5834V2.78294C10.5834 2.39634 10.27 2.08294 9.88338 2.08294Z" fill="currentColor"/><path d="M2.78338 4.53733V6.36189H2.05005V4.53733H2.78338Z" fill="currentColor"/><path d="M2.78338 7.204V9.02856H2.05005V7.204H2.78338Z" fill="currentColor"/><path d="M2.78338 9.87066V10.7829C2.78338 11.1695 3.09678 11.4829 3.48338 11.4829H4.21321V12.2163H3.48338C2.69177 12.2163 2.05005 11.5746 2.05005 10.7829V9.87066H2.78338Z" fill="currentColor"/><path d="M6.48338 4.51628H12.8834C13.4725 4.51628 13.9501 4.99384 13.9501 5.58294V13.5829C13.9501 14.172 13.4725 14.6496 12.8834 14.6496H6.48338C5.89428 14.6496 5.41672 14.172 5.41672 13.5829V5.58294C5.41672 4.99384 5.89428 4.51628 6.48338 4.51628Z" fill="currentColor"/></svg>` +
    `</button></figure>`
  )
}

rendererExt.link = function (this: Renderer, { href, title, tokens }: Tokens.Link) {
  const text = this.parser.parseInline(tokens)
  const h = rewriteHref(href)
  const external = /^https?:\/\//.test(h)
  const t = title ? ` title="${escapeHtml(title)}"` : ''
  const rel = external ? ' target="_blank" rel="noreferrer"' : ' data-internal'
  return `<a href="${escapeHtml(h)}"${t}${rel}>${text}</a>`
}

rendererExt.heading = function (this: Renderer, { tokens, depth }: Tokens.Heading) {
  const text = this.parser.parseInline(tokens)
  const id = slugify(plainText(tokens.map((t) => t.raw).join('')))
  return `<h${depth} id="${id}" class="doc-h${depth}">${text}</h${depth}>`
}

rendererExt.table = function (this: Renderer, { header, rows }: Tokens.Table) {
  const parser = this.parser
  const th = header
    .map((c) => `<th${c.align ? ` align="${c.align}"` : ''}>${parser.parseInline(c.tokens)}</th>`)
    .join('')
  const body = rows
    .map(
      (r) =>
        `<tr>${r
          .map((c) => `<td${c.align ? ` align="${c.align}"` : ''}>${parser.parseInline(c.tokens)}</td>`)
          .join('')}</tr>`,
    )
    .join('')
  return `<div class="doc-table-wrap"><table class="doc-table"><thead><tr>${th}</tr></thead><tbody>${body}</tbody></table></div>`
}

/* `avatar/avatar.md` in a spec or the contradictions log is a reference to a
   component page — make it one. */
rendererExt.codespan = function ({ text }: Tokens.Codespan) {
  const m = /^(?:Components\/)?([a-z0-9-]+)\/\1\.md$/.exec(text)
  const code = `<code>${text}</code>` // marked has already escaped codespan text
  return m ? `<a href="/components/${m[1]}" data-internal>${code}</a>` : code
}

marked.use({ renderer: rendererExt, gfm: true })

export function lex(md: string): TokensList {
  return marked.lexer(md)
}

export function render(tokens: TokensList | Tokens.Generic[]): string {
  return marked.parser(tokens as TokensList)
}

export function renderInline(md: string): string {
  return marked.parseInline(md) as string
}

export function renderMarkdown(md: string): string {
  return marked.parse(md) as string
}
