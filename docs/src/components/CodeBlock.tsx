import { useMemo } from 'react'
import { highlight } from '../lib/highlight'
import { useCopy } from './ui'
import copyIcon from '../assets/copy.svg?raw'

/**
 * Grep UI Code Block (Figma: Grep UI docs › Code Block). A shell card with a
 * header (label + copy) and a field-coloured snippet with line numbers.
 */
export function CodeBlock({ code, lang = 'tsx', title = 'Code', className = '' }: { code: string; lang?: string; title?: string; className?: string }) {
  const [copied, copy] = useCopy()
  const lines = useMemo(() => code.replace(/\s+$/, '').split('\n'), [code])
  const html = useMemo(() => highlight(lines.join('\n'), lang), [lines, lang])
  return (
    <figure className={`doc-codeblock ${className}`.trim()} data-lang={lang}>
      <div className="doc-codeblock__header">
        <span className="doc-codeblock__label">{title}</span>
        <button
          type="button"
          className="grep-icon-btn grep-icon-btn--ghost grep-icon-btn--24 doc-codeblock__copy"
          aria-label={copied ? 'Copied' : 'Copy code'}
          title={copied ? 'Copied' : 'Copy code'}
          data-copied={copied || undefined}
          onClick={() => copy(code)}
        >
          <span className="grep-icon-btn__icon" dangerouslySetInnerHTML={{ __html: copyIcon }} />
        </button>
      </div>
      <div className="doc-codeblock__container">
        <pre className="doc-codeblock__snippet">
          <span className="doc-codeblock__lines" aria-hidden="true">
            {lines.map((_, i) => (
              <span key={i}>{i + 1}</span>
            ))}
          </span>
          <code className={`doc-codeblock__code lang-${lang}`} dangerouslySetInnerHTML={{ __html: html }} />
        </pre>
      </div>
    </figure>
  )
}
