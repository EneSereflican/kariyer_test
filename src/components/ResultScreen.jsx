export default function ResultScreen({ status, onRetry }) {
  if (status === 'error') {
    return (
      <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 pt-20 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-red-100 font-display text-2xl text-red-600">
          !
        </div>
        <h2 className="mt-5 font-display text-2xl font-bold text-ink">Kayıt tamamlanamadı</h2>
        <p className="mt-3 max-w-md text-ink-soft">
          Verileriniz kaydedilirken bir sorun oluştu. Bağlantınızı kontrol edip yeniden deneyin;
          cevaplarınız kaybolmadı.
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-8 rounded-lg bg-ink px-8 py-3.5 font-display font-semibold text-white transition-colors hover:bg-ink/90"
        >
          Yeniden dene
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto flex w-full max-w-xl flex-col items-center px-4 pt-20 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-copper/10 font-display text-2xl text-copper">
        ✓
      </div>
      <h2 className="mt-5 font-display text-2xl font-bold text-ink">Verileriniz başarıyla kaydedildi.</h2>
      <p className="mt-3 max-w-md leading-relaxed text-ink-soft">
        Detaylı analiz sonuçlarınız 5 dakika içerisinde belirttiğiniz e-posta adresine gönderilecektir.
        Katılımınız için teşekkür ederiz.
      </p>
    </div>
  )
}
