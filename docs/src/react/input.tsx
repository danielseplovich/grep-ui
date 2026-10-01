import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Input } from '../../../react/input'

export const inputDoc: ReactDoc = {
  slug: 'input',
  title: 'Input',
  description: 'A text field with an optional label, sublabel, help text and addons.',
  basedOn: 'input',
  importCode: IMPORT('Input'),
  usageCode: `<Input label="Name" placeholder="Q3 campaign" />`,
  props: [
    { name: 'label', type: 'ReactNode' },
    { name: 'sublabel', type: 'ReactNode' },
    { name: 'helpText', type: 'ReactNode' },
    { name: 'size', type: '28 | 32', default: '28' },
    { name: 'error', type: 'boolean', default: 'false' },
    { name: 'leading', type: 'ReactNode' },
    { name: 'trailing', type: 'ReactNode | string' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['28', '32'], default: '28' },
      { name: 'label', label: 'Label', type: 'boolean', default: true },
      { name: 'sublabel', label: 'Sublabel', type: 'boolean', default: false },
      { name: 'helpText', label: 'Help text', type: 'boolean', default: true },
      { name: 'unit', label: 'Unit (trailing)', type: 'boolean', default: false },
      { name: 'error', label: 'Error', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => (
      <div style={{ width: 320 }}>
        <Input size={Number(s.size) as 28} label={s.label ? 'Budget' : undefined} sublabel={s.sublabel ? 'Per month, before tax.' : undefined} helpText={s.helpText ? 'Whole numbers only.' : undefined} trailing={s.unit ? 'USD' : undefined} error={Boolean(s.error)} disabled={Boolean(s.disabled)} placeholder="0.00" />
      </div>
    ),
    code: (s) =>
      example(
        [IMPORT('Input')],
        jsx('Input', { label: s.label ? 'Budget' : undefined, sublabel: s.sublabel ? 'Per month, before tax.' : undefined, helpText: s.helpText ? 'Whole numbers only.' : undefined, size: s.size !== '28' ? Number(s.size) : undefined, trailing: s.unit ? 'USD' : undefined, error: Boolean(s.error), disabled: Boolean(s.disabled), placeholder: '0.00' }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
