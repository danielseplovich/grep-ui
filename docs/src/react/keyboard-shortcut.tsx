import type { ReactDoc } from '../lib/reactDocs'
import { example, IMPORT } from '../lib/snippet'
import { Kbd, KbdGroup } from '../../../react/keyboard-shortcut'

export const keyboardShortcutDoc: ReactDoc = {
  slug: 'keyboard-shortcut',
  title: 'Keyboard Shortcut',
  description: 'Key caps for showing a shortcut.',
  basedOn: 'span',
  importCode: IMPORT('Kbd, KbdGroup'),
  usageCode: `<KbdGroup>\n  <Kbd type="icon" />\n  <Kbd>K</Kbd>\n</KbdGroup>`,
  props: [
    { name: 'type', type: '"letter" | "number" | "label" | "icon"', default: '"letter"' },
    { name: 'lg', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'variant', label: 'Variant', type: 'select', options: ['key', 'group'], default: 'key' },
      { name: 'type', label: 'Key type', type: 'select', options: ['letter', 'number', 'label', 'icon'], default: 'letter' },
      { name: 'combo', label: 'Keys (group)', type: 'select', options: ['cmd K', 'cmd shift S', 'esc', '1'], default: 'cmd K' },
      { name: 'lg', label: 'Large', type: 'boolean', default: false },
    ],
    render: (s) =>
      s.variant === 'key' ? (
        <Kbd lg={Boolean(s.lg)} type={s.type as 'letter'}>
          {s.type === 'icon' ? undefined : s.type === 'number' ? '1' : s.type === 'label' ? 'shift' : 'K'}
        </Kbd>
      ) : (
      <KbdGroup>
        {String(s.combo)
          .split(' ')
          .map((k) => (
            <Kbd key={k} lg={Boolean(s.lg)} type={k === 'cmd' ? 'icon' : /^\d$/.test(k) ? 'number' : k.length === 1 ? 'letter' : 'label'}>
              {k === 'cmd' ? undefined : k}
            </Kbd>
          ))}
      </KbdGroup>
      ),
    code: (s) => {
      const lg = s.lg ? ' lg' : ''
      if (s.variant === 'key') {
        const t = s.type === 'letter' ? '' : ` type="${s.type}"`
        const body = s.type === 'icon' ? `<Kbd${t}${lg} />` : `<Kbd${t}${lg}>${s.type === 'number' ? '1' : s.type === 'label' ? 'shift' : 'K'}</Kbd>`
        return example([IMPORT('Kbd')], body)
      }
      const keys = String(s.combo)
        .split(' ')
        .map((k) => (k === 'cmd' ? `  <Kbd type="icon"${lg} />` : /^\d$/.test(k) ? `  <Kbd type="number"${lg}>${k}</Kbd>` : k.length === 1 ? `  <Kbd${lg}>${k}</Kbd>` : `  <Kbd type="label"${lg}>${k}</Kbd>`))
      return example([IMPORT('Kbd, KbdGroup')], `<KbdGroup>\n${keys.join('\n')}\n</KbdGroup>`)
    },
  },
  examples: { hero: { html: '' }, examples: [] },
}
