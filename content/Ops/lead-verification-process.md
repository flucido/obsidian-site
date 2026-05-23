# Lead Verification Process

## Purpose
Before any outbound draft is written, every lead MUST pass all verification gates. 
No exceptions. The three original WFC leads (Nathan Meyer, Deborah Char, Lauren McGinn) 
were fabrications — zero of their domains resolved. This process prevents recurrence.

## Phase 1: Discovery (find real people)

### Source Directories (use these — not AI hallucination)
1. **Psychology Today** — https://www.psychologytoday.com/us/therapists/{state}
   - Every therapist is verified by PT, has a license number, endorsements
   - Extract individual profile pages — they contain website URLs, license #s, emails
2. **TherapyDen** — https://www.therapyden.com/search
3. **State License Boards:**
   - CA Board of Psychology: https://www.psychology.ca.gov/
   - CA BBS (LMFT, LCSW, LPCC): https://www.bbs.ca.gov/
4. **LinkedIn** — cross-reference names
5. **Google Maps** — search "{specialty} therapist private practice {city}" to find practices with websites

### Discovery Search Pattern
```
Step 1: Search Psychology Today for target vertical + region
Step 2: Extract profiles that list an independent website URL (not just PT profile link)
Step 3: Verify the website URL actually resolves (DNS check)
Step 4: Visit the website and capture screenshot
Step 5: Cross-reference across minimum 3 independent sources
```

## Phase 2: Identity Verification Gates

ALL gates must pass before a lead enters the pipeline:

| Gate | Check | Method | Minimum |
|------|-------|--------|---------|
| **G1: Domain** | Website resolves in DNS | `host domain.com` | Must return A record |
| **G2: Website** | Page loads with matching content | Browser visit + screenshot | 200 status, content matches practitioner name |
| **G3: License** | Professional license is active | State board lookup | License # must be verifiable |
| **G4: Directory** | Listed on Psychology Today or equivalent | PT profile check | 1 verified directory profile |
| **G5: Cross-ref** | Name + practice appears on ≥1 additional independent source | LinkedIn, Google Maps, university faculty page | 1 additional source beyond G3+G4 |

### Verification Evidence Required
For each lead, collect:
- [ ] DNS resolution output (copy terminal output)
- [ ] Screenshot of live website (browser_vision or browser_navigate)
- [ ] Psychology Today profile URL + extracted license number
- [ ] State board lookup result (or PT verification if board lookup unavailable)
- [ ] One additional independent source URL (LinkedIn, faculty page, Google Maps, etc.)

## Phase 3: Dossier Assembly

After passing all gates, build a dossier with:

1. **Identity & Credentials** — Full name, license #, education, years in practice, languages
2. **Practice Details** — Address, phone, email, website, fees, insurance, format
3. **Specialties** — Top 3 + full list from PT profile
4. **Website Audit** — Platform, HTTPS, mobile, design quality, differentiation, SEO
5. **Offer Fit** — WFC-01 (Landing Page), WFC-02 (CMS Site), or WFC-03 (Support)
6. **Verification Sources** — URLs of every source used, with ✅ marks
7. **Confidence Rating** — HIGH (5+ sources), MEDIUM (3-4), LOW (<3 = REJECT)

Save dossier to: `/workspace/leads/{name-slug}/dossier.md`

## Phase 4: Screenshot Capture

For every verified lead:
1. Navigate to their website with browser_navigate
2. Capture with browser_vision (screenshot saved automatically)
3. Note screenshot path in dossier
4. Present screenshot path to user

## Red Flags (auto-reject)
- Domain returns NXDOMAIN
- Website loads but content is unrelated to named practitioner
- License number doesn't appear in state board database
- No Psychology Today or equivalent directory listing
- Name + practice combination appears nowhere else on the web
- Website is a parked domain or generic landing page

## File Structure
```
leads/
├── PIPELINE.md                    ← Master pipeline registry
├── {name-slug}/
│   ├── dossier.md                 ← Verification evidence + full profile
│   ├── draft.md                   ← Outreach email (only after human approves dossier)
│   └── screenshots/
│       └── homepage-{date}.png    ← Website screenshot
```

## Pipeline Entry Criteria
A lead enters the pipeline ONLY after:
1. All 5 verification gates pass
2. Dossier is complete with screenshots
3. Human reviews and approves the dossier
4. An outreach draft is written and approved separately
