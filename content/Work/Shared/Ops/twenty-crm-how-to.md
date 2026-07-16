---
title: Twenty CRM How-To — Hermes VM
created: 2026-07-10
updated: 2026-07-10 20:15
type: operational
tags: [shared, docker, twenty, crm, infrastructure]
source_vm_path: /home/ubuntu/20HowTo.md
status: active
---

> Copied from Hermes VM path `/home/ubuntu/20HowTo.md` on 2026-07-10 20:15.
> Secrets remain only in the source stack `.env` files and are redacted in these docs.

# 20 / Twenty CRM How-To

This document covers the local self-hosted Twenty CRM install on this VM.

## Current install summary

- Product: Twenty CRM (`twentyhq/twenty`), the open-source CRM alternative to Salesforce.
- Local shorthand/name: `20`.
- Install directory: `/home/ubuntu/20`
- How-to document: `/home/ubuntu/20HowTo.md`
- Access URL over Tailscale: `http://100.82.161.32:3020`
- Docker image pinned: `twentycrm/twenty:v2.20.0`
- Compose project name: `twenty`
- Host binding: `100.82.161.32:3020 -> container port 3000`
- Main config file: `/home/ubuntu/20/.env`
- Compose file: `/home/ubuntu/20/docker-compose.yml`
- Persistent Docker volumes:
  - `twenty_db-data` — PostgreSQL database data
  - `twenty_server-local-data` — local Twenty file storage/uploads

Security posture:
- The app is bound to the VM's Tailscale IP, not broad public `0.0.0.0`.
- The `.env` file contains secrets and should stay mode `600`.
- Do not paste or commit `.env` contents.

## What Twenty is

Twenty is a self-hostable CRM for managing companies, people, opportunities/deals, workflows, views, and workspace data. It is built as a TypeScript/Nx monorepo with:

- Frontend: React
- Backend: NestJS
- Database: PostgreSQL
- Queue/cache: Redis + BullMQ
- Worker process: background jobs, sync jobs, webhooks, workflow work

The Docker install runs prebuilt images from `twentycrm/twenty` rather than building from source.

## Running services

The Docker Compose stack contains four services:

1. `server`
   - Container: `twenty-server-1`
   - Image: `twentycrm/twenty:v2.20.0`
   - Serves the app/API on container port `3000`
   - Bound on host as `100.82.161.32:3020`
   - Runs migrations/upgrade commands on startup
   - Health endpoint: `/healthz`

2. `worker`
   - Container: `twenty-worker-1`
   - Image: `twentycrm/twenty:v2.20.0`
   - Command: `yarn worker:prod`
   - Processes background jobs, cron jobs, workflows, sync work, and webhook work

3. `db`
   - Container: `twenty-db-1`
   - Image: `postgres:16`
   - Database name: `default`
   - Data volume: `twenty_db-data`

4. `redis`
   - Container: `twenty-redis-1`
   - Image: `redis`
   - Used for queues/cache

## First browser setup

Open from a Tailscale-connected machine:

```bash
http://100.82.161.32:3020
```

Twenty defaults to single-workspace mode for self-hosted installs:

- The first workspace/user becomes the admin.
- After the first workspace is created, open public signup is disabled by default.

After first login, review:

- Settings -> Admin Panel -> Configuration Variables
- Email/SMTP settings if outbound email is needed
- Google/Microsoft integration settings if calendar/email sync is needed
- Storage settings if moving from local storage to S3 later

## Daily operations

Run commands from the install directory unless stated otherwise:

```bash
cd /home/ubuntu/20
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

Expected healthy/running containers:

- `twenty-server-1` — healthy
- `twenty-worker-1` — running
- `twenty-db-1` — healthy
- `twenty-redis-1` — healthy

### View logs

Server logs:

```bash
docker compose logs server --tail=100
```

Worker logs:

```bash
docker compose logs worker --tail=100
```

Follow logs live:

```bash
docker compose logs -f server worker
```

### Health check

```bash
curl http://100.82.161.32:3020/healthz
```

Healthy response:

```json
{"status":"ok","info":{},"error":{},"details":{}}
```

### App HTTP check

```bash
curl -I http://100.82.161.32:3020/
```

Expected: HTTP `200` with `text/html`.

## Configuration files

### `/home/ubuntu/20/docker-compose.yml`

Key local customization:

```yaml
ports:
  - "100.82.161.32:3020:3000"
```

This binds Twenty only to the VM's Tailscale IP on host port `3020`.

### `/home/ubuntu/20/.env`

Important values:

```bash
TAG=v2.20.0
SERVER_URL=http://100.82.161.32:3020
STORAGE_TYPE=local
ENCRYPTION_KEY=<secret>
PG_DATABASE_PASSWORD=<secret>
```

Do not share or commit `.env`.

Critical warning:
- `ENCRYPTION_KEY` encrypts secrets at rest in Twenty.
- Losing it can make stored OAuth tokens, app variables, TOTP secrets, and other encrypted secrets unrecoverable.
- If rotating it later, follow Twenty's key-rotation process using `FALLBACK_ENCRYPTION_KEY`.

## Backup and restore

### Create a database backup

From anywhere:

```bash
docker exec twenty-db-1 pg_dump -U postgres default > /home/ubuntu/twenty_backup_$(date +%Y%m%d).sql
```

Recommended: copy backups off the VM periodically.

### Restore a database backup

Stop app/worker first:

```bash
cd /home/ubuntu/20
docker compose stop server worker
```

Restore backup:

```bash
docker exec -i twenty-db-1 psql -U postgres default < /path/to/backup.sql
```

Start services again:

```bash
cd /home/ubuntu/20
docker compose up -d
```

### Full data note

The database backup covers database state. Uploaded/local files live in Docker volume `twenty_server-local-data`. If users upload files, plan a backup strategy for both:

- `twenty_db-data`
- `twenty_server-local-data`

## Upgrade procedure

Twenty's Docker upgrade flow is:

1. Back up database.
2. Edit `TAG` in `/home/ubuntu/20/.env` to the target version.
3. Pull and restart containers.
4. Verify health and upgrade status.

Commands:

```bash
cd /home/ubuntu/20

