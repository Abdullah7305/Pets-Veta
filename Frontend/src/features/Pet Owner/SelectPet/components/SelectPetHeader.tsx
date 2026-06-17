import { PawPrint } from "lucide-react";

const SelectPetHeader = () => {
  return (
    <header className="text-center">
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-[#EAF7F5] text-[#078b91]">
        <PawPrint size={30} />
      </div>

      <h1 className="mt-5 text-3xl font-black tracking-[-0.04em] text-[#101b3d] sm:text-4xl">
        Choose Your Pet
      </h1>

      <p className="mx-auto mt-3 max-w-xl text-sm font-medium leading-6 text-slate-500 sm:text-base">
        Select one of your existing pets or go to your profile to add a new
        pet.
      </p>
    </header>
  );
};

export default SelectPetHeader;