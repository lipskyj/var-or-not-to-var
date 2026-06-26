import { useState } from 'react'
import { askGemini } from '../../api/gemini.js'

const EXAMPLES = [
  { label: '🧑‍🏫 מורה', role: 'מורה לביולוגיה לכיתה ז׳', task: 'הסבר איך הלב עובד', format: '3 נקודות קצרות' },
  { label: '🎭 סטנדאפ', role: 'קומיקאי סטנדאפ', task: 'ספר על שיעורי בית', format: 'משפט קצר ומצחיק' },
  { label: '🧑‍🍳 שף', role: 'שף אוכל ים תיכוני', task: 'הסבר על חומוס', format: 'רשימת מרכיבים' },
]

export default function PromptSandbox({ onComplete }) {
  const [role, setRole]     = useState('')
  const [task, setTask]     = useState('')
  const [format, setFormat] = useState('')
  const [response, setResponse] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tries, setTries]   = useState(0)
  const [history, setHistory] = useState([])

  const submit = async () => {
    if (!task.trim() || loading) return
    setLoading(true)
    setResponse(null)

    const parts = []
    if (role.trim()) parts.push(`אתה ${role.trim()}.`)
    parts.push(task.trim())
    if (format.trim()) parts.push(`ענה בפורמט: ${format.trim()}.`)

    try {
      const text = await askGemini(parts.join(' '), {
        system: 'ענה בעברית בלבד. היה ספציפי ושימושי.',
        maxTokens: 220,
        temperature: 0.8,
      })
      const entry = { role, task, format, resp: text }
      setHistory(h => [entry, ...h].slice(0, 3))
      setResponse(text)
    } catch (err) {
      setResponse(`⚠️ שגיאה: ${err.message}`)
    } finally {
      setLoading(false)
    }

    setTries(n => {
      const next = n + 1
      if (next >= 2 && onComplete) onComplete()
      return next
    })
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
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
        מלא/י שדה אחד ← שלח ← שנה/י שדה ← שלח שוב. ראה/י כיצד התשובה משתנה.
      </p>

      <div style={{ marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.4rem', letterSpacing: '0.05em' }}>
          דוגמאות מהירות ↓
        </div>
        <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
          {EXAMPLES.map(ex => (
            <button
              key={ex.label}
              className="btn btn-outline btn-sm"
              style={{ fontSize: '0.8rem' }}
              onClick={() => { setRole(ex.role); setTask(ex.task); setFormat(ex.format); setResponse(null) }}
            >
              {ex.label}
            </button>
          ))}
        </div>
      </div>

      {field('🎭 תפקיד (Role)', 'מי ה-AI? מה ה"אישיות" שלו?', role, setRole, 'לדוגמה: "מדריך טיול" או "מורה לביולוגיה"')}
      {field('📋 משימה (Task)', 'מה אתה/ן רוצה שה-AI יעשה?', task, setTask, 'לדוגמה: "הסבר על ירושלים"')}
      {field('📐 פורמט (Format)', 'איך תרצה/י שהתשובה תיראה?', format, setFormat, 'לדוגמה: "3 נקודות קצרות"')}

      <button
        className="btn btn-primary btn-lg"
        onClick={submit}
        disabled={!task.trim() || loading}
        style={{ marginBottom: '1rem' }}
      >
        {loading ? '⏳ שולח ל-AI...' : 'שלח/י Prompt ←'}
      </button>

      {loading && (
        <div style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '0.75rem', animation: 'float 1s ease-in-out infinite' }}>
          🤖 Gemini מעבד את הבקשה...
        </div>
      )}

      {response && (
        <div style={{ background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', padding: '1rem', border: '2px solid var(--c-border)', whiteSpace: 'pre-line', fontSize: '0.95rem', lineHeight: 1.7, marginBottom: '0.75rem', animation: 'cardIn 0.4s ease' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.4rem' }}>תגובת ה-AI:</div>
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
