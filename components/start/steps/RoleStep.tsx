import { StepHeader } from "../StepHeader";
import { OptionCardGroup } from "../OptionCardGroup";
import { ROLE_EMOJI, type PlayfulOption } from "../emoji";
import type { StepProps } from "../step-props";
import type { Role } from "../wizard";

const options: PlayfulOption[] = [
  {
    value: "student",
    label: "I'm the student",
    description: "You're exploring your own path.",
    emoji: ROLE_EMOJI.student,
  },
  {
    value: "parent",
    label: "I'm a parent",
    description: "You're helping your child decide.",
    emoji: ROLE_EMOJI.parent,
  },
];

export function RoleStep({ answers, update }: StepProps) {
  return (
    <>
      <StepHeader
        emoji="👋"
        title="Who is filling this in?"
        description="This helps us word the questions the right way."
      />
      <OptionCardGroup
        aria-label="Who is filling this in?"
        mode="single"
        allowDeselect={false}
        value={answers.role}
        onValueChange={(v) => update({ role: v as Role | null })}
        options={options}
      />
    </>
  );
}
