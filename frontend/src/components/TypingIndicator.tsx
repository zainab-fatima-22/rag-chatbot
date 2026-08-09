export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-4">
      <div className="bg-paper border border-paper-line rounded-sm px-4 py-3 flex gap-1.5 items-center">
        <span className="w-1.5 h-1.5 bg-brass rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-brass rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-brass rounded-full animate-bounce" />
      </div>
    </div>
  );
}
