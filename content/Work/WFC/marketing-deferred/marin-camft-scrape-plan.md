# Marin CAMFT Directory Scrape + Competitive Analysis Plan

> **Strategy update 2026-06-01:** This plan has been repurposed for **market intelligence**
> rather than cold outreach lead generation. WFC is inbound-only.
> Directory data informs: social content targeting, competitive benchmarking,
> therapist pain-point validation, and SEO keyword research.

## Purpose

Market intelligence — understand the Marin County therapist website landscape
to inform content strategy, not to build an outreach list.

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

### Step 2: Filter to Actionable Research Subjects

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

**Privacy note:** Email addresses are collected for market research statistics only. No outreach will be sent.

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

## Phase 3: Content Strategy Insights (replaces Lead Generation)

The data from Phases 1-2 feeds:

1. **Social content targeting:** Which platforms dominate? (e.g., "83% DIY templates" stat)
2. **Pain-point validation:** How many sites have no HTTPS? No mobile? Dated design?
3. **Competitor awareness:** Which agencies/designers already serve this market?
4. **SEO keywords:** What language do therapists use to describe their practices?
5. **Price anchoring:** What are competitors charging? (if visible)

### Output: Content Strategy Brief
Summary of insights for social media content calendar and website copy.

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
4. `Work/WFC/marketing/content-strategy-brief.md` — Content strategy insights from the data

> ~~`leads/marin-priority-leads.md` — REMOVED. No longer generating outreach lists.~~
> ~~`screenshots/marin/` — REMOVED. No longer capturing lead-specific screenshots.~~

---

## Timeline Estimate

| Phase | Effort | Output |
|-------|--------|--------|
| Phase 1 — Directory scrape | ~20 min (automated) | CSV with 571 therapists |
| Phase 2 — Website analysis | ~30 min/50 sites (batched) | Audit CSV + competitive summary |
| Phase 3 — Content insights | ~10 min (automated) | Content strategy brief |

---

*Plan generated: 2026-05-18*
*Repurposed for market intelligence: 2026-06-01*
