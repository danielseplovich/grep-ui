import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Search } from '../../../react/search'

export const searchDoc: ReactDoc = {
  slug: 'search',
  title: 'Search',
  description: 'A search field with a magnifier and an optional keyboard shortcut.',
  basedOn: 'input',
  importCode: IMPORT('Search'),
  usageCode: `<Search placeholder="Search files and folders…" shortcut={["cmd", "F"]} />`,
  props: [
    { name: 'size', type: '28 | 32', default: '28' },
    { name: 'ghost', type: 'boolean', default: 'false' },
    { name: 'error', type: 'boolean', default: 'false' },
    { name: 'shortcut', type: 'string[]' },
    { name: 'icon', type: 'ReactNode' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['28', '32'], default: '28' },
      { name: 'ghost', label: 'Ghost', type: 'boolean', default: false },
      { name: 'shortcut', label: 'Shortcut', type: 'boolean', default: false },
      { name: 'error', label: 'Error', type: 'boolean', default: false },
    ],
    render: (s) => (
      <div style={{ width: 320 }}>
        <Search size={Number(s.size) as 28} ghost={Boolean(s.ghost)} error={Boolean(s.error)} shortcut={s.shortcut ? ['cmd', 'F'] : undefined} placeholder="Search files and folders…" />
      </div>
    ),
    code: (s) => example([IMPORT('Search')], jsx('Search', { placeholder: 'Search files and folders…', size: s.size !== '28' ? Number(s.size) : undefined, ghost: Boolean(s.ghost), error: Boolean(s.error), shortcut: s.shortcut ? { raw: '["cmd", "F"]' } : undefined })),
  },
  examples: { hero: { html: '' }, examples: [] },
}
