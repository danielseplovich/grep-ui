import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { icon14, plus } from './_shared'

const info = `<svg class="grep-label__info" viewBox="0 0 14 14" fill="none" aria-hidden="true"><circle cx="7" cy="7" r="5.5" stroke="currentColor" stroke-width="1.1"/><path d="M7 6.2v3.6M7 4.4v.1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round"/></svg>`

const label = (opts: { mods?: string; icon?: boolean; optional?: boolean; info?: boolean; badge?: boolean; text?: string; sub?: string | false } = {}) =>
  dedent(`
    <div class="grep-label${opts.mods ? ` ${opts.mods}` : ''}">
      <div class="grep-label__row">${opts.icon ? `\n        ${icon14('grep-label__icon')}` : ''}
        <div class="grep-label__group">
          <span class="grep-label__text">${opts.text ?? 'Label'}</span>${opts.optional ? `\n          <span class="grep-label__optional">(Optional)</span>` : ''}${
            opts.info ? `\n          ${info}` : ''
          }
        </div>${opts.badge ? `\n        <span class="grep-label__badge">${plus('', 8)}Label</span>` : ''}
      </div>${opts.sub === false ? '' : `\n      <p class="grep-label__sublabel">${opts.sub ?? 'This is some sublabel.'}</p>`}
    </div>`)

export const label_examples: ComponentExamples = {
  hero: {
    layout: 'column',
    html: label({ icon: true, optional: true, info: true, badge: true, text: 'Export preset', sub: 'Applies to every render in this collection.' }),
  },
  examples: [
    {
      id: 'base',
      title: 'Base and bold',
      description: 'Base pairs a 440 label with a dim sublabel; --bold pairs 500 with a subtle sublabel. Stick to the read pairings.',
      layout: 'column',
      html: siblings(label(), label({ mods: 'grep-label--bold grep-label--sub-subtle' })),
    },
    {
      id: 'lg',
      title: 'Large',
      description: '--lg raises the row to 18 and the label to 14px.',
      layout: 'column',
      html: siblings(label({ mods: 'grep-label--lg' }), label({ mods: 'grep-label--lg grep-label--bold grep-label--sub-subtle' })),
    },
    {
      id: 'sublabel-sizes',
      title: 'Sublabel sizes',
      description: 'SM and XS sublabels drop the 2px gap — their 1.4 leading supplies the space.',
      layout: 'column',
      html: siblings(label({ mods: 'grep-label--sub-sm grep-label--bold' }), label({ mods: 'grep-label--sub-xs grep-label--bold' })),
    },
    {
      id: 'path',
      title: 'Path',
      description: '--path swaps the sublabel to mono on a fixed-height line, for file paths.',
      layout: 'column',
      html: siblings(
        label({ mods: 'grep-label--path', text: 'ACAM.mov', sub: '/Media/Assets/…/ACAM.mov' }),
        label({ mods: 'grep-label--path grep-label--sub-xs', text: 'ACAM.mov', sub: '/Media/Assets/…/ACAM.mov' }),
      ),
    },
    {
      id: 'adornments',
      title: 'Adornments',
      description: 'Leading icon, (Optional), info icon and badge are independent booleans. The label, (Optional) and info icon cluster at gap 4; the icon and badge sit at 6.',
      layout: 'column',
      html: siblings(label({ icon: true }), label({ optional: true, info: true }), label({ badge: true }), label({ icon: true, optional: true, info: true, badge: true })),
    },
    {
      id: 'no-sublabel',
      title: 'Without a sublabel',
      layout: 'column',
      html: label({ sub: false, icon: true }),
    },
  ],
}

