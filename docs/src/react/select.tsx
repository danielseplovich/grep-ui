import type { ReactDoc } from '../lib/reactDocs'
import { example, jsx, IMPORT } from '../lib/snippet'
import { Select } from '../../../react/select'

const options = [
  { value: 'r2', label: 'Cloudflare R2' },
  { value: 's3', label: 'Amazon S3' },
  { value: 'gcs', label: 'Google Cloud Storage' },
]

export const selectDoc: ReactDoc = {
  slug: 'select',
  title: 'Select',
  description: 'A field that opens a list of options.',
  basedOn: 'select',
  importCode: IMPORT('Select'),
  usageCode: `<Select label="Storage" options={[{ value: "r2", label: "Cloudflare R2" }]} value={v} onValueChange={setV} />`,
  props: [
    { name: 'options', type: '{ value: string; label: ReactNode; icon?: ReactNode }[]' },
    { name: 'value', type: 'string' },
    { name: 'onValueChange', type: '(value: string) => void' },
    { name: 'placeholder', type: 'string', default: '"Select…"' },
    { name: 'label', type: 'ReactNode' },
    { name: 'sublabel', type: 'ReactNode' },
    { name: 'helpText', type: 'ReactNode' },
    { name: 'size', type: '28 | 32', default: '28' },
    { name: 'error', type: 'boolean', default: 'false' },
  ],
  playground: {
    controls: [
      { name: 'size', label: 'Size', type: 'select', options: ['28', '32'], default: '28' },
      { name: 'label', label: 'Label', type: 'boolean', default: false },
      { name: 'helpText', label: 'Help text', type: 'boolean', default: false },
      { name: 'value', label: 'Value', type: 'select', options: ['r2', 's3', 'gcs'], default: 'r2' },
      { name: 'error', label: 'Error', type: 'boolean', default: false },
      { name: 'disabled', label: 'Disabled', type: 'boolean', default: false },
    ],
    render: (s) => (
      <div style={{ width: 320 }}>
        <Select options={options} size={Number(s.size) as 28} label={s.label ? 'Storage provider' : undefined} helpText={s.helpText ? 'Where uploads are kept.' : undefined} value={String(s.value)} error={Boolean(s.error)} disabled={Boolean(s.disabled)} />
      </div>
    ),
    code: (s) =>
      example(
        [IMPORT('Select')],
        jsx('Select', { label: s.label ? 'Storage provider' : undefined, helpText: s.helpText ? 'Where uploads are kept.' : undefined, size: s.size !== '28' ? Number(s.size) : undefined, options: { raw: 'providers' }, value: { raw: 'provider' }, onValueChange: { raw: 'setProvider' }, error: Boolean(s.error), disabled: Boolean(s.disabled) }),
      ),
  },
  examples: { hero: { html: '' }, examples: [] },
}
