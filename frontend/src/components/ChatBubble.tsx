interface ChatBubbleProps {
  role: "user" | "assistant";
  content: string;
}

export default function ChatBubble({ role, content }: ChatBubbleProps) {
  const isUser = role === "user";

  if (isUser) {
    return (
      <div className="flex justify-end mb-4">
        <div className="max-w-[75%] bg-ink text-paper rounded-sm px-4 py-2.5 text-sm leading-relaxed">
          {content}
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-start mb-4">
      <div className="max-w-[80%] bg-paper border border-paper-line rounded-sm px-4 py-3 text-sm leading-relaxed text-text relative">
        <span className="absolute -left-1.5 top-3 w-3 h-3 rounded-full bg-brass" aria-hidden="true" />
        {content}
      </div>
    </div>
  );
}
