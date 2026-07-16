---
title: Mavis CLI Quick Reference
created: 2026-07-10
updated: 2026-07-10
type: reference
tags: [mavis, cli, ops, tooling]
---

# Mavis CLI Quick Reference

A practical guide to the `mavis` command. Mavis is your local AI agent runtime — the CLI is how you (and Mavis) inspect state, manage agents, schedule routines, and route messages between sessions.

**Binary:** `/Users/flucido/.mavis/bin/mavis`
**Version:** 3.0.47
**Daemon default port:** 15321

> **Mental model.** The CLI is split into two layers:
> - **Outer daemon** — `start`, `stop`, `status`, `service`, `update` (manage the Mavis process itself)
> - **Inner surface** — `agent`, `cron`, `communication`, `memory`, `session`, `skill`, `mcp`, `im`, `hook`, `permission`, `config` (the stuff you'll actually touch day-to-day)
>
> Anything that needs the daemon running: check `mavis status` first.

---

## 1. Daemon lifecycle

```bash
mavis start                 # launch daemon in background
mavis stop                  # stop daemon
mavis restart               # bounce it
mavis status                # {status, mode, port, uptime} — JSON
mavis update                # upgrade to latest + restart
mavis web                   # open the Mavis web UI in your browser
mavis service               # install/manage as launchd/systemd service (auto-start at login)
mavis version               # CLI version
mavis --help                # top-level command list
```

**Tip.** On a Mac, run `mavis service install` once to make Mavis auto-start at login. The CLI itself stays available even when the daemon is down — most read-only commands (`mavis list`, `mavis status`, `mavis config info`) work either way.

---

## 2. Agents — your team

```bash
mavis list                       # all agents (plain)
mavis list -H                    # human-readable table with role/persona
mavis agent info mavis           # full config for one agent
mavis agent info ltc-operator    # same for a specialist
mavis agent status <name>        # is it idle, running, broken?
mavis agent logs [name]          # recent logs (omit name for daemon)
mavis agent new <name>           # create a new agent
mavis agent update <name>        # patch an agent's config
mavis agent delete <name>        # nuke an agent (with all its sessions)
mavis agent identity <name>      # set display name / avatar
```

**Read-only is safe; mutating is reversible only if you have a backup.** `mavis agent delete` is permanent. `mavis agent update` rewrites the agent's `agent.md` — keep a copy first.

---

## 3. Cron — scheduled routines

Your three routines are here (verified `mavis cron list mavis`):
- `morning-routine` — 7:30 AM PT, Mon–Fri
- `midday-delivery-check` — 12:30 PM PT, Mon–Fri
- `evening-shutdown` — 6:00 PM PT, Mon–Fri

```bash
# Inspect
mavis cron list mavis                       # all crons for an agent
mavis cron info mavis morning-routine       # full task + prompt
mavis cron list --enabled=false mavis       # show disabled ones

# Operate
mavis cron trigger mavis morning-routine    # fire RIGHT NOW (smoke test)
mavis cron enable  mavis evening-shutdown   # turn on
mavis cron disable mavis midday-delivery-check  # pause
mavis cron delete  mavis foo                # remove (irreversible)

# Update
mavis cron update mavis morning-routine --schedule "0 8 * * 1-5"   # change to 8 AM
mavis cron update mavis morning-routine --active-hours "07:00-19:00"
mavis cron update mavis morning-routine --timezone "America/Los_Angeles"
mavis cron update mavis morning-routine --no-report-root           # stop reporting back to root session
```

**Create a new cron** (full flag set):

```bash
mavis cron create mavis weekly-cleanup \
  --schedule "0 17 * * 5" \
  --prompt "Audit vault hygiene and report any dead wikilinks or stale daily notes." \
  --timezone "America/Los_Angeles" \
  --active-hours "07:00-19:00" \
  --report-root
```

**Schedule format** is standard 5-field cron, local to the agent's timezone:
```
* * * * *
│ │ │ │ └─ day of week  (0-7, 0 and 7 = Sunday)
│ │ │ └─── month        (1-12)
│ │ └───── day of month (1-31)
│ └─────── hour         (0-23)
└───────── minute       (0-59)
```
Examples: `0 9 * * 1-5` (9 AM weekdays), `*/15 * * * *` (every 15 min), `30 7 * * 1-5` (7:30 AM weekdays).

**`--session-mode` cheat sheet:**
- `new` (default) — fresh session per tick. Use for **independent recurring tasks** (morning routine, delivery check, evening shutdown).
- `sessionId` — route to a specific session. Use for **self-reminders** that need to land in an existing conversation (CI follow-up, waiting on a human reply).

---

## 4. Communication — inter-session messaging

This is how Mavis (and spawned workers) talk to each other. You'll rarely type these by hand — Mavis runs them internally — but useful for debugging.

```bash
mavis communication peers              # who's reachable right now
mavis communication messages           # recent message history
mavis communication send \
  --from <sessionId> \
  --to   <sessionId> \
  --command prompt \
  --content "Your message here"
```

**Commands you can send:** `prompt` (add a turn), `abort` (stop the run), `kill` (hard kill), `summarize` (force compression), `fork` (clone session), `spawn` (create child session).

**Self-reminder** (the cron you SHOULD type yourself):

```bash
mavis cron self "check MR 142 in 10 min"
mavis cron self "ping me if no reply from Lauren by 3pm" --every 30m
```

Self-reminders auto-attach to the current session, run on the interval, and clean themselves up when the condition is met.

---

## 5. Memory — durable notes across sessions

Three layers. Pick the narrowest one that still helps future work:

```bash
# Read
mavis memory show                              # Mavis's MEMORY.md
mavis memory show ltc-operator                 # specialist memory
mavis memory show --user                       # user profile memory
mavis memory search "pricing" mavis            # keyword search
mavis memory list-topics mavis                 # topic memory files

# Write
mavis memory append mavis --content "### Topic (date)
Type: lesson
content here"

mavis memory append --user --reason "cross-project: applies to every org Frank runs" \
  --content "### Topic (date)
Type: preference
content here"

# Topic files (longer notes split by theme)
mavis memory write-topic mavis pricing-strategy    # creates/overwrites memory/pricing-strategy.md
mavis memory read-topic   mavis pricing-strategy
mavis memory delete-topic mavis pricing-strategy
```

**Layer rules (from Mavis's system prompt):**
1. Project-only? → edit `AGENTS.md` or a topic file in the project vault directly.
2. Cross-project but agent-specific? → `mavis memory append <agent> ...`
3. True for every user/project Frank ever works on? → `mavis memory append --user --reason "..."`

---

## 6. Sessions — conversation history

```bash
mavis session list                            # active sessions
mavis session list mavis                      # for one agent
mavis session info <sessionId>                # full metadata
mavis session messages <sessionId>            # full transcript
mavis session diff <sessionId>                # files changed in this session
mavis session scratchpad                      # inspect the root session's scratchpad

# Mutating
mavis session abort <sessionId>               # stop a running session
mavis session compress <sessionId>            # archive (reversible)
mavis session close <sessionId>               # delete (irreversible)
mavis session rotate                          # archive current + start fresh with handoff prompt
```

**Heads up.** The CLI warns: `mavis session new` is for users and external apps only. Mavis and its agents dispatch via the `mavis team plan` skill instead.

---

## 7. Skills — reusable procedures

```bash
mavis skill list [agentName]                  # skills loaded for an agent
mavis skill show <name>                       # full SKILL.md
mavis skill install <git-url>                 # install from a repo
mavis skill create <name>                     # scaffold a new skill
mavis skill update <name>                     # edit an existing one
mavis skill copy <name>                       # global → agent
mavis skill delete <name>                     # remove

# Skill evolution (signals + proposals)
mavis skill signal report   --skill <name> --reason "..."
mavis skill signal list
mavis skill proposal report --name <name> --rationale "..."
```

---

## 8. MCP servers — external capabilities

Mavis's image/video/audio/web-search/browser tools all live behind MCP. The CLI is mostly for inspection:

```bash
mavis mcp list                                # configured servers
mavis mcp tools matrix                        # tools exposed by one server
mavis mcp tools matrix web_search             # schema for one tool
mavis mcp call matrix web_search '{"query":"..."}'   # invoke directly
mavis mcp sync                                # reconnect + regenerate skill files
mavis mcp add <name> '<json-config>'          # register a new server
mavis mcp disable <name>                      # take one offline
mavis mcp auth                                # authenticate (e.g. Google login)
```

Servers you have today: `matrix` (web/image/video/audio), `playwright` (browser), `cu` (computer use), `trash` (recoverable delete).

---

## 9. IM bridge — chat channel routing

```bash
mavis im status                               # is the bridge up?
mavis im channel                              # credential management
mavis im route                                # routing rules (which channel → which agent)
mavis im defaults                             # default route
```

This is the plumbing that lets Mavis receive messages from Feishu, Telegram, etc. — and decides which agent picks them up.

---

## 10. Hooks — event handlers

```bash
mavis hook list                               # all registered hooks
mavis hook info <id>                          # full detail
mavis hook create <fileName>                  # register a new hook
mavis hook update <id>                        # patch one
mavis hook test <id>                          # dry-run a single hook
mavis hook delete <id>                        # unregister
```

Hooks fire on tool calls / session events (e.g. "auto-archive after 100 turns," "block writes outside `/Users/flucido/workspace`"). Most users never touch these.

---

## 11. Permissions — tool access control

```bash
mavis permission rules                        # current allow/deny list
mavis permission check <toolName>              # would this tool be allowed?
mavis permission add <toolName>                # add a rule
mavis permission requests                      # show pending approval requests
```

When Mavis hits a tool that needs your sign-off, the request lands in `mavis permission requests`. Approve from the web UI or via `permission add`.

---

## 12. Config — daemon settings

```bash
mavis config info                             # port, data dir, profile, git branch (no daemon needed)
mavis config show                             # full daemon config
mavis config set defaultModel claude-sonnet-4-20250514
mavis config set-api-key <key>                # set personal key across providers
```

---

## 13. Diagnostics & power tools

```bash
mavis usage                                   # token usage by session / agent / global
mavis perf                                    # local performance diagnostics
mavis test:smoke                              # daemon lifecycle blackbox test (safe, isolated)
mavis internal-skill                          # debug: daemon internal skills
```

---

## Common workflows

### "What agents do I have?"
```bash
mavis list -H
```

### "What crons are scheduled for me?"
```bash
mavis cron list mavis
```

### "Smoke-test a cron before tomorrow"
```bash
mavis cron trigger mavis evening-shutdown
```

### "Pause a routine for the day"
```bash
mavis cron disable mavis midday-delivery-check
mavis cron enable  mavis midday-delivery-check   # resume later
```

### "What did Mavis do in session X?"
```bash
mavis session info <sessionId>
mavis session messages <sessionId> | head -50
mavis session diff <sessionId>
```

### "Make a note that survives this session"
```bash
mavis memory append mavis --content "### Pricing rule (2026-07-10)
Type: rule
LTC invoices require a PO number; never send without one."
```

### "Remind me in 10 minutes to check the build"
```bash
mavis cron self "check the vercel build" --every 10m
```

### "Open the web UI"
```bash
mavis web
```

---

## Where things live on disk

| What | Path |
|---|---|
| CLI binary | `/Users/flucido/.mavis/bin/mavis` |
| Global agents | `/Users/flucido/.mavis/agents/<name>/agent.md` |
| Global skills | `/Users/flucido/.mavis/skills/<name>/SKILL.md` |
| Vault agents (contracts) | `/Users/flucido/workspace/Work/Shared/Ops/agents/` |
| Daily notes | `/Users/flucido/workspace/Daily/YYYY-MM-DD.md` |
| Memory | `<agent>/memory/MEMORY.md` and topic files |
| Daemon data | `/Users/flucido/.mavis/data/` (per profile) |
| Logs | `mavis agent logs mavis` |

---

*Last updated: 2026-07-10 (Mavis v3.0.47)*
*Source: `mavis --help` + subcommand `--help` + `mavis list -H` + `mavis cron list mavis`*
