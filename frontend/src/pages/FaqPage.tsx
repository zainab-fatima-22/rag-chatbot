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
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">Frequently Asked Questions</h1>
      <div className="space-y-4">
        {faqs.map((item, i) => (
          <div key={i} className="bg-white shadow rounded-xl p-4">
            <p className="font-medium text-slate-800 mb-1">{item.q}</p>
            <p className="text-sm text-slate-500">{item.a}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
