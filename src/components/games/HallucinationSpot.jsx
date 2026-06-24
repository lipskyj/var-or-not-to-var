import { useState } from 'react'

const ROUNDS = [
  {
    topic: 'אלברט איינשטיין',
    sentences: [
      { text: 'אלברט איינשטיין נולד בגרמניה בשנת 1879.', bad: false },
      { text: 'הוא פיתח את תורת היחסות המיוחדת.', bad: false },
      { text: 'הוא זכה בפרס נובל לפיזיקה בשנת 1921.', bad: false },
      { text: 'הוא היה ידוע כשחקן שחמט מצוין ואף ניצח אלופי עולם.', bad: true, fix: 'איינשטיין אהב לנגן כינור — לא לשחק שחמט. ה-AI "המציא" עובדה זו בביטחון מלא.' },
    ],
  },
  {
    topic: 'מדינת ישראל',
    sentences: [
      { text: 'ישראל ממוקמת במזרח התיכון, על חוף הים התיכון.', bad: false },
      { text: 'בירת ישראל היא ירושלים.', bad: false },
      { text: 'ישראל הכריזה על עצמאותה ב-14 במאי 1955.', bad: true, fix: 'ישראל הכריזה על עצמאותה ב-14 במאי 1948 — לא 1955. ה-AI החליף שנה בטעות.' },
      { text: 'השפות הרשמיות הן עברית וערבית.', bad: false },
    ],
  },
  {
    topic: 'מחשבים ואינטרנט',
    sentences: [
      { text: 'המחשב הראשון הומצא בשנות ה-40 של המאה ה-20.', bad: false },
      { text: 'הדפדפן הראשון בעולם נקרא Internet Explorer.', bad: true, fix: 'הדפדפן הראשון נקרא WorldWideWeb (1991). Internet Explorer הופיע רק ב-1995.' },
      { text: 'הווב (WWW) הומצא על ידי טים ברנרס-לי.', bad: false },
      { text: 'מרכיב מרכזי במחשבים הוא המעבד (CPU).', bad: false },
    ],
  },
]

export default function HallucinationSpot({ onComplete }) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const cur = ROUNDS[round]
  const answered = picked !== null
  const badIdx = cur.sentences.findIndex(s => s.bad)

  const pick = (i) => {
    if (answered) return
    setPicked(i)
    if (cur.sentences[i].bad) setScore(s => s + 1)
  }

  const next = () => {
    const n = round + 1
    if (n >= ROUNDS.length) { setDone(true); if (onComplete) onComplete() }
    else { setRound(n); setPicked(null) }
  }

  if (done) {
    return (
      <div className="card" style={{ textAlign: 'center', maxWidth: 480, margin: '0 auto' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🔍</div>
        <h3>מצאת {score} מתוך {ROUNDS.length} הזיות!</h3>
        <p style={{ color: 'var(--c-muted)', marginTop: '0.75rem', fontSize: '0.95rem', lineHeight: 1.7 }}>
          ה-AI לא שקרן — הוא פשוט <strong>מנבא מילים סבירות</strong>.
          לפעמים הן נכונות. לפעמים לא. תמיד כדאי לבדוק עובדות חשובות.
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem', fontSize: '0.82rem', color: 'var(--c-muted)' }}>
        <span>🔍 מצא/י את ההזיה</span>
        <span>{round + 1} / {ROUNDS.length}</span>
      </div>

      <div style={{ fontWeight: 700, marginBottom: '0.4rem' }}>נושא: {cur.topic}</div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        אחד המשפטים שגוי — ה-AI המציא אותו. לחץ/י עליו!
      </p>

      <div className="stack" style={{ '--gap': '0.6rem', marginBottom: '1rem' }}>
        {cur.sentences.map((s, i) => {
          const isBad = s.bad
          const isPicked = i === picked
          let bg = 'var(--c-bg)', border = 'var(--c-border)'
          if (answered) {
            if (isBad) { bg = 'var(--c-danger-l)'; border = 'var(--c-danger)' }
            else if (isPicked) { bg = 'var(--c-success-l)'; border = 'var(--c-success)' }
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                padding: '0.75rem 1rem', border: `2px solid ${border}`, borderRadius: 'var(--radius-s)',
                background: bg, cursor: answered ? 'default' : 'pointer',
                fontFamily: 'var(--font)', fontSize: '0.95rem',
                textAlign: 'right', direction: 'rtl', lineHeight: 1.5, transition: 'all 0.2s',
              }}
            >
              {answered && isBad ? '❌ ' : answered && isPicked && !isBad ? '✅ ' : ''}{s.text}
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          {cur.sentences[picked]?.bad ? (
            <div className="feedback-box feedback-success" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              🎉 מצוין! מצאת/ת את ההזיה! {cur.sentences[badIdx].fix}
            </div>
          ) : (
            <div className="feedback-box feedback-error" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              המשפט השגוי הוא: "{cur.sentences[badIdx].text}". {cur.sentences[badIdx].fix}
            </div>
          )}
          <button className="btn btn-primary btn-lg" onClick={next}>
            {round < ROUNDS.length - 1 ? 'סיבוב הבא ←' : 'ראה/י תוצאות ←'}
          </button>
        </>
      )}
    </div>
  )
}
