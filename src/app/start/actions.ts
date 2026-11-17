"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import type { Answers, QuizResult } from "@/components/quiz/quiz-data";
import { generateCounsellingResult } from "@/lib/ai/gemini";

export type PhoneConsentState = { error?: string };

export async function savePhoneConsent(
  _prev: PhoneConsentState,
  formData: FormData
): Promise<PhoneConsentState> {
  const phone = String(formData.get("phone") ?? "").replace(/\D/g, "");
  const consent = formData.get("consent") === "on";

  // Server-side validation (never trust the client).
  if (phone.length !== 10) {
    return { error: "Please enter a valid 10-digit phone number." };
  }
  if (!consent) {
    return { error: "Please accept the consent to continue." };
  }

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Your session expired. Please sign in again." };

  const { error } = await supabase.from("profiles").upsert({
    id: user.id,
    email: user.email,
    phone,
    consent_at: new Date().toISOString(),
  });
  if (error) return { error: error.message };

  redirect("/start");
}

// Persist a completed quiz. answers + ai_result are stored as jsonb.
// Swap ai_result for the real AI output when that lands.
export async function saveCounsellingSession(
  answers: Answers,
  aiResult: unknown
): Promise<{ error?: string }> {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "Not signed in." };

  const { error } = await supabase.from("counselling_sessions").insert({
    profile_id: user.id,
    answers,
    ai_result: aiResult ?? null,
  });
  return { error: error?.message };
}

// Generate the AI counselling result (server-side Gemini call) and persist it.
export async function generateAndSaveResult(answers: Answers): Promise<QuizResult> {
  const result = await generateCounsellingResult(answers);
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (user) {
      await supabase.from("counselling_sessions").insert({
        profile_id: user.id,
        answers,
        ai_result: result,
      });
    }
  } catch (e) {
    console.error("persist counselling session failed", e);
  }
  return result;
}

// Save a 1-to-1 counselling session booking. Best-effort: requires login.
export async function saveBooking(answers: Answers): Promise<{ error?: string }> {
  if (!answers.bookingDate || !answers.bookingTime) {
    return { error: "Pick a date and time first." };
  }
  try {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return { error: "Not signed in." };
    const { error } = await supabase.from("counselling_bookings").insert({
      profile_id: user.id,
      session_date: answers.bookingDate,
      session_time: answers.bookingTime,
      mode: answers.bookingMode || null,
    });
    return { error: error?.message };
  } catch (e) {
    console.error("saveBooking failed", e);
    return { error: "Could not save the booking." };
  }
}
