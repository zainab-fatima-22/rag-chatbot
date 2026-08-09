import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StampMark from "./StampMark";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="bg-brass/15 text-ink-dark text-xs text-center py-1.5 px-4 font-mono tracking-wide">
        FOR INFORMATION ONLY — NOT A SUBSTITUTE FOR FBR OR A LICENSED TAX CONSULTANT
      </div>
      <nav className="flex justify-between items-center px-5 py-3 bg-ink text-paper border-b-2 border-brass">
        <Link to="/" className="flex items-center gap-2.5 group">
          <StampMark size={30} className="text-brass-light" />
          <span className="font-display text-lg tracking-tight">Tax-Assist AI</span>
        </Link>
        <div className="flex items-center gap-5 text-sm font-body text-paper/80">
          <Link to="/about" className="hover:text-brass-light transition-colors">About</Link>
          <Link to="/faq" className="hover:text-brass-light transition-colors">FAQ</Link>
          {user ? (
            <>
              <Link to="/chat" className="hover:text-brass-light transition-colors">Chat</Link>
              <Link to="/profile" className="hover:text-brass-light transition-colors">Profile</Link>
              <button onClick={logout} className="text-brass-light hover:text-brass border border-brass/40 rounded px-3 py-1 text-xs font-mono">
                LOG OUT
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-brass-light transition-colors">Log In</Link>
              <Link
                to="/register"
                className="bg-brass text-ink-dark font-medium rounded px-3 py-1.5 hover:bg-brass-light transition-colors"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
