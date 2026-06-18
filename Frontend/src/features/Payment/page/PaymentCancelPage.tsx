import { useNavigate } from "react-router-dom";
import { AlertCircle, HelpCircle } from "lucide-react";
import Button from "../../../shared/components/Button/Button";

const PaymentCancelPage = () => {
  const navigate = useNavigate();

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white rounded-3xl p-8 border border-slate-100 shadow-xl text-center">
        {/* Cancel Icon */}
        <div className="mx-auto w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6 text-amber-500">
          <AlertCircle size={48} />
        </div>

        <h1 className="text-3xl font-black text-slate-800 mb-2">
          Payment Cancelled
        </h1>
        
        <p className="text-sm font-semibold text-amber-600 uppercase tracking-wider mb-6">
          Transaction Suspended
        </p>

        <p className="text-slate-500 mb-8 leading-relaxed text-sm">
          You have cancelled the payment process. No charges were made to your account. 
          If you experienced a connection issue, feel free to try again.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button
            onClick={() => navigate(-1)}
            className="w-full bg-[#078b91] hover:bg-[#06777d] text-white py-3.5 rounded-xl font-bold"
          >
            Try Booking Again
          </Button>

          <Button
            variant="outline"
            onClick={() => navigate("/pet-owner/dashboard")}
            className="w-full py-3.5 rounded-xl font-bold border-slate-200 text-slate-650 hover:bg-slate-50"
          >
            Return to Dashboard
          </Button>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
          <HelpCircle size={14} />
          <span>Need help? Contact support@petsveta.com</span>
        </div>
      </div>
    </main>
  );
};

export default PaymentCancelPage;