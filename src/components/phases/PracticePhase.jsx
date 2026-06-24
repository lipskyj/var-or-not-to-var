import { useState } from 'react'
import HelpDrawer from '../HelpDrawer.jsx'

// ── Quiz step sub-component ────────────────────────────────────────────────────
function QuizStep({ items, answers, onAnswer }) {
  return (
    <div className="stack" style={{ '--gap': '0.6rem', marginTop: '1rem' }}>
      {items.map((item, i) => {
        const answered = answers[i] !== undefined
        const userSaidAI = answers[i]
        const correct = answered && (userSaidAI === item.isAI)
        let bg = 'var(--c-bg)', border = 'var(--c-border)'
        if (answered) {
          bg = correct ? 'var(--c-success-l)' : 'var(--c-danger-l)'
          border = correct ? 'var(--c-success)' : 'var(--c-danger)'
        }
        return (
          <div key={i} style={{ border: `2px solid ${border}`, borderRadius: 'var(--radius-s)', padding: '0.75rem', background: bg, transition: 'all 0.2s' }}>
            <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>{item.label}</div>
            {!answered ? (
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="btn btn-sm btn-primary" onClick={() => onAnswer(i, true)}>🤖 AI</button>
                <button className="btn btn-sm btn-outline" onClick={() => onAnswer(i, false)}>🚫 לא AI</button>
              </div>
            ) : (
              <div style={{ fontSize: '0.85rem' }}>
                {correct ? '✅ ' : '❌ '}{item.isAI ? 'זהו AI.' : 'לא AI.'} {item.explanation}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
export default function PracticePhase({ practice, help, onComplete }) {
  const [stepIdx, setStepIdx]     = useState(0)
  const [textVal, setTextVal]     = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [quizAnswers, setQuizAnswers] = useState({})
  const [activeHelp, setActiveHelp]  = useState(null)

  const steps = practice.steps
  const step  = steps[stepIdx]
  const isLast = stepIdx === steps.length - 1
  const helpItem = activeHelp ? help.find(h => h.key === activeHelp) : null

  const quizComplete = step.action === 'quiz' && step.quiz
    ? Object.keys(quizAnswers).length === step.quiz.length
    : false

  const canAdvance =
    step.action === 'confirm' ? confirmed :
    step.action === 'text'    ? textVal.trim().length > 0 :
    step.action === 'quiz'    ? quizComplete :
    true

  const advance = () => {
    setConfirmed(false)
    setTextVal('')
    setQuizAnswers({})
    if (isLast) { onComplete({ lastText: textVal }); return }
    setStepIdx(i => i + 1)
  }

  const answerQuiz = (i, val) => {
    setQuizAnswers(prev => ({ ...prev, [i]: val }))
  }

  return (
    <>
      <div className="stack" style={{ '--gap': '1.25rem', padding: '0.5rem 0' }}>
        {practice.intro && (
          <div className="feedback-box feedback-warn" style={{ textAlign: 'center', fontWeight: 700, fontSize: '1rem' }}>
            🎯 {practice.intro}
          </div>
        )}

        <div style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.8rem' }}>
          שלב {stepIdx + 1} מתוך {steps.length}
        </div>

        {/* progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%', transition: 'background 0.3s',
              background: i < stepIdx ? 'var(--c-success)' : i === stepIdx ? 'var(--c-primary)' : 'var(--c-border)',
            }} />
          ))}
        </div>

        <div className="step-card">
          <div className="step-num">שלב {stepIdx + 1}</div>
          <p className="step-instruction">{step.instruction}</p>

          <div style={{ marginTop: '1.25rem' }}>
            {step.action === 'confirm' && (
              <button
                className={`btn btn-lg ${confirmed ? 'btn-success' : 'btn-outline'}`}
                onClick={() => setConfirmed(true)}
                style={{ width: '100%' }}
              >
                {confirmed ? `✅ ${step.confirmLabel}` : step.confirmLabel}
              </button>
            )}

            {step.action === 'text' && (
              <textarea
                rows={4}
                placeholder={step.placeholder}
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
              />
            )}

            {step.action === 'quiz' && step.quiz && (
              <QuizStep items={step.quiz} answers={quizAnswers} onAnswer={answerQuiz} />
            )}
          </div>

          {step.helpKey && (
            <div className="step-help-btn">
              <button className="btn btn-ghost btn-sm" onClick={() => setActiveHelp(step.helpKey)}>
                🆘 צריך/ה עזרה?
              </button>
            </div>
          )}
        </div>

        {quizComplete && step.action === 'quiz' && (
          <div className="feedback-box feedback-success" style={{ textAlign: 'center' }}>
            ✅ ענית על כולם!
          </div>
        )}

        <button className="btn btn-primary btn-lg" disabled={!canAdvance} onClick={advance}>
          {isLast ? 'סיימתי — המשך לתיעוד ←' : 'הבא ←'}
        </button>
      </div>

      <HelpDrawer helpItem={helpItem} onClose={() => setActiveHelp(null)} />
    </>
  )
}
