import { PawPrint, Plus } from "lucide-react";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type { Pet } from "../types/petProfile.types";

import PetProfileCard from "./PetProfileCard";

type MyPetsSectionProps = {
  pets: Pet[];
  onAddPet: () => void;
  onEditPet: (petId: string) => void;
  onDeletePet: (pet: Pet) => void;
  onBookAppointment: (petId: string) => void;
};

const MyPetsSection = ({
  pets,
  onAddPet,
  onEditPet,
  onDeletePet,
  onBookAppointment,
}: MyPetsSectionProps) => {
  return (
    <section className="mt-8">
      <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-3">
          <PawPrint
            size={28}
            className="mt-0.5 shrink-0 text-[#078b91]"
          />

          <div>
            <h2 className="text-2xl font-black text-[#101b3d]">
              My Pets
            </h2>

            <p className="mt-1 text-sm font-medium text-slate-500">
              Manage your pets and book veterinary appointments.
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          className="flex h-11 w-auto items-center justify-center gap-2 border-[#078b91] px-5 text-[#078b91]"
          onClick={onAddPet}
        >
          <Plus size={18} />
          Add New Pet
        </Button>
      </div>

      {pets.length === 0 ? (
        <Card className="border-dashed py-14 text-center shadow-none">
          <PawPrint size={50} className="mx-auto text-[#D4E2E0]" />

          <h3 className="mt-4 text-xl font-black text-[#101b3d]">
            No pets added yet
          </h3>

          <p className="mx-auto mt-2 max-w-md text-sm font-medium leading-6 text-slate-500">
            Add your first pet to start booking veterinary appointments.
          </p>


        </Card>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {pets.map((pet) => (
            <PetProfileCard
              key={pet.id}
              pet={pet}
              onEdit={onEditPet}
              onDelete={onDeletePet}
              onBookAppointment={onBookAppointment}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyPetsSection;