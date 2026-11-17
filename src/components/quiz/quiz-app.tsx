"use client";

import { MotionConfig } from "motion/react";
import { Quiz } from "@/components/quiz/quiz";

export function QuizApp() {
  return (
    <MotionConfig reducedMotion="user">
      <Quiz />
    </MotionConfig>
  );
}
