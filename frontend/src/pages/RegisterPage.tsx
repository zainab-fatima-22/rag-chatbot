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
    <div className="min-h-full grid lg:grid-cols-2 bg-paper-dim">
      <div className="hidden lg:flex flex-col justify-center bg-ink text-paper px-16">
        <StampMark size={48} className="text-brass-light mb-6" />
        <h2 className="font-display text-3xl mb-4 leading-snug">
          Open your record in under a minute.
        </h2>
        <p className="text-paper/70 text-sm leading-relaxed mb-8 max-w-sm">
          Create a free account to start asking questions about your income
          tax, deductions, and filing steps, grounded in official guidance.
        </p>
        <ul className="space-y-3 text-sm text-paper/80">
          <li className="flex gap-2"><span className="text-brass-light">＋</span> Free to use, no card required</li>
          <li className="flex gap-2"><span className="text-brass-light">＋</span> Your conversation is saved for next time</li>
          <li className="flex gap-2"><span className="text-brass-light">＋</span> Built for Pakistan's tax rules specifically</li>
        </ul>
      </div>

      <div className="flex items-center justify-center px-4 py-16">
        <form
          onSubmit={handleSubmit}
          className="bg-paper border border-paper-line rounded-sm shadow-sm p-8 w-full max-w-sm relative"
        >
          <StampMark size={40} className="text-ink/15 absolute top-6 right-6 lg:hidden" />
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
    </div>
  );
}
