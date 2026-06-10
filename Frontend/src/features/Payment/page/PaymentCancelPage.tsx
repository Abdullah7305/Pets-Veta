import { Link, useSearchParams } from "react-router-dom";

const PaymentCancelPage = () => {
  const [searchParams] = useSearchParams();

  const appointmentId = searchParams.get("appointmentId");

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-slate-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 text-3xl text-red-600">
          ×
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Payment Cancelled
        </h1>

        <p className="mt-3 text-slate-600">
          Your appointment is still pending. Please complete payment to confirm
          your appointment.
        </p>

        <div className="mt-7 flex flex-col gap-3">
          {appointmentId && (
            <Link
              to={`/appointment-payment/${appointmentId}`}
              className="rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white transition hover:bg-sky-900"
            >
              Try Payment Again
            </Link>
          )}

          <Link
            to="/doctors"
            className="rounded-xl border border-slate-200 px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50"
          >
            Back to Doctors
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PaymentCancelPage;