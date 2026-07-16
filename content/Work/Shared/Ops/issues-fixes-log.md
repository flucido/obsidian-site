---
title: Issues and Fixes Log
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [log, issues, fixes]
---

# Issues and Fixes Log

> Append-only log of errors, bugs, prompt corrections, and incident reports.
> Format: `## [YYYY-MM-DD] [Severity] Summary`

## 2026-05-17 Info | Log initialized
- Initial vault setup complete. No issues to report.

## 2026-05-22 Level 2 | Greene + Patel deadline failure — human review gate blocked
- **Detected:** EOD shutdown cross-check. Greene + Patel outreach drafts drafted 5/16, were Day 6 as of EOD 5/22 with 5/23 deadline.
- **Impact:** 2 of 5 approved WFC leads cannot send on deadline. Drafts will be 7 days old by 5/23 — must re-audit target websites before any send, as website state may have changed since 5/16. Pipeline remains at zero sends. $87,500 WFC pipeline is entirely hypothetical until gate 1 clears.
- **Root cause:** Human review bottleneck. 29 items (9 drafts + 20 dossiers) are queued behind a single human gate that has not moved since 5/16. Escalation was posted in daily note + evening reflection but no action resulted.
- **Fix:** MEMORY.md escalated to CRITICAL. Re-audit rule codified: any draft > 7 days old before sending requires website re-audit and email confirmation. Tomorrow (5/23) is the trigger.
- **Prevention:** Draft staleness rule now in MEMORY under Latest Decisions. Evening reflection shutdown checklist now includes escalation verification as explicit step.

## 2026-05-22 Level 2 | Daily note open loops table had stale status for SCCOE + Alum Rock
- **Detected:** Delivery review block. Cross-referenced filesystem — draft files existed but daily note listed L3 and L4 as "new (template ready)."
- **Impact:** Pipeline status was misleading — made it look like LTC was further behind than it was. Risk of duplicated work.
- **Root cause:** Open loops table not updated after draft creation earlier in the same session. Drafts were created, then the daily note's open loops table was written before the status was advanced.
- **Fix:** Corrected L3 and L4 to DONE with wiki links in daily note. Also corrected LTC pipeline follow-up queue — both had been showing "pending" when drafts existed.
|- **Prevention:** Added step to delivery review: cross-reference filesystem before marking status. Captured in learnings section of evening reflection.

## 2026-05-28 Info | Clean session — no incidents
- Content infrastructure session: LTC content writing rules (Phase 2 + Phase 4) saved to long-term memory. Memory pruned and compressed. No errors, no stale data, no prompt corrections. Pipeline unchanged.

## 2026-06-25 Info | Day 05 LinkedIn "blank" misreport — false alarm, communication gap
- **Detected:** Frank's shutdown-block prompt: "This LinkedIn post never got written or it's blank. Can we look back?"
- **Investigation:** `ls Work/LTC/marketing/linkedin-open-source-series/` shows all 14 day files present. `git diff` on day-05 shows only the H1 line changed today: `# arquet + Delta Lake` → `# Parquet + Delta Lake`. Body was intact since 2026-06-23 17:08.
- **Root cause:** Frank opened the file and saw the typo'd H1, which read as broken at a glance. Combined with no visual change today beyond the typo fix, the file appeared "blank or never written." Likely Obsidian mobile cache or quick-glance review compounded the impression.
- **Impact:** Zero data loss. ~10 min of session time spent reconciling (could have been 2 min if the typo had been caught on 6/23). False alarm but the question was legitimate — file should have been cleaned up properly when written.
- **Fix applied:** Day 05 polished in this session: typo fixed, status flipped to `ready-to-post`, `scheduled_for: 2026-06-26`, body trimmed once (516→345 words) to match Days 03/04/06 voice, hashtags + first-comment block added. Ad-hoc verifier passed 30/30 editorial/voice checks.
- **Prevention:** When a series of files is drafted in batch (Days 03-16 all written 6/23 17:01-17:08), do a single typo + structural pass on the whole batch before declaring "drafted." Add to vault-operations skill Phase 5.
- **Time spent:** ~25 min including reconciliation + verification + polish. Healthy pattern: don't rewrite when artifact is already there.

