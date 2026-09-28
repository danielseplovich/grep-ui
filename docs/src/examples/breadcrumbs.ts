import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { icon14 } from './_shared'

const sep = svg('breadcrumbs-chevron', 'grep-breadcrumbs__sep')
const folder = svg('breadcrumbs-folder-example', 'grep-crumb__icon grep-crumb__icon--folder')
const dots = svg('breadcrumbs-overflow', 'grep-crumb__icon')

const crumb = (label: string, mods: string, visual: string | null = folder, extra = '') => {
  const active = mods.includes('active')
  const tag = active ? 'span' : 'button'
  const vis = visual ? `<span class="grep-crumb__visual">${visual}</span>` : ''
  const lab = label ? `<span class="grep-crumb__label">${label}</span>` : ''
  const a11y = active ? ' aria-current="page"' : !label ? ' aria-label="Show hidden path"' : ''
  return `<${tag} class="grep-crumb ${mods}"${tag === 'button' ? ' type="button"' : ''}${a11y}${extra}>${vis}${lab}</${tag}>`
}

const trail = (parts: string[], mods = '') =>
  dedent(`
    <nav class="grep-breadcrumbs${mods ? ` ${mods}` : ''}" aria-label="Breadcrumb">
      ${parts.join(`\n      ${sep}\n      `)}
    </nav>`)

export const breadcrumbs_examples: ComponentExamples = {
  hero: {
    html: trail([crumb('Projects', 'grep-crumb--folder'), crumb('', 'grep-crumb--icon-only', dots), crumb('Q3 campaign', 'grep-crumb--folder'), crumb('Assets', 'grep-crumb--folder grep-crumb--active')]),
  },
  examples: [
    {
      id: 'string',
      title: 'Full path',
      description: 'First crumb through to the active last crumb. The active crumb is the current location, so it is a span, not a button.',
      html: trail([crumb('Drive', 'grep-crumb--folder'), crumb('Projects', 'grep-crumb--folder'), crumb('Q3 campaign', 'grep-crumb--folder'), crumb('Assets', 'grep-crumb--folder grep-crumb--active')]),
    },
    {
      id: 'condensed',
      title: 'Condensed',
      description: 'A long path collapses to first › ⋯ › … › active. The overflow crumb is --icon-only with the three-dots asset.',
      html: trail([crumb('Drive', 'grep-crumb--folder'), crumb('', 'grep-crumb--icon-only', dots), crumb('Renders', 'grep-crumb--folder'), crumb('Final', 'grep-crumb--folder grep-crumb--active')]),
    },
    {
      id: 'two-items',
      title: 'Two items',
      html: trail([crumb('Projects', 'grep-crumb--folder'), crumb('Q3 campaign', 'grep-crumb--folder grep-crumb--active')], 'grep-breadcrumbs--two-items'),
    },
    {
      id: 'types',
      title: 'Crumb types',
      description: 'Folder, icon, icon-only and simplified. Both visual types resolve to a 16px slot holding a 14px glyph.',
      html: siblings(
        crumb('Folder', 'grep-crumb--folder'),
        crumb('Icon', 'grep-crumb--icon', icon14('grep-crumb__icon')),
        crumb('', 'grep-crumb--icon-only', dots),
        crumb('Simplified', 'grep-crumb--simplified', null),
      ),
    },
    {
      id: 'hover',
      title: 'Hover',
      description: 'Hover adds the overlay and clears the 0.88 dimming at the same time.',
      html: trail([crumb('Projects', 'grep-crumb--folder', folder, ' data-state="hover"'), crumb('', 'grep-crumb--icon-only', dots), crumb('Assets', 'grep-crumb--folder grep-crumb--active')]),
      note: 'The first crumb forces hover with data-state.',
    },
    {
      id: 'simplified',
      title: 'Simplified trail',
      description: 'Text-only, 16-high crumbs. Figma marks this type for tooltip use only — it is not a page-level breadcrumb.',
      html: trail(
        [crumb('Media', 'grep-crumb--simplified', null), crumb('Assets', 'grep-crumb--simplified', null), crumb('Renders', 'grep-crumb--simplified', null), crumb('ACAM.mov', 'grep-crumb--simplified', null)],
        'grep-breadcrumbs--simplified',
      ),
    },
  ],
}
