import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Toggle } from '../../../react/toggle'
import { Badge } from '../../../react/badge'

export const toggleDoc: ReactDoc = {
  slug: 'toggle',
  title: 'Toggle',
  description: 'An on/off switch. With a label it becomes a Toggle Group: control, label block, optional badge and card.',
  basedOn: 'button',
  importCode: IMPORT('Toggle'),
  usageCode: `<Toggle checked={on} onCheckedChange={setOn} />`,
  props: [
    { name: 'checked', type: 'boolean', default: 'false' },
    { name: 'onCheckedChange', type: '(checked: boolean) => void' },
    { name: 'size', type: '"sm" | "md"', default: '"sm"' },
    { name: 'label', type: 'ReactNode' },
    { name: 'sublabel', type: 'ReactNode' },
    { name: 'badge', type: 'ReactNode' },
    { name: 'card', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['toggle', 'toggle group'], default: 'toggle' },
      { name: 'checked', label: 'On', type: 'boolean', default: false },
      { name: 'size', label: 'Size', type: 'select', options: ['sm', 'md'], default: 'sm' },
      { name: 'sublabel', label: 'Sublabel (group)', type: 'boolean', default: false },
      { name: 'badge', label: 'Badge (group)', type: 'boolean', default: false },
      { name: 'card', label: 'Card (group)', type: 'boolean', default: false },
    ],
    render: (s) => <Toggle checked={Boolean(s.checked)} size={s.size as 'sm'} label={s.variant === 'toggle group' ? 'Auto-sync' : undefined} sublabel={s.variant === 'toggle group' && s.sublabel ? 'Keep this folder up to date.' : undefined} badge={s.variant === 'toggle group' && s.badge ? <Badge>Beta</Badge> : undefined} card={s.variant === 'toggle group' && Boolean(s.card)} />,
    code: (s) =>
      example(
        [IMPORT(s.variant === 'toggle group' && s.badge ? 'Toggle, Badge' : 'Toggle')],
        jsx('Toggle', { checked: { raw: 'on' }, onCheckedChange: { raw: 'setOn' }, size: s.size !== 'sm' ? String(s.size) : undefined, label: s.variant === 'toggle group' ? 'Auto-sync' : undefined, sublabel: s.variant === 'toggle group' && s.sublabel ? 'Keep this folder up to date.' : undefined, badge: s.variant === 'toggle group' && s.badge ? { raw: '<Badge>Beta</Badge>' } : undefined, card: s.variant === 'toggle group' && Boolean(s.card) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
