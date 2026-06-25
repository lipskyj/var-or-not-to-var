import { useState } from 'react'
import { saveSubmission, markUnitComplete } from '../../storage.js'

const CONFETTI_EMOJIS = ['🎉','✨','🌟','💜','🎊','💫','🔥','🎯']

function ConfettiBurst() {
  const pieces = Array.from({ length: 18 }, (_, i) => i)
  return (
    <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden' }}>
      {pieces.map(i => (
        <span key={i} style={{
          position: 'absolute',
          left: `${5 + (i * 5.5) % 90}%`,
          top: '-1rem',
          fontSize: '1.2rem',
          animation: `confettiFall ${1.2 + (i % 4) * 0.3}s ease-in ${(i % 6) * 0.1}s both`,
        }}>
          {CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length]}
        </span>
      ))}
      <style>{`
        @keyframes confettiFall {
          0%   { transform: translateY(0) rotate(0deg) scale(0); opacity: 1; }
          100% { transform: translateY(300px) rotate(720deg) scale(1); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

export default function DocumentPhase({ unit, document: doc, onComplete }) {
  const [reflection, setReflection] = useState('')
  const [screenshot, setScreenshot] = useState(null)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const validate = () => {
    if (doc.artifactType === 'screenshot+reflection') {
      if (!screenshot) return 'נא לצרף צילום מסך של המודל המאומן.'
    }
    if (!reflection.trim()) return 'נא לכתוב תשובה לשאלה.'
    const missing = doc.requiredKeywords?.filter(kw => !reflection.includes(kw)) ?? []
    if (missing.length > 0) return `נסה/י לכלול גם את: ${missing.join(', ')}`
    return ''
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setScreenshot(ev.target.result)
    reader.readAsDataURL(file)
  }

  const submit = () => {
    const err = validate()
    if (err) { setError(err); return }
    saveSubmission(unit.id, { screenshotDataUrl: screenshot, reflection })
    markUnitComplete(unit.id)
    setSubmitted(true)
    onComplete()
  }

  if (submitted) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <ConfettiBurst />
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem', animation: 'float 1s ease-in-out 2' }}>🎉</div>
        <h2 style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          כל הכבוד! סיימת/ת את היחידה.
        </h2>
        <p style={{ color: 'var(--c-muted)', marginTop: '0.5rem' }}>היחידה הבאה נפתחה ✨</p>
      </div>
    )
  }

  return (
    <div className="stack card" style={{ '--gap': '1.25rem', maxWidth: 540, margin: '0 auto' }}>
      <h3>📝 תיעוד — שאלת הסיום</h3>
      <p style={{ fontWeight: 700, fontSize: '1.05rem' }}>{doc.question}</p>
      {doc.hint && (
        <div className="feedback-box feedback-warn" style={{ fontSize: '0.88rem' }}>
          💡 {doc.hint}
        </div>
      )}

      {doc.artifactType === 'screenshot+reflection' && (
        <div>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>
            📸 {doc.screenshotLabel}
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFile}
            style={{ fontSize: '0.9rem' }}
          />
          {screenshot && (
            <img
              src={screenshot}
              alt="צילום מסך"
              style={{ marginTop: '0.75rem', maxWidth: '100%', borderRadius: 'var(--radius-s)', border: '2px solid var(--c-border)' }}
            />
          )}
        </div>
      )}

      <div>
        <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>
          ✍️ תשובה שלך
        </label>
        <textarea
          rows={5}
          placeholder={doc.placeholder}
          value={reflection}
          onChange={e => { setReflection(e.target.value); setError('') }}
        />
      </div>

      {error && (
        <div className="feedback-box feedback-error">{error}</div>
      )}

      <button className="btn btn-success btn-lg" onClick={submit}>
        שלח/י וצבור/י ← פותח/ת יחידה {unit.id.split('-')[1] * 1 + 1}
      </button>
    </div>
  )
}
