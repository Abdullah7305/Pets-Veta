import type { PetResponse } from "../apis/pet.api";

export interface PetFormProps {
  onSubmitSuccess?: (newPet: PetResponse) => void;
  onCancel?: () => void;
}

export interface PetIssueReportFormProps {
  preselectedPetId?: string;
  doctorId?: string;
  preselectedCheckupTime?: string;
  onSubmitSuccess?: (data: unknown) => void;
  onCancel?: () => void;
}
