import { X } from "lucide-react";
import Button from "../../../shared/components/Button/Button";
import type { WeekDay } from "./DoctorTypes";
import { weekDays } from "./DoctorTypes";
import type { AddSlotModalProps } from "../doctor.types";

const AddSlotModal = ({
    isOpen,
    onClose,
    slotForm,
    setSlotForm,
    handleAddSlot,
    error,
    resetSlotForm,
    setError,
}: AddSlotModalProps) => {
    if (!isOpen) return null;

    // Helper validation function to catch past dates and times
    const timeFilter = (dateStr: string, timeStr: string): boolean => {
        if (!dateStr) return false;

        const now = new Date();

        // 1. Check if the date is strictly in the past (ignores time)
        const selectedDateOnly = new Date(dateStr);
        // Normalize times to midnight for an accurate date-only comparison
        const todayDateOnly = new Date(now.getFullYear(), now.getMonth(), now.getDate());

        if (selectedDateOnly < todayDateOnly) {
            setError("You cannot select a past date.");
            return false;
        }

        // 2. If the date is today, verify the selected time hasn't passed
        if (selectedDateOnly.getTime() === todayDateOnly.getTime() && timeStr) {
            const [hours, minutes] = timeStr.split(":").map(Number);
            const selectedDateTime = new Date(todayDateOnly.getTime());
            selectedDateTime.setHours(hours, minutes, 0, 0);

            if (selectedDateTime < now) {
                setError("You cannot select a past time for today.");
                return false;
            }
        }

        // Clear error if validation passes
        setError(null);
        return true;
    };

    // Wrapper for submission to enforce the filters
    const handleSubmission = () => {
        const isDateValid = timeFilter(slotForm.date, slotForm.startTime);
        if (isDateValid) {
            handleAddSlot();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
                <div className="mb-6 flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl font-black text-[#101b3d]">Add Time Slot</h2>
                        <p className="mt-1 text-sm text-slate-500">Select date, day, start time and end time.</p>
                    </div>

                    <button
                        type="button"
                        onClick={() => { resetSlotForm(); onClose(); }}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200"
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="space-y-4">
                    <div>
                        <label className="mb-2 block text-sm font-black text-[#20263D]">Date</label>
                        <input
                            type="date"
                            value={slotForm.date}
                            onChange={(e) => {
                                const newDate = e.target.value;
                                setSlotForm((prev) => ({ ...prev, date: newDate }));
                                timeFilter(newDate, slotForm.startTime);
                            }}
                            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                        />
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-black text-[#20263D]">Day</label>
                        <select
                            value={slotForm.day}
                            onChange={(e) => setSlotForm((prev) => ({ ...prev, day: e.target.value as WeekDay }))}
                            className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                        >
                            {weekDays.map((item) => (
                                <option key={item.value} value={item.value}>{item.label}</option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-2 block text-sm font-black text-[#20263D]">Start Time</label>
                            <input
                                type="time"
                                value={slotForm.startTime}
                                onChange={(e) => {
                                    const newTime = e.target.value;
                                    setSlotForm((prev) => ({ ...prev, startTime: newTime }));
                                    timeFilter(slotForm.date, newTime);
                                }}
                                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                            />
                        </div>

                        <div>
                            <label className="mb-2 block text-sm font-black text-[#20263D]">End Time</label>
                            <input
                                type="time"
                                value={slotForm.endTime}
                                onChange={(e) => setSlotForm((prev) => ({ ...prev, endTime: e.target.value }))}
                                className="h-12 w-full rounded-xl border border-slate-200 px-4 text-sm font-semibold outline-none transition focus:border-[#078b91] focus:ring-4 focus:ring-[#D4E2E0]/60"
                            />
                        </div>
                    </div>

                    {error ? (
                        <div className="rounded-2xl bg-red-50 p-4 text-sm font-semibold text-red-600 border border-red-100">{error}</div>
                    ) : (
                        <div className="rounded-2xl bg-[#F0FAF7] p-4 text-sm font-semibold text-[#078b91]">This slot will be added to your appointment availability.</div>
                    )}

                    <div className="grid grid-cols-2 gap-3 pt-2">
                        <Button type="button" variant="outline" onClick={() => { resetSlotForm(); onClose(); }}>Cancel</Button>
                        <Button type="button" onClick={handleSubmission}>Add Slot</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddSlotModal;
