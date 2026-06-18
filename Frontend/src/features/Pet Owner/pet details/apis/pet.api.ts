import { api, handleAxiosError } from "@/features/api interface/axios.interface";
import type { PetFormData } from "../schemas/pet.schema";
import type { PetIssueReportFormData } from "../schemas/petIssueReport.schema";

export interface PetResponse {
  id: string;
  name: string;
  age: number;
  breed: string;
  category: string;
}

export interface SubmitIssueResponse {
  success: boolean,
  message: string,
  data: {
    checkoutUrl: string
  }
}

export const submitPetData = async (data: PetFormData & { petOwnerId: string }): Promise<PetResponse | undefined> => {
  try {
    const response = await api.post("petOwner/submit/pet-data", data);
    return response.data?.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const submitPetIssue = async (
  data: PetIssueReportFormData & { petOwnerId: string; doctorId: string },
): Promise<SubmitIssueResponse> => {
  try {
    const response = await api.post("petOwner/submit/pet-issue", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const getPetsData = async (): Promise<PetResponse[] | undefined> => {
  try {
    const response = await api.get("petOwner/pets-data");
    return response.data?.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
