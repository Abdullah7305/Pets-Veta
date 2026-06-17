import { CalendarDays } from "lucide-react";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type {
  Pet,
  PetCategory,
} from "../types/petProfile.types";

import PetActionsMenu from "./PetActionsMenu";

type PetProfileCardProps = {
  pet: Pet;
  onEdit: (petId: string) => void;
  onDelete: (pet: Pet) => void;
  onBookAppointment: (petId: string) => void;
};

const categoryImages: Record<PetCategory, string> = {
  DOG: "https://images.unsplash.com/photo-1568572933382-74d440642117?auto=format&fit=crop&w=700&q=80",
  CAT: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=80",
  REPTILE:
    "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=700&q=80",
  OTHER:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=80",
};

const categoryStyles: Record<PetCategory, string> = {
  DOG: "bg-cyan-50 text-cyan-700",
  CAT: "bg-orange-50 text-orange-600",
  REPTILE: "bg-green-50 text-green-700",
  OTHER: "bg-slate-100 text-slate-700",
};

const formatCategory = (category: PetCategory) => {
  return category.charAt(0) + category.slice(1).toLowerCase();
};

const PetProfileCard = ({
  pet,
  onEdit,
  onDelete,
  onBookAppointment,
}: PetProfileCardProps) => {
  const age = Number(pet.age);

  return (
    <Card className="overflow-visible p-3">
      <div className="flex flex-col gap-4 sm:flex-row xl:flex-col">
        <div className="h-52 w-full shrink-0 overflow-hidden rounded-2xl bg-[#EAF7F5] sm:w-48 xl:w-full">
          <img
            src={categoryImages[pet.category]}
            alt={pet.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col px-1 py-1">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="text-xl font-black text-[#101b3d]">
                {pet.name}
              </h3>

              <span
                className={`mt-3 inline-flex rounded-full px-3 py-1 text-[11px] font-black ${
                  categoryStyles[pet.category]
                }`}
              >
                {formatCategory(pet.category)}
              </span>
            </div>

            <PetActionsMenu
              petName={pet.name}
              onEdit={() => onEdit(pet.id)}
              onDelete={() => onDelete(pet)}
            />
          </div>

          <p className="mt-3 text-sm font-semibold text-slate-600">
            {pet.breed}
          </p>

          <div className="mt-5 flex items-center gap-2 text-sm font-medium text-slate-600">
            <CalendarDays size={16} className="text-[#078b91]" />

            <span>
              {age} {age === 1 ? "Year" : "Years"}
            </span>
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-4 flex h-11 w-full items-center justify-center gap-2 border-[#078b91] text-[#078b91] hover:bg-[#078b91] hover:text-white"
        onClick={() => onBookAppointment(pet.id)}
      >
        <CalendarDays size={17} />
        Book Appointment
      </Button>
    </Card>
  );
};

export default PetProfileCard;