"use client";

import {
  forwardRef,
  useId,
  type ReactNode,
  type SelectHTMLAttributes,
} from "react";
import { cn } from "@/lib/cn";
import { Field } from "./field";
import { ChevronDownIcon } from "./icons";

export interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  /** Optional disabled placeholder option shown first. */
  placeholder?: string;
  containerClassName?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  function Select(
    {
      label,
      hint,
      error,
      placeholder,
      id,
      required,
      className,
      containerClassName,
      children,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) {
    const reactId = useId();
    const selectId = id ?? reactId;
    const hintId = `${selectId}-hint`;
    const errorId = `${selectId}-error`;
    const describedBy = error ? errorId : hint ? hintId : undefined;

    // If a placeholder is used on an uncontrolled select, select it by default.
    const resolvedDefaultValue =
      value === undefined && defaultValue === undefined && placeholder
        ? ""
        : defaultValue;

    return (
      <Field
        id={selectId}
        label={label}
        hint={hint}
        error={error}
        required={required}
        hintId={hintId}
        errorId={errorId}
        className={containerClassName}
      >
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            required={required}
            aria-invalid={error ? true : undefined}
            aria-describedby={describedBy}
            value={value}
            defaultValue={resolvedDefaultValue}
            className={cn(
              "h-11 w-full appearance-none rounded-xl border bg-surface pl-3 pr-10 text-sm text-ink",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "disabled:cursor-not-allowed disabled:opacity-60",
              error ? "border-error" : "border-border",
              className,
            )}
            {...props}
          >
            {placeholder ? (
              <option value="" disabled>
                {placeholder}
              </option>
            ) : null}
            {children}
          </select>
          <ChevronDownIcon
            width={18}
            height={18}
            className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted"
          />
        </div>
      </Field>
    );
  },
);
