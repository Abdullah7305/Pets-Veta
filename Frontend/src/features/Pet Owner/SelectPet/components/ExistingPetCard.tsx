import {
  CalendarDays,
  MoreVertical,
  UserRound,
} from "lucide-react";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type { ExistingPet, ExistingPetCardProps } from "../types/selectPet.types";

const formatCategory = (category: ExistingPet["category"]) => {
  return (
    category.charAt(0).toUpperCase() +
    category.slice(1).toLowerCase()
  );
};

const ExistingPetCard = ({
  pet,
  onSelect,
}: ExistingPetCardProps) => {
  return (
    <Card
      className="
        overflow-hidden border border-slate-200
        bg-white p-4 shadow-sm
        transition duration-300
        hover:-translate-y-1 hover:shadow-lg
      "
    >
      <div className="flex gap-4">
        <div className="h-40 w-36 shrink-0 overflow-hidden rounded-2xl bg-[#EAF7F5] sm:h-44 sm:w-40">
          <img
            src={pet.profileImageUrl}
            alt={pet.name}
            className="h-full w-full object-cover transition duration-300 hover:scale-105"
          />
        </div>

        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-[#101b3d]">
                {pet.name}
              </h2>

              <p className="mt-2 text-sm font-semibold text-slate-500">
                {formatCategory(pet.category)}

                <span className="mx-2 text-[#078b91]">•</span>

                {pet.breed}
              </p>
            </div>

            <button
              type="button"
              aria-label={`More options for ${pet.name}`}
              className="rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-[#078b91]"
            >
              <MoreVertical size={20} />
            </button>
          </div>

          <div className="mt-5 space-y-3">
            <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <CalendarDays size={17} className="text-[#078b91]" />

              <span>
                {pet.age} {pet.age === 1 ? "Year" : "Years"}
              </span>
            </div>

            {pet.gender && (
              <div className="flex items-center gap-2 text-sm font-medium text-slate-600">
                <UserRound size={17} className="text-[#078b91]" />
                <span>{pet.gender}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        className="
          mt-4 h-11 w-full
          border-[#078b91] text-[#078b91]
          hover:bg-[#078b91] hover:text-white
        "
        onClick={() => onSelect(pet)}
      >
        Select Pet
      </Button>
    </Card>
  );
};

export default ExistingPetCard;
