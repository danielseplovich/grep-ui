import { useId, useMemo, useState } from 'react'
import { displayHtml, type Example } from '../lib/examples'
import { CodeBlock } from './CodeBlock'

type Tab = 'preview' | 'code'

/**
 * Preview / Code block (Figma: Grep UI docs › Component preview + Code Block).
 * A Button Tab Group switches between the preview card and the code block.
 */
export function ExampleBlock({ example, headingId }: { example: Omit<Example, 'id' | 'title'>; headingId?: string }) {
  const [tab, setTab] = useState<Tab>('preview')
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

  const stageClass = ['doc-preview', example.stage === 'sidebar' ? 'doc-preview--sidebar' : '', example.stage === 'panel' ? 'doc-preview--panel' : '', example.tall ? 'doc-preview--tall' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <div className="doc-example" aria-labelledby={headingId}>
      <div className="grep-tabs doc-example__tabs" role="tablist" aria-label="Example view">
        {(['preview', 'code'] as Tab[]).map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            id={`${id}-tab-${t}`}
            aria-selected={tab === t}
            aria-controls={`${id}-panel-${t}`}
            className={`grep-tab grep-tab--full${tab === t ? ' grep-tab--selected' : ''}`}
            onClick={() => setTab(t)}
          >
            {t === 'preview' ? 'Preview' : 'Code'}
          </button>
        ))}
      </div>

      {tab === 'preview' ? (
        <div id={`${id}-panel-preview`} role="tabpanel" aria-labelledby={`${id}-tab-preview`} className={stageClass}>
          {example.element ? <div className={canvasClass}>{example.element}</div> : <div className={canvasClass} dangerouslySetInnerHTML={{ __html: example.html }} />}
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
