import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Tooltip, type TailAlign, type TailEdge } from '../../../react/tooltip'

export const tooltipDoc: ReactDoc = {
  slug: 'tooltip',
  title: 'Tooltip',
  description: 'A small floating note: a sentence, a keyboard shortcut or a path.',
  basedOn: 'div',
  importCode: IMPORT('Tooltip'),
  usageCode: `<Tooltip tail={{ edge: "bottom", align: "middle" }}>Rename this folder</Tooltip>`,
  props: [
    { name: 'tail', type: '{ edge: "top" | "bottom"; align: "left" | "middle" | "right" }' },
    { name: 'shortcut', type: '{ label: string; keys: string[] }' },
  ],
  playground: {
    controls: [
      { name: 'type', label: 'Type', type: 'select', options: ['sentence', 'shortcut'], default: 'sentence' },
      { name: 'tail', label: 'Tail', type: 'boolean', default: false },
      { name: 'edge', label: 'Tail edge', type: 'select', options: ['bottom', 'top'], default: 'bottom' },
      { name: 'align', label: 'Tail position', type: 'select', options: ['left', 'middle', 'right'], default: 'middle' },
    ],
    render: (s) => (
      <Tooltip tail={s.tail ? { edge: s.edge as TailEdge, align: s.align as TailAlign } : undefined} shortcut={s.type === 'shortcut' ? { label: 'Open search', keys: ['cmd', 'K'] } : undefined}>
        {s.type === 'sentence' ? 'Rename this folder' : undefined}
      </Tooltip>
    ),
    code: (s) =>
      example(
        [IMPORT('Tooltip')],
        jsx(
          'Tooltip',
          { tail: s.tail ? { raw: `{ edge: "${s.edge}", align: "${s.align}" }` } : undefined, shortcut: s.type === 'shortcut' ? { raw: '{ label: "Open search", keys: ["cmd", "K"] }' } : undefined },
          s.type === 'sentence' ? 'Rename this folder' : undefined,
        ),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
