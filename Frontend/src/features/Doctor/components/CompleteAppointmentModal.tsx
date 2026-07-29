import { useState, useEffect } from "react";
import { X, CheckCircle, Loader2, KeyRound } from "lucide-react";

interface CompleteAppointmentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: (code: string) => void;
    isLoading: boolean;
}

const CompleteAppointmentModal = ({
    isOpen,
    onClose,
    onConfirm,
    isLoading,
}: CompleteAppointmentModalProps) => {
    const [code, setCode] = useState("");
    const [validationError, setValidationError] = useState("");

    // Reset code state on reopen/close
    useEffect(() => {
        if (!isOpen) {
            setCode("");
            setValidationError("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        const cleanedCode = code.trim().toUpperCase();

        if (!cleanedCode) {
            setValidationError("Please enter the patient's verification code.");
            return;
        }

        if (cleanedCode.length < 5) {
            setValidationError("Invalid code length. Code must be at least 5 characters.");
            return;
        }

        setValidationError("");
        onConfirm(cleanedCode);
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-xs transition-opacity">
            <div className="w-full max-w-sm rounded-3xl bg-white p-6 shadow-2xl animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-black text-slate-900">
                        Verify Patient Code
                    </h3>
                    <button
                        type="button"
                        onClick={onClose}
                        disabled={isLoading}
                        className="rounded-full bg-slate-100 p-2 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50 cursor-pointer"
                    >
                        <X size={16} />
                    </button>
                </div>

                {/* Info Content */}
                <div className="mb-5 rounded-2xl bg-[#F0FAF7] p-5 text-center border border-emerald-100/60">
                    <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                        <CheckCircle size={24} />
                    </div>
                    <p className="text-sm font-semibold leading-relaxed text-slate-600">
                        Ask your patient for the verification code they received via email. Enter it below to complete the session and authorize the Stripe Connect transfer.
                    </p>
                </div>

                {/* Code Form */}
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label className="mb-1.5 block text-xs font-bold text-slate-400 uppercase tracking-wide">
                            Verification Code
                        </label>
                        <div className="flex h-12 items-center rounded-xl border border-slate-200 bg-white px-4 transition focus-within:border-[#078b91] focus-within:ring-4 focus-within:ring-[#D4E2E0]/60">
                            <KeyRound size={18} className="text-slate-400 mr-2" />
                            <input
                                type="text"
                                value={code}
                                onChange={(e) => {
                                    setCode(e.target.value);
                                    if (validationError) setValidationError("");
                                }}
                                disabled={isLoading}
                                placeholder="e.g. PV-A2B3C4"
                                className="h-full w-full bg-transparent text-sm font-extrabold uppercase text-[#101b3d] outline-none placeholder:text-slate-350"
                            />
                        </div>
                        {validationError && (
                            <p className="mt-1.5 text-xs font-bold text-red-500">
                                {validationError}
                            </p>
                        )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-2">
                        <button
                            type="button"
                            onClick={onClose}
                            disabled={isLoading}
                            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="flex-1 rounded-xl bg-[#078b91] py-3 text-sm font-bold text-white transition hover:bg-[#056f75] disabled:opacity-50 flex items-center justify-center gap-1.5 cursor-pointer"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" />
                                    Redeeming...
                                </>
                            ) : (
                                "Verify & Payout"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompleteAppointmentModal;