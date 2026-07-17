export default function QuestionCard({ question, selected, onToggle, showHints }) {
  const maxReached = selected.size >= 3

  return (
    <div>
      <h2 className="font-display text-xl font-semibold leading-snug text-ink sm:text-2xl">
        {question.text}
      </h2>
      {showHints && question.hint && (
        <p className="mt-2 rounded-md bg-signal/10 px-3 py-2 text-sm leading-relaxed text-signal">
          {question.hint}
        </p>
      )}
      <p className="mt-2 text-sm text-ink-soft">Sana en çekici gelen 1-3 şıkkı işaretle.</p>

      <div className="mt-6 space-y-3">
        {question.options.map((opt) => {
          const isSelected = selected.has(opt.id)
          const isDisabled = !isSelected && maxReached
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onToggle(opt.id)}
              disabled={isDisabled}
              aria-pressed={isSelected}
              className={`flex w-full items-start gap-3 rounded-lg border-2 p-4 text-left transition-all ${
                isSelected
                  ? 'border-copper bg-copper/5 shadow-sm'
                  : isDisabled
                    ? 'border-line bg-white opacity-45'
                    : 'border-line bg-white hover:border-ink-soft/40 active:scale-[0.995]'
              }`}
            >
              <span
                className={`mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded font-mono text-xs font-medium transition-colors ${
                  isSelected ? 'bg-copper text-white' : 'bg-paper text-ink-soft'
                }`}
              >
                {opt.id}
              </span>
              <span className="min-w-0">
                <span className="block text-[15px] leading-relaxed text-ink">{opt.text}</span>
                {showHints && opt.hint && (
                  <span className="mt-1.5 block border-l-2 border-signal/40 pl-2 text-[13px] leading-relaxed text-ink-soft">
                    {opt.hint}
                  </span>
                )}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
