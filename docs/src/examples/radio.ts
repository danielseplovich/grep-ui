import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { labelled } from './_shared'

const radio = (checked = false, extra = '') =>
  `<span class="grep-radio${checked ? ' grep-radio--checked' : ''}"${extra}><span class="grep-radio__dot"></span></span>`

const group = (checked = false, opts: { card?: boolean; state?: string; title?: string; sub?: string } = {}) =>
  dedent(`
    <button class="grep-radio-group${opts.card ? ' grep-radio-group--card' : ''}" role="radio" aria-checked="${checked}"${opts.state ? ` data-state="${opts.state}"` : ''}>
      ${radio(checked)}
      <span class="grep-radio-group__label">
        <span class="grep-radio-group__title">${opts.title ?? 'Label'}</span>
        <p class="grep-radio-group__sublabel">${opts.sub ?? 'This is some sublabel.'}</p>
      </span>
    </button>`)

export const radio_examples: ComponentExamples = {
  hero: {
    layout: 'column',
    html: `<div role="radiogroup" aria-label="Storage" style="display:flex;flex-direction:column;gap:var(--space-8)">
${group(true, { card: true, title: 'Keep originals', sub: 'Store every upload at full resolution.' })}
${group(false, { card: true, title: 'Optimise on upload', sub: 'Convert to the workspace preset and keep a copy.' })}
</div>`,
  },
  examples: [
    {
      id: 'control',
      title: 'Control',
      description: 'A 14px control in a 16px hit area with a 1px border. The checked disc is drawn in CSS — a 4px white dot on a brand circle.',
      html: siblings(labelled('unchecked', radio()), labelled('checked', radio(true))),
    },
    {
      id: 'states',
      title: 'Control states',
      html: siblings(
        labelled('hover', radio(false, ' data-state="hover"')),
        labelled('checked hover', radio(true, ' data-state="hover"')),
        labelled('focused', radio(false, ' data-state="focused"')),
        labelled('checked focused', radio(true, ' data-state="focused"')),
        labelled('disabled', radio(false, ' data-state="disabled"')),
        labelled('checked disabled', radio(true, ' data-state="disabled"')),
      ),
      note: 'data-state forces each state for the preview.',
    },
    {
      id: 'group',
      title: 'Group',
      description: 'Same shape as Checkbox Group: control, label block, gap 12.',
      layout: 'column',
      html: siblings(group(true), group(false)),
    },
    {
      id: 'card',
      title: 'Card',
      description: 'In card mode the control stops taking pointer events — the card owns the hover, thickening the hairline to 1px. Focus swaps in the card focus ring.',
      layout: 'column',
      html: siblings(group(false, { card: true }), group(true, { card: true, state: 'hover' }), group(true, { card: true, state: 'focused' }), group(false, { card: true, state: 'disabled' })),
      note: 'The second, third and fourth cards force hover, focused and disabled with data-state.',
    },
  ],
}
