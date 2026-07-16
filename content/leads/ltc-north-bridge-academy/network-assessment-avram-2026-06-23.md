---
title: "North Bridge Academy — Network Assessment (Avram)"
date: 2026-06-23
from: Avram (IT Coordinator)
via: Annie Crowder <annie@northbridgeacademy.org>
type: technical-assessment
tags: [ltc, north-bridge-academy, network, wifi, infrastructure]
dossier: "[[leads/ltc-north-bridge-academy/dossier]]"
---

# North Bridge Academy — Network Assessment (Avram)

**Date:** Tue, Jun 23, 2026 (forwarded by Annie Crowder)
**Author:** Avram, IT Coordinator

---

## Internet Service

| Detail | Value |
|--------|-------|
| **Provider** | Comcast coax ("cable modem") |
| **Download** | ~350 Mbps |
| **Upload** | ~40 Mbps |
| **Gateway** | Up-to-date Comcast hardware |
| **Issues** | Brief midday connectivity losses at Comcast level. Need to isolate from WiFi radio issues. |

## WiFi / Router

- **System:** Ubiquiti Unifi
- **Access Points:** All reasonably current
- **Gateway:** Acceptable, though inexpensive upgrade to latest model may be justified
- **Management:** Unifi console under **WiLine** control (not the ISP — legacy from FastMetrics acquisitions). Avram has admin rights but not full system control.
- **WiLine status:** Running old management version on their hosted infrastructure. Barely charging anything (historical deal). Not particularly proactive — Avram found several APs needing manual software updates.
- **Equipment ownership:** North Bridge owns all equipment (as far as Avram knows)
- **Coverage:** Extensive in most classrooms. Power settings may need to be turned DOWN in central areas to avoid radio contention.

## Issues Resolved by Avram

- Damaged cabling and small AP positioning that would have impacted Annie's Mac
- Mapped and tagged all network devices for visibility
- Monitored network remotely for several months
- One AP went offline for a few hours (unclear if work was happening in that office)

## Current Assessment

**No major WiFi radio connectivity problems at this time.**

---

## Definite Issues Requiring Resolution (Summer Window)

### 1. Router Firmware Update
- **Action:** Avram will trigger remotely in the next few days
- **Risk:** Should be routine and automatic

### 2. Unifi Network Management Upgrade
- **Blocker:** Only WiLine can perform this upgrade
- **Risk:** WiLine might not support it for their clients. If they won't, this is a problem — Avram's features are limited vs. even a home Unifi system.

### 3. UPS Backup — Partially Addressed
| Component | UPS Status |
|-----------|-----------|
| Comcast Gateway | ✅ On new APC UPS |
| Router | ✅ On new APC UPS |
| 2nd Floor Switch | ❌ NOT on battery backup — all 2nd floor APs go down immediately in outage |
| 1st Floor Switch | ❌ UPS has dead battery — replace battery (~cheap) or replace unit |
| Basement AP | ❌ No battery backup |

---

## Larger Areas for Improvement

### Better Internet: AT&T Fiber
- **Availability:** Deployed throughout Mill Valley
- **Benefit:** Huge improvement in speed and reliability vs. Comcast coax
- **Pricing:** Residential pricing is a bargain. Unknown if classified as commercial or educational.
- **Installation:** Bringing fiber from curb into building likely a major project (months, not weeks). May already be in building (doubtful).
- **Next step:** Start the inquiry. **Hesitancy noted** — needs discussion with Annie.

### Redundant Failover: Starlink
- **Benefit:** Emergency failover internet
- **Complexity:** Starlink residential (easy, cheap) vs. commercial (different offering) — needs investigation
- **Compatibility:** Current Unifi setup supports 2 providers with automatic failover

---

## Brewing Issue: IP Subnet Layout

- **Problem:** IP subnets were set up in a "cramped" way — actively running out of IPs as more devices join the LAN
- **Symptom:** "Can't connect" for people entering the building at peak times
- **Temporary fix:** Avram extended with remaining room, but this is a band-aid
- **Real fix:** Logical reconfiguration of entire layout. Phone subnet needs to be moved as well. This is a **project** — not trivial due to unfortunate initial decisions.
- **Urgency:** OK at the moment, but a definite problem if network devices greatly expand. Must be done before class is in session.

---

## Avram's Summary

> "Long story short nothing is urgent with network at the moment but I personally think some things should be addressed proactively over the summer, much safer than after."
>
> Available any time this week after noon to discuss network details by phone.

## Annie's Take

Annie scheduled a 1-on-1 meeting with Frank (no Shannon, no Avram). Shannon is away this week. Annie wants to discuss "what their needs might be" — suggests she wants Frank's synthesis before bringing Avram back in.
