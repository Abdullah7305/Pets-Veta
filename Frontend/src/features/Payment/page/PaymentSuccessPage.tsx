import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CheckCircle2, Calendar, CreditCard, ShieldCheck } from "lucide-react";
import Button from "../../../shared/components/Button/Button";

const PaymentSuccessPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const sessionId = searchParams.get("session_id");

    useEffect(() => {
        // Optionally: You can trigger a quick query here to your backend to verify 
        // the payment locally before showing confirmation, if required.
        console.log("Payment processed for Stripe Session ID:", sessionId);
    }, [sessionId]);

    return (
        <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
            <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
                {/* Success Icon */}
                <div className="mx-auto w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6 text-emerald-500">
                    <CheckCircle2 size={48} />
                </div>

                <h1 className="text-3xl font-black text-slate-800 mb-2">
                    Payment Confirmed
                </h1>

                <p className="text-sm font-semibold text-[#078b91] uppercase tracking-wider mb-6">
                    Thank you for your order!
                </p>

                <p className="text-slate-500 mb-8 leading-relaxed text-sm">
                    Your payment was successfully received and your appointment is confirmed.
                    The veterinary doctor has been notified of your pet's issue report.
                </p>

                {/* Small Details Block */}
                <div className="bg-slate-50 rounded-2xl p-4 border border-slate-100 text-left space-y-3 mb-8">
                    <div className="flex items-center gap-3 text-slate-600 text-xs">
                        <CreditCard size={16} className="text-[#078b91]" />
                        <span className="font-medium text-slate-500">Payment Status:</span>
                        <span className="ml-auto font-black text-emerald-600">Succeeded</span>
                    </div>

                    <div className="flex items-center gap-3 text-slate-600 text-xs">
                        <ShieldCheck size={16} className="text-[#078b91]" />
                        <span className="font-medium text-slate-500">Secure Session:</span>
                        <span className="ml-auto font-mono text-slate-400 max-w-[150px] truncate">
                            {sessionId || "N/A"}
                        </span>
                    </div>
                </div>

                {/* Action Button */}
                <Button
                    onClick={() => navigate("/pet-owner/dashboard")}
                    className="w-full bg-[#15265d] hover:bg-[#101f4d] text-white py-3.5 rounded-xl font-bold"
                >
                    Go to Dashboard
                </Button>
            </div>
        </main>
    );
};

export default PaymentSuccessPage;