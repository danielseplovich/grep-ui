import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { checkbox, icon14 } from './_shared'

const labelIcon = icon14('grep-input__label-icon')
const caret = svg('caret-down', '')
const copyIcon = svg('copy', '')
const rule = `<span class="grep-input__rule"></span>`
const btn = (ic: string, label: string) => `<button class="grep-input__button" type="button" aria-label="${label}">${ic}</button>`

const field = (opts: {
  title: string
  body: string
  sub?: string | false
  help?: string | false
  mods?: string
  attrs?: string
  icon?: boolean
}) =>
  dedent(`
    <div class="grep-input${opts.mods ? ` ${opts.mods}` : ''}"${opts.attrs ?? ''}>
      <div class="grep-input__label">
        <span class="grep-input__label-row">${opts.icon ? labelIcon : ''}${opts.title}</span>${
          opts.sub === false ? '' : `\n        <p class="grep-input__sublabel">${opts.sub ?? 'This is some sublabel.'}</p>`
        }
      </div>
      <div class="grep-input__field-container">
        <div class="grep-input__field">
          ${opts.body}
        </div>${opts.help === false ? '' : `\n        <p class="grep-input__help">${opts.help ?? 'This is some help text.'}</p>`}
      </div>
    </div>`)

const ctl = (ph: string, extra = '') => `<input class="grep-input__control" placeholder="${ph}"${extra}>`

const text = field({ title: 'Name', body: ctl('Enter a name…'), icon: true, sub: 'Shown on the asset card.', help: 'Up to 64 characters.' })

export const input_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: siblings(
      field({
        title: 'Budget',
        icon: true,
        sub: 'Per campaign, before tax.',
        help: 'Converted at today’s rate.',
        body: `<span class="grep-input__addon">${btn(copyIcon, 'Copy')}${rule}</span>
          ${ctl('0.00')}
          <span class="grep-input__addon">${rule}<span class="grep-input__unit">USD</span></span>`,
      }),
    ),
  },
  examples: [
    {
      id: 'text',
      title: 'Text',
      description: 'Label, sublabel, field and help text are one shell. Label and help text are both optional.',
      layout: 'fill',
      html: text,
    },
    {
      id: 'addons',
      title: 'Addons',
      description: 'Addons are flush to the field edge, separated by a 1px border-subtle rule. Password reveals, number steps, currency has a leading button and a mono unit.',
      layout: 'fill',
      html: siblings(
        field({ title: 'Password', body: `${ctl('••••••••', ' type="password"')}\n          <span class="grep-input__addon">${rule}${btn(icon14(''), 'Show password')}</span>`, sub: false, help: false }),
        field({ title: 'Number', body: `${ctl('0', ' inputmode="numeric"')}\n          <span class="grep-input__addon">${rule}${btn(caret, 'Decrease')}${rule}${btn(caret, 'Increase')}</span>`, sub: false, help: false }),
        field({ title: 'Currency', body: `<span class="grep-input__addon">${btn(copyIcon, 'Copy')}${rule}</span>\n          ${ctl('0.00')}\n          <span class="grep-input__addon">${rule}<span class="grep-input__unit">USD</span></span>`, sub: false, help: false }),
        field({ title: 'Time', body: `${ctl('HH : MM')}\n          <span class="grep-input__addon">${rule}<span class="grep-input__unit">EST</span></span>`, sub: false, help: false }),
      ),
    },
    {
      id: 'inset',
      title: 'Inset controls',
      description: 'Checkbox and rating types put a control in an __inset cell instead of text.',
      layout: 'fill',
      html: siblings(
        field({ title: 'Checkbox', body: `<span class="grep-input__inset">${checkbox('checked').split('\n').join('\n            ')}</span>`, sub: false, help: false }),
        field({
          title: 'Rating',
          body: `<span class="grep-input__inset" style="gap:var(--space-2);color:var(--background-accent-favorite)">★★★<span style="color:var(--foreground-icon-faint)">★★</span></span>`,
          sub: false,
          help: false,
        }),
      ),
    },
    {
      id: 'sizes',
      title: 'Sizes',
      description: 'Base is a 28 field with 8 of control padding; --32 is 32 with 10. Radius, gaps and text styles stay put.',
      layout: 'fill',
      html: siblings(
        field({ title: 'Base (28)', body: ctl('Enter…'), sub: false, help: false }),
        field({ title: 'LG (32)', body: ctl('Enter…'), sub: false, help: false, mods: 'grep-input--32' }),
      ),
    },
    {
      id: 'states',
      title: 'States',
      description: 'Hover thickens the hairline to 1px (read from Figma). Focus, error and disabled are inferred from system precedent.',
      layout: 'fill',
      html: siblings(
        field({ title: 'Hover', body: ctl('Enter…'), sub: false, help: false, attrs: ' data-state="hover"' }),
        field({ title: 'Focused', body: ctl('Enter…'), sub: false, help: false, attrs: ' data-state="focused"' }),
        field({ title: 'Filled', body: `<input class="grep-input__control" value="Q3 campaign assets">`, sub: false, help: false }),
        field({ title: 'Error', body: ctl('Enter…'), sub: false, help: 'That name is already taken.', mods: 'grep-input--error' }),
        field({ title: 'Disabled', body: ctl('Enter…'), sub: false, help: false, mods: 'grep-input--disabled' }),
      ),
      note: 'Hover and focused are forced with data-state.',
    },
  ],
}
