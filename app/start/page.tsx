import type { Metadata } from "next";
import { StartWizard } from "@/components/start/StartWizard";

export const metadata: Metadata = {
  title: "Start your journey",
  description:
    "Tell us your plan and get a clear, affordable path forward. Free, AI-powered counselling from Gems Future.",
};

export default function StartPage() {
  return <StartWizard />;
}
