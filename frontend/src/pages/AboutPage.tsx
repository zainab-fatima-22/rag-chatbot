export default function AboutPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-10 text-slate-700">
      <h1 className="text-2xl font-bold mb-4 text-slate-800">About Tax-Assist AI</h1>
      <p className="mb-4">
        Tax-Assist AI is a Retrieval-Augmented Generation (RAG) chatbot built
        to help salaried individuals and freelancers in Pakistan understand
        their personal income tax — tax slabs, deductions, and the filing
        process — by retrieving answers from official FBR documents rather
        than relying on the model's own memory.
      </p>
      <h2 className="text-lg font-semibold mt-6 mb-2 text-slate-800">Disclaimer</h2>
      <p className="text-sm text-slate-500">
        This tool is for general informational purposes only and does not
        constitute professional tax advice. Tax rules and slabs change with
        each Finance Act — always confirm current figures on{" "}
        <a href="https://fbr.gov.pk" className="underline" target="_blank" rel="noreferrer">
          fbr.gov.pk
        </a>{" "}
        or with a licensed tax consultant before filing.
      </p>
    </div>
  );
}
