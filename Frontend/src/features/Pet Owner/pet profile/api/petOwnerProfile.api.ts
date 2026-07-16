import { api } from "@/features/api interface/axios.interface";

import type {
  PetOwnerProfileResponse,
  UpdatePetOwnerProfilePayload,
} from "../types/petProfile.types";

export const getPetOwnerProfileApi =
  async (): Promise<PetOwnerProfileResponse> => {
    const response = await api.get<PetOwnerProfileResponse>(
      "/petOwner/pet-profile",
    );

    return response.data;
  };

export const updatePetOwnerProfileApi = async (
  payload: UpdatePetOwnerProfilePayload,
): Promise<PetOwnerProfileResponse> => {
  const formData = new FormData();

  formData.append("fullName", payload.fullName);
  formData.append("username", payload.username);
  formData.append("phone", payload.phone || "");
  formData.append("bio", payload.bio || "");

  if (payload.profileImage) {
    formData.append("profileImage", payload.profileImage);
  }

  const response = await api.patch<PetOwnerProfileResponse>(
    "/petOwner/pet-profile",
    formData,
  );

  return response.data;
};