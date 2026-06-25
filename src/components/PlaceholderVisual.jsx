export default function PlaceholderVisual({ visual }) {
  if (visual.type === 'youtube') {
    return (
      <div style={{ width: '100%' }}>
        <div className="yt-wrapper">
          <iframe
            src={`https://www.youtube.com/embed/${visual.videoId}?rel=0&modestbranding=1&hl=he`}
            title={visual.alt}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
        <p style={{ marginTop: '0.5rem', fontSize: '0.78rem', color: 'var(--c-muted)', textAlign: 'center' }}>
          🎬 {visual.alt}
        </p>
      </div>
    )
  }

  if (visual.type === 'external-tool') {
    return (
      <div style={{
        background: 'var(--c-bg)', borderRadius: 'var(--radius)',
        border: '2px solid var(--c-border)', padding: '1.25rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '0.4rem' }}>{visual.icon || '🎮'}</div>
        <div style={{ fontWeight: 800, fontSize: '1.1rem', marginBottom: '0.35rem' }}>{visual.name}</div>
        <p style={{ color: 'var(--c-muted)', fontSize: '0.85rem', lineHeight: 1.6, marginBottom: '0.6rem' }}>
          {visual.description}
        </p>
        {visual.instructions && (
          <div style={{ fontSize: '0.78rem', color: 'var(--c-muted)', background: 'rgba(168,85,247,0.07)', borderRadius: 'var(--radius-s)', padding: '0.5rem 0.75rem', marginBottom: '0.75rem', border: '1px solid rgba(168,85,247,0.2)' }}>
            💡 {visual.instructions}
          </div>
        )}
        <a href={visual.url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button className="btn btn-primary">פתח/י {visual.name} ←</button>
        </a>
      </div>
    )
  }

  if (visual.type === 'diagram' && visual.diagramKey === 'bias') {
    return <BiasDiagram alt={visual.alt} />
  }

  const query = encodeURIComponent(visual.searchQuery || visual.alt || 'artificial intelligence')
  return (
    <div style={{ width: '100%' }}>
      <img
        src={`https://source.unsplash.com/800x400/?${query}`}
        alt={visual.alt}
        style={{ width: '100%', borderRadius: 'var(--radius-s)', display: 'block', objectFit: 'cover', maxHeight: 280 }}
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div className="placeholder-visual" style={{ display: 'none' }}>
        <div className="ph-icon">🖼️</div>
        <div className="ph-label">{visual.alt}</div>
      </div>
    </div>
  )
}

  const query = encodeURIComponent(visual.searchQuery || visual.alt || 'artificial intelligence')
  return (
    <div style={{ width: '100%' }}>
      <img
        src={`https://source.unsplash.com/800x400/?${query}`}
        alt={visual.alt}
        style={{ width: '100%', borderRadius: 'var(--radius-s)', display: 'block', objectFit: 'cover', maxHeight: 280 }}
        loading="lazy"
        onError={e => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex' }}
      />
      <div className="placeholder-visual" style={{ display: 'none' }}>
        <div className="ph-icon">🖼️</div>
        <div className="ph-label">{visual.alt}</div>
      </div>
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
