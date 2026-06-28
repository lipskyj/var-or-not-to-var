import { useState } from 'react'

// Pollinations seeds chosen for the clearest chihuahua/muffin look
const ROUNDS = [
  {
    prompt: 'single blueberry muffin close-up, food photography, white background, blue blueberries on top',
    seed: 1101, answer: 'muffin', label: 'מאפה', emoji: '🧁',
    hint: 'האוכמניות — זה מאפה! אבל הצבע החום הזה... בדיוק כמו פרווה.',
  },
  {
    prompt: 'chihuahua puppy face extreme close-up, big dark eyes, tan brown fur, white background',
    seed: 2202, answer: 'dog', label: 'כלבלב', emoji: '🐶',
    hint: 'זה כלבלב! העיניים הגדולות והאף הקטן — אבל מרחוק זה ממש דומה למאפה.',
  },
  {
    prompt: 'blueberry muffin top view, brown textured top, two blueberries, macro photography',
    seed: 3303, answer: 'muffin', label: 'מאפה', emoji: '🧁',
    hint: 'מאפה. ה"עיניים" הן אוכמניות. AI ראה עיניים כהות על רקע חום — אותו דבר.',
  },
  {
    prompt: 'chihuahua dog face close-up, round head, shiny dark eyes, beige fur, studio lighting',
    seed: 4404, answer: 'dog', label: 'כלבלב', emoji: '🐶',
    hint: 'כלבלב. הראש העגול, הפרווה — מהכישורים שAI מחפש. מאוד דומה לצלחת מאפין.',
  },
  {
    prompt: 'chihuahua face extremely close, fur texture looks like muffin top, warm tones',
    seed: 5505, answer: 'dog', label: 'כלבלב', emoji: '🐶',
    hint: 'כלבלב — קשה, נכון? מרקם הפרווה בחום חם הוא בדיוק המלכודת.',
  },
  {
    prompt: 'blueberry muffin close up side view, golden brown crust, dark round spots like eyes',
    seed: 6606, answer: 'muffin', label: 'מאפה', emoji: '🧁',
    hint: 'מאפה! "הנקודות הכהות" הן אוכמניות — אבל AI רואה "עיניים + חום = חתול?"',
  },
]

function PollinationsImg({ prompt, seed, style }) {
  const [loaded, setLoaded] = useState(false)
  const src = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=300&height=300&nologo=true&seed=${seed}`
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '1', ...style }}>
      {!loaded && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
          justifyContent: 'center', background: 'var(--c-bg)', borderRadius: 'var(--radius-s)',
          animation: 'shimmer 1.8s infinite',
          backgroundImage: 'linear-gradient(90deg,rgba(168,85,247,.06) 25%,rgba(168,85,247,.14) 50%,rgba(168,85,247,.06) 75%)',
          backgroundSize: '200% 100%',
        }}>
          <span style={{ fontSize: '2rem' }}>🔄</span>
        </div>
      )}
      <img
        src={src}
        alt={prompt}
        onLoad={() => setLoaded(true)}
        style={{
          width: '100%', height: '100%', objectFit: 'cover',
          borderRadius: 'var(--radius-s)', display: loaded ? 'block' : 'none',
        }}
      />
    </div>
  )
}

export default function MuffinOrDog({ onComplete }) {
  const [idx, setIdx] = useState(0)
  const [chosen, setChosen] = useState(null)
  const [score, setScore] = useState(0)
  const [done, setDone] = useState(false)

  const round = ROUNDS[idx]
  const answered = chosen !== null
  const correct = chosen === round.answer

  const pick = (val) => {
    if (answered) return
    setChosen(val)
    if (val === round.answer) setScore(s => s + 1)
  }

  const next = () => {
    const n = idx + 1
    if (n >= ROUNDS.length) { setDone(true); if (onComplete) onComplete(); return }
    setIdx(n)
    setChosen(null)
  }

  if (done) {
    return (
      <div className="card" style={{ maxWidth: 460, margin: '0 auto', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🧠</div>
        <h3>ניקדת {score}/{ROUNDS.length}</h3>
        <div className="feedback-box feedback-warn" style={{ marginTop: '1rem', fontSize: '0.88rem', lineHeight: 1.7, textAlign: 'right' }}>
          <strong>אז מה הקשר לAI?</strong>
          <br />
          מודל שאומן רק על תמונות מלמעלה יתבלבל בדיוק כמוך. הוא לא "מבין" מאפה — הוא מזהה:
          <em> חום + עגול + כתמים כהים = קטגוריה</em>.
          <br /><br />
          כשחתול שחור ולבן עם כתמים כהות נמצא ליד — אותו פיצ'ר → בלבול.
          <strong> זה לא באג — זה מה שנתוני האימון לימדו אותו.</strong>
        </div>
      </div>
    )
  }

  return (
    <div className="card" style={{ maxWidth: 460, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.3rem' }}>🤔</span>
        <h3>מאפה או כלבלב?</h3>
        <span className="pill-counter" style={{ marginRight: 'auto' }}>{idx + 1}/{ROUNDS.length}</span>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.82rem', marginBottom: '0.75rem' }}>
        אתה/ן ה-AI — מה רואים בתמונה?
      </p>

      <PollinationsImg prompt={round.prompt} seed={round.seed} style={{ marginBottom: '0.75rem', borderRadius: 'var(--radius-s)', overflow: 'hidden' }} />

      {!answered ? (
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => pick('muffin')}
            style={{ flex: 1, fontSize: '1.2rem' }}
          >
            🧁 מאפה
          </button>
          <button
            className="btn btn-outline btn-lg"
            onClick={() => pick('dog')}
            style={{ flex: 1, fontSize: '1.2rem' }}
          >
            🐶 כלבלב
          </button>
        </div>
      ) : (
        <>
          <div className={`feedback-box ${correct ? 'feedback-success' : 'feedback-error'}`} style={{ marginBottom: '0.75rem', fontSize: '0.88rem', lineHeight: 1.6 }}>
            {correct ? `✅ נכון! ${round.emoji} ${round.hint}` : `❌ זה ${round.label}! ${round.hint}`}
          </div>
          <button className="btn btn-primary btn-lg" onClick={next} style={{ width: '100%' }}>
            {idx < ROUNDS.length - 1 ? 'הבא ←' : 'ראה/י מסכם ←'}
          </button>
        </>
      )}
    </div>
  )
}
