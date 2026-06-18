import { FaTimes } from "react-icons/fa";
import { type BookableSlot } from "../apis/bookSlot"; // Adjust path if needed

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (scheduleId: string) => void;
    slot: BookableSlot | null;
}

const BookingModal = ({ isOpen, onClose, onConfirm, slot }: BookingModalProps) => {
    if (!isOpen || !slot) return null;


    const formattedDate = new Date(slot.date).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm transition-opacity">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl">
                {/* Header */}
                <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-xl font-extrabold text-[#07182c]">
                        Confirm Appointment
                    </h3>
                    <button
                        onClick={onClose}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 hover:text-slate-800"
                    >
                        <FaTimes />
                    </button>
                </div>

                {/* Slot Details */}
                <div className="mb-6 rounded-2xl bg-[#f5fbff] p-5 text-center shadow-inner">
                    <p className="text-sm font-semibold uppercase tracking-wider text-slate-500">
                        Selected Slot
                    </p>
                    <p className="mt-2 text-xl font-extrabold text-[#07182c]">
                        {formattedDate}
                    </p>
                    <p className="mt-1 font-bold text-[#009f9d]">
                        {slot.day}
                    </p>
                    <p className="mt-1 text-base font-medium text-slate-600">
                        {slot.startTime} - {slot.endTime}
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 rounded-xl border-2 border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 hover:text-slate-800"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={() => onConfirm(slot.scheduleId)}
                        className="flex-1 rounded-xl bg-[#009f9d] py-3 text-sm font-bold text-white transition hover:bg-[#007f7d]"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BookingModal;