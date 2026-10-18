import { ButtonLink } from "@/components/ui";
import { ArrowRightIcon } from "@/components/ui/icons";
import { Reveal } from "./motion";

export function FinalCTA() {
  return (
    <section className="mx-auto w-full max-w-6xl px-5 py-10 sm:px-8 sm:py-16">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-primary-pressed via-primary to-teal px-6 py-14 text-center shadow-lift sm:px-12 sm:py-20">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <div className="absolute -left-10 top-0 h-56 w-56 rounded-full bg-white/10 blur-2xl motion-safe:animate-blob" />
            <div className="absolute -right-10 bottom-0 h-64 w-64 rounded-full bg-teal/30 blur-2xl motion-safe:animate-blob-slow" />
            <div className="absolute inset-0 opacity-10 [background-image:radial-gradient(circle_at_30%_30%,white_1px,transparent_1px)] [background-size:22px_22px]" />
          </div>

          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-5xl">
              Your future starts with one honest answer
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-white/85">
              Tell us your plan in your own words. It&apos;s free, takes a few
              minutes, and there&apos;s no wrong answer.
            </p>
            <div className="mt-8 flex justify-center">
              <ButtonLink
                href="/start"
                variant="google"
                size="lg"
                rightIcon={<ArrowRightIcon width={18} height={18} />}
              >
                Start Free Counselling
              </ButtonLink>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
