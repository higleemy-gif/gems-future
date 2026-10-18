"use client";

import { forwardRef, type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { buttonClasses, type ButtonSize, type ButtonVariant } from "@/components/ui";
import { tapSpring } from "./motion";

export interface SpringButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  disabled?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  className?: string;
  type?: "button" | "submit";
  children: ReactNode;
  "aria-label"?: string;
}

/**
 * A Button with a springy tap/hover feel, reusing the exact visual language of
 * the shared `Button` (via `buttonClasses`) so it stays on-brand. Hover grows
 * a touch, tap presses in — disabled and reduced-motion both drop the motion.
 */
export const SpringButton = forwardRef<HTMLButtonElement, SpringButtonProps>(
  function SpringButton(
    {
      variant = "primary",
      size = "lg",
      fullWidth = false,
      disabled = false,
      leftIcon,
      rightIcon,
      onClick,
      className,
      type = "button",
      children,
      ...rest
    },
    ref,
  ) {
    const reduced = useReducedMotion();
    const interactive = !reduced && !disabled;

    return (
      <motion.button
        ref={ref}
        type={type}
        disabled={disabled}
        onClick={onClick}
        whileTap={interactive ? { scale: 0.95 } : undefined}
        whileHover={interactive ? { scale: 1.03 } : undefined}
        transition={tapSpring}
        className={buttonClasses({ variant, size, fullWidth, className })}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
      </motion.button>
    );
  },
);
