import type { CSSProperties, ReactNode } from 'react'
import type { ColorToken } from '../lib/tokens'
import { useCopy } from './ui'

function CopyTile({ text, className, style, children, title }: { text: string; className: string; style?: CSSProperties; children: ReactNode; title?: string }) {
  const [copied, copy] = useCopy()
  return (
    <button type="button" className={className} style={style} onClick={() => copy(text)} title={title ?? `Copy ${text}`} data-copied={copied || undefined}>
      {children}
    </button>
  )
}

export function Swatch({ token }: { token: ColorToken }) {
  return (
    <CopyTile text={`var(${token.name})`} className="doc-swatch" style={{ ['--_swatch' as string]: `var(${token.name})` }}>
      <span className="doc-swatch__color" aria-hidden="true" />
      <span className="doc-swatch__body">
        <span className="doc-swatch__name">{token.name.slice(2)}</span>
        <span className="doc-swatch__values">
          <span title="Light">{token.light}</span>
          {token.dark && token.dark !== token.light && <span title="Dark">{token.dark}</span>}
        </span>
        {token.description && <span className="doc-swatch__desc">{token.description}</span>}
      </span>
    </CopyTile>
  )
}

export function SwatchGrid({ tokens }: { tokens: ColorToken[] }) {
  return (
    <div className="doc-swatches">
      {tokens.map((t) => (
        <Swatch key={t.name} token={t} />
      ))}
    </div>
  )
}

export function Ramp({ name, steps }: { name: string; steps: ColorToken[] }) {
  return (
    <div className="doc-ramp">
      <span className="doc-ramp__name">{name}</span>
      <div className="doc-ramp__steps">
        {steps.map((s) => (
          <CopyTile key={s.name} text={`var(${s.name})`} className="doc-ramp__step" style={{ ['--_swatch' as string]: `var(${s.name})` }} title={`${s.name.slice(2)} · ${s.light}`}>
            <span className="sr-only" />
          </CopyTile>
        ))}
      </div>
    </div>
  )
}

export function TokenChip({ name }: { name: string }) {
  const [copied, copy] = useCopy()
  return (
    <button type="button" className="doc-chip" onClick={() => copy(`var(${name})`)} data-copied={copied || undefined} title="Copy">
      {copied ? 'copied' : name}
    </button>
  )
}
