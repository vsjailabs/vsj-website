import { NextResponse } from "next/server";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Contact form handler.
 *
 * Currently validates and logs the submission. Wire to a real email
 * provider by setting up environment variables and replacing the TODO
 * block below.
 *
 * Providers wired (both optional, run in parallel via Promise.allSettled):
 *   - RESEND (transactional email): RESEND_API_KEY, RESEND_FROM
 *   - ERPNEXT (CRM Lead creation on erp.vsjailabs.in):
 *     ERPNEXT_URL, ERPNEXT_API_KEY, ERPNEXT_API_SECRET
 *   Neither configured → structured console log so ops can still recover.
 *
 * Anti-spam:
 *   - Honeypot field "website" must be empty
 *   - Minimum dwell time enforced via "_t" hidden field (>2s ago)
 *   - Length and shape validation for every field
 */

type Body = {
  name?: string;
  email?: string;
  company?: string;
  phone?: string;
  subject?: string;
  message?: string;
  website?: string; // honeypot — must be empty
  _t?: string; // form-render epoch ms — guards against instant submits
};

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export async function POST(req: Request) {
  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — silent reject for bots
  if (body.website && body.website.trim() !== "") {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Dwell-time guard — submissions in <2s are bots
  const t = Number(body._t);
  if (Number.isFinite(t) && Date.now() - t < 2000) {
    return NextResponse.json({ ok: true }, { status: 200 });
  }

  // Shape & length validation
  const errors: Record<string, string> = {};
  const name = (body.name ?? "").trim();
  const email = (body.email ?? "").trim();
  const subject = (body.subject ?? "").trim();
  const message = (body.message ?? "").trim();
  const company = (body.company ?? "").trim();
  const phone = (body.phone ?? "").trim();

  if (name.length < 2 || name.length > 120) errors.name = "Name is required.";
  if (!isEmail(email) || email.length > 200) errors.email = "Enter a valid email.";
  if (subject.length < 2 || subject.length > 200) errors.subject = "Subject is required.";
  if (message.length < 10 || message.length > 5000) errors.message = "Message must be at least 10 characters.";
  if (company.length > 200) errors.company = "Company name too long.";
  if (phone.length > 40) errors.phone = "Phone too long.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ errors }, { status: 422 });
  }

  // ─────────────── Parallel delivery: Resend email + ERPNext CRM Lead ─────────
  // Both fire via Promise.allSettled so one failure never blocks the other.
  // The user always gets a 200 back — degradation is silent, errors go to logs.
  const tasks: Promise<unknown>[] = [];

  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;
  if (resendKey && resendFrom) {
    tasks.push(
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: resendFrom,
          to: site.email,
          reply_to: email,
          subject: `[Site] ${subject}`,
          text: [
            `From: ${name} <${email}>`,
            `Company: ${company || "—"}`,
            `Phone: ${phone || "—"}`,
            "",
            message,
          ].join("\n"),
        }),
      }).then(async (res) => {
        if (!res.ok) console.error("[contact] Resend error:", res.status, await res.text());
      })
    );
  }

  // ERPNext CRM Lead — co-hosted on erp.vsjailabs.in (Hostinger). Creates a
  // Lead in the CRM so every submission lands with source attribution instead
  // of a dead email.
  const erpUrl = process.env.ERPNEXT_URL;         // e.g. https://erp.vsjailabs.in
  const erpKey = process.env.ERPNEXT_API_KEY;
  const erpSecret = process.env.ERPNEXT_API_SECRET;
  if (erpUrl && erpKey && erpSecret) {
    tasks.push(
      fetch(`${erpUrl.replace(/\/$/, "")}/api/resource/Lead`, {
        method: "POST",
        headers: {
          Authorization: `token ${erpKey}:${erpSecret}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          lead_name: name,
          email_id: email,
          mobile_no: phone || undefined,
          company_name: company || undefined,
          source: "Website",
          notes: [
            {
              note: [
                `Subject: ${subject}`,
                "",
                message,
              ].join("\n"),
            },
          ],
        }),
      }).then(async (res) => {
        if (!res.ok) console.error("[contact] ERPNext error:", res.status, await res.text());
      })
    );
  }

  if (tasks.length === 0) {
    // Neither provider configured — log so ops can still see the submission
    console.log("[contact form — no provider configured]", {
      to: site.email,
      from: { name, email, company, phone },
      subject,
      message: message.slice(0, 200) + (message.length > 200 ? "…" : ""),
    });
  } else {
    await Promise.allSettled(tasks);
  }

  return NextResponse.json({ ok: true }, { status: 200 });
}
