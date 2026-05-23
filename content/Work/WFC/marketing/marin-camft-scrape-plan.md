# Marin CAMFT Directory Scrape + Competitive Analysis Plan

## Source
**URL:** https://marincamft.org/marin-therapist-directory
**Platform:** Wild Apricot CMS
**Total therapists:** 571 (across 12 pages, 50/page)
**Data per therapist:** Name, profile URL, phone, email, website, session type, locations, practice description

---

## Phase 1: Full Directory Scrape

### Step 1: Extract All Therapists (All 12 Pages)

Pagination works via a `<select>` dropdown with offset values: 0, 50, 100, 150, 200, 250, 300, 350, 400, 450, 500, 550.

For each page:
1. Navigate to the directory
2. Select the page offset in the dropdown
3. Parse `#membersTable` — each therapist spans 2 rows:
   - **Row A:** Columns: Name (with profile link), (empty), Contact Info (phone, email mailto, website href), Practice Description
   - **Row B:** Session type (Tele/In-person), sliding scale info, location

Extract fields:
```json
{
  "name": "string",
  "profile_url": "marincamft.org/Sys/PublicProfile/...",
  "phone": "string",
  "email": "string", 
  "website": "https://...",
  "session_types": ["tele", "in-person"],
  "description": "string",
  "page": 1
}
```

### Step 2: Filter to Actionable Leads

**Include:** Therapists with independent websites (not Psychology Today profiles, not empty)
- ✅ `www.{domain}.com` — independent practice site
- ❌ `psychologytoday.com/...` — PT profile only
- ❌ No website listed

**Expected yield:** ~52% of 571 = ~297 therapists with websites

### Step 3: Save Database

Save as CSV: `/Users/flucido/workspace/data/marin-camft-therapists.csv`

Columns:
```csv
name,license_type,email,phone,website,profile_url,session_type,city,description,page
```

---

## Phase 2: Website Competitive Analysis

For each therapist with an independent website:

### Step 1: Website Visit + Screenshot
- Navigate to the website
- Capture homepage screenshot
- Extract page title, meta description

### Step 2: Platform Detection
Check for known signatures:
- **Squarespace:** `templateId`, `squarespace`, `sqs-`
- **Wix:** `wix.com`, `wixsite`, `_wix`
- **WordPress:** `wp-content`, `wp-`, generator meta tag
- **Weebly:** `weebly`
- **Custom/Other:** None of the above

### Step 3: Designer Credit Detection
Search page source + visible footer for:
- `Designed by` / `Site by` / `Built by`
- `Theme by` / `Template by`
- Agency signatures in footer
- Commented credits in HTML
- `designer` / `developer` / `agency` keywords
- Common therapist site builders: Brighter Vision, TherapySites, GoodTherapy, Therapist.com

### Step 4: Design Quality Audit
Score each site on:
| Factor | Scale |
|--------|-------|
| Design quality | modern / acceptable / dated / very-dated |
| Mobile responsive | yes / partial / no |
| Content depth | deep / adequate / thin |
| Brand differentiation | high / medium / low |
| Platform | squarespace / wix / wordpress / custom / other |

### Step 5: Competitive Summary
Aggregate findings:
- Top platforms used by Marin therapists
- Most common designer/agency credits found
- Average design quality distribution
- Which designers/agencies are winning in this market
- Gap analysis: how many sites are dated and need redesign

---

## Phase 3: Prioritized Lead Generation

### Filter Criteria (highest-value prospects)
1. **Independent website exists** (not just PT profile)
2. **Design rated "dated" or "very-dated"**
3. **Has email address** (from directory)
4. **Licensed professional** (LMFT, LCSW, LPCC, PsyD — not pre-licensed)
5. **In-person or hybrid** (not telehealth-only — more likely to invest in local presence)

### Output: Prioritized Lead Table
Ranked by: (1 - design_quality) × has_email × is_licensed × local_presence

---

## Implementation

### Approach A: Browser Automation (this session)
Use browser_navigate + browser_console to iterate pages.
- Pro: Works now, no setup
- Con: Slow (~12 pages × scrape time)

### Approach B: Python Script (recommended)
Use execute_code with requests + BeautifulSoup.
- Pro: Fast, dump all 571 entries to CSV in one shot
- Con: Need to reverse-engineer the pagination mechanism (likely POST to Wild Apricot API)

### Approach C: Fire Crawlers (user suggested)
Use a dedicated scraping tool like Fire Crawlers for the directory.
- Pro: Purpose-built, handles JavaScript
- Con: External tool, may need setup

---

## Deliverables

1. `data/marin-camft-therapists.csv` — Full directory database
2. `data/marin-camft-website-audit.csv` — Website platform + designer + quality per therapist
3. `data/marin-camft-competitive-summary.md` — Aggregated competitive analysis
4. `leads/marin-priority-leads.md` — Top 20 prioritized leads from this source
5. `screenshots/marin/` — Homepage screenshots for top candidates

---

## Timeline Estimate

| Phase | Effort | Output |
|-------|--------|--------|
| Phase 1 — Directory scrape | ~20 min (automated) | CSV with 571 therapists |
| Phase 2 — Website analysis | ~30 min/50 sites (batched) | Audit CSV + competitive summary |
| Phase 3 — Lead prioritization | ~10 min (automated) | Top 20 leads with dossiers |

---

*Plan generated: 2026-05-18*
*Ready to execute on command*
