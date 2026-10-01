/* Grep UI — Avatar / Tile (React). Styling: Components/avatar/avatar.css */
import { forwardRef, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'

export type AvatarSize = 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /** Box size. Padding, icon and radius follow the spec per size. Default 40. */
  size?: AvatarSize
  /** Figma `radius` Full: for people. Omit for files, apps, teams. */
  round?: boolean
  /** The avatar is itself a control, so it lights up on hover. */
  interactive?: boolean
  /** A 14px badge overhanging the bottom-right corner (sizes 24 and up). */
  badge?: ReactNode
  /** The icon (drawn with currentColor), image or initials inside the tile. */
  children: ReactNode
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(function Avatar({ size = 40, round, interactive, badge, className, children, ...rest }, ref) {
  return (
    <span ref={ref} className={cx('grep-avatar', 'grep-avatar--icon-tile', `grep-avatar--${size}`, round && 'grep-avatar--full', interactive && 'grep-avatar--interactive', className)} {...rest}>
      {withClass(children, 'grep-avatar__icon')}
      {badge && <span className="grep-avatar__badge">{badge}</span>}
    </span>
  )
})
