import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { badge, checkbox, labelled } from './_shared'

const group = (state: '' | 'checked' = '', opts: { card?: boolean; state?: string; badge?: boolean; sub?: boolean } = {}) =>
  dedent(`
    <button class="grep-checkbox-group${opts.card ? ' grep-checkbox-group--card' : ''}" role="checkbox" aria-checked="${state === 'checked'}"${opts.state ? ` data-state="${opts.state}"` : ''}>
      ${checkbox(state).split('\n').join('\n      ')}
      <span class="grep-checkbox-group__label">
        <span class="grep-checkbox-group__title">Label</span>${
          opts.sub === false ? '' : `\n        <p class="grep-checkbox-group__sublabel">This is some sublabel.</p>`
        }
      </span>${opts.badge ? `\n      <span class="grep-checkbox-group__badge">${badge('neutral-base', 'Badge')}</span>` : ''}
    </button>`)

export const checkbox_examples: ComponentExamples = {
  hero: {
    layout: 'column',
    html: siblings(group('checked', { card: true }), group('', { card: true })),
  },
  examples: [
    {
      id: 'control',
      title: 'Control',
      description: 'A 14px box inside a 16px hit area. Both marks are always present; the selected class reveals one.',
      html: siblings(labelled('unchecked', checkbox()), labelled('checked', checkbox('checked')), labelled('indeterminate', checkbox('indeterminate'))),
    },
    {
      id: 'states',
      title: 'Control states',
      description: 'Hover moves the border to border-brand and layers a subtle overlay; checked hover deepens the fill; focus takes the small ring; disabled is opacity only.',
      html: siblings(
        labelled('hover', checkbox('', ' data-state="hover"')),
        labelled('checked hover', checkbox('checked', ' data-state="hover"')),
        labelled('focused', checkbox('', ' data-state="focused"')),
        labelled('checked focused', checkbox('checked', ' data-state="focused"')),
        labelled('disabled', checkbox('', ' data-state="disabled"')),
        labelled('checked disabled', checkbox('checked', ' data-state="disabled"')),
      ),
      note: 'data-state forces each state for the preview.',
    },
    {
      id: 'group',
      title: 'Group',
      description: 'Control, label block and an optional badge. The whole group is the click target; gap 12, label-to-sublabel gap 2.',
      layout: 'column',
      html: siblings(group(), group('checked'), group('checked', { badge: true })),
    },
    {
      id: 'card',
      title: 'Card',
      description: '--card adds padding 12, radius-8, a hairline, background-component and the card shadow. Hover thickens the hairline to 1px; focus uses the large ring.',
      layout: 'column',
      html: siblings(group('', { card: true }), group('checked', { card: true, state: 'hover' }), group('checked', { card: true, state: 'focused' }), group('', { card: true, state: 'disabled' })),
      note: 'The second, third and fourth cards force hover, focused and disabled with data-state.',
    },
    {
      id: 'no-sublabel',
      title: 'Without a sublabel',
      layout: 'column',
      html: siblings(group('checked', { sub: false }), group('', { sub: false })),
    },
  ],
}
