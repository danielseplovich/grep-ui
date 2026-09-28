import type { Tokens } from 'marked'
import { lex, render, renderInline, plainText, slugify } from './markdown'

export interface DocSection {
  id: string
  heading: string
  headingHtml: string
  html: string
}

export interface Doc {
  title: string
  /** Everything between the h1 and the first h2. */
  introHtml: string
  sections: DocSection[]
}

/** Split a library markdown file (AGENTS.md, RULES.md, DESIGN.md…) by its h2 headings. */
export function parseDoc(md: string): Doc {
  const tokens = lex(md)
  let title = ''
  const intro: Tokens.Generic[] = []
  const sections: DocSection[] = []
  let current: { heading: string; headingHtml: string; body: Tokens.Generic[] } | null = null
  const used = new Set<string>()

  const flush = () => {
    if (!current) return
    let id = slugify(current.heading)
    let n = 2
    while (used.has(id)) id = `${slugify(current.heading)}-${n++}`
    used.add(id)
    sections.push({ id, heading: current.heading, headingHtml: current.headingHtml, html: render(current.body) })
    current = null
  }

  for (const t of tokens) {
    if (t.type === 'heading' && (t as Tokens.Heading).depth === 1 && !title) {
      title = plainText((t as Tokens.Heading).text)
      continue
    }
    if (t.type === 'heading' && (t as Tokens.Heading).depth === 2) {
      flush()
      const h = t as Tokens.Heading
      current = { heading: plainText(h.text), headingHtml: renderInline(h.text), body: [] }
      continue
    }
    if (current) current.body.push(t)
    else intro.push(t)
  }
  flush()
  return { title, introHtml: render(intro), sections }
}

export function section(doc: Doc, heading: string | RegExp): DocSection | undefined {
  return doc.sections.find((s) => (typeof heading === 'string' ? s.heading === heading : heading.test(s.heading)))
}

/** Pull the h3-level subsections out of one section's markdown (DESIGN.md > Color has several). */
export function subsections(md: string, h2: string): DocSection[] {
  const tokens = lex(md)
  const out: DocSection[] = []
  let inside = false
  let current: { heading: string; headingHtml: string; body: Tokens.Generic[] } | null = null
  const flush = () => {
    if (!current) return
    out.push({ id: slugify(current.heading), heading: current.heading, headingHtml: current.headingHtml, html: render(current.body) })
    current = null
  }
  for (const t of tokens) {
    if (t.type === 'heading') {
      const h = t as Tokens.Heading
      if (h.depth <= 2) {
        flush()
        inside = h.depth === 2 && plainText(h.text) === h2
        continue
      }
      if (inside && h.depth === 3) {
        flush()
        current = { heading: plainText(h.text), headingHtml: renderInline(h.text), body: [] }
        continue
      }
    }
    if (inside && current) current.body.push(t)
  }
  flush()
  return out
}
