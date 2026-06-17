import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";

import Button from "@/shared/components/Button/Button";
import Card from "@/shared/components/Card/Card";

import AddNewPetCard from "../components/AddNewPetCard";
import ExistingPetsSection from "../components/ExistingPetsSection";
import SelectPetHeader from "../components/SelectPetHeader";

import { existingPets } from "../data/selectPet.data";

import type {
  ExistingPet,
  SelectPetAction,
} from "../types/selectPet.types";

const SelectPetPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const action = searchParams.get("action") as SelectPetAction | null;

  const handleSelectPet = (pet: ExistingPet) => {
    if (action === "report-issue") {
      navigate(`/pet-owner/pets/${pet.id}/report-issue`);
      return;
    }

    if (action === "book-appointment") {
      navigate(`/doctors?petId=${pet.id}`);
      return;
    }

    navigate(`/pet-owner/pets/${pet.id}`);
  };

  const handleGoToProfile = () => {
    const continueQuery = action ? `&continue=${action}` : "";

    navigate(`/pet-owner/profile?action=add-pet${continueQuery}`);
  };

  return (
    <main className="min-h-screen bg-[#F8FAFA] px-4 py-5 text-[#20263D] sm:px-6 lg:px-10">
      <section className="mx-auto max-w-7xl">
        {/* Top bar */}
        <div className="flex items-center justify-between gap-4">
          <Button
            type="button"
            variant="outline"
            className="flex h-11 w-auto items-center gap-2 px-4"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </Button>

          <div className="hidden items-center gap-3 sm:flex">
            <div className="h-11 w-11 overflow-hidden rounded-full bg-[#EAF7F5]">
              <img
                src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80"
                alt="Pet owner"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <p className="text-sm font-black text-[#101b3d]">
                Ayesha Khan
              </p>

              <p className="text-xs font-semibold text-slate-500">
                Pet Parent
              </p>
            </div>
          </div>
        </div>

        <div className="mt-5">
          <SelectPetHeader />
        </div>

        <AddNewPetCard />

        <ExistingPetsSection
          pets={existingPets}
          onSelectPet={handleSelectPet}
        />

        {/* Shared helper card */}
        <Card
          className="
            mt-8 border border-[#D4E2E0]
            bg-[#EAF7F5]/70 p-5 shadow-none sm:p-6
          "
        >
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white text-[#078b91] shadow-sm">
                <ShieldCheck size={24} />
              </div>

              <div>
                <h3 className="text-base font-black text-[#078b91]">
                  Can&apos;t find your pet?
                </h3>

                <p className="mt-1 max-w-2xl text-sm font-medium leading-6 text-slate-600">
                  Add a new pet from your profile to access appointments,
                  reports, and other pet-care features.
                </p>
              </div>
            </div>

            <Button
              type="button"
              variant="outline"
              className="
                flex h-11 w-auto shrink-0 items-center gap-2
                border-[#078b91] px-5 text-[#078b91]
              "
              onClick={handleGoToProfile}
            >
              Go to Profile
              <ArrowRight size={18} />
            </Button>
          </div>
        </Card>
      </section>
    </main>
  );
};

export default SelectPetPage;