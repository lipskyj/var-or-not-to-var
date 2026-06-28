import { useState } from 'react'

// 4×4 grid matching the viral muffin/chihuahua meme layout
// type: 'dog' | 'muffin'  — revealed only after guess or "show all"
const GRID = [
  { type: 'muffin', prompt: 'single blueberry muffin close-up macro photo, golden brown textured top, three dark blueberries like eyes and nose, white background, food photography', seed: 1001 },
  { type: 'dog',    prompt: 'chihuahua puppy face extreme close-up, short tan brown fur, large round dark eyes, tiny black nose, white studio background', seed: 2001 },
  { type: 'muffin', prompt: 'large blueberry muffin close-up, domed golden brown top, blueberries embedded in surface, soft studio lighting, white background', seed: 1002 },
  { type: 'dog',    prompt: 'chihuahua face portrait close-up, warm beige fur, big shiny dark eyes looking forward, minimal background', seed: 2002 },

  { type: 'dog',    prompt: 'chihuahua dog face close-up, caramel tan fur, round dark eyes, small muzzle, white background, studio photo', seed: 2003 },
  { type: 'muffin', prompt: 'blueberry muffin top-down view, textured golden-brown crust, two dark blueberry spots like eyes, macro photography', seed: 1003 },
  { type: 'dog',    prompt: 'chihuahua puppy portrait, warm golden brown fur, large round eyes, tiny nose, close up face photo', seed: 2004 },
  { type: 'muffin', prompt: 'blueberry muffin side angle close-up, domed top, blueberries on surface, food photography, soft light', seed: 1004 },

  { type: 'muffin', prompt: 'blueberry muffin face-on close-up, brown muffin top, two blueberries like eyes, food macro photo, white background', seed: 1005 },
  { type: 'dog',    prompt: 'chihuahua face macro photo, golden tan fur, large dark round eyes, very close up portrait, white background', seed: 2005 },
  { type: 'muffin', prompt: 'blueberry muffin from above, golden brown surface texture like fur, three dark blueberry spots, macro food photo', seed: 1006 },
  { type: 'dog',    prompt: 'chihuahua dog face, beige brown fur, big dark eyes staring at camera, small ears, close-up portrait', seed: 2006 },

  { type: 'dog',    prompt: 'chihuahua puppy very close face macro, warm tan fur, round dark eyes, small nose, adorable expression', seed: 2007 },
  { type: 'muffin', prompt: 'pile of mini blueberry muffins, golden brown tops, dark blueberry dots, overhead view, food photography', seed: 1007 },
  { type: 'dog',    prompt: 'chihuahua face close-up, caramel brown fur texture, large shiny dark eyes, tiny features, studio white background', seed: 2008 },
  { type: 'muffin', prompt: 'blueberry muffin extreme close-up, golden brown bumpy top, blueberries sitting in crevices, macro photo', seed: 1008 },
]

const EMOJI = { dog: '🐶', muffin: '🧁' }
const LABEL = { dog: 'כלבלב', muffin: 'מאפה' }

function GridCell({ item, revealAll }) {
  const [loaded, setLoaded] = useState(false)
  const [guess, setGuess] = useState(null) // null | 'dog' | 'muffin'
  const [showHint, setShowHint] = useState(false)

  const revealed = revealAll || guess !== null
  const isCorrect = guess === item.type
  const src = `https://image.pollinations.ai/prompt/${encodeURIComponent(item.prompt)}?width=320&height=320&nologo=true&seed=${item.seed}`

  const pick = (val) => {
    if (guess !== null || revealAll) return
    setGuess(val)
  }

  return (
    <div
      style={{ position: 'relative', aspectRatio: '1', cursor: guess === null && !revealAll ? 'pointer' : 'default' }}
      onMouseEnter={() => setShowHint(true)}
      onMouseLeave={() => setShowHint(false)}
    >
      {/* image */}
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0,
          animation: 'shimmer 1.8s infinite',
          backgroundImage: 'linear-gradient(90deg,rgba(168,85,247,.06) 25%,rgba(168,85,247,.14) 50%,rgba(168,85,247,.06) 75%)',
          backgroundSize: '200% 100%',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '1.5rem',
        }}>🔄</div>
      )}
      <img
        src={src}
        alt={item.type}
        onLoad={() => setLoaded(true)}
        style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded ? 'block' : 'none' }}
      />

      {/* overlay: hover prompt to guess (before guessing) */}
      {!revealed && showHint && (
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(0,0,0,0.72)',
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          gap: '0.5rem', padding: '0.5rem',
          animation: 'cardIn 0.15s ease',
        }}>
          <p style={{ color: '#fff', fontSize: '0.75rem', fontWeight: 700, margin: 0 }}>מה זה?</p>
          <div style={{ display: 'flex', gap: '0.4rem' }}>
            <button
              onClick={() => pick('dog')}
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '0.35rem 0.6rem', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}
            >🐶</button>
            <button
              onClick={() => pick('muffin')}
              style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.4)', borderRadius: 8, padding: '0.35rem 0.6rem', color: '#fff', cursor: 'pointer', fontSize: '1.1rem' }}
            >🧁</button>
          </div>
        </div>
      )}

      {/* reveal badge */}
      {revealed && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: guess !== null
            ? (isCorrect ? 'rgba(16,185,129,0.88)' : 'rgba(239,68,68,0.88)')
            : 'rgba(0,0,0,0.72)',
          color: '#fff',
          padding: '0.3rem 0.4rem',
          fontSize: '0.75rem',
          fontWeight: 800,
          textAlign: 'center',
          animation: 'cardIn 0.25s ease',
        }}>
          {guess !== null
            ? (isCorrect ? `✅ נכון! ${EMOJI[item.type]} ${LABEL[item.type]}` : `❌ ${EMOJI[item.type]} ${LABEL[item.type]}`)
            : `${EMOJI[item.type]} ${LABEL[item.type]}`
          }
        </div>
      )}
    </div>
  )
}

