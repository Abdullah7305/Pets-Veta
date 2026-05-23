import { useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";

import { allSpecialties } from "../data/doctors";
import type { SortKey } from "../types/appointment.types";

type DoctorFiltersProps = {
  searchTerm: string;
  onSearchChange: (value: string) => void;

  specialtyFilter: string | null;
  onSpecialtyChange: (value: string | null) => void;

  sortBy: SortKey;
  onSortChange: (value: SortKey) => void;
};

const SORT_OPTIONS: { value: SortKey; label: string }[] = [
  { value: "rating", label: "Highest Rated" },
  { value: "feeAsc", label: "Lowest Fee" },
  { value: "feeDesc", label: "Highest Fee" },
  { value: "experience", label: "Most Experienced" },
];

/**
 * Search + filter row above the doctor grid.
 *
 * Uses a raw `<input type="search">` (same pattern as `DoctorDashboardHeader`)
 * instead of the labeled shared `Input`, because here we want an inline search
 * without a visible label — matching the existing dashboard.
 */
export default function DoctorFilters({
  searchTerm,
  onSearchChange,
  specialtyFilter,
  onSpecialtyChange,
  sortBy,
  onSortChange,
}: DoctorFiltersProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative flex-1 min-w-[180px]">
        <Search
          size={16}
          className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400"
        />
        <input
          type="search"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search Doctor"
          className="
            w-full rounded-xl border border-gray-200 bg-gray-50
            py-2.5 pr-3 pl-9
            text-sm text-gray-700 outline-none transition
            focus:border-blue-600 focus:bg-white
          "
        />
      </div>

      {/* Filter */}
      <div className="relative">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="
            flex items-center gap-2 rounded-xl
            border border-gray-200 bg-white
            px-4 py-2.5 text-sm font-medium text-gray-700
            transition hover:bg-gray-50
          "
        >
          <span>Filter</span>
          <SlidersHorizontal size={14} />
        </button>

        {open && (
          <div
            className="
              absolute right-0 z-20 mt-2 w-60 rounded-xl
              border border-gray-100 bg-white p-4 shadow-lg
            "
          >
            {/* Specialty */}
            <p className="mb-2 text-xs font-semibold text-gray-700">
              Specialty
            </p>
            <select
              value={specialtyFilter ?? ""}
              onChange={(e) =>
                onSpecialtyChange(
                  e.target.value === "" ? null : e.target.value,
                )
              }
              className="
                mb-4 w-full rounded-lg border border-gray-200
                bg-white px-3 py-2 text-sm text-gray-700 outline-none
                focus:border-blue-600
              "
            >
              <option value="">All specialties</option>
              {allSpecialties.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>

            {/* Sort */}
            <p className="mb-2 text-xs font-semibold text-gray-700">Sort by</p>
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value as SortKey)}
              className="
                w-full rounded-lg border border-gray-200
                bg-white px-3 py-2 text-sm text-gray-700 outline-none
                focus:border-blue-600
              "
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            <div className="mt-4 flex justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-xs font-semibold text-blue-900 hover:underline"
              >
                Done
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
