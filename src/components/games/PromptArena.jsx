import { useState } from 'react'

const CHALLENGES = [
  {
    id: 1,
    topic: 'שאלת היסטוריה',
    weak: 'ספר לי על מלחמת העולם',
    weakResponse: 'מלחמת העולם הייתה מלחמה גדולה שהייתה בעולם. הרבה אנשים נפגעו. היא השפיעה על הרבה מדינות.',
    improvers: [
      { id: 'which', label: 'איזו מלחמה?', adds: ' השנייה (1939-1945)', icon: '🔢' },
      { id: 'audience', label: 'לקהל מי?', adds: ', בשביל תלמיד כיתה ז\'', icon: '🎓' },
      { id: 'format', label: 'פורמט?', adds: ', ב-3 נקודות קצרות', icon: '📋' },
      { id: 'focus', label: 'על מה?', adds: ' עם דגש על ישראל ויהודים', icon: '🔍' },
    ],
    buildResponse: (applied) => {
      if (applied.size === 0) return 'מלחמת העולם הייתה מלחמה גדולה שהייתה בעולם...'
      if (applied.size === 1) return 'מלחמת העולם השנייה (1939-1945) הייתה הסכסוך הגדול ביותר בהיסטוריה האנושית, שכלל את רוב מדינות העולם.'
      if (applied.size === 2) return 'מלחמת העולם השנייה — עבור תלמיד כיתה ז\':\nהיא הייתה בין 1939-1945. כ-70 מיליון אנשים נהרגו. גרמניה הנאצית פתחה בה.'
      if (applied.size === 3) return '• 1939-1945: היטלר פלש לפולין ← מדינות אירופה הצטרפו\n• כ-70 מיליון קורבנות — המלחמה ההרסנית בהיסטוריה\n• הסתיימה בכניעת גרמניה ויפן לבעלות הברית'
      return '• השואה: 6 מיליון יהודים נרצחו ע"י הנאצים\n• הישוב בא"י שלח לוחמים לצבא הבריטי — ניסיון להציל יהודים\n• 1945: שחרור מחנות ← הכרת העולם בנחיצות מדינה יהודית → 1948'
    },
  },
  {
    id: 2,
    topic: 'בקשת עזרה',
    weak: 'עזור לי עם שיעורים',
    weakResponse: 'אשמח לעזור לך עם שיעורים. מה אתה צריך?',
    improvers: [
      { id: 'subject', label: 'איזה מקצוע?', adds: ' במתמטיקה — שברים', icon: '📐' },
      { id: 'level', label: 'רמה?', adds: ', כיתה ז\'', icon: '🏫' },
      { id: 'style', label: 'סגנון?', adds: ', הסבר עם דוגמה מהחיים', icon: '🌟' },
      { id: 'tone', label: 'טון?', adds: ', בגישה מעודדת ולא מסובכת', icon: '😊' },
    ],
    buildResponse: (applied) => {
      if (applied.size === 0) return 'אשמח לעזור לך עם שיעורים. מה אתה צריך?'
      if (applied.size === 1) return 'שברים: ½ + ¼ = ? ראשית, צריך מכנה משותף. 2 ו-4, המכנה המשותף הוא 4...'
      if (applied.size === 2) return 'בכיתה ז\' עובדים על שברים. בואי נפתור ½ + ¼ צעד אחר צעד:\n1. מצאי מכנה משותף (4)\n2. המירי: ½ = 2/4\n3. חברי: 2/4 + 1/4 = 3/4 ✓'
      if (applied.size === 3) return 'דמייני שיש לך פיצה! חתכת אותה ל-4 חתיכות.\n• ½ פיצה = 2 חתיכות\n• + ¼ פיצה = עוד חתיכה אחת\n• סה"כ: 3 חתיכות מתוך 4 = 3/4\nזה השבר שלנו! 🍕'
      return '🌟 פיצה לדוגמה:\n½ + ¼ = ? חתכנו ל-4 חתיכות.\n½ = 2 חתיכות, ¼ = 1 חתיכה → 3 חתיכות = 3/4 ✓\n\nאתה יכול לעשות את זה! בכל שבר — תחשוב על פיצה. איזה תרגיל יש לך?'
    },
  },
]

