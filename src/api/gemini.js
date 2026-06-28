const KEY = import.meta.env.VITE_GEMINI_API_KEY
const URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${KEY}`

export async function askGemini(userPrompt, { system = '', maxTokens = 120, temperature = 0.8 } = {}) {
  const body = {
    ...(system && { system_instruction: { parts: [{ text: system }] } }),
    contents: [{ parts: [{ text: userPrompt }] }],
    generationConfig: { maxOutputTokens: maxTokens, temperature, thinkingConfig: { thinkingBudget: 0 } },
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

export async function askGeminiVision(text, imageBase64, mimeType = 'image/png') {
  const body = {
    contents: [{ parts: [{ text }, { inlineData: { mimeType, data: imageBase64 } }] }],
    generationConfig: { maxOutputTokens: 80, temperature: 0.2, thinkingConfig: { thinkingBudget: 0 } },
  }
  const res = await fetch(URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message || `Gemini Vision ${res.status}`)
  }
  const data = await res.json()
  return data.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || ''
}

