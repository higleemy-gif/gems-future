"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { BlurFade } from "@/components/ui/blur-fade";
import { AnimatedList } from "@/components/ui/animated-list";
import { ConfettiButton } from "@/components/ui/confetti";
import { ShimmerButton } from "@/components/ui/shimmer-button";
import { Marquee } from "@/components/ui/marquee";
import { NumberTicker } from "@/components/ui/number-ticker";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { Spotlight } from "@/components/ui/spotlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";

const marqueeItems = ["Deep Blue", "Teal Green", "Amber", "Poppins", "Light"];
const listItems = [
  { title: "New signup", tone: "bg-primary" },
  { title: "Quiz completed", tone: "bg-secondary" },
  { title: "Score updated", tone: "bg-amber" },
  { title: "Message sent", tone: "bg-primary" },
  { title: "Achievement unlocked", tone: "bg-secondary" },
];

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="space-y-3">
      <h2 className="text-xl font-semibold text-ink">{title}</h2>
      {children}
    </section>
  );
}

export default function PreviewPage() {
  return (
    <main className="mx-auto max-w-4xl space-y-12 px-4 py-10">
      <BlurFade inView>
        <header className="space-y-1">
          <h1 className="text-3xl font-semibold text-deep-blue">Component Preview</h1>
          <p className="text-muted-foreground">Gems Future brand theme - Deep Blue, Teal Green, Amber accent, Poppins.</p>
        </header>
      </BlurFade>

      <Section title="Aurora hero (Aceternity)">
        <AuroraBackground showRadialGradient className="h-[320px] rounded-xl">
          <div className="relative z-10 flex flex-col items-center gap-4 text-center">
            <TextGenerateEffect words="Build something brilliant" className="text-ink" />
            <ShimmerButton>Get started</ShimmerButton>
          </div>
        </AuroraBackground>
      </Section>

      <Section title="Spotlight (Aceternity)">
        <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden rounded-xl bg-ink">
          <Spotlight className="-top-40 left-0 md:-top-20 md:left-60" fill="#1E4ED8" />
          <h3 className="z-10 text-2xl font-semibold text-white">Spotlight on brand</h3>
        </div>
      </Section>

      <Section title="Text generate effect (Aceternity)">
        <TextGenerateEffect words="Deep Blue and Teal Green power the Gems Future brand" className="text-ink" />
      </Section>

      <Section title="Buttons, Shimmer and Confetti">
        <div className="flex flex-wrap items-center gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <ShimmerButton>Shimmer</ShimmerButton>
          <ConfettiButton>Confetti</ConfettiButton>
        </div>
      </Section>

      <Section title="Badges">
        <div className="flex flex-wrap gap-3">
          <Badge>Default</Badge>
          <Badge variant="secondary">Secondary</Badge>
          <Badge variant="outline">Outline</Badge>
          <Badge variant="destructive">Destructive</Badge>
        </div>
      </Section>

      <Section title="Marquee (Magic UI)">
        <Marquee pauseOnHover className="[--duration:18s]">
          {marqueeItems.map((item) => (
            <Badge key={item} className="mx-2">{item}</Badge>
          ))}
        </Marquee>
      </Section>

      <Section title="Number ticker (Magic UI)">
        <div className="flex items-end gap-2">
          <NumberTicker value={2024} className="text-4xl font-bold" />
          <span className="text-muted-foreground">brand points</span>
        </div>
      </Section>

      <Section title="Animated list (Magic UI)">
        <AnimatedList className="h-[240px] w-full max-w-md" delay={900}>
          {listItems.map((item) => (
            <div key={item.title} className="flex w-full items-center gap-3 rounded-lg border bg-card p-3 shadow-sm">
              <span className={"h-3 w-3 rounded-full " + item.tone} />
              <span className="text-sm font-medium text-ink">{item.title}</span>
            </div>
          ))}
        </AnimatedList>
      </Section>

      <Section title="Blur fade (Magic UI)">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {["Deep Blue", "Teal Green", "Amber"].map((label, i) => (
            <BlurFade key={label} delay={0.15 * i} inView>
              <div className="rounded-lg border bg-card p-6 text-center text-sm font-medium text-ink shadow-sm">{label}</div>
            </BlurFade>
          ))}
        </div>
      </Section>

      <Section title="Form controls">
        <div className="grid gap-4">
          <Input placeholder="Input field" />
          <Textarea placeholder="Textarea field" />
          <Select>
            <SelectTrigger className="w-full"><SelectValue placeholder="Select an option" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="one">Option one</SelectItem>
              <SelectItem value="two">Option two</SelectItem>
              <SelectItem value="three">Option three</SelectItem>
            </SelectContent>
          </Select>
          <RadioGroup defaultValue="a" className="flex gap-6">
            <label className="flex items-center gap-2"><RadioGroupItem value="a" /> Option A</label>
            <label className="flex items-center gap-2"><RadioGroupItem value="b" /> Option B</label>
          </RadioGroup>
        </div>
      </Section>

      <Section title="Progress">
        <Progress value={60} />
      </Section>

      <Section title="Card">
        <Card>
          <CardHeader>
            <CardTitle>Card title</CardTitle>
            <CardDescription>Card description using muted text.</CardDescription>
          </CardHeader>
          <CardContent><p className="text-sm">Card body content sits here.</p></CardContent>
          <CardFooter className="gap-3">
            <Button>Confirm</Button>
            <Button variant="outline">Cancel</Button>
          </CardFooter>
        </Card>
      </Section>

      <Section title="Brand swatches">
        <div className="flex flex-wrap gap-3">
          <div className="h-16 w-24 rounded-md bg-primary" />
          <div className="h-16 w-24 rounded-md bg-secondary" />
          <div className="h-16 w-24 rounded-md bg-amber" />
          <div className="h-16 w-24 rounded-md border bg-background" />
          <div className="h-16 w-24 rounded-md bg-ink" />
        </div>
      </Section>
    </main>
  );
}
