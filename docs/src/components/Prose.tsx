import { useEffect, useRef, type MouseEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { fallbackCopy } from './ui'

/**
 * Renders markdown-derived HTML. Handles the two interactive bits inside it:
 * copy buttons on code figures, and internal links (client-side navigation).
 */
export function Prose({ html, className = '' }: { html: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const navigate = useNavigate()

  useEffect(() => {
    const root = ref.current
    if (!root) return
    const timers: number[] = []
    const onClick = (e: Event) => {
      const btn = (e.target as HTMLElement).closest<HTMLButtonElement>('[data-copy]')
      if (!btn || !root.contains(btn)) return
      const code = btn.closest('.doc-code')?.querySelector('code')
      const text = code?.textContent ?? ''
      const done = () => {
        btn.dataset.copied = 'true'
        btn.setAttribute('aria-label', 'Copied')
        timers.push(
          window.setTimeout(() => {
            delete btn.dataset.copied
            btn.setAttribute('aria-label', 'Copy code')
          }, 1400),
        )
      }
      if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text) && done())
      else if (fallbackCopy(text)) done()
    }
    root.addEventListener('click', onClick)
    return () => {
      root.removeEventListener('click', onClick)
      timers.forEach((t) => window.clearTimeout(t))
    }
  }, [html])

  const onClick = (e: MouseEvent<HTMLDivElement>) => {
    const a = (e.target as HTMLElement).closest<HTMLAnchorElement>('a[data-internal]')
    if (!a) return
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    const href = a.getAttribute('href') || ''
    if (href.startsWith('#')) return
    e.preventDefault()
    navigate(href)
  }

  return <div ref={ref} className={`doc-prose ${className}`.trim()} onClick={onClick} dangerouslySetInnerHTML={{ __html: html }} />
}
