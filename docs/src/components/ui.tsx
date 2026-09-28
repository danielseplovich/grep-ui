import { useEffect, useRef, useState, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { svg } from '../lib/icons'

/* ---------- inline library asset ---------- */

export function Asset({ name, className }: { name: string; className?: string }) {
  return <span style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: svg(name, className) }} />
}

/* ---------- docs-chrome glyphs (14px, currentColor) ---------- */

const glyphs = {
  sun: (
    <>
      <circle cx="7" cy="7" r="2.5" stroke="currentColor" strokeWidth="1.25" />
      <path
        d="M7 1.5v1.5M7 11v1.5M1.5 7H3M11 7h1.5M3.1 3.1l1.06 1.06M9.84 9.84l1.06 1.06M3.1 10.9l1.06-1.06M9.84 4.16l1.06-1.06"
        stroke="currentColor"
        strokeWidth="1.25"
        strokeLinecap="round"
      />
    </>
  ),
  moon: (
    <path
      d="M11.5 8.6A4.75 4.75 0 0 1 5.4 2.5a4.75 4.75 0 1 0 6.1 6.1Z"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinejoin="round"
    />
  ),
  menu: (
    <path d="M2.5 4h9M2.5 7h9M2.5 10h9" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  ),
  close: (
    <path d="M3.5 3.5l7 7M10.5 3.5l-7 7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
  ),
  check: (
    <path
      d="M2.75 7.25L5.5 10l5.75-6"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  link: (
    <path
      d="M6 8.5a2.5 2.5 0 0 0 3.54 0l1.71-1.71a2.5 2.5 0 0 0-3.54-3.54l-.85.85M8 5.5a2.5 2.5 0 0 0-3.54 0L2.75 7.21a2.5 2.5 0 0 0 3.54 3.54l.85-.85"
      stroke="currentColor"
      strokeWidth="1.25"
      strokeLinecap="round"
    />
  ),
  arrowLeft: (
    <path d="M11 7H3M6.5 3.5L3 7l3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  arrowRight: (
    <path d="M3 7h8M7.5 3.5L11 7l-3.5 3.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
  contrast: (
    <>
      <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.25" />
      <path d="M7 2a5 5 0 0 1 0 10Z" fill="currentColor" />
    </>
  ),
  external: (
    <path d="M6 3H3.5A.5.5 0 0 0 3 3.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V8M8.5 2.5H11.5V5.5M11.5 2.5 6.5 7.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
  ),
}

export type GlyphName = keyof typeof glyphs

export function Glyph({ name, className }: { name: GlyphName; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 14 14" fill="none" aria-hidden="true" focusable="false">
      {glyphs[name]}
    </svg>
  )
}

/* ---------- Grep UI icon button ---------- */

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: 16 | 20 | 24 | 28 | 32
  kind?: 'ghost' | 'neutral' | 'primary'
  children: ReactNode
}

export function IconButton({ label, size = 28, kind = 'ghost', className = '', children, ...rest }: IconButtonProps) {
  return (
    <button
      type="button"
      className={`grep-icon-btn grep-icon-btn--${kind} grep-icon-btn--${size} ${className}`.trim()}
      aria-label={label}
      title={label}
      {...rest}
    >
      {children}
    </button>
  )
}

/* ---------- copy-to-clipboard button ---------- */

export function useCopy(timeout = 1400): [boolean, (text: string) => void] {
  const [copied, setCopied] = useState(false)
  const timer = useRef<number | undefined>(undefined)
  useEffect(() => () => window.clearTimeout(timer.current), [])
  const copy = (text: string) => {
    const done = () => {
      setCopied(true)
      window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => setCopied(false), timeout)
    }
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, () => fallbackCopy(text) && done())
    } else if (fallbackCopy(text)) done()
  }
  return [copied, copy]
}

export function fallbackCopy(text: string): boolean {
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

export function CopyButton({ text, label = 'Copy', size = 24 }: { text: string; label?: string; size?: 20 | 24 | 28 }) {
  const [copied, copy] = useCopy()
  return (
    <IconButton
      label={copied ? 'Copied' : label}
      size={size}
      onClick={() => copy(text)}
      data-copied={copied || undefined}
      style={copied ? { color: 'var(--foreground-brand)' } : undefined}
    >
      {copied ? <Glyph name="check" className="grep-icon-btn__icon" /> : <Asset name="copy" className="grep-icon-btn__icon" />}
    </IconButton>
  )
}

/* ---------- keyboard shortcut caps ---------- */

export function Kbd({ keys }: { keys: Array<'cmd' | string> }) {
  return (
    <span className="grep-kbd-group">
      {keys.map((k, i) =>
        k === 'cmd' ? (
          <span key={i} className="grep-kbd grep-kbd--icon">
            <Asset name="keyboard-shortcut-icon-16" className="grep-kbd__icon" />
          </span>
        ) : k.length === 1 ? (
          <span key={i} className="grep-kbd grep-kbd--letter">
            <span>{k}</span>
          </span>
        ) : (
          <span key={i} className="grep-kbd grep-kbd--label">
            {k}
          </span>
        ),
      )}
    </span>
  )
}
