import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { labelled } from './_shared'

const tail = `<span class="grep-tooltip__tail">${svg('tooltip-tail', 'grep-tooltip__tail-svg')}</span>`
const chev = svg('tooltip-crumb-chevron', 'grep-breadcrumbs__sep')

const sentence = `<p class="grep-tooltip__text">This is some tooltip that spans two or more lines<br>and contains information that helps the user.</p>`
const shortcut = `<span class="grep-tooltip__shortcut">
    <span class="grep-tooltip__shortcut-label">Open search</span>
    <span class="grep-tooltip__keys">
      <span class="grep-kbd grep-kbd--icon">${svg('tooltip-key-command', 'grep-kbd__icon')}</span>
      <span class="grep-kbd grep-kbd--letter"><span>K</span></span>
    </span>
  </span>`
const crumbs = `<span class="grep-breadcrumbs grep-breadcrumbs--simplified">
    <span class="grep-crumb grep-crumb--simplified">Media</span>
    ${chev}
    <span class="grep-crumb grep-crumb--simplified">Assets</span>
    ${chev}
    <span class="grep-crumb grep-crumb--simplified">ACAM.mov</span>
  </span>`

const tip = (body: string, place = '') =>
  dedent(`
    <div class="grep-tooltip${place
      .split(' ')
      .filter(Boolean)
      .map((p) => ` grep-tooltip--${p}`)
      .join('')}" role="tooltip">
      ${body}${place ? `\n      ${tail}` : ''}
    </div>`)

export const tooltip_examples: ComponentExamples = {
  hero: {
    html: siblings(tip(sentence, 'bottom middle')),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'Sentence, keyboard shortcut and a simplified breadcrumb trail. Nothing is restyled — the trail and key caps go in as-is.',
      html: siblings(labelled('sentence', tip(sentence, 'top left')), labelled('shortcut', tip(shortcut, 'top left')), labelled('breadcrumbs', tip(crumbs, 'top left'))),
      tall: true,
    },
    {
      id: 'placement',
      title: 'Tail placement',
      description: 'Two axes: the edge the tail leaves from (top or bottom) and where along it (left 12, right 8, or centred).',
      html: siblings(
        labelled('top left', tip(shortcut, 'top left')),
        labelled('top middle', tip(shortcut, 'top middle')),
        labelled('top right', tip(shortcut, 'top right')),
        labelled('bottom left', tip(shortcut, 'bottom left')),
        labelled('bottom middle', tip(shortcut, 'bottom middle')),
        labelled('bottom right', tip(shortcut, 'bottom right')),
      ),
      tall: true,
    },
    {
      id: 'no-arrow',
      title: 'No arrow',
      description: 'Omit both placement classes and the tail element. Figma: use it when there isn’t enough vertical room for a top or bottom variant.',
      html: tip(sentence),
    },
  ],
}
