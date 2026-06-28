import { useState, useEffect, useRef } from 'react'

const PRESETS = {
  gesture: {
    title: 'מזהה מחוות יד',
    classes: [
      { id: 'fist',  label: 'אגרוף',       emoji: '✊', color: '#7c3aed' },
      { id: 'open',  label: 'יד פתוחה',    emoji: '✋', color: '#0369a1' },
      { id: 'thumb', label: 'אגודל למעלה', emoji: '👍', color: '#065f46' },
    ],
    collectHint: 'לחץ/י על כל מחווה כדי "לצלם" דוגמאות לאימון',
  },
  face: {
    title: 'מזהה הבעות פנים',
    classes: [
      { id: 'happy',     label: 'שמח',    emoji: '😊', color: '#7c3aed' },
      { id: 'neutral',   label: 'ניטרלי', emoji: '😐', color: '#0369a1' },
      { id: 'surprised', label: 'מופתע',  emoji: '😮', color: '#065f46' },
    ],
    collectHint: 'לחץ/י על כל הבעה כדי "לצלם" דוגמאות לאימון',
  },
}

const MIN_PER_CLASS = 5
const GOOD_PER_CLASS = 25

function calcAccuracy(counts, numClasses) {
  const vals = Object.values(counts)
  const total = vals.reduce((s, v) => s + v, 0)
  const min = Math.min(...vals)
  if (total === 0) return 0
  const avg = total / numClasses
  const balance = Math.min(1, min / Math.max(1, avg))
  const amount = Math.min(1, min / GOOD_PER_CLASS)
  return Math.round(48 + amount * 44 + balance * 6)
}

