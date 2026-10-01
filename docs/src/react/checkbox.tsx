import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Checkbox } from '../../../react/checkbox'
import { Badge } from '../../../react/badge'

export const checkboxDoc: ReactDoc = {
  slug: 'checkbox',
  title: 'Checkbox',
  description: 'A 14px check control. With a label it becomes a Checkbox Group: control, label block, optional badge and card.',
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
      { name: 'variant', label: 'Variant', type: 'select', options: ['checkbox', 'checkbox group'], default: 'checkbox' },
      { name: 'state', label: 'State', type: 'select', options: ['unchecked', 'checked', 'indeterminate'], default: 'unchecked' },
      { name: 'sublabel', label: 'Sublabel (group)', type: 'boolean', default: false },
      { name: 'badge', label: 'Badge (group)', type: 'boolean', default: false },
      { name: 'card', label: 'Card (group)', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => (
      <Checkbox checked={s.state === 'checked'} indeterminate={s.state === 'indeterminate'} label={s.variant === 'checkbox group' ? 'Notify me' : undefined} sublabel={s.variant === 'checkbox group' && s.sublabel ? 'Get an email when a render finishes.' : undefined} badge={s.variant === 'checkbox group' && s.badge ? <Badge>New</Badge> : undefined} card={s.variant === 'checkbox group' && Boolean(s.card)} disabled={Boolean(s.disabled)} />
    ),
    code: (s) =>
      example(
        [IMPORT(s.variant === 'checkbox group' && s.badge ? 'Checkbox, Badge' : 'Checkbox')],
        jsx('Checkbox', { checked: s.state === 'checked' ? { raw: 'on' } : undefined, indeterminate: s.state === 'indeterminate', onCheckedChange: { raw: 'setOn' }, label: s.variant === 'checkbox group' ? 'Notify me' : undefined, sublabel: s.variant === 'checkbox group' && s.sublabel ? 'Get an email when a render finishes.' : undefined, badge: s.variant === 'checkbox group' && s.badge ? { raw: '<Badge>New</Badge>' } : undefined, card: s.variant === 'checkbox group' && Boolean(s.card), disabled: Boolean(s.disabled) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
