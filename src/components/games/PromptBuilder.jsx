import { useState } from 'react'

const COMPONENTS = {
  subject: {
    label: '🐾 נושא',
    color: '#a855f7',
    options: [
      { id: 'cat', text: 'חתול' },
      { id: 'dragon', text: 'דרקון' },
      { id: 'city', text: 'עיר עתידנית' },
      { id: 'forest', text: 'יער קסום' },
    ],
  },
  style: {
    label: '🎨 סגנון',
    color: '#ec4899',
    options: [
      { id: 'watercolor', text: 'צבעי מים' },
      { id: 'anime', text: 'anime' },
      { id: 'photo', text: 'פוטוריאליסטי' },
      { id: 'ghibli', text: 'Ghibli' },
    ],
  },
  setting: {
    label: '🌍 מקום',
    color: '#3b82f6',
    options: [
      { id: 'moon', text: 'על הירח' },
      { id: 'sunset', text: 'בשקיעה' },
      { id: 'snow', text: 'בשלג' },
      { id: 'space', text: 'בחלל' },
    ],
  },
  mood: {
    label: '✨ פרטים',
    color: '#10b981',
    options: [
      { id: 'dramatic', text: 'תאורה דרמטית' },
      { id: 'soft', text: 'אור רך' },
      { id: 'hd', text: '8K פרטים גבוהים' },
      { id: 'cinematic', text: 'קולנועי' },
    ],
  },
}

function buildPromptText(selections) {
  const parts = []
  if (selections.subject) parts.push(selections.subject.text)
  if (selections.setting) parts.push(selections.setting.text)
  if (selections.style) parts.push(`סגנון ${selections.style.text}`)
  if (selections.mood) parts.push(selections.mood.text)
  return parts.join(', ')
}

function qualityScore(selections) {
  return Object.keys(selections).length * 25
}

function qualityLabel(score) {
  if (score === 0) return { text: 'ריק — AI לא יודע מה לצייר', color: '#64748b' }
  if (score <= 25) return { text: 'חלש — תמונה גנרית מאוד', color: '#f87171' }
  if (score <= 50) return { text: 'בינוני — ניחוש רחב', color: '#f59e0b' }
  if (score <= 75) return { text: 'טוב — תמונה מוגדרת', color: '#34d399' }
  return { text: 'מושלם! — AI יודע בדיוק מה אתה/ן רוצה', color: '#10b981' }
}

function SimulatedOutput({ selections }) {
  const count = Object.keys(selections).length
  if (count === 0) return (
    <div style={{ color: 'var(--c-muted)', fontSize: '0.85rem', fontStyle: 'italic', padding: '0.5rem' }}>
      ...הכנס/י רכיבים כדי לראות מה ה-AI "יצור"
    </div>
  )

  const subject = selections.subject?.text || '???'
  const style = selections.style?.text
  const setting = selections.setting?.text
  const mood = selections.mood?.text

  let desc = `[תמונת AI] ${subject}`
  if (setting) desc += ` ${setting}`
  if (style) desc += `. סגנון: ${style}`
  if (mood) desc += `. ${mood}`
  if (count === 4) desc += ` ✨`

  return (
    <div style={{ fontSize: '0.85rem', color: count >= 3 ? 'var(--c-text)' : 'var(--c-muted)', lineHeight: 1.6 }}>
      🖼️ {desc}
      {count >= 3 && <div style={{ fontSize: '0.75rem', color: 'var(--c-success)', marginTop: '0.25rem' }}>← תמונה ברמה גבוהה!</div>}
    </div>
  )
}

