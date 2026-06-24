import { useState } from 'react'

function buildResponse(role, task, format) {
  if (!task.trim()) return null

  const r = role.trim()
  const f = format.trim()
  const hasRole = r.length > 2
  const hasFormat = f.length > 2
  const isBullets = f.includes('נקודות') || f.includes('רשימה') || f.includes('bullet')
  const isShort = f.includes('קצר') || f.includes('משפט')

  // Detect topic from task text
  let topic = 'הנושא'
  const t = task.toLowerCase()
  if (t.includes('ירושלים')) topic = 'ירושלים'
  else if (t.includes('מחשב') || t.includes('computer')) topic = 'מחשבים'
  else if (t.includes('ים') || t.includes('חוף')) topic = 'הים התיכון'
  else if (t.includes('ישראל') || t.includes('israel')) topic = 'ישראל'
  else if (t.includes('היסטוריה') || t.includes('עתיק')) topic = 'ההיסטוריה'
  else if (t.includes('חיה') || t.includes('בעל חיים')) topic = 'בעלי החיים'

  if (!hasRole && !hasFormat) {
    return `${topic} הוא נושא מעניין. יש הרבה דברים לדעת עליו. הוא חשוב מסיבות שונות ויש לו היסטוריה ארוכה.`
  }
  if (hasRole && !hasFormat) {
    return `שלום! אני כאן בתור ${r}. ${topic} הוא נושא שמאוד קרוב לליבי! אשמח לספר לכם עליו — יש כל כך הרבה דברים מרתקים לגלות. יש שאלות?`
  }
  if (!hasRole && hasFormat) {
    if (isBullets) return `• ${topic} — עובדה ראשונה מרכזית\n• ${topic} — עובדה שנייה מעניינת\n• ${topic} — עובדה שלישית שכדאי לדעת`
    if (isShort) return `${topic} — נושא חשוב עם היסטוריה עשירה ומאפיינים ייחודיים.`
    return `${topic}:\nנושא מרכזי עם מאפיינים ייחודיים רבים. יש לו חשיבות רבה בחיי היומיום ובהיסטוריה.`
  }
  // Both role + format
  if (isBullets) {
    return `שלום מ${r}! הנה מה שצריך לדעת על ${topic}:\n\n• נקודה ראשונה — חשובה מאוד ומרתקת\n• נקודה שנייה — מפתיעה וחשובה לדעת\n• נקודה שלישית — שימושית בחיי היומיום\n\nשאלות? אשמח לעזור! 😊`
  }
  if (isShort) return `כ${r}: ${topic} — ${task.length > 20 ? task.slice(0, 20) + '...' : task}. בקצרה: נושא חשוב עם השפעה רבה.`
  return `שלום! כ${r}, אני שמח/ה להסביר לכם על ${topic}. זהו נושא שקרוב מאוד לליבי. ${topic} חשוב מכיוון שהוא משפיע על חיינו בדרכים רבות ומגוונות. אשמח לענות על שאלות נוספות!`
}

export default function PromptSandbox({ onComplete }) {
  const [role, setRole]     = useState('')
  const [task, setTask]     = useState('')
  const [format, setFormat] = useState('')
  const [response, setResponse] = useState(null)
  const [tries, setTries]   = useState(0)
  const [history, setHistory] = useState([])

  const submit = () => {
    const resp = buildResponse(role, task, format)
    if (!resp) return
    const entry = { role, task, format, resp }
    setHistory(h => [entry, ...h].slice(0, 3))
    setResponse(resp)
    const n = tries + 1
    setTries(n)
    if (n >= 2 && onComplete) onComplete()
  }

  const field = (label, hint, val, set, ph) => (
    <div style={{ marginBottom: '0.75rem' }}>
      <label style={{ display: 'block', fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.3rem' }}>{label}</label>
      <input type="text" value={val} onChange={e => set(e.target.value)} placeholder={ph} />
      <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginTop: '0.25rem' }}>{hint}</div>
    </div>
  )

  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <h3 style={{ marginBottom: '0.25rem' }}>✏️ ארגז ה-Prompt</h3>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        מלא/י שדה אחד ← לחץ/י שלח ← שנה/י שדה ← שלח שוב. ראה/י כיצד התשובה משתנה.
      </p>

      {field('🎭 תפקיד (Role)', 'מי ה-AI? מה ה"אישיות" שלו?', role, setRole, 'לדוגמה: "מדריך טיול" או "מורה לביולוגיה"')}
      {field('📋 משימה (Task)', 'מה אתה/ן רוצה שה-AI יעשה?', task, setTask, 'לדוגמה: "הסבר על ירושלים"')}
      {field('📐 פורמט (Format)', 'איך תרצה/י שהתשובה תיראה?', format, setFormat, 'לדוגמה: "3 נקודות קצרות"')}

      <button className="btn btn-primary btn-lg" onClick={submit} disabled={!task.trim()} style={{ marginBottom: '1rem' }}>
        שלח/י Prompt ←
      </button>

      {response && (
        <div style={{ background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', padding: '1rem', border: '2px solid var(--c-border)', whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.4rem' }}>תגובת ה-AI (מדומה):</div>
          {response}
        </div>
      )}

      {tries === 1 && (
        <div className="feedback-box feedback-warn" style={{ fontSize: '0.88rem', marginBottom: '0.75rem' }}>
          💡 נסה/י לשנות שדה אחד ולשלוח שוב — ראה/י מה משתנה!
        </div>
      )}
      {tries >= 2 && (
        <div className="feedback-box feedback-success" style={{ fontSize: '0.88rem' }}>
          ✅ שמת/ת לב? תפקיד + פורמט = תשובה הרבה יותר שימושית!
        </div>
      )}

      {history.length > 1 && (
        <details style={{ marginTop: '0.75rem' }}>
          <summary style={{ fontWeight: 700, fontSize: '0.85rem', cursor: 'pointer' }}>📜 הניסיונות הקודמים שלי</summary>
          {history.slice(1).map((h, i) => (
            <div key={i} style={{ marginTop: '0.5rem', padding: '0.6rem', background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', fontSize: '0.82rem' }}>
              <strong>תפקיד:</strong> {h.role || '—'} | <strong>פורמט:</strong> {h.format || '—'}
              <div style={{ color: 'var(--c-muted)', marginTop: '0.25rem', whiteSpace: 'pre-line' }}>{h.resp}</div>
            </div>
          ))}
        </details>
      )}
    </div>
  )
}
