import { api } from "@/features/api interface/axios.interface";
import type {
  PetOwnerDashboardResponse,
  PetOwnerAppointmentsResponse, 
} from "../types/petOwnerDashboard.types";

export const getPetOwnerDashboardApi =
  async (): Promise<PetOwnerDashboardResponse> => {
    const response =
      await api.get<PetOwnerDashboardResponse>(
        "/pet-owner/dashboard",
      );

    return response.data;
  };


export const getPetOwnerAppointmentsApi = async (): Promise<PetOwnerAppointmentsResponse> => {
  const response = await api.get<PetOwnerAppointmentsResponse>("petOwner/appointments");
  return response.data;
};