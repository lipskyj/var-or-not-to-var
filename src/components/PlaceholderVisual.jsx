export default function PlaceholderVisual({ visual }) {
  if (visual.type === 'diagram' && visual.diagramKey === 'bias') {
    return <BiasDiagram alt={visual.alt} />
  }
  return (
    <div className="placeholder-visual">
      <div className="ph-icon">🖼️</div>
      <div className="ph-label">{visual.alt}</div>
      <details>
        <summary>💡 הוראות לבוני הקורס</summary>
        <p style={{ marginTop: '0.5rem' }}><strong>Prompt לייצור:</strong> {visual.prompt}</p>
        <p style={{ marginTop: '0.5rem' }}><strong>חיפוש:</strong> {visual.searchQuery}</p>
      </details>
    </div>
  )
}

function BiasDiagram({ alt }) {
  return (
    <div className="bias-diagram" aria-label={alt}>
      <div className="bias-row">
        <span>👦🎩 ×100 תמונות</span>
        <span className="bias-arrow">←</span>
        <span>🧠 מודל AI</span>
        <span className="bias-arrow">←</span>
        <span style={{ color: 'var(--c-success)', fontWeight: 700 }}>✅ "ילד"</span>
      </div>
      <div className="bias-row">
        <span>👧🎩 ×0 תמונות</span>
        <span className="bias-arrow">←</span>
        <span>🧠 מודל AI</span>
        <span className="bias-arrow">←</span>
        <span style={{ color: 'var(--c-danger)', fontWeight: 700 }}>❌ "ילד"</span>
      </div>
      <p style={{ marginTop: '0.75rem', fontSize: '0.85rem', color: 'var(--c-muted)' }}>
        כשהנתונים מוטים — המודל מוטה.
      </p>
    </div>
  )
}
