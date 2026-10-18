"use client";

import { CountUp, Reveal } from "./motion";

const stats = [
  { to: 500, suffix: "+", label: "Career paths mapped" },
  { to: 50, suffix: "k+", label: "Students guided" },
  { to: 100, suffix: "+", label: "Courses covered" },
  { to: 4.8, suffix: "★", label: "Average rating", decimals: 1 },
];

export function TrustStats() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8">
      <Reveal className="rounded-3xl border border-border bg-surface p-6 shadow-soft sm:p-8">
        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="flex flex-col items-start">
              <dt className="order-2 mt-1 text-sm text-ink-2">{s.label}</dt>
              <dd className="order-1 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
                <span className="text-primary">
                  <CountUp to={s.to} suffix={s.suffix} decimals={s.decimals ?? 0} />
                </span>
              </dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </section>
  );
}
