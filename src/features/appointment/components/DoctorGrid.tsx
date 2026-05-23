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
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white p-10 text-center text-sm text-gray-500">
        No doctors match your search.
      </div>
    );
  }

  return (
    // 2 columns by default, 3 columns on xl+ screens so cards are fully visible
    <div className="grid grid-cols-2 xl:grid-cols-2 gap-4">
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