export default function TeachableSim({ preset = 'gesture', onComplete }) {
  const cfg = PRESETS[preset] || PRESETS.gesture
  const { classes, collectHint, title } = cfg

  const [phase, setPhase]     = useState('collect') // collect | training | result | test | done
  const [counts, setCounts]   = useState(() => Object.fromEntries(classes.map(c => [c.id, 0])))
  const [flash, setFlash]     = useState(null)
  const [progress, setProgress] = useState(0)
  const [accuracy, setAccuracy] = useState(null)
  const [round, setRound]     = useState(1)
  const [testPreds, setTestPreds] = useState([])
  const [testIdx, setTestIdx] = useState(0)
  const trainingRef = useRef(false)

  const total    = Object.values(counts).reduce((s, v) => s + v, 0)
  const minCount = Math.min(...Object.values(counts))
  const canTrain = minCount >= MIN_PER_CLASS

  const addExample = (id) => {
    if (phase !== 'collect') return
    setCounts(c => ({ ...c, [id]: c[id] + 1 }))
    setFlash(id)
    setTimeout(() => setFlash(null), 200)
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
        const acc = calcAccuracy(counts, classes.length)
        setAccuracy(acc)
        setPhase('result')
      }
    }, 55)
  }

  const addMore = () => {
    setCounts(c => Object.fromEntries(Object.entries(c).map(([k, v]) => [k, v + 20])))
    setRound(2)
    setAccuracy(null)
    setPhase('collect')
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

  // ── Collect ───────────────────────────────────────────────────────────────
  if (phase === 'collect') {
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
          <span style={{ fontSize: '1.4rem' }}>🤖</span>
          <h3>{title}</h3>
          {round === 2 && <span className="pill-counter">סיבוב 2</span>}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '1rem' }}>
          {round === 2
            ? `הוספנו 20 דוגמאות אוטומטיות לכל קטגוריה. לחץ/י עוד כמה ← אמן/י מחדש.`
            : collectHint + `. לפחות ${MIN_PER_CLASS} לכל קטגוריה.`}
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.25rem' }}>
          {classes.map(cls => (
            <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <button
                onClick={() => addExample(cls.id)}
                style={{
                  flex: 1, padding: '0.7rem 0.9rem',
                  background: flash === cls.id ? cls.color : 'var(--c-surface)',
                  border: `2px solid ${cls.color}`,
                  borderRadius: 'var(--radius-s)',
                  color: flash === cls.id ? '#fff' : 'inherit',
                  fontFamily: 'var(--font)', fontWeight: 700, fontSize: '1rem',
                  cursor: 'pointer', transition: 'all 0.12s',
                  transform: flash === cls.id ? 'scale(0.96)' : 'scale(1)',
                }}
              >
                {cls.emoji} {cls.label}
              </button>
              <span style={{
                minWidth: 44, textAlign: 'center', fontWeight: 800, fontSize: '1.05rem',
                color: counts[cls.id] >= MIN_PER_CLASS ? cls.color : 'var(--c-muted)',
              }}>
                {counts[cls.id]}{counts[cls.id] >= MIN_PER_CLASS ? ' ✓' : ''}
              </span>
              <div style={{ width: 56, height: 8, background: 'var(--c-border)', borderRadius: 99, overflow: 'hidden' }}>
                <div style={{
                  height: '100%', borderRadius: 99, background: cls.color,
                  width: `${Math.min(100, (counts[cls.id] / GOOD_PER_CLASS) * 100)}%`,
                  transition: 'width 0.2s',
                }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ fontSize: '0.77rem', color: 'var(--c-muted)', marginBottom: '0.75rem' }}>
          סה"כ {total} דוגמאות
          {!canTrain && ` — חסרות ${(MIN_PER_CLASS - minCount)} לקטגוריה הנמוכה`}
        </div>

        <button
          className="btn btn-primary btn-lg"
          disabled={!canTrain}
          onClick={runTraining}
          style={{ width: '100%' }}
        >
          {canTrain ? '🧠 אמן/י מודל ←' : `צריך/ה עוד ${MIN_PER_CLASS - minCount} דוגמאות`}
        </button>
      </div>
    )
  }

  // ── Training ───────────────────────────────────────────────────────────────
  if (phase === 'training') {
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem', animation: 'float 0.8s ease-in-out infinite' }}>🧠</div>
        <h3>מאמן/ת את המודל...</h3>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          מחפש/ת דפוסים ב-{total} דוגמאות
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
          {good ? '✅' : '⚠️'} דיוק המודל: <span style={{ color: good ? 'var(--c-success)' : '#f59e0b' }}>{accuracy}%</span>
        </h3>

        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ height: 18, background: 'var(--c-border)', borderRadius: 99, overflow: 'hidden' }}>
            <div style={{
              height: '100%', borderRadius: 99,
              width: `${accuracy}%`,
              background: accuracy >= 80 ? '#10b981' : accuracy >= 65 ? '#f59e0b' : '#ef4444',
              transition: 'width 1s cubic-bezier(0.34,1.2,0.64,1)',
            }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.7rem', color: 'var(--c-muted)', marginTop: '0.25rem' }}>
            <span>0%</span><span>50%</span><span>75%</span><span>100%</span>
          </div>
        </div>

        <div className={`feedback-box ${good ? 'feedback-success' : 'feedback-warn'}`} style={{ fontSize: '0.85rem', marginBottom: '1rem' }}>
          {good
            ? `👍 ${minCount} דוגמאות לכל קטגוריה הספיקו למודל טוב!`
            : `🤔 ${minCount} דוגמאות לקטגוריה — המודל מבולבל. נסה/י להוסיף הרבה יותר!`}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          {round === 1 && (
            <button className="btn btn-primary btn-lg" onClick={addMore} style={{ width: '100%' }}>
              ➕ הוסף/י הרבה יותר דוגמאות ← ראה/י מה משתנה
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
        <div key={testIdx} style={{ fontSize: '4.5rem', margin: '0.75rem 0', animation: 'cardIn 0.25s ease' }}>
          {pred.actual.emoji}
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
          הראינו למודל: <strong>{pred.actual.label}</strong>
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem', marginBottom: '1rem', textAlign: 'right' }}>
          {classes.map(cls => {
            const isPred = cls.id === pred.predicted.id
            const conf = isPred
              ? Math.round(accuracy * 0.88 + Math.random() * 8)
              : Math.round((100 - accuracy) / (classes.length - 1) * (0.7 + Math.random() * 0.6))
            return (
              <div key={cls.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span style={{ fontSize: '0.8rem', minWidth: 72, textAlign: 'right' }}>{cls.emoji} {cls.label}</span>
                <div style={{ flex: 1, height: 10, background: 'var(--c-border)', borderRadius: 99, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${Math.min(99, conf)}%`, background: isPred ? cls.color : '#6b7280', borderRadius: 99, transition: 'width 0.5s 0.1s' }} />
                </div>
                <span style={{ fontSize: '0.75rem', fontWeight: isPred ? 800 : 400, color: isPred ? cls.color : 'var(--c-muted)', minWidth: 34 }}>
                  {Math.min(99, conf)}%
                </span>
              </div>
            )
          })}
        </div>

        <div style={{ fontWeight: 700, fontSize: '1rem', color: pred.correct ? 'var(--c-success)' : 'var(--c-danger)', marginBottom: '0.75rem' }}>
          {pred.correct ? `✅ זיהה/תה נכון: ${pred.actual.label}` : `❌ בלבל עם: ${pred.predicted.emoji} ${pred.predicted.label}`}
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
          ? 'מעולה! נתונים מאוזנים ומגוונים = מודל חזק. זה בדיוק הסוד של AI טוב.'
          : 'גם עם פחות דוגמאות המודל עובד — אבל יותר נתונים תמיד שווה יותר דיוק.'}
      </p>
    </div>
  )
}
