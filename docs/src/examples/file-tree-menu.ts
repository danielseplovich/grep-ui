import { dedent, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { checkbox } from './_shared'

const caret = svg('file-tree-caret', '')
const searchIcon = svg('file-tree-search', 'grep-tree-menu__search-icon')
const folder = svg('breadcrumbs-folder-example', '')
const file = svg('photo-stack', '')

interface Row {
  depth?: number
  caret?: 'open' | 'closed' | 'none'
  label: string
  checked?: boolean
  state?: 'hover' | 'selected'
  file?: boolean
}

const row = (r: Row, type: 'text' | 'checkbox') => {
  const guides = Array.from({ length: r.depth ?? 0 }, () => `<span class="grep-tree-item__guide"></span>`).join('')
  const c =
    r.caret === 'none'
      ? `<button class="grep-tree-item__caret grep-tree-item__caret--empty" type="button" tabindex="-1" aria-hidden="true">${caret}</button>`
      : `<button class="grep-tree-item__caret" type="button" aria-label="${r.caret === 'closed' ? 'Expand' : 'Collapse'}" aria-expanded="${r.caret !== 'closed'}">${caret}</button>`
  const ctl = type === 'checkbox' ? `<span class="grep-tree-item__control">${checkbox(r.checked ? 'checked' : '').replace(/\n\s*/g, '')}</span>` : ''
  const mods = [r.caret === 'closed' ? ' grep-tree-item--collapsed' : '', r.state === 'selected' ? ' grep-tree-item--selected' : ''].join('')
  const hov = r.state === 'hover' ? ' data-state="hover"' : ''
  return `<li class="grep-tree-item${mods}"${hov}>${guides}${c}
    <div class="grep-tree-item__frame">${ctl}
      <span class="grep-tree-item__visual">${r.file ? file : folder}</span>
      <span class="grep-tree-item__label">${r.label}</span>
    </div>
  </li>`
}

const rows: Row[] = [
  { label: '01_Drafts', checked: true },
  { depth: 1, label: 'Concepts' },
  { depth: 2, caret: 'none', label: 'moodboard_v3.png', file: true, state: 'hover' },
  { depth: 2, caret: 'none', label: 'storyboard_final.pdf', file: true, checked: true, state: 'selected' },
  { depth: 1, caret: 'closed', label: 'Archive' },
  { caret: 'closed', label: '02_Shoots' },
  { caret: 'none', label: 'brief.md', file: true },
]

const menu = (type: 'text' | 'checkbox', heading = false) =>
  dedent(`
    <div class="grep-tree-menu" style="width:300px">
      <div style="display:flex;align-items:center">
        ${searchIcon.replace('<svg', '<svg style="margin:var(--space-6) 0 var(--space-6) var(--space-14)"')}
        <input class="grep-tree-menu__search" style="flex:1;margin-left:0" placeholder="Search files and folders…" aria-label="Search files and folders">
      </div>
      <hr class="grep-tree-menu__rule">
      <ul class="grep-tree-menu__list" role="tree">${
        heading ? `\n      <li class="grep-tree-menu__heading">Drive<button class="grep-tree-menu__heading-action" type="button">Select all</button></li>` : ''
      }
      ${rows.map((r) => row(r, type)).join('\n      ')}
      </ul>
    </div>`)

export const file_tree_menu_examples: ComponentExamples = {
  hero: { html: menu('checkbox', true), tall: true },
  examples: [
    {
      id: 'text',
      title: 'Text type',
      description: 'No control cell — caret, icon and label. Depth is expressed by repeating __guide, which draws the tree lines.',
      html: menu('text'),
      tall: true,
    },
    {
      id: 'checkbox',
      title: 'Checkbox type',
      description: 'A .grep-checkbox in the control slot. The menu doesn’t restyle it. The optional heading row carries a "Select all" action.',
      html: menu('checkbox', true),
      tall: true,
    },
  ],
}
