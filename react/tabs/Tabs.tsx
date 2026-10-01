/* Grep UI — Tabs (React). Styling: Components/tabs/tabs.css */
import { createContext, useContext, type ButtonHTMLAttributes, type HTMLAttributes, type ReactNode } from 'react'
import { cx } from '../lib/cx'
import { withClass } from '../lib/slot'

type Size = 28 | 32 | 36
const TabsContext = createContext<{ size: Size; round: boolean }>({ size: 28, round: false })

export interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  /** Height. 28 unless set. */
  size?: Size
  /** Pill shape. */
  round?: boolean
  children: ReactNode
}

/** The tab list. Size and shape are set here and inherited by every Tab. */
export function Tabs({ size = 28, round = false, className, children, ...rest }: TabsProps) {
  return (
    <TabsContext.Provider value={{ size, round }}>
      <div className={cx('grep-tabs', className)} role="tablist" {...rest}>
        {children}
      </div>
    </TabsContext.Provider>
  )
}

export interface TabProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean
  icon?: ReactNode
  /** A count, rendered as the tab's badge. */
  badge?: ReactNode
  children: ReactNode
}

export function Tab({ selected, icon, badge, className, children, type, ...rest }: TabProps) {
  const { size, round } = useContext(TabsContext)
  return (
    <button
      type={type ?? 'button'}
      role="tab"
      aria-selected={selected}
      className={cx('grep-tab', size !== 28 && `grep-tab--${size}`, round && 'grep-tab--full', selected && 'grep-tab--selected', className)}
      {...rest}
    >
      {icon && withClass(icon, 'grep-tab__icon')}
      {children}
      {badge !== undefined && <span className="grep-tab__badge">{badge}</span>}
    </button>
  )
}
