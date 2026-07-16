---
title: How-To — Connect to Hermes on Oracle Cloud via Tailscale
created: 2026-06-23
updated: 2026-06-23
type: how-to
tags: [shared, infrastructure, tailscale, hermes, oracle-cloud, remote-access]
---

# How-To: Connect to Hermes on Oracle Cloud via Tailscale

> Goal: Reach the Hermes Agent running on **flucido-hermes-vm** (Oracle Cloud,
> 163.192.52.35) from anywhere — through the **web dashboard**, the **TUI**,
> or plain **SSH** — without exposing ports to the public internet.
> Tailscale gives you a private, encrypted WireGuard mesh. One tailnet, two
> devices, zero open firewall ports.

See also: [[Work/Shared/Ops/flucido-hermes-vm-management]]

---

## Prerequisites

| Item | Notes |
|------|-------|
| Oracle Cloud instance running | `flucido-hermes-vm`, public IP 163.192.52.35, user `ubuntu` |
| SSH key | `~/.ssh/lucido_hermes_oci.key` (verify access before starting) |
| Hermes Agent installed on instance | Phase 2 of migration plan — see management doc |
| Tailscale account | Free tier covers up to 100 devices |
| This Mac | Already your daily driver; will join the tailnet |

---

## Part 1 — Install & Join Tailscale

### On the Mac (your laptop)

```bash
# Install via Homebrew (GUI app + CLI)
brew install --cask tailscale

# Or CLI only (lighter, no menubar icon):
brew install tailscale
```

Launch the Tailscale app (or run `tailscale up` from CLI), sign in with your
identity provider (Google/GitHub/etc.). Note the device name — this is your
**client** on the tailnet.

### On the Oracle VM (flucido-hermes-vm)

```bash
# SSH in first (you still have the public IP for now)
ssh -i ~/.ssh/lucido_hermes_oci.key ubuntu@163.192.52.35

# Install Tailscale
curl -fsSL https://tailscale.com/install.sh | sh

# Authenticate and bring the interface up
sudo tailscale up

# The first run prints a URL — open it in a browser to authorize this device
# Once authorized, verify:
tailscale status
```

You should now see **two devices** in `tailscale status`:
- Your Mac (e.g., `flucido-mac`)
- The VM (e.g., `flucido-hermes-vm`)

Each gets a **100.x.y.z** tailnet IP. Note the VM's tailnet IP — call it
`<TAILNET_VM_IP>` below. Find it with:

```bash
# Run on the VM:
tailscale ip -4
```

### Lock down the VM firewall (optional but recommended)

Once Tailscale works, you can close port 22 to the public internet and only
allow SSH over the tailnet. In the Oracle Cloud console:

1. **Networking → Virtual Cloud Networks → flucido-hermes-vcn → Security Lists**
2. Edit the **flucido-hermes-subnet** security list
3. Remove the ingress rule for port 22 / 0.0.0.0/0
4. Add an ingress rule: source = `<TAILNET_MAC_IP>/32`, proto TCP, port 22
5. Keep egress rules as-is

> **Don't lock yourself out.** Test SSH over the tailnet IP *before* removing
> the public 22 rule. Keep one fallback path until you've confirmed.

---

## Part 2 — Access the Hermes Web Dashboard

Hermes ships a built-in web dashboard: `hermes dashboard`. Default binds to
`127.0.0.1:9119` (loopback only). We need it reachable from your Mac over the
tailnet.

### Step 1 — Start the dashboard bound to the tailnet IP

On the VM:

```bash
# Bind to the tailnet interface (not 0.0.0.0 — that would expose it to the
# public internet via the VNIC). Use the VM's tailnet IP.
hermes dashboard --host <TAILNET_VM_IP> --port 9119 --no-open --insecure
```

Flags explained:
- `--host <TAILNET_VM_IP>` — bind only to the tailnet interface
- `--no-open` — no browser on a headless server
- `--insecure` — required by Hermes to bind anywhere other than localhost;
  safe here because traffic stays inside the tailnet (WireGuard-encrypted)

To keep it running after you disconnect, wrap it:

```bash
nohup hermes dashboard --host <TAILNET_VM_IP> --port 9119 \
  --no-open --insecure > ~/hermes-dashboard.log 2>&1 &
```

Or set up a **systemd unit** for persistence across reboots (recommended for
production use — see Appendix).

### Step 2 — Open the dashboard from the Mac

In a browser on your Mac:

```
http://<TAILNET_VM_IP>:9119
```

That's it. WireGuard handles encryption end-to-end, so HTTP (not HTTPS) is fine
over the tailnet. The dashboard lets you manage config, API keys, profiles,
sessions, and kick off agent chats.

### Step 3 — Verify

