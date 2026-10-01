/* Grep UI — Keyboard Shortcut (React). Styling: Components/keyboard-shortcut/keyboard-shortcut.css */
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { KeyboardShortcutIcon16, KeyboardShortcutIcon20 } from '../icons'

export interface KbdProps extends HTMLAttributes<HTMLSpanElement> {
  /** Figma `type`. `icon` renders the command glyph; letter and number take one character; label takes a word. */
  type?: 'letter' | 'number' | 'label' | 'icon'
  /** The 20px size. */
  lg?: boolean
  children?: ReactNode
}

/** One key cap. */
export const Kbd = forwardRef<HTMLSpanElement, KbdProps>(function Kbd({ type = 'letter', lg, className, children, ...rest }, ref) {
  return (
    <span ref={ref} className={cx('grep-kbd', `grep-kbd--${type}`, lg && 'grep-kbd--lg', className)} {...rest}>
      {type === 'icon' ? (lg ? <KeyboardShortcutIcon20 className="grep-kbd__icon" /> : <KeyboardShortcutIcon16 className="grep-kbd__icon" />) : type === 'label' ? children : <span>{children}</span>}
    </span>
  )
})

/** A row of key caps, e.g. ⌘ K. */
export function KbdGroup({ className, children, ...rest }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span className={cx('grep-kbd-group', className)} {...rest}>
      {children}
    </span>
  )
}
