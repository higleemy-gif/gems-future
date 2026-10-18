import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { XCircleIcon } from "./icons";

export interface FieldProps {
  id: string;
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  required?: boolean;
  hintId?: string;
  errorId?: string;
  className?: string;
  children: ReactNode;
}

/**
 * Shared layout for form controls: label on top, control, then a hint or an
 * error message below. Errors are paired with an icon (never color alone).
 */
export function Field({
  id,
  label,
  hint,
  error,
  required,
  hintId,
  errorId,
  className,
  children,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label ? (
        <label htmlFor={id} className="text-sm font-medium text-ink">
          {label}
          {required ? (
            <span className="text-error" aria-hidden="true">
              {" "}
              *
            </span>
          ) : null}
        </label>
      ) : null}
      {children}
      {error ? (
        <p
          id={errorId}
          className="flex items-center gap-1.5 text-xs text-error"
        >
          <XCircleIcon width={14} height={14} />
          {error}
        </p>
      ) : hint ? (
        <p id={hintId} className="text-xs text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  );
}
