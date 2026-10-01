import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Badge, type BadgeTone } from '../../../react/badge'
import { AccentDot } from '../../../react/icons'

const tones = ['neutral-base', 'neutral-dim', 'brand', 'success', 'warning', 'destructive', 'blue', 'cyan', 'fuschia', 'indigo', 'orange', 'teal']

export const badgeDoc: ReactDoc = {
  slug: 'badge',
  title: 'Badge',
  description: 'A small label for status, counts and tags.',
  basedOn: 'span',
  importCode: IMPORT('Badge'),
  usageCode: `<Badge tone="success">Synced</Badge>`,
  props: [
    { name: 'tone', type: tones.map((t) => `"${t}"`).join(' | '), default: '"neutral-base"' },
    { name: 'size', type: '22 | 18 | 16', default: '22' },
    { name: 'shape', type: '"full" | "rounded"', default: '"full"' },
    { name: 'icon', type: 'ReactNode' },
    { name: 'onRemove', type: '() => void' },
  ],
  playground: {
    controls: [
      { name: 'label', label: 'Label', type: 'text', default: 'Label' },
      { name: 'tone', label: 'Tone', type: 'select', options: tones, default: 'neutral-base' },
      { name: 'size', label: 'Size', type: 'select', options: ['22', '18', '16'], default: '22' },
      { name: 'shape', label: 'Shape', type: 'select', options: ['full', 'rounded'], default: 'full' },
      { name: 'icon', label: 'Icon', type: 'boolean', default: false },
      { name: 'removable', label: 'Removable', type: 'boolean', default: false },
    ],
    render: (s) => (
      <Badge tone={s.tone as BadgeTone} size={Number(s.size) as 22} shape={s.shape as 'full'} icon={s.icon ? <AccentDot /> : undefined} onRemove={s.removable ? () => {} : undefined}>
        {String(s.label)}
      </Badge>
    ),
    code: (s) =>
      example(
        [IMPORT('Badge')],
        jsx('Badge', { tone: s.tone !== 'neutral-base' ? String(s.tone) : undefined, size: s.size !== '22' ? Number(s.size) : undefined, shape: s.shape !== 'full' ? String(s.shape) : undefined, icon: s.icon ? { raw: '<Dot />' } : undefined, onRemove: s.removable ? { raw: 'remove' } : undefined }, String(s.label)),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
