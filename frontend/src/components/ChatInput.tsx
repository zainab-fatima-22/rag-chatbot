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
    <form onSubmit={handleSubmit} className="flex gap-2 border-t p-3 bg-white">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Ask about your income tax..."
        aria-label="Type your tax question"
        disabled={disabled}
        maxLength={1000}
        className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-slate-300"
      />
      <button
        type="submit"
        disabled={disabled}
        className="bg-slate-800 text-white rounded-full px-5 py-2 text-sm font-medium disabled:opacity-50"
      >
        Send
      </button>
    </form>
  );
}
