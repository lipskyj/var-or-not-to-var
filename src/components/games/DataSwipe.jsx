import { useState, useRef } from 'react'

const CARDS = [
  { id: 1, text: '🎉 YOU WON 1,000,000$!! CLICK HERE NOW!!!', isSpam: true, hint: 'סימני קריאה, כסף, לחץ — מאפיינים קלאסיים של ספאם.' },
  { id: 2, text: 'היי, האם תוכל/י לשלוח לי את סיכום הפגישה?', isSpam: false, hint: 'בקשה עניינית וישירה — בוודאי לא ספאם.' },
  { id: 3, text: 'CONGRATULATIONS! You have been SELECTED as our WINNER! Claim NOW', isSpam: true, hint: 'פרס מוגזם ודחיפות מלאכותית = ספאם.' },
  { id: 4, text: 'תזכורת: שיעורי בית למחר — פרקים 4-5 במתמטיקה', isSpam: false, hint: 'תוכן לגיטימי ורלוונטי, ללא דחיפות מוגזמת.' },
  { id: 5, text: 'URGENT: Your bank account is suspended. Verify NOW or lose everything.', isSpam: true, hint: 'דחיפות מוגזמת + איום = ספאם קלאסי / פישינג.' },
  { id: 6, text: 'האם אפשר לקבוע פגישה להורים ביום ד\' בשעה 16:00?', isSpam: false, hint: 'הודעה ספציפית עם זמן ומטרה ברורה — לא ספאם.' },
  { id: 7, text: '💊 Buy cheap pills online! 99% discount! No prescription needed!', isSpam: true, hint: 'הצעה לא חוקית + הנחה מוגזמת = ספאם.' },
  { id: 8, text: 'הדוח המצורף מוכן, אשמח לשמוע את דעתך עליו.', isSpam: false, hint: 'שיח עסקי רגיל עם קובץ מצורף — לא ספאם.' },
]

