import { X, CheckCircle, Loader2 } from "lucide-react";

interface CompleteAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    isLoading: boolean;
}

const CompleteAppointmentModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
}: CompleteAppointmentModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">
                        Complete Checkup
                    </h3>
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Info Content */}
                <div className="mb-6 rounded-2xl bg-[#F0FAF7] p-5 text-center border border-emerald-100/60">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle size={24} />
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-slate-600">
                        Are you sure you want to mark this appointment as completed? This will archive the patient checkup details.
                    </p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        disabled={isLoading}
                        className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={isLoading}
                        className="flex-1 rounded-xl bg-[#078b91] py-3 text-sm font-bold text-white transition hover:bg-[#056f75] disabled:opacity-50 flex items-center justify-center gap-1.5"
                    >
                        {isLoading ? (
                            <>
                                <Loader2 size={16} className="animate-spin" />
                                Processing...
                            </>
                        ) : (
                            "Confirm Done"
                        )}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CompleteAppointmentModal;