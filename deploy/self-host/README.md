# VSJ Website Self-Host Runbook

This runbook migrates the VSJ AI Labs Next.js site from Netlify to the owned ERPNext/OpenProject server while preserving a quick rollback path.

## Target Shape

- Domain: `vsjailabs.com`
- App: Next.js 16 Node server on `127.0.0.1:3017`
- Reverse proxy: Nginx vhost for `vsjailabs.com` and `www.vsjailabs.com`
- ERPNext: leave existing Frappe/bench vhosts untouched
- OpenProject: leave Docker/Nginx proxy untouched, commonly `127.0.0.1:8081`
- Runtime env: `/opt/vsj-website/shared/.env.production`
- Release path: `/opt/vsj-website/current`

## Why Node Server, Not Static Export

This project has a Node route handler at `src/app/api/contact/route.ts`. A static export would drop that server capability. The installed Next.js 16 docs recommend a Node.js server behind a reverse proxy for full App Router support.

## Pre-Flight On Server

Run these before changing DNS:

```bash
hostnamectl
node --version
npm --version
nginx -v
sudo nginx -T | grep -E "server_name|proxy_pass|listen"
sudo ss -ltnp
docker ps --format "table {{.Names}}\t{{.Ports}}\t{{.Status}}"
sudo supervisorctl status 2>/dev/null || true
sudo bench setup nginx --help 2>/dev/null || true
```

Confirm:

- Port `3017` is free.
- OpenProject is not using `3017`.
- ERPNext/Frappe domains are not `vsjailabs.com`.
- Existing Nginx config has no `server_name vsjailabs.com`.
- Server has a usable Node version. This project is tested with Node `22.19.0`.

## First-Time Server Setup

```bash
sudo useradd --system --create-home --shell /usr/sbin/nologin vsj
sudo mkdir -p /opt/vsj-website/current /opt/vsj-website/shared
sudo chown -R vsj:www-data /opt/vsj-website
sudo chmod 750 /opt/vsj-website /opt/vsj-website/current /opt/vsj-website/shared
```

Create `/opt/vsj-website/shared/.env.production` from `.env.production.example` and fill secrets.

## Deploy From Local Machine

Use the cross-user `/tmp` PEM pattern if SSH keys are not readable by this shell.

```bash
rsync -az --delete \
  --exclude='.git' \
  --exclude='.next' \
  --exclude='node_modules' \
  --exclude='.env.local' \
  /Users/tpe/VSJWORK/vsj-website/ \
  deploy-user@SERVER_IP:/opt/vsj-website/current/
```

Then build on the server:

```bash
sudo chown -R vsj:www-data /opt/vsj-website/current
sudo -u vsj bash -lc 'cd /opt/vsj-website/current && npm ci'
sudo -u vsj bash -lc 'cd /opt/vsj-website/current && set -a && . /opt/vsj-website/shared/.env.production && set +a && npm run build'
```

Install and start systemd service:

```bash
sudo cp /opt/vsj-website/current/deploy/self-host/vsj-website.service /etc/systemd/system/vsj-website.service
sudo systemctl daemon-reload
sudo systemctl enable --now vsj-website
sudo systemctl status vsj-website --no-pager
```

## Nginx

```bash
sudo cp /opt/vsj-website/current/deploy/self-host/nginx.vsjailabs.com.conf /etc/nginx/sites-available/vsjailabs.com
sudo ln -sfn /etc/nginx/sites-available/vsjailabs.com /etc/nginx/sites-enabled/vsjailabs.com
sudo nginx -t
sudo systemctl reload nginx
```

Issue or refresh SSL:

```bash
sudo certbot --nginx -d vsjailabs.com -d www.vsjailabs.com --redirect
sudo nginx -t
sudo systemctl reload nginx
```

## Smoke Tests Before DNS Cutover

From the server:

```bash
curl -sI http://127.0.0.1:3017/
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/contact
curl -s -o /dev/null -w "%{http_code}\n" http://127.0.0.1:3017/api/contact
```

From any machine, before DNS cutover, force Host header:

```bash
curl -sI --resolve vsjailabs.com:443:SERVER_IP https://vsjailabs.com/
curl -s --resolve vsjailabs.com:443:SERVER_IP https://vsjailabs.com/sitemap.xml | head
curl -sI --resolve www.vsjailabs.com:443:SERVER_IP https://www.vsjailabs.com/
```

Expected:

- Home returns `200`.
- Security headers from `next.config.ts` are present.
- `www` responds and stays consistent with the desired canonical behavior.
- `/sitemap.xml` contains `https://vsjailabs.com`.

## DNS Cutover

Only after smoke tests pass:

1. Lower DNS TTL if possible.
2. Point apex `A` record to `SERVER_IP`.
3. Point `www` to the same server, either `A` record or CNAME per DNS provider policy.
4. Keep the Netlify site unchanged until propagation and production smoke tests pass.

Verify:

```bash
dig @8.8.8.8 vsjailabs.com +short
dig @8.8.8.8 www.vsjailabs.com +short
curl -sI https://vsjailabs.com/
curl -sI https://www.vsjailabs.com/
```

## Rollback

If the owned server fails after DNS cutover:

1. Restore DNS records to Netlify values.
2. Leave `vsj-website.service` running for investigation or stop it:
   `sudo systemctl stop vsj-website`
3. Do not delete `/opt/vsj-website/shared/.env.production`; it is the canonical server env.

## Operations

Useful commands:

```bash
sudo systemctl status vsj-website --no-pager
sudo journalctl -u vsj-website -n 200 --no-pager
sudo systemctl restart vsj-website
sudo nginx -t
sudo systemctl reload nginx
```

Back up:

- `/opt/vsj-website/shared/.env.production`
- Nginx vhost at `/etc/nginx/sites-available/vsjailabs.com`
- Any deployment notes containing the server IP, SSH user, and DNS provider records

