import { useState } from 'react'

const ROUNDS = [
  {
    topic: 'אלברט איינשטיין',
    sentences: [
      { text: 'אלברט איינשטיין נולד בגרמניה בשנת 1879.', bad: false, confidence: 97 },
      { text: 'הוא פיתח את תורת היחסות המיוחדת.', bad: false, confidence: 99 },
      { text: 'הוא זכה בפרס נובל לפיזיקה בשנת 1921.', bad: false, confidence: 98 },
      { text: 'הוא היה ידוע כשחקן שחמט מצוין ואף ניצח אלופי עולם.', bad: true, confidence: 91, fix: 'איינשטיין אהב לנגן כינור — לא לשחק שחמט. ה-AI "המציא" עובדה זו בביטחון מלא.' },
    ],
  },
  {
    topic: 'מדינת ישראל',
    sentences: [
      { text: 'ישראל ממוקמת במזרח התיכון, על חוף הים התיכון.', bad: false, confidence: 99 },
      { text: 'בירת ישראל היא ירושלים.', bad: false, confidence: 99 },
      { text: 'ישראל הכריזה על עצמאותה ב-14 במאי 1955.', bad: true, confidence: 88, fix: 'ישראל הכריזה על עצמאותה ב-14 במאי 1948 — לא 1955. ה-AI החליף שנה בטעות.' },
      { text: 'השפות הרשמיות הן עברית וערבית.', bad: false, confidence: 99 },
    ],
  },
  {
    topic: 'מחשבים ואינטרנט',
    sentences: [
      { text: 'המחשב הראשון הומצא בשנות ה-40 של המאה ה-20.', bad: false, confidence: 94 },
      { text: 'הדפדפן הראשון בעולם נקרא Internet Explorer.', bad: true, confidence: 85, fix: 'הדפדפן הראשון נקרא WorldWideWeb (1991). Internet Explorer הופיע רק ב-1995.' },
      { text: 'הווב (WWW) הומצא על ידי טים ברנרס-לי.', bad: false, confidence: 99 },
      { text: 'מרכיב מרכזי במחשבים הוא המעבד (CPU).', bad: false, confidence: 99 },
    ],
  },
]

function ConfidenceBar({ value, revealed }) {
  const color = value >= 95 ? '#10b981' : value >= 85 ? '#f59e0b' : '#f87171'
  return (
    <div style={{ marginTop: '0.4rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: 'var(--c-muted)', marginBottom: '0.2rem' }}>
        <span>ביטחון ה-AI</span>
        <span style={{ fontWeight: 700, color: revealed ? color : 'var(--c-muted)' }}>
          {revealed ? `${value}%` : '??%'}
        </span>
      </div>
      <div style={{ height: 5, borderRadius: 99, background: 'rgba(255,255,255,0.08)', overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 99,
          background: revealed ? color : 'rgba(255,255,255,0.15)',
          width: revealed ? `${value}%` : '0%',
          transition: 'width 0.7s cubic-bezier(0.4,0,0.2,1), background 0.3s',
        }} />
      </div>
    </div>
  )
}

export default function HallucinationSpot({ onComplete }) {
  const [round, setRound] = useState(0)
  const [picked, setPicked] = useState(null)
  const [score, setScore]   = useState(0)
  const [done, setDone]     = useState(false)

  const cur      = ROUNDS[round]
  const answered = picked !== null
  const badIdx   = cur.sentences.findIndex(s => s.bad)

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
        <div style={{ margin: '1rem 0', padding: '0.75rem', borderRadius: 'var(--radius-s)', background: score === ROUNDS.length ? 'var(--c-success-l)' : 'var(--c-warn-l)', border: `1px solid ${score === ROUNDS.length ? 'rgba(16,185,129,0.3)' : 'rgba(245,158,11,0.3)'}` }}>
          <div style={{ fontSize: '1.5rem', fontWeight: 900, color: score === ROUNDS.length ? 'var(--c-success)' : 'var(--c-warn)' }}>
            {Math.round(score / ROUNDS.length * 100)}%
          </div>
          <div style={{ fontSize: '0.82rem', color: 'var(--c-muted)' }}>דיוק גילוי הזיות</div>
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
          ה-AI לא שקרן — הוא <strong>מנבא מילים סבירות</strong>.
          ביטחון גבוה ≠ נכון. תמיד בדוק/י עובדות חשובות!
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '0.82rem', color: 'var(--c-muted)' }}>🔍 מצא/י את ההזיה</span>
        <span className="pill-counter">{round + 1} / {ROUNDS.length}</span>
      </div>

      <div style={{ fontWeight: 700, marginBottom: '0.3rem' }}>נושא: {cur.topic}</div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        אחד המשפטים שגוי — ה-AI המציא אותו. לחץ/י עליו!
      </p>

      <div className="stack" style={{ '--gap': '0.5rem', marginBottom: '1rem' }}>
        {cur.sentences.map((s, i) => {
          const isBad    = s.bad
          const isPicked = i === picked
          let bg = 'rgba(255,255,255,0.03)', border = 'var(--c-border)'
          if (answered) {
            if (isBad)         { bg = 'var(--c-danger-l)';  border = 'rgba(248,113,113,0.4)' }
            else if (isPicked) { bg = 'var(--c-success-l)'; border = 'rgba(16,185,129,0.4)' }
          }
          return (
            <button
              key={i}
              onClick={() => pick(i)}
              style={{
                padding: '0.85rem 1rem',
                border: `1.5px solid ${border}`, borderRadius: 'var(--radius-s)',
                background: bg, cursor: answered ? 'default' : 'pointer',
                fontFamily: 'var(--font)', fontSize: '0.92rem', color: 'var(--c-text)',
                textAlign: 'right', direction: 'rtl', lineHeight: 1.5,
                transition: 'all 0.2s', width: '100%',
              }}
            >
              <div>{answered && isBad ? '❌ ' : answered && isPicked && !isBad ? '✅ ' : ''}{s.text}</div>
              <ConfidenceBar value={s.confidence} revealed={answered} />
            </button>
          )
        })}
      </div>

      {answered && (
        <>
          {cur.sentences[picked]?.bad ? (
            <div className="feedback-box feedback-success" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              🎉 מצוין! {cur.sentences[badIdx].fix}
            </div>
          ) : (
            <div className="feedback-box feedback-error" style={{ marginBottom: '0.75rem', fontSize: '0.9rem' }}>
              המשפט השגוי: "{cur.sentences[badIdx].text}" — {cur.sentences[badIdx].fix}
            </div>
          )}
          <div className="feedback-box feedback-warn" style={{ marginBottom: '0.75rem', fontSize: '0.82rem' }}>
            💡 ה-AI אמר את הטעות ב-<strong>{cur.sentences[badIdx].confidence}% ביטחון</strong>. ביטחון גבוה ≠ נכון!
          </div>
          <button className="btn btn-primary btn-lg" onClick={next}>
            {round < ROUNDS.length - 1 ? 'סיבוב הבא ←' : 'ראה/י תוצאות ←'}
          </button>
        </>
      )}
    </div>
  )
}
