const KEY = import.meta.env.VITE_GEMINI_API_KEY
const BASE = 'https://generativelanguage.googleapis.com/v1beta/models'
const URL = `${BASE}/gemini-2.0-flash:generateContent?key=${KEY}`
const IMG_URL = `${BASE}/gemini-2.0-flash-preview-image-generation:generateContent?key=${KEY}`

export async function askGemini(userPrompt, { system = '', maxTokens = 120, temperature = 0.8 } = {}) {
  const body = {
    ...(system && { system_instruction: { parts: [{ text: system }] } }),
    contents: [{ parts: [{ text: userPrompt }] }],
    generationConfig: { maxOutputTokens: maxTokens, temperature },
  }

  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini ${res.status}`)
  }

  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''
}

export async function generateImage(prompt) {
  const res = await fetch(IMG_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseModalities: ['IMAGE'] },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini Image ${res.status}`)
  }

  const data = await res.json()
  const parts = data.candidates?.[0]?.content?.parts || []
  const img = parts.find(p => p.inlineData)
  if (!img?.inlineData?.data) throw new Error('No image in response')
  return `data:${img.inlineData.mimeType || 'image/jpeg'};base64,${img.inlineData.data}`
}
