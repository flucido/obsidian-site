# obsidian-site

Internal knowledge base for **wellfull + LTC** — a Next.js 15 web app that reads an Obsidian vault and serves it as a password-protected website. No database, no CMS. The vault is the source of truth.

---

## How it works

1. An Obsidian vault lives locally (default: `~/workspace`).
2. `sync.sh` copies selected vault directories into `content/`, then commits and pushes to this repo.
3. The Next.js app reads `content/` at request time (no build step required for content updates).
4. A middleware token-gate protects every route — you log in once, get a 30-day cookie.

---

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5, strict mode |
| Package manager | Bun |
| State (dashboard) | Zustand 5 |
| Auth | httpOnly cookie + env-var token list |
| Markdown | Custom hand-rolled renderer (no remark/marked) |
| Analytics | Vercel Analytics |

---

## Project structure

```
content/          Vault content (git-tracked, written by sync.sh)
  Daily/          Daily notes
  Work/
    WFC/          Wellfull content — finance, marketing, studio subdirs
    LTC/          LTC content — finance, marketing subdirs
    Shared/       Cross-entity shared docs
  Research/       Research notes and competitive analysis
  leads/          Lead dossiers (one subdirectory per lead)
  Ops/            Ops runbooks, checklists, templates
  People/         Relationship notes
  MEMORY.md       Vault-level memory file

src/
  middleware.ts             Auth gate (runs on every request)
  lib/
    markdown.ts             All content utilities — file discovery, markdown renderer
  app/
    layout.tsx              Site-wide nav + metadata
    page.tsx                Home page
    login/                  Login page
    api/auth/               POST /api/auth — validates token, sets cookie
    dashboard/              Dashboard (Zustand-powered)
    daily/                  Daily notes section
    work/                   Work index + [...slug] catch-all
    research/               Research index + [slug] route
    leads/                  Leads index + [...slug] catch-all
    ops/                    Ops index + [...slug] catch-all
```

---

## Auth

Authentication uses a shared-secret token model — no user accounts.

- Set one or more access tokens in the environment:
  ```
  ACCESS_TOKENS=token-one,token-two
  ```
- Visiting any page redirects to `/login` if no valid cookie is present.
- Submitting a token via the login form calls `POST /api/auth`. On success, an `httpOnly` cookie (`auth_token`) is set for 30 days.
- If `ACCESS_TOKENS` is not set, the middleware lets all requests through (useful for local dev without a `.env`).

---

## Content utilities (`src/lib/markdown.ts`)

All content reading and rendering lives here. Key exports:

| Export | Purpose |
|---|---|
| `getContentFiles(dir)` | Returns top-level `.md` files in a content subdirectory as `ContentFile[]` (`{ slug, path, title }`) |
| `getContentSections(dir, label?)` | Returns a `ContentSection[]` — one section for top-level files, then one per immediate subdirectory. Used for index pages. |
| `readContentFile(relativePath)` | Reads a file from `content/` and returns its string contents |
| `findFileBySlugPath(baseDir, segments)` | Case-insensitive lookup: maps a URL slug array (e.g. `['wfc', 'pipeline']`) to a file path under `content/<baseDir>/` |
| `getSubdirFiles(baseDir, filename)` | Finds `filename.md` in each immediate subdirectory (used for leads dossiers) |
| `renderMarkdown(markdown)` | Full render pipeline — wikilinks → callouts → headings → bold/italic → HR → tables → lists → blockquotes → paragraphs |
| `resolveWikiLinks(markdown)` | Converts `[[wikilinks]]` to standard markdown links |
| `renderTables(markdown)` | Converts pipe-table blocks to `<table>` HTML |

---

## Markdown rendering

The renderer is a sequential pipeline of regex passes — no AST. Features supported:

- `# H1` through `###### H6` headings
- `**bold**`, `*italic*`, `` `inline code` ``
- ` ```fenced code blocks``` `
- `- / * / 1.` ordered and unordered lists
- `> blockquotes`
- `| table | syntax |` pipe tables (with header separator row)
- `---` horizontal rules
- Obsidian-style callouts: `> [!note] Title`
- `[[WikiLinks]]` and `[[WikiLinks|Custom Label]]`

---

## Content sync

```bash
./sync.sh              # syncs from ~/workspace (default vault path)
./sync.sh /path/to/vault  # sync from a custom path
```

The script:
1. Validates the target is an Obsidian vault (checks for `.obsidian/` directory).
2. Copies `Daily/`, `Work/`, `Research/`, `leads/`, `Ops/`, `People/`, and `MEMORY.md` into `content/`.
3. Runs `git add content/ && git commit && git push` automatically.

To sync without committing, comment out the git block at the bottom of `sync.sh`.

---

## Local development

```bash
# Install dependencies
bun install

# Copy .env.example and set your token
cp .env.example .env.local
# edit .env.local: ACCESS_TOKENS=your-token-here

# Start dev server
bun run dev
```

The app runs at `http://localhost:3000`. Login at `/login` with any token from `ACCESS_TOKENS`.

If `ACCESS_TOKENS` is not set, the auth gate is disabled and you can browse without logging in.

---

## Deployment

The app is designed for Vercel.

1. Push this repo to GitHub (already done).
2. Import the repo in Vercel.
3. Add the `ACCESS_TOKENS` environment variable in the Vercel project settings.
4. Deploy. Content updates are picked up by redeploying or via ISR (no ISR is currently configured — content is read at request time, so a new deploy is needed to reflect sync).

> **Tip:** Trigger a Vercel deploy webhook from `sync.sh` after pushing to make content updates go live automatically.

---

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `ACCESS_TOKENS` | No* | Comma-separated list of valid access tokens. If omitted, auth is disabled. |

*Required in production — without it, the site is publicly accessible.

---

## Adding a new content section

1. Add the vault directory name to the `DIRS` array in `sync.sh`.
2. Create `src/app/<section>/page.tsx` — use `getContentSections('<VaultDir>', 'Label')` for the index.
3. Create `src/app/<section>/[...slug]/page.tsx` — use `findFileBySlugPath('<VaultDir>', slug)` to resolve files.
4. Add a nav link in `src/app/layout.tsx`.
