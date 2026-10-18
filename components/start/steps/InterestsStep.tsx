import { Textarea } from "@/components/ui";
import { StepHeader } from "../StepHeader";
import { FieldBlock } from "../FieldBlock";
import { OptionCardGroup } from "../OptionCardGroup";
import { EmojiChipGroup } from "../EmojiChipGroup";
import {
  EARN_SOON_EMOJI,
  INTEREST_AREA_EMOJI,
  MAIN_GOAL_EMOJI,
  SUBJECT_EMOJI,
  withEmoji,
} from "../emoji";
import type { StepProps } from "../step-props";
import {
  EARN_SOON_OPTIONS,
  INTEREST_AREA_OPTIONS,
  MAIN_GOAL_OPTIONS,
  SUBJECT_OPTIONS,
} from "../wizard";

const subjectChips = withEmoji(SUBJECT_OPTIONS, SUBJECT_EMOJI);
const interestCards = withEmoji(INTEREST_AREA_OPTIONS, INTEREST_AREA_EMOJI);
const goalCards = withEmoji(MAIN_GOAL_OPTIONS, MAIN_GOAL_EMOJI);
const earnChips = withEmoji(EARN_SOON_OPTIONS, EARN_SOON_EMOJI);

export function InterestsStep({ answers, updateInterests, w }: StepProps) {
  const i = answers.interests;

  return (
    <>
      <StepHeader
        emoji="🎯"
        title="Interests & goals"
        description={`What ${w.subject} enjoy, and where ${w.subject} want to head.`}
      />

      <div className="flex flex-col gap-6">
        <FieldBlock label="Favourite subjects" hint="Pick any that apply.">
          <EmojiChipGroup
            aria-label="Favourite subjects"
            mode="multi"
            options={subjectChips}
            value={i.favouriteSubjects}
            onValueChange={(v) => updateInterests({ favouriteSubjects: v })}
          />
        </FieldBlock>

        <FieldBlock label="Interest areas" hint="Pick any that apply.">
          <OptionCardGroup
            aria-label="Interest areas"
            mode="multi"
            options={interestCards}
            value={i.interestAreas}
            onValueChange={(v) => updateInterests({ interestAreas: v })}
          />
        </FieldBlock>

        <FieldBlock label="Main goal">
          <OptionCardGroup
            aria-label="Main goal"
            mode="single"
            layout="list"
            options={goalCards}
            value={i.mainGoal || null}
            onValueChange={(v) => updateInterests({ mainGoal: v ?? "" })}
          />
        </FieldBlock>

        <FieldBlock
          label={`How soon ${w.isParent ? "should your child" : "do you want to"} start earning?`}
        >
          <EmojiChipGroup
            aria-label="How soon to start earning"
            mode="single"
            options={earnChips}
            value={i.earnSoon}
            onValueChange={(v) => updateInterests({ earnSoon: v })}
          />
        </FieldBlock>

        <div className="rounded-2xl border-2 border-dashed border-primary/30 bg-soft-blue/40 p-4 sm:p-5">
          <Textarea
            label={`Tell us ${w.poss} situation in your own words`}
            hint="Write freely — this is the most useful part. There are no wrong answers."
            placeholder={
              w.isParent
                ? "e.g. My daughter finished Class 12 (Commerce). We can't afford an expensive course. She likes design but we're not sure it pays..."
                : "e.g. I finished Class 12 (Commerce). I can't afford an expensive course. I like design but I'm not sure it pays..."
            }
            rows={5}
            value={i.situation}
            onChange={(e) => updateInterests({ situation: e.target.value })}
            className="rounded-2xl bg-surface text-base"
            required
          />
          <p className="mt-2 text-sm font-medium text-primary">
            Say it however you want — no right answers here 💬
          </p>
        </div>

        {/* Parent-only extra questions. */}
        {w.isParent ? (
          <div className="flex flex-col gap-6 rounded-2xl border border-border bg-soft-amber p-4 sm:p-5">
            <p className="flex items-center gap-2 text-sm font-semibold text-ink">
              <span aria-hidden="true">💛</span>A couple of questions just for
              parents
            </p>
            <Textarea
              containerClassName="gap-1.5"
              label="Your hopes and concerns for your child"
              placeholder="e.g. I want a stable career for them, but I'm worried about job prospects and cost."
              rows={3}
              value={i.parentHopes}
              onChange={(e) => updateInterests({ parentHopes: e.target.value })}
              className="rounded-2xl"
            />
            <Textarea
              label="Rough budget you have in mind"
              hint="Optional — a range is fine. Helps us suggest affordable options."
              placeholder="e.g. Up to Rs. 50,000 per year"
              rows={2}
              value={i.parentBudget}
              onChange={(e) => updateInterests({ parentBudget: e.target.value })}
              className="rounded-2xl"
            />
          </div>
        ) : null}
      </div>
    </>
  );
}
