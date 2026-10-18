"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Logo } from "@/components/site/Logo";
import {
  PHASES,
  STEP_ORDER,
  STEP_PHASE,
  canProceed,
  initialState,
  wording,
  type Academic,
  type Contact,
  type Interests,
  type StepId,
  type WizardState,
} from "./wizard";
import { WizardProgress } from "./WizardProgress";
import { SpringButton } from "./SpringButton";
import {
  fadeVariants,
  pageTween,
  reducedTween,
  slideVariants,
} from "./motion";
import { RoleStep } from "./steps/RoleStep";
import { PhoneConsentStep } from "./steps/PhoneConsentStep";
import { BasicDetailsStep } from "./steps/BasicDetailsStep";
import { StageStep } from "./steps/StageStep";
import { AcademicStep } from "./steps/AcademicStep";
import { InterestsStep } from "./steps/InterestsStep";
import { ResultStep } from "./steps/ResultStep";
import { ContactStep } from "./steps/ContactStep";
import { ConfirmationStep } from "./steps/ConfirmationStep";

const NEXT_LABEL: Partial<Record<StepId, string>> = {
  interests: "See my result",
  contact: "Finish",
};

/**
 * Short, encouraging line shown under the progress bar for each step. Purely
 * additive microcopy — it reacts as the user moves along but never changes any
 * question, label or branch.
 */
const ENCOURAGEMENT: Record<StepId, string> = {
  role: "Let's go — tap whatever fits you 👋",
  phone: "Quick one, so we can save your result 🔒",
  basic: "Nice to meet you! A couple of basics ✨",
  stage: "Big one — where are you right now? 📍",
  academic: "Cool. Add what you like, skip the rest 😌",
  interests: "The fun part — what are you into? 🎯",
  result: "Boom! Here's your direction 🎉",
  contact: "Almost there — where should we reach you? 📬",
  confirmation: "You did it! 🙌",
};

export function StartWizard() {
  const [stepIndex, setStepIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [answers, setAnswers] = useState<WizardState>(initialState);
  const reduced = useReducedMotion();

  const step = STEP_ORDER[stepIndex];
  const phase = STEP_PHASE[step];
  const w = wording(answers.role);

  // Return to the top whenever the step changes.
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "auto" });
  }, [stepIndex]);

  const update = (patch: Partial<WizardState>) =>
    setAnswers((prev) => ({ ...prev, ...patch }));
  const updateAcademic = (patch: Partial<Academic>) =>
    setAnswers((prev) => ({ ...prev, academic: { ...prev.academic, ...patch } }));
  const updateInterests = (patch: Partial<Interests>) =>
    setAnswers((prev) => ({ ...prev, interests: { ...prev.interests, ...patch } }));
  const updateContact = (patch: Partial<Contact>) =>
    setAnswers((prev) => ({ ...prev, contact: { ...prev.contact, ...patch } }));

  const goNext = () => {
    setDirection(1);
    setStepIndex((i) => Math.min(STEP_ORDER.length - 1, i + 1));
  };
  const goBack = () => {
    setDirection(-1);
    setStepIndex((i) => Math.max(0, i - 1));
  };
  const startOver = () => {
    setDirection(-1);
    setAnswers(initialState);
    setStepIndex(0);
  };
  const registerInterest = (title: string) => {
    update({ interestedIn: title });
    goNext(); // result -> contact
  };

  const stepProps = {
    answers,
    w,
    update,
    updateAcademic,
    updateInterests,
    updateContact,
  };

  const renderStep = () => {
    switch (step) {
      case "role":
        return <RoleStep {...stepProps} />;
      case "phone":
        return <PhoneConsentStep {...stepProps} />;
      case "basic":
        return <BasicDetailsStep {...stepProps} />;
      case "stage":
        return <StageStep {...stepProps} />;
      case "academic":
        return <AcademicStep {...stepProps} />;
      case "interests":
        return <InterestsStep {...stepProps} />;
      case "result":
        return <ResultStep answers={answers} w={w} onRegister={registerInterest} />;
      case "contact":
        return <ContactStep {...stepProps} />;
      case "confirmation":
        return (
          <ConfirmationStep answers={answers} w={w} onStartOver={startOver} />
        );
    }
  };

  const isFirst = stepIndex === 0;
  const isConfirmation = step === "confirmation";
  const proceed = canProceed(step, answers);
  const fraction = stepIndex / (STEP_ORDER.length - 1);

  return (
    <div className="relative min-h-dvh overflow-hidden">
      {/* Playful, soft gradient blobs behind the card. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute -right-20 top-20 h-72 w-72 rounded-full bg-teal/10 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-amber/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-dvh max-w-2xl flex-col px-gutter py-8">
        <div className="mb-7 flex justify-center">
          <Link
            href="/"
            aria-label="Gems Future home"
            className="rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            <Logo />
          </Link>
        </div>

        <WizardProgress
          phase={phase}
          totalPhases={PHASES.length}
          fraction={fraction}
          caption={ENCOURAGEMENT[step]}
        />

        <div className="relative mt-6 flex-1">
          <AnimatePresence mode="wait" custom={direction} initial={false}>
            <motion.div
              key={step}
              custom={direction}
              variants={reduced ? fadeVariants : slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={reduced ? reducedTween : pageTween}
              className="rounded-3xl border border-border bg-surface/95 p-6 shadow-xl shadow-primary/5 backdrop-blur-sm sm:p-9"
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Confirmation renders its own actions; everything else gets Back/Next. */}
        {isConfirmation ? null : (
          <div className="mt-6 flex items-center justify-between gap-3">
            {!isFirst ? (
              <SpringButton variant="ghost" onClick={goBack}>
                Back
              </SpringButton>
            ) : (
              <span />
            )}

            <div className="flex items-center gap-3">
              {!proceed ? (
                <span className="hidden text-xs text-muted sm:inline">
                  Complete the required fields
                </span>
              ) : null}
              <SpringButton
                onClick={goNext}
                disabled={!proceed}
                rightIcon={<ArrowRightIcon width={18} height={18} />}
              >
                {NEXT_LABEL[step] ?? "Continue"}
              </SpringButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
