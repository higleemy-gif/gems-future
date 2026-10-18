/**
 * Frontend-only data model for the Gems Future counselling wizard.
 *
 * Everything lives in React state (see StartWizard). There is no backend, no
 * auth, and no API call yet — this is a clickable end-to-end prototype.
 */

export type Role = "student" | "parent";

export type Stage =
  | "class_9_10"
  | "passed_10"
  | "class_11_12"
  | "passed_12"
  | "in_graduation"
  | "completed_graduation"
  | "diploma_iti"
  | "dropper";

export type StageCategory = "school" | "plus2" | "graduation" | "diplomaDropper";

export interface Academic {
  // school stages
  board: string;
  class10Marks: string;
  streamLeaning: string | null;
  openToDiploma: string | null;
  // +2 stages
  stream: string | null;
  class12Marks: string;
  entranceExams: string[];
  entranceOther: string;
  score: string;
  // graduation stages
  degree: string;
  gradYear: string;
  cgpa: string;
  nextStep: string | null;
  // diploma / dropper
  currentlyDoing: string;
  previousQualification: string;
}

export interface Interests {
  favouriteSubjects: string[];
  interestAreas: string[];
  mainGoal: string;
  earnSoon: string | null;
  situation: string; // required free text
  // parent-only
  parentHopes: string;
  parentBudget: string;
}

export interface Contact {
  parentName: string;
  altPhone: string;
  email: string;
  address: string;
}

export interface WizardState {
  role: Role | null;
  phone: string;
  consent: boolean;
  name: string;
  state: string;
  district: string;
  medium: string;
  stage: Stage | null;
  academic: Academic;
  interests: Interests;
  contact: Contact;
  /** Which sample recommendation the user registered interest in (if any). */
  interestedIn: string;
}

export const initialState: WizardState = {
  role: null,
  phone: "",
  consent: false,
  name: "",
  state: "",
  district: "",
  medium: "",
  stage: null,
  academic: {
    board: "",
    class10Marks: "",
    streamLeaning: null,
    openToDiploma: null,
    stream: null,
    class12Marks: "",
    entranceExams: [],
    entranceOther: "",
    score: "",
    degree: "",
    gradYear: "",
    cgpa: "",
    nextStep: null,
    currentlyDoing: "",
    previousQualification: "",
  },
  interests: {
    favouriteSubjects: [],
    interestAreas: [],
    mainGoal: "",
    earnSoon: null,
    situation: "",
    parentHopes: "",
    parentBudget: "",
  },
  contact: {
    parentName: "",
    altPhone: "",
    email: "",
    address: "",
  },
  interestedIn: "",
};

// ---------------------------------------------------------------------------
// Step flow
// ---------------------------------------------------------------------------

export const STEP_ORDER = [
  "role",
  "phone",
  "basic",
  "stage",
  "academic",
  "interests",
  "result",
  "contact",
  "confirmation",
] as const;

export type StepId = (typeof STEP_ORDER)[number];

/** Which of the four visible phases each step belongs to. */
export const STEP_PHASE: Record<StepId, number> = {
  role: 0,
  phone: 0,
  basic: 0,
  stage: 1,
  academic: 1,
  interests: 2,
  result: 3,
  contact: 3,
  confirmation: 3,
};

export const PHASES = [
  { label: "About", description: "You & consent" },
  { label: "Studies", description: "Where you are" },
  { label: "Interests", description: "Goals" },
  { label: "Result", description: "Your path" },
];

// ---------------------------------------------------------------------------
// Stage routing
// ---------------------------------------------------------------------------

export function stageCategory(stage: Stage): StageCategory {
  switch (stage) {
    case "class_9_10":
    case "passed_10":
      return "school";
    case "class_11_12":
    case "passed_12":
      return "plus2";
    case "in_graduation":
    case "completed_graduation":
      return "graduation";
    case "diploma_iti":
    case "dropper":
      return "diplomaDropper";
  }
}

// ---------------------------------------------------------------------------
// Parent / student wording
// ---------------------------------------------------------------------------

export interface Wording {
  isParent: boolean;
  /** subject pronoun: "you" / "your child" */
  subject: string;
  /** possessive: "your" / "your child's" */
  poss: string;
  /** reflexive-ish label for self: "yourself" / "your child" */
  self: string;
}

export function wording(role: Role | null): Wording {
  const isParent = role === "parent";
  return {
    isParent,
    subject: isParent ? "your child" : "you",
    poss: isParent ? "your child's" : "your",
    self: isParent ? "your child" : "yourself",
  };
}

// Capitalise the first letter (for sentence starts like "Your child's ...").
export function cap(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// ---------------------------------------------------------------------------
// Option lists
// ---------------------------------------------------------------------------

export type Option = { label: string; value: string };

export const STAGE_OPTIONS: Option[] = [
  { label: "Class 9 or 10", value: "class_9_10" },
  { label: "Passed Class 10", value: "passed_10" },
  { label: "Class 11 or 12", value: "class_11_12" },
  { label: "Passed Class 12", value: "passed_12" },
  { label: "In graduation", value: "in_graduation" },
  { label: "Completed graduation", value: "completed_graduation" },
  { label: "Diploma / ITI", value: "diploma_iti" },
  { label: "Dropper (preparing / gap year)", value: "dropper" },
];

export const STATE_OPTIONS: Option[] = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman & Nicobar Islands",
  "Chandigarh",
  "Dadra & Nagar Haveli and Daman & Diu",
  "Delhi",
  "Jammu & Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
].map((s) => ({ label: s, value: s }));

