import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AlertTriangle, RotateCcw, Stethoscope, Loader2 } from "lucide-react";
import { releaseAppointmentHoldApi } from "../api/payment.api";

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const appointmentId = searchParams.get("appointmentId");

  const [isReleasing, setIsReleasing] = useState(true);

  useEffect(() => {
    const releaseSlot = async () => {
      if (appointmentId) {
        try {
          // Immediately release the slot back to AVAILABLE
          await releaseAppointmentHoldApi(appointmentId);
          console.log(`Slot for appointment ${appointmentId} released successfully.`);
        } catch (err) {
          console.error("Failed to release appointment slot:", err);
        }
      }
      setIsReleasing(false);
    };

    void releaseSlot();
  }, [appointmentId]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#fff8f6] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-red-100">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-red-50 text-red-500 shadow-inner">
          <AlertTriangle size={36} />
        </div>

        <h1 className="mt-6 text-2xl font-black text-[#101b3d]">
          Payment Not Completed
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          The payment session was not completed. To keep the doctor&apos;s schedule accurate, 
          <strong> your appointment hold has been released</strong>.
        </p>

        {isReleasing && (
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-slate-400">
            <Loader2 className="h-4 w-4 animate-spin text-red-500" />
            <span>Releasing reserved slot...</span>
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left text-xs font-semibold text-slate-600">
          <p className="font-bold text-slate-700">What should you do next?</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-4 text-slate-500">
            <li>Choose a new slot from the doctor&apos;s schedule.</li>
            <li>Fill in your pet&apos;s details and complete the checkout.</li>
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#0B8F5A] font-bold text-white shadow-lg shadow-emerald-600/10 transition hover:bg-[#097b4d]"
          >
            <Stethoscope size={18} />
            Book New Slot
          </button>

          <button
            type="button"
            onClick={() => navigate("/pet-owner/appointments")}
            className="flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white font-bold text-slate-700 transition hover:bg-slate-50"
          >
            <RotateCcw size={17} />
            Go to My Appointments
          </button>
        </div>
      </section>
    </main>
  );
};

export default PaymentCancelPage;