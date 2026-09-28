import { siblings, type ComponentExamples } from '../lib/examples'

const h = (mods = '') => `<hr class="grep-divider${mods ? ` ${mods}` : ''}">`
const v = (mods = '') => `<div class="grep-divider grep-divider--vertical${mods ? ` ${mods}` : ''}" role="separator" aria-orientation="vertical"></div>`

const labelled = (label: string, inner: string) =>
  `<div style="display:flex;flex-direction:column;gap:var(--space-6)">\n<span style="font-size:var(--text-xs);color:var(--foreground-text-dim)">${label}</span>\n${inner}\n</div>`

export const divider_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: siblings(
      `<p style="margin:0;color:var(--foreground-text-subtle)">Above the rule.</p>`,
      h(),
      `<p style="margin:0;color:var(--foreground-text-subtle)">Below the rule.</p>`,
    ),
  },
  examples: [
    {
      id: 'horizontal',
      title: 'Horizontal',
      description: 'Base is 1px border-base; --subtle swaps the token; --thin drops to 0.5px.',
      layout: 'fill',
      html: siblings(labelled('base', h()), labelled('subtle', h('grep-divider--subtle')), labelled('thin', h('grep-divider--thin')), labelled('subtle thin', h('grep-divider--subtle grep-divider--thin'))),
    },
    {
      id: 'vertical',
      title: 'Vertical',
      description: 'A vertical divider stretches to its flex parent’s height. Use a div with role="separator", not an hr.',
      html: `<div style="display:flex;align-items:stretch;gap:var(--space-24);height:var(--space-48)">
<span style="align-self:center;color:var(--foreground-text-subtle)">Files</span>
${v()}
<span style="align-self:center;color:var(--foreground-text-subtle)">Folders</span>
${v('grep-divider--subtle')}
<span style="align-self:center;color:var(--foreground-text-subtle)">Shared</span>
</div>`,
    },
    {
      id: 'tiers',
      title: 'The three line tiers',
      description: 'App regions get 1px border-base; sections inside a component get 1px border-subtle; a component’s own edge is a 0.5px inset ring — not this component.',
      layout: 'fill',
      html: `<div style="display:flex;flex-direction:column;border-radius:var(--radius-8);background:var(--background-component);box-shadow:inset 0 0 0 0.5px var(--border-base)">
<div style="padding:var(--space-10) var(--space-12);color:var(--foreground-text-subtle)">Section one — inside a component</div>
${h('grep-divider--subtle')}
<div style="padding:var(--space-10) var(--space-12);color:var(--foreground-text-subtle)">Section two — 1px border-subtle between them</div>
</div>`,
    },
  ],
}
