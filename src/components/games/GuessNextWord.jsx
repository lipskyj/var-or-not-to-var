import { useState } from 'react'

const ROUNDS = [
  {
    prefix: 'בלילה השמיים מלאים ב',
    options: ['כוכבים', 'ספרים', 'נעליים', 'אוכל'],
    correct: 0,
    why: "ה-AI למד ממיליוני משפטים: 'השמיים מלאים' ← הכי נפוץ: 'כוכבים'.",
  },
  {
    prefix: 'כשקר בחוץ אנשים לובשים',
    options: ['שמלת ים', 'מעיל', 'משקפי שמש', 'כפפות בישול'],
    correct: 1,
    why: "'קר בחוץ' + 'לובשים' → המודל מנבא פריט לבוש חם. מעיל — הסביר ביותר.",
  },
  {
    prefix: 'כדי לאפות עוגה צריך',
    options: ['ברזל', 'מלט', 'קמח', 'בולים'],
    correct: 2,
    why: "הקשר 'לאפות עוגה' קשור לקמח — המודל ראה זאת במיליוני מתכונים.",
  },
  {
    prefix: 'המחשב צריך ___ כדי לעבוד',
    options: ['מים', 'חשמל', 'אוויר', 'פרחים'],
    correct: 1,
    why: "'מחשב צריך...לעבוד' — הקשר טכני. חשמל — הנפוץ ביותר בטקסטים כאלה.",
  },
  {
    prefix: 'הרופא בודק את',
    options: ['המכונית', 'העצים', 'החולה', 'הבניין'],
    correct: 2,
    why: "'רופא' + 'בודק' → בדרך כלל רופא בודק חולה. המודל למד זאת מטקסטים רפואיים.",
  },
]

export default function GuessNextWord({ onComplete }) {
  const [round, setRound] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const cur = ROUNDS[round]
  const answered = chosen !== null
  const isCorrect = chosen === cur.correct

  const pick = (i) => {
    if (answered) return
    setChosen(i)
    if (i === cur.correct) setScore(s => s + 1)
  }

  const next = () => {
    const n = round + 1
    if (n >= ROUNDS.length) { setDone(true); if (onComplete) onComplete() }
    else { setRound(n); setChosen(null) }
  }

  if (done) {
    return (
      <div className="card" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧠</div>
        <h3>{score} מתוך {ROUNDS.length} נכון!</h3>
        <p style={{ color: 'var(--c-muted)', marginTop: '0.75rem', fontSize: '0.95rem' }}>
          ככה עובד LLM — מנבא את המילה <strong>הסבירה ביותר</strong> לפי מיליוני טקסטים.
          לא מבין — סופר.
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--c-muted)' }}>
        <span>🧠 מה המילה הבאה?</span>
        <span>{round + 1} / {ROUNDS.length}</span>
      </div>

      <p style={{ fontWeight: 700, fontSize: '1.15rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
        "{cur.prefix}{' '}
        <span style={{ background: 'var(--c-primary-l)', padding: '1px 8px', borderRadius: 4, color: 'var(--c-primary)' }}>
          ___
        </span>"
      </p>

      <div className="stack" style={{ '--gap': '0.5rem', marginBottom: '1rem' }}>
        {cur.options.map((opt, i) => {
          const isRight = i === cur.correct
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
                padding: '0.75rem 1rem', borderRadius: 'var(--radius-s)',
                border: `2px solid ${border}`, background: bg,
                fontFamily: 'var(--font)', fontSize: '1rem', fontWeight: 600,
                cursor: answered ? 'default' : 'pointer',
                textAlign: 'right', direction: 'rtl', transition: 'all 0.2s',
              }}
            >
              {answered && isRight ? '✅ ' : answered && isPicked && !isRight ? '❌ ' : ''}{opt}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          <div className={`feedback-box ${isCorrect ? 'feedback-success' : 'feedback-warn'}`} style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
            {isCorrect ? '✅ נכון!' : `🤔 לא בדיוק — ${cur.options[cur.correct]} הכי סביר.`} {cur.why}
          </div>
          <button className="btn btn-primary btn-lg" onClick={next}>
            {round < ROUNDS.length - 1 ? 'משפט הבא ←' : 'ראה/י תוצאות ←'}
          </button>
        </>
      )}
    </div>
  )
}
