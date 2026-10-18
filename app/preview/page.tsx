"use client";

/**
 * TEMPORARY design-system preview.
 *
 * ⚠️  DELETE THIS FOLDER (app/preview) BEFORE LAUNCH.
 * It renders every UI-kit component so we can review the design system in one
 * place. It is not linked from anywhere and is set to noindex (see layout).
 */

import { useState } from "react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Chip,
  ChipGroup,
  Input,
  ProgressStepper,
  Select,
  Textarea,
  type ChipOption,
} from "@/components/ui";
import { InfoIcon } from "@/components/ui/icons";

const streamOptions: ChipOption[] = [
  { label: "Science", value: "science" },
  { label: "Commerce", value: "commerce" },
  { label: "Arts / Humanities", value: "arts" },
  { label: "Vocational", value: "vocational" },
];

const interestOptions: ChipOption[] = [
  { label: "Coding", value: "coding" },
  { label: "Design", value: "design" },
  { label: "Medicine", value: "medicine" },
  { label: "Business", value: "business" },
  { label: "Teaching", value: "teaching" },
  { label: "Law", value: "law" },
];

const steps = [
  { label: "About you", description: "Class & location" },
  { label: "Your plan", description: "In your words" },
  { label: "Review", description: "AI check" },
  { label: "Results", description: "Your path" },
];

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-display text-xl font-semibold text-ink">{title}</h2>
        {description ? <p className="text-sm text-ink-2">{description}</p> : null}
      </div>
      <div className="rounded-2xl border border-border bg-surface p-5 sm:p-6">
        {children}
      </div>
    </section>
  );
}

export default function PreviewPage() {
  const [stream, setStream] = useState<string | null>("science");
  const [interests, setInterests] = useState<string[]>(["coding", "design"]);
  const [current, setCurrent] = useState(1);
  const [loading, setLoading] = useState(false);

  return (
    <main className="mx-auto max-w-3xl px-gutter py-10">
      {/* Delete-before-launch banner */}
      <div className="mb-8 flex items-start gap-3 rounded-2xl border border-warning/30 bg-warning-soft px-4 py-3">
        <Badge variant="warning">Temporary</Badge>
        <p className="text-sm text-ink-2">
          This is a design-system preview for review only. Delete the{" "}
          <code className="rounded bg-surface px-1 py-0.5 text-xs text-ink">
            app/preview
          </code>{" "}
          folder before launch. It is set to noindex and isn&apos;t linked
          anywhere.
        </p>
      </div>

      <header className="mb-10 flex flex-col gap-2">
        <h1 className="font-display text-3xl font-semibold text-ink">
          Gems Future — UI Kit
        </h1>
        <p className="text-ink-2">
          Reusable components built on the brand tokens. Light theme, mobile
          first.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        <Section
          title="Buttons"
          description="Blue is reserved for interactive elements. Google variant for OAuth sign-in."
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="google">Continue with Google</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button disabled>Disabled</Button>
              <Button
                isLoading={loading}
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => setLoading(false), 1500);
                }}
              >
                {loading ? "Working…" : "Click to load"}
              </Button>
              <Button variant="primary" fullWidth>
                Full width
              </Button>
            </div>
          </div>
        </Section>

        <Section
          title="Text inputs"
          description="Input, Select and Textarea share labels, hints and error states."
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <Input
              label="Full name"
              placeholder="e.g. Aarav Sharma"
              hint="As it appears on school records."
            />
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              required
            />
            <Input
              label="Phone"
              placeholder="10-digit number"
              error="Enter a valid 10-digit mobile number."
            />
            <Select
              label="Current class"
              placeholder="Select your class"
              required
            >
              <option value="9">Class 9</option>
              <option value="10">Class 10</option>
              <option value="11">Class 11</option>
              <option value="12">Class 12</option>
              <option value="grad">Graduate</option>
            </Select>
            <Textarea
              containerClassName="sm:col-span-2"
              label="Tell us your plan, in your own words"
              placeholder="e.g. I want to become a software engineer after Class 12. I like building apps…"
              hint="Write freely. There are no wrong answers."
              rows={4}
            />
          </div>
        </Section>

        <Section
          title="Chips — single select"
          description="Behaves like a radio group — one choice at a time."
        >
          <div className="flex flex-col gap-3">
            <ChipGroup
              aria-label="Preferred stream"
              mode="single"
              options={streamOptions}
              value={stream}
              onValueChange={setStream}
            />
            <p className="text-sm text-ink-2">
              Selected: <span className="font-medium text-ink">{stream ?? "none"}</span>
            </p>
          </div>
        </Section>

        <Section
          title="Chips — multi select"
          description="Independent toggles for picking several options."
        >
          <div className="flex flex-col gap-3">
            <ChipGroup
              aria-label="Areas of interest"
              mode="multi"
              options={interestOptions}
              value={interests}
              onValueChange={setInterests}
            />
            <p className="text-sm text-ink-2">
              Selected:{" "}
              <span className="font-medium text-ink">
                {interests.length ? interests.join(", ") : "none"}
              </span>
            </p>
            <div>
              <Chip selected hideCheck>
                Standalone chip (selected, no check)
              </Chip>
            </div>
          </div>
        </Section>

        <Section
          title="Progress stepper"
          description="Shows where a student is in a multi-step flow."
        >
          <div className="flex flex-col gap-5">
            <ProgressStepper
              steps={steps}
              current={current}
              aria-label="Counselling progress"
            />
            <div className="flex gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCurrent((c) => Math.max(0, c - 1))}
                disabled={current === 0}
              >
                Back
              </Button>
              <Button
                size="sm"
                onClick={() =>
                  setCurrent((c) => Math.min(steps.length - 1, c + 1))
                }
                disabled={current === steps.length - 1}
              >
                Next
              </Button>
            </div>
          </div>
        </Section>

        <Section
          title="Status badges"
          description="Every status pairs color with an icon — never color alone."
        >
          <div className="flex flex-wrap gap-3">
            <Badge variant="success">On track</Badge>
            <Badge variant="warning">Needs consent</Badge>
            <Badge variant="error">Not a good fit</Badge>
            <Badge variant="info">AI suggestion</Badge>
          </div>
        </Section>

        <Section
          title="Card"
          description="Neutral surface container with header, content and footer."
        >
          <Card className="max-w-md">
            <CardHeader>
              <div className="flex items-center justify-between gap-2">
                <CardTitle>B.Sc. Computer Science</CardTitle>
                <Badge variant="info">Affordable</Badge>
              </div>
              <CardDescription>
                Government College • Fees under ₹30,000 / year
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="flex items-start gap-2 text-sm text-ink-2">
                <InfoIcon
                  width={16}
                  height={16}
                  className="mt-0.5 shrink-0 text-info"
                />
                A solid, low-cost route into software roles. Pulled from our
                database — never invented by the AI.
              </p>
            </CardContent>
            <CardFooter>
              <Button size="sm">View details</Button>
              <Button variant="ghost" size="sm">
                Save
              </Button>
            </CardFooter>
          </Card>
        </Section>
      </div>
    </main>
  );
}
