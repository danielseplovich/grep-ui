import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'

const icon = svg('file-tree-search', 'grep-search__icon')
const shortcut = `<span class="grep-search__shortcut">
        <span class="grep-kbd grep-kbd--icon">${svg('keyboard-shortcut-icon-16', 'grep-kbd__icon')}</span>
        <span class="grep-kbd grep-kbd--letter"><span>F</span></span>
      </span>`

const search = (opts: { mods?: string; state?: string; value?: string; placeholder?: string; shortcut?: boolean; label?: string } = {}) =>
  dedent(`
    <div class="grep-search${opts.mods ? ` ${opts.mods}` : ''}"${opts.state ? ` data-state="${opts.state}"` : ''}>
      <span class="grep-search__label">
        ${icon}
        <input class="grep-search__input" type="search" placeholder="${opts.placeholder ?? 'Search…'}" aria-label="${opts.label ?? 'Search'}"${opts.value ? ` value="${opts.value}"` : ''}>
      </span>${opts.shortcut === false ? '' : `\n      ${shortcut}`}
    </div>`)

const labelled = (label: string, inner: string) =>
  `<div style="display:flex;flex-direction:column;gap:var(--space-6)">\n<span style="font-size:var(--text-xs);color:var(--foreground-text-dim)">${label}</span>\n${inner}\n</div>`

export const search_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: search({ placeholder: 'Search files and folders…' }),
  },
  examples: [
    {
      id: 'types',
      title: 'Field and ghost',
      description: 'Ghost drops the fill and the hairline. The LG ghost keeps a faint drop shadow.',
      layout: 'fill',
      html: siblings(labelled('field', search()), labelled('ghost', search({ mods: 'grep-search--ghost', shortcut: false }))),
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Base is h28 / padding-x 8; LG is h32 / padding-x 10 — the same step the Input uses.',
      layout: 'fill',
      html: siblings(labelled('28', search()), labelled('32', search({ mods: 'grep-search--32' })), labelled('32 ghost', search({ mods: 'grep-search--ghost grep-search--32', shortcut: false }))),
    },
    {
      id: 'states',
      title: 'States',
      description: 'Hover thickens the hairline to 1px; focus takes the 2.5px input ring; danger swaps in the red twin.',
      layout: 'fill',
      html: siblings(
        labelled('hover', search({ state: 'hover' })),
        labelled('focused', search({ state: 'focused' })),
        labelled('filled', search({ value: 'moodboard' })),
        labelled('danger', search({ mods: 'grep-search--danger', value: 'moodboard' })),
      ),
      note: 'Hover and focused are forced with data-state.',
    },
  ],
}
