import { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";
import { useAuth } from "../context/AuthContext";
import { sendChatMessage, getChatHistory } from "../services/api";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I can help explain Pakistan personal income tax — slabs, deductions, and filing steps. Ask me anything.",
};

export default function ChatPage() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [loading, setLoading] = useState(false);
  const [historyLoading, setHistoryLoading] = useState(true);
  const [error, setError] = useState("");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadHistory() {
      try {
        const data = await getChatHistory(user!.token);
        if (data.messages && data.messages.length > 0) {
          setMessages([WELCOME_MESSAGE, ...data.messages]);
        }
      } catch {
        // No history yet, or failed to load — fall back to just the welcome message
      } finally {
        setHistoryLoading(false);
      }
    }
    loadHistory();
  }, [user]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

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
    <div className="min-h-[calc(100vh-40px)] flex flex-col bg-paper-dim">
      <div className="bg-ink text-paper px-4 py-2.5 text-center">
        <p className="font-mono text-xs tracking-[0.15em]">CASE FILE — INCOME TAX INQUIRY</p>
      </div>

      <main
        className="flex-1 overflow-y-auto p-5 max-w-2xl w-full mx-auto bg-ledger bg-paper"
        role="log"
        aria-live="polite"
        aria-label="Chat conversation"
      >
        {historyLoading ? (
          <p className="text-xs text-muted font-mono text-center">LOADING RECORD...</p>
        ) : (
          messages.map((m, i) => <ChatBubble key={i} role={m.role} content={m.content} />)
        )}
        {loading && <TypingIndicator />}
        {error && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-center" role="alert">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </main>

      <div className="max-w-2xl w-full mx-auto">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
