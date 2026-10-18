import { Fragment } from "react";
import { cn } from "@/lib/cn";
import { CheckIcon } from "./icons";

export interface Step {
  label: string;
  description?: string;
}

export interface ProgressStepperProps {
  steps: Step[];
  /** Zero-based index of the current (active) step. */
  current: number;
  className?: string;
  /** Accessible name for the stepper navigation. */
  "aria-label"?: string;
}

type StepState = "complete" | "current" | "upcoming";

function getState(index: number, current: number): StepState {
  if (index < current) return "complete";
  if (index === current) return "current";
  return "upcoming";
}

/**
 * ProgressStepper — shows progress through a multi-step flow.
 * Completed steps use a filled blue marker with a check; the current step is
 * outlined in blue; upcoming steps are neutral. State is conveyed by shape and
 * icon as well as color.
 */
export function ProgressStepper({
  steps,
  current,
  className,
  "aria-label": ariaLabel = "Progress",
}: ProgressStepperProps) {
  return (
    <nav aria-label={ariaLabel} className={className}>
      <ol className="flex items-center">
        {steps.map((step, index) => {
          const state = getState(index, current);
          const isLast = index === steps.length - 1;

          return (
            <Fragment key={step.label}>
              <li
                className="flex flex-col items-center text-center"
                aria-current={state === "current" ? "step" : undefined}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold",
                    state === "complete" && "bg-primary text-white",
                    state === "current" &&
                      "border-2 border-primary bg-surface text-primary",
                    state === "upcoming" &&
                      "border border-border bg-surface text-muted",
                  )}
                >
                  {state === "complete" ? (
                    <CheckIcon width={16} height={16} />
                  ) : (
                    index + 1
                  )}
                  <span className="sr-only">
                    {state === "complete"
                      ? " (completed)"
                      : state === "current"
                        ? " (current)"
                        : " (upcoming)"}
                  </span>
                </span>
                <span
                  className={cn(
                    "mt-1.5 max-w-[8rem] text-xs sm:text-sm",
                    state === "current"
                      ? "font-medium text-ink"
                      : state === "complete"
                        ? "text-ink-2"
                        : "text-muted",
                  )}
                >
                  {step.label}
                </span>
                {step.description ? (
                  <span className="mt-0.5 hidden max-w-[8rem] text-xs text-muted sm:block">
                    {step.description}
                  </span>
                ) : null}
              </li>
              {!isLast ? (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-1 mb-6 h-0.5 flex-1 rounded-full sm:mx-2",
                    index < current ? "bg-primary" : "bg-border",
                  )}
                />
              ) : null}
            </Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
