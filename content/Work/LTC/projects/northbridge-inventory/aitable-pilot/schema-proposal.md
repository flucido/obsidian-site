# `nba_inventory` schema proposal

**Status:** DRAFT — proposed 2026-07-13, awaiting Frank's approval before adding via API.
**Datasheet ID:** `dst5Tlg6igWGNBAlb1`
**Purpose:** Reconcile Apple School Manager (ASM) device inventory vs Mosyle MDM device inventory for North Bridge Academy.
**Match key:** Serial Number (present in both CSVs).

## Source CSVs (read 2026-07-13)

- **ASM:** `/Users/flucido/Downloads/Apple_Manger_Device_inventory - devices_1783971505060.csv` — 147 devices, 22 columns. Strong on procurement (Order #, Part #, Color, Date Added, Date Assigned MDM, MACs). No user assignment, no operational state.
- **Mosyle:** `/Users/flucido/Downloads/Mosyle_device_inventory - DeviceInfoReport-6a5526202b42f.csv` — 120 devices, 32 columns. Strong on operational state (OS version, Battery %, Last check-in, Assignment status, Tags, Locations). No procurement metadata, no Apple PO.

~27 devices in one but not the other — that's the core reconciliation finding.

## PII flag

Mosyle `Device name` column has student first names ("Maddy F.", "Nate P.", etc.) — K-12 PII. **Recommendation: leave Device Name OUT of the schema.** Reconciliation is serial-based; user assignment belongs in SIS.

Asset Tag is empty in Mosyle. If North Bridge has its own asset tags (e.g., "NBA-1234"), they're not in either system.

## Proposed schema

### Tier 1 — must have (add now)

| Field | Type | Source | Notes |
|---|---|---|---|
| `Serial` | SingleText (primary) | Both | Match key |
| `Status` | SingleSelect | Derived | `Matched` / `ASM Only` / `Mosyle Only` / `Mismatch` |
| `Source` | MultiSelect | Derived | `ASM`, `Mosyle` (or both) |
| `Model` | SingleText | Mosyle | More accurate than ASM's model name |
| `Capacity` | SingleText | Mosyle | 64GB, 128GB, etc. |
| `OS Version` | SingleText | Mosyle | e.g. 18.6.2 |
| `Battery` | Number | Mosyle | % |
| `MDM Status` | SingleText | Mosyle | Activated, etc. |
| `Last Check-in` | DateTime | Mosyle | So we can spot stale devices |
| `Last Reconciled` | DateTime | n8n | When this row was last updated by the workflow |
| `Notes` | LongText | Manual | Anything to flag |

### Tier 2 — nice to have

Recommended additions for the pilot:

| Field | Type | Source |
|---|---|---|
| `Order Number` | SingleText | ASM (Apple PO, for procurement tracking) |
| `Tags` | MultiSelect | Mosyle (3S, 6B, etc.) |
| `Assignment` | SingleSelect | Mosyle (Limbo, etc.) |
| `Locations` | MultiSelect | Mosyle (NBA, etc.) |

Not adding (add later if needed):
- `Part Number` (ASM) — useful for warranty but not ops
- `Color` (ASM) — visual only
- `Date Added to Org` (ASM) — historical
- `Date Assigned to MDM` (ASM) — historical
- `Supervised` (Mosyle) — should always be Yes for managed devices

### Intentionally NOT including

- `Device Name` (student names) — see PII flag
- `MAC addresses` (both) — not needed for reconciliation; add if needed
- `IMEI` / `MEID` (both) — Apple-internal, not useful for ops

## Total recommended field count

**15 fields** (11 Tier 1 + 4 Tier 2 selected). All can be added via API in a single batch.

## Next steps (when Frank returns)

1. Frank approves the schema (or modifies the field list)
2. Add all 15 fields to `nba_inventory` via `POST /fusion/v1/spaces/spcNCHEapDA8A/datasheets/dst5Tlg6igWGNBAlb1/fields`
3. Frank uploads CSVs to Google Drive `LTC/Northbridge/` and provides folder ID
4. Build n8n workflow: Drive trigger → read both CSVs → reconcile by serial → write to nba_inventory
