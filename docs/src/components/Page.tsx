import { useEffect, type ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { neighbours } from '../lib/nav'
import { Glyph, IconButton, useCopy } from './ui'
import { Button } from '../../../react/button'
import type { TocEntry } from './Toc'

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

/**
 * Back + copy link. Every page one level below a hub gets this bar, so there
 * is always a way back after clicking deeper.
 */
export function BackBar({ to, label = 'Back' }: { to: string; label?: string }) {
  const [copied, copy] = useCopy()
  return (
    <div className="doc-backbar">
      <Button asChild variant="neutral" leadingIcon={<Glyph name="arrowLeft" />}>
        <Link to={to}>{label}</Link>
      </Button>
      <IconButton
        label={copied ? 'Link copied' : 'Copy link to this page'}
        kind="neutral"
        size={32}
        className="doc-backbar__copy"
        onClick={() => copy(window.location.href)}
        style={copied ? { color: 'var(--foreground-brand)' } : undefined}
      >
        <Glyph name={copied ? 'check' : 'link'} className="grep-icon-btn__icon" />
      </IconButton>
    </div>
  )
}

export function Page({ title, toc, wide, prose, back, children }: { title: string; toc?: TocEntry[]; wide?: boolean; prose?: boolean; back?: { to: string; label?: string }; children: ReactNode }) {
  useDocumentTitle(title)
  useScrollToHash()
  const { pathname } = useLocation()
  const { prev, next } = neighbours(pathname)
  void wide
  void toc // the table of contents is retired: pages are 1200px wide with a back bar instead
  return (
    <>
      <article className={prose ? 'doc-article doc-article--prose' : 'doc-article'}>
        {back && <BackBar to={back.to} label={back.label} />}
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
