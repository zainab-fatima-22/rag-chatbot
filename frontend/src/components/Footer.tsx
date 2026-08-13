import { Link } from "react-router-dom";
import StampMark from "./StampMark";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper/70 mt-auto">
      <div className="max-w-4xl mx-auto px-6 py-10 grid sm:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-3">
            <StampMark size={26} className="text-brass-light" />
            <span className="font-display text-paper text-base">Tax-Assist AI</span>
          </div>
          <p className="text-xs leading-relaxed">
            An informational RAG based assistant for Pakistan personal income tax.
            Not a substitute for FBR or a licensed tax consultant.
          </p>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-brass-light mb-3">NAVIGATE</p>
          <ul className="space-y-2 text-xs">
            <li><Link to="/chat" className="hover:text-brass-light">Chat</Link></li>
            <li><Link to="/about" className="hover:text-brass-light">About</Link></li>
            <li><Link to="/faq" className="hover:text-brass-light">FAQ</Link></li>
          </ul>
        </div>
        <div>
          <p className="font-mono text-[10px] tracking-[0.2em] text-brass-light mb-3">SOURCE</p>
          <ul className="space-y-2 text-xs">
            <li>
              <a href="https://fbr.gov.pk" target="_blank" rel="noreferrer" className="hover:text-brass-light">
                fbr.gov.pk
              </a>
            </li>
            <li>Income Tax Ordinance, 2001</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-paper/10 text-center text-[10px] font-mono py-3 tracking-wide">
        TAX ASSIST AI — INFORMATIONAL TOOL — TAX YEAR SUBJECT TO FBR NOTIFICATION
      </div>
    </footer>
  );
}
