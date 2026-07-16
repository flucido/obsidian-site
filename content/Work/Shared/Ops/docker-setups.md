---
title: Docker Setups — Hermes VM
created: 2026-07-10
updated: 2026-07-10 20:15
type: operational
tags: [shared, docker, infrastructure, self-hosted, hermes-vm]
source_vm_path: /home/ubuntu/DockerSetups.md
status: active
---

> Copied from Hermes VM path `/home/ubuntu/DockerSetups.md` on 2026-07-10 20:15.
> Secrets remain only in the source stack `.env` files and are redacted in these docs.

# Docker Setups on Hermes VM

This file is the single inventory of the Docker-based self-hosted apps currently installed on this VM.

Host:
- VM: flucido-hermes-vm
- Cloud: Oracle Cloud Infrastructure
- Shape: VM.Standard.A1.Flex
- Region: us-sanjose-1
- Availability domain: REZA:US-SANJOSE-1-AD-1
- Tailscale IP: 100.82.161.32
- Docker: 29.6.0
- Docker Compose: v5.2.0
- Platform: linux/aarch64

Current exposed app URLs over Tailscale:
- Twenty CRM: http://100.82.161.32:3020
- Immich: http://100.82.161.32:2283
- n8n: http://100.82.161.32:5678

Security pattern:
- All app HTTP ports are bound to the Tailscale IP `100.82.161.32`, not public `0.0.0.0`.
- Secret values live only in each app's `.env` file and are intentionally not copied into this inventory.
- `.env` files should remain mode `600`.

Current capacity snapshot when this inventory was written:
- RAM: 11 GiB total; about 5.2 GiB used; about 6.4 GiB available.
- Swap: none configured.
- Root disk: 45 GiB total; about 29 GiB used; about 16 GiB available.
- Docker images: about 10.67 GB.
- Docker containers: 10 active containers.
- Docker local volumes: 4 volumes, about 148.5 MB currently.

Recommended next infra work:
- Add a 4 GiB swapfile as OOM safety.
- Add OCI Block Volume storage before real Immich photo imports.
- Move `/home/ubuntu/immich/photos` to the attached block volume after it is mounted.

---

## 1. Twenty CRM

Purpose:
- Open-source CRM / Salesforce alternative.
- Runs app server, worker, Postgres, and Redis.

Install directory:
- `/home/ubuntu/20`

How-to document:
- `/home/ubuntu/20HowTo.md`

Compose file:
- `/home/ubuntu/20/docker-compose.yml`

Env file:
- `/home/ubuntu/20/.env`
- Contains `ENCRYPTION_KEY` and `PG_DATABASE_PASSWORD`.
- Do not disclose/copy secrets from this file.

Compose project name:
- `twenty`

Pinned app image:
- `twentycrm/twenty:v2.20.0`

Access URL:
- `http://100.82.161.32:3020`

External port binding:
- `100.82.161.32:3020 -> twenty-server-1:3000`

Persistent Docker volumes:
- `twenty_db-data`
- `twenty_server-local-data`

### Twenty containers

#### twenty-server-1

Service name:
- `server`

Image:
- `twentycrm/twenty:v2.20.0`

Ports:
- Host: `100.82.161.32:3020`
- Container: `3000/tcp`

Volume mounts:
- `twenty_server-local-data:/app/packages/twenty-server/.local-storage`

Key environment/config:
- `NODE_PORT=3000`
- `SERVER_URL=http://100.82.161.32:3020`
- `PG_DATABASE_URL=postgres://postgres:<redacted>@db:5432/default`
- `REDIS_URL=redis://redis:6379`
- `STORAGE_TYPE=local`
- `ENCRYPTION_KEY=<redacted>`
- `FALLBACK_ENCRYPTION_KEY=`
- `APP_SECRET=`

Healthcheck:
- `curl --fail http://localhost:3000/healthz`
- Interval: 5s
- Timeout: 5s
- Retries: 20

Restart policy:
- `always`

Verified state:
- Healthy.

#### twenty-worker-1

Service name:
- `worker`

Image:
- `twentycrm/twenty:v2.20.0`

Command:
- `yarn worker:prod`

Ports:
- No host ports exposed.

Volume mounts:
- `twenty_server-local-data:/app/packages/twenty-server/.local-storage`

Key environment/config:
- `SERVER_URL=http://100.82.161.32:3020`
- `PG_DATABASE_URL=postgres://postgres:<redacted>@db:5432/default`
- `REDIS_URL=redis://redis:6379`
- `DISABLE_DB_MIGRATIONS=true`
- `DISABLE_CRON_JOBS_REGISTRATION=true`
- `STORAGE_TYPE=local`
- `ENCRYPTION_KEY=<redacted>`

