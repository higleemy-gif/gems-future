import type { Metadata } from "next";

/**
 * TEMPORARY — design-system preview route.
 * Kept out of search engines; delete this whole folder before launch.
 */
export const metadata: Metadata = {
  title: "UI Kit Preview",
  robots: {
    index: false,
    follow: false,
  },
};

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
