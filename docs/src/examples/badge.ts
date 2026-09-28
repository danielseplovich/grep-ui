import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'

const plus = (cls: string) =>
  `<svg class="${cls}" viewBox="0 0 12 12" fill="none" aria-hidden="true"><path d="M6 2.5v7M2.5 6h7" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`

const close = svg('badge-close', 'grep-badge__close')

const tones = [
  ['neutral-base', 'Neutral base'],
  ['neutral-dim', 'Neutral dim'],
  ['brand', 'Brand'],
  ['success', 'Success'],
  ['warning', 'Warning'],
  ['destructive', 'Destructive'],
  ['indigo', 'Indigo'],
  ['fuschia', 'Fuschia'],
  ['orange', 'Orange'],
  ['blue', 'Blue'],
  ['cyan', 'Cyan'],
  ['teal', 'Teal'],
] as const

const badge = (tone: string, label: string, shape = 'full', size = '') =>
  dedent(`
    <span class="grep-badge grep-badge--${tone} grep-badge--${shape}${size ? ` grep-badge--${size}` : ''}">
      <span class="grep-badge__label">${label}</span>
    </span>`)

export const badge_examples: ComponentExamples = {
  hero: {
    html: siblings(
      `<span class="grep-badge grep-badge--brand grep-badge--full">
        ${plus('grep-badge__icon')}
        <span class="grep-badge__label">New</span>
      </span>`,
      `<span class="grep-badge grep-badge--success grep-badge--full">
        <span class="grep-badge__label">Synced</span>
      </span>`,
      `<span class="grep-badge grep-badge--neutral-base grep-badge--rounded">
        <span class="grep-badge__label">Draft</span>
        ${close}
      </span>`,
      `<span class="grep-badge grep-badge--neutral-dim grep-badge--full">
        <span class="grep-badge__label">7</span>
      </span>`,
    ),
  },
  examples: [
    {
      id: 'tones',
      title: 'Tones',
      description: 'Two neutrals read from Figma, plus ten accent tones. Brand, success, warning and destructive carry status meaning; the rest are categories.',
      html: tones.map(([t, l]) => badge(t, l)).join('\n'),
    },
    {
      id: 'radius',
      title: 'Full and rounded',
      description: 'Radius and horizontal padding move together — full is padding 8, rounded is padding 6.',
      html: siblings(badge('brand', 'Full', 'full'), badge('brand', 'Rounded', 'rounded')),
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'XS (16), SM (18) and the default Base (22). Padding, gap, text and icon step together.',
      html: siblings(
        `<span class="grep-badge grep-badge--blue grep-badge--full grep-badge--16">
          ${plus('grep-badge__icon')}
          <span class="grep-badge__label">Label</span>
        </span>`,
        `<span class="grep-badge grep-badge--blue grep-badge--full grep-badge--18">
          ${plus('grep-badge__icon')}
          <span class="grep-badge__label">Label</span>
        </span>`,
        `<span class="grep-badge grep-badge--blue grep-badge--full">
          ${plus('grep-badge__icon')}
          <span class="grep-badge__label">Label</span>
        </span>`,
      ),
    },
    {
      id: 'icon',
      title: 'With a leading icon',
      description: 'The icon shares the tone’s foreground. 12px at Base, 10 at SM, 8 at XS.',
      html: siblings(
        `<span class="grep-badge grep-badge--teal grep-badge--full">
          ${plus('grep-badge__icon')}
          <span class="grep-badge__label">Label</span>
        </span>`,
        `<span class="grep-badge grep-badge--orange grep-badge--rounded">
          ${plus('grep-badge__icon')}
          <span class="grep-badge__label">Label</span>
        </span>`,
      ),
    },
    {
      id: 'removable',
      title: 'Removable',
      description: 'The close mark is the exported Close-X asset at 12px, inside a focusable button. Removable badges belong in filter bars and token inputs.',
      html: siblings(
        `<span class="grep-badge grep-badge--brand grep-badge--full">
          <span class="grep-badge__label">Illustration</span>
          ${close}
        </span>`,
        `<span class="grep-badge grep-badge--neutral-base grep-badge--rounded">
          ${plus('grep-badge__icon')}
          <span class="grep-badge__label">Q3 assets</span>
          ${close}
        </span>`,
      ),
    },
    {
      id: 'count',
      title: 'Count',
      description: 'min-width 22 keeps a single character from collapsing into an oval.',
      html: siblings(badge('neutral-base', '7'), badge('neutral-dim', '12'), badge('destructive', '99+')),
    },
  ],
}
