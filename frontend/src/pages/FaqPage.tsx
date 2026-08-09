const faqs = [
  {
    q: "Who needs to file an income tax return in Pakistan?",
    a: "Generally, salaried individuals above a certain income threshold and anyone with an NTN are required to file. Exact thresholds are set by FBR each tax year — the chatbot will pull the current figure once the RAG pipeline is live.",
  },
  {
    q: "What's the difference between a salaried and non-salaried filer?",
    a: "Salaried individuals are taxed under a specific slab table for employment income, while non-salaried (business/freelance) individuals fall under a different slab table with different rates.",
  },
  {
    q: "What documents do I need to file?",
    a: "Typically your CNIC, salary certificate/slips, bank statements, and NTN. A full checklist will be available once the filing guide document is ingested.",
  },
  {
    q: "Is this app a replacement for a tax consultant?",
    a: "No — Tax-Assist AI is an informational tool to help you understand tax concepts and the filing process. Always confirm details with FBR or a licensed consultant before filing.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-[calc(100vh-40px)] bg-paper-dim px-4 py-16">
      <div className="max-w-xl mx-auto">
        <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2 text-center">
          RECORDED QUESTIONS
        </p>
        <h1 className="font-display text-3xl font-medium mb-8 text-ink text-center">
          Frequently Asked
        </h1>
        <div className="border-t border-paper-line">
          {faqs.map((item, i) => (
            <details key={i} className="group border-b border-paper-line py-4">
              <summary className="flex items-baseline gap-3 cursor-pointer list-none">
                <span className="font-mono text-xs text-brass-dark shrink-0">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-ink font-medium">{item.q}</span>
              </summary>
              <p className="text-sm text-muted leading-relaxed mt-3 pl-7">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
