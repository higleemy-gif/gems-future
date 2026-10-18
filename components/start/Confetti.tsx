"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

/** Brand-forward confetti palette (blue, teal, amber + a couple of poppers). */
const COLORS = ["#1D4ED8", "#0D9488", "#F59E0B", "#22C55E", "#EC4899", "#8B5CF6"];

export interface ConfettiProps {
  /** Number of pieces. */
  count?: number;
}

/**
 * A one-shot confetti burst that rains down over its positioned parent. Purely
 * decorative (aria-hidden) and completely skipped when the user prefers reduced
 * motion. Place inside a `relative` container.
 */
export function Confetti({ count = 40 }: ConfettiProps) {
  const reduced = useReducedMotion();

  const pieces = useMemo(
    () =>
      Array.from({ length: count }).map((_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 0.35,
        duration: 1.8 + Math.random() * 1.4,
        rotate: Math.random() * 360,
        drift: (Math.random() - 0.5) * 80,
        color: COLORS[i % COLORS.length],
        size: 7 + Math.random() * 7,
        round: Math.random() > 0.5,
      })),
    [count],
  );

  if (reduced) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      {pieces.map((p) => (
        <motion.span
          key={p.id}
          className="absolute"
          style={{
            left: `${p.left}%`,
            top: "-8%",
            width: p.size,
            height: p.size * 1.3,
            backgroundColor: p.color,
            borderRadius: p.round ? "9999px" : "2px",
          }}
          initial={{ y: "-10%", opacity: 1, rotate: p.rotate }}
          animate={{
            y: "115%",
            x: p.drift,
            rotate: p.rotate + 420,
            opacity: [1, 1, 0.9, 0],
          }}
          transition={{ duration: p.duration, delay: p.delay, ease: "easeIn" }}
        />
      ))}
    </div>
  );
}
