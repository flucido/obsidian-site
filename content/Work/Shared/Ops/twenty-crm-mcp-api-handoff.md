---
title: Twenty CRM — MCP Server API Handoff
created: 2026-07-13
updated: 2026-07-13 16:00
type: reference
tags: [shared, twenty, crm, mcp, api, infrastructure]
status: active
related: [twenty-crm-how-to, stack-config-mcp-wiring]
audience: any app or client that needs to read/write Twenty CRM
---

# Twenty CRM — MCP Server API Handoff

> Reference for **using** the Twenty CRM MCP wrapper that runs on the Hermes VM.
> This is the doc you give to any app (script, Claude Desktop, custom dashboard, etc.)
> that needs to read or write your CRM.
>
> For installing / maintaining / upgrading the Twenty CRM service itself, see
> [[twenty-crm-how-to]]. For wiring the MCP into other agents, see
> [[stack-config-mcp-wiring]].

## TL;DR

| Field | Value |
|---|---|
| **Endpoint** | `http://100.82.161.32:3023/mcp` |
| **Transport** | Streamable HTTP (HTTP POST, JSON-RPC 2.0) |
| **Auth** | **None** — server is open on Tailscale, no API key, no Bearer token |
| **Required header** | `Content-Type: application/json` and `Accept: application/json, text/event-stream` |
| **Network requirement** | Caller must be on the Tailscale network (Mac side: `tailscale status` must show "Connected") |
| **Underlying service** | Twenty CRM v2.20.0 at `http://100.82.161.32:3020` (web UI), `/graphql` for direct GraphQL |
| **Server-side audit log** | Append-only JSON-L file on the VM; readable via `get_recent_activity` tool |

That's the whole "where to point at" story. Read on for the protocol, tools, and gotchas.

---

## 1. Network prerequisites

- **Tailscale must be running on the calling machine.** On the Mac: `tailscale status` should report "Connected" and the VM `100.82.161.32` should be in the peer list.
- If Tailscale stops, every HTTP MCP server (Twenty, Immich, etc.) becomes unreachable. Fix: `open -a Tailscale` (or `tailscale up` if auth lapsed).
- The MCP server is bound to the VM's Tailscale IP (`100.82.161.32`), **not** `0.0.0.0`. So it's only reachable from inside the tailnet, not the public internet.
- No VPN tunnel setup needed beyond Tailscale being up.

## 2. Protocol — JSON-RPC 2.0 over HTTP

Two MCP methods are exposed:

### 2a. `tools/list` — discover what's available

```bash
curl -s -X POST http://100.82.161.32:3023/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

Response: `{ "result": { "tools": [ ... ] } }` — see §3 for the full list.

### 2b. `tools/call` — invoke a tool

```bash
curl -s -X POST http://100.82.161.32:3023/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{
    "jsonrpc": "2.0",
    "id": 2,
    "method": "tools/call",
    "params": {
      "name": "list_companies",
      "arguments": { "limit": 5, "search": "allen" }
    }
  }'
