import { useState, useMemo } from 'react'

const ALL_QUESTIONS = [
  {
    id: 'q1',
    unit: 'יחידה 1',
    question: 'מה ההבדל בין תוכנה רגילה ל-AI?',
    options: [
      { id: 'a', text: 'AI מהיר יותר ממחשב רגיל' },
      { id: 'b', text: 'AI לומד מדוגמאות; תוכנה רגילה פועלת לפי כללים קשיחים', correct: true },
      { id: 'c', text: 'AI מיוצר על ידי Google בלבד' },
    ],
    explanation: 'נכון! AI מוצא דפוסים בנתונים בעצמו — לא מקבל כללים ידניים. זו ההבחנה המרכזית בקורס.',
  },
  {
    id: 'q2',
    unit: 'יחידה 2',
    question: 'כיצד מודל שפה מנבא את המילה הבאה?',
    options: [
      { id: 'a', text: 'הוא מחפש בגוגל', },
      { id: 'b', text: 'הוא מגריל מילה אקראית' },
      { id: 'c', text: 'הוא מחשב הסתברות: איזו מילה הכי סבירה לפי ההקשר?', correct: true },
    ],
    explanation: 'נכון! המודל מסתכל על כל המילים לפניו ומחשב: מה הסיכוי שכל מילה אפשרית תופיע הבאה?',
  },
  {
    id: 'q3',
    unit: 'יחידה 3',
    question: 'מה זה "אימון" של מודל AI?',
    options: [
      { id: 'a', text: 'תהליך שבו מתכנת מלמד AI כל עובדה בנפרד' },
      { id: 'b', text: 'הצגת מיליוני דוגמאות והתאמת הפרמטרים עד שהתחזיות טובות', correct: true },
      { id: 'c', text: 'הכנסת ספרים לכונן קשיח' },
    ],
    explanation: 'נכון! אימון = הצגת דוגמאות → שגיאה → תיקון → חזרה. מיליוני פעמים, עד שהמודל מדויק.',
  },
  {
    id: 'q4',
    unit: 'יחידה 4',
    question: 'מה זה Embedding?',
    options: [
      { id: 'a', text: 'תמונה מוטמעת בתוך מסמך' },
      { id: 'b', text: 'המרת מילים למספרים שמשקפים משמעות ודמיון', correct: true },
      { id: 'c', text: 'הצפנת סיסמאות' },
    ],
    explanation: 'נכון! Embeddings הם ה"מרחב המשמעותי" של AI — מילים דומות קרובות זו לזו במרחב המספרי.',
  },
  {
    id: 'q5',
    unit: 'יחידה 6',
    question: 'מה זה "חלון ההקשר" (Context Window) של AI?',
    options: [
      { id: 'a', text: 'גודל המסך שבו מוצגת התשובה' },
      { id: 'b', text: 'כמות הנתונים שהמודל אומן עליה' },
      { id: 'c', text: 'כמות הטקסט שה-AI יכול "לראות" ולזכור בו זמנית', correct: true },
    ],
    explanation: 'נכון! מעבר לגבול חלון ההקשר, AI "שוכח" מה נאמר קודם — כמו זיכרון לטווח קצר.',
  },
  {
    id: 'q6',
    unit: 'יחידה 10',
    question: 'למה AI "מזיה" (מציג מידע שגוי בביטחון)?',
    options: [
      { id: 'a', text: 'כי הוא משקר בכוונה', },
      { id: 'b', text: 'כי הוא תמיד מנבא "המילה הסבירה ביותר" גם אם היא לא נכונה', correct: true },
      { id: 'c', text: 'כי הוא לא מחובר לאינטרנט' },
    ],
    explanation: 'נכון! AI לא "יודע" — הוא מנבא. לפעמים הניבוי המסתבר ביותר הוא שגוי, אבל הוא אומר אותו בביטחון.',
  },
  {
    id: 'q7',
    unit: 'יחידה 11',
    question: 'מהי "הטיה" (Bias) ב-AI?',
    options: [
      { id: 'a', text: 'שגיאת חישוב מתמטי' },
      { id: 'b', text: 'דעה פוליטית שמוזרמת למודל' },
      { id: 'c', text: 'דפוסי אפליה בנתוני האימון שמשפיעים על תוצאות המודל', correct: true },
    ],
    explanation: 'נכון! אם נתוני האימון מוטים, המודל ילמד את ההטיה. ה-AI לא ממציא הטיות — הוא משקף אותן.',
  },
  {
    id: 'q8',
    unit: 'יחידה 7',
    question: 'מה עושה הוספת "תפקיד" ל-Prompt?',
    options: [
      { id: 'a', text: 'לא משנה כלום — AI מתעלם מזה' },
      { id: 'b', text: 'משנה את סגנון התשובה, הרמה והמיקוד שלה', correct: true },
      { id: 'c', text: 'גורם ל-AI לעבוד מהר יותר' },
    ],
    explanation: 'נכון! "אתה מורה לכיתה א׳" מול "אתה פרופסור" — אותה שאלה, תשובות מאוד שונות. Role קובע ה"אישיות".',
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

export default function AIQuizShow({ onComplete }) {
  const questions = useMemo(() => shuffle(ALL_QUESTIONS).slice(0, 6), [])
  const [idx, setIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  const q = questions[idx]

  const pick = (opt) => {
    if (selected) return
    setSelected(opt)
    if (opt.correct) setScore(s => s + 1)
  }

  const next = () => {
    if (idx + 1 >= questions.length) {
      setDone(true)
      if (onComplete) onComplete()
    } else {
      setIdx(i => i + 1)
      setSelected(null)
    }
  }

  if (showIntro) {
    return (
      <div className="card" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎯</div>
        <h3 style={{ marginBottom: '0.5rem' }}>AI Quiz Show</h3>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          6 שאלות מהקורס כולו. כל שאלה מגיעה מיחידה שונה.
          בדוק/י כמה זכרת/ת!
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => setShowIntro(false)}>
          בוא/י נגלה ←
        </button>
      </div>
    )
  }

  if (done) {
    const pct = Math.round(score / questions.length * 100)
    return (
      <div className="card" style={{ maxWidth: 500, margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>
          {pct >= 80 ? '🏆' : pct >= 60 ? '🎯' : '💪'}
        </div>
        <h3 style={{ marginBottom: '0.25rem' }}>
          {pct >= 80 ? 'אלוף/ה!' : pct >= 60 ? 'טוב מאוד!' : 'יש על מה לעבוד!'}
        </h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0.5rem 0' }}>
          {score}/{questions.length}
        </div>
        <div style={{ height: 12, borderRadius: 99, background: 'var(--c-border)', overflow: 'hidden', maxWidth: 240, margin: '0.5rem auto 1rem' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--grad)', transition: 'width 1s', borderRadius: 99 }} />
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem' }}>
          {pct >= 80
            ? 'כיסית/ת את כל מושגי הקורס. אתה/ן מוכן/ה לפרויקט הסיום!'
            : pct >= 60
            ? 'בסיס טוב! חזור/י ליחידות שהרגשת/ת פחות ביטחון.'
            : 'אל דאגה — הפרויקט ילמד אותך עוד. חזור/י לדף הבית ושחזר/י יחידות.'}
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🎯</span>
          <h3 style={{ margin: 0 }}>Quiz Show</h3>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', color: 'var(--c-muted)' }}>ניקוד: {score}</span>
          <span className="pill-counter">{idx + 1}/{questions.length}</span>
        </div>
      </div>

      {/* Progress */}
      <div style={{ height: 4, borderRadius: 99, background: 'var(--c-border)', marginBottom: '1rem', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(idx / questions.length) * 100}%`, background: 'var(--grad)', transition: 'width 0.4s', borderRadius: 99 }} />
      </div>

      {/* Unit label */}
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
        📚 {q.unit}
      </div>

      {/* Question */}
      <div key={idx} style={{ animation: 'cardIn 0.35s cubic-bezier(0.34,1.56,0.64,1)' }}>
        <p style={{ fontWeight: 700, fontSize: '1rem', lineHeight: 1.6, marginBottom: '1rem' }}>
          {q.question}
        </p>

        {/* Options */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          {q.options.map(opt => {
            let bg = 'transparent'
            let border = 'var(--c-border)'
            let color = 'var(--c-text)'

            if (selected) {
              if (opt.correct) { bg = 'rgba(16,185,129,0.15)'; border = 'rgba(16,185,129,0.6)'; color = 'var(--c-success)' }
              else if (selected.id === opt.id && !opt.correct) { bg = 'rgba(248,113,113,0.15)'; border = 'rgba(248,113,113,0.6)'; color = 'var(--c-danger)' }
              else { color = 'var(--c-muted)' }
            }

            return (
              <button
                key={opt.id}
                onClick={() => pick(opt)}
                disabled={!!selected}
                style={{
                  padding: '0.75rem 1rem', borderRadius: 'var(--radius-s)', textAlign: 'right',
                  border: `2px solid ${border}`, background: bg, color,
                  cursor: selected ? 'default' : 'pointer', fontWeight: 600,
                  fontSize: '0.9rem', transition: 'all 0.2s', lineHeight: 1.4,
                }}
              >
                {opt.correct && selected ? '✅ ' : selected && selected.id === opt.id && !opt.correct ? '❌ ' : ''}
                {opt.text}
              </button>
            )
          })}
        </div>

        {selected && (
          <div className={`feedback-box ${selected.correct ? 'feedback-success' : 'feedback-warn'}`} style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
            {selected.correct ? '✅ ' : '💡 '}{q.explanation}
          </div>
        )}

        {selected && (
          <button className="btn btn-primary btn-lg" onClick={next} style={{ width: '100%' }}>
            {idx + 1 < questions.length ? 'שאלה הבאה ←' : 'ראה/י תוצאות ←'}
          </button>
        )}
      </div>
    </div>
  )
}
