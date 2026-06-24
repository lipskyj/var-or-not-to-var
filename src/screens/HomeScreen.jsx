import CompetencyTag from '../components/CompetencyTag.jsx'

export default function HomeScreen({ units, progress, submissions, onSelectUnit }) {
  const unitIds = units.map(u => u.id)
  const totalComplete = unitIds.filter(id => progress[id]?.phase === 'complete').length
  const pct = Math.round((totalComplete / units.length) * 100)

  return (
    <div style={{ paddingBottom: '3rem' }}>
      {/* Hero */}
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5, #7c3aed)',
        color: '#fff', padding: '2.5rem 1rem 2rem', textAlign: 'center',
      }}>
        <div className="container">
          <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>🤖</div>
          <h1 style={{ color: '#fff' }}>AI בשבילי</h1>
          <p style={{ opacity: 0.85, marginTop: '0.4rem', fontSize: '1.05rem' }}>
            קורס אוריינות בינה מלאכותית — כיתה ז׳
          </p>
          <div style={{ marginTop: '1.5rem', maxWidth: 320, margin: '1.5rem auto 0' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', opacity: 0.85, marginBottom: '0.4rem' }}>
              <span>ההתקדמות שלי</span>
              <span>{totalComplete} / {units.length} יחידות</span>
            </div>
            <div className="progress-bar-track" style={{ background: 'rgba(255,255,255,0.3)' }}>
              <div className="progress-bar-fill" style={{ width: `${pct}%`, background: '#a5f3fc' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Unit list */}
      <div className="container" style={{ marginTop: '1.5rem' }}>
        <h2 style={{ marginBottom: '1rem' }}>יחידות הקורס</h2>
        <div className="stack" style={{ '--gap': '0.75rem' }}>
          {units.map((unit, i) => {
            const isComplete = progress[unit.id]?.phase === 'complete'
            const isUnlocked = i === 0 || progress[units[i - 1].id]?.phase === 'complete'
            const inProgress = !isComplete && progress[unit.id]?.phase

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
                <div>
                  <div className="unit-num">יחידה {i + 1}</div>
                  <div className="unit-emoji">{unit.emoji}</div>
                </div>
                <div className="unit-info">
                  <div className="unit-title">{unit.title}</div>
                  <div className="unit-summary">{unit.summary}</div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', marginTop: '0.4rem' }}>
                    {unit.competencies.map(c => <CompetencyTag key={c} type={c} />)}
                  </div>
                </div>
                <div className="unit-status">
                  {!isUnlocked ? '🔒' : isComplete ? '✅' : inProgress ? '▶️' : '○'}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