```

Response shape:

```json
{
  "jsonrpc": "2.0",
  "id": 2,
  "result": {
    "content": [{ "type": "text", "text": "<JSON-stringified result>" }],
    "isError": false
  }
}
```

The actual tool payload is a **JSON string inside `content[0].text`** — parse it. `isError: true` means the tool itself failed; the string in `content[0].text` will be an error message.

---

## 3. Tool reference (19 tools, confirmed live 2026-07-13)

### 3.1 `list_companies`

List companies, with optional substring search on name.

| Param | Type | Default | Notes |
|---|---|---|---|
| `limit` | int | 10 | 1–100 |
| `search` | string | — | Case-insensitive substring match on `name` |

Returns:

```json
{
  "companies": [
    { "id": "uuid", "name": "...", "domain": "...", "annual_revenue": null, "currency": null }
  ],
  "pageInfo": { "hasNextPage": true, "endCursor": "<base64-cursor>" }
}
```

> No `email`, `phone`, `address`, `owner`, or `people` in the list view. Call `get_company` for the full record.

### 3.2 `get_company`

Get a single company by ID, including address, ARR, owner, and people.

| Param | Type | Required | Notes |
|---|---|---|---|
| `id` | UUID | yes | Pass the `id` returned by `list_companies` |

Returns: full company object.

> **KNOWN BUG:** the `address` sub-field is currently broken at the MCP layer with
> `Sub field metadata not found for composite type: ADDRESS`. Workaround: add or
> update address fields via the Twenty UI (Settings → Companies), or use the
> direct GraphQL endpoint (§6). Don't try to write addresses through the MCP.

### 3.3 `create_company`

Create a company record.

| Param | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `domain` | string | — | Primary website URL |
| `annual_revenue` | number | — | In **dollars** (the MCP converts to micros for you) |
| `account_owner_id` | UUID | — | Existing workspace member's user UUID |
| `agent` | string | — | **Set this.** Tag for audit log — e.g. `"hermes"`, `"mavis"`, `"my-app"` |

### 3.4 `update_company`

Update fields on an existing company. Same shape as `create_company` plus the `id`.

### 3.5 `list_people`

List people, with optional first-name search.

| Param | Type | Default | Notes |
|---|---|---|---|
| `limit` | int | 10 | 1–100 |
| `search` | string | — | Substring match on **first name** (last-name search not supported here) |

> Fixed 2026-07-13: was previously broken with composite-field orderBy error. Now
> works correctly with `orderBy: [{ name: { firstName: AscNullsLast } }]`.

### 3.6 `create_person`

Create a person record.

| Param | Type | Required | Notes |
|---|---|---|---|
| `first_name` | string | yes | |
| `last_name` | string | — | |
| `email` | string | — | |
| `job_title` | string | — | |
| `company_id` | UUID | — | Existing company UUID — **does** link the person to the company |
| `agent` | string | — | **Set this** for audit attribution |

### 3.7 — 3.10 Opportunities (added 2026-07-13)

#### 3.7 `list_opportunities`

| Param | Type | Default | Notes |
|---|---|---|---|
| `limit` | int | 10 | 1–100 |
| `search` | string | — | Case-insensitive substring match on `name` |
| `company_id` | UUID | — | Filter to opportunities on a specific company |

Order: `closeDate` DESC (most recent first, nulls last).

#### 3.8 `get_opportunity`

| Param | Type | Required |
|---|---|---|
| `id` | UUID | yes |

Returns: id, name, amount (micros + currency), stage, closeDate, probability, position, point_of_contact (string), company (string), created_at, updated_at.

#### 3.9 `create_opportunity`

| Param | Type | Required | Notes |
|---|---|---|---|
| `name` | string | yes | |
| `amount` | number | — | In **dollars** (MCP converts to micros as USD) |
| `stage` | string | — | Workspace-specific. Common values: `NEW`, `SCREENING`, `PROPOSAL`, `CUSTOMER`, `CLOSED_LOST`. Check your UI for the exact set. |
| `close_date` | string | — | ISO-8601 date (`YYYY-MM-DD` or full timestamp) |
| `company_id` | UUID | — | |
| `point_of_contact_id` | UUID | — | Person UUID |
| `agent` | string | — | Audit tag |

#### 3.10 `update_opportunity`

| Param | Type | Required | Notes |
|---|---|---|---|
| `id` | UUID | yes | |
| `name` / `amount` / `stage` / `close_date` / `probability` | various | — | Same shapes as `create_opportunity` |
| `agent` | string | — | Audit tag |

### 3.11 — 3.14 Tasks (added 2026-07-13)

#### 3.11 `list_tasks`

| Param | Type | Default | Notes |
|---|---|---|---|
| `limit` | int | 10 | 1–100 |
| `status` | string | — | Filter by status (e.g. `TODO`, `IN_PROGRESS`, `DONE`) |
| `assignee_id` | UUID | — | |

Order: `dueAt` ASC (soonest first, nulls last).

#### 3.12 `get_task`

| Param | Type | Required |
|---|---|---|
| `id` | UUID | yes |

#### 3.13 `create_task`

| Param | Type | Required | Notes |
|---|---|---|---|
| `title` | string | yes | |
| `body` | string | — | |
| `status` | string | — | Defaults to `TODO` |
| `due_at` | string | — | ISO-8601 timestamp |
| `assignee_id` | UUID | — | |
| `agent` | string | — | Audit tag |

#### 3.14 `update_task`

| Param | Type | Required | Notes |
|---|---|---|---|
| `id` | UUID | yes | |
| `title` / `body` / `status` / `due_at` / `assignee_id` | various | — | |
| `agent` | string | — | Audit tag |

> To mark a task complete: `update_task(id, status="DONE")`. Twenty
> auto-stamps `completedAt`.

### 3.15 — 3.18 Notes (added 2026-07-13; `create_note` extended)

#### 3.15 `list_notes`

| Param | Type | Default | Notes |
|---|---|---|---|
| `limit` | int | 10 | 1–100 |
| `title_search` | string | — | Case-insensitive substring match on title |

Order: most recently updated first.

#### 3.16 `get_note`

| Param | Type | Required |
|---|---|---|
| `id` | UUID | yes |

Returns: id, title, body (markdown), targets (list of `{id, company, person, opportunity}` — names flattened from composite `name` fields), created_at, updated_at.

#### 3.17 `create_note` (extended 2026-07-13)

| Param | Type | Required | Notes |
|---|---|---|---|
| `title` | string | — | |
| `body` | string | yes | Markdown body |
| `company_id` | UUID | — | If set, also creates a NoteTarget linking the note to this company |
| `person_id` | UUID | — | If set, also creates a NoteTarget linking the note to this person |
| `opportunity_id` | UUID | — | If set, also creates a NoteTarget linking the note to this opportunity |
| `agent` | string | — | Audit tag |

> **How linking actually works (verified 2026-07-13):** Twenty's `NoteCreateInput`
> rejects `noteTargets` (`One-to-many relation noteTargets field does not support
> write operations`). The MCP does the link via a **separate
> `createNoteTarget(data: { noteId, targetCompanyId })` call** under the hood.
> The response includes `"links": ["linked to company ..."]` showing what was
> attempted.
>
> **KNOWN UPSTREAM QUIRK (twentyhq/twenty #21164 family):** at the time of
> writing, `createNoteTarget(data: { noteId, targetCompanyId })` accepts the
> input but the resulting noteTarget's `company` relation comes back as `null`
> on read. The link record is created (separate ID) but the company isn't
> actually attached. For guaranteed linking, use the Twenty UI (open note →
> "Add to record"). Alternatively, file a bug on twentyhq/twenty with your
> repro and reference #21164.

#### 3.18 `update_note`

| Param | Type | Required | Notes |
|---|---|---|---|
| `id` | UUID | yes | |
| `title` | string | — | |
| `body` | string | — | Replacement markdown body |
| `agent` | string | — | Audit tag |

### 3.19 `get_recent_activity`

Read the **server-side audit log** (the one that records `agent` tags from every mutation).

| Param | Type | Default | Notes |
|---|---|---|---|
| `limit` | int | 25 | up to 200 |
| `agent` | string | — | Filter by agent tag (e.g. `"hermes"`, `"mavis"`) |

Returns entries like:

```json
{
  "ts": "2026-07-13T18:26:09.508788+00:00",
  "agent": "mavis",
  "action": "createNote",
  "target": "ba387cd6-5555-481d-9f59-972c5b2db0f1",
  "payload": { "title": "...", "body": "..." }
}
```

> This log is the **source of truth for per-agent attribution** in Twenty. The
> native Twenty activity log shows the workspace owner, not the agent that
> actually called the MCP. Use this for forensics, per-app usage reports, etc.

---

## 4. Code examples

### 4a. curl (any shell)

```bash
# List companies
curl -s -X POST http://100.82.161.32:3023/mcp \
  -H "Content-Type: application/json" \
  -H "Accept: application/json, text/event-stream" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"list_companies","arguments":{"limit":5}}}'
