import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Checkbox } from '../../../react/checkbox'
import { Badge } from '../../../react/badge'

export const checkboxDoc: ReactDoc = {
  slug: 'checkbox',
  title: 'Checkbox',
  description: 'A 14px check control, alone or with a label, sublabel and card.',
  basedOn: 'button',
  importCode: IMPORT('Checkbox'),
  usageCode: `<Checkbox checked={on} onCheckedChange={setOn} label="Notify me" />`,
  props: [
    { name: 'checked', type: 'boolean', default: 'false' },
    { name: 'indeterminate', type: 'boolean', default: 'false' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void' },
    { name: 'label', type: 'ReactNode' },
    { name: 'sublabel', type: 'ReactNode' },
    { name: 'badge', type: 'ReactNode' },
    { name: 'card', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'state', label: 'State', type: 'select', options: ['unchecked', 'checked', 'indeterminate'], default: 'unchecked' },
      { name: 'label', label: 'Label', type: 'boolean', default: false },
      { name: 'sublabel', label: 'Sublabel', type: 'boolean', default: false },
      { name: 'badge', label: 'Badge', type: 'boolean', default: false },
      { name: 'card', label: 'Card', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => (
      <Checkbox checked={s.state === 'checked'} indeterminate={s.state === 'indeterminate'} label={s.label ? 'Notify me' : undefined} sublabel={s.label && s.sublabel ? 'Get an email when a render finishes.' : undefined} badge={s.label && s.badge ? <Badge>New</Badge> : undefined} card={Boolean(s.card)} disabled={Boolean(s.disabled)} />
    ),
    code: (s) =>
      example(
        [IMPORT(s.badge ? 'Checkbox, Badge' : 'Checkbox')],
        jsx('Checkbox', { checked: s.state === 'checked' ? { raw: 'on' } : undefined, indeterminate: s.state === 'indeterminate', onCheckedChange: { raw: 'setOn' }, label: s.label ? 'Notify me' : undefined, sublabel: s.label && s.sublabel ? 'Get an email when a render finishes.' : undefined, badge: s.label && s.badge ? { raw: '<Badge>New</Badge>' } : undefined, card: Boolean(s.card), disabled: Boolean(s.disabled) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
