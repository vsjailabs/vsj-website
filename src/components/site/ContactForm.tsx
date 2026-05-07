"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/Button";

type FieldErrors = Partial<Record<"name" | "email" | "subject" | "message" | "company" | "phone", string>>;

export function ContactForm() {
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState(false);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const renderedAt = useRef(Date.now());

  useEffect(() => {
    renderedAt.current = Date.now();
  }, []);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    setErrors({});
    setServerError(null);

    const fd = new FormData(e.currentTarget);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      subject: String(fd.get("subject") ?? ""),
      message: String(fd.get("message") ?? ""),
      website: String(fd.get("website") ?? ""),
      _t: String(renderedAt.current),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setDone(true);
        return;
      }
      if (res.status === 422) {
        const j = (await res.json()) as { errors: FieldErrors };
        setErrors(j.errors ?? {});
        return;
      }
      setServerError("Something went wrong. Please try again or email us directly.");
    } catch {
      setServerError("Network error. Please try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="lg:col-span-3 rounded-xl border border-(--border) bg-(--surface-1) p-8"
      >
        <div className="text-xs font-semibold uppercase tracking-[0.18em] text-(--brand-teal) mb-3">
          Message received
        </div>
        <h2 className="text-2xl font-semibold tracking-tight">
          Thanks — we&apos;ll get back within one business day.
        </h2>
        <p className="mt-3 text-(--muted) leading-relaxed">
          You&apos;ll hear from a real person, not a sequence. If your project
          is urgent, mention it in your follow-up and we&apos;ll prioritize.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="lg:col-span-3 rounded-xl border border-(--border) bg-(--surface-1) p-6 sm:p-8 space-y-5"
    >
      {/* Honeypot — visually hidden, must remain empty */}
      <div aria-hidden className="absolute -left-[10000px] w-px h-px overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name" name="name" required error={errors.name} />
        <Field label="Email" name="email" type="email" required error={errors.email} />
      </div>
      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Company" name="company" error={errors.company} />
        <Field label="Phone (optional)" name="phone" error={errors.phone} />
      </div>
      <Field label="Subject" name="subject" required error={errors.subject} />

      <div>
        <label className="text-sm font-medium" htmlFor="message">
          Message <span className="text-(--brand-danger)">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={6}
          aria-invalid={errors.message ? true : undefined}
          aria-describedby={errors.message ? "message-error" : undefined}
          className="mt-2 block w-full rounded-lg border border-(--border) bg-(--background) px-3.5 py-2.5 text-sm outline-none focus:border-(--brand-violet) focus:ring-2 focus:ring-(--brand-violet)/20"
        />
        {errors.message && (
          <p id="message-error" className="mt-2 text-xs text-(--brand-danger)">
            {errors.message}
          </p>
        )}
      </div>

      {serverError && (
        <div role="alert" className="rounded-md border border-(--brand-danger)/30 bg-(--brand-danger)/5 px-4 py-3 text-sm text-(--brand-danger)">
          {serverError}
        </div>
      )}

      <Button type="submit" size="lg" disabled={pending}>
        {pending ? "Sending…" : "Send message"}
      </Button>
      <p className="text-xs text-(--muted)">
        By sending this message you agree to our{" "}
        <a href="/legal/privacy" className="underline hover:text-(--foreground)">privacy policy</a>.
        We won&apos;t share your details.
      </p>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  error,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  error?: string;
}) {
  const errorId = error ? `${name}-error` : undefined;
  return (
    <div>
      <label className="text-sm font-medium" htmlFor={name}>
        {label}
        {required && <span className="text-(--brand-danger)"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId}
        className="mt-2 block w-full rounded-lg border border-(--border) bg-(--background) px-3.5 py-2.5 text-sm outline-none focus:border-(--brand-violet) focus:ring-2 focus:ring-(--brand-violet)/20"
      />
      {error && (
        <p id={errorId} className="mt-2 text-xs text-(--brand-danger)">
          {error}
        </p>
      )}
    </div>
  );
}