```

### 4b. Python

```python
import json
import requests

URL = "http://100.82.161.32:3023/mcp"
HEADERS = {
    "Content-Type": "application/json",
    "Accept": "application/json, text/event-stream",
}

def call(tool: str, args: dict, agent: str = "my-app", req_id: int = 1):
    """Call an MCP tool. Returns the parsed payload dict, or raises on error."""
    args.setdefault("agent", agent)  # auto-tag if the tool supports it
    body = {
        "jsonrpc": "2.0",
        "id": req_id,
        "method": "tools/call",
        "params": {"name": tool, "arguments": args},
    }
    r = requests.post(URL, headers=HEADERS, json=body, timeout=30)
    r.raise_for_status()
    result = r.json()["result"]
    if result.get("isError"):
        raise RuntimeError(f"Tool {tool} failed: {result['content'][0]['text']}")
    return json.loads(result["content"][0]["text"])

# Examples
companies = call("list_companies", {"limit": 10, "search": "allen"})
for c in companies["companies"]:
    print(c["id"], c["name"])

new_id = call("create_company", {"name": "Acme Corp", "domain": "acme.com", "agent": "my-app"})
```

### 4c. Node / TypeScript

```ts
const URL = "http://100.82.161.32:3023/mcp";

async function callMcp(tool: string, args: Record<string, unknown>) {
  const res = await fetch(URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json, text/event-stream",
    },
    body: JSON.stringify({
      jsonrpc: "2.0",
      id: 1,
      method: "tools/call",
      params: { name: tool, arguments: args },
    }),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const json = await res.json();
  if (json.result.isError) throw new Error(json.result.content[0].text);
  return JSON.parse(json.result.content[0].text);
}

