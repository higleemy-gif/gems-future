export type Role = "student" | "parent";

export type Stage =
  | "class9_10"
  | "passed10"
  | "class11_12"
  | "passed12"
  | "in_graduation"
  | "completed_graduation"
  | "diploma_iti"
  | "dropper_gap";

export interface Option {
  value: string;
  label: string;
}

export interface Answers {
  role?: Role;
  phone: string;
  consent: boolean;
  fullName: string;
  state: string;
  district: string;
  medium: string;
  stage?: Stage;
  board: string;
  class10Marks: string;
  streamLeaning: string[];
  openToDiploma: string;
  stream: string;
  class12Marks: string;
  entranceExams: string[];
  entranceOther: string;
  scoreRank: string;
  degree: string;
  gradYear: string;
  cgpa: string;
  nextStep: string[];
  preparingFor: string;
  previousQualification: string;
  favouriteSubjects: string[];
  interestAreas: string[];
  mainGoal: string;
  earnTimeline: string;
  situationText: string;
  parentHopes: string;
  budget: string;
  parentName: string;
  altNumber: string;
  email: string;
  address: string;
  bookingDate: string;
  bookingTime: string;
  bookingMode: string;
  stateOther: string;
  mediumOther: string;
  boardOther: string;
  streamOther: string;
  subjectsOther: string;
  interestsOther: string;
}

export const initialAnswers: Answers = {
  phone: "", consent: false, fullName: "", state: "", district: "", medium: "",
  board: "", class10Marks: "", streamLeaning: [], openToDiploma: "",
  stream: "", class12Marks: "", entranceExams: [], entranceOther: "", scoreRank: "",
  degree: "", gradYear: "", cgpa: "", nextStep: [],
  preparingFor: "", previousQualification: "",
  favouriteSubjects: [], interestAreas: [], mainGoal: "", earnTimeline: "",
  situationText: "", parentHopes: "", budget: "",
  parentName: "", altNumber: "", email: "", address: "",
  bookingDate: "", bookingTime: "", bookingMode: "",
  stateOther: "", mediumOther: "", boardOther: "", streamOther: "",
  subjectsOther: "", interestsOther: "",
};

export const roleOptions: Option[] = [
  { value: "student", label: "I'm the student" },
  { value: "parent", label: "I'm a parent" },
];

export const stageOptions: Option[] = [
  { value: "class9_10", label: "Class 9 or 10" },
  { value: "passed10", label: "Passed 10th" },
  { value: "class11_12", label: "Class 11 or 12" },
  { value: "passed12", label: "Passed 12th" },
  { value: "in_graduation", label: "In graduation" },
  { value: "completed_graduation", label: "Completed graduation" },
  { value: "diploma_iti", label: "Diploma or ITI" },
  { value: "dropper_gap", label: "Dropper or gap year" },
];

