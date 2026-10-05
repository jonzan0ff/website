"use client";

import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "w-full rounded-xl border border-border bg-background px-4 py-3 text-foreground placeholder:text-muted/70 transition-colors focus:border-accent/60 focus:outline-none focus:ring-2 focus:ring-accent/15";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const data = Object.fromEntries(new FormData(e.currentTarget));
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex min-h-[360px] flex-col items-center justify-center gap-4 rounded-2xl border border-accent/40 bg-surface p-8 text-center">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/15 text-accent">
          <Check size={22} />
        </span>
        <p className="font-serif text-2xl">Message sent.</p>
        <p className="max-w-xs text-muted">Thanks for reaching out. I read every note myself and will reply soon.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="space-y-4 rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Name</span>
          <input name="name" required maxLength={200} autoComplete="name" className={field} />
        </label>
        <label className="block">
          <span className="mb-2 block text-sm text-muted">Email</span>
          <input name="email" type="email" required autoComplete="email" className={field} />
        </label>
      </div>
      <label className="block">
        <span className="mb-2 block text-sm text-muted">Message</span>
        <textarea
          name="message"
          required
          rows={5}
          maxLength={5000}
          placeholder="What's on your mind?"
          className={`${field} resize-none`}
        />
      </label>
      {/* Hidden from people; bots that fill every field get silently ignored */}
      <input name="company" tabIndex={-1} autoComplete="off" aria-hidden className="hidden" />
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <p className={`text-sm ${status === "error" ? "text-red-400" : "text-muted"}`}>
          {status === "error"
            ? "Something went wrong. Please try again, or reach me on LinkedIn."
            : "Goes straight to my inbox."}
        </p>
        <button
          type="submit"
          disabled={status === "sending"}
          className="flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-medium text-background transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {status === "sending" ? "Sending…" : "Send message"}
          {status !== "sending" && <ArrowRight size={16} />}
        </button>
      </div>
    </form>
  );
}
