import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Radio } from '../../../react/radio'

export const radioDoc: ReactDoc = {
  slug: 'radio',
  title: 'Radio',
  description: 'A single choice from a set, alone or with a label, sublabel and card.',
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
      { name: 'checked', label: 'Checked', type: 'boolean', default: true },
      { name: 'label', label: 'Label', type: 'boolean', default: true },
      { name: 'sublabel', label: 'Sublabel', type: 'boolean', default: true },
      { name: 'card', label: 'Card', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => <Radio checked={Boolean(s.checked)} label={s.label ? 'Pro' : undefined} sublabel={s.label && s.sublabel ? 'Unlimited renders and 5 TB.' : undefined} card={Boolean(s.card)} disabled={Boolean(s.disabled)} />,
    code: (s) =>
      example(
        [IMPORT('Radio')],
        jsx('Radio', { checked: s.checked ? { raw: 'plan === "pro"' } : undefined, onCheckedChange: { raw: '() => setPlan("pro")' }, label: s.label ? 'Pro' : undefined, sublabel: s.label && s.sublabel ? 'Unlimited renders and 5 TB.' : undefined, card: Boolean(s.card), disabled: Boolean(s.disabled) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