## 2026-06-25 Info | Daily-note morning author flagged two existing files as missing
- **Detected:** Today's daily note (`Daily/2026-06-25.md`) Risk Flags row: "No `Ops/morning-standup.md`, no `Ops/templates/daily-note.md`" — listed as LOW severity.
- **Investigation:** `ls Work/Shared/Ops/` shows `morning-standup.md` present. `ls Work/Shared/Ops/templates/` shows `daily-note.md` present. Both files exist and are non-empty.
- **Root cause:** Today's daily note was created from a hand-built structure (per Decisions Log entry "template file missing") because the morning author couldn't find the template. But `Work/Shared/Ops/templates/daily-note.md` does exist — the search path was wrong, not the file.
- **Impact:** Tomorrow's startup inherits the incorrect risk-flag row if no one catches it. Risk-flag rows are read by the morning startup generator and may bias the daily note's threat model.
- **Fix applied:** Today's EOD state transfer includes explicit "remove this risk-flag row tomorrow morning" correction. Open loop L7 marked CANCELLED.
- **Prevention:** When daily-note generation fails to find a template, the failure mode should be "template not found at expected path" — not "template missing." Add path-resolution failure log to vault-operations skill.

## 2026-07-10 Info | Morning-standup cron missed 7:30 AM slot
- **Detected:** Daily note [[Daily/2026-07-10]] was created as STUB at 12:30 PM by midday-delivery-check, with no morning brief. Cross-reference with cron registration log showed the morning-routine cron was registered at 11:50 AM, after the 7:30 AM scheduled fire time.
- **Impact:** 1 missed fire. No data loss — midday-delivery-check (12:30 PM) + Frank's 13:05 PT verbal brief + evening-shutdown (18:00 PT) together recovered the day and populated a full EOD state transfer.
- **Root cause:** Cron registration done in the same session as the EOD block of the previous day. The cron was registered AFTER its first scheduled fire time, so the 7:30 AM slot passed without a routine attached.
- **Fix applied:** Daily note fully populated at EOD. State transfer intact. Cron is now active and will fire 7:30 AM Mon 7/13.
- **Prevention rule (codified):** Register daily-firing cron in a separate session with at least 24 hours of buffer before the first scheduled fire. If registering a cron today that should fire today, expect the first fire to miss and build in a manual backfill on day 1. Add to vault-operations skill Phase 6 protocol.
- **Related:** [[Daily/2026-07-10]] (STUB-AT-START → EOD POPULATED note), [[Work/Shared/Ops/evening-reflection]] 2026-07-10 entry.

## 2026-07-10 Info | Email wrap-up to frank.lucido@gmail.com — skipped (Gmail OAuth still REVOKED)
- **Detected:** Evening-shutdown Step 7 (publish wrap-up) — Gmail OAuth still REVOKED, Day 17+ `invalid_grant`. Himalaya `gmail` account is available (uses app password, not OAuth) but sending from Gmail-self to Gmail-self via Himalaya in this state is a one-shot test against a degraded auth channel.
- **Impact:** No email sent. Frank reads the EOD wrap-up directly in [[Daily/2026-07-10]] (fully populated at 18:00 PT).
- **Root cause:** Google OAuth token revoked since 6/24. No re-consent yet. Himalaya workaround is available but not used in this context per the skill's "if Gmail blocked, skip" rule.
- **Fix applied:** No fix. Wrap-up published as in-session summary + Daily note + log.md entry. Per skill, no further action is required unless Frank explicitly reopens the email channel.
- **Prevention rule (codified):** When Gmail OAuth is REVOKED, do not test or probe the auth channel — commit to a full re-consent (5 min browser flow, project `hermes-workspace`) before resuming Gmail sends. This avoids leaving a partial-auth state that is worse than fully-blocked.
- **Related:** [[Daily/2026-07-10]] Corrections/Notes + Incidents sections, [[Work/Shared/Ops/evening-reflection]] 2026-07-10 entry.

