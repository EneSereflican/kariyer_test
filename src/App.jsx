import { useRef, useState } from 'react'
import WelcomeForm from './components/WelcomeForm'
import InfoScreen from './components/InfoScreen'
import TestScreen from './components/TestScreen'
import ResultScreen from './components/ResultScreen'
import { getQuestionsForDepartment } from './data/questions'
import { computeScores, rankAreas } from './utils/scoring'
import { saveTestResult } from './lib/supabase'
import { sendResultEmail } from './lib/email'
import { AREAS } from './data/areas'

const MIN_VALID_DURATION = 60 // saniye

export default function App() {
  const [screen, setScreen] = useState('welcome') // welcome | info | test | done
  const [userInfo, setUserInfo] = useState(null)
  const [questions, setQuestions] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [resultStatus, setResultStatus] = useState('success') // success | error
  const startTimeRef = useRef(null)
  const lastAnswersRef = useRef(null)

  const handleFormSubmit = (info) => {
    setUserInfo(info)
    setQuestions(getQuestionsForDepartment(info.department))
    setScreen('info')
  }

  const handleStart = () => {
    startTimeRef.current = Date.now() // kronometre başlar
    setScreen('test')
  }

  const handleFinish = async (answers) => {
    lastAnswersRef.current = answers
    setSubmitting(true)

    const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000)
    const isValid = durationSeconds >= MIN_VALID_DURATION
    const scores = computeScores(questions, answers)
    const ranked = rankAreas(scores)
    const topCode = ranked[0]?.[0] ?? null

    const record = {
      name: userInfo.name,
      email: userInfo.email,
      age: userInfo.age,
      university: userInfo.university,
      academic_status: userInfo.academicStatus,
      department: userInfo.department,
      duration_seconds: durationSeconds,
      is_valid: isValid,
      scores,
      top_area: topCode ? (AREAS[topCode]?.name ?? topCode) : '-',
      consent: userInfo.consent,
    }

    const { error } = await saveTestResult(record)

    if (error) {
      console.error('Supabase kayıt hatası:', error)
      setResultStatus('error')
      setSubmitting(false)
      setScreen('done')
      return
    }

    // Kayıt başarılı: sonuç e-postasını gönder.
    // E-posta hatası kullanıcıya yansıtılmaz; veri güvendedir.
    sendResultEmail({
      name: userInfo.name,
      email: userInfo.email,
      department: userInfo.department,
      scores,
    })

    setResultStatus('success')
    setSubmitting(false)
    setScreen('done')
  }

  const handleRetry = () => {
    // Cevaplar korunur; kaydı yeniden dener.
    if (lastAnswersRef.current) {
      setScreen('test')
      handleFinish(lastAnswersRef.current)
    } else {
      setScreen('welcome')
    }
  }

  return (
    <div className="min-h-screen bg-paper font-body text-ink antialiased">
      {/* Zemin: teknik çizim ızgarası */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.35]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #D8DEE6 1px, transparent 1px), linear-gradient(to bottom, #D8DEE6 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden="true"
      />
      <div className="relative">
        {screen === 'welcome' && <WelcomeForm onSubmit={handleFormSubmit} />}
        {screen === 'info' && (
          <InfoScreen
            department={userInfo.department}
            questionCount={questions.length}
            onStart={handleStart}
          />
        )}
        {screen === 'test' && (
          <TestScreen questions={questions} onFinish={handleFinish} submitting={submitting} />
        )}
        {screen === 'done' && <ResultScreen status={resultStatus} onRetry={handleRetry} />}
      </div>
    </div>
  )
}
