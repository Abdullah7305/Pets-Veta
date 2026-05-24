import { SearchX } from "lucide-react";

import type { Doctor } from "../types/appointment.types";
import DoctorCard from "./DoctorCard";

type DoctorGridProps = {
  doctors: Doctor[];
  selectedDoctorId: string | null;
  onSelectDoctor: (doctorId: string) => void;
  onBookDoctor: (doctorId: string) => void;
  onMessageDoctor?: (doctorId: string) => void;
};

export default function DoctorGrid({
  doctors,
  selectedDoctorId,
  onSelectDoctor,
  onBookDoctor,
  onMessageDoctor,
}: DoctorGridProps) {
  if (doctors.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-blue-50">
          <SearchX size={22} className="text-blue-900" />
        </div>
        <p className="mt-4 text-sm font-semibold text-gray-700">
          No doctors found
        </p>
        <p className="mt-1 max-w-xs text-xs text-gray-500">
          Try adjusting your search or filters to find the right doctor for your pet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {doctors.map((doc) => (
        <DoctorCard
          key={doc.id}
          doctor={doc}
          isSelected={doc.id === selectedDoctorId}
          onSelect={onSelectDoctor}
          onBook={onBookDoctor}
          onMessage={onMessageDoctor}
        />
      ))}
    </div>
  );
}
