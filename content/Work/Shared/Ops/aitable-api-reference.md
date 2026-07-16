# AITable API Quick Reference

Personal quick-reference for the AITable Fusion API, scoped for n8n HTTP Request node usage. Verified live 2026-07-13.

---

## TL;DR

- **Base URL:** `https://aitable.ai/fusion/v1/`
  - Docs page says `api.AITable.com` but that doesn't resolve. Use `aitable.ai`.
  - Beta v3 (records-only, internal): `https://aitable.ai/fusion/v3/`
- **Auth:** `Authorization: Bearer {API_TOKEN}` on every request.
- **HTTP status is ALWAYS 200.** Real success/failure is in the body:
  - Success: `{"code": 200, "success": true, "message": "SUCCESS", "data": {...}}`
  - Failure: `{"code": 400, "success": false, "message": "...", "data": null}`
  - **Always check `body.code` and `body.success`** — never trust HTTP status alone.
- **Rate limits** (QPS, per token): Free 2 · Plus 5 · Pro 10 · Enterprise 20. Plus is Frank's tier. Use exponential backoff if you get throttled.
- **No webhooks.** Polling only.
- **No native n8n node.** Use the HTTP Request node with hand-written JSON.
- **Record/attachment batch limits:** GET records 1000/req · POST/PATCH/DELETE records 10/req · Upload 1 attachment/req.
- **Datasheet cap:** 50,000 rows per datasheet (Public Beta). **Space storage:** 1 GB max attachments.
- **Two doc trees** — the live one at `developers.aitable.ai/api/<thing>` (the pages below) is the canonical one. The `/api/reference/api/<thing>` tree is OpenAPI-rendered and only shows data structures; it has no curl examples or gotchas.

---

## Common Parameter IDs (prefix conventions)

| ID | Prefix example | Source |
|----|---------------|--------|
| `spaceId` | `spcXXXXX` | User Center → avatar → copy Space ID, or `GET /spaces` |
| `datasheetId` (≡ `nodeId` for datasheet) | `dstXXXXX` | URL bar of any open datasheet |
| `formId` | `fomXXXXX` | URL bar of any open form |
| `dashboardId` | `dsbXXXXX` | URL bar of any open dashboard |
| `folderId` | `fodXXXXX` | Work directory URL |
| `viewId` | `viwXXXXX` | URL bar of any open datasheet view |
| `recordId` | `recXXXXX` | `GET /records` or expand a row → URL bar |
| `fieldId` | `fldXXXXX` | `GET /fields` or API example panel |
| `unitId` | (varies) | One ID per member / team / role |

---

## Known Gotchas (verified 2026-07-13)

1. **Base URL typo.** The `/introduction` page says `https://api.AITable.com/fusion/v1/`. That hostname does not resolve. Use `https://aitable.ai/fusion/v1/`. The Quick Start page's own curl example uses `aitable.ai`, so the doc tree is internally inconsistent.
2. **Field/Datasheet endpoints are nested under `/spaces/{spaceId}/`.** The docs on the right-side panel show short forms like `POST /datasheets/{id}/fields` — those return 404. Correct path:
   - `POST /fusion/v1/spaces/{spaceId}/datasheets/{datasheetId}/fields`
   - `GET  /fusion/v1/spaces/{spaceId}/datasheets/{datasheetId}/fields`
   - `GET  /fusion/v1/spaces/{spaceId}/datasheets/{datasheetId}/views`
3. **HTTP 200 always, error in body.** Example: sending malformed JSON to create-records returns `HTTP 200` with `{"code":400,"success":false,"message":"PARAMETER_ERROR",...}`. n8n will mark the request as "successful" unless you explicitly check `body.code`.
4. **SingleSelect `color` is a plain string in requests.** Send `"color": "blue_4"` or `"color": "#55CDFF"`. The docs example showing `{"name":"blue_4","value":"#55CDFF"}` is the **response** shape; sending the object form to `POST /fields` returns 400.
5. **No webhooks.** Don't bother looking for `webhook` endpoints — they don't exist. Poll.
6. **No native n8n node.** Search the n8n community for "AITable" — empty. Build with HTTP Request node, JSON body, `Authorization: Bearer ...`.
7. **Polling rhythm for n8n:** at 5 QPS (Plus tier) you can hit the API every 200ms, but with batch limits (10 records/req for write) you'll need to chunk anything larger. Use a `SplitInBatches` node if you need to write >10 records.
8. **Field lookup by name vs ID.** Default is `fieldKey=name` (field name as key in JSON). Pass `?fieldKey=id` in GET to receive fieldIds as keys (safer — field names can be renamed).
9. **Records response shape depends on `viewId`.** Records `GET` without `viewId` returns raw records; with `viewId`, you get the records in the view's order with view-level filtering applied.

