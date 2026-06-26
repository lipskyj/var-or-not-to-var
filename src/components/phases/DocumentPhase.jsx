import { useState } from 'react'
import { askGemini } from '../../api/gemini.js'
import { saveSubmission, markUnitComplete } from '../../storage.js'

const CONFETTI_EMOJIS = ['🎉','✨','🌟','💜','🎊','💫','🔥','🎯']

// Distractor pool — plausible AI terms that are rarely the answer for any unit
const DISTRACTOR_POOL = [
  'אלגוריתם', 'פיקסל', 'שרת', 'ממשק', 'ביט', 'הצפנה',
  'רשת', 'זיכרון', 'קוד', 'מסד נתונים', 'פרוטוקול', 'חומרה',
]

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
  const required = doc.requiredKeywords || []

  // Tile list: required concepts + distractors, shuffled once on mount
  const [tiles] = useState(() => {
    const distractors = DISTRACTOR_POOL.filter(d => !required.includes(d))
      .sort(() => Math.random() - 0.5)
      .slice(0, required.length + 1)
    return [...required, ...distractors].sort(() => Math.random() - 0.5)
  })

  const [stage, setStage] = useState(1)       // 1=tiles, 2=write, 3=done
  const [picked, setPicked] = useState(new Set())
  const [screenshot, setScreenshot] = useState(null)
  const [reflection, setReflection] = useState('')
  const [error, setError] = useState('')
  const [aiLoading, setAiLoading] = useState(false)
  const [aiFeedback, setAiFeedback] = useState(null)  // { pass, message }
  const [attempt, setAttempt] = useState(0)

  const togglePick = (tile) => {
    setPicked(prev => {
      const next = new Set(prev)
      if (next.has(tile)) next.delete(tile)
      else next.add(tile)
      return next
    })
  }

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = ev => setScreenshot(ev.target.result)
    reader.readAsDataURL(file)
  }

  const submitReflection = async () => {
    const wordCount = reflection.trim().split(/\s+/).filter(Boolean).length
    if (wordCount < 8) {
      setError('כתוב/י לפחות כמה משפטים שלמים בשפה שלך.')
      return
    }
    if (doc.artifactType === 'screenshot+reflection' && !screenshot) {
      setError('נא לצרף צילום מסך.')
      return
    }

    setAiLoading(true)
    setError('')
    setAiFeedback(null)

    try {
      const evalPrompt = `אתה מעריך הבנה של תלמיד/ת כיתה ז' בקורס אוריינות AI.
השאלה שנשאלה: ${doc.question}
תשובת התלמיד/ה: "${reflection}"

האם התשובה מראה הבנה אמיתית ואישית? בדוק/י:
- יש משפטים שלמים ולא רק רשימת מילים?
- יש דוגמה ספציפית או הסבר מרחיב?
- יש ניסוח אישי ולא העתקה של מושגים בלבד?

ענה/י: PASS אם יש הבנה, RETRY אם לא.
בשורה שנייה: משפט עידוד קצר בעברית ספציפי לתשובה.`

      const raw = await askGemini(evalPrompt, {
        system: 'אתה מעריך חינוכי מדויק. עקוב אחר הפורמט המבוקש בדיוק.',
        maxTokens: 100,
        temperature: 0.2,
      })

      const lines = raw.split('\n').map(l => l.trim()).filter(Boolean)
      const verdict = lines[0]?.toUpperCase() || ''
      const feedbackMsg = lines.slice(1).join(' ')
      const passed = verdict.includes('PASS')
      const newAttempt = attempt + 1
      setAttempt(newAttempt)

      if (passed || newAttempt >= 2) {
        saveSubmission(unit.id, { screenshotDataUrl: screenshot, reflection })
        markUnitComplete(unit.id)
        setAiFeedback({ pass: true, message: feedbackMsg || '🌟 הבנה מצוינת!' })
        setStage(3)
        onComplete()
      } else {
        setAiFeedback({ pass: false, message: feedbackMsg || 'נסה/י לכתוב יותר בפירוט.' })
      }
    } catch {
      // API error — accept if reasonably long
      if (reflection.trim().length >= 50) {
        saveSubmission(unit.id, { screenshotDataUrl: screenshot, reflection })
        markUnitComplete(unit.id)
        setStage(3)
        onComplete()
      } else {
        setError('נסה/י לכתוב יותר מפורט.')
      }
    } finally {
      setAiLoading(false)
    }
  }

  // ── Stage 3: done ──────────────────────────────────────────────────────────
  if (stage === 3) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem', position: 'relative', overflow: 'hidden' }}>
        <ConfettiBurst />
        <div style={{ fontSize: '4rem', marginBottom: '0.5rem', animation: 'float 1s ease-in-out 2' }}>🎉</div>
        <h2 style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
          כל הכבוד! סיימת/ת את היחידה.
        </h2>
        {aiFeedback?.message && (
          <p style={{ color: 'var(--c-muted)', marginTop: '0.5rem', fontSize: '0.92rem' }}>
            🤖 {aiFeedback.message}
          </p>
        )}
        <p style={{ color: 'var(--c-muted)', marginTop: '0.5rem' }}>היחידה הבאה נפתחה ✨</p>
      </div>
    )
  }

  // ── Stage 1: concept tile picking ─────────────────────────────────────────
  if (stage === 1) {
    return (
      <div className="stack card" style={{ '--gap': '1.25rem', maxWidth: 540, margin: '0 auto' }}>
        <div>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
            שלב 1 מתוך 2
          </div>
          <h3>📌 זהה/י — אילו מושגים שייכים לתשובה?</h3>
        </div>

        <p style={{ fontSize: '1rem', fontWeight: 700 }}>{doc.question}</p>

        <div>
          <div style={{ fontSize: '0.82rem', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>
            לחץ/י על המושגים שלדעתך רלוונטיים לתשובה:
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {tiles.map(tile => {
              const active = picked.has(tile)
              return (
                <button
                  key={tile}
                  onClick={() => togglePick(tile)}
                  style={{
                    padding: '0.45rem 1rem', borderRadius: 99, fontSize: '0.9rem', fontWeight: 600,
                    border: `2px solid ${active ? '#a855f7' : 'var(--c-border)'}`,
                    background: active ? 'rgba(168,85,247,0.15)' : 'transparent',
                    color: active ? '#a855f7' : 'var(--c-muted)',
                    cursor: 'pointer', transition: 'all 0.15s',
                    transform: active ? 'scale(1.06)' : 'scale(1)',
                  }}
                >
                  {active ? '✓ ' : ''}{tile}
                </button>
              )
            })}
          </div>
        </div>

        {picked.size >= 2 ? (
          <button
            className="btn btn-primary btn-lg"
            onClick={() => setStage(2)}
            style={{ width: '100%', animation: 'cardIn 0.3s ease' }}
          >
            עכשיו כתוב/י בעצמך ←
          </button>
        ) : (
          <div style={{ textAlign: 'center', fontSize: '0.82rem', color: 'var(--c-muted)' }}>
            בחר/י לפחות 2 מושגים כדי להמשיך
          </div>
        )}
      </div>
    )
  }

  // ── Stage 2: free writing, NO hints ──────────────────────────────────────
  return (
    <div className="stack card" style={{ '--gap': '1.25rem', maxWidth: 540, margin: '0 auto' }}>
      <div>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#10b981', marginBottom: '0.35rem', letterSpacing: '0.05em' }}>
          שלב 2 מתוך 2
        </div>
        <h3>✍️ עכשיו בלשון שלך</h3>
      </div>

      <p style={{ fontSize: '1.05rem', fontWeight: 700 }}>{doc.question}</p>

      <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.2)', borderRadius: 'var(--radius-s)', padding: '0.75rem', fontSize: '0.82rem', color: 'var(--c-muted)' }}>
        💬 כתוב/י במשפטים שלמים. אל/י תרשום/י רשימת מילים — הסבר/י כאילו אתה/ת מסביר/ה לחבר/ה.
      </div>

      {doc.artifactType === 'screenshot+reflection' && (
        <div>
          <label style={{ display: 'block', fontWeight: 700, marginBottom: '0.5rem' }}>
            📸 {doc.screenshotLabel}
          </label>
          <input type="file" accept="image/*" onChange={handleFile} style={{ fontSize: '0.9rem' }} />
          {screenshot && (
            <img
              src={screenshot}
              alt="צילום מסך"
              style={{ marginTop: '0.75rem', maxWidth: '100%', borderRadius: 'var(--radius-s)', border: '2px solid var(--c-border)' }}
            />
          )}
        </div>
      )}

      <textarea
        rows={5}
        placeholder="הסבר/י כאן בשפה שלך..."
        value={reflection}
        onChange={e => { setReflection(e.target.value); setError(''); setAiFeedback(null) }}
        style={{ resize: 'vertical' }}
      />

      {aiFeedback && !aiFeedback.pass && (
        <div className="feedback-box feedback-warn" style={{ animation: 'cardIn 0.3s ease' }}>
          🤖 {aiFeedback.message}
          <div style={{ fontSize: '0.78rem', opacity: 0.7, marginTop: '0.3rem' }}>
            נסה/י לכלול דוגמה ספציפית ולהסביר בפירוט יותר.
          </div>
        </div>
      )}

      {error && <div className="feedback-box feedback-error">{error}</div>}

      <button
        className="btn btn-success btn-lg"
        onClick={submitReflection}
        disabled={aiLoading || reflection.trim().split(/\s+/).filter(Boolean).length < 8}
      >
        {aiLoading ? '🤖 בודק/ת הבנה...' : 'שלח/י ←'}
      </button>

      {reflection.trim().split(/\s+/).filter(Boolean).length < 8 && reflection.length > 0 && (
        <div style={{ textAlign: 'center', fontSize: '0.78rem', color: 'var(--c-muted)' }}>
          כתוב/י עוד קצת — לפחות כמה משפטים
        </div>
      )}
    </div>
  )
}
