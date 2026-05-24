import { useEffect } from "react";
import { X, Stethoscope, DollarSign } from "lucide-react";

import Button from "../../../shared/components/Button/Button";
import type { Doctor } from "../types/appointment.types";

import AppointmentCalendar from "./AppointmentCalendar";
import AppointmentSlots from "./AppointmentSlots";

type BookingModalProps = {
  isOpen: boolean;
  onClose: () => void;
  doctor: Doctor | null;
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
  onConfirm: () => void;
  isReady: boolean;
  feedback?: string | null;
};

export default function BookingModal({
  isOpen,
  onClose,
  doctor,
  selectedDate,
  onSelectDate,
  selectedSlotId,
  onSelectSlot,
  onConfirm,
  isReady,
  feedback,
}: BookingModalProps) {
  useEffect(() => {
    if (!isOpen) return;
    function handleEsc(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleEsc);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, onClose]);

  if (!isOpen || !doctor) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
      className="fixed inset-0 z-50 flex items-end justify-center p-0 sm:items-center sm:p-4"
    >
      <div
        className="absolute inset-0 bg-gray-900/50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="relative z-10 flex max-h-[95vh] w-full max-w-md flex-col overflow-hidden rounded-t-2xl bg-white shadow-xl sm:rounded-2xl">

        <div className="flex items-start justify-between gap-3 border-b border-gray-100 p-5">
          <div className="flex min-w-0 items-start gap-3">
            <img
              src={doctor.image}
              alt={doctor.name}
              className="h-12 w-12 shrink-0 rounded-xl object-cover"
            />
            <div className="min-w-0">
              <h3
                id="booking-modal-title"
                className="text-base font-bold leading-snug text-gray-800"
              >
                Book with {doctor.name}
              </h3>
              <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <Stethoscope size={11} className="text-blue-900" />
                  {doctor.specialty}
                </span>
                <span className="flex items-center gap-1 text-xs text-gray-500">
                  <DollarSign size={11} className="text-blue-900" />
                  ${doctor.fee}/hour
                </span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking dialog"
            className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-gray-500 transition hover:bg-gray-100 hover:text-gray-800"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5">
          <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Select Date
          </p>
          <AppointmentCalendar
            selectedDate={selectedDate}
            onSelectDate={onSelectDate}
          />

          <p className="mt-5 mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
            Select Time
          </p>
          <AppointmentSlots
            selectedDate={selectedDate}
            selectedSlotId={selectedSlotId}
            onSelectSlot={onSelectSlot}
          />
        </div>

        <div className="border-t border-gray-100 p-5">
          <Button
            variant="primary"
            onClick={onConfirm}
            disabled={!isReady}
            className={!isReady ? "opacity-60" : ""}
          >
            Confirm Booking
          </Button>

          {feedback && (
            <p
              role="status"
              aria-live="polite"
              className="mt-3 text-center text-xs font-medium text-blue-900"
            >
              {feedback}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
