import { siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { kbd, labelled } from './_shared'

const cap = (type: 'icon' | 'letter' | 'number' | 'label', content: string, lg = false) =>
  `<span class="grep-kbd grep-kbd--${type}${lg ? ' grep-kbd--lg' : ''}">${content}</span>`

const iconCap = (lg = false) => cap('icon', svg(lg ? 'keyboard-shortcut-icon-20' : 'keyboard-shortcut-icon-16', 'grep-kbd__icon'), lg)

export const keyboard_shortcut_examples: ComponentExamples = {
  hero: {
    html: siblings(kbd(['cmd', 'K']), kbd(['cmd', 'shift', 'P']), cap('label', 'return')),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'Letter, Number and Icon are 16px squares; Label is a pill that grows with its text. Everything inside uses the icon token, even the letters.',
      html: siblings(labelled('icon', iconCap()), labelled('letter', cap('letter', '<span>K</span>')), labelled('number', cap('number', '1')), labelled('label', cap('label', 'shift'))),
    },
    {
      id: 'lg',
      title: 'Large',
      description: '--lg is 20px with radius-5 and 13px mono. Figma reserves it for Settings pages.',
      html: siblings(labelled('icon', iconCap(true)), labelled('letter', cap('letter', '<span>K</span>', true)), labelled('number', cap('number', '1', true)), labelled('label', cap('label', 'shift', true))),
    },
    {
      id: 'combos',
      title: 'Combos',
      description: 'Wrap caps in .grep-kbd-group for a 4px gap. Search and Tooltip space theirs at 3 — see Contradictions.',
      html: siblings(kbd(['cmd', 'K']), kbd(['cmd', 'shift', 'P']), kbd(['cmd', 'K'], true)),
    },
    {
      id: 'in-context',
      title: 'In a row',
      html: `<span style="display:inline-flex;align-items:center;gap:var(--space-12);color:var(--foreground-text-base)">
Open the command palette
${kbd(['cmd', 'K'])}
</span>`,
    },
  ],
}
