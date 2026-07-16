---
title: Squarespace Development — Developer Reference
created: 2026-07-14
updated: 2026-07-14
type: developer-reference
status: complete
audience: WFC team + future developer handoff
tags: [wfc, squarespace, 7.1, fluid-engine, developer-reference, neuroaesthetic, methodology]
related:
  - "[[Work/WFC/studio/heuristics]]"
  - "[[Work/WFC/studio/principles]]"
  - "[[Work/WFC/studio/tokens-colors]]"
  - "[[Work/WFC/studio/page-archetype-landing]]"
  - "[[leads/wfc-susan-allen/audit/README]]"
---

# Squarespace Development — Developer Reference

> A working reference for any WFC engagement that lands on Squarespace. Covers architecture, what you can and can't do, frameworks, plan-tier gating, hard limits, and the customization ladder from "drag-and-drop" to "embed a React app." Built 2026-07-14 against Squarespace 7.1 + Fluid Engine (current as of mid-2026).

## TL;DR

Squarespace 7.1 + Fluid Engine is a **content platform, not a development framework**. You get visual editing and templated content, but you do **not** get source-level control of the template engine. Customization is layered on a fixed scaffolding: drag-and-drop → custom CSS → code injection → page-specific code blocks → (7.0 only) Developer Platform with full template access. For Susan's engagement (and most WFC work), we live in the first four layers and never touch the 7.0 Developer Platform. If a client ever needs anything outside that ladder, the honest answer is "we should probably migrate to a real framework like Next.js or Astro."

---

## 1. Pros and cons

### Pros

| # | Pro | Why it matters for WFC |
|---|-----|------------------------|
| 1 | **Beautiful, opinionated templates.** ~200 templates, all designed in-house. Warm/aesthetic quality is high — Susan's `Clove` is a good example. | Saves us from "blank canvas" paralysis. We can start from a high-quality design and adapt. |
| 2 | **Hosting, SSL, CDN, security all included.** Squarespace runs the infrastructure. No DevOps. | Removes the "is the site up?" question entirely. |
| 3 | **All-in-one: CMS + commerce + email + scheduling + analytics.** A single vendor, a single bill. | Susan gets Squarespace Email Campaigns + Acuity Scheduling (if she ever wants it) on the same platform. |
| 4 | **Built-in SEO basics:** automatic sitemaps, clean semantic HTML, mobile-responsive templates, image alt text, SSL. | For a solo therapist, this is enough. Phase 1 SEO/GEO work doesn't need a plugin. |
| 5 | **Worry-free updates.** Squarespace patches the platform; templates get security fixes automatically. | We don't have to maintain a Squarespace-specific security lifecycle for the client. |
| 6 | **Content editing is client-friendly.** Susan can log in and edit her own copy, blog posts, photos. | We hand off a site Susan can actually use after the engagement ends. WFC's OKF scaffold (per SOW § 3.1.8) leans on this — Susan maintains her own content. |
| 7 | **Plan tier tiers are reasonable.** Personal $16/mo, Core $23/mo, Business $36/mo, Commerce $40/mo. | Susan's already paying for Squarespace; she doesn't need to upgrade unless she wants scheduling or e-commerce. |
| 8 | **7.1 templates all share the same feature set.** No "did you pick the right template?" feature lottery (unlike 7.0). | Reduces client risk. The template Susan picks has the same capabilities as any other 7.1 template. |

### Cons

