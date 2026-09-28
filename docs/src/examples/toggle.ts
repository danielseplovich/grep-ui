import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { badge, labelled } from './_shared'

const toggle = (on = false, opts: { md?: boolean; state?: string; tag?: 'button' | 'span' } = {}) => {
  const tag = opts.tag ?? 'button'
  return dedent(`
    <${tag} class="grep-toggle${opts.md ? ' grep-toggle--md' : ''}${on ? ' grep-toggle--on' : ''}"${opts.state ? ` data-state="${opts.state}"` : ''}${tag === 'button' ? ` role="switch" aria-checked="${on}"` : ''}>
      <span class="grep-toggle__track"><span class="grep-toggle__thumb"></span></span>
    </${tag}>`)
}

const group = (on = false, opts: { card?: boolean; state?: string; badge?: boolean; title?: string; sub?: string } = {}) =>
  dedent(`
    <button class="grep-toggle-group${opts.card ? ' grep-toggle-group--card' : ''}" role="switch" aria-checked="${on}"${opts.state ? ` data-state="${opts.state}"` : ''}>
      ${toggle(on, { tag: 'span' }).split('\n').join('\n      ')}
      <span class="grep-toggle-group__label">
        <span class="grep-toggle-group__title">${opts.title ?? 'Label'}</span>
        <span class="grep-toggle-group__sublabel">${opts.sub ?? 'This is some sublabel.'}</span>
      </span>${opts.badge ? `\n      <span class="grep-toggle-group__badge">${badge('neutral-base', 'Beta')}</span>` : ''}
    </button>`)

export const toggle_examples: ComponentExamples = {
  hero: {
    html: siblings(toggle(true), toggle(false), toggle(true, { md: true }), toggle(false, { md: true })),
  },
  examples: [
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Small (21 × 12) is the default; --md is 28 × 16. Everything scales by 4/3, which is why the thumb sits on fractional pixels.',
      html: siblings(labelled('small off', toggle()), labelled('small on', toggle(true)), labelled('medium off', toggle(false, { md: true })), labelled('medium on', toggle(true, { md: true }))),
    },
    {
      id: 'states',
      title: 'States',
      description: 'Hover overlays the off track and deepens the on fill. Focus is the small ring, drawn a pixel further out because the border is outset.',
      html: siblings(
        labelled('hover off', toggle(false, { state: 'hover' })),
        labelled('hover on', toggle(true, { state: 'hover' })),
        labelled('focused off', toggle(false, { state: 'focused' })),
        labelled('focused on', toggle(true, { state: 'focused' })),
        labelled('disabled off', toggle(false, { state: 'disabled' })),
        labelled('disabled on', toggle(true, { state: 'disabled' })),
      ),
      note: 'data-state forces each state for the preview.',
    },
    {
      id: 'group',
      title: 'Group',
      description: 'Control plus label block, gap 16 (Checkbox and Radio groups use 12 — logged in Contradictions).',
      layout: 'column',
      html: siblings(group(true, { title: 'Notifications', sub: 'Get a push when a render finishes.' }), group(false, { title: 'Auto-sync', sub: 'Keep this drive mirrored locally.' })),
    },
    {
      id: 'card',
      title: 'Card',
      description: 'The card owns the hover; the toggle inside stops taking pointer events. An optional badge sits at the end of the row.',
      layout: 'column',
      html: siblings(group(false, { card: true }), group(true, { card: true, state: 'hover' }), group(true, { card: true, badge: true }), group(false, { card: true, state: 'disabled' })),
      note: 'The second and fourth cards force hover and disabled with data-state.',
    },
  ],
}
