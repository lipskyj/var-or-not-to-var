import { useState, useEffect } from 'react'

const CATEGORIES = [
  { label: '😊 שמח',    key: 'happy'   },
  { label: '😐 ניטרלי', key: 'neutral' },
  { label: '😮 מופתע',  key: 'surprised' },
]
const MAX_PER = 20

function calcAccuracy(counts) {
  const total = counts.reduce((a, b) => a + b, 0)
  if (total === 0) return 0
  const minC = Math.min(...counts)
  const avg = total / counts.length
  const balance = avg > 0 ? minC / avg : 0
  const raw = Math.min(97, 30 + total * 2.8)
  return Math.round(raw * (0.4 + 0.6 * balance))
}

export default function TrainingSim({ onComplete }) {
  const [counts, setCounts] = useState([0, 0, 0])
  const acc = calcAccuracy(counts)
  const total = counts.reduce((a, b) => a + b, 0)

  useEffect(() => {
    if (acc >= 80 && onComplete) onComplete()
  }, [acc, onComplete])

  const add = (i) => {
    if (counts[i] >= MAX_PER) return
    setCounts(prev => { const n = [...prev]; n[i]++; return n })
  }

  const reset = () => setCounts([0, 0, 0])

  const color = acc >= 80 ? 'var(--c-success)' : acc >= 50 ? 'var(--c-warn)' : 'var(--c-danger)'
  const msg =
    acc >= 80 ? '🎉 מצוין! המודל שלך מאומן היטב!' :
    acc >= 50 ? '🤔 לא רע — הוסף/י עוד דוגמאות לקטגוריות החלשות.' :
               '😅 המודל מתבלבל. הוסף/י יותר דוגמאות לכל קטגוריה.'

  return (
    <div className="card" style={{ maxWidth: 480, margin: '0 auto' }}>
      <h3 style={{ marginBottom: '0.25rem' }}>🧪 כמה דוגמאות הספקת?</h3>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
        לחץ/י "הוסף דוגמה" וראה/י כיצד הדיוק משתנה.
      </p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        {CATEGORIES.map((cat, i) => {
          const full = counts[i] >= MAX_PER
          const barColor = counts[i] >= 15 ? 'var(--c-success)' : counts[i] >= 8 ? 'var(--c-warn)' : 'var(--c-danger)'
          return (
            <div key={cat.key} style={{
              flex: 1, textAlign: 'center',
              border: '1.5px solid var(--c-border)', borderRadius: 'var(--radius-s)',
              padding: '0.75rem 0.5rem', background: 'var(--c-bg)'
            }}>
              <div style={{ fontSize: '1.3rem' }}>{cat.label}</div>
              <div style={{ fontWeight: 800, fontSize: '1.4rem', margin: '0.4rem 0' }}>{counts[i]}</div>
              <div style={{ height: 56, background: 'var(--c-border)', borderRadius: 6, overflow: 'hidden', position: 'relative' }}>
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  background: barColor,
                  height: `${(counts[i] / MAX_PER) * 100}%`,
                  transition: 'height 0.3s ease, background 0.3s ease',
                }} />
              </div>
              <button
                onClick={() => add(i)}
                disabled={full}
                className={`btn btn-sm ${full ? 'btn-outline' : 'btn-primary'}`}
                style={{ marginTop: '0.6rem', width: '100%' }}
              >
                {full ? '✅ מלא' : '+ הוסף'}
              </button>
            </div>
          )
        })}
      </div>

      <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>
        סה"כ: <strong>{total}</strong> דוגמאות
      </div>

      {/* Accuracy bar */}
      <div className="progress-bar-track" style={{ height: 14, marginBottom: '0.5rem' }}>
        <div className="progress-bar-fill" style={{ width: `${acc}%`, background: color, transition: 'width 0.5s ease, background 0.5s ease' }} />
      </div>
      <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '1.5rem', color, marginBottom: '0.25rem' }}>{acc}% דיוק</div>
      <p style={{ textAlign: 'center', fontSize: '0.9rem', color: 'var(--c-muted)', marginBottom: '1rem' }}>{msg}</p>

      <button className="btn btn-outline btn-sm" onClick={reset} style={{ width: '100%' }}>🔄 התחל/י מחדש</button>
    </div>
  )
}
