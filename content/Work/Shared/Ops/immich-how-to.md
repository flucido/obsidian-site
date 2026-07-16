---
title: Immich How-To — Hermes VM
created: 2026-07-10
updated: 2026-07-10 20:15
type: operational
tags: [shared, docker, immich, photos, infrastructure]
source_vm_path: /home/ubuntu/ImmichHowTo.md
status: active
---

> Copied from Hermes VM path `/home/ubuntu/ImmichHowTo.md` on 2026-07-10 20:15.
> Secrets remain only in the source stack `.env` files and are redacted in these docs.

# Immich How-To

This document covers the local self-hosted Immich install on this VM.

## Current install summary

- Product: Immich photo/video backup and library server.
- Docker image repository requested: `imagegenius/docker-immich`
- Running image: `ghcr.io/imagegenius/immich:3.0.1`
- Install directory: `/home/ubuntu/immich`
- How-to document: `/home/ubuntu/ImmichHowTo.md`
- Access URL over Tailscale: `http://100.82.161.32:2283`
- Host binding: `100.82.161.32:2283 -> container port 8080`
- Compose file: `/home/ubuntu/immich/docker-compose.yml`
- Main config file: `/home/ubuntu/immich/.env`
- Local data paths:
  - `/home/ubuntu/immich/config` — Immich config and ML cache
  - `/home/ubuntu/immich/photos` — uploaded photo/video library
  - `/home/ubuntu/immich/libraries` — optional external libraries
  - `/home/ubuntu/immich/postgres` — Postgres data
  - `/home/ubuntu/immich/valkey` — Valkey data
  - `/home/ubuntu/immich/backups` — local backup target

Security posture:
- Bound to the VM's Tailscale IP, not public `0.0.0.0`.
- `.env` contains the Postgres password and should stay private.

## What Immich is

Immich is a high-performance self-hosted photo and video backup solution, similar in use case to Google Photos. It supports browser and mobile access, backup from mobile devices, metadata/search, thumbnails, transcoding, and machine-learning features such as face/object/smart search depending on configuration.

This install uses the ImageGenius monolithic Immich image, plus separate local Postgres and Valkey containers.

## Running services

The Docker Compose stack contains three services:

1. `immich`
   - Container: `immich`
   - Image: `ghcr.io/imagegenius/immich:3.0.1`
   - Web/API exposed on container port `8080`
   - Host URL: `http://100.82.161.32:2283`
   - Includes Immich API/web and machine-learning process in the same container

2. `postgres`
   - Container: `immich-postgres`
   - Image: `ghcr.io/immich-app/postgres:14-vectorchord0.4.3-pgvectors0.2.0`
   - Includes the VectorChord/pgvectors extensions Immich expects
   - Data path: `/home/ubuntu/immich/postgres`

3. `valkey`
   - Container: `immich-valkey`
   - Image: `valkey/valkey:8-bookworm`
   - Redis-compatible cache/queue backend
   - Data path: `/home/ubuntu/immich/valkey`

## First browser setup

Open from a Tailscale-connected machine:

```bash
http://100.82.161.32:2283
```

The first user to register becomes the admin user.

## Daily operations

Run commands from the install directory:

```bash
cd /home/ubuntu/immich
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

- `immich` — running
- `immich-postgres` — healthy
- `immich-valkey` — running

### View logs

Immich app logs:

```bash
docker compose logs immich --tail=100
```

Postgres logs:

```bash
docker compose logs postgres --tail=100
```

Valkey logs:

```bash
docker compose logs valkey --tail=100
```

Follow all logs live:

```bash
docker compose logs -f
```

## Health checks

### Browser/app check

```bash
curl -I http://100.82.161.32:2283/
```

Expected: HTTP `200`.

### API ping

```bash
curl http://100.82.161.32:2283/api/server/ping
```

Expected:

```json
{"res":"pong"}
```

### Version check

```bash
curl http://100.82.161.32:2283/api/server/version
```

Current verified response:

```json
{"major":3,"minor":0,"patch":1,"prerelease":null}
```

## Configuration files

### `/home/ubuntu/immich/docker-compose.yml`

Key local customization:

```yaml
ports:
  - "100.82.161.32:2283:8080"
