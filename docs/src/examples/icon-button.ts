import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { icon14, spinner, labelled } from './_shared'

const ib = (type: string, size?: number, extra = '', state?: string) =>
  dedent(`
    <button class="grep-icon-btn grep-icon-btn--${type}${size ? ` grep-icon-btn--${size}` : ''}${extra}" aria-label="Add"${state ? ` data-state="${state}"` : ''}${state === 'disabled' ? ' disabled' : ''}>
      ${icon14('grep-icon-btn__icon')}
      ${spinner()}
    </button>`)

export const icon_button_examples: ComponentExamples = {
  hero: {
    html: siblings(ib('primary'), ib('neutral'), ib('inverted'), ib('danger'), ib('ghost')),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'The same five treatments as Button. Figma calls the brand treatment Primary here — the class follows Figma.',
      html: siblings(
        labelled('primary', ib('primary')),
        labelled('neutral', ib('neutral')),
        labelled('inverted', ib('inverted')),
        labelled('danger', ib('danger')),
        labelled('ghost', ib('ghost')),
      ),
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Seven boxes around one 14px icon. Radius steps at 24 and again at 36; omitting a size gives 28.',
      html: siblings(...[16, 20, 24, 28, 32, 36, 40].map((s) => labelled(String(s), ib('neutral', s)))),
    },
    {
      id: 'full',
      title: 'Full radius',
      description: '--full overrides the size’s radius with a circle.',
      html: siblings(ib('primary', 28, ' grep-icon-btn--full'), ib('neutral', 32, ' grep-icon-btn--full'), ib('ghost', 36, ' grep-icon-btn--full')),
    },
    {
      id: 'states',
      title: 'States',
      description: 'Loading hides the icon and centres the spinner; disabled is opacity only; focus takes the large ring (ghost takes it without the resting shadow).',
      html: siblings(
        labelled('loading', ib('primary', 28, '', 'loading')),
        labelled('disabled', ib('neutral', 28, '', 'disabled')),
        labelled('focused', ib('neutral', 28, '', 'focused')),
        labelled('ghost focused', ib('ghost', 28, '', 'focused')),
      ),
      note: 'data-state forces each state for the preview.',
    },
    {
      id: 'toolbar',
      title: 'Ghost in a toolbar',
      description: 'Ghost carries no fill, border or shadow at rest — for dense chrome where a row of buttons would be noisy.',
      html: `<div style="display:flex;align-items:center;gap:var(--space-2)">
${ib('ghost', 24)}
${ib('ghost', 24)}
${ib('ghost', 24)}
<div class="grep-divider grep-divider--vertical grep-divider--subtle" role="separator" aria-orientation="vertical" style="height:var(--space-16);margin:0 var(--space-4)"></div>
${ib('ghost', 24)}
</div>`,
    },
  ],
}