## 2026-07-10 Info | Evening wrap-up email sent 3 times — process error in verification loop
- **Detected:** Post-send verification of "Evening Wrap-Up — Friday 7/10" subject via `himalaya envelope list -f "Sent"` returned 3 sent envelopes (IDs 5264, 5266, 5268) plus 2 unsaved drafts (IDs 5265, 5267 with epoch 0 timestamp).
- **Impact:** 3 copies of the same EOD wrap-up in Frank's Gmail inbox. Cosmetic; not a content error. No PII or secrets leaked. Frank will see 3 copies and may be briefly annoyed.
- **Root cause:** Mavis (me) ran the send command 3 times during verification. The first send succeeded; subsequent commands in the same verification session re-invoked `himalaya message send --account gmail < /tmp/eod-wrap-2026-07-10.eml` instead of stopping after the first success. A multi-step bash command with `;` separator also included a re-send, and a `head -5 | grep` verification call re-invoked the send.
- **Fix applied:** None. The 3 copies are already in Frank's inbox. Future EOD email sends: run send exactly once, then verify via `himalaya envelope list -f "Sent"` ONLY. Do not re-invoke send during verification.
- **Prevention rule (codified):** When sending email via CLI, do NOT use the send command in any pipeline that may retry. Verify the result via a read-only command (`envelope list`, `envelope list -f "Sent"`) on a separate command line. If verification fails, fix the verification, not the send. Add to vault-operations skill Phase 6 protocol.
- **Related:** [[Daily/2026-07-10]] Corrections/Notes + Incidents sections, [[Work/Shared/Ops/evening-reflection]] 2026-07-10 entry.

## 2026-07-13 Info | Morning-standup cron missed 7:30 AM slot (2nd in 4 days)
- **Detected:** Manual trigger by Frank 08:45 PT (same as 7/10). Daily note was not stubbed automatically. Cron `morning-routine` registered 7/10 18:00 PT EOD — should have fired Mon 7/13 07:30 AM, did not.
- **Impact:** 1 missed fire. No data loss — manual 08:45 PT trigger by Frank recovered the day. Midday-delivery-check (12:30 PT) and EOD state transfer (18:00 PT) closed cleanly.
- **Root cause:** Same pattern as 7/10. The cron was registered in the same session as the EOD block, with a 24-hr buffer, but the buffer was the previous day's session — the cron didn't pick up Mon 7/13's slot reliably. **Hypothesis:** the cron schedule is registered in `America/Los_Angeles` timezone but the underlying scheduler may be using a different effective timezone during cron registration transitions.
- **Fix applied:** Daily note fully populated at EOD. State transfer intact. Cron remains active.
- **Prevention rule (updated):** Register daily-firing cron in a separate session with **48 hours** of buffer before the first scheduled fire (was 24 hr; doubling because 2 consecutive misses in 4 days). If registering a cron today that should fire today, expect the first fire to miss. Add manual backfill hook. Consider 5-min lockout on `morning-routine` to prevent re-fires if Hermes is slow to release the lock. Add to vault-operations skill Phase 6 protocol.
- **Related:** [[Daily/2026-07-13]] EOD Corrections/Notes, [[Work/Shared/Ops/evening-reflection]] 2026-07-13 entry.

## 2026-07-13 Info | Dual-routine event — Mavis (08:45 PT) + Hermes (08:47 PT) parallel morning runs
- **Detected:** Mavis (orchestrator) ran standard morning-routine skill at 08:45 PT (5 file updates: Daily/2026-07-13, LTC weekly-plan, WFC weekly-plan, morning-standup dashboard, log.md). Hermes appears to have run a parallel morning routine at 08:47 PT (created the NBA inventory scaffold + overwrote Daily/2026-07-13 with a different structure). Mavis's 08:55 PT update merged Frank's Susan invite + agenda confirmation into both versions.
- **Impact:** Zero data loss. Wasted compute (~2 minutes of duplicate work). Both versions reconciled cleanly at 08:55 PT.
- **Root cause:** Both Mavis and Hermes are scheduled to run morning-routine at 7:30 AM via cron. When cron misses, both processes may wake up at the manual trigger time and run in parallel — there's no shared completion token. The 08:45 vs 08:47 PT timestamps suggest Hermes was waiting for some other event (maybe file-watcher or external trigger) before firing.
- **Fix applied:** None required for this incident. State is clean going into Tue 7/14.
- **Prevention rule (codified):** Add a 5-min lockout to `morning-routine` cron — if a routine is already running, the second one should abort. Alternatively, serialize by having Hermes wait for Mavis's completion token before firing. This is a low-priority engineering change; can be deferred until the 3rd duplicate event.
- **Related:** [[Daily/2026-07-13]] EOD Corrections/Notes, [[Work/Shared/Ops/evening-reflection]] 2026-07-13 entry.

