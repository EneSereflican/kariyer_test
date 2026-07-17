import { DEPARTMENTS } from '../data/areas'

export default function InfoScreen({ department, questionCount, onStart }) {
  return (
    <div className="mx-auto flex w-full max-w-xl flex-col px-4 pb-16 pt-10 sm:pt-16">
      <p className="font-mono text-xs uppercase tracking-[0.2em] text-copper">Test öncesi bilgilendirme</p>
      <h2 className="mt-3 font-display text-2xl font-bold text-ink sm:text-3xl">Başlamadan önce</h2>

      <div className="mt-6 rounded-lg border-l-4 border-copper bg-copper/5 p-4">
        <p className="text-sm leading-relaxed text-ink">
          Bu test akademik bir çalışma ürünüdür. Manipülasyonu önlemek adına,{' '}
          <strong>1 dakikadan kısa sürede bitirilen testler istatistik dışı bırakılacaktır.</strong>
        </p>
      </div>

      <ul className="mt-6 space-y-3 text-sm text-ink-soft">
        <li className="flex gap-3">
          <span className="font-mono text-copper">01</span>
          <span>
            {DEPARTMENTS[department]} için hazırlanmış <strong className="text-ink">{questionCount} senaryo sorusu</strong>{' '}
            cevaplayacaksın.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-copper">02</span>
          <span>
            Her soruda <strong className="text-ink">en az 1, en fazla 3 şık</strong> seçebilirsin. Aynı alana
            yakın şıkları birlikte seçmek o alana olan eğilimini güçlendirir.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-copper">03</span>
          <span>Doğru ya da yanlış cevap yok; içgüdüsel olarak sana en çekici gelen seçenekleri işaretle.</span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-copper">04</span>
          <span>
            Teknik terimlere takılma: her şıkkın altında <strong className="text-ink">sade Türkçe açıklaması</strong> yazıyor.
            İstersen test ekranından kapatabilirsin.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="font-mono text-copper">05</span>
          <span>Başla butonuna bastığın anda süre ölçümü başlar.</span>
        </li>
      </ul>

      <button
        type="button"
        onClick={onStart}
        className="mt-10 w-full rounded-lg bg-copper px-6 py-4 font-display text-base font-semibold text-white transition-colors hover:bg-copper-deep active:scale-[0.99]"
      >
        Teste Başla
      </button>
    </div>
  )
}
