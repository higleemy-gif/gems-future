"use client";

import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";

const DAY_LABELS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function monthStart(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}

function toIso(d: Date) {
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return d.getFullYear() + "-" + m + "-" + day;
}

export function BookingCalendar({
  value,
  onChange,
  daysAhead = 45,
}: {
  value: string;
  onChange: (iso: string) => void;
  daysAhead?: number;
}) {
  const today = startOfDay(new Date());
  const lastDay = startOfDay(
    new Date(today.getFullYear(), today.getMonth(), today.getDate() + daysAhead)
  );
  const [view, setView] = useState(monthStart(today));

  const cells = useMemo(() => {
    const first = monthStart(view);
    const lead = (first.getDay() + 6) % 7;
    const total = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const out: (Date | null)[] = [];
    for (let i = 0; i < lead; i++) out.push(null);
    for (let d = 1; d <= total; d++) {
      out.push(new Date(view.getFullYear(), view.getMonth(), d));
    }
    return out;
  }, [view]);

  const canPrev = monthStart(view).valueOf() > monthStart(today).valueOf();
  const canNext = monthStart(view).valueOf() < monthStart(lastDay).valueOf();
  const monthLabel = view.toLocaleDateString("en-IN", {
    month: "long",
    year: "numeric",
  });

  return (
    <div className="rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <button
          type="button"
          disabled={!canPrev}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() - 1, 1))
          }
          className={cn(
            "rounded-md px-2 py-1 text-xs transition-colors outline-none",
            canPrev
              ? "text-muted-foreground hover:text-ink"
              : "cursor-not-allowed text-muted-foreground/35"
          )}
        >
          Prev
        </button>
        <p className="text-sm font-medium text-ink">{monthLabel}</p>
        <button
          type="button"
          disabled={!canNext}
          onClick={() =>
            setView(new Date(view.getFullYear(), view.getMonth() + 1, 1))
          }
          className={cn(
            "rounded-md px-2 py-1 text-xs transition-colors outline-none",
            canNext
              ? "text-muted-foreground hover:text-ink"
              : "cursor-not-allowed text-muted-foreground/35"
          )}
        >
          Next
        </button>
      </div>

      <div className="mt-4 grid grid-cols-7 gap-1">
        {DAY_LABELS.map((d) => (
          <div
            key={d}
            className="py-1 text-center text-[0.68rem] font-medium uppercase tracking-wider text-muted-foreground"
          >
            {d}
          </div>
        ))}
        {cells.map((d, i) => {
          if (!d) return <div key={"blank" + i} />;
          const isoDate = toIso(d);
          const disabled =
            d.valueOf() < today.valueOf() || d.valueOf() > lastDay.valueOf();
          const selected = value === isoDate;
          return (
            <button
              key={isoDate}
              type="button"
              disabled={disabled}
              onClick={() => onChange(isoDate)}
              aria-pressed={selected}
              className={cn(
                "aspect-square rounded-md text-sm transition-colors outline-none",
                "focus-visible:ring-2 focus-visible:ring-primary/30",
                disabled && "cursor-not-allowed text-muted-foreground/35",
                !disabled && !selected && "text-ink hover:bg-muted",
                selected &&
                  "border border-primary bg-primary/[0.06] font-medium text-ink"
              )}
            >
              {d.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
