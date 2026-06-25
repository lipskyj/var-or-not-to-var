import { useState, useMemo } from 'react'

const SCENARIOS = [
  {
    id: 1,
    icon: '🗺️',
    text: 'Waze מציע לך מסלול עוקף בגלל פקק שנוצר לפני שנייה',
    isAI: true,
    explanation: 'כן! Waze למד ממיליוני נסיעות של משתמשים אחרים. הוא לא פועל לפי כלל קשיח — הוא מנבא פקקים בזמן אמת.',
  },
  {
    id: 2,
    icon: '🧮',
    text: 'מחשבון עונה 2 + 2 = 4',
    isAI: false,
    explanation: 'לא AI. מחשבון פועל לפי כלל ידוע: "חבר את המספרים". אף "לימוד" לא קרה — זה קוד קשיח.',
  },
  {
    id: 3,
    icon: '🎬',
    text: 'Netflix ממליצה לך על סרט לפי מה שצפית בשבוע שעבר',
    isAI: true,
    explanation: 'כן! מנוע ההמלצות של Netflix למד מ-250 מיליון משתמשים מה אנשים עם טעם דומה לשלך אהבו.',
  },
  {
    id: 4,
    icon: '📱',
    text: 'הטלפון מזהה את הפנים שלך ופותח את המסך',
    isAI: true,
    explanation: 'כן! זיהוי פנים הוא רשת נוירונים שאומנה על מיליוני תמונות. היא "למדה" מה הפנים שלך נראות.',
  },
  {
    id: 5,
    icon: '🖨️',
    text: 'מדפסת מדפיסה מסמך שנשלח אליה',
    isAI: false,
    explanation: 'לא AI. המדפסת מבצעת פקודות מדויקות: "הדפס נקודה כאן, שם". אין למידה, אין הסקה.',
  },
  {
    id: 6,
    icon: '🤖',
    text: 'ChatGPT כותב לך שיר על הכלב שלך',
    isAI: true,
    explanation: 'כן! ChatGPT הוא מודל שפה שאומן על טריליוני מילים. הוא מנבא כל מילה לפי ההקשר — בדיוק כמו שלמדנו.',
  },
  {
    id: 7,
    icon: '🔊',
    text: 'Spotify מכינה לך playlist שמתאים למצב-הרוח שלך',
    isAI: true,
    explanation: 'כן! ה-AI של Spotify ניתח אלפי שירים שהאזנת להם, זיהה דפוסים (קצב, סגנון, מצב-רוח) ולמד מה מתאים לך.',
  },
  {
    id: 8,
    icon: '🚦',
    text: 'רמזור מחליף לאדום כל 30 שניות',
    isAI: false,
    explanation: 'לא AI. רמזור רגיל פועל לפי טיימר קבוע. (רמזורים חכמים עם חיישנים — זה כבר שאלה אחרת!)',
  },
]

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function AIorNotQuiz({ onComplete }) {
  const scenarios = useMemo(() => shuffle(SCENARIOS).slice(0, 6), [])
  const [idx, setIdx] = useState(0)
  const [answered, setAnswered] = useState(null) // 'correct' | 'wrong'
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const current = scenarios[idx]

  const answer = (guessAI) => {
    if (answered) return
    const correct = guessAI === current.isAI
    setAnswered(correct ? 'correct' : 'wrong')
    if (correct) setScore(s => s + 1)
  }

  const next = () => {
    if (idx + 1 >= scenarios.length) {
      setDone(true)
      if (onComplete) onComplete()
    } else {
      setIdx(i => i + 1)
      setAnswered(null)
    }
  }

  if (done) {
    const pct = Math.round(score / scenarios.length * 100)
    return (
      <div className="card" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '💪'}
        </div>
        <h3 style={{ marginBottom: '0.25rem' }}>סיימת/ת!</h3>
        <div style={{ fontSize: '2rem', fontWeight: 900, background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', marginBottom: '0.5rem' }}>
          {score}/{scenarios.length}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem' }}>
          {pct >= 80 ? 'מצוין! אתה/ן כבר חושב/ת כמו חוקר AI.' : pct >= 60 ? 'טוב! עוד קצת תרגול ותהיה/י מומחה/ית.' : 'יש על מה לעבוד! המשך/כי לקורס ותחזור/י לנסות.'}
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🤔</span>
          <h3 style={{ margin: 0 }}>AI או לא AI?</h3>
        </div>
        <span className="pill-counter">{idx + 1}/{scenarios.length}</span>
      </div>

      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
        בחר/י: האם הדוגמה הזו משתמשת ב-AI?
      </p>

      {/* Scenario card */}
      <div key={idx} style={{
        background: 'var(--c-bg)', border: '2px solid var(--c-border)', borderRadius: 'var(--radius)',
        padding: '1.5rem', textAlign: 'center', marginBottom: '1rem',
        animation: 'cardIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>{current.icon}</div>
        <p style={{ fontSize: '1rem', fontWeight: 600, lineHeight: 1.6 }}>{current.text}</p>
      </div>

      {/* Answer buttons */}
      {!answered ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          <button
            className="btn btn-lg"
            onClick={() => answer(true)}
            style={{ background: 'rgba(168,85,247,0.15)', border: '2px solid rgba(168,85,247,0.4)', color: '#a855f7', fontWeight: 700, fontSize: '1.1rem' }}
          >
            🤖 כן, AI
          </button>
          <button
            className="btn btn-lg"
            onClick={() => answer(false)}
            style={{ background: 'rgba(100,116,139,0.15)', border: '2px solid rgba(100,116,139,0.4)', color: 'var(--c-muted)', fontWeight: 700, fontSize: '1.1rem' }}
          >
            ❌ לא AI
          </button>
        </div>
      ) : (
        <div style={{ marginBottom: '1rem' }}>
          <div className={`feedback-box ${answered === 'correct' ? 'feedback-success' : 'feedback-error'}`} style={{ marginBottom: '0.75rem', fontSize: '0.88rem' }}>
            <strong>{answered === 'correct' ? '✅ נכון!' : '❌ לא בדיוק...'}</strong>
            <span style={{ marginRight: '0.4rem' }}>{current.explanation}</span>
          </div>
          <button className="btn btn-primary btn-lg" onClick={next} style={{ width: '100%' }}>
            {idx + 1 < scenarios.length ? 'הבא ←' : 'ראה/י תוצאות ←'}
          </button>
        </div>
      )}

      {/* Score */}
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--c-muted)' }}>
        <span>ניקוד: {score}/{idx + (answered ? 1 : 0)}</span>
        <span style={{ color: answered === 'correct' ? 'var(--c-success)' : answered === 'wrong' ? 'var(--c-danger)' : 'var(--c-muted)' }}>
          {answered === 'correct' ? '+1 ✓' : answered === 'wrong' ? 'אוי...' : ''}
        </span>
      </div>
    </div>
  )
}
