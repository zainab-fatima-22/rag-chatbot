import { retrieveRelevantChunks, formatContextForPrompt } from "../services/retrieverService.js";
import { generateAnswer } from "../services/generationService.js";

// @route POST /api/chat  (protected)
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ message: "message is required" });
    }

    const chunks = await retrieveRelevantChunks(message);
    const context = formatContextForPrompt(chunks);
    const answer = await generateAnswer(message, context);

    return res.status(200).json({
      answer,
      sources: chunks.map((c) => ({ source: c.metadata?.source, score: c.score })),
    });
  } catch (err) {
    return res.status(500).json({ message: "Chat pipeline error", error: err.message });
  }
};
