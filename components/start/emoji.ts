/**
 * Emoji maps for the wizard's tappable cards and chips.
 *
 * These are purely decorative — the labels, values, order and branching all
 * come from `wizard.ts` and are left untouched. Maps are kept per-option-group
 * because a few values (e.g. "business", "other", "unsure") mean different
 * things in different questions and deserve a fitting icon in each.
 */
import type { Option } from "./wizard";

export interface PlayfulOption {
  label: string;
  value: string;
  emoji?: string;
  description?: string;
  disabled?: boolean;
}

export const ROLE_EMOJI: Record<string, string> = {
  student: "🎓",
  parent: "👨‍👩‍👦",
};

export const STAGE_EMOJI: Record<string, string> = {
  class_9_10: "📘",
  passed_10: "✅",
  class_11_12: "📗",
  passed_12: "🎉",
  in_graduation: "🏫",
  completed_graduation: "🎓",
  diploma_iti: "🛠️",
  dropper: "⏳",
};

export const SCHOOL_STREAM_EMOJI: Record<string, string> = {
  science: "🔬",
  commerce: "💰",
  arts: "🎨",
  unsure: "🤔",
};

export const YES_MAYBE_NO_EMOJI: Record<string, string> = {
  yes: "👍",
  maybe: "🤷",
  no: "🙅",
};

export const PLUS2_STREAM_EMOJI: Record<string, string> = {
  pcm: "⚙️",
  pcb: "🧬",
  commerce: "💰",
  arts: "🎨",
  vocational: "🛠️",
};

export const ENTRANCE_EMOJI: Record<string, string> = {
  jee: "📐",
  neet: "🩺",
  cuet: "🏛️",
  clat: "⚖️",
  nda: "🪖",
  state_cet: "📝",
  other: "✨",
};

export const NEXT_STEP_EMOJI: Record<string, string> = {
  job: "💼",
  higher_studies: "🎓",
  govt_exam: "🏛️",
  business: "🚀",
  unsure: "🤔",
};

export const SUBJECT_EMOJI: Record<string, string> = {
  maths: "➗",
  physics: "⚛️",
  chemistry: "🧪",
  biology: "🧬",
  computer_science: "💻",
  economics: "📈",
  accountancy: "🧾",
  business_studies: "💼",
  history: "🏺",
  political_science: "🏛️",
  geography: "🌍",
  english: "📖",
  "art_&_design": "🎨",
  physical_education: "🏅",
};

export const INTEREST_AREA_EMOJI: Record<string, string> = {
  engineering: "💻",
  medicine: "🩺",
  business: "💼",
  design: "🎨",
  law: "⚖️",
  teaching: "📚",
  government: "🏛️",
  media: "🎬",
  trades: "🔧",
  entrepreneurship: "🚀",
  sports: "⚽",
  unsure: "🤔",
};

export const MAIN_GOAL_EMOJI: Record<string, string> = {
  job_ready_skill: "⚡",
  mix: "⚖️",
  degree: "🎓",
  govt: "🏛️",
  entrance: "📝",
  business: "🚀",
  unsure: "🧭",
};

export const EARN_SOON_EMOJI: Record<string, string> = {
  asap: "⚡",
  "1_2_years": "📅",
  after_studies: "🎓",
  not_priority: "😌",
};

export const BOARD_EMOJI: Record<string, string> = {
  cbse: "🏫",
  icse: "📘",
  state: "🏛️",
  nios: "🏠",
  other: "✨",
};

export const MEDIUM_EMOJI: Record<string, string> = {
  english: "🔤",
  hindi: "🇮🇳",
  regional: "🗣️",
  other: "✨",
};

/** Decorate a plain option list with emoji (and optional descriptions). */
export function withEmoji(
  options: Option[],
  map: Record<string, string>,
  descriptions?: Record<string, string>,
): PlayfulOption[] {
  return options.map((o) => ({
    label: o.label,
    value: o.value,
    emoji: map[o.value],
    description: descriptions?.[o.value],
  }));
}
