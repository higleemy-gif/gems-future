import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion language for the counselling wizard.
 *
 * Springs power the "satisfying" interactions (taps, selection pops, the
 * progress bar), while page-to-page transitions use a short, crisp tween so
 * they never develop a laggy spring tail. Everything here is paired with
 * `useReducedMotion()` at the call site — when a user prefers reduced motion we
 * swap to `fadeVariants` and near-instant transitions.
 */

/** Snappy spring for button/card taps. */
export const tapSpring: Transition = {
  type: "spring",
  stiffness: 500,
  damping: 30,
  mass: 0.7,
};

/** Bouncier spring for the selection "pop" (two keyframes only). */
export const popSpring: Transition = {
  type: "spring",
  stiffness: 600,
  damping: 15,
  mass: 0.8,
};

/**
 * Tween for multi-keyframe "pop" bounces (e.g. scale [1, 1.3, 1]). Springs only
 * support two keyframes, so anything animating through a middle value must use
 * a tween.
 */
export const popKeyframes: Transition = {
  type: "tween",
  duration: 0.4,
  ease: "easeOut",
};

/** Smooth spring for the progress bar fill + rider. */
export const progressSpring: Transition = {
  type: "spring",
  stiffness: 170,
  damping: 26,
};

/** Direction-aware slide for one-question-per-screen transitions. */
export const slideVariants: Variants = {
  enter: (dir: number) => ({ x: dir >= 0 ? 48 : -48, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir >= 0 ? -48 : 48, opacity: 0 }),
};

/** Reduced-motion fallback: fade only, no horizontal travel. */
export const fadeVariants: Variants = {
  enter: { opacity: 0 },
  center: { opacity: 1 },
  exit: { opacity: 0 },
};

export const pageTween: Transition = {
  type: "tween",
  ease: [0.22, 1, 0.36, 1],
  duration: 0.3,
};

export const reducedTween: Transition = { duration: 0.12 };

/** Container that gently staggers its children into view. */
export const staggerContainer: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.05 } },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: tapSpring },
};
