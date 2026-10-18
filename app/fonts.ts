import { Poppins } from "next/font/google";

/**
 * Project font — "Poppins".
 *
 * The single typeface used across the entire UI: headings, body copy, buttons,
 * inputs and labels all render in Poppins. Exposed as the CSS variable
 * `--font-poppins`, which Tailwind's `display` and `body` families both map to
 * (see tailwind.config.ts), and set as the default on <body>.
 *
 * Weights are kept deliberately light: 400 (regular) and 500 (medium) for body
 * and labels, 600 (semibold) for headings. No 700+ weights — text stays clean
 * and never overly bold.
 */
export const fontPoppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["400", "500", "600"],
});
