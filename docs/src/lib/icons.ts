/* Every exported SVG asset in the library, keyed by file name (without .svg).
   Examples inline them so previews use the real exported glyphs. */

const svgFiles = import.meta.glob(['../../../Components/*/*.svg', '!../../../Components/_art/*.svg', '!../../../Components/_brand/*.svg'], {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

const registry: Record<string, string> = {}
for (const [path, raw] of Object.entries(svgFiles)) {
  const name = path.split('/').pop()!.replace(/\.svg$/, '')
  registry[name] = raw.trim()
}

export const iconNames = Object.keys(registry).sort()

let uid = 0

/**
 * Inline an exported SVG with a class. Strips the fixed width/height/style the
 * export carries so the component CSS sizes it, and namespaces any ids so two
 * copies on one page don't collide.
 */
export function svg(name: string, className?: string, extra: Record<string, string> = {}): string {
  const raw = registry[name]
  if (!raw) throw new Error(`Unknown icon asset: ${name}`)
  let out = raw
    .replace(/<\?xml[^>]*>\s*/g, '')
    .replace(/<metadata>[\s\S]*?<\/metadata>/g, '')
    .replace(/\sxmlns:c2pa="[^"]*"/g, '')
    .replace(/^<svg\b([^>]*)>/, (_m, attrs: string) => {
      const original = /\sclass="([^"]*)"/.exec(attrs)?.[1]
      const a = attrs
        .replace(/\s(width|height|style|preserveAspectRatio|overflow)="[^"]*"/g, '')
        .replace(/\sclass="[^"]*"/g, '')
        .replace(/\saria-hidden="[^"]*"/g, '')
      const finalClass = className ?? original
      const cls = finalClass ? ` class="${finalClass}"` : ''
      const rest = Object.entries(extra)
        .map(([k, v]) => ` ${k}="${v}"`)
        .join('')
      return `<svg${cls}${a} aria-hidden="true"${rest}>`
    })
    .replace(/\s*\n\s*/g, ' ')

  // namespace ids (filters, patterns, clipPaths) so repeated copies stay valid
  const ids = Array.from(new Set(Array.from(out.matchAll(/\sid="([^"]+)"/g)).map((m) => m[1])))
  if (ids.length) {
    const tag = `g${(uid++).toString(36)}`
    for (const id of ids) {
      const safe = id.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
      out = out
        .replace(new RegExp(`\\sid="${safe}"`, 'g'), ` id="${id}-${tag}"`)
        .replace(new RegExp(`url\\(#${safe}\\)`, 'g'), `url(#${id}-${tag})`)
        .replace(new RegExp(`href="#${safe}"`, 'g'), `href="#${id}-${tag}"`)
    }
  }
  return out
}

export function hasIcon(name: string): boolean {
  return name in registry
}
