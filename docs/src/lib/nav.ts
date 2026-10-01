import { specs, type Spec } from './specs'

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
      { label: 'Introduction', to: '/', description: 'What Grep UI is and where it is heading.' },
      { label: 'Installation', to: '/installation', description: 'Install the package, load the fonts and stylesheet, set the theme.' },
    ],
  },
  {
    title: 'Foundations',
    items: [
      { label: 'Colors', to: '/foundations/color', description: 'Every color token, with its value.' },
      { label: 'Typography', to: '/foundations/typography', description: 'Families, sizes and the three weights.' },
      { label: 'Spacing & radius', to: '/foundations/spacing', description: 'The spacing scale, radii and border widths.' },
      { label: 'Effects', to: '/foundations/effects', description: 'Elevation, focus rings and opacity.' },
    ],
  },
  {
    title: 'Components',
    items: specs.map((s) => ({
      label: navLabel(s),
      to: `/components/${s.slug}`,
      description: s.descriptionText,
      keywords: [s.title, ...s.classes.slice(0, 4)],
    })),
  },
]

export const flatNav: NavItem[] = nav.flatMap((g) => g.items)

export function neighbours(to: string): { prev?: NavItem; next?: NavItem } {
  const i = flatNav.findIndex((n) => n.to === to)
  if (i === -1) return {}
  return { prev: flatNav[i - 1], next: flatNav[i + 1] }
}

export function groupOf(to: string): string | undefined {
  return nav.find((g) => g.items.some((i) => i.to === to))?.title
}