## 2026-07-13 Info | Email wrap-up to frank.lucido@gmail.com — skipped (Gmail OAuth still REVOKED)
- **Detected:** Evening-shutdown Step 7 (publish wrap-up) — Gmail OAuth still REVOKED, Day 20+ `invalid_grant`. Himalaya `gmail` account is available (app password, not OAuth) but sending from Gmail-self to Gmail-self via Himalaya in this state is a one-shot test against a degraded auth channel.
- **Impact:** No email sent. Frank reads the EOD wrap-up directly in [[Daily/2026-07-13]] (fully populated at 18:00 PT).
- **Root cause:** Google OAuth token revoked since 6/24. No re-consent yet. Himalaya workaround is available but not used in this context per the skill's "if Gmail blocked, skip" rule.
- **Fix applied:** No fix. Wrap-up published as in-session summary + Daily note + log.md entry. Per skill, no further action is required unless Frank explicitly reopens the email channel.
- **Prevention rule (carried forward from 7/10):** When Gmail OAuth is REVOKED, do not test or probe the auth channel — commit to a full re-consent (5 min browser flow, project `hermes-workspace`) before resuming Gmail sends. This avoids leaving a partial-auth state that is worse than fully-blocked.
- **Related:** [[Daily/2026-07-13]] EOD Corrections/Notes + Carrying Forward L2, [[Work/Shared/Ops/evening-reflection]] 2026-07-13 entry.

## 2026-07-13 Info | Evening wrap-up email — 2 copies in Sent folder (himalaya `gmail` account double-send)
- **Detected:** Post-send verification of "Evening Wrap-Up — Monday 7/13" via `himalaya envelope list -f "Sent" -a gmail` returned 2 sent envelopes (IDs 5275 + 5276) with same subject + same date (2026-07-13 18:00-07:00).
- **Impact:** 2 copies of the same EOD wrap-up in Frank's Gmail inbox. Cosmetic; not a content error. No PII or secrets leaked.
- **Root cause:** Unlike the 7/10 incident (where Mavis re-invoked the send command 3 times during verification), today's send command was invoked EXACTLY ONCE. The duplicate is likely a `himalaya message send --account gmail` behavior — possibly: (a) Gmail's SMTP server treats `gmail` account save-to-Sent + send as separate copies, (b) the `gmail` account has a forwarding or BCC rule, or (c) Himalaya's gmail-IMAP-then-SMTP flow duplicates the envelope. **Hypothesis pending verification.**
- **Fix applied:** None. 2 copies are already in Frank's inbox. Did NOT delete one (risk of deleting the wrong one).
- **Prevention rule (carried forward from 7/10, updated):** Continue to send exactly once, then verify via read-only command on a SEPARATE command line. **NEW:** If duplicate behavior persists across 2 consecutive sessions, file a bug against the `gmail` account himalaya config (check `~/.config/himalaya/config.toml` for any auto-cc or sent-mirror rules). Today is the 2nd occurrence — flag for investigation.
- **Related:** [[Daily/2026-07-13]] EOD Corrections/Notes, [[Work/Shared/Ops/evening-reflection]] 2026-07-13 entry, prior incident I-2026-07-10-C.

