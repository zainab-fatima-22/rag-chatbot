/**
 * Generation service — wraps Gemini's generateContent API to produce the
 * final chatbot answer, grounded in retrieved context chunks.
 */

const MODEL = "models/gemini-flash-latest";

const GEMINI_API_KEY =
  "your_gemini_api_key_here";

const GENERATE_ENDPOINT =
  `https://generativelanguage.googleapis.com/v1beta/${MODEL}:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM_INSTRUCTIONS = `You are Tax-Assist AI, an assistant that explains Pakistan personal income tax
(for salaried individuals and freelancers) using ONLY the provided context.

Rules:
- Base your answer only on the context given below. If the context doesn't
  contain the answer, say so clearly instead of guessing.
- State the tax year the information applies to, if known from the context.
- Keep answers clear, concise, and avoid unnecessary jargon.
- If the user's question is vague (e.g. "how much tax will I pay"), ask for
  the missing detail (e.g. income amount, filer type) rather than guessing.
- End with a brief reminder to confirm details on fbr.gov.pk or with a
  licensed tax consultant before filing.`;

export async function generateAnswer(query, contextText) {
  const prompt = `${SYSTEM_INSTRUCTIONS}\n\nContext:\n${contextText}\n\nUser question: ${query}`;

  const res = await fetch(GENERATE_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              text: prompt,
            },
          ],
        },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text();
    throw new Error(
      `Generation request failed: ${res.status} ${errBody}`
    );
  }

  const data = await res.json();

  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response generated."
  );
}