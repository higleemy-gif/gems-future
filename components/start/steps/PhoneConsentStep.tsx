import { Input } from "@/components/ui";
import { StepHeader } from "../StepHeader";
import type { StepProps } from "../step-props";

export function PhoneConsentStep({ answers, update, w }: StepProps) {
  const phoneError =
    answers.phone.length > 0 && !/^\d{10}$/.test(answers.phone)
      ? "Enter a valid 10-digit mobile number."
      : undefined;

  const consentText = w.isParent
    ? "I am this child's parent or guardian and I consent to Gems Future using these details to give guidance."
    : "I agree to Gems Future using these details to give me guidance. If I am under 18, I have my parent or guardian's permission.";

  const consented = answers.consent;

  return (
    <>
      <StepHeader
        emoji="📱"
        title="How can we reach you?"
        description="We only use this to save and share guidance. No calls without your permission."
      />
      <div className="flex flex-col gap-5">
        <Input
          label="Mobile number"
          inputMode="numeric"
          autoComplete="tel"
          placeholder="10-digit number"
          maxLength={10}
          value={answers.phone}
          error={phoneError}
          hint={phoneError ? undefined : "Indian mobile number, 10 digits."}
          onChange={(e) =>
            update({ phone: e.target.value.replace(/\D/g, "").slice(0, 10) })
          }
          className="h-14 rounded-2xl text-center text-lg tracking-[0.2em] placeholder:tracking-normal"
          required
        />

        <label
          className={
            "flex cursor-pointer items-start gap-3 rounded-2xl border-2 p-4 transition-colors " +
            (consented
              ? "border-primary bg-soft-blue"
              : "border-border bg-surface hover:border-primary/60")
          }
        >
          <input
            type="checkbox"
            checked={consented}
            onChange={(e) => update({ consent: e.target.checked })}
            className="mt-0.5 h-5 w-5 shrink-0 accent-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-surface"
          />
          <span className="text-sm text-ink-2">{consentText}</span>
        </label>
      </div>
    </>
  );
}