---

## Endpoints Index (30 total)

| Group | Count | Notes |
|-------|-------|-------|
| Record | 4 | GET, POST, PATCH, DELETE |
| Field | 3 | GET, POST, DELETE — nested under `/spaces/{spaceId}/` |
| View | 1 | GET only |
| Datasheet | 1 | POST create only |
| Attachment | 1 | Upload, returns token; embed token in cell value |
| Space | 1 | GET list |
| Node | 6 | List / search / get-details / embedlink CRUD |
| Member | 3 | Get / update / delete |
| Team | 5 | List / list-members / create / update / delete |
| Role | 5 | List / list-units / create / update / delete |
| AI | 1 | Chat completions |

---

## Record

> **Known gotcha (Records):** Path is **NOT** nested under `/spaces/{spaceId}/`. Record endpoints are top-level under `/datasheets/{datasheetId}/records`. `viewId` is optional — when present, records come back filtered/sorted by that view. `fieldKey` defaults to `name` (use `id` to avoid breakage if a field is renamed). HTTP 200 always; check `body.code` and `body.success`. Max 10 records per write op. 1000 records per GET.

### GET /datasheets/{datasheetId}/records

Fetch records (optionally scoped to a view, with filters and sort).

- **Path params:** `datasheetId` (e.g. `dstXXX`)
- **Query params:**
  - `viewId` (optional, e.g. `viwXXX`) — filter/sort by view config
  - `fieldKey` (`name` | `id`, default `name`) — controls whether `fields` keys in response are field names or fieldIds
  - `fields[]` (optional) — restrict returned fields (e.g. `?fields[]=Title&fields[]=Status`)
  - `filter` (optional) — AITable formula-style filter string
  - `sort` (optional) — e.g. `[{field:"Title",order:"asc"}]` (URL-encoded)
  - `pageSize` (default ~1000), `pageNum` (default 1)
- **Request body:** none
- **Response (truncated):**
  ```json
  {
    "success": true, "code": 200, "message": "SUCCESS",
    "data": {
      "records": [
        { "recordId": "recXXX", "createdAt": 1671589943000, "updatedAt": 1671597856000, "fields": { "Title": "...", "Status": {...} } }
      ],
      "pageSize": 1000,
      "pageNum": 1
    }
  }
  ```
