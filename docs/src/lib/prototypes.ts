/* HTML prototypes in /prototypes, one self-contained file each. The docs site
   lists them, previews them in an iframe and serves the file for download. */

const files = import.meta.glob('../../../prototypes/*.html', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

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

const meta = (html: string, name: string) => new RegExp(`<meta\\s+name=["']${name}["']\\s+content=["']([^"']*)["']`).exec(html)?.[1]

export const prototypes: Prototype[] = Object.entries(files)
  .map(([path, html]) => {
    const slug = path.split('/').pop()!.replace(/\.html$/, '')
    return {
      slug,
      title: /<title>([^<]*)<\/title>/.exec(html)?.[1] ?? slug,
      description: meta(html, 'description') ?? '',
      date: meta(html, 'date'),
      width: Number(meta(html, 'width') ?? 1440),
      html,
      bytes: new Blob([html]).size,
    }
  })
  .sort((a, b) => (b.date ?? '').localeCompare(a.date ?? '') || a.title.localeCompare(b.title))

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
