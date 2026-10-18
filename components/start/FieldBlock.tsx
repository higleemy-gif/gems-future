import type { ReactNode } from "react";

/** Visible label + optional hint wrapper for controls that lack their own
 * label (e.g. ChipGroup). */
export function FieldBlock({
  label,
  hint,
  required,
  children,
}: {
  label: string;
  hint?: string;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-0.5">
        <span className="text-sm font-medium text-ink">
          {label}
          {required ? <span className="text-error"> *</span> : null}
        </span>
        {hint ? <span className="text-xs text-muted">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
