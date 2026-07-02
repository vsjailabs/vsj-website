import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description: `How ${site.brand} uses cookies and how to manage your preferences.`,
};

const lastUpdated = "7 May 2026";

export default function CookiesPage() {
  return (
    <>
      <h1>Cookie Policy</h1>
      <p className="lede">
        Last updated: {lastUpdated}. This policy explains what cookies we use,
        why we use them, and how you can control them.
      </p>

      <h2>1. What are cookies?</h2>
      <p>
        Cookies are small text files placed on your device when you visit a
        website. They let the site remember your actions and preferences over
        time.
      </p>

      <h2>2. How we use cookies</h2>
      <p>We currently use cookies in three categories:</p>
      <table>
        <thead>
          <tr>
            <th>Category</th>
            <th>Purpose</th>
            <th>Default</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Essential</td>
            <td>
              Required for navigation, security, and saving your consent
              preferences. The site does not function without them.
            </td>
            <td>Always on</td>
          </tr>
          <tr>
            <td>Analytics</td>
            <td>
              Anonymized usage statistics so we can improve the site. We do
              not use these for advertising or to identify individuals.
            </td>
            <td>Off (opt-in)</td>
          </tr>
          <tr>
            <td>Marketing</td>
            <td>
              Tailored campaigns and remarketing. Used only when you have
              opted in.
            </td>
            <td>Off (opt-in)</td>
          </tr>
        </tbody>
      </table>

      <h2>3. Third-party cookies</h2>
      <p>
        <strong>We do not currently run any third-party trackers, advertising
        cookies, or session-replay tools on this site.</strong> When we add
        analytics in the future, the provider will be named here and its
        script will only load after you opt in via the consent banner. We
        will not enable any third-party tracker without first updating this
        page.
      </p>

      <h2>4. Managing your preferences</h2>
      <p>
        You can change your preferences at any time using the consent banner
        (Preferences button). You can also clear cookies via your browser
        settings.
      </p>

      <h2>5. Contact</h2>
      <p>
        Questions? Email{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </>
  );
}
