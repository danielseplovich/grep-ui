import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { avatarIcon, labelled } from './_shared'

const badgeSlot = `<span class="grep-avatar__badge"><span style="display:block;width:100%;height:100%;background:var(--background-accent-success);border:0.5px solid var(--background-canvas);border-radius:var(--radius-full)"></span></span>`

const av = (size?: number, extra = '', badge = false) =>
  dedent(`
    <span class="grep-avatar grep-avatar--icon-tile${size ? ` grep-avatar--${size}` : ''}${extra}">
      ${avatarIcon()}${badge ? `\n      ${badgeSlot}` : ''}
    </span>`)

export const avatar_examples: ComponentExamples = {
  hero: {
    html: siblings(av(40), av(40, ' grep-avatar--full'), av(40, '', true), av(32), av(24)),
  },
  examples: [
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Nine sizes. Padding and radius are read per size — they don’t scale proportionally. Omitting a size class gives 40.',
      html: siblings(...[12, 14, 16, 20, 24, 28, 32, 36, 40].map((s) => labelled(String(s), av(s)))),
    },
    {
      id: 'radius',
      title: 'Rounded and full',
      description: 'Per-size radius for files, apps, teams and integrations; --full for people.',
      html: siblings(labelled('rounded', av(40)), labelled('full', av(40, ' grep-avatar--full'))),
    },
    {
      id: 'badge',
      title: 'With a badge',
      description: 'A 14px badge overhangs the bottom-right corner by 2 on both axes, from size 24 up. The badge is a slot — fill it with a status dot, an app icon or an image.',
      html: siblings(...[24, 28, 32, 36, 40].map((s) => labelled(String(s), av(s, '', true)))),
    },
    {
      id: 'interactive',
      title: 'Interactive',
      description: 'Hover is gated behind --interactive so a decorative avatar in a list doesn’t light up. The overlay is layered on background-tile; hairline and shadow don’t change.',
      html: siblings(labelled('rest', av(40, ' grep-avatar--interactive')), labelled('hover', av(40, ' grep-avatar--interactive" data-state="hover'))),
      note: 'data-state="hover" forces the overlay for the preview.',
    },
  ],
}
