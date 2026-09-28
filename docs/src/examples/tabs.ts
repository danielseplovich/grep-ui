import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { labelled } from './_shared'

const icon = svg('tab-icon-example', 'grep-tab__icon')

interface Tab {
  label: string
  selected?: boolean
  icon?: boolean
  badge?: string
  state?: string
}

const tab = (t: Tab, mods = '') =>
  `<button class="grep-tab${mods}${t.selected ? ' grep-tab--selected' : ''}" type="button" role="tab" aria-selected="${!!t.selected}"${t.state ? ` data-state="${t.state}"` : ''}>${t.icon ? icon : ''}${t.label}${
    t.badge ? `<span class="grep-tab__badge">${t.badge}</span>` : ''
  }</button>`

const tabs = (list: Tab[], mods = '') =>
  dedent(`
    <div class="grep-tabs" role="tablist" aria-label="Views">
      ${list.map((t) => tab(t, mods)).join('\n      ')}
    </div>`)

export const tabs_examples: ComponentExamples = {
  hero: {
    html: tabs([{ label: 'Overview', selected: true }, { label: 'Assets', badge: '24' }, { label: 'Activity' }, { label: 'Settings' }]),
  },
  examples: [
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Base (28), LG (32) and XL (36). Only the box grows — the icon stays 14 and the label 13/500.',
      layout: 'column',
      html: siblings(
        labelled('28', tabs([{ label: 'Overview', selected: true }, { label: 'Assets' }, { label: 'Activity' }])),
        labelled('32', tabs([{ label: 'Overview', selected: true }, { label: 'Assets' }, { label: 'Activity' }], ' grep-tab--32')),
        labelled('36', tabs([{ label: 'Overview', selected: true }, { label: 'Assets' }, { label: 'Activity' }], ' grep-tab--36')),
      ),
    },
    {
      id: 'full',
      title: 'Pill shape',
      description: '--full switches to radius-full and widens the padding, because a pill needs more room than a rounded tab at the same height.',
      layout: 'column',
      html: siblings(
        tabs([{ label: 'Overview', selected: true }, { label: 'Assets' }, { label: 'Activity' }], ' grep-tab--full'),
        tabs([{ label: 'Overview', selected: true }, { label: 'Assets' }, { label: 'Activity' }], ' grep-tab--full grep-tab--36'),
      ),
    },
    {
      id: 'icons',
      title: 'Icons and counts',
      description: 'The icon runs one step behind the label in opacity. The count is a Badge SM (18) in the Neutral Base tone.',
      html: tabs([{ label: 'Files', selected: true, icon: true, badge: '128' }, { label: 'Folders', icon: true, badge: '12' }, { label: 'Shared', icon: true }]),
    },
    {
      id: 'states',
      title: 'States',
      description: 'Hover draws no surface — the label just comes up to full strength. Focus raises the surface and the ring, but keeps a dim label: focus is not selection.',
      html: tabs([{ label: 'Selected', selected: true }, { label: 'Hover', state: 'hover' }, { label: 'Focused', state: 'focused' }, { label: 'Default' }]),
      note: 'Hover and focused are forced with data-state.',
    },
  ],
}
