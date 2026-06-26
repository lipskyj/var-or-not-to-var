import { useState } from 'react'

const COLORS = [
  { id: 'purple', label: 'סגול', hex: '#a855f7', emoji: '🟣' },
  { id: 'blue',   label: 'כחול', hex: '#3b82f6', emoji: '🔵' },
  { id: 'green',  label: 'ירוק', hex: '#10b981', emoji: '🟢' },
  { id: 'orange', label: 'כתום', hex: '#f59e0b', emoji: '🟠' },
]

const SHAPES = ['●', '■', '▲']

function makePop(size = 20) {
  return Array.from({ length: size }, (_, i) => ({
    id: i,
    color: COLORS[Math.floor(Math.random() * COLORS.length)].id,
    shape: SHAPES[Math.floor(Math.random() * SHAPES.length)],
    alive: true,
  }))
}

// Secret bias: purple circles survive better
function fitnessScore(agent, bias) {
  let score = Math.random() * 40 + 30 // base 30-70
  if (agent.color === bias.color) score += 35
  if (agent.shape === bias.shape) score += 15
  return score
}

const BIAS = { color: 'purple', shape: '●' }

export default function SelectionSim({ onComplete }) {
  const [population, setPopulation] = useState(makePop)
  const [generation, setGeneration] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [history, setHistory] = useState([])
  const [done, setDone] = useState(false)

  const colorCount = (pop) => {
    const counts = {}
    COLORS.forEach(c => { counts[c.id] = 0 })
    pop.filter(a => a.alive).forEach(a => { counts[a.color]++ })
    return counts
  }

  const runGeneration = () => {
    if (done) return

    // Score everyone
    const scored = population.map(a => ({ ...a, score: fitnessScore(a, BIAS) }))
    scored.sort((a, b) => b.score - a.score)

    // Top half survives
    const survivors = scored.slice(0, 10)
    const survivorIds = new Set(survivors.map(a => a.id))

    const snapshot = population.map(a => ({ ...a, alive: survivorIds.has(a.id) }))
    setHistory(h => [...h, colorCount(snapshot.filter(a => !a.alive ? false : true).reduce((acc, a) => { acc.push(a); return acc }, []))])

    // Reproduce: survivors + offspring
    const nextGen = [
      ...survivors.map(a => ({ ...a, score: undefined })),
      ...survivors.map(a => ({
        id: Math.random(),
        color: Math.random() < 0.85 ? a.color : COLORS[Math.floor(Math.random() * COLORS.length)].id,
        shape: Math.random() < 0.85 ? a.shape : SHAPES[Math.floor(Math.random() * SHAPES.length)],
        alive: true,
      })),
    ]

    const newGen = generation + 1
    setPopulation(nextGen)
    setGeneration(newGen)

    if (newGen >= 5) {
      setDone(true)
      if (onComplete) onComplete()
    }
  }

  const counts = colorCount(population)
  const total = population.length

  return (
    <div className="card" style={{ maxWidth: 500, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🧬</span>
        <h3>סימולטור ברירה — Selection Sim</h3>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
        {generation === 0
          ? 'אוכלוסייה מגוונת. לחץ/י "הפעל ברירה" — מי ישרוד?'
          : `דור ${generation} — צפה/י בשינוי באוכלוסייה`}
      </p>

      {/* Population grid */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1rem', padding: '0.75rem', background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', border: '1px solid var(--c-border)' }}>
        {population.map(agent => {
          const col = COLORS.find(c => c.id === agent.color)
          return (
            <div
              key={agent.id}
              title={`${col?.label} ${agent.shape}`}
              style={{
                width: 32, height: 32, borderRadius: agent.shape === '■' ? 4 : agent.shape === '▲' ? 0 : '50%',
                background: col?.hex,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 800, color: 'white',
                opacity: agent.alive ? 1 : 0.15,
                transition: 'opacity 0.5s, transform 0.3s',
                transform: agent.alive ? 'scale(1)' : 'scale(0.7)',
                clipPath: agent.shape === '▲' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : undefined,
              }}
            />
          )
        })}
      </div>

      {/* Color distribution bar */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: '0.3rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>פיזור צבעים:</span>
          <span>דור {generation}</span>
        </div>
        <div style={{ display: 'flex', height: 16, borderRadius: 99, overflow: 'hidden', gap: 1 }}>
          {COLORS.map(c => (
            <div
              key={c.id}
              style={{
                flex: counts[c.id] || 0,
                background: c.hex,
                transition: 'flex 0.6s cubic-bezier(0.34,1.2,0.64,1)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.6rem', color: 'white', fontWeight: 700, minWidth: 0,
              }}
            >
              {Math.round((counts[c.id] || 0) / total * 100) > 15 ? `${Math.round((counts[c.id] || 0) / total * 100)}%` : ''}
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.4rem', flexWrap: 'wrap' }}>
          {COLORS.map(c => (
            <span key={c.id} style={{ fontSize: '0.72rem', color: c.hex, fontWeight: 600 }}>
              {c.emoji} {c.label}: {counts[c.id] || 0}
            </span>
          ))}
        </div>
      </div>

      {!done && (
        <button className="btn btn-primary btn-lg" onClick={runGeneration} style={{ width: '100%' }}>
          🧬 הפעל ברירה — דור {generation + 1} ←
        </button>
      )}

      {done && !revealed && (
        <button className="btn btn-outline" onClick={() => setRevealed(true)} style={{ width: '100%' }}>
          🔍 גלה/י מה היה הקריטריון הנסתר
        </button>
      )}

      {revealed && (
        <div className="feedback-box feedback-error" style={{ animation: 'cardIn 0.4s ease' }}>
          <strong>🎯 הקריטריון הנסתר:</strong> עיגולים סגולים (🟣●) קיבלו יתרון של +50 נקודות בכל דור.
          <br /><br />
          לאחר {generation} דורות — הסגול שולט. <strong>אף אחד לא תכנן את ה"הטיה" — היא פשוט התפתחה.</strong>
          <br />
          כך AI שאומן על נתונים לא מאוזנים הופך מוטה בלי כוונה.
        </div>
      )}
    </div>
  )
}
