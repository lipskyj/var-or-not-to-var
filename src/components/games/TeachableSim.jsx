import { useState, useRef } from 'react'

const PRESETS = {
  gesture: {
    title: 'מזהה מחוות יד',
    classes: [
      {
        id: 'fist',  label: 'אגרוף',        emoji: '✊', color: '#7c3aed',
        variants: ['✊', '✊', '🤛', '✊', '🤜', '✊', '✊', '🤛'],
      },
      {
        id: 'open',  label: 'יד פתוחה',     emoji: '✋', color: '#0369a1',
        variants: ['✋', '🖐️', '✋', '🖖', '✋', '🖐️', '✋', '✋'],
      },
      {
        id: 'thumb', label: 'אגודל למעלה',  emoji: '👍', color: '#065f46',
        variants: ['👍', '👍', '🤙', '👍', '👍', '👍', '🤙', '👍'],
      },
    ],
    hint: 'בחר/י קטגוריה ← לחץ/י 📸 כדי לצלם דוגמאות',
  },
  face: {
    title: 'מזהה הבעות פנים',
    classes: [
      {
        id: 'happy',     label: 'שמח',    emoji: '😊', color: '#7c3aed',
        variants: ['😊', '😁', '😄', '🙂', '😃', '😊', '😁', '😄'],
      },
      {
        id: 'neutral',   label: 'ניטרלי', emoji: '😐', color: '#0369a1',
        variants: ['😐', '😑', '😶', '🫤', '😐', '😑', '😐', '🫤'],
      },
      {
        id: 'surprised', label: 'מופתע',  emoji: '😮', color: '#065f46',
        variants: ['😮', '😲', '😯', '😮', '🤯', '😮', '😲', '😯'],
      },
    ],
    hint: 'בחר/י קטגוריה ← לחץ/י 📸 כדי לצלם דוגמאות',
  },
}

const MIN_PER_CLASS = 5
const GOOD_PER_CLASS = 20
const MAX_SHOWN = 12

function calcAccuracy(galleries, numClasses) {
  const counts = galleries.map(g => g.length)
  const min = Math.min(...counts)
  const total = counts.reduce((s, v) => s + v, 0)
  const avg = total / numClasses
  const balance = Math.min(1, min / Math.max(1, avg))
  const amount = Math.min(1, min / GOOD_PER_CLASS)
  return Math.round(48 + amount * 44 + balance * 6)
}

// Pseudo-random but stable transform for each photo card
function photoStyle(seed) {
  const rot = ((seed * 13 + 7) % 11) - 5    // -5..+5 deg
  const scale = 0.93 + (seed % 7) * 0.01     // 0.93..1.00
  return { transform: `rotate(${rot}deg) scale(${scale})` }
}

