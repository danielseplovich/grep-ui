import { useId, useMemo, useState } from 'react'
import type { Control, ControlState, Playground as PlaygroundDef } from '../lib/reactDocs'
import { ExampleBlock } from './ExampleBlock'
import { Asset } from './ui'

/**
 * One preview with Grep UI controls beneath it. Each control changes a prop;
 * the Code tab shows the snippet for the current values.
 */
export function Playground({ playground }: { playground: PlaygroundDef }) {
  const [state, setState] = useState<ControlState>(() => Object.fromEntries(playground.controls.map((c) => [c.name, c.default])))
  const set = (name: string, value: string | boolean) => setState((s) => ({ ...s, [name]: value }))

  const example = useMemo(
    () => ({ html: '', element: playground.render(state), code: playground.code(state) }),
    [playground, state],
  )

  return (
    <div className="doc-playground">
      <ExampleBlock example={example} />
      <section className="grep-item-block doc-playground__controls">
        <h3 className="grep-item-block__title">Properties</h3>
        <div className="grep-item-block__group">
          {playground.controls.map((c, i) => (
            <ControlRow key={c.name} control={c} value={state[c.name]} onChange={(v) => set(c.name, v)} last={i === playground.controls.length - 1} />
          ))}
        </div>
      </section>
    </div>
  )
}

/** One Item Row: label on the left, a Grep UI Select or Toggle on the right. */
function ControlRow({ control, value, onChange, last }: { control: Control; value: string | boolean; onChange: (v: string | boolean) => void; last: boolean }) {
  const id = useId()
  return (
    <div className="grep-item-row">
      <div className="grep-item-row__internal">
        <div className="grep-item-row__left">
          <div className="grep-item-row__label-frame">
            <label className="grep-item-row__label" htmlFor={id}>
              <span className="grep-item-row__label-row">{control.label}</span>
            </label>
          </div>
        </div>
        {control.type === 'select' ? (
          <span className="grep-input doc-playground__select">
            <span className="grep-input__field grep-select">
              <select id={id} className="doc-playground__native" value={String(value)} onChange={(e) => onChange(e.target.value)}>
                {control.options.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
              <span className="grep-select__value">{String(value)}</span>
              <Asset name="select-chevron" className="grep-select__chevron" />
            </span>
          </span>
        ) : (
          <button
            id={id}
            type="button"
            role="switch"
            aria-checked={Boolean(value)}
            className={`grep-toggle grep-toggle--md${value ? ' grep-toggle--on' : ''}`}
            onClick={() => onChange(!value)}
          >
            <span className="grep-toggle__track">
              <span className="grep-toggle__thumb" />
            </span>
          </button>
        )}
      </div>
      {!last && <hr className="grep-item-row__rule" />}
    </div>
  )
}
