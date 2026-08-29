import { useState } from "react";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { Loader2 } from "lucide-react";

type OrderPaymentFormProps = {
  orderId: string;
};

const OrderPaymentForm = ({ orderId }: OrderPaymentFormProps) => {
  const stripe = useStripe();
  const elements = useElements();

  const [isElementReady, setIsElementReady] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [error, setError] = useState("");

  const handlePayNow = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      setError("Stripe element loader uninitialized.");
      return;
    }

    if (!isElementReady) {
      setError("Payment element is still loading. Please wait.");
      return;
    }

    try {
      setIsPaying(true);
      setError("");

      sessionStorage.setItem(`payment-processing-${orderId}`, "true");

      const { error: submitError } = await elements.submit();
      if (submitError) {
        sessionStorage.removeItem(`payment-processing-${orderId}`);
        setError(submitError.message || "Please complete all payment fields.");
        setIsPaying(false);
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/order-payment-success?orderId=${orderId}`,
        },
      });

      if (result.error) {
        sessionStorage.removeItem(`payment-processing-${orderId}`);
        setError(result.error.message || "Payment session failed.");
        setIsPaying(false);
      }
    } catch (err) {
      sessionStorage.removeItem(`payment-processing-${orderId}`);
      setError(err instanceof Error ? err.message : "Payment request failed.");
      setIsPaying(false);
    }
  };

  return (
    <form onSubmit={handlePayNow} className="mt-6 space-y-5 text-left">
      <PaymentElement
        onReady={() => setIsElementReady(true)}
        options={{ layout: "tabs" }}
      />

      {error && (
        <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={!stripe || !elements || !isElementReady || isPaying}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#178f95] px-4 py-3 text-sm font-bold text-white hover:bg-[#12757a] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {isPaying ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Processing payment...</span>
          </>
        ) : !isElementReady ? (
          "Loading payment options..."
        ) : (
          "Confirm & Pay"
        )}
      </button>
    </form>
  );
};

export default OrderPaymentForm;