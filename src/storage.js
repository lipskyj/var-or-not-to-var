// ─── STORAGE MODULE ──────────────────────────────────────────────────────────
// All persistence goes through here. Currently uses localStorage.
// To connect a real backend/LMS API, replace the four functions below —
// the rest of the app never touches localStorage directly.
//
// Shape stored under KEY_PROGRESS:
//   { unitId: { phase: 'learn'|'see'|'practice'|'document'|'complete', stepIndex: number } }
//
// Shape stored under KEY_SUBMISSIONS:
//   { unitId: { screenshotDataUrl: string|null, reflection: string, submittedAt: string } }

const KEY_PROGRESS    = 'ailms_progress_v1'
const KEY_SUBMISSIONS = 'ailms_submissions_v1'

function readJson(key, fallback) {
  try {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

// ── Progress ──────────────────────────────────────────────────────────────────

export function getProgress() {
  return readJson(KEY_PROGRESS, {})
}

export function setUnitProgress(unitId, phase, stepIndex = 0) {
  const all = getProgress()
  all[unitId] = { phase, stepIndex }
  writeJson(KEY_PROGRESS, all)
}

export function markUnitComplete(unitId) {
  setUnitProgress(unitId, 'complete', 0)
}

// ── Submissions ───────────────────────────────────────────────────────────────

export function getSubmissions() {
  return readJson(KEY_SUBMISSIONS, {})
}

export function saveSubmission(unitId, { screenshotDataUrl, reflection }) {
  const all = getSubmissions()
  all[unitId] = {
    screenshotDataUrl: screenshotDataUrl || null,
    reflection,
    submittedAt: new Date().toISOString(),
  }
  writeJson(KEY_SUBMISSIONS, all)
}

// ── Derived helpers ───────────────────────────────────────────────────────────

export function isUnitUnlocked(unitId, allUnitIds) {
  if (unitId === allUnitIds[0]) return true          // first unit always unlocked
  const idx = allUnitIds.indexOf(unitId)
  if (idx < 0) return false
  const prev = allUnitIds[idx - 1]
  const progress = getProgress()
  return progress[prev]?.phase === 'complete'
}

export function isUnitComplete(unitId) {
  return getProgress()[unitId]?.phase === 'complete'
}

// ── Reset (dev / testing) ─────────────────────────────────────────────────────
export function resetAll() {
  localStorage.removeItem(KEY_PROGRESS)
  localStorage.removeItem(KEY_SUBMISSIONS)
}
