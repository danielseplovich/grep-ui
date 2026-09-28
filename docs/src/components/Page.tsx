import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { neighbours } from '../lib/nav'
import { Glyph } from './ui'
import { Toc, type TocEntry } from './Toc'

/* ---------- document title + scroll restoration ---------- */

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} · Grep UI` : 'Grep UI'
  }, [title])
}

export function useScrollToHash() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1))
      if (el) {
        el.scrollIntoView({ block: 'start' })
        return
      }
    }
    window.scrollTo({ top: 0 })
  }, [pathname, hash])
}

/* ---------- page frame ---------- */

export function Page({ title, toc, children }: { title: string; toc?: TocEntry[]; children: ReactNode }) {
  useDocumentTitle(title)
  useScrollToHash()
  const { pathname } = useLocation()
  const { prev, next } = neighbours(pathname)
  return (
    <>
      <article className="doc-article">
        {children}
        {(prev || next) && (
          <nav className="doc-pager" aria-label="Previous and next page">
            {prev && (
              <Link to={prev.to} className="doc-pager__link">
                <span className="doc-pager__label">Previous</span>
                <span className="doc-pager__title">{prev.label}</span>
              </Link>
            )}
            {next && (
              <Link to={next.to} className="doc-pager__link doc-pager__link--next">
                <span className="doc-pager__label">Next</span>
                <span className="doc-pager__title">{next.label}</span>
              </Link>
            )}
          </nav>
        )}
      </article>
      {toc && <Toc entries={toc} />}
    </>
  )
}

export function PageHeader({
  eyebrow,
  title,
  lede,
  children,
}: {
  eyebrow?: ReactNode
  title: ReactNode
  lede?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="doc-page-header">
      {eyebrow && <div className="doc-eyebrow">{eyebrow}</div>}
      <h1 className="doc-title">{title}</h1>
      {lede && <div className="doc-lede">{lede}</div>}
      {children}
    </header>
  )
}

/* ---------- sections with anchor links ---------- */

function Anchor({ id }: { id: string }) {
  return (
    <a
      className="doc-anchor__link"
      href={`#${id}`}
      aria-label="Link to this section"
      onClick={(e) => {
        e.preventDefault()
        history.replaceState(null, '', `#${id}`)
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }}
    >
      <Glyph name="link" />
    </a>
  )
}

export function Section({
  id,
  title,
  lede,
  children,
}: {
  id: string
  title: ReactNode
  lede?: ReactNode
  children: ReactNode
}) {
  return (
    <section className="doc-section" id={id} aria-labelledby={`${id}-title`}>
      <div className="doc-anchor">
        <h2 className="doc-section__title" id={`${id}-title`}>
          {title}
        </h2>
        <Anchor id={id} />
      </div>
      {lede && <p className="doc-section__lede">{lede}</p>}
      {children}
    </section>
  )
}

export function Subsection({
  id,
  title,
  lede,
  children,
}: {
  id: string
  title: ReactNode
  lede?: ReactNode
  children: ReactNode
}) {
  return (
    <div className="doc-subsection" id={id}>
      <div className="doc-anchor">
        <h3 className="doc-subsection__title" id={`${id}-title`}>
          {title}
        </h3>
        <Anchor id={id} />
      </div>
      {lede && <p className="doc-subsection__lede">{lede}</p>}
      {children}
    </div>
  )
}
