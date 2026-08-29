import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

type AppointmentPaymentFormProps = {
  appointmentId: string;
};

const AppointmentPaymentForm = ({ appointmentId }: AppointmentPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isElementReady, setIsElementReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  const handlePayNow = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe is not ready yet. Please refresh.");
      return;
    }

    try {
      setIsPaying(true);
      setError("");

      // 1. Validate fields inside the payment element
      const { error: submitError } = await elements.submit();
      if (submitError) {
        setError(submitError.message || "Please complete all payment fields.");
        setIsPaying(false);
        return;
      }

      // 2. Confirm payment
      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/payment-success?appointmentId=${appointmentId}`,
        },
      });

      if (result.error) {
        setError(result.error.message || "Payment failed. Please try again.");
        setIsPaying(false);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Payment processing failed.");
      setIsPaying(false);
    }
  };

  return (
    <form onSubmit={handlePayNow} className="mt-6 space-y-5 text-left">
      {/* 
        ⚠️ NEVER wrap PaymentElement in display:none / hidden.
        Stripe requires non-zero layout dimensions to measure and render the iframe.
      */}
      <div className="min-h-[220px]">
        <PaymentElement
          onReady={() => {
            console.log("Stripe PaymentElement loaded successfully");
            setIsElementReady(true);
          }}
          onLoadError={(event) => {
            console.error("Stripe Load Error:", event);
            setError(event.error?.message || "Failed to load payment options.");
          }}
          options={{
            layout: "tabs",
          }}
        />
      </div>

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || !isElementReady || isPaying}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#0B8F5A] px-4 py-3.5 text-sm font-bold text-white shadow-md shadow-emerald-700/10 transition hover:bg-[#097b4d] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPaying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing Payment...</span>
          </>
        ) : !isElementReady ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Loading Payment Form...</span>
          </>
        ) : (
          "Pay Now"
        )}
      </button>
    </form>
  );
};

export default AppointmentPaymentForm;