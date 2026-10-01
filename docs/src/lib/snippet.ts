/* Build the Code-tab snippet for a playground from its control values. */

export type Attr = string | number | boolean | undefined | null | { raw: string }

/** <Name a="x" b={2} c /> — omits undefined, null and false; `{raw}` is inserted verbatim. */
export function jsx(name: string, attrs: Record<string, Attr>, children?: string, indent = ''): string {
  const parts = Object.entries(attrs)
    .filter(([, v]) => v !== undefined && v !== null && v !== false)
    .map(([k, v]) => (v === true ? k : typeof v === 'string' ? `${k}="${v}"` : typeof v === 'number' ? `${k}={${v}}` : `${k}={${(v as { raw: string }).raw}}`))
  const open = parts.length ? `<${name} ${parts.join(' ')}` : `<${name}`
  if (children === undefined) return `${open} />`
  if (children.includes('\n')) return `${open}>\n${children.split('\n').map((l) => `${indent}  ${l}`).join('\n')}\n${indent}</${name}>`
  return `${open}>${children}</${name}>`
}

/** A complete example file: imports, then a default export returning `body`. */
export function example(imports: string[], body: string, name = 'Example'): string {
  const b = body.includes('\n') ? `(\n${body.split('\n').map((l) => `    ${l}`).join('\n')}\n  )` : body
  return `${imports.join('\n')}\n\nexport default function ${name}() {\n  return ${b}\n}`
}

export const IMPORT = (names: string) => `import { ${names} } from "@shade/grep-ui/react"`
export const ICONS = (names: string) => `import { ${names} } from "@shade/grep-ui/react/icons"`
