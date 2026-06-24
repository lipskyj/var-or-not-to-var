import { useState } from 'react'
import { setUnitProgress } from '../storage.js'
import CompetencyTag from './CompetencyTag.jsx'
import LearnPhase from './phases/LearnPhase.jsx'
import SeePhase from './phases/SeePhase.jsx'
import PracticePhase from './phases/PracticePhase.jsx'
import DocumentPhase from './phases/DocumentPhase.jsx'

const PHASES = ['learn', 'see', 'practice', 'document']
const PHASE_LABELS = { learn: '📖 למד/י', see: '👀 ראה/י', practice: '🛠️ תרגל/י', document: '📝 תעד/י' }
const PHASE_TIMES  = { learn: '8 דק׳', see: '9 דק׳', practice: '15 דק׳', document: '3 דק׳' }

export default function UnitShell({ unit, onBack, onUnitComplete }) {
  const [activePhase, setActivePhase] = useState('learn')
  const [donePhases, setDonePhases] = useState(new Set())

  const markPhaseDone = (phase) => {
    setDonePhases(prev => {
      const next = new Set(prev)
      next.add(phase)
      return next
    })
    const idx = PHASES.indexOf(phase)
    const nextPhase = PHASES[idx + 1]
    if (nextPhase) {
      setActivePhase(nextPhase)
      setUnitProgress(unit.id, nextPhase)
    } else {
      // document phase complete handled inside DocumentPhase
    }
  }

  const phaseUnlocked = (phase) => {
    const idx = PHASES.indexOf(phase)
    if (idx === 0) return true
    return donePhases.has(PHASES[idx - 1])
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--c-bg)' }}>
      {/* Header */}
      <div style={{
        background: 'var(--c-surface)', borderBottom: '2px solid var(--c-border)',
        padding: '1rem', position: 'sticky', top: 0, zIndex: 10
      }}>
        <div className="container">
          <div className="row" style={{ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
            <button className="btn btn-ghost btn-sm" onClick={onBack}>← חזור/י לקורס</button>
            <div style={{ fontWeight: 800, fontSize: '1rem' }}>
              {unit.emoji} {unit.title}
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--c-muted)' }}>⏱ {unit.duration}</div>
          </div>
          <div className="row" style={{ flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
            {unit.competencies.map(c => <CompetencyTag key={c} type={c} />)}
          </div>
        </div>
      </div>

      {/* Phase tabs */}
      <div className="container">
        <div className="phase-tabs" style={{ marginTop: '1.25rem' }}>
          {PHASES.map(phase => (
            <button
              key={phase}
              className={`phase-tab ${activePhase === phase ? 'active' : ''} ${donePhases.has(phase) ? 'done' : ''}`}
              disabled={!phaseUnlocked(phase)}
              onClick={() => phaseUnlocked(phase) && setActivePhase(phase)}
              title={PHASE_TIMES[phase]}
            >
              {donePhases.has(phase) ? '✓ ' : ''}{PHASE_LABELS[phase]}
            </button>
          ))}
        </div>

        {/* Phase content */}
        <div style={{ paddingBottom: '3rem' }}>
          {activePhase === 'learn' && (
            <LearnPhase learn={unit.learn} onComplete={() => markPhaseDone('learn')} />
          )}
          {activePhase === 'see' && (
            <SeePhase see={unit.see} onComplete={() => markPhaseDone('see')} />
          )}
          {activePhase === 'practice' && (
            <PracticePhase
              practice={unit.practice}
              help={unit.help}
              onComplete={() => markPhaseDone('practice')}
            />
          )}
          {activePhase === 'document' && (
            <DocumentPhase
              unit={unit}
              document={unit.document}
              onComplete={() => { markPhaseDone('document'); onUnitComplete(unit.id) }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
