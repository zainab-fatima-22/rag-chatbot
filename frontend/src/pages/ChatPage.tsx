import { useState } from "react";
import ChatBubble from "../components/ChatBubble";
import ChatInput from "../components/ChatInput";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Hi! I can help explain Pakistan personal income tax — slabs, deductions, and filing steps. (RAG pipeline not wired up yet — this is UI only for now.)",
    },
  ]);

  const handleSend = (content: string) => {
    // TODO (Module 2): send to backend /api/chat, which will run the RAG
    // pipeline (retrieve relevant chunks + call Gemini) and return a real answer.
    setMessages((prev) => [
      ...prev,
      { role: "user", content },
      { role: "assistant", content: "(placeholder response — RAG pipeline coming in Module 2)" },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <main className="flex-1 overflow-y-auto p-4 max-w-2xl w-full mx-auto">
        {messages.map((m, i) => (
          <ChatBubble key={i} role={m.role} content={m.content} />
        ))}
      </main>

      <div className="max-w-2xl w-full mx-auto">
        <ChatInput onSend={handleSend} />
      </div>
    </div>
  );
}
