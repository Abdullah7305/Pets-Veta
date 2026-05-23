import {
  Stethoscope,
  DollarSign,
  Award,
  ShieldPlus,
  Star,
} from "lucide-react";

import Button from "../../../shared/components/Button/Button";
import type { Doctor } from "../types/appointment.types";

type DoctorDetailPanelProps = {
  doctor: Doctor | null;
  onBook: () => void;
};

/**
 * Render the rating row as 5 stars (full / half / empty) by comparing the
 * rating against each star's threshold.
 */
function RatingStars({ rating }: { rating: number }) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex items-center gap-1">
      {stars.map((idx) => {
        const filled = rating >= idx;
        const half = !filled && rating >= idx - 0.5;
        return (
          <Star
            key={idx}
            size={16}
            className={
              filled
                ? "fill-amber-400 text-amber-400"
                : half
                  ? "fill-amber-200 text-amber-400"
                  : "fill-gray-200 text-gray-200"
            }
          />
        );
      })}
      <span className="ml-1 text-xs font-semibold text-gray-700">
        {rating.toFixed(1)}
      </span>
    </div>
  );
}

export default function DoctorDetailPanel({
  doctor,
  onBook,
}: DoctorDetailPanelProps) {
  if (!doctor) {
    return (
      <div
        className="
          flex h-full items-center justify-center
          rounded-2xl border border-dashed border-gray-200
          bg-white p-10 text-center text-sm text-gray-500
        "
      >
        Select a doctor to see details.
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-5 shadow-sm">
      {/* Photo */}
      <div className="overflow-hidden rounded-xl bg-gray-50">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="h-56 w-full object-cover"
        />
      </div>

      {/* Identity */}
      <h2 className="mt-4 text-base font-bold text-gray-800">{doctor.name}</h2>

      <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500">
        <span className="flex items-center gap-1.5">
          <Stethoscope size={12} />
          {doctor.specialty}
        </span>
        <span className="flex items-center gap-1.5">
          <DollarSign size={12} />${doctor.fee}/hour
        </span>
      </div>

      {/* Experience */}
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
          <Award size={16} />
          <span>Experience</span>
        </div>
        <p className="text-xs leading-5 text-gray-600">{doctor.experience}</p>
      </div>

      {/* Speciality */}
      <div className="mt-5">
        <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-blue-900">
          <ShieldPlus size={16} />
          <span>Speciality</span>
        </div>
        <ul className="space-y-1 text-xs text-gray-600">
          {doctor.specialties.map((s) => (
            <li key={s} className="flex items-start gap-2">
              <span className="mt-1.5 inline-block h-1 w-1 shrink-0 rounded-full bg-blue-900" />
              <span>{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Reviews */}
      <div className="mt-5">
        <p className="mb-2 text-sm font-semibold text-gray-800">Reviews</p>

        {doctor.reviews.length === 0 ? (
          <p className="text-xs text-gray-500">No reviews yet.</p>
        ) : (
          <div className="space-y-3">
            {doctor.reviews.slice(0, 2).map((rev) => (
              <div
                key={rev.id}
                className="rounded-xl border border-gray-100 bg-gray-50 p-3"
              >
                <RatingStars rating={rev.rating} />
                <p className="mt-2 text-xs leading-5 text-gray-600">
                  &ldquo;{rev.comment}&rdquo;
                </p>
                <p className="mt-1 text-[11px] font-medium text-gray-500">
                  — {rev.reviewerName}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* CTA */}
      <div className="mt-5">
        <Button variant="primary" onClick={onBook}>
          Book Appointment
        </Button>
      </div>
    </div>
  );
}
