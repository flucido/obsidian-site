---
title: Content Pipeline — frank-lucido-site
created: 2026-06-10
updated: 2026-06-10
type: reference
tags:
  - ltc
  - web-dev
  - content
  - marketing
  - sop
sources:
  - AGENTS.md
  - Work/LTC/marketing/content-calendar.md
---

# Content Pipeline

> Blog publishing workflow, LinkedIn cross-posting, and content strategy for frank-lucido-site.

## Content Sources

| Source | Location | Format |
|--------|----------|--------|
| Payload Blog | Payload CMS admin (`/admin`) | Lexical rich text |
| Outstatic Blog | `/outstatic` CMS | Markdown (git-backed) |
| MDX Files | `src/content/blog/*.mdx` | MDX (static) |
| LinkedIn Posts | `Work/LTC/marketing/ltc-li-post-*.md` | Reviewed drafts |
| Content Drafts | `Work/LTC/marketing/Drafts/` | Long-form, PDFs, strategy |

## Blog Workflow

### Writing a New Blog Post

1. **Draft** — Write in Obsidian under `Work/LTC/marketing/Drafts/`
2. **Review** — Check against [[Work/LTC/website/design-system|brand voice]] and content standards
3. **Publish** — Add to Payload CMS Blog collection OR save as MDX in `src/content/blog/`
4. **Verify** — Check live at `lucidotechnologyconsulting.com/blog/[slug]`

### Content Standards (from memory)

- Blog: scannable H2/H3, data-led, no filler
- LinkedIn Articles: deep-dive
- LinkedIn Posts: mobile-readable, short ¶s, hook in first 2 lines, sharp close
- Tone: grounded, authoritative
- **Banned:** "fast-paced digital world", "Delve deeper", "Revolutionary"

### Publish Hook

When a Payload Blog post transitions from draft → published, `src/utilities/generateLinkedInDraft.ts` fires automatically. This generates a LinkedIn draft for cross-posting. It's fire-and-forget — do not block the publish action on it.

## LinkedIn Cross-Posting

### Reviewed LinkedIn Posts (in workspace)

Posts live under `Work/LTC/marketing/` with date-stamped filenames:
- `ltc-li-post-2026-05-18-data-ownership.md`
- `ltc-li-post-2026-05-19-california-student-privacy.md`
- `ltc-li-post-2026-05-23-building-it-infra.md`
- `ltc-li-post-2026-05-26-ferpa-compliance.md`
- `ltc-li-post-2026-05-28-data-debt.md`
- `ltc-li-post-2026-05-30-open-source.md`

### Content Calendar

- [[Work/LTC/marketing/content-calendar|LTC Content Calendar]]
- [[Work/LTC/marketing/linkedin-content-calendar|LinkedIn Content Calendar]]

### Blog Output Pipeline

Draft → Reviewed → Published on site → LinkedIn adaptation → Post

```
Work/LTC/marketing/Drafts/
  └── output/
      ├── BLOG-01-institutional-data-debt.md
      ├── BLOG-02-data-sovereignty-operational-practice.md
      ├── BLOG-03-seven-layer-privacy-stack.md
      ├── BLOG-04-edfi-oss-framework.md
      ├── BLOG-05-open-auditing-advantage.md
      ├── LI-01-support-ticket-trap.md
      ├── LI-02-ferpa-marketing-fiction.md
      ├── LI-03-data-tenants-vs-owners.md
      ├── LI-04-open-auditing.md
      ├── LI-05-90k-to-18k-math.md
      └── LI-ARTICLE-test.md (×3)
```

## Content Strategy Notes

- Sisyphus notepads at `.sisyphus/notepads/content-strategy/` contain decisions, issues, learnings, problems
- LinkedIn profile positioning: `Work/LTC/marketing/personal-profile.md`
- FAQ and objection handling: `Work/LTC/marketing/faq-objection-handling.md`
