/* Example model shared by the per-component example files. */

export type Layout = 'center' | 'start' | 'column' | 'fill'
export type Stage = 'canvas' | 'sidebar' | 'panel'

export interface Example {
  id: string
  title: string
  description?: string
  /** Full HTML, with inline SVG assets expanded. */
  html: string
  layout?: Layout
  stage?: Stage
  tall?: boolean
  /** A short line under the code, e.g. "hover is forced with data-state". */
  note?: string
}

export interface ComponentExamples {
  hero: Omit<Example, 'id' | 'title'> & { id?: string; title?: string }
  examples: Example[]
}

/** Strip the common indentation of a template literal. */
export function dedent(s: string): string {
  const lines = s.replace(/^\n/, '').replace(/\s+$/, '').split('\n')
  const indents = lines.filter((l) => l.trim()).map((l) => /^\s*/.exec(l)![0].length)
  const min = indents.length ? Math.min(...indents) : 0
  return lines.map((l) => l.slice(min)).join('\n')
}

/**
 * The HTML shown in the Code tab: inline SVG bodies collapsed to `…`, the way
 * the specs write them, so the markup that matters stays readable. The Copy
 * button always copies the full HTML.
 */
export function displayHtml(html: string): string {
  return html.replace(/<svg\b([^>]*)>[\s\S]*?<\/svg>/g, (_m, attrs: string) => {
    const cls = /\sclass="([^"]*)"/.exec(attrs)?.[1]
    const keep = cls ? ` class="${cls}"` : ''
    return `<svg${keep} aria-hidden="true">…</svg>`
  })
}

/** Join a list of HTML fragments as siblings. */
export function siblings(...parts: string[]): string {
  return parts.map((p) => dedent(p)).join('\n')
}
