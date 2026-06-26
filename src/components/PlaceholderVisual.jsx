import { useState } from 'react'

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

  return <AIIllustration visual={visual} />
}

function AIIllustration({ visual }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  const prompt = visual.prompt || visual.alt || 'artificial intelligence education'
  const aiSrc = `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}?width=800&height=400&nologo=true&seed=7`

  const fallbackQuery = encodeURIComponent(visual.searchQuery || visual.alt || 'artificial intelligence')
  const fallbackSrc = `https://source.unsplash.com/800x400/?${fallbackQuery}`

  return (
    <div style={{ width: '100%', position: 'relative' }}>
      {/* Loading shimmer shown until image loads */}
      {!loaded && !failed && (
        <div style={{
          width: '100%', height: 220, borderRadius: 'var(--radius-s)',
          background: 'linear-gradient(90deg, rgba(168,85,247,0.08) 25%, rgba(168,85,247,0.15) 50%, rgba(168,85,247,0.08) 75%)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 1.8s infinite',
          display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
          gap: '0.5rem', color: 'var(--c-muted)', fontSize: '0.82rem',
        }}>
          <div style={{ fontSize: '1.8rem', animation: 'float 1.5s ease-in-out infinite' }}>🎨</div>
          <div>AI מצייר/ת איור...</div>
        </div>
      )}

      <img
        src={failed ? fallbackSrc : aiSrc}
        alt={visual.alt}
        loading="lazy"
        style={{
          width: '100%', borderRadius: 'var(--radius-s)', display: loaded ? 'block' : 'none',
          objectFit: 'cover', maxHeight: 280,
        }}
        onLoad={() => setLoaded(true)}
        onError={() => {
          if (!failed) { setFailed(true); setLoaded(false) }
          else setLoaded(true)
        }}
      />
      {loaded && !failed && (
        <p style={{ marginTop: '0.35rem', fontSize: '0.68rem', color: 'var(--c-muted)', textAlign: 'center', opacity: 0.6 }}>
          🤖 נוצר ע"י Pollinations AI
        </p>
      )}
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
