import { Link } from "react-router-dom";
import StampMark from "../components/StampMark";
import Footer from "../components/Footer";
import { usePageTitle } from "../hooks/usePageTitle";

const entries = [
  { label: "Tax slabs", detail: "Know exactly which bracket applies to your income" },
  { label: "Deductions", detail: "Zakat, pension, and charitable contribution credits" },
  { label: "Filing steps", detail: "Walk through IRIS filing without the guesswork" },
  { label: "Deadlines", detail: "Never miss a filing date or a penalty warning" },
];

const steps = [
  {
    num: "01",
    title: "Ask in plain language",
    text: "Type your question the way you'd ask a friend, no tax jargon required.",
  },
  {
    num: "02",
    title: "We search official sources",
    text: "Your question is matched against FBR guidance and the Income Tax Ordinance, not general internet knowledge.",
  },
  {
    num: "03",
    title: "Get a grounded answer",
    text: "The assistant answers using only what it found, and tells you which document it came from.",
  },
];

const audiences = [
  { title: "Salaried employees", text: "Understand your slab, withholding, and what deductions you can claim." },
  { title: "Freelancers", text: "Figure out NTN registration, filer status, and how your income is taxed." },
  { title: "First time filers", text: "Get a plain language walkthrough of the IRIS filing process." },
];

export default function LandingPage() {
  usePageTitle("Home");
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1">
        {/* Hero */}
        <section className="max-w-3xl mx-auto px-6 pt-20 pb-16 text-center">
          <StampMark size={64} className="text-ink mx-auto mb-6" />
          <h1 className="font-display text-5xl sm:text-6xl font-medium text-ink leading-[1.05] mb-5">
            Your income tax,
            <br />
            explained plainly.
          </h1>
          <p className="text-muted text-lg max-w-xl mx-auto mb-9 leading-relaxed">
            Tax-Assist AI answers your Pakistan personal income tax questions,
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
        <section className="max-w-2xl mx-auto px-6 pb-20">
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

        {/* How it works */}
        <section className="bg-paper-dim py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2 text-center">
              HOW IT WORKS
            </p>
            <h2 className="font-display text-3xl text-ink text-center mb-12">
              From question to grounded answer
            </h2>
            <div className="grid sm:grid-cols-3 gap-8">
              {steps.map((step) => (
                <div key={step.num} className="bg-paper border border-paper-line rounded-sm p-6">
                  <p className="font-mono text-brass-dark text-sm mb-3">{step.num}</p>
                  <h3 className="font-display text-lg text-ink mb-2">{step.title}</h3>
                  <p className="text-sm text-muted leading-relaxed">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Who it's for */}
        <section className="max-w-4xl mx-auto px-6 py-20">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2 text-center">
            WHO THIS IS FOR
          </p>
          <h2 className="font-display text-3xl text-ink text-center mb-12">
            Built around real filer questions
          </h2>
          <div className="grid sm:grid-cols-3 gap-8">
            {audiences.map((a) => (
              <div key={a.title} className="text-center px-2">
                <h3 className="font-display text-lg text-ink mb-2">{a.title}</h3>
                <p className="text-sm text-muted leading-relaxed">{a.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA band */}
        <section className="bg-ink text-paper py-16 px-6 text-center">
          <h2 className="font-display text-2xl mb-4">Ready to understand your taxes?</h2>
          <p className="text-paper/70 text-sm mb-6 max-w-md mx-auto">
            Create a free account and ask your first question in under a minute.
          </p>
          <Link
            to="/register"
            className="inline-block bg-brass text-ink-dark font-medium rounded px-6 py-3 hover:bg-brass-light transition-colors"
          >
            Create your account
          </Link>
        </section>
      </div>

      <Footer />
    </div>
  );
}