export default function DataSwipe({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [answers, setAnswers] = useState([])
  const [dragX, setDragX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [exiting, setExiting] = useState(null)
  const [lastResult, setLastResult] = useState(null)
  const [done, setDone] = useState(false)
  const startXRef = useRef(0)
  const cardRef = useRef(null)

  const card = CARDS[idx]
  const swipeThreshold = 90
  const dir = dragX > 30 ? 'right' : dragX < -30 ? 'left' : null

  const commit = (isSpam) => {
    const correct = isSpam === card.isSpam
    setLastResult({ correct, hint: card.hint, label: isSpam ? 'ספאם' : 'לא ספאם' })
    setExiting(isSpam ? 'left' : 'right')

    setTimeout(() => {
      const next = [...answers, { correct }]
      setAnswers(next)
      setExiting(null)
      setDragX(0)
      setLastResult(null)

      if (idx + 1 >= CARDS.length) {
        setDone(true)
        if (onComplete) onComplete()
      } else {
        setIdx(i => i + 1)
      }
    }, 500)
  }

  const onPointerDown = (e) => {
    if (exiting) return
    setIsDragging(true)
    startXRef.current = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    cardRef.current?.setPointerCapture?.(e.pointerId)
  }

  const onPointerMove = (e) => {
    if (!isDragging) return
    const x = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    setDragX(x - startXRef.current)
  }

  const onPointerUp = () => {
    if (!isDragging) return
    setIsDragging(false)
    if (Math.abs(dragX) > swipeThreshold) {
      commit(dragX < 0)
    } else {
      setDragX(0)
    }
  }

  if (done) {
    const correct = answers.filter(a => a.correct).length
    const pct = Math.round(correct / CARDS.length * 100)
    return (
      <div className="card" style={{ maxWidth: 480, margin: '0 auto', textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>{pct >= 80 ? '🏆' : '🤖'}</div>
        <h3>המודל אומן!</h3>
        <div style={{ fontSize: '2.5rem', fontWeight: 900, background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', margin: '0.5rem 0' }}>
          {correct}/{CARDS.length}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.88rem', lineHeight: 1.7 }}>
          {pct >= 80
            ? `ייאמ! המודל שאימנת/ת יזהה ספאם בדיוק ${pct}%. כך בדיוק עובדת Gmail.`
            : `${CARDS.length - correct} טעויות הכניסו רעש לנתונים. בעולם האמיתי, כל טעות מאמן/ת ה-AI לכיוון הלא נכון.`}
        </p>
        <div className="feedback-box feedback-warn" style={{ marginTop: '1rem', fontSize: '0.82rem', textAlign: 'right' }}>
          💡 Gmail מאמן מודל ספאם על <strong>מיליארדי</strong> אימיילים מסומנים על-ידי משתמשים. כל "סמן כספאם" שלחצת/ת בחייך — הכניס דוגמה לאימון.
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>📬</span>
        <h3>אמן/י את מסנן הספאם</h3>
        <span className="pill-counter" style={{ marginRight: 'auto' }}>{idx + 1}/{CARDS.length}</span>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
        <strong>גרור/י</strong> ← ספאם &nbsp;|&nbsp; לא ספאם → &nbsp; (או לחץ/י על הכפתורים)
      </p>

      {/* Swipe indicators */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', padding: '0 0.5rem' }}>
        <div style={{
          fontSize: '0.82rem', fontWeight: 700, color: '#f87171',
          opacity: dir === 'left' ? 1 : 0.25, transition: 'opacity 0.1s',
          transform: `scale(${dir === 'left' ? 1.2 : 1})`,
        }}>
          ← 🗑️ ספאם
        </div>
        <div style={{
          fontSize: '0.82rem', fontWeight: 700, color: '#10b981',
          opacity: dir === 'right' ? 1 : 0.25, transition: 'opacity 0.1s',
          transform: `scale(${dir === 'right' ? 1.2 : 1})`,
        }}>
          ✉️ לא ספאם →
        </div>
      </div>

      {/* Card stack */}
      <div style={{ position: 'relative', height: 180, marginBottom: '0.75rem' }}>
        {/* Ghost cards behind */}
        {[2, 1].map(offset => (
          <div key={offset} style={{
            position: 'absolute', inset: 0,
            background: 'var(--c-surface)',
            border: '2px solid var(--c-border)',
            borderRadius: 'var(--radius)',
            transform: `scale(${1 - offset * 0.04}) translateY(${offset * 6}px)`,
            zIndex: 3 - offset,
          }} />
        ))}

        {/* Active card */}
        <div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerUp}
          style={{
            position: 'absolute', inset: 0, zIndex: 10,
            background: dir === 'left'
              ? 'rgba(248,113,113,0.15)'
              : dir === 'right'
              ? 'rgba(16,185,129,0.15)'
              : 'var(--c-surface)',
            border: `2px solid ${dir === 'left' ? 'rgba(248,113,113,0.5)' : dir === 'right' ? 'rgba(16,185,129,0.5)' : 'var(--c-border)'}`,
            borderRadius: 'var(--radius)',
            padding: '1.25rem',
            cursor: isDragging ? 'grabbing' : 'grab',
            userSelect: 'none', touchAction: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            textAlign: 'center',
            transform: exiting
              ? `translateX(${exiting === 'left' ? -400 : 400}px) rotate(${exiting === 'left' ? -15 : 15}deg)`
              : `translateX(${dragX}px) rotate(${dragX * 0.04}deg)`,
            transition: isDragging ? 'background 0.15s, border-color 0.15s' : exiting ? 'transform 0.4s ease' : 'transform 0.3s cubic-bezier(0.34,1.56,0.64,1)',
          }}
        >
          <p style={{ fontSize: '0.95rem', fontWeight: 600, lineHeight: 1.6 }}>{card?.text}</p>
        </div>
      </div>

      {/* Result flash */}
      {lastResult && (
        <div className={`feedback-box ${lastResult.correct ? 'feedback-success' : 'feedback-error'}`} style={{ fontSize: '0.82rem', marginBottom: '0.5rem', animation: 'cardIn 0.2s ease' }}>
          {lastResult.correct ? '✅' : '❌'} {lastResult.hint}
        </div>
      )}

      {/* Button fallback */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
        <button
          className="btn btn-lg"
          onClick={() => !exiting && commit(true)}
          style={{ background: 'rgba(248,113,113,0.15)', border: '2px solid rgba(248,113,113,0.4)', color: '#f87171', fontWeight: 700 }}
        >
          🗑️ ספאם
        </button>
        <button
          className="btn btn-lg"
          onClick={() => !exiting && commit(false)}
          style={{ background: 'rgba(16,185,129,0.15)', border: '2px solid rgba(16,185,129,0.4)', color: '#10b981', fontWeight: 700 }}
        >
          ✉️ לא ספאם
        </button>
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: '0.35rem', justifyContent: 'center', marginTop: '0.75rem' }}>
        {CARDS.map((_, i) => (
          <div key={i} style={{
            width: i < idx ? 18 : 8, height: 8, borderRadius: 99,
            background: i < idx ? (answers[i]?.correct ? 'var(--c-success)' : 'var(--c-danger)') : i === idx ? '#a855f7' : 'var(--c-border)',
            transition: 'all 0.3s',
          }} />
        ))}
      </div>
    </div>
  )
}
