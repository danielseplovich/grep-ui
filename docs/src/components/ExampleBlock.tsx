import { useId, useMemo, useState } from 'react'
import { displayHtml, type Example } from '../lib/examples'
import { CodeBlock } from './CodeBlock'

type Tab = 'preview' | 'code'
const zooms = [1, 2, 3] as const
type Zoom = (typeof zooms)[number]

/**
 * Preview / Code block (Figma: Grep UI docs › 15:1040).
 * A 32px Button Tab Group switches between the preview frame and the code
 * block. The frame is a double border (outer radius-16 with 4px padding,
 * inner radius-12) with a zoom Segmented Control in its top-right corner.
 */
export function ExampleBlock({ example, headingId }: { example: Omit<Example, 'id' | 'title'>; headingId?: string }) {
  const [tab, setTab] = useState<Tab>('preview')
  const [zoom, setZoom] = useState<Zoom>(1)
  const id = useId()

  const code = useMemo(() => example.code ?? displayHtml(example.html), [example.code, example.html])
  const lang = example.code ? (example.lang ?? 'tsx') : 'html'

  const canvasClass = [
    'doc-preview__canvas',
    example.layout === 'column' ? 'doc-preview__canvas--column' : '',
    example.layout === 'fill' ? 'doc-preview__canvas--fill doc-preview__canvas--column' : '',
    example.layout === 'start' ? 'doc-preview__canvas--start' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const stageClass = ['doc-preview__stage', example.stage === 'sidebar' ? 'doc-preview__stage--sidebar' : '', example.stage === 'panel' ? 'doc-preview__stage--panel' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className="doc-example" aria-labelledby={headingId}>
      <div className="doc-example__bar">
      <div className="grep-tabs doc-example__tabs" role="tablist" aria-label="Example view">
        {(['preview', 'code'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`${id}-tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`${id}-panel-${t}`}
            className={`grep-tab grep-tab--32 grep-tab--full${tab === t ? ' grep-tab--selected' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'preview' ? 'Preview' : 'Code'}
          </button>
        ))}
      </div>
      {tab === 'preview' && (
        <div className="grep-segmented doc-example__zoom" role="group" aria-label="Zoom">
          {zooms.map((z) => (
            <button key={z} type="button" className={`grep-segment${zoom === z ? ' grep-segment--selected' : ''}`} aria-pressed={zoom === z} onClick={() => setZoom(z)}>
              {z * 100}%
            </button>
          ))}
        </div>
      )}
      </div>

      {tab === 'preview' ? (
        <div id={`${id}-panel-preview`} role="tabpanel" aria-labelledby={`${id}-tab-preview`} className="doc-preview">
          <div className={stageClass}>
            <div className={canvasClass} style={{ transform: `scale(${zoom})` }}>
              {example.element ?? <div style={{ display: 'contents' }} dangerouslySetInnerHTML={{ __html: example.html }} />}
            </div>
          </div>
        </div>
      ) : (
        <div id={`${id}-panel-code`} role="tabpanel" aria-labelledby={`${id}-tab-code`}>
          <CodeBlock code={code} lang={lang} />
          {example.note && <p className="doc-example__note">{example.note}</p>}
        </div>
      )}
    </div>
  )
}
