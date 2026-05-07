import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${site.brand} collects, uses, and protects your personal information under DPDPA and GDPR.`,
};

const lastUpdated = "7 May 2026";

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy Policy</h1>
      <p className="lede">
        Last updated: {lastUpdated}. This policy explains what personal data{" "}
        {site.legalName} (&ldquo;we&rdquo;, &ldquo;us&rdquo;) collects, why we
        collect it, and how we protect it.
      </p>

      <h2>1. Who we are</h2>
      <p>
        {site.legalName} is a private limited company incorporated in India under
        CIN <code>{site.cin}</code>, with registered office at {site.address.line1}, {site.address.line2}, {site.address.line3}.
        For privacy questions, contact us at{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>

      <h2>2. Personal data we collect</h2>
      <p>We collect the following categories of personal data:</p>
      <ul>
        <li>
          <strong>Contact information</strong> — name, email, phone, company —
          when you submit a form, request a proposal, or correspond with us.
        </li>
        <li>
          <strong>Technical data</strong> — IP address, browser, device,
          referrer, pages visited — collected via essential cookies and (with
          consent) analytics cookies.
        </li>
        <li>
          <strong>Engagement data</strong> — content of your messages, meeting
          notes, contractual communications.
        </li>
      </ul>

      <h2>3. How we use it</h2>
      <ul>
        <li>To respond to your enquiries and deliver services you requested.</li>
        <li>To operate, secure, and improve our website and offerings.</li>
        <li>To comply with legal, tax, audit, and regulatory obligations.</li>
        <li>
          For limited direct marketing (only with prior, withdrawable consent).
        </li>
      </ul>

      <h2>4. Legal basis</h2>
      <p>
        Under the EU GDPR, we rely on (a) contract performance, (b) legitimate
        interest in operating our business, (c) legal obligation, and (d)
        consent — depending on the activity. Under India&apos;s Digital
        Personal Data Protection Act, 2023, we process personal data on the
        basis of your consent or for specified legitimate uses.
      </p>

      <h2>5. Sharing</h2>
      <p>
        We do not sell personal data. We share data only with:{" "}
        <span className="placeholder">[LIST PROCESSORS — e.g. Google Workspace, Microsoft 365, Resend, Vercel, AWS]</span>{" "}
        — each bound by data-processing agreements and the same level of
        protection we provide.
      </p>

      <h2>6. International transfers</h2>
      <p>
        Some service providers may process data outside India. Where this
        occurs, transfers are made under appropriate safeguards such as
        Standard Contractual Clauses or equivalent legal mechanisms.
      </p>

      <h2>7. Retention</h2>
      <p>
        We retain personal data only as long as needed for the purposes stated,
        or to meet legal/contractual requirements.{" "}
        <span className="placeholder">[CONFIRM RETENTION PERIODS PER CATEGORY — e.g. enquiry forms 24 months]</span>.
      </p>

      <h2>8. Your rights</h2>
      <p>You have the right to:</p>
      <ul>
        <li>Access and obtain a copy of your personal data.</li>
        <li>Correct inaccurate data.</li>
        <li>Request erasure (subject to legal exceptions).</li>
        <li>Withdraw consent at any time.</li>
        <li>Lodge a complaint with the relevant Data Protection Authority.</li>
      </ul>
      <p>
        To exercise any right, write to{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>. We respond within
        statutory timelines.
      </p>

      <h2>9. Security</h2>
      <p>
        We apply industry-standard administrative, technical, and physical
        safeguards including encryption in transit, access controls, and
        regular reviews. No method of transmission is 100% secure; in the
        event of a breach, we will notify affected data principals and
        regulators as required by law.
      </p>

      <h2>10. Children</h2>
      <p>
        Our services are intended for businesses. We do not knowingly collect
        personal data from individuals under 18.
      </p>

      <h2>11. Changes</h2>
      <p>
        We may update this policy. Material changes will be highlighted on this
        page with a revised &ldquo;last updated&rdquo; date.
      </p>

      <h2>12. Contact</h2>
      <p>
        Grievance Officer:{" "}
        <span className="placeholder">[NAME, DESIGNATION]</span>
        <br />
        Email: <a href={`mailto:${site.email}`}>{site.email}</a>
        <br />
        Address: {site.address.line1}, {site.address.line2}, {site.address.line3}
      </p>
    </>
  );
}
