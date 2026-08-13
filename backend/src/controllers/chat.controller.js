import { retrieveRelevantChunks, formatContextForPrompt } from "../services/retrieverService.js";
import { generateAnswer } from "../services/generationService.js";
import Conversation from "../models/Conversation.model.js";

// @route POST /api/chat  (protected)
export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;

    if (typeof message !== "string" || !message.trim()) {
      return res.status(400).json({ message: "message is required" });
    }

    if (message.length > 1000) {
      return res.status(400).json({ message: "message is too long (max 1000 characters)" });
    }

    const chunks = await retrieveRelevantChunks(message);
    const context = formatContextForPrompt(chunks);
    const answer = await generateAnswer(message, context);
    const sources = chunks.map((c) => ({ source: c.metadata?.source, score: c.score }));

    // Keep one running conversation per user for now — multiple named
    // conversations/threads can be added later if needed.
    let conversation = await Conversation.findOne({ user: req.user._id });
    if (!conversation) {
      conversation = await Conversation.create({ user: req.user._id, messages: [] });
    }
    conversation.messages.push({ role: "user", content: message });
    conversation.messages.push({ role: "assistant", content: answer, sources });

    // Bug found during testing: conversation.messages would grow unbounded
    // for long-running users, slowing down history loads. Cap to the most
    // recent 100 messages (50 exchanges).
    if (conversation.messages.length > 100) {
      conversation.messages = conversation.messages.slice(-100);
    }

    await conversation.save();

    return res.status(200).json({ answer, sources });
  } catch (err) {
    return res.status(500).json({ message: "Chat pipeline error", error: err.message });
  }
};

// @route GET /api/chat/history  (protected)
export const getHistory = async (req, res) => {
  try {
    const conversation = await Conversation.findOne({ user: req.user._id });
    return res.status(200).json({ messages: conversation?.messages || [] });
  } catch (err) {
    return res.status(500).json({ message: "Failed to load history", error: err.message });
  }
};
