export type PetCategory = "DOG" | "CAT" | "BIRD" | "REPTILE" | "OTHER";

export type ExistingPet = {
  id: string;
  name: string;
  breed: string;
  category: PetCategory;
  age: number;
  gender?: string;
  profileImageUrl: string;
};

export type SelectPetAction = "report-issue" | "book-appointment";