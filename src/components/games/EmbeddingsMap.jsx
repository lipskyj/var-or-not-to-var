import { useState } from 'react'

const ROUNDS = [
  { anchor: 'כלב', options: ['חתול', 'מטוס'], correct: 0, why: 'שניהם חיות — הם "גרים קרוב" במרחב המשמעות.' },
  { anchor: 'מלך', options: ['מלכה', 'שולחן'], correct: 0, why: 'מלך ומלכה — שניהם מלוכה. מרחק קטן מאוד.' },
  { anchor: 'שמש', options: ['ירח', 'נעל'], correct: 0, why: 'שמש וירח — גרמי שמיים. קרובים במרחב הוקטורי.' },
  { anchor: 'ישראל', options: ['ירדן', 'פינגווין'], correct: 0, why: 'ישראל וירדן — מדינות שכנות. פינגווין לא קשור.' },
  {
    anchor: 'שמח',
    options: ['עצוב', 'כיסא'],
    correct: 0,
    why: 'מפתיע! שמח ועצוב קרובים — שניהם רגשות. אפילו הפכים יכולים להיות קרובים!',
  },
]

const MAP_WORDS = [
  { word: 'כלב',   x: 18, y: 30 }, { word: 'חתול', x: 24, y: 26 }, { word: 'גור',   x: 16, y: 38 },
  { word: 'מלך',  x: 70, y: 18 }, { word: 'מלכה', x: 76, y: 16 }, { word: 'נסיך', x: 73, y: 28 },
  { word: 'שמח',  x: 44, y: 62 }, { word: 'עצוב', x: 50, y: 67 }, { word: 'אושר', x: 42, y: 70 },
  { word: 'שמש',  x: 20, y: 72 }, { word: 'ירח',  x: 26, y: 78 }, { word: 'כוכב', x: 16, y: 80 },
]

export default function EmbeddingsMap({ onComplete }) {
  const [round, setRound] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const cur = ROUNDS[round]
  const answered = chosen !== null
  const isCorrect = chosen === 0

  const pick = (i) => {
    if (answered) return
    setChosen(i)
    if (i === 0) setScore(s => s + 1)
  }

  const next = () => {
    const n = round + 1
    if (n >= ROUNDS.length) { setDone(true); if (onComplete) onComplete() }
    else { setRound(n); setChosen(null) }
  }

  if (done) {
    return (
      <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>🗺️ מפת המשמעות</h3>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
          כל מילה היא <strong>נקודה במרחב</strong>. מילים דומות — נקודות קרובות.
        </p>
        <div style={{ position: 'relative', width: '100%', paddingBottom: '65%', background: 'var(--c-primary-l)', borderRadius: 'var(--radius-s)', overflow: 'hidden' }}>
          {MAP_WORDS.map((w, i) => (
            <span key={i} style={{
              position: 'absolute', left: `${w.x}%`, top: `${w.y}%`,
              transform: 'translate(-50%,-50%)',
              fontSize: '0.78rem', fontWeight: 700, whiteSpace: 'nowrap',
              background: 'var(--c-surface)', borderRadius: 999,
              padding: '2px 8px', boxShadow: 'var(--shadow)',
            }}>
              {w.word}
            </span>
          ))}
          {/* Cluster labels */}
          {[
            { label: '← חיות', x: 5, y: 15, color: '#7c3aed' },
            { label: '← מלוכה', x: 57, y: 10, color: '#0369a1' },
            { label: '← רגשות', x: 30, y: 55, color: '#be185d' },
            { label: '← שמיים', x: 5, y: 85, color: '#065f46' },
          ].map((cl, i) => (
            <span key={i} style={{
              position: 'absolute', left: `${cl.x}%`, top: `${cl.y}%`,
              fontSize: '0.7rem', fontWeight: 900, color: cl.color, opacity: 0.7,
            }}>
              {cl.label}
            </span>
          ))}
        </div>
        <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--c-muted)' }}>
          ציינת {score} מתוך {ROUNDS.length} נכון. כך AI "רואה" מילים — לא אותיות, אלא קואורדינטות.
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--c-muted)' }}>
        <span>🗺️ מה קרוב יותר?</span>
        <span>{round + 1} / {ROUNDS.length}</span>
      </div>

      <p style={{ fontWeight: 700, fontSize: '1.2rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        מה קרוב יותר ל-
        <span style={{ color: 'var(--c-primary)', padding: '2px 10px', background: 'var(--c-primary-l)', borderRadius: 8, margin: '0 4px' }}>
          {cur.anchor}
        </span>?
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        {cur.options.map((opt, i) => {
          const isRight = i === 0
          const isPicked = i === chosen
          let bg = 'var(--c-bg)', border = 'var(--c-border)'
          if (answered) {
            if (isRight) { bg = 'var(--c-success-l)'; border = 'var(--c-success)' }
            else if (isPicked) { bg = 'var(--c-danger-l)'; border = 'var(--c-danger)' }
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                flex: 1, padding: '1.5rem 0.5rem',
                border: `2px solid ${border}`, borderRadius: 'var(--radius-s)',
                background: bg, fontFamily: 'var(--font)',
                fontSize: '1.2rem', fontWeight: 700,
                cursor: answered ? 'default' : 'pointer', transition: 'all 0.2s',
              }}
            >
              {opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          <div className={`feedback-box ${isCorrect ? 'feedback-success' : 'feedback-warn'}`} style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            {isCorrect ? `✅ נכון! ${cur.why}` : `🤔 קרוב יותר: ${cur.options[0]}. ${cur.why}`}
          </div>
          <button className="btn btn-primary btn-lg" onClick={next}>
            {round < ROUNDS.length - 1 ? 'הבא ←' : 'ראה/י את המפה ←'}
          </button>
        </>
      )}
    </div>
  )
}
