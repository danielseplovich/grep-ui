import { useEffect, useState } from 'react'

export interface TocEntry {
  id: string
  label: string
  sub?: boolean
}

export function Toc({ entries }: { entries: TocEntry[] }) {
  const [active, setActive] = useState<string>(entries[0]?.id ?? '')

  useEffect(() => {
    if (!entries.length) return
    const headings = entries
      .map((e) => document.getElementById(e.id))
      .filter((el): el is HTMLElement => !!el)
    if (!headings.length) return

    let frame = 0
    const update = () => {
      frame = 0
      const line = 96 // px below the top edge that counts as "current" (header 48 + scroll margin 24 + slack)
      let current = headings[0].id
      for (const h of headings) {
        if (h.getBoundingClientRect().top - line <= 0) current = h.id
        else break
      }
      // at the very bottom, the last entry wins
      if (window.innerHeight + window.scrollY >= document.body.scrollHeight - 2) current = headings[headings.length - 1].id
      setActive(current)
    }
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [entries])

  if (!entries.length) return null

  return (
    <aside className="doc-toc" aria-label="On this page">
      <div className="doc-toc__heading">On this page</div>
      <ul className="doc-toc__list">
        {entries.map((e) => (
          <li key={e.id}>
            <a
              href={`#${e.id}`}
              className={`doc-toc__link${e.sub ? ' doc-toc__link--sub' : ''}`}
              aria-current={active === e.id ? 'true' : undefined}
              onClick={(ev) => {
                ev.preventDefault()
                const el = document.getElementById(e.id)
                if (!el) return
                setActive(e.id)
                el.scrollIntoView({ behavior: 'smooth', block: 'start' })
                history.replaceState(null, '', `#${e.id}`)
              }}
            >
              {e.label}
            </a>
          </li>
        ))}
      </ul>
    </aside>
  )
}
