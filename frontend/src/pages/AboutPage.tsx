import StampMark from "../components/StampMark";
import Footer from "../components/Footer";

const stack = [
  { group: "Frontend", items: "React, TypeScript, Tailwind CSS, Vite" },
  { group: "Backend", items: "Node.js, Express.js, MongoDB" },
  { group: "Retrieval", items: "Vector similarity search over chunked source documents" },
  { group: "Language model", items: "Google Gemini, for embeddings and answer generation" },
];

export default function AboutPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 bg-paper-dim px-4 py-16">
        <div className="max-w-2xl mx-auto bg-paper border border-paper-line rounded-sm p-8 relative mb-8">
          <StampMark size={48} className="text-ink/15 absolute top-6 right-6" />
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">ABOUT THIS SERVICE</p>
          <h1 className="font-display text-3xl font-medium mb-5 text-ink">Tax-Assist AI</h1>
          <p className="mb-6 text-text leading-relaxed">
            Tax-Assist AI is a Retrieval-Augmented Generation (RAG) chatbot built
            to help salaried individuals and freelancers in Pakistan understand
            their personal income tax — tax slabs, deductions, and the filing
            process — by retrieving answers from official FBR documents rather
            than relying on the model's own memory.
          </p>
          <div className="border-t border-paper-line pt-5">
            <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">DISCLAIMER</p>
            <p className="text-sm text-muted leading-relaxed">
              This tool is for general informational purposes only and does not
              constitute professional tax advice. Tax rules and slabs change with
              each Finance Act — always confirm current figures on{" "}
              <a href="https://fbr.gov.pk" className="text-ink border-b border-brass" target="_blank" rel="noreferrer">
                fbr.gov.pk
              </a>{" "}
              or with a licensed tax consultant before filing.
            </p>
          </div>
        </div>

        <div className="max-w-2xl mx-auto bg-paper border border-paper-line rounded-sm p-8 mb-8">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">HOW IT WORKS</p>
          <h2 className="font-display text-2xl font-medium mb-5 text-ink">Behind the answer</h2>
          <ol className="space-y-4">
            <li className="flex gap-4">
              <span className="font-mono text-brass-dark text-sm shrink-0">01</span>
              <p className="text-sm text-text leading-relaxed">
                Your question is converted into a numeric representation that
                captures its meaning, not just its exact wording.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-brass-dark text-sm shrink-0">02</span>
              <p className="text-sm text-text leading-relaxed">
                That representation is compared against a library of chunks
                pulled from FBR guidance and the Income Tax Ordinance, and the
                closest matches are retrieved.
              </p>
            </li>
            <li className="flex gap-4">
              <span className="font-mono text-brass-dark text-sm shrink-0">03</span>
              <p className="text-sm text-text leading-relaxed">
                Those matches, and only those matches, are handed to the
                language model to write a grounded answer, along with a note
                on which source it came from.
              </p>
            </li>
          </ol>
        </div>

        <div className="max-w-2xl mx-auto bg-paper border border-paper-line rounded-sm p-8">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2">BUILT WITH</p>
          <h2 className="font-display text-2xl font-medium mb-5 text-ink">Technology stack</h2>
          <div className="divide-y divide-paper-line">
            {stack.map((s) => (
              <div key={s.group} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 py-3">
                <span className="font-mono text-xs text-brass-dark w-28 shrink-0 uppercase tracking-wide">
                  {s.group}
                </span>
                <span className="text-sm text-text">{s.items}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
