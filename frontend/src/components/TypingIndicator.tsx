export default function TypingIndicator() {
  return (
    <div className="flex justify-start mb-3">
      <div className="bg-slate-100 rounded-2xl px-4 py-3 flex gap-1 items-center">
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
        <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" />
      </div>
    </div>
  );
}
