import { useState } from 'react'

// Left-to-right, top-to-bottom — matching the viral image layout:
// Row 1: muffin | dog    | muffin | dog
// Row 2: dog    | muffin | dog    | muffin
// Row 3: muffin | dog    | muffin | dog
// Row 4: dog    | muffin | dog    | muffin
const GRID_TYPES = [
  'muffin', 'dog',    'muffin', 'dog',
  'dog',    'muffin', 'dog',    'muffin',
  'muffin', 'dog',    'muffin', 'dog',
  'dog',    'muffin', 'dog',    'muffin',
]

const EMOJI = { dog: '🐶', muffin: '🧁' }

const BG = {
  correct: 'rgba(16,185,129,0.82)',
  wrong:   'rgba(239,68,68,0.82)',
  reveal:  'rgba(0,0,0,0.68)',
}

export default function MuffinGridScreen({ onBack }) {
  const [picks, setPicks]         = useState({})
  const [revealAll, setRevealAll] = useState(false)
  const [hovering, setHovering]   = useState(null)

  const totalAnswered = Object.keys(picks).length
  const totalCorrect  = Object.entries(picks).filter(([i, v]) => v === GRID_TYPES[+i]).length
  const allAnswered   = totalAnswered === GRID_TYPES.length

  const pick = (i, val, e) => {
    e.stopPropagation()
    if (picks[i] !== undefined || revealAll) return
    setPicks(p => ({ ...p, [i]: val }))
  }

  const reset = () => { setPicks({}); setRevealAll(false); setHovering(null) }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-surface)', paddingBottom: '3rem' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(168,85,247,0.15),rgba(236,72,153,0.1))',
        borderBottom: '1px solid var(--c-border)',
        padding: '0.85rem 1.25rem',
        display: 'flex', alignItems: 'center', gap: '0.85rem',
      }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: 'var(--c-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: '0.25rem' }}
          >←</button>
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 900 }}>🧁🐶 מאפה או כלבלב?</h1>
          <p style={{ margin: 0, color: 'var(--c-muted)', fontSize: '0.78rem' }}>
            מרחפ/י על כל תמונה ← בחר/י 🐶 או 🧁 ← ראה/י אם צדקת
          </p>
        </div>
        {totalAnswered > 0 && (
          <div style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--c-success)' }}>
            ✅ {totalCorrect}/{totalAnswered}
          </div>
        )}
      </div>

      {/* Grid */}
      <div style={{ maxWidth: 520, margin: '1rem auto', padding: '0 0.75rem' }}>

        <div style={{
          position: 'relative',
          width: '100%',
          borderRadius: 'var(--radius)',
          overflow: 'hidden',
          border: '2px solid var(--c-border)',
          boxShadow: '0 4px 24px rgba(0,0,0,0.3)',
        }}>
          {/* ── The actual viral muffin/chihuahua image ── */}
          <img
            src="/muffin-chihuahua.jpg"
            alt="מאפה או כלבלב — תמונה וויראלית"
            style={{ width: '100%', display: 'block' }}
            draggable={false}
          />

          {/* ── 4×4 transparent interactive overlay ── */}
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gridTemplateRows: 'repeat(4, 1fr)',
          }}>
            {GRID_TYPES.map((type, i) => {
              const picked    = picks[i]
              const isCorrect = picked === type
              const shown     = revealAll || picked !== undefined
              const isHovered = hovering === i && picked === undefined && !revealAll

              return (
                <div
                  key={i}
                  onMouseEnter={() => setHovering(i)}
                  onMouseLeave={() => setHovering(null)}
                  style={{ position: 'relative', cursor: picked || revealAll ? 'default' : 'pointer' }}
                >
                  {/* Hover: show pick buttons */}
                  {isHovered && (
                    <div style={{
                      position: 'absolute', inset: 0,
                      background: 'rgba(0,0,0,0.62)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      gap: '0.3rem',
                      animation: 'cardIn 0.12s ease',
                      zIndex: 2,
                    }}>
                      <button
                        onClick={e => pick(i, 'dog', e)}
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          border: '1.5px solid rgba(255,255,255,0.55)',
                          borderRadius: 8,
                          padding: '0.3rem 0.45rem',
                          fontSize: '1.05rem',
                          cursor: 'pointer',
                        }}
                      >🐶</button>
                      <button
                        onClick={e => pick(i, 'muffin', e)}
                        style={{
                          background: 'rgba(255,255,255,0.15)',
                          border: '1.5px solid rgba(255,255,255,0.55)',
                          borderRadius: 8,
                          padding: '0.3rem 0.45rem',
                          fontSize: '1.05rem',
                          cursor: 'pointer',
                        }}
                      >🧁</button>
                    </div>
                  )}

                  {/* Result badge at bottom of cell */}
                  {shown && (
                    <div style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0,
                      background: picked !== undefined
                        ? (isCorrect ? BG.correct : BG.wrong)
                        : BG.reveal,
                      color: '#fff',
                      fontSize: '0.65rem',
                      fontWeight: 900,
                      textAlign: 'center',
                      padding: '0.2rem',
                      animation: 'cardIn 0.2s ease',
                      zIndex: 2,
                      userSelect: 'none',
                    }}>
                      {picked !== undefined
                        ? (isCorrect ? `✅ ${EMOJI[type]}` : `❌ ${EMOJI[type]}`)
                        : EMOJI[type]
                      }
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        {/* Score */}
        {allAnswered && !revealAll && (
          <div
            className="feedback-box feedback-success"
            style={{ marginTop: '0.75rem', textAlign: 'center', fontWeight: 800, fontSize: '1rem', animation: 'cardIn 0.3s ease' }}
          >
            🎯 {totalCorrect}/{GRID_TYPES.length} נכונות!
            {totalCorrect === GRID_TYPES.length && ' מושלם! 🏆'}
          </div>
        )}

        {/* Action buttons */}
        <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
          {!revealAll && (
            <button className="btn btn-outline" style={{ flex: 1 }} onClick={() => setRevealAll(true)}>
              👁 גלה/י הכל
            </button>
          )}
          <button className="btn btn-primary" style={{ flex: 1 }} onClick={reset}>
            🔄 נסה/י שוב
          </button>
        </div>

        {/* Explainer */}
        <div style={{
          marginTop: '1.25rem',
          padding: '0.9rem 1.1rem',
          background: 'rgba(168,85,247,0.07)',
          border: '1px solid rgba(168,85,247,0.2)',
          borderRadius: 'var(--radius)',
          fontSize: '0.85rem', lineHeight: 1.75, textAlign: 'right',
        }}>
          <strong style={{ color: 'var(--c-primary)' }}>למה AI מתבלבל?</strong>
          <br />
          הוא לא "רואה" כלבלב — הוא מזהה: <strong>חום + עגול + כתמים כהות</strong>.
          מאפה עם אוכמניות = בדיוק אותם פיקסלים.
          <br /><br />
          ✅ הפתרון: נתוני אימון מגוונים יותר.{' '}
          <strong>Garbage in → Garbage out.</strong>
        </div>
      </div>
    </div>
  )
}
