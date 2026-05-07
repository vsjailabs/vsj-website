import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms governing use of the ${site.brand} website and services.`,
};

const lastUpdated = "7 May 2026";

export default function TermsPage() {
  return (
    <>
      <h1>Terms of Service</h1>
      <p className="lede">
        Last updated: {lastUpdated}. By accessing this website you agree to the
        following terms. Project engagements are governed by separate signed
        agreements.
      </p>

      <h2>1. Acceptance</h2>
      <p>
        These Terms govern access to and use of the website at{" "}
        <a href={site.url}>{site.url}</a> (the &ldquo;Site&rdquo;) operated by{" "}
        {site.legalName} (&ldquo;Company&rdquo;). By using the Site you accept
        these Terms in full.
      </p>

      <h2>2. Use of the site</h2>
      <ul>
        <li>You may use the Site only for lawful purposes.</li>
        <li>
          You will not attempt to probe, scan, reverse-engineer, or interfere
          with any portion of the Site or its security.
        </li>
        <li>
          You will not use the Site to transmit viruses, spam, harmful code, or
          unauthorized advertising.
        </li>
      </ul>

      <h2>3. Intellectual property</h2>
      <p>
        All content on the Site — including text, graphics, logos, code, and
        design — is owned by the Company or its licensors and is protected by
        applicable intellectual property laws. You may not reproduce, modify,
        or redistribute without written permission.
      </p>

      <h2>4. Engagements and quotations</h2>
      <p>
        Information shared via the Site (including service descriptions and
        case material) is for general guidance and does not constitute a
        binding offer. Service engagements are subject to a separately
        executed Master Services Agreement and Statement of Work.
      </p>

      <h2>5. Third-party links</h2>
      <p>
        The Site may link to third-party websites. We are not responsible for
        their content, policies, or practices.
      </p>

      <h2>6. Disclaimers</h2>
      <p>
        The Site is provided &ldquo;as is&rdquo; without warranties of any
        kind, express or implied. To the fullest extent permitted by law, we
        disclaim all warranties of merchantability, fitness for a particular
        purpose, and non-infringement.
      </p>

      <h2>7. Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, the Company shall not be
        liable for any indirect, incidental, special, consequential, or
        punitive damages arising from your use of the Site. Our total
        aggregate liability under these Terms is limited to{" "}
        <span className="placeholder">[INR 1,000 / USD 100 — confirm with counsel]</span>.
      </p>

      <h2>8. Indemnification</h2>
      <p>
        You agree to indemnify the Company against any claim arising from your
        breach of these Terms or your unlawful use of the Site.
      </p>

      <h2>9. Governing law and jurisdiction</h2>
      <p>
        These Terms are governed by the laws of India. Disputes are subject to
        the exclusive jurisdiction of the courts at{" "}
        <span className="placeholder">[CITY OF JURISDICTION — e.g. Patna, Bihar]</span>.
      </p>

      <h2>10. Changes</h2>
      <p>
        We may update these Terms. Continued use of the Site after changes
        constitutes acceptance.
      </p>

      <h2>11. Contact</h2>
      <p>
        Questions about these Terms? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a> or write to{" "}
        {site.legalName}, {site.address.line1}, {site.address.line2}, {site.address.line3}.
      </p>
    </>
  );
}
