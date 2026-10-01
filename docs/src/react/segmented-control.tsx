import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { SegmentedControl } from '../../../react/segmented-control'
import { SegmentedControlIconExample } from '../../../react/icons'

export const segmentedControlDoc: ReactDoc = {
  slug: 'segmented-control',
  title: 'Segmented Control',
  description: 'A compact set of options where exactly one is selected.',
  basedOn: 'button',
  importCode: IMPORT('SegmentedControl'),
  usageCode: `<SegmentedControl segments={[{ value: "grid", label: "Grid" }, { value: "list", label: "List" }]} value={view} onValueChange={setView} />`,
  props: [
    { name: 'segments', type: '{ value: string; label?: ReactNode; icon?: ReactNode; badge?: ReactNode }[]' },
    { name: 'value', type: 'string' },
    { name: 'onValueChange', type: '(value: string) => void' },
    { name: 'size', type: '28 | 32', default: '28' },
  ],
  playground: {
    controls: [
      { name: 'count', label: 'Segments', type: 'select', options: ['2', '3', '4'], default: '3' },
      { name: 'size', label: 'Size', type: 'select', options: ['28', '32'], default: '28' },
      { name: 'style', label: 'Content', type: 'select', options: ['label', 'icon', 'icon + label'], default: 'label' },
    ],
    render: (s) => {
      const names = ['Grid', 'List', 'Board', 'Map'].slice(0, Number(s.count))
      return (
        <SegmentedControl
          size={Number(s.size) as 28}
          value="Grid"
          segments={names.map((n) => ({ value: n, label: s.style === 'icon' ? undefined : n, icon: s.style !== 'label' ? <SegmentedControlIconExample /> : undefined }))}
        />
      )
    },
    code: (s) => {
      const names = ['Grid', 'List', 'Board', 'Map'].slice(0, Number(s.count))
      const seg = names.map((n) => `{ value: "${n.toLowerCase()}"${s.style !== 'icon' ? `, label: "${n}"` : ''}${s.style !== 'label' ? `, icon: <${n}Icon />` : ''} }`).join(', ')
      return example([IMPORT('SegmentedControl')], jsx('SegmentedControl', { segments: { raw: `[${seg}]` }, value: { raw: 'view' }, onValueChange: { raw: 'setView' }, size: s.size !== '28' ? Number(s.size) : undefined }))
    },
  },
  examples: { hero: { html: '' }, examples: [] },
}
