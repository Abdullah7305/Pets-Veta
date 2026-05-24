import { useState } from "react";

import AppointmentHeader from "../components/AppointmentHeader";
import BookingModal from "../components/BookingModal";
import DoctorFilters from "../components/DoctorFilters";
import DoctorGrid from "../components/DoctorGrid";

import { useAppointment } from "../hooks/useAppointment";

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
  const [bookingOpen, setBookingOpen] = useState(false);

  const selectedDoctor =
    filteredDoctors.find((d) => d.id === selectedDoctorId) ?? null;

  function handleOpenBooking(doctorId: string) {
    setSelectedDoctorId(doctorId);
    setBookingOpen(true);
  }

  function handleCloseBooking() {
    setBookingOpen(false);
  }

  function handleConfirmBooking() {
    const result = bookAppointment();
    setFeedback(result.message);
    if (result.success) {
      resetForm();
      window.setTimeout(() => {
        setBookingOpen(false);
        setFeedback(null);
      }, 1500);
    } else {
      window.setTimeout(() => setFeedback(null), 3500);
    }
  }

  return (
    <>
      <AppointmentHeader
        title="Appointment"
        subtitle="Find and book the right care for your pet"
        availableCount={filteredDoctors.length}
      />

      <main className="p-4 md:p-6">
        <section className="rounded-2xl bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <h2 className="text-base font-bold text-gray-800">Doctor List</h2>

            <div className="w-full sm:w-auto sm:max-w-lg sm:flex-1">
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
            onBookDoctor={handleOpenBooking}
          />
        </section>
      </main>

      <BookingModal
        isOpen={bookingOpen}
        onClose={handleCloseBooking}
        doctor={selectedDoctor}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
        selectedSlotId={selectedTimeSlotId}
        onSelectSlot={setSelectedTimeSlotId}
        onConfirm={handleConfirmBooking}
        isReady={isBookingReady}
        feedback={feedback}
      />
    </>
  );
}
