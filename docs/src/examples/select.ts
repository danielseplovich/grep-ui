import { dedent, siblings, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { avatarIcon, badge } from './_shared'

const chevron = svg('select-chevron', 'grep-select__chevron')

const select = (inner: string, opts: { lg?: boolean; disabled?: boolean; state?: string; title?: string; sub?: string | false; help?: string | false } = {}) =>
  dedent(`
    <div class="grep-input${opts.lg ? ' grep-input--32' : ''}${opts.disabled ? ' grep-input--disabled' : ''}"${opts.state ? ` data-state="${opts.state}"` : ''}>
      <div class="grep-input__label">
        <div class="grep-input__label-row">${opts.title ?? 'Select'}</div>${
          opts.sub === false ? '' : `\n        <p class="grep-input__sublabel">${opts.sub ?? 'This is some sublabel.'}</p>`
        }
      </div>
      <div class="grep-input__field-container">
        <button class="grep-input__field grep-select" type="button" aria-haspopup="listbox" aria-expanded="false">
          ${inner}
          ${chevron}
        </button>${opts.help === false ? '' : `\n        <p class="grep-input__help">${opts.help ?? 'This is some help text.'}</p>`}
      </div>
    </div>`)

const placeholder = `<span class="grep-select__value grep-select__value--placeholder">Select…</span>`
const textValue = (t: string) => `<span class="grep-select__value">${t}</span>`
const objectFill = `<span class="grep-select__fill">
            <span class="grep-select__object">
              <span class="grep-select__object-visual"><span class="grep-avatar grep-avatar--icon-tile grep-avatar--14">${avatarIcon()}</span></span>
              <span class="grep-select__object-label">Mountain Ad</span>
            </span>
          </span>`
const multi = (size: 18 | 22) =>
  `<span class="grep-select__fill">
            ${badge('orange', 'Photo', size)}
            ${badge('blue', 'Video', size)}
            ${badge('cyan', 'Long label', size)}
            ${badge('neutral-dim', '14+', size)}
          </span>`

export const select_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: select(placeholder, { title: 'Collection', sub: 'Where this asset lives.', help: 'You can move it later.' }),
  },
  examples: [
    {
      id: 'fills',
      title: 'Fills',
      description: 'Whatever sits in the value slot is a 1 0 0 flex child, so the chevron never moves.',
      layout: 'fill',
      html: siblings(
        select(placeholder, { title: 'Empty', sub: false, help: false }),
        select(textValue('Q3 campaign'), { title: 'Text', sub: false, help: false }),
        select(`<span class="grep-select__fill">${badge('blue', 'Label', 22)}</span>`, { title: 'Badge', sub: false, help: false, lg: true }),
        select(objectFill, { title: 'Object', sub: false, help: false }),
      ),
    },
    {
      id: 'multi',
      title: 'Multi select',
      description: 'Badge size follows field size: a 28 field takes --18 badges with gap 6, a 32 field takes --22 with gap 8. The overflow count is the last badge, --neutral-dim.',
      layout: 'fill',
      html: siblings(select(multi(18), { title: 'Tags (28)', sub: false, help: false }), select(multi(22), { title: 'Tags (32)', sub: false, help: false, lg: true })),
    },
    {
      id: 'states',
      title: 'States',
      description: 'All inherited from Input: hover thickens the hairline, focus adds the 2.5px input ring, disabled is opacity.',
      layout: 'fill',
      html: siblings(
        select(placeholder, { title: 'Hover', sub: false, help: false, state: 'hover' }),
        select(placeholder, { title: 'Focused', sub: false, help: false, state: 'focused' }),
        select(placeholder, { title: 'Disabled', sub: false, help: false, disabled: true }),
      ),
      note: 'Hover and focused are forced with data-state.',
    },
  ],
}