const data = await callMcp("list_companies", { limit: 10, search: "allen" });
console.log(data.companies);
```

### 4d. From a native MCP client (Claude Desktop, Cursor, etc.)

Point your MCP client config at the URL with the `streamableHttp` / `http` transport:

```json
{
  "mcpServers": {
    "twenty": {
      "type": "http",
      "url": "http://100.82.161.32:3023/mcp"
    }
  }
}
```

(Exact key names vary by client — Claude Desktop uses `mcpServers` + `url`; some
clients use `transport: "http"` instead. Check your client's MCP docs.)

---

## 5. Field-name gotchas (the painful ones)

These come from real failures in this Twenty install. Don't re-learn them:

1. **Pagination syntax is wrong in half the tutorials.** Use:
   ```graphql
   companies(first: 5, orderBy: [{ name: AscNullsLast }]) {
     edges { node { id name } }
   }
   ```
   NOT `paging: { first: 5 }` and NOT `orderBy: name`.

2. **`orderBy` direction must be a full enum value.** Use `AscNullsLast` / `DescNullsFirst` etc. — not `ASC` / `DESC`.

3. **Don't trust field names you remember from another CRM.** This Twenty install's `Company` object does **not** have `employees` and does **not** have `annualRecurringRevenue`. It has `annualRevenue` (Currency — `amountMicros` + `currencyCode`). When in doubt, run a `tools/list` and read the `inputSchema`, or open the Twenty UI's API playground at `http://100.82.161.32:3020/settings/api-webhooks` and run a query there.

4. **Introspection is disabled on the production GraphQL endpoint** (`http://100.82.161.32:3020/graphql`). You cannot auto-discover the schema with `__schema` queries. The Twenty UI's API playground is the source of truth for object/field names.

5. **Tool input schema validation is lax.** Unknown args (e.g. `companyId` on `create_note`) are silently dropped, not rejected. If you pass something the tool doesn't support, no error — it just doesn't take effect. Always check the audit log (`get_recent_activity`) to confirm what was actually recorded.

---

## 6. Direct Twenty GraphQL — for when the MCP doesn't have it

The MCP wrapper is intentionally small (8 tools). If you need something it doesn't expose (e.g. `createOpportunity`, `updateNote`, `linkNoteToCompany`, anything to do with `address`), hit Twenty's GraphQL endpoint directly.

| Field | Value |
|---|---|
| **Endpoint** | `http://100.82.161.32:3020/graphql` |
| **Auth** | `Authorization: Bearer <TWENTY_API_KEY>` (ES256-signed JWT — see [[twenty-crm-how-to]] / TWENTY_API_KEY in `/home/ubuntu/20/.env`) |
| **Introspection** | **Disabled** — you can't run `__schema` queries. Use the UI playground to discover. |

```bash
curl -s -X POST http://100.82.161.32:3020/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TWENTY_API_KEY" \
  -d '{
    "query": "query { companies(first: 5) { edges { node { id name domain annualRevenue { amountMicros currencyCode } } } } }"
  }'
```

