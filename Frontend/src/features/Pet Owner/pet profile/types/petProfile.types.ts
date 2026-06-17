export type PetCategory = "DOG" | "CAT" | "REPTILE" | "OTHER";

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
  petOwnerId: string;
  name: string;
  age: number | string;
  breed: string;
  category: PetCategory;
};

export type PetOwnerProfileResponse = {
  success: boolean;
  message: string;
  data: PetOwnerProfile;
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