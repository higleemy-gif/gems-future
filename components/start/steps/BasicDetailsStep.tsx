import { Input, Select } from "@/components/ui";
import { StepHeader } from "../StepHeader";
import { FieldBlock } from "../FieldBlock";
import { EmojiChipGroup } from "../EmojiChipGroup";
import { MEDIUM_EMOJI, withEmoji } from "../emoji";
import type { StepProps } from "../step-props";
import { MEDIUM_OPTIONS, STATE_OPTIONS, cap } from "../wizard";

const mediumChips = withEmoji(MEDIUM_OPTIONS, MEDIUM_EMOJI);

export function BasicDetailsStep({ answers, update, w }: StepProps) {
  return (
    <>
      <StepHeader
        emoji="✨"
        title={`A few details about ${w.subject}`}
        description="This helps us keep suggestions relevant to where you are."
      />
      <div className="flex flex-col gap-5">
        <Input
          label={cap(`${w.poss} full name`)}
          placeholder="e.g. Aarav Sharma"
          autoComplete="name"
          value={answers.name}
          onChange={(e) => update({ name: e.target.value })}
          className="h-12 rounded-2xl text-base"
          required
        />

        <div className="grid gap-5 sm:grid-cols-2">
          <Select
            label="State"
            placeholder="Select state / UT"
            value={answers.state}
            onChange={(e) => update({ state: e.target.value })}
            className="h-12 rounded-2xl text-base"
            required
          >
            {STATE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </Select>

          <Input
            label="District"
            placeholder="e.g. Pune"
            value={answers.district}
            onChange={(e) => update({ district: e.target.value })}
            className="h-12 rounded-2xl text-base"
          />
        </div>

        <FieldBlock label="Preferred medium">
          <EmojiChipGroup
            aria-label="Preferred medium"
            mode="single"
            options={mediumChips}
            value={answers.medium || null}
            onValueChange={(v) => update({ medium: v ?? "" })}
          />
        </FieldBlock>
      </div>
    </>
  );
}
