import { useState } from "react";
import {
    PaymentElement,
    useElements,
    useStripe,
} from "@stripe/react-stripe-js";

type OrderPaymentFormProps = {
    orderId: string;
};

const OrderPaymentForm = ({ orderId }: OrderPaymentFormProps) => {
    const stripe = useStripe();
    const elements = useElements();

    const [isPaying, setIsPaying] = useState(false);
    const [error, setError] = useState("");

    const handlePayNow = async (event: React.FormEvent) => {
        event.preventDefault();

        if (!stripe || !elements) {
            setError("Stripe element loader uninitialized.");
            return;
        }

        try {
            setIsPaying(true);
            setError("");

            const result = await stripe.confirmPayment({
                elements,
                confirmParams: {
                    return_url: `${window.location.origin}/order-payment-success?orderId=${orderId}`,
                },
            });

            if (result.error) {
                setError(result.error.message || "Payment session failed.");
                setIsPaying(false);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Payment request failed.");
            setIsPaying(false);
        }
    };

    return (
        <form onSubmit={handlePayNow} className="mt-6 space-y-5 text-left">
            <PaymentElement />

            {error && (
                <div className="rounded-xl border border-red-100 bg-red-50 p-3 text-sm font-semibold text-red-600">
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={!stripe || !elements || isPaying}
                className="w-full rounded-xl bg-[#178f95] px-4 py-3 text-sm font-bold text-white hover:bg-[#12757a] disabled:cursor-not-allowed disabled:opacity-50"
            >
                {isPaying ? "Processing payment..." : "Confirm & Pay"}
            </button>
        </form>
    );
};

export default OrderPaymentForm;