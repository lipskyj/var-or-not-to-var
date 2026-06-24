export default function HelpDrawer({ helpItem, onClose }) {
  if (!helpItem) return null
  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <div className="drawer" role="dialog" aria-modal="true">
        <div className="row" style={{ justifyContent: 'space-between', marginBottom: '1rem' }}>
          <h3>🆘 {helpItem.title}</h3>
          <button className="btn btn-outline btn-sm" onClick={onClose}>✕ סגור</button>
        </div>
        <ol style={{ paddingRight: '1.2rem', lineHeight: 2 }}>
          {helpItem.steps.map((s, i) => (
            <li key={i} style={{ marginBottom: '0.5rem' }}>{s}</li>
          ))}
        </ol>
      </div>
    </>
  )
}
