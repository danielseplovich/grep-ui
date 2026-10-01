import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Radio } from '../../../react/radio'

export const radioDoc: ReactDoc = {
  slug: 'radio',
  title: 'Radio',
  description: 'A single choice from a set. With a label it becomes a Radio Group: control, label block and optional card.',
  basedOn: 'button',
  importCode: IMPORT('Radio'),
  usageCode: `<Radio checked={plan === "pro"} onCheckedChange={() => setPlan("pro")} label="Pro" />`,
  props: [
    { name: 'checked', type: 'boolean', default: 'false' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void' },
    { name: 'label', type: 'ReactNode' },
    { name: 'sublabel', type: 'ReactNode' },
    { name: 'card', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['radio', 'radio group'], default: 'radio' },
      { name: 'checked', label: 'Checked', type: 'boolean', default: false },
      { name: 'sublabel', label: 'Sublabel (group)', type: 'boolean', default: false },
      { name: 'card', label: 'Card (group)', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => <Radio checked={Boolean(s.checked)} label={s.variant === 'radio group' ? 'Pro' : undefined} sublabel={s.variant === 'radio group' && s.sublabel ? 'Unlimited renders and 5 TB.' : undefined} card={s.variant === 'radio group' && Boolean(s.card)} disabled={Boolean(s.disabled)} />,
    code: (s) =>
      example(
        [IMPORT('Radio')],
        jsx('Radio', { checked: s.checked ? { raw: 'plan === "pro"' } : undefined, onCheckedChange: { raw: '() => setPlan("pro")' }, label: s.variant === 'radio group' ? 'Pro' : undefined, sublabel: s.variant === 'radio group' && s.sublabel ? 'Unlimited renders and 5 TB.' : undefined, card: s.variant === 'radio group' && Boolean(s.card), disabled: Boolean(s.disabled) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
