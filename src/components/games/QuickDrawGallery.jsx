import { useEffect, useRef } from 'react'

// Deterministic LCG random from seed
function seededRand(seed) {
  let s = seed
  return () => {
    s = (s * 1664525 + 1013904223) & 0xffffffff
    return (s >>> 0) / 0xffffffff
  }
}

// Generate one cat as strokes in 0-220 coordinate space
function makeCat(seed) {
  const r = seededRand(seed)

  const cx  = 110 + (r() - 0.5) * 18
  const cy  = 120 + (r() - 0.5) * 12
  const rx  = 62  + r() * 28          // head x radius
  const ry  = 52  + r() * 22          // head y radius
  const tilt = (r() - 0.5) * 0.18    // head tilt
  const earH = 28 + r() * 22

  // Build oval via 22 points
  const headXs = [], headYs = []
  for (let i = 0; i <= 22; i++) {
    const a = (i / 22) * Math.PI * 2
    headXs.push(cx + Math.cos(a + tilt) * rx)
    headYs.push(cy + Math.sin(a + tilt) * ry - Math.abs(Math.cos(a)) * 10)
  }

  // Ear positions (on top of oval)
  const earLx = cx - rx * (0.45 + r() * 0.12)
  const earRx = cx + rx * (0.45 + r() * 0.12)
  const earTopY = cy - ry * (0.82 + r() * 0.1)
  const earBaseY = cy - ry * (0.5 + r() * 0.15)

  const eyeY = cy - ry * 0.05
  const eyeOff = rx * (0.28 + r() * 0.08)
  const eyeW = 10 + r() * 8
  const eyeH = 8 + r() * 8

  const noseX = cx + (r() - 0.5) * 8
  const noseY = cy + ry * (0.12 + r() * 0.1)
  const mouthDrop = 12 + r() * 10

  const wLen = rx * (0.55 + r() * 0.3)
  const wY1 = noseY + 4
  const wY2 = noseY + 14

  const strokes = [
    { xs: headXs,      ys: headYs },
    // left ear
    { xs: [earLx, earLx + rx * 0.2, earLx + rx * 0.38], ys: [earBaseY, earTopY - earH, earBaseY - ry * 0.15] },
    // right ear
    { xs: [earRx, earRx - rx * 0.2, earRx - rx * 0.38], ys: [earBaseY, earTopY - earH, earBaseY - ry * 0.15] },
    // left eye
    { xs: [cx - eyeOff - eyeW, cx - eyeOff, cx - eyeOff + eyeW, cx - eyeOff, cx - eyeOff - eyeW],
      ys: [eyeY, eyeY - eyeH, eyeY, eyeY + eyeH * 0.4, eyeY] },
    // right eye
    { xs: [cx + eyeOff - eyeW, cx + eyeOff, cx + eyeOff + eyeW, cx + eyeOff, cx + eyeOff - eyeW],
      ys: [eyeY, eyeY - eyeH, eyeY, eyeY + eyeH * 0.4, eyeY] },
    // nose triangle
    { xs: [noseX - 7, noseX, noseX + 7, noseX - 7], ys: [noseY, noseY + 8, noseY, noseY] },
    // mouth
    { xs: [noseX, cx - 16, cx - 22], ys: [noseY + 8, noseY + mouthDrop, noseY + mouthDrop - 6] },
    { xs: [noseX, cx + 16, cx + 22], ys: [noseY + 8, noseY + mouthDrop, noseY + mouthDrop - 6] },
    // left whiskers
    { xs: [cx - 20, cx - 20 - wLen], ys: [wY1, wY1 + (r() - 0.5) * 10] },
    { xs: [cx - 20, cx - 20 - wLen], ys: [wY2, wY2 + (r() - 0.5) * 10] },
    // right whiskers
    { xs: [cx + 20, cx + 20 + wLen], ys: [wY1, wY1 + (r() - 0.5) * 10] },
    { xs: [cx + 20, cx + 20 + wLen], ys: [wY2, wY2 + (r() - 0.5) * 10] },
  ]
  return strokes
}

function CatCanvas({ seed, size = 66 }) {
  const ref = useRef(null)
  const scale = size / 220

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    ctx.clearRect(0, 0, size, size)
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, size, size)

    const strokes = makeCat(seed)
    ctx.strokeStyle = '#1e1b4b'
    ctx.lineWidth = 1.8
    ctx.lineCap  = 'round'
    ctx.lineJoin = 'round'

    strokes.forEach(({ xs, ys }) => {
      if (!xs.length) return
      ctx.beginPath()
      xs.forEach((x, i) => {
        const px = x * scale, py = ys[i] * scale
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py)
      })
      ctx.stroke()
    })
  }, [seed, size, scale])

  return (
    <canvas
      ref={ref}
      width={size}
      height={size}
      style={{ borderRadius: 6, border: '1.5px solid var(--c-border)', background: '#fff' }}
    />
  )
}

const SEEDS = [7, 42, 113, 256, 391, 512, 777, 888, 1001, 1234, 1337, 1999, 2048, 3141, 9999]

export default function QuickDrawGallery({ onComplete }) {
  return (
    <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.3rem' }}>🐱</span>
        <h3>Quick Draw Dataset — 50 מיליון ציורים</h3>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
        כל ציור נוצר על ידי אדם אחר. כולם נקראו "חתול". מזה AI לומד.
      </p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1rem', justifyContent: 'center' }}>
        {SEEDS.map(seed => <CatCanvas key={seed} seed={seed} size={66} />)}
      </div>

      <div style={{
        background: 'var(--c-primary-l)', borderRadius: 'var(--radius-s)',
        padding: '0.65rem 0.9rem', fontSize: '0.82rem', lineHeight: 1.6,
        border: '1px solid rgba(168,85,247,0.25)',
      }}>
        <strong>מה AI "למד"?</strong> לא ציור מושלם — אלא מה משותף לכולם: אוזניים משולשות, ראש עגול, שפם.
        גם ציור "גרוע" — תרם לאימון.
      </div>

      <div style={{ marginTop: '0.75rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
        {[
          { n: '50M', label: 'ציורים שנאספו' },
          { n: '345', label: 'קטגוריות' },
          { n: '15M', label: 'משתתפים' },
        ].map(({ n, label }) => (
          <div key={n} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--c-primary)' }}>{n}</div>
            <div style={{ fontSize: '0.7rem', color: 'var(--c-muted)' }}>{label}</div>
          </div>
        ))}
      </div>

      <button
        className="btn btn-primary"
        style={{ width: '100%', marginTop: '1rem' }}
        onClick={() => { if (onComplete) onComplete() }}
      >
        הבנתי ← המשך
      </button>
    </div>
  )
}
