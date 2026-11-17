"use client";

import Link from "next/link";
import { MotionConfig } from "motion/react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { BlurFade } from "@/components/ui/blur-fade";
import { NumberTicker } from "@/components/ui/number-ticker";
import { Badge } from "@/components/ui/badge";

  const eyebrow = "Free • Takes 2 minutes";
  const headline = "Confused about what to do next? Let's figure it out together.";
  const subline = "Whether you just finished 10th, 12th, or college — tell us where you're at in your own words. We'll help you see which path actually fits you. No pressure, no jargon.";
  const reassuring = "Not sure what you want? That's completely okay. That's exactly why we're here.";
  const finalCtaLine = "Your future's waiting. Let's find your direction.";
  const primaryLabel = "Start my journey →";

const steps = [
  {
    step: "1",
    title: "Tell us about you",
    desc: "Share where you are and what you're thinking, in your own words.",
  },
  {
    step: "2",
    title: "We think it through",
    desc: "We consider your situation and what actually fits you.",
  },
  {
    step: "3",
    title: "Get your path",
    desc: "See a direction that makes sense for you, explained simply.",
  },
];

const stats = [
  { value: 2, suffix: " min", label: "Average time to start" },
  { value: 3, suffix: "", label: "Stages we guide: 10th, 12th, college" },
  { value: 100, suffix: "%", label: "Free to begin" },
];

export default function Home() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex min-h-screen flex-col">

        <AuroraBackground showRadialGradient className="h-auto min-h-[90vh] rounded-none">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#1E4ED8" />
          <div className="relative z-10 mx-auto flex max-w-3xl flex-col items-center gap-6 px-4 py-20 text-center">
            <Badge variant="secondary" className="px-3 py-1 text-xs sm:text-sm">{eyebrow}</Badge>
            <TextGenerateEffect
              words={headline}
              className="text-3xl font-bold leading-tight text-ink sm:text-4xl md:text-5xl"
            />
            <p className="max-w-2xl text-base text-muted-foreground sm:text-lg">{subline}</p>
            <Link href="/start" className="inline-block">
              <ShimmerButton className="text-base font-medium">{primaryLabel}</ShimmerButton>
            </Link>
          </div>
        </AuroraBackground>

        <section className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
          <BlurFade inView>
            <h2 className="text-center text-2xl font-semibold text-ink sm:text-3xl">How it works</h2>
          </BlurFade>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <BlurFade key={s.step} delay={0.15 + i * 0.15} inView>
                <div className="h-full rounded-2xl border bg-card p-6 shadow-sm">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                    {s.step}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-ink">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </section>

        <section className="border-y bg-card">
          <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 py-14 text-center sm:grid-cols-3">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1">
                <div className="flex items-baseline text-4xl font-bold text-deep-blue">
                  <NumberTicker value={stat.value} />
                  <span>{stat.suffix}</span>
                </div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto w-full max-w-3xl px-4 py-16 text-center sm:py-20">
          <BlurFade inView>
            <p className="text-xl font-medium text-ink sm:text-2xl">{reassuring}</p>
          </BlurFade>
        </section>

        <section className="bg-primary">
          <div className="mx-auto flex w-full max-w-3xl flex-col items-center gap-6 px-4 py-16 text-center sm:py-24">
            <h2 className="text-2xl font-bold text-primary-foreground sm:text-3xl md:text-4xl">{finalCtaLine}</h2>
            <Link href="/start" className="inline-block">
              <ShimmerButton className="text-base font-medium">{primaryLabel}</ShimmerButton>
            </Link>
          </div>
        </section>

        <footer className="border-t bg-background">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-center justify-between gap-4 px-4 py-8 text-center sm:flex-row sm:text-left">
            <div>
              <p className="text-base font-semibold text-deep-blue">Gems Future</p>
              <p className="text-sm text-muted-foreground">Career counselling that starts with you.</p>
            </div>
            <p className="text-xs text-muted-foreground">(c) {new Date().getFullYear()} Gems Future. All rights reserved.</p>
          </div>
        </footer>

      </div>
    </MotionConfig>
  );
}
