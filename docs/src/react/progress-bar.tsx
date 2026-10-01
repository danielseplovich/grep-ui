import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { ProgressBar, type ProgressTone } from '../../../react/progress-bar'

export const progressBarDoc: ReactDoc = {
  slug: 'progress-bar',
  title: 'Progress Bar',
  description: 'A 6px track with a tinted fill.',
  basedOn: 'div',
  importCode: IMPORT('ProgressBar'),
  usageCode: `<ProgressBar value={60} tone="success" />`,
  props: [
    { name: 'value', type: 'number (0–100)' },
    { name: 'tone', type: '"brand" | "success" | "warning" | "danger"', default: '"brand"' },
  ],
  playground: {
    controls: [
      { name: 'value', label: 'Value', type: 'select', options: ['0', '25', '50', '75', '100'], default: '50' },
      { name: 'tone', label: 'Tone', type: 'select', options: ['brand', 'success', 'warning', 'danger'], default: 'brand' },
    ],
    render: (s) => (
      <div style={{ width: 320 }}>
        <ProgressBar value={Number(s.value)} tone={s.tone as ProgressTone} />
      </div>
    ),
    code: (s) => example([IMPORT('ProgressBar')], jsx('ProgressBar', { value: Number(s.value), tone: s.tone !== 'brand' ? String(s.tone) : undefined })),
  },
  examples: { hero: { html: '' }, examples: [] },
}
