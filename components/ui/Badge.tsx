import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import {
  AlertTriangleIcon,
  CheckCircleIcon,
  InfoIcon,
  XCircleIcon,
  type IconProps,
} from "./icons";

export type BadgeVariant = "success" | "warning" | "error" | "info";

export interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  variant: BadgeVariant;
  children: ReactNode;
  /** Override the default status icon if needed. */
  icon?: ReactNode;
}

/**
 * Status Badge. Design rule: status is NEVER communicated by color alone, so
 * every badge pairs its color with an icon. Each variant has a built-in icon;
 * you may override it via the `icon` prop.
 */
const variants: Record<
  BadgeVariant,
  { className: string; Icon: (props: IconProps) => ReactNode }
> = {
  success: {
    className: "bg-success-soft text-success",
    Icon: CheckCircleIcon,
  },
  warning: {
    className: "bg-warning-soft text-warning",
    Icon: AlertTriangleIcon,
  },
  error: {
    className: "bg-error-soft text-error",
    Icon: XCircleIcon,
  },
  info: {
    className: "bg-info-soft text-info",
    Icon: InfoIcon,
  },
};

export function Badge({
  variant,
  icon,
  className,
  children,
  ...props
}: BadgeProps) {
  const { className: variantClassName, Icon } = variants[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        variantClassName,
        className,
      )}
      {...props}
    >
      {icon ?? <Icon width={14} height={14} />}
      {children}
    </span>
  );
}
