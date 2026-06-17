import {
  ArrowRight,
  PawPrint,
  Plus,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import type { Pet } from "../types/petOwnerDashboard.types";

import PetPreviewCard from "./PetPreviewCard";

type MyPetsPreviewProps = {
  pets: Pet[];
};

const MyPetsPreview = ({ pets }: MyPetsPreviewProps) => {
  const navigate = useNavigate();

  return (
    <Card className="min-w-0 p-5 sm:p-6">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <PawPrint size={25} className="text-[#078b91]" />

          <h2 className="text-xl font-black text-[#101b3d]">
            My Pets
          </h2>
        </div>

        <button
          type="button"
          onClick={() => navigate("/pet-owner/profile")}
          className="flex w-fit items-center gap-2 text-sm font-black text-[#078b91]"
        >
          View All Pets
          <ArrowRight size={17} />
        </button>
      </div>

      {pets.length === 0 ? (
        <div className="mt-5 rounded-2xl border border-dashed border-slate-300 px-5 py-12 text-center">
          <PawPrint
            size={45}
            className="mx-auto text-[#D4E2E0]"
          />

          <h3 className="mt-4 text-lg font-black text-[#101b3d]">
            No pets added yet
          </h3>

          <p className="mt-2 text-sm font-medium text-slate-500">
            Add your first pet to book appointments.
          </p>

          <Button
            type="button"
            className="mx-auto mt-5 flex w-auto items-center gap-2 px-5"
            onClick={() => navigate("/pet-owner/pets/add")}
          >
            <Plus size={17} />
            Add New Pet
          </Button>
        </div>
      ) : (
        <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {pets.slice(0, 3).map((pet) => (
            <PetPreviewCard key={pet.id} pet={pet} />
          ))}
        </div>
      )}

      {/* Bottom Add Pet Button */}
      <div className="mt-5 flex justify-end">
        <Button
          type="button"
          variant="outline"
          className="flex h-10 w-auto items-center gap-2 border-[#078b91] px-5 text-[#078b91]"
          onClick={() => navigate("/pet-owner/pets/add")}
        >
          <Plus size={17} />
          Add New Pet
        </Button>
      </div>
    </Card>
  );
};

export default MyPetsPreview;