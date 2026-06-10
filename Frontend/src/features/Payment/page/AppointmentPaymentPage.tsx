import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import PaymentSummaryCard from "../components/PaymentSummaryCard";
import { createCheckoutSessionApi } from "../api/payment.api";
import type { AppointmentPaymentState } from "../payment.types";

const AppointmentPaymentPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const appointment = location.state as AppointmentPaymentState | null;

  const handlePayNow = async () => {
    try {
      if (!appointment?.appointmentId) {
        alert("Appointment ID not found");
        return;
      }

      setLoading(true);

      const response = await createCheckoutSessionApi(
        appointment.appointmentId
      );

      const checkoutUrl = response?.data?.url;

      if (!checkoutUrl) {
        alert("Stripe checkout URL not found");
        return;
      }

      window.location.href = checkoutUrl;
    } catch (error) {
      console.error("Stripe checkout error:", error);
      alert("Failed to start payment. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (!appointment) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md rounded-2xl bg-white p-8 text-center shadow-lg">
          <h1 className="text-2xl font-bold text-slate-900">
            Appointment Data Missing
          </h1>

          <p className="mt-3 text-slate-600">
            Please book an appointment first, then continue to payment.
          </p>

          <button
            type="button"
            onClick={() => navigate("/doctors")}
            className="mt-6 rounded-lg bg-sky-800 px-5 py-3 font-semibold text-white hover:bg-sky-900"
          >
            Go to Doctors
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-[#f4fbff] via-white to-[#e8fbfa] px-4 py-10">
      <PaymentSummaryCard
        appointment={appointment}
        loading={loading}
        onPayNow={handlePayNow}
      />
    </div>
  );
};

export default AppointmentPaymentPage;