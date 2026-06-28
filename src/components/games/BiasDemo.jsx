import { useState } from 'react'

const WHITE_CATS = [
  { prompt: 'white fluffy cat sitting, studio photo', seed: 11 },
  { prompt: 'white persian cat portrait, professional photo', seed: 22 },
  { prompt: 'white cat face close up, blue eyes', seed: 33 },
  { prompt: 'white kitten playing, cute photo', seed: 44 },
  { prompt: 'white cat lying down, clean background', seed: 55 },
  { prompt: 'white domestic cat standing, side view', seed: 66 },
  { prompt: 'white cat looking up, studio lighting', seed: 77 },
  { prompt: 'fluffy white cat face, green eyes', seed: 88 },
  { prompt: 'white cat portrait, elegant pose', seed: 99 },
]

const TEST_CASES = [
  {
    prompt: 'black cat sitting, green eyes, indoor photo',
    seed: 201,
    label: 'חתול שחור',
    modelSays: '❌ לא חתול',
    modelColor: 'var(--c-danger)',
    reason: 'למד: בהיר + פרוותי = חתול. שחור → לא מתאים → כנראה שלא חתול.',
    isCorrect: false,
  },
  {
    prompt: 'white German shepherd dog sitting, outdoor photo, tongue out',
    seed: 202,
    label: 'כלב לבן',
    modelSays: '🤔 אולי חתול?',
    modelColor: '#f59e0b',
    reason: 'בהיר + פרוותי + ארבע רגליים → הפיצ\'רים מתאימים לנתוני האימון. בלבול!',
    isCorrect: false,
  },
]

function SmallImg({ prompt, seed, size = 76 }) {
  const [loaded, setLoaded] = useState(false)
  const src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=${size * 2}&height=${size * 2}&nologo=true&seed=${seed}`
  return (
    <div style={{ width: size, height: size, borderRadius: 8, overflow: 'hidden', background: 'var(--c-bg)', flexShrink: 0, border: '2px solid var(--c-border)' }}>
      {!loaded && <div style={{ width: '100%', height: '100%', animation: 'shimmer 1.8s infinite', backgroundImage: 'linear-gradient(90deg,rgba(168,85,247,.08) 25%,rgba(168,85,247,.18) 50%,rgba(168,85,247,.08) 75%)', backgroundSize: '200% 100%' }} />}
      <img src={src} alt={prompt} onLoad={() => setLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded ? 'block' : 'none' }} />
    </div>
  )
}

function BigImg({ prompt, seed }) {
  const [loaded, setLoaded] = useState(false)
  const src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=320&height=220&nologo=true&seed=${seed}`
  return (
    <div style={{ width: '100%', borderRadius: 'var(--radius-s)', overflow: 'hidden', background: 'var(--c-bg)', aspectRatio: '320/220', border: '2px solid var(--c-border)' }}>
      {!loaded && <div style={{ width: '100%', height: '100%', animation: 'shimmer 1.8s infinite', backgroundImage: 'linear-gradient(90deg,rgba(168,85,247,.08) 25%,rgba(168,85,247,.18) 50%,rgba(168,85,247,.08) 75%)', backgroundSize: '200% 100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem' }}>🔄</div>}
      <img src={src} alt={prompt} onLoad={() => setLoaded(true)} style={{ width: '100%', height: '100%', objectFit: 'cover', display: loaded ? 'block' : 'none' }} />
    </div>
  )
}