export default function PromptBuilder({ onComplete }) {
  const [selections, setSelections] = useState({})
  const [builds, setBuilds] = useState(0)
  const [lastPrompt, setLastPrompt] = useState('')
  const [showIntro, setShowIntro] = useState(true)

  const score = qualityScore(selections)
  const ql = qualityLabel(score)
  const promptText = buildPromptText(selections)

  const toggle = (category, option) => {
    setSelections(prev => {
      const cur = prev[category]
      if (cur?.id === option.id) {
        const next = { ...prev }
        delete next[category]
        return next
      }
      return { ...prev, [category]: option }
    })
  }

  const build = () => {
    if (Object.keys(selections).length < 2) return
    setLastPrompt(promptText)
    const n = builds + 1
    setBuilds(n)
    setSelections({})
    if (n >= 2 && onComplete) onComplete()
  }

  if (showIntro) {
    return (
      <div className="card" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🖼️</div>
        <h3 style={{ marginBottom: '0.5rem' }}>בנה/י Prompt לתמונה</h3>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          AI לא "מדמיין" — הוא צריך <strong>תיאור מדויק</strong>. ככל שתתאר/י יותר, כך התמונה תהיה מדויקת יותר.
          בחר/י רכיבים לבנות prompt מנצח!
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => setShowIntro(false)}>
          בנה/י Prompt ←
        </button>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🖼️</span>
        <h3>בונה ה-Prompt</h3>
        {builds > 0 && <span className="pill-counter" style={{ marginRight: 'auto' }}>ניסיון {builds}/2</span>}
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
        לחץ/י על רכיבים מכל קטגוריה לבנות prompt. ראה/י איך ציון האיכות עולה!
      </p>

      {/* Component selectors */}
      {Object.entries(COMPONENTS).map(([key, cat]) => (
        <div key={key} style={{ marginBottom: '0.85rem' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: cat.color, marginBottom: '0.35rem', letterSpacing: '0.03em' }}>
            {cat.label}
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem' }}>
            {cat.options.map(opt => {
              const selected = selections[key]?.id === opt.id
              return (
                <button
                  key={opt.id}
                  onClick={() => toggle(key, opt)}
                  style={{
                    padding: '0.3rem 0.75rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600,
                    border: `2px solid ${selected ? cat.color : 'var(--c-border)'}`,
                    background: selected ? `${cat.color}22` : 'transparent',
                    color: selected ? cat.color : 'var(--c-muted)',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}
                >
                  {opt.text}
                </button>
              )
            })}
          </div>
        </div>
      ))}

      {/* Prompt preview */}
      <div style={{ background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', padding: '0.75rem 1rem', border: '2px solid var(--c-border)', marginBottom: '0.75rem', minHeight: '3rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.3rem' }}>ה-PROMPT שלך:</div>
        {promptText ? (
          <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--c-text)' }}>{promptText}</div>
        ) : (
          <div style={{ fontSize: '0.85rem', color: 'var(--c-muted)', fontStyle: 'italic' }}>בחר/י רכיבים למעלה...</div>
        )}
      </div>

      {/* Quality bar */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '0.3rem' }}>
          <span style={{ fontWeight: 700, color: ql.color }}>איכות: {ql.text}</span>
          <span style={{ color: 'var(--c-muted)' }}>{score}%</span>
        </div>
        <div style={{ height: 10, borderRadius: 99, background: 'var(--c-border)', overflow: 'hidden' }}>
          <div style={{
            height: '100%', borderRadius: 99,
            width: `${score}%`,
            background: score >= 75 ? 'linear-gradient(90deg,#10b981,#34d399)' : score >= 50 ? 'linear-gradient(90deg,#f59e0b,#fbbf24)' : 'linear-gradient(90deg,#f87171,#fb923c)',
            transition: 'width 0.4s cubic-bezier(0.34,1.2,0.64,1)',
          }} />
        </div>
      </div>

      {/* Simulated output */}
      <div style={{ background: 'rgba(168,85,247,0.07)', borderRadius: 'var(--radius-s)', padding: '0.75rem 1rem', border: '1px solid rgba(168,85,247,0.2)', marginBottom: '1rem' }}>
        <div style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.3rem' }}>פלט AI (מדומה):</div>
        <SimulatedOutput selections={selections} />
      </div>

      {lastPrompt && builds < 2 && (
        <div className="feedback-box feedback-warn" style={{ fontSize: '0.82rem', marginBottom: '0.75rem' }}>
          💡 נסה/י prompt שונה — שנה/י את הסגנון או המקום!
        </div>
      )}

      {builds >= 2 && (
        <div className="feedback-box feedback-success" style={{ fontSize: '0.85rem', marginBottom: '0.75rem' }}>
          ✅ עכשיו אתה/ן יודע/ת: ככל שה-Prompt ספציפי יותר, ה-AI מייצר תמונה טובה יותר!
        </div>
      )}

      <button
        className="btn btn-primary btn-lg"
        onClick={build}
        disabled={Object.keys(selections).length < 2}
        style={{ width: '100%' }}
      >
        {Object.keys(selections).length < 2 ? 'בחר/י לפחות 2 רכיבים' : builds >= 2 ? '✅ הושלם!' : 'צור/י תמונה ←'}
      </button>
    </div>
  )
}
