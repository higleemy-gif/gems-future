"use client";

import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { CheckIcon } from "@/components/ui/icons";
import { popKeyframes, tapSpring } from "./motion";
import type { PlayfulOption } from "./emoji";

/**
 * Wrapping pill chips with an emoji — for the questions with lots of short
 * options (favourite subjects, interest tags, entrance exams, yes/maybe/no).
 *
 * Same single/multi selection semantics as the original ChipGroup, so the
 * values written to wizard state are identical. Selected chips fill with the
 * brand blue and give the emoji a quick bounce.
 */

interface BaseProps {
  options: PlayfulOption[];
  "aria-label": string;
  className?: string;
}

interface SingleProps extends BaseProps {
  mode: "single";
  value: string | null;
  onValueChange: (value: string | null) => void;
  allowDeselect?: boolean;
}

interface MultiProps extends BaseProps {
  mode: "multi";
  value: string[];
  onValueChange: (value: string[]) => void;
}

export type EmojiChipGroupProps = SingleProps | MultiProps;

export function EmojiChipGroup(props: EmojiChipGroupProps) {
  const { options, className } = props;
  const isSingle = props.mode === "single";
  const reduced = useReducedMotion();

  return (
    <div
      role={isSingle ? "radiogroup" : "group"}
      aria-label={props["aria-label"]}
      className={cn("flex flex-wrap gap-2.5", className)}
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
            whileTap={reduced ? undefined : { scale: 0.92 }}
            animate={reduced ? undefined : { scale: selected ? 1.05 : 1 }}
            transition={tapSpring}
            {...(isSingle
              ? { role: "radio", "aria-checked": selected }
              : { "aria-pressed": selected })}
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full border-2 px-4 py-2.5 text-sm font-medium",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
              "disabled:cursor-not-allowed disabled:opacity-50",
              selected
                ? "border-transparent bg-primary text-white shadow-md shadow-primary/25"
                : "border-border bg-surface text-ink-2 hover:border-primary/60 hover:text-primary",
            )}
          >
            {option.emoji ? (
              <motion.span
                aria-hidden="true"
                className="text-base leading-none"
                animate={
                  reduced || !selected
                    ? { scale: 1 }
                    : { scale: [1, 1.35, 1] }
                }
                transition={popKeyframes}
              >
                {option.emoji}
              </motion.span>
            ) : selected ? (
              <CheckIcon width={15} height={15} />
            ) : null}
            {option.label}
          </motion.button>
        );
      })}
    </div>
  );
}
