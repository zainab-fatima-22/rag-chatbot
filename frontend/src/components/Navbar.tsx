import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <div>
      <div className="bg-amber-50 text-amber-800 text-xs text-center py-1.5 px-4">
        Informational tool only — not a substitute for a licensed tax consultant or FBR.
      </div>
      <nav className="flex justify-between items-center px-4 py-3 border-b bg-white">
        <Link to="/" className="font-semibold text-slate-800">
          Tax-Assist AI
        </Link>
        <div className="flex items-center gap-4 text-sm text-slate-500">
          <Link to="/about">About</Link>
          {user ? (
            <>
              <Link to="/chat">Chat</Link>
              <button onClick={logout} className="underline">
                Log out
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Log In</Link>
              <Link to="/register">Register</Link>
            </>
          )}
        </div>
      </nav>
    </div>
  );
}
