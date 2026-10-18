import { Input, Textarea } from "@/components/ui";
import { StepHeader } from "../StepHeader";
import { FieldBlock } from "../FieldBlock";
import { OptionCardGroup } from "../OptionCardGroup";
import { EmojiChipGroup } from "../EmojiChipGroup";
import {
  BOARD_EMOJI,
  ENTRANCE_EMOJI,
  NEXT_STEP_EMOJI,
  PLUS2_STREAM_EMOJI,
  SCHOOL_STREAM_EMOJI,
  YES_MAYBE_NO_EMOJI,
  withEmoji,
} from "../emoji";
import type { StepProps } from "../step-props";
import {
  BOARD_OPTIONS,
  ENTRANCE_EXAM_OPTIONS,
  NEXT_STEP_OPTIONS,
  PLUS2_STREAM_OPTIONS,
  SCHOOL_STREAM_LEAN_OPTIONS,
  YES_MAYBE_NO_OPTIONS,
  stageCategory,
} from "../wizard";

const INPUT_CLASS = "h-12 rounded-2xl text-base";

const boardCards = withEmoji(BOARD_OPTIONS, BOARD_EMOJI);
const schoolStreamCards = withEmoji(SCHOOL_STREAM_LEAN_OPTIONS, SCHOOL_STREAM_EMOJI);
const diplomaChips = withEmoji(YES_MAYBE_NO_OPTIONS, YES_MAYBE_NO_EMOJI);
const plus2StreamCards = withEmoji(PLUS2_STREAM_OPTIONS, PLUS2_STREAM_EMOJI);
const entranceChips = withEmoji(ENTRANCE_EXAM_OPTIONS, ENTRANCE_EMOJI);
const nextStepCards = withEmoji(NEXT_STEP_OPTIONS, NEXT_STEP_EMOJI);

export function AcademicStep({ answers, updateAcademic, w }: StepProps) {
  if (!answers.stage) return null;
  const category = stageCategory(answers.stage);
  const a = answers.academic;

  return (
    <>
      <StepHeader
        emoji="📚"
        title={`${w.isParent ? "Your child's" : "Your"} studies`}
        description="A few details about where things stand academically. All optional."
      />

      <div className="flex flex-col gap-6">
        {category === "school" ? (
          <>
            <FieldBlock label="Board">
              <OptionCardGroup
                aria-label="Board"
                mode="single"
                options={boardCards}
                value={a.board || null}
                onValueChange={(v) => updateAcademic({ board: v ?? "" })}
              />
            </FieldBlock>

            <Input
              label="Class 10 marks"
              placeholder="e.g. 85% or 9.2 CGPA"
              value={a.class10Marks}
              onChange={(e) => updateAcademic({ class10Marks: e.target.value })}
              className={INPUT_CLASS}
            />

            <FieldBlock label="Which stream are you leaning towards?">
              <OptionCardGroup
                aria-label="Stream leaning"
                mode="single"
                options={schoolStreamCards}
                value={a.streamLeaning}
                onValueChange={(v) => updateAcademic({ streamLeaning: v })}
              />
            </FieldBlock>

            <FieldBlock label="Open to a diploma or skill course?">
              <EmojiChipGroup
                aria-label="Open to diploma"
                mode="single"
                options={diplomaChips}
                value={a.openToDiploma}
                onValueChange={(v) => updateAcademic({ openToDiploma: v })}
              />
            </FieldBlock>
          </>
        ) : null}

        {category === "plus2" ? (
          <>
            <FieldBlock label="Stream">
              <OptionCardGroup
                aria-label="Stream"
                mode="single"
                options={plus2StreamCards}
                value={a.stream}
                onValueChange={(v) => updateAcademic({ stream: v })}
              />
            </FieldBlock>

            <Input
              label="Class 12 marks (or expected)"
              placeholder="e.g. 78% or predicted"
              value={a.class12Marks}
              onChange={(e) => updateAcademic({ class12Marks: e.target.value })}
              className={INPUT_CLASS}
            />

            <FieldBlock
              label="Entrance exams you're considering"
              hint="Pick any that apply."
            >
              <EmojiChipGroup
                aria-label="Entrance exams"
                mode="multi"
                options={entranceChips}
                value={a.entranceExams}
                onValueChange={(v) => updateAcademic({ entranceExams: v })}
              />
            </FieldBlock>

            {a.entranceExams.includes("other") ? (
              <Input
                label="Other exam(s)"
                placeholder="Name the exam(s)"
                value={a.entranceOther}
                onChange={(e) =>
                  updateAcademic({ entranceOther: e.target.value })
                }
                className={INPUT_CLASS}
              />
            ) : null}

            <Input
              label="Best score so far (optional)"
              placeholder="e.g. mock rank, percentile, marks"
              value={a.score}
              onChange={(e) => updateAcademic({ score: e.target.value })}
              className={INPUT_CLASS}
            />
          </>
        ) : null}

        {category === "graduation" ? (
          <>
            <Input
              label="Degree & specialisation"
              placeholder="e.g. B.Com (Accounting), B.Tech (Mechanical)"
              value={a.degree}
              onChange={(e) => updateAcademic({ degree: e.target.value })}
              className={INPUT_CLASS}
            />

            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                label="Year"
                placeholder="e.g. 2nd year / final year"
                value={a.gradYear}
                onChange={(e) => updateAcademic({ gradYear: e.target.value })}
                className={INPUT_CLASS}
              />
              <Input
                label="CGPA / marks"
                placeholder="e.g. 7.8 CGPA or 72%"
                value={a.cgpa}
                onChange={(e) => updateAcademic({ cgpa: e.target.value })}
                className={INPUT_CLASS}
              />
            </div>

            <FieldBlock label="What's the next step you have in mind?">
              <OptionCardGroup
                aria-label="Next step"
                mode="single"
                options={nextStepCards}
                value={a.nextStep}
                onValueChange={(v) => updateAcademic({ nextStep: v })}
              />
            </FieldBlock>
          </>
        ) : null}

        {category === "diplomaDropper" ? (
          <>
            <Textarea
              label="What are you doing right now?"
              placeholder="e.g. 2nd year ITI (Electrician), or dropping to prepare for NEET"
              value={a.currentlyDoing}
              onChange={(e) =>
                updateAcademic({ currentlyDoing: e.target.value })
              }
              rows={3}
              className="rounded-2xl"
            />
            <Input
              label="Previous qualification"
              placeholder="e.g. Passed Class 12 (Science), 2023"
              value={a.previousQualification}
              onChange={(e) =>
                updateAcademic({ previousQualification: e.target.value })
              }
              className={INPUT_CLASS}
            />
          </>
        ) : null}
      </div>
    </>
  );
}
