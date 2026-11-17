import { createClient } from "@/lib/supabase/server";
import { SignIn } from "@/components/auth/sign-in";
import { PhoneConsent } from "@/components/auth/phone-consent";
import { QuizApp } from "@/components/quiz/quiz-app";

export default async function StartPage() {
  // Dev/testing bypass: skip sign-in + phone/consent when NEXT_PUBLIC_DISABLE_AUTH=true.
  if (process.env.NEXT_PUBLIC_DISABLE_AUTH === "true") {
    return <QuizApp />;
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not signed in -> Google sign-in.
  if (!user) return <SignIn />;

  // Signed in but missing phone/consent -> collect them first.
  const { data: profile } = await supabase
    .from("profiles")
    .select("phone, consent_at")
    .eq("id", user.id)
    .maybeSingle();

  const ready = Boolean(
    profile && profile.phone && String(profile.phone).length === 10 && profile.consent_at
  );
  if (!ready) return <PhoneConsent />;

  // Logged in + phone + consent -> the quiz.
  return <QuizApp />;
}
