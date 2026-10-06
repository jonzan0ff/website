"use client";

import { useEffect, useState } from "react";

const STEPS = [
  { who: "Builder agent", what: "Writes the change" },
  { who: "Up to 18 automated checks", what: "Scope, integrity, tests, screenshots" },
  { who: "QA agent", what: "Reproduces it independently" },
  { who: "6-model review board", what: "Each LLM reviews what it does best" },
  { who: "Me", what: "Final sign-off" },
];

export default function AgentPipeline() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setActive((a) => (a + 1) % (STEPS.length + 1)), 1300);
    return () => clearInterval(id);
  }, []);

  const shipped = active === STEPS.length;

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <ol className="grid gap-3 lg:grid-cols-5">
        {STEPS.map((s, i) => {
          const done = i < active;
          const now = i === active;
          return (
            <li
              key={s.who}
              className={`relative rounded-xl border p-4 transition-all duration-500 ${
                now
                  ? "border-accent bg-accent/10 shadow-[0_0_30px_var(--color-accent-glow)]"
                  : done
                    ? "border-accent/40"
                    : "border-border"
              }`}
            >
              <span
                className={`block h-2 w-2 rounded-full transition-colors duration-500 ${
                  now || done ? "bg-accent" : "bg-border"
                } ${now ? "animate-pulse" : ""}`}
              />
              <p className="mt-3 font-medium">{s.who}</p>
              <p className="mt-1 text-sm text-muted">{s.what}</p>
            </li>
          );
        })}
      </ol>
      <div className="mt-6 flex items-center gap-4">
        <div className="h-1 flex-1 overflow-hidden rounded-full bg-border">
          <div
            className="h-full rounded-full bg-accent transition-all duration-700"
            style={{ width: `${(active / STEPS.length) * 100}%` }}
          />
        </div>
        <span
          className={`font-mono text-xs uppercase tracking-[0.2em] transition-colors duration-500 ${
            shipped ? "text-accent" : "text-muted"
          }`}
        >
          {shipped ? "Shipped" : "In review"}
        </span>
      </div>
    </div>
  );
}
