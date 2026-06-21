import { useSearchParams, Link } from "react-router-dom";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get("appointmentId");

  return (
    <main className="flex min-h-screen items-center justify-center bg-emerald-50 px-4">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl">
        <h1 className="text-2xl font-extrabold text-emerald-600">
          Payment Submitted
        </h1>

        <p className="mt-3 text-sm text-slate-500">
          Your payment has been submitted. We are confirming your appointment.
        </p>

        <div className="mt-5 rounded-xl bg-slate-50 p-4 text-left text-xs">
          <p className="font-bold text-slate-500">Appointment ID:</p>
          <p className="mt-1 break-all text-slate-700">{appointmentId}</p>
        </div>

        <Link
          to="/doctors"
          className="mt-6 inline-flex rounded-xl bg-[#0B8F5A] px-5 py-3 text-sm font-bold text-white"
        >
          Back to Doctors
        </Link>
      </section>
    </main>
  );
};

export default PaymentSuccessPage;