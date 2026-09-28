import { dedent, siblings, type ComponentExamples } from '../lib/examples'

const bar = (type: 'brand' | 'success' | 'warning' | 'danger', fill: number, label?: string) =>
  dedent(`
    <div class="grep-progress grep-progress--${type}" role="progressbar" aria-valuenow="${fill}" aria-valuemin="0" aria-valuemax="100"${label ? ` aria-label="${label}"` : ''}>
      <div class="grep-progress__fill" style="--_fill: ${fill}%"></div>
    </div>`)

const labelled = (label: string, inner: string) =>
  `<div style="display:flex;flex-direction:column;gap:var(--space-6)">\n<span style="font-size:var(--text-xs);color:var(--foreground-text-dim)">${label}</span>\n${inner}\n</div>`

export const progress_bar_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: bar('brand', 62, 'Upload progress'),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'The fill uses the same tint accents as the Banner’s pixel graphic — progress is decorative, so it stays light.',
      layout: 'fill',
      html: siblings(labelled('brand', bar('brand', 62)), labelled('success', bar('success', 100)), labelled('warning', bar('warning', 45)), labelled('danger', bar('danger', 20))),
    },
    {
      id: 'fill',
      title: 'Any fill',
      description: 'Figma ships five steps; in CSS the --_fill custom property takes any value.',
      layout: 'fill',
      html: siblings(...[0, 25, 37, 50, 75, 88, 100].map((f) => labelled(`${f}%`, bar('brand', f)))),
    },
  ],
}
