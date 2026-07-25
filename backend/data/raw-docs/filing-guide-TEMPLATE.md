# FBR Filing Process — Salaried Individuals (Sample Reference Doc)

> ⚠️ PLACEHOLDER — outlines the *structure* this doc should have once filled
> with verified content from fbr.gov.pk. Do not treat any content below as
> accurate filing instructions yet.

## Sections to fill in from official sources

1. **Who must file** — income thresholds, NTN requirements
2. **Required documents** — CNIC, salary certificate, bank statements, etc.
3. **Step-by-step filing via IRIS** (FBR's e-filing portal)
4. **Common deductions/credits** — Zakat, charitable donations, pension
   contributions, etc. (with the relevant Ordinance section cited)
5. **Deadlines & penalties** — filing deadline for the tax year, late filing
   penalty structure
6. **FAQs** — common student/salaried-employee questions

## Notes for the RAG pipeline

- Chunk by section (one chunk per numbered section above), not by paragraph —
  keeps retrieved context coherent for multi-step questions like
  "what documents do I need and how do I file"
- Tag each chunk with `doc_type: filing_guide` in metadata so retrieval can
  be filtered separately from `doc_type: tax_slabs`
