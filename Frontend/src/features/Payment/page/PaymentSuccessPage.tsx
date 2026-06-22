import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { getAppointmentPaymentStatus } from "../api/payment.api";

type AppointmentStatusResponse = {
  id: string;
  status: string;
  paymentStatus: string;
  confirmedAt?: string | null;
  doctor?: {
    user?: {
      fullName?: string;
    };
    specialization?: string;
  };
  doctorSchedule?: {
    status?: string;
    startTime?: string;
    endTime?: string;
  };
  payment?: {
    status?: string;
    amount?: number;
    currency?: string;
    paidAt?: string | null;
  };
};

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  const [appointment, setAppointment] =
    useState<AppointmentStatusResponse | null>(null);

  const [isChecking, setIsChecking] = useState(true);
  const [error, setError] = useState("");
  const [attempts, setAttempts] = useState(0);

  const isConfirmed =
    appointment?.status === "CONFIRMED" &&
    appointment?.paymentStatus === "SUCCEEDED";

  const isFailed =
    appointment?.status === "PAYMENT_FAILED" ||
    appointment?.paymentStatus === "FAILED" ||
    appointment?.paymentStatus === "CANCELLED" ||
    appointment?.status === "EXPIRED";

  useEffect(() => {
    if (!appointmentId) {
      setError("Appointment ID missing.");
      setIsChecking(false);
      return;
    }

    let intervalId: number | undefined;
    let currentAttempts = 0;

    const fetchStatus = async () => {
      try {
        currentAttempts += 1;
        setAttempts(currentAttempts);

        const result = await getAppointmentPaymentStatus(appointmentId);

        if (!result?.success) {
          setError(result?.message || "Could not fetch appointment status.");
          return;
        }

        const data = result.data as AppointmentStatusResponse;
        setAppointment(data);

        const confirmed =
          data.status === "CONFIRMED" && data.paymentStatus === "SUCCEEDED";

        const failed =
          data.status === "PAYMENT_FAILED" ||
          data.paymentStatus === "FAILED" ||
          data.paymentStatus === "CANCELLED" ||
          data.status === "EXPIRED";

        if (confirmed || failed) {
          setIsChecking(false);
          if (intervalId) window.clearInterval(intervalId);
        }

        if (currentAttempts >= 15) {
          setIsChecking(false);
          if (intervalId) window.clearInterval(intervalId);
        }
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Something went wrong while checking status."
        );
        setIsChecking(false);
        if (intervalId) window.clearInterval(intervalId);
      }
    };

    fetchStatus();

    intervalId = window.setInterval(fetchStatus, 2000);

    return () => {
      if (intervalId) window.clearInterval(intervalId);
    };
  }, [appointmentId]);

  const amount =
    appointment?.payment?.amount && appointment?.payment?.currency
      ? `${(appointment.payment.amount / 100).toFixed(2)} ${appointment.payment.currency.toUpperCase()}`
      : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          {isConfirmed ? (
            <CheckCircle2 className="h-12 w-12 text-emerald-600" />
          ) : isFailed ? (
            <AlertCircle className="h-12 w-12 text-red-500" />
          ) : (
            <Loader2 className="h-12 w-12 animate-spin text-[#0B8F5A]" />
          )}
        </div>

        <h1 className="mt-6 text-2xl font-extrabold text-slate-800">
          {isConfirmed
            ? "Appointment Confirmed!"
            : isFailed
              ? "Payment Status Issue"
              : "Confirming Appointment..."}
        </h1>

        <p className="mt-3 text-sm leading-6 text-slate-500">
          {isConfirmed
            ? "Your payment was successful and your appointment has been confirmed."
            : isFailed
              ? "Your payment could not be confirmed. Please contact support or try booking again."
              : "Your payment was submitted. We are waiting for final confirmation from Stripe."}
        </p>

        {error && (
          <div className="mt-5 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
            {error}
          </div>
        )}

        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left text-sm">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Appointment ID
          </p>
          <p className="mt-1 break-all font-bold text-slate-700">
            {appointmentId || "Missing"}
          </p>

          <div className="mt-4 grid grid-cols-2 gap-3 border-t border-slate-200 pt-4">
            <div>
              <p className="text-xs font-bold text-slate-400">Appointment</p>
              <p className="mt-1 font-extrabold text-slate-700">
                {appointment?.status || "Checking..."}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400">Payment</p>
              <p className="mt-1 font-extrabold text-slate-700">
                {appointment?.paymentStatus || "Checking..."}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400">Schedule</p>
              <p className="mt-1 font-extrabold text-slate-700">
                {appointment?.doctorSchedule?.status || "Checking..."}
              </p>
            </div>

            <div>
              <p className="text-xs font-bold text-slate-400">Attempts</p>
              <p className="mt-1 font-extrabold text-slate-700">{attempts}</p>
            </div>
          </div>

          {appointment?.doctor?.user?.fullName && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold text-slate-400">Doctor</p>
              <p className="mt-1 font-bold text-slate-700">
                Dr. {appointment.doctor.user.fullName}
              </p>
            </div>
          )}

          {amount && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold text-slate-400">Paid Amount</p>
              <p className="mt-1 text-lg font-extrabold text-[#0B8F5A]">
                {amount}
              </p>
            </div>
          )}
        </div>

        {isChecking && !isConfirmed && !isFailed && (
          <p className="mt-4 text-xs font-semibold text-slate-400">
            Checking status every 2 seconds...
          </p>
        )}

        <div className="mt-6 grid grid-cols-1 gap-3">
          <Link
            to="/doctors"
            className="rounded-xl bg-[#0B8F5A] px-5 py-3 text-sm font-bold text-white hover:bg-[#097b4d]"
          >
            Back to Doctors
          </Link>
        </div>
      </section>
    </main>
  );
};

export default PaymentSuccessPage;