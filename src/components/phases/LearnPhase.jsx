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
      {/* chunk counter */}
      <div style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.8rem' }}>
        {idx + 1} / {chunks.length}
      </div>

      <div className="chunk-card">
        <ChunkContent chunk={chunk} />
        <div style={{ marginTop: '1.5rem' }}>
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
        <>
          <div className="chunk-hook">🤔 {chunk.text}</div>
          {chunk.subtext && <p className="chunk-sub">{chunk.subtext}</p>}
        </>
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
          {chunk.subtext && <p className="chunk-sub" style={{ marginTop: '0.75rem' }}>{chunk.subtext}</p>}
        </>
      )
    case 'comparison':
      return (
        <>
          <h2 className="chunk-heading">{chunk.heading}</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
            <thead>
              <tr>
                <th style={{ padding: '0.4rem', background: 'var(--c-success-l)', borderRadius: '6px 0 0 0' }}>🟢</th>
                <th style={{ padding: '0.4rem', background: 'var(--c-danger-l)', borderRadius: '0 6px 0 0' }}>🔴</th>
              </tr>
            </thead>
            <tbody>
              {chunk.rows.map((row, i) => (
                <tr key={i}>
                  <td style={{ padding: '0.4rem 0.75rem', borderBottom: '1px solid var(--c-border)', textAlign: 'center' }}>{row.good}</td>
                  <td style={{ padding: '0.4rem 0.75rem', borderBottom: '1px solid var(--c-border)', textAlign: 'center' }}>{row.bad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )
    case 'keyterm':
      return (
        <>
          <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>📌</div>
          <h2 className="chunk-heading">מושג המפתח</h2>
          <div style={{
            background: 'var(--c-primary-l)', borderRadius: 'var(--radius-s)',
            padding: '1rem', margin: '0.5rem 0'
          }}>
            <div style={{ fontWeight: 900, fontSize: '1.2rem', color: 'var(--c-primary)' }}>
              {chunk.term}
            </div>
            <div style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--c-primary)', opacity: 0.8 }}>
              {chunk.termHe}
            </div>
          </div>
          <p style={{ marginTop: '0.75rem', fontWeight: 600 }}>{chunk.definition}</p>
        </>
      )
    default:
      return <p>{chunk.text}</p>
  }
}
