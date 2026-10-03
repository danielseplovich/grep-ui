import { specs, type Spec } from './specs'
import { prototypes } from './prototypes'

export interface NavItem {
  label: string
  to: string
  description?: string
  keywords?: string[]
}

export interface NavGroup {
  title: string
  items: NavItem[]
}

/** "Tabs (Button Tab)" → "Tabs", "Avatar / Tile" → "Avatar" */
export function navLabel(spec: Spec): string {
  return spec.title.split(/\s+[(/]/)[0].trim()
}

export const nav: NavGroup[] = [
  {
    title: 'Getting started',
    items: [
      { label: 'Introduction', to: '/introduction', description: 'What Grep UI is and where it is heading.' },
      { label: 'Installation', to: '/installation', description: 'Install the package, load the fonts and stylesheet, set the theme.' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'All foundations', to: '/foundations', description: 'Colors, typography, spacing and effects.' },
      { label: 'Colors', to: '/foundations/color', description: 'Every color token, with its value.' },
      { label: 'Typography', to: '/foundations/typography', description: 'Families, sizes and the three weights.' },
      { label: 'Spacing & radius', to: '/foundations/spacing', description: 'The spacing scale, radii and border widths.' },
      { label: 'Effects', to: '/foundations/effects', description: 'Elevation, focus rings and opacity.' },
    ],
  },
  {
    title: 'Components',
    items: [{ label: 'All components', to: '/components', description: 'Every component in the system, previewed live.' }, ...specs.map((s) => ({
      label: navLabel(s),
      to: `/components/${s.slug}`,
      description: s.descriptionText,
      keywords: [s.title, ...s.classes.slice(0, 4)],
    }))],
  },
]

nav.push({
  title: 'Prototypes',
  items: [{ label: 'All prototypes', to: '/prototypes', description: 'HTML prototypes built on Grep UI, ready to open or download.' }, ...prototypes.map((p) => ({ label: p.title, to: `/prototypes/${p.slug}`, description: p.description }))],
})

/** The header: one entry per section. The galleries are the hubs; ⌘K and prev/next do the rest. */
export const topNav: NavItem[] = [
  { label: 'Components', to: '/components' },
  { label: 'Foundations', to: '/foundations' },
  { label: 'Prototypes', to: '/prototypes' },
  { label: 'Installation', to: '/installation' },
]

/** Which header entry a path belongs to. */
export function sectionOf(pathname: string): string | undefined {
  return topNav.find((n) => pathname === n.to || pathname.startsWith(n.to + '/'))?.to
}

export const flatNav: NavItem[] = nav.flatMap((g) => g.items)

export function neighbours(to: string): { prev?: NavItem; next?: NavItem } {
  const i = flatNav.findIndex((n) => n.to === to)
  if (i === -1) return {}
  return { prev: flatNav[i - 1], next: flatNav[i + 1] }
}

export function groupOf(to: string): string | undefined {
  return nav.find((g) => g.items.some((i) => i.to === to))?.title
}
