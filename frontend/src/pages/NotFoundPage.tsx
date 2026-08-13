import { Link } from "react-router-dom";
import StampMark from "../components/StampMark";

export default function NotFoundPage() {
  return (
    <div className="min-h-full flex flex-col items-center justify-center bg-paper-dim px-4 py-24 text-center">
      <StampMark size={56} className="text-ink/20 mb-6" />
      <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">RECORD NOT FOUND</p>
      <h1 className="font-display text-4xl text-ink mb-4">404</h1>
      <p className="text-muted mb-8 max-w-sm">
        This page does not exist in our records. It may have been moved or the address may be incorrect.
      </p>
      <Link to="/" className="bg-ink text-paper font-medium rounded px-6 py-3 hover:bg-ink-light transition-colors">
        Back to home
      </Link>
    </div>
  );
}
