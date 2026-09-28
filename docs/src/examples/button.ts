import { siblings, type ComponentExamples } from '../lib/examples'
import { btn, icon14, spinner } from './_shared'

export const button_examples: ComponentExamples = {
  hero: {
    html: siblings(btn('brand', 'Create'), btn('neutral', 'Cancel'), btn('inverted', 'Inverted'), btn('danger', 'Delete')),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'Brand and danger swap their fill on hover; neutral and inverted layer an overlay on theirs. One brand button per view.',
      html: siblings(btn('brand', 'Brand'), btn('neutral', 'Neutral'), btn('inverted', 'Inverted'), btn('danger', 'Danger')),
    },
    {
      id: 'icons',
      title: 'With icons',
      description: 'Leading and trailing icons are optional and independent. The icon is always 14, the gap 6.',
      html: siblings(
        `<button class="grep-btn grep-btn--brand">
          ${icon14('grep-btn__icon')}
          <span class="grep-btn__label">Leading</span>
          ${spinner()}
        </button>`,
        `<button class="grep-btn grep-btn--neutral">
          <span class="grep-btn__label">Trailing</span>
          ${icon14('grep-btn__icon')}
          ${spinner()}
        </button>`,
        `<button class="grep-btn grep-btn--neutral">
          ${icon14('grep-btn__icon')}
          <span class="grep-btn__label">Both</span>
          ${icon14('grep-btn__icon')}
          ${spinner()}
        </button>`,
      ),
    },
    {
      id: 'loading',
      title: 'Loading',
      description: 'Label and icons go to opacity 0 and the spinner centres over them, so the button keeps its width.',
      html: siblings(
        `<button class="grep-btn grep-btn--brand" data-state="loading" aria-busy="true">
          <span class="grep-btn__label">Saving changes</span>
          ${spinner()}
        </button>`,
        `<button class="grep-btn grep-btn--neutral" data-state="loading" aria-busy="true">
          ${icon14('grep-btn__icon')}
          <span class="grep-btn__label">Uploading</span>
          ${spinner()}
        </button>`,
      ),
    },
    {
      id: 'disabled',
      title: 'Disabled',
      description: 'opacity-disabled on the whole button, plus cursor: not-allowed. Never recolour a disabled control.',
      html: siblings(btn('brand', 'Brand', { state: 'disabled' }), btn('neutral', 'Neutral', { state: 'disabled' }), btn('danger', 'Danger', { state: 'disabled' })),
    },
    {
      id: 'focused',
      title: 'Focused',
      description: 'The large ring — base shadow at spread 1, a 2px canvas gap, then 4px brand at 60%. Applied on :focus-visible; forced here with data-state.',
      html: siblings(btn('brand', 'Brand', { state: 'focused' }), btn('neutral', 'Neutral', { state: 'focused' })),
      note: 'data-state="focused" forces the ring for the preview.',
    },
    {
      id: 'group',
      title: 'In a footer',
      description: 'Actions are right-aligned with the brand button last; siblings sit 12 apart.',
      layout: 'fill',
      html: `<div style="display:flex;justify-content:flex-end;gap:var(--space-12)">
${btn('neutral', 'Cancel')}
${btn('brand', 'Confirm')}
</div>`,
    },
  ],
}