| # | Con | Real-world impact for WFC |
|---|-----|--------------------------|
| 1 | **Page speed is mediocre vs. GoDaddy / Wix.** Squarespace ships a lot of JS. | Noticeable in Core Web Vitals. Less of an issue on 7.1 than 7.0, but still behind a custom Next.js build. |
| 2 | **No real "developer experience" in 7.1.** No Git, no local dev, no source maps for the template engine. | Our customizations live in a long Custom CSS field + scattered code blocks. Version control is on us. |
| 3 | **No server-side code.** PHP, Ruby, Node, SQL — none. | Can't build custom APIs, dynamic features, member areas, or anything that needs a database. |
| 4 | **Limited third-party ecosystem.** No plugin marketplace comparable to WordPress. | We can't Yoast, WooCommerce, or ACF our way out of a gap. Native features or hand-rolled JS in code blocks. |
| 5 | **Custom code is unsupported by Squarespace.** Anything we inject is "outside the scope of Squarespace support." | If Squarespace changes their DOM, our custom CSS may break. They may or may not warn us. |
| 6 | **The platform can change without notice.** Squarespace has sunset features (AMP in Feb 2025, the Adobe editor in 2018, the 7.0 Developer Platform for 7.1 in 2024). | Long-term work needs defensive CSS/JS that survives platform updates. The `.ProductItem-additional` class is being removed **June 5, 2026** — anyone targeting it now is broken in 6 months. |
| 7 | **No autosave.** Editors must click Save. | Susan will lose work if she forgets. Worth a coaching note. |
| 8 | **The platform imposes its own opinion about what "good" looks like.** Templates push you toward their aesthetic. | For WFC's neuroaesthetic work, the platform's defaults may fight our principles. We're constantly overriding them with Custom CSS. |
| 9 | **Personal plan has limited custom code.** Code blocks accept HTML/CSS/Markdown, but the Custom CSS editor is on all plans while Code Injection requires Core+. | Susan is presumably on Personal or Core. If she's on Personal and we want Code Injection, we need to flag the upgrade. |
| 10 | **No real staging environment.** Preview exists but isn't a full separate environment. | Risky for bigger changes. We develop in the live editor with Save carefully. |

---

## 2. Architectural overview (Squarespace 7.1 + Fluid Engine)

### The mental model: 4 nested concepts

```
Site
  └── Pages
        └── Sections (in a section-based layout)
              └── Blocks (atomic content units)
```

- **Site** = one Squarespace account, one domain, one set of Site Styles.
- **Page** = a URL. Several page types: standard, blog post, product, event, gallery, project, index, cover, password-protected.
- **Section** = a horizontal slice of a page. Either:
  - **Fluid Engine section** (most common in 7.1) — free-form grid with movable blocks
  - **Classic editor section** — older 12-column grid (still exists for blog posts, events, gallery, list sections)
  - **Pre-built section** — Squarespace templates have named "Auto Layout" sections (e.g., "About Me", "Services Grid") that combine blocks into a curated pattern.
- **Block** = the atomic content unit. Text, image, button, video, form, map, code, etc. ~40 block types in 7.1. In Fluid Engine, blocks can be freely placed and resized within a 24-column grid, with optional row/column snapping.

### The Fluid Engine grid

- 24 columns wide. Sections are defined either by:
  - **Number of rows** (you add rows as you add content)
  - **Fill Height** (section takes the full viewport height, useful for fullscreen hero)
- Grid gap is configurable (controls spacing between rows and columns).
- Blocks can:
  - Snap to the grid (clean alignment)
  - Be pulled outside the grid (intentional overlap, e.g., for design moments)
- One-way conversion: Classic → Fluid. **You cannot go back.** If we convert a section to Fluid and we want classic behavior, we're stuck. (Undo works before Save; not after.)
- Fluid Engine is **not** available on:
  - Blog posts (classic editor)
  - Event descriptions
  - Gallery sections
  - List sections (collection-based content like blog index, product index)
  - Cover pages (legacy 7.0 feature)

### Site Styles — the "design system" of your site

- **Site Styles** is the panel where you set site-wide design tokens. It's the closest thing Squarespace has to a "design system."
- Tweak categories:
  - **Fonts:** 1,500+ Google Fonts + Adobe Fonts + "Font Packs" (curated pairings). Four key font groups: Headings, Paragraphs, Buttons, Misc.
  - **Colors:** Color Palette (5 shades) → 10 generated Color Themes. Each section can use a different theme, so you can mix light/dark sections on a single page.
  - **Animations:** Site-wide page-load animations + scroll-in animations
  - **Spacing:** Site margin, section padding, block spacing
  - **Buttons:** Three button styles (primary, secondary, tertiary), each with its own size/shape/fill
  - **Forms:** Field styles, submit button
  - **Image blocks:** Crop, fit, focal point
  - **Misc:** Border radius, paragraph spacing
- **In 7.1, sections can have their own theme** (this is the big win over 7.0 where everything was site-wide). Susan can have a dark hero, a light "About" section, a colored "Specialties" section — all on one page.
- Site Styles don't reach everything. Custom CSS fills the gaps.

### Pre-built templates (what we started with)

- ~200 templates in the gallery, all 7.1-compatible since Squarespace Refresh 2025.
- Templates are not "code" — they're a saved configuration of sections + blocks + content. Picking a template = picking a starting point.
- "Blueprint templates" (Squarespace Refresh 2025) are templates pre-filled with curated AI content for a specific industry.
- Templates you pick can be changed (mostly) — except Fluid Engine sections that are at the section level, not the template level, can be customized freely. Template switching is a bigger change but is allowed in 7.1.