export const MEDIUM_OPTIONS: Option[] = [
  { label: "English", value: "english" },
  { label: "Hindi", value: "hindi" },
  { label: "Regional language", value: "regional" },
  { label: "Other", value: "other" },
];

export const BOARD_OPTIONS: Option[] = [
  { label: "CBSE", value: "cbse" },
  { label: "ICSE / ISC", value: "icse" },
  { label: "State Board", value: "state" },
  { label: "NIOS (Open)", value: "nios" },
  { label: "Other", value: "other" },
];

export const SCHOOL_STREAM_LEAN_OPTIONS: Option[] = [
  { label: "Science", value: "science" },
  { label: "Commerce", value: "commerce" },
  { label: "Arts / Humanities", value: "arts" },
  { label: "Not sure yet", value: "unsure" },
];

export const YES_MAYBE_NO_OPTIONS: Option[] = [
  { label: "Yes", value: "yes" },
  { label: "Maybe", value: "maybe" },
  { label: "No", value: "no" },
];

export const PLUS2_STREAM_OPTIONS: Option[] = [
  { label: "Science (PCM)", value: "pcm" },
  { label: "Science (PCB)", value: "pcb" },
  { label: "Commerce", value: "commerce" },
  { label: "Arts / Humanities", value: "arts" },
  { label: "Vocational", value: "vocational" },
];

export const ENTRANCE_EXAM_OPTIONS: Option[] = [
  { label: "JEE (Main / Advanced)", value: "jee" },
  { label: "NEET", value: "neet" },
  { label: "CUET", value: "cuet" },
  { label: "CLAT", value: "clat" },
  { label: "NDA", value: "nda" },
  { label: "State CET", value: "state_cet" },
  { label: "Other", value: "other" },
];

export const NEXT_STEP_OPTIONS: Option[] = [
  { label: "Get a job", value: "job" },
  { label: "Higher studies (Masters etc.)", value: "higher_studies" },
  { label: "Government exam", value: "govt_exam" },
  { label: "Start a business", value: "business" },
  { label: "Not sure yet", value: "unsure" },
];

export const SUBJECT_OPTIONS: Option[] = [
  "Maths",
  "Physics",
  "Chemistry",
  "Biology",
  "Computer Science",
  "Economics",
  "Accountancy",
  "Business Studies",
  "History",
  "Political Science",
  "Geography",
  "English",
  "Art & Design",
  "Physical Education",
].map((s) => ({ label: s, value: s.toLowerCase().replace(/\s+/g, "_") }));

export const INTEREST_AREA_OPTIONS: Option[] = [
  { label: "Engineering / Tech", value: "engineering" },
  { label: "Medicine / Healthcare", value: "medicine" },
  { label: "Business / Commerce", value: "business" },
  { label: "Design / Creative", value: "design" },
  { label: "Law", value: "law" },
  { label: "Teaching / Academia", value: "teaching" },
  { label: "Government / Defence", value: "government" },
  { label: "Media / Communication", value: "media" },
  { label: "Skilled trades", value: "trades" },
  { label: "Entrepreneurship", value: "entrepreneurship" },
  { label: "Sports", value: "sports" },
  { label: "Not sure yet", value: "unsure" },
];

// `mainGoal` is a dropdown; the two earning-focused options are first-class and
// listed first, per the product brief.
export const MAIN_GOAL_OPTIONS: Option[] = [
  {
    label: "Learn a job-ready skill and start earning soon",
    value: "job_ready_skill",
  },
  { label: "A mix of both (study and earn)", value: "mix" },
  { label: "Get a degree from a good college", value: "degree" },
  { label: "Prepare for a government job / exam", value: "govt" },
  { label: "Crack a competitive entrance exam", value: "entrance" },
  { label: "Start my own thing / business", value: "business" },
  { label: "Still figuring it out", value: "unsure" },
];

export const EARN_SOON_OPTIONS: Option[] = [
  { label: "As soon as possible", value: "asap" },
  { label: "Within 1-2 years", value: "1_2_years" },
  { label: "After finishing studies", value: "after_studies" },
  { label: "Not a priority right now", value: "not_priority" },
];

// ---------------------------------------------------------------------------
// Per-step validation for the Next button
// ---------------------------------------------------------------------------

export function canProceed(step: StepId, s: WizardState): boolean {
  switch (step) {
    case "role":
      return s.role !== null;
    case "phone":
      return /^\d{10}$/.test(s.phone) && s.consent;
    case "basic":
      return s.name.trim().length > 0 && s.state.length > 0;
    case "stage":
      return s.stage !== null;
    case "academic":
      return true; // optional details
    case "interests":
      return s.interests.situation.trim().length > 0;
    case "result":
      return true;
    case "contact":
      return true; // all optional
    case "confirmation":
      return true;
    default:
      return true;
  }
}
