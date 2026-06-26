import { useState } from 'react'
import { askGemini } from '../../api/gemini.js'

const CHALLENGES = [
  {
    id: 1,
    topic: 'שאלת היסטוריה',
    weak: 'ספר לי על מלחמת העולם',
    weakResponse: 'מלחמת העולם הייתה מלחמה גדולה שהייתה בעולם. הרבה אנשים נפגעו. היא השפיעה על הרבה מדינות.',
    improvers: [
      { id: 'which', label: 'איזו מלחמה?', adds: ' השנייה (1939-1945)', icon: '🔢' },
      { id: 'audience', label: 'לקהל מי?', adds: ', בשביל תלמיד כיתה ז\'', icon: '🎓' },
      { id: 'format', label: 'פורמט?', adds: ', ב-3 נקודות קצרות', icon: '📋' },
      { id: 'focus', label: 'על מה?', adds: ' עם דגש על ישראל ויהודים', icon: '🔍' },
    ],
  },
  {
    id: 2,
    topic: 'בקשת עזרה',
    weak: 'עזור לי עם שיעורים',
    weakResponse: 'אשמח לעזור לך עם שיעורים. מה אתה צריך?',
    improvers: [
      { id: 'subject', label: 'איזה מקצוע?', adds: ' במתמטיקה — שברים', icon: '📐' },
      { id: 'level', label: 'רמה?', adds: ', כיתה ז\'', icon: '🏫' },
      { id: 'style', label: 'סגנון?', adds: ', הסבר עם דוגמה מהחיים', icon: '🌟' },
      { id: 'tone', label: 'טון?', adds: ', בגישה מעודדת ולא מסובכת', icon: '😊' },
    ],
  },
]

