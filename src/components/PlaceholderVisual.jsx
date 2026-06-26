import { useState, useEffect } from 'react'
import { generateImage } from '../api/gemini.js'

// Session-level cache: prompt → base64 data URL
const imgCache = new Map()

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
  const prompt = visual.prompt
  const cached = prompt ? imgCache.get(prompt) : null

  const [src, setSrc] = useState(cached || null)
  const [loading, setLoading] = useState(!cached && !!prompt)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!prompt || cached) return
    let live = true
    setLoading(true)
    setError(null)
    generateImage(prompt)
      .then(dataUrl => {
        imgCache.set(prompt, dataUrl)
        if (live) { setSrc(dataUrl); setLoading(false) }
      })
      .catch(err => {
        console.error('generateImage failed:', err.message)
        if (live) { setError(err.message); setLoading(false) }
      })
    return () => { live = false }
  }, [prompt])

  if (loading) {
    return (
      <div style={{
        width: '100%', height: 220, borderRadius: 'var(--radius-s)',
        background: 'linear-gradient(135deg, rgba(168,85,247,0.08), rgba(59,130,246,0.08))',
        border: '2px dashed rgba(168,85,247,0.3)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        gap: '0.5rem', color: 'var(--c-muted)', fontSize: '0.85rem',
      }}>
        <div style={{ fontSize: '2rem', animation: 'float 1.5s ease-in-out infinite' }}>🎨</div>
        <div>מייצר/ת איור...</div>
        <div style={{ fontSize: '0.72rem', opacity: 0.6, textAlign: 'center', maxWidth: 200 }}>
          Imagen AI עובד/ת על האיור
        </div>
      </div>
    )
  }

  if (src && !error) {
    return (
      <div style={{ width: '100%' }}>
        <img
          src={src}
          alt={visual.alt}
          style={{ width: '100%', borderRadius: 'var(--radius-s)', display: 'block', objectFit: 'cover', maxHeight: 280 }}
        />
        <p style={{ marginTop: '0.35rem', fontSize: '0.7rem', color: 'var(--c-muted)', textAlign: 'center', opacity: 0.7 }}>
          🤖 נוצר ע"י Imagen AI
        </p>
      </div>
    )
  }

  // Show error + Unsplash fallback
  const query = encodeURIComponent(visual.searchQuery || visual.alt || 'artificial intelligence')
  return (
    <div style={{ width: '100%' }}>
      {error && (
        <div style={{ fontSize: '0.7rem', color: '#f87171', background: 'rgba(248,113,113,0.08)', border: '1px solid rgba(248,113,113,0.2)', borderRadius: 'var(--radius-s)', padding: '0.3rem 0.5rem', marginBottom: '0.4rem', direction: 'ltr', wordBreak: 'break-all' }}>
          ⚠️ Image gen error: {error}
        </div>
      )}
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
