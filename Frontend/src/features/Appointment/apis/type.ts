export interface Pet {
  id: string;
  name: string;
  breed: string;
  category: "DOG" | "CAT" | "REPTILE" | "OTHER" | string;
  age: number;
  photoUrl?: string;
}

export interface SelectPetStepProps {
  selectedPet: Pet | null; // Null if no pet has been selected yet
  onSelectPet: (pet: Pet) => void; // Triggered when a pet is successfully selected or created
}