> **JWT signing notes (from the underlying API):** API keys in Twenty are
> ES256-signed JWTs, not opaque strings. The signing private key is encrypted
> at rest in the `core.signingKey` table (`enc:v2:<iv>:<ct>:<tag>`, AES-256-GCM,
> derived from `APP_SECRET`). Minting a per-user API key from scratch is **not
> trivial**. Practical pattern: use the existing owner key (read from `.env`)
> for all calls, and rely on the MCP server's audit log for per-app attribution.

---

## 7. What's NOT in the MCP (and what to do)

| Need | Workaround |
|---|---|
| `update_person` / `update_task` (delete) | Direct GraphQL — `updatePerson`, `updateTask`, `deleteTask`, `deleteNote` mutations aren't exposed yet. Add on request. |
| Update address fields | Direct GraphQL (after introspecting via the UI playground), or the UI. |
| Search by last name (people) | Direct GraphQL with a `filter` argument. |
| Custom-object reads (workspace-specific) | Direct GraphQL. |
| Guaranteed note→company link | Use the Twenty UI. The MCP's `create_note` with `company_id` *attempts* a link via `createNoteTarget(data: { targetCompanyId })` but Twenty's current API silently accepts the input without populating the relation. See §3.17. |

If you find yourself doing a direct-GraphQL dance repeatedly, **add a new tool
to the MCP wrapper** rather than spreading direct-GraphQL usage. Source lives on
the VM; ping Frank to add a tool.

---

## 8. Security

- **The MCP has no auth.** It relies entirely on Tailscale network membership.
  Anyone on your tailnet can call it. If you need public/external access, put
  it behind a reverse proxy with HTTPS and an auth layer (mTLS, basic auth,
  Cloudflare Tunnel with service auth, etc.).
- **All mutations are tagged with the workspace owner** in Twenty's native
  activity log. The MCP server's `get_recent_activity` is the only way to see
  which **agent/app** actually made the call. Always pass `agent="<your-app>"`
  on mutations so the audit trail is useful.
- **The MCP logs nothing about reads** — `list_*` and `get_*` calls don't
  appear in `get_recent_activity`. That's by design (reads are cheap; mutations
  are what you want traced). If you need read auditing, log them on the client
  side.
- **API key for direct GraphQL lives at `/home/ubuntu/20/.env`** (mode 600) on
  the VM. Don't commit it. Don't paste it into chat. Use environment variables
  or a secrets manager.

---

## 9. Quick troubleshooting

| Symptom | Likely cause | Fix |
|---|---|---|
| `Connection refused` to `:3023` | MCP process not running on VM | `ssh ubuntu@100.82.161.32 'pgrep -af "twenty/server.py"'` — restart with `nohup python3 .../twenty/server.py &` (sourcing `.env` first via `set -a; . .env; set +a`) |
| Tools list works, calls time out | Slow first-request cold start | Bump `mcp_discovery_timeout` in `~/.hermes/config.yaml` to `8.0+` if calling from a Hermes chat session |
| `{"type": "UUID"}` rejected by LLM | OpenAI function-calling format requires `"type": "string", "format": "uuid"` | MCP server is the source of truth; only Frank edits the tool's `inputSchema` |
| Tailscale "stopped" on the Mac | Tailscale process died | `open -a Tailscale` (or `tailscale up` if auth lapsed) |
| `create_note` ignored my `companyId` | Known MCP limitation — extra args dropped silently | Use direct GraphQL with `linkedRecords` arg, or add the link in the Twenty UI |

---

## 10. Versioning & changes

- **MCP server source:** `/home/ubuntu/.../twenty/server.py` on the VM (path varies; ask Frank). Edit, restart, verify.
- **Twenty underlying version:** `v2.20.0` (pinned in `/home/ubuntu/20/.env`).
- **When Twenty upgrades:** the MCP tool list may need a re-introspection pass. Run `tools/list` and compare against §3.
- **When this doc was last verified:** 2026-07-13 — all 8 tools live and returning 200s. Test note (id `d59a940a-87ce-4544-bef5-b5e9ccee5a4f`) was created during verification and is **safe to delete** from the Twenty UI.

---

*Last updated: 2026-07-13 16:00. Maintained by Mavis. If you change the tool list, update §3 and bump the `updated` date in the frontmatter.*
