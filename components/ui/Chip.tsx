"use client";

import { type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon } from "./icons";

export interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  /** Visually hide the check mark that appears when selected. */
  hideCheck?: boolean;
  children: ReactNode;
}

const chipBase =
  "inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium " +
  "transition-colors duration-150 " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:pointer-events-none disabled:opacity-60";

const chipSelected = "border-primary bg-soft-blue text-primary";
const chipUnselected =
  "border-border bg-surface text-ink-2 hover:border-primary hover:text-primary";

/**
 * A single toggleable Chip. For managed single/multi-select sets, prefer
 * `ChipGroup`, which wires up the correct ARIA roles.
 */
export function Chip({
  selected = false,
  hideCheck = false,
  className,
  children,
  type = "button",
  ...props
}: ChipProps) {
  return (
    <button
      type={type}
      aria-pressed={selected}
      className={cn(
        chipBase,
        selected ? chipSelected : chipUnselected,
        className,
      )}
      {...props}
    >
      {selected && !hideCheck ? (
        <CheckIcon width={15} height={15} />
      ) : null}
      {children}
    </button>
  );
}

export interface ChipOption {
  label: string;
  value: string;
  disabled?: boolean;
}

interface ChipGroupBaseProps {
  options: ChipOption[];
  /** Accessible name for the group of chips. */
  "aria-label": string;
  className?: string;
}

interface ChipGroupSingleProps extends ChipGroupBaseProps {
  mode: "single";
  value: string | null;
  onValueChange: (value: string | null) => void;
  /** When true (default), clicking the selected chip clears the selection. */
  allowDeselect?: boolean;
}

interface ChipGroupMultiProps extends ChipGroupBaseProps {
  mode: "multi";
  value: string[];
  onValueChange: (value: string[]) => void;
}

export type ChipGroupProps = ChipGroupSingleProps | ChipGroupMultiProps;

/**
 * ChipGroup — a managed set of chips.
 *
 * - `mode="single"` behaves like a radio group (role="radiogroup" / "radio").
 * - `mode="multi"` is a set of independent toggles (aria-pressed).
 */
export function ChipGroup(props: ChipGroupProps) {
  const { options, className } = props;
  const isSingle = props.mode === "single";

  return (
    <div
      role={isSingle ? "radiogroup" : "group"}
      aria-label={props["aria-label"]}
      className={cn("flex flex-wrap gap-2", className)}
    >
      {options.map((option) => {
        const selected = isSingle
          ? props.value === option.value
          : props.value.includes(option.value);

        const handleClick = () => {
          if (props.mode === "single") {
            const allowDeselect = props.allowDeselect ?? true;
            if (selected && allowDeselect) {
              props.onValueChange(null);
            } else {
              props.onValueChange(option.value);
            }
          } else {
            if (selected) {
              props.onValueChange(
                props.value.filter((v) => v !== option.value),
              );
            } else {
              props.onValueChange([...props.value, option.value]);
            }
          }
        };

        return (
          <Chip
            key={option.value}
            selected={selected}
            disabled={option.disabled}
            onClick={handleClick}
            // In single mode, present as a radio for assistive tech.
            {...(isSingle
              ? { role: "radio", "aria-checked": selected, "aria-pressed": undefined }
              : {})}
          >
            {option.label}
          </Chip>
        );
      })}
    </div>
  );
}
