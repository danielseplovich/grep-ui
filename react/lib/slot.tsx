import { cloneElement, isValidElement, type ReactNode } from 'react'
import { cx } from './cx'

/** Put `className` on the element itself when it is one (an SVG icon), else wrap it. */
export function withClass(node: ReactNode, className: string, wrapper: 'span' | 'div' = 'span'): ReactNode {
  if (isValidElement<{ className?: string }>(node)) {
    return cloneElement(node, { className: cx(className, node.props.className) } as Record<string, unknown>)
  }
  const Tag = wrapper
  return <Tag className={className}>{node}</Tag>
}
