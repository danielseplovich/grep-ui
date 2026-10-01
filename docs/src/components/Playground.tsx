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
      <div className="doc-playground__controls">
        {playground.controls.map((c) => (
          <ControlField key={c.name} control={c} value={state[c.name]} onChange={(v) => set(c.name, v)} />
        ))}
      </div>
    </div>
  )
}

function ControlField({ control, value, onChange }: { control: Control; value: string | boolean; onChange: (v: string | boolean) => void }) {
  const id = useId()
  if (control.type === 'select') {
    return (
      <div className="grep-input doc-playground__control">
        <label className="grep-input__label" htmlFor={id}>
          <span className="grep-input__label-row">{control.label}</span>
        </label>
        <div className="grep-input__field-container">
          <span className="grep-input__field grep-select doc-playground__select">
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
        </div>
      </div>
    )
  }
  const on = Boolean(value)
  return (
    <div className="grep-input doc-playground__control doc-playground__control--switch">
      <label className="grep-input__label" htmlFor={id}>
        <span className="grep-input__label-row">{control.label}</span>
      </label>
      <button id={id} type="button" role="switch" aria-checked={on} className={`grep-toggle${on ? ' grep-toggle--on' : ''}`} onClick={() => onChange(!on)}>
        <span className="grep-toggle__track">
          <span className="grep-toggle__thumb" />
        </span>
      </button>
    </div>
  )
}
