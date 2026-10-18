"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Badge, Card, CardContent, CardHeader, CardTitle } from "@/components/ui";
import { SparklesIcon } from "@/components/ui/icons";
import { Confetti } from "../Confetti";
import { SpringButton } from "../SpringButton";
import { popSpring, staggerContainer, staggerItem } from "../motion";
import type { WizardState, Wording } from "../wizard";

export interface ResultStepProps {
  answers: WizardState;
  w: Wording;
  onRegister: (title: string) => void;
}

// Hard-coded SAMPLE content so we can review the layout. No AI yet.
const pathSteps = [
  "Finish your current year strong — focus on the basics that matter most.",
  "Pick one affordable course below and pair it with a free online certificate.",
  "Build two small projects, then start applying for junior roles or internships.",
];

const sampleRecs = [
  {
    title: "Diploma in Computer Engineering",
    mode: "Offline",
    provider: "Government Polytechnic",
    price: "Rs. 10,000 - 20,000 / year",
    emoji: "🛠️",
  },
  {
    title: "Google IT Support Professional Certificate",
    mode: "Online",
    provider: "Coursera (with Google)",
    price: "Rs. 3,000 - 4,000 / month - financial aid available",
    emoji: "💻",
  },
  {
    title: "Programming in Java",
    mode: "Online",
    provider: "NPTEL (IITs)",
    price: "Free - optional exam approx. Rs. 1,000",
    emoji: "☕",
  },
];

export function ResultStep({ answers, onRegister }: ResultStepProps) {
  const firstName = answers.name.trim().split(/\s+/)[0] || "Your";
  const reduced = useReducedMotion();

  return (
    <div className="relative">
      <Confetti />

      {/* Unmistakable sample notice. */}
      <div className="mb-5 flex flex-wrap items-center gap-2">
        <Badge variant="warning">Sample result</Badge>
        <span className="text-xs text-ink-2">
          Placeholder content to preview the layout — no AI yet.
        </span>
      </div>

      {/* Big, shareable verdict hero. */}
      <motion.div
        initial={reduced ? false : { scale: 0.92, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={popSpring}
        className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary to-teal px-6 py-8 text-center text-white shadow-xl shadow-primary/25"
      >
        <motion.span
          aria-hidden="true"
          className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/15 text-4xl backdrop-blur-sm"
          animate={reduced ? undefined : { rotate: [0, -10, 10, 0], y: [0, -4, 0] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        >
          🎉
        </motion.span>
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-white/80">
          Your direction
        </p>
        <h1 className="mt-1 font-display text-3xl font-semibold leading-tight sm:text-4xl">
          {firstName}&apos;s plan looks sound ✨
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] leading-relaxed text-white/90">
          It&apos;s a realistic direction. With a few affordable steps, it leads
          to job-ready skills and real options.
        </p>
      </motion.div>

      {/* 3-step path */}
      <section className="mb-7 mt-7">
        <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-semibold text-ink">
          <SparklesIcon width={20} height={20} className="text-amber" />
          Your path, in 3 steps
        </h2>
        <motion.ol
          className="flex flex-col gap-3"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : "hidden"}
          animate={reduced ? false : "show"}
        >
          {pathSteps.map((step, index) => (
            <motion.li
              key={step}
              variants={reduced ? undefined : staggerItem}
              className="flex items-start gap-3 rounded-2xl border border-border bg-surface p-3"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-teal text-sm font-semibold text-white">
                {index + 1}
              </span>
              <span className="pt-1 text-sm text-ink">{step}</span>
            </motion.li>
          ))}
        </motion.ol>
      </section>

      {/* Recommendation cards */}
      <section>
        <h2 className="mb-3 font-display text-lg font-semibold text-ink">
          Affordable options to consider
        </h2>
        <div className="flex flex-col gap-4">
          {sampleRecs.map((rec) => (
            <Card key={rec.title} className="overflow-hidden">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="info">{rec.mode}</Badge>
                  <span className="text-xs text-muted">{rec.provider}</span>
                </div>
                <CardTitle className="mt-2 flex items-center gap-2 text-base">
                  <span aria-hidden="true" className="text-xl">
                    {rec.emoji}
                  </span>
                  {rec.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm font-medium text-ink">{rec.price}</p>
                <SpringButton
                  size="sm"
                  fullWidth
                  className="sm:w-auto"
                  onClick={() => onRegister(rec.title)}
                >
                  Register interest
                </SpringButton>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}
