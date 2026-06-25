import { useState } from 'react'

const PRESETS = [
  { label: '😄 חיובי', text: 'הכלב שלי מדהים ואני אוהב אותו מאוד!' },
  { label: '😢 שלילי', text: 'השיעור היום היה גרוע ומשעמם לגמרי' },
  { label: '😐 מעורב', text: 'הסרט היה יפה אבל ארוך מדי ומתיש' },
  { label: '😡 כועס', text: 'זה נורא ואיום, אני שונא את זה לגמרי' },
]

const POSITIVE = { אוהב:0.8,מאהב:0.85,אהוב:0.75,מדהים:0.92,מצוין:0.9,נהדר:0.85,יפה:0.7,כיף:0.75,שמח:0.8,מעולה:0.9,טוב:0.6,מושלם:0.95,נפלא:0.88,נחמד:0.65,אהבה:0.82,חבר:0.55,מעניין:0.5,מוצלח:0.7,ממליץ:0.6,מרגש:0.75 }
const NEGATIVE = { שונא:-0.8,גרוע:-0.85,נורא:-0.9,עצוב:-0.7,קשה:-0.5,מאוס:-0.75,רע:-0.65,מכוער:-0.6,כואב:-0.7,איום:-0.88,משעמם:-0.72,מתיש:-0.6,מרגיז:-0.7,מתסכל:-0.65,שטויות:-0.6,כועס:-0.75,ממאיס:-0.8,נמאס:-0.65 }

