import type { Config } from "tailwindcss";

/**
 * Gems Future design tokens.
 *
 * Usage guidance (design rules):
 *  - 65% neutral / 25% blue / 10% accent.
 *  - Blue (`primary`) is reserved for interactive elements only.
 *  - Minimum 16px side gutters -> use `px-gutter` (maps to 1rem / 16px).
 *  - Pair every status color with an icon, never color alone.
 *  - Light theme only. Do not add a dark variant.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Interactive / brand blue (use on interactive elements only).
        primary: {
          DEFAULT: "#1D4ED8",
          pressed: "#1E40AF",
        },
        // Accent.
        teal: {
          DEFAULT: "#0D9488",
          soft: "#CCFBF1",
        },
        // Warm amber accent — use sparingly (highlights, stars, small accents).
        amber: {
          DEFAULT: "#F59E0B",
          soft: "#FEF3C7",
        },
        // Surfaces.
        bg: "#F8FAFC",
        surface: "#FFFFFF",
        "soft-blue": "#EFF6FF",
        "soft-teal": "#F0FDFA",
        "soft-amber": "#FFFBEB",
        // Text / neutrals.
        ink: {
          DEFAULT: "#0F172A", // primary text
          "2": "#475569", // secondary text (ink-2)
        },
        muted: "#64748B",
        border: "#E2E8F0",
        // Status colors. Each has a foreground (text/icon) + soft background.
        success: {
          DEFAULT: "#166534",
          soft: "#DCFCE7",
        },
        warning: {
          DEFAULT: "#92400E",
          soft: "#FEF3C7",
        },
        error: {
          DEFAULT: "#991B1B",
          soft: "#FEE2E2",
        },
        info: {
          DEFAULT: "#1E40AF",
          soft: "#DBEAFE",
        },
      },
      fontFamily: {
        // Poppins is the single typeface used across the whole UI. Both the
        // `display` (headings) and `body` families resolve to it, so every
        // surface renders in Poppins with the same fallback stack.
        sans: [
          "var(--font-poppins)",
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Display headings.
        display: [
          "var(--font-poppins)",
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
        // Body text (default).
        body: [
          "var(--font-poppins)",
          "Poppins",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
      spacing: {
        // Minimum side gutter (16px). Use `px-gutter` on page containers.
        gutter: "1rem",
      },
      boxShadow: {
        // Soft, layered depth for cards and floating elements.
        soft: "0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.12)",
        lift: "0 2px 4px rgba(15, 23, 42, 0.05), 0 18px 40px -16px rgba(29, 78, 216, 0.22)",
        glass: "0 8px 30px -8px rgba(15, 23, 42, 0.18)",
      },
      keyframes: {
        // Slow drifting blobs for layered backgrounds.
        blob: {
          "0%, 100%": { transform: "translate(0px, 0px) scale(1)" },
          "33%": { transform: "translate(24px, -32px) scale(1.06)" },
          "66%": { transform: "translate(-18px, 18px) scale(0.96)" },
        },
        // Gentle floating for the hero chips.
        floaty: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        // Continuous marquee (testimonials). Track is duplicated, so -50%.
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        blob: "blob 18s ease-in-out infinite",
        "blob-slow": "blob 26s ease-in-out infinite",
        floaty: "floaty 6s ease-in-out infinite",
        "floaty-slow": "floaty 8s ease-in-out infinite",
        marquee: "marquee 42s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
