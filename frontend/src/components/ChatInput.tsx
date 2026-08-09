import { useState, FormEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  disabled?: boolean;
}

export default function ChatInput({ onSend, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSend(value.trim());
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 border-t-2 border-ink p-3 bg-paper-dim">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about your income tax..."
        aria-label="Type your tax question"
        disabled={disabled}
        maxLength={1000}
        className="flex-1 border border-paper-line rounded-sm px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-brass"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-ink text-paper rounded-sm px-5 py-2.5 text-sm font-medium hover:bg-ink-light transition-colors disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
