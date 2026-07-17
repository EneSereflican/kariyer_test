import { useState } from 'react'
import { ACADEMIC_STATUSES, DEPARTMENTS } from '../data/areas'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

const initialForm = {
  name: '',
  email: '',
  age: '',
  university: '',
  academicStatus: '',
  department: '',
  consent: false,
}

export default function WelcomeForm({ onSubmit }) {
  const [form, setForm] = useState(initialForm)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const set = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }))
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Adınızı girin.'
    if (!form.email.trim()) e.email = 'E-posta adresi zorunludur.'
    else if (!EMAIL_REGEX.test(form.email.trim()))
      e.email = 'Geçerli bir e-posta adresi girin (örn: ad@universite.edu.tr).'
    if (form.age !== '') {
      const n = Number(form.age)
      if (!Number.isInteger(n) || n < 15 || n > 80) e.age = '15-80 arası bir yaş girin veya boş bırakın.'
    }
    if (!form.university.trim()) e.university = 'Üniversitenizi yazın.'
    if (!form.academicStatus) e.academicStatus = 'Akademik durumunuzu seçin.'
    if (!form.department) e.department = 'Bölümünüzü seçin.'
    if (!form.consent) e.consent = 'Devam etmek için onay kutusunu işaretlemeniz gerekir.'
    return e
  }

  const handleSubmit = () => {
    const e = validate()
    setErrors(e)
    setTouched({ name: true, email: true, age: true, university: true, academicStatus: true, department: true, consent: true })
    if (Object.keys(e).length === 0) {
      onSubmit({
        ...form,
        name: form.name.trim(),
        email: form.email.trim().toLowerCase(),
        university: form.university.trim(),
        age: form.age === '' ? null : Number(form.age),
      })
    }
  }

  const inputClass = (field) =>
    `w-full rounded-lg border bg-white px-4 py-3 text-base text-ink outline-none transition-colors placeholder:text-ink-soft/50 focus:border-signal focus:ring-2 focus:ring-signal/20 ${
      errors[field] && touched[field] ? 'border-red-400' : 'border-line'
    }`

  return (
    <div className="mx-auto w-full max-w-xl px-4 pb-16 pt-10 sm:pt-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">Akademik çalışma · CE / EEM</p>
      <h1 className="mt-3 font-display text-3xl font-bold leading-tight text-ink sm:text-4xl">
        Mühendislik Mikro-Uzmanlık Eğilim Testi
      </h1>
      <p className="mt-4 text-ink-soft">
        Gerçek mühendislik senaryoları üzerinden, mühendisliğin hangi alt uzmanlık dallarına eğilimli
        olduğunu ölçen bir testtir. Yaklaşık 10 dakika sürer; sonuçlar e-posta adresine gönderilir.
      </p>

      <div className="mt-8 space-y-5">
        {/* Ad */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Ad</label>
          <input
            type="text"
            value={form.name}
            onChange={(e) => set('name', e.target.value)}
            placeholder="Yalnızca adınız"
            className={inputClass('name')}
            autoComplete="given-name"
          />
          <p className="mt-1.5 text-xs text-ink-soft">Verilerdeki şeffaflık açısından soyisminiz alınmamaktadır.</p>
          {errors.name && touched.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
        </div>

        {/* E-posta */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">E-posta *</label>
          <input
            type="email"
            value={form.email}
            onChange={(e) => set('email', e.target.value)}
            placeholder="ornek@universite.edu.tr"
            className={inputClass('email')}
            autoComplete="email"
            inputMode="email"
          />
          <p className="mt-1.5 text-xs text-ink-soft">
            Lütfen geçerli bir adres girin, sistem analiz sonucunu 5 dakika içerisinde buraya iletecektir.
            İşlem tamamen ücretsizdir.
          </p>
          {errors.email && touched.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>

        {/* Yaş */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">
            Yaş <span className="font-normal text-ink-soft">(opsiyonel)</span>
          </label>
          <input
            type="number"
            value={form.age}
            onChange={(e) => set('age', e.target.value)}
            placeholder="Örn: 21"
            min="15"
            max="80"
            className={inputClass('age')}
            inputMode="numeric"
          />
          {errors.age && touched.age && <p className="mt-1 text-xs text-red-600">{errors.age}</p>}
        </div>

        {/* Üniversite */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Üniversite *</label>
          <input
            type="text"
            value={form.university}
            onChange={(e) => set('university', e.target.value)}
            placeholder="Üniversitenizin adını yazın"
            className={inputClass('university')}
          />
          {errors.university && touched.university && (
            <p className="mt-1 text-xs text-red-600">{errors.university}</p>
          )}
        </div>

        {/* Akademik durum */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Akademik Durum *</label>
          <select
            value={form.academicStatus}
            onChange={(e) => set('academicStatus', e.target.value)}
            className={`${inputClass('academicStatus')} appearance-none`}
          >
            <option value="" disabled>
              Seçin
            </option>
            {ACADEMIC_STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          {errors.academicStatus && touched.academicStatus && (
            <p className="mt-1 text-xs text-red-600">{errors.academicStatus}</p>
          )}
        </div>

        {/* Bölüm seçimi */}
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-ink">Bölüm *</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {Object.entries(DEPARTMENTS).map(([code, label]) => {
              const selected = form.department === code
              return (
                <button
                  key={code}
                  type="button"
                  onClick={() => set('department', code)}
                  aria-pressed={selected}
                  className={`rounded-lg border-2 px-4 py-4 text-left transition-all ${
                    selected
                      ? 'border-copper bg-copper/5 shadow-sm'
                      : 'border-line bg-white hover:border-ink-soft/40'
                  }`}
                >
                  <span className={`font-mono text-xs tracking-wider ${selected ? 'text-copper' : 'text-ink-soft'}`}>
                    {code === 'CE' ? 'CE' : 'EEM'}
                  </span>
                  <span className="mt-0.5 block text-sm font-semibold text-ink">{label}</span>
                </button>
              )
            })}
          </div>
          {errors.department && touched.department && (
            <p className="mt-1 text-xs text-red-600">{errors.department}</p>
          )}
        </div>

        {/* Onay kutusu */}
        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-line bg-white p-4">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => set('consent', e.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 accent-copper"
            />
            <span className="text-sm leading-relaxed text-ink-soft">
              Burada vereceğim cevapların uydurma olmayacağını, bu verilerin şahsımla ilişkilendirilmeden
              anonim olarak işleneceğini onaylıyorum.
            </span>
          </label>
          {errors.consent && touched.consent && <p className="mt-1 text-xs text-red-600">{errors.consent}</p>}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full rounded-lg bg-ink px-6 py-4 font-display text-base font-semibold text-white transition-colors hover:bg-ink/90 active:scale-[0.99]"
        >
          Devam et
        </button>
      </div>
    </div>
  )
}
