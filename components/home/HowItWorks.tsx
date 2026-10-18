import {
  GraduationCapIcon,
  ListChecksIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { Reveal } from "./motion";

const steps = [
  {
    icon: ListChecksIcon,
    title: "Tell us your plan",
    description:
      "Share where you are and what you're thinking — in your own words. No jargon, no wrong answers.",
  },
  {
    icon: SparklesIcon,
    title: "Get AI career guidance",
    description:
      "We check if your direction is sound and map a clear, honest path to get there.",
  },
  {
    icon: GraduationCapIcon,
    title: "See your best-fit path",
    description:
      "Get clear, affordable next steps you can act on — matched to your goals, never generic.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="max-w-2xl">
        <span className="text-sm font-medium text-teal">How it works</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          From &ldquo;not sure&rdquo; to a plan in three steps
        </h2>
        <p className="mt-3 text-ink-2">
          Simple, guided, and built around your situation.
        </p>
      </Reveal>

      <div className="relative mt-12">
        {/* Connecting line (desktop) */}
        <div
          aria-hidden="true"
          className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-primary/30 via-teal/30 to-primary/30 lg:block"
        />
        <ol className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <li key={step.title}>
                <Reveal delay={index * 0.12}>
                <div className="relative flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft">
                  <div className="flex items-center gap-4">
                    <span className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-primary-pressed text-white shadow-lift">
                      <Icon width={26} height={26} />
                      <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-primary">
                        {index + 1}
                      </span>
                    </span>
                    <h3 className="text-lg font-semibold text-ink">{step.title}</h3>
                  </div>
                  <p className="mt-4 text-sm text-ink-2">{step.description}</p>
                </div>
                </Reveal>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