- **Status:** always HTTP 200. Check `body.code === 200` and `body.success === true`.
- **Curl:**
  ```bash
  curl -X GET \
    "https://aitable.ai/fusion/v1/datasheets/dstWUHwzTHd2YQaXEE/records?viewId=viw4mnkqkaqdh" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### POST /datasheets/{datasheetId}/records

Create up to 10 new records in one call.

- **Path params:** `datasheetId`
- **Request body:**
  ```json
  {
    "records": [
      { "fields": { "Title": "An An", "Weight": "80kg", "Photo": [{"name":"img.png","size":12345,"mimeType":"image/png","token":"space/...","width":100,"height":100}], "Registrar": [{"unitId":"..."}] } },
      { "fields": { "Title": "Jia Jia", "Weight": "88kg" } }
    ]
  }
  ```
- **Response:** `{ success, code, message, data: { records: [{ recordId, createdAt, fields }] } }`
- **Limits:** max 10 records per request
- **Member field:** use `unitId`, not `id` (per docs deprecation note)
- **Curl:**
  ```bash
  curl -X POST https://aitable.ai/fusion/v1/datasheets/dstXXX/records \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{"records":[{"fields":{"Title":"An An","Weight":"80kg"}}]}'
  ```

### PATCH /datasheets/{datasheetId}/records

Update up to 10 existing records by recordId.

- **Path params:** `datasheetId`
- **Request body:**
  ```json
  {
    "records": [
      { "recordId": "recABC", "fields": { "Nickname": "An An", "Weight": "90kg" } },
      { "recordId": "recDEF", "fields": { "Nickname": "Jia Jia" } }
    ]
  }
  ```
- **Response:** `{ success, code, message, data: { records: [{ recordId, createdAt, updatedAt, fields }] } }`
- **Limits:** max 10 records per request
- **Curl:**
  ```bash
  curl -X PATCH https://aitable.ai/fusion/v1/datasheets/dstXXX/records \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{"records":[{"recordId":"recABC","fields":{"Weight":"90kg"}}]}'
  ```

### DELETE /datasheets/{datasheetId}/records?recordIds=recA,recB

Delete up to 10 records by ID.

- **Path params:** `datasheetId`
- **Query params:** `recordIds` — comma-separated list (URL-encoded if needed)
- **Request body:** none
- **Response:** `{ success: true, code: 200, message: "SUCCESS", data: true }`
- **Limits:** max 10 recordIds per request
- **Curl:**
  ```bash
  curl -X DELETE \
    'https://aitable.ai/fusion/v1/datasheets/dstXXX/records?recordIds=recABC,recDEF' \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## Field

> **Known gotcha (Fields):** Mixed path conventions. **`GET /datasheets/{datasheetId}/fields` works without the space prefix**, but **`POST`** and **`DELETE`** require `/spaces/{spaceId}/datasheets/{datasheetId}/fields/...` — short forms return 404. Use `?fieldKey=id` on GET to receive fieldIds as keys in the response (safer than field names, which can be renamed). Field types: `SingleText`, `Number`, `SingleSelect`, `MultiSelect`, `DateTime`, `Attachment`, `Member`, `Link`, `Checkbox`, `URL`, `Phone`, `Email`, `Currency`, `Percent`, `Rating`, `Formula`, etc. SingleSelect `options[]` lives in `property.options` with each option having `{id, name, color}`.

### GET /datasheets/{datasheetId}/fields

- **Path params:** `datasheetId`
- **Query params:** `fieldKey` (`name` | `id`, default `name`)
- **Request body:** none
- **Response:**
  ```json
  {
    "code": 200, "success": true, "message": "SUCCESS",
    "data": {
      "fields": [
        { "id": "fldXXX", "name": "Title", "type": "SingleText", "property": {"defaultValue":""}, "editable": true, "isPrimary": true },
        { "id": "fldYYY", "name": "Brands", "type": "SingleSelect", "property": { "options": [{ "id": "optXXX", "name": "OAD", "color": { "name": "deepPurple_0", "value": "#E5E1FC" } }] }, "editable": true }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v1/datasheets/dstXXX/fields" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### POST /spaces/{spaceId}/datasheets/{datasheetId}/fields

Create one field. Only one field per request.

- **Path params:** `spaceId`, `datasheetId`
- **Request body:**
  ```json
  {
    "type": "SingleText",
    "name": "Title",
    "property": { "defaultValue": "Default value" }
  }
  ```
  For `SingleSelect`, add `property.options`:
  ```json
  {
    "type": "SingleSelect",
    "name": "Status",
    "property": {
      "options": [
        { "name": "Open", "color": "blue_4" },
        { "name": "Closed", "color": "deepPurple_0" }
      ]
    }
  }
  ```
- **Response:** `{ code: 200, success: true, data: { id: "fldXXX", name: "Title" } }`
- **Curl:**
  ```bash
  curl -X POST \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/datasheets/dstXXX/fields" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{"type":"SingleText","name":"Title","property":{"defaultValue":"Default"}}'
  ```

### DELETE /spaces/{spaceId}/datasheets/{datasheetId}/fields/{fieldId}

Delete a single field by ID.

- **Path params:** `spaceId`, `datasheetId`, `fieldId`
- **Request body:** none
- **Response:** `{ code: 200, success: true, data: {} }`
- **Curl:**
  ```bash
  curl -X DELETE \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/datasheets/dstXXX/fields/fldXXX" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## View

> **Known gotcha (View):** Path is top-level `/datasheets/{datasheetId}/views` — does NOT require `/spaces/{spaceId}/` prefix. View `type` values: `Grid`, `Gallery`, `Kanban`, `Gantt`, `Form` (read-only, no API CRUD).

### GET /datasheets/{datasheetId}/views

- **Path params:** `datasheetId`
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "views": [
        { "id": "viwXXX", "name": "Grid view", "type": "Grid" },
        { "id": "viwYYY", "name": "Kanban", "type": "Kanban" }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v1/datasheets/dstXXX/views" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## Datasheet

> **Known gotcha (Datasheet):** Create is nested under `/spaces/{spaceId}/datasheets`. Optional `folderId` (e.g. `fodXXX`) and `preNodeId` control placement. Inline `fields[]` lets you bootstrap the schema in one call.

### POST /spaces/{spaceId}/datasheets

- **Path params:** `spaceId`
- **Request body:**
  ```json
  {
    "name": "New Datasheet",
    "description": "Description",
    "folderId": "fodXXX (optional)",
    "preNodeId": "dstXXX (optional — place before this node)",
    "fields": [
      { "type": "SingleText", "name": "Title" }
    ]
  }
  ```
- **Response:** `{ code: 200, success: true, data: { id: "dstXXX", createdAt: 1648648690000, fields: [{ id: "fldXXX", name: "title" }] } }`
- **Curl:**
  ```bash
  curl -X POST "https://aitable.ai/fusion/v1/spaces/spcXXX/datasheets" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d '{"name":"New Datasheet","fields":[{"type":"SingleText","name":"Title"}]}'
  ```

---

## Attachment

> **Known gotcha (Attachment):** Path is top-level `/datasheets/{datasheetId}/attachments` (no `/spaces/` prefix). Upload is **multipart/form-data** with the file as a `file` field. Returns a `token` string like `"space/2021/06/30/d336232203054effb819231a3426d40d"` — use this token (not the URL) when writing to an attachment cell via `POST /datasheets/{id}/records`. Max **1 file per request**, max **1 GB total per space**.

### POST /datasheets/{datasheetId}/attachments

Upload a single file.

- **Path params:** `datasheetId`
- **Request body:** `multipart/form-data` with field name `file`
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "token": "space/2021/06/30/d336232203054effb819231a3426d40d",
      "mimeType": "image/jpeg",
      "size": 229426,
      "height": 1024, "width": 1792,
      "name": "3.jpg",
      "url": "https://s1.aitable.ai/space/2021/06/30/d336232203054effb819231a3426d40d"
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X POST "https://aitable.ai/fusion/v1/datasheets/dstXXX/attachments" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -F "file=@/path/to/local.jpg"
  ```

**n8n pattern (write to attachment cell):**
```bash
# Step 1: upload returns {"data":{"token":"space/...","name":"x.jpg",...}}
# Step 2: PATCH or POST record with the token in the attachment cell:
curl -X POST "https://aitable.ai/fusion/v1/datasheets/dstXXX/records" \
  -H "Authorization: Bearer ${API_TOKEN}" -H "Content-Type: application/json" \
  -d '{"records":[{"fields":{"Photos":[{"name":"x.jpg","size":12345,"mimeType":"image/jpeg","token":"space/..."}]}}]}'
```

---

## Space

### GET /spaces

List all spaces the user is a member of (created or invited).

- **Query params:** none
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "spaces": [
        { "id": "spcXXX", "name": "My Space", "isAdmin": true },
        { "id": "spcYYY", "name": "Invited Space" }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v1/spaces" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## Node

> **Known gotcha (Node):** The `get-nodes` and `get-node-details` endpoints use `v1`, but **`search-nodes` uses `v2`** (`/fusion/v2/spaces/{spaceId}/nodes`). All node types in responses: `Datasheet`, `Folder`, `Form`, `Dashboard`, `Mirror`, `Automation`. Node IDs are the `id` field, also called `nodeId`. **Embed Links require Pro plan or higher** — Plus tier (Frank's) cannot create embed links (returns 402/payment required). Node-related endpoints are nested under `/spaces/{spaceId}/`.

### GET /spaces/{spaceId}/nodes

List outermost nodes (datasheets, folders, forms, dashboards) in a space's working directory.

- **Path params:** `spaceId`
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "nodes": [
        { "id": "fomXXX", "name": "New Form", "type": "Form", "icon": "", "isFav": false },
        { "id": "dsbXXX", "name": "New Dashboard", "type": "Dashboard", "icon": "", "isFav": false },
        { "id": "fodXXX", "name": "New Folder", "type": "Folder", "icon": "", "isFav": false },
        { "id": "dstXXX", "name": "My Datasheet", "type": "Datasheet", "icon": "", "isFav": true }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v1/spaces/spcXXX/nodes" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### GET /fusion/v2/spaces/{spaceId}/nodes?type=Datasheet&permissions=0,1

Search nodes with filters. (Note: **`v2` path, not v1.**)

- **Path params:** `spaceId`
- **Query params:** `type` (e.g. `Datasheet`, `Folder`, `Form`), `permissions` (CSV of permission codes: 0=Manager, 1=Editor, 2=Viewer, 3=ReadOnly — exact mapping not in docs), `query` (free-text name search, optional)
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "nodes": [
        { "id": "dstXXX", "name": "Test", "type": "Datasheet", "icon": "", "isFav": false, "parentId": "fodXXX", "permission": 0 }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v2/spaces/spcXXX/nodes?type=Datasheet&permissions=0,1" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### GET /spaces/{spaceId}/nodes/{nodeId}

Get a single node's details. For a folder, includes `children` array.

- **Path params:** `spaceId`, `nodeId`
- **Response (folder):**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "id": "fodXXX", "name": "New Folder", "type": "Folder", "icon": "", "isFav": false,
      "children": [
        { "id": "fodYYY", "name": "New subfolder", "type": "Folder", "icon": "", "isFav": false },
        { "id": "dstYYY", "name": "New Datasheet", "type": "Datasheet", "icon": "", "isFav": true }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v1/spaces/spcXXX/nodes/fodXXX" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### POST /spaces/{spaceId}/nodes/{nodeId}/embedlinks

Create an embedded link (read-only public URL) for a Datasheet, Dashboard, or Form.

- **Path params:** `spaceId`, `nodeId`
- **Request body:** pass `payload` object describing which UI controls to hide:
  ```json
  {
    "payload": {
      "primarySideBar": { "collapsed": false },
      "viewControl": {
        "viewId": "viwXXX",
        "tabBar": true,
        "nodeInfoBar": false,
        "toolBar": { "basicTools": false, "widgetBtn": false, "apiBtn": false, "formBtn": false, "historyBtn": false, "robotBtn": false, "addWidgetBtn": false, "fullScreenBtn": false, "formSettingBtn": false },
        "collapsed": false,
        "collaboratorStatusBar": true,
        "nodeInfoBar": false
      },
      "bannerLogo": true,
      "permissionType": "readOnly"
    }
  }
  ```
  `permissionType` values: `readOnly` | `editable` (unclear which others exist; default to `readOnly`).
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "linkId": "embb90a52cfc02a4f83",
      "url": "https://aitable.ai/embed/embb90a52cfc02a4f83",
      "payload": { "...": "..." },
      "theme": "light"
    }
  }
  ```
- **Limits:** Pro plan minimum. Plus tier returns 402.
- **Curl:**
  ```bash
  curl -X POST "https://aitable.ai/fusion/v1/spaces/spcXXX/nodes/dstXXX/embedlinks" \
    -H "Authorization: Bearer ${API_TOKEN}" -H "Content-Type: application/json" \
    -d '{"payload":{"primarySideBar":{"collapsed":false},"viewControl":{"viewId":"viwXXX","tabBar":true,"nodeInfoBar":false,"toolBar":{"basicTools":false,"apiBtn":false},"collapsed":false},"bannerLogo":true,"permissionType":"readOnly"}}'
  ```

### GET /spaces/{spaceId}/nodes/{nodeId}/embedlinks

List all embed links for a node.

- **Path params:** `spaceId`, `nodeId`
- **Response:** `{ code, success, data: [{ linkId, url, payload, theme }] }` (array)
- **Curl:**
  ```bash
  curl -X GET "https://aitable.ai/fusion/v1/spaces/spcXXX/nodes/dstXXX/embedlinks" \
    -H "Authorization: Bearer ${API_TOKEN}" -H "Content-Type: application/json"
  ```

### DELETE /spaces/{spaceId}/nodes/{nodeId}/embedlinks/{linkId}

Delete one embed link.

- **Path params:** `spaceId`, `nodeId`, `linkId`
- **Response:** `{ code: 200, success: true, message: "SUCCESS" }` (no `data` field)
- **Curl:**
  ```bash
  curl -X DELETE "https://aitable.ai/fusion/v1/spaces/spcXXX/nodes/dstXXX/embedlinks/embb90a52cfc02a4f83" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---


## Contacts — Member

> **Known gotcha (Contacts):** Member, Team, and Role APIs **all require the Enterprise plan**. Plus tier (Frank's) cannot use them — they will return an authorization error. All paths are nested under `/spaces/{spaceId}/...` and use `unitId` (NOT `id` or `userId`) to identify members, teams, and roles. **Email and mobile are sensitive** — pass `?sensitiveData=true` to receive them in the response (otherwise they're omitted). All contact endpoints require primary admin or sub-admin permission with the matching scope.

### GET /spaces/{spaceId}/members/{unitId}

- **Path params:** `spaceId`, `unitId` (member's unitId — get from `list-the-team-members`)
- **Query params:** `sensitiveData` (`true` to include email + mobile)
- **Request body:** none
- **Response:**
  ```json
  {
    "code": 200, "success": true, "message": "SUCCESS",
    "data": {
      "member": {
        "unitId": "kD8tPcZ3fYxSjV9qWvL5X2TmQbN1nR6",
        "name": "John",
        "mobile": { "number": "13000111000", "areaCode": "+86" },
        "email": "John@aitable.ai",
        "avatar": "https://s1.aitable.ai/public/...",
        "status": 1,
        "type": "Member",
        "teams": [{ "unitId": "...", "name": "team A", "sequence": 1, "parentUnitId": "0", "roles": [{ "unitId": "...", "name": "role A", "sequence": 1 }] }],
        "roles": [{ "unitId": "...", "name": "role B", "sequence": 2 }]
      }
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/members/memberUnitId?sensitiveData=true" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### PUT /spaces/{spaceId}/members/{unitId}

Move a member to different team(s). Only the `teams` field is updatable via this endpoint.

- **Path params:** `spaceId`, `unitId`
- **Request body:**
  ```json
  { "teams": ["teamUnitId1", "teamUnitId2"] }
  ```
- **Response:** `{ code, success, message, data: { member: { ... } } }`
- **Curl:**
  ```bash
  curl -X PUT \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/members/memberUnitId" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d ''''{"teams":["teamUnitId1"]}'''
  ```

### DELETE /spaces/{spaceId}/members/{unitId}

Remove a member from the space. No body, no `data` in response.

- **Path params:** `spaceId`, `unitId`
- **Response:** `{ code: 200, success: true, message: "SUCCESS" }`
- **Curl:**
  ```bash
  curl -X DELETE \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/members/memberUnitId" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## Contacts — Team

> **Known gotcha (Team):** Teams are hierarchical — they have a `parentUnitId` and `sequence`. To list top-level teams, pass `unitId=0` in the `children` path. Teams are nested under `/spaces/{spaceId}/teams/...`. Like Members, these require Enterprise plan.

### GET /spaces/{spaceId}/teams/{unitId}/children

List child teams under a parent team. `unitId=0` returns top-level teams.

- **Path params:** `spaceId`, `unitId` (parent — use `0` for top level)
- **Query params:** `pageSize` (default 2 in docs example), `pageNum` (default 1)
- **Request body:** none
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "total": 2, "pageSize": 2, "pageNum": 1,
      "teams": [
        { "unitId": "teamAUnitId", "name": "team A", "sequence": 1, "parentUnitId": "0", "roles": [{ "unitId": "...", "name": "role A", "sequence": 1 }] },
        { "unitId": "teamBUnitId", "name": "team B", "sequence": 2, "parentUnitId": "0", "roles": [{ "unitId": "...", "name": "role A", "sequence": 1 }] }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/teams/0/children?pageSize=20&pageNum=1" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### GET /spaces/{spaceId}/teams/{unitId}/members

List members in a specific team.

- **Path params:** `spaceId`, `unitId` (team)
- **Query params:** `pageSize`, `pageNum`, `sensitiveData` (true to include email/mobile)
- **Request body:** none
- **Response:** `{ code, success, data: { total, pageSize, pageNum, members: [{ unitId, name, mobile, email, avatar, status, type, teams, roles }, ...] } }`
- **Curl:**
  ```bash
  curl -X GET \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/teams/teamUnitId/members?pageSize=20&pageNum=1&sensitiveData=true" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### POST /spaces/{spaceId}/teams

Create a new team under a parent.

- **Path params:** `spaceId`
- **Request body:**
  ```json
  {
    "name": "Product Team",
    "sequence": 1,
    "parentUnitId": "parentTeamUnitId",
    "roles": ["roleUnitId1", "roleUnitId2"]
  }
  ```
- **Response:** `{ code, success, data: { team: { unitId, name, sequence, parentUnitId, roles: [...] } } }`
- **Curl:**
  ```bash
  curl -X POST \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/teams" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d ''''{"name":"Product Team","sequence":1,"parentUnitId":"parentUnitId","roles":["roleUnitId"]}'''
  ```

### PUT /spaces/{spaceId}/teams/{unitId}

Update team name and/or sequence.

- **Path params:** `spaceId`, `unitId`
- **Request body:**
  ```json
  { "name": "Product Department", "sequence": 2 }
  ```
- **Response:** `{ code, success, data: { team: { unitId, name, sequence, parentUnitId, roles: [...] } } }`
- **Curl:**
  ```bash
  curl -X PUT \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/teams/teamUnitId" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d ''''{"name":"Product Department","sequence":2}'''
  ```

### DELETE /spaces/{spaceId}/teams/{unitId}

Delete a team. No body, no `data` in response.

- **Path params:** `spaceId`, `unitId`
- **Response:** `{ code: 200, success: true, message: "SUCCESS" }`
- **Curl:**
  ```bash
  curl -X DELETE \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/teams/teamUnitId" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## Contacts — Role

> **Known gotcha (Role):** Roles are like job titles (e.g. "Product Designer") that can be assigned to multiple members and teams. A "role" aggregates members/teams that share a function. All Role endpoints require Enterprise plan. Nested under `/spaces/{spaceId}/roles/...`.

### GET /spaces/{spaceId}/roles

List all roles in the space.

- **Path params:** `spaceId`
- **Query params:** `pageSize`, `pageNum`
- **Request body:** none
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "total": 2, "pageSize": 2, "pageNum": 1,
      "roles": [
        { "unitId": "roleAUnitId", "name": "role A", "sequence": 1 },
        { "unitId": "roleBUnitId", "name": "role B", "sequence": 2 }
      ]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/roles?pageSize=20&pageNum=1" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### GET /spaces/{spaceId}/roles/{unitId}/units

List all members AND teams that have a given role.

- **Path params:** `spaceId`, `unitId` (role)
- **Request body:** none
- **Response:**
  ```json
  {
    "code": 200, "success": true,
    "data": {
      "members": [{ "unitId": "...", "name": "John", "mobile": {...}, "email": "...", "avatar": "...", "status": 1, "type": "Member", "teams": [...], "roles": [...] }],
      "teams":   [{ "unitId": "...", "name": "team A", "sequence": 1, "parentUnitId": "0", "roles": [...] }]
    }
  }
  ```
- **Curl:**
  ```bash
  curl -X GET \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/roles/roleUnitId/units" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

### POST /spaces/{spaceId}/roles

Create a new role.

- **Path params:** `spaceId`
- **Request body:**
  ```json
  { "name": "Finance" }
  ```
- **Response:** `{ code, success, data: { role: { unitId, name, sequence } } }`
  - The server assigns `sequence` automatically (large numbers like 2001 in the docs example — sequence is an internal ordering field, not strictly sequence-of-creation).
- **Curl:**
  ```bash
  curl -X POST \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/roles" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d ''''{"name":"Finance"}'''
  ```

### PUT /spaces/{spaceId}/roles/{unitId}

Update role name and/or sequence.

- **Path params:** `spaceId`, `unitId`
- **Request body:**
  ```json
  { "name": "Finance", "sequence": 2002 }
  ```
- **Response:** `{ code, success, data: { role: { unitId, name, sequence } } }`
- **Curl:**
  ```bash
  curl -X PUT \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/roles/roleUnitId" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d ''''{"name":"Finance","sequence":2002}'''
  ```

### DELETE /spaces/{spaceId}/roles/{unitId}

Delete a role. No body, no `data` in response.

- **Path params:** `spaceId`, `unitId`
- **Response:** `{ code: 200, success: true, message: "SUCCESS" }`
- **Curl:**
  ```bash
  curl -X DELETE \
    "https://aitable.ai/fusion/v1/spaces/spcXXX/roles/roleUnitId" \
    -H "Authorization: Bearer ${API_TOKEN}"
  ```

---

## AI

> **Known gotcha (AI):** The AI endpoint is the **only one that does NOT use `/fusion/v1/`** — it's `/fusion/ai/{botId}/chat/completions` (no `v1` segment). The endpoint is **whitelist-only** (must apply for access). It is **OpenAI-compatible** — the request body matches the OpenAI chat completions schema, so you can use the official OpenAI JS/Python SDKs by pointing `basePath` at the AITable AI URL and setting `apiKey` to your AITable API token. The `botId` is the AI agent ID from the AITable UI (e.g. `ai_zxLeHGV3ac32YYC`).

### POST /fusion/ai/{botId}/chat/completions

Send a chat completion request to a configured AI agent.

- **Path params:** `botId` (e.g. `ai_zxLeHGV3ac32YYC`)
- **Request body (OpenAI schema):**
  ```json
  {
    "model": "gpt-3.5-turbo",
    "messages": [
      { "role": "system", "content": "You are a helpful assistant." },
      { "role": "user",   "content": "Hello!" }
    ]
  }
  ```
- **Response (OpenAI-shaped):**
  ```json
  {
    "id": "aitable_ai_CkZH2zQokhry31j_1693452659",
    "conversationId": "CS-0253eb8d-d6c6-4543-88d4-fcb555f52982",
    "actions": null,
    "object": "chat.completion",
    "created": 1693452659,
    "model": "gpt-3.5-turbo",
    "choices": [
      { "index": 0, "message": { "role": "assistant", "content": "Hello there, how may I assist you today" }, "finish_reason": "stop" }
    ],
    "usage": {
      "prompt_tokens": 9, "completion_tokens": 12, "total_tokens": 21,
      "total cost": 0.000079, "result": "..."
    }
  }
  ```
- **Curl (direct):**
  ```bash
  curl -X POST \
    "https://aitable.ai/fusion/ai/ai_zxLeHGV3ac32YYC/chat/completions" \
    -H "Authorization: Bearer ${API_TOKEN}" \
    -H "Content-Type: application/json" \
    -d ''''{"model":"gpt-3.5-turbo","messages":[{"role":"user","content":"Hello!"}]}'''
  ```

**OpenAI SDK (JS) — point basePath at AITable:**
```js
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: "_Paste_Your_API_Token_",
  basePath: "https://aitable.ai/fusion/v1/ai/ai_zxLeHGV3ac32YYC"
});
const openai = new OpenAIApi(configuration);
const chatCompletion = await openai.createChatCompletion({
  model: "gpt-3.5-turbo",
  messages: [{ role: "user", content: "Hello world" }],
});
```

**OpenAI SDK (Python):**
```python
import openai
openai.api_key = "_Paste_Your_API_Token_"
openai.api_base = "https://aitable.ai/nest/v1/ai/ai_zxLeHGV3ac32YYC"
chat_completion = openai.ChatCompletion.create(
    model="gpt-3.5-turbo",
    messages=[{"role": "user", "content": "Hello world"}]
)
```

---

*Last verified: 2026-07-13. All 30 endpoints across 11 categories documented. Endpoints requiring Enterprise plan (Member, Team, Role) cannot be tested on Plus tier.*
