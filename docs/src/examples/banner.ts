import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { avatarIcon, btn } from './_shared'

const banner = (type: 'info' | 'success' | 'warning' | 'danger', title: string, message: string, opts: { action?: boolean } = {}) =>
  dedent(`
    <div class="grep-banner grep-banner--${type}">
      <div class="grep-banner__pixels" aria-hidden="true"></div>
      <div class="grep-banner__card">
        <div class="grep-banner__body">
          <span class="grep-avatar grep-avatar--icon-tile grep-avatar--36">${avatarIcon()}</span>
          <div class="grep-banner__label">
            <span class="grep-banner__title">${title}</span>
            <p class="grep-banner__message">${message}</p>
          </div>
        </div>
        <div class="grep-banner__actions">
          ${btn('neutral', 'Dismiss').split('\n').join('\n          ')}${
            opts.action === false ? '' : `\n          ${btn(type === 'info' ? 'brand' : 'inverted', 'Action').split('\n').join('\n          ')}`
          }
        </div>
      </div>
    </div>`)

export const banner_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: banner('info', 'New in Grep', 'Collections can now be shared with a link. Try it on any folder.'),
  },
  examples: [
    {
      id: 'types',
      title: 'Types',
      description: 'Only the accent changes. Info takes a brand action button; success, warning and danger take --inverted. Dismiss is --neutral on all four.',
      layout: 'fill',
      html: siblings(
        banner('info', 'Info', 'This is a message.'),
        banner('success', 'Success', 'This is a message.'),
        banner('warning', 'Warning', 'This is a message.'),
        banner('danger', 'Danger', 'This is a message.'),
      ),
    },
    {
      id: 'tall',
      title: 'Taller banner',
      description: 'The pixel graphic is a repeating mask, so the squares stay 4px and sit flush at any height.',
      layout: 'fill',
      html: banner(
        'success',
        'Sync finished',
        'A longer message that wraps onto a second line, so the pixel strip has to keep its squares at 4px and stay flush at the top and bottom of a taller card.',
      ),
    },
  ],
}
