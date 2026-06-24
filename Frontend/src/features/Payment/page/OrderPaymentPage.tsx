import { useMemo, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import { createOrderPaymentIntentApi } from "../api/payment.api";
import OrderPaymentForm from "../components/OrderPaymentForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const OrderPaymentPage = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const orderId = searchParams.get("orderId");

    const [clientSecret, setClientSecret] = useState<string | null>(null);
    const [amount, setAmount] = useState<number | null>(null);
    const [currency, setCurrency] = useState<string>("pkr");
    const [isCreatingIntent, setIsCreatingIntent] = useState(false);
    const [error, setError] = useState("");

    const appearance = useMemo(
        () => ({
            theme: "stripe" as const,
            variables: {
                colorPrimary: "#178f95",
                borderRadius: "12px",
            },
        }),
        []
    );

    const handleContinuePayment = async () => {
        if (!orderId) {
            setError("Order ID is missing.");
            return;
        }

        try {
            setIsCreatingIntent(true);
            setError("");

            const result = await createOrderPaymentIntentApi(orderId);

            if (!result?.success || !result?.data?.clientSecret) {
                setError("Failed to start payment. Please try again.");
                return;
            }

            setClientSecret(result.data.clientSecret);
            setAmount(result.data.amount);
            setCurrency(result.data.currency);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Payment initialization failed.");
        } finally {
            setIsCreatingIntent(false);
        }
    };

    const formattedAmount =
        amount !== null ? `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}` : null;

    return (
        <main className="flex min-h-screen items-center justify-center bg-[#f0f9fa] px-4 py-10 text-[#20263D]">
            <section className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-xl border border-slate-100">
                <h1 className="text-2xl font-extrabold text-slate-800">
                    Secure Store Checkout
                </h1>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                    Your order has been initiated. Complete the secure payment details below to confirm your purchase.
                </p>

                <div className="mt-6 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-left">
                    <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                        Order Reference
                    </p>
                    <p className="mt-2 break-all text-sm font-bold text-slate-700">
                        {orderId || "Missing Order ID"}
                    </p>

                    {formattedAmount && (
                        <div className="mt-4 border-t border-slate-200 pt-4">
                            <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
                                Total Cost
                            </p>
                            <p className="mt-1 text-lg font-extrabold text-[#178f95]">
                                PKR {formattedAmount}
                            </p>
                        </div>
                    )}
                </div>

                {error && (
                    <p className="mt-4 rounded-xl bg-red-50 p-3 text-sm font-semibold text-red-600">
                        {error}
                    </p>
                )}

                {!clientSecret && (
                    <div className="mt-6 grid grid-cols-2 gap-3">
                        <button
                            type="button"
                            onClick={() => navigate("/cart")}
                            className="rounded-xl border border-slate-200 px-4 py-3 text-sm font-bold text-slate-600 hover:bg-slate-50"
                        >
                            Cancel
                        </button>

                        <button
                            type="button"
                            disabled={!orderId || isCreatingIntent}
                            onClick={handleContinuePayment}
                            className="rounded-xl bg-[#178f95] px-4 py-3 text-sm font-bold text-white hover:bg-[#12757a] disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            {isCreatingIntent ? "Connecting..." : "Pay Now"}
                        </button>
                    </div>
                )}

                {clientSecret && orderId && (
                    <Elements
                        stripe={stripePromise}
                        options={{
                            clientSecret,
                            appearance,
                        }}
                    >
                        <OrderPaymentForm orderId={orderId} />
                    </Elements>
                )}
            </section>
        </main>
    );
};

export default OrderPaymentPage;