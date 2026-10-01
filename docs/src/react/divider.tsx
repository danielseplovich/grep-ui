import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Divider } from '../../../react/divider'

export const dividerDoc: ReactDoc = {
  slug: 'divider',
  title: 'Dividing Line',
  description: 'A rule between sections, horizontal or vertical.',
  basedOn: 'hr',
  importCode: IMPORT('Divider'),
  usageCode: `<Divider />`,
  props: [
    { name: 'orientation', type: '"horizontal" | "vertical"', default: '"horizontal"' },
    { name: 'subtle', type: 'boolean', default: 'false' },
    { name: 'thin', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'orientation', label: 'Orientation', type: 'select', options: ['horizontal', 'vertical'], default: 'horizontal' },
      { name: 'subtle', label: 'Subtle', type: 'boolean', default: false },
      { name: 'thin', label: 'Thin (0.5px)', type: 'boolean', default: false },
    ],
    render: (s) => (
      <div style={s.orientation === 'vertical' ? { height: 120, display: 'flex' } : { width: 320 }}>
        <Divider orientation={s.orientation as 'horizontal'} subtle={Boolean(s.subtle)} thin={Boolean(s.thin)} />
      </div>
    ),
    code: (s) => example([IMPORT('Divider')], jsx('Divider', { orientation: s.orientation !== 'horizontal' ? String(s.orientation) : undefined, subtle: Boolean(s.subtle), thin: Boolean(s.thin) })),
  },
  examples: { hero: { html: '', layout: 'fill' }, examples: [] },
}
