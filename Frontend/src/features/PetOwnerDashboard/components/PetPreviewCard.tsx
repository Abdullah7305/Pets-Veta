import {
  CalendarDays,
  EllipsisVertical,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type {
  PetCategory,
  PetPreviewCardProps,
} from "../types/petOwnerDashboard.types";

const categoryImages: Record<PetCategory, string> = {
  DOG: "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=700&q=80",

  CAT: "https://images.unsplash.com/photo-1574158622682-e40e69881006?auto=format&fit=crop&w=700&q=80",

  REPTILE:
    "https://images.unsplash.com/photo-1504450874802-0ba2bcd9b5ae?auto=format&fit=crop&w=700&q=80",

  OTHER:
    "https://images.unsplash.com/photo-1552728089-57bdde30beb3?auto=format&fit=crop&w=700&q=80",
};

const categoryLabels: Record<PetCategory, string> = {
  DOG: "Dog",
  CAT: "Cat",
  REPTILE: "Reptile",
  OTHER: "Bird",
};

const PetPreviewCard = ({ pet }: PetPreviewCardProps) => {
  const navigate = useNavigate();

  const age = Number(pet.age);

  return (
    <Card className="min-w-0 overflow-visible p-3">
      {/* Image */}
      <div className="relative h-44 overflow-hidden rounded-2xl bg-[#EAF7F5]">
        <img
          src={categoryImages[pet.category]}
          alt={pet.name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        <span className="absolute right-3 top-3 rounded-lg bg-white/90 px-3 py-1 text-xs font-black text-[#078b91] shadow-sm">
          {categoryLabels[pet.category]}
        </span>
      </div>

      {/* Information */}
      <div className="px-1 pb-1 pt-4">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="truncate text-lg font-black text-[#101b3d]">
              {pet.name}
            </h3>

            <p className="mt-1 truncate text-sm font-semibold text-slate-500">
              {pet.breed}
            </p>
          </div>

          <button
            type="button"
            aria-label={`More actions for ${pet.name}`}
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[#101b3d] transition hover:bg-slate-100"
          >
            <EllipsisVertical size={19} />
          </button>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-slate-500">
          <CalendarDays size={16} className="shrink-0 text-[#078b91]" />

          <span>
            {age} {age === 1 ? "Year" : "Years"}
          </span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="mt-4 flex h-10 w-full items-center justify-center gap-2 whitespace-nowrap border-[#078b91] px-3 text-xs text-[#078b91]"
        onClick={() => navigate(`/doctors?petId=${pet.id}`)}
      >
        <CalendarDays size={15} />
        Book Appointment
      </Button>
    </Card>
  );
};

export default PetPreviewCard;