Restart policy:
- `always`

Verified state:
- Running.

#### twenty-db-1

Service name:
- `db`

Image:
- `postgres:16`

Ports:
- No host ports exposed.
- Internal Postgres port: `5432/tcp`

Volume mounts:
- `twenty_db-data:/var/lib/postgresql/data`

Environment:
- `POSTGRES_DB=default`
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=<redacted>`

Healthcheck:
- `pg_isready -U postgres -h localhost -d postgres`
- Interval: 5s
- Timeout: 5s
- Retries: 10

Restart policy:
- `always`

Verified state:
- Healthy.

#### twenty-redis-1

Service name:
- `redis`

Image:
- `redis`

Ports:
- No host ports exposed.
- Internal Redis port: `6379/tcp`

Command:
- `--maxmemory-policy noeviction`

Healthcheck:
- `redis-cli ping`

Restart policy:
- `always`

Verified state:
- Healthy.

### Twenty operations

Start:

```bash
cd /home/ubuntu/20
docker compose up -d
```

Stop:

```bash
cd /home/ubuntu/20
docker compose down
```

Status:

```bash
cd /home/ubuntu/20
docker compose ps
```

Logs:

```bash
cd /home/ubuntu/20
docker compose logs server --tail=100
docker compose logs worker --tail=100
```

Health:

```bash
curl http://100.82.161.32:3020/healthz
```

Backup:

```bash
docker exec twenty-db-1 pg_dump -U postgres default > /home/ubuntu/twenty_backup_$(date +%Y%m%d).sql
```

---

## 2. Immich

Purpose:
- Self-hosted photo/video backup and library server.
- Uses ImageGenius monolithic Immich container plus Postgres and Valkey.

Install directory:
- `/home/ubuntu/immich`

How-to document:
- `/home/ubuntu/ImmichHowTo.md`

Compose file:
- `/home/ubuntu/immich/docker-compose.yml`

Env file:
- `/home/ubuntu/immich/.env`
- Contains database password.
- Do not disclose/copy secrets from this file.

Compose project name:
- `immich`

Pinned app image:
- `ghcr.io/imagegenius/immich:3.0.1`

Access URL:
- `http://100.82.161.32:2283`

External port binding:
- `100.82.161.32:2283 -> immich:8080`

Local data directories:
- `/home/ubuntu/immich/config`
- `/home/ubuntu/immich/photos`
- `/home/ubuntu/immich/libraries`
- `/home/ubuntu/immich/postgres`
- `/home/ubuntu/immich/valkey`
- `/home/ubuntu/immich/backups`

Important future storage plan:
- Move `/home/ubuntu/immich/photos` to an OCI Block Volume before importing a real photo library.

### Immich containers

#### immich

Service name:
- `immich`

Image:
- `ghcr.io/imagegenius/immich:3.0.1`

Ports:
- Host: `100.82.161.32:2283`
- Container: `8080/tcp`

Volume mounts:
- `/home/ubuntu/immich/config:/config`
- `/home/ubuntu/immich/photos:/photos`
- `/home/ubuntu/immich/libraries:/libraries`

Key environment/config:
- `PUID=1001`
- `PGID=1001`
- `TZ=Etc/UTC`
- `DB_HOSTNAME=postgres`
- `DB_USERNAME=postgres`
- `DB_PASSWORD=<redacted>`
- `DB_DATABASE_NAME=immich`
- `DB_PORT=5432`
- `REDIS_HOSTNAME=valkey`
- `REDIS_PORT=6379`
- `REDIS_PASSWORD=`
- `SERVER_HOST=0.0.0.0`
- `SERVER_PORT=8080`
- `MACHINE_LEARNING_HOST=0.0.0.0`
- `MACHINE_LEARNING_PORT=3003`
- `MACHINE_LEARNING_WORKERS=1`
- `MACHINE_LEARNING_WORKER_TIMEOUT=120`

Restart policy:
- `unless-stopped`

Verified state:
- Running.
- App HTTP returned 200.
- API ping returned `{"res":"pong"}`.
- API version returned `3.0.1`.

#### immich-postgres

Service name:
- `postgres`

Image:
- `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0`

Ports:
- No host ports exposed.
- Internal Postgres port: `5432/tcp`

Volume mounts:
- `/home/ubuntu/immich/postgres:/var/lib/postgresql/data`

