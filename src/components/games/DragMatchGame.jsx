import { useState, useMemo } from 'react'

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export default function DragMatchGame({ pairs, onComplete }) {
  const terms = useMemo(() => shuffle(pairs), [])
  const slots = useMemo(() => shuffle(pairs), [])

  // matches: { slotId: termId }
  const [matches, setMatches] = useState({})
  const [selected, setSelected] = useState(null) // termId being "held"
  const [checked, setChecked] = useState(false)
  const [score, setScore] = useState(0)

  // Which termIds are currently placed somewhere
  const placedTermIds = new Set(Object.values(matches))

  const clickTerm = (termId) => {
    if (checked) return
    if (selected === termId) { setSelected(null); return }
    // Un-place if already somewhere, re-select
    setMatches(prev => Object.fromEntries(Object.entries(prev).filter(([, v]) => v !== termId)))
    setSelected(termId)
  }

  const clickSlot = (slotId) => {
    if (checked || !selected) return
    // If slot already had something, free that term
    setMatches(prev => {
      const next = Object.fromEntries(Object.entries(prev).filter(([k]) => k !== slotId))
      next[slotId] = selected
      return next
    })
    setSelected(null)
  }

  const allPlaced = Object.keys(matches).length === pairs.length

  const check = () => {
    const s = pairs.filter(p => matches[p.id] === p.id).length
    setScore(s)
    setChecked(true)
    if (onComplete) onComplete()
  }

  const reset = () => {
    setMatches({})
    setSelected(null)
    setChecked(false)
    setScore(0)
  }

  return (
    <div className="card" style={{ maxWidth: 560, margin: '0 auto' }}>
      <h3 style={{ marginBottom: '0.25rem' }}>🔗 חבר/י כל מושג לפירושו</h3>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
        לחץ/י על מושג → לחץ/י על ההגדרה המתאימה לו
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', alignItems: 'start' }}>
        {/* Terms */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            מושגים
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {terms.map(p => {
              const isPlaced = placedTermIds.has(p.id)
              const isSelected = selected === p.id
              let cls = 'drag-term'
              if (isSelected) cls += ' selected'
              else if (isPlaced) cls += ' placed'
              return (
                <div key={p.id} className={cls} onClick={() => clickTerm(p.id)}
                  style={{ fontSize: '0.88rem', lineHeight: 1.35 }}>
                  {isPlaced && !isSelected && <span style={{ opacity: 0.4, fontSize: '0.7rem' }}>✓ </span>}
                  {p.term}
                </div>
              )
            })}
          </div>
        </div>

        {/* Slots / Definitions */}
        <div>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
            הגדרות
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {slots.map(p => {
              const matchedTermId = matches[p.id]
              const matchedTerm = matchedTermId ? pairs.find(x => x.id === matchedTermId) : null
              const isCorrect = checked && matchedTermId === p.id
              const isWrong   = checked && matchedTermId && matchedTermId !== p.id
              let cls = 'drag-slot'
              if (!checked && selected) cls += ' droppable'
              if (isCorrect) cls += ' correct'
              if (isWrong)   cls += ' wrong'
              return (
                <div key={p.id} className={cls} onClick={() => clickSlot(p.id)}>
                  {matchedTerm && (
                    <div style={{
                      fontWeight: 700, fontSize: '0.78rem', marginBottom: '0.2rem',
                      color: isCorrect ? 'var(--c-success)' : isWrong ? 'var(--c-danger)' : 'var(--c-primary)',
                      display: 'flex', alignItems: 'center', gap: '0.25rem',
                    }}>
                      {checked ? (isCorrect ? '✅' : '❌') : '📌'} {matchedTerm.term}
                    </div>
                  )}
                  <div style={{ color: matchedTerm ? 'var(--c-muted)' : 'var(--c-text)', fontSize: '0.82rem' }}>
                    {p.definition}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <div style={{ marginTop: '1.25rem' }}>
        {!checked && (
          <button className="btn btn-primary btn-lg" disabled={!allPlaced} onClick={check}>
            {allPlaced ? 'בדוק/י תשובות ←' : `עוד ${pairs.length - Object.keys(matches).length} חיבורים...`}
          </button>
        )}

        {checked && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className={`feedback-box ${score === pairs.length ? 'feedback-success' : score >= pairs.length / 2 ? 'feedback-warn' : 'feedback-error'}`}
              style={{ textAlign: 'center', fontSize: '1rem' }}>
              {score === pairs.length ? '🌟 מושלם!' : score >= pairs.length / 2 ? '👍 לא רע!' : '💪 נסה/י שוב!'}{' '}
              {score} / {pairs.length} נכון
            </div>
            {score < pairs.length && (
              <button className="btn btn-outline" onClick={reset}>נסה/י שוב ↺</button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