export const stateOptions = ["Andhra Pradesh", "Assam", "Bihar", "Chhattisgarh", "Delhi", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Madhya Pradesh", "Maharashtra", "Odisha", "Punjab", "Rajasthan", "Tamil Nadu", "Telangana", "Uttar Pradesh", "Uttarakhand", "West Bengal", "Other"];
export const mediumOptions = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Other"];
export const boardOptions = ["CBSE", "ICSE", "State Board", "Other"];
export const yesNoMaybe = ["Yes", "No", "Maybe"];
export const streamOptions = ["Science (PCM)", "Science (PCB)", "Science (PCMB)", "Commerce", "Arts / Humanities", "Other"];

export const streamLeaningOptions: Option[] = [
  { value: "science", label: "Science" },
  { value: "commerce", label: "Commerce" },
  { value: "arts", label: "Arts / Humanities" },
  { value: "undecided", label: "Not sure yet" },
];

export const entranceExamOptions: Option[] = [
  { value: "jee", label: "JEE" },
  { value: "neet", label: "NEET" },
  { value: "cuet", label: "CUET" },
  { value: "clat", label: "CLAT" },
  { value: "cet", label: "State CET" },
  { value: "nda", label: "NDA" },
  { value: "other", label: "Other" },
  { value: "none", label: "None yet" },
];

export const nextStepOptions: Option[] = [
  { value: "job", label: "Get a job" },
  { value: "pg", label: "Higher studies (PG)" },
  { value: "govt", label: "Govt exam prep" },
  { value: "business", label: "Start a business" },
  { value: "skill", label: "Skill or certification" },
];

export const subjectOptions: Option[] = [
  { value: "math", label: "Math" },
  { value: "physics", label: "Physics" },
  { value: "chemistry", label: "Chemistry" },
  { value: "biology", label: "Biology" },
  { value: "english", label: "English" },
  { value: "cs", label: "Computer Science" },
  { value: "economics", label: "Economics" },
  { value: "accounts", label: "Accountancy" },
  { value: "business", label: "Business Studies" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "arts", label: "Fine Arts" },
  { value: "other", label: "Other" },
];

export const interestAreaOptions: Option[] = [
  { value: "tech", label: "Tech" },
  { value: "doctor", label: "Medicine" },
  { value: "business", label: "Business" },
  { value: "design", label: "Design" },
  { value: "government", label: "Government" },
  { value: "law", label: "Law" },
  { value: "teaching", label: "Teaching" },
  { value: "media", label: "Media" },
  { value: "sports", label: "Sports" },
  { value: "other", label: "Other" },
];

export const goalOptions: Option[] = [
  { value: "clarity", label: "Just get clarity on my options" },
  { value: "college", label: "Get into a good college" },
  { value: "skill", label: "Learn a job-ready skill and start earning soon" },
  { value: "mix", label: "A mix of both, study plus a skill" },
  { value: "govt", label: "Prepare for a government job" },
];

export const earnOptions: Option[] = [
  { value: "not_priority", label: "Not a priority" },
  { value: "1_2_years", label: "In 1 to 2 years" },
  { value: "asap", label: "As soon as possible" },
];

export const budgetOptions = ["Under \u20B950k / year", "\u20B950k to \u20B91.5L / year", "\u20B91.5L to \u20B93L / year", "\u20B93L+ / year", "Not sure yet"];

// ---- wording helpers (student vs parent) ----
export const be = (r?: Role) => (r === "parent" ? "is your child" : "are you");
export const subjWord = (r?: Role) => (r === "parent" ? "your child" : "you");
export const poss = (r?: Role) => (r === "parent" ? "your child's" : "your");
export const doesWord = (r?: Role) => (r === "parent" ? "does your child" : "do you");

export const microcopy: Record<string, string> = {
  phone: "Nice to meet you.",
  basic: "A few quick details.",
  stage: "This helps us tailor everything.",
  academic: "Thanks for that.",
  subjects: "Good to know.",
  interests: "Almost there.",
  goal: "Almost there.",
  earn: "Two quick things left.",
  situation: "Last one.",
  parent: "Two quick parent questions.",
  booking: "One last thing.",
};

export interface Recommendation {
  title: string;
  mode: "Online" | "Offline" | "Hybrid";
  price: string;
  cta: string;
}

export interface QuizResult {
  verdict: string;
  summary: string;
  path: { title: string; desc: string }[];
  recommendations: Recommendation[];
}

// NOTE: hard-coded sample result. This is the single place to swap in
// real AI + database output later; the shape stays the same.
export function getSampleResult(answers: Answers): QuizResult {
  const isParent = answers.role === "parent";
  const who = answers.fullName || (isParent ? "your child" : "you");
  return {
    verdict: "This is a solid direction for " + (isParent ? "them" : "you"),
    summary:
      "Based on what " +
      (isParent ? "you shared about " + who : "you told us") +
      ", a skill-first path with a clear fallback looks like a strong fit.",
    path: [
      { title: "Build a job-ready skill", desc: "Start a focused 3 to 6 month program in a high-demand area." },
      { title: "Get real practice", desc: "Work on projects and a short internship to build confidence." },
      { title: "Start earning, keep options open", desc: "Begin earning while leaving room to study further later." },
    ],
    recommendations: [
      { title: "Full-Stack Web Development", mode: "Online", price: "\u20B925,000", cta: "View" },
      { title: "Data Analytics Starter", mode: "Hybrid", price: "\u20B918,000", cta: "View" },
      { title: "Local Skill Centre Diploma", mode: "Offline", price: "\u20B912,000", cta: "View" },
    ],
  };
}

// ---- 1-to-1 counselling session booking ----
export const timeSlotOptions = [
  "10:00 AM",
  "11:30 AM",
  "1:00 PM",
  "3:00 PM",
  "5:00 PM",
  "6:30 PM",
];

export const sessionModeOptions = ["Phone call", "Video call", "In person"];

export function formatBookingDate(isoDate: string): string {
  if (!isoDate) return "";
  const parts = isoDate.split("-").map(Number);
  if (parts.length !== 3) return isoDate;
  const dt = new Date(parts[0], parts[1] - 1, parts[2]);
  return dt.toLocaleDateString("en-IN", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
