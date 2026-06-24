import { COURSE } from '../content/course.js'

// ── SEEDED SAMPLE ENTRIES ─────────────────────────────────────────────────────
// Replace this array with a real API call to shared storage when ready.
// Each entry: { unitId, text, emoji }
const SEED_ENTRIES = [
  { unitId: 'unit-5', text: 'הוספתי 40 דוגמאות לקטגוריה של מופתע וזה עזר מאוד. הדיוק עלה ל-88%!', emoji: '😮' },
  { unitId: 'unit-5', text: 'גיליתי שאם אני מחייך ממש גדול המודל מזהה אותי בקלות. מגוון בתמונות חשוב!', emoji: '😊' },
  { unitId: 'unit-5', text: 'בהתחלה כל הקטגוריות קיבלו רק 5 דוגמאות — המודל בכלל לא עבד. אחרי 30 לכל אחת — עבד מצוין!', emoji: '🧪' },
  { unitId: 'unit-7', text: 'הבנתי שאם אני מציין "תפקיד" ב-prompt — התשובות הרבה יותר טובות.', emoji: '✏️' },
  { unitId: 'unit-4', text: 'ממש מגניב שמלך ומלכה כל כך קרובים במפה, אבל עץ רחוק מהם.', emoji: '🗺️' },
  { unitId: 'unit-5', text: 'ניסיתי לאמן מודל על כלבים וחתולים — הטיפ על מגוון עזר לי להגיע ל-92%', emoji: '🐱' },
]

export default function GalleryScreen({ submissions }) {
  const unitMap = Object.fromEntries(COURSE.units.map(u => [u.id, u]))

  // Merge seeded entries with real submissions
  const realEntries = Object.entries(submissions).map(([unitId, sub]) => ({
    unitId,
    text: sub.reflection,
    emoji: unitMap[unitId]?.emoji ?? '💬',
    isMe: true,
    submittedAt: sub.submittedAt,
  }))

  const allEntries = [...realEntries, ...SEED_ENTRIES.map(e => ({ ...e, isMe: false }))]

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <h2 style={{ marginBottom: '0.25rem' }}>🖼️ גלריית תלמידים</h2>
      <p style={{ color: 'var(--c-muted)', marginBottom: '1rem', fontSize: '0.9rem' }}>
        ראה/י מה כתבו חברים/ות לכיתה — לקבלת השראה.
      </p>

      {/* filter by unit */}
      <div style={{ marginBottom: '1rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
        {COURSE.units.map(u => (
          <span key={u.id} style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', borderRadius: 999, background: 'var(--c-primary-l)', color: 'var(--c-primary)', fontWeight: 700 }}>
            {u.emoji} {u.title}
          </span>
        ))}
      </div>

      {/* Note on data */}
      <div className="feedback-box feedback-warn" style={{ marginBottom: '1.25rem', fontSize: '0.82rem' }}>
        🔌 <strong>לבוני הקורס:</strong> כניסות "ממש" מסומנות "שלי". ה-seed הוא נתוני דמו.
        חבר/י כאן endpoint לשיתוף אמיתי של submissions.
      </div>

      <div className="gallery-grid">
        {allEntries.map((entry, i) => {
          const unit = unitMap[entry.unitId]
          return (
            <div key={i} className="gallery-item" style={{ border: entry.isMe ? '2px solid var(--c-primary)' : 'none' }}>
              <div className="gi-unit">{unit?.emoji ?? ''} {unit?.title ?? entry.unitId} {entry.isMe ? '← שלי ⭐' : ''}</div>
              <div className="gi-text">"{entry.text}"</div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
