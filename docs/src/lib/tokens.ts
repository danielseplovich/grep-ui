import { tokensCss, effectsCss } from './specs'

/* ------------------------------------------------------------------ */
/* tokens.css → { name: { light, dark } }                              */
/* ------------------------------------------------------------------ */

export interface ColorToken {
  name: string
  light: string
  dark?: string
  description?: string
}

function parseBlock(css: string, selectorMatch: RegExp): Record<string, string> {
  const out: Record<string, string> = {}
  const re = /([^{}]+)\{([^{}]*)\}/g
  const clean = css.replace(/\/\*[\s\S]*?\*\//g, '')
  let m: RegExpExecArray | null
  while ((m = re.exec(clean))) {
    const selector = m[1].trim()
    if (!selectorMatch.test(selector)) continue
    for (const line of m[2].split(';')) {
      const mm = /^\s*(--[\w-]+)\s*:\s*([\s\S]+?)\s*$/.exec(line.replace(/\/\*[\s\S]*?\*\//g, ''))
      if (mm) out[mm[1]] = mm[2].replace(/\s+/g, ' ')
    }
  }
  return out
}

const light = parseBlock(tokensCss, /^:root,\s*\[data-theme="light"\]$/)
const dark = parseBlock(tokensCss, /^\[data-theme="dark"\]$/)
const root = parseBlock(tokensCss, /^:root$/)

/* ------------------------------------------------------------------ */
/* Figma token JSON → descriptions                                     */
/* ------------------------------------------------------------------ */

const descriptionFiles = import.meta.glob('../../../Grep UI */*.tokens.json', {
  query: '?descriptions',
  import: 'default',
  eager: true,
}) as Record<string, Record<string, string>>

const descriptions: Record<string, string> = Object.assign({}, ...Object.values(descriptionFiles))

export function describe(name: string): string | undefined {
  return descriptions[name]
}

/* ------------------------------------------------------------------ */
/* Public groups                                                        */
/* ------------------------------------------------------------------ */

function themed(prefix: RegExp): ColorToken[] {
  return Object.keys(light)
    .filter((k) => prefix.test(k))
    .map((name) => ({ name, light: light[name], dark: dark[name], description: descriptions[name] }))
}

export const colorGroups = {
  surfaces: themed(/^--background-(?!accent|overlay)/),
  accents: themed(/^--background-accent-/),
  overlays: themed(/^--background-overlay-/),
  text: themed(/^--foreground-text-/).concat(themed(/^--foreground-(brand|danger)/)),
  icons: themed(/^--foreground-icon-/),
  borders: themed(/^--border-/),
  buttons: themed(/^--button-/),
  badges: themed(/^--badge-/),
}

export const rampNames = ['purple', 'red', 'green', 'yellow', 'teal', 'indigo', 'cyan', 'blue', 'fuschia', 'orange'] as const

export function ramp(name: string): ColorToken[] {
  return Object.keys(root)
    .filter((k) => new RegExp(`^--${name}-\\d+$`).test(k))
    .sort((a, b) => Number(a.split('-').pop()) - Number(b.split('-').pop()))
    .map((n) => ({ name: n, light: root[n] }))
}

export const avatarColors: ColorToken[] = Object.keys(root)
  .filter((k) => k.startsWith('--avatar-'))
  .map((n) => ({ name: n, light: root[n] }))

export const shadowInks: ColorToken[] = Object.keys(root)
  .filter((k) => k.startsWith('--shadow-ink-'))
  .map((n) => ({ name: n, light: root[n] }))

export interface ScaleToken {
  name: string
  value: string
  px: number
  description?: string
}

function scale(prefix: string): ScaleToken[] {
  return Object.keys(root)
    .filter((k) => k.startsWith(prefix))
    .map((name) => ({ name, value: root[name], px: parseFloat(root[name]), description: descriptions[name] }))
    .sort((a, b) => a.px - b.px)
}

export const spacing = scale('--space-')
export const radii = scale('--radius-')
export const borderWidths = scale('--border-width-')
export const textSizes = scale('--text-').filter((t) => /px$/.test(t.value)).sort((a, b) => b.px - a.px)
export const textStyles = Object.keys(root)
  .filter((k) => k.startsWith('--text-style-'))
  .map((name) => ({ name, value: root[name].replace(/"/g, ''), description: descriptions[name] }))
export const textWeights = Object.keys(root)
  .filter((k) => k.startsWith('--text-weight-'))
  .map((name) => ({ name, value: root[name], description: descriptions[name] }))
export const opacities = Object.keys(root)
  .filter((k) => k.startsWith('--opacity-'))
  .map((name) => ({ name, value: root[name], description: descriptions[name] }))

/* ------------------------------------------------------------------ */
/* effects.css → elevations with their comments                        */
/* ------------------------------------------------------------------ */

export interface Elevation {
  name: string
  value: string
  comment: string
}

export const elevations: Elevation[] = (() => {
  const out: Elevation[] = []
  const body = effectsCss.slice(effectsCss.indexOf('{') + 1)
  const re = /\/\*([\s\S]*?)\*\/\s*(--[\w-]+)\s*:\s*([\s\S]*?);/g
  let m: RegExpExecArray | null
  while ((m = re.exec(body))) {
    out.push({
      name: m[2],
      value: m[3].replace(/\s+/g, ' ').trim(),
      comment: m[1].replace(/\s+/g, ' ').trim(),
    })
  }
  return out
})()
