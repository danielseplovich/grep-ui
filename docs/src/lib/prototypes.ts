/* HTML prototypes in /prototypes. Any .html in that folder is bundled into one
   self-contained document by the docs build (see grepPrototypes in
   vite.config.ts); the site lists it, previews it and serves it for download. */

import files from 'virtual:prototypes'

export interface Prototype {
  slug: string
  title: string
  description: string
  date?: string
  /** The width the prototype was designed at; the preview scales it to fit. */
  width: number
  html: string
  bytes: number
}

export const prototypes: Prototype[] = (files as Prototype[]).slice().sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.title.localeCompare(b.title))

export const prototypeBySlug: Record<string, Prototype> = Object.fromEntries(prototypes.map((p) => [p.slug, p]))

export function downloadPrototype(p: Prototype) {
  const url = URL.createObjectURL(new Blob([p.html], { type: 'text/html' }))
  const a = document.createElement('a')
  a.href = url
  a.download = `${p.slug}.html`
  a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

export function openPrototype(p: Prototype) {
  const url = URL.createObjectURL(new Blob([p.html], { type: 'text/html' }))
  window.open(url, '_blank', 'noopener')
}