Environment:
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=<redacted>`
- `POSTGRES_DB=immich`

Restart policy:
- `unless-stopped`

Verified state:
- Healthy.

#### immich-valkey

Service name:
- `valkey`

Image:
- `valkey/valkey:8-bookworm`

Ports:
- No host ports exposed.
- Internal Valkey/Redis-compatible port: `6379/tcp`

Command:
- `valkey-server --appendonly yes`

Volume mounts:
- `/home/ubuntu/immich/valkey:/data`

Restart policy:
- `unless-stopped`

Verified state:
- Running.

### Immich operations

Start:

```bash
cd /home/ubuntu/immich
docker compose up -d
```

Stop:

```bash
cd /home/ubuntu/immich
docker compose down
```

Status:

```bash
cd /home/ubuntu/immich
docker compose ps
```

Logs:

```bash
cd /home/ubuntu/immich
docker compose logs immich --tail=100
docker compose logs postgres --tail=100
docker compose logs valkey --tail=100
```

Health/API:

```bash
curl http://100.82.161.32:2283/api/server/ping
curl http://100.82.161.32:2283/api/server/version
```

Database backup:

```bash
cd /home/ubuntu/immich
source .env
docker exec immich-postgres pg_dump -U "$DB_USERNAME" "$DB_DATABASE_NAME" > /home/ubuntu/immich/backups/immich_db_$(date +%Y%m%d).sql
```

Media backup reminder:
- Back up `/home/ubuntu/immich/photos` separately. The database backup does not contain the actual photos/videos.

---

## 3. n8n

Purpose:
- Workflow automation and AI workflow/agent platform.
- Uses n8n main app, PostgreSQL, and an external task runner.

Install directory:
- `/home/ubuntu/n8n`

How-to document:
- `/home/ubuntu/N8nHowTo.md`

Compose file:
- `/home/ubuntu/n8n/docker-compose.yml`

Env file:
- `/home/ubuntu/n8n/.env`
- Contains database passwords, `N8N_ENCRYPTION_KEY`, and runner auth token.
- Do not disclose/copy secrets from this file.

Compose project name:
- `n8n`

Pinned n8n image:
- `docker.n8n.io/n8nio/n8n:2.29.10`

Pinned runner image:
- `n8nio/runners:2.29.10`

Access URL:
- `http://100.82.161.32:5678`

External port binding:
- `100.82.161.32:5678 -> n8n:5678`

Persistent Docker volumes:
- `n8n_db_storage`
- `n8n_n8n_storage`

Local data directories/files:
- `/home/ubuntu/n8n/local-files` mounted as `/files`
- `/home/ubuntu/n8n/backups`
- `/home/ubuntu/n8n/init-data.sh`

### n8n containers

#### n8n

Service name:
- `n8n`

Image:
- `docker.n8n.io/n8nio/n8n:2.29.10`

Ports:
- Host: `100.82.161.32:5678`
- Container: `5678/tcp`

Volume mounts:
- `n8n_n8n_storage:/home/node/.n8n`
- `/home/ubuntu/n8n/local-files:/files`

Key environment/config:
- `DB_TYPE=postgresdb`
- `DB_POSTGRESDB_HOST=postgres`
- `DB_POSTGRESDB_PORT=5432`
- `DB_POSTGRESDB_DATABASE=n8n`
- `DB_POSTGRESDB_USER=n8n`
- `DB_POSTGRESDB_PASSWORD=<redacted>`
- `N8N_ENCRYPTION_KEY=<redacted>`
- `N8N_ENFORCE_SETTINGS_FILE_PERMISSIONS=true`
- `N8N_HOST=100.82.161.32`
- `N8N_PORT=5678`
- `N8N_PROTOCOL=http`
- `N8N_EDITOR_BASE_URL=http://100.82.161.32:5678`
- `WEBHOOK_URL=http://100.82.161.32:5678/`
- `GENERIC_TIMEZONE=Etc/UTC`
- `TZ=Etc/UTC`
- `N8N_SECURE_COOKIE=false`
- `N8N_RUNNERS_MODE=external`
- `N8N_RUNNERS_AUTH_TOKEN=<redacted>`
- `N8N_RUNNERS_BROKER_LISTEN_ADDRESS=0.0.0.0`
- `N8N_RESTRICT_FILE_ACCESS_TO=/files`
- `NODE_ENV=production`

Restart policy:
- `unless-stopped`

Verified state:
- Running.
- App HTTP returned 200.
- `/rest/settings` returned JSON.
- Logs reported: `Editor is now accessible via: http://100.82.161.32:5678`.

#### n8n-runner

Service name:
- `n8n-runner`

Image:
- `n8nio/runners:2.29.10`

Ports:
- No host ports exposed.
- Internal health/server port: `5680/tcp`

