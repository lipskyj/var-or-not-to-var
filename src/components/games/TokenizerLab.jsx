import { useState } from 'react'

const COLORS = ['#a855f7','#ec4899','#3b82f6','#10b981','#f59e0b','#ef4444','#8b5cf6','#06b6d4','#84cc16','#f97316']

const PRESETS = [
  { label: '🇮🇱 עברית פשוטה', text: 'שלום, מה שלומך היום?' },
  { label: '🤖 מושג AI', text: 'בינה מלאכותית לומדת מנתונים' },
  { label: '🔢 מספרים', text: 'יש לי 3 חתולים ו-12 כלבים' },
  { label: '🌍 אנגלית', text: 'Artificial intelligence is amazing' },
  { label: '😀 אמוג\'י', text: 'אני אוהב 🍕 ו-🎮 מאוד!' },
]

function tokenize(text) {
  if (!text.trim()) return []
  const tokens = []
  // Split on whitespace, punctuation, emoji, and numbers as separators
  const raw = text.split(/(\s+)/).filter(s => s.trim())
  raw.forEach(word => {
    // Split numbers off
    const parts = word.split(/(\d+|[.,!?;:"'()[\]{} -⁯⸀-⹿\\'!"#$%&()*+,\-.\/:;<=>?@[\]^_`{|}~])/g).filter(Boolean)
    // Hebrew prefix splitting: common prefixes ב,כ,ל,מ,ו,ה before 3+ char words
    parts.forEach(p => {
      if (/^[֐-׿]{4,}/.test(p)) {
        const prefix = p[0]
        const rest = p.slice(1)
        if (['ב','כ','ל','מ','ו'].includes(prefix) && rest.length >= 2) {
          tokens.push({ text: prefix, type: 'prefix' })
          tokens.push({ text: rest, type: 'word' })
          return
        }
      }
      tokens.push({ text: p, type: /^\d+$/.test(p) ? 'number' : 'word' })
    })
  })
  return tokens
}

export default function TokenizerLab({ onComplete }) {
  const [text, setText] = useState('')
  const [tokens, setTokens] = useState(null)
  const [analyzed, setAnalyzed] = useState(0)

  const analyze = () => {
    if (!text.trim()) return
    setTokens(tokenize(text))
    const n = analyzed + 1
    setAnalyzed(n)
    if (n >= 2 && onComplete) onComplete()
  }

  const load = (preset) => {
    setText(preset.text)
    setTokens(null)
  }

  const contextWords = tokens ? Math.round(tokens.length * 0.75) : 0

  return (
    <div className="card" style={{ maxWidth: 540, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🔬</span>
        <h3>מעבדת Tokens</h3>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '0.75rem' }}>
        AI לא רואה מילים — הוא רואה <strong>tokens</strong>. כתוב/י משפט וראה/י איך הוא נחתך.
      </p>

      {/* Presets */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.75rem' }}>
        {PRESETS.map(p => (
          <button key={p.label} className="btn btn-outline btn-sm" style={{ fontSize: '0.78rem' }} onClick={() => load(p)}>
            {p.label}
          </button>
        ))}
      </div>

      <textarea
        rows={2}
        value={text}
        onChange={e => { setText(e.target.value); setTokens(null) }}
        placeholder="כתוב/י כל משפט — בעברית, אנגלית, מספרים, אמוג'י..."
        style={{ marginBottom: '0.6rem', fontSize: '1rem' }}
      />

      <button className="btn btn-primary btn-lg" onClick={analyze} disabled={!text.trim()} style={{ width: '100%', marginBottom: '1rem' }}>
        פצל/י ל-Tokens ←
      </button>

      {tokens && (
        <div style={{ animation: 'cardIn 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}>
          {/* Token visualization */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', border: '2px solid var(--c-border)' }}>
            {tokens.map((tok, i) => (
              <span key={i} style={{
                padding: '0.25rem 0.55rem',
                borderRadius: 6,
                fontSize: '0.95rem',
                fontFamily: 'monospace',
                fontWeight: 700,
                background: `${COLORS[i % COLORS.length]}22`,
                border: `2px solid ${COLORS[i % COLORS.length]}66`,
                color: COLORS[i % COLORS.length],
                boxShadow: `0 0 8px ${COLORS[i % COLORS.length]}33`,
              }}>
                {tok.text}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem', marginBottom: '0.75rem' }}>
            {[
              { label: 'Tokens', value: tokens.length, color: '#a855f7' },
              { label: 'תווים', value: text.trim().length, color: '#3b82f6' },
              { label: 'מילים', value: text.trim().split(/\s+/).length, color: '#10b981' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '0.6rem', background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', border: '1px solid var(--c-border)' }}>
                <div style={{ fontSize: '1.6rem', fontWeight: 900, color: s.color }}>{s.value}</div>
                <div style={{ fontSize: '0.72rem', color: 'var(--c-muted)' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Insight */}
          <div className="feedback-box feedback-warn" style={{ fontSize: '0.82rem', marginBottom: '0.5rem' }}>
            💡 GPT-4 יכול לזכור עד <strong>128,000 tokens</strong> בשיחה — זה כ-{Math.round(128000 / tokens.length * text.trim().split(/\s+/).length).toLocaleString()} מילים כמו הטקסט שלך. כשחלון ההקשר מתמלא — AI "שוכח" מה בהתחלה.
          </div>

          {analyzed >= 2 && (
            <div className="feedback-box feedback-success" style={{ fontSize: '0.85rem' }}>
              ✅ שמת/ת לב? מילה אחת יכולה להיות token אחד, שניים, או יותר. AI אף פעם לא "קורא מילים" — הוא מעבד tokens.
            </div>
          )}

          {analyzed < 2 && (
            <button className="btn btn-outline btn-sm" onClick={() => { setText(''); setTokens(null) }} style={{ marginTop: '0.25rem' }}>
              נסה/י טקסט אחר ←
            </button>
          )}
        </div>
      )}
    </div>
  )
}
