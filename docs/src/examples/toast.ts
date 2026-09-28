import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { btn } from './_shared'

const icons = {
  info: svg('toast-info'),
  success: svg('toast-success'),
  attention: svg('toast-attention'),
  warning: svg('toast-warning'),
  icon: svg('toast-spinner'),
}
const close = svg('toast-close', 'grep-icon-btn__icon')

const toast = (type: keyof typeof icons, style: 'message' | 'links' | 'buttons' = 'message', label = 'Label', message = 'The quick brown fox jumps over the lazy dog.') =>
  dedent(`
    <div class="grep-toast" role="status" aria-live="polite">
      <div class="grep-toast__main">
        <div class="grep-toast__content">
          ${icons[type]}
          <div class="grep-toast__text">
            <div class="grep-toast__label">${label}</div>
            <p class="grep-toast__message">${message}</p>
          </div>
        </div>
        <button class="grep-icon-btn grep-icon-btn--16 grep-icon-btn--ghost grep-toast__close" type="button" aria-label="Dismiss">${close}</button>
      </div>${
        style === 'links'
          ? `\n      <div class="grep-toast__actions grep-toast__actions--links">\n        <button class="grep-toast__link" type="button">Undo</button>\n        <button class="grep-toast__link" type="button">View</button>\n      </div>`
          : style === 'buttons'
            ? `\n      <div class="grep-toast__actions">\n        ${btn('neutral', 'Dismiss').split('\n').join('\n        ')}\n        ${btn('brand', 'Open').split('\n').join('\n        ')}\n      </div>`
            : ''
      }
    </div>`)

export const toast_examples: ComponentExamples = {
  hero: {
    html: toast('success', 'links', 'Upload complete', '14 files added to Q3 campaign.'),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'Only the icon changes — there is no coloured fill, border or accent bar. Note Attention draws the triangle and Warning the hexagon, as read.',
      layout: 'column',
      html: siblings(
        toast('info', 'message', 'Info'),
        toast('success', 'message', 'Success'),
        toast('attention', 'message', 'Attention'),
        toast('warning', 'message', 'Warning'),
        toast('icon', 'message', 'Rendering', 'Frame 212 of 480.'),
      ),
    },
    {
      id: 'links',
      title: 'With links',
      description: 'One or two text links, 13/500 in foreground-text-dim, aligned to the top of the actions row.',
      layout: 'column',
      html: toast('success', 'links', 'Moved to Archive', 'You can still find it in search.'),
    },
    {
      id: 'buttons',
      title: 'With buttons',
      description: 'One or two Buttons at 28; the second is --brand. The row is indented 28 to line up under the label.',
      layout: 'column',
      html: toast('warning', 'buttons', 'Storage almost full', '92% of your workspace quota is in use.'),
    },
  ],
}
