import type { Metadata, Viewport } from "next";
import { fontPoppins } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Gems Future — Find the right direction",
    template: "%s | Gems Future",
  },
  description:
    "Free, AI-powered career and course counselling for students across India. Tell us your plan in your own words and get a clear, affordable path forward.",
  applicationName: "Gems Future",
  keywords: [
    "career counselling",
    "course counselling",
    "students",
    "India",
    "AI guidance",
  ],
  authors: [{ name: "Gems Future" }],
  formatDetection: {
    email: false,
    telephone: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // Light theme only — set the browser UI color to the page background.
  themeColor: "#F7F9FC",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={fontPoppins.variable}>
      <body className="min-h-dvh bg-bg font-body text-ink">
        {children}
      </body>
    </html>
  );
}