export default function TeachableSim({ preset = 'gesture', onComplete }) {
  const cfg = PRESETS[preset] || PRESETS.gesture
  const { classes, hint, title } = cfg

  const [phase, setPhase]       = useState('collect')
  const [activeClass, setActiveClass] = useState(classes[0].id)
  const [galleries, setGalleries]     = useState(() => classes.map(() => []))
  const [flash, setFlash]       = useState(false)
  const [progress, setProgress] = useState(0)
  const [accuracy, setAccuracy] = useState(null)
  const [round, setRound]       = useState(1)
  const [testPreds, setTestPreds]     = useState([])
  const [testIdx, setTestIdx]   = useState(0)
  const varIdxRef = useRef({})
  const trainingRef = useRef(false)

  const activeIdx  = classes.findIndex(c => c.id === activeClass)
  const activeCls  = classes[activeIdx]
  const minCount   = Math.min(...galleries.map(g => g.length))
  const canTrain   = minCount >= MIN_PER_CLASS

  // Pick next variant for this class (cycle through variants array)
  const nextVariant = (cls) => {
    const key = cls.id
    const idx = varIdxRef.current[key] || 0
    const v = cls.variants[idx % cls.variants.length]
    varIdxRef.current[key] = idx + 1
    return v
  }

  const capture = () => {
    if (phase !== 'collect') return
    const variant = nextVariant(activeCls)
    setGalleries(prev => prev.map((g, i) =>
      i === activeIdx ? [...g, { emoji: variant, seed: g.length + activeIdx * 100 }] : g
    ))
    setFlash(true)
    setTimeout(() => setFlash(false), 180)
  }

  const addMore = () => {
    setGalleries(prev => prev.map((g, i) => {
      const extra = Array.from({ length: 20 }, (_, j) => ({
        emoji: classes[i].variants[(g.length + j) % classes[i].variants.length],
        seed: g.length + j + i * 200,
      }))
      return [...g, ...extra]
    }))
    setRound(2)
    setAccuracy(null)
    setPhase('collect')
  }

  const runTraining = () => {
    if (trainingRef.current) return
    trainingRef.current = true
    setPhase('training')
    setProgress(0)
    let p = 0
    const iv = setInterval(() => {
      p += 4
      setProgress(p)
      if (p >= 100) {
        clearInterval(iv)
        trainingRef.current = false
        const acc = calcAccuracy(galleries, classes.length)
        setAccuracy(acc)
        setPhase('result')
      }
    }, 55)
  }

  const startTest = () => {
    const acc = accuracy / 100
    const preds = classes.flatMap(cls =>
      [0, 1].map(() => {
        const correct = Math.random() < acc
        const wrong = classes.find(x => x.id !== cls.id) || cls
        return { actual: cls, predicted: correct ? cls : wrong, correct }
      })
    ).sort(() => Math.random() - 0.5).slice(0, Math.min(5, classes.length * 2))
    setTestPreds(preds)
    setTestIdx(0)
    setPhase('test')
  }

  const nextTest = () => {
    if (testIdx >= testPreds.length - 1) {
      setPhase('done')
      if (onComplete) onComplete()
    } else {
      setTestIdx(i => i + 1)
    }
  }

  // ── Collect ────────────────────────────────────────────────────────────────
  if (phase === 'collect') {
    return (
      <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1.3rem' }}>📷</span>
          <h3>{title}</h3>
          {round === 2 && <span className="pill-counter">סיבוב 2</span>}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
          {round === 2 ? 'הוספנו 20 דוגמאות לכל קטגוריה. המשך/י לצלם או אמן/י שוב.' : hint}
        </p>

        {/* Class tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '0.75rem' }}>
          {classes.map((cls, i) => (
            <button
              key={cls.id}
              onClick={() => setActiveClass(cls.id)}
              style={{
                flex: 1, padding: '0.45rem 0.3rem',
                border: `2px solid ${cls.color}`,
                borderRadius: 'var(--radius-s)',
                background: activeClass === cls.id ? cls.color : 'transparent',
                color: activeClass === cls.id ? '#fff' : cls.color,
                fontFamily: 'var(--font)', fontWeight: 700, fontSize: '0.85rem',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {cls.emoji} {cls.label}
              <div style={{ fontSize: '0.7rem', opacity: 0.85, marginTop: 1 }}>
                {galleries[i].length} {galleries[i].length >= MIN_PER_CLASS ? '✓' : ''}
              </div>
            </button>
          ))}
        </div>

        {/* Viewfinder + capture */}
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start', marginBottom: '1rem' }}>
          <div style={{
            width: 110, height: 110, flexShrink: 0,
            border: `3px solid ${activeCls.color}`,
            borderRadius: 12,
            background: flash ? activeCls.color + '33' : 'var(--c-bg)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '4rem', position: 'relative',
            transition: 'background 0.12s',
            boxShadow: flash ? `0 0 0 4px ${activeCls.color}55` : 'none',
          }}>
            {activeCls.emoji}
            {/* corner marks */}
            {[
              { top: 4, left: 4, borderTop: '3px solid', borderLeft: '3px solid' },
              { top: 4, right: 4, borderTop: '3px solid', borderRight: '3px solid' },
              { bottom: 4, left: 4, borderBottom: '3px solid', borderLeft: '3px solid' },
              { bottom: 4, right: 4, borderBottom: '3px solid', borderRight: '3px solid' },
            ].map((s, i) => (
              <div key={i} style={{ position: 'absolute', width: 12, height: 12, borderColor: activeCls.color, opacity: 0.6, ...s }} />
            ))}
          </div>

          <div style={{ flex: 1 }}>
            <button
              className="btn btn-primary btn-lg"
              onClick={capture}
              style={{ width: '100%', marginBottom: '0.5rem', background: activeCls.color, borderColor: activeCls.color }}
            >
              📸 צלם/י {activeCls.label}
            </button>
            <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)', lineHeight: 1.5 }}>
              {galleries[activeIdx].length < MIN_PER_CLASS
                ? `עוד ${MIN_PER_CLASS - galleries[activeIdx].length} תמונות נדרשות`
                : `✓ ${galleries[activeIdx].length} תמונות`}
            </div>
          </div>
        </div>

        {/* Gallery rows per class */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {classes.map((cls, i) => {
            const shown = galleries[i].slice(-MAX_SHOWN)
            return (
              <div key={cls.id}>
                <div style={{ fontSize: '0.72rem', color: cls.color, fontWeight: 700, marginBottom: '0.25rem' }}>
                  {cls.emoji} {cls.label} — {galleries[i].length} תמונות
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', minHeight: 36 }}>
                  {shown.map((img, j) => (
                    <div
                      key={j}
                      style={{
                        width: 34, height: 34,
                        background: cls.color + '22',
                        border: `1.5px solid ${cls.color}55`,
                        borderRadius: 6,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.35rem',
                        animation: j === shown.length - 1 && galleries[i].length <= MAX_SHOWN ? 'cardIn 0.2s ease' : 'none',
                        ...photoStyle(img.seed),
                      }}
                    >
                      {img.emoji}
                    </div>
                  ))}
                  {galleries[i].length > MAX_SHOWN && (
                    <div style={{
                      width: 34, height: 34, background: cls.color + '22', borderRadius: 6,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '0.65rem', color: cls.color, fontWeight: 800,
                    }}>
                      +{galleries[i].length - MAX_SHOWN}
                    </div>
                  )}
                  {galleries[i].length === 0 && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--c-muted)', lineHeight: '34px' }}>
                      עדיין אין תמונות...
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <button
          className="btn btn-primary btn-lg"
          disabled={!canTrain}
          onClick={runTraining}
          style={{ width: '100%' }}
        >
          {canTrain ? '🧠 אמן/י מודל ←' : `צריך/ה ${MIN_PER_CLASS - minCount} תמונות נוספות לקטגוריה הנמוכה`}
        </button>
      </div>
    )
  }

  // ── Training ───────────────────────────────────────────────────────────────
  if (phase === 'training') {
    const total = galleries.reduce((s, g) => s + g.length, 0)
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', animation: 'float 0.8s ease-in-out infinite' }}>🧠</div>
        <h3>מאמן/ת את המודל...</h3>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          מנתח/ת {total} תמונות אימון
        </p>
        <div style={{ height: 14, background: 'var(--c-border)', borderRadius: 99, overflow: 'hidden', marginBottom: '0.5rem' }}>
          <div style={{ height: '100%', width: `${progress}%`, background: 'var(--grad)', borderRadius: 99, transition: 'width 0.08s' }} />
        </div>
        <span style={{ fontWeight: 700, color: 'var(--c-primary)', fontSize: '1.1rem' }}>{progress}%</span>
      </div>
    )
  }

  // ── Result ─────────────────────────────────────────────────────────────────
  if (phase === 'result') {
    const good = accuracy >= 78
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto' }}>
        <h3 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
          {good ? '✅' : '⚠️'} דיוק המודל:{' '}
          <span style={{ color: good ? 'var(--c-success)' : '#f59e0b' }}>{accuracy}%</span>
        </h3>

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ height: 18, background: 'var(--c-border)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99, width: `${accuracy}%`,
              background: accuracy >= 80 ? '#10b981' : accuracy >= 65 ? '#f59e0b' : '#ef4444',
              transition: 'width 1s cubic-bezier(0.34,1.2,0.64,1)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--c-muted)', marginTop: '0.25rem' }}>
            <span>0%</span><span>50%</span><span>75%</span><span>100%</span>
          </div>
        </div>

        {/* Per-class summary */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          {classes.map((cls, i) => (
            <div key={cls.id} style={{
              flex: 1, padding: '0.5rem', borderRadius: 'var(--radius-s)',
              background: cls.color + '18', border: `1.5px solid ${cls.color}44`,
              textAlign: 'center', fontSize: '0.78rem',
            }}>
              <div style={{ fontSize: '1.4rem' }}>{cls.emoji}</div>
              <div style={{ fontWeight: 700, color: cls.color }}>{galleries[i].length}</div>
              <div style={{ color: 'var(--c-muted)' }}>תמונות</div>
            </div>
          ))}
        </div>

        <div className={`feedback-box ${good ? 'feedback-success' : 'feedback-warn'}`} style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
          {good
            ? `👍 ${minCount}+ תמונות לכל קטגוריה הספיקו למודל טוב!`
            : `🤔 רק ${minCount} תמונות לקטגוריה — המודל לא מכיר מספיק. הוסף/י יותר!`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {round === 1 && (
            <button className="btn btn-primary btn-lg" onClick={addMore} style={{ width: '100%' }}>
              ➕ הוסף/י 20 תמונות לכל קטגוריה ← ראה/י מה משתנה
            </button>
          )}
          <button className="btn btn-outline" onClick={startTest} style={{ width: '100%' }}>
            🧪 בדוק/י את המודל ←
          </button>
        </div>
      </div>
    )
  }

  // ── Test ───────────────────────────────────────────────────────────────────
  if (phase === 'test') {
    const pred = testPreds[testIdx]
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '0.78rem', color: 'var(--c-muted)', marginBottom: '0.5rem' }}>
          בדיקה {testIdx + 1} / {testPreds.length}
        </div>

        {/* "Photo" being classified */}
        <div key={testIdx} style={{
          width: 100, height: 100, margin: '0.75rem auto 0.5rem',
          background: pred.actual.color + '22',
          border: `3px solid ${pred.actual.color}`,
          borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '4rem', animation: 'cardIn 0.25s ease',
          boxShadow: `0 4px 16px ${pred.actual.color}33`,
        }}>
          {pred.actual.emoji}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
          הראינו למודל תמונה של: <strong>{pred.actual.label}</strong>
        </p>

        {/* Confidence bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', textAlign: 'right' }}>
          {classes.map(cls => {
            const isPred = cls.id === pred.predicted.id
            const conf = isPred
              ? Math.round(accuracy * 0.88 + Math.random() * 8)
              : Math.round((100 - accuracy) / (classes.length - 1) * (0.7 + Math.random() * 0.6))
            return (
              <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.82rem', minWidth: 76, textAlign: 'right' }}>
                  {cls.emoji} {cls.label}
                </span>
                <div style={{ flex: 1, height: 11, background: 'var(--c-border)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{
                    height: '100%', width: `${Math.min(99, conf)}%`,
                    background: isPred ? cls.color : '#6b7280',
                    borderRadius: 99, transition: 'width 0.5s 0.1s',
                  }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: isPred ? 800 : 400, color: isPred ? cls.color : 'var(--c-muted)', minWidth: 34 }}>
                  {Math.min(99, conf)}%
                </span>
              </div>
            )
          })}
        </div>

        <div style={{ fontWeight: 700, fontSize: '1rem', color: pred.correct ? 'var(--c-success)' : 'var(--c-danger)', marginBottom: '0.75rem' }}>
          {pred.correct
            ? `✅ זיהה/תה נכון: ${pred.actual.label}`
            : `❌ בלבל עם: ${pred.predicted.emoji} ${pred.predicted.label}`}
        </div>

        <button className="btn btn-primary" onClick={nextTest}>
          {testIdx >= testPreds.length - 1 ? '✅ סיימתי' : 'הבא ←'}
        </button>
      </div>
    )
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  return (
    <div className="card" style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🎓</div>
      <h3>המודל שלך: {accuracy}% דיוק</h3>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginTop: '0.5rem', lineHeight: 1.6 }}>
        {accuracy >= 80
          ? 'מעולה! נתונים מגוונים ומאוזנים = מודל חזק. זה בדיוק הסוד של AI טוב.'
          : 'גם עם פחות תמונות המודל עובד — אבל יותר נתונים = יותר דיוק תמיד.'}
      </p>
    </div>
  )
}
