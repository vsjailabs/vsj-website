---
description: Rsync the repo to the Hostinger production box, rebuild the Docker image, and restart the vsj-website container.
---

Deploy the current working tree to production (`vsjailabs.com` on Hostinger box `93.127.194.189`).

Reference the canonical deploy sequence at [[project_vsj_deploy]]. In particular:

- **HARD RULE:** never `rsync --delete` on this server. Deploy artifacts committed to the repo (`Dockerfile`, `docker-compose.selfhost.yml`, `.dockerignore`, `deploy/self-host/*`) — a plain `rsync -az` is safe.
- Excludes: `.git`, `.next`, `node_modules`, `.env.local`, `.env.production`, `.DS_Store`, `tsconfig.tsbuildinfo`.
- The `.env.production` on the box holds live keys (Resend, ERPNext) — protected by the `--exclude`.
- Container is compose-managed under project namespace `vsj-website`; `docker compose up -d` recreates in-place without manual stop+rm.

Steps:

1. `ssh-add ~/.ssh/id_github_vsjailabs` if the key isn't loaded.
2. Rsync `/Users/tpe/VSJWORK/vsj-website/` → `root@93.127.194.189:/opt/vsj-website/current/` with the excludes above.
3. On the server: `chown -R 501:staff /opt/vsj-website/current/`, then `cd /opt/vsj-website/current && docker compose -f docker-compose.selfhost.yml build && docker compose -f docker-compose.selfhost.yml up -d`.
4. Verify the new container is up: `docker ps --filter name=vsj-website --format 'table {{.Names}}\t{{.Status}}'`.
5. Smoke-test the live URL (`curl -sI https://vsjailabs.com/` should be 200 with `x-nextjs-cache: HIT` or `MISS`).

Announce completion with the new commit hash and any observed timings.
