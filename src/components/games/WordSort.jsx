import { useState, useRef, useCallback } from 'react'

const BUCKETS = [
  { id: 'animals', label: 'בעלי חיים 🐾', color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.35)' },
  { id: 'tech', label: 'טכנולוגיה 💻', color: '#3b82f6', bg: 'rgba(59,130,246,0.1)', border: 'rgba(59,130,246,0.35)' },
  { id: 'emotion', label: 'רגשות 💜', color: '#a855f7', bg: 'rgba(168,85,247,0.1)', border: 'rgba(168,85,247,0.35)' },
]

const WORDS = [
  { id: 'w1', text: 'כלב', bucket: 'animals' },
  { id: 'w2', text: 'אלגוריתם', bucket: 'tech' },
  { id: 'w3', text: 'שמחה', bucket: 'emotion' },
  { id: 'w4', text: 'פיל', bucket: 'animals' },
  { id: 'w5', text: 'זיכרון RAM', bucket: 'tech' },
  { id: 'w6', text: 'עצב', bucket: 'emotion' },
  { id: 'w7', text: 'נמר', bucket: 'animals' },
  { id: 'w8', text: 'מעבד', bucket: 'tech' },
  { id: 'w9', text: 'אהבה', bucket: 'emotion' },
]

export default function WordSort({ onComplete }) {
  const [placed, setPlaced] = useState({})   // wordId → bucketId
  const [shaking, setShaking] = useState(null)
  const [floating, setFloating] = useState(null) // { wordId, x, y, startX, startY }
  const [dragPos, setDragPos] = useState({ x: 0, y: 0 })
  const [hoveredBucket, setHoveredBucket] = useState(null)
  const [done, setDone] = useState(false)
  const containerRef = useRef(null)
  const bucketRefs = useRef({})

  const unplacedWords = WORDS.filter(w => !placed[w.id])
  const allPlaced = unplacedWords.length === 0

  const startDrag = useCallback((e, wordId) => {
    e.preventDefault()
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    setFloating({ wordId, startX: clientX, startY: clientY })
    setDragPos({ x: clientX, y: clientY })
  }, [])

  const onMove = useCallback((e) => {
    if (!floating) return
    const clientX = e.clientX ?? e.touches?.[0]?.clientX ?? 0
    const clientY = e.clientY ?? e.touches?.[0]?.clientY ?? 0
    setDragPos({ x: clientX, y: clientY })

    // Check bucket hover
    let hit = null
    for (const [id, ref] of Object.entries(bucketRefs.current)) {
      if (!ref) continue
      const rect = ref.getBoundingClientRect()
      if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
        hit = id
        break
      }
    }
    setHoveredBucket(hit)
  }, [floating])

  const onUp = useCallback(() => {
    if (!floating) return
    const word = WORDS.find(w => w.id === floating.wordId)

    if (hoveredBucket) {
      if (hoveredBucket === word.bucket) {
        // Correct!
        setPlaced(prev => {
          const next = { ...prev, [word.id]: hoveredBucket }
          if (Object.keys(next).length === WORDS.length) {
            setDone(true)
            if (onComplete) onComplete()
          }
          return next
        })
      } else {
        // Wrong — shake
        setShaking(word.id)
        setTimeout(() => setShaking(null), 500)
      }
    }

    setFloating(null)
    setHoveredBucket(null)
  }, [floating, hoveredBucket, onComplete])

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onTouchMove={onMove}
      onMouseUp={onUp}
      onTouchEnd={onUp}
      style={{ maxWidth: 520, margin: '0 auto', userSelect: 'none', touchAction: 'none' }}
    >
      <div className="card" style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🧲</span>
          <h3>מיין את המילים</h3>
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem' }}>
          <strong>גרור/י</strong> כל מילה לקטגוריה הנכונה. כך בדיוק AI מסדר מילים לפי משמעות.
        </p>
      </div>

      {/* Word pool */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', justifyContent: 'center', minHeight: 60, marginBottom: '1rem', padding: '0.5rem' }}>
        {unplacedWords.map(w => (
          <div
            key={w.id}
            onMouseDown={e => startDrag(e, w.id)}
            onTouchStart={e => startDrag(e, w.id)}
            style={{
              padding: '0.5rem 1.1rem',
              borderRadius: 99,
              background: 'var(--c-surface)',
              border: '2px solid var(--c-border)',
              color: 'var(--c-text)',
              fontWeight: 700,
              fontSize: '1rem',
              cursor: 'grab',
              transition: 'transform 0.15s, box-shadow 0.15s',
              boxShadow: floating?.wordId === w.id ? '0 8px 24px rgba(0,0,0,0.4)' : '0 2px 8px rgba(0,0,0,0.2)',
              opacity: floating?.wordId === w.id ? 0.4 : 1,
              animation: shaking === w.id ? 'shake 0.4s ease' : 'none',
            }}
          >
            {w.text}
          </div>
        ))}
        {unplacedWords.length === 0 && !done && (
          <div style={{ color: 'var(--c-muted)', fontSize: '0.85rem', padding: '0.5rem' }}>כל המילים מוינו! ✓</div>
        )}
      </div>

      {/* Buckets */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.5rem' }}>
        {BUCKETS.map(b => {
          const wordsInBucket = WORDS.filter(w => placed[w.id] === b.id)
          const isHovered = hoveredBucket === b.id && floating
          return (
            <div
              key={b.id}
              ref={el => bucketRefs.current[b.id] = el}
              style={{
                minHeight: 120,
                borderRadius: 'var(--radius)',
                border: `2px ${isHovered ? 'solid' : 'dashed'} ${isHovered ? b.color : b.border}`,
                background: isHovered ? b.bg : 'transparent',
                padding: '0.6rem',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.35rem',
                transition: 'all 0.2s',
                transform: isHovered ? 'scale(1.04)' : 'scale(1)',
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: b.color, textAlign: 'center', marginBottom: '0.25rem' }}>
                {b.label}
              </div>
              {wordsInBucket.map(w => (
                <div key={w.id} style={{
                  padding: '0.3rem 0.7rem', borderRadius: 99,
                  background: b.bg, border: `1.5px solid ${b.border}`,
                  color: b.color, fontWeight: 700, fontSize: '0.85rem',
                  animation: 'cardIn 0.35s cubic-bezier(0.34,1.56,0.64,1)',
                }}>
                  {w.text}
                </div>
              ))}
            </div>
          )
        })}
      </div>

      {/* Floating drag ghost */}
      {floating && (
        <div style={{
          position: 'fixed',
          left: dragPos.x - 40,
          top: dragPos.y - 20,
          pointerEvents: 'none',
          zIndex: 9999,
          padding: '0.5rem 1.1rem',
          borderRadius: 99,
          background: hoveredBucket
            ? `${BUCKETS.find(b => b.id === hoveredBucket)?.bg || 'var(--c-surface)'}`
            : 'var(--c-surface)',
          border: `2px solid ${hoveredBucket ? BUCKETS.find(b => b.id === hoveredBucket)?.color || 'var(--c-border)' : 'var(--c-border)'}`,
          fontWeight: 700, fontSize: '1rem',
          boxShadow: '0 12px 32px rgba(0,0,0,0.5)',
          transform: 'scale(1.1) rotate(-3deg)',
          color: hoveredBucket ? BUCKETS.find(b => b.id === hoveredBucket)?.color : 'var(--c-text)',
          transition: 'background 0.15s, border-color 0.15s, color 0.15s',
        }}>
          {WORDS.find(w => w.id === floating.wordId)?.text}
        </div>
      )}

      {done && (
        <div className="feedback-box feedback-success" style={{ marginTop: '1rem', fontSize: '0.88rem' }}>
          ✅ בדיוק כך AI מסדר מילים! מילים שמופיעות בהקשרים דומים ("כלב" ו"חתול" ← ליד "מזון", "טיפול") → ה-AI מסדר אותן קרוב אחת לשנייה במרחב הווקטורי.
        </div>
      )}
    </div>
  )
}
