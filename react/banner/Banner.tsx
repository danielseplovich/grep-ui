/* Grep UI — Banner (React). Styling: Components/banner/banner.css
   Composes Avatar (36) and Button, as the spec says. */
import { type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { Avatar } from '../avatar'
import { Button } from '../button'
import { AvatarIconExample } from '../icons'

export type BannerType = 'info' | 'success' | 'warning' | 'danger'

export interface BannerProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  type?: BannerType
  title: ReactNode
  /** Replace the leading tile's glyph. */
  icon?: ReactNode
  /** Label and handler for the primary action. Brand on info, inverted elsewhere. */
  action?: { label: string; onClick?: () => void }
  /** Label for the dismiss button. Omit to hide it. */
  dismissLabel?: string | null
  onDismiss?: () => void
  children: ReactNode
}

export function Banner({ type = 'info', title, icon, action, dismissLabel = 'Dismiss', onDismiss, className, children, ...rest }: BannerProps) {
  return (
    <div className={cx('grep-banner', `grep-banner--${type}`, className)} role={type === 'danger' || type === 'warning' ? 'alert' : 'status'} {...rest}>
      <div className="grep-banner__pixels" aria-hidden="true" />
      <div className="grep-banner__card">
        <div className="grep-banner__body">
          <Avatar size={36}>{icon ?? <AvatarIconExample />}</Avatar>
          <div className="grep-banner__label">
            <span className="grep-banner__title">{title}</span>
            <p className="grep-banner__message">{children}</p>
          </div>
        </div>
        {(dismissLabel || action) && (
          <div className="grep-banner__actions">
            {dismissLabel && (
              <Button variant="neutral" onClick={onDismiss}>
                {dismissLabel}
              </Button>
            )}
            {action && (
              <Button variant={type === 'info' ? 'brand' : 'inverted'} onClick={action.onClick}>
                {action.label}
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
