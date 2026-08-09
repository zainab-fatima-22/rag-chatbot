import { useAuth } from "../context/AuthContext";
import StampMark from "../components/StampMark";

export default function ProfilePage() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-40px)] bg-paper-dim px-4 py-16">
      <div className="max-w-md mx-auto bg-paper border border-paper-line rounded-sm p-8 relative">
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
        </div>
        <p className="text-xs text-muted mt-6 leading-relaxed">
          Filing details, saved queries, and history will appear here in a later module.
        </p>
      </div>
    </div>
  );
}
