"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/Button";

const STORAGE_KEY = "vsj-cookie-consent-v1";
const SESSION_KEY = "vsj-cookie-consent-shown-v1";

type Consent = {
  essential: true; // always true — required for the site to function
  analytics: boolean;
  marketing: boolean;
  setAt: string;
};

function readConsent(): Consent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Consent) : null;
  } catch {
    return null;
  }
}

function readSessionShown(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.sessionStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

function markSessionShown() {
  try {
    window.sessionStorage.setItem(SESSION_KEY, "1");
  } catch {
    /* sessionStorage unavailable — fall back to ephemeral in-memory flag */
  }
}

function writeConsent(c: Omit<Consent, "essential" | "setAt">) {
  const payload: Consent = { essential: true, ...c, setAt: new Date().toISOString() };
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    /* localStorage may be full or blocked (Safari private mode). The
     * sessionStorage flag below still keeps the banner from reappearing
     * during the current session. */
  }
  markSessionShown();
  try {
    window.dispatchEvent(new CustomEvent("vsj:consent", { detail: payload }));
  } catch {
    /* no-op */
  }
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [showPrefs, setShowPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const alreadyConsented = readConsent() !== null;
    const shownThisSession = readSessionShown();
    if (!alreadyConsented && !shownThisSession) setVisible(true);
  }, []);

  if (!visible) return null;

  const hide = () => {
    markSessionShown();
    setVisible(false);
  };
  const acceptAll = () => {
    writeConsent({ analytics: true, marketing: true });
    setVisible(false);
  };
  const rejectAll = () => {
    writeConsent({ analytics: false, marketing: false });
    setVisible(false);
  };
  const savePrefs = () => {
    writeConsent({ analytics, marketing });
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:right-4 sm:bottom-4 sm:max-w-md"
    >
      <div className="rounded-xl border border-(--border) bg-(--surface-1) shadow-2xl shadow-black/10 backdrop-blur p-5">
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-sm font-semibold tracking-tight">
            We respect your privacy
          </h2>
          <button
            type="button"
            aria-label="Dismiss without saving"
            onClick={hide}
            className="text-(--muted) hover:text-(--foreground) -mr-1 -mt-1 p-1 rounded-md hover:bg-(--surface-2)"
          >
            <X size={16} />
          </button>
        </div>
        <p className="mt-2 text-xs text-(--muted) leading-relaxed">
          We use essential cookies for the site to function. Analytics and
          marketing cookies are off by default. See our{" "}
          <Link
            href="/legal/cookies"
            className="underline hover:text-(--foreground)"
          >
            cookie policy
          </Link>
          .
        </p>

        {showPrefs && (
          <div className="mt-4 space-y-2 text-xs">
            <div className="flex items-center justify-between rounded-md bg-(--surface-2) px-3 py-2">
              <div>
                <div className="font-medium">Essential</div>
                <div className="text-(--muted)">Always on. Required.</div>
              </div>
              <span className="text-(--brand-teal-text) font-medium">On</span>
            </div>
            <label className="flex items-center justify-between rounded-md bg-(--surface-2) px-3 py-2 cursor-pointer">
              <div>
                <div className="font-medium">Analytics</div>
                <div className="text-(--muted)">Anonymized usage stats.</div>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-(--brand-violet)"
              />
            </label>
            <label className="flex items-center justify-between rounded-md bg-(--surface-2) px-3 py-2 cursor-pointer">
              <div>
                <div className="font-medium">Marketing</div>
                <div className="text-(--muted)">Tailored campaigns.</div>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="h-4 w-4 accent-(--brand-violet)"
              />
            </label>
          </div>
        )}

        <div className="mt-4 flex flex-wrap items-center gap-2">
          {!showPrefs ? (
            <>
              <Button size="md" type="button" onClick={acceptAll}>
                Accept all
              </Button>
              <Button size="md" type="button" variant="secondary" onClick={rejectAll}>
                Reject all
              </Button>
              <button
                type="button"
                onClick={() => setShowPrefs(true)}
                className="text-xs underline text-(--muted) hover:text-(--foreground) ml-auto"
              >
                Preferences
              </button>
            </>
          ) : (
            <>
              <Button size="md" type="button" onClick={savePrefs}>
                Save preferences
              </Button>
              <Button size="md" type="button" variant="secondary" onClick={rejectAll}>
                Reject all
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
