"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-background text-foreground",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#1E4ED8_10%,#0D9488_15%,#F59E0B_20%,#0D9488_25%,#1E4ED8_30%)",
              "--deep-blue": "#1E4ED8",
              "--teal-green": "#0D9488",
              "--amber": "#F59E0B",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%] opacity-40 blur-[10px] will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--deep-blue)_10%,var(--teal-green)_15%,var(--amber)_20%,var(--teal-green)_25%,var(--deep-blue)_30%)] after:absolute after:inset-0 after:[background-image:var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-soft-light after:content-[""]`,
              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};
