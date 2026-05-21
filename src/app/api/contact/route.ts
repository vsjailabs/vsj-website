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
 * Recommended providers (one of):
 *   - RESEND (cleanest API, generous free tier, transactional email)
 *     env: RESEND_API_KEY, RESEND_FROM=contact@vsjailabs.com
 *   - POSTMARK
 *     env: POSTMARK_API_KEY, POSTMARK_FROM=...
 *   - AWS SES (if you already use AWS)
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

  // ─────────────── Email delivery via Resend ───────────────
  const resendKey = process.env.RESEND_API_KEY;
  const resendFrom = process.env.RESEND_FROM;

  if (resendKey && resendFrom) {
    try {
      const res = await fetch("https://api.resend.com/emails", {
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
      });

      if (!res.ok) {
        console.error("[contact] Resend error:", res.status, await res.text());
      }
    } catch (err) {
      console.error("[contact] Resend send failed:", err);
    }
  } else {
    // Fallback: log to console when Resend is not configured
    console.log("[contact form — email not configured]", {
      to: site.email,
      from: { name, email, company, phone },
      subject,
      message: message.slice(0, 200) + (message.length > 200 ? "…" : ""),
    });
  }
  // ──────────────────────────────────────────────────────────────────

  return NextResponse.json({ ok: true }, { status: 200 });
}
