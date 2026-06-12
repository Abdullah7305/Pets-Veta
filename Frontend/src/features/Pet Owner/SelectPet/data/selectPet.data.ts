import type { ExistingPet } from "../types/selectPet.types";

export const existingPets: ExistingPet[] = [
  {
    id: "pet-1",
    name: "Khokhar",
    category: "DOG",
    breed: "German Shepherd",
    age: 3,
    gender: "Male",
    profileImageUrl:
      "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pet-2",
    name: "Kitty",
    category: "CAT",
    breed: "Persian",
    age: 2,
    gender: "Female",
    profileImageUrl:
      "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=500&q=80",
  },
  {
    id: "pet-3",
    name: "Coco",
    category: "BIRD",
    breed: "Parrot",
    age: 1,
    gender: "Male",
    profileImageUrl:
      "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=500&q=80",
  },
];