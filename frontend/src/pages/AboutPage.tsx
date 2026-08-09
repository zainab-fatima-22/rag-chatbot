import StampMark from "../components/StampMark";

export default function AboutPage() {
  return (
    <div className="min-h-[calc(100vh-40px)] bg-paper-dim px-4 py-16">
      <div className="max-w-xl mx-auto bg-paper border border-paper-line rounded-sm p-8 relative">
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
    </div>
  );
}