function analyze(text) {
  const words = text.replace(/[,.!?]/g, '').split(/\s+/)
  const hits = []
  let sum = 0
  words.forEach(w => {
    const clean = w.replace(/['"]/g, '')
    if (POSITIVE[clean] !== undefined) { hits.push({ word: clean, score: POSITIVE[clean] }); sum += POSITIVE[clean] }
    if (NEGATIVE[clean] !== undefined) { hits.push({ word: clean, score: NEGATIVE[clean] }); sum += NEGATIVE[clean] }
  })
  const score = hits.length ? Math.max(-1, Math.min(1, sum / Math.max(hits.length, 1))) : 0
  return { score: Math.round(score * 100) / 100, hits }
}

function emoji(score) {
  if (score > 0.6) return '😄'
  if (score > 0.2) return '🙂'
  if (score > -0.2) return '😐'
  if (score > -0.6) return '😟'
  return '😢'
}

function label(score) {
  if (score > 0.6)  return { text: 'חיובי מאוד',  color: '#10b981' }
  if (score > 0.2)  return { text: 'חיובי',        color: '#34d399' }
  if (score > -0.2) return { text: 'ניטרלי',       color: '#94a3b8' }
  if (score > -0.6) return { text: 'שלילי',        color: '#f59e0b' }
  return              { text: 'שלילי מאוד',  color: '#f87171' }
}

export default function SentimentMeter({ onComplete }) {
  const [showIntro, setShowIntro] = useState(true)
  const [text, setText]   = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [tries, setTries]   = useState(0)

  const run = () => {
    if (!text.trim()) return
    setLoading(true)
    setResult(null)
    setTimeout(() => {
      setResult(analyze(text))
      setLoading(false)
      const n = tries + 1
      setTries(n)
      if (n >= 2 && onComplete) onComplete()
    }, 900)
  }

  if (showIntro) {
    return (
      <div className="card" style={{ maxWidth: 520, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎭</div>
        <h3 style={{ marginBottom: '0.5rem' }}>מד הרגשות של ה-AI</h3>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>
          AI יכול לנתח <strong>טון רגשי</strong> של טקסט — חיובי, שלילי, ניטרלי.
          זה נקרא <strong>Sentiment Analysis</strong> ומשמש לניטור רשתות חברתיות, ביקורות מוצרים ועוד.
        </p>
        <button className="btn btn-primary btn-lg" onClick={() => setShowIntro(false)}>
          נסה/י בעצמך ←
        </button>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.5rem' }}>🎭</span>
        <h3>מד הרגשות</h3>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        כתוב/י משפט בעברית ← ראה/י איך ה-AI מנתח את הטון הרגשי
      </p>

      {/* Preset examples */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem' }}>
        {PRESETS.map(p => (
          <button
            key={p.label}
            className="btn btn-outline btn-sm"
            onClick={() => { setText(p.text); setResult(null) }}
            style={{ fontSize: '0.8rem' }}
          >
            {p.label}
          </button>
        ))}
      </div>

      <textarea
        rows={3}
        value={text}
        onChange={e => { setText(e.target.value); setResult(null) }}
        placeholder="הקלד/י כל משפט בעברית..."
        style={{ marginBottom: '0.75rem' }}
      />

      <button className="btn btn-primary btn-lg" onClick={run} disabled={!text.trim() || loading}>
        {loading ? '⏳ מנתח/ת רגשות...' : 'נתח/י ←'}
      </button>

      {loading && (
        <div style={{ textAlign: 'center', marginTop: '1rem', color: 'var(--c-muted)', fontSize: '0.85rem', animation: 'fadeIn 0.3s' }}>
          🤖 ה-AI סורק מילים ומחשב הסתברויות...
        </div>
      )}

      {result && (
        <div style={{ marginTop: '1.25rem', animation: 'cardIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {/* Score header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
            <div style={{ fontSize: '2.5rem' }}>{emoji(result.score)}</div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: label(result.score).color }}>
                {result.score > 0 ? '+' : ''}{result.score}
              </div>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: label(result.score).color }}>
                {label(result.score).text}
              </div>
            </div>
            <div style={{ fontSize: '0.72rem', color: 'var(--c-muted)', textAlign: 'left' }}>
              טווח:<br />-1 עד +1
            </div>
          </div>

          {/* Animated bar */}
          <div style={{ position: 'relative', height: 16, borderRadius: 99, overflow: 'hidden', background: 'linear-gradient(90deg, #f87171, #fbbf24 50%, #10b981)', marginBottom: '0.5rem' }}>
            {/* Needle */}
            <div style={{
              position: 'absolute', top: 0, bottom: 0, width: 4,
              background: '#fff',
              boxShadow: '0 0 6px rgba(0,0,0,0.4)',
              borderRadius: 99,
              left: `calc(${(result.score + 1) / 2 * 100}% - 2px)`,
              transition: 'left 0.8s cubic-bezier(0.34,1.2,0.64,1)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--c-muted)', marginBottom: '1rem' }}>
            <span>😢 שלילי מאוד (-1)</span>
            <span>😐 ניטרלי (0)</span>
            <span>(+1) חיובי מאוד 😄</span>
          </div>

          {/* Word hits */}
          {result.hits.length > 0 ? (
            <div>
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.4rem' }}>
                מילים שהשפיעו על הציון:
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {result.hits.map((h, i) => (
                  <span key={i} style={{
                    padding: '0.2rem 0.55rem', borderRadius: 99,
                    fontSize: '0.8rem', fontWeight: 700,
                    background: h.score > 0 ? 'rgba(16,185,129,0.15)' : 'rgba(248,113,113,0.15)',
                    color: h.score > 0 ? 'var(--c-success)' : 'var(--c-danger)',
                    border: `1px solid ${h.score > 0 ? 'rgba(16,185,129,0.3)' : 'rgba(248,113,113,0.3)'}`,
                  }}>
                    {h.word} {h.score > 0 ? '↑' : '↓'}
                  </span>
                ))}
              </div>
            </div>
          ) : (
            <div className="feedback-box feedback-warn" style={{ fontSize: '0.85rem' }}>
              💡 לא זיהיתי מילות מפתח רגשיות — נסה/י משפט עם מילים כמו "אוהב", "שונא", "מדהים", "גרוע"
            </div>
          )}

          {tries >= 2 && (
            <div className="feedback-box feedback-success" style={{ marginTop: '1rem', fontSize: '0.88rem' }}>
              ✅ ראית/ת איך AI "קורא" רגשות? זו אותה טכניקה שפייסבוק משתמשת בה לניטור תגובות.
            </div>
          )}
        </div>
      )}
    </div>
  )
}
