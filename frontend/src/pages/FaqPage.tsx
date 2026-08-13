import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const faqs = [
  {
    q: "Who needs to file an income tax return in Pakistan?",
    a: "Generally, salaried individuals above a certain income threshold and anyone with an NTN are required to file. Exact thresholds are set by FBR each tax year, and the chatbot can walk you through how it applies to your situation.",
  },
  {
    q: "What's the difference between a salaried and non-salaried filer?",
    a: "Salaried individuals are taxed under a specific slab table for employment income, while non-salaried (business or freelance) individuals fall under a different slab table with different rates.",
  },
  {
    q: "What documents do I need to file?",
    a: "Typically your CNIC, salary certificate or slips, bank statements, and NTN. Ask the chatbot for a full checklist based on your filer type.",
  },
  {
    q: "How do freelancers register for an NTN?",
    a: "Freelancers can register through FBR's IRIS portal using their CNIC. The chatbot can walk you through the registration steps and what counts as taxable freelance income.",
  },
  {
    q: "What happens if I file my return late?",
    a: "Late filing can lead to penalties and being excluded from the Active Taxpayer List, which affects things like bank transaction rates. Ask the chatbot about current deadlines and penalty structure.",
  },
  {
    q: "Is this app a replacement for a tax consultant?",
    a: "No. Tax-Assist AI is an informational tool to help you understand tax concepts and the filing process. Always confirm details with FBR or a licensed consultant before filing.",
  },
];

export default function FaqPage() {
  return (
    <div className="min-h-full flex flex-col">
      <div className="flex-1 bg-paper-dim px-4 py-16">
        <div className="max-w-xl mx-auto">
          <p className="font-mono text-xs tracking-[0.2em] text-brass-dark mb-2 text-center">
            RECORDED QUESTIONS
          </p>
          <h1 className="font-display text-3xl font-medium mb-3 text-ink text-center">
            Frequently Asked
          </h1>
          <p className="text-sm text-muted text-center mb-8 leading-relaxed">
            A quick reference for the most common questions. For anything more
            specific to your situation, the chat assistant can dig into detail.
          </p>
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
          <p className="text-sm text-muted text-center mt-8">
            Didn't find your answer? <Link to="/chat" className="text-ink border-b border-brass">Ask the assistant</Link>
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
