import type { Dispatch, SetStateAction } from "react";
import type { ScheduleFormData } from "../../doctor.types";

type ScheduleModalProps = {
    isOpen: boolean;
    onClose: () => void;
    schedule: ScheduleFormData;
    setSchedule: Dispatch<SetStateAction<ScheduleFormData>>;
    error: string;
    setError: Dispatch<SetStateAction<string>>;
    onConfirm: () => void | Promise<void>;
};

const ScheduleModal = ({
    isOpen,
    onClose,
    schedule,
    setSchedule,
    error,
    setError,
    onConfirm
}: ScheduleModalProps) => {

    if (!isOpen) return null;

    const defaultState: ScheduleFormData = {
        date: "",
        startTime: "",
        endTime: ""
    };

    const handleCancel = () => {

        setSchedule(defaultState);

        setError("");

        onClose();
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm animate-in fade-in duration-200">


            <div className="w-full max-w-md transform rounded-2xl border border-slate-100 bg-white p-6 shadow-2xl transition-all animate-in zoom-in-95 duration-200">


                <h3 className="text-xl font-extrabold text-slate-900">
                    Confirm Your Schedule
                </h3>
                <p className="mt-1 text-sm text-slate-500">
                    Please review the time slot details below before making it active.
                </p>


                {error && (
                    <div className="mt-4 flex items-center gap-3 rounded-xl border border-red-100 bg-red-50 p-4 text-sm font-bold text-red-600">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500 text-xs font-black text-white">
                            !
                        </span>
                        <p>{error}</p>
                    </div>
                )}


                <div className="mt-5 space-y-4 rounded-xl bg-slate-50 p-4 border border-slate-100">
                    <div className="flex justify-between items-center border-b border-slate-200/60 pb-3">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Selected Date</span>
                        <span className="text-sm font-bold text-slate-700">{schedule.date || "Not Selected"}</span>
                    </div>

                    <div className="flex justify-between items-center">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Shift Timings</span>
                        <span className="text-sm font-bold text-teal-600 bg-teal-50 px-2.5 py-1 rounded-lg border border-teal-100">
                            {schedule.startTime || "--:--"} to {schedule.endTime || "--:--"}
                        </span>
                    </div>
                </div>


                <div className="mt-6 flex gap-3">
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 active:bg-slate-100"
                    >
                        Cancel & Reset
                    </button>

                    <button
                        type="button"
                        onClick={onConfirm}
                        className="flex-1 rounded-xl bg-teal-600 py-3 text-sm font-bold text-white transition hover:bg-teal-700 shadow-sm shadow-teal-600/10 active:transform active:scale-[0.98]"
                    >
                        Confirm Slot
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ScheduleModal;
