import { dedent, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'

const chevron = svg('breadcrumbs-chevron', 'grep-menu__item-chevron')
const searchIcon = svg('file-tree-search', 'grep-menu__search-icon')
const icons = {
  collection: svg('photo-stack', 'grep-menu__item-icon'),
  pin: svg('pin', 'grep-menu__item-icon'),
  rename: svg('settings-general', 'grep-menu__item-icon'),
  move: svg('arrow-right-down', 'grep-menu__item-icon'),
  copy: svg('copy', 'grep-menu__item-icon'),
  download: svg('mount-drive', 'grep-menu__item-icon'),
  duplicate: svg('verical-stack-fill', 'grep-menu__item-icon'),
  trash: svg('trash-fill', 'grep-menu__item-icon'),
}

const item = (label: string, icon: string, opts: { sub?: boolean; danger?: boolean; state?: string } = {}) =>
  `<button class="grep-menu__item${opts.danger ? ' grep-menu__item--danger' : ''}" type="button" role="menuitem"${opts.state ? ` data-state="${opts.state}"` : ''}${
    opts.state === 'disabled' ? ' disabled' : ''
  }>
      <span class="grep-menu__item-left">${icon}${label}</span>
      <span class="grep-menu__item-right">${opts.sub ? chevron : ''}</span>
    </button>`

const section = (inner: string[]) => `<div class="grep-menu__section">\n    ${inner.join('\n    ')}\n  </div>`
const header = (t: string) => `<div class="grep-menu__header">${t}</div>`
const rule = `<hr class="grep-menu__rule">`

const menu = (parts: string[], opts: { searchable?: boolean; scrollable?: boolean } = {}) =>
  dedent(`
    <div class="grep-menu" role="menu">${
      opts.searchable
        ? `\n  <div style="display:flex;align-items:center;padding-left:var(--space-14)">\n    ${searchIcon}\n    <input class="grep-menu__search" style="flex:1;margin-left:0" placeholder="Search…" aria-label="Search actions">\n  </div>\n  ${rule}`
        : ''
    }
  ${parts.join('\n  ')}${opts.scrollable ? `\n  <div class="grep-menu__scrollbar" aria-hidden="true"><span></span></div>` : ''}
</div>`)

const base = [
  section([header('4 assets'), item('Add to collection', icons.collection, { sub: true }), item('Pin to cache', icons.pin)]),
  rule,
  section([header('General'), item('Rename', icons.rename), item('Move', icons.move), item('Copy', icons.copy), item('Download', icons.download, { sub: true })]),
  rule,
  section([item('Move to trash', icons.trash, { danger: true })]),
]

export const context_menu_examples: ComponentExamples = {
  hero: {
    html: menu(base),
    tall: true,
  },
  examples: [
    {
      id: 'sections',
      title: 'Sections and headers',
      description: 'Each section is a 6px-padded block, separated by a 1px border-subtle rule. A header is 12/500 dim.',
      html: menu(base),
      tall: true,
    },
    {
      id: 'searchable',
      title: 'Searchable and scrollable',
      description: 'searchable adds the field and its rule above the first section; scrollable adds a 6px bar at the right edge.',
      html: menu(base, { searchable: true, scrollable: true }),
      tall: true,
    },
    {
      id: 'states',
      title: 'Item states',
      description: 'Hover, disabled and danger are inferred — no state variant was read. Figma’s "Move to trash" is not recoloured.',
      html: menu([
        section([header('States'), item('Default', icons.rename), item('Hover', icons.move, { state: 'hover' }), item('Disabled', icons.duplicate, { state: 'disabled' }), item('Danger', icons.trash, { danger: true })]),
      ]),
      note: 'The hover row is forced with data-state.',
    },
  ],
}
