import { COURSE } from '../content/course.js'

export default function JournalScreen({ submissions }) {
  const unitMap = Object.fromEntries(COURSE.units.map(u => [u.id, u]))
  const entries = Object.entries(submissions)

  if (entries.length === 0) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>📓</div>
        <h2>היומן שלי</h2>
        <p style={{ color: 'var(--c-muted)', marginTop: '0.5rem' }}>
          כאן יופיעו כל התיעודים שלך — לאחר שתסיים/י את הדוקומנטציה של כל יחידה.
        </p>
      </div>
    )
  }

  return (
    <div className="container" style={{ paddingTop: '1.5rem', paddingBottom: '3rem' }}>
      <h2 style={{ marginBottom: '0.25rem' }}>📓 היומן שלי</h2>
      <p style={{ color: 'var(--c-muted)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        כל מה שיצרת/ת ושלחת/ת — במקום אחד.
      </p>

      {entries.map(([unitId, sub]) => {
        const unit = unitMap[unitId]
        const date = new Date(sub.submittedAt).toLocaleDateString('he-IL')
        return (
          <div key={unitId} className="journal-entry">
            <div className="journal-meta">
              {unit?.emoji ?? ''} {unit?.title ?? unitId} · {date}
            </div>
            {sub.screenshotDataUrl && (
              <img
                src={sub.screenshotDataUrl}
                alt="צילום מסך שהוגש"
                style={{ maxWidth: '100%', borderRadius: 'var(--radius-s)', marginBottom: '0.75rem', border: '1.5px solid var(--c-border)' }}
              />
            )}
            <p style={{ fontWeight: 600 }}>{sub.reflection}</p>
          </div>
        )
      })}
    </div>
  )
}