export default function PromptArena({ onComplete }) {
  const [cIdx, setCIdx] = useState(0)
  const [applied, setApplied] = useState(new Set())
  const [extras, setExtras] = useState('')
  const [compared, setCompared] = useState(0)

  const ch = CHALLENGES[cIdx]
  const isLast = cIdx === CHALLENGES.length - 1

  const toggle = (id) => {
    setApplied(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const strongPrompt = ch.weak + ch.improvers.filter(i => applied.has(i.id)).map(i => i.adds).join('')
  const strongResponse = ch.buildResponse(applied)

  const advance = () => {
    const n = compared + 1
    setCompared(n)
    if (n >= 2 && onComplete) onComplete()
    if (!isLast) {
      setCIdx(i => i + 1)
      setApplied(new Set())
    }
  }

  return (
    <div className="card" style={{ maxWidth: 600, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
        <span style={{ fontSize: '1.4rem' }}>⚔️</span>
        <h3>Prompt Arena</h3>
        <span className="pill-counter" style={{ marginRight: 'auto' }}>{cIdx + 1}/{CHALLENGES.length}</span>
      </div>
      <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>
        שדרג/י את ה-prompt החלש ← ראה/י את ההבדל בתשובה בזמן אמת
      </p>

      {/* Topic */}
      <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#a855f7', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
        📍 {ch.topic}
      </div>

      {/* Upgrade chips */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--c-muted)', marginBottom: '0.4rem' }}>הוסף/י לפרומפט:</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {ch.improvers.map(imp => (
            <button
              key={imp.id}
              onClick={() => toggle(imp.id)}
              style={{
                padding: '0.35rem 0.75rem', borderRadius: 99, fontSize: '0.82rem', fontWeight: 600,
                border: `2px solid ${applied.has(imp.id) ? '#10b981' : 'var(--c-border)'}`,
                background: applied.has(imp.id) ? 'rgba(16,185,129,0.15)' : 'transparent',
                color: applied.has(imp.id) ? 'var(--c-success)' : 'var(--c-muted)',
                cursor: 'pointer', transition: 'all 0.15s',
              }}
            >
              {imp.icon} {imp.label} {applied.has(imp.id) ? '✓' : '+'}
            </button>
          ))}
        </div>
      </div>

      {/* Side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginBottom: '0.75rem' }}>
        {/* Weak */}
        <div style={{ background: 'rgba(248,113,113,0.07)', borderRadius: 'var(--radius-s)', padding: '0.75rem', border: '1px solid rgba(248,113,113,0.25)' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#f87171', marginBottom: '0.4rem' }}>❌ Prompt חלש</div>
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: 'var(--c-muted)', marginBottom: '0.5rem', wordBreak: 'break-word' }}>{ch.weak}</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--c-muted)', lineHeight: 1.6, fontStyle: 'italic', borderTop: '1px solid rgba(248,113,113,0.2)', paddingTop: '0.5rem' }}>
            {ch.weakResponse}
          </div>
        </div>

        {/* Strong */}
        <div style={{ background: 'rgba(16,185,129,0.07)', borderRadius: 'var(--radius-s)', padding: '0.75rem', border: `2px solid ${applied.size > 0 ? 'rgba(16,185,129,0.4)' : 'var(--c-border)'}`, transition: 'border-color 0.3s' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: applied.size > 0 ? 'var(--c-success)' : 'var(--c-muted)', marginBottom: '0.4rem' }}>
            {applied.size > 0 ? '✅ Prompt משופר' : '⬜ Prompt משופר'}
          </div>
          <div style={{ fontSize: '0.8rem', fontFamily: 'monospace', color: applied.size > 0 ? 'var(--c-success)' : 'var(--c-muted)', marginBottom: '0.5rem', wordBreak: 'break-word', transition: 'color 0.3s' }}>
            {strongPrompt}
          </div>
          <div style={{ fontSize: '0.78rem', color: applied.size > 0 ? 'var(--c-text)' : 'var(--c-muted)', lineHeight: 1.6, fontStyle: applied.size === 0 ? 'italic' : 'normal', borderTop: `1px solid ${applied.size > 0 ? 'rgba(16,185,129,0.2)' : 'var(--c-border)'}`, paddingTop: '0.5rem', whiteSpace: 'pre-line', transition: 'all 0.4s', animation: applied.size > 0 ? 'cardIn 0.4s ease' : 'none' }}>
            {strongResponse}
          </div>
        </div>
      </div>

      {/* Score */}
      <div style={{ marginBottom: '0.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--c-muted)', marginBottom: '0.3rem' }}>
          <span>כוח ה-Prompt:</span>
          <span style={{ fontWeight: 700, color: applied.size >= 3 ? 'var(--c-success)' : applied.size >= 1 ? '#f59e0b' : 'var(--c-muted)' }}>
            {applied.size === 0 ? 'חלש מאוד' : applied.size === 1 ? 'בינוני' : applied.size === 2 ? 'טוב' : applied.size === 3 ? 'חזק' : 'מושלם! ✨'}
          </span>
        </div>
        <div style={{ height: 8, borderRadius: 99, background: 'var(--c-border)', overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${applied.size / ch.improvers.length * 100}%`, background: 'var(--grad)', transition: 'width 0.4s cubic-bezier(0.34,1.2,0.64,1)', borderRadius: 99 }} />
        </div>
      </div>

      {applied.size >= 2 && (
        <button className="btn btn-primary btn-lg" onClick={advance} style={{ width: '100%' }}>
          {isLast ? '✅ הבנתי את ההבדל!' : 'אתגר הבא ←'}
        </button>
      )}
    </div>
  )
}
