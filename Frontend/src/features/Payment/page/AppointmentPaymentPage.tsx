import { useMemo, useState, useEffect, useCallback } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { AlertCircle, Clock, Loader2 } from "lucide-react";
import { createAppointmentPaymentIntent } from "../api/payment.api";
import AppointmentPaymentForm from "../components/AppointmentPayment";

const stripePublishableKey = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY || "";
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const AppointmentPaymentPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const appointmentId = searchParams.get("appointmentId");

  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [amount, setAmount] = useState<number | null>(null);
  const [currency, setCurrency] = useState<string>("pkr");
  const [isLoadingIntent, setIsLoadingIntent] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isHoldExpired, setIsHoldExpired] = useState<boolean>(false);

  const appearance = useMemo(
    () => ({
      theme: "stripe" as const,
      variables: {
        colorPrimary: "#0B8F5A",
        borderRadius: "12px",
      },
    }),
    []
  );

  const initPayment = useCallback(async () => {
    if (!appointmentId) {
      setError("Appointment ID missing. Please select a doctor slot again.");
      setIsLoadingIntent(false);
      return;
    }

    try {
      setIsLoadingIntent(true);
      setError("");
      setIsHoldExpired(false);

      const result = await createAppointmentPaymentIntent(appointmentId);

      if (!result?.success || !result?.data?.clientSecret) {
        const errorMsg = result?.message || "Failed to initialize payment session.";
        setError(errorMsg);

        if (
          errorMsg.toLowerCase().includes("expired") ||
          errorMsg.toLowerCase().includes("no longer held")
        ) {
          setIsHoldExpired(true);
        }
        return;
      }

      setClientSecret(result.data.clientSecret);
      setAmount(result.data.amount);
      setCurrency(result.data.currency || "pkr");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unable to initiate payment.";
      setError(message);

      if (
        message.toLowerCase().includes("expired") ||
        message.toLowerCase().includes("no longer held")
      ) {
        setIsHoldExpired(true);
      }
    } finally {
      setIsLoadingIntent(false);
    }
  }, [appointmentId]);

  // Auto-initialize payment intent on mount
  useEffect(() => {
    void initPayment();
  }, [initPayment]);

  const formattedAmount =
    amount !== null ? `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}` : null;

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#F3FAF7] px-4 py-10">
      <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-slate-100">
        <h1 className="text-2xl font-extrabold text-slate-800">
          Appointment Payment
        </h1>

        <p className="mt-2 text-sm leading-6 text-slate-500">
          Complete your consultation fee to confirm the appointment.
        </p>

        {/* Appointment & Amount Summary */}
        <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            Appointment Reference
          </p>
          <p className="mt-1 break-all text-sm font-bold text-slate-700">
            {appointmentId || "Missing appointment ID"}
          </p>

          {formattedAmount && (
            <div className="mt-4 border-t border-slate-200 pt-4">
              <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                Amount to Pay
              </p>
              <p className="mt-1 text-xl font-extrabold text-[#0B8F5A]">
                {formattedAmount}
              </p>
            </div>
          )}
        </div>

        {/* Loading Spinner */}
        {isLoadingIntent && (
          <div className="mt-8 flex flex-col items-center justify-center py-6">
            <Loader2 className="h-8 w-8 animate-spin text-[#0B8F5A]" />
            <p className="mt-3 text-sm font-semibold text-slate-500">
              Setting up secure checkout...
            </p>
          </div>
        )}

        {/* Error / Hold Expired Notice */}
        {error && !isLoadingIntent && (
          <div className="mt-6 rounded-2xl border border-red-100 bg-red-50 p-4 text-left">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 shrink-0 text-red-500 mt-0.5" />
              <div>
                <h3 className="text-sm font-bold text-red-800">
                  {isHoldExpired ? "Slot Hold Expired" : "Payment Error"}
                </h3>
                <p className="mt-1 text-xs leading-5 text-red-600">
                  {error}
                </p>
              </div>
            </div>

            <div className="mt-4 flex gap-2">
              {isHoldExpired ? (
                <button
                  type="button"
                  onClick={() => navigate("/doctors")}
                  className="w-full rounded-xl bg-[#0B8F5A] px-4 py-2.5 text-xs font-bold text-white hover:bg-[#097b4d]"
                >
                  Find Available Slots
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => void initPayment()}
                  className="w-full rounded-xl bg-red-600 px-4 py-2.5 text-xs font-bold text-white hover:bg-red-700"
                >
                  Retry Payment
                </button>
              )}
            </div>
          </div>
        )}

        {/* Stripe Elements Form */}
        {!isLoadingIntent && clientSecret && appointmentId && stripePromise && (
          <Elements
            stripe={stripePromise}
            options={{
              clientSecret,
              appearance,
            }}
          >
            <AppointmentPaymentForm appointmentId={appointmentId} />
          </Elements>
        )}
      </section>
    </main>
  );
};

export default AppointmentPaymentPage;