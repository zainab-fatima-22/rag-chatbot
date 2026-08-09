import { useState, FormEvent } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StampMark from "../components/StampMark";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setError("");
    setSubmitting(true);
    try {
      await register(name, email, password);
      navigate("/chat");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-40px)] flex items-center justify-center bg-paper-dim px-4 py-12">
      <form
        onSubmit={handleSubmit}
        className="bg-paper border border-paper-line rounded-sm shadow-sm p-8 w-full max-w-sm relative"
      >
        <StampMark size={40} className="text-ink/15 absolute top-6 right-6" />
        <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">NEW RECORD</p>
        <h1 className="font-display text-2xl font-medium mb-6 text-ink">Create account</h1>
        {error && (
          <p className="text-red-700 bg-red-50 border border-red-200 rounded px-3 py-2 text-sm mb-4">
            {error}
          </p>
        )}
        <label className="block text-xs font-mono text-muted mb-1">FULL NAME</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-paper-line rounded-sm px-3 py-2 mb-4 bg-white focus:border-brass outline-none"
          required
        />
        <label className="block text-xs font-mono text-muted mb-1">EMAIL</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-paper-line rounded-sm px-3 py-2 mb-4 bg-white focus:border-brass outline-none"
          required
        />
        <label className="block text-xs font-mono text-muted mb-1">PASSWORD</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-paper-line rounded-sm px-3 py-2 mb-6 bg-white focus:border-brass outline-none"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-full bg-ink text-paper rounded-sm py-2.5 font-medium hover:bg-ink-light transition-colors disabled:opacity-50"
        >
          {submitting ? "Creating account..." : "Register"}
        </button>
        <p className="text-sm text-muted mt-5 text-center">
          Already have an account? <Link to="/login" className="text-ink border-b border-brass">Log in</Link>
        </p>
      </form>
    </div>
  );
}
