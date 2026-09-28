import type { ReactNode } from 'react'
import { Asset } from './ui'
import { Prose } from './Prose'

export type CalloutTone = 'info' | 'success' | 'warning' | 'danger'

const icons: Record<CalloutTone, string> = {
  info: 'lego-block',
  success: 'lightning-bolt-fill',
  warning: 'search-ai-sparkle',
  danger: 'notifications',
}

/**
 * A callout is the library's Banner with the leading tile and no actions —
 * used for the "Inferred" and "Not covered" notes each spec carries.
 */
export function Callout({
  tone,
  title,
  html,
  children,
  icon,
}: {
  tone: CalloutTone
  title: ReactNode
  html?: string
  children?: ReactNode
  icon?: string
}) {
  return (
    <div className={`grep-banner grep-banner--${tone} doc-callout`} role="note">
      <div className="grep-banner__pixels" aria-hidden="true" />
      <div className="grep-banner__card">
        <div className="grep-banner__body">
          <span className="grep-avatar grep-avatar--icon-tile grep-avatar--36 doc-callout__icon-tile" aria-hidden="true">
            <Asset name={icon ?? icons[tone]} className="grep-avatar__icon" />
          </span>
          <div className="grep-banner__label doc-callout__body">
            <span className="grep-banner__title">{title}</span>
            {html ? <Prose html={html} /> : <div className="grep-banner__message">{children}</div>}
          </div>
        </div>
      </div>
    </div>
  )
}
