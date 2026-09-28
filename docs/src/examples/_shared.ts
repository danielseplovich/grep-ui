import { dedent } from '../lib/examples'
import { svg } from '../lib/icons'

/* Shared building blocks used across the example files. Every glyph is a real
   exported asset from the library, inlined. */

export const icon14 = (cls: string) => svg('icon-button-icon-example', cls)
export const spinner = () => svg('button-spinner', 'grep-btn__spinner')
export const plus = (cls: string, size = 14) =>
  `<svg class="${cls}" viewBox="0 0 ${size} ${size}" fill="none" aria-hidden="true"><path d="M${size / 2} ${size * 0.2}v${size * 0.6}M${size * 0.2} ${size / 2}h${size * 0.6}" stroke="currentColor" stroke-width="1.25" stroke-linecap="round"/></svg>`

export const avatarIcon = () => svg('avatar-icon-example', 'grep-avatar__icon')

export const btn = (type: 'brand' | 'neutral' | 'inverted' | 'danger', label: string, opts: { icon?: boolean; state?: string } = {}) =>
  dedent(`
    <button class="grep-btn grep-btn--${type}"${opts.state ? ` data-state="${opts.state}"` : ''}${opts.state === 'disabled' ? ' disabled' : ''}>
      ${opts.icon ? icon14('grep-btn__icon') + '\n      ' : ''}<span class="grep-btn__label">${label}</span>
      ${spinner()}
    </button>`)

export const badge = (tone: string, label: string, size?: 16 | 18 | 22, shape: 'full' | 'rounded' = 'full') =>
  `<span class="grep-badge grep-badge--${tone} grep-badge--${shape}${size ? ` grep-badge--${size}` : ''}"><span class="grep-badge__label">${label}</span></span>`

export const checkbox = (state: '' | 'checked' | 'indeterminate' = '', extra = '') =>
  dedent(`
    <span class="grep-checkbox${state ? ` grep-checkbox--${state}` : ''}"${extra}>
      <span class="grep-checkbox__box">
        ${svg('checkbox-check', 'grep-checkbox__mark grep-checkbox__mark--check')}
        ${svg('checkbox-minus', 'grep-checkbox__mark grep-checkbox__mark--minus')}
      </span>
    </span>`)

export const kbd = (keys: string[], lg = false) =>
  `<span class="grep-kbd-group">${keys
    .map((k) =>
      k === 'cmd'
        ? `<span class="grep-kbd grep-kbd--icon${lg ? ' grep-kbd--lg' : ''}">${svg(lg ? 'keyboard-shortcut-icon-20' : 'keyboard-shortcut-icon-16', 'grep-kbd__icon')}</span>`
        : k.length === 1
          ? `<span class="grep-kbd grep-kbd--letter${lg ? ' grep-kbd--lg' : ''}"><span>${k}</span></span>`
          : `<span class="grep-kbd grep-kbd--label${lg ? ' grep-kbd--lg' : ''}">${k}</span>`,
    )
    .join('')}</span>`

/** A row wrapper for laying several controls side by side inside one example. */
export const row = (inner: string, gap = 12) =>
  `<div style="display:flex;align-items:center;gap:var(--space-${gap});flex-wrap:wrap">\n${inner}\n</div>`

export const stack = (inner: string, gap = 12) =>
  `<div style="display:flex;flex-direction:column;gap:var(--space-${gap})">\n${inner}\n</div>`

export const labelled = (label: string, inner: string) =>
  `<div style="display:flex;flex-direction:column;align-items:center;justify-content:flex-end;align-self:stretch;gap:var(--space-8)">\n${inner}\n<span style="font-size:var(--text-xs);color:var(--foreground-text-dim)">${label}</span>\n</div>`
