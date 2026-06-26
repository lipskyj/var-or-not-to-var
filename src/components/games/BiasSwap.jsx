import { useState, useEffect } from 'react'
import { askGemini } from '../../api/gemini.js'

const SCENARIOS = [
  {
    id: 1,
    topic: 'מגדר ומקצוע',
    templateBefore: 'ה',
    swappable: [
      { id: 'doctor_m', text: 'רופא', gender: 'm' },
      { id: 'doctor_f', text: 'רופאה', gender: 'f' },
    ],
    templateAfter: ' נכנס/ה לחדר ואמר/ה לחולה:',
    completions: {
      doctor_m: '"תרגיש חופשי לשאול אותי כל שאלה. בוא נסתכל על הבדיקות..."',
      doctor_f: '"תרגישי חופשייה לשאול. האם את צריכה גם ייעוץ תזונה?"',
    },
    insight: 'לשני המשפטים יש את אותה פתיחה — רק המגדר שונה. אבל ה-AI הציע לרופאה לדון בתזונה ולרופא לדון בבדיקות. זה לא חוק — זה הטיה שנלמדה מנתונים.',
  },
  {
    id: 2,
    topic: 'גיל ועבודה',
    templateBefore: 'המועמד/ת בן/בת ה-',
    swappable: [
      { id: 'young', text: '24' },
      { id: 'old', text: '58' },
    ],
    templateAfter: ' הגיע/ה לראיון עבודה בהייטק. המראיין חשב שהוא:',
    completions: {
      young: '"מלא אנרגיה ורעיונות חדשים, בטח ילמד מהר. אולי קצת חסר ניסיון."',
      old: '"מנוסה ויציב, אבל האם יסתגל לקצב הטכנולוגי? קשה לדעת."',
    },
    insight: 'שני אנשים, אותה בקשת עבודה. ה-AI ייחס לצעיר "אנרגיה" ולבוגר "ניסיון" — אבל גם "ספק". זו הטיית גיל (ageism) שנלמדה מטקסטים אנושיים.',
  },
  {
    id: 3,
    topic: 'שם ותרבות',
    templateBefore: 'עובד/ת בשם ',
    swappable: [
      { id: 'name_he', text: 'נועה' },
      { id: 'name_en', text: "Emily" },
      { id: 'name_ar', text: 'פאטמה' },
    ],
    templateAfter: ' ביקש/ה קידום. הבוס כתב:',
    completions: {
      name_he: '"נועה מראה פוטנציאל מצוין. אשקול אותה ברצינות."',
      name_en: '"Emily has great potential and leadership qualities. Will definitely consider."',
      name_ar: '"פאטמה עובדת קשה, אבל צריכה לשפר את כישורי התקשורת שלה."',
    },
    insight: 'שם = זהות תרבותית. ה-AI הפיק תגובות שונות לאותה בקשה רק בגלל השם. זה המחיש כיצד הטיה בנתוני אימון → הטיה בתוצאות.',
  },
]

const COLORS = ['#a855f7', '#3b82f6', '#10b981', '#f59e0b']

