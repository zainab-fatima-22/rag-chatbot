import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { getChatHistory } from "../services/api";
import StampMark from "../components/StampMark";
import Footer from "../components/Footer";

export default function ProfilePage() {
  const { user } = useAuth();
  const [questionCount, setQuestionCount] = useState<number | null>(null);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getChatHistory(user!.token);
        const askedCount = (data.messages || []).filter((m: { role: string }) => m.role === "user").length;
        setQuestionCount(askedCount);
      } catch {
        setQuestionCount(0);
      }
    }
    loadStats();
  }, [user]);

  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 bg-paper-dim px-4 py-16">
        <div className="max-w-md mx-auto bg-paper border border-paper-line rounded-sm p-8 relative mb-6">
          <StampMark size={44} className="text-ink/15 absolute top-6 right-6" />
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">FILER RECORD</p>
          <h1 className="font-display text-2xl font-medium mb-6 text-ink">My Profile</h1>
          <div className="space-y-4 font-mono text-sm">
            <div className="flex justify-between border-b border-dotted border-paper-line pb-2">
              <span className="text-muted">NAME</span>
              <span className="text-text">{user?.name}</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-paper-line pb-2">
              <span className="text-muted">EMAIL</span>
              <span className="text-text">{user?.email}</span>
            </div>
            <div className="flex justify-between border-b border-dotted border-paper-line pb-2">
              <span className="text-muted">ROLE</span>
              <span className="text-text capitalize">{user?.role}</span>
            </div>
            <div className="flex justify-between pb-2">
              <span className="text-muted">QUESTIONS ASKED</span>
              <span className="text-text">{questionCount === null ? "..." : questionCount}</span>
            </div>
          </div>
        </div>

        <div className="max-w-md mx-auto bg-paper border border-paper-line rounded-sm p-8 mb-6">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-3">QUICK LINKS</p>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/chat" className="text-ink hover:text-ink-light underline underline-offset-2">
              Continue your conversation
            </Link>
            <Link to="/faq" className="text-ink hover:text-ink-light underline underline-offset-2">
              Browse frequently asked questions
            </Link>
            <Link to="/about" className="text-ink hover:text-ink-light underline underline-offset-2">
              Learn how the assistant works
            </Link>
          </div>
        </div>

        <p className="max-w-md mx-auto text-xs text-muted leading-relaxed">
          Saved filing details and document uploads are planned for a future
          update. For now, your conversation history is kept so you can pick
          up where you left off.
        </p>
      </div>
      <Footer />
    </div>
  );
}
