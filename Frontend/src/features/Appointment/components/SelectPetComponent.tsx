import { useState } from "react";
import { Search, PawPrint, CheckCircle2, ArrowRight, PlusCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import Button from "@/shared/components/Button/Button";
import PetListingModal from "./PetListModal"; 

interface SelectedPetState {
  id: string;
  name: string;
  photoUrl?: string;
}

interface SelectPetStepProps {
  onNextStep: (petId: string) => void;
}

const SelectPetStep = ({ onNextStep }: SelectPetStepProps) => {
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedPet, setSelectedPet] = useState<SelectedPetState | null>(null);

  const handlePetSelect = (name: string, photoUrl: string | undefined, id: string) => {
    setSelectedPet({ id, name, photoUrl });
    localStorage.setItem("petPatientId", id);
    setIsSelectModalOpen(false);
  };

  const handleNextStep = () => {
    const savedPetId = localStorage.getItem("petPatientId");

    if (!savedPetId) {
      alert("Please select a pet before proceeding to the next step.");
      return;
    }

    onNextStep(savedPetId);
  };

  return (
    <>
      <section className="w-full max-w-2xl mx-auto flex flex-col gap-6 text-[#1F1F2E]">
        <div className="mb-2">
          <h2 className="text-2xl font-black tracking-tight text-[#4c249f]">
            Who is this appointment for?
          </h2>
          <p className="text-sm font-semibold text-slate-500 mt-1">
            Choose an existing pet from your profile or register a new one.
          </p>
        </div>

        <div className="relative overflow-hidden rounded-3xl border-2 border-purple-100 bg-white p-6 shadow-xl shadow-purple-200/40 transition-all hover:border-purple-200">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">

              {selectedPet?.photoUrl ? (
                <div className="h-14 w-14 shrink-0 overflow-hidden rounded-2xl border-2 border-purple-200">
                  <img
                    src={selectedPet.photoUrl}
                    alt={selectedPet.name}
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#F4ECFF] text-[#6D3DD9]">
                  <Search size={28} />
                </div>
              )}

              <div>
                <h3 className="text-lg font-black text-slate-800">
                  Select Existing Pet
                </h3>
                {selectedPet ? (
                  <div className="mt-2 flex items-center gap-2 rounded-xl bg-green-50 px-3 py-2 border border-green-100">
                    <CheckCircle2 size={16} className="text-green-600 shrink-0" />
                    <span className="text-sm font-semibold text-green-700">
                      Selected: {selectedPet.name}
                    </span>
                  </div>
                ) : (
                  <p className="mt-1 text-sm font-medium text-slate-500">
                    Pick a pet you have already registered with us.
                  </p>
                )}
              </div>
            </div>

            <Button
              type="button"
              onClick={() => setIsSelectModalOpen(true)}
              className="shrink-0 bg-[#6D3DD9] hover:bg-[#5630B2] text-white shadow-md shadow-purple-200"
            >
              {selectedPet ? "Change Pet" : "Select Pet"}
            </Button>
          </div>
        </div>

        <div className="flex items-center gap-4 py-2">
          <div className="h-[1px] flex-1 bg-slate-200"></div>
          <span className="text-xs font-black uppercase tracking-wider text-slate-400">
            OR
          </span>
          <div className="h-[1px] flex-1 bg-slate-200"></div>
        </div>

        <NavLink
          to="/pet-owner/profile"
          className="group relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-3xl border-2 border-dashed border-purple-200 bg-[#F6F0FF]/50 p-8 text-center transition-all hover:border-[#6D3DD9] hover:bg-[#F4ECFF] focus:outline-none focus:ring-4 focus:ring-purple-100"
        >
          <div className="absolute -right-6 -top-6 text-[#6D3DD9]/5 transition-transform group-hover:scale-110 group-hover:text-[#6D3DD9]/10">
            <PawPrint size={120} />
          </div>

          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-md shadow-purple-200 text-[#6D3DD9] transition-transform group-hover:scale-110 group-hover:bg-[#6D3DD9] group-hover:text-white">
            <PlusCircle size={32} />
          </div>

          <div className="relative">
            <h3 className="text-lg font-black text-slate-800 flex items-center justify-center gap-2">
              Create Pet in Profile
              <ArrowRight size={18} className="text-[#6D3DD9] transition-transform group-hover:translate-x-1" />
            </h3>
            <p className="mt-1 text-sm font-medium text-slate-500">
              Head over to your profile to add a new furry friend, then return here to book.
            </p>
          </div>
        </NavLink>

        <div className="mt-4 flex justify-end">
          <Button
            type="button"
            onClick={handleNextStep}
            className="px-8 py-3 font-black text-base bg-[#4c249f] hover:bg-[#3b1b7e] text-white rounded-2xl shadow-lg transition-all flex items-center gap-2"
          >
            Next
            <ArrowRight size={18} />
          </Button>
        </div>
      </section>

      {isSelectModalOpen && (
        <PetListingModal
          onClose={() => setIsSelectModalOpen(false)}
          onSelect={handlePetSelect}
        />
      )}
    </>
  );
};

export default SelectPetStep;