export default function PromptArena({ onComplete }) {
  const [cIdx, setCIdx] = useState(0)
  const [applied, setApplied] = useState(new Set())
  const [aiResponse, setAiResponse] = useState(null)
  const [aiLoading, setAiLoading] = useState(false)
  const [compared, setCompared] = useState(0)

  const ch = CHALLENGES[cIdx]
  const isLast = cIdx === CHALLENGES.length - 1
  const strongPrompt = ch.weak + ch.improvers.filter(i => applied.has(i.id)).map(i => i.adds).join('')

  const toggle = (id) => {
    setApplied(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
    setAiResponse(null)
  }

  const generate = async () => {
    if (aiLoading) return
    setAiLoading(true)
    setAiResponse(null)
    try {
      const text = await askGemini(strongPrompt, {
        system: 'ענה בעברית בלבד. ענה על הבקשה בצורה ברורה, שימושית ומפורטת.',
        maxTokens: 200,
        temperature: 0.7,
      })
      setAiResponse(text)
    } catch {
      setAiResponse(null)
    } finally {
      setAiLoading(false)
    }
  }

  const advance = () => {
    const n = compared + 1
    setCompared(n)
    if (n >= 2 && onComplete) onComplete()
    if (!isLast) {
      setCIdx(i => i + 1)
      setApplied(new Set())
      setAiResponse(null)
    }
  }

  const strongDisplayed = aiLoading
    ? '⏳ ה-AI חושב...'
    : (aiResponse || (applied.size === 0 ? 'הוסף/י פרטים לפרומפט כדי לשפר את התשובה...' : `[לחץ/י "קבל תגובה" לתשובה אמיתית מה-AI]`))

  return (
    <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>⚔️</span>
        <h3>Prompt Arena</h3>
        <span className="pill-counter" style={{ marginRight: 'auto' }}>{cIdx + 1}/{CHALLENGES.length}</span>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        שדרג/י את ה-prompt החלש ← קבל/י תגובת AI אמיתית ← ראה/י את ההבדל
      </p>

      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
        📍 {ch.topic}
      </div>

      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.4rem' }}>הוסף/י לפרומפט:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {ch.improvers.map(imp => (
            <button
              key={imp.id}
              onClick={() => toggle(imp.id)}
              style={{
                padding: '0.35rem 0.75rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600,
                border: `2px solid ${applied.has(imp.id) ? '#10b981' : 'var(--c-border)'}`,
                background: applied.has(imp.id) ? 'rgba(16,185,129,0.15)' : 'transparent',
                color: applied.has(imp.id) ? 'var(--c-success)' : 'var(--c-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {imp.icon} {imp.label} {applied.has(imp.id) ? '✓' : '+'}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {/* Weak */}
        <div style={{ background: 'rgba(248,113,113,0.07)', borderRadius: 'var(--radius-s)', padding: '0.75rem', border: '1px solid rgba(248,113,113,0.25)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f87171', marginBottom: '0.4rem' }}>❌ Prompt חלש</div>
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--c-muted)', marginBottom: '0.5rem', wordBreak: 'break-word' }}>{ch.weak}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--c-muted)', lineHeight: 1.6, fontStyle: 'italic', borderTop: '1px solid rgba(248,113,113,0.2)', paddingTop: '0.5rem' }}>
            {ch.weakResponse}
          </div>
        </div>

        {/* Strong */}
        <div style={{ background: 'rgba(16,185,129,0.07)', borderRadius: 'var(--radius-s)', padding: '0.75rem', border: `2px solid ${applied.size > 0 ? 'rgba(16,185,129,0.4)' : 'var(--c-border)'}`, transition: 'border-color 0.3s' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
            <div style={{ fontSize: '0.7rem', fontWeight: 700, color: applied.size > 0 ? 'var(--c-success)' : 'var(--c-muted)' }}>
              {applied.size > 0 ? '✅ Prompt משופר' : '⬜ Prompt משופר'}
            </div>
            {applied.size > 0 && (
              <button
                onClick={generate}
                disabled={aiLoading}
                style={{
                  fontSize: '0.65rem', fontWeight: 700, padding: '0.15rem 0.45rem',
                  borderRadius: 99, border: '1px solid rgba(16,185,129,0.5)',
                  background: aiLoading ? 'transparent' : 'rgba(16,185,129,0.2)',
                  color: 'var(--c-success)', cursor: aiLoading ? 'default' : 'pointer',
                }}
              >
                {aiLoading ? '⏳' : '🤖 קבל תגובה'}
              </button>
            )}
          </div>
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: applied.size > 0 ? 'var(--c-success)' : 'var(--c-muted)', marginBottom: '0.5rem', wordBreak: 'break-word', transition: 'color 0.3s' }}>
            {strongPrompt}
          </div>
          <div style={{
            fontSize: '0.78rem',
            color: aiResponse ? 'var(--c-text)' : 'var(--c-muted)',
            lineHeight: 1.6,
            fontStyle: aiResponse ? 'normal' : 'italic',
            borderTop: `1px solid ${applied.size > 0 ? 'rgba(16,185,129,0.2)' : 'var(--c-border)'}`,
            paddingTop: '0.5rem',
            whiteSpace: 'pre-line',
            transition: 'all 0.4s',
            animation: aiResponse ? 'cardIn 0.4s ease' : 'none',
          }}>
            {strongDisplayed}
          </div>
        </div>
      </div>

      {/* Score */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: '0.3rem' }}>
          <span>כוח ה-Prompt:</span>
          <span style={{ fontWeight: 700, color: applied.size >= 3 ? 'var(--c-success)' : applied.size >= 1 ? '#f59e0b' : 'var(--c-muted)' }}>
            {applied.size === 0 ? 'חלש מאוד' : applied.size === 1 ? 'בינוני' : applied.size === 2 ? 'טוב' : applied.size === 3 ? 'חזק' : 'מושלם! ✨'}
          </span>
        </div>
        <div style={{ height: 8, borderRadius: 99, background: 'var(--c-border)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${applied.size / ch.improvers.length * 100}%`, background: 'var(--grad)', transition: 'width 0.4s cubic-bezier(0.34,1.2,0.64,1)', borderRadius: 99 }} />
        </div>
      </div>

      {applied.size >= 2 && (
        <button className="btn btn-primary btn-lg" onClick={advance} style={{ width: '100%' }}>
          {isLast ? '✅ הבנתי את ההבדל!' : 'אתגר הבא ←'}
        </button>
      )}
    </div>
  )
}
