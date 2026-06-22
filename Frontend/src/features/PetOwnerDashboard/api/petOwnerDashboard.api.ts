import {api} from "@/features/api interface/axios.interface";

import type {
  PetOwnerDashboardResponse,
} from "../types/petOwnerDashboard.types";

export const getPetOwnerDashboardApi =
  async (): Promise<PetOwnerDashboardResponse> => {
    const response =
      await api.get<PetOwnerDashboardResponse>(
        "/pet-owner/dashboard",
      );

    return response.data;
  };
