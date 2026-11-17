"use client";

import { useFormState, useFormStatus } from "react-dom";
import { savePhoneConsent, type PhoneConsentState } from "@/app/start/actions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" size="lg" disabled={pending}>
      {pending ? "Saving..." : "Continue"}
    </Button>
  );
}

const initialState: PhoneConsentState = {};

export function PhoneConsent() {
  const [state, formAction] = useFormState(savePhoneConsent, initialState);
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-6 py-12">
      <div className="space-y-3">
        <span className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">Almost there</span>
        <h1 className="text-[1.65rem] font-semibold tracking-tight text-ink sm:text-[2rem]">A number to reach you</h1>
        <p className="leading-relaxed text-muted-foreground">We only use it to share your result.</p>
      </div>
      <form action={formAction} className="mt-8 space-y-5">
        <div className="space-y-2">
          <label htmlFor="phone" className="block text-sm font-medium text-ink">Phone number</label>
          <Input id="phone" name="phone" inputMode="numeric" maxLength={10} placeholder="10-digit mobile number" />
        </div>
        <label className="flex items-start gap-3">
          <input type="checkbox" name="consent" style={{ accentColor: "#1E4ED8" }} className="mt-0.5 h-4 w-4" />
          <span className="text-sm leading-relaxed text-muted-foreground">I agree to be contacted about my result.</span>
        </label>
        {state?.error ? <p className="text-sm text-destructive">{state.error}</p> : null}
        <SubmitButton />
      </form>
    </main>
  );
}
