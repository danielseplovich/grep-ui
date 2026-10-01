import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Breadcrumbs } from '../../../react/breadcrumbs'

const paths: Record<string, string[]> = {
  '2': ['Projects', 'Q3 campaign'],
  '4': ['Drive', 'Projects', 'Q3 campaign', 'Assets'],
  '6': ['Drive', 'Projects', 'Q3 campaign', 'Renders', 'Final', 'Assets'],
}

export const breadcrumbsDoc: ReactDoc = {
  slug: 'breadcrumbs',
  title: 'Breadcrumbs',
  description: 'The path to the current folder. Long paths collapse to an overflow crumb.',
  basedOn: 'nav',
  importCode: IMPORT('Breadcrumbs'),
  usageCode: `<Breadcrumbs items={[{ label: "Drive", href: "/" }, { label: "Projects", href: "/projects" }, { label: "Assets" }]} />`,
  props: [
    { name: 'items', type: '{ label: string; href?: string; onClick?: () => void; icon?: ReactNode }[]' },
    { name: 'maxVisible', type: 'number', default: '4' },
    { name: 'simplified', type: 'boolean', default: 'false' },
    { name: 'onOverflowClick', type: '() => void' },
  ],
  playground: {
    controls: [
      { name: 'depth', label: 'Path length', type: 'select', options: ['4', '2', '6'], default: '4' },
      { name: 'simplified', label: 'Simplified', type: 'boolean', default: false },
    ],
    render: (s) => <Breadcrumbs items={paths[String(s.depth)].map((label) => ({ label }))} simplified={Boolean(s.simplified)} />,
    code: (s) =>
      example(
        [IMPORT('Breadcrumbs')],
        jsx('Breadcrumbs', { items: { raw: `[${paths[String(s.depth)].map((l) => `{ label: "${l}" }`).join(', ')}]` }, simplified: Boolean(s.simplified) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