export default function BiasDemo({ onComplete }) {
  const [phase, setPhase] = useState('data') // data | test | done
  const [testIdx, setTestIdx] = useState(0)
  const [guess, setGuess] = useState(null) // 'cat' | 'not-cat'

  const tc = TEST_CASES[testIdx]
  const isLast = testIdx === TEST_CASES.length - 1

  const nextTest = () => {
    if (isLast) { setPhase('done'); if (onComplete) onComplete(); return }
    setTestIdx(i => i + 1)
    setGuess(null)
  }

  // ── Phase: Show training data ─────────────────────────────────────────────
  if (phase === 'data') {
    return (
      <div className="card" style={{ maxWidth: 520, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.3rem' }}>📊</span>
          <h3>נתוני האימון של המודל</h3>
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
          אומנו על 10,000 תמונות של חתולים. כל התמונות נראות כך:
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '0.75rem', justifyContent: 'center' }}>
          {WHITE_CATS.map(({ prompt, seed }) => (
            <SmallImg key={seed} prompt={prompt} seed={seed} size={82} />
          ))}
        </div>

        <div className="feedback-box feedback-warn" style={{ fontSize: '0.82rem', marginBottom: '1rem', lineHeight: 1.6 }}>
          👀 <strong>שים/י לב:</strong> כל החתולים בנתוני האימון הם בהירים. המודל למד:
          <em> "בהיר + פרוותי + אוזניים = חתול".</em>
          <br />מה יקרה כשנציג לו חתול שחור?
        </div>

        <button className="btn btn-primary btn-lg" onClick={() => setPhase('test')} style={{ width: '100%' }}>
          🧪 בחן/י את המודל ←
        </button>
      </div>
    )
  }

  // ── Phase: Test cases ─────────────────────────────────────────────────────
  if (phase === 'test') {
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span style={{ fontSize: '1.3rem' }}>🧪</span>
          <h3>בדיקת המודל</h3>
          <span className="pill-counter" style={{ marginRight: 'auto' }}>{testIdx + 1}/{TEST_CASES.length}</span>
        </div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
          הצגנו למודל: <strong>{tc.label}</strong>. לפי דעתך — מה הוא יגיד?
        </p>

        <BigImg prompt={tc.prompt} seed={tc.seed} />

        {!guess ? (
          <div style={{ display: 'flex', gap: '0.6rem', marginTop: '0.75rem' }}>
            <button className="btn btn-outline btn-lg" onClick={() => setGuess('cat')} style={{ flex: 1 }}>
              🐱 יזהה כחתול
            </button>
            <button className="btn btn-outline btn-lg" onClick={() => setGuess('not-cat')} style={{ flex: 1 }}>
              ❓ יתבלבל
            </button>
          </div>
        ) : (
          <>
            <div style={{ marginTop: '0.75rem', textAlign: 'center' }}>
              <div style={{ fontSize: '0.78rem', color: 'var(--c-muted)', marginBottom: '0.3rem' }}>המודל אומר:</div>
              <div style={{ fontSize: '1.6rem', fontWeight: 900, color: tc.modelColor, marginBottom: '0.5rem', animation: 'cardIn 0.3s ease' }}>
                {tc.modelSays}
              </div>
            </div>
            <div className="feedback-box feedback-error" style={{ fontSize: '0.85rem', lineHeight: 1.7, marginBottom: '0.75rem' }}>
              <strong>למה?</strong> {tc.reason}
            </div>
            <button className="btn btn-primary btn-lg" onClick={nextTest} style={{ width: '100%' }}>
              {isLast ? 'ראה/י סיכום ←' : 'הבא ←'}
            </button>
          </>
        )}
      </div>
    )
  }

  // ── Done ───────────────────────────────────────────────────────────────────
  return (
    <div className="card" style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
      <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🔑</div>
      <h3 style={{ marginBottom: '0.75rem' }}>המסקנה</h3>
      <div className="feedback-box feedback-warn" style={{ textAlign: 'right', fontSize: '0.88rem', lineHeight: 1.8 }}>
        <strong>המודל לא למד "חתול" — הוא למד "בהיר + פרוותי".</strong>
        <br /><br />
        ✅ חתול לבן → זיהה<br />
        ❌ חתול שחור → "לא חתול"<br />
        ⚠️ כלב לבן → "אולי חתול?"
        <br /><br />
        זה לא באג. זה בדיוק מה שנתוני האימון לימדו אותו.
        <strong> Garbage in → Garbage out.</strong>
      </div>
    </div>
  )
}
