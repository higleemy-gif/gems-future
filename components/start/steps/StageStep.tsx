import { StepHeader } from "../StepHeader";
import { OptionCardGroup } from "../OptionCardGroup";
import { STAGE_EMOJI, withEmoji } from "../emoji";
import type { StepProps } from "../step-props";
import { STAGE_OPTIONS, type Stage } from "../wizard";

const stageCards = withEmoji(STAGE_OPTIONS, STAGE_EMOJI);

export function StageStep({ answers, update, w }: StepProps) {
  return (
    <>
      <StepHeader
        emoji="📍"
        title={`Where ${w.isParent ? "is your child" : "are you"} right now?`}
        description="This is the most important question — it decides what we ask next."
      />
      <OptionCardGroup
        aria-label="Current stage"
        mode="single"
        allowDeselect={false}
        value={answers.stage}
        onValueChange={(v) => update({ stage: (v || null) as Stage | null })}
        options={stageCards}
      />
    </>
  );
}
