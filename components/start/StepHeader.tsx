import type { ReactNode } from "react";

/**
 * Big, friendly, centered question header for the wizard. One question per
 * screen gets room to breathe: an optional emoji badge, a large title, and a
 * short supporting line. Titles/descriptions are passed in unchanged by each
 * step — this only changes how they look.
 */
export function StepHeader({
  title,
  description,
  emoji,
}: {
  title: string;
  description?: ReactNode;
  emoji?: string;
}) {
  return (
    <div className="mb-7 flex flex-col items-center gap-3 text-center">
      {emoji ? (
        <span
          aria-hidden="true"
          className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-soft-blue to-soft-teal text-4xl shadow-sm"
        >
          {emoji}
        </span>
      ) : null}
      <h1 className="font-display text-2xl font-semibold tracking-tight text-ink sm:text-3xl">
        {title}
      </h1>
      {description ? (
        <p className="max-w-md text-[15px] leading-relaxed text-ink-2">
          {description}
        </p>
      ) : null}
    </div>
  );
}
