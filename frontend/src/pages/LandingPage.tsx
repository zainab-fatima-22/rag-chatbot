import { Link } from "react-router-dom";
import StampMark from "../components/StampMark";

const entries = [
  { label: "Tax slabs", detail: "Know exactly which bracket applies to your income" },
  { label: "Deductions", detail: "Zakat, pension, and charitable contribution credits" },
  { label: "Filing steps", detail: "Walk through IRIS filing without the guesswork" },
  { label: "Deadlines", detail: "Never miss a filing date or a penalty warning" },
];

export default function LandingPage() {
  return (
    <div className="min-h-[calc(100vh-40px)] bg-paper">
      {/* Hero */}
      <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
        <StampMark size={64} className="text-ink mx-auto mb-6" />
        <h1 className="font-display text-5xl sm:text-6xl font-medium text-ink leading-[1.05] mb-5">
          Your income tax,
          <br />
          explained plainly.
        </h1>
        <p className="text-muted text-lg max-w-xl mx-auto mb-9 leading-relaxed">
          Tax-Assist AI answers your Pakistan personal income tax questions —
          grounded in official FBR guidance, not guesswork. Built for salaried
          individuals and freelancers alike.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            to="/register"
            className="bg-ink text-paper font-medium rounded px-6 py-3 hover:bg-ink-light transition-colors"
          >
            Get started
          </Link>
          <Link
            to="/login"
            className="text-ink font-medium border-b-2 border-brass hover:text-ink-light transition-colors px-1 py-3"
          >
            Log in
          </Link>
        </div>
      </section>

      {/* Ledger-style index of what it covers */}
      <section className="max-w-2xl mx-auto px-6 pb-24">
        <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-4 text-center">
          WHAT'S ON RECORD
        </p>
        <div className="border-t border-b border-paper-line divide-y divide-paper-line">
          {entries.map((entry) => (
            <div key={entry.label} className="flex items-baseline gap-3 py-4">
              <span className="font-display text-ink font-medium whitespace-nowrap">
                {entry.label}
              </span>
              <span className="flex-1 border-b border-dotted border-muted/40 translate-y-[-4px]" />
              <span className="text-sm text-muted whitespace-nowrap">{entry.detail}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
