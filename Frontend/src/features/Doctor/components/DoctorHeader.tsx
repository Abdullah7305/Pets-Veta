import { Plus } from "lucide-react";
import Button from "../../../shared/components/Button/Button";
import type { DoctorHeaderProps } from "../doctor.types";

const DoctorHeader = ({ onOpenModal }: DoctorHeaderProps) => {
  return (
    <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div>
        <p className="text-xs font-black uppercase tracking-[0.25em] text-[#078b91]">
          Doctor Panel
        </p>

        <h1 className="mt-2 text-3xl font-black tracking-[-0.03em] text-[#101b3d]">
          My Availability
        </h1>

        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Set your appointment date and time slots so pet owners can book
          according to your schedule.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          type="button"
          className="flex h-12 w-auto items-center justify-center gap-2 px-5"
          onClick={onOpenModal}
        >
          <Plus size={18} />
          Add Time Slot
        </Button>
      </div>
    </div>
  );
};

export default DoctorHeader;
