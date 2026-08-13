import { useState, useEffect, useRef } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";
import TypingIndicator from "../components/TypingIndicator";
import { useAuth } from "../context/AuthContext";
import { sendChatMessage, getChatHistory } from "../services/api";
import { usePageTitle } from "../hooks/usePageTitle";

interface Message {
  role: "user" | "assistant";
  content: string;
  sources?: { source?: string; score?: number }[];
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Hi! I can help explain Pakistan personal income tax — slabs, deductions, and filing steps. Ask me anything, or try one of the questions below to get started.",
};

const SUGGESTED_QUESTIONS = [
  "What documents do I need to file?",
  "Am I a salaried or non salaried filer?",
  "What happens if I file late?",
  "Do freelancers need an NTN?",
];

export default function ChatPage() {
  usePageTitle("Chat");
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
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer, sources: data.sources }]);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const showSuggestions = !historyLoading && messages.length === 1;

  return (
    <div className="h-full flex flex-col bg-paper-dim">
      <div className="bg-ink text-paper px-4 py-2.5 text-center shrink-0">
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
          messages.map((m, i) => <ChatBubble key={i} role={m.role} content={m.content} sources={m.sources} />)
        )}

        {showSuggestions && (
          <div className="mt-2 mb-4">
            <p className="font-mono text-[10px] tracking-[0.2em] text-brass-dark mb-2">
              TRY ASKING
            </p>
            <div className="flex flex-wrap gap-2">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button
                  key={q}
                  onClick={() => handleSend(q)}
                  className="text-xs border border-paper-line bg-paper hover:border-brass hover:text-ink-dark text-muted rounded-full px-3 py-1.5 transition-colors"
                >
                  {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {loading && <TypingIndicator />}
        {error && (
          <p className="text-xs text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-center" role="alert">
            {error}
          </p>
        )}
        <div ref={bottomRef} />
      </main>

      <div className="max-w-2xl w-full mx-auto shrink-0">
        <ChatInput onSend={handleSend} disabled={loading} />
      </div>
    </div>
  );
}
