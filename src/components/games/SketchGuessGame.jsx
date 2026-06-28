import { useState, useRef } from 'react'
import { askGeminiVision } from '../../api/gemini.js'

const ITEMS = [
  { he: 'חתול', en: 'cat', emoji: '🐱' },
  { he: 'בית', en: 'house', emoji: '🏠' },
  { he: 'שמש', en: 'sun', emoji: '☀️' },
  { he: 'עץ', en: 'tree', emoji: '🌳' },
  { he: 'מכונית', en: 'car', emoji: '🚗' },
  { he: 'דג', en: 'fish', emoji: '🐟' },
  { he: 'כוכב', en: 'star', emoji: '⭐' },
  { he: 'ציפור', en: 'bird', emoji: '🐦' },
  { he: 'פרח', en: 'flower', emoji: '🌸' },
  { he: 'עיגול', en: 'circle', emoji: '⭕' },
]

export default function SketchGuessGame({ onComplete }) {
  const canvasRef = useRef(null)
  const [rounds] = useState(() => [...ITEMS].sort(() => Math.random() - 0.5).slice(0, 3))
  const [round, setRound] = useState(0)
  const [drawing, setDrawing] = useState(false)
  const [lastPos, setLastPos] = useState(null)
  const [phase, setPhase] = useState('draw') // draw | thinking | result | done
  const [guess, setGuess] = useState(null)
  const [results, setResults] = useState([])

  const current = rounds[round]

  const getPos = (e) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const sx = canvas.width / rect.width
    const sy = canvas.height / rect.height
    const src = e.touches?.[0] || e
    return { x: (src.clientX - rect.left) * sx, y: (src.clientY - rect.top) * sy }
  }

  const initCanvas = (canvas) => {
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const startDraw = (e) => {
    e.preventDefault()
    setDrawing(true)
    setLastPos(getPos(e))
  }

  const onDraw = (e) => {
    e.preventDefault()
    if (!drawing || !lastPos) return
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const pos = getPos(e)
    ctx.beginPath()
    ctx.moveTo(lastPos.x, lastPos.y)
    ctx.lineTo(pos.x, pos.y)
    ctx.strokeStyle = '#1e1b4b'
    ctx.lineWidth = 5
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.stroke()
    setLastPos(pos)
  }

  const endDraw = () => { setDrawing(false); setLastPos(null) }

  const clearCanvas = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, canvas.width, canvas.height)
  }

  const submit = async () => {
    setPhase('thinking')
    const canvas = canvasRef.current
    const base64 = canvas.toDataURL('image/png').split(',')[1]
    const options = rounds.map(r => r.en).join(', ')
    const prompt = `This is a child's sketch. What is drawn? Choose only from: ${options}. Reply with exactly one word from that list.`

    let guessedEn = ''
    try {
      const raw = await askGeminiVision(prompt, base64)
      guessedEn = raw.toLowerCase().trim().replace(/[^a-z]/g, '')
    } catch { guessedEn = '' }

    const matched = ITEMS.find(i => i.en === guessedEn) || null
    const correct = matched?.en === current.en
    setGuess(matched)
    setResults(r => [...r, { item: current, guess: matched, correct }])
    setPhase('result')
  }

  const next = () => {
    const nextRound = round + 1
    if (nextRound >= rounds.length) {
      setPhase('done')
      if (onComplete) onComplete()
      return
    }
    setRound(nextRound)
    setGuess(null)
    setPhase('draw')
    setTimeout(() => initCanvas(canvasRef.current), 10)
  }

  if (phase === 'done') {
    const score = results.filter(r => r.correct).length
    return (
      <div className="card" style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎨</div>
        <h3>ה-AI ניחש {score}/{rounds.length} ציורים!</h3>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', margin: '1rem 0' }}>
          {results.map((r, i) => (
            <div key={i} style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem' }}>{r.item.emoji}</div>
              <div style={{ fontSize: '0.75rem', color: r.correct ? 'var(--c-success)' : 'var(--c-danger)', fontWeight: 700 }}>
                {r.correct ? '✅ ניחש' : `❌ ניחש ${r.guess?.emoji || '?'}`}
              </div>
            </div>
          ))}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', lineHeight: 1.6 }}>
          AI לזיהוי תמונות אומן על מיליוני ציורים — הוא מחפש פיצ׳רים מרכזיים, לא ציור מושלם.
        </p>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🎨</span>
        <h3>צייר/י — AI מנחש</h3>
        <span className="pill-counter">{round + 1}/{rounds.length}</span>
      </div>

      {phase === 'draw' && (
        <div style={{ marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--c-muted)', marginBottom: '0.35rem' }}>צייר/י:</div>
          <div style={{ fontSize: '2.2rem', fontWeight: 800 }}>{current.emoji} {current.he}</div>
        </div>
      )}

      {phase === 'thinking' && (
        <div style={{ fontSize: '0.95rem', color: 'var(--c-muted)', marginBottom: '0.75rem', animation: 'float 1s ease-in-out infinite' }}>
          🤖 ה-AI מנתח את הציור שלך...
        </div>
      )}

      {phase === 'result' && (
        <div style={{ marginBottom: '0.75rem', animation: 'cardIn 0.4s ease' }}>
          <div style={{ fontSize: '0.82rem', color: 'var(--c-muted)' }}>ה-AI ניחש:</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, margin: '0.25rem 0' }}>
            {guess ? `${guess.emoji} ${guess.he}` : '🤔 לא ידעתי'}
          </div>
          <div style={{ fontSize: '1rem', fontWeight: 700, color: guess?.en === current.en ? 'var(--c-success)' : 'var(--c-danger)' }}>
            {guess?.en === current.en ? '✅ נכון!' : `❌ היה צריך: ${current.emoji} ${current.he}`}
          </div>
        </div>
      )}

      <canvas
        ref={node => { canvasRef.current = node; if (node && phase === 'draw' && round === 0) initCanvas(node) }}
        width={300}
        height={220}
        style={{
          width: '100%', maxWidth: 300, height: 220, display: 'block', margin: '0 auto 0.75rem',
          borderRadius: 'var(--radius-s)', border: '2px solid var(--c-border)',
          background: '#ffffff', cursor: 'crosshair', touchAction: 'none',
        }}
        onPointerDown={startDraw}
        onPointerMove={onDraw}
        onPointerUp={endDraw}
        onPointerLeave={endDraw}
      />

      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {phase === 'draw' && <>
          <button className="btn btn-outline btn-sm" onClick={clearCanvas}>🗑️ נקה/י</button>
          <button className="btn btn-primary" onClick={submit}>🤖 AI ניחש ←</button>
        </>}
        {phase === 'result' && (
          <button className="btn btn-primary" onClick={next}>
            {round + 1 >= rounds.length ? '✅ סיימתי!' : 'סיבוב הבא ←'}
          </button>
        )}
      </div>
    </div>
  )
}
