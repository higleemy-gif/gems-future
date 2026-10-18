import { ButtonLink } from "@/components/ui";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CheckIcon,
  GraduationCapIcon,
} from "@/components/ui/icons";
import { Reveal } from "./motion";

const degreePath = [
  "A recognised degree in your field",
  "A clear, step-by-step plan to get there",
  "Options that fit your budget",
];

const skillPath = [
  "Job-ready skill courses, many free",
  "Certifications employers recognise",
  "Start earning sooner, study alongside",
];

export function CareerPaths() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-6 sm:px-8 sm:py-10">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary via-primary to-teal p-7 shadow-lift sm:p-12">
          {/* soft depth shapes */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -right-10 -top-10 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
            <div className="absolute -bottom-16 left-10 h-56 w-56 rounded-full bg-teal/30 blur-2xl" />
          </div>

          <div className="relative max-w-2xl">
            <h2 className="text-2xl font-semibold leading-tight tracking-tight text-white sm:text-4xl">
              Not sure between a degree and a skill? We guide you to both.
            </h2>
            <p className="mt-3 max-w-xl text-sm text-white/80 sm:text-base">
              There&apos;s no single right answer. We help you weigh both honestly
              and pick what fits your goals and budget.
            </p>
          </div>

          <div className="relative mt-8 grid gap-4 sm:grid-cols-2">
            <PathCard
              title="Degree path"
              icon={<GraduationCapIcon width={22} height={22} />}
              items={degreePath}
            />
            <PathCard
              title="Skill path"
              icon={<BriefcaseIcon width={22} height={22} />}
              items={skillPath}
            />
          </div>

          <div className="relative mt-7">
            <ButtonLink
              href="/start"
              variant="google"
              size="lg"
              rightIcon={<ArrowRightIcon width={18} height={18} />}
            >
              Find your path
            </ButtonLink>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function PathCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: string[];
}) {
  return (
    <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
      <div className="flex items-center gap-3 text-white">
        <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
          {icon}
        </span>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2.5 text-sm text-white/90">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white/20">
              <CheckIcon width={13} height={13} className="text-white" />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