- You should see the Hermes dashboard UI load
- Profile switcher should show the `cloud` profile (once you've created it)
- Try starting a chat session from the web UI to confirm the agent responds

---

## Part 3 — Connect the TUI over Tailscale

The TUI is the richest interactive interface. Two ways to reach it:

### Option A — SSH into the VM and run the TUI there (simplest)

From your Mac:

```bash
# SSH over the tailnet (encrypted by WireGuard; no need for key + public IP)
ssh ubuntu@<TAILNET_VM_IP>

# Inside the SSH session, launch the TUI:
hermes --tui
```

Pros: zero extra config. Cons: TUI rendering depends on your terminal's
capabilities over SSH; some mouse/scroll support may vary.

### Option B — Use Tailscale Serve to expose the TUI

If `hermes --tui` supports an HTTP/SOCKS transport (check the version on the
VM with `hermes version`), you could pipe it through Tailscale Serve:

```bash
# On the VM: expose the TUI's listen port over the tailnet
sudo tailscale serve --bg --tcp 9120 9120
hermes --tui   # if it binds a port; otherwise use Option A
```

> **Note:** The TUI in current Hermes versions is a terminal app, not a
> network service. **Option A (SSH + `hermes --tui`) is the supported path.**
> Option B only applies if a future Hermes version adds a networked TUI
> server. Verify with `hermes --tui --help` on the VM.

---

## Part 4 — Direct SSH Access (fallback / daily driver)

Even if you primarily use the web dashboard, SSH over the tailnet is your
primary management path:

```bash
# Add to ~/.ssh/config on the Mac for convenience:
Host hermes-vm
  HostName <TAILNET_VM_IP>
  User ubuntu
  IdentityFile ~/.ssh/lucido_hermes_oci.key
```

Then:

```bash
ssh hermes-vm              # one-shot
hermes chat -q "status"    # one-shot query once inside
hermes --tui               # full TUI
hermes dashboard --status  # check if dashboard is running
```

---

## Part 5 — Hardening Checklist

Run through these before relying on this setup:

- [ ] `tailscale status` shows both devices, both online
- [ ] SSH works to the tailnet IP (`ssh ubuntu@<TAILNET_VM_IP>`)
- [ ] Public-IP SSH disabled in Oracle Cloud security list (after tailnet SSH confirmed)
- [ ] `hermes dashboard --host <TAILNET_VM_IP> --insecure` starts cleanly
- [ ] Dashboard loads at `http://<TAILNET_VM_IP>:9119` from the Mac
- [ ] `hermes --tui` works over SSH
- [ ] Tailscale **MagicDNS** enabled (lets you use `hermes-vm` instead of the
      raw 100.x.y.z IP — toggle in Tailscale admin console → DNS)
- [ ] Tailscale **auto-updates** on (default on for package installs)
- [ ] Dashboard process survives logout (nohup or systemd unit — see Appendix)
- [ ] API keys in dashboard config are not committed to any repo

---

## Appendix A — systemd Unit for the Dashboard

Create `/etc/systemd/system/hermes-dashboard.service` on the VM:

```ini
[Unit]
Description=Hermes Agent Web Dashboard
After=network-online.target tailscaled.service
Wants=network-online.target

[Service]
Type=simple
User=ubuntu
Environment=HOME=/home/ubuntu
ExecStart=/home/ubuntu/.local/bin/hermes dashboard \
  --host <TAILNET_VM_IP> --port 9119 --no-open --insecure --skip-build
Restart=on-failure
RestartSec=5

[Install]
WantedBy=multi-user.target
```

Enable and start:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now hermes-dashboard.service
sudo systemctl status hermes-dashboard.service
```

> `--skip-build` avoids an `npm run build` step at boot; pre-build once with
> `cd ~/.hermes/web && npm run build` (adjust path per your install) so the
> unit just serves `dist`.

---

## Appendix B — MagicDNS Shortcut

With MagicDNS enabled in the Tailscale admin console, the VM is reachable by
hostname instead of IP:

```bash
ssh ubuntu@hermes-vm          # instead of ubuntu@100.x.y.z
# Dashboard:
http://hermes-vm:9119
```

Hostname is the device name shown in `tailscale status`. Rename if needed:

```bash
# On the VM:
sudo tailscale set --hostname=hermes-vm
```

---

## Appendix C — Troubleshooting

| Symptom | Fix |
|---------|-----|
| `tailscale status` shows device offline | Run `sudo tailscale up` on the offline device |
| Dashboard unreachable from Mac | Confirm `--host` is the tailnet IP, not 127.0.0.1; check Oracle Cloud security list allows tailnet subnet |
| `--insecure` refused | Hermes requires this flag for non-localhost bind; safe inside tailnet |
| SSH key rejected over tailnet | Same key, different IP — check `~/.ssh/config` isn't pinned to the public IP |
| Dashboard dies after logout | Wrap in `nohup ... &` or use the systemd unit (Appendix A) |
| TUI looks wrong over SSH | `export TERM=xterm-256color` inside the SSH session |
| Port 9119 already in use | `hermes dashboard --status` to find PID, kill it, or pick another `--port` |

---

## Summary — What You'll Have When Done

| Access method | Address | Encrypted by |
|---------------|---------|--------------|
| Web dashboard | `http://hermes-vm:9119` | WireGuard (Tailscale) |
| TUI | `ssh hermes-vm` → `hermes --tui` | WireGuard + SSH |
| SSH management | `ssh hermes-vm` | WireGuard + SSH |
| One-shot agent | `ssh hermes-vm` → `hermes -q "..."` | WireGuard + SSH |

Nothing exposed to the public internet except (optionally) port 22 until you
confirm the tailnet path works, then close that too. All traffic inside the
tailnet is end-to-end encrypted by WireGuard regardless of whether the app
itself uses HTTP or HTTPS.

---

*Authored: 2026-06-23. Verify Hermes version on the VM before executing —
dashboard port defaults and flag behavior may differ across releases.*