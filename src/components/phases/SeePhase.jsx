import { useState } from 'react'
import PlaceholderVisual from '../PlaceholderVisual.jsx'
import TrainingSim from '../games/TrainingSim.jsx'
import GuessNextWord from '../games/GuessNextWord.jsx'
import EmbeddingsMap from '../games/EmbeddingsMap.jsx'
import PromptSandbox from '../games/PromptSandbox.jsx'
import HallucinationSpot from '../games/HallucinationSpot.jsx'
import DragMatchGame from '../games/DragMatchGame.jsx'
import SentimentMeter from '../games/SentimentMeter.jsx'
import AIorNotQuiz from '../games/AIorNotQuiz.jsx'
import PromptBuilder from '../games/PromptBuilder.jsx'
import AIQuizShow from '../games/AIQuizShow.jsx'
import TokenizerLab from '../games/TokenizerLab.jsx'
import BiasSwap from '../games/BiasSwap.jsx'
import PromptArena from '../games/PromptArena.jsx'
import DataSwipe from '../games/DataSwipe.jsx'
import WordSort from '../games/WordSort.jsx'
import SketchGuessGame from '../games/SketchGuessGame.jsx'
import WordArenaGame from '../games/WordArenaGame.jsx'
import SelectionSim from '../games/SelectionSim.jsx'
import QuickDrawGallery from '../games/QuickDrawGallery.jsx'
import TeachableSim from '../games/TeachableSim.jsx'

const GAME_MAP = { TrainingSim, GuessNextWord, EmbeddingsMap, PromptSandbox, HallucinationSpot, DragMatchGame, SentimentMeter, AIorNotQuiz, PromptBuilder, AIQuizShow, TokenizerLab, BiasSwap, PromptArena, DataSwipe, WordSort, SketchGuessGame, WordArenaGame, SelectionSim, QuickDrawGallery, TeachableSim }

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
    const gameProps = see.gameProps || {}
    return (
      <div className="stack" style={{ '--gap': '1.25rem', padding: '0.5rem 0' }}>
        <p style={{ textAlign: 'center', color: 'var(--c-muted)', fontSize: '0.9rem' }}>
          לפני שנראה את הכלי האמיתי — נרגיש את הרעיון בעצמנו.
        </p>
        {GameComp && <GameComp {...gameProps} onComplete={() => setGameComplete(true)} />}
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
      <span className="pill-counter" style={{ alignSelf: 'center' }}>
        תצפית {obsIdx + 1} / {see.observations.length}
      </span>

      <div className="obs-card card">
        <h3 style={{ marginBottom: '1rem' }}>👀 {obs.title}</h3>

        <div className="obs-visual" style={{ padding: obs.visual?.type === 'youtube' ? '0' : undefined, border: obs.visual?.type === 'youtube' || obs.visual?.type === 'mini-game' ? 'none' : undefined, background: obs.visual?.type === 'youtube' || obs.visual?.type === 'mini-game' ? 'transparent' : undefined }}>
          {obs.visual?.type === 'mini-game' ? (() => {
            const MiniGame = GAME_MAP[obs.visual.gameComponent]
            const mgProps = obs.visual.gameProps || {}
            return MiniGame ? <MiniGame {...mgProps} onComplete={() => {}} /> : null
          })() : <PlaceholderVisual visual={obs.visual} />}
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
