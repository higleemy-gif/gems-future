import { Input, Textarea } from "@/components/ui";
import { InfoIcon } from "@/components/ui/icons";
import { StepHeader } from "../StepHeader";
import type { StepProps } from "../step-props";

const INPUT_CLASS = "h-12 rounded-2xl text-base";

export function ContactStep({ answers, updateContact }: StepProps) {
  const c = answers.contact;

  return (
    <>
      <StepHeader
        emoji="📬"
        title="Where should we follow up?"
        description="All optional — share only what you're comfortable with."
      />

      {answers.interestedIn ? (
        <div className="mb-5 flex items-start gap-2 rounded-2xl border border-info/30 bg-info-soft px-3 py-2.5">
          <InfoIcon width={16} height={16} className="mt-0.5 shrink-0 text-info" />
          <p className="text-sm text-ink-2">
            Registering interest in:{" "}
            <span className="font-medium text-ink">{answers.interestedIn}</span>
          </p>
        </div>
      ) : null}

      <div className="flex flex-col gap-5">
        <Input
          label="Parent / guardian name"
          placeholder="e.g. Sunita Sharma"
          value={c.parentName}
          onChange={(e) => updateContact({ parentName: e.target.value })}
          className={INPUT_CLASS}
        />
        <Input
          label="Alternate number"
          inputMode="numeric"
          placeholder="10-digit number"
          maxLength={10}
          value={c.altPhone}
          onChange={(e) =>
            updateContact({ altPhone: e.target.value.replace(/\D/g, "").slice(0, 10) })
          }
          className={INPUT_CLASS}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          placeholder="you@example.com"
          value={c.email}
          onChange={(e) => updateContact({ email: e.target.value })}
          className={INPUT_CLASS}
        />
        <Textarea
          label="Address"
          placeholder="Area, city, PIN"
          rows={3}
          value={c.address}
          onChange={(e) => updateContact({ address: e.target.value })}
          className="rounded-2xl"
        />
      </div>
    </>
  );
}
