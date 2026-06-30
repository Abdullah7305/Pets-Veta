import type { InputHTMLAttributes, ReactNode } from "react";
import type { PetOwnerProfileFormData } from "../schemas/petOwnerProfile.schema";
import type { PetFormData, PetFormInput } from "../schemas/pet.schema";

import type { PetFormData, PetFormInput } from "../schemas/pet.schema";

export interface PetFormProps {
  title?: string;
  description?: string;
  defaultValues?: PetFormInput;
  isSaving?: boolean;
  onSubmit?: (data: PetFormData) => void | Promise<void>;
  onSubmitSuccess?: (newPet: PetResponse) => void;
  onCancel?: () => void;
}
export type PetCategory = "DOG" | "CAT" | "REPTILE" | "OTHER";

export type PetPicture = {
  publicUrl: string;
};

export type PetOwnerProfile = {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  profileImageUrl: string;
};

export type Pet = {
  id: string;
  petOwnerId?: string;
  name: string;
  age: number | string;
  breed: string;
  category: PetCategory;
  petPictures: PetPicture[];
};

export type PetOwnerProfileResponse = {
  success: boolean;
  message: string;
  data: PetOwnerProfile;
};

export type UpdatePetOwnerProfilePayload = {
  fullName: string;
  username: string;
  phone?: string;
  profileImage?: File | null;
  profileImageUrl?: string;
};

export type PetsResponse = {
  success: boolean;
  message: string;
  data: Pet[];
};

export type PetResponse = {
  success: boolean;
  message: string;
  data: Pet;
};

export type EditPetOwnerProfileModalProps = {
  profile: PetOwnerProfile;
  isSaving: boolean;
  error?: string;
  onCancel: () => void;
  onSubmit: (data: PetOwnerProfileFormData) => void;
};

export type PetOwnerProfileFieldProps = {
  label: string;
  error?: string;
  inputProps: InputHTMLAttributes<HTMLInputElement>;
};

export type PetActionsMenuProps = {
  petName: string;
  onEdit: () => void;
  onDelete: () => void;
};

export type MyPetsSectionProps = {
  pets: Pet[];
  onAddPet: () => void;
  onEditPet: (petId: string) => void;
  onDeletePet: (pet: Pet) => void;
  onBookAppointment: (petId: string) => void;
};

export type PetProfileCardProps = {
  pet: Pet;
  onEdit: (petId: string) => void;
  onDelete: (pet: Pet) => void;
  onBookAppointment: (petId: string) => void;
};

export type PetOwnerProfileHeaderProps = {
  profile: PetOwnerProfile;
  onEditProfile: () => void;
};

export type ProfileMetaProps = {
  icon: ReactNode;
  value: string;
};

export interface PetFormProps {
  title?: string;
  description?: string;
  defaultValues?: PetFormInput;
  isSaving?: boolean;
  onSubmit?: (data: PetFormData) => void | Promise<void>;
  onSubmitSuccess?: (newPet: PetResponse) => void;
  onCancel?: () => void;
}