```

This binds Immich only to the VM's Tailscale IP on host port `2283`.

### `/home/ubuntu/immich/.env`

Important values:

```bash
IMMICH_VERSION=3.0.1
PUID=1001
PGID=1001
TZ=Etc/UTC
DB_USERNAME=postgres
DB_PASSWORD=<secret>
DB_DATABASE_NAME=immich
```

Do not share or commit `.env`.

## Backup and restore

Important: Immich database backups are not enough by themselves. The database contains metadata/users; the actual photos/videos live under `/home/ubuntu/immich/photos`.

A complete backup should include:

- `/home/ubuntu/immich/photos`
- `/home/ubuntu/immich/config`
- `/home/ubuntu/immich/libraries` if used
- a Postgres dump from `immich-postgres`

### Create a database backup

```bash
mkdir -p /home/ubuntu/immich/backups
cd /home/ubuntu/immich
source .env

docker exec immich-postgres pg_dump -U "$DB_USERNAME" "$DB_DATABASE_NAME" > /home/ubuntu/immich/backups/immich_db_$(date +%Y%m%d).sql
```

### Back up uploaded media

Example local tarball:

```bash
tar -C /home/ubuntu/immich -czf /home/ubuntu/immich/backups/immich_photos_$(date +%Y%m%d).tar.gz photos config libraries
```

For real use, copy backups off the VM. Do not rely only on local backups stored on the same disk.

## Upgrade procedure

1. Back up database and media.
2. Edit `IMMICH_VERSION` in `/home/ubuntu/immich/.env`.
3. Pull and recreate containers.
4. Verify version and app access.

Commands:

```bash
cd /home/ubuntu/immich

docker compose pull
docker compose up -d

curl http://100.82.161.32:2283/api/server/version
curl http://100.82.161.32:2283/api/server/ping
```

## Capacity notes

Current VM after Twenty + Immich startup:

- CPU: 2 cores
- RAM: about 11 GiB total
- Memory after startup: about 5.8 GiB used, about 5.9 GiB available
- Swap: none
- Root disk: 45 GiB total, about 25 GiB used, about 20 GiB available
- Docker images after Twenty + Immich: about 7.1 GB

Main constraint is disk, not RAM, for serious Immich usage.

Immich photo/video libraries grow quickly. With only about 20 GiB free on `/`, this install is fine for smoke testing and a small library, but not enough for a real photo archive plus Paperless documents plus additional Docker images.

Before importing a large phone/photo library or document archive, add storage or mount a larger volume and move at least `/home/ubuntu/immich/photos` there.

## Troubleshooting

### App is not reachable

```bash
cd /home/ubuntu/immich
docker compose ps
curl http://100.82.161.32:2283/api/server/ping
```

Check port binding:

```bash
docker ps --format 'table {{.Names}}\t{{.Status}}\t{{.Ports}}' | grep immich
```

Expected:

```text
100.82.161.32:2283->8080/tcp
```

### Check logs

```bash
cd /home/ubuntu/immich
docker compose logs immich --tail=200
docker compose logs postgres --tail=200
docker compose logs valkey --tail=200
```

### Heavy CPU or RAM usage

Immich can spike CPU/RAM during:

- thumbnail generation
- video transcoding
- face recognition
- smart search / machine learning
- large initial imports

This VM has only 2 CPU cores. For large imports, run them gradually and watch:

```bash
docker stats
free -h
df -h /
```

### Disk filling up

Check Immich data size:

```bash
du -sh /home/ubuntu/immich/*
df -h /
```

If disk approaches 80%+, stop importing and add/mount storage before continuing.

## Current verified state at install completion

- Compose directory created: `/home/ubuntu/immich`
- Image pinned: `ghcr.io/imagegenius/immich:3.0.1`
- Postgres image verified and started
- Valkey image verified and started
- App bound to Tailscale: `100.82.161.32:2283`
- App returned HTTP 200
- API ping returned `{"res":"pong"}`
- API version returned `3.0.1`
- Existing Twenty stack remained healthy

## Quick command reference

```bash
# Go to install directory
cd /home/ubuntu/immich

# Start
docker compose up -d

# Stop
docker compose down

# Status
docker compose ps

# Logs
docker compose logs immich --tail=100

# Health/API
curl http://100.82.161.32:2283/api/server/ping
curl http://100.82.161.32:2283/api/server/version

# Resource usage
docker stats
free -h
df -h /
```
