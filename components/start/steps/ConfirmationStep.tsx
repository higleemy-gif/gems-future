"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { buttonClasses } from "@/components/ui";
import { Confetti } from "../Confetti";
import { SpringButton } from "../SpringButton";
import { popSpring } from "../motion";
import type { WizardState, Wording } from "../wizard";
import { MAIN_GOAL_OPTIONS, STAGE_OPTIONS } from "../wizard";

export interface ConfirmationStepProps {
  answers: WizardState;
  w: Wording;
  onStartOver: () => void;
}

function labelFor(
  options: { label: string; value: string }[],
  value: string | null,
): string {
  if (!value) return "-";
  return options.find((o) => o.value === value)?.label ?? value;
}

export function ConfirmationStep({ answers, w, onStartOver }: ConfirmationStepProps) {
  const reduced = useReducedMotion();

  const summary: { label: string; value: string }[] = [
    { label: w.isParent ? "Child's name" : "Name", value: answers.name || "-" },
    { label: "Role", value: w.isParent ? "Parent" : "Student" },
    { label: "Stage", value: labelFor(STAGE_OPTIONS, answers.stage) },
    { label: "Main goal", value: labelFor(MAIN_GOAL_OPTIONS, answers.interests.mainGoal) },
  ];

  if (answers.interestedIn) {
    summary.push({ label: "Interested in", value: answers.interestedIn });
  }

  return (
    <div className="relative flex flex-col items-center text-center">
      <Confetti count={56} />

      <motion.span
        aria-hidden="true"
        className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary to-teal text-5xl shadow-lg shadow-primary/25"
        initial={reduced ? false : { scale: 0, rotate: -30 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={popSpring}
      >
        🎉
      </motion.span>

      <h1 className="mt-5 font-display text-3xl font-semibold tracking-tight text-ink">
        You&apos;re all set 🙌
      </h1>
      <p className="mt-2 max-w-md text-ink-2">
        Thanks{answers.name ? `, ${answers.name.trim().split(/\s+/)[0]}` : ""}.
        We&apos;ve captured everything. This is a prototype, so nothing is saved
        yet — the real guidance and follow-up come in the next phase.
      </p>

      <dl className="mt-6 w-full max-w-sm divide-y divide-border overflow-hidden rounded-2xl border border-border bg-surface text-left">
        {summary.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-4 px-4 py-3">
            <dt className="text-sm text-muted">{row.label}</dt>
            <dd className="text-right text-sm font-medium text-ink">{row.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
        <Link href="/" className={buttonClasses({ variant: "ghost", size: "lg" })}>
          Back to home
        </Link>
        <SpringButton variant="primary" onClick={onStartOver}>
          Start over
        </SpringButton>
      </div>
    </div>
  );
}
