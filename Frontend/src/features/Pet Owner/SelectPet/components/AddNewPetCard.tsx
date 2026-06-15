import { ChevronRight, Plus } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";

import Card from "@/shared/components/Card/Card";

const AddNewPetCard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const action = searchParams.get("action");

  const handleAddNewPet = () => {
    const continueQuery = action ? `&continue=${action}` : "";

    navigate(`/pet-owner/profile?action=add-pet${continueQuery}`);
  };

  return (
    <Card
      className="
        mx-auto mt-8 w-full max-w-2xl
        border border-orange-200
        bg-gradient-to-r from-orange-50 to-white
        p-0 shadow-sm
        transition duration-300
        hover:-translate-y-0.5 hover:border-orange-300 hover:shadow-md
      "
    >
      <button
        type="button"
        onClick={handleAddNewPet}
        className="flex w-full items-center gap-5 p-5 text-left sm:p-7"
      >
        <span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-orange-100 text-orange-500">
          <Plus size={34} />
        </span>

        <span className="min-w-0 flex-1">
          <span className="block text-xl font-black text-orange-500">
            Add New Pet
          </span>

          <span className="mt-1 block text-sm font-medium leading-6 text-slate-600">
            Go to your profile to add a new pet before continuing.
          </span>
        </span>

        <ChevronRight size={26} className="shrink-0 text-[#101b3d]" />
      </button>
    </Card>
  );
};

export default AddNewPetCard;