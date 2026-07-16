---
title: K-12 Privacy and Security — Project Notes
created: 2026-07-15
updated: 2026-07-15 21:54
type: project-notes
tags: [research, k12, privacy, security, ferpa, cipa, cybersafe, local-data-stack]
status: ACTIVE — project notes. First entry: Cloudflare Cybersafe Schools reference (Frank 7/15 21:54 PT). This is the "K-12 privacy and security project" Frank referenced when adding the note.
---

# K-12 Privacy and Security — Project Notes

> **The project:** Frank's overall K-12 privacy + security workstream.
> Spans the local-data-stack's data-warehouse-side privacy layer, the
> surrounding district cybersecurity posture, the EDM/LA research paper's
> privacy framing, and the FPF (Future of Privacy Forum) connection
> through Jim Siegl. This file is the **project container** — a place
> for ongoing notes, references, and external resources. Not a PRD.

> **Not a single artifact.** The actual work is scattered across:
> - The local-data-stack repo's privacy layer (`oss_framework/dbt/models/mart_privacy/`)
> - The Stage 2B technical design (`oss_framework/dbt/STAGE2B_PRIVACY_DESIGN.md`)
> - The FPF resource list in `Research/`
> - The Jim Siegl lead + his PETs (Privacy-Enhancing Technologies) PDFs in `leads/ltc-jim-siegl/`
> - The EDM/LA research paper handoff at `research/deep-research-prototypes-edm-ai/HANDOFF.md`
> - The K-12 outreach workstream (looking for co-authors + case-study partners)

---

## 1. The two layers of K-12 data privacy

| Layer | What it is | Where | Notes |
|-------|------------|-------|-------|
| **Data-warehouse side** | Pseudonymization, PII masking, k-anonymity, access control on the warehouse tables | `local-data-stack/oss_framework/dbt/models/mart_privacy/` + `STAGE2B_PRIVACY_DESIGN.md` | The local-data-stack's primary privacy work. SHA256 hashing, k≥5 aggregation, restricted lookup table. |
| **District cybersecurity side** | Email protection, DNS filtering, MFA, RBAC, training — the *surrounding* posture that protects the access paths to the data | External vendors + district IT | This is where Cloudflare Cybersafe Schools lives. See §3 below. |

**The relationship:** Stage 2B protects the *data*; the cybersecurity layer protects the *users + access paths* to that data. They're complementary, not substitutable.

## 2. Compliance landscape (Frank's reference)

