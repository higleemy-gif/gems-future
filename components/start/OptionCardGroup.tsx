"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/ui/icons";
import { popKeyframes, tapSpring } from "./motion";
import type { PlayfulOption } from "./emoji";

/**
 * Big, friendly tappable option cards.
 *
 * Drop-in replacement for the wizard's single/multi `ChipGroup` selections,
 * but sized for thumbs: large targets, an emoji on each, and a satisfying
 * selected state (bold gradient fill, a gentle scale pop, a check badge).
 *
 * Selection logic mirrors the original ChipGroup exactly — single mode behaves
 * like a radio group, multi mode is a set of independent toggles — so the data
 * written back to wizard state is unchanged.
 */

interface BaseProps {
  options: PlayfulOption[];
  "aria-label": string;
  className?: string;
  /** "grid" = 2-up cards, "list" = full-width stacked cards (long labels). */
  layout?: "grid" | "list";
}

interface SingleProps extends BaseProps {
  mode: "single";
  value: string | null;
  onValueChange: (value: string | null) => void;
  /** When true (default), tapping the selected card clears it. */
  allowDeselect?: boolean;
}

interface MultiProps extends BaseProps {
  mode: "multi";
  value: string[];
  onValueChange: (value: string[]) => void;
}

export type OptionCardGroupProps = SingleProps | MultiProps;

export function OptionCardGroup(props: OptionCardGroupProps) {
  const { options, className, layout = "grid" } = props;
  const isSingle = props.mode === "single";
  const reduced = useReducedMotion();

  return (
    <div
      role={isSingle ? "radiogroup" : "group"}
      aria-label={props["aria-label"]}
      className={cn(
        layout === "grid"
          ? "grid grid-cols-1 gap-3 sm:grid-cols-2"
          : "flex flex-col gap-3",
        className,
      )}
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
          } else if (selected) {
            props.onValueChange(props.value.filter((v) => v !== option.value));
          } else {
            props.onValueChange([...props.value, option.value]);
          }
        };

        return (
          <motion.button
            key={option.value}
            type="button"
            disabled={option.disabled}
            onClick={handleClick}
            whileTap={reduced ? undefined : { scale: 0.96 }}
            animate={
              reduced ? undefined : { scale: selected ? 1.02 : 1 }
            }
            transition={tapSpring}
            {...(isSingle
              ? { role: "radio", "aria-checked": selected }
              : { "aria-pressed": selected })}
            className={cn(
              "group relative flex items-center gap-3 rounded-2xl border-2 px-4 py-4 text-left",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "disabled:cursor-not-allowed disabled:opacity-50",
              selected
                ? "border-transparent bg-gradient-to-br from-primary to-teal text-white shadow-lg shadow-primary/25"
                : "border-border bg-surface text-ink hover:border-primary/60 hover:bg-soft-blue/40",
            )}
          >
            {option.emoji ? (
              <motion.span
                aria-hidden="true"
                animate={
                  reduced || !selected
                    ? { scale: 1 }
                    : { scale: [1, 1.3, 1], rotate: [0, -8, 0] }
                }
                transition={popKeyframes}
                className={cn(
                  "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-2xl",
                  selected ? "bg-white/20" : "bg-soft-blue",
                )}
              >
                {option.emoji}
              </motion.span>
            ) : null}

            <span className="flex min-w-0 flex-1 flex-col">
              <span
                className={cn(
                  "font-display text-base font-semibold leading-snug",
                  selected ? "text-white" : "text-ink",
                )}
              >
                {option.label}
              </span>
              {option.description ? (
                <span
                  className={cn(
                    "mt-0.5 text-sm leading-snug",
                    selected ? "text-white/85" : "text-ink-2",
                  )}
                >
                  {option.description}
                </span>
              ) : null}
            </span>

            <span
              className={cn(
                "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                selected
                  ? "border-white bg-white text-primary"
                  : "border-border bg-transparent text-transparent",
              )}
            >
              <CheckIcon width={14} height={14} />
            </span>
          </motion.button>
        );
      })}
    </div>
  );
}