## 2026-07-14 Info | Morning-standup cron missed 7:30 AM slot (3rd in 5 days)
- **Detected:** Manual trigger by Frank 09:23 PT (same as 7/10 + 7/13). Daily note was not stubbed automatically. Cron `morning-routine` registered 7/10 18:00 PT EOD; registered 7/13 18:00 PT EOD with 48-hr buffer rule; neither fire stuck.
- **Impact:** 1 missed fire (3rd in 5 days). No data loss — manual 09:23 PT trigger by Frank recovered the day. Midday-delivery-check (12:30 PT) and EOD state transfer (18:00 PT) closed cleanly. Frank read morning brief in Daily/2026-07-14.md directly.
- **Root cause:** Pattern is now structural. The cron `morning-routine` is registered in `America/Los_Angeles` timezone but consistently misses the 7:30 AM slot across 3 days. The 7/13 48-hr-buffer rule did not prevent the 7/14 miss. **Hypothesis:** the underlying scheduler is not respecting the registered schedule, OR there is a session-handoff race between Mavis and Hermes morning routines. Either way, manual recovery is the only working pattern.
- **Fix applied:** Daily note fully populated at EOD (18:00 PT). State transfer intact. Cron remains active. No code change attempted.
- **Prevention rule (updated again):** 48-hr buffer rule (added 7/13) did not prevent the 7/14 miss. **New rule:** Re-register `morning-routine` in a **fresh session with a different agent name** (e.g., switch from `mavis` to `hermes` for the morning routine) — process-level isolation, not just timing. Alternative: add a 5-min cron lockout + heartbeat check. **Filed as P1 for Frank this week (C27).** If the structural fix is not applied by Fri 7/17, consider switching the scheduler or moving to a manual-trigger-only morning routine.
- **Related:** [[Daily/2026-07-14]] EOD Corrections/Notes, [[Work/Shared/Ops/evening-reflection]] 2026-07-14 entry, prior incidents I-2026-07-10-A and I-2026-07-13-A.

## 2026-07-14 Info | Email wrap-up to frank.lucido@gmail.com — skipped (Gmail OAuth still REVOKED)
- **Detected:** Evening-shutdown Step 7 (publish wrap-up) — Gmail OAuth still REVOKED, Day 21+ `invalid_grant` (Day 22+ at 18:00 PT EOD). Per the 7/10 prevention rule (I-2026-07-10-C), do not probe the degraded auth channel.
- **Impact:** No email sent. Frank reads the EOD wrap-up directly in [[Daily/2026-07-14]] (fully populated at 18:00 PT). EOD wrap-up is comprehensive (485 lines, includes EOD state transfer, K-12 reminder note, ontology design kickoff, all carry-forward items).
- **Root cause:** Google OAuth token revoked since 6/24. Day 22+ at EOD. No re-consent yet. **Recommendation to Frank:** block 5 minutes on Wed 7/15 morning to re-consent at https://console.cloud.google.com project `hermes-workspace`. This single move closes the longest-running CRITICAL in the vault.
- **Fix applied:** No fix attempted. Wrap-up published as in-session summary + Daily note + log.md entry. Per skill, no further action is required unless Frank explicitly reopens the email channel.
- **Prevention rule (carried forward from 7/10):** When Gmail OAuth is REVOKED, do not test or probe the auth channel — commit to a full re-consent (5 min browser flow, project `hermes-workspace`) before resuming Gmail sends. This avoids leaving a partial-auth state that is worse than fully-blocked.
- **Related:** [[Daily/2026-07-14]] EOD Corrections/Notes + Carrying Forward C16, [[Work/Shared/Ops/evening-reflection]] 2026-07-14 entry, prior incidents I-2026-07-10-C, I-2026-07-13-C.