- **FERPA (Family Educational Rights and Privacy Act)** — federal. Governs access to student education records. Local-data-stack's `priv_pii_lookup_table` + access controls are the FERPA response.
- **CIPA (Children's Internet Protection Act)** — federal E-Rate requirement. Requires content filtering that "protects against access by minors to visual depictions that are obscene, child pornography, or harmful to minors." Cloudflare Cybersafe Schools' DNS filtering is positioned as a CIPA-compliance mechanism.
- **California Student Privacy Framework** — state-level, layered on top of FERPA. The local-data-stack works inside this for California K-12 districts.
- **COPPA (Children's Online Privacy Protection Act)** — under-13, applies if districts adopt consumer-facing tools.
- **State Student Privacy Laws (50-state map)** — FPF maintains this. See `Research/Future of Privacy Forum Resources to review .md` for the URL.

## 3. 🆕 Cloudflare Project Cybersafe Schools (added 2026-07-15)

> **Why this matters:** the local-data-stack is a privacy-by-design data
> warehouse, but a small district adopting the stack also needs the
> surrounding cybersecurity layer. Most small K-12 districts can't
> afford it. Cloudflare's Project Cybersafe Schools fills that gap
> *for free*. This is a strong value-add to mention in district
> outreach — "we help with the data warehouse, and here's a free
> program for the email + DNS layer that protects it."

- **URL:** https://www.cloudflare.com/lp/cybersafe-schools/
- **Program:** Project Cybersafe Schools
- **Launched:** 2023-08-08 at the White House "Back to School Safely" K-12 Cybersecurity Summit
- **Eligibility:** K-12 public school districts in the United States with **up to 2,500 students**
- **Cost:** Free, no time limit, no catch
- **Coverage:** ~9,800 eligible districts in the US; 60,000+ students/teachers/staff currently protected
- **What it provides:**
  - **Email Protection** — cloud email security against BEC, multichannel phishing, credential harvesting, malware-less attacks
  - **DNS Filtering** — prevents users from reaching ransomware / phishing sites; CIPA compliance mechanism
- **How it complements the local-data-stack:**
  - Frees district budget for analytics work (where this OSS framework helps)
  - Defense-in-depth: even if an analyst pastes a query URL into a phishing site, the DNS layer blocks the connection
  - CIPA compliance done → one less compliance item for the district IT team
- **District outreach angle:** mention in kickoff meetings, in the case-study paper, and on the wellfullcollective/WFC marketing site if it ever pivots to serving school IT teams

**Source verification:** the Cloudflare landing page is JS-gated (Cloudflare Turnstile); web search confirms the details (Cloudflare's own blog + the Cloudflare Fundamentals docs page at developers.cloudflare.com/fundamentals/reference/policies-compliances/cybersafe/).

**Already cross-referenced:**
- `local-data-stack/oss_framework/dbt/models/mart_privacy/README.md` — added "Free External Resources" section
- `local-data-stack/oss_framework/dbt/STAGE2B_PRIVACY_DESIGN.md` — added §11 "See Also"

## 4. FPF (Future of Privacy Forum) — connection

- **URL:** https://fpf.org/
- **Local contact:** Jim Siegl — `leads/ltc-jim-siegl/`. FPF practitioner with deep K-12 privacy expertise. Author of the PETs (Privacy-Enhancing Technologies) for Education Researchers paper.
- **PETs (Privacy-Enhancing Technologies) for State Education Agencies** — relevant to the EDM/LA paper. PETs are tools that let districts do analytics on student data without exposing raw PII. Could be a citation in the case-study paper.
- **Resource list in vault:** `Research/Future of Privacy Forum Resources to review .md`

## 5. Connection to the EDM/LA research paper

The K-12 privacy and security work has direct implications for the EDM/LA case-study paper:

- **B-arc (Privacy / synthetic data) thesis** (from `04-CASE-STUDY-PLAN.md`): "Open-source K-12 education analytics — combining a privacy-preserving DuckDB warehouse, a fine-tuned NL-to-SQL model, and state-accountability-aligned Rill dashboards — can be deployed in a district and meaningfully shift who has access to accountability data, and the failure modes of the LLM components are predictable and addressable."
- The privacy layer (Stage 2B) is the technical foundation for the privacy contribution. Cite in the methods section.
- The Cybersafe Schools reference is a useful "in practice, partner districts should also adopt X" note in the discussion section.

## 6. Open questions (for Frank)

1. **Is there a "K-12 privacy and security" project file anywhere else in the vault?** I checked `Research/` and `Work/` and didn't find a top-level one. This NOTES.md is the first.
2. **Should this become a phase-2 product?** E.g., a "K-12 district privacy + security stack" service that includes the local-data-stack warehouse + a curated bundle of free external resources (Cybersafe Schools, etc.) + a privacy review. Could be a follow-up to the EDM/LA papers.
3. **Jim Siegl follow-up.** He's an FPF practitioner; is he a potential co-author for the EDM/LA paper's privacy framing? Worth exploring.
4. **What about non-California states?** The local-data-stack is California-specific (CA Dashboard alignment). The privacy + security layer is more general. Worth noting in any pitch that the framework is "California-flavoured but the privacy/security substrate is portable."

## 7. Next actions

- [ ] (Optional) Reach out to Jim Siegl about the PETs paper as a citation for the EDM/LA case study
- [ ] (Optional) Add Cybersafe Schools to the district outreach template (in the "what else should you know" section)
- [ ] (Already done) Add Cybersafe Schools reference to `mart_privacy/README.md` and `STAGE2B_PRIVACY_DESIGN.md`
- [ ] (TBD) Decide if/when to formalize the K-12 privacy + security workstream as a separate product line

## 8. Related artifacts in the vault

- `Research/Future of Privacy Forum Resources to review .md` — FPF URL list
- `leads/ltc-jim-siegl/` — Jim Siegl's PDFs (PETs landscape, scenarios, toolkit)
- `~/projects/local-data-stack/oss_framework/dbt/models/mart_privacy/README.md` — the privacy layer README (now updated with Cybersafe Schools reference)
- `~/projects/local-data-stack/oss_framework/dbt/STAGE2B_PRIVACY_DESIGN.md` — the privacy technical design (now updated with §11 "See Also")
- `~/projects/local-data-stack/SECURITY.md` — top-level security policy
- `~/projects/local-data-stack/research/deep-research-prototypes-edm-ai/HANDOFF.md` — EDM/LA research handoff (mention the privacy framing in B-arc)

*Last updated: 2026-07-15 21:54 PT*
