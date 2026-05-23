import { useMemo, useState } from "react";

import { doctors as ALL_DOCTORS } from "../data/doctors";
import type { Doctor, DoctorId, SortKey } from "../types/appointment.types";

/**
 * Centralised state for the Appointment page.
 *
 * Exposes:
 *  - filtering   (search + specialty + sort)
 *  - selection   (doctor / date / time-slot)
 *  - form value  (patient concerns)
 *  - actions     (bookAppointment, resetForm)
 *
 * Plain React hooks only — no external state library.
 */
export function useAppointment() {
  // ── Filtering state ─────────────────────────────────────────────
  const [searchTerm, setSearchTerm] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortKey>("rating");

  // ── Selection state ─────────────────────────────────────────────
  const [selectedDoctorId, setSelectedDoctorId] = useState<DoctorId | null>(
    ALL_DOCTORS[0]?.id ?? null,
  );
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
  const [selectedTimeSlotId, setSelectedTimeSlotId] = useState<string | null>(
    null,
  );

  // ── Form state ─────────────────────────────────────────────────
  const [patientConcerns, setPatientConcerns] = useState("");

  // ── Derived: filtered doctors ──────────────────────────────────
  const filteredDoctors: Doctor[] = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();

    const matches = ALL_DOCTORS.filter((doc) => {
      const matchesSearch =
        term.length === 0 ||
        doc.name.toLowerCase().includes(term) ||
        doc.specialty.toLowerCase().includes(term);

      const matchesSpecialty =
        !specialtyFilter || doc.specialty === specialtyFilter;

      return matchesSearch && matchesSpecialty;
    });

    const sorted = [...matches].sort((a, b) => {
      switch (sortBy) {
        case "feeAsc":
          return a.fee - b.fee;
        case "feeDesc":
          return b.fee - a.fee;
        case "experience":
          return b.experience.length - a.experience.length;
        case "rating":
        default:
          return b.rating - a.rating;
      }
    });

    return sorted;
  }, [searchTerm, specialtyFilter, sortBy]);

  // ── Derived: selected doctor object ────────────────────────────
  const selectedDoctor: Doctor | null = useMemo(
    () =>
      ALL_DOCTORS.find((d) => d.id === selectedDoctorId) ??
      filteredDoctors[0] ??
      null,
    [selectedDoctorId, filteredDoctors],
  );

  // ── Actions ────────────────────────────────────────────────────
  const isBookingReady = Boolean(
    selectedDoctor && selectedDate && selectedTimeSlotId,
  );

  function bookAppointment(): {
    success: boolean;
    message: string;
  } {
    if (!isBookingReady) {
      return {
        success: false,
        message: "Please select a doctor, date and time slot first.",
      };
    }

    // In a real app this would call the backend.
    // eslint-disable-next-line no-console
    console.log("[Appointment] booked:", {
      doctorId: selectedDoctor?.id,
      doctorName: selectedDoctor?.name,
      date: selectedDate?.toISOString(),
      timeSlotId: selectedTimeSlotId,
      patientConcerns,
    });

    return {
      success: true,
      message: `Appointment booked with ${selectedDoctor?.name}.`,
    };
  }

  function resetForm() {
    setSelectedTimeSlotId(null);
    setPatientConcerns("");
  }

  return {
    // data
    allDoctors: ALL_DOCTORS,
    filteredDoctors,
    selectedDoctor,

    // filters
    searchTerm,
    setSearchTerm,
    specialtyFilter,
    setSpecialtyFilter,
    sortBy,
    setSortBy,

    // selection
    selectedDoctorId,
    setSelectedDoctorId,
    selectedDate,
    setSelectedDate,
    selectedTimeSlotId,
    setSelectedTimeSlotId,

    // form
    patientConcerns,
    setPatientConcerns,

    // actions
    isBookingReady,
    bookAppointment,
    resetForm,
  };
}

export type UseAppointmentReturn = ReturnType<typeof useAppointment>;
