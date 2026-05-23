import { useMemo, useState, useRef, useEffect } from "react";
import { Clock } from "lucide-react";
import type { TimeSlot } from "../types/appointment.types";

type AppointmentSlotsProps = {
  selectedDate: Date | null;
  selectedSlotId: string | null;
  onSelectSlot: (slotId: string) => void;
};

const DAY_NAMES = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const MONTH_NAMES = ["January","February","March","April","May","June","July","August","September","October","November","December"];

const DEFAULT_SLOTS: TimeSlot[] = [
  { id: "0800", label: "08:00 AM" },
  { id: "0900", label: "09:00 AM" },
  { id: "1000", label: "10:00 AM" },
  { id: "1100", label: "11:00 AM", disabled: true },
  { id: "1230", label: "12.30 PM" },
  { id: "1330", label: "01.30 PM" },
  { id: "1430", label: "02.30 PM" },
  { id: "1530", label: "03.30 PM" },
  { id: "1630", label: "04.30 PM" },
  { id: "1730", label: "05.30 PM" },
];

function formatDate(date: Date | null): string {
  if (!date) return "Select Time Slot";
  const day = DAY_NAMES[date.getDay()].slice(0, 3);
  return `${day}, ${date.getDate()} ${MONTH_NAMES[date.getMonth()]} ${date.getFullYear()}`;
}

function getSlotLabel(slotId: string | null): string {
  if (!slotId) return "Select Time Slot";
  const slot = DEFAULT_SLOTS.find((s) => s.id === slotId);
  return slot ? slot.label : "Select Time Slot";
}

export default function AppointmentSlots({
  selectedDate,
  selectedSlotId,
  onSelectSlot,
}: AppointmentSlotsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const headerLabel = useMemo(() => formatDate(selectedDate), [selectedDate]);

  return (
    <div className="relative" ref={popupRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none"
      >
        <Clock size={16} className="shrink-0 text-blue-700" />
        <span className="flex-1">
          {selectedSlotId ? getSlotLabel(selectedSlotId) : "Select Time Slot"}
        </span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Popup */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
          <p className="mb-3 text-xs font-semibold text-gray-600">{headerLabel}</p>
          <div className="grid grid-cols-2 gap-2">
            {DEFAULT_SLOTS.map((slot) => {
              const isSelected = slot.id === selectedSlotId;
              const isDisabled = slot.disabled === true;
              const base = "rounded-lg border px-3 py-2 text-xs font-medium transition";
              let cls: string;
              if (isDisabled) {
                cls = `${base} border-gray-200 bg-gray-50 text-gray-300 cursor-not-allowed`;
              } else if (isSelected) {
                cls = `${base} border-blue-900 bg-blue-900 text-white shadow-sm`;
              } else {
                cls = `${base} border-gray-200 bg-white text-gray-700 hover:border-blue-900 hover:text-blue-900`;
              }
              return (
                <button
                  key={slot.id}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => { onSelectSlot(slot.id); setIsOpen(false); }}
                  className={cls}
                >
                  {slot.label}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