---

## 3. What developers have access to (7.1)

The customization ladder, from least invasive to most invasive:

### Tier 1 — No-code editing (Site Editor)
- **Fluid Engine** drag-and-drop sections
- **Auto Layouts** (Squarespace's pre-curated section patterns — "About", "Services", "Team", "Testimonial", etc.)
- **Site Styles** panel
- **Pages panel** — page tree, navigation structure
- **Commerce** (if applicable) — products, inventory, checkout
- **Acuity Scheduling** (if applicable) — built-in scheduling
- **Email Campaigns** (Squarespace's own email tool)

### Tier 2 — Custom CSS (all plans, 128,000 char limit)
- **Where:** Pages → Custom Code → Custom CSS
- **What:** Site-wide CSS. Can target any class or data attribute on the page.
- **Supports LESS preprocessor** (Squarespace-specific syntax; check current docs — some sources say LESS, some say CSS only).
- **Use sparingly.** Squarespace recommends not using it for padding/margins/floats/sizes/positioning because Site Styles already has those. But in practice, we will.
- **Tweaks 2.0** (7.0 only, Circle members) — export/import Site Styles as JSON for design system work. Not available in 7.1.

### Tier 3 — Code Injection (Core+ plan, ~10,000 char limit per field)
- **Where:** Pages → Custom Code → Code Injection
- **Fields:**
  - **Site Header** — `<head>` tag, every page
  - **Site Footer** — `</body>` tag, every page
  - **Page Header / Page Footer** — per-page, in page settings → Advanced
  - **Order Confirmation Page** — for e-commerce
  - **Order Status Page** — for e-commerce
  - **Lock Page** — for password-protected pages
- **What:** HTML, JavaScript (in `<script>`), CSS (in `<style>`). Tracking pixels, analytics, third-party widgets, JSON-LD structured data.
- **FOUC warning:** Code injected here loads AFTER the page renders. This causes "Flash of Unstyled Content" and delayed JS execution. Workarounds: use CSS in the Custom CSS panel, use `defer` on script tags.

### Tier 4 — Code Blocks (all plans for CSS/HTML, Core+ for JS)
- **Where:** Edit any page → Add Block → Code
- **What:** HTML/CSS/Markdown on all plans. JavaScript/iframe on Core+.
- **Limit:** 400 KB (~300,000 characters) per block.
- **Use case:** Embed a single custom element — a calculator, a third-party widget, a form, a React app's mount point.

### Tier 5 — Embed Block (all plans)
- **Where:** Edit any page → Add Block → Embed
- **What:** oEmbed-standard embeds (YouTube, Vimeo, Spotify, etc.). Some custom HTML.

### Tier 6 — Embed a React app (all plans, advanced)
- **How:** Host a built React bundle somewhere (S3, GitHub Pages, Vercel), reference it in a Code Block:
  ```html
  <div id="my-react-root"></div>
  <script defer src="https://your-cdn.com/bundle.js"></script>
  ```
  The bundle searches for `#my-react-root` and mounts.
- **Limitation:** No SSR, no React Server Components. Pure client-side.
- **Use case:** When Susan needs an interactive component the platform doesn't have natively (e.g., a symptom self-checker for postpartum anxiety, fully styled to WFC's tokens).

### Tier 7 — Developer Platform (7.0 ONLY, Business+ plan, **deprecated for 7.1**)
- **Where:** Settings → Advanced → Developer Mode
- **What:** Full Git-based access to the template's underlying files. You can edit HTML, CSS, JS, layouts, regions, custom collections.
- **Status:** **Not available on 7.1 sites.** 7.0 sites can use it. If we need this level of control, we need to either:
  1. Stay on 7.0 (deprecated, will lose features over time)
  2. Migrate off Squarespace to a real framework

### Tier 8 — Public APIs
- Squarespace has a Commerce API, an Inventory API, and an Orders API for read/write to commerce data.
- **No general content API** for blog posts, pages, custom content.
- **No webhooks** for most events (some commerce-related webhooks exist).
- For Susan's use case (no commerce, no scheduling), the API surface is mostly irrelevant.

---

## 4. What developers do NOT have access to

This is the critical list for any developer doing serious work on Squarespace:

| # | Not available | Why it matters |
|---|---------------|----------------|
| 1 | **No source-level control of the template engine** | We can't read or edit the React component tree that renders the page. Customization is via DOM selectors. |
| 2 | **No server-side code** (PHP, Node, Ruby, SQL, etc.) | No databases, no user accounts, no member areas, no dynamic server-rendered content. |
| 3 | **No Git, no local dev, no staging** | Customizations live in the live editor. Mistakes go live. Version control is on us to maintain externally. |
| 4 | **No plugin marketplace** | No Yoast, no WooCommerce, no ACF. Native features or hand-rolled code. |
| 5 | **No control over Squarespace's own DOM** | When Squarespace refactors classes (e.g., `.ProductItem-additional` removal June 2026), our custom CSS targeting those classes breaks. |
| 6 | **No member/account features on standard plans** | Member Areas exist but only on Business+ plans, and they're a closed ecosystem — no auth API. |
| 7 | **No real form webhooks** | Form submissions land in Squarespace's storage. You can email-forward them, but you can't POST to a custom URL on the cheap plans. |
| 8 | **No control over Squarespace's own scripts** | We can't remove the Squarespace badge, the in-page analytics, the YUI legacy scripts. |
| 9 | **No multi-currency, no POS, limited payment processors** | Commerce is improving but still behind Shopify/WooCommerce. Not relevant for Susan. |
| 10 | **No ability to A/B test** | No native experimentation framework. Third-party (Google Optimize, VWO) needs Code Injection. |
| 11 | **No control over `robots.txt`** | Squarespace auto-generates one, but you can't edit it. |
| 12 | **No `nofollow` link attribute control at the page level** | You can add it via custom CSS attribute selectors, but it's hacky. |
| 13 | **No autosave** | Editor work must be saved manually. |
| 14 | **No undo across sessions** | Undo is in-memory. If you close the editor, you can't undo yesterday's changes. |

---

## 5. Frameworks and tech stack

Squarespace itself is a closed-source SaaS, but here's what's known and relevant:

### What Squarespace uses internally (from engineering blog + reverse-engineering)
- **Frontend rendering:** Originally **YUI (Yahoo User Interface) framework** for the legacy block editors. Now migrating to **React** for new editor surfaces. The 7.1 block editor is React-based.
- **JSON Schema Forms (JSF):** Squarespace's internal framework for rendering block editor UIs. uiSchemas are JSON files describing visual compositions. They built **uischema-builder** to help developers write these without drowning in JSON.
- **Rosetta:** Squarespace's internal design system. New block editors use Rosetta for consistency.
- **Server-side:** Java-based backend (legacy), Node.js for newer services. PostgreSQL for the data layer.
- **Yarn** for build tooling (yarn worker:prod, yarn start, etc. visible in the Docker setup).
- **Docker** for the self-hosted deployments (as we run at 100.82.161.32:3020 for our Twenty CRM, which is a different product, but Squarespace itself runs the same kind of stack).

### What you can use (in your own code)
- **Anything client-side.** The Custom CSS panel accepts modern CSS. The Code Block accepts HTML + JS.
- **Frameworks via Code Block:** React, Vue, Svelte, jQuery, vanilla JS — all work if you host the bundle somewhere and reference it.
- **Libraries via Code Injection:** Anything in npm that you can bundle. GSAP for animations, Chart.js for charts, Mapbox/Leaflet for maps (better than the native Squarespace map), etc.
- **CDN-hosted libraries** (jQuery, Bootstrap, etc.) can be referenced directly.

### What you can NOT use
- **No Node.js, no NPM, no build tooling in the Squarespace editor itself.** All build/dev happens outside, in your local machine or a build service.
- **No version control integration** beyond the 7.0 Developer Platform (which requires GitHub).
- **No TypeScript-aware tooling.** You'll write JS and CSS by hand, or pre-build and inject.

---

## 6. Plan tier gating (the practical "what do I get")

| Feature | Personal ($16/mo) | Core ($23/mo) | Business ($36/mo) | Commerce Basic/Advanced |
|---------|:-----------------:|:-------------:|:-----------------:|:-----------------------:|
| Custom CSS | ✅ | ✅ | ✅ | ✅ |
| Code Block (HTML/CSS/Markdown) | ✅ | ✅ | ✅ | ✅ |
| Code Block (JavaScript) | ❌ | ✅ | ✅ | ✅ |
| Code Injection (header/footer) | ❌ | ✅ | ✅ | ✅ |
| Acuity Scheduling | ❌ | ❌ | ✅ | ✅ |
| Email Campaigns | ❌ | ✅ | ✅ | ✅ |
| Member Areas | ❌ | ❌ | ✅ | ✅ |
| Squarespace Extensions (Mailchimp etc.) | ❌ | ✅ | ✅ | ✅ |
| Commerce | ❌ | ❌ | ❌ | ✅ |
| 7.0 Developer Platform (if 7.0) | ❌ | ❌ | ✅ | ✅ |

**For Susan's engagement:**
- She needs Custom CSS (all plans)
- She needs Code Block (JS) for any custom interactive elements — **Core+ required**
- She doesn't need Code Injection for our Phase 1 work — but it's nice to have for the JSON-LD structured data WFC's SOW mentions
- She doesn't need Member Areas, Acuity, or Commerce

**Recommendation:** Verify Susan's plan tier before we start. If she's on Personal, we should flag the upgrade to Core ($23/mo) for Code Injection + Code Block JS. The WFC deliverable of a Critique Report + design system tokens + custom CSS may push into 100K+ characters over time.

---

## 7. Hard limits to plan around

| Limit | Value | Implication |
|-------|-------|-------------|
| Custom CSS character limit | 128,000 chars | ~3,000-4,000 lines of CSS. Enough for a substantial design system, but watch it. |
| Code Injection character limit | ~10,000 chars per field | Enough for tracking pixels + JSON-LD, not for a full app. |
| Code Block size limit | 400 KB (~300,000 chars) | Plenty for an embedded React bundle (after compression). |
| Number of pages in 7.1 update tool | 150 | Not a limit on a 7.1 site, just on the 7.0→7.1 migration tool. |
| Pages per site | Effectively unlimited for content sites | Susan won't hit this. |
| File upload size | 20 MB per file | Enough for high-res photos and PDFs. |
| Number of custom CSS fields | 1 site-wide | Not segmented by section. |
| Page-level code injection | 2 fields per page (header + footer) | Modest; per-page is for fine-grained tracking. |
| Custom collections (7.0 only) | N/A in 7.1 | Irrelevant. |

---

## 8. Recommended approach for WFC client work (esp. Susan)

### Default strategy (covers ~80% of WFC engagements)

1. **Start with a Squarespace 7.1 template** that matches the archetype (`landing`, `content`, `intake`, etc.). For Susan, **Clove** is the leading candidate.
2. **Customize Site Styles** to apply WFC's tokens (Calm Base palette, typography, spacing).
3. **Layer WFC's 6-gate critique framework** on top — see [[Work/WFC/studio/heuristics]].
4. **Use Custom CSS** for the rest (H1 fix, hierarchy corrections, WFC's typography).
5. **Use Code Injection** for site-wide extras: JSON-LD structured data (Phase 1 SEO), Plausible/Google Analytics, Open Graph image defaults.
6. **Use Code Blocks** sparingly — only for genuinely custom interactive elements.
7. **Hand off** with a "How to maintain this site" doc that explains the OKF scaffold (per Susan's SOW § 3.1.8) so Susan can update her own content.

### When to escalate off Squarespace

- If the client needs member accounts, a real database, server-side logic, or a custom checkout → migrate to Next.js + Vercel (or similar).
- If the client needs more than 4-5 pages of custom interactive features → likely a framework issue.
- If page speed becomes the dominant SEO factor (e.g., they're competing in a high-volume SERP) → migrate.

### What we will NOT do

- 7.0 Developer Platform (deprecated; forces the client onto a sinking ship).
- Modify Squarespace's own scripts (unsupported, will break).
- Hard-code to `.ProductItem-additional`-class CSS that we know is being removed June 5, 2026.
- Use the email-only intake form from Squarespace for HIPAA-sensitive contexts (Squarespace forms are not HIPAA-compliant; that's why Susan's SOW § 3.1.9 keeps intake in email).

---

## 9. Links and sources

### Official Squarespace documentation
- [Adding custom code to your site](https://support.squarespace.com/hc/en-us/articles/205815928-Adding-custom-code-to-your-site) — the canonical reference for code-injection rules
- [Using code injection](https://support.squarespace.com/hc/en-us/articles/205815908-Using-code-injection) — header/footer/order/lock page fields
- [Code blocks](https://support.squarespace.com/hc/en-us/articles/206543167-Code-blocks) — page-level HTML/CSS/JS embedding
- [Edit your site with Fluid Engine](https://support.squarespace.com/hc/en-us/articles/6421525446541-Edit-your-site-with-Fluid-Engine) — the editor docs
- [Fluid Engine — Drag and Drop Website Editor](https://www.squarespace.com/websites/fluid-engine) — official landing page
- [Making style changes](https://support.squarespace.com/hc/en-us/articles/205815788-Making-style-changes) — Site Styles panel
- [Style changes FAQ](https://support.squarespace.com/hc/en-us/articles/206544597-Style-changes-FAQ) — version differences
- [Changing colors](https://support.squarespace.com/hc/en-us/articles/205815278-Changing-colors) — color palette + theme system
- [Developer Platform FAQ](https://support.squarespace.com/hc/en-us/articles/206545717-Squarespace-Developer-Platform-FAQ) — 7.0-only feature
- [Quick Start — Squarespace Developers](https://developers.squarespace.com/quick-start) — Developer Platform
- [Squarespace Developers home](https://developers.squarespace.com/) — API + Developer Platform
- [Moving from 7.0 to 7.1](https://support.squarespace.com/hc/en-us/articles/360038270572-Moving-from-Squarespace-version-7-0-to-version-7-1) — migration guide
- [Discontinued features](https://support.squarespace.com/hc/en-us/articles/206544757-Discontinued-features) — what's been retired
- [Squarespace Extensions](https://support.squarespace.com/hc/en-us/articles/360000975547-Squarespace-Extensions) — official integrations catalog
- [Using Mailchimp with Squarespace](https://support.squarespace.com/hc/en-us/articles/205815508-Using-Mailchimp-with-Squarespace) — for the marketing angle

### Engineering blog (Squarespace's own posts on architecture)
- [How We Improved Our Core Block Editing Experience (2021)](https://engineering.squarespace.com/blog/2021/how-we-improved-our-core-block-editing-experience) — explains the JSF, uiSchema, Rosetta, React migration. The clearest primary source for "how Squarespace works under the hood."

### Upcoming deprecations (act on these)
- [`.ProductItem-additional` Class Deprecation](https://developers.squarespace.com/changes/productItem-additional-deprecation) — class removed **June 5, 2026**
- [Products V2 migration (August 30, 2025)](https://static1.squarespace.com/static/535522c9e4b0ecf5755f4156/t/686d1692f42fbb66dcba3391/1751979668243/Products-V2-8July2025.pdf) — 7.0 sites won't benefit from new features

### Independent reviews (pros/cons)
- [16 Pros and Cons of Squarespace in 2025 — SEOSpace](https://www.seospace.co/blog/squarespace-pros-and-cons)
- [Squarespace Review 2026 — Website Builder Expert](https://www.websitebuilderexpert.com/website-builders/squarespace-review/)
- [Squarespace Review 2026 — Tooltester](https://www.tooltester.com/en/reviews/squarespace-review/)
- [Squarespace Review 2026 — Style Factory](https://www.stylefactoryproductions.com/blog/squarespace-review)
- [Squarespace Developer Mode (2026) Ultimate Guide — Spark Plugin](https://www.sparkplugin.com/blog/squarespace-developer-mode)
- [Squarespace Developer Mode Limitations — bknd](https://www.bknddevelopment.com/resources/squarespace-developer-limitations/)

### Migration references (if a client needs to leave Squarespace)
- [Squarespace → Next.js migration guide](https://www.browsercat.com/post/migrate-squarespace-to-nextjs) — when to consider Next.js vs. Astro

---

## 10. Quick reference for the Susan engagement

- **Goal:** Stay on Squarespace. Adapt a 7.1 template (Clove primary) to WFC's neuroaesthetic standards. Avoid platform footguns.
- **Verify plan tier:** Susan needs Core+ for Code Injection and Code Block JS. Phase 1 will use Code Injection for JSON-LD; Phase 2 may need Code Block for AI-findability tracking.
- **Custom CSS budget:** 128,000 chars. WFC's Calm Base palette + 6-gate overrides + SOW § 3.1 (8 hrs of work) probably fits in 20-30K chars. Plenty of headroom.
- **DOM selectors to avoid:** Anything that depends on a specific Squarespace class. Use semantic class names + `data-section-id` + theme classes (e.g., `.dark-theme`) for stability.
- **The 6/5/2026 `.ProductItem-additional` removal** doesn't affect Susan (no commerce) but flag for future e-commerce clients.
- **Recommended: Build a "How to maintain this site" handoff doc** for Susan that covers: editing copy, adding blog posts, updating the OKF scaffold, checking Core Web Vitals, when to call us vs. when to do it herself.
