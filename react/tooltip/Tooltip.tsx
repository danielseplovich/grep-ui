/* Grep UI — Tooltip (React). Styling: Components/tooltip/tooltip.css
   This is the tooltip surface itself. Positioning it next to a trigger is the
   app's job (or a library's); pass `tail` to point it. */
import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { TooltipTail } from '../icons'
import { Kbd, KbdGroup } from '../keyboard-shortcut'

export type TailEdge = 'top' | 'bottom'
export type TailAlign = 'left' | 'middle' | 'right'

export interface TooltipProps extends HTMLAttributes<HTMLDivElement> {
  /** Which edge the tail leaves from and where along it. Omit for no tail. */
  tail?: { edge: TailEdge; align: TailAlign }
  /** Figma `type` Keyboard shortcut: a label plus key caps. */
  shortcut?: { label: string; keys: string[] }
  children?: ReactNode
}

export function Tooltip({ tail, shortcut, className, children, ...rest }: TooltipProps) {
  return (
    <div className={cx('grep-tooltip', tail && `grep-tooltip--${tail.edge}`, tail && `grep-tooltip--${tail.align}`, className)} role="tooltip" {...rest}>
      {shortcut ? (
        <span className="grep-tooltip__shortcut">
          <span className="grep-tooltip__shortcut-label">{shortcut.label}</span>
          <span className="grep-tooltip__keys">
            <KbdGroup>
              {shortcut.keys.map((k) => (
                <Kbd key={k} type={k === 'cmd' ? 'icon' : k.length === 1 ? 'letter' : 'label'}>
                  {k === 'cmd' ? undefined : k}
                </Kbd>
              ))}
            </KbdGroup>
          </span>
        </span>
      ) : typeof children === 'string' ? (
        <p className="grep-tooltip__text">{children}</p>
      ) : (
        children
      )}
      {tail && (
        <span className="grep-tooltip__tail">
          <TooltipTail className="grep-tooltip__tail-svg" />
        </span>
      )}
    </div>
  )
}
