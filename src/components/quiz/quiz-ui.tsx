"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ProgressBar({ value }: { value: number }) {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <div className="h-px w-full bg-border">
      <motion.div
        className="h-px bg-primary"
        initial={false}
        animate={{ width: pct + "%" }}
        transition={{ duration: 0.45, ease: "easeOut" }}
      />
    </div>
  );
}

export function Microcopy({ text }: { text?: string }) {
  if (!text) return null;
  return (
    <motion.p
      key={text}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground"
    >
      {text}
    </motion.p>
  );
}

export function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="space-y-3">
      <h1 className="text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.1rem]">
        {title}
      </h1>
      {subtitle ? (
        <p className="text-[0.95rem] leading-relaxed text-muted-foreground">{subtitle}</p>
      ) : null}
    </div>
  );
}

export function OptionCard({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "w-full rounded-xl border px-5 py-4 text-left text-[0.975rem] font-medium transition-colors duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/30",
        selected
          ? "border-primary bg-primary/[0.04] text-ink"
          : "border-border bg-card text-ink hover:border-foreground/25"
      )}
    >
      {label}
    </button>
  );
}

export function Chip({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "rounded-lg border px-4 py-2 text-sm transition-colors duration-150 outline-none",
        "focus-visible:ring-2 focus-visible:ring-primary/30",
        selected
          ? "border-primary bg-primary/[0.05] text-ink"
          : "border-border bg-card text-muted-foreground hover:border-foreground/25 hover:text-ink"
      )}
    >
      {label}
    </button>
  );
}

export function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <span className="block text-sm font-medium text-ink">{label}</span>
      {children}
    </div>
  );
}

export function NavRow({
  onBack,
  onNext,
  nextLabel = "Continue",
  nextDisabled = false,
  showBack = true,
}: {
  onBack: () => void;
  onNext: () => void;
  nextLabel?: string;
  nextDisabled?: boolean;
  showBack?: boolean;
}) {
  return (
    <div className="mt-10 flex items-center justify-between gap-3">
      {showBack ? (
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-muted-foreground transition-colors hover:text-ink"
        >
          Back
        </button>
      ) : (
        <span />
      )}
      <Button onClick={onNext} disabled={nextDisabled} className="min-w-28">
        {nextLabel}
      </Button>
    </div>
  );
}

const RESULT_STAGES = [
  "Reading your answers",
  "Weighing your options",
  "Shaping your path",
  "Picking what fits you",
  "Almost ready",
];

// Shown while the AI result is being generated, so the wait never feels stalled.
export function ResultProgress() {
  const [pct, setPct] = React.useState(6);
  const [stage, setStage] = React.useState(0);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setPct((p) => (p >= 94 ? 94 : p + Math.max(0.5, (94 - p) * 0.05)));
    }, 200);
    return () => window.clearInterval(id);
  }, []);

  React.useEffect(() => {
    const id = window.setInterval(() => {
      setStage((s) => Math.min(s + 1, RESULT_STAGES.length - 1));
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="py-8" role="status" aria-live="polite">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">
        Preparing your result
      </p>
      <p className="mt-3 text-[1.45rem] font-semibold leading-tight tracking-tight text-ink sm:text-[1.75rem]">
        {RESULT_STAGES[stage]}
      </p>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        This takes a few seconds. Please stay on this screen.
      </p>

      <div className="mt-7 h-1 w-full overflow-hidden rounded-full bg-border">
        <div
          className="h-full rounded-full bg-primary"
          style={{ width: pct + "%", transition: "width 300ms ease-out" }}
        />
      </div>
      <p className="mt-2 text-xs tabular-nums text-muted-foreground">
        {Math.round(pct)}%
      </p>

      <ul className="mt-7 space-y-2.5">
        {RESULT_STAGES.map((label, i) => (
          <li key={label} className="flex items-center gap-3">
            <span
              className={cn(
                "h-1.5 w-1.5 rounded-full",
                i < stage
                  ? "bg-primary"
                  : i === stage
                    ? "bg-primary/60"
                    : "bg-border"
              )}
            />
            <span
              className={cn(
                "text-sm",
                i <= stage ? "text-ink" : "text-muted-foreground/60"
              )}
            >
              {label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
