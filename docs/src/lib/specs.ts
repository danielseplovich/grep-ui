import type { Tokens } from 'marked'
import { lex, render, renderInline, plainText, slugify } from './markdown'

/* ------------------------------------------------------------------ */
/* Build-time import of every component spec in ../Components           */
/* ------------------------------------------------------------------ */

const specFiles = import.meta.glob('../../../Components/*/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const cssFiles = import.meta.glob('../../../Components/*/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type SectionKind =
  | 'markup'
  | 'reference'
  | 'guideline'
  | 'inferred'
  | 'notcovered'
  | 'contradiction'
  | 'corrections'

export interface SpecSection {
  id: string
  heading: string
  headingHtml: string
  kind: SectionKind
  html: string
  hasTable: boolean
  hasCode: boolean
}

export interface Spec {
  slug: string
  title: string
  /** Short descriptor under the title (first paragraph). */
  descriptionHtml: string
  descriptionText: string
  /** The "Source: …" paragraph, if any. */
  sourceHtml?: string
  /** A leading blockquote before the first h2 (Modal's "No Figma node" warning). */
  leadNoteHtml?: string
  /** First HTML code block anywhere — used as Usage when there is no Markup section. */
  usageHtml: string
  sections: SpecSection[]
  css: string
  /** Every `.grep-*` class name the component's stylesheet declares. */
  classes: string[]
}

function classify(heading: string, hasTable: boolean, hasCode: boolean): SectionKind {
  const h = heading.toLowerCase()
  if (/^markup/.test(h)) return 'markup'
  if (/^inferred/.test(h)) return 'inferred'
  if (/^not covered|^open questions/.test(h)) return 'notcovered'
  if (/contradiction|inconsistency|^a note on/.test(h)) return 'contradiction'
  if (/^corrections applied/.test(h)) return 'corrections'
  if (hasTable || hasCode) return 'reference'
  return 'guideline'
}

function parseSpec(slug: string, md: string, css: string): Spec {
  const tokens = lex(md)

  let title = slug
  let descriptionMd = ''
  let sourceMd: string | undefined
  let leadNoteTokens: Tokens.Generic[] = []
  const sections: SpecSection[] = []

  let i = 0
  // ---- head: h1, description, source, lead note -------------------
  for (; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'heading' && (t as Tokens.Heading).depth === 1) {
      title = plainText((t as Tokens.Heading).text)
      continue
    }
    if (t.type === 'heading' && (t as Tokens.Heading).depth === 2) break
    if (t.type === 'paragraph') {
      const text = (t as Tokens.Paragraph).text
      if (/^Source:/i.test(text)) sourceMd = text.replace(/^Source:\s*/i, '')
      else if (!descriptionMd) descriptionMd = text
      else leadNoteTokens.push(t)
      continue
    }
    if (t.type === 'blockquote') {
      leadNoteTokens.push(t)
      continue
    }
    if (t.type === 'space') continue
    leadNoteTokens.push(t)
  }

  // ---- sections by h2 ---------------------------------------------
  const usedIds = new Set<string>()
  let current: { heading: string; headingHtml: string; body: Tokens.Generic[] } | null = null
  const flush = () => {
    if (!current) return
    const hasTable = current.body.some((b) => b.type === 'table')
    const hasCode = current.body.some((b) => b.type === 'code')
    let id = slugify(current.heading)
    let n = 2
    while (usedIds.has(id)) id = `${slugify(current.heading)}-${n++}`
    usedIds.add(id)
    sections.push({
      id,
      heading: current.heading,
      headingHtml: current.headingHtml,
      kind: classify(current.heading, hasTable, hasCode),
      html: render(current.body),
      hasTable,
      hasCode,
    })
    current = null
  }
  for (; i < tokens.length; i++) {
    const t = tokens[i]
    if (t.type === 'heading' && (t as Tokens.Heading).depth === 2) {
      flush()
      const h = t as Tokens.Heading
      current = { heading: plainText(h.text), headingHtml: renderInline(h.text), body: [] }
      continue
    }
    if (t.type === 'hr' && !current) continue
    if (current) current.body.push(t)
  }
  flush()

  // ---- usage --------------------------------------------------------
  const markupSection = sections.find((s) => s.kind === 'markup')
  let usageHtml = markupSection?.html ?? ''
  if (!usageHtml) {
    const firstCode = tokens.find((t) => t.type === 'code' && /html/i.test((t as Tokens.Code).lang || '')) as
      | Tokens.Code
      | undefined
    if (firstCode) usageHtml = render([firstCode])
  }

  const classes = Array.from(new Set(css.match(/\.grep-[\w-]+/g) ?? [])).map((c) => c.slice(1)).sort()

  return {
    slug,
    title,
    descriptionHtml: renderInline(descriptionMd),
    descriptionText: plainText(descriptionMd),
    sourceHtml: sourceMd ? renderInline(sourceMd) : undefined,
    leadNoteHtml: leadNoteTokens.length ? render(leadNoteTokens) : undefined,
    usageHtml,
    sections,
    css,
    classes,
  }
}

function slugOf(path: string): string {
  const m = path.match(/Components\/([^/]+)\/[^/]+\.md$/)
  return m ? m[1] : path
}

export const specs: Spec[] = Object.entries(specFiles)
  .filter(([p]) => !/\/_/.test(slugOf(p)))
  .map(([path, md]) => {
    const slug = slugOf(path)
    const cssPath = Object.keys(cssFiles).find((p) => slugOf(p.replace(/\.css$/, '.md')) === slug)
    return parseSpec(slug, md, cssPath ? cssFiles[cssPath] : '')
  })
  .sort((a, b) => a.title.localeCompare(b.title))

export const specBySlug: Record<string, Spec> = Object.fromEntries(specs.map((s) => [s.slug, s]))

/* ------------------------------------------------------------------ */
/* Library-level markdown (AGENTS.md, RULES.md, CONTRADICTIONS.md)       */
/* ------------------------------------------------------------------ */

const libraryFiles = import.meta.glob(['../../../AGENTS.md', '../../../grepmd/*.md'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

function libFile(name: string): string {
  const key = Object.keys(libraryFiles).find((k) => k.endsWith('/' + name))
  return key ? libraryFiles[key] : ''
}

export const agentsMd = libFile('AGENTS.md')
export const rulesMd = libFile('RULES.md')
export const contradictionsMd = libFile('CONTRADICTIONS.md')
export const designMd = libFile('DESIGN.md')

/* ------------------------------------------------------------------ */
/* Library stylesheets, for the Foundations pages                       */
/* ------------------------------------------------------------------ */

const styleFiles = import.meta.glob('../../../grepmd/*.css', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export const tokensCss = Object.entries(styleFiles).find(([k]) => k.endsWith('tokens.css'))?.[1] ?? ''
export const effectsCss = Object.entries(styleFiles).find(([k]) => k.endsWith('effects.css'))?.[1] ?? ''
