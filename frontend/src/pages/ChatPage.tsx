import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";
import { useAuth } from "../context/AuthContext";
import { sendChatMessage } from "../services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help explain Pakistan personal income tax — slabs, deductions, and filing steps. Ask me anything.",
    },
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSend = async (content: string) => {
    setError("");
    setMessages((prev) => [...prev, { role: "user", content }]);
    setLoading(true);

    try {
      const data = await sendChatMessage(content, user!.token);
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 overflow-y-auto p-4 max-w-2xl w-full mx-auto">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}
        {loading && <TypingIndicator />}
        {error && (
          <p className="text-xs text-red-500 text-center">{error}</p>
        )}
      </main>

      <div className="max-w-2xl w-full mx-auto">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
