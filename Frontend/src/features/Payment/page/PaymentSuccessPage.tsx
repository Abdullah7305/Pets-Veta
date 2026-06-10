import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { getPaymentStatusApi } from "../api/payment.api";

const PaymentSuccessPage = () => {
  const [searchParams] = useSearchParams();

  const [paymentStatus, setPaymentStatus] = useState("Checking...");
  const [appointmentStatus, setAppointmentStatus] = useState("Checking...");
  const [doctorName, setDoctorName] = useState("Doctor");

  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    const fetchPaymentStatus = async () => {
      try {
        if (!sessionId) {
          setPaymentStatus("Session ID missing");
          return;
        }

        const response = await getPaymentStatusApi(sessionId);

        setPaymentStatus(response?.data?.paymentStatus || "PENDING");
        setAppointmentStatus(response?.data?.status || "PENDING");
        setDoctorName(response?.data?.doctor?.user?.fullName || "Doctor");
      } catch (error) {
        console.error("Payment status error:", error);
        setPaymentStatus("Unable to verify payment");
      }
    };

    fetchPaymentStatus();
  }, [sessionId]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-slate-100">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100 text-3xl text-green-600">
          ✓
        </div>

        <h1 className="mt-5 text-2xl font-bold text-slate-900">
          Payment Successful
        </h1>

        <p className="mt-3 text-slate-600">
          Your appointment payment has been processed.
        </p>

        <div className="mt-6 rounded-2xl bg-slate-50 p-5 text-left">
          <div className="flex justify-between border-b border-slate-200 pb-3">
            <span className="text-sm text-slate-500">Doctor</span>
            <span className="text-sm font-semibold text-slate-800">
              {doctorName}
            </span>
          </div>

          <div className="flex justify-between border-b border-slate-200 py-3">
            <span className="text-sm text-slate-500">Payment Status</span>
            <span className="text-sm font-semibold text-green-600">
              {paymentStatus}
            </span>
          </div>

          <div className="flex justify-between pt-3">
            <span className="text-sm text-slate-500">Appointment Status</span>
            <span className="text-sm font-semibold text-sky-800">
              {appointmentStatus}
            </span>
          </div>
        </div>

        <Link
          to="/"
          className="mt-7 inline-flex w-full justify-center rounded-xl bg-sky-800 px-5 py-3 font-semibold text-white transition hover:bg-sky-900"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PaymentSuccessPage;