export default function MuffinGridScreen({ onBack }) {
  const [revealAll, setRevealAll] = useState(false)
  const [scored, setScored] = useState(false)

  const dogs   = GRID.filter(g => g.type === 'dog').length
  const muffins = GRID.filter(g => g.type === 'muffin').length

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-surface)', paddingBottom: '3rem' }}>

      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg,rgba(168,85,247,0.18),rgba(236,72,153,0.12))',
        borderBottom: '1px solid var(--c-border)',
        padding: '1rem 1.5rem',
        display: 'flex', alignItems: 'center', gap: '1rem',
      }}>
        {onBack && (
          <button
            onClick={onBack}
            style={{ background: 'none', border: 'none', color: 'var(--c-muted)', fontSize: '1.2rem', cursor: 'pointer', padding: '0.25rem' }}
          >←</button>
        )}
        <div>
          <h1 style={{ margin: 0, fontSize: '1.3rem', fontWeight: 900 }}>🧁🐶 מאפה או כלבלב?</h1>
          <p style={{ margin: 0, color: 'var(--c-muted)', fontSize: '0.8rem' }}>
            הגרסה הוויראלית — מרחפ/י מעל כל תמונה ונחש/י
          </p>
        </div>
        <div style={{ marginRight: 'auto', display: 'flex', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--c-muted)' }}>🐶 {dogs}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--c-muted)' }}>🧁 {muffins}</span>
        </div>
      </div>

      {/* Instructions */}
      {!revealAll && (
        <div style={{ textAlign: 'center', padding: '0.75rem 1rem 0', color: 'var(--c-muted)', fontSize: '0.85rem' }}>
          מרחפ/י מעל תמונה ← לחץ/י 🐶 או 🧁 ← ראה/י אם צדקת
        </div>
      )}

      {/* Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 3,
        maxWidth: 600,
        margin: '0.75rem auto',
        padding: '0 0.5rem',
      }}>
        {GRID.map((item, i) => (
          <GridCell key={i} item={item} revealAll={revealAll} />
        ))}
      </div>

      {/* CTA */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.75rem', padding: '0 1rem', flexWrap: 'wrap' }}>
        {!revealAll && (
          <button
            className="btn btn-outline"
            onClick={() => setRevealAll(true)}
          >
            👁 גלה/י הכל
          </button>
        )}
        <button
          className="btn btn-primary"
          onClick={() => { setRevealAll(false); window.location.reload() }}
        >
          🔄 מחדש
        </button>
      </div>

      {/* Explainer footer */}
      <div style={{
        maxWidth: 560,
        margin: '1.5rem auto 0',
        padding: '1rem 1.5rem',
        background: 'rgba(168,85,247,0.08)',
        border: '1px solid rgba(168,85,247,0.2)',
        borderRadius: 'var(--radius)',
        fontSize: '0.85rem',
        lineHeight: 1.7,
        textAlign: 'right',
        color: 'var(--c-text)',
      }}>
        <strong style={{ color: 'var(--c-primary)' }}>למה AI מתבלבל?</strong>
        <br />
        AI לא "רואה" כלבלב — הוא מזהה: <strong>חום + עגול + כתמים כהות</strong>.
        מאפין ועם אוכמניות חולקים בדיוק את אותם פיקסלים.
        <br /><br />
        ✅ פתרון: נתוני אימון מגוונים יותר + תמונות בזוויות שונות = מודל חכם יותר.
        <br />
        <strong>Garbage in → Garbage out.</strong>
      </div>
    </div>
  )
}
