import { useState } from 'react'
import HelpDrawer from '../HelpDrawer.jsx'

export default function PracticePhase({ practice, help, onComplete }) {
  const [stepIdx, setStepIdx] = useState(0)
  const [textVal, setTextVal] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [activeHelp, setActiveHelp] = useState(null)

  const steps = practice.steps
  const step = steps[stepIdx]
  const isLast = stepIdx === steps.length - 1

  const helpItem = activeHelp ? help.find(h => h.key === activeHelp) : null

  const advance = () => {
    setConfirmed(false)
    setTextVal('')
    if (isLast) { onComplete({ lastText: textVal }); return }
    setStepIdx(i => i + 1)
  }

  const canAdvance =
    step.action === 'confirm' ? confirmed :
    step.action === 'text'    ? textVal.trim().length > 0 :
    true

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

        {/* Progress dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem' }}>
          {steps.map((_, i) => (
            <div key={i} style={{
              width: 10, height: 10, borderRadius: '50%',
              background: i < stepIdx ? 'var(--c-success)' : i === stepIdx ? 'var(--c-primary)' : 'var(--c-border)',
              transition: 'background 0.3s',
            }} />
          ))}
        </div>

        <div className="step-card">
          <div className="step-num">שלב {stepIdx + 1}</div>
          <p className="step-instruction">{step.instruction}</p>

          <div style={{ marginTop: '1.25rem' }}>
            {step.action === 'confirm' && (
              <button
                className={`btn ${confirmed ? 'btn-success' : 'btn-outline'} btn-lg`}
                onClick={() => setConfirmed(true)}
              >
                {confirmed ? '✅ ' + step.confirmLabel : step.confirmLabel}
              </button>
            )}

            {step.action === 'text' && (
              <textarea
                rows={4}
                placeholder={step.placeholder}
                value={textVal}
                onChange={e => setTextVal(e.target.value)}
                style={{ marginBottom: '0.75rem' }}
              />
            )}
          </div>

          {step.helpKey && (
            <div className="step-help-btn">
              <button
                className="btn btn-ghost btn-sm"
                onClick={() => setActiveHelp(step.helpKey)}
              >
                🆘 צריך/ה עזרה?
              </button>
            </div>
          )}
        </div>

        <button
          className="btn btn-primary btn-lg"
          disabled={!canAdvance}
          onClick={advance}
        >
          {isLast ? 'סיימתי — המשך לתיעוד ←' : 'הבא ←'}
        </button>
      </div>

      <HelpDrawer helpItem={helpItem} onClose={() => setActiveHelp(null)} />
    </>
  )
}
