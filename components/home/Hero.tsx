"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { ButtonLink } from "@/components/ui";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  GraduationCapIcon,
  SparklesIcon,
} from "@/components/ui/icons";

// Floating career-path chips around the illustration.
const careerChips = [
  { label: "Software Engineer", className: "left-0 top-6", anim: "motion-safe:animate-floaty" },
  { label: "Doctor", className: "right-2 top-0", anim: "motion-safe:animate-floaty-slow" },
  { label: "Designer", className: "right-0 top-1/2", anim: "motion-safe:animate-floaty" },
  { label: "CA / Finance", className: "bottom-6 left-2", anim: "motion-safe:animate-floaty-slow" },
];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden">
      {/* Drifting brand-tint blobs */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-soft-blue blur-3xl motion-safe:animate-blob sm:h-96 sm:w-96" />
        <div className="absolute right-0 top-10 h-72 w-72 rounded-full bg-soft-teal blur-3xl motion-safe:animate-blob-slow sm:h-[26rem] sm:w-[26rem]" />
        <div className="absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-amber/10 blur-3xl motion-safe:animate-floaty-slow" />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-12 px-5 pb-12 pt-12 sm:px-8 sm:pt-20 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pb-20">
        {/* Left column */}
        <motion.div
          variants={container}
          initial={reduce ? false : "hidden"}
          animate="show"
          className="flex flex-col items-start"
        >
          <motion.span
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/70 px-3 py-1 text-xs font-medium text-ink-2 shadow-soft backdrop-blur"
          >
            <SparklesIcon width={14} height={14} className="text-teal" />
            Discover · Compare · Apply · Grow
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-5 max-w-xl text-4xl font-semibold leading-[1.1] tracking-tight text-ink sm:text-5xl lg:text-6xl"
          >
            Find the right career path for your{" "}
            <span className="relative whitespace-nowrap text-primary">
              future
              <svg
                aria-hidden="true"
                viewBox="0 0 220 12"
                className="absolute -bottom-1 left-0 h-2.5 w-full text-teal/50"
                preserveAspectRatio="none"
              >
                <path
                  d="M2 9C60 3 160 3 218 7"
                  stroke="currentColor"
                  strokeWidth="4"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-5 max-w-lg text-base text-ink-2 sm:text-lg"
          >
            Tell us your plan in your own words. We&apos;ll check if it&apos;s
            sound, map a clear path, and guide you to your best-fit career —
            honestly and for free.
          </motion.p>

          <motion.div variants={item} className="mt-8 w-full sm:w-auto">
            <ButtonLink
              href="/start"
              size="lg"
              fullWidth
              className="sm:w-auto"
              rightIcon={<ArrowRightIcon width={18} height={18} />}
            >
              Start Free Counselling
            </ButtonLink>
          </motion.div>

          <motion.p
            variants={item}
            className="mt-4 text-sm text-muted"
          >
            Free for students · Private · Takes a few minutes
          </motion.p>
        </motion.div>

        {/* Right column — illustration */}
        <motion.div
          initial={reduce ? undefined : { opacity: 0, scale: 0.96 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={reduce ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto flex w-full max-w-md items-center justify-center lg:max-w-none"
        >
          {/* Soft brand-tint blob behind the scene */}
          <div
            aria-hidden="true"
            className="absolute inset-0 -z-10 m-auto h-72 w-72 rounded-[40%_60%_55%_45%/55%_45%_60%_40%] bg-gradient-to-br from-soft-blue to-soft-teal blur-2xl sm:h-96 sm:w-96"
          />

          {/* Central "student thinking" card */}
          <div className="relative w-64 rounded-3xl border border-white/70 bg-surface p-5 shadow-glass sm:w-72">
            <div className="flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-pressed text-white">
                <GraduationCapIcon width={24} height={24} />
              </span>
              <div>
                <p className="text-sm font-semibold text-ink">Aarav, Class 12</p>
                <p className="text-xs text-muted">Thinking about next steps…</p>
              </div>
            </div>

            <div className="mt-4 space-y-2">
              <div className="h-2.5 w-full rounded-full bg-soft-blue" />
              <div className="h-2.5 w-4/5 rounded-full bg-soft-teal" />
              <div className="h-2.5 w-3/5 rounded-full bg-amber/20" />
            </div>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-bg p-3">
              <span className="flex items-center gap-2 text-xs font-medium text-ink-2">
                <BriefcaseIcon width={16} height={16} className="text-teal" />
                Best-fit path
              </span>
              <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">
                92% match
              </span>
            </div>
          </div>

          {/* Floating career chips */}
          {careerChips.map((chip) => (
            <div
              key={chip.label}
              className={`absolute ${chip.className} ${chip.anim} rounded-full border border-border bg-surface px-3 py-1.5 text-xs font-medium text-ink shadow-soft`}
            >
              {chip.label}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
