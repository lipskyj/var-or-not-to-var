import { useState, useCallback } from 'react'
import { COURSE } from './content/course.js'
import { getProgress, getSubmissions, resetAll } from './storage.js'
import HomeScreen from './screens/HomeScreen.jsx'
import GalleryScreen from './screens/GalleryScreen.jsx'
import JournalScreen from './screens/JournalScreen.jsx'
import UnitShell from './components/UnitShell.jsx'

// ── App-level navigation screens ──────────────────────────────────────────────
const SCREENS = { home: 'home', gallery: 'gallery', journal: 'journal', unit: 'unit' }

export default function App() {
  const [screen, setScreen] = useState(SCREENS.home)
  const [activeUnitId, setActiveUnitId] = useState(null)
  // Re-render trigger after submission/progress changes
  const [tick, setTick] = useState(0)
  const refresh = useCallback(() => setTick(t => t + 1), [])

  const progress    = getProgress()
  const submissions = getSubmissions()

  const openUnit = (unitId) => {
    setActiveUnitId(unitId)
    setScreen(SCREENS.unit)
    window.scrollTo(0, 0)
  }

  const goHome = () => {
    setScreen(SCREENS.home)
    setActiveUnitId(null)
    refresh()
  }

  const activeUnit = COURSE.units.find(u => u.id === activeUnitId)

  return (
    <div>
      {/* Top nav — hidden inside a unit (unit has its own back button) */}
      {screen !== SCREENS.unit && (
        <nav className="top-nav">
          <div className="top-nav-inner">
            <button className="nav-logo" onClick={goHome}>🤖 AI בשבילי</button>
            <div className="nav-links">
              <button className="nav-link" onClick={() => setScreen(SCREENS.home)}>קורס</button>
              <button className="nav-link" onClick={() => setScreen(SCREENS.gallery)}>גלריה</button>
              <button className="nav-link" onClick={() => setScreen(SCREENS.journal)}>היומן שלי</button>
            </div>
          </div>
        </nav>
      )}

      {screen === SCREENS.home && (
        <HomeScreen
          units={COURSE.units}
          progress={progress}
          submissions={submissions}
          onSelectUnit={openUnit}
        />
      )}

      {screen === SCREENS.gallery && (
        <GalleryScreen submissions={submissions} />
      )}

      {screen === SCREENS.journal && (
        <JournalScreen submissions={submissions} />
      )}

      {screen === SCREENS.unit && activeUnit && (
        <UnitShell
          unit={activeUnit}
          onBack={goHome}
          onUnitComplete={() => refresh()}
        />
      )}

      {/* Dev-only reset button — remove before production */}
      {import.meta.env.DEV && (
        <button
          onClick={() => { resetAll(); refresh() }}
          style={{
            position: 'fixed', bottom: '1rem', left: '1rem',
            padding: '0.4rem 0.8rem', fontSize: '0.75rem',
            background: '#fee2e2', border: '1px solid #fca5a5', borderRadius: 6,
            cursor: 'pointer', zIndex: 200, color: '#991b1b',
          }}
        >
          🗑 Reset (dev)
        </button>
      )}
    </div>
  )
}
