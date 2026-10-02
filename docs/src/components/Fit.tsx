import { useEffect, useRef, useState, type ReactNode } from 'react'

/**
 * Renders children at natural size and scales them down (never up) to fit the
 * box, so a 640px-wide composition still reads whole inside a 330px card.
 */
export function Fit({ children, max = 1 }: { children: ReactNode; max?: number }) {
  const box = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(max)
  useEffect(() => {
    const b = box.current
    const i = inner.current
    if (!b || !i) return
    const fit = () => {
      const w = i.scrollWidth || i.offsetWidth
      const h = i.scrollHeight || i.offsetHeight
      if (!w || !h) return
      setScale(Math.min(max, b.clientWidth / w, b.clientHeight / h))
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(b)
    ro.observe(i)
    return () => ro.disconnect()
  }, [max])
  return (
    <div ref={box} className="doc-fit">
      <div ref={inner} className="doc-fit__inner" style={{ transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}
