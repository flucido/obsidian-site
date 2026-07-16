---
title: flucido-hermes-vm Management
created: 2026-06-22
updated: 2026-06-22
type: operational
tags: [shared, infrastructure, oracle-cloud, hermes]
---

# flucido-hermes-vm — Oracle Cloud Management Doc

> Hermes Agent cloud migration target. Built 2026-06-22.
> See also: [[Daily/2026-06-22#Oracle Cloud — Hermes Migration Target]]

## Instance Overview

| Detail | Value |
|--------|-------|
| **Name** | flucido-hermes-vm |
| **State** | Running |
| **Region** | us-sanjose-1 |
| **Availability Domain** | AD-1 |
| **Fault Domain** | FD-1 |
| **Compartment** | flucido (root) |
| **Launched** | Jun 22, 2026, 20:34:11 UTC (1:34pm PT) |
| **Capacity Type** | On-demand |
| **Shape** | VM.Standard.A1.Flex |
| **OCPU Count** | 2 |
| **Memory (GB)** | 12 |
| **Network Bandwidth (Gbps)** | 2 |
| **Local Disk** | Block storage only |
| **Boot Volume Type** | PARAVIRTUALIZED |
| **Firmware** | UEFI_64 |
| **In-transit Encryption** | Enabled |
| **Secure Boot** | Disabled |
| **Measured Boot** | Disabled |
| **Trusted Platform Module** | Disabled |

## Networking

| Detail | Value |
|--------|-------|
| **Public IPv4** | 163.192.52.35 |
| **Private IPv4** | 10.0.0.125 |
| **VCN** | flucido-hermes-vcn |
| **Subnet** | flucido-hermes-subnet (public) |
| **Route Table** | Default Route Table for flucido-hermes-vcn |
| **VNIC** | flucido-hermes-vnic (Primary) |
| **NIC Attachment Type** | PARAVIRTUALIZED |
| **Hostname** | flucido-hermes-vnic |
| **Internet Gateway** | Configured (public subnet) |
| **Network Security Groups** | Configured |

## Key OCIDs

| Resource | OCID |
|----------|------|
| **Instance** | `ocid1.instance.oc1.us-sanjose-1.anzwuljrrpqjprac3jjlk5l5swiwlphhkie7uyzpqcepzmemoowm4mytikta` |
| **VCN** | `ocid1.vcn.oc1.us-sanjose-1.amaaaaaarpqjpraaj52sm7bkdxa5nxxs3ax6mkco2r4ytctnuhfrfhki2tsq` |
| **Subnet** | `ocid1.subnet.oc1.us-sanjose-1.aaaaaaaatvq42opljxrxiq6p6gignbsfn4tbmlriydt2mx76pzf7sxe4dupq` |
| **Route Table** | `ocid1.routetable.oc1.us-sanjose-1.aaaaaaaaassftasf5rxyr554x4nlphjgmlowk66aqnd5nap3k5voroqwgwua` |
| **VNIC Attachment** | `ocid1.vnicattachment.oc1.us-sanjose-1.anzwuljrrpqjprac4w3oalomql3s5cammtv357poftk3tqvmhhqqygbryjwq` |
| **Boot Image** | `ocid1.image.oc1.us-sanjose-1.aaaaaaaampcjyzx2yxao74lngzxd7quaezhitmirxpnifuspwobw56t26nbq` |

## Oracle Cloud Agent Plugins

| Plugin | Status | Notes |
|--------|--------|-------|
| Custom Logs Monitoring | **Enabled** | Collects custom logs from instance |
| Compute Instance Monitoring | **Enabled** | Performance metrics (CPU, memory, disk, network) |
| Cloud Guard Workload Protection | **Enabled** | Security monitoring |
| OS Management Hub Agent | Disabled | OS patch management |
| Management Agent | Disabled | OCI management services |
| Compute RDMA GPU Monitoring | Disabled | N/A (no GPU) |
| Compute HPC RDMA Auto-Configuration | Disabled | N/A |
| Compute HPC RDMA Authentication | Disabled | N/A |
| Block Volume Management | Disabled | Block volume attachment management |
| Run Command | Available | Remote script execution |

## SSH Access

- **Public IP:** 163.192.52.35
- **SSH Key:** Needs setup — use the key pair created during instance launch
- **Username:** ubuntu (default for Ubuntu images) or opc (Oracle Linux)
- **Connect:** `ssh -i ~/.ssh/lucido_hermes_oci.key ubuntu@163.192.52.35`

## Hermes Migration Plan

### Phase 1: Instance Prep (Tonight ~8pm)
- [ ] SSH connection verified
- [ ] OS updates (`apt update && apt upgrade` or `dnf update`)
- [ ] Verify Custom Logs Monitoring is active in OCI console
- [ ] Verify Compute Instance Monitoring is active — check Metrics Explorer
- [ ] Install Docker or Podman for containerized workloads
- [ ] Check firewall rules (port 22 open, consider Tailscale)

### Phase 2: Hermes Install
- [ ] Install Hermes Agent via official install script
- [ ] Configure cloud profile: `hermes profile create cloud`
- [ ] Set up provider (same as current: deepseek-v4-pro via custom provider)
- [ ] Copy skills from local `~/.hermes/skills/` → instance
- [ ] Copy cron jobs from local config
- [ ] Export/import memory to cloud instance

### Phase 3: Validation
- [ ] Run `hermes tools` to verify tool availability
- [ ] Test basic task execution
- [ ] Verify cron job scheduling works
- [ ] Set up Tailscale for secure remote access

### Phase 4: Cutover
- [ ] Pause local cron jobs
- [ ] Activate cloud cron jobs
- [ ] Monitor for 24h
- [ ] Decommission local runner (keep as fallback)

## Source PDFs

| File | Content |
|------|---------|
| `~/Downloads/Instances _ Oracle Cloud Infrastructure.pdf` | Instance overview + shape config (2 pages) |
| `~/Downloads/Instances _ Oracle Cloud Infrastructure2.pdf` | VNIC + networking details (2 pages) |
| `~/Downloads/Instances _ Oracle Cloud Infrastructure3.pdf` | Agent plugins + run commands (3 pages) |

## Notes

- Instance is Always Free tier eligible (VM.Standard.A1.Flex, 2 OCPU, 12GB fits within 4 OCPU/24GB free limit)
- Region us-sanjose-1 is Oracle's San Jose data center — low latency from Bay Area
- Custom Logs Monitoring and Compute Instance Monitoring are already enabled — verify they're collecting data before migration
- Postiz is running locally on Mac (ports 4007 + 8080) — will stay on Mac for now, not part of this migration
