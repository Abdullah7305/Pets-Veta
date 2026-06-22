import Card from "@/shared/components/Card/Card";

import type { ExistingPetsSectionProps } from "../types/selectPet.types";
import ExistingPetCard from "./ExistingPetCard";

const ExistingPetsSection = ({
  pets,
  onSelectPet,
}: ExistingPetsSectionProps) => {
  if (pets.length === 0) {
    return (
      <Card
        className="
          mt-10 border border-dashed border-slate-300
          bg-white px-6 py-12 text-center shadow-none
        "
      >
        <h2 className="text-xl font-black text-[#101b3d]">
          No existing pets found
        </h2>

        <p className="mt-2 text-sm font-medium text-slate-500">
          Add a pet from your profile before continuing.
        </p>
      </Card>
    );
  }

  return (
    <section className="mt-10">
      <div className="mb-5">
        <h2 className="text-2xl font-black text-[#101b3d]">
          Existing Pets
        </h2>

        <p className="mt-1 text-sm font-medium text-slate-500">
          Select a pet to continue.
        </p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {pets.map((pet) => (
          <ExistingPetCard
            key={pet.id}
            pet={pet}
            onSelect={onSelectPet}
          />
        ))}
      </div>
    </section>
  );
};

export default ExistingPetsSection;
