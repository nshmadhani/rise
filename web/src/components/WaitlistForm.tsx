"use client";

import { FormEvent, useState } from "react";

export function WaitlistForm({ variant = "hero" }: { variant?: "hero" | "footer" }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "error">(
    "idle",
  );
  const [message, setMessage] = useState("");

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setStatus("loading");
    setMessage("");
    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setStatus("error");
        setMessage(data.error ?? "Something went wrong.");
        return;
      }
      setStatus("ok");
      setMessage("You’re on the list. We’ll be in touch.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("Couldn’t join right now. Try again.");
    }
  }

  const isFooter = variant === "footer";

  return (
    <div className={isFooter ? "w-full max-w-md mx-auto" : "w-full max-w-md"}>
      <form
        onSubmit={onSubmit}
        className="flex flex-col sm:flex-row gap-2 p-1.5 rounded-2xl bg-card border border-card-border"
      >
        <label className="sr-only" htmlFor={`waitlist-email-${variant}`}>
          Email
        </label>
        <input
          id={`waitlist-email-${variant}`}
          type="email"
          required
          autoComplete="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={status === "loading" || status === "ok"}
          className="flex-1 min-w-0 bg-transparent px-4 py-3 text-sm text-text placeholder:text-faint outline-none"
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "ok"}
          className="shrink-0 rounded-xl bg-white text-black px-5 py-3 text-sm font-semibold transition hover:bg-accent disabled:opacity-60"
        >
          {status === "loading"
            ? "Joining…"
            : status === "ok"
              ? "Joined"
              : "Join waitlist"}
        </button>
      </form>
      {message ? (
        <p
          className={`mt-3 text-sm ${status === "error" ? "text-rise-coral" : "text-muted"}`}
          role="status"
        >
          {message}
        </p>
      ) : null}
    </div>
  );
}
