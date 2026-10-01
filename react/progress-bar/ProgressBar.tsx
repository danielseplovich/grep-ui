/* Grep UI — Progress Bar (React). Styling: Components/progress-bar/progress-bar.css */
import { forwardRef, type CSSProperties, type HTMLAttributes } from 'react'
import { cx } from '../lib/cx'

export type ProgressTone = 'brand' | 'success' | 'warning' | 'danger'

export interface ProgressBarProps extends HTMLAttributes<HTMLDivElement> {
  /** 0–100. */
  value: number
  tone?: ProgressTone
}

export const ProgressBar = forwardRef<HTMLDivElement, ProgressBarProps>(function ProgressBar({ value, tone = 'brand', className, style, ...rest }, ref) {
  const v = Math.max(0, Math.min(100, value))
  return (
    <div ref={ref} className={cx('grep-progress', `grep-progress--${tone}`, className)} role="progressbar" aria-valuenow={v} aria-valuemin={0} aria-valuemax={100} style={style} {...rest}>
      <div className="grep-progress__fill" style={{ ['--_fill' as string]: `${v}%` } as CSSProperties} />
    </div>
  )
})
