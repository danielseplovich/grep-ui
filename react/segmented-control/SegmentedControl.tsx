/* Grep UI — Segmented Control (React). Styling: Components/segmented-control/segmented-control.css */
import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'

export interface Segment {
  value: string
  label?: ReactNode
  icon?: ReactNode
  badge?: ReactNode
}

export interface SegmentedControlProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
  segments: Segment[]
  value: string
  onValueChange?: (value: string) => void
  size?: 28 | 32
  'aria-label'?: string
}

export function SegmentedControl({ segments, value, onValueChange, size = 28, className, ...rest }: SegmentedControlProps) {
  return (
    <div className={cx('grep-segmented', size === 32 && 'grep-segmented--32', className)} role="tablist" {...rest}>
      {segments.map((s) => {
        const selected = s.value === value
        return (
          <button
            key={s.value}
            type="button"
            role="tab"
            aria-selected={selected}
            aria-label={s.label ? undefined : s.value}
            className={cx('grep-segment', !s.label && 'grep-segment--icon', selected && 'grep-segment--selected')}
            onClick={() => onValueChange?.(s.value)}
          >
            {s.icon && withClass(s.icon, 'grep-segment__icon')}
            {s.label}
            {s.badge !== undefined && <span className="grep-segment__badge">{s.badge}</span>}
          </button>
        )
      })}
    </div>
  )
}
