import {
  BadgeCheckIcon,
  ClockIcon,
  IndianRupeeIcon,
  SparklesIcon,
} from "@/components/ui/icons";
import { Reveal } from "./motion";

const features = [
  {
    icon: SparklesIcon,
    title: "Honest AI guidance",
    description:
      "We tell you if your plan is sound — and what to watch for. No false promises.",
    tint: "from-primary/10 to-primary/5 text-primary",
  },
  {
    icon: BadgeCheckIcon,
    title: "A plan made for you",
    description:
      "Guidance matched to your class, interests and goals — never one-size-fits-all.",
    tint: "from-teal/10 to-teal/5 text-teal",
  },
  {
    icon: IndianRupeeIcon,
    title: "Free for students",
    description: "Completely free guidance. No cost, no catch, ever.",
    tint: "from-amber/15 to-amber/5 text-amber",
  },
  {
    icon: ClockIcon,
    title: "Guidance in minutes",
    description: "A clear direction in the time it takes to finish a chai.",
    tint: "from-primary/10 to-teal/10 text-primary",
  },
];

export function WhyUs() {
  return (
    <section id="why" className="mx-auto w-full max-w-6xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-20">
      <Reveal className="max-w-2xl">
        <span className="text-sm font-medium text-teal">Why Gems Future</span>
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
          Guidance you can actually trust
        </h2>
        <p className="mt-3 text-ink-2">
          Built to be honest, affordable, and genuinely useful for every student.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, index) => {
          const Icon = f.icon;
          return (
            <Reveal key={f.title} delay={index * 0.1}>
              <div className="group h-full rounded-3xl border border-border bg-surface p-6 shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lift">
                <span
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${f.tint} transition-transform duration-300 group-hover:scale-110`}
                >
                  <Icon width={24} height={24} />
                </span>
                <h3 className="mt-4 text-base font-semibold text-ink">{f.title}</h3>
                <p className="mt-2 text-sm text-ink-2">{f.description}</p>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
