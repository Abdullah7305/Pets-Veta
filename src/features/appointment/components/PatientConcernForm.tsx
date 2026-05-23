import { useState, useRef, useEffect } from "react";
import { FileText } from "lucide-react";

type PatientConcernFormProps = {
  value: string;
  onChange: (next: string) => void;
};

export default function PatientConcernForm({ value, onChange }: PatientConcernFormProps) {
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

  const preview = value.trim()
    ? value.trim().slice(0, 28) + (value.trim().length > 28 ? "…" : "")
    : "Add Patient Concerns";

  return (
    <div className="relative" ref={popupRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex w-full items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5 text-left text-sm font-medium text-gray-700 transition hover:border-blue-300 hover:bg-blue-50 focus:outline-none"
      >
        <FileText size={16} className="shrink-0 text-blue-700" />
        <span className={`flex-1 truncate ${!value.trim() ? "text-gray-400" : ""}`}>
          {preview}
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
          <p className="mb-2 text-xs font-semibold text-gray-600">Patient Concerns</p>
          <textarea
            rows={5}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            autoFocus
            placeholder={
              "e.g. Red, itchy skin for a week. Worse after sun.\nSymptoms:\n• Flaky patches\n• Mild burning\n• Skin sensitivity"
            }
            className="
              w-full rounded-xl border border-blue-200
              bg-white px-3 py-2.5
              text-sm text-gray-700 placeholder:text-gray-400
              outline-none transition focus:border-blue-600
              resize-none
            "
          />
          <div className="mt-2 flex justify-end">
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="rounded-lg bg-blue-900 px-4 py-1.5 text-xs font-medium text-white hover:bg-blue-800"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