export default function BiasSwap({ onComplete }) {
  const [sceneIdx, setSceneIdx] = useState(0)
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)
  const [seen, setSeen] = useState(0)
  const [aiText, setAiText] = useState(null)
  const [loading, setLoading] = useState(false)

  const scene = SCENARIOS[sceneIdx]
  const isLast = sceneIdx === SCENARIOS.length - 1

  useEffect(() => {
    if (!selected) { setAiText(null); return }
    let live = true
    setLoading(true)
    setAiText(null)
    const prompt = `השלם את המשפט הבא בעברית, ציטוט ישיר של מה שנאמר, 1-2 משפטים בלבד:\n"${scene.templateBefore}${selected.text}${scene.templateAfter}"`
    askGemini(prompt, {
      system: 'אתה משלים משפטים בעברית. כתוב רק ציטוט ישיר — מה הדמות אמרה, בגרשיים. ללא הסברים נוספים.',
      maxTokens: 80,
      temperature: 0.9,
    })
      .then(t => { if (live) setAiText(t) })
      .catch(() => { if (live) setAiText(scene.completions[selected.id]) })
      .finally(() => { if (live) setLoading(false) })
    return () => { live = false }
  }, [selected?.id, sceneIdx])

  const pick = (opt) => {
    setSelected(opt)
    setRevealed(false)
  }

  const reveal = () => setRevealed(true)

  const next = () => {
    const n = seen + 1
    setSeen(n)
    if (n >= 2 && onComplete) onComplete()
    if (!isLast) {
      setSceneIdx(i => i + 1)
      setSelected(null)
      setRevealed(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: 540, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>🔄</span>
        <h3>מחליף/ת מילה — משנה/ת עולם</h3>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        שנה/י <strong>מילה אחת</strong> במשפט ← ראה/י איך ה-AI ממשיך אחרת. זו הטיה.
      </p>

      <div style={{ display: 'flex', gap: '0.35rem', marginBottom: '1rem' }}>
        {SCENARIOS.map((s, i) => (
          <div key={s.id} style={{
            flex: 1, height: 4, borderRadius: 99,
            background: i < sceneIdx ? 'var(--grad)' : i === sceneIdx ? '#a855f7' : 'var(--c-border)',
          }} />
        ))}
      </div>

      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.5rem', letterSpacing: '0.05em' }}>
        📍 {scene.topic}
      </div>

      <div style={{ background: 'var(--c-bg)', borderRadius: 'var(--radius-s)', padding: '1rem', border: '2px solid var(--c-border)', marginBottom: '0.75rem', fontSize: '1rem', lineHeight: 2, textAlign: 'right' }}>
        <span>{scene.templateBefore}</span>
        {scene.swappable.map((opt, i) => (
          <button
            key={opt.id}
            onClick={() => pick(opt)}
            style={{
              display: 'inline-block', margin: '0 0.3rem',
              padding: '0.1rem 0.6rem', borderRadius: 99,
              border: `2px solid ${selected?.id === opt.id ? COLORS[i] : 'var(--c-border)'}`,
              background: selected?.id === opt.id ? `${COLORS[i]}22` : 'transparent',
              color: selected?.id === opt.id ? COLORS[i] : 'var(--c-muted)',
              fontWeight: 700, cursor: 'pointer', fontSize: '0.95rem',
              transition: 'all 0.15s',
            }}
          >
            {opt.text}
          </button>
        ))}
        <span>{scene.templateAfter}</span>
      </div>

      {!selected && (
        <div style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '0.75rem', animation: 'float 2s ease-in-out infinite' }}>
          ↑ לחץ/י על אחת המילות המסגרת ↑
        </div>
      )}

      {selected && (
        <div style={{ animation: 'cardIn 0.3s ease', marginBottom: '0.75rem' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            🤖 ה-AI ממשיך כך:
            {loading && <span style={{ fontSize: '0.65rem', color: '#a855f7', animation: 'float 1s ease-in-out infinite' }}>● ● ●</span>}
          </div>
          <div style={{
            background: 'rgba(168,85,247,0.07)', borderRadius: 'var(--radius-s)',
            padding: '0.85rem 1rem', border: '1px solid rgba(168,85,247,0.25)',
            fontSize: '0.95rem', lineHeight: 1.7, fontStyle: 'italic',
            minHeight: '3.5rem',
          }}>
            {loading
              ? <span style={{ opacity: 0.4 }}>⏳ ה-AI מייצר תגובה...</span>
              : (aiText || scene.completions[selected.id])}
          </div>

          {!loading && scene.swappable.length > 1 && (
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
              {scene.swappable.filter(o => o.id !== selected.id).map((opt) => (
                <button
                  key={opt.id}
                  className="btn btn-outline btn-sm"
                  style={{ fontSize: '0.78rem' }}
                  onClick={() => pick(opt)}
                >
                  ← נסה/י עם "{opt.text}"
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {selected && !loading && !revealed && (
        <button className="btn btn-outline" onClick={reveal} style={{ width: '100%', marginBottom: '0.5rem' }}>
          מה המסקנה? ←
        </button>
      )}

      {revealed && (
        <div style={{ animation: 'cardIn 0.35s ease' }}>
          <div className="feedback-box feedback-error" style={{ fontSize: '0.85rem', marginBottom: '0.75rem', borderColor: 'rgba(248,113,113,0.3)' }}>
            ⚠️ {scene.insight}
          </div>
          <button className="btn btn-primary btn-lg" onClick={next} style={{ width: '100%' }}>
            {isLast ? '✅ ראיתי הטיה!' : 'דוגמה הבאה ←'}
          </button>
        </div>
      )}
    </div>
  )
}
