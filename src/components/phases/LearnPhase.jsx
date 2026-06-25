import { useState } from 'react'

export default function LearnPhase({ learn, onComplete }) {
  const [idx, setIdx] = useState(0)
  const chunks = learn.chunks
  const chunk = chunks[idx]
  const isLast = idx === chunks.length - 1

  const next = () => {
    if (isLast) { onComplete(); return }
    setIdx(i => i + 1)
  }

  return (
    <div className="stack" style={{ '--gap': '1.25rem', padding: '0.5rem 0' }}>
      {/* Progress dots */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.4rem', alignItems: 'center' }}>
        {chunks.map((_, i) => (
          <div key={i} style={{
            width: i === idx ? 20 : 8, height: 8,
            borderRadius: 99,
            background: i < idx
              ? 'var(--c-success)'
              : i === idx
              ? 'var(--grad, var(--c-primary))'
              : 'var(--c-border)',
            transition: 'all 0.3s cubic-bezier(0.34,1.56,0.64,1)',
            backgroundImage: i === idx ? 'var(--grad)' : undefined,
          }} />
        ))}
      </div>

      <div key={idx} className="chunk-card">
        <ChunkContent chunk={chunk} />
        <div style={{ marginTop: '1.75rem' }}>
          <button className="btn btn-primary btn-lg" onClick={next}>
            {chunk.buttonLabel || (isLast ? 'המשך ←' : 'הבא ←')}
          </button>
        </div>
      </div>
    </div>
  )
}

function ChunkContent({ chunk }) {
  switch (chunk.type) {
    case 'hook':
      return (
        <div style={{ padding: '0.5rem 0' }}>
          <div style={{ fontSize: '3rem', marginBottom: '0.75rem' }}>🤔</div>
          <div className="chunk-hook">{chunk.text}</div>
          {chunk.subtext && <p className="chunk-sub" style={{ marginTop: '1rem' }}>{chunk.subtext}</p>}
        </div>
      )
    case 'concept':
      return (
        <>
          <h2 className="chunk-heading">{chunk.heading}</h2>
          {chunk.bullets && (
            <ul className="chunk-bullets">
              {chunk.bullets.map((b, i) => <li key={i}>{b}</li>)}
            </ul>
          )}
          {chunk.subtext && (
            <div style={{ marginTop: '1rem', padding: '0.75rem 1rem', background: 'var(--c-primary-l)', borderRadius: 'var(--radius-s)', borderRight: '3px solid var(--c-primary)', textAlign: 'right' }}>
              <p style={{ fontWeight: 600, color: 'var(--c-primary)', fontSize: '0.95rem' }}>{chunk.subtext}</p>
            </div>
          )}
        </>
      )
    case 'comparison':
      return (
        <>
          <h2 className="chunk-heading">{chunk.heading}</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem', marginTop: '0.5rem' }}>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.8rem', padding: '0.4rem', background: 'var(--c-success-l)', borderRadius: 'var(--radius-s) var(--radius-s) 0 0', color: 'var(--c-success)' }}>✅ כן</div>
            <div style={{ textAlign: 'center', fontWeight: 800, fontSize: '0.8rem', padding: '0.4rem', background: 'var(--c-danger-l)',  borderRadius: 'var(--radius-s) var(--radius-s) 0 0', color: 'var(--c-danger)' }}>❌ לא</div>
            {chunk.rows.map((row, i) => (
              <>
                <div key={`g${i}`} style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--c-border)', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(16,185,129,0.05)' }}>{row.good}</div>
                <div key={`b${i}`} style={{ padding: '0.6rem 0.75rem', borderBottom: '1px solid var(--c-border)', fontSize: '0.9rem', textAlign: 'center', background: 'rgba(248,113,113,0.05)' }}>{row.bad}</div>
              </>
            ))}
          </div>
        </>
      )
    case 'keyterm':
      return (
        <div>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.75rem' }}>📌</div>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--c-muted)', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>מושג המפתח</div>
          <div style={{
            background: 'linear-gradient(135deg, rgba(168,85,247,0.12), rgba(236,72,153,0.08))',
            border: '1px solid rgba(168,85,247,0.25)',
            borderRadius: 'var(--radius)',
            padding: '1.25rem',
            marginBottom: '1rem',
          }}>
            <div style={{ fontWeight: 900, fontSize: '1.4rem', color: '#fff', fontFamily: 'monospace, var(--font)' }}>
              {chunk.term}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-primary)', marginTop: '0.25rem' }}>
              {chunk.termHe}
            </div>
          </div>
          <p style={{ fontWeight: 600, color: 'var(--c-text)', lineHeight: 1.65, textAlign: 'right' }}>{chunk.definition}</p>
        </div>
      )
    default:
      return <p>{chunk.text}</p>
  }
}
