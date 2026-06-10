import type { AppointmentPaymentState } from "../payment.types";

interface PaymentSummaryCardProps {
  appointment: AppointmentPaymentState;
  loading: boolean;
  onPayNow: () => void;
}

const PaymentSummaryCard = ({
  appointment,
  loading,
  onPayNow,
}: PaymentSummaryCardProps) => {
  const formattedDate = appointment.checkupTime
    ? new Date(appointment.checkupTime).toLocaleString()
    : "Not available";

  return (
    <div className="w-full max-w-lg rounded-3xl bg-white p-7 shadow-xl border border-slate-100">
      <div className="text-center">
        <span className="inline-flex rounded-full bg-teal-50 px-4 py-2 text-sm font-semibold text-teal-700">
          Appointment Payment
        </span>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Confirm Your Appointment
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Please complete your payment to confirm the doctor appointment.
        </p>
      </div>

      <div className="mt-7 space-y-4 rounded-2xl bg-slate-50 p-5">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-sm font-medium text-slate-500">
            Appointment ID
          </span>
          <span className="max-w-[180px] truncate text-sm font-semibold text-slate-800">
            {appointment.appointmentId}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-sm font-medium text-slate-500">
            Doctor
          </span>
          <span className="text-sm font-semibold text-slate-800">
            {appointment.doctorName || "Doctor"}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <span className="text-sm font-medium text-slate-500">
            Checkup Time
          </span>
          <span className="text-right text-sm font-semibold text-slate-800">
            {formattedDate}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-base font-semibold text-slate-700">
            Total Fee
          </span>
          <span className="text-2xl font-bold text-teal-700">
            ${appointment.fees}
          </span>
        </div>
      </div>

      <button
        type="button"
        onClick={onPayNow}
        disabled={loading}
        className="mt-7 w-full rounded-xl bg-sky-800 px-5 py-3.5 text-base font-semibold text-white transition hover:bg-sky-900 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {loading ? "Redirecting..." : "Pay Now"}
      </button>

      <p className="mt-4 text-center text-xs text-slate-400">
        Secure payment powered by Stripe.
      </p>
    </div>
  );
};

export default PaymentSummaryCard;