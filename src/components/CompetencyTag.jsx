import { COMPETENCY_LABELS } from '../content/course.js'

export default function CompetencyTag({ type }) {
  const c = COMPETENCY_LABELS[type]
  if (!c) return null
  return (
    <span className={`tag tag-${type}`}>
      {c.emoji} {c.label}
    </span>
  )
}
