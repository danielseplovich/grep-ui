/* Grep UI — Dividing Line (React). Styling: Components/divider/divider.css */
import { forwardRef, type HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

export interface DividerProps extends HTMLAttributes<HTMLElement> {
  orientation?: 'horizontal' | 'vertical'
  /** Figma `style` Subtle: the lighter border. */
  subtle?: boolean
  /** Figma `width` Thin (0.5px) instead of 1px. */
  thin?: boolean
}

export const Divider = forwardRef<HTMLElement, DividerProps>(function Divider({ orientation = 'horizontal', subtle, thin, className, ...rest }, ref) {
  const classes = cx('grep-divider', subtle && 'grep-divider--subtle', thin && 'grep-divider--thin', orientation === 'vertical' && 'grep-divider--vertical', className)
  if (orientation === 'vertical') {
    return <div ref={ref as React.Ref<HTMLDivElement>} className={classes} role="separator" aria-orientation="vertical" {...rest} />
  }
  return <hr ref={ref as React.Ref<HTMLHRElement>} className={classes} {...rest} />
})