docker exec twenty-db-1 pg_dump -U postgres default > /home/ubuntu/twenty_backup_before_upgrade_$(date +%Y%m%d).sql

# Edit TAG in .env, for example:
# TAG=v2.21.0

docker compose pull
docker compose down
docker compose up -d
```

Check upgrade status:

```bash
docker exec twenty-server-1 yarn command:prod upgrade:status
```

Current verified install showed:

```text
APP_VERSION: v2.20.0
Instance: Up to date
No workspaces
```

## Troubleshooting

### App is not reachable

Check containers:

```bash
cd /home/ubuntu/20
docker compose ps
```

Check health:

```bash
curl http://100.82.161.32:3020/healthz
```

Check port binding:

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}'
```

Expected server port mapping:

```text
100.82.161.32:3020->3000/tcp
```

### Server unhealthy

Check server logs:

```bash
cd /home/ubuntu/20
docker compose logs server --tail=200
```

Common first-start behavior:
- Server can take a few minutes while initializing database schema and upgrade metadata.
- The worker may wait until server is healthy.

### Worker not running

Start/reconcile the stack:

```bash
cd /home/ubuntu/20
docker compose up -d
```

Then check worker logs:

```bash
docker compose logs worker --tail=200
```

The worker is needed for background jobs, sync jobs, webhooks, and workflow work.

### Postgres password errors

Important: the Postgres password is baked into the initialized database volume on first creation.

If `PG_DATABASE_PASSWORD` is changed after the DB volume exists, Postgres auth may fail.

For a real install with data:
- Do not delete volumes.
- Restore/rotate carefully.

For a fresh disposable install only:

```bash
cd /home/ubuntu/20
docker compose down --volumes
docker compose up -d
```

This deletes all Twenty data. Do not use on a production/real dataset unless intentionally wiping it.

### Port conflict

This install uses host port `3020` because port `3000` was already occupied by another Node process on this VM.

Check current listener:

```bash
ss -ltnp 'sport = :3020'
```

### Tailscale access

Current VM Tailscale IP:

```text
100.82.161.32
```

If the IP changes, update both:

- `/home/ubuntu/20/docker-compose.yml` port binding
- `/home/ubuntu/20/.env` `SERVER_URL`

Then restart:

```bash
cd /home/ubuntu/20
docker compose down
docker compose up -d
```

## Security notes

- The service is HTTP-only right now, reachable over Tailscale.
- For public/domain access, put it behind a reverse proxy with HTTPS and set `SERVER_URL` to the real HTTPS URL.
- Browser features such as clipboard may require HTTPS except on localhost.
- Logic functions and code interpreter should remain disabled unless explicitly needed and safely sandboxed. Local execution is not suitable for untrusted code.
- Keep `/home/ubuntu/20/.env` private.

## Optional future setup

### SMTP/email

Configure through the Admin Panel after first login, or via env vars if choosing environment-only config.

### Google Gmail/Calendar

Requires Google Cloud OAuth project and redirect URIs like:

```text
https://<domain>/auth/google/redirect
https://<domain>/auth/google-apis/get-access-token
```

For the current Tailscale HTTP setup, OAuth provider behavior may be limited; production OAuth usually wants HTTPS/domain.

### Microsoft 365

Requires Azure app credentials and Microsoft Graph permissions. Personal Microsoft accounts may not work for the integration.

### S3 storage

Current storage is local:

```bash
STORAGE_TYPE=local
```

For production or multi-node deployment, configure S3/S3-compatible storage through the Admin Panel or `.env`.

## Quick command reference

```bash
# Go to install directory
cd /home/ubuntu/20

# Start
docker compose up -d

# Stop
docker compose down

# Status
docker compose ps

# Logs
docker compose logs server --tail=100
docker compose logs worker --tail=100

# Health
curl http://100.82.161.32:3020/healthz

# Upgrade status
docker exec twenty-server-1 yarn command:prod upgrade:status

# Backup DB
docker exec twenty-db-1 pg_dump -U postgres default > /home/ubuntu/twenty_backup_$(date +%Y%m%d).sql
```

## Current verified state at install completion

- Compose directory created: `/home/ubuntu/20`
- Official Docker Compose files downloaded from Twenty `twenty/v2.20.0`
- `.env` generated with pinned tag and secrets
- Docker Compose config validated
- Containers started
- Server health check passed
- App returned HTTP 200
- Worker started and processed initial background jobs
- Upgrade status reported instance up to date
- Abandoned `/opt/20` path removed
