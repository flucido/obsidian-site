---
title: Metrics Dictionary
created: 2026-05-17
updated: 2026-05-17
type: system
tags: [metrics, kpi, reference]
---

# Metrics Dictionary

> Single source of truth for all operational metrics. Every KPI referenced in daily/weekly notes must be defined here.

## LTC (Lucido Technology Consulting)

| Metric | Definition | Source File | Cadence | Threshold |
|--------|------------|-------------|---------|-----------|
| Qualified District Conversations | New inbound + outbound conversations with district decision-makers that reached qualification criteria | [[LTC Pipeline]] | Daily | >= 3/week |
| Proposal Stage Movement | Count of opportunities that advanced pipeline stage this week | [[LTC Pipeline]] | Weekly | >= 2/week |
| Active Project Risk Count | Number of active projects with risk score >= medium | [[LTC weekly-plan]] | Daily | <= 2 |
| Client Response Latency | Hours from client message to acknowledged response | [[LTC Pipeline]] | Daily | <= 24h |
| Strategic Content Cadence | Number of authority-building assets published per week | Work/LTC/marketing/ | Weekly | >= 1/week |

## WFC (WellFull Collective)

| Metric | Definition | Source File | Cadence | Threshold |
|--------|------------|-------------|---------|-----------|
| Consult Requests | New consult form submissions + direct inquiries | [[WFC Pipeline]] | Daily | >= 5/week |
| Consult-to-Proposal Ratio | Consults that convert to proposals (%) | [[WFC Pipeline]] | Weekly | >= 40% |
| Offer Distribution | Mix of 01 (landing), 02 (CMS), 03 (support) active deals | [[WFC Pipeline]] | Weekly | Track trend |
| Build Cycle Time | Days from contract to launch per project | [[WFC weekly-plan]] | Per project | <= 14 days |
| Support Retention | Monthly support retainers renewed vs. eligible | [[WFC Pipeline]] | Monthly | >= 85% |
| Testimonial Capture Rate | New testimonials per active client per quarter | Work/WFC/marketing/ | Monthly | >= 0.5/client |

## Shared

| Metric | Definition | Source File | Cadence | Threshold |
|--------|------------|-------------|---------|-----------|
| Weekly Task Completion | % of prioritized tasks completed by Friday | [[master-priority-queue]] | Weekly | >= 90% |
| Daily Note Completeness | % of business days with complete daily notes | Daily/ | Weekly | 100% |
| Vault Update Lag | Hours between significant event and vault update | Various | Weekly | <= 24h |
