---
title: n8n How-To — Hermes VM
created: 2026-07-10
updated: 2026-07-10 20:15
type: operational
tags: [shared, docker, n8n, automation, infrastructure]
source_vm_path: /home/ubuntu/N8nHowTo.md
status: active
---

> Copied from Hermes VM path `/home/ubuntu/N8nHowTo.md` on 2026-07-10 20:15.
> Secrets remain only in the source stack `.env` files and are redacted in these docs.

# n8n How-To

This document covers the local self-hosted n8n install on this VM.

## Current install summary

- Product: n8n workflow automation / AI agent workflow platform.
- Source repo requested: `https://github.com/n8n-io/n8n`
- Install directory: `/home/ubuntu/n8n`
- How-to document: `/home/ubuntu/N8nHowTo.md`
- Access URL over Tailscale: `http://100.82.161.32:5678`
- n8n image pinned: `docker.n8n.io/n8nio/n8n:2.29.10`
- runner image pinned: `n8nio/runners:2.29.10`
- Postgres image: `postgres:16-alpine`
- Host binding: `100.82.161.32:5678 -> container port 5678`
- Compose file: `/home/ubuntu/n8n/docker-compose.yml`
- Main config file: `/home/ubuntu/n8n/.env`
- Local file-share path for workflows: `/home/ubuntu/n8n/local-files` mounted as `/files`
- Local backup path: `/home/ubuntu/n8n/backups`
- Docker volumes:
  - `n8n_db_storage` — PostgreSQL data
  - `n8n_n8n_storage` — n8n `/home/node/.n8n` data, including encryption/config material

Security posture:
- Bound to the VM's Tailscale IP, not public `0.0.0.0`.
- `.env` contains database and n8n encryption secrets and should stay private.
- `N8N_SECURE_COOKIE=false` because the current URL is HTTP over Tailscale. If moving to HTTPS/domain later, switch this back to secure-cookie behavior.

## What n8n is

n8n is a source-available workflow automation platform with native AI workflow/agent capabilities. It provides a visual workflow canvas, integrations, credentials, webhooks, scheduled triggers, custom code nodes, and external task runners.

This install uses:

- n8n main app container
- PostgreSQL for durable workflows/credentials/executions
- external n8n runner container

## Running services

The Docker Compose stack contains three services:

1. `n8n`
   - Container: `n8n`
   - Image: `docker.n8n.io/n8nio/n8n:2.29.10`
   - Web/API exposed on container port `5678`
   - Host URL: `http://100.82.161.32:5678`
   - Uses Postgres for persistence

2. `n8n-runner`
   - Container: `n8n-runner`
   - Image: `n8nio/runners:2.29.10`
   - Handles task-runner execution for n8n
   - Connects to the n8n task broker at `http://n8n:5679`

3. `postgres`
   - Container: `n8n-postgres`
   - Image: `postgres:16-alpine`
   - Database: `n8n`
   - Data volume: `n8n_db_storage`

## First browser setup

Open from a Tailscale-connected machine:

```bash
http://100.82.161.32:5678
```

Follow the n8n owner-account setup flow in the browser.

## Daily operations

Run commands from the install directory:

```bash
cd /home/ubuntu/n8n
```

### Start

```bash
docker compose up -d
```

### Stop

```bash
docker compose down
```

### Restart

```bash
docker compose restart
```

### Check status

```bash
docker compose ps
```

Expected containers:

- `n8n` — running
- `n8n-runner` — running
- `n8n-postgres` — healthy

### View logs

n8n app logs:

```bash
docker compose logs n8n --tail=100
```

runner logs:

```bash
docker compose logs n8n-runner --tail=100
```

Postgres logs:

```bash
docker compose logs postgres --tail=100
```

Follow all logs live:

```bash
docker compose logs -f
```

## Health checks

### Browser/app check

```bash
curl -I http://100.82.161.32:5678/
```

Expected: HTTP `200`.

### REST/settings check

```bash
curl http://100.82.161.32:5678/rest/settings
```

Expected: JSON response with a `data` object.

### Database check

```bash
docker exec n8n-postgres pg_isready -U postgres -d n8n
```

Expected:

```text
/var/run/postgresql:5432 - accepting connections
```

## Configuration files

### `/home/ubuntu/n8n/docker-compose.yml`

Key local customization:

```yaml
ports:
  - "100.82.161.32:5678:5678"
```

This binds n8n only to the VM's Tailscale IP on host port `5678`.

### `/home/ubuntu/n8n/.env`

Important values:

```bash
N8N_VERSION=2.29.10
N8N_HOST=100.82.161.32
N8N_EDITOR_BASE_URL=http://100.82.161.32:5678
WEBHOOK_URL=http://100.82.161.32:5678/
GENERIC_TIMEZONE=Etc/UTC
POSTGRES_DB=n8n
POSTGRES_NON_ROOT_USER=n8n
N8N_ENCRYPTION_KEY=<secret>
RUNNERS_AUTH_TOKEN=<secret>
```