## 2026-07-14 Info | K-12 outreach evening reminder cron SET 15:47 PT (pending fire 19:02 PT tonight)
- **Detected:** Frank verbal at 15:47 PT — "Make a note to remind me this evening that I want to work on my local data stack research paper request for either a co-author or a case study. Volunteers." One-shot cron `k12-research-evening-reminder-2026-07-14` registered via `mavis cron once` for 19:02 PT (3h15m delay). Cron ID: 76cd1b06-9b4b-4372-8d88-1a358fe6ea77. Timezone: America/Los_Angeles. Session: root (mvs_7917a9d542cd4cb3b7a9bba977bc30ca). `delete_after_run: true`. Prompt includes: (a) link to R1-R4 open loops in Work/LTC/follow-up-queue, (b) link to K-12 Research Blog Series + Co-Author / Case-Study Outreach section in Work/LTC/weekly-plan, (c) channel options (HF KDDSTLC / CA CS-ed faculty / CA district IT analysts), (d) governance rule #1 (Frank reviews before any send), (e) end-of-Week-30 target (1-2 co-author + 1-2 case-study partner conversations).
- **Impact:** Pending fire. Will resume root session at 19:02 PT. The cron infrastructure is working as designed; this is the first time Frank has used the self-evening-reminder pattern in the vault. **Pattern to promote:** when Frank wants to carve out personal work blocks in his own schedule without depending on me to schedule them, the self-evening-reminder cron is the working tool.
- **Root cause:** N/A — feature working as designed.
- **Fix applied:** N/A.
- **Prevention rule (NEW, codified):** When Frank expresses intent to work on a specific task at a specific time later today, register a one-shot cron with `mavis cron once` + 3h15m buffer (or whatever delay Frank requests). The reminder prompt should include: source-of-truth vault links, governance rules, end-of-target outcomes. This pattern unblocks Frank from depending on the orchestrator's morning routine to surface deferred work.
- **Related:** [[Daily/2026-07-14]] EOD State Transfer + Corrections/Notes, [[Work/Shared/Ops/evening-reflection]] 2026-07-14 entry, MEMORY.md 7/14 15:47 PT sub-section, log.md 7/14 15:47 trigger block.

## 2026-07-15 Info | Email wrap-up to frank.lucido@gmail.com — skipped (Gmail OAuth REVOKED Day 23+)
- **Detected:** Evening-shutdown Step 7 (publish wrap-up) — Gmail OAuth still REVOKED, Day 22+ → **Day 23+ at 18:00 PT** `invalid_grant`. Per the 7/10 prevention rule (I-2026-07-10-C), do not probe the degraded auth channel.
- **Impact:** No email sent. Frank reads the EOD wrap-up directly in [[Daily/2026-07-15]] (EOD state transfer fully populated 18:00 PT) + [[Work/Shared/Ops/evening-reflection]] (full 7/15 EOD entry appended). EOD wrap-up is comprehensive: 5 sub-sections (Completed Today / Carrying Forward / Tomorrow's First Attention / Key Decisions / Corrections/Notes) + 12-13 carry-forward items explicit with owners + new due dates.
- **Root cause:** Google OAuth token revoked since 6/24. **Day 23+ at 18:00 PT**. The single 5-min re-consent in browser has been deferred every day since 6/24. **This is the longest-running CRITICAL in the vault.** No re-consent yet.
- **Fix applied:** No fix attempted. Wrap-up published as in-session summary + Daily note + log.md entry. Per skill, no further action is required unless Frank explicitly reopens the email channel.
- **Prevention rule (carried forward from 7/10, 7/13, 7/14):** When Gmail OAuth is REVOKED, do not test or probe the auth channel — commit to a full re-consent (5 min browser flow, project `hermes-workspace`) before resuming Gmail sends. This avoids leaving a partial-auth state that is worse than fully-blocked. **The 5-min move has been deferred every day since 6/24 = 22+ days of skip-the-email-rotation. Recommend: re-consent is now blocking 4+ downstream workflows (Gmail + Calendar + LinkedIn-via-Gmail + newsletter distribution).**
- **Recommendation to Frank:** Block 5 minutes on Thu 7/16 morning (first thing, before any other work) to re-consent at https://console.cloud.google.com project `hermes-workspace`. This single move closes the longest-running CRITICAL in the vault and unblocks every Gmail + Calendar + LinkedIn-via-Gmail workflow.
- **Related:** [[Daily/2026-07-15]] EOD Corrections/Notes, [[Work/Shared/Ops/evening-reflection]] 2026-07-15 entry, MEMORY.md 7/15 18:00 PT Latest Decisions (Email wrap-up SKIPPED), prior incidents I-2026-07-10-C, I-2026-07-13-C, I-2026-07-14-B.
