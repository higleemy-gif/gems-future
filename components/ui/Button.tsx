import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { GoogleIcon, SpinnerIcon } from "./icons";

export type ButtonVariant = "primary" | "ghost" | "google";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium " +
  "transition-colors duration-150 select-none " +
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary " +
  "focus-visible:ring-offset-2 focus-visible:ring-offset-bg " +
  "disabled:pointer-events-none disabled:opacity-60";

const sizes: Record<ButtonSize, string> = {
  sm: "h-9 px-3 text-sm",
  md: "h-11 px-4 text-sm",
  lg: "h-12 px-6 text-base",
};

const variants: Record<ButtonVariant, string> = {
  // Blue is reserved for interactive elements — primary is the main CTA.
  primary: "bg-primary text-white hover:bg-primary-pressed active:bg-primary-pressed",
  // Low-emphasis interactive action: blue text on a tinted hover.
  ghost: "bg-transparent text-primary hover:bg-soft-blue active:bg-soft-blue",
  // Neutral surface with the Google brand mark for OAuth sign-in.
  google:
    "bg-surface text-ink border border-border hover:bg-bg active:bg-bg",
};

/**
 * Shared class builder for button-styled elements. Exported so link-based
 * controls (see ButtonLink) can reuse the exact same visual language instead
 * of redefining one-off styles.
 */
export function buttonClasses({
  variant = "primary",
  size = "md",
  fullWidth = false,
  className,
}: {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  className?: string;
} = {}): string {
  return cn(
    base,
    sizes[size],
    variants[variant],
    fullWidth && "w-full",
    className,
  );
}

/**
 * Button — primary / ghost / google variants.
 *
 * The `google` variant automatically renders the Google logo on the left,
 * so you do not need to pass `leftIcon` for it.
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      disabled,
      className,
      children,
      type = "button",
      ...props
    },
    ref,
  ) {
    const resolvedLeftIcon =
      variant === "google" && !leftIcon ? <GoogleIcon /> : leftIcon;

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        aria-busy={isLoading || undefined}
        className={buttonClasses({ variant, size, fullWidth, className })}
        {...props}
      >
        {isLoading ? (
          <SpinnerIcon className="animate-spin" aria-hidden="true" />
        ) : (
          resolvedLeftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    );
  },
);
