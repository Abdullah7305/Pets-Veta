import { api } from "@/features/api interface/axios.interface";

import type { PetFormData } from "../schemas/pet.schema";

import type {
  PetResponse,
  PetsResponse,
} from "../types/petProfile.types";

export const getMyPetsApi = async (): Promise<PetsResponse> => {
  const response = await api.get<PetsResponse>("/petOwner/my-pets");

  return response.data;
};

export const getPetByIdApi = async (
  petId: string,
): Promise<PetResponse> => {
  const response = await api.get<PetResponse>(`/pets/${petId}`);

  return response.data;
};

export const createPetApi = async (
  payload: PetFormData,
): Promise<PetResponse> => {
  const formData = new FormData();

  formData.append("name", payload.name);
  formData.append("age", String(payload.age));
  formData.append("breed", payload.breed);
  formData.append("category", payload.category);

  if (payload.photos) {
    Array.from(payload.photos).forEach((photo) => {
      formData.append("photos", photo);
    });
  }

  const response = await api.post<PetResponse>(
    "/petOwner/submit/pet-data",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
};

export const updatePetApi = async (
  petId: string,
  payload: PetFormData,
): Promise<PetResponse> => {
  const response = await api.patch<PetResponse>(
    `/pets/${petId}`,
    payload,
  );

  return response.data;
};

export const deletePetApi = async (
  petId: string,
): Promise<{
  success: boolean;
  message: string;
}> => {
  const response = await api.delete<{
    success: boolean;
    message: string;
  }>(`/pets/${petId}`);

  return response.data;
};
