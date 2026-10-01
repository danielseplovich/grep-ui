/* ============================================================
   Grep UI — Button (React)
   Source: Figma "Grep UI / Button" component set (157:1249)
   Styling: Components/button/button.css — this file only maps
   props to the classes and states that CSS already defines.
   ============================================================ */

import { Children, cloneElement, forwardRef, isValidElement, type ButtonHTMLAttributes, type ReactElement, type ReactNode } from 'react'
import { Spinner } from './Spinner'

export type ButtonVariant = 'brand' | 'neutral' | 'inverted' | 'danger'

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Figma `type`. Brand is the one primary action per view. */
  variant?: ButtonVariant
  /** Figma `leadingIconSelection`. A 14px icon drawn with currentColor. */
  leadingIcon?: ReactNode
  /** Figma `trailingIconSelection`. */
  trailingIcon?: ReactNode
  /** Figma state `Loading`: content hides, the spinner centres, width is kept. */
  isLoading?: boolean
  /**
   * Render the child element instead of a <button>, keeping the button's
   * classes and props. For links: <Button asChild><a href="…">…</a></Button>
   */
  asChild?: boolean
}

function cx(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ')
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = 'brand', leadingIcon, trailingIcon, isLoading = false, asChild = false, className, children, disabled, type, ...rest },
  ref,
) {
  const classes = cx('grep-btn', `grep-btn--${variant}`, className)

  const content = (
    <>
      {leadingIcon && <Icon>{leadingIcon}</Icon>}
      <span className="grep-btn__label">{children}</span>
      {trailingIcon && <Icon>{trailingIcon}</Icon>}
      <Spinner />
    </>
  )

  const stateProps = {
    className: classes,
    'data-state': isLoading ? 'loading' : undefined,
    'aria-busy': isLoading || undefined,
    'aria-disabled': asChild && disabled ? true : undefined,
  }

  if (asChild) {
    const child = Children.only(children) as ReactElement<{ className?: string; children?: ReactNode }>
    if (!isValidElement(child)) return null
    return cloneElement(child, {
      ...rest,
      ...stateProps,
      className: cx(classes, child.props.className),
      children: (
        <>
          {leadingIcon && <Icon>{leadingIcon}</Icon>}
          <span className="grep-btn__label">{child.props.children}</span>
          {trailingIcon && <Icon>{trailingIcon}</Icon>}
          <Spinner />
        </>
      ),
    } as Record<string, unknown>)
  }

  return (
    <button ref={ref} type={type ?? 'button'} disabled={disabled} {...stateProps} {...rest}>
      {content}
    </button>
  )
})

/** Puts the icon in the 14px slot. Accepts any SVG; adds the slot class. */
function Icon({ children }: { children: ReactNode }) {
  if (isValidElement<{ className?: string }>(children)) {
    return cloneElement(children, { className: cx('grep-btn__icon', children.props.className), 'aria-hidden': true } as Record<string, unknown>)
  }
  return <span className="grep-btn__icon">{children}</span>
}
