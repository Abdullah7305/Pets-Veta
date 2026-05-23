import { useMemo, useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarDays } from "lucide-react";

type AppointmentCalendarProps = {
  selectedDate: Date | null;
  onSelectDate: (date: Date) => void;
};

const WEEK_DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const MONTH_NAMES = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function isBeforeDay(a: Date, b: Date): boolean {
  const aStart = new Date(a.getFullYear(), a.getMonth(), a.getDate());
  const bStart = new Date(b.getFullYear(), b.getMonth(), b.getDate());
  return aStart.getTime() < bStart.getTime();
}

function formatDate(date: Date | null): string {
  if (!date) return "Select Date";
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return `${days[date.getDay()]}, ${date.getDate()} ${months[date.getMonth()]} ${date.getFullYear()}`;
}

export default function AppointmentCalendar({
  selectedDate,
  onSelectDate,
}: AppointmentCalendarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(() => {
    const base = selectedDate ?? new Date();
    return new Date(base.getFullYear(), base.getMonth(), 1);
  });

  const popupRef = useRef<HTMLDivElement>(null);
  const today = useMemo(() => new Date(), []);

  // Close popup when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (popupRef.current && !popupRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const { year, month, firstDayOfWeek, daysInMonth } = useMemo(() => {
    const y = viewDate.getFullYear();
    const m = viewDate.getMonth();
    return {
      year: y,
      month: m,
      firstDayOfWeek: new Date(y, m, 1).getDay(),
      daysInMonth: new Date(y, m + 1, 0).getDate(),
    };
  }, [viewDate]);

  const cells: (number | null)[] = useMemo(
    () => [
      ...Array<null>(firstDayOfWeek).fill(null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ],
    [firstDayOfWeek, daysInMonth],
  );

  function goPrev() {
    setViewDate(new Date(year, month - 1, 1));
  }
  function goNext() {
    setViewDate(new Date(year, month + 1, 1));
  }

  function handleSelectDate(date: Date) {
    onSelectDate(date);
    setIsOpen(false);
  }

  return (
    <div className="relative" ref={popupRef}>
      {/* ── Trigger Button ── */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none"
      >
        <CalendarDays size={16} className="shrink-0 text-blue-700" />
        <span className="flex-1">{formatDate(selectedDate)}</span>
        <svg
          className={`h-4 w-4 shrink-0 text-gray-400 transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* ── Calendar Popup ── */}
      {isOpen && (
        <div className="absolute left-0 top-full z-50 mt-2 w-full rounded-2xl border border-gray-100 bg-white p-4 shadow-xl">
          {/* Month header + nav */}
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-semibold text-gray-800">
              {MONTH_NAMES[month]} {year}
            </p>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous month"
                className="rounded-lg border border-gray-200 p-1.5 text-gray-600 transition hover:bg-gray-50"
              >
                <ChevronLeft size={16} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next month"
                className="rounded-lg border border-gray-200 p-1.5 text-gray-600 transition hover:bg-gray-50"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          {/* Weekday header */}
          <div className="mb-1 grid grid-cols-7 gap-1 text-center text-xs">
            {WEEK_DAYS.map((d, idx) => (
              <span
                key={d}
                className={`py-1 font-medium ${
                  idx === 0 || idx === 6 ? "text-rose-500" : "text-gray-600"
                }`}
              >
                {d}
              </span>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs">
            {cells.map((day, idx) => {
              if (day === null) {
                return <span key={`blank-${idx}`} className="py-1.5" />;
              }

              const cellDate = new Date(year, month, day);
              const isWeekend = cellDate.getDay() === 0 || cellDate.getDay() === 6;
              const isPast = isBeforeDay(cellDate, today);
              const isSelected = selectedDate !== null && isSameDay(cellDate, selectedDate);

              const base = "h-8 w-full rounded-full flex items-center justify-center transition";

              let cls: string;
              if (isSelected) {
                cls = `${base} bg-blue-900 font-semibold text-white shadow-sm`;
              } else if (isPast) {
                cls = `${base} text-gray-300 cursor-not-allowed`;
              } else if (isWeekend) {
                cls = `${base} text-rose-500 hover:bg-rose-50 cursor-pointer`;
              } else {
                cls = `${base} text-gray-700 hover:bg-blue-50 cursor-pointer`;
              }

              return (
                <button
                  key={`day-${day}`}
                  type="button"
                  disabled={isPast}
                  onClick={() => handleSelectDate(cellDate)}
                  className={cls}
                >
                  {day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