Environment:
- `N8N_RUNNERS_AUTH_TOKEN=<redacted>`
- `N8N_RUNNERS_TASK_BROKER_URI=http://n8n:5679`

Restart policy:
- `unless-stopped`

Verified state:
- Running.
- Logs show JS/Python launcher startup and broker connection attempts/registration through the main n8n service.

#### n8n-postgres

Service name:
- `postgres`

Image:
- `postgres:16-alpine`

Ports:
- No host ports exposed.
- Internal Postgres port: `5432/tcp`

Volume mounts:
- `n8n_db_storage:/var/lib/postgresql/data`
- `/home/ubuntu/n8n/init-data.sh:/docker-entrypoint-initdb.d/init-data.sh:ro`

Environment:
- `POSTGRES_USER=postgres`
- `POSTGRES_PASSWORD=<redacted>`
- `POSTGRES_DB=n8n`
- `POSTGRES_NON_ROOT_USER=n8n`
- `POSTGRES_NON_ROOT_PASSWORD=<redacted>`

Healthcheck:
- `pg_isready -h localhost -U postgres -d n8n`
- Interval: 5s
- Timeout: 5s
- Retries: 10

Restart policy:
- `unless-stopped`

Verified state:
- Healthy.

### n8n operations

Start:

```bash
cd /home/ubuntu/n8n
docker compose up -d
```

Stop:

```bash
cd /home/ubuntu/n8n
docker compose down
```

Status:

```bash
cd /home/ubuntu/n8n
docker compose ps
```

Logs:

```bash
cd /home/ubuntu/n8n
docker compose logs n8n --tail=100
docker compose logs n8n-runner --tail=100
docker compose logs postgres --tail=100
```

HTTP check:

```bash
curl -I http://100.82.161.32:5678/
curl http://100.82.161.32:5678/rest/settings
```

Database check:

```bash
docker exec n8n-postgres pg_isready -U postgres -d n8n
```

Database backup:

```bash
cd /home/ubuntu/n8n
source .env
docker exec n8n-postgres pg_dump -U "$POSTGRES_USER" "$POSTGRES_DB" > /home/ubuntu/n8n/backups/n8n_db_$(date +%Y%m%d).sql
```

n8n storage backup:

```bash
docker run --rm \
  -v n8n_n8n_storage:/volume:ro \
  -v /home/ubuntu/n8n/backups:/backup \
  alpine \
  tar -czf /backup/n8n_storage_$(date +%Y%m%d).tar.gz -C /volume .
```

---

## Current container inventory

```text
NAMES             IMAGE                                                            STATUS                       PORTS
n8n-runner        n8nio/runners:2.29.10                                            Up                            5680/tcp
n8n               docker.n8n.io/n8nio/n8n:2.29.10                                  Up                            100.82.161.32:5678->5678/tcp
n8n-postgres      postgres:16-alpine                                               Up (healthy)                  5432/tcp
immich            ghcr.io/imagegenius/immich:3.0.1                                 Up                            100.82.161.32:2283->8080/tcp
immich-postgres   ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0   Up (healthy)                  5432/tcp
immich-valkey     valkey/valkey:8-bookworm                                         Up                            6379/tcp
twenty-worker-1   twentycrm/twenty:v2.20.0                                         Up                            
twenty-server-1   twentycrm/twenty:v2.20.0                                         Up (healthy)                  100.82.161.32:3020->3000/tcp
twenty-db-1       postgres:16                                                      Up (healthy)                  5432/tcp
twenty-redis-1    redis                                                            Up (healthy)                  6379/tcp
```

## Global operations

Show all running containers:

```bash
docker ps --format 'table {{.Names}}\t{{.Image}}\t{{.Status}}\t{{.Ports}}'
```

Show resource usage:

```bash
docker stats --no-stream
free -h
df -h /
docker system df
```

Start all three stacks:

```bash
cd /home/ubuntu/20 && docker compose up -d
cd /home/ubuntu/immich && docker compose up -d
cd /home/ubuntu/n8n && docker compose up -d
```

Stop all three stacks:

```bash
cd /home/ubuntu/n8n && docker compose down
cd /home/ubuntu/immich && docker compose down
cd /home/ubuntu/20 && docker compose down
```

Suggested stop order:
1. n8n
2. Immich
3. Twenty

Suggested start order:
1. Twenty
2. Immich
3. n8n

Order is not strictly required because the stacks are isolated, but this keeps core business apps first.

## Files created for individual app docs

- `/home/ubuntu/20HowTo.md`
- `/home/ubuntu/ImmichHowTo.md`
- `/home/ubuntu/N8nHowTo.md`
- `/home/ubuntu/DockerSetups.md` — this inventory file
