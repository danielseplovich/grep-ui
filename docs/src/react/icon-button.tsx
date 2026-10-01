import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT, ICONS } from '../lib/snippet'
import { IconButton, type IconButtonVariant } from '../../../react/icon-button'
import { IconButtonIconExample } from '../../../react/icons'

const variants = ['primary', 'neutral', 'ghost', 'inverted', 'danger']
const sizes = ['16', '20', '24', '28', '32', '36', '40']

export const iconButtonDoc: ReactDoc = {
  slug: 'icon-button',
  title: 'Icon Button',
  description: 'A square control with an icon and no visible label.',
  basedOn: 'button',
  importCode: IMPORT('IconButton'),
  usageCode: `<IconButton label="Add"><Plus /></IconButton>`,
  props: [
    { name: 'label', type: 'string' },
    { name: 'variant', type: variants.map((v) => `"${v}"`).join(' | '), default: '"ghost"' },
    { name: 'size', type: sizes.join(' | '), default: '28' },
    { name: 'round', type: 'boolean', default: 'false' },
    { name: 'isLoading', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: variants, default: 'primary' },
      { name: 'size', label: 'Size', type: 'select', options: sizes, default: '28' },
      { name: 'round', label: 'Round', type: 'boolean', default: false },
      { name: 'isLoading', label: 'Loading', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => (
      <IconButton label="Add" variant={s.variant as IconButtonVariant} size={Number(s.size) as 28} round={Boolean(s.round)} isLoading={Boolean(s.isLoading)} disabled={Boolean(s.disabled)}>
        <IconButtonIconExample />
      </IconButton>
    ),
    code: (s) =>
      example(
        [IMPORT('IconButton'), ICONS('Plus')],
        jsx('IconButton', { label: 'Add', variant: s.variant !== 'ghost' ? String(s.variant) : undefined, size: s.size !== '28' ? Number(s.size) : undefined, round: Boolean(s.round), isLoading: Boolean(s.isLoading), disabled: Boolean(s.disabled) }, '<Plus />'),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
