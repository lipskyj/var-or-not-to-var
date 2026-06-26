import { useState, useRef, useEffect } from 'react'
import { askGemini } from '../../api/gemini.js'

const WORD_POOL = [
  { word: 'כלב', cat: 'בעלי חיים', color: '#10b981' },
  { word: 'חתול', cat: 'בעלי חיים', color: '#10b981' },
  { word: 'פיל', cat: 'בעלי חיים', color: '#10b981' },
  { word: 'אריה', cat: 'בעלי חיים', color: '#10b981' },
  { word: 'ציפור', cat: 'בעלי חיים', color: '#10b981' },
  { word: 'דג', cat: 'בעלי חיים', color: '#10b981' },
  { word: 'מחשב', cat: 'טכנולוגיה', color: '#3b82f6' },
  { word: 'טלפון', cat: 'טכנולוגיה', color: '#3b82f6' },
  { word: 'רובוט', cat: 'טכנולוגיה', color: '#3b82f6' },
  { word: 'אינטרנט', cat: 'טכנולוגיה', color: '#3b82f6' },
  { word: 'מצלמה', cat: 'טכנולוגיה', color: '#3b82f6' },
  { word: 'שרת', cat: 'טכנולוגיה', color: '#3b82f6' },
  { word: 'שמחה', cat: 'רגשות', color: '#f59e0b' },
  { word: 'עצב', cat: 'רגשות', color: '#f59e0b' },
  { word: 'כעס', cat: 'רגשות', color: '#f59e0b' },
  { word: 'פחד', cat: 'רגשות', color: '#f59e0b' },
  { word: 'אהבה', cat: 'רגשות', color: '#f59e0b' },
  { word: 'קנאה', cat: 'רגשות', color: '#f59e0b' },
]

function initColumn() {
  return [...WORD_POOL].sort(() => Math.random() - 0.5).slice(0, 5)
}

export default function WordArenaGame({ onComplete }) {
  const [column, setColumn] = useState(initColumn)
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [thinking, setThinking] = useState(false)
  const [flash, setFlash] = useState(null) // { word, success }
  const [done, setDone] = useState(false)
  const [tries, setTries] = useState(0)
  const inputRef = useRef(null)

  useEffect(() => {
    if (score >= 8 && !done) {
      setDone(true)
      if (onComplete) onComplete()
    }
  }, [score, done, onComplete])

  const submit = async () => {
    if (!input.trim() || thinking || done) return
    const typed = input.trim()
    setInput('')
    setThinking(true)

    const wordList = column.map(w => w.word).join(', ')
    const prompt = `מהי המילה הדומה ביותר מבחינה סמנטית ל-"${typed}" מתוך הרשימה הזו: ${wordList}?
ענה/י במילה אחת בלבד מהרשימה, או "אין" אם אין התאמה קרובה.`

    let matched = null
    try {
      const raw = await askGemini(prompt, { maxTokens: 20, temperature: 0.1 })
      const found = column.find(w => raw.includes(w.word))
      if (found) matched = found
    } catch {
      // fallback: category match
      const pool = WORD_POOL.find(w => w.word === typed)
      if (pool) matched = column.find(w => w.cat === pool.cat) || null
    }

    setThinking(false)
    setTries(t => t + 1)

    if (matched) {
      setFlash({ word: matched.word, success: true })
      setScore(s => s + 1)
      // Remove matched word, add new one
      const remaining = WORD_POOL.filter(w => !column.includes(w) && w.word !== matched.word)
      const replacement = remaining[Math.floor(Math.random() * remaining.length)]
      setColumn(col => col.map(w => w === matched ? replacement : w))
      setTimeout(() => setFlash(null), 800)
    } else {
      setFlash({ word: typed, success: false })
      setTimeout(() => setFlash(null), 800)
    }

    setTimeout(() => inputRef.current?.focus(), 100)
  }

  const barWidth = Math.min(100, (score / 8) * 100)

  return (
    <div className="card" style={{ maxWidth: 440, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🧠</span>
        <h3>Word Arena</h3>
        <span style={{ marginRight: 'auto', fontWeight: 700, color: '#a855f7' }}>{score}/8</span>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
        כתוב/י מילה קשורה ← ה-AI ימצא את הקרובה ביותר בעמודה ויאפס אותה
      </p>

      {/* Progress */}
      <div style={{ height: 6, borderRadius: 99, background: 'var(--c-border)', overflow: 'hidden', marginBottom: '1rem' }}>
        <div style={{ height: '100%', width: `${barWidth}%`, background: 'var(--grad)', transition: 'width 0.4s cubic-bezier(0.34,1.2,0.64,1)', borderRadius: 99 }} />
      </div>

      {/* Word column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1rem' }}>
        {column.map((w, i) => (
          <div
            key={`${w.word}-${i}`}
            style={{
              padding: '0.6rem 1rem', borderRadius: 'var(--radius-s)',
              background: flash?.word === w.word
                ? flash.success ? 'rgba(16,185,129,0.2)' : 'rgba(248,113,113,0.2)'
                : 'var(--c-bg)',
              border: `2px solid ${flash?.word === w.word
                ? flash.success ? '#10b981' : '#f87171'
                : w.color + '44'}`,
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              transition: 'all 0.2s',
              transform: flash?.word === w.word && flash.success ? 'scale(1.03)' : 'scale(1)',
            }}
          >
            <span style={{ fontWeight: 700, fontSize: '1rem' }}>{w.word}</span>
            <span style={{ fontSize: '0.72rem', color: w.color, fontWeight: 600 }}>{w.cat}</span>
          </div>
        ))}
      </div>

      {/* Flash feedback */}
      {flash && !flash.success && (
        <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--c-danger)', marginBottom: '0.5rem', animation: 'cardIn 0.2s ease' }}>
          ❌ "{flash.word}" לא נמצאה התאמה קרובה מספיק
        </div>
      )}

      {/* Input */}
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder={thinking ? 'ה-AI חושב...' : 'כתוב/י מילה קשורה...'}
          disabled={thinking || done}
          style={{ flex: 1 }}
          autoFocus
        />
        <button
          className="btn btn-primary"
          onClick={submit}
          disabled={thinking || !input.trim() || done}
        >
          {thinking ? '⏳' : '→'}
        </button>
      </div>

      {done && (
        <div className="feedback-box feedback-success" style={{ marginTop: '0.75rem', animation: 'cardIn 0.4s ease' }}>
          🏆 מצוין! ניקוי {score} מילים! ה-AI מצא דמיון סמנטי בזמן אמת — בדיוק כמו שמודלי embedding עובדים.
        </div>
      )}
    </div>
  )
}
