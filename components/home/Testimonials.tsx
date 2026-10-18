import { cn } from "@/lib/cn";
import { StarIcon } from "@/components/ui/icons";
import { Reveal } from "./motion";

type Quote = {
  name: string;
  place: string;
  quote: string;
  tint: string;
};

const quotes: Quote[] = [
  {
    name: "Priya",
    place: "Patna",
    quote:
      "I was lost after 12th. Gems Future showed me an affordable B.Sc path I didn't know existed.",
    tint: "bg-primary",
  },
  {
    name: "Rohit",
    place: "Nagpur",
    quote:
      "Honest advice, no sales pitch. It told me a skill course made more sense than a costly degree.",
    tint: "bg-teal",
  },
  {
    name: "Mrs. Khan",
    place: "Hyderabad",
    quote:
      "As a parent, I finally understood the options and the costs. Very reassuring.",
    tint: "bg-primary-pressed",
  },
  {
    name: "Arjun",
    place: "Indore",
    quote: "It helped me choose a direction I actually feel confident about.",
    tint: "bg-teal",
  },
  {
    name: "Sneha",
    place: "Kochi",
    quote: "Simple questions, a clear answer. The whole thing took ten minutes.",
    tint: "bg-primary",
  },
  {
    name: "Kabir",
    place: "Jaipur",
    quote: "The path felt made for me, not some generic list.",
    tint: "bg-amber",
  },
];

export function Testimonials() {
  return (
    <section className="overflow-hidden py-16 sm:py-20">
      <div className="mx-auto w-full max-w-6xl px-5 sm:px-8">
        <Reveal className="max-w-2xl">
          <span className="text-sm font-medium text-teal">Student stories</span>
          <h2 className="mt-2 text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            Loved by students and parents
          </h2>
        </Reveal>
      </div>

      {/* Auto-scrolling marquee. Track is duplicated so it loops seamlessly;
          pauses on hover and stops entirely under reduced-motion. */}
      <div className="group relative mt-10">
        {/* edge fades */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-bg to-transparent" />
        <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-bg to-transparent" />

        <div className="flex w-max motion-safe:animate-marquee group-hover:[animation-play-state:paused]">
          {[0, 1].map((dup) => (
            <ul
              key={dup}
              aria-hidden={dup === 1}
              className="flex shrink-0 items-stretch gap-5 pr-5"
            >
              {quotes.map((q) => (
                <li key={`${dup}-${q.name}`} className="w-[300px] shrink-0 sm:w-[360px]">
                  <figure className="flex h-full flex-col rounded-3xl border border-border bg-surface p-6 shadow-soft">
                    <div className="flex items-center gap-1 text-amber">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <StarIcon key={i} width={15} height={15} />
                      ))}
                    </div>
                    <blockquote className="mt-3 flex-1 text-sm text-ink">
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <span
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold text-white",
                          q.tint,
                        )}
                      >
                        {q.name.charAt(0)}
                      </span>
                      <span className="text-sm">
                        <span className="block font-medium text-ink">{q.name}</span>
                        <span className="block text-xs text-muted">{q.place}</span>
                      </span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
