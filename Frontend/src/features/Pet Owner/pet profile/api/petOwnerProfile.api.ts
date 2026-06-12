import {api} from "@/features/api interface/axios.interface";

import type { PetOwnerProfileResponse } from "../types/petProfile.types";

export const getPetOwnerProfileApi =
  async (): Promise<PetOwnerProfileResponse> => {
    const response = await api.get<PetOwnerProfileResponse>(
      "/pet-owner/profile",
    );

    return response.data;
  };