Do not share or commit `.env`.

Critical warning:
- `N8N_ENCRYPTION_KEY` protects credentials stored in n8n.
- Losing it can break credential decryption.
- Keep `/home/ubuntu/n8n/.env` backed up securely.

## Local files for workflows

The host path:

```text
/home/ubuntu/n8n/local-files
```

is mounted in the n8n container as:

```text
/files
```

Use `/files` inside n8n Read/Write Files nodes. This keeps workflow file I/O constrained to that directory.

## Backup and restore

A complete n8n backup should include:

- PostgreSQL dump from `n8n-postgres`
- n8n storage volume `n8n_n8n_storage`, or at least the `.env` with `N8N_ENCRYPTION_KEY`
- `/home/ubuntu/n8n/local-files` if workflows write files there

### Create a database backup

```bash
mkdir -p /home/ubuntu/n8n/backups
cd /home/ubuntu/n8n
source .env

docker exec n8n-postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > /home/ubuntu/n8n/backups/n8n_db_$(date +%Y%m%d).sql
```

### Back up local files

```bash
tar -C /home/ubuntu/n8n -czf /home/ubuntu/n8n/backups/n8n_local_files_$(date +%Y%m%d).tar.gz local-files
```

### Back up the n8n Docker volume

Example:

```bash
docker run --rm \
  -v n8n_n8n_storage:/volume:ro \
  -v /home/ubuntu/n8n/backups:/backup \
  alpine \
  tar -czf /backup/n8n_storage_$(date +%Y%m%d).tar.gz -C /volume .
```

For real use, copy backups off the VM. Do not rely only on local backups stored on the same disk.

## Upgrade procedure

1. Back up the database and n8n storage.
2. Edit `N8N_VERSION` in `/home/ubuntu/n8n/.env`.
3. Pull and recreate containers.
4. Verify access and logs.

Commands:

```bash
cd /home/ubuntu/n8n

docker compose pull
docker compose up -d

docker compose ps
curl -I http://100.82.161.32:5678/
```

## Capacity notes

Current VM after Twenty + Immich + n8n startup:

- CPU: 2 cores
- RAM: about 11 GiB total
- Memory after startup: about 5.8 GiB used, about 5.9 GiB available
- Swap: none
- Root disk: 45 GiB total, about 29 GiB used, about 16 GiB available
- Docker images after Twenty + Immich + n8n: about 10.7 GB

n8n itself is moderate at idle, but workflow executions can spike memory/CPU depending on nodes, AI calls, file processing, and concurrency.

Disk is currently the main constraint. Before large Immich imports or Paperless document ingestion, add/mount storage and move data-heavy paths there.

Recommended swap plan:
- Add a 4 GiB swapfile now as an OOM safety buffer if continuing to add services on this root disk.
- If a larger storage volume is added, consider 6-8 GiB swap there or on root depending on performance and disk budget.
- Keep swap as safety, not as normal working memory. If the system is constantly swapping, reduce workloads or increase RAM.

## Troubleshooting

### App is not reachable

```bash
cd /home/ubuntu/n8n
docker compose ps
curl -I http://100.82.161.32:5678/
```

Check port binding:

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep n8n
```

Expected:

```text
100.82.161.32:5678->5678/tcp
```

### Check logs

```bash
cd /home/ubuntu/n8n
docker compose logs n8n --tail=200
docker compose logs n8n-runner --tail=200
docker compose logs postgres --tail=200
```

### Database issues

```bash
docker exec n8n-postgres pg_isready -U postgres -d n8n
```

If the database volume is already initialized, changing Postgres passwords in `.env` will not automatically change the existing database user passwords. For a real install, do not delete volumes without a backup.

### Credential decryption issues

If credentials cannot decrypt after restore/move, confirm the same `N8N_ENCRYPTION_KEY` is present in `.env`.

## Current verified state at install completion

- Compose directory created: `/home/ubuntu/n8n`
- n8n image pinned: `docker.n8n.io/n8nio/n8n:2.29.10`
- runner image pinned: `n8nio/runners:2.29.10`
- Postgres image: `postgres:16-alpine`
- App bound to Tailscale: `100.82.161.32:5678`
- App returned HTTP 200
- `/rest/settings` returned JSON
- Postgres health check passed
- n8n logs reported: `Editor is now accessible via: http://100.82.161.32:5678`
- Task broker reported ready and runner registration occurred
- Existing Twenty and Immich stacks stayed up

## Quick command reference

```bash
# Go to install directory
cd /home/ubuntu/n8n

# Start
docker compose up -d

# Stop
docker compose down

# Status
docker compose ps

# Logs
docker compose logs n8n --tail=100
docker compose logs n8n-runner --tail=100

# HTTP check
curl -I http://100.82.161.32:5678/

# DB check
docker exec n8n-postgres pg_isready -U postgres -d n8n

# Resource usage
docker stats
free -h
df -h /
```
