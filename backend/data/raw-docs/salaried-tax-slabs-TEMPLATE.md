# Pakistan Personal Income Tax — Salaried Individuals (Sample Reference Doc)

> ⚠️ PLACEHOLDER DATA — for RAG pipeline testing only. Must be replaced with
> verified, current text sourced directly from FBR (fbr.gov.pk) and the
> Income Tax Ordinance, 2001 before this assistant gives real answers.
> Tax slabs change with each Finance Act, so the ingestion pipeline should
> always pull the latest official notification rather than relying on any
> hardcoded figures.

## Structure this document should eventually follow

1. **Applicable tax year** — clearly stated at the top of each slab table
2. **Filer category** — salaried individual vs. non-salaried / business individual
   (they are taxed under different slab tables)
3. **Slab table** — income range → tax rate / fixed amount + rate on excess
4. **Source citation** — which FBR notification / Finance Act section it comes from
5. **Effective date range** — so retrieval can pick the version valid for the
   user's tax year, not an outdated one

## Notes for the RAG pipeline

- Each tax year's slab table should be its own chunk (don't merge multiple
  years into one chunk — it causes the retriever to mix up rates)
- Always attach a citation + effective date to every chunk's metadata
- The chatbot's system prompt should instruct it to state the tax year it is
  answering for, and to recommend the user confirm on fbr.gov.pk or with a
  tax consultant before filing
