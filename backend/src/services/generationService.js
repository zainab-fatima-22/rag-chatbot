/**
 * Generation service — wraps Gemini's generateContent API to produce the
 * final chatbot answer, grounded in retrieved context chunks.
 */

const GENERATE_ENDPOINT =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";

const SYSTEM_INSTRUCTIONS = `You are Tax-Assist AI, an assistant that explains Pakistan personal income tax
(for salaried individuals and freelancers) using ONLY the provided context.

Rules:
- Base your answer only on the context given below. If the context doesn't
  contain the answer, say so clearly instead of guessing.
- State the tax year the information applies to, if known from the context.
- Keep answers clear and avoid unnecessary jargon.
- End with a brief reminder to confirm details on fbr.gov.pk or with a
  licensed tax consultant before filing.`;

export async function generateAnswer(query, contextText) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const prompt = `${SYSTEM_INSTRUCTIONS}\n\nContext:\n${contextText}\n\nUser question: ${query}`;

  const res = await fetch(`${GENERATE_ENDPOINT}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(`Generation request failed: ${res.status} ${errBody}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "No response generated.";
}
