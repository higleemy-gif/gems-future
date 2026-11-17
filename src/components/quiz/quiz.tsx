"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, type PanInfo } from "motion/react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  ProgressBar,
  Microcopy,
  Heading,
  OptionCard,
  Chip,
  Field,
  NavRow,
  ResultProgress,
} from "./quiz-ui";
import * as D from "./quiz-data";
import { BookingCalendar } from "./booking-calendar";
import { generateAndSaveResult } from "@/app/start/actions";
import { saveBooking } from "@/app/start/actions";

type StepId =
  | "role" | "phone" | "basic" | "stage" | "academic" | "subjects"
  | "interests" | "goal" | "earn" | "situation" | "parent"
  | "result" | "booking" | "contact" | "done";

function buildSteps(a: D.Answers): StepId[] {
  const steps: StepId[] = [
    "role", "phone", "basic", "stage", "academic",
    "subjects", "interests", "goal", "earn", "situation",
  ];
  if (a.role === "parent") steps.push("parent");
  steps.push("result", "booking", "contact", "done");
  return steps;
}

export function Quiz() {
  const [answers, setAnswers] = useState<D.Answers>(D.initialAnswers);
  const [index, setIndex] = useState(0);
  const [result, setResult] = useState<D.QuizResult | null>(null);

  const steps = buildSteps(answers);
  const stepId = steps[Math.min(index, steps.length - 1)];
  const questionSteps = steps.filter(
    (s) =>
      s !== "result" && s !== "booking" && s !== "contact" && s !== "done"
  );
  const isTerminal =
    stepId === "result" ||
    stepId === "booking" ||
    stepId === "contact" ||
    stepId === "done";
  const progress = isTerminal
    ? 1
    : questionSteps.indexOf(stepId) / questionSteps.length;

  const update = (patch: Partial<D.Answers>) =>
    setAnswers((p) => ({ ...p, ...patch }));
  const go = (delta: number) =>
    setIndex((i) => Math.max(0, Math.min(steps.length - 1, i + delta)));
  const next = () => go(1);
  const back = () => go(-1);
  const choose = (patch: Partial<D.Answers>) => {
    update(patch);
    window.setTimeout(() => go(1), 180);
  };
  const toggleIn = (list: string[], value: string) =>
    list.includes(value) ? list.filter((v) => v !== value) : [...list, value];

  const r = answers.role;
  const swipeable = [
    "role", "stage", "goal", "earn", "interests", "subjects",
  ].includes(stepId);

  const completedRef = useRef(false);
  useEffect(() => {
    if (stepId === "result" && !completedRef.current) {
      completedRef.current = true;
      setResult(null);
      generateAndSaveResult(answers)
        .then(setResult)
        .catch(() => setResult(D.getSampleResult(answers)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [stepId]);

  function renderAcademic() {
    const stage = answers.stage;
    const school = stage === "class9_10" || stage === "passed10";
    const plus2 = stage === "class11_12" || stage === "passed12";
    const grad = stage === "in_graduation" || stage === "completed_graduation";
    return (
      <div>
        <Heading title={"A bit about " + D.poss(r) + " studies"} />
        <div className="mt-8 space-y-5">
          {school ? (
            <>
              <Field label="Board">
                <Select value={answers.board} onValueChange={(v) => update({ board: v })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select board" /></SelectTrigger>
                  <SelectContent>{D.boardOptions.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}</SelectContent>
                </Select>
              </Field>
              {answers.board === "Other" ? (
                <Field label="Which board?">
                  <Input placeholder="Type the board name" value={answers.boardOther} onChange={(e) => update({ boardOther: e.target.value })} />
                </Field>
              ) : null}
              <Field label="Class 10 marks (%)">
                <Input placeholder="e.g. 85" value={answers.class10Marks} onChange={(e) => update({ class10Marks: e.target.value })} />
              </Field>
              <Field label="Open to diploma or polytechnic?">
                <div className="flex flex-wrap gap-2">
                  {D.yesNoMaybe.map((y) => (<Chip key={y} label={y} selected={answers.openToDiploma === y} onClick={() => update({ openToDiploma: y })} />))}
                </div>
              </Field>
            </>
          ) : null}
          {plus2 ? (
            <>
              <Field label="Stream">
                <Select value={answers.stream} onValueChange={(v) => update({ stream: v })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select stream" /></SelectTrigger>
                  <SelectContent>{D.streamOptions.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                </Select>
              </Field>
              {answers.stream === "Other" ? (
                <Field label="Which stream?">
                  <Input placeholder="Type the stream" value={answers.streamOther} onChange={(e) => update({ streamOther: e.target.value })} />
                </Field>
              ) : null}
              <Field label="Class 12 marks (%)">
                <Input placeholder="e.g. 78" value={answers.class12Marks} onChange={(e) => update({ class12Marks: e.target.value })} />
              </Field>
              <Field label="Entrance exams">
                <div className="flex flex-wrap gap-2">
                  {D.entranceExamOptions.map((o) => (<Chip key={o.value} label={o.label} selected={answers.entranceExams.includes(o.value)} onClick={() => update({ entranceExams: toggleIn(answers.entranceExams, o.value) })} />))}
                </div>
              </Field>
              {answers.entranceExams.includes("other") ? (
                <Field label="Which other exam?">
                  <Input placeholder="Name the exam" value={answers.entranceOther} onChange={(e) => update({ entranceOther: e.target.value })} />
                </Field>
              ) : null}
              <Field label="Score or rank (optional)">
                <Input placeholder="If you have one" value={answers.scoreRank} onChange={(e) => update({ scoreRank: e.target.value })} />
              </Field>
            </>
          ) : null}
          {grad ? (
            <>
              <Field label="Degree and specialisation">
                <Input placeholder="e.g. B.Com, Marketing" value={answers.degree} onChange={(e) => update({ degree: e.target.value })} />
              </Field>
              <Field label="Year">
                <Input placeholder="e.g. 2nd year or 2026" value={answers.gradYear} onChange={(e) => update({ gradYear: e.target.value })} />
              </Field>
              <Field label="CGPA (optional)">
                <Input placeholder="e.g. 7.8" value={answers.cgpa} onChange={(e) => update({ cgpa: e.target.value })} />
              </Field>
              <Field label="Next step">
                <div className="flex flex-wrap gap-2">
                  {D.nextStepOptions.map((o) => (<Chip key={o.value} label={o.label} selected={answers.nextStep.includes(o.value)} onClick={() => update({ nextStep: toggleIn(answers.nextStep, o.value) })} />))}
                </div>
              </Field>
            </>
          ) : null}
          {!school && !plus2 && !grad ? (
            <>
              <Field label={"What " + D.be(r) + " doing or preparing for?"}>
                <Textarea rows={3} placeholder="Tell us in a line or two" value={answers.preparingFor} onChange={(e) => update({ preparingFor: e.target.value })} />
              </Field>
              <Field label="Previous qualification">
                <Input placeholder="e.g. Passed 12th, 2023" value={answers.previousQualification} onChange={(e) => update({ previousQualification: e.target.value })} />
              </Field>
            </>
          ) : null}
        </div>
        <NavRow onBack={back} onNext={next} />
      </div>
    );
  }

  function renderStep() {
    switch (stepId) {
      case "role":
        return (
          <div>
            <Heading title="Who's filling this in?" subtitle="So we can keep things relevant." />
            <div className="mt-8 grid gap-3">
              {D.roleOptions.map((o) => (<OptionCard key={o.value} label={o.label} selected={answers.role === o.value} onClick={() => choose({ role: o.value as D.Role })} />))}
            </div>
          </div>
        );
      case "phone":
        return (
          <div>
            <Heading title="What's a good number to reach you?" subtitle="We only use it to share the result." />
            <div className="mt-8 space-y-6">
              <Field label="Phone number">
                <Input inputMode="numeric" maxLength={10} placeholder="10-digit mobile number" value={answers.phone} onChange={(e) => update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
              </Field>
              <label className="flex items-start gap-3">
                <input type="checkbox" style={{ accentColor: "#1E4ED8" }} className="mt-0.5 h-4 w-4" checked={answers.consent} onChange={(e) => update({ consent: e.target.checked })} />
                <span className="text-sm leading-relaxed text-muted-foreground">I agree to be contacted about the result.</span>
              </label>
            </div>
            <NavRow onBack={back} onNext={next} nextDisabled={answers.phone.length !== 10 || !answers.consent} />
          </div>
        );
      case "basic":
        return (
          <div>
            <Heading title="Let's get the basics" />
            <div className="mt-8 space-y-5">
              <Field label={r === "parent" ? "Your child's full name" : "Your full name"}>
                <Input placeholder="Full name" value={answers.fullName} onChange={(e) => update({ fullName: e.target.value })} />
              </Field>
              <Field label="State">
                <Select value={answers.state} onValueChange={(v) => update({ state: v })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select state" /></SelectTrigger>
                  <SelectContent>{D.stateOptions.map((s) => (<SelectItem key={s} value={s}>{s}</SelectItem>))}</SelectContent>
                </Select>
              </Field>
              {answers.state === "Other" ? (
                <Field label="Which state?">
                  <Input placeholder="Type your state" value={answers.stateOther} onChange={(e) => update({ stateOther: e.target.value })} />
                </Field>
              ) : null}
              <Field label="District">
                <Input placeholder="District" value={answers.district} onChange={(e) => update({ district: e.target.value })} />
              </Field>
              <Field label="Preferred medium">
                <Select value={answers.medium} onValueChange={(v) => update({ medium: v })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select medium" /></SelectTrigger>
                  <SelectContent>{D.mediumOptions.map((m) => (<SelectItem key={m} value={m}>{m}</SelectItem>))}</SelectContent>
                </Select>
              </Field>
              {answers.medium === "Other" ? (
                <Field label="Which medium?">
                  <Input placeholder="Type your preferred medium" value={answers.mediumOther} onChange={(e) => update({ mediumOther: e.target.value })} />
                </Field>
              ) : null}
            </div>
            <NavRow onBack={back} onNext={next} nextDisabled={!answers.fullName || !answers.state || (answers.state === "Other" && !answers.stateOther.trim())} />
          </div>
        );
      case "stage":
        return (
          <div>
            <Heading title={"Where " + D.be(r) + " right now?"} subtitle="Pick what fits best." />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {D.stageOptions.map((o) => (<OptionCard key={o.value} label={o.label} selected={answers.stage === o.value} onClick={() => choose({ stage: o.value as D.Stage })} />))}
            </div>
          </div>
        );
      case "academic":
        return renderAcademic();
      case "subjects":
        return (
          <div>
            <Heading title={"Pick " + D.poss(r) + " favourite subjects"} subtitle="Choose as many as you like." />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {D.subjectOptions.map((o) => (
                <Chip
                  key={o.value}
                  label={o.label}
                  selected={answers.favouriteSubjects.includes(o.value)}
                  onClick={() => {
                    const list = toggleIn(answers.favouriteSubjects, o.value);
                    update({ favouriteSubjects: list });
                    if (o.value === "other" && !list.includes("other")) {
                      update({ subjectsOther: "" });
                    }
                  }}
                />
              ))}
            </div>
            {answers.favouriteSubjects.includes("other") ? (
              <div className="mt-5">
                <Field label="Which other subjects?">
                  <Input placeholder="Type any other subjects" value={answers.subjectsOther} onChange={(e) => update({ subjectsOther: e.target.value })} />
                </Field>
              </div>
            ) : null}
            <NavRow onBack={back} onNext={next} />
          </div>
        );
      case "interests":
        return (
          <div>
            <Heading title={"What are " + D.poss(r) + " interests?"} subtitle="Tap all that apply." />
            <div className="mt-8 flex flex-wrap gap-2.5">
              {D.interestAreaOptions.map((o) => (
                <Chip
                  key={o.value}
                  label={o.label}
                  selected={answers.interestAreas.includes(o.value)}
                  onClick={() => {
                    const list = toggleIn(answers.interestAreas, o.value);
                    update({ interestAreas: list });
                    if (o.value === "other" && !list.includes("other")) {
                      update({ interestsOther: "" });
                    }
                  }}
                />
              ))}
            </div>
            {answers.interestAreas.includes("other") ? (
              <div className="mt-5">
                <Field label="Which other interests?">
                  <Input placeholder="Type any other interest" value={answers.interestsOther} onChange={(e) => update({ interestsOther: e.target.value })} />
                </Field>
              </div>
            ) : null}
            <NavRow onBack={back} onNext={next} />
          </div>
        );
      case "goal":
        return (
          <div>
            <Heading title={"What's " + D.poss(r) + " main goal?"} />
            <div className="mt-8 grid gap-3">
              {D.goalOptions.map((o) => (<OptionCard key={o.value} label={o.label} selected={answers.mainGoal === o.value} onClick={() => choose({ mainGoal: o.value })} />))}
            </div>
          </div>
        );
      case "earn":
        return (
          <div>
            <Heading title={"How soon " + D.doesWord(r) + " want to start earning?"} />
            <div className="mt-8 grid gap-3">
              {D.earnOptions.map((o) => (<OptionCard key={o.value} label={o.label} selected={answers.earnTimeline === o.value} onClick={() => choose({ earnTimeline: o.value })} />))}
            </div>
          </div>
        );
      case "situation":
        return (
          <div>
            <Heading title={"Tell us " + D.poss(r) + " situation, in " + D.poss(r) + " own words"} subtitle="Say it however you want. There are no right answers here." />
            <div className="mt-8">
              <Textarea rows={6} placeholder="Start typing..." value={answers.situationText} onChange={(e) => update({ situationText: e.target.value })} />
            </div>
            <NavRow onBack={back} onNext={next} nextLabel={r === "parent" ? "Continue" : "See the result"} />
          </div>
        );
      case "parent":
        return (
          <div>
            <Heading title="A couple of parent questions" subtitle="This helps us guide better." />
            <div className="mt-8 space-y-5">
              <Field label="Your hopes or concerns">
                <Textarea rows={4} placeholder="What are you hoping for? Any worries?" value={answers.parentHopes} onChange={(e) => update({ parentHopes: e.target.value })} />
              </Field>
              <Field label="Budget range">
                <Select value={answers.budget} onValueChange={(v) => update({ budget: v })}>
                  <SelectTrigger className="w-full"><SelectValue placeholder="Select a range" /></SelectTrigger>
                  <SelectContent>{D.budgetOptions.map((b) => (<SelectItem key={b} value={b}>{b}</SelectItem>))}</SelectContent>
                </Select>
              </Field>
            </div>
            <NavRow onBack={back} onNext={next} nextLabel="See the result" />
          </div>
        );
      case "result": {
        if (!result) {
          return (
            <div className="min-h-[40vh]">
              <ResultProgress />
            </div>
          );
        }
        return (
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Sample result</span>
              <h1 className="text-[1.65rem] font-semibold leading-[1.15] tracking-tight text-ink sm:text-[2.1rem]">{result.verdict}</h1>
              <p className="leading-relaxed text-muted-foreground">{result.summary}</p>
            </div>
            <div className="space-y-5">
              <p className="text-sm font-medium text-ink">Your path</p>
              <ol className="space-y-5">
                {result.path.map((p, i) => (<li key={p.title} className="flex gap-4"><span className="pt-0.5 text-sm font-semibold tabular-nums text-primary">{"0" + (i + 1)}</span><div><p className="font-medium text-ink">{p.title}</p><p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.desc}</p></div></li>))}
              </ol>
            </div>
            <div className="space-y-3">
              <p className="text-sm font-medium text-ink">Recommended next</p>
              <div className="overflow-hidden rounded-xl border">
                {result.recommendations.map((rec, i) => (<div key={rec.title} className={cn("flex items-center justify-between gap-4 p-4", i > 0 && "border-t")}><div><p className="font-medium text-ink">{rec.title}</p><p className="mt-0.5 text-xs text-muted-foreground">{rec.mode + " \u00B7 " + rec.price}</p></div><Button variant="ghost" size="sm">{rec.cta}</Button></div>))}
              </div>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">A sample for preview. The personalised plan will appear here.</p>
            <NavRow onBack={back} onNext={next} nextLabel="Continue" />
          </div>
        );
      }
      case "booking": {
        const canConfirm = Boolean(answers.bookingDate && answers.bookingTime);
        return (
          <div>
            <Heading title="Want a 1-to-1 session with a counsellor?" subtitle="Pick a day and time that suits you. This step is optional." />
            <div className="mt-8 space-y-6">
              <BookingCalendar value={answers.bookingDate} onChange={(d) => update({ bookingDate: d })} />
              {answers.bookingDate ? (
                <>
                  <Field label="Time">
                    <div className="flex flex-wrap gap-2">
                      {D.timeSlotOptions.map((s) => (<Chip key={s} label={s} selected={answers.bookingTime === s} onClick={() => update({ bookingTime: s })} />))}
                    </div>
                  </Field>
                  <Field label="How would you like to meet?">
                    <div className="flex flex-wrap gap-2">
                      {D.sessionModeOptions.map((m) => (<Chip key={m} label={m} selected={answers.bookingMode === m} onClick={() => update({ bookingMode: m })} />))}
                    </div>
                  </Field>
                  {canConfirm ? (<div className="rounded-xl border p-4"><p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Your session</p><p className="mt-2 text-sm font-medium text-ink">{D.formatBookingDate(answers.bookingDate) + " at " + answers.bookingTime}</p>{answers.bookingMode ? (<p className="mt-1 text-sm text-muted-foreground">{answers.bookingMode}</p>) : null}</div>) : null}
                </>
              ) : null}
            </div>
            <NavRow
              onBack={back}
              onNext={() => {
                if (canConfirm) void saveBooking(answers);
                next();
              }}
              nextLabel={canConfirm ? "Confirm session" : "Skip for now"}
            />
          </div>
        );
      }
      case "contact":
        return (
          <div>
            <Heading title="Want us to follow up?" subtitle="Optional. Skip anything you like." />
            <div className="mt-8 space-y-5">
              <Field label="Parent or guardian name"><Input placeholder="Name" value={answers.parentName} onChange={(e) => update({ parentName: e.target.value })} /></Field>
              <Field label="Alternate number"><Input inputMode="numeric" placeholder="10-digit number" value={answers.altNumber} onChange={(e) => update({ altNumber: e.target.value.replace(/\D/g, "").slice(0, 10) })} /></Field>
              <Field label="Email"><Input type="email" placeholder="you@example.com" value={answers.email} onChange={(e) => update({ email: e.target.value })} /></Field>
              <Field label="Address"><Textarea rows={3} placeholder="Where are you based?" value={answers.address} onChange={(e) => update({ address: e.target.value })} /></Field>
            </div>
            <NavRow onBack={back} onNext={next} nextLabel="Finish" />
          </div>
        );
      case "done": {
        const goalLabel = D.goalOptions.find((o) => o.value === answers.mainGoal)?.label;
        const stageLabel = D.stageOptions.find((o) => o.value === answers.stage)?.label;
        return (
          <div className="space-y-8">
            <div className="space-y-3">
              <h1 className="text-[1.65rem] font-semibold tracking-tight text-ink sm:text-[2.1rem]">{"You're all set"}</h1>
              <p className="leading-relaxed text-muted-foreground">{(answers.fullName ? "Thanks, " + answers.fullName + ". " : "Thanks. ") + "We've saved your answers. Your counsellor will take it from here."}</p>
            </div>
            <div className="space-y-3 rounded-xl border p-5 text-sm">
              <div className="flex justify-between gap-4"><span className="text-muted-foreground">Role</span><span className="font-medium text-ink">{answers.role === "parent" ? "Parent" : "Student"}</span></div>
              {stageLabel ? (<div className="flex justify-between gap-4"><span className="text-muted-foreground">Stage</span><span className="font-medium text-ink">{stageLabel}</span></div>) : null}
              {goalLabel ? (<div className="flex justify-between gap-4"><span className="text-muted-foreground">Goal</span><span className="font-medium text-ink">{goalLabel}</span></div>) : null}
              {answers.bookingDate && answers.bookingTime ? (<div className="flex justify-between gap-4"><span className="text-muted-foreground">Session</span><span className="font-medium text-ink">{D.formatBookingDate(answers.bookingDate) + " at " + answers.bookingTime}</span></div>) : null}
            </div>
            <Link href="/" className="inline-block"><Button variant="outline">Back to home</Button></Link>
          </div>
        );
      }
      default:
        return null;
    }
  }

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-lg flex-col px-5 py-8 sm:px-6 sm:py-10">
      <div className="space-y-4">
        <ProgressBar value={progress} />
        <Microcopy text={D.microcopy[stepId]} />
      </div>
      <div className="flex-1 pt-12 sm:pt-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={stepId}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.22, 0.61, 0.36, 1] }}
            drag={swipeable ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.12}
            onDragEnd={(_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
              if (info.offset.x < -90) next();
              else if (info.offset.x > 90) back();
            }}
            className="w-full"
          >
            {renderStep()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
