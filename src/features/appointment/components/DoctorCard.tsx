import { Stethoscope, DollarSign, MessageSquare } from "lucide-react";

import Button from "../../../shared/components/Button/Button";
import type { Doctor } from "../types/appointment.types";

type DoctorCardProps = {
  doctor: Doctor;
  isSelected: boolean;
  onSelect: (doctorId: string) => void;
  onBook: (doctorId: string) => void;
  onMessage?: (doctorId: string) => void;
};

export default function DoctorCard({
  doctor,
  isSelected,
  onSelect,
  onBook,
  onMessage,
}: DoctorCardProps) {
  return (
    <div
      className={`
        rounded-2xl bg-white p-4 shadow-sm
        transition duration-300
        hover:shadow-md
        ${
          isSelected
            ? "ring-2 ring-blue-900"
            : "ring-1 ring-gray-100 hover:ring-blue-100"
        }
      `}
    >
      {/* Top: image + info */}
      <div className="flex items-start gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          {/* Full name — no truncate */}
          <h3 className="text-sm font-bold text-gray-800 leading-snug">
            {doctor.name}
          </h3>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
            <Stethoscope size={12} className="shrink-0 text-blue-900" />
            <span>{doctor.specialty}</span>
          </p>

          <p className="mt-1 flex items-center gap-1.5 text-xs text-gray-500">
            <DollarSign size={12} className="shrink-0 text-blue-900" />
            <span>${doctor.fee}/hour</span>
          </p>
        </div>
      </div>

      {/* Bottom: actions */}
      <div className="mt-4 flex items-center gap-2">
        <Button
          variant="primary"
          onClick={() => onBook(doctor.id)}
          className="flex-1 py-2 text-xs whitespace-nowrap"
        >
          Book Now
        </Button>

        <Button
          variant="outline"
          onClick={() => onSelect(doctor.id)}
          className="flex-1 py-2 text-xs whitespace-nowrap"
        >
          Detail
        </Button>

        <button
          type="button"
          aria-label={`Message ${doctor.name}`}
          onClick={() => onMessage?.(doctor.id)}
          className="
            flex h-9 w-9 shrink-0 items-center justify-center
            rounded-lg border border-gray-200 text-gray-500
            transition hover:bg-gray-50 hover:text-blue-900
          "
        >
          <MessageSquare size={16} />
        </button>
      </div>
    </div>
  );
}
