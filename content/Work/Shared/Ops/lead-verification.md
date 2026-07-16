# WFC Lead Discovery + Verification

## When to Use
When discovering or qualifying outbound leads for Wellful Collective (therapist website design).

## The One Rule
**Every lead MUST pass 5 verification gates before any outreach draft is written.**
No exceptions. Three fabricated leads were generated 2026-05-15 because no gates existed.

## Discovery Sources (use these — never fabricate)
1. Psychology Today directory: https://www.psychologytoday.com/us/therapists/{state}
2. TherapyDen: https://www.therapyden.com/search
3. State License Boards (CA Psychology: psychology.ca.gov, CA BBS: bbs.ca.gov)
4. LinkedIn — cross-reference practitioner names
5. Google Maps — search for practice addresses

## 5 Verification Gates
All must pass. Collect evidence for each:

| Gate | Check | How |
|------|-------|-----|
| G1 | Domain resolves | `host domain.com` |
| G2 | Website loads + matches name | browser_navigate → verify content |
| G3 | License is active | PT profile or state board lookup |
| G4 | PT or equivalent directory listing | Must have verified profile |
| G5 | ≥1 additional source | LinkedIn, faculty page, Google Maps |

## After Verification
1. Take screenshot of homepage (browser_vision)
2. Build dossier → save to `/workspace/leads/{name-slug}/dossier.md`
3. Update `/workspace/leads/PIPELINE.md`
4. Present dossier + screenshot path to user for human review
5. DO NOT write outreach draft until human approves dossier

## Red Flags (auto-reject)
- Domain NXDOMAIN
- Website content doesn't match practitioner
- No license found
- No directory listing
- Single-source only (no cross-reference possible)

## Target Verticals
- PsyD — Clinical Psychologists with private practice websites
- MFT — Licensed Marriage and Family Therapists
- LCSW — Licensed Clinical Social Workers
- Learning Specialists — Educational resource professionals

## Output
Each lead gets: dossier.md (all evidence) + screenshot + pipeline entry.
Nothing gets sent without human approval.
