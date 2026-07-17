import { useState } from 'react'
import QuestionCard from './QuestionCard'

export default function TestScreen({ questions, onFinish, submitting }) {
  const [index, setIndex] = useState(0)
  const [answers, setAnswers] = useState({}) // { [qId]: Set(optionId) }
  const [showHints, setShowHints] = useState(true)

  const question = questions[index]
  const selected = answers[question.id] || new Set()
  const isLast = index === questions.length - 1
  const canProceed = selected.size >= 1

  const toggleOption = (optionId) => {
    setAnswers((prev) => {
      const current = new Set(prev[question.id] || [])
      if (current.has(optionId)) {
        current.delete(optionId)
      } else {
        if (current.size >= 3) return prev // 3'ten fazla seçime engel
        current.add(optionId)
      }
      return { ...prev, [question.id]: current }
    })
  }

  const next = () => {
    if (!canProceed) return
    if (isLast) {
      onFinish(answers)
    } else {
      setIndex((i) => i + 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const back = () => {
    if (index > 0) {
      setIndex((i) => i - 1)
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }

  const progress = ((index + 1) / questions.length) * 100

  return (
    <div className="mx-auto w-full max-w-2xl px-4 pb-32 pt-6 sm:pt-10">
      {/* İlerleme */}
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between">
          <span className="font-mono text-xs tracking-wider text-ink-soft">
            SORU {String(index + 1).padStart(2, '0')}/{String(questions.length).padStart(2, '0')}
          </span>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowHints((v) => !v)}
              className={`rounded-full border px-3 py-1 font-mono text-[11px] transition-colors ${
                showHints
                  ? 'border-signal/40 bg-signal/10 text-signal'
                  : 'border-line bg-white text-ink-soft hover:border-ink-soft/40'
              }`}
              aria-pressed={showHints}
            >
              {showHints ? 'Sade açıklamalar: açık' : 'Sade açıklamalar: kapalı'}
            </button>
            <span className="font-mono text-xs text-copper">{selected.size}/3 seçim</span>
          </div>
        </div>
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-line">
          <div
            className="h-full rounded-full bg-copper transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <QuestionCard question={question} selected={selected} onToggle={toggleOption} showHints={showHints} />

      {/* Alt navigasyon — mobilde sabit */}
      <div className="fixed inset-x-0 bottom-0 border-t border-line bg-paper/95 px-4 py-3 backdrop-blur">
        <div className="mx-auto flex max-w-2xl items-center gap-3">
          <button
            type="button"
            onClick={back}
            disabled={index === 0 || submitting}
            className="rounded-lg border border-line bg-white px-5 py-3.5 text-sm font-semibold text-ink-soft transition-colors hover:border-ink-soft/40 disabled:opacity-40"
          >
            Geri
          </button>
          <button
            type="button"
            onClick={next}
            disabled={!canProceed || submitting}
            className={`flex-1 rounded-lg px-6 py-3.5 font-display text-base font-semibold text-white transition-all active:scale-[0.99] ${
              canProceed && !submitting ? 'bg-ink hover:bg-ink/90' : 'cursor-not-allowed bg-ink/30'
            }`}
          >
            {submitting ? 'Kaydediliyor...' : isLast ? 'Testi Bitir' : 'Sonraki Soru'}
          </button>
        </div>
        {!canProceed && (
          <p className="mx-auto mt-1.5 max-w-2xl text-center text-xs text-ink-soft">
            Devam etmek için en az 1 şık seçmelisin.
          </p>
        )}
      </div>
    </div>
  )
}
