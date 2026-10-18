"use client";

import { motion, useReducedMotion } from "framer-motion";
import { progressSpring } from "./motion";

export interface WizardProgressProps {
  /** Zero-based index of the current phase. */
  phase: number;
  /** Total number of phases. */
  totalPhases: number;
  /** Overall completion from 0 to 1 (drives the fill + rider). */
  fraction: number;
  /** Short, friendly line that reacts as the user moves along. */
  caption?: string;
}

/**
 * A lively progress bar: a "Step X of N ✨" label, a gradient fill that springs
 * to its new width, and a little rocket that rides along the top. Reduced
 * motion keeps the fill but drops the spring + bobbing.
 */
export function WizardProgress({
  phase,
  totalPhases,
  fraction,
  caption,
}: WizardProgressProps) {
  const reduced = useReducedMotion();
  const pct = Math.max(0, Math.min(1, fraction)) * 100;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-end justify-between gap-3">
        <span className="font-display text-sm font-semibold text-ink">
          Step {Math.min(phase + 1, totalPhases)} of {totalPhases}{" "}
          <span aria-hidden="true">✨</span>
        </span>
        {caption ? (
          <span className="text-right text-xs font-medium text-ink-2">
            {caption}
          </span>
        ) : null}
      </div>

      <div className="relative">
        {/* Rocket rider sitting just above the fill's leading edge. */}
        <motion.span
          aria-hidden="true"
          className="absolute -top-5 z-10 text-lg"
          style={{ left: `${pct}%` }}
          initial={false}
          animate={{
            left: `${pct}%`,
            y: reduced ? 0 : [0, -2, 0],
          }}
          transition={
            reduced
              ? { duration: 0 }
              : { left: progressSpring, y: { duration: 1.4, repeat: Infinity } }
          }
        >
          <span className="-ml-3 inline-block">🚀</span>
        </motion.span>

        <div className="h-3 w-full overflow-hidden rounded-full bg-border">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-primary via-teal to-amber"
            initial={false}
            animate={{ width: `${pct}%` }}
            transition={reduced ? { duration: 0 } : progressSpring}
          />
        </div>
      </div>
    </div>
  );
}
