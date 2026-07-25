import { Link } from "react-router-dom";

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 text-slate-800 px-4">
      <h1 className="text-3xl font-bold mb-2">Tax-Assist AI</h1>
      <p className="text-slate-500 max-w-md text-center">
        RAG-powered assistant for Pakistan personal income tax — salaried &amp;
        freelancer filers. Project scaffolding — Day 1. Chat interface, auth,
        and RAG pipeline coming in upcoming modules.
      </p>
      <p className="text-xs text-slate-400 max-w-md text-center mt-4">
        Informational only — not a substitute for a licensed tax consultant or FBR.
      </p>
    </div>
  );
}
