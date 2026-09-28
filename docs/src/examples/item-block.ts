import { dedent, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { avatarIcon, badge, btn, icon14, kbd, spinner } from './_shared'

const tile = `<span class="grep-item-row__tile">${svg('avatar-icon-example', '')}</span>`
const chevron = svg('breadcrumbs-chevron', 'grep-item-row__chevron')

const toggle = (on: boolean) =>
  `<span class="grep-toggle grep-toggle--md${on ? ' grep-toggle--on' : ''}" role="switch" aria-checked="${on}"><span class="grep-toggle__track"><span class="grep-toggle__thumb"></span></span></span>`

const input = `<div class="grep-input" style="width:300px;flex-shrink:0"><div class="grep-input__field"><input class="grep-input__control" placeholder="Enter…"></div></div>`
const select = `<div class="grep-input" style="width:300px;flex-shrink:0"><button class="grep-input__field grep-select" type="button" aria-haspopup="listbox"><span class="grep-select__value grep-select__value--placeholder">Select…</span>${svg('select-chevron', 'grep-select__chevron')}</button></div>`
const iconBtn = `<button class="grep-icon-btn grep-icon-btn--neutral grep-icon-btn--28" aria-label="Add">${icon14('grep-icon-btn__icon')}${spinner()}</button>`
const avatar = `<span class="grep-avatar grep-avatar--icon-tile grep-avatar--36 grep-avatar--full">${avatarIcon()}</span>`

const row = (opts: { label: string; sub?: string; slots?: string; rule?: boolean; mods?: string; tile?: boolean; attrs?: string }) =>
  dedent(`
    <div class="grep-item-row${opts.mods ? ` ${opts.mods}` : ''}"${opts.attrs ?? ''}>
      <div class="grep-item-row__internal">
        <div class="grep-item-row__left">${opts.tile === false ? '' : `\n          ${tile}`}
          <div class="grep-item-row__label-frame">
            <div class="grep-item-row__label">
              <span class="grep-item-row__label-row">${opts.label}</span>
              <p class="grep-item-row__sublabel">${opts.sub ?? 'Some context.'}</p>
            </div>
          </div>
        </div>${opts.slots ? `\n        ${opts.slots}` : ''}
      </div>${opts.rule === false ? '' : `\n      <hr class="grep-item-row__rule">`}
    </div>`)

const block = (title: string, rows: string[]) =>
  dedent(`
    <section class="grep-item-block">
      <h3 class="grep-item-block__title">${title}</h3>
      <div class="grep-item-block__group">
    ${rows.map((r) => r.split('\n').map((l) => '    ' + l).join('\n')).join('\n')}
      </div>
    </section>`)

export const item_block_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: block('Workspace', [
      row({ label: 'Name', sub: 'Shown to everyone in the workspace.', slots: input }),
      row({ label: 'Region', sub: 'Where new uploads are stored.', slots: select }),
      row({ label: 'Auto-sync', sub: 'Mirror this drive locally.', slots: toggle(true) }),
      row({ label: 'Members', sub: '12 people, 3 pending.', slots: chevron, mods: 'grep-item-row--interactive', rule: false }),
    ]),
  },
  examples: [
    {
      id: 'interactive',
      title: 'Interactive rows',
      description: 'A chevron marks a row that opens something. Hover layers a subtle overlay; open flips the chevron down.',
      layout: 'fill',
      html: block('Account', [
        row({ label: 'Default', slots: chevron, mods: 'grep-item-row--interactive' }),
        row({ label: 'Hover', slots: chevron, mods: 'grep-item-row--interactive', attrs: ' data-state="hover"' }),
        row({ label: 'Open', slots: chevron, mods: 'grep-item-row--interactive grep-item-row--open', rule: false }),
      ]),
      note: 'The second row forces hover with data-state.',
    },
    {
      id: 'slots',
      title: 'Trailing slots',
      description: 'Every trailing element is an independent boolean in Figma. In CSS they are children of __internal, spaced by the 12px gap.',
      layout: 'fill',
      html: block('Slots', [
        row({ label: 'Toggle', slots: toggle(false) }),
        row({ label: 'Input', slots: input }),
        row({ label: 'Select', slots: select }),
        row({ label: 'Two buttons', slots: `${btn('neutral', 'Label')}\n        ${btn('neutral', 'Label')}` }),
        row({ label: 'Badge + icon button', slots: `${badge('success', 'Active')}\n        ${iconBtn}` }),
        row({ label: 'Avatar', slots: avatar }),
        row({ label: 'Shortcut', slots: `${kbd(['cmd', 'K'])}\n        ${chevron}`, mods: 'grep-item-row--interactive', rule: false }),
      ]),
    },
    {
      id: 'no-tile',
      title: 'Without a tile',
      description: 'The 136px label frame keeps every row’s trailing content aligned even when the tile is off.',
      layout: 'fill',
      html: block('Preferences', [
        row({ label: 'Compact rows', tile: false, slots: toggle(true) }),
        row({ label: 'Show hidden files', tile: false, slots: toggle(false), rule: false }),
      ]),
    },
  ],
}
