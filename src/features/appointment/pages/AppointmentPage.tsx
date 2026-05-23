import { useState } from "react";

import DoctorDashboardHeader from "../../DoctorDashboard/components/DoctorDashboardHeader";
import Button from "../../../shared/components/Button/Button";

import AppointmentCalendar from "../components/AppointmentCalendar";
import AppointmentSlots from "../components/AppointmentSlots";
import DoctorFilters from "../components/DoctorFilters";
import DoctorGrid from "../components/DoctorGrid";

import { useAppointment } from "../hooks/useAppointment";

/**
 * Appointment booking page.
 *
 * Layout:
 *  - Left column  (narrow ~280px) → Booking panel (calendar + slots + CTA)
 *  - Right column (wide, flex-1)  → Doctor list (search/filter + card grid)
 *
 * Detail Doctor panel REMOVED — page only shows listing.
 * PatientConcernForm REMOVED from booking panel.
 */
export default function AppointmentPage() {
  const {
    filteredDoctors,
    searchTerm,
    setSearchTerm,
    specialtyFilter,
    setSpecialtyFilter,
    sortBy,
    setSortBy,
    selectedDoctorId,
    setSelectedDoctorId,
    selectedDate,
    setSelectedDate,
    selectedTimeSlotId,
    setSelectedTimeSlotId,
    isBookingReady,
    bookAppointment,
    resetForm,
  } = useAppointment();

  const [feedback, setFeedback] = useState<string | null>(null);

  function handleBook() {
    const result = bookAppointment();
    setFeedback(result.message);
    if (result.success) resetForm();
    window.setTimeout(() => setFeedback(null), 3500);
  }

  return (
    <>
      <DoctorDashboardHeader title="Appointment" />

      <main className="p-4 md:p-6">
        <div className="flex gap-4 md:gap-6 items-start">

          {/* ─── LEFT: Booking Appointment (narrow) ─── */}
          {/* <section className="w-[260px] shrink-0 rounded-2xl bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-base font-bold text-gray-800">
              Booking Appointment
            </h2> */}

            {/* <AppointmentCalendar
              selectedDate={selectedDate}
              onSelectDate={setSelectedDate}
            /> */}

            {/* <div className="mt-5">
              <AppointmentSlots
                selectedDate={selectedDate}
                selectedSlotId={selectedTimeSlotId}
                onSelectSlot={setSelectedTimeSlotId}
              />
            </div> */}
{/* 
            <div className="mt-5">
              <Button
                variant="primary"
                onClick={handleBook}
                disabled={!isBookingReady}
                className={!isBookingReady ? "opacity-60" : ""}
              >
                Book Appointment
              </Button>
            </div> */}
{/* 
            {feedback && (
              <p className="mt-3 text-center text-xs font-medium text-blue-900">
                {feedback}
              </p>
            )}
          </section> */}

          {/* ─── RIGHT: Doctor List (wide, takes remaining space) ─── */}
          <section className="flex-1 min-w-0 rounded-2xl bg-white p-5 shadow-sm">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-bold text-gray-800">Doctor List</h2>

              <div className="w-full sm:w-auto sm:flex-1 sm:max-w-lg">
                <DoctorFilters
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  specialtyFilter={specialtyFilter}
                  onSpecialtyChange={setSpecialtyFilter}
                  sortBy={sortBy}
                  onSortChange={setSortBy}
                />
              </div>
            </div>

            <DoctorGrid
              doctors={filteredDoctors}
              selectedDoctorId={selectedDoctorId}
              onSelectDoctor={setSelectedDoctorId}
              onBookDoctor={(id) => {
                setSelectedDoctorId(id);
              }}
            />
          </section>

        </div>
      </main>
    </>
  );
}
