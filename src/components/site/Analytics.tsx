"use client";

import { useEffect } from "react";

const STORAGE_KEY = "vsj-cookie-consent-v1";
const SCRIPT_ID = "vsj-analytics";

type Consent = { analytics?: boolean };

function analyticsConsented(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    return (JSON.parse(raw) as Consent).analytics === true;
  } catch {
    return false;
  }
}

/**
 * Injects the Plausible analytics script when the visitor has opted into
 * analytics via the cookie banner. Also listens for the `vsj:consent` event
 * so mid-session consent grants pick up analytics immediately without a
 * page reload.
 *
 * Env vars (all NEXT_PUBLIC_ — evaluated at build time):
 *   NEXT_PUBLIC_PLAUSIBLE_DOMAIN   e.g. "vsjailabs.com"
 *   NEXT_PUBLIC_PLAUSIBLE_SRC      e.g. "https://plausible.io/js/script.js"
 *                                  or a self-hosted URL when Umami/Plausible
 *                                  runs on the Hostinger box.
 *
 * If either env var is missing at build time, the component renders nothing —
 * safe to leave mounted in layout.tsx without wiring analytics yet.
 */
export function Analytics() {
  const domain = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;
  const src = process.env.NEXT_PUBLIC_PLAUSIBLE_SRC ?? "https://plausible.io/js/script.js";

  useEffect(() => {
    if (!domain) return;

    const load = () => {
      if (document.getElementById(SCRIPT_ID)) return;
      const s = document.createElement("script");
      s.id = SCRIPT_ID;
      s.defer = true;
      s.setAttribute("data-domain", domain);
      s.src = src;
      document.head.appendChild(s);
    };

    if (analyticsConsented()) load();

    const onConsent = (e: Event) => {
      const detail = (e as CustomEvent<Consent>).detail;
      if (detail?.analytics) load();
    };
    window.addEventListener("vsj:consent", onConsent);
    return () => window.removeEventListener("vsj:consent", onConsent);
  }, [domain, src]);

  return null;
}
