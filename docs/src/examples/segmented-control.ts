import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { labelled } from './_shared'

const icon = svg('segmented-control-icon-example', 'grep-segment__icon')

interface Seg {
  label?: string
  selected?: boolean
  icon?: boolean
  iconOnly?: boolean
  badge?: string
  state?: string
}

const segment = (s: Seg) =>
  s.iconOnly
    ? `<button class="grep-segment grep-segment--icon${s.selected ? ' grep-segment--selected' : ''}" type="button" role="tab" aria-selected="${!!s.selected}" aria-label="${s.label ?? 'Option'}"${s.state ? ` data-state="${s.state}"` : ''}>${icon}</button>`
    : `<button class="grep-segment${s.selected ? ' grep-segment--selected' : ''}" type="button" role="tab" aria-selected="${!!s.selected}"${s.state ? ` data-state="${s.state}"` : ''}>${s.icon ? icon : ''}${s.label ?? 'Label'}${
        s.badge ? `<span class="grep-segment__badge">${s.badge}</span>` : ''
      }</button>`

const track = (segs: Seg[], mods = '') =>
  dedent(`
    <div class="grep-segmented${mods ? ` ${mods}` : ''}" role="tablist" aria-label="View">
      ${segs.map(segment).join('\n      ')}
    </div>`)

export const segmented_control_examples: ComponentExamples = {
  hero: {
    html: track([{ label: 'Grid', selected: true, icon: true }, { label: 'List', icon: true }, { label: 'Board', icon: true }]),
  },
  examples: [
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Base (28, radius-6) and LG (32, radius-8). The track has no padding — segments sit flush, so the radii match.',
      html: siblings(labelled('28', track([{ label: 'Day', selected: true }, { label: 'Week' }])), labelled('32', track([{ label: 'Day', selected: true }, { label: 'Week' }], 'grep-segmented--32'))),
    },
    {
      id: 'options',
      title: 'Two to four options',
      html: siblings(
        track([{ label: 'On', selected: true }, { label: 'Off' }]),
        track([{ label: 'Day', selected: true }, { label: 'Week' }, { label: 'Month' }]),
        track([{ label: 'All', selected: true }, { label: 'Images' }, { label: 'Video' }, { label: 'Audio' }]),
      ),
    },
    {
      id: 'icons',
      title: 'Icons',
      description: 'A 14px icon before the label, or icon-only segments padded to a square.',
      html: siblings(track([{ label: 'Grid', selected: true, icon: true }, { label: 'List', icon: true }]), track([{ label: 'Grid', selected: true, iconOnly: true }, { label: 'List', iconOnly: true }, { label: 'Board', iconOnly: true }])),
    },
    {
      id: 'badge',
      title: 'With a count',
      description: 'The badge is a Badge SM (18) in the Neutral Base tone.',
      html: siblings(track([{ label: 'Open', selected: true, badge: '12' }, { label: 'Done', badge: '3' }]), track([{ label: 'Open', selected: true, icon: true, badge: '12' }, { label: 'Done', icon: true, badge: '3' }], 'grep-segmented--32')),
    },
    {
      id: 'hover',
      title: 'Hover',
      description: 'Hover only shifts the ink to foreground-text-subtle — no fill, no overlay. Selection is the only thing that draws a surface.',
      html: track([{ label: 'Selected', selected: true }, { label: 'Hover', state: 'hover' }, { label: 'Default' }]),
      note: 'The middle segment forces hover with data-state.',
    },
  ],
}
