---
description: End-to-end health check of the contact form pipeline (public /api/contact → Resend + ERPNext CRM Lead).
---

Verify the live contact-form pipeline is delivering. Sanity-check both channels wired at [[project_vsj_erpnext]] and `src/app/api/contact/route.ts`.

Steps:

1. Confirm env vars on the box:
   ```sh
   ssh -i ~/.ssh/id_github_vsjailabs root@93.127.194.189 'docker exec vsj-website env | grep -E "^(RESEND|ERPNEXT)" | sed "s/=.*/=***/"'
   ```
   Expect five keys present: `RESEND_API_KEY`, `RESEND_FROM`, `ERPNEXT_URL`, `ERPNEXT_API_KEY`, `ERPNEXT_API_SECRET`. If any are empty, the corresponding channel is silently disabled.

2. Fire a test submission at the prod URL (respects the 2s dwell-time guard):
   ```sh
   DWELL=$(python3 -c 'import time; print(int(time.time()*1000)-3000)')
   curl -s -w '%{http_code}\n' -X POST https://vsjailabs.com/api/contact \
     -H 'Content-Type: application/json' \
     -d "{\"name\":\"Health Check\",\"email\":\"health@vsjailabs.com\",\"company\":\"Internal\",\"message\":\"Automated pipeline health check.\",\"website\":\"\",\"_t\":\"$DWELL\"}"
   ```
   Expect `200 {"ok":true}`.

3. Confirm the Lead landed in ERPNext:
   ```sh
   ssh -i ~/.ssh/id_github_vsjailabs root@93.127.194.189 \
     "curl -sS -X GET 'https://erp.vsjailabs.in/api/resource/Lead?fields=%5B%22name%22%2C%22lead_name%22%2C%22email_id%22%2C%22source%22%5D&order_by=creation%20desc&limit_page_length=1' -H 'Authorization: token \$ERPNEXT_API_KEY:\$ERPNEXT_API_SECRET'"
   ```
   (Substitute real keypair values — see [[project_vsj_erpnext]] for their location on the box; do not paste them into chat.) Expect the newest Lead to be the health-check entry with `source: Website`.

4. Tail the container log for any error signal:
   ```sh
   ssh -i ~/.ssh/id_github_vsjailabs root@93.127.194.189 'docker logs --tail 30 vsj-website 2>&1 | grep -iE "contact|resend|erpnext|POST /api"'
   ```

5. Offer to delete the health-check Lead from ERPNext to keep the CRM clean; don't do it without user confirmation.

Report a green/yellow/red per channel and the newest Lead ID.
