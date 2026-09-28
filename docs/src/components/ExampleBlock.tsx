import { useId, useMemo, useState } from 'react'
import { displayHtml, type Example } from '../lib/examples'
import { highlightHtml } from '../lib/highlight'
import { useTheme, type Theme } from '../lib/theme'
import { CopyButton, Glyph, IconButton } from './ui'

type Tab = 'preview' | 'code'

export function ExampleBlock({ example, headingId }: { example: Omit<Example, 'id' | 'title'>; headingId?: string }) {
  const [tab, setTab] = useState<Tab>('preview')
  const [siteTheme] = useTheme()
  const [override, setOverride] = useState<Theme | null>(null)
  const id = useId()

  const previewTheme: Theme = override ?? siteTheme
  const shown = useMemo(() => displayHtml(example.html), [example.html])
  const highlighted = useMemo(() => highlightHtml(shown), [shown])

  const stageClass = [
    'doc-example__stage',
    example.layout === 'start' || example.layout === 'fill' ? 'doc-example__stage--start' : '',
    example.stage === 'sidebar' ? 'doc-example__stage--sidebar' : '',
    example.stage === 'panel' ? 'doc-example__stage--panel' : '',
    example.tall ? 'doc-example__stage--tall' : '',
  ]
    .filter(Boolean)
    .join(' ')

  const canvasClass = [
    'doc-example__canvas',
    example.layout === 'column' ? 'doc-example__canvas--column' : '',
    example.layout === 'fill' ? 'doc-example__canvas--fill doc-example__canvas--column' : '',
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className="doc-example" aria-labelledby={headingId}>
      <div className="doc-example__bar">
        <div className="grep-tabs" role="tablist" aria-label="Example view">
          <button
            type="button"
            role="tab"
            id={`${id}-tab-preview`}
            aria-selected={tab === 'preview'}
            aria-controls={`${id}-panel-preview`}
            className={`grep-tab${tab === 'preview' ? ' grep-tab--selected' : ''}`}
            onClick={() => setTab('preview')}
          >
            Preview
          </button>
          <button
            type="button"
            role="tab"
            id={`${id}-tab-code`}
            aria-selected={tab === 'code'}
            aria-controls={`${id}-panel-code`}
            className={`grep-tab${tab === 'code' ? ' grep-tab--selected' : ''}`}
            onClick={() => setTab('code')}
          >
            Code
          </button>
        </div>
        <div className="doc-example__tools">
          {tab === 'preview' && (
            <IconButton
              label={previewTheme === 'dark' ? 'Preview in light mode' : 'Preview in dark mode'}
              size={24}
              aria-pressed={override !== null}
              onClick={() => setOverride(previewTheme === 'dark' ? 'light' : 'dark')}
            >
              <Glyph name={previewTheme === 'dark' ? 'sun' : 'moon'} className="grep-icon-btn__icon" />
            </IconButton>
          )}
          <CopyButton text={example.html} label="Copy HTML" />
        </div>
      </div>

      {tab === 'preview' ? (
        <div
          id={`${id}-panel-preview`}
          role="tabpanel"
          aria-labelledby={`${id}-tab-preview`}
          className={stageClass}
          data-theme={previewTheme}
        >
          <div className={canvasClass} dangerouslySetInnerHTML={{ __html: example.html }} />
        </div>
      ) : (
        <div id={`${id}-panel-code`} role="tabpanel" aria-labelledby={`${id}-tab-code`} className="doc-example__code">
          <figure className="doc-code" data-lang="html">
            <pre>
              <code className="doc-code__body lang-html" dangerouslySetInnerHTML={{ __html: highlighted }} />
            </pre>
          </figure>
          <div className="doc-example__note">
            Inline SVG assets are collapsed to <code>…</code> here. Copy includes the full markup.
            {example.note ? ` ${example.note}` : ''}
          </div>
        </div>
      )}
    </div>
  )
}
