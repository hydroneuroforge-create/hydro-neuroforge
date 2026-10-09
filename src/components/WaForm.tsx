import { useState, type FormEvent } from 'react'
import { Lock, Send } from 'lucide-react'
import { site } from '../content/site'
import { formMessage, waUrl, type FormData } from '../lib/wa'
import { track } from '../lib/analytics'

const empty: FormData = { parent: '', child: '', age: '', diagnosis: '', concern: '' }
type Errors = Partial<Record<keyof FormData, string>>

function validate(d: FormData, other: string): Errors {
  const e: Errors = {}
  if (d.parent.trim().length < 2) e.parent = 'Mohon isi nama Ayah/Bunda'
  if (d.child.trim().length < 2) e.child = 'Mohon isi nama anak (nama panggilan boleh)'
  if (!d.age) e.age = 'Pilih usia anak'
  if (!d.diagnosis) e.diagnosis = 'Pilih diagnosa'
  else if (d.diagnosis === 'Lainnya' && other.trim().length < 2) e.diagnosis = 'Tuliskan diagnosanya'
  if (d.concern.trim().length < 5) e.concern = 'Ceritakan singkat kekhawatiran Ayah/Bunda'
  return e
}

const input =
  'w-full rounded-2xl border border-navy/15 bg-foam px-4 py-3.5 text-base text-navy placeholder:text-slate/60 outline-none transition focus:border-aqua focus:bg-white focus:ring-4 focus:ring-aqua/20 aria-[invalid=true]:border-red-400'
const label = 'mb-1.5 block text-sm font-bold text-navy'

/** Formulir pendaftaran → membuka WhatsApp dengan pesan terisi. Data tidak disimpan. */
export function WaForm({ place }: { place: string }) {
  const [d, setD] = useState<FormData>(empty)
  const [other, setOther] = useState('')
  const [errors, setErrors] = useState<Errors>({})
  const [sent, setSent] = useState(false)
  const set = (k: keyof FormData) => (ev: { target: { value: string } }) => {
    setD((p) => ({ ...p, [k]: ev.target.value }))
    if (errors[k]) setErrors((p) => ({ ...p, [k]: undefined }))
  }

  const submit = (ev: FormEvent) => {
    ev.preventDefault()
    const e = validate(d, other)
    setErrors(e)
    const first = Object.keys(e)[0]
    if (first) {
      document.getElementById(`f-${place}-${first}`)?.focus()
      return
    }
    const data = { ...d, diagnosis: d.diagnosis === 'Lainnya' ? other : d.diagnosis }
    track('kirim_formulir', { place, age: d.age, diagnosis: data.diagnosis })
    const url = waUrl(formMessage(data))
    // Di HP (termasuk browser Instagram/Facebook) pindah langsung agar aplikasi WA terbuka
    if (matchMedia('(pointer: coarse)').matches) window.location.href = url
    else window.open(url, '_blank', 'noopener')
    setSent(true)
  }

  const id = (k: string) => `f-${place}-${k}`
  const err = (k: keyof FormData) =>
    errors[k] ? (
      <p id={`${id(k)}-err`} className="mt-1.5 text-sm font-medium text-red-600">
        {errors[k]}
      </p>
    ) : null

  return (
    <form onSubmit={submit} noValidate className="rounded-[28px] bg-white p-5 text-navy shadow-[0_30px_80px_-30px_rgb(0_0_0/0.5)] sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor={id('parent')} className={label}>Nama Ayah/Bunda</label>
          <input id={id('parent')} className={input} value={d.parent} onChange={set('parent')} autoComplete="name" placeholder="cth. Bunda Rina" aria-invalid={!!errors.parent} aria-describedby={errors.parent ? `${id('parent')}-err` : undefined} />
          {err('parent')}
        </div>
        <div>
          <label htmlFor={id('child')} className={label}>Nama anak</label>
          <input id={id('child')} className={input} value={d.child} onChange={set('child')} autoComplete="off" placeholder="Nama panggilan" aria-invalid={!!errors.child} aria-describedby={errors.child ? `${id('child')}-err` : undefined} />
          {err('child')}
        </div>
        <div>
          <label htmlFor={id('age')} className={label}>Usia anak</label>
          <select id={id('age')} className={input} value={d.age} onChange={set('age')} aria-invalid={!!errors.age}>
            <option value="">Pilih usia</option>
            {Array.from({ length: site.form.maxAge - site.form.minAge + 1 }, (_, i) => i + site.form.minAge).map((a) => (
              <option key={a} value={a}>
                {a} tahun
              </option>
            ))}
          </select>
          {err('age')}
        </div>
        <div>
          <label htmlFor={id('diagnosis')} className={label}>Diagnosa</label>
          <select id={id('diagnosis')} className={input} value={d.diagnosis} onChange={set('diagnosis')} aria-invalid={!!errors.diagnosis}>
            <option value="">Pilih diagnosa</option>
            {site.form.diagnoses.map((x) => (
              <option key={x}>{x}</option>
            ))}
          </select>
          {d.diagnosis === 'Lainnya' && (
            <input className={`${input} mt-2`} value={other} onChange={(e) => setOther(e.target.value)} placeholder="Tuliskan diagnosa" aria-label="Diagnosa lainnya" />
          )}
          {err('diagnosis')}
        </div>
        <div className="sm:col-span-2">
          <label htmlFor={id('concern')} className={label}>Kekhawatiran Ayah/Bunda</label>
          <textarea
            id={id('concern')}
            className={`${input} min-h-28 resize-y`}
            value={d.concern}
            onChange={set('concern')}
            maxLength={500}
            placeholder="cth. Anak sulit fokus, mudah tantrum, dan takut air…"
            aria-invalid={!!errors.concern}
            aria-describedby={errors.concern ? `${id('concern')}-err` : undefined}
          />
          <div className="mt-1 flex justify-between text-xs text-slate/70">
            <span>{err('concern')}</span>
            <span>{d.concern.length}/500</span>
          </div>
        </div>
      </div>

      <button type="submit" className="btn-wa mt-5 w-full text-[16px]">
        <Send className="size-5" aria-hidden="true" /> Kirim via WhatsApp
      </button>
      <p className="mt-3 flex items-start gap-2 text-xs leading-relaxed text-slate">
        <Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden="true" />
        Data hanya dikirim ke WhatsApp kami dan tidak disimpan di website.
      </p>
      {sent && (
        <p role="status" className="mt-3 rounded-2xl bg-aqua/10 p-3 text-sm font-medium text-deep">
          WhatsApp sedang dibuka. Jika tidak terbuka otomatis,{' '}
          <a className="font-bold underline" href={waUrl(formMessage({ ...d, diagnosis: d.diagnosis === 'Lainnya' ? other : d.diagnosis }))} target="_blank" rel="noopener">
            ketuk di sini
          </a>
          .
        </p>
      )}
    </form>
  )
}
