import type {
  Academic,
  Contact,
  Interests,
  WizardState,
  Wording,
} from "./wizard";

/** Props shared by every wizard step. State is lifted to StartWizard. */
export interface StepProps {
  answers: WizardState;
  w: Wording;
  update: (patch: Partial<WizardState>) => void;
  updateAcademic: (patch: Partial<Academic>) => void;
  updateInterests: (patch: Partial<Interests>) => void;
  updateContact: (patch: Partial<Contact>) => void;
}
