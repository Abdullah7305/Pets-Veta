import { Stethoscope, DollarSign, MessageSquare, Star, Calendar } from "lucide-react";

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
  const availabilityLabel = formatAvailability(doctor.availability);

  return (
    <article
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
      <div className="flex items-start gap-3">
        <img
          src={doctor.image}
          alt={doctor.name}
          loading="lazy"
          className="h-16 w-16 shrink-0 rounded-xl object-cover"
        />

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-bold leading-snug text-gray-800">
            {doctor.name}
          </h3>

          <p className="mt-1.5 flex items-center gap-1.5 text-xs text-gray-500">
            <Stethoscope size={12} className="shrink-0 text-blue-900" />
            <span className="truncate">{doctor.specialty}</span>
          </p>

          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="flex items-center gap-1.5 text-xs text-gray-500">
              <DollarSign size={12} className="shrink-0 text-blue-900" />
              <span>${doctor.fee}/hour</span>
            </p>
            <div
              className="flex items-center gap-0.5"
              aria-label={`Rating ${doctor.rating} out of 5`}
            >
              <Star size={12} className="fill-blue-900 text-blue-900" />
              <span className="text-xs font-semibold text-gray-700">
                {doctor.rating.toFixed(1)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {availabilityLabel && (
        <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-blue-50 px-2.5 py-1.5">
          <Calendar size={11} className="shrink-0 text-blue-900" />
          <span className="truncate text-[11px] font-medium text-blue-900">
            {availabilityLabel}
          </span>
        </div>
      )}

      <div className="mt-3 flex items-center gap-2">
        <Button
          variant="primary"
          onClick={() => onBook(doctor.id)}
          className="flex-1 whitespace-nowrap py-2 text-xs"
        >
          Book Now
        </Button>

        <Button
          variant="outline"
          onClick={() => onSelect(doctor.id)}
          className="flex-1 whitespace-nowrap py-2 text-xs"
        >
          Detail
        </Button>

        <button
          type="button"
          aria-label={`Message ${doctor.name}`}
          onClick={() => onMessage?.(doctor.id)}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:bg-gray-50 hover:text-blue-900"
        >
          <MessageSquare size={16} />
        </button>
      </div>
    </article>
  );
}

function formatAvailability(days: string[]): string {
  if (!days || days.length === 0) return "";
  if (days.length === 7) return "Available all week";
  if (days.length >= 5) return `Available ${days[0]}–${days[days.length - 1]}`;
  return `Available ${days.join(", ")}`;
}
