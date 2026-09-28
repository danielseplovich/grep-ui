import { dedent, type ComponentExamples } from '../lib/examples'
import { svg } from '../lib/icons'
import { badge, btn } from './_shared'

const close = svg('toast-close', 'grep-icon-btn__icon')

/* The overlay is position: fixed in the library. For a docs preview it is
   contained by wrapping it in a positioned stage of its own. */
const stage = (inner: string) =>
  `<div style="position:relative;width:100%;min-height:360px;border-radius:var(--radius-8);overflow:clip;background:var(--background-canvas)">\n${inner}\n</div>`

const modal = (opts: { size?: '520'; sub?: boolean; body: string; confirm?: string; danger?: boolean; lead?: string }) =>
  dedent(`
    <div class="grep-modal-overlay" style="position:absolute">
      <div class="grep-modal${opts.size ? ` grep-modal--${opts.size}` : ''}" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <div class="grep-modal__header">
          <div class="grep-modal__heading">
            <h2 class="grep-modal__title" id="modal-title">${opts.danger ? 'Delete collection?' : 'Rename collection'}</h2>${
              opts.sub === false ? '' : `\n            <p class="grep-modal__subtitle">${opts.danger ? 'This can’t be undone.' : 'Everyone with access will see the new name.'}</p>`
            }
          </div>
          <button class="grep-icon-btn grep-icon-btn--24 grep-icon-btn--ghost" type="button" aria-label="Close">${close}</button>
        </div>
        <div class="grep-modal__body">${opts.body}</div>
        <div class="grep-modal__footer">${opts.lead ? `\n          <span class="grep-modal__footer-lead">${opts.lead}</span>` : ''}
          ${btn('neutral', 'Cancel').split('\n').join('\n          ')}
          ${btn(opts.danger ? 'danger' : 'brand', opts.confirm ?? 'Confirm').split('\n').join('\n          ')}
        </div>
      </div>
    </div>`)

const form = `
          <div class="grep-input">
            <div class="grep-input__label"><span class="grep-input__label-row">Name</span></div>
            <div class="grep-input__field-container">
              <div class="grep-input__field"><input class="grep-input__control" value="Q3 campaign"></div>
              <p class="grep-input__help">Up to 64 characters.</p>
            </div>
          </div>
        `

export const modal_examples: ComponentExamples = {
  hero: {
    layout: 'fill',
    html: stage(modal({ body: form, confirm: 'Rename' })),
  },
  examples: [
    {
      id: 'confirm',
      title: 'Confirm',
      description: 'The 400 default — a title, one line of context and two actions.',
      layout: 'fill',
      html: stage(modal({ body: 'This will remove the collection and everything in it.', danger: true, confirm: 'Delete', sub: false })),
    },
    {
      id: 'wide',
      title: 'Wide with a footer lead',
      description: '--520 for forms and content. __footer-lead pushes the actions right, for a count, a checkbox or a secondary link.',
      layout: 'fill',
      html: stage(
        modal({
          size: '520',
          body: form,
          confirm: 'Save',
          lead: badge('neutral-dim', '8 items', 18),
        }),
      ),
    },
  ],
}
