import { useState } from 'react'
import PlaceholderVisual from '../PlaceholderVisual.jsx'
import TrainingSim from '../games/TrainingSim.jsx'
import GuessNextWord from '../games/GuessNextWord.jsx'
import EmbeddingsMap from '../games/EmbeddingsMap.jsx'
import PromptSandbox from '../games/PromptSandbox.jsx'
import HallucinationSpot from '../games/HallucinationSpot.jsx'

const GAME_MAP = { TrainingSim, GuessNextWord, EmbeddingsMap, PromptSandbox, HallucinationSpot }

export default function SeePhase({ see, onComplete }) {
  const [gameComplete, setGameComplete] = useState(!see.gameComponent)
  const [obsIdx, setObsIdx] = useState(0)
  const [revealed, setRevealed] = useState(false)
  const [phase, setPhase] = useState(see.gameComponent ? 'game' : 'obs')

  const obs = see.observations[obsIdx]
  const isLastObs = obsIdx === see.observations.length - 1

  const nextObs = () => {
    if (isLastObs) { onComplete(); return }
    setObsIdx(i => i + 1)
    setRevealed(false)
  }

  if (phase === 'game') {
    const GameComp = GAME_MAP[see.gameComponent]
    return (
      <div className="stack" style={{ '--gap': '1.25rem', padding: '0.5rem 0' }}>
        <p style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.9rem' }}>
          לפני שנראה את הכלי האמיתי — נרגיש את הרעיון בעצמנו.
        </p>
        {GameComp && <GameComp onComplete={() => setGameComplete(true)} />}
        <button
          className="btn btn-primary btn-lg"
          disabled={!gameComplete}
          onClick={() => setPhase('obs')}
        >
          {gameComplete ? 'המשך לתצפיות ←' : 'השלם/י את הפעילות תחילה'}
        </button>
      </div>
    )
  }

  if (!obs) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
        <h3>סיימת/ת את כל התצפיות!</h3>
        <button className="btn btn-primary" style={{ marginTop: '1rem' }} onClick={onComplete}>המשך לתרגול ←</button>
      </div>
    )
  }

  return (
    <div className="stack" style={{ '--gap': '1.25rem', padding: '0.5rem 0' }}>
      <div style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.8rem' }}>
        תצפית {obsIdx + 1} / {see.observations.length}
      </div>

      <div className="obs-card card">
        <h3 style={{ marginBottom: '1rem' }}>👀 {obs.title}</h3>

        <div className="obs-visual">
          <PlaceholderVisual visual={obs.visual} />
        </div>

        <p className="obs-question">🤔 {obs.question}</p>

        {!revealed ? (
          <button className="btn btn-outline" onClick={() => setRevealed(true)} style={{ marginTop: '0.75rem' }}>
            גלה/י את התשובה →
          </button>
        ) : (
          <>
            <div className="feedback-box feedback-success obs-reveal" style={{ marginTop: '0.75rem' }}>
              {obs.reveal}
            </div>
            <button className="btn btn-primary" onClick={nextObs} style={{ marginTop: '1rem', width: '100%' }}>
              {isLastObs ? 'המשך לתרגול ←' : 'תצפית הבאה ←'}
            </button>
          </>
        )}
      </div>
    </div>
  )
}
