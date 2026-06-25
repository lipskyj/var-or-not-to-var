import CompetencyTag from '../components/CompetencyTag.jsx'

const UNIT_GRADIENTS = [
  'linear-gradient(135deg,#4f46e5,#7c3aed)',
  'linear-gradient(135deg,#db2777,#9333ea)',
  'linear-gradient(135deg,#0284c7,#0891b2)',
  'linear-gradient(135deg,#059669,#0d9488)',
  'linear-gradient(135deg,#d97706,#dc2626)',
  'linear-gradient(135deg,#7c3aed,#2563eb)',
  'linear-gradient(135deg,#be185d,#9333ea)',
  'linear-gradient(135deg,#0369a1,#0891b2)',
  'linear-gradient(135deg,#065f46,#0d9488)',
  'linear-gradient(135deg,#92400e,#b45309)',
  'linear-gradient(135deg,#6d28d9,#db2777)',
  'linear-gradient(135deg,#1d4ed8,#4f46e5)',
]

export default function HomeScreen({ units, progress, onSelectUnit }) {
  const totalComplete = units.filter(u => progress[u.id]?.phase === 'complete').length
  const pct = Math.round((totalComplete / units.length) * 100)

  return (
    <div style={{ paddingBottom: '4rem' }}>
      {/* Hero */}
      <div className="hero">
        <div className="container">
          <div className="hero-emoji">🤖</div>
          <h1>AI בשבילי</h1>
          <p style={{ color: 'rgba(255,255,255,0.6)', marginTop: '0.4rem', fontSize: '1rem' }}>
            קורס אוריינות בינה מלאכותית — כיתה ז׳
          </p>

          {/* Progress */}
          <div style={{ maxWidth: 320, margin: '1.75rem auto 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', marginBottom: '0.5rem' }}>
              <span>ההתקדמות שלי</span>
              <span style={{ color: '#c084fc', fontWeight: 700 }}>{totalComplete} / {units.length}</span>
            </div>
            <div className="progress-bar-track">
              <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
            </div>
            {totalComplete > 0 && (
              <p style={{ textAlign: 'center', marginTop: '0.5rem', fontSize: '0.78rem', color: 'rgba(255,255,255,0.4)' }}>
                {pct}% הושלם — {totalComplete === units.length ? '🎉 סיימת את הקורס!' : 'המשך/י כך!'}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Unit grid */}
      <div className="container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '1.75rem', marginBottom: '0.25rem' }}>
          <h2 style={{ flex: 1 }}>יחידות הקורס</h2>
          <span className="pill-counter">{units.length} יחידות</span>
        </div>

        <div className="unit-grid">
          {units.map((unit, i) => {
            const isComplete = progress[unit.id]?.phase === 'complete'
            const isUnlocked = true
            const inProgress = !isComplete && !!progress[unit.id]?.phase
            const grad = isComplete
              ? 'linear-gradient(135deg,#065f46,#047857)'
              : UNIT_GRADIENTS[i % UNIT_GRADIENTS.length]

            return (
              <div
                key={unit.id}
                className={`unit-card ${!isUnlocked ? 'locked' : ''} ${isComplete ? 'complete' : ''}`}
                onClick={() => isUnlocked && onSelectUnit(unit.id)}
                role="button"
                tabIndex={isUnlocked ? 0 : -1}
                onKeyDown={e => e.key === 'Enter' && isUnlocked && onSelectUnit(unit.id)}
                aria-label={`יחידה ${i + 1}: ${unit.title}${!isUnlocked ? ' (נעולה)' : ''}`}
              >
                {/* Colored header */}
                <div className="unit-card-header" style={{ background: grad }}>
                  <div>
                    <div className="unit-num">יחידה {i + 1}</div>
                    <div className="unit-emoji" style={{ marginTop: '0.15rem' }}>{unit.emoji}</div>
                  </div>
                  <div className="unit-status" style={{ fontSize: '1.4rem' }}>
                    {!isUnlocked ? '🔒' : isComplete ? '✅' : inProgress ? '▶️' : ''}
                  </div>
                </div>

                {/* Body */}
                <div className="unit-card-body">
                  <div className="unit-title">{unit.title}</div>
                  <div className="unit-summary" style={{ marginTop: '0.3rem' }}>{unit.summary}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.6rem' }}>
                    {unit.competencies.map(c => <CompetencyTag key={c} type={c} />)}
                  </div>
                  <div style={{ marginTop: '0.6rem', fontSize: '0.72rem', color: 'var(--c-muted)' }}>
                    ⏱ {unit.duration}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
