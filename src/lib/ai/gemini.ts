// SERVER ONLY. Calls the Gemini API with the server-side key.
// Never import this into client ("use client") code.
import { getSampleResult } from "@/components/quiz/quiz-data";
import type { Answers, QuizResult } from "@/components/quiz/quiz-data";

// Set GEMINI_MODEL in .env.local to a valid model your key supports.
const DEFAULT_MODEL = "gemini-3.8-flash";

const responseSchema = {
  type: "object",
  properties: {
    verdict: { type: "string" },
    summary: { type: "string" },
    path: {
      type: "array",
      items: {
        type: "object",
        properties: { title: { type: "string" }, desc: { type: "string" } },
        required: ["title", "desc"],
      },
    },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          title: { type: "string" },
          mode: { type: "string", enum: ["Online", "Offline", "Hybrid"] },
          price: { type: "string" },
          cta: { type: "string" },
        },
        required: ["title", "mode", "price", "cta"],
      },
    },
  },
  required: ["verdict", "summary", "path", "recommendations"],
};

function buildPrompt(answers: Answers): string {
  const lines = [
    "You are a warm, practical career counsellor for students and parents in India.",
    "Based only on the answers below, suggest a realistic, encouraging direction.",
    "Focus on career paths and job-ready skills. Do not recommend specific named colleges.",
    "Keep language simple and supportive. Use the Indian context and INR for any prices.",
    "",
    "Return JSON with: verdict (one short positive sentence), summary (2 to 3 sentences),",
    "path (exactly 3 steps, each with title and desc),",
    "recommendations (2 to 3 items: title, mode one of Online/Offline/Hybrid, price like Rs 15,000, cta short label).",
    "",
    "Fields ending in Other hold free text the user typed for an Other choice.",
    "Prefer that typed text over the generic Other label.",
    "",
    "User answers as JSON:",
    JSON.stringify(answers),
  ];
  return lines.join("\n");
}

type UnknownRecord = Record<string, unknown>;

function normalize(raw: unknown, answers: Answers): QuizResult {
  const fallback = getSampleResult(answers);
  if (!raw || typeof raw !== "object") return fallback;
  const r = raw as UnknownRecord;
  const modes = ["Online", "Offline", "Hybrid"];
  const path = Array.isArray(r.path)
    ? r.path.slice(0, 3).map((p) => {
        const o = (p ?? {}) as UnknownRecord;
        return { title: String(o.title ?? ""), desc: String(o.desc ?? "") };
      })
    : fallback.path;
  const recommendations = Array.isArray(r.recommendations)
    ? r.recommendations.slice(0, 3).map((x) => {
        const o = (x ?? {}) as UnknownRecord;
        const modeStr = String(o.mode ?? "Online");
        const mode = (modes.includes(modeStr) ? modeStr : "Online") as
          | "Online"
          | "Offline"
          | "Hybrid";
        return {
          title: String(o.title ?? ""),
          mode,
          price: String(o.price ?? ""),
          cta: String(o.cta ?? "View"),
        };
      })
    : fallback.recommendations;
  return {
    verdict: typeof r.verdict === "string" && r.verdict ? r.verdict : fallback.verdict,
    summary: typeof r.summary === "string" && r.summary ? r.summary : fallback.summary,
    path: path.length ? path : fallback.path,
    recommendations: recommendations.length ? recommendations : fallback.recommendations,
  };
}

export async function generateCounsellingResult(answers: Answers): Promise<QuizResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || DEFAULT_MODEL;
  if (!apiKey) return getSampleResult(answers);

  const url =
    "https://generativelanguage.googleapis.com/v1beta/models/" +
    model +
    ":generateContent?key=" +
    apiKey;
  const body = {
    contents: [{ role: "user", parts: [{ text: buildPrompt(answers) }] }],
    generationConfig: {
      responseMimeType: "application/json",
      responseSchema,
      temperature: 0.7,
    },
  };

  // Up to 3 attempts; retry transient overload (503) and rate limit (429).
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 20000);
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
        signal: controller.signal,
      });
      clearTimeout(timer);
      if (res.ok) {
        const data = await res.json();
        const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
        if (!text) return getSampleResult(answers);
        return normalize(JSON.parse(text), answers);
      }
      if ((res.status === 503 || res.status === 429) && attempt < 2) {
        await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
        continue;
      }
      const detail = await res.text().catch(() => "");
      console.error("Gemini API error", res.status, detail.slice(0, 300));
      return getSampleResult(answers);
    } catch (err) {
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
        continue;
      }
      console.error("Gemini call failed", err);
      return getSampleResult(answers);
    }
  }
  return getSampleResult(answers);
}
